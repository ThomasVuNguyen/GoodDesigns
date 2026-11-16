import{C as e,D as t,E as n,G as r,H as i,N as a,O as o,P as s,S as c,U as l,V as u,b as d,f,g as p,h as m,j as h,k as g,m as _,r as v}from"./three-8n3TuNhA.js";var y={ember:{label:`Ember`,coolDeep:[.1,.05,.03],coolMid:[.55,.3,.16],coolTip:[.98,.92,.82],warm:[1,.45,.12],sky0:[.75,.28,.08],sky1:[.95,.62,.3],sky2:[.9,.78,.62],sky3:[.1,.05,.03],corner:[.02,.012,.006],valueScale:.82,vibrance:1.16,bodyDeep:[.02,.01,.006],bodyTint:[.11,.06,.032]}};function b(e){return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function x(e){return parseInt(e,16)>>>0}function S(e,t,n,r,i){let a=Math.max(1,Math.round(r*3)),o=new Float32Array(2*a+1),s=0;for(let e=-a;e<=a;e++)o[e+a]=Math.exp(-(e*e)/(2*r*r)),s+=o[e+a]??0;for(let e=0;e<o.length;e++)o[e]=(o[e]??0)/s;let c=new Float32Array(e.length);for(let r=0;r<n;r++)for(let s=0;s<t;s++){let l=0;for(let c=-a;c<=a;c++){let u=i?(s+c+t)%t:s,d=i?r:(r+c+n)%n;l+=(e[d*t+u]??0)*(o[c+a]??0)}c[r*t+s]=l}return c}var C=new Map,w=24;function T(e){let t=C.get(e);if(t)return C.delete(e),C.set(e,t),t;if(t=E(e),C.set(e,t),C.size>w){let e=C.entries().next().value;if(!e)return t;let[n,r]=e;C.delete(n),r.dispose()}return t}function E(e){let t=b(e^2654435769),n=[];for(let e=0;e<4;e++){let e=new Float32Array(65536);for(let n=0;n<e.length;n++)e[n]=t()*2-1;let r=S(S(e,256,256,.9,!0),256,256,.9,!1),i=S(S(e,256,256,2.6,!0),256,256,2.6,!1),a=new Float32Array(65536),o=0;for(let e=0;e<a.length;e++){let t=(r[e]??0)-(i[e]??0);a[e]=t,o+=t}o/=a.length;let s=0;for(let e=0;e<a.length;e++){let t=(a[e]??0)-o;a[e]=t,s+=t*t}s=Math.sqrt(s/a.length)||1;for(let e=0;e<a.length;e++)a[e]=(a[e]??0)/s;n.push(a)}let r=new Uint8Array(262144);for(let e=0;e<65536;e++)for(let t=0;t<4;t++)r[e*4+t]=Math.max(0,Math.min(255,Math.round(127.5+(n[t]?.[e]??0)*42)));let i=new m(r,256,256,g);return i.wrapS=i.wrapT=h,i.minFilter=i.magFilter=d,i.needsUpdate=!0,i}var D=[.0415,.0485,.0519],O=.07,k=`
uniform float uTime, uBreeze, uWeight, uDrape;
uniform vec2  uSheetSize;
uniform vec4  uFoldA;            // amplitudes 0..3
uniform vec4  uFoldA2;           // amplitude 4 in .x, fphase .y, seedOff .zw
uniform vec4  uFoldKx, uFoldKy;  // wavevectors 0..3
uniform vec4  uFoldPhi, uFoldSpd;
uniform vec2  uFoldK4;           // wavevector 4
uniform vec2  uFold4PS;          // phi4, spd4
varying vec3 vWPos; varying vec3 vWNormal; varying vec2 vUv; varying float vViewDist;

void main(){
  vec2 p = (uv - 0.5) * uSheetSize;
  float energy = clamp(uBreeze*uBreeze / max(uWeight, 0.2), 0.15, 1.6);
  float z = 0.0; vec2 grad = vec2(0.0);
  // traveling folds (analytic partials accumulated)
  for (int i = 0; i < 5; i++){
    vec2 K = (i==0)?vec2(uFoldKx.x,uFoldKy.x):(i==1)?vec2(uFoldKx.y,uFoldKy.y):(i==2)?vec2(uFoldKx.z,uFoldKy.z):(i==3)?vec2(uFoldKx.w,uFoldKy.w):uFoldK4;
    float A = ((i==0)?uFoldA.x:(i==1)?uFoldA.y:(i==2)?uFoldA.z:(i==3)?uFoldA.w:uFoldA2.x) * uDrape;
    float PH = (i==4)?uFold4PS.x:((i==0)?uFoldPhi.x:(i==1)?uFoldPhi.y:(i==2)?uFoldPhi.z:uFoldPhi.w);
    float SP = ((i==4)?uFold4PS.y:((i==0)?uFoldSpd.x:(i==1)?uFoldSpd.y:(i==2)?uFoldSpd.z:uFoldSpd.w)) / max(uWeight, 0.25);
    float ph = dot(K, p) + uTime * SP + PH;
    // static sculpt stays with heavy sheets; energy modulates, never erases
    float Ae = A * (0.55 + 0.45*energy);
    z    += Ae * sin(ph);
    grad += Ae * cos(ph) * K;
  }
  // breeze billow (two-octave lattice), advects slowly
  vec2 bq = p*0.55 + vec2(uTime*0.055, uTime*0.041) + uFoldA2.zw;
  float billow = sin(bq.x)*cos(bq.y*1.7) + 0.5*sin(bq.x*2.3+1.1)*cos(bq.y*0.9+2.0);
  float bAmp = 0.52 * (0.25 + 0.75*energy) * 0.4;
  z += bAmp * billow;
  grad += bAmp * vec2(cos(bq.x)*cos(bq.y*1.7)*0.55 + 1.15*cos(bq.x*2.3+1.1)*cos(bq.y*0.9+2.0)*0.55,
                                 -1.7*sin(bq.x)*sin(bq.y*1.7)*0.55 - 0.45*sin(bq.x*2.3+1.1)*sin(bq.y*0.9+2.0)*0.55);
  // edge flutter: fine fast ripples toward free edges
  float edgeD = min(min(uv.x, 1.0-uv.x), min(uv.y, 1.0-uv.y));
  float fenv = exp(-edgeD*16.0) * 0.015 * uBreeze;
  float fph = uv.x*6.0*6.2831 + uTime*3.4 + uFoldA2.y;
  z += fenv * sin(fph);  // silhouette only: flutter barely changes shading
  // Free-sheet sag: the production recipe uses a gentle bowl.
  vec2 sagDelta = uv - 0.5;
  z += -uWeight * 0.22 * 1.2 * dot(sagDelta, sagDelta);
  z = clamp(z, -0.34*uSheetSize.x, 0.34*uSheetSize.x);

  vec3 displaced = vec3(position.xy, z);
  vec3 nLocal = normalize(vec3(-grad, 1.0));
  vec4 wp = modelMatrix * vec4(displaced, 1.0);
  vWPos = wp.xyz;
  vWNormal = normalize(mat3(modelMatrix) * nLocal);
  vUv = uv;
  vec4 mv = viewMatrix * wp;
  vViewDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,A=`
precision highp float;
uniform vec3 pCoolDeep, pCoolMid, pCoolTip, pWarm, pBodyDeep, pBodyTint;
uniform float uSheen, uGrain, uFogK, uWarmSeed, uDiffuseLook, uValueScale;
uniform float uLining;
uniform vec3 uVoid;
uniform vec4 uCorr; // light corridor: center.xy, angle, width
uniform vec3 uKey, uWarmDir, uCamPos;
uniform sampler2D uGrainTex;
varying vec3 vWPos; varying vec3 vWNormal; varying vec2 vUv; varying float vViewDist;

vec3 rampCool(float t){
  vec3 col = mix(vec3(0.0), pCoolDeep, smoothstep(0.0, 0.25, t));
  col = mix(col, pCoolMid, smoothstep(0.2, 0.62, t));
  col = mix(col, pCoolTip, smoothstep(0.55, 1.0, t));
  return col;
}
void main(){
  vec3 N = normalize(vWNormal);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(uCamPos - vWPos);
  // domain grain: perturb lighting inputs, not final color
  vec2 guv = gl_FragCoord.xy / 256.0;
  float g = (texture2D(uGrainTex, guv).r*2.0-1.0)*0.75 + (texture2D(uGrainTex, guv*0.53+17.31).r*2.0-1.0)*0.45;
  float ndl = max(dot(N, uKey), 0.0);
  float ndlW = clamp(dot(N, uKey), 0.0, 1.0);
  float ndlG = clamp(ndlW + g*uGrain*0.20, 0.0, 1.2);
  float sheenBody = pow(ndl, 3.0);
  float rim = pow(1.0 - abs(dot(N, V)), 2.2);
  float rimG = clamp(rim + g*uGrain*0.25, 0.0, 1.2);
  float ndlR = clamp(ndl + g*uGrain*0.08, 0.0, 1.2);
  float ridge = pow(ndlR, mix(24.0, 8.0, uDiffuseLook)) * uSheen * 1.6;
  // one light corridor per sheet: the lit event; everything else falls dark
  vec2 cd = vUv - uCorr.xy;
  float across = dot(cd, vec2(-sin(uCorr.z), cos(uCorr.z)));
  float corr = exp(-(across*across) / (uCorr.w*uCorr.w));
  float gate = 0.04 + 0.96*corr;
  float diffuse = 0.42 * pow(ndlG, 1.8) * (0.35 + 0.65*uSheen) * gate;
  float fill = 0.10 * pow(max(dot(N, V), 0.0), 2.0) * (0.25 + 0.75*gate);
  vec3 col = pBodyDeep + pBodyTint * (0.16 + 0.44*sheenBody) * (0.45 + 0.55*gate);
  // body speckle on dark faces (Duskfold recipe)
  float gBody = texture2D(uGrainTex, guv*0.71 + 5.13).g*2.0-1.0;
  float bodyMask = 1.0 - smoothstep(0.15, 0.6, ridge + rim*0.55);
  col += pBodyTint * gBody * (0.30 + uGrain*1.4) * 0.5 * bodyMask;
  float tKey = diffuse + fill + ridge*0.7*gate;
  float tRim = rimG*0.5*(0.30 + 0.70*gate);
  float t = tKey + tRim;
  t = t / (1.0 + t*0.30);   // gentle shoulder: keep the luminous core
  col += rampCool(clamp(t, 0.0, 1.0));
  // Tight round silk streak used by the CTA's fixed weave.
  float streak = pow(ndlR, 40.0);
  col += pCoolTip * streak * uSheen * 0.55 * gate;
  // warm patches where folds face the sunset, seeded bands along the sheet
  float band = 0.5 + 0.5*sin(vUv.x*6.2831*1.7 + uWarmSeed);
  float warmFace = smoothstep(0.2, 0.9, dot(N, uWarmDir)) * smoothstep(0.45, 0.9, band);
  col += pWarm * warmFace * (0.14 + 0.6*rim) * (0.30 + 0.70*corr);
  // silver lining: backlight wrapping the fabric hem. Free edges only
  // (same edge logic as the flutter), brighter where the face turns away
  // from the key, half-gated by the corridor so it stays a light event.
  float hemD = min(min(vUv.x, 1.0-vUv.x), min(vUv.y, 1.0-vUv.y));
  float hem = exp(-hemD * 80.0);
  float back = 0.55 + 0.45*(1.0 - ndl);
  col += mix(pCoolTip, vec3(1.0), 0.25) * hem * uLining * back * 1.6 * (0.55 + 0.45*rim) * (0.55 + 0.45*corr);
  col *= uValueScale;
  // Depth fog settles into the charcoal void, which also acts as the floor.
  col = mix(col, uVoid, 1.0 - exp(-vViewDist * uFogK));
  col = max(col, uVoid);
  gl_FragColor = vec4(col, 1.0);
}
`,j=`
varying vec2 vUv; varying float vViewDist;
void main(){ vUv = uv; vec4 mv = viewMatrix * modelMatrix * vec4(position,1.0); vViewDist = -mv.z; gl_Position = projectionMatrix * mv; }
`,M=`
precision highp float;
uniform vec3 pSky0, pSky1, pSky2, pSky3, pCorner;
uniform vec3 uVoid;
uniform float uFogK, uValueScale;
varying vec2 vUv; varying float vViewDist;
void main(){
  float t = vUv.y;
  float w1 = 0.30;
  vec3 c = mix(pSky0, pSky1, smoothstep(0.0, w1, t));
  c = mix(c, pSky2, smoothstep(w1*0.72, w1+0.30, t));
  c = mix(c, pSky3, smoothstep(w1+0.20, 1.0, t));
  // strong lateral vignette so only the central corridor glows
  float vig = smoothstep(0.95, 0.35, abs(vUv.x-0.5)*2.0);
  // dusk lives in a low horizon band; above it the sky falls to black
  float env = exp(-pow((t - 0.11) / 0.15, 2.0)) * smoothstep(0.0, 0.06, t);
  c *= (0.06 + 0.94*env) * 0.55;
  c *= vig * 0.9;
  c += pCorner * (1.0-vig) * env * 0.4;
  c *= uValueScale;
  c = mix(c, vec3(0.0), 1.0 - exp(-vViewDist * uFogK * 0.55));
  c = max(c, uVoid);  // the sky floor is charcoal, not black
  gl_FragColor = vec4(c, 1.0);
}
`,N=`
precision highp float;
uniform sampler2D tColor, tDepth;
uniform vec2 uDir, uRes;
uniform float uFocusDist, uApertureK, uMaxBlur, uNear, uFar;
varying vec2 vUv;
float linDepth(float z){ float ndc = z*2.0-1.0; return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear)); }
float cocAt(vec2 uv){ float d = linDepth(texture2D(tDepth, uv).x); return clamp(abs(d - uFocusDist)*uApertureK, 0.0, uMaxBlur); }
void main(){
  float coc = cocAt(vUv);
  vec4 acc = texture2D(tColor, vUv); float wsum = 1.0;
  for (int i = 1; i <= 4; i++){
    float fi = float(i);
    vec2 off = uDir * (fi * coc / 4.0) / uRes;
    float w0 = exp(-fi*fi*0.18);
    // reject sharp (in-focus) neighbors so they don't bleed halos into bokeh
    float wA = w0 * clamp(cocAt(vUv + off) / max(coc, 0.001), 0.0, 1.0);
    float wB = w0 * clamp(cocAt(vUv - off) / max(coc, 0.001), 0.0, 1.0);
    acc += texture2D(tColor, vUv + off) * wA;
    acc += texture2D(tColor, vUv - off) * wB;
    wsum += wA + wB;
  }
  gl_FragColor = acc / wsum;
}
`,P=`
precision highp float;
uniform sampler2D tSharp, tBlur, tDepth, uGrainTex;
uniform float uFocusDist, uApertureK, uMaxBlur, uNear, uFar, uVibrance, uGrain, uTime;
uniform vec2 uRes;
varying vec2 vUv;
float linDepth(float z){ float ndc = z*2.0-1.0; return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear)); }
float hash21(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
vec3 tanhCompat(vec3 x){ return vec3(2.0) / (vec3(1.0) + exp(-2.0*x)) - vec3(1.0); }
void main(){
  float d = linDepth(texture2D(tDepth, vUv).x);
  float coc = clamp(abs(d - uFocusDist)*uApertureK, 0.0, uMaxBlur);
  float mixAmt = smoothstep(0.15, uMaxBlur*0.8, coc);
  vec4 sharp = texture2D(tSharp, vUv);
  vec4 blur = texture2D(tBlur, vUv);
  float a = mix(sharp.a, blur.a, mixAmt);
  vec3 col = mix(sharp.rgb, blur.rgb, mixAmt);
  // tonemap + vibrance (Duskfold finish)
  col = 0.93 * tanhCompat(col / 0.82);
  float tl = dot(col, vec3(0.299,0.587,0.114));
  col = mix(vec3(tl), col, uVibrance);
  col = clamp(col, 0.0, 1.0);
  // fine residual grain in mid tones (band-pass texture)
  float gcell = max(1.0, uRes.y / 900.0);
  float gm = texture2D(uGrainTex, gl_FragCoord.xy/(256.0*gcell)).b*2.0-1.0;
  float lw = smoothstep(0.012, 0.18, tl) * (1.0 - 0.40*smoothstep(0.55, 0.95, tl));
  col *= 1.0 + gm * (uGrain*0.45) * lw;
  col += (hash21(gl_FragCoord.xy + uTime) - 0.5)/255.0;
  gl_FragColor = vec4(col, a);
}
`,F=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,I=class{canvas;renderer;scene;camera;_quadScene;_quadCam;_quad;time;focusDist;aperture;sheets;_targets;_grainTex;_sky=null;_blurMat=null;_compMat=null;constructor(r){this.canvas=r,this.renderer=new v({canvas:r,antialias:!0,alpha:!1}),this.renderer.setClearColor(new f(...D),1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.scene=new a,this.camera=new t(38,16/9,.1,40),this.time=0,this.focusDist=6,this.aperture=.55,this.sheets=[],this._quadScene=new a,this._quadCam=new n(-1,1,1,-1,0,1),this._quad=new e(new o(2,2),new s),this._quadScene.add(this._quad),this._targets=null,this._grainTex=null}build(t){let n=x(t.seed),r=b(n),a=new i(...D),d=y.ember;this._grainTex=T(n);for(let e of this.sheets)e.mesh.geometry.dispose(),e.mesh.material.dispose(),this.scene.remove(e.mesh);this.sheets=[],this._sky&&=(this.scene.remove(this._sky),this._sky.geometry.dispose(),this._sky.material.dispose(),null);let f=e=>new i(e[0],e[1],e[2]),p=new i(-.55+r()*.25,.55+r()*.2,.45).normalize(),m=new i(.1*(r()-.5),-.85,.35).normalize(),h=new _(16,16,18,48,1,!0,Math.PI*.65,Math.PI*.7),g=new s({vertexShader:j,fragmentShader:M,side:1,uniforms:{pSky0:{value:f(d.sky0)},pSky1:{value:f(d.sky1)},pSky2:{value:f(d.sky2)},pSky3:{value:f(d.sky3)},pCorner:{value:f(d.corner)},uVoid:{value:a.clone()},uFogK:{value:O},uValueScale:{value:d.valueScale}}});this._sky=new e(h,g),this._sky.position.set(0,-1.5,-10),this.scene.add(this._sky);for(let[r,h]of t.sheets.entries()){let g=b(n^4096*(r+1)),_=3.2,v=1.8,y=new o(_,v,220,124),x=g()*Math.PI,S=[],C=[],w=[],T=[],E=[];for(let e=0;e<5;e++){let e=_*(.25+g()*.55),t=2*Math.PI/e,n=x+(g()-.5)*.7;S.push(Math.cos(n)*t),C.push(Math.sin(n)*t),w.push(.3/(t*.5)*(.7+g()*.6)),T.push(g()*Math.PI*2),E.push(.6/Math.sqrt(t))}let D=new s({vertexShader:k,fragmentShader:A,side:2,uniforms:{uTime:{value:0},uBreeze:{value:t.params.breeze},uWeight:{value:.35+t.params.weight*1.25},uDrape:{value:h.drape},uSheetSize:{value:new u(_,v)},uFoldA:{value:new l(w[0],w[1],w[2],w[3])},uFoldA2:{value:new l(w[4],g()*6.283,g()*10,g()*10)},uFoldKx:{value:new l(S[0],S[1],S[2],S[3])},uFoldKy:{value:new l(C[0],C[1],C[2],C[3])},uFoldPhi:{value:new l(T[0],T[1],T[2],T[3])},uFoldSpd:{value:new l(E[0],E[1],E[2],E[3])},uFoldK4:{value:new u(S[4],C[4])},uFold4PS:{value:new u(T[4],E[4])},pCoolDeep:{value:f(d.coolDeep)},pCoolMid:{value:f(d.coolMid)},pCoolTip:{value:f(d.coolTip)},pWarm:{value:f(d.warm)},pBodyDeep:{value:f(d.bodyDeep)},pBodyTint:{value:f(d.bodyTint)},uSheen:{value:h.sheen},uGrain:{value:t.params.grain},uFogK:{value:O},uLining:{value:t.params.lining},uVoid:{value:a.clone()},uCorr:{value:new l(.3+g()*.4,.3+g()*.4,g()*Math.PI,.24+g()*.18)},uWarmSeed:{value:g()*6.283},uDiffuseLook:{value:t.params.diffuseLook},uValueScale:{value:d.valueScale},uKey:{value:p},uWarmDir:{value:m},uCamPos:{value:new i},uGrainTex:{value:this._grainTex}}}),j=new e(y,D);j.position.set(h.pos[0],h.pos[1],h.pos[2]),j.rotation.set(c.degToRad(h.tilt),c.degToRad(h.turn),0),j.scale.setScalar(h.scale),this.scene.add(j),this.sheets.push({mesh:j})}let v=t.camera;this.camera.position.set(v.pos[0],v.pos[1],v.pos[2]),this.camera.lookAt(v.look[0],v.look[1],v.look[2]),this.focusDist=t.focus.dist,this.aperture=t.focus.aperture,this.time=t.time}setSize(e,t){this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this._allocTargets(e,t)}dispose(){for(let e of this.sheets)e.mesh.geometry.dispose(),e.mesh.material.dispose(),this.scene.remove(e.mesh);if(this.sheets=[],this._sky&&=(this.scene.remove(this._sky),this._sky.geometry.dispose(),this._sky.material.dispose(),null),this._targets){for(let e of[`color`,`blurA`,`blurB`])this._targets[e].dispose();this._targets.depthTex.dispose()}this._targets=null,this._blurMat?.dispose(),this._compMat?.dispose(),this._quad&&this._quad.geometry.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss()}_allocTargets(e,t){let n=this.renderer.getPixelRatio(),i=Math.round(e*n),a=Math.round(t*n);if(this._targets&&this._targets.W===i&&this._targets.H===a)return;if(this._targets){for(let e of[`color`,`blurA`,`blurB`])this._targets[e].dispose();this._targets.depthTex.dispose()}this._blurMat?.dispose(),this._compMat?.dispose();let o=new p(i,a),c=new r(i,a,{depthTexture:o,samples:4}),l=new r(i>>1,a>>1),d=new r(i>>1,a>>1);this._targets={W:i,H:a,color:c,blurA:l,blurB:d,depthTex:o};let f=(e,t)=>new s({vertexShader:F,fragmentShader:e,uniforms:t});this._blurMat=f(N,{tColor:{value:null},tDepth:{value:o},uDir:{value:new u(1,0)},uRes:{value:new u(i>>1,a>>1)},uFocusDist:{value:6.5},uApertureK:{value:2},uMaxBlur:{value:14},uNear:{value:this.camera.near},uFar:{value:this.camera.far}}),this._compMat=f(P,{tSharp:{value:c.texture},tBlur:{value:d.texture},tDepth:{value:o},uGrainTex:{value:this._grainTex},uFocusDist:{value:6.5},uApertureK:{value:2},uMaxBlur:{value:14},uNear:{value:this.camera.near},uFar:{value:this.camera.far},uVibrance:{value:y.ember.vibrance},uGrain:{value:.07},uTime:{value:0},uRes:{value:new u(i,a)}})}tick(e){this.time+=1/60*e}render(e){let t=this._targets,n=this._blurMat,r=this._compMat;if(!t||!n||!r)return;for(let t of this.sheets){let n=t.mesh.material.uniforms;n.uTime.value=this.time,n.uBreeze.value=e.breeze,n.uWeight.value=.35+e.weight*1.25,n.uGrain.value=e.grain,n.uLining.value=e.lining,n.uCamPos.value.copy(this.camera.position),n.uGrainTex.value=this._grainTex}let i=.4+this.aperture*3.6;for(let e of[n,r])e.uniforms.uFocusDist.value=this.focusDist,e.uniforms.uApertureK.value=i;r.uniforms.uGrain.value=e.grain,r.uniforms.uVibrance.value=y.ember.vibrance,r.uniforms.uGrainTex.value=this._grainTex,r.uniforms.uTime.value=0;let a=this.renderer;a.setRenderTarget(t.color),a.render(this.scene,this.camera),this._quad.material=n,n.uniforms.tColor.value=t.color.texture,n.uniforms.uDir.value.set(1,0),a.setRenderTarget(t.blurA),a.render(this._quadScene,this._quadCam),n.uniforms.tColor.value=t.blurA.texture,n.uniforms.uDir.value.set(0,1),a.setRenderTarget(t.blurB),a.render(this._quadScene,this._quadCam),this._quad.material=r,a.setRenderTarget(null),a.render(this._quadScene,this._quadCam)}};export{I as SilkScene};
