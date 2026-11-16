import{C as e,E as t,M as n,N as r,O as i,P as a,R as o,U as s,W as c,b as l,r as ee}from"./three-8n3TuNhA.js";var u={grid:40,waveWidth:.48,waveDirection:`down`,distortionStrength:.012,transitionDuration:1e3,easeOutExpo:[.76,0,.24,1],clearColor:16447733,brightness:1,contrast:1,saturation:1,hue:0,opacity:.8,videoFadeDurationMs:400};function te(e,t,n,r,i){if(e<=0)return 0;if(e>=1)return 1;let a=e=>3*(1-e)*(1-e)*e*t+3*(1-e)*e*e*r+e*e*e,o=e=>3*(1-e)*(1-e)*e*n+3*(1-e)*e*e*i+e*e*e,s=.5;for(let t=0;t<12;t++){let n=a(s);if(Math.abs(n-e)<1e-6)return o(s);n>e?s-=.5**(t+2):s+=.5**(t+2)}return o(s)}function ne(){let e=navigator,t=e.connection;if(t?.saveData)return`image-only`;let n=t?.effectiveType;if(n===`slow-2g`||n===`2g`)return`image-only`;let r=navigator.hardwareConcurrency,i=e.deviceMemory,a=r!==void 0&&r<=2||i!==void 0&&i<=2;return n===`3g`&&a?`image-only`:n===`3g`||a?`progressive`:`full`}var re=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,ie=`
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform sampler2D uTexturePoster;
  uniform float uVideoFade;
  uniform float uProgress;
  uniform float uGrid;
  uniform float uWaveWidth;
  uniform float uDistortion;
  uniform vec4 uResolution;
  uniform float uWaveDir;
  uniform float uBrightness;
  uniform float uContrast;
  uniform float uSaturation;
  uniform float uHue;
  uniform float uOpacity;
  uniform float uRevealFade;

  varying vec2 vUv;

  const float PI = 3.14159265;

  vec3 applyHue(vec3 rgb, float hueRad) {
    float c = cos(hueRad), s = sin(hueRad);
    vec3 w = vec3(0.2126, 0.7152, 0.0722);
    mat3 m = mat3(
      vec3(c + (1.0 - c) * w.x, (1.0 - c) * w.x - s * w.y, (1.0 - c) * w.x + s * w.z),
      vec3((1.0 - c) * w.y + s * w.x, c + (1.0 - c) * w.y, (1.0 - c) * w.y - s * w.x),
      vec3((1.0 - c) * w.z - s * w.x, (1.0 - c) * w.z + s * w.y, c + (1.0 - c) * w.z)
    );
    return m * rgb;
  }

  void main() {
    vec2 uv = (vUv - vec2(0.5)) * uResolution.zw + vec2(0.5);

    float wavePos;
    if (uWaveDir < 0.5) {
      wavePos = 1.0 - uv.y;
    } else if (uWaveDir < 1.5) {
      wavePos = uv.y;
    } else if (uWaveDir < 2.5) {
      wavePos = uv.x;
    } else {
      wavePos = 1.0 - uv.x;
    }

    float wave = 1.0 - smoothstep(uProgress - uWaveWidth, uProgress, wavePos);
    float distFromWave = abs(wavePos - uProgress);
    float pixelateAmount = smoothstep(uWaveWidth, 0.0, distFromWave);
    if (uProgress <= 0.001 || uProgress >= 0.999) {
      pixelateAmount = 0.0;
    }

    vec2 pixelUV = floor(uv * uGrid) / uGrid;
    vec2 distortedUV = mix(uv, pixelUV, pixelateAmount);
    distortedUV += pixelateAmount * uDistortion * vec2(
      sin(uv.y * 25.0 + uProgress * 6.28),
      cos(uv.x * 25.0 + uProgress * 6.28)
    );
    distortedUV = clamp(distortedUV, vec2(0.0), vec2(1.0));

    vec4 cleanOld = texture2D(uTexture1, uv);
    vec4 cleanNew = texture2D(uTexture2, uv);
    vec4 pixOld = texture2D(uTexture1, distortedUV);
    vec4 pixNew = texture2D(uTexture2, distortedUV);

    vec4 oldColor = mix(cleanOld, pixOld, pixelateAmount);
    vec4 newColor = mix(cleanNew, pixNew, pixelateAmount);
    if (uVideoFade < 1.0) {
      vec4 posterOld = texture2D(uTexturePoster, uv);
      vec4 posterNew = texture2D(uTexturePoster, distortedUV);
      oldColor = mix(posterOld, oldColor, uVideoFade);
      newColor = mix(posterNew, newColor, uVideoFade);
    }
    oldColor.a *= uRevealFade;
    vec4 color = mix(oldColor, newColor, wave);

    vec3 rgb = color.rgb;
    rgb *= uBrightness;
    rgb = (rgb - 0.5) * uContrast + 0.5;

    float luma = dot(rgb, vec3(0.299, 0.587, 0.114));
    rgb = mix(vec3(luma), rgb, uSaturation);

    if (abs(uHue) > 0.001) {
      rgb = applyHue(rgb, uHue * PI / 180.0);
    }

    rgb = clamp(rgb, 0.0, 1.0);
    gl_FragColor = vec4(rgb, color.a * uOpacity);
  }
`;function ae(e,t){return new Promise((r,i)=>{e.load(t,e=>{e.colorSpace=n,e.minFilter=l,e.magFilter=l,r(e)},void 0,i)})}function d(d,f,p,m,oe){let h=d.clientWidth||d.offsetWidth||800,g=d.clientHeight||d.offsetHeight||600,_=new ee({antialias:!1,alpha:!0});_.setPixelRatio(Math.min(window.devicePixelRatio||1,3)),_.setSize(h,g),_.setClearColor(u.clearColor,0),_.outputColorSpace=n;let v=_.domElement;v.style.display=`block`,d.appendChild(v);let y=new t(-.5,.5,.5,-.5,-1e3,1e3);y.position.set(0,0,1);let b=new r,se=new o,x=null,S=null,C=null,w=null,T=!1,E=`poster-brand`;function D(e,t){d.dataset.heroSource=e,d.dataset.heroSourceReason=t??``}function O(e,t,n,r){let i=e/t,a=n/r,o,c;return r/n>1/i?(o=a/i,c=1):(o=1,c=1/a*i),new s(n,r,o,c)}function k(e,t,n){let r=e.image,i=`videoWidth`in r?r.videoWidth:r.width,a=`videoHeight`in r?r.videoHeight:r.height;i>0&&a>0&&(M.uniforms.uResolution.value=O(i,a,t,n))}let A={up:0,down:1,left:2,right:3},j=A[u.waveDirection]??0,M=new a({uniforms:{uTexture1:{value:null},uTexture2:{value:null},uTexturePoster:{value:null},uVideoFade:{value:1},uProgress:{value:0},uRevealFade:{value:1},uGrid:{value:u.grid},uWaveWidth:{value:u.waveWidth},uDistortion:{value:u.distortionStrength},uResolution:{value:new s(h,g,1,1)},uWaveDir:{value:j},uBrightness:{value:u.brightness},uContrast:{value:u.contrast},uSaturation:{value:u.saturation},uHue:{value:u.hue},uOpacity:{value:u.opacity}},transparent:!0,vertexShader:re,fragmentShader:ie}),N=new i(1,1),ce=new e(N,M);b.add(ce);function le(e){try{return new URL(e,window.location.origin).origin===window.location.origin}catch{return!1}}let P=null;function F(){if(!W)return;let{durationMs:e,callback:t}=W;W=null,X(e,t)}function ue(e,t){x=e,C=e,E=t,T=!0,M.uniforms.uTexture1.value=e,M.uniforms.uTexture2.value=e,M.uniforms.uTexturePoster.value=e,M.uniforms.uVideoFade.value=1;let n=e.image;M.uniforms.uResolution.value=O(n.width,n.height,h,g),D(t),F(),P&&=(P(),null)}ae(se,!le(f.posterUrl)&&f.posterFallbackUrl?f.posterFallbackUrl:f.posterUrl).then(e=>{S||ue(e,`poster-brand`)}).catch(()=>{});let I=ne();if(d.dataset.connectionTier=I,I!==`image-only`){let e=document.createElement(`video`),t=oe?.preferMp4||e.canPlayType(`video/webm`).length===0?f.videoMp4Url:f.videoWebmUrl,r=document.createElement(`video`);r.crossOrigin=`anonymous`,r.muted=!0,r.playsInline=!0,r.loop=!0,r.preload=I===`progressive`?`none`:`auto`,r.setAttribute(`playsinline`,``),r.setAttribute(`webkit-playsinline`,``),r.setAttribute(`muted`,``),r.setAttribute(`autoplay`,``),r.setAttribute(`class`,`hero-glimmer-video`),r.src=t,w=r,d.insertBefore(r,v);function i(e){r.classList.add(`hero-video--direct`),v.style.display=`none`,r.play().catch(()=>{}),D(`video`,e),!T&&x&&(T=!0,F())}function a(){let e;try{e=new c(r),e.colorSpace=n,e.minFilter=l,e.magFilter=l,_.initTexture(e);let t=_.getContext();if(t.getError()!==t.NO_ERROR)throw Error(`WebGL texture tainted`)}catch{return!1}if(S=e,x??=e,M.uniforms.uTexturePoster.value=x,T&&!L)return de(),!0;C=e,T=!0,M.uniforms.uTexture1.value=e,M.uniforms.uTexture2.value=e,M.uniforms.uVideoFade.value=1;let t=d.clientWidth||d.offsetWidth||800,i=d.clientHeight||d.offsetHeight||600;return k(e,t,i),D(`video`),r.play().catch(()=>{}),F(),!0}let o=!1;r.addEventListener(`loadeddata`,()=>{a()||i(`direct playback (WebGL texture failed)`)},{once:!0}),r.addEventListener(`error`,()=>{if(!o&&r.crossOrigin){o=!0,r.crossOrigin=null,r.src=t,r.load(),r.addEventListener(`loadeddata`,()=>i(`direct playback (CORS retry)`),{once:!0}),r.addEventListener(`error`,()=>{S=null,D(`poster-fallback`,`video failed`)},{once:!0});return}S=null,D(`poster-fallback`,`video failed`)},{once:!0}),I===`progressive`?P=()=>{r.preload=`auto`,r.load()}:r.load()}let L=!1,R=0,z=u.transitionDuration,B=!1,V=!1,H=u.easeOutExpo,U=null,W=null,G=0,K=0,q=null;function de(){if(!x||!S)return;M.uniforms.uTexturePoster.value=x,M.uniforms.uTexture1.value=S,M.uniforms.uTexture2.value=S,M.uniforms.uVideoFade.value=0,q=performance.now(),C=S;let e=d.clientWidth||d.offsetWidth||800,t=d.clientHeight||d.offsetHeight||600;k(S,e,t),D(`video`),w?.play().catch(()=>{})}let J=m?.waveDirection?A[m.waveDirection]??j:j;function Y(){M.uniforms.uGrid.value=m?.grid??u.grid,M.uniforms.uWaveWidth.value=m?.waveWidth??u.waveWidth,M.uniforms.uDistortion.value=m?.distortionStrength??u.distortionStrength,M.uniforms.uWaveDir.value=J,M.uniforms.uRevealFade.value=1,M.uniforms.uVideoFade.value=1,H=m?.ease??u.easeOutExpo}function X(e,t){x&&(p&&(V=!0,M.uniforms.uGrid.value=p.grid??u.grid,M.uniforms.uWaveWidth.value=p.waveWidth??u.waveWidth,M.uniforms.uDistortion.value=p.distortionStrength??u.distortionStrength,M.uniforms.uWaveDir.value=A[p.waveDirection??u.waveDirection]??j,H=p.ease??u.easeOutExpo),M.uniforms.uTexture1.value=x,M.uniforms.uTexture2.value=x,M.uniforms.uProgress.value=0,M.uniforms.uRevealFade.value=0,B=!0,L=!0,R=performance.now(),z=p?.durationMs??e,U=()=>{if(B=!1,M.uniforms.uProgress.value=0,M.uniforms.uRevealFade.value=1,S){C=S,M.uniforms.uTexture1.value=S,M.uniforms.uTexture2.value=S,M.uniforms.uVideoFade.value=1;let e=d.clientWidth||d.offsetWidth||800,t=d.clientHeight||d.offsetHeight||600;k(S,e,t),D(`video`),w?.play().catch(()=>{})}else if(C=x??C,M.uniforms.uTexture1.value=C,M.uniforms.uTexture2.value=C,D(E),C){let e=d.clientWidth||d.offsetWidth||800,t=d.clientHeight||d.offsetHeight||600;k(C,e,t)}V&&=(Y(),!1),t&&t()})}function Z(e){if(G=window.requestAnimationFrame(Z),!T){_.render(b,y);return}if(q!==null){let t=e-q,n=Math.min(t/u.videoFadeDurationMs,1);M.uniforms.uVideoFade.value=n,n>=1&&(M.uniforms.uVideoFade.value=1,q=null)}if(L){let t=e-R,n=Math.min(t/z,1),[r,i,a,o]=H,s=te(n,r,i,a,o);if(M.uniforms.uProgress.value=s,B&&(M.uniforms.uRevealFade.value=s),n>=1){L=!1,M.uniforms.uProgress.value=0,!B&&C&&(M.uniforms.uTexture1.value=C,M.uniforms.uTexture2.value=C);let e=U;U=null,z=u.transitionDuration,typeof e==`function`&&e()}}d.style.opacity=String(1-K*.6);let t=1+K*.15;d.style.setProperty(`--hero-bg-scale`,String(t)),C===S&&S&&S.update();try{_.render(b,y)}catch{S&&w&&(S.dispose(),S=null,C=x,C&&(M.uniforms.uTexture1.value=C,M.uniforms.uTexture2.value=C),w.classList.add(`hero-video--direct`),v.style.display=`none`,w.play().catch(()=>{}),D(`video`,`direct playback (WebGL SecurityError)`))}}G=window.requestAnimationFrame(Z);function Q(){let e=d.clientWidth||d.offsetWidth||800,t=d.clientHeight||d.offsetHeight||600;if(e<=0||t<=0)return;_.setSize(e,t);let n=C??x;n&&k(n,e,t)}window.addEventListener(`resize`,Q);let $=new ResizeObserver(()=>Q());return $.observe(d),window.requestAnimationFrame(()=>Q()),{morph(e){if(L||!T||!C){e&&e();return}Y(),L=!0,R=performance.now(),z=m?.durationMs??u.transitionDuration,M.uniforms.uTexture1.value=C,M.uniforms.uTexture2.value=C,M.uniforms.uProgress.value=0,M.uniforms.uRevealFade.value=1,U=e||null},revealIn(e,t){if(L)return;let n=e??u.transitionDuration;if(!T){W={durationMs:n,callback:t};return}X(n,t)},setScrollProgress(e){K=e},destroy(){window.cancelAnimationFrame(G),window.removeEventListener(`resize`,Q),$.disconnect(),x?.dispose(),S?.dispose(),w&&(w.pause(),w.innerHTML=``,w.load(),w.parentNode&&w.parentNode.removeChild(w)),N.dispose(),M.dispose(),_.dispose(),_.domElement.parentNode&&_.domElement.parentNode.removeChild(_.domElement),d.style.removeProperty(`--hero-bg-scale`)}}}export{d as initGlimmerScene};
