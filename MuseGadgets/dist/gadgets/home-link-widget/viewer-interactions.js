export const CONNECTION_NUDGE_RATIO = 0.08;
export const VIEW_TRANSITION_DURATION = 400;
export const DEVICE_SPIN_DURATION_MS = 8000;

const smoothstepIntegral = (progress) => {
  const clamped = Math.max(0, Math.min(1, progress));
  return clamped ** 3 - 0.5 * clamped ** 4;
};

export function createContinuousPlaybackPolicy({ mode = "solid", reducedMotion = false, visible = true } = {}) {
  let requestedPlaying = true;
  let reduced = Boolean(reducedMotion);
  let isVisible = Boolean(visible);
  let elapsed = 0;
  let currentMode = mode;
  let rotationGain = currentMode === "wireframe" ? 0 : 1;
  let gainFrom = rotationGain;
  let gainTarget = rotationGain;
  let gainElapsed = VIEW_TRANSITION_DURATION;
  let gainActive = false;

  const snapshot = () => ({
    requestedPlaying,
    playing: requestedPlaying && !reduced &&
      (currentMode === "connections" || rotationGain > 0 || gainActive),
    active: isVisible && !reduced &&
      (gainActive || requestedPlaying && (currentMode === "connections" || rotationGain > 0)),
    reducedMotion: reduced,
    visible: isVisible,
    elapsed,
    mode: currentMode,
    rotationGain,
    modeTransitionActive: gainActive,
  });

  return {
    advance(deltaMilliseconds, { connections = false } = {}) {
      const delta = Number.isFinite(deltaMilliseconds) && deltaMilliseconds > 0
        ? deltaMilliseconds
        : 0;
      const canAdvance = isVisible && !reduced;
      let rotationDelta = 0;
      if (canAdvance && gainActive) {
        const start = gainElapsed;
        const end = Math.min(VIEW_TRANSITION_DURATION, start + delta);
        const startProgress = start / VIEW_TRANSITION_DURATION;
        const endProgress = end / VIEW_TRANSITION_DURATION;
        rotationDelta = gainFrom * (end - start) +
          (gainTarget - gainFrom) * VIEW_TRANSITION_DURATION *
            (smoothstepIntegral(endProgress) - smoothstepIntegral(startProgress));
        gainElapsed = end;
        rotationGain = gainFrom +
          (gainTarget - gainFrom) * viewTransitionEase(endProgress);
        if (gainElapsed >= VIEW_TRANSITION_DURATION) {
          rotationGain = gainTarget;
          gainActive = false;
        }
        rotationDelta += Math.max(0, delta - (end - start)) * rotationGain;
      } else if (canAdvance) {
        rotationDelta = delta * rotationGain;
      }
      const intentActive = requestedPlaying && !reduced && isVisible;
      const deviceRotationDelta = intentActive ? rotationDelta : 0;
      const packetDelta = intentActive && connections ? delta : 0;
      if (intentActive) elapsed += connections ? delta : deviceRotationDelta;
      return {
        ...snapshot(),
        deviceRotationDelta,
        packetDelta,
      };
    },
    pause() {
      requestedPlaying = false;
      return snapshot();
    },
    resume() {
      if (!reduced) requestedPlaying = true;
      return snapshot();
    },
    toggle() {
      if (!reduced) requestedPlaying = !requestedPlaying;
      return snapshot();
    },
    setMode(nextMode) {
      if (nextMode === currentMode) return snapshot();
      currentMode = nextMode;
      gainFrom = rotationGain;
      gainTarget = currentMode === "wireframe" ? 0 : 1;
      gainElapsed = 0;
      gainActive = gainFrom !== gainTarget;
      if (reduced) {
        rotationGain = gainTarget;
        gainElapsed = VIEW_TRANSITION_DURATION;
        gainActive = false;
      }
      return snapshot();
    },
    setReducedMotion(value) {
      reduced = Boolean(value);
      if (reduced) {
        rotationGain = currentMode === "wireframe" ? 0 : 1;
        gainFrom = rotationGain;
        gainTarget = rotationGain;
        gainElapsed = VIEW_TRANSITION_DURATION;
        gainActive = false;
      }
      return snapshot();
    },
    setVisible(value) {
      isVisible = Boolean(value);
      return snapshot();
    },
    get current() {
      return snapshot();
    },
  };
}

