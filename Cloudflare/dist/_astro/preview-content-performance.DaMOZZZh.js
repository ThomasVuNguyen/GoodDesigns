import{r as i}from"./index.Bvt71uJM.js";import{i as s,g as d,A as v}from"./bridge.BGcwWeWm.js";globalThis.process??={};globalThis.process.env??={};const r="cms-preview-performance-change";function f(){if(typeof document>"u")return null;const e=document.documentElement.dataset.cmsPreviewPerformance;return e==="low"||e==="medium"||e==="high"?e:null}function m(){const e=f();if(e)return e;if(typeof window<"u"&&s()){const t=d(v.PREVIEW_PERFORMANCE,"medium");return t==="low"||t==="medium"||t==="high"?t:"medium"}return"high"}function E(e){typeof document>"u"||(document.documentElement.dataset.cmsPreviewPerformance=e,typeof window<"u"&&window.dispatchEvent(new CustomEvent(r,{detail:e})),p(e),w(e))}function u(e){const t=o=>{const n=e.getContext(o);if(!n||!("getExtension"in n))return;n.getExtension("WEBGL_lose_context")?.loseContext()};t("webgl"),t("webgl2")}function p(e){if(e!=="low"||typeof document>"u")return;document.querySelectorAll('[data-cms-preview-heavy="globe"], [data-cms-preview-heavy="bento"] canvas').forEach(u)}const c="cms-preview-heavy-inline-css";function w(e){if(typeof document>"u")return;let t=document.getElementById(c);if(t||(t=document.createElement("style"),t.id=c,document.head.appendChild(t)),e==="high"){t.textContent="";return}if(e==="medium"){t.textContent=`
html[data-cms-preview-performance="medium"] [data-cms-preview-heavy="hero-video"],
html[data-cms-preview-performance="medium"] [data-cms-preview-heavy="globe"],
html[data-cms-preview-performance="medium"] [data-cms-preview-heavy="bento"],
html[data-cms-preview-performance="medium"] [data-cms-preview-heavy="waveform"] {
  contain: content;
}
html[data-cms-preview-performance="medium"] [data-cms-preview-heavy="waveform"] [data-waveform-scroll] {
  animation-duration: 40s !important;
}
`;return}t.textContent=`
html[data-cms-preview-performance="low"] [data-cms-preview-heavy="hero-video"] {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
html[data-cms-preview-performance="low"] [data-cms-preview-heavy="hero-video-fallback"] {
  display: flex !important;
}
html[data-cms-preview-performance="low"] [data-cms-preview-heavy="waveform"],
html[data-cms-preview-performance="low"] [data-cms-preview-heavy="waveform"] * {
  animation: none !important;
}
`}function y(){const[e,t]=i.useState(m);return i.useEffect(()=>{const o=n=>{const a=n.detail;t(a??m())};return window.addEventListener(r,o),()=>window.removeEventListener(r,o)},[]),e}export{m as g,E as s,y as u};
