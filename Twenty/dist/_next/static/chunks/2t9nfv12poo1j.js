(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,543820,e=>{"use strict";var t=e.i(26645),a=e.i(779419),n=e.i(203708),o=e.i(53343),i=e.i(849825),r=e.i(190072),s=e.i(223490),l=e.i(723917);let u=new Map,c=(0,l.f)(32);var d=e.i(54268),m=e.i(575268),f=e.i(681576),g=e.i(639257),p=e.i(393568),h=e.i(763114);let v=e=>({activePointerId:null,autoElapsed:e?.autoElapsed??0,dragging:!1,hoverStrength:0,mouseX:.5,mouseY:.5,pointerInside:!1,pointerVelocityX:0,pointerVelocityY:0,pointerX:0,pointerY:0,rotateElapsed:e?.rotateElapsed??0,rotationVelocityX:0,rotationVelocityY:0,rotationVelocityZ:0,rotationX:e?.rotationX??0,rotationY:e?.rotationY??0,rotationZ:e?.rotationZ??0,smoothedMouseX:.5,smoothedMouseY:.5,targetRotationX:e?.targetRotationX??0,targetRotationY:e?.targetRotationY??0,velocityX:0,velocityY:0}),w=({current:e,damping:t,strength:a,target:n,velocity:o})=>{let i=(o+(n-e)*a)*t;return{value:e+i,velocity:i}};var x=r,y=e.i(408560),S=r;class b extends S.P6{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new S.kG;e.deleteAttribute("uv");let t=new S.aV({side:S.tw}),a=new S.aV,n=new S.SN(0xffffff,900,28,2);n.position.set(.418,16.199,.3),this.add(n);let o=new S.kE(e,t);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);let i=new S.YJ(e,a,6),r=new S.t;r.position.set(-10.906,2.009,1.846),r.rotation.set(0,-.195,0),r.scale.set(2.328,7.905,4.651),r.updateMatrix(),i.setMatrixAt(0,r.matrix),r.position.set(-5.607,-.754,-.758),r.rotation.set(0,.994,0),r.scale.set(1.97,1.534,3.955),r.updateMatrix(),i.setMatrixAt(1,r.matrix),r.position.set(6.167,.857,7.803),r.rotation.set(0,.561,0),r.scale.set(3.927,6.285,3.687),r.updateMatrix(),i.setMatrixAt(2,r.matrix),r.position.set(-2.017,.018,6.124),r.rotation.set(0,.333,0),r.scale.set(2.002,4.566,2.064),r.updateMatrix(),i.setMatrixAt(3,r.matrix),r.position.set(2.291,-.756,-2.621),r.rotation.set(0,-.286,0),r.scale.set(1.546,1.552,1.496),r.updateMatrix(),i.setMatrixAt(4,r.matrix),r.position.set(-2.193,-.369,-5.547),r.rotation.set(0,.516,0),r.scale.set(3.875,3.487,2.986),r.updateMatrix(),i.setMatrixAt(5,r.matrix),this.add(i);let s=new S.kE(e,E(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let l=new S.kE(e,E(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);let u=new S.kE(e,E(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let c=new S.kE(e,E(43));c.position.set(-.462,8.89,14.52),c.scale.set(4.38,5.441,.088),this.add(c);let d=new S.kE(e,E(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let m=new S.kE(e,E(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){let e=new Set;for(let t of(this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))}),e))t.dispose()}}function E(e){return new S.ht({color:0,emissive:0xffffff,emissiveIntensity:e})}function M(e){let t=new y.c(e),a=t.fromScene(new b,.04).texture;return t.dispose(),a}let R=1/320,k=new x.Es(0);class C extends x.Ox{halftoneUniforms;constructor(e=10){super(),this.halftoneUniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},refractionEnvMap:{value:null},useEnvMapRefraction:{value:0},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new x.Es("white")},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.customProgramCacheKey=()=>`halftone-transmission-${e}`,this.onBeforeCompile=t=>{t.uniforms={...t.uniforms,...this.halftoneUniforms},t.defines??={},this.anisotropy>0&&(t.defines.USE_ANISOTROPY=""),t.defines.USE_TRANSMISSION="",t.fragmentShader=`
        uniform float chromaticAberration;
        uniform float anisotropicBlur;
        uniform float time;
        uniform float distortion;
        uniform float distortionScale;
        uniform float temporalDistortion;
        uniform sampler2D buffer;

        vec3 random3(vec3 c) {
          float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
          vec3 r;
          r.z = fract(512.0 * j);
          j *= 0.125;
          r.x = fract(512.0 * j);
          j *= 0.125;
          r.y = fract(512.0 * j);
          return r - 0.5;
        }

        uint hash(uint x) {
          x += (x << 10u);
          x ^= (x >> 6u);
          x += (x << 3u);
          x ^= (x >> 11u);
          x += (x << 15u);
          return x;
        }

        uint hash(uvec2 v) { return hash(v.x ^ hash(v.y)); }
        uint hash(uvec3 v) { return hash(v.x ^ hash(v.y) ^ hash(v.z)); }
        uint hash(uvec4 v) {
          return hash(v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w));
        }

        float floatConstruct(uint m) {
          const uint ieeeMantissa = 0x007FFFFFu;
          const uint ieeeOne = 0x3F800000u;
          m &= ieeeMantissa;
          m |= ieeeOne;
          float f = uintBitsToFloat(m);
          return f - 1.0;
        }

        float randomBase(float x) {
          return floatConstruct(hash(floatBitsToUint(x)));
        }
        float randomBase(vec2 v) {
          return floatConstruct(hash(floatBitsToUint(v)));
        }
        float randomBase(vec3 v) {
          return floatConstruct(hash(floatBitsToUint(v)));
        }
        float randomBase(vec4 v) {
          return floatConstruct(hash(floatBitsToUint(v)));
        }

        float rand(float seed) {
          return randomBase(vec3(gl_FragCoord.xy, seed));
        }

        const float F3 = 0.3333333;
        const float G3 = 0.1666667;

        float snoise(vec3 p) {
          vec3 s = floor(p + dot(p, vec3(F3)));
          vec3 x = p - s + dot(s, vec3(G3));
          vec3 e = step(vec3(0.0), x - x.yzx);
          vec3 i1 = e * (1.0 - e.zxy);
          vec3 i2 = 1.0 - e.zxy * (1.0 - e);
          vec3 x1 = x - i1 + G3;
          vec3 x2 = x - i2 + 2.0 * G3;
          vec3 x3 = x - 1.0 + 3.0 * G3;
          vec4 w;
          vec4 d;
          w.x = dot(x, x);
          w.y = dot(x1, x1);
          w.z = dot(x2, x2);
          w.w = dot(x3, x3);
          w = max(0.6 - w, 0.0);
          d.x = dot(random3(s), x);
          d.y = dot(random3(s + i1), x1);
          d.z = dot(random3(s + i2), x2);
          d.w = dot(random3(s + 1.0), x3);
          w *= w;
          w *= w;
          d *= w;
          return dot(d, vec4(52.0));
        }

        float snoiseFractal(vec3 m) {
          return 0.5333333 * snoise(m)
            + 0.2666667 * snoise(2.0 * m)
            + 0.1333333 * snoise(4.0 * m)
            + 0.0666667 * snoise(8.0 * m);
        }
      `+t.fragmentShader,t.fragmentShader=t.fragmentShader.replace("#include <transmission_pars_fragment>",`
          #ifdef USE_TRANSMISSION
            uniform float _transmission;
            uniform float thickness;
            uniform float attenuationDistance;
            uniform vec3 attenuationColor;
            uniform sampler2D refractionEnvMap;
            uniform float useEnvMapRefraction;
            #ifdef USE_TRANSMISSIONMAP
              uniform sampler2D transmissionMap;
            #endif
            #ifdef USE_THICKNESSMAP
              uniform sampler2D thicknessMap;
            #endif
            uniform vec2 transmissionSamplerSize;
            uniform sampler2D transmissionSamplerMap;
            uniform mat4 modelMatrix;
            uniform mat4 projectionMatrix;
            varying vec3 vWorldPosition;

            vec3 getVolumeTransmissionRay(
              const in vec3 n,
              const in vec3 v,
              const in float thicknessValue,
              const in float ior,
              const in mat4 modelMatrix
            ) {
              vec3 refractionVector = refract(-v, normalize(n), 1.0 / ior);
              vec3 modelScale;
              modelScale.x = length(vec3(modelMatrix[0].xyz));
              modelScale.y = length(vec3(modelMatrix[1].xyz));
              modelScale.z = length(vec3(modelMatrix[2].xyz));
              return normalize(refractionVector) * thicknessValue * modelScale;
            }

            float applyIorToRoughness(
              const in float roughnessValue,
              const in float ior
            ) {
              return roughnessValue * clamp(ior * 2.0 - 2.0, 0.0, 1.0);
            }

            vec2 directionToEquirectUv(const in vec3 direction) {
              vec3 dir = normalize(direction);
              vec2 uv = vec2(
                atan(dir.z, dir.x) * 0.15915494309189535 + 0.5,
                asin(clamp(dir.y, -1.0, 1.0)) * 0.3183098861837907 + 0.5
              );

              return vec2(fract(uv.x), 1.0 - clamp(uv.y, 0.0, 1.0));
            }

            vec4 getTransmissionSample(
              const in vec2 fragCoord,
              const in vec3 transmissionDirection,
              const in float roughnessValue,
              const in float ior
            ) {
              if (useEnvMapRefraction > 0.5) {
                return texture2D(
                  refractionEnvMap,
                  directionToEquirectUv(transmissionDirection)
                );
              }

              float framebufferLod =
                log2(transmissionSamplerSize.x) *
                applyIorToRoughness(roughnessValue, ior);
              return texture2D(buffer, fragCoord.xy);
            }

            vec3 applyVolumeAttenuation(
              const in vec3 radiance,
              const in float transmissionDistance,
              const in vec3 attenuationColorValue,
              const in float attenuationDistanceValue
            ) {
              if (isinf(attenuationDistanceValue)) {
                return radiance;
              }

              vec3 attenuationCoefficient =
                -log(attenuationColorValue) / attenuationDistanceValue;
              vec3 transmittance =
                exp(-attenuationCoefficient * transmissionDistance);

              return transmittance * radiance;
            }

            vec4 getIBLVolumeRefraction(
              const in vec3 n,
              const in vec3 v,
              const in float roughnessValue,
              const in vec3 diffuseColor,
              const in vec3 specularColor,
              const in float specularF90,
              const in vec3 position,
              const in mat4 modelMatrix,
              const in mat4 viewMatrix,
              const in mat4 projMatrix,
              const in float ior,
              const in float thicknessValue,
              const in vec3 attenuationColorValue,
              const in float attenuationDistanceValue
            ) {
              vec3 transmissionRay = getVolumeTransmissionRay(
                n,
                v,
                thicknessValue,
                ior,
                modelMatrix
              );
              vec3 refractedRayExit = position + transmissionRay;
              vec4 ndcPos =
                projMatrix * viewMatrix * vec4(refractedRayExit, 1.0);
              vec2 refractionCoords = ndcPos.xy / ndcPos.w;
              refractionCoords += 1.0;
              refractionCoords /= 2.0;
              vec3 transmissionDirection = normalize(transmissionRay);
              vec4 transmittedLight = getTransmissionSample(
                refractionCoords,
                transmissionDirection,
                roughnessValue,
                ior
              );
              vec3 attenuatedColor = applyVolumeAttenuation(
                transmittedLight.rgb,
                length(transmissionRay),
                attenuationColorValue,
                attenuationDistanceValue
              );
              vec3 F = EnvironmentBRDF(
                n,
                v,
                specularColor,
                specularF90,
                roughnessValue
              );
              return vec4(
                (1.0 - F) * attenuatedColor * diffuseColor,
                transmittedLight.a
              );
            }
          #endif
        `),t.fragmentShader=t.fragmentShader.replace("#include <transmission_fragment>",`
          material.transmission = _transmission;
          material.transmissionAlpha = 1.0;
          material.thickness = thickness;
          material.attenuationDistance = attenuationDistance;
          material.attenuationColor = attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            material.transmission *= texture2D(transmissionMap, vUv).r;
          #endif
          #ifdef USE_THICKNESSMAP
            material.thickness *= texture2D(thicknessMap, vUv).g;
          #endif

          vec3 pos = vWorldPosition;
          float runningSeed = 0.0;
          vec3 v = normalize(cameraPosition - pos);
          vec3 n = inverseTransformDirection(normal, viewMatrix);
          vec3 transmission = vec3(0.0);
          float transmissionR;
          float transmissionG;
          float transmissionB;
          float randomCoords = rand(runningSeed++);
          float thicknessSmear =
            thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
          vec3 distortionNormal = vec3(0.0);
          vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;

          if (distortion > 0.0) {
            distortionNormal = distortion * vec3(
              snoiseFractal(vec3(pos * distortionScale + temporalOffset)),
              snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)),
              snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset))
            );
          }

          for (float i = 0.0; i < ${e}.0; i++) {
            vec3 sampleNorm = normalize(
              n +
              roughnessFactor * roughnessFactor * 2.0 *
              normalize(
                vec3(
                  rand(runningSeed++) - 0.5,
                  rand(runningSeed++) - 0.5,
                  rand(runningSeed++) - 0.5
                )
              ) *
              pow(rand(runningSeed++), 0.33) +
              distortionNormal
            );

            transmissionR = getIBLVolumeRefraction(
              sampleNorm,
              v,
              material.roughness,
              material.diffuseColor,
              material.specularColor,
              material.specularF90,
              pos,
              modelMatrix,
              viewMatrix,
              projectionMatrix,
              material.ior,
              material.thickness + thicknessSmear * (i + randomCoords) / float(${e}),
              material.attenuationColor,
              material.attenuationDistance
            ).r;

            transmissionG = getIBLVolumeRefraction(
              sampleNorm,
              v,
              material.roughness,
              material.diffuseColor,
              material.specularColor,
              material.specularF90,
              pos,
              modelMatrix,
              viewMatrix,
              projectionMatrix,
              material.ior * (1.0 + chromaticAberration * (i + randomCoords) / float(${e})),
              material.thickness + thicknessSmear * (i + randomCoords) / float(${e}),
              material.attenuationColor,
              material.attenuationDistance
            ).g;

            transmissionB = getIBLVolumeRefraction(
              sampleNorm,
              v,
              material.roughness,
              material.diffuseColor,
              material.specularColor,
              material.specularF90,
              pos,
              modelMatrix,
              viewMatrix,
              projectionMatrix,
              material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${e})),
              material.thickness + thicknessSmear * (i + randomCoords) / float(${e}),
              material.attenuationColor,
              material.attenuationDistance
            ).b;

            transmission.r += transmissionR;
            transmission.g += transmissionG;
            transmission.b += transmissionB;
          }

          transmission /= ${e}.0;
          totalDiffuse = mix(totalDiffuse, transmission.rgb, material.transmission);
        `)},Object.keys(this.halftoneUniforms).forEach(e=>{Object.defineProperty(this,e,{configurable:!0,enumerable:!0,get:()=>this.halftoneUniforms[e]?.value,set:t=>{this.halftoneUniforms[e].value=t}})})}}function A(e,t){e.generateMipmaps=!0,e.magFilter=x.VV,e.minFilter=x.Q4,e.anisotropy=Math.min(t.capabilities.getMaxAnisotropy(),8)}function D(e){let t=new x.P6;return t.background=e??k,t.backgroundIntensity=1,t}function Y(e,t){let a=new y.c(e),n=t?a.fromEquirectangular(t).texture:a.fromScene(new b,.04).texture;return a.dispose(),n}async function P(e){var t;let a,n=await (t=x.nj,a=new x.H5,new Promise((n,o)=>{a.load("/images/halftone/environment.jpg",a=>{a.colorSpace=t,A(a,e),n(a)},void 0,o)})),o=function(e,t){let a,{width:n,height:o}=(a=e.image,{width:a?.naturalWidth??a?.width??void 0,height:a?.naturalHeight??a?.height??void 0});if(!n||!o)return e;let i=document.createElement("canvas");i.width=n,i.height=o;let r=i.getContext("2d");if(!r)return e;let s=n/1.55,l=o/1.55;r.drawImage(e.image,(n-s)/2,(o-l)/2,s,l,0,0,n,o);let u=new x.Nk(i);return u.colorSpace=e.colorSpace,u.wrapS=x.Jr,u.wrapT=x.Jr,A(u,t),u.needsUpdate=!0,u}(n,e);return o!==n&&n.dispose(),o.mapping=x.qM,o.wrapS=x.Jr,o.wrapT=x.Jr,o.needsUpdate=!0,{backgroundTexture:o,environmentTexture:Y(e,o),glassTransmissionScene:D(o)}}async function I(e){let t=M(e);try{let a=await P(e);return{glassBackgroundTexture:a.backgroundTexture,glassEnvironmentTexture:a.environmentTexture,glassTransmissionScene:a.glassTransmissionScene,solidEnvironmentTexture:t}}catch{let a;return{glassBackgroundTexture:((a=new x.U7(new Uint8Array([3,3,3,255]),1,1,x.W1)).colorSpace=x.nj,a.wrapS=x.Jr,a.wrapT=x.Jr,a.mapping=x.qM,A(a,e),a.needsUpdate=!0,a),glassEnvironmentTexture:Y(e),glassTransmissionScene:D(),solidEnvironmentTexture:t}}}let X=function(e,t,a){let n="glass"===t.surface,o=t.thickness*R,i=.18+.12*t.environmentPower,r=Math.max(4*o,.12);e.color.set(n?0xffffff:t.color),e.roughness=t.roughness,e.metalness=t.metalness,e.envMap=n?a.glassEnvironmentTexture:a.solidEnvironmentTexture,e.envMapIntensity=n?i:.25,e.clearcoat=+!!n,e.clearcoatRoughness=n?Math.max(.25*t.roughness,.01):.08,e.reflectivity=n?.98:.5,e.transmission=0,e._transmission=+!!n,e.refractionEnvMap=n?a.glassBackgroundTexture:null,e.useEnvMapRefraction=+!!n,e.thickness=n?o:0,e.ior=n?t.refraction:1.5,e.buffer=null,e.bumpMap=null,e.bumpScale=0,e.roughnessMap=null,e.side=x.de,e.transparent=!1,e.opacity=1,e.depthWrite=!0,e.attenuationColor.set(n?t.color:0xffffff),e.attenuationDistance=n?r:1/0,e.anisotropicBlur=n?x.rA.lerp(.03,.12,t.roughness):.1,e.chromaticAberration=.05*!n,e.distortion=0,e.distortionScale=.5,e.temporalDistortion=0,e.userData.halftoneIsGlass=n,e.userData.halftoneGlassBacksideThickness=n?2*o:0,e.userData.halftoneGlassBacksideEnvIntensity=n?2.8*i:0,e.userData.halftoneUseEnvironmentRefraction=n,e.needsUpdate=!0},B=function(e){let{camera:t,elapsedTime:a,material:n,mesh:o,outputTarget:i,renderer:r,scene:s,transmissionBacksideTarget:l,transmissionTarget:u,transmissionScene:c}=e,d=!0===n.userData.halftoneIsGlass;if(n.time=a,!d){r.setRenderTarget(i),r.clear(),r.render(s,t);return}if(!0===n.userData.halftoneUseEnvironmentRefraction){n.buffer=null,r.setRenderTarget(i),r.clear(),r.render(s,t);return}let m=r.toneMapping,f=o.visible,g=s.background,p=s.backgroundIntensity,h=n.side,v=n.thickness,w=n.envMapIntensity,y=n.userData.halftoneGlassBacksideThickness??v,S=n.userData.halftoneGlassBacksideEnvIntensity??w;r.toneMapping=x.rK,c?(r.setRenderTarget(l),r.clear(),r.render(c,t)):(s.background=k,s.backgroundIntensity=1,o.visible=!1,r.setRenderTarget(l),r.clear(),r.render(s,t),o.visible=f),n.buffer=l.texture,n.thickness=y,n.side=x.tw,n.envMapIntensity=S,r.setRenderTarget(u),r.clear(),r.render(s,t),n.buffer=u.texture,n.thickness=v,n.side=h,n.envMapIntensity=w,c||(s.background=g,s.backgroundIntensity=p),r.setRenderTarget(i),r.clear(),r.render(s,t),r.toneMapping=m},T=function(e){e.glassBackgroundTexture.dispose(),e.glassEnvironmentTexture!==e.glassBackgroundTexture&&e.glassEnvironmentTexture.dispose(),e.glassTransmissionScene.traverse(e=>{(e.geometry&&e.geometry.dispose(),Array.isArray(e.material))?e.material.forEach(e=>e.dispose()):e.material?.dispose?.()}),e.solidEnvironmentTexture.dispose()};var z=e.i(878707);let F=g.f.referencePreviewDistance,V=g.f.minFootprintScale;function L(e,t,a){let n=t*Math.PI/180;e.position.set(5*Math.cos(n),a,5*Math.sin(n))}function H(e){return e?Math.max(e.width,0)*Math.max(e.height,0):0}function O({camera:e,localBounds:t,meshMatrixWorld:a,viewportWidth:n,viewportHeight:o}){var i;let s,l,u,c;if(t.isEmpty()||n<=0||o<=0)return null;let d=1/0,m=1/0,f=-1/0,g=-1/0,p=!1;for(let i of function(e){let{min:t,max:a}=e;return[new r.cE(t.x,t.y,t.z),new r.cE(t.x,t.y,a.z),new r.cE(t.x,a.y,t.z),new r.cE(t.x,a.y,a.z),new r.cE(a.x,t.y,t.z),new r.cE(a.x,t.y,a.z),new r.cE(a.x,a.y,t.z),new r.cE(a.x,a.y,a.z)]}(t)){if(i.applyMatrix4(a).project(e),!Number.isFinite(i.x)||!Number.isFinite(i.y)||!Number.isFinite(i.z))continue;p=!0;let t=(.5*i.x+.5)*n,r=(1-(.5*i.y+.5))*o;d=Math.min(d,t),m=Math.min(m,r),f=Math.max(f,t),g=Math.max(g,r)}return p?(s=Math.max((i={x:d,y:m,width:f-d,height:g-m}).x,0),l=Math.max(i.y,0),u=Math.min(i.x+i.width,n),c=Math.min(i.y+i.height,o),u<=s||c<=l?null:{x:s,y:l,width:u-s,height:c-l}):null}async function U({container:e,geometry:t,settings:a,initialPose:n,reducedMotion:o=!1,onFirstFrame:i}){if("band"!==a.halftone.variant)throw Error("createBandSession: settings must use the band variant.");let s=a.halftone,l=a.animation,{getWidth:u,getHeight:c,getVirtualWidth:g,getVirtualHeight:x}=(0,p.f)(e),y=(0,m.f)({antialias:!1,alpha:!0});if(null===y)return null;y.outputColorSpace=r.nj,y.setPixelRatio(1),y.setClearColor(0,0),y.setSize(g(),x(),!1);let S=y.domElement;S.style.cursor=o?"default":"grab",S.style.display="block",S.style.height="100%",S.style.touchAction="none",S.style.width="100%",e.appendChild(S);let b=await I(y),E=new r.P6;E.background=null;let M=new r.zm(45,u()/c(),.1,100);M.position.z=a.previewDistance;let R=new r.ya(0xffffff,a.lighting.intensity);L(R,a.lighting.angleDegrees,a.lighting.height),E.add(R);let k=new r.ya(0xffffff,a.lighting.fillIntensity);k.position.set(-3,-1,1),E.add(k),E.add(new r.C3(0xffffff,a.lighting.ambientIntensity));let A=new C;X(A,a.material,b);let D=new r.kE(t,A);E.add(D);let Y=(0,f.f)(g(),x()),P=(0,f.f)(g(),x()),W=(0,f.f)(g(),x()),N=new r.CQ(2,2),j=new r.Sc(-1,1,1,-1,0,1),G=new r.Zg({transparent:!0,uniforms:{tScene:{value:Y.texture},tGlow:{value:Y.texture},effectResolution:{value:new r.wq(g(),x())},logicalResolution:{value:new r.wq(g(),x())},tile:{value:s.scale},halftonePower:{value:s.power},halftoneWidth:{value:s.width},applyToDarkAreas:{value:+("dark"===s.toneTarget)},dashColor:{value:new r.Es(s.dashColor)},hoverDashColor:{value:new r.Es(s.hoverDashColor)},time:{value:0},waveAmount:{value:0},waveSpeed:{value:1},footprintScale:{value:1},interactionUv:{value:new r.wq(.5,.5)},interactionVelocity:{value:new r.wq(0,0)},dragOffset:{value:new r.wq(0,0)},hoverHalftoneActive:{value:0},hoverHalftonePowerShift:{value:0},hoverHalftoneRadius:{value:.2},hoverHalftoneWidthShift:{value:0},hoverLightStrength:{value:0},hoverLightRadius:{value:.2},hoverFlowStrength:{value:0},hoverFlowRadius:{value:.18},dragFlowStrength:{value:0},cropToBounds:{value:0}},vertexShader:h.f.vertex,fragmentShader:z.f.fragment}),_=new r.P6;_.add(new r.kE(N,G));let Z=v(n),q=e=>{let t=S.getBoundingClientRect();Z.mouseX=r.rA.clamp((e.clientX-t.left)/Math.max(t.width,1),0,1),Z.mouseY=r.rA.clamp((e.clientY-t.top)/Math.max(t.height,1),0,1)},$=()=>{null!==Z.activePointerId&&(S.releasePointerCapture?.(Z.activePointerId),Z.activePointerId=null),Z.dragging=!1,S.style.cursor="grab"},J=e=>{q(e),(l.followDragEnabled||l.autoRotateEnabled)&&(Z.dragging=!0,Z.activePointerId=e.pointerId,S.setPointerCapture?.(e.pointerId),Z.pointerX=e.clientX,Z.pointerY=e.clientY,Z.velocityX=0,Z.velocityY=0,S.style.cursor="grabbing")},K=e=>{if(q(e),Z.pointerInside=!0,!Z.dragging)return;let t=(e.clientX-Z.pointerX)*l.dragSens,a=(e.clientY-Z.pointerY)*l.dragSens;Z.velocityX=a,Z.velocityY=t,Z.targetRotationY+=t,Z.targetRotationX+=a,Z.pointerX=e.clientX,Z.pointerY=e.clientY},Q=()=>{Z.pointerInside=!1,Z.mouseX=.5,Z.mouseY=.5};o||(S.addEventListener("pointerdown",J),S.addEventListener("pointermove",K),S.addEventListener("pointerleave",Q),S.addEventListener("pointerup",$),S.addEventListener("pointercancel",$),window.addEventListener("blur",$));let ee=!1,et=({deltaSeconds:e,elapsedSeconds:t})=>{let o,u=(n?.timeElapsed??0)+t;G.uniforms.time.value=u,G.uniforms.waveAmount.value=l.waveEnabled?l.waveAmount:0,G.uniforms.waveSpeed.value=l.waveSpeed;let c=n?.rotationX??0,d=n?.rotationY??0,m=n?.rotationZ??0,f=0,p=1,h=a.lighting.angleDegrees,v=a.lighting.height;if(l.autoRotateEnabled&&(Z.autoElapsed+=e,d+=Z.autoElapsed*l.autoSpeed,c+=Math.sin(.2*Z.autoElapsed)*l.autoWobble),l.floatEnabled){let e=u*l.floatSpeed,t=l.driftAmount*Math.PI/180;f+=Math.sin(e)*l.floatAmplitude,c+=Math.sin(.72*e)*t*.45,m+=Math.cos(.93*e)*t*.3}if(l.breatheEnabled&&(p*=1+Math.sin(u*l.breatheSpeed)*l.breatheAmount),l.rotateEnabled){Z.rotateElapsed+=e;let t=l.rotatePingPong?Math.sin(Z.rotateElapsed*l.rotateSpeed)*Math.PI:Z.rotateElapsed*l.rotateSpeed;if("axis"===l.rotatePreset){let e=t*(l.rotateAxis.startsWith("-")?-1:1),a=l.rotateAxis;("x"===a||"xy"===a||"-x"===a||"-xy"===a)&&(c+=e),("y"===a||"xy"===a||"-y"===a||"-xy"===a)&&(d+=e),("z"===a||"-z"===a)&&(m+=e)}else"lissajous"===l.rotatePreset?(c+=.65*Math.sin(.85*t),d+=1.05*Math.sin(1.35*t+.8),m+=.32*Math.sin(.55*t+1.6)):"orbit"===l.rotatePreset?(c+=.42*Math.sin(.75*t),d+=1.2*Math.cos(t),m+=.24*Math.sin(1.25*t)):"tumble"===l.rotatePreset&&(c+=.55*t,d+=.9*Math.sin(.8*t),m+=.38*Math.cos(1.1*t))}if(l.lightSweepEnabled){let e=u*l.lightSweepSpeed;h+=Math.sin(e)*l.lightSweepRange,v+=Math.cos(.85*e)*l.lightSweepHeightRange}let S=c,k=d,C=.12;if(l.followHoverEnabled){let e=l.hoverRange*Math.PI/180;(l.hoverReturn||.5!==Z.mouseX||.5!==Z.mouseY)&&(S+=(Z.mouseY-.5)*e,k+=(Z.mouseX-.5)*e),C=l.hoverEase}if(l.followDragEnabled&&(!Z.dragging&&l.dragMomentum&&(Z.targetRotationX+=Z.velocityX,Z.targetRotationY+=Z.velocityY,Z.velocityX*=1-l.dragFriction,Z.velocityY*=1-l.dragFriction),S+=Z.targetRotationX,k+=Z.targetRotationY,C=l.dragFriction),!l.autoRotateEnabled||l.followHoverEnabled||l.followDragEnabled||(S=c+Z.targetRotationX,k=d+Z.targetRotationY,Z.dragging&&(S=Z.targetRotationX,k=Z.targetRotationY),C=.08),l.springReturnEnabled){let e=w({current:Z.rotationX,damping:l.springDamping,strength:l.springStrength,target:S,velocity:Z.rotationVelocityX}),t=w({current:Z.rotationY,damping:l.springDamping,strength:l.springStrength,target:k,velocity:Z.rotationVelocityY}),a=w({current:Z.rotationZ,damping:l.springDamping,strength:l.springStrength,target:m,velocity:Z.rotationVelocityZ});Z.rotationX=e.value,Z.rotationY=t.value,Z.rotationZ=a.value,Z.rotationVelocityX=e.velocity,Z.rotationVelocityY=t.velocity,Z.rotationVelocityZ=a.velocity}else Z.rotationX+=(S-Z.rotationX)*C,Z.rotationY+=(k-Z.rotationY)*C,Z.rotationZ+=(m-Z.rotationZ)*(l.rotatePingPong?.18:.12);if(D.rotation.set(Z.rotationX,Z.rotationY,Z.rotationZ),D.position.y=f,D.scale.setScalar(p),l.cameraParallaxEnabled){let e=l.cameraParallaxAmount,t=l.cameraParallaxEase,n=(Z.mouseX-.5)*2,o=(.5-Z.mouseY)*2,i=n*e,r=o*e*.7,s=Math.cos(r)*a.previewDistance;M.position.x+=(Math.sin(i)*s-M.position.x)*t,M.position.y+=(Math.sin(r)*a.previewDistance*.85-M.position.y)*t,M.position.z+=(Math.cos(i)*s-M.position.z)*t}else M.position.x+=(0-M.position.x)*.12,M.position.y+=(0-M.position.y)*.12,M.position.z+=(a.previewDistance-M.position.z)*.12;let I=new r.cE(0,.2*f,0);M.lookAt(I),L(R,h,v),(G.uniforms.footprintScale.value=(D.geometry.boundingBox||D.geometry.computeBoundingBox(),(o=D.geometry.boundingBox)?(D.updateMatrixWorld(),M.updateMatrixWorld(),function({camera:e,localBounds:t,lookAtTarget:a,meshMatrixWorld:n,viewportWidth:o,viewportHeight:i}){let s=O({camera:e,localBounds:t,meshMatrixWorld:n,viewportWidth:o,viewportHeight:i}),l=e.clone(),u=l.position.clone().sub(a),c=u.lengthSq()>0?u.setLength(F):new r.cE(0,0,F);l.position.copy(a).add(c),l.lookAt(a),l.updateProjectionMatrix(),l.updateMatrixWorld(!0);let d=O({camera:l,localBounds:t,meshMatrixWorld:n,viewportWidth:o,viewportHeight:i}),m=H(s),f=H(d);return m<=0||f<=0?1:Math.max(Math.sqrt(m/f),V)}({camera:M,localBounds:o,lookAtTarget:I,meshMatrixWorld:D.matrixWorld,viewportWidth:g(),viewportHeight:x()})):1),s.enabled)?(B({camera:M,elapsedTime:u,material:A,mesh:D,outputTarget:Y,renderer:y,scene:E,transmissionBacksideTarget:P,transmissionTarget:W,transmissionScene:b.glassTransmissionScene}),y.setRenderTarget(null),y.clear(),y.render(_,j),ee||(ee=!0,i?.())):B({camera:M,elapsedTime:u,material:A,mesh:D,outputTarget:null,renderer:y,scene:E,transmissionBacksideTarget:P,transmissionTarget:W,transmissionScene:b.glassTransmissionScene})},ea="u"<typeof ResizeObserver?null:new ResizeObserver(()=>{let e=g(),t=x();y.setSize(e,t,!1),M.aspect=u()/c(),M.updateProjectionMatrix(),Y.setSize(e,t),P.setSize(e,t),W.setSize(e,t),G.uniforms.effectResolution.value.set(e,t),G.uniforms.logicalResolution.value.set(e,t)});function en(){G.dispose(),N.dispose(),A.dispose(),Y.dispose(),P.dispose(),W.dispose(),T(b),y?.dispose(),S.parentNode===e&&e.removeChild(S)}if(ea?.observe(e),o)return et({deltaSeconds:0,elapsedSeconds:0,timestamp:0}),{dispose(){ea?.disconnect(),en()}};let eo=(0,d.f)({renderFrame:et,target:e,targetVisibilityOptions:{rootMargin:"100px"}});return eo.start(),{dispose(){eo.dispose(),ea?.disconnect(),S.removeEventListener("pointerdown",J),S.removeEventListener("pointermove",K),S.removeEventListener("pointerleave",Q),S.removeEventListener("pointerup",$),S.removeEventListener("pointercancel",$),window.removeEventListener("blur",$),en()}}}let W={fragment:`
  precision highp float;

  uniform sampler2D tScene;
  uniform sampler2D tGlow;
  uniform vec2 resolution;
  uniform float numRows;
  uniform float glowStr;
  uniform float contrast;
  uniform float power;
  uniform float shading;
  uniform float baseInk;
  uniform float maxBar;
  uniform float rowMerge;
  uniform float cellRatio;
  uniform float cutoff;
  uniform float highlightOpen;
  uniform float shadowGrouping;
  uniform float shadowCrush;
  uniform vec3 dashColor;
  uniform float time;
  uniform float waveAmount;
  uniform float waveSpeed;
  uniform float distanceScale;

  varying vec2 vUv;

  void main() {
    float rowH = resolution.y / (numRows * distanceScale);
    float row = floor(gl_FragCoord.y / rowH);
    float rowFrac = gl_FragCoord.y / rowH - row;
    float rowV = (row + 0.5) * rowH / resolution.y;
    float dy = abs(rowFrac - 0.5);

    float waveOffset = waveAmount * sin(time * waveSpeed + row * 0.5) * rowH;
    float effectiveX = gl_FragCoord.x + waveOffset;
    float cellW = rowH * cellRatio;
    float cellIdx = floor(effectiveX / cellW);
    float cellFrac = (effectiveX - cellIdx * cellW) / cellW;
    float cellU = (cellIdx + 0.5) * cellW / resolution.x;

    vec2 sampleUv = vec2(
      clamp(cellU, 0.0, 1.0),
      clamp(rowV, 0.0, 1.0)
    );

    vec4 sceneSample = texture2D(tScene, sampleUv);
    vec4 glowCell = texture2D(tGlow, sampleUv);

    float mask = smoothstep(0.02, 0.08, sceneSample.a);
    float lum = dot(sceneSample.rgb, vec3(0.299, 0.587, 0.114));
    float avgLum = dot(glowCell.rgb, vec3(0.299, 0.587, 0.114));
    float detail = lum - avgLum;

    float litLum = lum + max(detail, 0.0) * shading
      - max(-detail, 0.0) * shading * 0.55;
    litLum = clamp((litLum - cutoff) / max(1.0 - cutoff, 0.001), 0.0, 1.0);
    litLum = pow(litLum, max(contrast, 0.25));

    float darkness = 1.0 - litLum;
    float groupedLum = clamp((avgLum - cutoff) / max(1.0 - cutoff, 0.001), 0.0, 1.0);
    groupedLum = pow(groupedLum, max(contrast * 0.9, 0.25));
    float groupedDarkness = 1.0 - groupedLum;
    darkness = mix(darkness, max(darkness, groupedDarkness), shadowGrouping);
    darkness = clamp(
      (darkness - highlightOpen) / max(1.0 - highlightOpen, 0.001),
      0.0,
      1.0
    );

    float shadowMask = smoothstep(0.42, 0.96, darkness);
    darkness = mix(darkness, mix(darkness, 1.0, shadowMask), shadowCrush);

    float inkBase = baseInk * smoothstep(0.03, 0.24, darkness);
    float ink = mix(inkBase, 1.0, darkness);
    float fill = pow(ink, 1.05) * power;
    fill = clamp(fill, 0.0, 1.0) * mask;

    float dynamicBarHalf = mix(0.08, maxBar, smoothstep(0.03, 0.85, ink));
    float dynamicBarHalfY = min(
      dynamicBarHalf + rowMerge * smoothstep(0.42, 0.98, ink),
      0.78
    );
    float dx2 = abs(cellFrac - 0.5);
    float halfFill = fill * 0.5;
    float bodyHalfW = max(halfFill - dynamicBarHalf * (rowH / cellW), 0.0);
    float capRX = dynamicBarHalf * rowH;
    float capRY = dynamicBarHalfY * rowH;

    float inDash = 0.0;
    if (dx2 <= bodyHalfW) {
      float edgeDist = dynamicBarHalfY - dy;
      inDash = smoothstep(-0.03, 0.03, edgeDist);
    } else {
      float cdx = (dx2 - bodyHalfW) * cellW;
      float cdy = dy * rowH;
      float ellipseDist = sqrt(
        (cdx * cdx) / max(capRX * capRX, 0.0001) +
        (cdy * cdy) / max(capRY * capRY, 0.0001)
      );
      inDash = 1.0 - smoothstep(1.0 - 0.08, 1.0 + 0.08, ellipseDist);
    }

    inDash *= step(0.001, ink) * mask;
    inDash *= 1.0 + 0.03 * sin(time * 0.8 + row * 0.1);

    vec4 glow = texture2D(tGlow, vUv);
    float glowLum = dot(glow.rgb, vec3(0.299, 0.587, 0.114));
    float halo = glowLum * glowStr * 0.25 * (1.0 - inDash);
    float sharp = smoothstep(0.3, 0.5, inDash + halo);
    vec3 color = dashColor * sharp;

    gl_FragColor = vec4(color, sharp);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`},N=g.f.pointerEasingDefault,j=g.f.pointerEasingAutorotateDrag,G=g.f.autorotateVelocityDecay,_={intensity:1.5,fillIntensity:.15,ambientIntensity:.08,angleDegrees:45,height:2},Z={intensity:3,fillIntensity:0,ambientIntensity:.3,angleDegrees:53,height:2},q={surface:"solid",color:0xd4d0c8,roughness:.42,metalness:.16,thickness:150,refraction:2,environmentPower:5},$={surface:"glass",color:8224125,roughness:0,metalness:0,thickness:15.58,refraction:2,environmentPower:5},J={variant:"band",enabled:!0,scale:24.72,power:-.07,toneTarget:"light",width:.46,dashColor:4864245,hoverDashColor:4864245},K={variant:"rows",enabled:!0,numRows:150,glowStrength:0,contrast:1.2,power:1.1,shading:3,baseInk:.19,maxBar:.35,rowMerge:.08,cellRatio:2.2,cutoff:.02,highlightOpen:.04,shadowGrouping:.18,shadowCrush:.14,dashColor:4864245},Q={autoRotateEnabled:!0,breatheEnabled:!1,breatheAmount:.04,breatheSpeed:.8,floatEnabled:!1,floatAmplitude:.16,floatSpeed:.8,driftAmount:8,cameraParallaxEnabled:!1,cameraParallaxAmount:.3,cameraParallaxEase:.08,lightSweepEnabled:!1,lightSweepRange:28,lightSweepHeightRange:.5,lightSweepSpeed:.7,followHoverEnabled:!1,followDragEnabled:!1,hoverHalftoneEnabled:!1,hoverLightEnabled:!1,dragFlowEnabled:!1,rotateEnabled:!1,autoSpeed:.2,autoWobble:.3,hoverRange:25,hoverEase:.08,hoverReturn:!0,dragSens:.008,dragFriction:.08,dragMomentum:!0,rotateAxis:"y",rotatePreset:"axis",rotateSpeed:.2,rotatePingPong:!1,springDamping:.72,springReturnEnabled:!1,springStrength:.18,hoverHalftonePowerShift:.42,hoverHalftoneRadius:.2,hoverHalftoneWidthShift:-.18,hoverLightIntensity:.8,hoverLightRadius:.2,dragFlowDecay:.08,dragFlowRadius:.24,dragFlowStrength:1.8,waveEnabled:!1,waveSpeed:1,waveAmount:2},ee={...Q,followDragEnabled:!0,autoSpeed:.15,rotateSpeed:.1},et=(0,a.f)("div")({name:"SceneContainer",class:"slwus6m",propsAsIs:!1});e.s(["HalftoneModelScene",0,function({modelUrl:e,settings:a,initialPose:l,geometryOptions:w}){let x=(0,n.useRef)(null),{reducedMotion:y}=(0,i.f)(),S=(0,n.useCallback)(()=>(function(e,t={}){let a=`${e}#${JSON.stringify(t)}`;if(c.has(a))return Promise.reject(Error(`GLB previously failed: ${e}`));let n=u.get(a);if(n)return n;let o=new r.im;o.setURLModifier(e=>/\.(png|jpe?g|webp|gif|bmp)$/i.test(e)?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO8B7Q8AAAAASUVORK5CYII=":e);let i=new s.f(o).loadAsync(e).then(a=>{a.scene.updateMatrixWorld(!0);let n=[];if(a.scene.traverse(e=>{if(!(e instanceof r.kE)||!e.geometry)return;let t=e.geometry.clone();t.attributes.normal||t.computeVertexNormals(),t.applyMatrix4(e.matrixWorld),n.push(t)}),0===n.length)throw Error(`GLB contains no mesh geometry: ${e}`);return function(e,{scaleTarget:t,legacyNormalization:a=!1,postRotateZ:n=0}){e.computeBoundingBox();let o=new r.cE,i=new r.cE;if(e.boundingBox?.getCenter(o),e.boundingBox?.getSize(i),e.translate(-o.x,-o.y,-o.z),!a){let t=[i.x,i.y,i.z],a=t.indexOf(Math.min(...t));0===a?e.applyMatrix4(new r.nd().makeRotationY(Math.PI/2)):1===a&&e.applyMatrix4(new r.nd().makeRotationX(Math.PI/2))}e.computeBoundingBox(),e.computeBoundingSphere();let s=e.boundingSphere?.radius||1,l=a?(t??2.75)/Math.max(i.x,i.y,i.z,.001):(t??1.6)/s;e.scale(l,l,l),e.computeBoundingBox();let u=new r.cE;return e.boundingBox?.getCenter(u),e.translate(-u.x,-u.y,-u.z),0!==n&&e.rotateZ(n),e.computeVertexNormals(),e.computeBoundingBox(),e.computeBoundingSphere(),e}(function(e){if(1===e.length)return e[0];let t=0,a=0,n=!1,o=e.map(e=>{let o=e.attributes.position,i=e.attributes.normal,r=e.attributes.uv??null,s=e.index,l=s?s.count:o.count;return t+=o.count,a+=l,n=n||null!==r,{index:s,indexCount:l,normal:i,position:o,uv:r,vertexCount:o.count}}),i=new Float32Array(3*t),s=new Float32Array(3*t),l=n?new Float32Array(2*t):null,u=new Uint32Array(a),c=0,d=0;for(let e of o){for(let t=0;t<e.vertexCount;t+=1){let a=(c+t)*3;if(i[a]=e.position.getX(t),i[a+1]=e.position.getY(t),i[a+2]=e.position.getZ(t),s[a]=e.normal.getX(t),s[a+1]=e.normal.getY(t),s[a+2]=e.normal.getZ(t),null!==l){let a=(c+t)*2;l[a]=e.uv?.getX(t)??0,l[a+1]=e.uv?.getY(t)??0}}if(e.index)for(let t=0;t<e.indexCount;t+=1)u[d+t]=e.index.getX(t)+c;else for(let t=0;t<e.indexCount;t+=1)u[d+t]=t+c;c+=e.vertexCount,d+=e.indexCount}let m=new r.ld;return m.setAttribute("position",new r.f5(i,3)),m.setAttribute("normal",new r.f5(s,3)),null!==l&&m.setAttribute("uv",new r.f5(l,2)),m.setIndex(new r.f5(u,1)),m}(n),t)}).catch(e=>{throw u.delete(a),c.add(a),e});return u.set(a,i),i})(e,w),[e]),b=(0,o.f)(S);return(0,n.useEffect)(()=>{let e=x.current;if(null===e||null===b)return;let t=function(e={}){let t=e.material?.surface==="glass"?"glass":"solid",a=e.halftone?.variant==="rows"?{...K,...e.halftone}:{...J,...e.halftone,variant:"band"};return{previewDistance:e.previewDistance??4,modelOffsetY:e.modelOffsetY??0,lighting:{..."glass"===t?Z:_,...e.lighting},material:{..."glass"===t?$:q,...e.material,surface:t},halftone:a,animation:{..."glass"===t?ee:Q,...e.animation}}}(a),n=!1,o=null;return Promise.resolve("rows"===t.halftone.variant?function({container:e,geometry:t,settings:a,initialPose:n,reducedMotion:o=!1,onFirstFrame:i}){var s,l,u,c;let w,x,y,S,b,E,R,k,C,A;if("rows"!==a.halftone.variant)throw Error("createHalftoneSession: only the rows variant is ported.");let D=a.halftone,{getWidth:Y,getHeight:P,getVirtualWidth:I,getVirtualHeight:X}=(0,p.f)(e),B=a.animation.followDragEnabled||a.animation.autoRotateEnabled,T=(0,m.f)({antialias:!1,alpha:!0});if(null===T)return null;T.outputColorSpace=r.nj,T.setPixelRatio(1),T.setClearColor(0,0),T.setSize(I(),X(),!1);let z=T.domElement;z.style.cursor=!o&&B?"grab":"default",z.style.display="block",z.style.height="100%",z.style.touchAction="none",z.style.width="100%",e.appendChild(z);let F=M(T),V=new r.P6;V.background=null;let L=new r.zm(45,Y()/P(),.1,100);L.position.z=a.previewDistance;let H=new r.ya(0xffffff,a.lighting.intensity);s=a.lighting.angleDegrees,l=a.lighting.height,w=s*Math.PI/180,H.position.set(5*Math.cos(w),l,5*Math.sin(w)),V.add(H);let O=new r.ya(0xffffff,a.lighting.fillIntensity);O.position.set(-3,-1,1),V.add(O),V.add(new r.C3(0xffffff,a.lighting.ambientIntensity));let U=new r.Ox({clearcoat:0,clearcoatRoughness:.08,color:a.material.color,envMap:F,envMapIntensity:.25,metalness:a.material.metalness,reflectivity:.5,roughness:a.material.roughness,transmission:0}),_=new r.kE(t,U);_.position.y=a.modelOffsetY,V.add(_),L.lookAt(0,.2*a.modelOffsetY,0);let Z=(0,f.f)(I(),X()),q=(u=I(),c=X(),y=(x=(e,t)=>new r.qL(e,t,{format:r.W1,magFilter:r.VV,minFilter:r.VV}))(u,c),S=x(u,c),E=(b=(e,t)=>new r.Zg({uniforms:{dir:{value:new r.wq(e,t)},res:{value:new r.wq(u,c)},tInput:{value:null}},vertexShader:h.f.vertex,fragmentShader:h.f.fragment}))(1,0),R=b(0,1),k=new r.CQ(2,2),(C=new r.P6).add(new r.kE(k,E)),(A=new r.P6).add(new r.kE(k,R)),{setSize:(e,t)=>{y.setSize(e,t),S.setSize(e,t),E.uniforms.res.value.set(e,t),R.uniforms.res.value.set(e,t)},render:(e,t,a)=>{E.uniforms.tInput.value=t,e.setRenderTarget(y),e.render(C,a),R.uniforms.tInput.value=y.texture,e.setRenderTarget(S),e.render(A,a),E.uniforms.tInput.value=S.texture,e.setRenderTarget(y),e.render(C,a),R.uniforms.tInput.value=y.texture,e.setRenderTarget(S),e.render(A,a)},targetB:S,dispose:()=>{E.dispose(),R.dispose(),k.dispose(),y.dispose(),S.dispose()}}),$=new r.CQ(2,2),J=new r.Sc(-1,1,1,-1,0,1),K=new r.Zg({transparent:!0,uniforms:{baseInk:{value:D.baseInk},cellRatio:{value:D.cellRatio},contrast:{value:D.contrast},cutoff:{value:D.cutoff},dashColor:{value:new r.Es(D.dashColor)},distanceScale:{value:a.previewDistance/g.f.referencePreviewDistance},glowStr:{value:D.glowStrength},highlightOpen:{value:D.highlightOpen},maxBar:{value:D.maxBar},numRows:{value:D.numRows},power:{value:D.power},resolution:{value:new r.wq(I(),X())},rowMerge:{value:D.rowMerge},shading:{value:D.shading},shadowCrush:{value:D.shadowCrush},shadowGrouping:{value:D.shadowGrouping},tGlow:{value:q.targetB.texture},tScene:{value:Z.texture},time:{value:0},waveAmount:{value:a.animation.waveEnabled?a.animation.waveAmount:0},waveSpeed:{value:a.animation.waveSpeed}},vertexShader:h.f.vertex,fragmentShader:W.fragment}),Q=new r.P6;Q.add(new r.kE($,K));let ee=v(n),et=()=>{let e=Y(),t=P(),a=I(),n=X();T.setSize(a,n,!1),L.aspect=e/t,L.updateProjectionMatrix(),Z.setSize(a,n),q.setSize(a,n),K.uniforms.resolution.value.set(a,n)},ea="u"<typeof ResizeObserver?null:new ResizeObserver(et);ea?.observe(e);let en=e=>{let t=z.getBoundingClientRect();ee.mouseX=r.rA.clamp((e.clientX-t.left)/Math.max(t.width,1),0,1),ee.mouseY=r.rA.clamp((e.clientY-t.top)/Math.max(t.height,1),0,1)},eo=e=>{en(e),ee.dragging=!0,ee.pointerX=e.clientX,ee.pointerY=e.clientY,ee.velocityX=0,ee.velocityY=0,z.style.cursor="grabbing"},ei=e=>{if(en(e),!ee.dragging||!a.animation.followDragEnabled&&!a.animation.autoRotateEnabled)return;let t=(e.clientX-ee.pointerX)*a.animation.dragSens,n=(e.clientY-ee.pointerY)*a.animation.dragSens;ee.velocityX=n,ee.velocityY=t,ee.targetRotationY+=t,ee.targetRotationX+=n,ee.pointerX=e.clientX,ee.pointerY=e.clientY},er=()=>{ee.dragging=!1,z.style.cursor="grab"};!o&&B&&(window.addEventListener("pointermove",ei),window.addEventListener("pointerup",er),z.addEventListener("pointerdown",eo));let es=!1,el=({deltaSeconds:e,elapsedSeconds:t})=>{let o=(n?.timeElapsed??0)+t;K.uniforms.time.value=o;let r=0,s=0,l=0,u=1;if(a.animation.breatheEnabled&&(u*=1+Math.sin(o*a.animation.breatheSpeed)*a.animation.breatheAmount),a.animation.autoRotateEnabled&&(ee.dragging||(ee.autoElapsed+=e,ee.targetRotationX+=ee.velocityX,ee.targetRotationY+=ee.velocityY,ee.velocityX*=G,ee.velocityY*=G),s+=ee.autoElapsed*a.animation.autoSpeed,r+=Math.sin(.2*ee.autoElapsed)*a.animation.autoWobble),a.animation.rotateEnabled){ee.rotateElapsed+=e;let t=a.animation.rotatePingPong?Math.sin(ee.rotateElapsed*a.animation.rotateSpeed)*Math.PI:ee.rotateElapsed*a.animation.rotateSpeed;if("axis"===a.animation.rotatePreset){let e=t*(a.animation.rotateAxis.startsWith("-")?-1:1),n=a.animation.rotateAxis;("x"===n||"xy"===n||"-x"===n||"-xy"===n)&&(r+=e),("y"===n||"xy"===n||"-y"===n||"-xy"===n)&&(s+=e),("z"===n||"-z"===n)&&(l+=e)}}let c=r,d=s,m=N;if(a.animation.followHoverEnabled){let e=a.animation.hoverRange*Math.PI/180;(a.animation.hoverReturn||.5!==ee.mouseX||.5!==ee.mouseY)&&(c+=(ee.mouseY-.5)*e,d+=(ee.mouseX-.5)*e),m=a.animation.hoverEase}if(a.animation.followDragEnabled&&(!ee.dragging&&a.animation.dragMomentum&&(ee.targetRotationX+=ee.velocityX,ee.targetRotationY+=ee.velocityY,ee.velocityX*=1-a.animation.dragFriction,ee.velocityY*=1-a.animation.dragFriction),c+=ee.targetRotationX,d+=ee.targetRotationY,m=a.animation.dragFriction),a.animation.autoRotateEnabled||a.animation.followHoverEnabled||a.animation.followDragEnabled||a.animation.rotateEnabled||(c=ee.targetRotationX,d=ee.targetRotationY),!a.animation.autoRotateEnabled||a.animation.followHoverEnabled||a.animation.followDragEnabled||(c=r+ee.targetRotationX,d=s+ee.targetRotationY,ee.dragging&&(c=ee.targetRotationX,d=ee.targetRotationY),m=j),ee.rotationX+=(c-ee.rotationX)*m,ee.rotationY+=(d-ee.rotationY)*m,ee.rotationZ+=(l-ee.rotationZ)*(a.animation.rotatePingPong?.18:.12),_.rotation.set(ee.rotationX,ee.rotationY,ee.rotationZ),_.scale.setScalar(u),!D.enabled){T.setRenderTarget(null),T.clear(),T.render(V,L);return}T.setRenderTarget(Z),T.render(V,L),q.render(T,Z.texture,J),T.setRenderTarget(null),T.clear(),T.render(Q,J),es||(es=!0,i?.())},eu=null;if(o){el({deltaSeconds:0,elapsedSeconds:0,timestamp:0}),ea?.disconnect();let t="u"<typeof ResizeObserver?null:new ResizeObserver(()=>{et(),el({deltaSeconds:0,elapsedSeconds:0,timestamp:0})});return t?.observe(e),{dispose(){t?.disconnect(),ec()}}}function ec(){q.dispose(),K.dispose(),$.dispose(),U.dispose(),Z.dispose(),F.dispose(),T?.dispose(),z.parentNode===e&&e.removeChild(z)}return(eu=(0,d.f)({renderFrame:el,target:e,targetVisibilityOptions:{rootMargin:"100px"}})).start(),{dispose(){eu?.dispose(),ea?.disconnect(),window.removeEventListener("pointermove",ei),window.removeEventListener("pointerup",er),z.removeEventListener("pointerdown",eo),ec()}}}({container:e,geometry:b,settings:t,initialPose:l,reducedMotion:y}):U({container:e,geometry:b,settings:t,initialPose:l,reducedMotion:y})).then(e=>{n?e?.dispose():o=e}),()=>{n=!0,o?.dispose()}},[b,y]),(0,t.jsx)(et,{ref:x})}],543820)},540741,function(e){e.n(e.i(543820))}]);