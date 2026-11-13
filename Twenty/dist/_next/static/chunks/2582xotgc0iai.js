(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,723917,e=>{e.s(["f",0,function(e){if(!Number.isInteger(e)||e<=0)throw Error(`createBoundedFailureCache: maxSize must be a positive integer (got ${e}).`);let o=new Set;return{has:e=>o.has(e),add(t){if(!o.has(t)){if(o.size>=e){let e=o.values().next().value;void 0!==e&&o.delete(e)}o.add(t)}}}}])},53343,e=>{e.i(242243);var o=e.i(386993),t=e.i(203708);e.s(["f",0,function(e,a){let i,l,r=(0,o.c)(4),[n,f]=(0,t.useState)(null),s=a?.dispose;return r[0]!==s||r[1]!==e?(i=()=>{if(null===e)return void f(null);let o=!1,t=null;return f(null),Promise.resolve().then(()=>e()).then(e=>{o?s?.(e):(t=e,f(e))},e=>{}),()=>{o=!0,null!==t&&s?.(t)}},l=[e,s],r[0]=s,r[1]=e,r[2]=i,r[3]=l):(i=r[2],l=r[3]),(0,t.useEffect)(i,l),n}])},849825,e=>{var o=e.i(203708),t=e.i(397778);e.s(["f",0,function(){return(0,o.useContext)(t.f)}])},763114,e=>{let o={vertex:`
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`,fragment:`
  precision highp float;

  uniform sampler2D tInput;
  uniform vec2 dir;
  uniform vec2 res;

  varying vec2 vUv;

  void main() {
    vec4 sum = vec4(0.0);
    vec2 px = dir / res;

    float w[5];
    w[0] = 0.227027;
    w[1] = 0.1945946;
    w[2] = 0.1216216;
    w[3] = 0.054054;
    w[4] = 0.016216;

    sum += texture2D(tInput, vUv) * w[0];

    for (int i = 1; i < 5; i++) {
      float fi = float(i) * 3.0;
      sum += texture2D(tInput, vUv + px * fi) * w[i];
      sum += texture2D(tInput, vUv - px * fi) * w[i];
    }

    gl_FragColor = sum;
  }
`};e.s(["f",0,o])},681576,639257,393568,e=>{var o=e.i(190072);e.s(["f",0,function(e,t){return new o.qL(e,t,{format:o.W1,magFilter:o.VV,minFilter:o.VV})}],681576);let t={virtualRenderHeightPx:768,referencePreviewDistance:4,minFootprintScale:.001,pointerEasingDefault:.12,pointerEasingAutorotateDrag:.08,autorotateVelocityDecay:.92};e.s(["f",0,t],639257),e.s(["f",0,function(e){let o=()=>Math.max(e.clientWidth,1),a=()=>Math.max(e.clientHeight,1),i=()=>Math.max(t.virtualRenderHeightPx,a());return{getWidth:o,getHeight:a,getVirtualWidth:()=>Math.max(Math.round(i()*(o()/Math.max(a(),1))),1),getVirtualHeight:i}}],393568)},878707,e=>{let o={fragment:`
  precision highp float;

  uniform sampler2D tScene;
  uniform sampler2D tGlow;
  uniform vec2 effectResolution;
  uniform vec2 logicalResolution;
  uniform float tile;
  uniform float halftonePower;
  uniform float halftoneWidth;
  uniform float applyToDarkAreas;
  uniform float minimumTone;
  uniform vec3 dashColor;
  uniform vec3 hoverDashColor;
  uniform float time;
  uniform float waveAmount;
  uniform float waveSpeed;
  uniform float footprintScale;
  uniform vec2 interactionUv;
  uniform vec2 interactionVelocity;
  uniform vec2 dragOffset;
  uniform float hoverHalftoneActive;
  uniform float hoverHalftonePowerShift;
  uniform float hoverHalftoneRadius;
  uniform float hoverHalftoneWidthShift;
  uniform float hoverLightStrength;
  uniform float hoverLightRadius;
  uniform float hoverLightVerticalFade;
  uniform float hoverFlowStrength;
  uniform float hoverFlowRadius;
  uniform float dragFlowStrength;
  uniform float cropToBounds;

  varying vec2 vUv;

  float dashDistance(vec2 cellPosition, float halfLength, float widthRatio) {
    vec2 offset = cellPosition - 0.5;
    offset.x -= clamp(offset.x, -halfLength, halfLength);
    return length(offset) - widthRatio * halfLength;
  }

  void main() {
    if (cropToBounds > 0.5) {
      vec4 boundsCheck = texture2D(tScene, vUv);
      if (boundsCheck.a < 0.01) {
        gl_FragColor = vec4(0.0);
        return;
      }
    }

    vec2 fragCoord =
      (gl_FragCoord.xy / max(effectResolution, vec2(1.0))) * logicalResolution;
    float halftoneSize = max(tile * max(footprintScale, 0.001), 1.0);
    vec2 pointerPx = interactionUv * logicalResolution;
    vec2 fragDelta = fragCoord - pointerPx;
    float fragDist = length(fragDelta);
    vec2 radialDir = fragDist > 0.001 ? fragDelta / fragDist : vec2(0.0, 1.0);
    float velocityMagnitude = length(interactionVelocity);
    vec2 motionDir = velocityMagnitude > 0.001
      ? interactionVelocity / velocityMagnitude
      : vec2(0.0, 0.0);
    float motionBias = velocityMagnitude > 0.001
      ? dot(-radialDir, motionDir) * 0.5 + 0.5
      : 0.5;

    float hoverLightMask = 0.0;
    if (hoverLightStrength > 0.0) {
      float lightRadiusPx = hoverLightRadius * logicalResolution.y;
      hoverLightMask = smoothstep(lightRadiusPx, 0.0, fragDist);
      float fadeRange = max(hoverLightVerticalFade, 0.0001);
      hoverLightMask *=
        smoothstep(0.0, fadeRange, vUv.y) *
        smoothstep(0.0, fadeRange, 1.0 - vUv.y);
    }

    float hoverHalftoneMask = 0.0;
    if (hoverHalftoneActive > 0.0) {
      float hoverHalftoneRadiusPx = hoverHalftoneRadius * logicalResolution.y;
      hoverHalftoneMask =
        smoothstep(hoverHalftoneRadiusPx, 0.0, fragDist) *
        clamp(hoverHalftoneActive, 0.0, 1.0);
    }

    float hoverFlowMask = 0.0;
    if (hoverFlowStrength > 0.0) {
      float hoverRadiusPx = hoverFlowRadius * logicalResolution.y;
      hoverFlowMask = smoothstep(hoverRadiusPx, 0.0, fragDist);
    }

    vec2 hoverDisplacement =
      radialDir * hoverFlowStrength * hoverFlowMask * halftoneSize * 0.55 +
      motionDir * hoverFlowStrength * hoverFlowMask * (0.4 + motionBias) * halftoneSize * 1.15;
    vec2 travelDisplacement = dragOffset * dragFlowStrength * 0.45;
    vec2 effectCoord = fragCoord + hoverDisplacement + travelDisplacement;

    float bandRow = floor(effectCoord.y / halftoneSize);
    float waveOffset =
      waveAmount * sin(time * waveSpeed + bandRow * 0.5) * halftoneSize;
    effectCoord.x += waveOffset;

    vec2 cellIndex = floor(effectCoord / halftoneSize);
    vec2 sampleUv = clamp(
      (cellIndex + 0.5) * halftoneSize / logicalResolution,
      vec2(0.0),
      vec2(1.0)
    );
    vec2 cellUv = fract(effectCoord / halftoneSize);

    vec4 sceneSample = texture2D(tScene, sampleUv);
    float mask = smoothstep(0.02, 0.08, sceneSample.a);
    float localPower = clamp(
      halftonePower + hoverHalftonePowerShift * hoverHalftoneMask,
      -1.5,
      1.5
    );
    float localWidth = clamp(
      halftoneWidth + hoverHalftoneWidthShift * hoverHalftoneMask,
      0.05,
      1.4
    );
    float lightLift =
      hoverLightStrength * hoverLightMask * mix(0.78, 1.18, motionBias) * 0.22;
    float toneValue =
      (sceneSample.r + sceneSample.g + sceneSample.b) * (1.0 / 3.0);
    if (applyToDarkAreas > 0.5) {
      toneValue = 1.0 - toneValue;
    }
    // Preserve the pre-toneTarget light-mode response by keeping the power
    // bias inside the averaged tone calculation.
    float powerBias = localPower * 0.2357;
    float bandRadius = clamp(
      max(toneValue + powerBias + lightLift, minimumTone),
      0.0,
      1.0
    ) * 1.86 * 0.5;

    float alpha = 0.0;
    if (bandRadius > 0.0001) {
      float signedDistance = dashDistance(cellUv, bandRadius, localWidth);
      float edge = 0.02;
      alpha = (1.0 - smoothstep(0.0, edge, signedDistance)) * mask;
    }

    vec3 activeDashColor = mix(dashColor, hoverDashColor, hoverHalftoneMask);
    vec3 color = activeDashColor * alpha;
    gl_FragColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`};e.s(["f",0,o])}])})();