export function createPlaybackAnnouncementBridge(onAnnounce = () => {}) {
  let lastMessage = "";
  const insideMessage = "Inside Home Link does not auto-rotate. Drag or use the arrow keys to rotate.";
  const announce = (message) => {
    if (message === lastMessage) return false;
    lastMessage = message;
    onAnnounce(message);
    return true;
  };
  const announceEffectiveState = (mode, reducedMotion, requestedPlaying) => {
    if (reducedMotion) return announce(requestedPlaying
      ? "3D animation paused because reduced motion is enabled."
      : "3D animation remains paused because reduced motion is enabled.");
    if (mode === "wireframe" && requestedPlaying) return announce(insideMessage);
    return announce(requestedPlaying ? "3D animation playing." : "3D animation paused.");
  };

  return {
    playbackChanged(playing) {
      return announce(playing ? "3D animation playing." : "3D animation paused.");
    },
    modeChanged(mode, reducedMotion, requestedPlaying) {
      return announceEffectiveState(mode, reducedMotion, requestedPlaying);
    },
    preferenceChanged(reducedMotion, requestedPlaying, mode = "solid") {
      return announceEffectiveState(mode, reducedMotion, requestedPlaying);
    },
    reducedMotionBlocked() {
      return announce("3D animation remains paused because reduced motion is enabled.");
    },
    insideAutoRotateBlocked() {
      return announce(insideMessage);
    },
  };
}

const addPointToBounds = (bounds, point) => {
  for (let axis = 0; axis < 3; axis += 1) {
    bounds.min[axis] = Math.min(bounds.min[axis], point[axis]);
    bounds.max[axis] = Math.max(bounds.max[axis], point[axis]);
  }
};

const addFlatPositionsToBounds = (bounds, positions, transform = (point) => point) => {
  if (!Array.isArray(positions) || positions.length % 3 !== 0) {
    throw new Error("Connection geometry positions must be XYZ triples");
  }
  for (let index = 0; index < positions.length; index += 3) {
    addPointToBounds(bounds, transform(positions.slice(index, index + 3)));
  }
};

const finishBounds = (bounds) => {
  if (!bounds.min.every(Number.isFinite) || !bounds.max.every(Number.isFinite)) {
    throw new Error("Connection geometry has no finite bounds");
  }
  return {
    min: bounds.min,
    max: bounds.max,
    center: bounds.min.map((minimum, axis) => (minimum + bounds.max[axis]) / 2),
  };
};

export function addConnectionVectors(left, right) {
  return left.map((value, axis) => value + right[axis]);
}

export function createTriangleNormals(positions, flippedTriangles = []) {
  if (!Array.isArray(positions) || positions.length % 9 !== 0) {
    throw new Error("Triangle positions must contain complete XYZ triangles");
  }
  const flipped = new Set(flippedTriangles);
  if ([...flipped].some((index) => !Number.isSafeInteger(index) || index < 0 || index >= positions.length / 9)) {
    throw new Error("Flipped triangle indexes must identify existing triangles");
  }
  const normals = [];
  for (let index = 0; index < positions.length; index += 9) {
    const first = positions.slice(index, index + 3);
    const second = positions.slice(index + 3, index + 6);
    const third = positions.slice(index + 6, index + 9);
    const firstEdge = second.map((value, axis) => value - first[axis]);
    const secondEdge = third.map((value, axis) => value - first[axis]);
    const normal = [
      firstEdge[1] * secondEdge[2] - firstEdge[2] * secondEdge[1],
      firstEdge[2] * secondEdge[0] - firstEdge[0] * secondEdge[2],
      firstEdge[0] * secondEdge[1] - firstEdge[1] * secondEdge[0],
    ];
    const length = Math.hypot(...normal);
    if (!Number.isFinite(length) || length <= Number.EPSILON) {
      throw new Error("Triangle positions must have finite nonzero area");
    }
    const direction = flipped.has(index / 9) ? -1 : 1;
    const unit = normal.map((value) => value / length * direction);
    normals.push(...unit, ...unit, ...unit);
  }
  return normals;
}

