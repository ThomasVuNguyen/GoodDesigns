(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,[168632,519364,e=>{let t=new Map;async function o(e){if("function"==typeof e.decode)try{await e.decode()}catch{}}e.s(["f",0,function(e,{crossOrigin:i,label:a="visual image"}={}){let r=JSON.stringify({crossOrigin:i??null,imageUrl:e}),l=t.get(r);if(l)return l;let n=new Promise((t,r)=>{let l=new Image;l.decoding="async",void 0!==i&&(l.crossOrigin=i),l.addEventListener("load",()=>{o(l).then(()=>t(l))}),l.addEventListener("error",()=>{r(Error(`Failed to load ${a}: ${e}`))}),l.src=e}).catch(e=>{throw t.delete(r),e});return t.set(r,n),n}],168632);var i=e.i(53343);e.s(["f",0,function(e){return(0,i.f)(e)}],519364)},53343,e=>{e.i(242243);var t=e.i(386993),o=e.i(203708);e.s(["f",0,function(e,i){let a,r,l=(0,t.c)(4),[n,s]=(0,o.useState)(null),f=i?.dispose;return l[0]!==f||l[1]!==e?(a=()=>{if(null===e)return void s(null);let t=!1,o=null;return s(null),Promise.resolve().then(()=>e()).then(e=>{t?f?.(e):(o=e,s(e))},e=>{}),()=>{t=!0,null!==o&&f?.(o)}},r=[e,f],l[0]=f,l[1]=e,l[2]=a,l[3]=r):(a=l[2],r=l[3]),(0,o.useEffect)(a,r),n}])},849825,e=>{var t=e.i(203708),o=e.i(397778);e.s(["f",0,function(){return(0,t.useContext)(o.f)}])},387218,e=>{var t=e.i(26645),o=e.i(779419),i=e.i(203708),a=e.i(168632),r=e.i(519364),l=e.i(849825),n=e.i(190072),s=e.i(54268),f=e.i(575268),v=e.i(763114),h=e.i(681576),u=e.i(639257),c=e.i(393568),m=e.i(878707);let d={fragment:`
  precision highp float;

  uniform sampler2D tImage;
  uniform vec2 imageSize;
  uniform vec2 viewportSize;
  uniform float zoom;
  uniform float contrast;
  uniform float imageFit;
  uniform float verticalAnchor;
  uniform float verticalPixelOffset;
  uniform float horizontalPixelOffset;

  varying vec2 vUv;

  void main() {
    float imageAspect = imageSize.x / imageSize.y;
    float viewAspect = viewportSize.x / viewportSize.y;

    vec2 uv = vUv;

    if (imageFit > 1.5) {
      uv.y =
        (uv.y - verticalAnchor) * (imageAspect / viewAspect) + verticalAnchor;
    } else if (imageAspect > viewAspect) {
      float scale = viewAspect / imageAspect;
      if (imageFit > 0.5) {
        uv.x = (uv.x - 0.5) * scale + 0.5;
      } else {
        uv.y = (uv.y - 0.5) / scale + 0.5;
      }
    } else {
      float scale = imageAspect / viewAspect;
      if (imageFit > 0.5) {
        uv.y = (uv.y - 0.5) * scale + 0.5;
      } else {
        uv.x = (uv.x - 0.5) / scale + 0.5;
      }
    }

    uv = (uv - 0.5) / zoom + 0.5;
    uv.y += verticalPixelOffset / max(viewportSize.y, 1.0);
    uv.x -= horizontalPixelOffset / max(viewportSize.x, 1.0);

    float inBounds = step(0.0, uv.x) * step(uv.x, 1.0)
                   * step(0.0, uv.y) * step(uv.y, 1.0);

    vec4 color = texture2D(tImage, clamp(uv, 0.0, 1.0));
    vec3 contrastColor = clamp((color.rgb - 0.5) * contrast + 0.5, 0.0, 1.0);

    gl_FragColor = vec4(contrastColor, inBounds);
  }
`},g=u.f.referencePreviewDistance,p=u.f.minFootprintScale;function w({imageFit:e,imageWidth:t,imageHeight:o,viewportWidth:i,viewportHeight:a,zoom:r}){if(t<=0||o<=0||i<=0||a<=0)return null;let l=t/o,n=i,s=a;l>i/a?"cover"===e||"width"===e?n=a*l:s=i/l:"cover"===e||"width"===e?s=i/l:n=a*l;let f=n*r,v=s*r,h=Math.max((i-f)*.5,0),u=Math.max((a-v)*.5,0),c=Math.min((i-f)*.5+f,i),m=Math.min((a-v)*.5+v,a);return c<=h||m<=u?null:{width:c-h,height:m-u}}function S({imageFit:e,imageWidth:t,imageHeight:o,viewportWidth:i,viewportHeight:a,previewDistance:r}){let l=w({imageFit:e,imageWidth:t,imageHeight:o,viewportWidth:i,viewportHeight:a,zoom:g/Math.max(r,.001)}),n=w({imageFit:e,imageWidth:t,imageHeight:o,viewportWidth:i,viewportHeight:a,zoom:1}),s=l?l.width*l.height:0,f=n?n.width*n.height:0;return s<=0||f<=0?1:Math.max(Math.sqrt(s/f),p)}let x=(0,o.f)("div")({name:"SceneContainer",class:"s2ibsvk",propsAsIs:!1});e.s(["HalftoneImageScene",0,function({imageUrl:e,settings:o,pointerRootSelector:u,onFirstFrame:y}){let D=(0,i.useRef)(null),{reducedMotion:R}=(0,l.f)(),F=(0,i.useCallback)(()=>(0,a.f)(e),[e]),P=(0,r.f)(F);return(0,i.useEffect)(()=>{let e=D.current;if(null===e||null===P)return;let t=function({container:e,image:t,settings:o,pointerRootSelector:i,reducedMotion:a=!1,onFirstFrame:r}){let{getVirtualWidth:l,getVirtualHeight:u}=(0,c.f)(e),x=(0,f.f)({antialias:!1,alpha:!0});if(null===x)return null;x.outputColorSpace=n.nj,x.setPixelRatio(1),x.setClearColor(0,0),x.setSize(l(),u(),!1);let y=x.domElement;y.style.display="block",y.style.height="100%",y.style.width="100%",e.appendChild(y);let D=new n.Sj(t);D.wrapS=n.Jr,D.wrapT=n.Jr,D.generateMipmaps=!1,D.minFilter=n.VV,D.magFilter=n.VV,D.colorSpace=n.nj,D.needsUpdate=!0;let R=g/Math.max(o.previewDistance,.001),F=(0,h.f)(l(),u()),P=new n.CQ(2,2),M=new n.Sc(-1,1,1,-1,0,1),z=new n.Zg({uniforms:{tImage:{value:D},imageSize:{value:new n.wq(t.naturalWidth,t.naturalHeight)},viewportSize:{value:new n.wq(l(),u())},zoom:{value:R},contrast:{value:o.contrast},imageFit:{value:"width"===o.imageFit?2:+("cover"===o.imageFit)},verticalAnchor:{value:o.verticalAnchor??.5},verticalPixelOffset:{value:0},horizontalPixelOffset:{value:0}},vertexShader:v.f.vertex,fragmentShader:d.fragment}),C=new n.Zg({transparent:!0,uniforms:{tScene:{value:F.texture},tGlow:{value:F.texture},effectResolution:{value:new n.wq(l(),u())},logicalResolution:{value:new n.wq(l(),u())},tile:{value:o.halftone.scale},halftonePower:{value:o.halftone.power},halftoneWidth:{value:o.halftone.width},applyToDarkAreas:{value:+!!o.applyToDarkAreas},hoverLightVerticalFade:{value:o.hover.lightVerticalFade??0},minimumTone:{value:o.halftone.minimumTone},dashColor:{value:new n.Es(o.halftone.dashColor)},hoverDashColor:{value:new n.Es(o.halftone.hoverDashColor)},time:{value:0},waveAmount:{value:o.wave.enabled?o.wave.amount:0},waveSpeed:{value:o.wave.speed},footprintScale:{value:1},interactionUv:{value:new n.wq(.5,.5)},interactionVelocity:{value:new n.wq(0,0)},dragOffset:{value:new n.wq(0,0)},hoverHalftoneActive:{value:0},hoverHalftonePowerShift:{value:0},hoverHalftoneRadius:{value:o.hover.halftoneRadius},hoverHalftoneWidthShift:{value:0},hoverLightStrength:{value:0},hoverLightRadius:{value:o.hover.lightRadius},hoverFlowStrength:{value:0},hoverFlowRadius:{value:.18},dragFlowStrength:{value:0},cropToBounds:{value:1}},vertexShader:v.f.vertex,fragmentShader:m.f.fragment}),H=new n.P6;H.add(new n.kE(P,z));let A=new n.P6;A.add(new n.kE(P,C));let b={inside:!1,mouseX:.5,mouseY:.5,smoothedX:.5,smoothedY:.5,velocityX:0,velocityY:0,hoverStrength:0},L=()=>{C.uniforms.footprintScale.value=S({imageFit:"contain",imageWidth:t.naturalWidth,imageHeight:t.naturalHeight,viewportWidth:l(),viewportHeight:u(),previewDistance:o.previewDistance})},k=()=>{let e=l(),t=u();x.setSize(e,t,!1),F.setSize(e,t),z.uniforms.viewportSize.value.set(e,t),C.uniforms.effectResolution.value.set(e,t),C.uniforms.logicalResolution.value.set(e,t),L()};L();let O=(i?e.closest(i):null)??e,V=e=>{if(o.pointerExcludeSelector&&e.target instanceof Element&&e.target.closest(o.pointerExcludeSelector)){b.inside=!1;return}let t=O.getBoundingClientRect(),i=!b.inside,a=n.rA.clamp((e.clientX-t.left)/Math.max(t.width,1),0,1),r=n.rA.clamp((e.clientY-t.top)/Math.max(t.height,1),0,1),l=a-b.mouseX,s=r-b.mouseY;if(b.mouseX=a,b.mouseY=r,b.inside=e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom,i){b.velocityX=0,b.velocityY=0,b.smoothedX=a,b.smoothedY=r;return}b.velocityX=l,b.velocityY=s},E=()=>{b.inside=!1,b.velocityX=0,b.velocityY=0},U="window"===o.pointerScope?window:O;a||(U.addEventListener("pointermove",V),U.addEventListener("pointerleave",E));let W=!1,T=({deltaSeconds:e,elapsedSeconds:i})=>{C.uniforms.time.value=i;let a=1-Math.exp(-e*(b.inside?o.hover.fadeIn:o.hover.fadeOut));b.hoverStrength+=(!!b.inside-b.hoverStrength)*a,b.smoothedX+=(b.mouseX-b.smoothedX)*o.pointer.follow,b.smoothedY+=(b.mouseY-b.smoothedY)*o.pointer.follow,b.velocityX*=o.pointer.velocityDamping,b.velocityY*=o.pointer.velocityDamping;let n=l(),s=u();if(C.uniforms.interactionUv.value.set(b.smoothedX,1-b.smoothedY),C.uniforms.interactionVelocity.value.set(b.velocityX*n,-b.velocityY*s),C.uniforms.hoverHalftoneActive.value=o.hover.halftoneEnabled?b.hoverStrength:0,C.uniforms.hoverHalftonePowerShift.value=o.hover.halftoneEnabled?o.hover.halftonePowerShift:0,C.uniforms.hoverHalftoneWidthShift.value=o.hover.halftoneEnabled?o.hover.halftoneWidthShift:0,C.uniforms.hoverLightStrength.value=o.hover.lightEnabled?o.hover.lightIntensity*b.hoverStrength:0,void 0!==o.hover.radiusReferenceDistance){let e=function({imageWidth:e,imageHeight:t,viewportWidth:o,viewportHeight:i,previewDistance:a,referencePreviewDistance:r}){let l=w({imageFit:"contain",imageWidth:e,imageHeight:t,viewportWidth:o,viewportHeight:i,zoom:g/Math.max(a,.001)}),n=w({imageFit:"contain",imageWidth:e,imageHeight:t,viewportWidth:o,viewportHeight:i,zoom:g/Math.max(r,.001)}),s=l?l.width*l.height:0,f=n?n.width*n.height:0;return s<=0||f<=0?1:Math.max(Math.sqrt(s/f),p)}({imageWidth:t.naturalWidth,imageHeight:t.naturalHeight,viewportWidth:l(),viewportHeight:u(),previewDistance:o.previewDistance,referencePreviewDistance:o.hover.radiusReferenceDistance});C.uniforms.hoverHalftoneRadius.value=o.hover.halftoneRadius*e,C.uniforms.hoverLightRadius.value=o.hover.lightRadius*e}if(o.responsiveFrame){let e=o.responsiveFrame();z.uniforms.zoom.value=g/Math.max(e.previewDistance,.001),z.uniforms.verticalAnchor.value=e.verticalAnchor,z.uniforms.verticalPixelOffset.value=e.verticalOffsetPx,z.uniforms.horizontalPixelOffset.value=e.horizontalOffsetPx,C.uniforms.footprintScale.value=S({imageFit:"contain",imageHeight:t.naturalHeight,imageWidth:t.naturalWidth,previewDistance:e.previewDistance,viewportHeight:u(),viewportWidth:l()})}x.setRenderTarget(F),x.render(H,M),x.setRenderTarget(null),x.clear(),x.render(A,M),W||(W=!0,r?.())},X="u"<typeof ResizeObserver?null:new ResizeObserver(k);function Y(){z.dispose(),C.dispose(),P.dispose(),D.dispose(),F.dispose(),x?.dispose(),y.parentNode===e&&e.removeChild(y)}if(X?.observe(e),a){T({deltaSeconds:0,elapsedSeconds:0,timestamp:0});let t="u"<typeof ResizeObserver?null:new ResizeObserver(()=>{k(),T({deltaSeconds:0,elapsedSeconds:0,timestamp:0})});return t?.observe(e),X?.disconnect(),{dispose(){t?.disconnect(),Y()}}}let I=(0,s.f)({renderFrame:T,target:e,targetVisibilityOptions:{rootMargin:"100px"}});return I.start(),{dispose(){I.dispose(),X?.disconnect(),U.removeEventListener("pointermove",V),U.removeEventListener("pointerleave",E),Y()}}}({container:e,image:P,settings:o,pointerRootSelector:u,reducedMotion:R,onFirstFrame:y});return()=>{t?.dispose()}},[P,R]),(0,t.jsx)(x,{ref:D})}],387218)},763114,e=>{let t={vertex:`
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
`};e.s(["f",0,t])},681576,639257,393568,e=>{var t=e.i(190072);e.s(["f",0,function(e,o){return new t.qL(e,o,{format:t.W1,magFilter:t.VV,minFilter:t.VV})}],681576);let o={virtualRenderHeightPx:768,referencePreviewDistance:4,minFootprintScale:.001,pointerEasingDefault:.12,pointerEasingAutorotateDrag:.08,autorotateVelocityDecay:.92};e.s(["f",0,o],639257),e.s(["f",0,function(e){let t=()=>Math.max(e.clientWidth,1),i=()=>Math.max(e.clientHeight,1),a=()=>Math.max(o.virtualRenderHeightPx,i());return{getWidth:t,getHeight:i,getVirtualWidth:()=>Math.max(Math.round(a()*(t()/Math.max(i(),1))),1),getVirtualHeight:a}}],393568)},878707,e=>{let t={fragment:`
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
`};e.s(["f",0,t])}],894023,function(e){e.n(e.i(387218))}]);