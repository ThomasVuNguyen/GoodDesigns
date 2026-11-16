import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{B as t,y as n,z as r}from"./vendors-D1Zalr9i.js";import{t as i}from"./HpPartnershipsPage.module.css-C72Ey62e.js";var a=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;

uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform float u_pxSize;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_objectHelperBox;

out vec2 v_responsiveUV;
out vec2 v_responsiveBoxSize;
out vec2 v_responsiveHelperBox;
out vec2 v_responsiveBoxGivenSize;

out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_patternHelperBox;

out vec2 v_imageUV;

// #define ADD_HELPERS

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================
  // Sizing api for graphic objects with fixed ratio
  // (currently supports only ratio = 1)

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  #ifdef ADD_HELPERS
  v_objectHelperBox = uv;
  v_objectHelperBox *= objectWorldScale;
  v_objectHelperBox += boxOrigin * (objectWorldScale - 1.);
  #endif

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;


  // ===================================================


  // ===================================================
  // Sizing api for graphic objects with either givenBoxSize ratio or canvas ratio.
  // Full-screen mode available with u_worldWidth = u_worldHeight = 0

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  v_responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / v_responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================


  // ===================================================
  // Sizing api for patterns
  // (treating graphics as a image u_worldWidth x u_worldHeight size)

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  #ifdef ADD_HELPERS
  v_patternHelperBox = uv;
  v_patternHelperBox *= patternBoxScale;
  v_patternHelperBox += boxOrigin * (patternBoxScale - 1.);
  #endif

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================


  // ===================================================
  // Sizing api for images

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  #ifdef ADD_HELPERS
  vec2 imageHelperBox = uv;
  imageHelperBox *= imageBoxScale;
  imageHelperBox += boxOrigin * (imageBoxScale - 1.);
  #endif

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;

  // ===================================================

}`,o=8294400,s=class{parentElement;canvasElement;gl;program=null;uniformLocations={};fragmentShader;rafId=null;lastRenderTime=0;currentFrame=0;speed=0;currentSpeed=0;providedUniforms;hasBeenDisposed=!1;resolutionChanged=!0;textures=new Map;minPixelRatio;maxPixelCount;isSafari=d();uniformCache={};textureUnitMap=new Map;constructor(e,t,n,r,i=0,a=0,s=2,c=o){if(e instanceof HTMLElement)this.parentElement=e;else throw Error(`Paper Shaders: parent element must be an HTMLElement`);if(!document.querySelector(`style[data-paper-shader]`)){let e=document.createElement(`style`);e.innerHTML=u,e.setAttribute(`data-paper-shader`,``),document.head.prepend(e)}let l=document.createElement(`canvas`);this.canvasElement=l,this.parentElement.prepend(l),this.fragmentShader=t,this.providedUniforms=n,this.currentFrame=a,this.minPixelRatio=s,this.maxPixelCount=c;let d=l.getContext(`webgl2`,r);if(!d)throw Error(`Paper Shaders: WebGL is not supported in this browser`);this.gl=d,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener(`resize`,this.handleVisualViewportChange),this.setSpeed(i),this.parentElement.setAttribute(`data-paper-shader`,``),this.parentElement.paperShaderMount=this,document.addEventListener(`visibilitychange`,this.handleDocumentVisibilityChange)}initProgram=()=>{let e=l(this.gl,a,this.fragmentShader);e&&(this.program=e)};setupPositionAttribute=()=>{let e=this.gl.getAttribLocation(this.program,`a_position`),t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)};setupUniforms=()=>{let e={u_time:this.gl.getUniformLocation(this.program,`u_time`),u_pixelRatio:this.gl.getUniformLocation(this.program,`u_pixelRatio`),u_resolution:this.gl.getUniformLocation(this.program,`u_resolution`)};Object.entries(this.providedUniforms).forEach(([t,n])=>{if(e[t]=this.gl.getUniformLocation(this.program,t),n instanceof HTMLImageElement){let n=`${t}AspectRatio`;e[n]=this.gl.getUniformLocation(this.program,n)}}),this.uniformLocations=e};renderScale=1;parentWidth=0;parentHeight=0;parentDevicePixelWidth=0;parentDevicePixelHeight=0;devicePixelsSupported=!1;resizeObserver=null;setupResizeObserver=()=>{this.resizeObserver=new ResizeObserver(([e])=>{if(e?.borderBoxSize[0]){let t=e.devicePixelContentBoxSize?.[0];t!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=t.inlineSize,this.parentDevicePixelHeight=t.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)};handleVisualViewportChange=()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()};handleResize=()=>{let e=0,t=0,n=Math.max(1,window.devicePixelRatio),r=visualViewport?.scale??1;if(this.devicePixelsSupported){let i=Math.max(1,this.minPixelRatio/n);e=this.parentDevicePixelWidth*i*r,t=this.parentDevicePixelHeight*i*r}else{let i=Math.max(n,this.minPixelRatio)*r;if(this.isSafari){let e=f();i*=Math.max(1,e)}e=Math.round(this.parentWidth)*i,t=Math.round(this.parentHeight)*i}let i=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*t),a=Math.min(1,i),o=Math.round(e*a),s=Math.round(t*a),c=o/Math.round(this.parentWidth);(this.canvasElement.width!==o||this.canvasElement.height!==s||this.renderScale!==c)&&(this.renderScale=c,this.canvasElement.width=o,this.canvasElement.height=s,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))};render=e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn(`Tried to render before program or gl was initialized`);return}let t=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=t*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&=(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed===0?this.rafId=null:this.requestRender()};requestRender=()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)};setTextureUniform=(e,t)=>{if(!t.complete||t.naturalWidth===0)throw Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let n=this.textures.get(e);n&&this.gl.deleteTexture(n),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let r=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+r);let i=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t),e!==`u_noiseTexture`&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let a=this.gl.getError();if(a!==this.gl.NO_ERROR||i===null){console.error(`Paper Shaders: WebGL error when uploading texture:`,a);return}this.textures.set(e,i);let o=this.uniformLocations[e];if(o){this.gl.uniform1i(o,r);let n=`${e}AspectRatio`,i=this.uniformLocations[n];if(i){let e=t.naturalWidth/t.naturalHeight;this.gl.uniform1f(i,e)}}};areUniformValuesEqual=(e,t)=>e===t?!0:Array.isArray(e)&&Array.isArray(t)&&e.length===t.length?e.every((e,n)=>this.areUniformValuesEqual(e,t[n])):!1;setUniformValues=e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([e,t])=>{let n=t;if(t instanceof HTMLImageElement&&(n=`${t.src.slice(0,200)}|${t.naturalWidth}x${t.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[e],n))return;this.uniformCache[e]=n;let r=this.uniformLocations[e];if(!r){console.warn(`Uniform location for ${e} not found`);return}if(t instanceof HTMLImageElement)this.setTextureUniform(e,t);else if(Array.isArray(t)){let n=null,i=null;if(t[0]!==void 0&&Array.isArray(t[0])){let r=t[0].length;if(t.every(e=>e.length===r))n=t.flat(),i=r;else{console.warn(`All child arrays must be the same length for ${e}`);return}}else n=t,i=n.length;switch(i){case 2:this.gl.uniform2fv(r,n);break;case 3:this.gl.uniform3fv(r,n);break;case 4:this.gl.uniform4fv(r,n);break;case 9:this.gl.uniformMatrix3fv(r,!1,n);break;case 16:this.gl.uniformMatrix4fv(r,!1,n);break;default:console.warn(`Unsupported uniform array length: ${i}`)}}else typeof t==`number`?this.gl.uniform1f(r,t):typeof t==`boolean`?this.gl.uniform1i(r,+!!t):console.warn(`Unsupported uniform type for ${e}: ${typeof t}`)})};getCurrentFrame=()=>this.currentFrame;setFrame=e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())};setSpeed=(e=1)=>{this.speed=e,this.setCurrentSpeed(document.hidden?0:e)};setCurrentSpeed=e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)};setMaxPixelCount=(e=o)=>{this.maxPixelCount=e,this.handleResize()};setMinPixelRatio=(e=2)=>{this.minPixelRatio=e,this.handleResize()};setUniforms=e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())};handleDocumentVisibilityChange=()=>{this.setCurrentSpeed(document.hidden?0:this.speed)};dispose=()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&=(this.resizeObserver.disconnect(),null),visualViewport?.removeEventListener(`resize`,this.handleVisualViewportChange),document.removeEventListener(`visibilitychange`,this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount}};function c(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(`An error occurred compiling the shaders: `+e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function l(e,t,n){let r=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),i=r?r.precision:null;i&&i<23&&(t=t.replace(/precision\s+(lowp|mediump)\s+float;/g,`precision highp float;`),n=n.replace(/precision\s+(lowp|mediump)\s+float/g,`precision highp float`).replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,`$1 highp $3`));let a=c(e,e.VERTEX_SHADER,t),o=c(e,e.FRAGMENT_SHADER,n);if(!a||!o)return null;let s=e.createProgram();return s?(e.attachShader(s,a),e.attachShader(s,o),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?(e.detachShader(s,a),e.detachShader(s,o),e.deleteShader(a),e.deleteShader(o),s):(console.error(`Unable to initialize the shader program: `+e.getProgramInfoLog(s)),e.deleteProgram(s),e.deleteShader(a),e.deleteShader(o),null)):null}var u=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function d(){let e=navigator.userAgent.toLowerCase();return e.includes(`safari`)&&!e.includes(`chrome`)&&!e.includes(`android`)}function f(){let e=visualViewport?.scale??1,t=visualViewport?.width??window.innerWidth,n=window.innerWidth-document.documentElement.clientWidth,r=e*t+n,i=outerWidth/r,a=Math.round(100*i);return a%5==0?a/100:a===33?1/3:a===67?2/3:a===133?4/3:i}var p=`
in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_patternUV;
in vec2 v_imageUV;`,m=`
in vec2 v_objectBoxSize;
in vec2 v_objectHelperBox;
in vec2 v_responsiveBoxSize;
in vec2 v_responsiveHelperBox;
in vec2 v_patternBoxSize;
in vec2 v_patternHelperBox;`,h=`
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;`,g={fit:`contain`,scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},_={none:0,contain:1,cover:2},v=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,y=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,b=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`,x={maxColorCount:10},S=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${x.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

${p}
${m}
${h}

out vec4 fragColor;

${v}
${y}
${b}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + mod(float(i), 3.) * .3;
  float c = .8 + mod(float(i + 1), 4.) * 0.25;

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 shape_uv = v_objectUV;
  shape_uv += .5;

  vec2 grainUV = v_objectUV;
  // apply inverse transform to grain_uv so it respects the originXY
  float grainUVRot = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(grainUVRot), sin(grainUVRot), -sin(grainUVRot), cos(grainUVRot));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);
  grainUV = transpose(graphicRotation) * grainUV;
  grainUV *= u_scale;
  grainUV *= .7;
  grainUV -= graphicOffset;
  grainUV *= v_objectBoxSize;
  
  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  const float firstFrameOffset = 41.5;
  float t = .5 * (u_time + firstFrameOffset);

  float radius = smoothstep(0., 1., length(shape_uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    shape_uv.x += u_distortion * center / i * sin(t + i * .4 * smoothstep(.0, 1., shape_uv.y)) * cos(.2 * t + i * 2.4 * smoothstep(.0, 1., shape_uv.y));
    shape_uv.y += u_distortion * center / i * cos(t + i * 2. * smoothstep(.0, 1., shape_uv.x));
  }

  vec2 uvRotated = shape_uv;
  uvRotated -= vec2(.5);
  float angle = 3. * u_swirl * radius;
  uvRotated = rotate(uvRotated, -angle);
  uvRotated += vec2(.5);

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;

  for (int i = 0; i < ${x.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, t) + mixerGrain;
    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float dist = length(uvRotated - pos);

    dist = pow(dist, 3.5);
    float weight = 1. / (dist + 1e-3);
    color += colorFraction * weight;
    opacity += opacityFraction * weight;
    totalWeight += weight;
  }

  color /= totalWeight;
  opacity /= totalWeight;

  float rr = noise(rotate(grainUV, 1.), vec2(3.));
  float gg = noise(rotate(grainUV, 2.) + 10., vec2(-1.));
  float bb = noise(grainUV - 2., vec2(5.));
  vec3 grainColor = vec3(rr, gg, bb);
  color = mix(color, grainColor, .01 + .3 * u_grainOverlay);
  
  fragColor = vec4(color, opacity);
}
`;function C(e){if(Array.isArray(e))return e.length===4?e:e.length===3?[...e,1]:k;if(typeof e!=`string`)return k;let t,n,r,i=1;if(e.startsWith(`#`))[t,n,r,i]=w(e);else if(e.startsWith(`rgb`))[t,n,r,i]=T(e);else if(e.startsWith(`hsl`))[t,n,r,i]=D(E(e));else return console.error(`Unsupported color format`,e),k;return[O(t,0,1),O(n,0,1),O(r,0,1),O(i,0,1)]}function w(e){return e=e.replace(/^#/,``),e.length===3&&(e=e.split(``).map(e=>e+e).join(``)),e.length===6&&(e+=`ff`),[parseInt(e.slice(0,2),16)/255,parseInt(e.slice(2,4),16)/255,parseInt(e.slice(4,6),16)/255,parseInt(e.slice(6,8),16)/255]}function T(e){let t=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`)/255,parseInt(t[2]??`0`)/255,parseInt(t[3]??`0`)/255,t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}function E(e){let t=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`),parseInt(t[2]??`0`),parseInt(t[3]??`0`),t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}function D(e){let[t,n,r,i]=e,a=t/360,o=n/100,s=r/100,c,l,u;if(n===0)c=l=u=s;else{let e=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e),t=s<.5?s*(1+o):s+o-s*o,n=2*s-t;c=e(n,t,a+1/3),l=e(n,t,a),u=e(n,t,a-1/3)}return[c,l,u,i]}var O=(e,t,n)=>Math.min(Math.max(e,t),n),k=[0,0,0,1];function A(){if(typeof window>`u`){console.warn(`Paper Shaders: can’t create an image on the server`);return}let e=new Image;return e.src=j,e}var j=`data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`,M=e(r(),1);function N(e){let t=M.useRef(void 0),n=M.useCallback(t=>{let n=e.map(e=>{if(e!=null){if(typeof e==`function`){let n=e,r=n(t);return typeof r==`function`?r:()=>{n(null)}}return e.current=t,()=>{e.current=null}}});return()=>{n.forEach(e=>e?.())}},e);return M.useMemo(()=>e.every(e=>e==null)?null:e=>{t.current&&=(t.current(),void 0),e!=null&&(t.current=n(e))},e)}var P=t();async function F(e){let t={},n=[],r=e=>{try{return e.startsWith(`/`)||new URL(e),!0}catch{return!1}},i=e=>{try{return!e.startsWith(`/`)&&new URL(e,window.location.origin).origin!==window.location.origin}catch{return!1}};return Object.entries(e).forEach(([e,a])=>{if(typeof a==`string`){if(!a){t[e]=A();return}if(!r(a)){console.warn(`Uniform "${e}" has invalid URL "${a}". Skipping image loading.`);return}let o=new Promise((n,r)=>{let o=new Image;i(a)&&(o.crossOrigin=`anonymous`),o.onload=()=>{t[e]=o,n()},o.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${a}`),r()},o.src=a});n.push(o)}else t[e]=a}),await Promise.all(n),t}var I=(0,M.forwardRef)(function({fragmentShader:e,uniforms:t,webGlContextAttributes:n,speed:r=0,frame:i=0,width:a,height:o,minPixelRatio:c,maxPixelCount:l,style:u,...d},f){let[p,m]=(0,M.useState)(!1),h=(0,M.useRef)(null),g=(0,M.useRef)(null),_=(0,M.useRef)(n);(0,M.useEffect)(()=>((async()=>{let n=await F(t);h.current&&!g.current&&(g.current=new s(h.current,e,n,_.current,r,i,c,l),m(!0))})(),()=>{g.current?.dispose(),g.current=null}),[e]),(0,M.useEffect)(()=>{let e=!1;return(async()=>{let n=await F(t);e||g.current?.setUniforms(n)})(),()=>{e=!0}},[t,p]),(0,M.useEffect)(()=>{g.current?.setSpeed(r)},[r,p]),(0,M.useEffect)(()=>{g.current?.setMaxPixelCount(l)},[l,p]),(0,M.useEffect)(()=>{g.current?.setMinPixelRatio(c)},[c,p]),(0,M.useEffect)(()=>{g.current?.setFrame(i)},[i,p]);let v=N([h,f]);return(0,P.jsx)(`div`,{ref:v,style:a!==void 0||o!==void 0?{width:a,height:o,...u}:u,...d})});I.displayName=`ShaderMount`;function L(e,t){for(let n in e){if(n===`colors`){let n=Array.isArray(e.colors),r=Array.isArray(t.colors);if(!n||!r){if(Object.is(e.colors,t.colors)===!1)return!1;continue}if(e.colors?.length!==t.colors?.length||!e.colors?.every((e,n)=>e===t.colors?.[n]))return!1;continue}if(Object.is(e[n],t[n])===!1)return!1}return!0}var R={name:`Default`,params:{...g,speed:1,frame:0,colors:[`#e0eaff`,`#241d9a`,`#f75092`,`#9f50d3`],distortion:.8,swirl:.1,grainMixer:0,grainOverlay:0}};({...g}),{...g},{...g};var z=(0,M.memo)(function({speed:e=R.params.speed,frame:t=R.params.frame,colors:n=R.params.colors,distortion:r=R.params.distortion,swirl:i=R.params.swirl,grainMixer:a=R.params.grainMixer,grainOverlay:o=R.params.grainOverlay,fit:s=R.params.fit,rotation:c=R.params.rotation,scale:l=R.params.scale,originX:u=R.params.originX,originY:d=R.params.originY,offsetX:f=R.params.offsetX,offsetY:p=R.params.offsetY,worldWidth:m=R.params.worldWidth,worldHeight:h=R.params.worldHeight,...g}){let v={u_colors:n.map(C),u_colorsCount:n.length,u_distortion:r,u_swirl:i,u_grainMixer:a,u_grainOverlay:o,u_fit:_[s],u_rotation:c,u_scale:l,u_offsetX:f,u_offsetY:p,u_originX:u,u_originY:d,u_worldWidth:m,u_worldHeight:h};return(0,P.jsx)(I,{...g,speed:e,frame:t,fragmentShader:S,uniforms:v})},L),B=e(n(),1),V=[`#000000`,`#1e4a80`,`#000000`,`#294431`,`#9f6f41`,`#1e4a80`,`#000000`,`#294431`,`#000000`,`#1e4a80`,`#000000`,`#9f6f41`],H=[185,205,235],U=140,W=.12,G=`data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%20opacity%3D%221%22%2F%3E%3C%2Fsvg%3E`,K=`data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22256%22%20height%3D%22256%22%3E%3Cfilter%20id%3D%22d%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%221.4%22%20numOctaves%3D%221%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23d)%22%20opacity%3D%221%22%2F%3E%3C%2Fsvg%3E`;function q(){let e=(0,M.useRef)(null),t=(0,M.useRef)(null),n=(0,M.useRef)(null),r=(0,M.useRef)(null),[a,o]=(0,M.useState)(!1),[s,c]=(0,M.useState)(!1),[l,u]=(0,M.useState)(!1),d=a&&s&&!l;return(0,M.useEffect)(()=>{let t=e.current;if(!t)return;let n=window.matchMedia(`(prefers-reduced-motion: reduce)`),r=()=>u(n.matches),i=()=>c(!document.hidden),a=new IntersectionObserver(([e])=>{o(e?.isIntersecting??!1)});return r(),i(),n.addEventListener(`change`,r),document.addEventListener(`visibilitychange`,i),a.observe(t),()=>{n.removeEventListener(`change`,r),document.removeEventListener(`visibilitychange`,i),a.disconnect()}},[]),(0,M.useEffect)(()=>{if(!d)return;let e=0,r=performance.now(),i=a=>{let o=Math.floor((a-r)/(1e3/18)),s=o*37%128,c=o*53%128;t.current&&(t.current.style.transform=`translate3d(${s}px, ${c}px, 0)`),n.current&&(n.current.style.transform=`translate3d(${(s*3+41)%128}px, ${(c*5+89)%128}px, 0)`),e=window.requestAnimationFrame(i)};return e=window.requestAnimationFrame(i),()=>window.cancelAnimationFrame(e)},[d]),(0,M.useEffect)(()=>{let e=r.current;if(!e)return;let t=e.getContext(`2d`,{alpha:!0});if(!t)return;let n=Math.min(Math.max(window.devicePixelRatio||1,1),2),i=0,a=0,o=0,s=performance.now(),c=(e,t)=>e+Math.random()*(t-e),l=Array.from({length:U},()=>({x:Math.random()*e.clientWidth,y:Math.random()*e.clientHeight,vx:c(-.08,.08),vy:c(-.15,-.02),size:c(.25,.8),baseOpacity:c(.03,.16),wobblePhase:Math.random()*Math.PI*2,wobbleSpeed:c(5e-4,.002),wobbleAmplitude:c(.15,.5)})),u=()=>{i=e.clientWidth,a=e.clientHeight,e.width=Math.floor(i*n),e.height=Math.floor(a*n),t.setTransform(n,0,0,n,0,0)},f=e=>{t.clearRect(0,0,i,a),t.globalCompositeOperation=`screen`;for(let n of l){n.wobblePhase+=n.wobbleSpeed*e;let r=Math.sin(n.wobblePhase)*n.wobbleAmplitude;n.x+=(n.vx+r*.1)*W*e,n.y+=n.vy*W*e,n.y<-4&&(n.y=a+4,n.x=Math.random()*i),n.x<-4&&(n.x=i+4),n.x>i+4&&(n.x=-4),t.fillStyle=`rgba(${H[0]}, ${H[1]}, ${H[2]}, ${n.baseOpacity})`,t.beginPath(),t.arc(n.x,n.y,n.size,0,Math.PI*2),t.fill()}},p=e=>{let t=Math.min(e-s,50);s=e,f(t),o=window.requestAnimationFrame(p)};u(),f(0);let m=new ResizeObserver(u);return m.observe(e),d&&(o=window.requestAnimationFrame(p)),()=>{window.cancelAnimationFrame(o),m.disconnect()}},[d]),(0,P.jsxs)(`div`,{ref:e,"aria-hidden":`true`,className:i.shaderRoot,children:[(0,P.jsx)(`div`,{className:(0,B.default)(i.shaderFallback,`absolute inset-0`)}),(0,P.jsx)(z,{className:`absolute inset-0 block size-full`,colors:V,distortion:1,swirl:.4,scale:1,speed:d?.32:0,frame:0,grainMixer:0,grainOverlay:0,minPixelRatio:1,maxPixelCount:2073600}),(0,P.jsx)(`div`,{className:`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.45)_100%)]`}),(0,P.jsx)(`div`,{ref:t,className:`pointer-events-none absolute -inset-32 bg-repeat mix-blend-soft-light will-change-transform`,style:{backgroundImage:`url("${G}")`,opacity:.7}}),(0,P.jsx)(`div`,{ref:n,className:`pointer-events-none absolute -inset-32 bg-repeat will-change-transform`,style:{backgroundImage:`url("${K}")`,opacity:.12}}),(0,P.jsx)(`canvas`,{ref:r,className:`pointer-events-none absolute inset-0 size-full`})]})}export{q as default};