export function createFrontCylinderGeometry([x, y, z], radius, depth, segments) {
  const fillPositions = [];
  const wirePositions = [];
  const flippedTriangles = [];
  const point = (index, front) => {
    const angle = index * Math.PI * 2 / segments;
    return [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius, z + (front ? depth / 2 : -depth / 2)];
  };
  const triangle = (first, second, third) => fillPositions.push(...first, ...second, ...third);
  const line = (start, end) => wirePositions.push(...start, ...end);
  for (let index = 0; index < segments; index += 1) {
    const back = point(index, false);
    const nextBack = point(index + 1, false);
    const front = point(index, true);
    const nextFront = point(index + 1, true);
    triangle([x, y, z + depth / 2], front, nextFront);
    triangle([x, y, z - depth / 2], nextBack, back);
    triangle(back, front, nextFront);
    triangle(back, nextFront, nextBack);
    flippedTriangles.push(index * 4 + 2, index * 4 + 3);
    line(front, nextFront);
    line(back, nextBack);
    if (index % 4 === 0) line(back, front);
  }
  return { fillPositions, wirePositions, flippedTriangles };
}

export function connectionHomeLinkNudge(horizontalAxis, verticalAxis, wifi, homeLink, lowerRight) {
  const project = (point, axis) => point.reduce((sum, value, index) => sum + value * axis[index], 0);
  const projectedDx = Math.abs(project(homeLink, horizontalAxis) - project(wifi, horizontalAxis)) * CONNECTION_NUDGE_RATIO;
  const projectedDy = Math.abs(project(homeLink, verticalAxis) - project(lowerRight, verticalAxis)) * CONNECTION_NUDGE_RATIO;
  const delta = horizontalAxis.map((value, axis) => value * projectedDx + verticalAxis[axis] * projectedDy);
  return { delta, position: addConnectionVectors(homeLink, delta), projectedDx, projectedDy };
}

export function createConnectionSpeaker(center) {
  const [x, y, z] = center;
  return {
    boxes: [{ center: [x, y, z], size: [0.62, 0.72, 0.3] }],
    drivers: [
      { center: [x, y - 0.09, z + 0.18], radius: 0.22, depth: 0.06, segments: 16 },
      { center: [x, y + 0.22, z + 0.18], radius: 0.07, depth: 0.04, segments: 12 },
    ],
  };
}

export function connectionBoundaryFromGeometry(objectPositionArrays, routePoints, options = {}) {
  const margin = options.margin ?? 0.2;
  const groundGap = options.groundGap ?? 0.08;
  const postHeight = options.postHeight ?? 0.29;
  const bounds = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (const positions of objectPositionArrays) addFlatPositionsToBounds(bounds, positions);
  for (const point of routePoints) addPointToBounds(bounds, point);
  const measured = finishBounds(bounds);
  const y = measured.min[1] - groundGap;
  return {
    minX: measured.min[0] - margin,
    maxX: measured.max[0] + margin,
    minZ: measured.min[2] - margin,
    maxZ: measured.max[2] + margin,
    y,
    postTop: y + postHeight,
    measured,
  };
}

export function connectionSceneBounds(meshes, helperParts, cadOffset, cadScale) {
  const bounds = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (const mesh of meshes) {
    addFlatPositionsToBounds(bounds, mesh.positions, (point) =>
      point.map((value, axis) => value * cadScale + cadOffset[axis]),
    );
  }
  for (const part of helperParts) addFlatPositionsToBounds(bounds, part.positions);
  return finishBounds(bounds);
}

export function multiplyConnectionQuaternions(left, right) {
  const [x1, y1, z1, w1] = left;
  const [x2, y2, z2, w2] = right;
  return [
    w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
    w1 * y2 - x1 * z2 + y1 * w2 + z1 * x2,
    w1 * z2 + x1 * y2 - y1 * x2 + z1 * w2,
    w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2,
  ];
}

export function rotateConnectionVector(point, quaternion) {
  const [x, y, z, w] = quaternion;
  const [px, py, pz] = point;
  const tx = 2 * (y * pz - z * py);
  const ty = 2 * (z * px - x * pz);
  const tz = 2 * (x * py - y * px);
  return [
    px + w * tx + y * tz - z * ty,
    py + w * ty + z * tx - x * tz,
    pz + w * tz + x * ty - y * tx,
  ];
}

