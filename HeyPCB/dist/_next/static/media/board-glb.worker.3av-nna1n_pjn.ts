import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { recordGltfMeshNames } from "./board-materials";
import { prepareBoardScene, type BoardGlbMode } from "./board-glb-prepare";
import { coalesceBoardGlb } from "./glb-coalesce";
import { restoreNearOpaqueDepth } from "./glb-depth";
import type { BoardPreparationResult, PreparedBoard } from "./board-glb-wire";

/** Texture/animation loaders have different ownership; leave those files to the regular rig. */
function supported(data: ArrayBuffer): boolean {
  const view = new DataView(data);
  if (data.byteLength < 20 || view.getUint32(0, true) !== 0x46546c67) return false;
  const length = view.getUint32(12, true);
  const json = JSON.parse(new TextDecoder().decode(new Uint8Array(data, 20, length)));
  return !json.images?.length && !json.textures?.length && !json.animations?.length && !json.skins?.length &&
    !json.extensionsRequired?.length && !json.buffers?.some((b: { uri?: string }) => b.uri) &&
    !json.nodes?.some((node: { camera?: unknown; extensions?: unknown }) => node.camera != null || node.extensions) &&
    !json.meshes?.some((m: { primitives: { targets?: unknown; mode?: number }[] }) =>
      m.primitives.some(p => p.targets));
}

async function prepare(data: ArrayBuffer, mode: BoardGlbMode): Promise<BoardPreparationResult> {
  if (!supported(data)) return { fallback: true };
  const compact = coalesceBoardGlb(data);
  const gltf = await new GLTFLoader().parseAsync(compact.data, "");
  restoreNearOpaqueDepth(gltf.scene);
  recordGltfMeshNames(gltf.parser.associations, gltf.parser.json.meshes ?? []);
  const root = prepareBoardScene(THREE, gltf.scene, mode);
  const report = root.userData.heypcbBoardFold;
  report.merged += compact.removed;
  root.updateWorldMatrix(true, true);
  const inverse = root.matrixWorld.clone().invert();
  const objects: (THREE.Mesh | THREE.Line | THREE.Points)[] = [];
  root.traverse(object => {
    if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) objects.push(object);
  });
  const board: PreparedBoard = {
    report, matrix: root.matrix.toArray(), userData: root.userData,
    meshes: objects.map(mesh => {
      const geometry = mesh.geometry;
      geometry.computeBoundingBox(); geometry.computeBoundingSphere();
      const attributes: PreparedBoard["meshes"][number]["attributes"] = {};
      for (const [name, attr] of Object.entries(geometry.attributes)) {
        let array = attr.array;
        if (attr instanceof THREE.InterleavedBufferAttribute) {
          array = new (attr.data.array.constructor as typeof Float32Array)(attr.count * attr.itemSize);
          for (let i=0;i<attr.count;i++) for (let j=0;j<attr.itemSize;j++) array[i*attr.itemSize+j]=attr.data.array[i*attr.data.stride+attr.offset+j];
        }
        attributes[name] = { array, itemSize: attr.itemSize, normalized: attr.normalized };
      }
      return {
        name: mesh.name, userData: mesh.userData,
        kind: mesh instanceof THREE.Points ? "points" : mesh instanceof THREE.LineSegments ? "lines"
          : mesh instanceof THREE.LineLoop ? "loop" : mesh instanceof THREE.Line ? "line" : "mesh",
        matrix: inverse.clone().multiply(mesh.matrixWorld).toArray(), attributes,
        indices: geometry.getIndex()?.array ?? null, groups: geometry.groups,
        box: [...geometry.boundingBox!.min.toArray(), ...geometry.boundingBox!.max.toArray()],
        sphere: [...geometry.boundingSphere!.center.toArray(), geometry.boundingSphere!.radius],
        material: Array.isArray(mesh.material) ? mesh.material.map(m => m.toJSON()) : mesh.material.toJSON(),
        renderOrder: mesh.renderOrder, castShadow: mesh.castShadow, receiveShadow: mesh.receiveShadow,
      };
    }),
  };
  return { board };
}

self.onmessage = async (event: MessageEvent<{ data: ArrayBuffer; mode: BoardGlbMode }>) => {
  try {
    const result = await prepare(event.data.data, event.data.mode);
    const transfer = "board" in result ? [...new Set(result.board.meshes.flatMap(mesh => [
      ...Object.values(mesh.attributes).map(attr => attr.array.buffer as ArrayBuffer),
      ...(mesh.indices ? [mesh.indices.buffer as ArrayBuffer] : []),
    ]))] : [];
    self.postMessage(result, { transfer });
  } catch (error) {
    self.postMessage({ error: error instanceof Error ? error.message : "The board could not be decoded" });
  }
};