export function connectionPivotCorrection(userRotation, sceneCenter, networkWeight) {
  if (networkWeight === 0) return [0, 0, 0];
  const center = sceneCenter.map((value) => value * networkWeight);
  const inverse = [-userRotation[0], -userRotation[1], -userRotation[2], userRotation[3]];
  const unrotatedCenter = rotateConnectionVector(center, inverse);
  return unrotatedCenter.map((value, axis) => value - center[axis]);
}

function normalizeConnectionQuaternion(quaternion) {
  const length = Math.hypot(...quaternion);
  if (!length) return [0, 0, 0, 1];
  return quaternion.map((value) => value / length);
}

function connectionQuaternionDot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function alignConnectionQuaternion(reference, quaternion) {
  const aligned = normalizeConnectionQuaternion(quaternion);
  return connectionQuaternionDot(reference, aligned) < 0 ? aligned.map((value) => -value) : aligned;
}

function connectionQuaternionTangent(quaternion) {
  const basisIndex = quaternion.reduce(
    (best, value, index) => Math.abs(value) < Math.abs(quaternion[best]) ? index : best,
    0,
  );
  const basis = [0, 0, 0, 0];
  basis[basisIndex] = 1;
  const projection = connectionQuaternionDot(quaternion, basis);
  return normalizeConnectionQuaternion(basis.map((value, index) => value - projection * quaternion[index]));
}

function connectionQuaternionArc(from, to, previousArc = null) {
  const dot = Math.max(-1, Math.min(1, connectionQuaternionDot(from, to)));
  const projected = to.map((value, index) => value - dot * from[index]);
  const sine = Math.hypot(...projected);
  if (sine < 1e-10) {
    const tangent = previousArc?.tangent ?? connectionQuaternionTangent(from);
    if (dot < 0) return { angle: Math.PI, tangent };
    const atFullTurn = previousArc && previousArc.angle > Math.PI;
    return { angle: atFullTurn ? 2 * Math.PI : 0, tangent };
  }
  const tangent = projected.map((value) => value / sine);
  const angle = Math.acos(dot);
  const candidates = [
    { angle, tangent },
    { angle: 2 * Math.PI - angle, tangent: tangent.map((value) => -value) },
  ];
  if (!previousArc) return candidates[0];
  const previousVector = previousArc.tangent.map((value) => value * previousArc.angle);
  const distance = (candidate) => candidate.tangent.reduce((sum, value, index) => {
    const difference = value * candidate.angle - previousVector[index];
    return sum + difference * difference;
  }, 0);
  return distance(candidates[0]) <= distance(candidates[1]) ? candidates[0] : candidates[1];
}

function slerpConnectionQuaternionArc(from, arc, amount) {
  if (amount <= 0) return [...from];
  const angle = arc.angle * Math.min(1, amount);
  return normalizeConnectionQuaternion(from.map((value, index) =>
    value * Math.cos(angle) + arc.tangent[index] * Math.sin(angle),
  ));
}

export function slerpConnectionQuaternions(from, to, amount) {
  if (amount <= 0) return [...from];
  const start = normalizeConnectionQuaternion(from);
  const end = alignConnectionQuaternion(start, to);
  const dot = connectionQuaternionDot(start, end);
  if (amount >= 1) return end;
  if (dot > 0.9995) {
    return normalizeConnectionQuaternion(start.map((value, index) => value + (end[index] - value) * amount));
  }
  const angle = Math.acos(Math.min(1, dot));
  const sine = Math.sin(angle);
  return normalizeConnectionQuaternion(start.map((value, index) =>
    (value * Math.sin((1 - amount) * angle) + end[index] * Math.sin(amount * angle)) / sine,
  ));
}

export function viewTransitionEase(progress) {
  const clamped = Math.max(0, Math.min(1, progress));
  return clamped * clamped * (3 - 2 * clamped);
}

export function createViewTransition(initialChannels, initialOrientation, duration = VIEW_TRANSITION_DURATION) {
  let channels = { ...initialChannels };
  let fromChannels = { ...channels };
  let targetChannels = { ...channels };
  let orientation = normalizeConnectionQuaternion(initialOrientation);
  let fromOrientation = [...orientation];
  let targetOrientation = [...orientation];
  let targetArc = connectionQuaternionArc(fromOrientation, targetOrientation);
  let elapsed = duration;
  let layoutActive = false;
  let orientationActive = false;

  const snapshot = () => ({
    channels: { ...channels },
    orientation: [...orientation],
    elapsed,
    active: layoutActive || orientationActive,
  });

  const finish = (nextOrientation = targetOrientation) => {
    targetOrientation = alignConnectionQuaternion(targetOrientation, nextOrientation);
    channels = { ...targetChannels };
    orientation = [...targetOrientation];
    elapsed = duration;
    layoutActive = false;
    orientationActive = false;
    return snapshot();
  };

  return {
    retarget(nextChannels, nextOrientation, { reducedMotion = false } = {}) {
      fromChannels = { ...channels };
      targetChannels = { ...nextChannels };
      fromOrientation = [...orientation];
      targetOrientation = alignConnectionQuaternion(fromOrientation, nextOrientation);
      targetArc = connectionQuaternionArc(fromOrientation, targetOrientation);
      elapsed = 0;
      layoutActive = Object.keys(targetChannels).some((key) => fromChannels[key] !== targetChannels[key]);
      orientationActive = true;
      return reducedMotion ? finish() : snapshot();
    },
    advance(deltaMilliseconds, nextOrientation) {
      if (!layoutActive && !orientationActive) {
        targetOrientation = alignConnectionQuaternion(targetOrientation, nextOrientation);
        orientation = [...targetOrientation];
        return snapshot();
      }
      elapsed = Math.min(duration, elapsed + Math.max(0, Number.isFinite(deltaMilliseconds) ? deltaMilliseconds : 0));
      const amount = viewTransitionEase(duration ? elapsed / duration : 1);
      channels = Object.fromEntries(Object.keys(targetChannels).map((key) => [
        key,
        fromChannels[key] + (targetChannels[key] - fromChannels[key]) * amount,
      ]));
      targetOrientation = alignConnectionQuaternion(targetOrientation, nextOrientation);
      targetArc = connectionQuaternionArc(fromOrientation, targetOrientation, targetArc);
      orientation = orientationActive
        ? slerpConnectionQuaternionArc(fromOrientation, targetArc, amount)
        : [...targetOrientation];
      if (elapsed >= duration) return finish();
      return snapshot();
    },
    finish,
    takeControl(displayedOrientation = orientation) {
      orientation = normalizeConnectionQuaternion(displayedOrientation);
      fromOrientation = [...orientation];
      targetOrientation = [...orientation];
      targetArc = connectionQuaternionArc(fromOrientation, targetOrientation);
      orientationActive = false;
      return snapshot();
    },
    get current() {
      return snapshot();
    },
  };
}

export function createPointerIntent({ slop = 8, horizontalRatio = 1.25 } = {}) {
  let pointer = null;
  const pointOf = (event) => [event.clientX, event.clientY];

  return {
    down(event) {
      if (pointer || event.button !== 0 || event.isPrimary === false) return { kind: "ignore" };
      const start = pointOf(event);
      pointer = {
        id: event.pointerId,
        phase: event.pointerType === "touch" ? "pending" : "active",
        start,
      };
      return pointer.phase === "active" ? { kind: "commit", start, point: start } : { kind: "pending" };
    },
    move(event) {
      if (!pointer || pointer.id !== event.pointerId) return { kind: "ignore" };
      const point = pointOf(event);
      if (pointer.phase === "active") return { kind: "move", point };
      if (pointer.phase === "yield") return { kind: "yield" };
      const dx = point[0] - pointer.start[0];
      const dy = point[1] - pointer.start[1];
      if (Math.hypot(dx, dy) < slop) return { kind: "pending" };
      if (Math.abs(dx) > horizontalRatio * Math.abs(dy)) {
        pointer.phase = "active";
        return { kind: "commit", start: pointer.start, point };
      }
      pointer.phase = "yield";
      return { kind: "yield" };
    },
    end(pointerId) {
      if (!pointer || pointer.id !== pointerId) return { kind: "ignore" };
      const kind = pointer.phase === "active" ? "end" : "clear";
      pointer = null;
      return { kind };
    },
    clear() {
      pointer = null;
    },
    get state() {
      return pointer ? { ...pointer, start: [...pointer.start] } : null;
    },
  };
}
