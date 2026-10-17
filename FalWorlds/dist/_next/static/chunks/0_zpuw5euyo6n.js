;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="59c07f78-1684-5f77-df89-cbbbd634a019")}catch(e){}}();
(()=>{"use strict";(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,272058,e=>{var t=e.i(115658),r=e.i(244236),a=e.i(373713),o=e.i(940754),n=e.i(788685),n=n,l=e.i(239460),i=e.i(462411),u=e.i(330923),s=e.i(462075),c=e.i(954861);let f=[12,15,20,24,30,60],d=["1:1","4:3","3:4","16:9","9:16"],p=/^#[0-9a-f]{6}$/i,m=["__proto__","prototype","constructor"];function h(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function g(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function b(e){let t=Number(e);return f.find(e=>e===t)??60}let v=(e,r,a)=>t.z.number().finite().catch(e).transform(e=>Math.min(a,Math.max(r,e))),x=(e,t=80)=>r.z.unknown().transform(r=>"string"==typeof r&&r.trim()?r.trim().slice(0,t):e),y=e=>r.z.unknown().transform(t=>{let r=(Array.isArray(t)?[...new Set(t)]:[]).flatMap(t=>e.filter(e=>e===t));return r.length?r:[...e]}),F=e=>a.z.record(r.z.unknown()).catch({}).pipe(o.z.object(e)),S=r.z.unknown().transform((e,t)=>{try{let r=function e(t,r=0){if(r>24)throw Error("Preset settings are nested too deeply.");if(null===t||"string"==typeof t||"boolean"==typeof t||"number"==typeof t&&Number.isFinite(t))return t;if(Array.isArray(t))return t.map(t=>e(t,r+1));if(g(t))return Object.fromEntries(Object.entries(t).filter(([e])=>!m.includes(e)).map(([t,a])=>[t,e(a,r+1)]));throw Error("Preset settings must contain JSON values only.")}(e),a=h(r)?r.P:void 0;if(h(r)&&h(a))return{...r,P:a};t.addIssue({code:"custom",message:"A world needs preset settings."})}catch(e){t.addIssue({code:"custom",message:String(e)})}return n.NEVER}),w=o.z.object({name:x("Palette"),background:l.z.string().regex(p),colors:i.z.array(l.z.string().regex(p)).min(1).max(4)}),M=r.z.unknown().transform(e=>{let t=new Set,r=[];for(let a of Array.isArray(e)?e:[]){if(g(a)&&!0===a.original){t.has("original")||r.push({kind:"original"}),t.add("original");continue}let e=w.safeParse(a);if(!e.success)continue;let o=e.data.background.toLowerCase(),n=e.data.colors.map(e=>e.toLowerCase()),l=JSON.stringify([o,n]);t.has(l)||(t.add(l),r.push({kind:"custom",name:e.data.name,background:o,colors:n}))}return r.slice(0,128)}),P=o.z.object({path:l.z.string().max(120).regex(/^\w+(?:\.\w+)+$/).refine(e=>!e.split(".").some(e=>[...m,"output"].includes(e))),from:t.z.number().finite(),to:t.z.number().finite(),drag:u.z.boolean().optional()}),k=o.z.object({duration:v(6,.5,120),mode:s.z.enum(["pingpong","loop","once"]).catch("pingpong"),easing:s.z.enum(["linear","smooth"]).catch("smooth"),units:s.z.enum(["value","percent"]).catch("percent"),exportEnabled:u.z.boolean().catch(!0),enabled:u.z.boolean().catch(!1),progress:v(0,0,1)}),R=r.z.unknown().transform(e=>{if(!g(e))return null;let t=new Set;return{tracks:(Array.isArray(e.tracks)?e.tracks:[]).flatMap(e=>{let r=P.safeParse(e);if(!r.success||t.has(r.data.path))return[];t.add(r.data.path);let{path:a,from:o,to:n,drag:l}=r.data;return[{path:a,from:o,to:n,...!0===l?{drag:l}:{}}]}).slice(0,8),...k.parse(e)}}),T=F({aspects:y(d),sizes:y(["small","medium","large"]),fit:s.z.enum(["contain","cover"]).catch("contain"),crop:s.z.enum(["full","random-2","random-3"]).catch("full"),zoom:v(2,1,4)}),A=F({feed:u.z.boolean().catch(!1),ticker:u.z.boolean().catch(!1)}),C=o.z.object({id:l.z.string().regex(/^[a-zA-Z0-9_-]{1,100}$/),worldId:s.z.enum(["orb","graticule","portal","rings","pulse","graph","orb7","spirograph","blend"]),name:x("Untitled world"),presentation:s.z.enum(["saved","transparent","solid"]).catch("saved"),feedBackground:s.z.enum(["inherit","transparent","solid"]).catch("inherit"),feedLayer:s.z.enum(["auto","above","below"]).catch("auto"),sliderAnimation:R,feedRandomAnimation:u.z.boolean().catch(!1),showOnce:A,feedUnclipped:u.z.boolean().catch(!1),feedBorder:u.z.boolean().catch(!1),feedBorderRandom:u.z.boolean().catch(!1),randomView:A,preferredPalettes:F({feed:M,ticker:M}),enabled:u.z.boolean().catch(!0),weight:v(1,0,100),settings:S,viewport:F({width:v(1200,1,7680),height:v(1200,1,7680)}),desktop:T,mobile:T}),E=F({items:i.z.array(r.z.unknown()).catch([]),fps:r.z.unknown().transform(b),speed:v(30,0,150),direction:s.z.enum(["left","right"]).catch("left"),pauseOnHover:u.z.boolean().catch(!0),animateWorlds:u.z.boolean().catch(!0),background:l.z.string().regex(p).catch("transparent"),desktop:F({height:v(280,80,600),gap:v(24,0,160)}),mobile:F({height:v(160,80,400),gap:v(16,0,80)})}),D=o.z.object({entryId:l.z.string(),scale:v(1,.5,2),aspect:s.z.enum(d).catch("1:1")}),z=o.z.object({type:c.z.literal("w0rlds-modular-singular"),version:c.z.literal(1),entries:i.z.array(C).max(200),feedOpening:F({startHigher:u.z.boolean().catch(!1),foreground:u.z.boolean().catch(!1)}),feedFps:r.z.unknown().transform(b),ticker:E}).superRefine((e,t)=>{let r=e.entries.map(e=>e.id);new Set(r).size!==r.length&&t.addIssue({code:"custom",message:"Duplicate entry ids."})}).transform(({ticker:e,...t})=>{let r=new Set(t.entries.map(e=>e.id)),a=e.items.flatMap(e=>{let t=D.safeParse(e);return t.success&&r.has(t.data.entryId)?(r.delete(t.data.entryId),[t.data]):[]}).slice(0,40);return{...t,ticker:{...e,items:a}}});function B(e,t){return"feed"===t&&"inherit"!==e.feedBackground?e.feedBackground:e.presentation}e.s(["w",0,["graticule","rings","graph"],"F",0,h,"T",0,function(e){return z.parse(e)},"u",0,function(e,t){let r=B(e,t);if("saved"!==r)return"transparent"===r;let{P:a,customPalette:o}=e.settings;return!!(a.backgroundTransparent||"transparent"===a.backgroundMode||h(o)&&o.transparent)},"i",0,B],272058)},122507,e=>{e.s(["f",0,function(e){let t=new Set,r=new Set,a=0,o=!1,n=()=>{if(a=0,o||r.size>=e||!t.size)return;let n=[...t].sort((e,t)=>e.priority()-t.priority())[0];t.delete(n),r.add(n),n.start(()=>{r.delete(n),l()}),t.size&&r.size<e&&l()},l=()=>{o||a||(a=requestAnimationFrame(n))};return{schedule(e,a){let o={start:e,priority:a};return t.add(o),l(),()=>{t.delete(o),r.delete(o),l()}},destroy(){o=!0,cancelAnimationFrame(a),t.clear(),r.clear()}}}])},689702,269305,e=>{var t=e.i(874011),r=e.i(747207),a=e.i(923090),o=e.i(191951),n=e.i(134135),l=e.i(471598),i=e.i(272058),u=e.i(979175);let s=["animate","concentricMotion","orbMotion"];function c(e,t){let r={P:{}};for(let a of("anim"in e&&(r.anim=!!t&&e.anim),s))a in e.P&&(r.P[a]=!!t&&e.P[a]);return r}function f(e,t,r){var a,o,n;let l,s,f,d,{context:p,seed:m,motion:h}=r,g=structuredClone(e.settings),b=(0,i.u)(e,p);a=r.paletteIndex,l=e.preferredPalettes[p],s=void 0!==a&&Number.isSafeInteger(a)?(a%l.length+l.length)%l.length:Math.floor((0,u.r)(`${m}:palette`)()*l.length),o=l[s],o?.kind==="custom"&&(g.customPalette={background:o.background,colors:[...o.colors],transparent:b},Object.assign(g.P,{background:o.background,colors:Array.from({length:4},(e,t)=>o.colors[t%o.colors.length]),backgroundTransparent:b}),"orb7"===e.worldId&&Object.assign(g.P,{backgroundMode:b?"transparent":"custom",backgroundColor:o.background,sourceMatch:!1})),i.w.includes(e.worldId)&&e.randomView[p]&&function(e,t,r){let a=(0,u.r)(`${r}:view`),o=[[0,0],[Math.PI/2,0],[-Math.PI/2,0],[0,Math.PI/2],[0,-Math.PI/2]],n="graticule"===t.worldId,l=n?[e.P.uRotX,e.P.uRotY]:[e.P.pitch,e.P.turn],[i,s]=.6>a()?l.map(e=>"number"==typeof e&&Number.isFinite(e)?e:0):o[Math.floor(a()*o.length)],c=()=>(.5>a()?-1:1)*(.06+.16*a()),f=i+c(),d=s+c();n?(delete e.viewName,Object.assign(e.P,{uRotX:f,uRotY:d})):Object.assign(e.P,{pitch:Math.max(-1.5,Math.min(1.5,f)),turn:d})}(g,e,m),function(e,t,r){if("saved"===r)return;let a="transparent"===r;e.P.backgroundTransparent=a,(0,i.F)(e.customPalette)&&(e.customPalette.transparent=a),"orb7"===t.worldId&&(a?e.P.backgroundMode="transparent":"transparent"===e.P.backgroundMode&&(e.P.backgroundMode="custom"))}(g,e,(0,i.i)(e,p)),n=r.renderQuality,d=Math.min(1200,f=e.viewport.width,n?.resolution||1200),g.resW&&(g.resW=d),g.resH&&(g.resH=Math.round(e.viewport.height*d/f)),g.P.resolution&&(g.P.resolution=d);let v=c(g,h);return Object.assign(g,v,{P:{...g.P,...v.P}}),"editEnabled"in g.P&&(g.P.editEnabled=!1),{avoidWhiteForeground:"ticker"===p,backgroundTransparent:b,renderQuality:r.renderQuality,settings:g,sliderAnimation:function(e,t,r){if(!e.sliderAnimation)return null;let a={...e.sliderAnimation,tracks:e.sliderAnimation.tracks.map(e=>({...e}))};return"feed"===t&&e.feedRandomAnimation&&a.tracks.length&&(a.progress=(0,u.r)(`${r}:animation-progress`)()),a}(e,p,m),motion:h,view:r.unclipped?{...t,fit:"contain",crop:"full",layout:"responsive"}:{...t,layout:"responsive"},viewport:e.viewport,seed:m,fps:r.fps}}function d(e,t){return e.feedBorderRandom&&(0,i.u)(e,"feed")?.5>(0,u.r)(`${t}:feed-border`)():e.feedBorder}function p(e,t,r,a){let o=e.viewport.width/e.viewport.height,n="cover"===t.fit?Math.max(r.width/o,r.height):Math.min(r.width/o,r.height),l="full"===t.crop?1:t.zoom,i=Math.min(1.5,Math.max(1,devicePixelRatio)),u=Math.min("ticker"===a?480:640,Math.max(192,2*Math.ceil(n*Math.max(1,o)*l*i/2)));return{maxDimension:u,pixelRatio:i,resolution:Math.max(2,2*Math.floor(u/Math.max(1,1/o)/2))}}function m(e,t,r,a){let o=e.viewport.width/e.viewport.height,n="contain"===t.fit?Math.min(r/o,a):Math.max(r/o,a),l="full"===t.crop?1:t.zoom;return{width:n*o*l,height:n*l}}e.s(["Z",0,p,"Q",0,c,"U",0,d,"V",0,function(e,t){if("custom"===t.kind)return t;let{settings:a}=e,o=(0,r.a)((0,i.F)(a.customPalette)?a.customPalette:a.P);return o?{name:"Original palette",background:o.background,colors:o.colors}:null},"N",0,function(e,t,r){let a=e.preferredPalettes.ticker.length;if(a)return(0,u.$)(a,(0,u.r)(`${t}:${e.id}:ticker-palettes`))[(r%a+a)%a]},"i",0,m,"G",0,f],269305);let h=e=>e instanceof Error?e:Error(String(e));e.s(["f",0,function(e,i,u){let s,g,b,v,x,{context:y}=u,F=i[u.profile],S=i.feedUnclipped&&"feed"===y,w=matchMedia("(prefers-reduced-motion: reduce)"),M=u.active,P=()=>M&&!document.hidden&&u.motion&&!w.matches,k={width:e.clientWidth,height:e.clientHeight},R=f(i,F,{motion:P(),seed:u.seed,context:y,paletteIndex:u.paletteIndex,renderQuality:"mobile"===u.profile?p(i,F,k,y):void 0,fps:u.fps,unclipped:S}),T=document.createElement("div");T.className="worlds-live",T.dataset.unclipped=String(S),T.style.opacity="0";let A=document.createElement("div");A.className="worlds-surface",T.append(A),!S&&"feed"===y&&d(i,u.seed)&&T.append((b="http://www.w3.org/2000/svg",v=document.createElementNS(b,"svg"),x=document.createElementNS(b,"rect"),v.classList.add("worlds-card-border"),v.setAttribute("aria-hidden","true"),x.setAttribute("x",".5"),x.setAttribute("y",".5"),x.setAttribute("fill","none"),x.setAttribute("stroke","currentColor"),x.setAttribute("stroke-width","1"),x.setAttribute("stroke-dasharray","2 2"),v.append(x),v)),e.append(T);let C=()=>{let t=e.clientWidth,r=e.clientHeight,a=S?m(i,F,t,r):{width:t,height:r};!function(e,t,r){let{view:a,viewport:o}=t,n=Math.max(.01,o.width/o.height),l="contain"===a.fit?Math.min(r.width/n,r.height):Math.max(r.width/n,r.height),i=l*n,u=(r.width-i)*.5,s=(r.height-l)*.5,c=function(e,t){if("full"===e.crop)return{x:.5,y:.5};let r=0x811c9dc5;for(let a of t+e.crop)r=Math.imul(r^a.charCodeAt(0),0x1000193);let a="random-2"===e.crop?2:3,o=Math.floor((r>>>0)/0x100000000*a*a);return{x:(o%a+.5)/a,y:(Math.floor(o/a)+.5)/a}}(a,t.seed),f="full"===a.crop?1:a.zoom,d=.5*r.width-u-c.x*i*f,p=.5*r.height-s-c.y*l*f;Object.assign(e.style,{left:`${r.left+u}px`,top:`${r.top+s}px`,width:`${i}px`,height:`${l}px`,transform:1===f&&.01>Math.abs(d)&&.01>Math.abs(p)?"none":`matrix(${f},0,0,${f},${d},${p})`})}(A,R,{left:(t-a.width)/2,top:(r-a.height)/2,width:a.width,height:a.height})};C();try{s=function(e,n,i,u){let{renderer:s,dial:c,pixelated:f}=function(e,r){let n=(0,t.f)(e.worldId);if(!n)throw Error(`No renderer for ${e.worldId}.`);let l=r.renderQuality;return{renderer:n.create({worldId:e.worldId,gpu:(0,o.G)(),pixelRatio:l?Math.max(1,Math.min(2,l.pixelRatio)):2,maxDimension:l?Math.max(192,Math.min(1200,l.maxDimension)):1/0,frameDue:(0,a.f)(()=>r.fps)}),dial:n.dial,pixelated:!0===n.pixelated}}(e,n);try{i.dataset.scaling=f?"pixelated":"smooth",i.append(s.element),s.applyRaw(n.settings),(0,r.e)(s,n.backgroundTransparent),n.avoidWhiteForeground&&(0,r.v)(s);let e=(0,l.f)({dial:c,getRaw:()=>s.getRaw(),applyRaw:e=>s.applyRaw(e)},n.sliderAnimation,s.element);return e?.setAllowed(u),{renderer:s,slider:e}}catch(e){throw s.destroy(),e}}(i,R,A,P())}catch(e){return u.onError(h(e)),u.onStartupSettled(),{setActive(){},destroy:()=>T.remove()}}let{renderer:E,slider:D}=s,z=()=>{let e=P(),t=E.getRaw(),r=c(i.settings,e);for(let[e,a]of("boolean"==typeof r.anim&&(t.anim=r.anim),Object.entries(r.P)))"boolean"==typeof a&&(t.P[e]=a);E.applyRaw(t),D?.setAllowed(e)},B=(0,n.f)(e=>{M&&!document.hidden&&(E.tick(e),D?.tick(e,R.fps))},e=>u.onError(h(e))),N=0,X=new ResizeObserver(()=>{C(),window.clearTimeout(N),N=window.setTimeout(()=>E.resize(),60)});X.observe(e);let Y=function(e,t){let r=new Set,a=()=>t?.(r.size>0),o=e=>{r.add(e.pointerId),a()},n=e=>{r.delete(e.pointerId),a()},l=()=>{r.clear(),a()},i=["pointerup","pointercancel","lostpointercapture"];for(let t of(e.addEventListener("pointerdown",o,!0),i))e.addEventListener(t,n,!0);return window.addEventListener("blur",l),()=>{for(let t of(e.removeEventListener("pointerdown",o,!0),i))e.removeEventListener(t,n,!0);window.removeEventListener("blur",l)}}(A,u.onInteraction);document.addEventListener("visibilitychange",z),w.addEventListener("change",z);let L=requestAnimationFrame(()=>{L=requestAnimationFrame(()=>{L=0,g=u.reveal.reveal(T,u.seed),u.onStartupSettled()})});return{setActive(e){M!==e&&(M=e,z())},destroy(){cancelAnimationFrame(L),L&&u.onStartupSettled(),B(),X.disconnect(),window.clearTimeout(N),Y(),document.removeEventListener("visibilitychange",z),w.removeEventListener("change",z),D?.destroy(),g?.(),E.destroy(),T.remove()}}}],689702)},874011,747207,191951,923090,134135,471598,e=>{let t;var r=e.i(272058);let a={roughness:[0,0,24,.1],roughDetail:[24,2,80,1],roughRoundness:[.65,0,1,.01]},o={roughness:0,roughDetail:24,roughRoundness:.65};function n(e,t,r){let a=43758.5453*Math.sin(127.1*e+311.7*t+74.7*r);return(a-Math.floor(a))*2-1}function l(e,t,r,a){let o=Math.floor(e),l=Math.floor(t),i=t-l,u=e=>e+(e*e*(3-2*e)-e)*a,s=u(e-o),c=u(i);return(n(o,l,r)*(1-s)+n(o+1,l,r)*s)*(1-c)+(n(o,l+1,r)*(1-s)+n(o+1,l+1,r)*s)*c}function i(e,t,r,a=0){let o=(r.roughness||0)/600;if(!o)return[e,t];let n=r.roughDetail,u=r.roughRoundness;return[e+l(e*n,t*n,a,u)*o,t+l(e*n,t*n,a+19,u)*o]}let u={count:[22,2,80,1],innerRadius:[.07,.01,.6,.01],outerRadius:[.88,.2,1.2,.01],innerX:[0,-.7,.7,.01],innerY:[0,-.7,.7,.01],equidistant:!1,spacing:[1,.3,3,.05],stroke:[2,.3,12,.1],centerX:[0,-.6,.6,.01],centerY:[0,-.6,.6,.01]},s={flatView:!0,depth:[1,0,2,.01],pitch:[0,-180,180,1],turn:[0,-180,180,1]},c={animate:!0,speed:[.12,-.5,.5,.01],travel:[.28,0,.7,.01],phase:[0,0,360,1]},f=[u,s,a,c];function d(e){let t={};for(let[r,a]of e)void 0!==a&&(t[r]=a);return t}let p=(e,t)=>{let a=e[t];return(0,r.F)(a)?a:{}},m=["1:1","4:3","3:4","16:9","9:16","4:5","3:2","2:3"];function h(e,t){let[r,a]=("string"==typeof e&&m.includes(e)?e:"orb7"===t?"16:9":"orb"===t||"graticule"===t||"portal"===t?"4:3":"1:1").split(":").map(Number);return r/a}function g(e,t,r){let a=e.getBoundingClientRect(),o=Math.min(devicePixelRatio||1,t,r/Math.max(1,a.width,a.height));return{width:Math.max(1,Math.round(a.width*o)),height:Math.max(1,Math.round(a.height*o))}}function b(e,t){let r=e.getContext("2d",t);if(!r)throw Error("Canvas 2D is unavailable.");return r}function v(e,t,r,a,o){let n,l,i,{width:u,height:s}=(l=o*Math.min(1,n=h(t.aspectRatio,a)),{width:i=Math.max(2,2*Math.round(Math.min(Number(r)||1200,l)/2)),height:Math.max(2,2*Math.round(i/n/2))});(e.width!==u||e.height!==s)&&(e.width=u,e.height=s)}function x(e){let t=String(e??"").trim();return/^#?[\da-f]{6}$/i.test(t)?`#${t.replace("#","")}`.toLowerCase():/^#?[\da-f]{3}$/i.test(t)?`#${t.replace("#","").split("").map(e=>e+e).join("")}`.toLowerCase():null}function y(e){let t=x(e?.background),r=e?.colors;if(!t||!Array.isArray(r)||!r.length||r.length>4)return null;let a=r.map(x);return a.some(e=>null===e)?null:{background:t,colors:a.filter(e=>null!==e),...e?.transparent||e?.backgroundTransparent?{transparent:!0}:{}}}function F(e){if(!e)return null;let t=e.custom?e.marks:e.marks.filter(t=>t.toLowerCase()!==e.background.toLowerCase());return y({background:e.background,colors:t.length?t:e.marks,transparent:e.transparent})}function S(e,t){let r=y(t);return r?{id:e.id,label:e.label,background:r.background,marks:r.colors,custom:!0,transparent:!!r.transparent}:e}let w=e=>e?.custom?F(e):null;function M(e){return e?{background:e.background,colors:[...e.colors],...e.transparent?{transparent:!0}:{}}:null}function P(e,t){let r=e.find(e=>"#ffffff"!==e)??("#ffffff"!==t?t:"#000000");return e.map(e=>"#ffffff"===e?r:e)}function k(e){let t=parseInt(e.slice(1),16),[r,a,o]=[t>>16,t>>8&255,255&t].map(e=>{let t=e/255;return t<=.03928?t/12.92:((t+.055)/1.055)**2.4});return .2126*r+.7152*a+.0722*o}e.s(["N",0,-1,"v",0,function(e){let t=y(e.getPalette());t?.colors.includes("#ffffff")&&e.setPaletteColors({...t,colors:P(t.colors,t.background)})},"k",0,function(e,t){let[r,a]=[k(e),k(t)].sort((e,t)=>t-e);return(r+.05)/(a+.05)},"Q",0,w,"K",0,F,"L",0,x,"a",0,y,"F",0,M,"e",0,function(e,t){let r=y(e.getPalette());if(!r||!!r.transparent===t)return;let{transparent:a,...o}=r;e.setPaletteColors(t?{...o,transparent:t}:o,-1)},"U",0,S,"$",0,P],747207);let R=e=>"number"==typeof e?e:Number(e),T=(e,t)=>Number(e[t]),A=(e,t,r)=>Math.max(t,Math.min(r,e)),C=e=>((e+180)%360+360)%360-180,E=["pointerup","pointercancel","lostpointercapture"];function D(e,t){let r=null,a=a=>{if(r)return;let o=t.start(a);null!==o&&(r={id:a.pointerId,state:o},e.setPointerCapture(a.pointerId))},o=e=>{r?.id===e.pointerId&&t.move(e,r.state)},n=a=>{if(r?.id!==a.pointerId)return;let{state:o}=r;r=null,e.hasPointerCapture(a.pointerId)&&e.releasePointerCapture(a.pointerId),t.end?.(a,o,"pointerup"===a.type)};for(let t of(e.addEventListener("pointerdown",a),e.addEventListener("pointermove",o),E))e.addEventListener(t,n);return()=>{for(let t of(e.removeEventListener("pointerdown",a),e.removeEventListener("pointermove",o),E))e.removeEventListener(t,n)}}function z(e,t,r){return D(e,{start(e){if(0!==e.button)return null;let r=t();return r.flatView&&(r.pitch=0,r.turn=0),{x:e.clientX,y:e.clientY,pitch:R(r.pitch),turn:R(r.turn)}},move(a,o){let n=t();n.flatView=!1;let l=Math.max(1,Math.min(e.clientWidth,e.clientHeight));n.turn=C(o.turn+(a.clientX-o.x)/l*180),n.pitch=C(o.pitch-(a.clientY-o.y)/l*180),r()}})}let B=2*Math.PI,N="#000000",X=["#adff00","#ab77ff","#99edff","#f57ec3"],Y=[200,400,600,1e3,1200,1800,2400],L=/^#[0-9a-f]{6}$/i,O={flatView:!0,depth:1,...o,pitch:0,turn:0,count:22,innerRadius:.07,outerRadius:.88,innerX:0,innerY:0,equidistant:!1,spacing:1,stroke:2,centerX:0,centerY:0,animate:!0,speed:.12,travel:.28,phase:0,resolution:1200,backgroundTransparent:!1,background:N,colors:X,colorMode:"solid"},I=e=>"string"==typeof e&&L.test(e),G=2*Math.PI,q=[24,30,60],$={create:function(e){let t=document.createElement("canvas"),a=b(t),o={...O,colors:[...X]},n=24,l=6,u=0,s=performance.now();function c(){let r,n,{width:l,height:s}=g(t,e.pixelRatio,e.maxDimension);t.width!==l&&(t.width=l),t.height!==s&&(t.height=s);let c=(f=o,r=e=>Number(f[e]),{flatView:(n=e=>!!f[e])("flatView"),depth:r("depth"),roughness:r("roughness"),roughDetail:r("roughDetail"),roughRoundness:r("roughRoundness"),pitch:r("pitch"),turn:r("turn"),count:r("count"),innerRadius:r("innerRadius"),outerRadius:r("outerRadius"),innerX:r("innerX"),innerY:r("innerY"),equidistant:n("equidistant"),spacing:r("spacing"),stroke:r("stroke"),centerX:r("centerX"),centerY:r("centerY"),travel:r("travel"),phase:r("phase"),backgroundTransparent:n("backgroundTransparent"),background:String(f.background),colors:f.colors,gradient:"gradient"===f.colorMode});var f,d=function(e,t,r,a){let o={P:e,unit:.43*Math.min(r,a),cx:r*(.5+e.centerX/2),cy:a*(.5+e.centerY/2)},n=function(e,t){let{P:r,cx:a,cy:o,unit:n}=e,l=G*t+r.phase*Math.PI/180,i=r.innerX+Math.cos(l)*r.travel,u=r.innerY+Math.sin(l)*r.travel,s=Math.hypot(i,u),c=Math.max(0,r.outerRadius-r.innerRadius);return s>c&&(i*=c/s,u*=c/s),Array.from({length:r.count},(e,t)=>{var l;let s,c,f,d,p,m,h=r.equidistant?t/(r.count-1):Math.pow(t/(r.count-1),r.spacing),g=r.equidistant?1:1-h;return{x:a+i*n*g,y:o+u*n*g,r:(r.innerRadius+(r.outerRadius-r.innerRadius)*h)*n,color:r.gradient?(l=r.colors,c=Math.min(2,Math.floor(s=3*h)),f=s-c,d=l[c],p=l[c+1],m=[1,3,5].map(e=>Math.round(parseInt(d.slice(e,e+2),16)*(1-f)+parseInt(p.slice(e,e+2),16)*f)),`rgb(${m.join(",")})`):r.colors[0]}})}(o,t);if(e.roughness||!e.flatView&&(e.pitch||e.turn)){let e=function(e){let{P:t,cx:r,cy:a}=e,o=(t.flatView?0:t.pitch)*Math.PI/180,n=(t.flatView?0:t.turn)*Math.PI/180;return([e,t],l)=>{let i=e-r,u=-i*Math.sin(n)+l*Math.cos(n);return[r+i*Math.cos(n)+l*Math.sin(n),a+(t-a)*Math.cos(o)-u*Math.sin(o)]}}(o);n.forEach((t,r)=>{t.points=function(e,t,r,a){let{P:o,unit:n}=e,l=r.r/n,u=o.flatView?0:o.depth*n*(Math.sqrt(Math.max(0,o.outerRadius**2-l**2))-o.outerRadius/2),s=Math.max(256,Math.ceil(G*l*o.roughDetail*8));return Array.from({length:s},(e,c)=>{let f=c/s*G,[d,p]=i(l*Math.cos(f),l*Math.sin(f),o,a);return t([r.x+d*n,r.y+p*n],u)})}(o,e,t,r)})}return{circles:n,line:e.stroke*Math.min(r,a)/1200}}(c,u,l,s);for(let e of(a.clearRect(0,0,l,s),c.backgroundTransparent||(a.fillStyle=c.background,a.fillRect(0,0,l,s)),a.lineWidth=d.line,a.lineJoin="round",a.lineCap="round",d.circles))a.beginPath(),e.points?(e.points.forEach(([e,t],r)=>r?a.lineTo(e,t):a.moveTo(e,t)),a.closePath()):a.arc(e.x,e.y,e.r,0,B),a.strokeStyle=e.color,a.stroke()}let d=()=>({P:{...o,colors:[...o.colors]},expFps:n,expDur:l});function p(e){if(!(0,r.F)(e.P))return;o=function(e,t){let r={...e,...t};t.background&&t.colors&&(r.backgroundTransparent=!!t.backgroundTransparent);for(let e of f)for(let[t,a]of Object.entries(e))if(Array.isArray(a)){let e=Number(r[t]),o=Number.isFinite(e)?Math.max(a[1],Math.min(a[2],e)):Number(O[t]);r[t]=1===a[3]?Math.round(o):o}else r[t]=!!r[t];let a=Array.isArray(r.colors)?r.colors:[],o=Number(r.resolution);return{...r,background:I(r.background)?r.background:N,colors:X.map((e,t)=>{let r=a[t];return I(r)?r:e}),resolution:Y.includes(o)?o:1200,innerRadius:Math.min(Number(r.innerRadius),Number(r.outerRadius)-.01),colorMode:"gradient"===r.colorMode?"gradient":"solid"}}(o,e.P);let t=Number(e.expFps);n=q.includes(t)?t:24,l=Math.max(1,Math.min(20,Number(e.expDur)||6)),c()}let m=z(t,()=>o,c),h=()=>{o.flatView=!0,o.pitch=0,o.turn=0,o.centerX=0,o.centerY=0,c()};return t.addEventListener("dblclick",h),c(),{element:t,applyRaw:p,getRaw:d,getPalette:()=>y(d().P),setPaletteColors(e){p({P:{background:e.background,colors:e.colors,backgroundTransparent:!!e.transparent}})},tick(t){let r=Math.min(.05,(t-s)/1e3);s=t,o.animate&&(u+=r*Number(o.speed),e.frameDue("native",t)&&c())},resize:c,destroy(){m(),t.removeEventListener("dblclick",h)}}},dial:{config:{geometry:u,camera:s,texture:a,color:{backgroundTransparent:!1,background:{type:"color",default:"#000000"},color1:{type:"color",default:"#adff00"},color2:{type:"color",default:"#ab77ff"},color3:{type:"color",default:"#99edff"},color4:{type:"color",default:"#f57ec3"},colorMode:{type:"select",options:["solid","gradient"],default:"solid"}},motion:c,output:{resolution:{type:"select",options:["200","400","600","1000","1200","1800","2400"],default:"1200"},fps:{type:"select",options:["24","30","60"],default:"24"},duration:[6,1,20,1],randomize:{type:"action"},savePng:{type:"action",label:"Save PNG"},saveSvg:{type:"action",label:"Download SVG"},copySvg:{type:"action",label:"Copy SVG"},saveMp4:{type:"action",label:"Save MP4"},saveGif:{type:"action",label:"Save GIF"},reset:{type:"action"}}},toDial:function(e){let{P:t}=e,r=Array.isArray(t.colors)?t.colors:[];return{geometry:d(Object.keys(u).map(e=>[e,"equidistant"===e?!!t[e]:t[e]])),camera:{flatView:!1!==t.flatView,depth:t.depth??1,pitch:t.pitch??0,turn:t.turn??0},texture:{roughness:t.roughness??o.roughness,roughDetail:t.roughDetail??o.roughDetail,roughRoundness:t.roughRoundness??o.roughRoundness},color:d([["backgroundTransparent",!!t.backgroundTransparent],["background",t.background],["colorMode",t.colorMode],...r.map((e,t)=>[`color${t+1}`,e])]),motion:d(Object.keys(c).map(e=>[e,t[e]])),output:{resolution:String(t.resolution),fps:String(void 0===e.expFps?24:e.expFps),duration:void 0===e.expDur?6:e.expDur}}},fromDial:function(e){let t=p(e,"color"),r=p(e,"output");return{P:{...p(e,"geometry"),...p(e,"camera"),...p(e,"texture"),...p(e,"motion"),background:t.background??null,backgroundTransparent:!!t.backgroundTransparent,colorMode:t.colorMode??null,colors:[t.color1,t.color2,t.color3,t.color4].map(e=>e??null),resolution:Number(r.resolution)},expFps:Number(r.fps),expDur:Number(r.duration)}}}},W=2*Math.PI,j=[12,24,30,60],_=(e,t)=>null!=e&&Number.isFinite(Number(e))?Number(e):t,Q=e=>null==e?"—":String(Number(e.toFixed(6)));function H(e={}){let t="cycles"===e.exportMode?"cycles":"duration",r=Math.abs(null==e.speed?.12:_(e.speed,0)),a=Math.max(0,_(e.exportDuration,6)),o=Math.max(0,_(e.exportCycles,1));"duration"===t?o=a*r/W:a=r?o*W/r:null;let n=Number(e.exportFps);return{exportMode:t,exportDuration:a,exportCycles:o,exportFps:j.includes(n)?n:24}}let U={seed:{type:"text",default:"606",placeholder:"Seed"},newSeed:{type:"action",label:"New seed"},topology:{nodes:[1400,100,4e3,50],clusters:[6,1,12,1],depth:[10,2,20,1],branching:[2.6,1,6,.1],spread:[.2,.03,.5,.01],crosslinks:[.035,0,.3,.005],hub:[.08,0,1,.01]},sphere:{radius:[1,.55,1.35,.01],perspective:[1.7,.6,3.5,.05],distance:[3.2,1.8,7,.05],shell:!0,showGuides:!0,guides:[3,0,9,1],guideTilt:[.7,-3.14,3.14,.01],guideRoughness:[0,0,5,.05],guideStrokeSize:[.55,.1,8,.05]},pixels:{shape:{type:"select",options:[{value:"pixel",label:"Pixel"},{value:"cross",label:"Cross"},{value:"dot",label:"Dot"}],default:"pixel"},nodeThickness:[3.1,.25,40,.25],variation:[.8,0,2,.05],depthScale:[.7,0,1.5,.05],colorMode:{type:"select",options:[{value:"depth",label:"Depth"},{value:"cluster",label:"Cluster"},{value:"random",label:"Random"},{value:"ratio",label:"Proportion"}],default:"depth"}},lines:{connections:!0,opacity:[.34,0,1,.01],width:[.55,.1,3,.05],roughness:[0,0,5,.05],roughRoundness:[.65,0,1,.01],dash:[0,0,24,1],dashGap:[4,1,30,1]},edit:{enabled:!1,brush:[24,3,100,1],paintColor:{type:"select",options:[{value:"0",label:"Color 1"},{value:"1",label:"Color 2"},{value:"2",label:"Color 3"},{value:"3",label:"Color 4"},{value:"4",label:"Background"}],default:"0"},clearPaint:{type:"action",label:"Clear paint"}},camera:{pitch:[-.18,-1.5,1.5,.01],turn:[.35,-3.14,3.14,.01],zoom:[1,.45,2.4,.01]},motion:{animate:!1,speed:[.12,0,1.5,.01],drift:[.08,0,.5,.01]},output:{resolution:{type:"select",options:["200","400","600","1000","1200","1800","2400"],default:"1200"},timing:{type:"select",options:[{value:"duration",label:"Hold duration"},{value:"cycles",label:"Hold cycles"}],default:"duration"},duration:{type:"text",default:"6",placeholder:"Seconds"},cycles:{type:"text",default:Q(.72/(2*Math.PI)),placeholder:"Rotations"},fps:{type:"select",options:["12","24","30","60"],default:"24"},randomize:{type:"action"},savePng:{type:"action",label:"Save PNG"},copySvg:{type:"action",label:"Copy SVG"},saveSvg:{type:"action",label:"Download SVG"},saveSolidMp4:{type:"action",label:"Save MP4"},saveGif:{type:"action",label:"Save GIF"},reset:{type:"action"}}};function V(e){let t={};for(let[r,a]of Object.entries(e))void 0!==a&&(t[r]=a);return t}let J=(e,t)=>{let a=e[t];return(0,r.F)(a)?a:{}},K=e=>""!==String(e).trim()&&Number.isFinite(Number(e))?Number(e):null,Z=(e,t)=>null!=e&&(null==t||Math.abs(e-t)>51e-8);function ee(e){let t=e;return()=>{t|=0;let e=Math.imul((t=t+0x6d2b79f5|0)^t>>>15,1|t);return(((e=e+Math.imul(e^e>>>7,61|e)^e)^e>>>14)>>>0)/0x100000000}}function et(e){let t=2*e()-1,r=2*e()-1,a=2*e()-1,o=Math.hypot(t,r,a)||1;return[t/o,r/o,a/o]}function er(e){let t=43758.5453*Math.sin(12.9898*e);return(t-Math.floor(t))*2-1}function ea(e,t,r){if(!t.length)return;let a=Math.max(0,Math.min(1,r));if(e.moveTo(t[0].x,t[0].y),a<=0||t.length<3){for(let r=1;r<t.length;r++)e.lineTo(t[r].x,t[r].y);return}let o=.5*a;for(let r=1;r<t.length-1;r++){let a=t[r-1],n=t[r],l=t[r+1];e.lineTo(n.x+(a.x-n.x)*o,n.y+(a.y-n.y)*o),e.quadraticCurveTo(n.x,n.y,n.x+(l.x-n.x)*o,n.y+(l.y-n.y)*o)}let n=t[t.length-1];e.lineTo(n.x,n.y)}let eo=e=>"string"==typeof e?e:null;function en(e,t,r,a){e.lineWidth=r,e.lineCap="round",e.lineJoin="round",e.setLineDash(t.dash>0?[t.dash*a,t.dashGap*a]:[])}let el=[{name:"Original",background:"#ffffff",colors:["#ec0648","#ffc4d8","#5718c0","#3fb5fe"]},{name:"Electric",background:"#115ef3",colors:["#ffffff","#99edff","#ffff00","#adff00"]},{name:"Glitch",background:"#000000",colors:["#adff00","#ab77ff","#99edff","#f57ec3"]},{name:"Blue heat",background:"#c5e9ff",colors:["#115ef3","#3fb5fe","#ffff00","#ec0648"]},{name:"Purple dust",background:"#5718c0",colors:["#d5bbff","#ffffff","#adff00","#99edff"]},{name:"Acid garden",background:"#004012",colors:["#adff00","#ffff00","#99edff","#ffc4d8"]},{name:"Hot signal",background:"#ffc4d8",colors:["#ec0648","#ffffff","#ffff00","#115ef3"]},{name:"Olive radar",background:"#403700",colors:["#99edff","#adff00","#ffff00","#f57ec3"]},{name:"Red alert",background:"#ec0648",colors:["#ffffff","#ffc4d8","#ffff00","#115ef3"]},{name:"Sage circuit",background:"#e5ece7",colors:["#403700","#adff00","#ffff00","#115ef3"]},{name:"Candy",background:"#f57ec3",colors:["#adff00","#ffffff","#115ef3","#ffff00"]},{name:"Mono",background:"#ffffff",colors:["#000000","#d9d7cc","#737373","#ffffff"]},{name:"Lime pink",background:"#c8ff66",colors:["#adff00","#ffc4d8","#5718c0","#115ef3"]},{name:"Purple white",background:"#5718c0",colors:["#ab77ff","#ffffff","#d5bbff","#f57ec3"]},{name:"Teal ice",background:"#004012",colors:["#99edff","#c5e9ff","#c8ff66","#ffffff"]},{name:"Yellow shock",background:"#ffff00",colors:["#115ef3","#ec0648","#000000","#adff00"]},{name:"Black white blue",background:"#000000",colors:["#ffffff","#115ef3","#99edff","#adff00"]},{name:"Olive neutral",background:"#403700",colors:["#d9d7cc","#e5ece7","#ffff00","#ec0648"]},{name:"Bubblegum",background:"#9acbd5",colors:["#ef9da1","#d9d7cc","#3fb5fe","#ab9be3"]},{name:"Royal cyan",background:"#115ef3",colors:["#99edff","#ffffff","#3fb5fe","#ffff00"]},{name:"Purple acid",background:"#d5bbff",colors:["#5718c0","#ab77ff","#adff00","#ffffff"]},{name:"Green red",background:"#004012",colors:["#ec0648","#ffc4d8","#adff00","#ffff00"]}],ei=[30,45,20,5],eu={nodes:1400,clusters:6,depth:10,branching:2.6,spread:.2,crosslinks:.035,hub:.08,radius:1,perspective:1.7,distance:3.2,shell:!0,showGuides:!0,guides:3,guideTilt:.7,guideRoughness:0,guideWidth:.55,shape:"pixel",size:3.1,variation:.8,depthScale:.7,connections:!0,edgeOpacity:.34,edgeWidth:.55,lineRoughness:0,lineRoundness:.65,dash:0,dashGap:4,colorMode:"depth",editEnabled:!1,brush:24,paintColor:0,pitch:-.18,turn:.35,zoom:1,animate:!1,speed:.12,drift:.08,resolution:1200,backgroundTransparent:!1,background:"#000000",colors:["#adff00","#ab77ff","#99edff","#f57ec3"],colorRatios:ei,exportMode:"duration",exportDuration:6,exportCycles:1,exportFps:24},es=el[2];function ec(e){let t=ei.map((t,r)=>Math.max(0,R(e.colorRatios[r]??t)||0)),r=t.reduce((e,t)=>e+t,0);return{values:t,normalized:r>0?t.map(e=>e/r):[.25,.25,.25,.25]}}function ef(e,t,r,a){let{P:o,w:n,h:l}=e,i=t*e.cy+a*e.sy,u=-t*e.sy+a*e.cy,s=r*e.cx-u*e.sx,c=r*e.sx+u*e.cx,f=Math.max(.2,o.distance-c),d=o.perspective/f,p=.88*Math.min(n,l)*o.zoom;return{x:.5*n+i*p*d,y:.5*l-s*p*d,z:c,k:d}}function ed(e){let t={};for(let[r,a]of Object.entries(e))void 0!==a&&(t[r]=a);return t}let ep={config:{phase:{amount:[0,0,1,.005],lock:!1,invert:!1},graticule:{meridians:[6,0,24,1],parallels:[7,0,24,1],centerSplit:[0,0,1,.01],stroke:[2.9,.4,12,.05],roughness:[1.1,0,24,.1],resolution:[80,5,160,1],dashSpacing:[1,.4,4,.05],trim:[1,0,1,.005],trimOffset:[0,0,1,.005],cascade:[0,0,1,.01],travel:!1,line:{type:"select",options:[{value:"solid",label:"Solid"},{value:"dashed",label:"Dashed"},{value:"dotted",label:"Dotted"},{value:"squares",label:"Squares"}],default:"solid"},upright:!0,back:{type:"select",options:[{value:"match",label:"Far match"},{value:"dotted",label:"Far dot"},{value:"hidden",label:"Far off"}],default:"match"},outline:!0},camera:{view:{type:"select",options:[{value:"front",label:"Front"},{value:"top",label:"Top"},{value:"bottom",label:"Bottom"},{value:"left",label:"Left"},{value:"right",label:"Right"}],default:"front"},radius:[1.05,.2,2.4,.01],distance:[3.2,1.6,9,.05],focal:[1.6,.5,4,.01]},solid:{mode:{type:"select",options:[{value:"0",label:"Noise"},{value:"1",label:"Cells"},{value:"2",label:"Lat/lon"}],default:"0"},shells:[1,1,4,1],shellGap:[.16,.02,.45,.01],shellFalloff:[.12,0,.6,.01],scale:[.9,.15,4,.05],latLon:[16,2,48,1],cells:[1.3,.3,5,.05],metric:[1,0,1,.01],cellEdge:[.35,0,1,.01],xray:!1},light:{light:[.85,0,1.6,.01],angle:[-.9,-3.15,3.15,.01],height:[.45,-1.5,1.5,.01],rim:[.3,0,1.2,.01],lift:[0,-.5,.5,.01]},quantize:{mode:{type:"select",options:[{value:"0",label:"Stair"},{value:"1",label:"Square"},{value:"2",label:"Manhattan"}],default:"0"},contrast:[2,.6,5,.05],levels:[8,2,16,1],cellSize:[4,1,96,1],jitter:[0,0,1,.01],twist:[0,0,1,.01],quantMetric:[0,0,1,.01],noYellow:!0},dither:{scanline:[3,1,24,1],attach:[0,0,1,.01],surfaceLines:[44,4,160,1],pitch:[1.75,1,5,.25],vertical:[.05,0,.4,.01],regions:[2,.5,8,.1]},shift:{channelSkew:[3,0,24,.5],redX:[0,-48,48,1],blueX:[0,-48,48,1],rowJitter:[0,0,80,.5],shear:[0,-300,300,1]},motion:{animate:!1,pitchX:[.15,-1.6,1.6,.01],turnY:[0,-3.15,3.15,.01],speed:[1,0,3,.05],spinY:[.35,-2,2,.01],spinX:[0,-2,2,.01],morph:[0,0,.5,.005],roll:[0,0,1,.01],frameHold:[0,0,24,1]},output:{seed:{type:"text",default:"1024",placeholder:"Seed"},newSeed:{type:"action",label:"New seed"},resolution:{type:"select",options:["200","400","600","1000","1200","1800","2400"],default:"1200"},fps:{type:"select",options:["12","24","30"],default:"24"},duration:[4,.5,60,.1],randomize:{type:"action"},savePng:{type:"action",label:"Save PNG"},copySvg:{type:"action",label:"Copy SVG"},saveSvg:{type:"action",label:"Download SVG"},saveMp4:{type:"action",label:"Save MP4"},saveGif:{type:"action",label:"Save GIF"},saveJson:{type:"action",label:"Save JSON"},loadJson:{type:"action",label:"Load JSON"},reset:{type:"action"}}},toDial:function(e){var t,a,o,n;let l=(0,r.F)(e.P)?e.P:{};return{phase:ed({amount:l.uPhase,lock:!!e.lock,invert:!!e.invert}),graticule:ed({meridians:l.uMeridians,parallels:l.uParallels,centerSplit:l.uSplit??0,stroke:l.uWeight,roughness:l.uRough,resolution:l.uResPts,dashSpacing:l.uGapMul,trim:l.uTrim??1,trimOffset:l.uTrimOff??0,cascade:l.uTrimStag??0,travel:!!l.uTrimTravel,line:e.lineStyle||"solid",upright:0!==e.upright,back:e.backStyle||"match",outline:0!==e.outline}),camera:ed({view:e.viewName||"front",radius:l.uRadius,distance:l.uDist,focal:l.uFocal}),solid:(t=e,a=l,ed({mode:String(0|Number(t.mode)),shells:a.uShells,shellGap:a.uGap,shellFalloff:a.uShellFade,scale:a.uScale,latLon:a.uGridN,cells:a.uCells,metric:a.uMetric,cellEdge:a.uBorder,xray:!!t.xray})),...{light:ed({light:l.uLight,angle:l.uLightA,height:l.uLightY,rim:l.uRim,lift:l.uLift}),dither:ed({scanline:l.uUnit,attach:l.uAttach,surfaceLines:l.uSurfLines,pitch:l.uPitch,vertical:l.uVert,regions:l.uRegions}),shift:ed({channelSkew:l.uOffset,redX:l.uShiftR,blueX:l.uShiftB,rowJitter:l.uRowShift,shear:l.uShear})},quantize:(o=e,n=l,ed({mode:String(0|Number(o.qMode)),contrast:n.uContrast,levels:n.uSteps,cellSize:n.uSnap,jitter:n.uQJitter,twist:n.uQTwist,quantMetric:n.uQMetric,noYellow:!!o.noYellow})),motion:ed({animate:!!e.anim,pitchX:l.uRotX,turnY:l.uRotY,speed:l.uSpeed,spinY:l.uSpinY,spinX:l.uSpinX,morph:l.uMorph,roll:l.uRoll,frameHold:l.uHold}),output:{seed:String(e.seed??1024),resolution:String(e.resW||1200),fps:String(e.expFps||24),duration:Number(e.expDur)||4}}},fromDial:e=>(function(e){let t=t=>{let a=e[t];return e=>(0,r.F)(a)?a[e]:void 0},[a,o,n,l]=[t("output"),t("graticule"),t("solid"),t("quantize")];return{...ed({seed:parseInt(String(a("seed")),10)||0,mode:Number(n("mode")),qMode:Number(l("mode")),xray:+!!n("xray"),noYellow:+!!l("noYellow"),anim:!!t("motion")("animate"),lock:+!!t("phase")("lock"),invert:+!!t("phase")("invert"),outline:+!!o("outline"),upright:+(!1!==o("upright")),lineStyle:o("line"),backStyle:o("back"),viewName:t("camera")("view"),resW:Number(a("resolution")),expFps:Number(a("fps")),expDur:Number(a("duration"))}),P:ed({...function(e){let[t,r,a,o]=[e("graticule"),e("camera"),e("solid"),e("light")];return{uPhase:e("phase")("amount"),uMeridians:t("meridians"),uParallels:t("parallels"),uSplit:t("centerSplit")??0,uWeight:t("stroke"),uRough:t("roughness"),uResPts:t("resolution"),uGapMul:t("dashSpacing"),uTrim:t("trim")??1,uTrimOff:t("trimOffset")??0,uTrimStag:t("cascade")??0,uTrimTravel:+!!t("travel"),uRadius:r("radius"),uDist:r("distance"),uFocal:r("focal"),uShells:a("shells"),uGap:a("shellGap"),uShellFade:a("shellFalloff"),uScale:a("scale"),uGridN:a("latLon"),uCells:a("cells"),uMetric:a("metric"),uBorder:a("cellEdge"),uLight:o("light"),uLightA:o("angle"),uLightY:o("height"),uRim:o("rim"),uLift:o("lift")}}(t),...function(e){let[t,r,a,o]=[e("quantize"),e("dither"),e("shift"),e("motion")];return{uContrast:t("contrast"),uSteps:t("levels"),uSnap:t("cellSize"),uQJitter:t("jitter"),uQTwist:t("twist"),uQMetric:t("quantMetric"),uUnit:r("scanline"),uAttach:r("attach"),uSurfLines:r("surfaceLines"),uPitch:r("pitch"),uVert:r("vertical"),uRegions:r("regions"),uOffset:a("channelSkew"),uShiftR:a("redX"),uShiftB:a("blueX"),uRowShift:a("rowJitter"),uShear:a("shear"),uRotX:o("pitchX"),uRotY:o("turnY"),uSpeed:o("speed"),uSpinY:o("spinY"),uSpinX:o("spinX"),uMorph:o("morph"),uRoll:o("roll"),uHold:o("frameHold")}}(t)})}})(e)};function em(e){let t=0,r=0,a=-1;return{at:e=>e>=1?Math.floor(t*e)/e:t,restart(){r=0,a=-1},invalidate(){a=-1},advance(o,n,l){let i=r?Math.min(.1,(o-r)/1e3):0;if(r=o,t+=i*n,!e("native",o))return!1;if(l<1)return!0;let u=Math.floor(t*l);return u!==a&&(a=u,!0)}}}function eh(e,t,r){let a=e.createShader(t);if(!a)throw Error("Could not create a shader.");if(e.shaderSource(a,r.trim()),e.compileShader(a),!e.getShaderParameter(a,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(a)??"Shader failed to compile.");return a}function eg(e){if(!e)throw Error("WebGL2 is unavailable.");return e}e.s(["e",0,function(){t?.gl.getExtension("WEBGL_lose_context")?.loseContext(),t=void 0},"o",0,eg,"G",0,function(){return void 0===t&&(t=function(){let e=document.createElement("canvas");e.width=256,e.height=256;let t=e.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,preserveDrawingBuffer:!1});if(!t)return null;let r=0,a=!1,o=new Map,n=new Map,l=new Map;return e.addEventListener("webglcontextlost",e=>{e.preventDefault(),a=!0}),e.addEventListener("webglcontextrestored",()=>{a=!1,r++,o=new Map,n=new Map,l=new Map}),{gl:t,get generation(){return r},program(e,r,a){let n=o.get(e);if(n)return n;let l=t.createProgram();if(t.attachShader(l,eh(t,t.VERTEX_SHADER,r)),t.attachShader(l,eh(t,t.FRAGMENT_SHADER,a)),t.linkProgram(l),!t.getProgramParameter(l,t.LINK_STATUS))throw Error(t.getProgramInfoLog(l)??"Program failed to link.");return o.set(e,l),l},uniforms(e){let r=l.get(e);r||(r=new Map,l.set(e,r));let a=r;return r=>(a.has(r)||a.set(r,t.getUniformLocation(e,r)),a.get(r)??null)},bindFullscreenTriangle(e,r){let a=n.get(e);if(!a){a=t.createVertexArray(),t.bindVertexArray(a);let o=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,o),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);let l=t.getAttribLocation(e,r);t.enableVertexAttribArray(l),t.vertexAttribPointer(l,2,t.FLOAT,!1,0,0),n.set(e,a)}t.bindVertexArray(a)},render(r,o,n,l){a||o<1||n<1||((e.width<o||e.height<n)&&(e.width=Math.max(e.width,256*Math.ceil(o/256)),e.height=Math.max(e.height,256*Math.ceil(n/256))),t.viewport(0,0,o,n),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),l(t),r.globalCompositeOperation="copy",r.drawImage(e,0,e.height-n,o,n,0,0,r.canvas.width,r.canvas.height),r.globalCompositeOperation="source-over")}}}()),t}],191951);let eb=[["5-c","Cyan + accents","#99EDFF",["#FFFF00","#C8FF66","#115EF3","#FFFFFF"]],["5-f","Royal + accents","#115EF3",["#FFFFFF","#99EDFF","#FFFF00","#ADFF00"]],["5-h","Lt blue + accents","#C5E9FF",["#115EF3","#FFFF00","#EC0648","#ADFF00"]],["5-q","Dark purple + accents","#5718C0",["#AB77FF","#D5BBFF","#ADFF00","#FFFFFF"]],["5-r","Lt purple + accents","#D5BBFF",["#5718C0","#AB77FF","#ADFF00","#FFFFFF"]],["5-s","Black + purple","#000000",["#5718C0","#AB77FF","#D5BBFF","#ADFF00"]],["5-i","Green + accents","#004012",["#C8FF66","#FFFF00","#99EDFF","#ADFF00"]],["5-n","Teal / cyan","#004012",["#99EDFF","#C5E9FF","#C8FF66","#FFFFFF"]],["5-k","Yellow + accents","#FFFF00",["#115EF3","#EC0648","#000000","#ADFF00"]],["5-b","Pink + accents","#FFC4D8",["#C8FF66","#FFFFFF","#EC0648","#ADFF00"]],["5-j","Red + accents","#EC0648",["#FFFFFF","#FFC4D8","#FFFF00","#115EF3"]],["5-l","Lt pink + accents","#FFC4D8",["#EC0648","#99EDFF","#115EF3","#FFFF00"]],["5-o","Hot pink + lime","#F57EC3",["#ADFF00","#FFFFFF","#115EF3","#FFFF00"]],["5-a","Olive + accents","#403700",["#99EDFF","#115EF3","#C8FF66","#ADFF00"]],["5-d","White + accents","#FFFFFF",["#115EF3","#FFFF00","#ADFF00","#C8FF66"]],["5-e","Sage + accents","#E5ECE7",["#403700","#ADFF00","#FFFF00","#115EF3"]],["5-g","Black + accents","#000000",["#ADFF00","#F57EC3","#FFFFFF","#99EDFF"]],["5-m","Olive / yellow","#403700",["#FFFF00","#ADFF00","#D9D7CC","#EC0648"]],["5-p","White / multi","#FFFFFF",["#115EF3","#EC0648","#ADFF00","#403700"]]],ev=[["2-a","Cyan / Lime","#99EDFF",["#99EDFF","#ADFF00"]],["2-d","Olive / Cyan","#403700",["#403700","#99EDFF"]],["2-m","Lt blue / Royal","#C5E9FF",["#C5E9FF","#115EF3"]],["2-p","Royal / Cyan","#115EF3",["#115EF3","#99EDFF"]],["2-w","Baby blue / Blue","#C5E9FF",["#3FB5FE","#115EF3"]],["2-aa","Dark purple / Lt purple","#5718C0",["#5718C0","#D5BBFF"]],["2-ab","Dark purple / Lime","#5718C0",["#5718C0","#ADFF00"]],["2-ac","Purple / White","#5718C0",["#AB77FF","#FFFFFF"]],["2-ad","Lt purple / Dark purple","#D5BBFF",["#D5BBFF","#5718C0"]],["2-ae","Black / Purple","#000000",["#000000","#AB77FF"]],["2-af","Dark purple / Cyan","#5718C0",["#5718C0","#99EDFF"]],["2-c","Green / Cyan","#004012",["#004012","#99EDFF"]],["2-f","Sage / Lime","#96AFAC",["#96AFAC","#ADFF00"]],["2-h","Green / Red","#004012",["#004012","#EC0648"]],["2-i","Green / Lime","#004012",["#004012","#ADFF00"]],["2-v","Lt lime / Green","#C8FF66",["#C8FF66","#004012"]],["2-y","Teal / Lt blue","#004012",["#004012","#C5E9FF"]],["2-e","Yellow / Black","#FFFF00",["#FFFF00","#000000"]],["2-g","Lime / Red","#ADFF00",["#ADFF00","#EC0648"]],["2-j","Olive / Lime","#403700",["#403700","#ADFF00"]],["2-k","Lime / Pink","#C8FF66",["#C8FF66","#FFC4D8"]],["2-x","Yellow / Blue","#FFFF00",["#FFFF00","#115EF3"]],["2-b","Pink / Red","#FFC4D8",["#FFC4D8","#EC0648"]],["2-n","White / Red","#FFFFFF",["#FFFFFF","#EC0648"]],["2-q","Red / Pink","#EC0648",["#EC0648","#FFC4D8"]],["2-t","Black / Pink","#000000",["#000000","#F57EC3"]],["2-z","Pink / White","#F57EC3",["#F57EC3","#FFFFFF"]],["2-l","Olive / Lt brown","#403700",["#403700","#D9D7CC"]],["2-o","Sage / Brown","#E5ECE7",["#E5ECE7","#403700"]],["2-r","Black / White","#000000",["#000000","#FFFFFF"]],["2-s","Black / Lime","#000000",["#000000","#ADFF00"]],["2-u","Olive / Yellow","#403700",["#403700","#FFFF00"]],["3-c","Cyan / blue / yellow","#99EDFF",["#115EF3","#FFFF00","#FFFFFF"]],["3-d","White / blue / lime","#FFFFFF",["#115EF3","#ADFF00","#C8FF66"]],["3-e","Lt blue / royal / yellow","#C5E9FF",["#115EF3","#3FB5FE","#FFFF00"]],["3-g","Royal / white / cyan","#115EF3",["#FFFFFF","#99EDFF","#FFFF00"]],["3-p","Baby blue / royal / pink","#C5E9FF",["#115EF3","#F57EC3","#FFFF00"]],["3-q","Purple ramp","#5718C0",["#5718C0","#AB77FF","#D5BBFF"]],["3-r","Dark purple / lime / white","#5718C0",["#ADFF00","#FFFFFF","#D5BBFF"]],["3-s","Dark purple / cyan / lime","#5718C0",["#99EDFF","#ADFF00","#AB77FF"]],["3-t","Lt purple / purple / black","#D5BBFF",["#AB77FF","#5718C0","#000000"]],["3-i","Green / lime / yellow","#004012",["#ADFF00","#FFFF00","#C8FF66"]],["3-n","Teal / cyan / lime","#004012",["#99EDFF","#C8FF66","#FFFF00"]],["3-k","Yellow / blue / red","#FFFF00",["#115EF3","#EC0648","#000000"]],["3-b","Pink / white / red","#FFC4D8",["#FFFFFF","#EC0648","#ADFF00"]],["3-j","Red / pink / white","#EC0648",["#FFC4D8","#FFFFFF","#FFFF00"]],["3-m","Lt pink / red / cyan","#FFC4D8",["#EC0648","#99EDFF","#FFFF00"]],["3-a","Olive / cyan / lime","#403700",["#99EDFF","#ADFF00","#C8FF66"]],["3-f","Sage / brown / lime","#E5ECE7",["#403700","#ADFF00","#FFFF00"]],["3-h","Black / lime / pink","#000000",["#ADFF00","#F57EC3","#FFFFFF"]],["3-l","Olive / yellow / pink","#403700",["#FFFF00","#F57EC3","#99EDFF"]],["3-o","Black / white / blue","#000000",["#FFFFFF","#115EF3","#ADFF00"]],...eb.map(([e,t,r,a])=>[`4${e.slice(1)}`,t,r,a.slice(0,3)]),...eb].map(([e,t,r,a])=>({id:e,label:t,background:r,marks:a}));function ex(e){if(null==e||""===e)return null;let t=ev.findIndex(t=>t.id===e);return t<0?null:t}function ey(e){return[parseInt(e.slice(1,3),16)/255,parseInt(e.slice(3,5),16)/255,parseInt(e.slice(5,7),16)/255]}function eF(e){if(e.custom)return e.marks;let t=e.background.toUpperCase(),r=e.marks.filter(e=>e.toUpperCase()!==t);return r.length?r:e.marks}function eS(e,t,r){let a=Number(e),o=Number.isInteger(a)&&a>=0&&a<ev.length;return S(ev[o?a:r],t)}function ew(e,t){let{gl:r}=e,a="linear"===t.filter?r.LINEAR:r.NEAREST,o=1===t.unit?r.TEXTURE1:r.TEXTURE0,n=null;return{bind:(t,l)=>(r.activeTexture(o),n?.generation!==e.generation&&(n=function(e,t){let{gl:r}=e,a=r.createTexture();return r.bindTexture(r.TEXTURE_2D,a),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,t),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,t),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),{generation:e.generation,texture:a,framebuffer:r.createFramebuffer(),width:0,height:0}}(e,a)),(n.width!==t||n.height!==l)&&(r.bindTexture(r.TEXTURE_2D,n.texture),r.bindBuffer(r.PIXEL_UNPACK_BUFFER,null),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,t,l,0,r.RGBA,r.UNSIGNED_BYTE,null),r.bindFramebuffer(r.FRAMEBUFFER,n.framebuffer),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,n.texture,0),n.width=t,n.height=l),r.bindFramebuffer(r.FRAMEBUFFER,n.framebuffer),n.texture),release(){n?.generation===e.generation&&(r.deleteFramebuffer(n.framebuffer),r.deleteTexture(n.texture)),n=null}}}let eM=`#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a,0.0,1.0); }`,eP=`#version 300 es
precision highp float;
out vec4 O;

uniform sampler2D uWire;
uniform vec2  uRes;
uniform float uSeed, uTime, uPhase, uLock, uInvert;
uniform float uSplit;
uniform float uRadius, uDist, uFocal, uShells, uGap, uShellFade, uXray;
uniform float uMode, uScale, uCells, uMetric, uBorder, uGridN;
uniform float uLight, uLightA, uLightY, uRim, uLift;
uniform float uContrast, uSteps, uSnap, uQMode, uQJitter, uQTwist, uQMetric;
uniform float uUnit, uPitch, uVert, uRegions, uAttach, uSurfLines;
uniform float uOffset, uShiftR, uShiftB, uRowShift, uShear;
uniform float uRotX, uRotY, uSpinX, uSpinY, uMorph, uRoll;
uniform float uNoYellow;
uniform float uPalOn, uPalN;
uniform vec3  uBg;
uniform float uBackgroundTransparent;
uniform float uPremultiply;
uniform vec3  uPal[4];
uniform sampler2D uPlate;
uniform float uPlateOn, uPlateMask, uPlateInfuse, uPlateFit, uPlateScale, uPlateHold, uPlateInvert;
uniform vec2  uPlateRes;

float hash11(float p){ p=fract(p*0.1031); p*=p+33.33; p*=p+p; return fract(p); }
float hash21(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*0.1031); p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}
vec2 hash22(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*vec3(0.1031,0.1030,0.0973)); p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.xx+p3.yz)*p3.zy);
}
float hash31(vec3 p){ p=fract(p*0.1031); p+=dot(p,p.yzx+33.33); return fract((p.x+p.y)*p.z); }
vec3 hash33(vec3 p){
  p=fract(p*vec3(0.1031,0.1030,0.0973)); p+=dot(p,p.yxz+33.33);
  return fract((p.xxy+p.yxx)*p.zyx);
}
float vnoise3(vec3 p){
  vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  float a=mix(mix(hash31(i),             hash31(i+vec3(1,0,0)),f.x),
              mix(hash31(i+vec3(0,1,0)), hash31(i+vec3(1,1,0)),f.x), f.y);
  float b=mix(mix(hash31(i+vec3(0,0,1)), hash31(i+vec3(1,0,1)),f.x),
              mix(hash31(i+vec3(0,1,1)), hash31(i+vec3(1,1,1)),f.x), f.y);
  return mix(a,b,f.z);
}
float fbm3(vec3 p){
  float s=0.0,a=0.5;
  for(int i=0;i<3;i++){ s+=a*vnoise3(p); p=p*2.03+vec3(11.3,7.7,3.1); a*=0.5; }
  return s*1.14;
}
mat3 rotX(float a){ float c=cos(a),s=sin(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }
mat3 rotY(float a){ float c=cos(a),s=sin(a); return mat3(c,0,s, 0,1,0, -s,0,c); }
float mdist(vec3 r){
  return mix(abs(r.x)+abs(r.y)+abs(r.z), max(max(abs(r.x),abs(r.y)),abs(r.z)), uMetric);
}
float cellField(vec3 p, float cs){
  vec3 g=p*uCells, i=floor(g), f=fract(g);
  float d1=1e9,d2=1e9,id=0.0;
  for(int z=-1;z<=1;z++){
    for(int y=-1;y<=1;y++){
      for(int x=-1;x<=1;x++){
        vec3 o=vec3(float(x),float(y),float(z));
        vec3 c=0.15+0.70*hash33(i+o+uSeed*11.0);
        float ph=hash31(i+o+uSeed*4.0)*6.2832;
        c+=vec3(sin(uTime*1.3+ph),cos(uTime*1.1+ph),sin(uTime*0.9+ph))*uMorph*0.55;
        float d=mdist(o+c-f);
        if(d<d1){ d2=d1; d1=d; id=hash31(i+o+uSeed*5.0); }
        else if(d<d2){ d2=d; }
      }
    }
  }
  return mix(id,1.0-d1,0.55) + uBorder*(1.0-smoothstep(0.0,0.16,d2-d1)) + cs*0.09;
}
float surface(vec3 n, float cs){
  if(uMode < 0.5) return fbm3(n*uScale*4.0 + uSeed + cs*1.7 + uTime*uMorph*0.4)*1.25 - 0.12;
  if(uMode < 1.5) return cellField(n*uScale*4.0 + uSeed, cs);
  float lat = asin(clamp(n.y,-1.0,1.0))/3.14159 + 0.5;
  float lon = atan(n.z,n.x)/6.28318 + 0.5;
  vec2 e = abs(fract(vec2(lon,lat)*uGridN + uTime*uMorph*0.3) - 0.5);
  return 1.0 - 2.0*min(e.x,e.y) + cs*0.07;
}
float regionId(vec2 uv){
  vec2 g=uv*vec2(uRegions*1.4,uRegions*0.8)+uSeed;
  vec2 i=floor(g), f=fract(g);
  float best=1e9; vec2 bid=i;
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 o=vec2(float(x),float(y));
      vec2 d=o+hash22(i+o+uSeed*7.0)-f; d.y*=1.6;
      float m=dot(d,d);
      if(m<best){ best=m; bid=i+o; }
    }
  }
  return hash21(bid+uSeed*3.0);
}

// screen-space sample snap: stair (X only), square (L1 / manhattan voronoi on this world),
// or manhattan mode (blend via uQMetric). jitter 0 + square = diamond pixel cells.
vec2 qSnap(vec2 p, float cell){
  if(uQMode < 0.5){
    p.x = floor(p.x/cell)*cell;
    return p;
  }
  float ang = uQTwist * 0.785398;
  float cs = cos(ang), sn = sin(ang);
  vec2 origin = 0.5 * uRes;
  vec2 q = p - origin;
  vec2 r = vec2(cs*q.x - sn*q.y, sn*q.x + cs*q.y);
  vec2 g = r / max(cell, 1.0);
  vec2 i = floor(g), f = fract(g);
  float best = 1e9;
  vec2 hit = r;
  float metric = uQMode < 1.5 ? 0.0 : uQMetric;
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 o = vec2(float(x), float(y));
      vec2 h = hash22(i+o+uSeed*13.0);
      float ph = hash21(i+o+uSeed*6.0)*6.2832;
      vec2 c = mix(vec2(0.5), 0.08+0.84*h, uQJitter);
      c += vec2(sin(uTime*1.3+ph), cos(uTime*1.1+ph))*uMorph*0.45*uQJitter;
      vec2 d = o+c-f;
      float m = mix(abs(d.x)+abs(d.y), max(abs(d.x),abs(d.y)), metric);
      if(m < best){
        best = m;
        hit = (i+o+c)*cell;
      }
    }
  }
  return origin + vec2(cs*hit.x + sn*hit.y, -sn*hit.x + cs*hit.y);
}

vec2 plateUV(vec2 spx){
  vec2 uv = spx / max(uRes, vec2(1.0));
  float sc = max(uPlateScale, 0.01);
  if(uPlateFit < 0.5) return (uv - 0.5) / sc + 0.5;
  vec2 pr = max(uPlateRes, vec2(1.0));
  float canvasA = uRes.x / max(uRes.y, 1.0);
  float plateA  = pr.x / max(pr.y, 1.0);
  vec2 fitXY = (uPlateFit < 1.5)
    ? (plateA > canvasA ? vec2(1.0, canvasA/plateA) : vec2(plateA/canvasA, 1.0))
    : (plateA > canvasA ? vec2(plateA/canvasA, 1.0) : vec2(1.0, canvasA/plateA));
  return (uv - 0.5) / (fitXY * sc) + 0.5;
}
vec4 plateSample(vec2 p){
  if(uPlateOn < 0.5) return vec4(0.0);
  vec2 uv = plateUV(p);
  if(min(uv.x, uv.y) < 0.0 || max(uv.x, uv.y) > 1.0) return vec4(0.0);
  return vec4(texture(uPlate, uv).rgb, 1.0);
}

// the phase macro: each stage of the destruction fades in over its own span
float w(float a, float b){ return uLock > 0.5 ? 1.0 : smoothstep(a, b, uPhase); }

void main(){
  float wQuant  = w(0.05, 0.45);
  float wDither = w(0.15, 0.60);
  float wShift  = w(0.35, 0.90);
  float wSolid  = w(0.45, 1.00);

  vec2  px   = floor(gl_FragCoord.xy);
  float unit = max(1.0, mix(1.0, floor(uUnit), wDither));
  vec2  qpx  = vec2(px.x, floor(px.y/unit)*unit);
  vec2  uvs  = qpx/uRes;

  float rid   = regionId(uvs*3.0);
  float pitch = max(1.0, floor(mix(1.0,4.0,hash11(rid*3.13))*uPitch));
  float nqT   = floor(mix(0.35,1.0,hash11(rid*7.77))*uSteps) + 2.0;
  float nq    = mix(96.0, nqT, wQuant);
  float phase = hash11(rid*11.11);
  float snap  = max(1.0, floor(mix(1.0, mix(1.0,uSnap, uQMode < 0.5 ? wShift : wQuant), hash11(rid*5.55))));
  bool  vert  = hash11(rid*17.17) < uVert*wDither;
  vec2  dir   = normalize(hash22(vec2(rid,rid*2.0))*2.0 - 1.0 + vec2(1e-3,1e-3));

  float rowi  = floor(px.y/unit);
  float shift = ((hash11(rowi*0.137 + uSeed*3.0)*2.0-1.0)*uRowShift
                + (uvs.y-0.5)*uShear) * wShift;

  mat3 M = rotY(uRotY + uTime*uSpinY) * rotX(uRotX + uTime*uSpinX);
  vec3 L = normalize(vec3(cos(uLightA), uLightY, sin(uLightA)));
  vec3 ro = vec3(0.0, 0.0, -uDist);

  vec3 col = vec3(0.0);
  vec3 pCol = vec3(0.0);
  float pA = 0.0;
  for(int c=0;c<3;c++){
    float cf  = float(c);
    float chs = ((cf < 0.5) ? uShiftR : ((cf > 1.5) ? uShiftB : 0.0)) * wShift;

    vec2 spx = vec2(qpx.x + shift + chs, qpx.y) + dir*uOffset*(cf-1.0)*wShift;
    vec2 raw = spx;
    spx = qSnap(spx, snap);
    if(uQMode < 0.5) spx.y = floor(spx.y/unit)*unit;
    else spx = mix(raw, spx, wQuant);

    vec4 p = plateSample(uPlateHold > 0.5 ? px : spx);
    pCol[c] = p[c];
    pA = max(pA, p.a);

    // Separate the left and right hemispheres from a clean center seam.
    // The wire raster and solid ray use the same shifted coordinate so they remain aligned.
    vec2 worldPx = spx;
    float splitX = qpx.x - 0.5*uRes.x;
    float splitGap = uSplit * 0.22 * uRes.y;
    bool splitVoid = abs(splitX) < splitGap;
    worldPx.x -= sign(splitX) * splitGap;

    // A — the rasterized vector graticule, displaced with everything else
    float wire = texture(uWire, worldPx/uRes).r;

    // B — the shaded solid, same camera, same rotation
    vec2 sp = (worldPx - 0.5*uRes)/uRes.y;
    vec3 rd = normalize(vec3(sp.x, sp.y, uFocal));
    float b  = dot(ro, rd), c0 = dot(ro, ro);
    float solid = 0.0;
    vec3  nBand = vec3(0.0);
    float graze = 0.0;
    bool  got   = false;

    for(int i=0;i<4;i++){
      if(float(i) >= uShells) break;
      float R = uRadius*(1.0 - float(i)*uGap);
      if(R <= 0.02) break;
      float h = b*b - (c0 - R*R);
      if(h < 0.0) continue;
      h = sqrt(h);
      float fade = float(i)*uShellFade;
      vec3 nn = normalize(ro + rd*(-b - h));
      if(!got){ nBand = M*nn; graze = abs(dot(nn,-rd)); got = true; }
      float s = surface(M*nn, cf*0.37)
              + uLight*(max(dot(nn,L),0.0) - 0.5)
              + uRim*pow(1.0 - abs(dot(nn,-rd)), 2.0);
      solid = max(solid, s - fade);
      if(uXray > 0.5){
        vec3 nf = normalize(ro + rd*(-b + h));
        solid = max(solid, surface(M*nf, cf*0.37)
                         + uLight*(max(dot(nf,L),0.0) - 0.5) - fade - 0.22);
      }
    }

    float v = mix(wire, clamp(solid,0.0,1.5), wSolid);
    v = clamp((v-0.5)*mix(1.0,uContrast,wQuant) + 0.5 + uLift*wQuant, 0.0, 1.0);

    float qv = floor(v*nq + phase)/nq;

    float scoord = (vert ? spx.x : qpx.y)/unit;
    float ocoord = (vert ? nBand.x : nBand.y)*uSurfLines;
    float att    = got ? uAttach*wDither*smoothstep(0.0,0.30,graze) : 0.0;
    float coord  = floor(mix(scoord, ocoord, att));
    float band   = (mod(coord + phase*pitch - uTime*uRoll*60.0, pitch) + 0.5)/pitch;

    // at phase 0 this is a plain 0.5 threshold on clean coverage
    col[c] = splitVoid ? 0.0 : step(mix(0.5, band, wDither), mix(v, qv, wQuant));
  }

  if(uNoYellow > 0.5 && col.r > 0.5 && col.g > 0.5 && col.b < 0.5){
    if(hash11(rid*23.0) < 0.5) col.g = 0.0; else col.r = 0.0;
  }
  if(uInvert > 0.5) col = 1.0 - col;

  float coverage = max(col.r,max(col.g,col.b));
  vec3 outc = col;
  if(uPalOn > 0.5){
    float code = (col.r>0.5?1.0:0.0) + (col.g>0.5?2.0:0.0) + (col.b>0.5?4.0:0.0);
    outc = uBg;
    if(code > 0.5) outc = uPal[int(mod(code-1.0, max(uPalN,1.0)))];
  }
  if(uPlateOn > 0.5){
    float hit = max(col.r, max(col.g, col.b));
    outc = mix(outc, pCol, pA * mix(uPlateMask, uPlateInfuse, hit));
    coverage = mix(coverage,1.0,pA * mix(uPlateMask,uPlateInfuse,hit));
  }
  outc = mix(outc, vec3(1.0) - outc, uPlateInvert);
  O = vec4(outc,mix(1.0,coverage,uBackgroundTransparent));
  if(uPremultiply>.5) O.rgb=clamp(O.rgb,0.0,1.0)*O.a;
}`,ek=[{key:"uPhase",min:0,max:1,def:0},{key:"uMeridians",min:0,max:24,def:6,cpu:!0},{key:"uParallels",min:0,max:24,def:7,cpu:!0},{key:"uSplit",min:0,max:1,def:0},{key:"uWeight",min:.4,max:12,def:2.9,cpu:!0},{key:"uRough",min:0,max:24,def:1.1,cpu:!0},{key:"uResPts",min:5,max:160,def:80,cpu:!0},{key:"uGapMul",min:.4,max:4,def:1,cpu:!0},{key:"uTrim",min:0,max:1,def:1,cpu:!0},{key:"uTrimOff",min:0,max:1,def:0,cpu:!0},{key:"uTrimStag",min:0,max:1,def:0,cpu:!0},{key:"uTrimTravel",min:0,max:1,def:0,cpu:!0},{key:"uRadius",min:.2,max:2.4,def:1.05},{key:"uDist",min:1.6,max:9,def:3.2},{key:"uFocal",min:.5,max:4,def:1.6},{key:"uShells",min:1,max:4,def:1},{key:"uGap",min:.02,max:.45,def:.16},{key:"uShellFade",min:0,max:.6,def:.12},{key:"uScale",min:.15,max:4,def:.9},{key:"uGridN",min:2,max:48,def:16},{key:"uCells",min:.3,max:5,def:1.3},{key:"uMetric",min:0,max:1,def:1},{key:"uBorder",min:0,max:1,def:.35},{key:"uLight",min:0,max:1.6,def:.85},{key:"uLightA",min:-3.15,max:3.15,def:-.9},{key:"uLightY",min:-1.5,max:1.5,def:.45},{key:"uRim",min:0,max:1.2,def:.3},{key:"uLift",min:-.5,max:.5,def:0},{key:"uContrast",min:.6,max:5,def:2},{key:"uSteps",min:2,max:16,def:8},{key:"uSnap",min:1,max:96,def:4},{key:"uQJitter",min:0,max:1,def:0},{key:"uQTwist",min:0,max:1,def:0},{key:"uQMetric",min:0,max:1,def:0},{key:"uUnit",min:1,max:24,def:3},{key:"uAttach",min:0,max:1,def:0},{key:"uSurfLines",min:4,max:160,def:44},{key:"uPitch",min:1,max:5,def:1.75},{key:"uVert",min:0,max:.4,def:.05},{key:"uRegions",min:.5,max:8,def:2},{key:"uOffset",min:0,max:24,def:3},{key:"uShiftR",min:-48,max:48,def:0},{key:"uShiftB",min:-48,max:48,def:0},{key:"uRowShift",min:0,max:80,def:0},{key:"uShear",min:-300,max:300,def:0},{key:"uRotX",min:-1.6,max:1.6,def:.15},{key:"uRotY",min:-3.15,max:3.15,def:0},{key:"uSpeed",min:0,max:3,def:1,cpu:!0},{key:"uSpinY",min:-2,max:2,def:.35},{key:"uSpinX",min:-2,max:2,def:0},{key:"uMorph",min:0,max:.5,def:0},{key:"uRoll",min:0,max:1,def:0},{key:"uHold",min:0,max:24,def:0,cpu:!0}],eR=ek.filter(e=>!e.cpu).map(e=>e.key),eT=new Map([["front",[0,0]],["top",[1.5708,0]],["bottom",[-1.5708,0]],["left",[0,1.5708]],["right",[0,-1.5708]]]);function eA(e,t){let r=ek.find(t=>t.key===e);return r?Math.min(r.max,Math.max(r.min,t)):t}function eC(e,t,r){let a=e[t];return"number"==typeof a&&Number.isFinite(a)?a:r}let eE=(e,t)=>e[t]?Number(e[t]):0;function eD(e,t){return eS(e,(0,r.F)(t)?t:null,0)}let ez=`#version 300 es
in vec2 aCorner;
in vec4 aSegment;
in float aKind;
uniform vec2 uRes;
uniform float uHalf;
flat out vec4 vSegment;
flat out float vKind;
void main(){
  vSegment = aSegment;
  vKind = aKind;
  // Covers a rotated square cap's corners plus the antialiasing fringe.
  float margin = uHalf * 1.5 + 1.0;
  vec2 lo = min(aSegment.xy, aSegment.zw) - margin;
  vec2 hi = max(aSegment.xy, aSegment.zw) + margin;
  vec2 p = mix(lo, hi, aCorner);
  // Wire space is the source canvas's: pixels, y down.
  gl_Position = vec4(p.x / uRes.x * 2.0 - 1.0, 1.0 - p.y / uRes.y * 2.0, 0.0, 1.0);
}`,eB=`#version 300 es
precision highp float;
flat in vec4 vSegment;
flat in float vKind;
uniform vec2 uRes;
uniform float uHalf;
out vec4 outColor;
const int GRID = 4;
bool inside(vec2 q, vec2 a, vec2 dir, float len){
  if (vKind > 1.5) return max(abs(q.x - a.x), abs(q.y - a.y)) <= uHalf;
  float u = dot(q - a, dir);
  float v = dot(q - a, vec2(-dir.y, dir.x));
  if (vKind > 0.5) return abs(u - 0.5 * len) <= 0.5 * len + uHalf && abs(v) <= uHalf;
  return length(vec2(u - clamp(u, 0.0, len), v)) <= uHalf;
}
void main(){
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 a = vSegment.xy;
  vec2 ab = vSegment.zw - a;
  float len = length(ab);
  vec2 dir = len > 1e-6 ? ab / len : vec2(1.0, 0.0);
  // Coverage from a GRID x GRID sample grid over the pixel, like Canvas's
  // supersampled antialiasing.
  float hits = 0.0;
  for (int y = 0; y < GRID; y++)
    for (int x = 0; x < GRID; x++) {
      vec2 offset = (vec2(x, y) + 0.5) / float(GRID) - 0.5;
      if (inside(p + offset, a, dir, len)) hits += 1.0;
    }
  float c = hits / float(GRID * GRID);
  outColor = vec4(c, c, c, 1.0);
}`,eN=2*Math.PI;function eX(e,t){let r,a=(r=e,()=>{r|=0;let e=Math.imul((r=r+0x6d2b79f5|0)^r>>>15,1|r);return(((e=e+Math.imul(e^e>>>7,61|e)^e)^e>>>14)>>>0)/0x100000000}),o=[];for(let e=1;e<=t;e++)o.push([e,(2*a()-1)/e,a()*eN]);return e=>o.reduce((t,[r,a,o])=>t+a*Math.sin(eN*r*e+o),0)}let eY=new Map;function eL(e,t,r,a){let o=3+Math.floor(Math.min(9,.5*T(e,"uRough"))),n=`${t}|${r}|${o}|${a}`,l=eY.get(n);if(!l){let e=eX(t,o),i=eX(r,o),u=new Float64Array(a),s=new Float64Array(a);for(let t=0;t<a;t++){let r=t/a;u[t]=e(r),s[t]=i(r)}l={ox:u,oy:s},eY.size>600&&eY.clear(),eY.set(n,l)}return l}function eO(e,t){let r=T(e,"uRadius"),a=T(e,"uDist");return a<=r?t:t*T(e,"uFocal")*r/Math.sqrt(a*a-r*r)}let eI=e=>"squares"===e?"square":"round";function eG(e){let t=0;for(let r=1;r<e.length;r++)t+=Math.hypot(e[r][0]-e[r-1][0],e[r][1]-e[r-1][1]);return t}function eq(e,t,r){let a=[],o=0;for(let n=1;n<e.length;n++){let[l,i]=e[n-1],[u,s]=e[n],c=Math.hypot(u-l,s-i),f=o,d=o+c;if(d>=t&&f<=r&&c>1e-8){let e=Math.max(0,(t-f)/c),o=Math.min(1,(r-f)/c);a.length||a.push([l+(u-l)*e,i+(s-i)*e]),a.push([l+(u-l)*o,i+(s-i)*o])}o=d}return a}let e$=(e,t)=>{let a=e[t];return(0,r.F)(a)?a:{}},eW={config:{seed:{type:"text",default:"1024",placeholder:"Seed"},newSeed:{type:"action",label:"New seed"},orb:{radius:[1.05,.2,2.4,.01],distance:[3.2,1.6,9,.05],focal:[1.6,.5,4,.01],shells:[1,1,4,1],shellGap:[.16,.02,.45,.01],shellFalloff:[.12,0,.6,.01],xray:!1},surface:{mode:{type:"select",options:[{value:"0",label:"Noise"},{value:"1",label:"Cells"},{value:"2",label:"Lat/lon"}],default:"0"},scale:[.9,.15,4,.05],latLon:[16,2,48,1],cells:[1.3,.3,5,.05],metric:[1,0,1,.01],cellEdge:[.35,0,1,.01]},light:{light:[.85,0,1.6,.01],angle:[-.9,-3.15,3.15,.01],height:[.45,-1.5,1.5,.01],rim:[.3,0,1.2,.01],lift:[0,-.5,.5,.01]},quantize:{mode:{type:"select",options:[{value:"0",label:"Stair"},{value:"1",label:"Square"},{value:"2",label:"Manhattan"}],default:"0"},contrast:[2,.6,5,.05],levels:[8,2,16,1],cellSize:[4,1,96,1],jitter:[0,0,1,.01],twist:[0,0,1,.01],quantMetric:[0,0,1,.01],noYellow:!0},dither:{scanline:[1,1,24,1],attach:[0,0,1,.01],surfaceLines:[44,4,160,1],pitch:[1.75,1,5,.25],vertical:[.05,0,.4,.01],regions:[2,.5,8,.1]},shift:{channelSkew:[3,0,24,.5],redX:[0,-48,48,1],blueX:[0,-48,48,1],rowJitter:[0,0,80,.5],shear:[0,-300,300,1]},backdrop:{amount:[0,0,1,.01],scale:[3.5,.5,12,.1]},motion:{animate:!1,pitchX:[.15,-1.6,1.6,.01],turnY:[0,-3.15,3.15,.01],speed:[1,0,3,.05],spinY:[.35,-2,2,.01],spinX:[0,-2,2,.01],morph:[0,0,.5,.005],roll:[0,0,1,.01],frameHold:[0,0,24,1]},output:{resolution:{type:"select",options:["200","400","600","1000","1200","1800","2400"],default:"1200"},fps:{type:"select",options:["12","24","30"],default:"24"},duration:{type:"select",options:[{value:"2",label:"2 s"},{value:"4",label:"4 s"},{value:"8",label:"8 s"}],default:"4"},randomize:{type:"action"},savePng:{type:"action",label:"Save PNG"},copySvg:{type:"action",label:"Copy SVG"},saveSvg:{type:"action",label:"Download SVG"},saveMp4:{type:"action",label:"Save MP4"},saveGif:{type:"action",label:"Save GIF"},saveJson:{type:"action",label:"Save JSON"},loadJson:{type:"action",label:"Load JSON"},reset:{type:"action"}}},toDial:function(e){let{P:t}=e;return{seed:String(e.seed??1024),orb:{radius:t.uRadius,distance:t.uDist,focal:t.uFocal,shells:t.uShells,shellGap:t.uGap,shellFalloff:t.uShellFade,xray:!!e.xray},surface:{mode:String(0|Number(e.mode)),scale:t.uScale,latLon:t.uGridN,cells:t.uCells,metric:t.uMetric,cellEdge:t.uBorder},light:{light:t.uLight,angle:t.uLightA,height:t.uLightY,rim:t.uRim,lift:t.uLift},quantize:{mode:String(0|Number(e.qMode)),contrast:t.uContrast,levels:t.uSteps,cellSize:t.uSnap,jitter:t.uQJitter,twist:t.uQTwist,quantMetric:t.uQMetric,noYellow:!!e.noYellow},dither:{scanline:t.uUnit,attach:t.uAttach,surfaceLines:t.uSurfLines,pitch:t.uPitch,vertical:t.uVert,regions:t.uRegions},shift:{channelSkew:t.uOffset,redX:t.uShiftR,blueX:t.uShiftB,rowJitter:t.uRowShift,shear:t.uShear},backdrop:{amount:t.uBack,scale:t.uBackScale},motion:{animate:!!e.anim,pitchX:t.uRotX,turnY:t.uRotY,speed:t.uSpeed,spinY:t.uSpinY,spinX:t.uSpinX,morph:t.uMorph,roll:t.uRoll,frameHold:t.uHold},output:{resolution:String(e.resW||1200),fps:String(e.expFps||24),duration:String(e.expDur||4)}}},fromDial:function(e){let t=e$(e,"orb"),r=e$(e,"surface"),a=e$(e,"light"),o=e$(e,"quantize"),n=e$(e,"dither"),l=e$(e,"shift"),i=e$(e,"backdrop"),u=e$(e,"motion"),s=e$(e,"output");return{seed:parseInt(String(e.seed),10)||0,mode:Number(r.mode),qMode:Number(o.mode),xray:+!!t.xray,noYellow:+!!o.noYellow,anim:!!u.animate,resW:Number(s.resolution),expFps:Number(s.fps),expDur:Number(s.duration),P:{uRadius:t.radius,uDist:t.distance,uFocal:t.focal,uShells:t.shells,uGap:t.shellGap,uShellFade:t.shellFalloff,uScale:r.scale,uGridN:r.latLon,uCells:r.cells,uMetric:r.metric,uBorder:r.cellEdge,uLight:a.light,uLightA:a.angle,uLightY:a.height,uRim:a.rim,uLift:a.lift,uContrast:o.contrast,uSteps:o.levels,uSnap:o.cellSize,uQJitter:o.jitter,uQTwist:o.twist,uQMetric:o.quantMetric,uUnit:n.scanline,uAttach:n.attach,uSurfLines:n.surfaceLines,uPitch:n.pitch,uVert:n.vertical,uRegions:n.regions,uOffset:l.channelSkew,uShiftR:l.redX,uShiftB:l.blueX,uRowShift:l.rowJitter,uShear:l.shear,uBack:i.amount,uBackScale:i.scale,uRotX:u.pitchX,uRotY:u.turnY,uSpeed:u.speed,uSpinY:u.spinY,uSpinX:u.spinX,uMorph:u.morph,uRoll:u.roll,uHold:u.frameHold}}}},ej=(e,t,r,a,o)=>({key:e,min:t,max:r,default:a,...o?{cpu:o}:{}}),e_=[ej("uRadius",.2,2.4,1.05),ej("uDist",1.6,9,3.2),ej("uFocal",.5,4,1.6),ej("uShells",1,4,1),ej("uGap",.02,.45,.16),ej("uShellFade",0,.6,.12),ej("uScale",.15,4,.9),ej("uGridN",2,48,16),ej("uCells",.3,5,1.3),ej("uMetric",0,1,1),ej("uBorder",0,1,.35),ej("uLight",0,1.6,.85),ej("uLightA",-3.15,3.15,-.9),ej("uLightY",-1.5,1.5,.45),ej("uRim",0,1.2,.3),ej("uLift",-.5,.5,0),ej("uContrast",.6,5,2),ej("uSteps",2,16,8),ej("uSnap",1,96,4),ej("uQJitter",0,1,0),ej("uQTwist",0,1,0),ej("uQMetric",0,1,0),ej("uUnit",1,24,1),ej("uAttach",0,1,0),ej("uSurfLines",4,160,44),ej("uPitch",1,5,1.75),ej("uVert",0,.4,.05),ej("uRegions",.5,8,2),ej("uOffset",0,24,3),ej("uShiftR",-48,48,0),ej("uShiftB",-48,48,0),ej("uRowShift",0,80,0),ej("uShear",-300,300,0),ej("uBack",0,1,0),ej("uBackScale",.5,12,3.5),ej("uRotX",-1.6,1.6,.15),ej("uRotY",-3.15,3.15,0),ej("uSpeed",0,3,1,!0),ej("uSpinY",-2,2,.35),ej("uSpinX",-2,2,0),ej("uMorph",0,.5,0),ej("uRoll",0,1,0),ej("uHold",0,24,0,!0)],eQ=e_.filter(e=>!e.cpu).map(e=>e.key);function eH(e,t){let r=e_.find(t=>t.key===e);return r?Math.min(r.max,Math.max(r.min,t)):t}let eU=`#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a,0.0,1.0); }`,eV=`#version 300 es
precision highp float;
out vec4 O;

uniform vec2  uRes;
uniform float uSeed, uTime;
uniform float uRadius, uDist, uFocal, uShells, uGap, uShellFade, uXray;
uniform float uMode, uScale, uCells, uMetric, uBorder, uGridN;
uniform float uLight, uLightA, uLightY, uRim, uLift;
uniform float uContrast, uSteps, uSnap, uQMode, uQJitter, uQTwist, uQMetric;
uniform float uUnit, uPitch, uVert, uRegions, uAttach, uSurfLines;
uniform float uOffset, uShiftR, uShiftB, uRowShift, uShear;
uniform float uBack, uBackScale;
uniform float uRotX, uRotY, uSpinX, uSpinY, uMorph, uRoll;
uniform float uNoYellow;
uniform float uPalOn, uPalN;
uniform vec3  uBg;
uniform float uBackgroundTransparent;
uniform float uPremultiply;
uniform vec3  uPal[4];
uniform sampler2D uPlate;
uniform float uPlateOn, uPlateMask, uPlateInfuse, uPlateFit, uPlateScale, uPlateHold, uPlateInvert;
uniform vec2  uPlateRes;


float hash11(float p){ p=fract(p*0.1031); p*=p+33.33; p*=p+p; return fract(p); }
float hash21(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*0.1031); p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}
vec2 hash22(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*vec3(0.1031,0.1030,0.0973)); p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.xx+p3.yz)*p3.zy);
}
float hash31(vec3 p){
  p=fract(p*0.1031); p+=dot(p,p.yzx+33.33); return fract((p.x+p.y)*p.z);
}
vec3 hash33(vec3 p){
  p=fract(p*vec3(0.1031,0.1030,0.0973)); p+=dot(p,p.yxz+33.33);
  return fract((p.xxy+p.yxx)*p.zyx);
}
float vnoise2(vec2 p){
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),
             mix(hash21(i+vec2(0,1)),hash21(i+vec2(1,1)),f.x), f.y);
}
float fbm2(vec2 p){
  float s=0.0,a=0.5; mat2 r=mat2(0.80,0.60,-0.60,0.80);
  for(int i=0;i<4;i++){ s+=a*vnoise2(p); p=r*p*2.03; a*=0.5; }
  return s;
}
float vnoise3(vec3 p){
  vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  float a=mix(mix(hash31(i),               hash31(i+vec3(1,0,0)),f.x),
              mix(hash31(i+vec3(0,1,0)),   hash31(i+vec3(1,1,0)),f.x), f.y);
  float b=mix(mix(hash31(i+vec3(0,0,1)),   hash31(i+vec3(1,0,1)),f.x),
              mix(hash31(i+vec3(0,1,1)),   hash31(i+vec3(1,1,1)),f.x), f.y);
  return mix(a,b,f.z);
}
float fbm3(vec3 p){
  float s=0.0,a=0.5;
  for(int i=0;i<3;i++){ s+=a*vnoise3(p); p=p*2.03+vec3(11.3,7.7,3.1); a*=0.5; }
  return s*1.14;
}
mat3 rotX(float a){ float c=cos(a),s=sin(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }
mat3 rotY(float a){ float c=cos(a),s=sin(a); return mat3(c,0,s, 0,1,0, -s,0,c); }
float mdist(vec3 r){
  return mix(abs(r.x)+abs(r.y)+abs(r.z), max(max(abs(r.x),abs(r.y)),abs(r.z)), uMetric);
}

// rectilinear voronoi in 3D — cells wrap the sphere as faceted patches
float cellField(vec3 p, float cs){
  vec3 g=p*uCells, i=floor(g), f=fract(g);
  float d1=1e9,d2=1e9,id=0.0;
  for(int z=-1;z<=1;z++){
    for(int y=-1;y<=1;y++){
      for(int x=-1;x<=1;x++){
        vec3 o=vec3(float(x),float(y),float(z));
        vec3 c=0.15+0.70*hash33(i+o+uSeed*11.0);
        float ph=hash31(i+o+uSeed*4.0)*6.2832;
        c+=vec3(sin(uTime*1.3+ph),cos(uTime*1.1+ph),sin(uTime*0.9+ph))*uMorph*0.55;
        float d=mdist(o+c-f);
        if(d<d1){ d2=d1; d1=d; id=hash31(i+o+uSeed*5.0); }
        else if(d<d2){ d2=d; }
      }
    }
  }
  return mix(id,1.0-d1,0.55) + uBorder*(1.0-smoothstep(0.0,0.16,d2-d1)) + cs*0.09;
}

float surface(vec3 n, float cs){
  if(uMode < 0.5){
    return fbm3(n*uScale*4.0 + uSeed + cs*1.7 + uTime*uMorph*0.4) * 1.25 - 0.12;
  } else if(uMode < 1.5){
    return cellField(n*uScale*4.0 + uSeed, cs);
  }
  float lat = asin(clamp(n.y,-1.0,1.0))/3.14159 + 0.5;
  float lon = atan(n.z,n.x)/6.28318 + 0.5;
  vec2 e = abs(fract(vec2(lon,lat)*uGridN + uTime*uMorph*0.3) - 0.5);
  return 1.0 - 2.0*min(e.x,e.y) + cs*0.07;
}

float regionId(vec2 uv){
  vec2 g=uv*vec2(uRegions*1.4,uRegions*0.8)+uSeed;
  vec2 i=floor(g), f=fract(g);
  float best=1e9; vec2 bid=i;
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 o=vec2(float(x),float(y));
      vec2 d=o+hash22(i+o+uSeed*7.0)-f; d.y*=1.6;
      float m=dot(d,d);
      if(m<best){ best=m; bid=i+o; }
    }
  }
  return hash21(bid+uSeed*3.0);
}

// screen-space sample snap: stair (X only), square (Chebyshev / glitch-dust grid),
// or manhattan (L1) voronoi. jitter 0 + square = regular pixel cells.
vec2 qSnap(vec2 p, float cell){
  if(uQMode < 0.5){
    p.x = floor(p.x/cell)*cell;
    return p;
  }
  float ang = uQTwist * 0.785398;
  float cs = cos(ang), sn = sin(ang);
  vec2 origin = 0.5 * uRes;
  vec2 q = p - origin;
  vec2 r = vec2(cs*q.x - sn*q.y, sn*q.x + cs*q.y);
  vec2 g = r / max(cell, 1.0);
  vec2 i = floor(g), f = fract(g);
  float best = 1e9;
  vec2 hit = r;
  float metric = uQMode < 1.5 ? 1.0 : uQMetric;
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 o = vec2(float(x), float(y));
      vec2 h = hash22(i+o+uSeed*13.0);
      float ph = hash21(i+o+uSeed*6.0)*6.2832;
      vec2 c = mix(vec2(0.5), 0.08+0.84*h, uQJitter);
      c += vec2(sin(uTime*1.3+ph), cos(uTime*1.1+ph))*uMorph*0.45*uQJitter;
      vec2 d = o+c-f;
      float m = mix(abs(d.x)+abs(d.y), max(abs(d.x),abs(d.y)), metric);
      if(m < best){
        best = m;
        hit = (i+o+c)*cell;
      }
    }
  }
  return origin + vec2(cs*hit.x + sn*hit.y, -sn*hit.x + cs*hit.y);
}

vec2 plateUV(vec2 spx){
  vec2 uv = spx / max(uRes, vec2(1.0));
  float sc = max(uPlateScale, 0.01);
  if(uPlateFit < 0.5) return (uv - 0.5) / sc + 0.5;
  vec2 pr = max(uPlateRes, vec2(1.0));
  float canvasA = uRes.x / max(uRes.y, 1.0);
  float plateA  = pr.x / max(pr.y, 1.0);
  vec2 fitXY = (uPlateFit < 1.5)
    ? (plateA > canvasA ? vec2(1.0, canvasA/plateA) : vec2(plateA/canvasA, 1.0))
    : (plateA > canvasA ? vec2(plateA/canvasA, 1.0) : vec2(1.0, canvasA/plateA));
  return (uv - 0.5) / (fitXY * sc) + 0.5;
}
vec4 plateSample(vec2 p){
  if(uPlateOn < 0.5) return vec4(0.0);
  vec2 uv = plateUV(p);
  if(min(uv.x, uv.y) < 0.0 || max(uv.x, uv.y) > 1.0) return vec4(0.0);
  return vec4(texture(uPlate, uv).rgb, 1.0);
}

void main(){
  vec2  px   = floor(gl_FragCoord.xy);
  float unit = max(1.0, floor(uUnit));
  vec2  qpx  = vec2(px.x, floor(px.y/unit)*unit);
  vec2  uvs  = qpx/uRes;

  float rid   = regionId(uvs*3.0);
  float pitch = max(1.0, floor(mix(1.0,4.0,hash11(rid*3.13))*uPitch));
  float nq    = floor(mix(0.35,1.0,hash11(rid*7.77))*uSteps) + 2.0;
  float phase = hash11(rid*11.11);
  float snap  = max(1.0, floor(mix(1.0,uSnap,hash11(rid*5.55))));
  bool  vert  = hash11(rid*17.17) < uVert;
  vec2  dir   = normalize(hash22(vec2(rid,rid*2.0))*2.0 - 1.0 + vec2(1e-3,1e-3));

  float rowi  = floor(px.y/unit);
  float shift = (hash11(rowi*0.137 + uSeed*3.0)*2.0-1.0)*uRowShift + (uvs.y-0.5)*uShear;

  mat3 M = rotY(uRotY + uTime*uSpinY) * rotX(uRotX + uTime*uSpinX);
  vec3 L = normalize(vec3(cos(uLightA), uLightY, sin(uLightA)));
  vec3 ro = vec3(0.0, 0.0, -uDist);

  vec3 col = vec3(0.0);
  vec3 pCol = vec3(0.0);
  float pA = 0.0;
  for(int c=0;c<3;c++){
    float cf  = float(c);
    float chs = (cf < 0.5) ? uShiftR : ((cf > 1.5) ? uShiftB : 0.0);

    vec2 spx = vec2(qpx.x + shift + chs, qpx.y) + dir*uOffset*(cf-1.0);
    spx = qSnap(spx, snap);
    if(uQMode < 0.5) spx.y = floor(spx.y/unit)*unit;

    vec4 p = plateSample(uPlateHold > 0.5 ? px : spx);
    pCol[c] = p[c];
    pA = max(pA, p.a);

    vec2 sp = (spx - 0.5*uRes)/uRes.y;
    vec3 rd = normalize(vec3(sp.x, sp.y, uFocal));

    float b  = dot(ro, rd);
    float c0 = dot(ro, ro);
    float v  = -9.0;
    vec3  nBand = vec3(0.0);      // object-space normal of the outermost hit
    float graze = 0.0;
    bool  got   = false;

    for(int i=0;i<4;i++){
      if(float(i) >= uShells) break;
      float R = uRadius*(1.0 - float(i)*uGap);
      if(R <= 0.02) break;
      float h = b*b - (c0 - R*R);
      if(h < 0.0) continue;                       // ray misses this shell
      h = sqrt(h);
      float fade = float(i)*uShellFade;

      vec3 nn = normalize(ro + rd*(-b - h));      // near face
      if(!got){ nBand = M*nn; graze = abs(dot(nn,-rd)); got = true; }
      float s = surface(M*nn, cf*0.37)
              + uLight*(max(dot(nn,L),0.0) - 0.5)
              + uRim*pow(1.0 - abs(dot(nn,-rd)), 2.0);
      v = max(v, s - fade);

      if(uXray > 0.5){
        vec3 nf = normalize(ro + rd*(-b + h));    // far face, seen through
        float sf = surface(M*nf, cf*0.37)
                 + uLight*(max(dot(nf,L),0.0) - 0.5);
        v = max(v, sf - fade - 0.22);
      }
    }

    if(v < -5.0){                                  // background
      if(uBack <= 0.001) continue;
      v = fbm2(uvs*uBackScale + uSeed + cf*0.9) * uBack - (1.0 - uBack)*0.5;
    }

    v = clamp((v-0.5)*uContrast + 0.5 + uLift, 0.0, 1.0);
    float qv = floor(v*nq + phase)/nq;

    // scanline position: screen grid, or planes frozen into the orb that
    // tumble with it. eased back to screen at the limb, where object-space
    // slices would otherwise compress past one pixel.
    float scoord = (vert ? spx.x : qpx.y)/unit;
    float ocoord = (vert ? nBand.x : nBand.y)*uSurfLines;
    float att    = got ? uAttach*smoothstep(0.0, 0.30, graze) : 0.0;
    float coord  = floor(mix(scoord, ocoord, att));
    float band   = (mod(coord + phase*pitch - uTime*uRoll*60.0, pitch) + 0.5)/pitch;

    col[c] = step(band, qv);
  }

  if(uNoYellow > 0.5 && col.r > 0.5 && col.g > 0.5 && col.b < 0.5){
    if(hash11(rid*23.0) < 0.5) col.g = 0.0; else col.r = 0.0;
  }

  // the three bits index the palette; black stays the ground colour
  float coverage = max(col.r,max(col.g,col.b));
  vec3 outc = col;
  if(uPalOn > 0.5){
    float code = (col.r>0.5?1.0:0.0) + (col.g>0.5?2.0:0.0) + (col.b>0.5?4.0:0.0);
    outc = uBg;
    if(code > 0.5) outc = uPal[int(mod(code-1.0, max(uPalN,1.0)))];
  }
  if(uPlateOn > 0.5){
    float hit = max(col.r, max(col.g, col.b));
    outc = mix(outc, pCol, pA * mix(uPlateMask, uPlateInfuse, hit));
    coverage = mix(coverage,1.0,pA * mix(uPlateMask,uPlateInfuse,hit));
  }
  outc = mix(outc, vec3(1.0) - outc, uPlateInvert);
  O = vec4(outc,mix(1.0,coverage,uBackgroundTransparent));
  if(uPremultiply>.5) O.rgb=clamp(O.rgb,0.0,1.0)*O.a;
}`,eJ=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),eK=(e,t)=>{let a=e[t];return(0,r.F)(a)?a:{}},eZ={config:{orb:{sourceMatch:!1,brightness:[42e-5,5e-5,.02,5e-5],positionX:[0,-2,6,.01],positionY:[0,-2,6,.01],positionZ:[2.8,-2,6,.01],fov:[1,.25,2.5,.01],steps:[68,8,150,1],radius:[1.08,.2,3,.01],twist:[.5,-2,3,.01],glow:[.16,.01,1,.005],paletteGlow:!0,glowColor:{type:"color",default:"#99edff"},glowColorAmount:[.28,0,1,.01],density:[.5,0,2,.01],softness:[.024,.001,.4,.001],colorWave:[4.2,-12,12,.05],colorY:[3.1,-12,12,.05]},camera:{orbitDrag:!0,orbitX:[0,-3.14,3.14,.01],orbitY:[0,-1.55,1.55,.01],zoom:[1.2,.25,4,.01],lookX:[-.16,-2,2,.01],lookY:[0,-2,2,.01]},color:{backgroundMode:{type:"select",options:[{value:"palette",label:"Palette"},{value:"black",label:"Black"},{value:"white",label:"White"},{value:"transparent",label:"Transparent"},{value:"custom",label:"Custom"}],default:"black"},backgroundColor:{type:"color",default:"#000000"},stabilizeColors:!0,phaseMatch:[.82,0,1,.01],paletteMix:[.55,0,1,.01],paletteFlow:[2.7,.1,4,.01],phaseR:[.2,-6.28,8,.01],phaseG:[2.25,-6.28,8,.01],phaseB:[4.4,-6.28,8,.01]},quantize:{amount:[0,0,1,.01],mode:{type:"select",options:[{value:"0",label:"Stair"},{value:"1",label:"Square"},{value:"2",label:"Manhattan"}],default:"0"},contrast:[.98,.6,5,.05],levels:[12,2,16,1],cellSize:[1,1,96,1],jitter:[0,0,1,.01],twist:[0,0,1,.01],quantMetric:[0,0,1,.01],crush:[0,0,1,.01]},shift:{channelSkew:[0,0,24,.5],redX:[0,-48,48,1],blueX:[0,-48,48,1],rowJitter:[0,0,80,.5],shear:[0,-300,300,1]},motion:{animate:!0,speed:[.18,0,4,.01],frameHold:[0,0,24,1]},output:{seed:{type:"text",default:"707",placeholder:"Seed"},newSeed:{type:"action",label:"New seed"},resolution:{type:"select",options:["200","400","600","1000","1200","1800","2400"],default:"1200"},fps:{type:"select",options:["12","24","30"],default:"24"},duration:{type:"select",options:[{value:"2",label:"2 s"},{value:"4",label:"4 s"},{value:"8",label:"8 s"}],default:"4"},randomize:{type:"action"},savePng:{type:"action",label:"Save PNG"},saveMp4:{type:"action",label:"Save MP4"},saveGif:{type:"action",label:"Save GIF"},saveJson:{type:"action",label:"Save JSON"},loadJson:{type:"action",label:"Load JSON"},reset:{type:"action"}}},toDial:function(e){let t=(0,r.F)(e.P)?e.P:{};return{orb:{sourceMatch:!!t.sourceMatch,brightness:t.brightness??null,positionX:t.positionX??0,positionY:t.positionY??0,positionZ:t.positionZ??null,fov:t.fov??null,steps:t.steps??null,radius:t.radius??null,twist:t.twist??null,glow:t.glow??null,paletteGlow:!1!==t.paletteGlow,glowColor:t.glowColor||"#99edff",glowColorAmount:t.glowColorAmount??.28,density:t.density??null,softness:t.softness??null,colorWave:t.colorWave??null,colorY:t.colorY??null},camera:{orbitDrag:!1!==t.orbitDrag,orbitX:t.orbitX??0,orbitY:t.orbitY??0,zoom:t.zoom??null,lookX:t.lookX??null,lookY:t.lookY??null},color:{backgroundMode:t.backgroundMode||"black",backgroundColor:t.backgroundColor||"#000000",stabilizeColors:!1!==t.stabilizeColors,phaseMatch:t.phaseMatch??.82,paletteMix:t.paletteMix??null,paletteFlow:t.paletteFlow??null,phaseR:t.phaseR??null,phaseG:t.phaseG??null,phaseB:t.phaseB??null},quantize:{amount:t.quantizeAmount??null,mode:String(0|Number(e.qMode)),contrast:t.contrast??null,levels:t.levels??null,cellSize:t.cellSize??null,jitter:t.jitter??null,twist:t.gridTwist??null,quantMetric:t.quantMetric??null,crush:t.crush??null},shift:{channelSkew:t.channelSkew??null,redX:t.redX??null,blueX:t.blueX??null,rowJitter:t.rowJitter??null,shear:t.shear??null},motion:{animate:!!e.anim,speed:t.speed??null,frameHold:t.frameHold??null},output:{seed:String(e.seed??707),resolution:String(e.resW||1200),fps:String(e.expFps||24),duration:String(e.expDur||4)}}},fromDial:function(e){var t,r,a,o,n,l;let i=eK(e,"quantize"),u=eK(e,"motion"),s=eK(e,"output");return{seed:parseInt(String(s.seed),10)||0,qMode:Number(i.mode),anim:!!u.animate,resW:Number(s.resolution),expFps:Number(s.fps),expDur:Number(s.duration),P:{...{sourceMatch:!!(t=eK(e,"orb")).sourceMatch,brightness:t.brightness??null,positionX:t.positionX??null,positionY:t.positionY??null,positionZ:t.positionZ??null,fov:t.fov??null,steps:t.steps??null,radius:t.radius??null,twist:t.twist??null,glow:t.glow??null,paletteGlow:!!t.paletteGlow,glowColor:t.glowColor??null,glowColorAmount:t.glowColorAmount??null,density:t.density??null,softness:t.softness??null,colorWave:t.colorWave??null,colorY:t.colorY??null},...(r=eK(e,"camera"),a=eK(e,"color"),{orbitDrag:!!r.orbitDrag,orbitX:r.orbitX??null,orbitY:r.orbitY??null,zoom:r.zoom??null,lookX:r.lookX??null,lookY:r.lookY??null,backgroundMode:a.backgroundMode??null,backgroundColor:a.backgroundColor??null,stabilizeColors:!!a.stabilizeColors,phaseMatch:a.phaseMatch??null,paletteMix:a.paletteMix??null,paletteFlow:a.paletteFlow??null,phaseR:a.phaseR??null,phaseG:a.phaseG??null,phaseB:a.phaseB??null}),...(o=i,n=eK(e,"shift"),l=u,{quantizeAmount:o.amount??null,contrast:o.contrast??null,levels:o.levels??null,cellSize:o.cellSize??null,jitter:o.jitter??null,gridTwist:o.twist??null,quantMetric:o.quantMetric??null,crush:o.crush??null,channelSkew:n.channelSkew??null,redX:n.redX??null,blueX:n.blueX??null,rowJitter:n.rowJitter??null,shear:n.shear??null,speed:l.speed??null,frameHold:l.frameHold??null})}}}},e0=`
#version 300 es
in vec2 a;
void main(){gl_Position=vec4(a,0.0,1.0);}
`,e1=`
#version 300 es
precision highp float;
/* "Orb - Expanded" by @XorDev \xb7 https://fragcoord.xyz/s/owl9v3tg
   FragCoord Commercial License FC-M9X3-MTKC \xb7 Standard, credit required */
out vec4 O;
uniform vec2 uRes;
uniform float uTime,uSourceMatch,uBrightness,uPositionX,uPositionY,uPositionZ,uFov,uSteps,uRadius,uTwist,uGlow,uDensity,uSoftness;
uniform float uColorWave,uColorY,uOrbitX,uOrbitY,uZoom,uLookX,uLookY;
uniform vec3 uRgb;
const float HPI=1.5707963268;
void main(){
  vec2 uv=(gl_FragCoord.xy*2.0-uRes)/uRes.y;
  uv=uv/max(uZoom,.05)-vec2(uLookX,uLookY)*.35;
  vec3 ray=normalize(vec3(uv,-uFov));
  vec3 col=vec3(0.0);
  float z=0.0;
  for(int j=0;j<150;j++){
    if(float(j)>=uSteps)break;
    vec3 p=z*ray+vec3(uPositionX,uPositionY,uPositionZ);
    p.yz*=mat2(cos(uOrbitY+vec4(0.0,-HPI,HPI,0.0)));
    p.xz*=mat2(cos(uOrbitX+vec4(0.0,-HPI,HPI,0.0)));
    p.zx*=mat2(cos(uTwist*p.y+uTime+vec4(0.0,-HPI,HPI,0.0)));
    float sphere=length(p)-uRadius;
    for(float f=1.0;f<100.0;f+=f)p+=sin(p.yzx*f)/f;
    float wave=cos(3.0*p.y);
    float rawD=uGlow*max(uSoftness+uDensity*abs(wave),sphere);
    float d=mix(max(.0005,rawD),max(1e-6,rawD),uSourceMatch);
    z+=d;
    float denom=mix(max(d*z,.0005),max(d*z,1e-8),uSourceMatch);
    col+=(cos(uColorWave*wave+uColorY*p.y+uRgb)+1.5)/denom;
  }
  col=1.0-exp(-uBrightness*col);
  float vignette=1.0-smoothstep(.5,1.05,length(uv));
  O=vec4(col*mix(vignette,1.0,uSourceMatch),1.0);
}
`,e2=`
#version 300 es
precision highp float;
out vec4 O;
uniform sampler2D uScene;
uniform vec2 uRes;
uniform float uSeed,uQAmount,uQMode,uContrast,uLevels,uSnap,uJitter,uGridTwist,uQuantMetric,uCrush;
uniform float uSourceMatch,uChannelSkew,uRedX,uBlueX,uRowJitter,uShear,uStabilize,uPhaseMatch,uPaletteMix,uPaletteFlow,uPalN,uTransparent,uPaletteGlow,uGlowColorAmount;
uniform float uPremultiply;
uniform vec3 uBg,uGlowColor,uPal[4];
float hash21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7))+uSeed)*43758.5453);}
vec3 palAt(int i){if(i<=0)return uPal[0];if(i==1)return uPal[1];if(i==2)return uPal[2];return uPal[3];}
vec3 palette(float t){
  float n=max(uPalN,1.0),x=clamp(t,0.0,.9999)*max(n-1.0,1.0),i=floor(x),f=fract(x);
  return mix(palAt(int(i)),palAt(int(min(i+1.0,n-1.0))),smoothstep(0.0,1.0,f));
}
void main(){
  vec2 frag=gl_FragCoord.xy;
  if(uSourceMatch>.5){O=texture(uScene,frag/uRes);return;}
  float angle=uGridTwist*.785398,cs=cos(angle),sn=sin(angle);
  vec2 centered=frag-.5*uRes;
  centered=mat2(cs,-sn,sn,cs)*centered;
  vec2 cell=floor(centered/max(uSnap,1.0));
  vec2 snapped=(cell+.5+uJitter*(hash21(cell)-.5))*max(uSnap,1.0);
  snapped=mat2(cs,sn,-sn,cs)*snapped+.5*uRes;
  float metric=mix(length(fract(centered/max(uSnap,1.0))-.5),
    max(abs(fract(centered/max(uSnap,1.0)).x-.5),abs(fract(centered/max(uSnap,1.0)).y-.5)),uQuantMetric);
  snapped+=vec2(metric*uQMode*uSnap*.2);
  frag=mix(frag,snapped,uQAmount);
  frag.x+=uShear*(frag.y/uRes.y-.5)+uRowJitter*(hash21(vec2(floor(frag.y/max(uSnap,1.0)),3.0))-.5);
  vec2 uv=frag/uRes,px=vec2(1.0/uRes.x,0.0);
  float skew=uChannelSkew;
  vec3 base=texture(uScene,uv).rgb;
  vec3 shifted=vec3(texture(uScene,uv+px*(uRedX+skew)).r,base.g,texture(uScene,uv+px*(uBlueX-skew)).b);
  float contrast=mix(uContrast,1.0+(uContrast-1.0)*.2,uStabilize);
  vec3 color=(shifted-.5)*contrast+.5;
  float luma=dot(max(color,0.0),vec3(.2126,.7152,.0722));
  float flow=fract(((color.r-color.b)*.55+color.g*.35+.5)*uPaletteFlow);
  vec3 tint=palette(flow);
  vec3 mapped=mix(uBg,tint,smoothstep(.005,.2,luma));
  vec3 fullColor=mix(color,mapped,uPaletteMix);
  float tintLuma=dot(max(tint,0.0),vec3(.2126,.7152,.0722));
  vec3 phaseColor=tint*(luma/max(tintLuma,.06));
  phaseColor=clamp(phaseColor,0.0,1.2);
  float phaseAmount=uPhaseMatch*(.55+uPaletteMix*.45)*smoothstep(.01,.16,luma)*smoothstep(.02,.14,tintLuma);
  vec3 stableColor=mix(color,phaseColor,phaseAmount);
  stableColor/=1.0+max(stableColor-.72,0.0)*.8;
  float stableLuma=dot(max(stableColor,0.0),vec3(.2126,.7152,.0722));
  stableColor=mix(vec3(stableLuma),stableColor,.78);
  stableColor=pow(max(stableColor,0.0),vec3(.9))*.9;
  color=mix(fullColor,stableColor,uStabilize);
  vec3 quantized=floor(max(color,0.0)*max(uLevels-1.0,1.0)+.5)/max(uLevels-1.0,1.0);
  color=mix(color,quantized,uQAmount);
  color=mix(color,floor(color*6.0+.5)/6.0,uCrush);
  float glowBand=smoothstep(.0002,.004,luma)*(1.0-smoothstep(.1,.4,luma));
  vec3 glowHue=mix(uGlowColor,palette(fract(flow+.17)),uPaletteGlow);
  vec3 glowTone=glowHue*(.28+min(luma*2.2,.72));
  color=mix(color,glowTone,uGlowColorAmount*glowBand);
  float coverage=smoothstep(.001,.04,luma);
  color=mix(mix(uBg,color,coverage),color,uTransparent);
  O=vec4(clamp(color,0.0,1.0),mix(1.0,coverage,uTransparent));
  if(uPremultiply>.5) O.rgb*=O.a;
}
`,e5=[["uBrightness","brightness"],["uPositionX","positionX"],["uPositionY","positionY"],["uPositionZ","positionZ"],["uFov","fov"],["uSteps","steps"],["uRadius","radius"],["uTwist","twist"],["uGlow","glow"],["uDensity","density"],["uSoftness","softness"],["uColorWave","colorWave"],["uColorY","colorY"],["uOrbitX","orbitX"],["uOrbitY","orbitY"],["uZoom","zoom"],["uLookX","lookX"],["uLookY","lookY"]],e3=[["uQAmount","quantizeAmount"],["uContrast","contrast"],["uLevels","levels"],["uSnap","cellSize"],["uJitter","jitter"],["uGridTwist","gridTwist"],["uQuantMetric","quantMetric"],["uCrush","crush"],["uChannelSkew","channelSkew"],["uRedX","redX"],["uBlueX","blueX"],["uRowJitter","rowJitter"],["uShear","shear"],["uPhaseMatch","phaseMatch"],["uPaletteMix","paletteMix"],["uPaletteFlow","paletteFlow"],["uGlowColorAmount","glowColorAmount"]],e4=[...ev,{id:"5-x",label:"Spectral orb",background:"#000000",marks:["#99EDFF","#115EF3","#FFFF00","#F57EC3"]}],e8=e4.length-1,e6=e=>e4[e]??e4[0],e7={sourceMatch:!1,brightness:42e-5,positionX:0,positionY:0,positionZ:2.8,fov:1,steps:68,radius:1.08,twist:.5,glow:.16,paletteGlow:!0,glowColor:"#99edff",glowColorAmount:.28,density:.5,softness:.024,colorWave:4.2,colorY:3.1,orbitDrag:!0,orbitX:0,orbitY:0,zoom:1.2,lookX:-.16,lookY:0,backgroundMode:"black",backgroundColor:"#000000",stabilizeColors:!0,phaseMatch:.82,paletteMix:.55,paletteFlow:2.7,phaseR:.2,phaseG:2.25,phaseB:4.4,quantizeAmount:0,contrast:.98,levels:12,cellSize:1,jitter:0,gridTwist:0,quantMetric:0,crush:0,channelSkew:0,redX:0,blueX:0,rowJitter:0,shear:0,speed:.18,frameHold:0},e9=(e,t)=>{let a=e[t];return(0,r.F)(a)?a:{}},te={config:{portal:{twist:[.5,-2,2,.01],warp:[2,.25,6,.01],octaves:[5,0,5,.05],step:[.25,.02,.8,.005],density:[1.1,.1,3,.01],exposure:[200,20,800,1],wire:[0,0,1,.01],bands:[.12,0,1,.005],scatter:[.5,0,2,.01],blend:[.35,0,1,.01],burn:[.25,0,1,.01],crush:[0,0,1,.01],lookX:[0,-2,2,.01],lookY:[0,-2,2,.01]},quantize:{mode:{type:"select",options:[{value:"0",label:"Stair"},{value:"1",label:"Square"},{value:"2",label:"Manhattan"}],default:"0"},contrast:[2,.6,5,.05],levels:[8,2,16,1],cellSize:[4,1,96,1],jitter:[0,0,1,.01],twist:[0,0,1,.01],quantMetric:[0,0,1,.01]},shift:{channelSkew:[3,0,24,.5],redX:[0,-48,48,1],blueX:[0,-48,48,1],rowJitter:[0,0,80,.5],shear:[0,-300,300,1]},motion:{animate:!0,speed:[1,0,4,.01],frameHold:[0,0,24,1]},output:{seed:{type:"text",default:"1024",placeholder:"Seed"},newSeed:{type:"action",label:"New seed"},resolution:{type:"select",options:["200","400","600","1000","1200","1800","2400"],default:"1200"},fps:{type:"select",options:["12","24","30"],default:"24"},duration:{type:"select",options:[{value:"2",label:"2 s"},{value:"4",label:"4 s"},{value:"8",label:"8 s"}],default:"4"},randomize:{type:"action"},savePng:{type:"action",label:"Save PNG"},saveMp4:{type:"action",label:"Save MP4"},saveGif:{type:"action",label:"Save GIF"},saveJson:{type:"action",label:"Save JSON"},loadJson:{type:"action",label:"Load JSON"},reset:{type:"action"}}},toDial:function(e){let t=e.P;return{portal:{twist:t.uTwist??null,warp:t.uWarp??null,octaves:t.uOctaves??null,step:t.uStep??null,density:t.uGlow??null,exposure:t.uExposure??null,wire:t.uWire??null,bands:t.uBands??null,scatter:t.uScatter??null,blend:t.uBlend??null,burn:t.uBurn??null,crush:t.uCrush??0,lookX:t.uPanX??0,lookY:t.uPanY??0},quantize:{mode:String(0|Number(e.qMode)),contrast:t.uContrast??null,levels:t.uSteps??null,cellSize:t.uSnap??null,jitter:t.uQJitter??null,twist:t.uQTwist??null,quantMetric:t.uQMetric??null},shift:{channelSkew:t.uOffset??null,redX:t.uShiftR??null,blueX:t.uShiftB??null,rowJitter:t.uRowShift??null,shear:t.uShear??null},motion:{animate:!!e.anim,speed:t.uSpeed??null,frameHold:t.uHold??null},output:{seed:String(e.seed??1024),resolution:String(e.resW||1200),fps:String(e.expFps||24),duration:String(e.expDur||4)}}},fromDial:function(e){let t=e9(e,"portal"),r=e9(e,"quantize"),a=e9(e,"shift"),o=e9(e,"motion"),n=e9(e,"output");return{seed:parseInt(String(n.seed),10)||0,qMode:Number(r.mode),anim:!!o.animate,resW:Number(n.resolution),expFps:Number(n.fps),expDur:Number(n.duration),P:{uTwist:t.twist??null,uWarp:t.warp??null,uOctaves:t.octaves??null,uStep:t.step??null,uGlow:t.density??null,uExposure:t.exposure??null,uWire:t.wire??null,uBands:t.bands??null,uScatter:t.scatter??null,uBlend:t.blend??null,uBurn:t.burn??null,uCrush:t.crush??null,uPanX:t.lookX??null,uPanY:t.lookY??null,uContrast:r.contrast??null,uSteps:r.levels??null,uSnap:r.cellSize??null,uQJitter:r.jitter??null,uQTwist:r.twist??null,uQMetric:r.quantMetric??null,uOffset:a.channelSkew??null,uShiftR:a.redX??null,uShiftB:a.blueX??null,uRowShift:a.rowJitter??null,uShear:a.shear??null,uSpeed:o.speed??null,uHold:o.frameHold??null}}}},tt=Math.max(0,ev.findIndex(e=>"5-g"===e.id));function tr(e){let t=e.marks,r=new Float32Array(12);for(let e=0;e<4;e++)r.set(ey(t[Math.min(e,Math.max(t.length-1,0))]??"#000000"),3*e);return{colors:r,count:Math.min(t.length||1,4),background:ey(e.background)}}let ta=`
#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a,0.0,1.0); }
`,to=`
#version 300 es
precision highp float;
out vec4 O;

uniform vec2  uRes;
uniform float uTime;
uniform float uTwist, uWarp, uOctaves, uStep, uGlow, uExposure;
uniform float uWire, uBands, uScatter, uBlend, uBurn;
uniform float uPanX, uPanY;
uniform float uPalN;
uniform vec3  uBg;
uniform float uBackgroundTransparent;
uniform vec3  uPal[4];

float tanh1(float x){ float e=exp(-2.0*x); return (1.0-e)/(1.0+e); }
vec3  tanh3(vec3  x){ vec3  e=exp(-2.0*x); return (1.0-e)/(1.0+e); }

vec3 palAt(int i){
  if(i<=0) return uPal[0];
  if(i==1) return uPal[1];
  if(i==2) return uPal[2];
  return uPal[3];
}
vec3 palette(float t){
  float n = max(uPalN, 1.0);
  float x = fract(t) * n;
  float i = floor(x);
  vec3  a = palAt(int(i));
  vec3  b = palAt(int(mod(i+1.0, n)));
  return mix(a, mix(a, b, smoothstep(0.0, 1.0, fract(x))), uBlend);
}

vec4 portalAt(vec2 frag){
  vec3 dir = normalize(vec3(2.0*frag - uRes, -uRes.y));
  dir.xy += vec2(uPanX, uPanY);
  vec3  acc  = vec3(0.0);
  float wsum = 0.0;
  float z = 0.0, d;
  for(int i=0;i<70;i++){
    vec3 p = z * dir;
    vec4 cs = cos(z * uTwist + vec4(0.0, 33.0, 11.0, 0.0));
    p.xy = p.xy * mat2(cs.x, cs.y, cs.z, cs.w);
    p.z -= uTime;
    d = uWarp;
    for(int j=0;j<5;j++){
      d += d;
      p += sin(p.yzx * d + z) / d * clamp(uOctaves - float(j), 0.0, 1.0);
    }
    d = max(length(1.0 / tan(p.xz)), 1e-4);
    z += min(abs(cos(p.y)), d) * uStep;
    float w  = mix(1.0, 0.05, uWire);
    float em = uGlow * mix(1.0 / d, w / (d*d + w*w), uWire);
    acc  += palette(z * uBands + uScatter * dot(sin(p), vec3(0.3333))) * em;
    wsum += em;
  }
  float a     = tanh1(wsum / max(uExposure, 1.0));
  vec3  flatc = acc / max(wsum, 1e-5);
  vec3  hot   = tanh3(acc / max(uExposure, 1.0));
  return vec4(mix(uBg,mix(flatc,hot,uBurn),mix(a,1.0,uBackgroundTransparent)),a);
}

void main(){
  O = portalAt(gl_FragCoord.xy);
}
`,tn=`
#version 300 es
precision highp float;
out vec4 O;

uniform vec2  uRes;
uniform float uSeed;
uniform float uCrush;
uniform float uContrast, uSteps, uSnap, uQMode, uQJitter, uQTwist, uQMetric;
uniform float uOffset, uShiftR, uShiftB, uRowShift, uShear;
uniform float uPremultiply;
uniform float uPalOn, uPalN;
uniform vec3  uBg;
uniform float uBackgroundTransparent;
uniform vec3  uPal[4];
uniform sampler2D uScene;
uniform sampler2D uPlate;
uniform float uPlateOn, uPlateMask, uPlateInfuse, uPlateFit, uPlateScale, uPlateHold, uPlateInvert;
uniform vec2  uPlateRes;

float hash11(float p){ p=fract(p*0.1031); p*=p+33.33; p*=p+p; return fract(p); }
float hash21(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*0.1031); p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}
vec2 hash22(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*vec3(0.1031,0.1030,0.0973)); p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.xx+p3.yz)*p3.zy);
}

vec3 palAt(int i){
  if(i<=0) return uPal[0];
  if(i==1) return uPal[1];
  if(i==2) return uPal[2];
  return uPal[3];
}

vec2 qSnap(vec2 p, float cell){
  if(uQMode < 0.5){
    p.x = floor(p.x/cell)*cell;
    return p;
  }
  float ang = uQTwist * 0.785398;
  float cs = cos(ang), sn = sin(ang);
  vec2 origin = 0.5 * uRes;
  vec2 q = p - origin;
  vec2 r = vec2(cs*q.x - sn*q.y, sn*q.x + cs*q.y);
  vec2 g = r / max(cell, 1.0);
  vec2 i = floor(g), f = fract(g);
  float best = 1e9;
  vec2 hit = r;
  float metric = uQMode < 1.5 ? 1.0 : uQMetric;
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 o = vec2(float(x), float(y));
      vec2 h = hash22(i+o+uSeed*13.0);
      vec2 c = mix(vec2(0.5), 0.08+0.84*h, uQJitter);
      vec2 d = o+c-f;
      float m = mix(abs(d.x)+abs(d.y), max(abs(d.x),abs(d.y)), metric);
      if(m < best){
        best = m;
        hit = (i+o+c)*cell;
      }
    }
  }
  return origin + vec2(cs*hit.x + sn*hit.y, -sn*hit.x + cs*hit.y);
}

vec2 plateUV(vec2 spx){
  vec2 uv = spx / max(uRes, vec2(1.0));
  float sc = max(uPlateScale, 0.01);
  if(uPlateFit < 0.5) return (uv - 0.5) / sc + 0.5;
  vec2 pr = max(uPlateRes, vec2(1.0));
  float canvasA = uRes.x / max(uRes.y, 1.0);
  float plateA  = pr.x / max(pr.y, 1.0);
  vec2 fitXY = (uPlateFit < 1.5)
    ? (plateA > canvasA ? vec2(1.0, canvasA/plateA) : vec2(plateA/canvasA, 1.0))
    : (plateA > canvasA ? vec2(plateA/canvasA, 1.0) : vec2(1.0, canvasA/plateA));
  return (uv - 0.5) / (fitXY * sc) + 0.5;
}
vec4 plateSample(vec2 p){
  if(uPlateOn < 0.5) return vec4(0.0);
  vec2 uv = plateUV(p);
  if(min(uv.x, uv.y) < 0.0 || max(uv.x, uv.y) > 1.0) return vec4(0.0);
  return vec4(texture(uPlate, uv).rgb, 1.0);
}

vec4 sceneAt(vec2 spx){
  return texture(uScene, (spx + 0.5) / max(uRes, vec2(1.0)));
}

void main(){
  vec2  px   = floor(gl_FragCoord.xy);
  vec2  qpx  = px;
  vec2  uvs  = qpx/uRes;
  float rid  = hash21(floor(uvs*vec2(8.0,5.0))+uSeed);
  float nq   = max(2.0, floor(uSteps));
  float snap = max(1.0, floor(uSnap));
  vec2  dir  = normalize(hash22(vec2(rid,rid*2.0))*2.0 - 1.0 + vec2(1e-3,1e-3));
  float rowi = floor(px.y);
  float shift = (hash11(rowi*0.137 + uSeed*3.0)*2.0-1.0)*uRowShift + (uvs.y-0.5)*uShear;

  vec3 col = vec3(0.0);
  vec3 pCol = vec3(0.0);
  float pA = 0.0, coverage = 0.0;
  for(int c=0;c<3;c++){
    float cf  = float(c);
    float chs = (cf < 0.5) ? uShiftR : ((cf > 1.5) ? uShiftB : 0.0);
    vec2 spx = vec2(qpx.x + shift + chs, qpx.y) + dir*uOffset*(cf-1.0);
    spx = qSnap(spx, snap);
    vec4 p = plateSample(uPlateHold > 0.5 ? px : spx);
    pCol[c] = p[c];
    pA = max(pA, p.a);
    vec4 sampleColor = sceneAt(spx);
    vec3 f = sampleColor.rgb;
    coverage = max(coverage,sampleColor.a);
    float lum = dot(f, vec3(0.299, 0.587, 0.114));
    float v = clamp((lum-0.5)*uContrast + 0.5, 0.0, 1.0);
    float qv = floor(v*nq)/nq;
    col[c] = mix(f[c], qv, uCrush);
  }

  vec3 outc = col;
  if(uCrush > 0.85 && uPalOn > 0.5){
    float code = (col.r>0.5?1.0:0.0) + (col.g>0.5?2.0:0.0) + (col.b>0.5?4.0:0.0);
    coverage = step(0.5,code);
    outc = uBg;
    if(code > 0.5) outc = palAt(int(mod(code-1.0, max(uPalN,1.0))));
  }
  if(uPlateOn > 0.5){
    float hit = max(col.r, max(col.g, col.b));
    outc = mix(outc, pCol, pA * mix(uPlateMask, uPlateInfuse, hit));
    coverage = mix(coverage,1.0,pA * mix(uPlateMask,uPlateInfuse,hit));
  }
  outc = mix(outc, vec3(1.0) - outc, uPlateInvert);
  O = vec4(outc,mix(1.0,coverage,uBackgroundTransparent));
  if(uPremultiply>.5) O.rgb=clamp(O.rgb,0.0,1.0)*O.a;
}
`,tl={uTwist:{min:-2,max:2,def:.5},uWarp:{min:.25,max:6,def:2},uOctaves:{min:0,max:5,def:5},uStep:{min:.02,max:.8,def:.25},uGlow:{min:.1,max:3,def:1.1},uExposure:{min:20,max:800,def:200},uWire:{min:0,max:1,def:0},uBands:{min:0,max:1,def:.12},uScatter:{min:0,max:2,def:.5},uBlend:{min:0,max:1,def:.35},uBurn:{min:0,max:1,def:.25},uCrush:{min:0,max:1,def:0},uContrast:{min:.6,max:5,def:2},uSteps:{min:2,max:16,def:8},uSnap:{min:1,max:96,def:4},uQJitter:{min:0,max:1,def:0},uQTwist:{min:0,max:1,def:0},uQMetric:{min:0,max:1,def:0},uOffset:{min:0,max:24,def:3},uShiftR:{min:-48,max:48,def:0},uShiftB:{min:-48,max:48,def:0},uRowShift:{min:0,max:80,def:0},uShear:{min:-300,max:300,def:0},uPanX:{min:-2,max:2,def:0},uPanY:{min:-2,max:2,def:0},uSpeed:{min:0,max:4,def:1},uHold:{min:0,max:24,def:0}},ti=["uTwist","uWarp","uOctaves","uStep","uGlow","uExposure","uWire","uBands","uScatter","uBlend","uBurn","uPanX","uPanY"],tu=["uCrush","uContrast","uSteps","uSnap","uQJitter","uQTwist","uQMetric","uOffset","uShiftR","uShiftB","uRowShift","uShear"];function ts(e,t){let{min:r,max:a}=tl[e];return Math.min(a,Math.max(r,t))}let tc=["uPlateOn","uPlateMask","uPlateInfuse","uPlateFit","uPlateScale","uPlateHold","uPlateInvert"],tf=(e,t)=>{let a=e[t];return(0,r.F)(a)?a:{}},td={config:{field:{rings:[4,1,10,1],radius:[.95,.25,1.5,.01],softness:[.5,.04,.8,.01],intensity:[1,.35,1.8,.01],centerX:[0,-.6,.6,.01],centerY:[0,-.6,.6,.01],oval:[1,.45,1.8,.01],warp:[0,0,.4,.005],grain:[0,0,.2,.005],blur:[.42,0,1.5,.01],bloom:[.18,0,1,.01]},orbs:{orbCount:[3,3,8,1],spread:[.55,0,1.5,.01],sizeVariation:[.22,0,.8,.01],merge:[.5,0,1,.01],diffusion:[.55,0,1,.01],phaseOffset:[.65,0,2,.01]},shader:{twist:[0,-2,2,.01],octaves:[3,0,5,.05],step:[.05,.01,.8,.005],density:[1,.1,3,.01],exposure:[1,.2,3,.01],bands:[0,0,1,.005],scatter:[0,0,2,.01],blend:[1,0,1,.01],burn:[0,0,1,.01],crush:[0,0,1,.01]},motion:{animate:!0,speed:[.05,0,.5,.005],pulse:[0,0,.15,.005],travel:[0,-.5,.5,.005],drift:[0,0,.5,.005]},output:{seed:{type:"text",default:"505",placeholder:"Seed"},newSeed:{type:"action",label:"New seed"},resolution:{type:"select",options:["200","400","600","1000","1200","1800","2400"],default:"1200"},fps:{type:"select",options:["12","24","30"],default:"24"},duration:{type:"select",options:[{value:"2",label:"2 s"},{value:"4",label:"4 s"},{value:"8",label:"8 s"}],default:"4"},randomize:{type:"action"},savePng:{type:"action",label:"Save PNG"},saveMp4:{type:"action",label:"Save MP4"},copySvg:{type:"action",label:"Copy SVG"},saveSvg:{type:"action",label:"Download SVG"},reset:{type:"action"}}},toDial:function(e){let t=e.P;return{field:{rings:t.rings??null,radius:t.radius??null,softness:t.softness??null,intensity:t.intensity??null,centerX:t.centerX??null,centerY:t.centerY??null,oval:t.oval??null,warp:t.warp??null,grain:t.grain??null,blur:t.blur??null,bloom:t.bloom??null},orbs:{orbCount:t.orbCount??3,spread:t.orbSpread??.55,sizeVariation:t.sizeVariation??.22,merge:t.merge??.5,diffusion:t.diffusion??.55,phaseOffset:t.phaseOffset??.65},shader:{twist:t.twist??null,octaves:t.octaves??null,step:t.step??null,density:t.density??null,exposure:t.exposure??null,bands:t.bands??null,scatter:t.scatter??null,blend:t.blend??null,burn:t.burn??null,crush:t.crush??null},motion:{animate:!!t.animate,speed:t.speed??null,pulse:t.pulse??null,travel:t.travel??null,drift:t.drift??null},output:{seed:String(e.seed??505),resolution:String(t.resolution||1200),fps:String(e.expFps||24),duration:String(e.expDur||4)}}},fromDial:function(e){let t=tf(e,"field"),r=tf(e,"orbs"),a=tf(e,"shader"),o=tf(e,"motion"),n=tf(e,"output"),l=Math.round(Number(n.seed));return{seed:Number.isFinite(l)?Math.max(0,l):505,expFps:Number(n.fps)||24,expDur:Number(n.duration)||4,P:{rings:t.rings??null,radius:t.radius??null,softness:t.softness??null,intensity:t.intensity??null,centerX:t.centerX??null,centerY:t.centerY??null,oval:t.oval??null,warp:t.warp??null,grain:t.grain??null,blur:t.blur??null,bloom:t.bloom??null,orbCount:r.orbCount??null,orbSpread:r.spread??null,sizeVariation:r.sizeVariation??null,merge:r.merge??null,diffusion:r.diffusion??null,phaseOffset:r.phaseOffset??null,twist:a.twist??null,octaves:a.octaves??null,step:a.step??null,density:a.density??null,exposure:a.exposure??null,bands:a.bands??null,scatter:a.scatter??null,blend:a.blend??null,burn:a.burn??null,crush:a.crush??null,animate:!!o.animate,speed:o.speed??null,pulse:o.pulse??null,travel:o.travel??null,drift:o.drift??null,resolution:Number(n.resolution)}}}},tp=e=>Math.max(-.6,Math.min(.6,e)),tm="#9acbd5",th=["#ef9da1","#d9d7cc","#3fb5fe","#ab9be3"],tg=/^#[0-9a-f]{6}$/i,tb=e=>ey("string"==typeof e&&tg.test(e)?e:"#000000"),tv=`#version 300 es
in vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}`,tx=`#version 300 es
precision highp float;
out vec4 O;
uniform vec2 uRes,uCenter;
uniform float uTime,uSeed,uRings,uRadius,uSoftness,uIntensity,uOval,uWarp,uGrain,uPulse,uTravel,uDrift;
uniform float uOrbCount,uOrbSpread,uSizeVariation,uMerge,uDiffusion,uPhaseOffset;
uniform float uBlur,uBloom,uBackgroundTransparent;
uniform float uPremultiply;
uniform float uTwist,uOctaves,uStep,uDensity,uExposure,uBands,uScatter,uBlend,uBurn,uCrush;
uniform vec3 uBg,uPal[4];
float hash11(float p){return fract(sin(p*127.1+19.7)*43758.5453);}
float hash21(vec2 p){
  p+=mod(uSeed,10000.0)*vec2(.017,.031);
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}
float noise21(vec2 p){
  vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),
    mix(hash21(i+vec2(0,1)),hash21(i+vec2(1)),f.x),f.y);
}
float fbm(vec2 p){
  float value=0.0,amplitude=.5;
  for(int i=0;i<5;i++){
    value+=noise21(p)*amplitude*clamp(uOctaves-float(i),0.0,1.0);
    p=p*2.03+vec2(13.7,9.2);amplitude*=.5;
  }
  return value;
}
float smoothMin(float a,float b,float k){
  float h=max(k-abs(a-b),0.0)/max(k,.0001);
  return min(a,b)-h*h*k*.25;
}
vec3 palAt(int i){if(i<=0)return uPal[0];if(i==1)return uPal[1];if(i==2)return uPal[2];return uPal[3];}
vec3 fieldAt(int i){
  int m=i-int(floor(float(i)/5.0))*5;
  if(m==0)return uPal[0];if(m==1)return uPal[1];if(m==2)return uPal[2];
  if(m==3)return uPal[3];return uBg;
}
vec3 ramp(float x){
  x=max(x,0.0);float i=floor(x);float f=fract(x);
  float width=clamp(uSoftness,.04,.8);
  float soft=smoothstep(.5-width*.5,.5+width*.5,f);
  f=mix(step(.5,f),soft,uBlend);
  int a=int(i),b=a+1;
  return mix(fieldAt(a),fieldAt(b),f);
}
vec3 blurredRamp(float band){
  float spread=uBlur*(.16+uRings*.055);
  vec3 sharp=ramp(clamp(band,0.0,uRings));
  vec3 soft=ramp(clamp(band-spread*2.0,0.0,uRings))*.1+
    ramp(clamp(band-spread,0.0,uRings))*.2+sharp*.4+
    ramp(clamp(band+spread,0.0,uRings))*.2+
    ramp(clamp(band+spread*2.0,0.0,uRings))*.1;
  return mix(sharp,soft,smoothstep(0.0,.18,uBlur));
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uRes)/min(uRes.x,uRes.y);
  uv-=uCenter*.5;
  float count=clamp(floor(uOrbCount+.5),1.0,8.0);
  float field=10.0,weightedField=0.0,phaseSum=0.0,angleSin=0.0,angleCos=0.0,weightSum=0.0;
  float mergeWidth=.01+uMerge*.28+uDiffusion*.12;
  for(int i=0;i<8;i++){
    float fi=float(i);
    if(fi>=count)break;
    float sourceSeed=fi+1.0+mod(uSeed,10000.0)*.0137;
    float layoutAngle=sourceSeed*2.39996323+hash11(sourceSeed)*1.7;
    float layoutRadius=count<1.5?0.0:sqrt((fi+.42)/count)*uOrbSpread*.38;
    vec2 source=layoutRadius*vec2(cos(layoutAngle),sin(layoutAngle));
    float driftPhase=hash11(sourceSeed*3.17)*6.2831853;
    float driftRate=.16+hash11(sourceSeed*7.31)*.19;
    source+=uDrift*(.55+.45*hash11(sourceSeed*5.2))*vec2(
      sin(uTime*driftRate+driftPhase),
      cos(uTime*(driftRate*.81)+driftPhase*1.37)
    );
    vec2 p=uv-source;
    float rotation=layoutAngle*.47+hash11(sourceSeed*11.9)*3.14159265+
      uTime*uDrift*(hash11(sourceSeed*13.1)-.5);
    mat2 rotate=mat2(cos(rotation),-sin(rotation),sin(rotation),cos(rotation));
    p=rotate*p;
    float sizeScale=1.0+(hash11(sourceSeed*17.3)*2.0-1.0)*uSizeVariation;
    float sourceOval=max(.2,uOval*(1.0+(hash11(sourceSeed*23.7)*2.0-1.0)*uSizeVariation*.72));
    p.y/=sourceOval;
    float angle=atan(p.y,p.x);
    float baseRadius=length(p);
    float localTime=uTime*(.7+hash11(sourceSeed*31.1)*.6)+driftPhase;
    float n=fbm(p*(3.1+uScatter*2.0)+vec2(sourceSeed*4.7,sourceSeed*7.9)+
      vec2(localTime*.035,-localTime*.029))-.5;
    float breath=1.0+uPulse*sin(uTime*6.2831853+driftPhase);
    float spiral=sin(angle*3.0+sin(angle*2.0)*uScatter+
      baseRadius*uTwist*18.0+localTime);
    float r=baseRadius+n*(uWarp+uScatter*.06)*(1.0-uDiffusion*.32)+
      spiral*(uWarp*.12+abs(uTwist)*.018)*(1.0-uDiffusion*.25);
    float sourceRadius=max(uRadius*.5*sizeScale*mix(1.0,.72,smoothstep(1.0,6.0,count))*breath,.02);
    float sourceField=r/sourceRadius;
    field=smoothMin(field,sourceField,mergeWidth);
    float weight=exp(-max(sourceField,0.0)*mix(7.5,2.2,uDiffusion));
    weightedField+=sourceField*weight;
    float sourcePhase=(hash11(sourceSeed*41.3)-.5)*2.0*uPhaseOffset;
    phaseSum+=sourcePhase*weight;
    angleSin+=sin(angle)*weight;angleCos+=cos(angle)*weight;weightSum+=weight;
  }
  float diffuseField=weightedField/max(weightSum,.0001);
  float scaled=max(mix(field,diffuseField,uDiffusion*.22),0.0);
  float phase=phaseSum/max(weightSum,.0001);
  float angle=atan(angleSin,angleCos);
  float band=scaled*uRings*(1.0+uBands*1.5)+uTravel*uTime*uRings+
    sin(angle*2.0+uTime)*uScatter*.18+phase;
  band=floor(max(band,0.0)/max(uStep,.001))*max(uStep,.001);
  band=clamp(band,0.0,uRings);
  vec3 color=blurredRamp(band);
  float bloomSpread=(.3+uBlur)*(.2+uRings*.04);
  vec3 bloomColor=(blurredRamp(clamp(band-bloomSpread,0.0,uRings))+
    blurredRamp(clamp(band+bloomSpread,0.0,uRings)))*.5;
  color=mix(color,bloomColor,uBloom*.55)+bloomColor*uBloom*.08;
  float edge=smoothstep(.84+uSoftness*.2,1.18+uSoftness*.35,scaled);
  if(uBackgroundTransparent<.5){
    color=mix(uBg,color,1.0-edge);
    color=uBg+(color-uBg)*uIntensity*uDensity;
  }else color*=uIntensity*uDensity;
  color*=uExposure;
  color=mix(color,color*color*1.35+uPal[0]*.2,uBurn);
  color=mix(color,floor(color*6.0+.5)/6.0,uCrush);
  color+=(hash21(gl_FragCoord.xy+uTime)-.5)*uGrain;
  O=vec4(clamp(color,0.0,1.0),mix(1.0,1.0-edge,uBackgroundTransparent));
  if(uPremultiply>.5) O.rgb*=O.a;
}`,ty=[["uRings","rings"],["uRadius","radius"],["uSoftness","softness"],["uIntensity","intensity"],["uOval","oval"],["uWarp","warp"],["uGrain","grain"],["uPulse","pulse"],["uTravel","travel"],["uDrift","drift"],["uBlur","blur"],["uBloom","bloom"],["uOrbCount","orbCount"],["uOrbSpread","orbSpread"],["uSizeVariation","sizeVariation"],["uMerge","merge"],["uDiffusion","diffusion"],["uPhaseOffset","phaseOffset"],["uTwist","twist"],["uOctaves","octaves"],["uStep","step"],["uDensity","density"],["uExposure","exposure"],["uBands","bands"],["uScatter","scatter"],["uBlend","blend"],["uBurn","burn"],["uCrush","crush"]],tF=(e,t)=>Number(e[t]);function tS(e){let t={};for(let[r,a]of Object.entries(e))void 0!==a&&(t[r]=a);return t}let tw=(e,t)=>{let a=e[t];return(0,r.F)(a)?a:{}},tM={config:{geometry:{rings:[4,1,16,1],concentric:[1,1,8,1],spacing:[.08,.01,.24,.01],ringDistance:[0,0,.6,.01],radius:[.72,.2,.92,.01],stroke:[.18,.01,.32,.005],roughness:[0,0,.18,.001],roughnessX:[0,0,.18,.001],roughnessY:[0,0,.18,.001],oval:[1,.45,1.35,.01],spread:[.78,0,1.5,.01],perspective:[.28,0,.75,.01],opacity:[.88,.1,1,.01]},camera:{pitch:[.24,-3.15,3.15,.01],turn:[-.3,-3.15,3.15,.01],roll:[0,-3.15,3.15,.01]},color:{backgroundTransparent:!1,background:{type:"color",default:"#ffffff"},ring1:{type:"color",default:"#ec0648"},ring2:{type:"color",default:"#ffc4d8"},ring3:{type:"color",default:"#5718c0"},ring4:{type:"color",default:"#3fb5fe"}},orbs:{enabled:!1,perRing:[1,1,6,1],size:[.045,.008,.35,.001],tilt:[0,-3.14,3.14,.01],shader:{type:"select",options:[{value:"gloss",label:"Gloss"},{value:"bloom",label:"Soft Bloom"},{value:"chrome",label:"Liquid Chrome"},{value:"pearl",label:"Pearl"},{value:"bubble",label:"Soap Bubble"},{value:"glass",label:"Glass"},{value:"prism",label:"Prism Glass"},{value:"portal",label:"Portal · Tab 3 Preset"},{value:"pixel",label:"Pixel Shift"},{value:"wire",label:"Portal Wire"}],default:"gloss"},portalPreset:{type:"select",options:[{value:"active",label:"Active / latest from Tab 3"},{value:"global:0",label:"Global · 00 · pure lattice"},{value:"global:1",label:"Global · Yellow Green Brown"},{value:"global:2",label:"Global · Blue Haze"}],default:"active"},randomPortal:{type:"action",label:"Random Portal Preset"},detail:[2,.5,5,.05],twist:[.5,-2,2,.01]},motion:{animate:!1,speed:[.25,-2,2,.01],concentricMotion:!1,concentricSpeed:[.8,-2,2,.01],orbMotion:!1,orbSpeed:[1.25,-3,3,.01]},output:{resolution:{type:"select",options:["200","400","600","1000","1200","1800","2400"],default:"1200"},cycles:[1,1,10,1],fps:{type:"select",options:["12","24","30","60"],default:"24"},randomize:{type:"action"},savePng:{type:"action",label:"Save PNG"},copySvg:{type:"action",label:"Copy SVG"},saveSvg:{type:"action",label:"Download SVG"},saveSolidMp4:{type:"action",label:"Save MP4"},saveGif:{type:"action",label:"Save GIF"},reset:{type:"action"}}},toDial:function(e){let{P:t}=e,r=Array.isArray(t.colors)?t.colors:[];return{geometry:tS({rings:t.rings,concentric:t.concentric,spacing:t.spacing,ringDistance:t.ringDistance,radius:t.radius,stroke:t.stroke,roughness:t.roughness,roughnessX:t.roughnessX,roughnessY:t.roughnessY,oval:t.oval,spread:t.spread,perspective:t.perspective,opacity:t.opacity}),camera:tS({pitch:t.pitch,turn:t.turn,roll:t.roll}),color:tS({background:t.background,backgroundTransparent:!!t.backgroundTransparent,ring1:r[0],ring2:r[1],ring3:r[2],ring4:r[3]}),orbs:tS({enabled:!!t.orbsEnabled,perRing:t.orbsPerRing,size:t.orbSize,tilt:t.orbTilt,shader:t.orbShader,portalPreset:t.portalPreset,detail:t.orbDetail,twist:t.orbTwist}),motion:tS({animate:!!t.animate,speed:t.speed,concentricMotion:!!t.concentricMotion,concentricSpeed:t.concentricSpeed,orbMotion:!!t.orbMotion,orbSpeed:t.orbSpeed}),output:{resolution:String(t.resolution||1200),cycles:t.exportCycles??1,fps:String(t.exportFps||24)}}},fromDial:function(e){let t=tw(e,"geometry"),r=tw(e,"camera"),a=tw(e,"color"),o=tw(e,"orbs"),n=tw(e,"motion"),l=tw(e,"output");return{P:tS({rings:t.rings,concentric:t.concentric,spacing:t.spacing,ringDistance:t.ringDistance,radius:t.radius,stroke:t.stroke,roughness:t.roughness,roughnessX:t.roughnessX,roughnessY:t.roughnessY,oval:t.oval,spread:t.spread,perspective:t.perspective,opacity:t.opacity,pitch:r.pitch,turn:r.turn,roll:r.roll,background:a.background,backgroundTransparent:!!a.backgroundTransparent,colors:[a.ring1,a.ring2,a.ring3,a.ring4].map(e=>e??null),orbsEnabled:!!o.enabled,orbsPerRing:o.perRing,orbSize:o.size,orbTilt:o.tilt,orbShader:o.shader,portalPreset:o.portalPreset,orbDetail:o.detail,orbTwist:o.twist,animate:!!n.animate,speed:n.speed,concentricMotion:!!n.concentricMotion,concentricSpeed:n.concentricSpeed,orbMotion:!!n.orbMotion,orbSpeed:n.orbSpeed,resolution:Number(l.resolution),exportCycles:l.cycles,exportFps:Number(l.fps)})}}},tP=["gloss","bloom","chrome","pearl","bubble","glass","prism","portal","pixel","wire"],tk=["#ec0648","#ffc4d8","#5718c0","#3fb5fe"];function tR(){return{rings:4,concentric:1,spacing:.08,ringDistance:0,radius:.72,stroke:.18,roughness:0,roughnessX:0,roughnessY:0,oval:1,spread:.78,perspective:.28,opacity:.88,pitch:.24,turn:-.3,roll:0,backgroundTransparent:!1,background:"#ffffff",colors:[...tk],orbsEnabled:!1,orbsPerRing:1,orbSize:.045,orbTilt:0,orbShader:"gloss",portalPreset:"active",orbDetail:2,orbTwist:.5,animate:!1,speed:.25,concentricMotion:!1,concentricSpeed:.8,orbMotion:!1,orbSpeed:1.25,resolution:1200,exportCycles:1,exportFps:24}}let tT=/^#[0-9a-f]{6}$/i;function tA(e,t){return"string"==typeof e&&tT.test(e)?e:t}let tC=e=>{let t;return(t=e.orbShader,tP.some(e=>e===t))?e.orbShader:"gloss"},tE=[12,24,30,60],tD=`#version 300 es
          in vec2 a; void main(){gl_Position=vec4(a,0.0,1.0);}`,tz=`#version 300 es
          precision highp float;
          out vec4 O;
          uniform vec2 uRes;
          uniform float uTime;
          uniform float uTwist,uWarp,uOctaves,uStep,uGlow,uExposure;
          uniform float uWire,uBands,uScatter,uBlend,uBurn;
          uniform float uPanX,uPanY,uTilt;
          uniform int uStyle;
          uniform float uPalN;
          uniform vec3 uBg;
          uniform vec3 uPal[4];
          float tanh1(float x){float e=exp(-2.0*x);return(1.0-e)/(1.0+e);}
          vec3 tanh3(vec3 x){vec3 e=exp(-2.0*x);return(1.0-e)/(1.0+e);}
          vec3 palAt(int i){
            if(i<=0)return uPal[0];if(i==1)return uPal[1];if(i==2)return uPal[2];return uPal[3];
          }
          vec3 palette(float t){
            float n=max(uPalN,1.0);float x=fract(t)*n;float i=floor(x);
            vec3 a=palAt(int(i));vec3 b=palAt(int(mod(i+1.0,n)));
            return mix(a,mix(a,b,smoothstep(0.0,1.0,fract(x))),uBlend);
          }
          float hash21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
          float noise21(vec2 p){
            vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
            return mix(mix(hash21(i),hash21(i+vec2(1,0)),f.x),
              mix(hash21(i+vec2(0,1)),hash21(i+vec2(1)),f.x),f.y);
          }
          vec2 tiltedUv(vec2 frag){
            vec2 uv=(frag-.5*uRes)/(uRes.y*.5);
            float c=cos(uTilt),s=sin(uTilt);
            return mat2(c,-s,s,c)*uv;
          }
          vec3 orbAt(vec2 frag){
            vec2 uv=tiltedUv(frag);
            float rr=dot(uv,uv),r=sqrt(rr),z=sqrt(max(0.0,1.0-rr));
            vec3 n=normalize(vec3(uv,z));
            vec3 light=normalize(vec3(-.55,.72,1.0));
            float diffuse=max(dot(n,light),0.0);
            float spec=pow(max(dot(reflect(-light,n),vec3(0,0,1)),0.0),30.0);
            float fres=pow(1.0-z,2.4);
            float angle=atan(uv.y,uv.x)/6.2831853;
            float t=uTime*.35;
            vec3 c;
            if(uStyle==0){
              c=palette(angle+.12*sin(r*9.0-t))*mix(.22,1.05,diffuse);
              c+=vec3(1.0)*spec*1.35+palette(angle+.25)*fres*.34;
            }else if(uStyle==1){
              float pulse=.5+.5*sin((r*uWarp*8.0)-t*4.0);
              float core=exp(-r*r*(3.0+uWarp));
              c=palette(pulse*.32+angle+t*.08)*(core*2.1+pulse*.62);
              c+=vec3(1.0)*pow(max(0.0,1.0-r),5.0);
            }else if(uStyle==2){
              float bands=.5+.5*sin((n.y+n.x*.36)*18.0+uTwist*5.0+t);
              bands=smoothstep(.18,.82,bands);
              c=mix(vec3(.015),palette(angle+bands*.38),bands);
              c+=vec3(1.0)*(spec*1.8+pow(1.0-abs(n.y),18.0)*.42);
            }else if(uStyle==3){
              float iri=.5+.5*sin(fres*22.0+angle*8.0-t);
              c=mix(vec3(.82,.86,.92),palette(iri),.48);
              c*=.62+.55*diffuse;c+=vec3(1.0)*(spec*.9+fres*.28);
            }else if(uStyle==4){
              float film=.5+.5*sin(fres*34.0+angle*13.0+t*1.7);
              c=mix(uBg,palette(film+angle),.16+fres*.72);
              c+=vec3(1.0)*(spec*.72+pow(fres,3.0)*.5);
            }else if(uStyle==5){
              vec2 refractUv=uv*(1.0+.14*z)+n.xy*.06*sin(t+uv.y*8.0);
              float flow=noise21(refractUv*(3.0+uWarp)+t);
              c=mix(uBg,palette(flow+angle),.22+fres*.58);
              c+=vec3(1.0)*(spec*1.1+pow(fres,2.0)*.36);
            }else if(uStyle==6){
              float prism=fract(angle*3.0+r*1.4+fres*.8-t*.12);
              c=palette(prism)*( .45+.72*diffuse);
              c+=palette(prism+.33)*fres*.75+vec3(1.0)*spec;
            }else if(uStyle==8){
              vec2 cells=floor((uv+1.0)*(5.0+uWarp*2.0));
              float h=hash21(cells+floor(t*4.0));
              c=palette(h+angle)*(.34+.9*step(.36,h));
              c+=vec3(1.0)*step(.88,h);
            }else{
              vec2 grid=abs(fract((uv+1.0)*(4.0+uWarp))-0.5);
              float line=1.0-smoothstep(.035,.11,min(grid.x,grid.y));
              float contour=1.0-smoothstep(.02,.08,abs(fract((z+t*.08)*7.0)-.5));
              c=mix(uBg,palette(angle+t*.08),max(line,contour)*(.65+.35*fres));
              c+=vec3(1.0)*spec*.65;
            }
            return mix(c,uBg,smoothstep(.99,1.08,r));
          }
          vec3 portalAt(vec2 frag){
            vec2 center=.5*uRes;
            vec2 q=frag-center;
            float ct=cos(uTilt),st=sin(uTilt);
            frag=center+mat2(ct,-st,st,ct)*q;
            vec3 dir=normalize(vec3(2.0*frag-uRes,-uRes.y));
            dir.xy+=vec2(uPanX,uPanY);
            vec3 acc=vec3(0.0);float wsum=0.0;float z=0.0,d;
            for(int i=0;i<70;i++){
              vec3 p=z*dir;vec4 cs=cos(z*uTwist+vec4(0.0,33.0,11.0,0.0));
              p.xy=p.xy*mat2(cs.x,cs.y,cs.z,cs.w);p.z-=uTime;d=uWarp;
              for(int j=0;j<5;j++){
                d+=d;p+=sin(p.yzx*d+z)/d*clamp(uOctaves-float(j),0.0,1.0);
              }
              d=max(length(1.0/tan(p.xz)),1e-4);
              z+=min(abs(cos(p.y)),d)*uStep;
              float w=mix(1.0,0.05,uWire);
              float em=uGlow*mix(1.0/d,w/(d*d+w*w),uWire);
              acc+=palette(z*uBands+uScatter*dot(sin(p),vec3(0.3333)))*em;wsum+=em;
            }
            float a=tanh1(wsum/max(uExposure,1.0));vec3 flatc=acc/max(wsum,1e-5);
            vec3 hot=tanh3(acc/max(uExposure,1.0));
            return mix(uBg,mix(flatc,hot,uBurn),a);
          }
          void main(){
            vec3 color=uStyle==7?portalAt(gl_FragCoord.xy):orbAt(gl_FragCoord.xy);
            O=vec4(color,1.0);
          }
        `,tB=["uTwist","uWarp","uOctaves","uStep","uGlow","uExposure","uWire","uBands","uScatter","uBlend","uBurn","uPanX","uPanY"],tN=e=>ey(tA(e,"#000000")),tX={uTwist:.5,uWarp:2,uOctaves:5,uStep:.25,uGlow:1.1,uExposure:200,uWire:0,uBands:.12,uScatter:.5,uBlend:.35,uBurn:.25,uPanX:0,uPanY:0},tY=[{id:"global:0",pal:"5-g",P:{uTwist:-1.56,uWarp:.88,uOctaves:0,uStep:.1,uGlow:1.44,uExposure:20,uBands:.09,uScatter:.35,uBlend:.2,uBurn:.15}},{id:"global:1",pal:"3-f",P:{uPanX:-.2367191773,uPanY:.1725587943}},{id:"global:2",pal:"2-m",P:{}}],tL=e=>JSON.stringify({P:e.P,pal:e.pal,palIndex:null,customPalette:null,seed:null,qMode:null}),tO=e=>"active"===e||tY.some(t=>t.id===e);function tI(e,t,r,a,o){let n=(180*a.tilt/Math.PI).toFixed(2),l=(50+18*Math.cos(a.tilt)).toFixed(2),i=(50+18*Math.sin(a.tilt)).toFixed(2);return`<radialGradient id="${o}orb-gradient-${e}" cx="50%" cy="50%" r="50%" fx="32%" fy="28%"><stop offset="0" stop-color="#ffffff"/><stop offset=".24" stop-color="#ffffff"/><stop offset=".52" stop-color="${t}"/><stop offset="1" stop-color="#000000" stop-opacity=".38"/></radialGradient><radialGradient id="${o}orb-glass-${e}" cx="50%" cy="50%" r="52%" fx="${l}%" fy="${i}%"><stop offset="0" stop-color="#ffffff" stop-opacity=".92"/><stop offset=".16" stop-color="#ffffff" stop-opacity=".18"/><stop offset=".48" stop-color="${t}" stop-opacity=".16"/><stop offset=".78" stop-color="${t}" stop-opacity=".58"/><stop offset=".94" stop-color="#ffffff" stop-opacity=".72"/><stop offset="1" stop-color="${t}" stop-opacity=".28"/></radialGradient><linearGradient id="${o}orb-prism-${e}" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${n} .5 .5)"><stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset=".24" stop-color="${t}" stop-opacity=".42"/><stop offset=".52" stop-color="${r}" stop-opacity=".68"/><stop offset=".78" stop-color="#ffffff" stop-opacity=".36"/><stop offset="1" stop-color="${t}" stop-opacity=".88"/></linearGradient><radialGradient id="${o}orb-bloom-${e}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff"/><stop offset=".16" stop-color="${t}"/><stop offset=".42" stop-color="${r}" stop-opacity=".92"/><stop offset=".7" stop-color="${t}" stop-opacity=".5"/><stop offset="1" stop-color="${t}" stop-opacity="0"/></radialGradient><linearGradient id="${o}orb-chrome-${e}" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${n} .5 .5)"><stop offset="0" stop-color="#050505"/><stop offset=".14" stop-color="#ffffff"/><stop offset=".28" stop-color="${t}"/><stop offset=".43" stop-color="#111111"/><stop offset=".58" stop-color="#ffffff"/><stop offset=".76" stop-color="${r}"/><stop offset="1" stop-color="#080808"/></linearGradient><radialGradient id="${o}orb-pearl-${e}" cx="50%" cy="50%" r="54%" fx="${l}%" fy="${i}%"><stop offset="0" stop-color="#ffffff"/><stop offset=".2" stop-color="#ffffff" stop-opacity=".94"/><stop offset=".45" stop-color="${r}" stop-opacity=".52"/><stop offset=".72" stop-color="${t}" stop-opacity=".68"/><stop offset="1" stop-color="#ffffff" stop-opacity=".88"/></radialGradient><radialGradient id="${o}orb-bubble-${e}" cx="50%" cy="50%" r="50%" fx="${l}%" fy="${i}%"><stop offset="0" stop-color="#ffffff" stop-opacity=".45"/><stop offset=".16" stop-color="#ffffff" stop-opacity=".04"/><stop offset=".58" stop-color="${t}" stop-opacity=".08"/><stop offset=".78" stop-color="#ffffff" stop-opacity=".14"/><stop offset=".92" stop-color="${r}" stop-opacity=".76"/><stop offset=".98" stop-color="#ffffff" stop-opacity=".92"/><stop offset="1" stop-color="${t}" stop-opacity=".22"/></radialGradient>`}function tG(e,t,r,a,o){let n=A(.12/a.detail,.018,.2),l=n.toFixed(4),i=(2*n).toFixed(4),u=(.5*n).toFixed(4),s=45*a.twist+18*a.phase,c=s.toFixed(2);return`<pattern id="${o}orb-portal-${e}" patternUnits="userSpaceOnUse" width="${l}" height="${l}" patternTransform="rotate(${c})"><rect width="100%" height="100%" fill="#050505"/><path d="M0 ${l} Q ${u} 0 ${l} ${l} M0 0 Q ${u} ${l} ${l} 0" fill="none" stroke="${t}" stroke-width="${(.13*n).toFixed(4)}"/><path d="M0 ${u} H ${l}" stroke="#ffffff" stroke-opacity=".48" stroke-width="${(.045*n).toFixed(4)}"/></pattern><pattern id="${o}orb-pixel-${e}" patternUnits="userSpaceOnUse" width="${i}" height="${i}" patternTransform="rotate(${(-(.35*s)).toFixed(2)})"><rect width="${i}" height="${i}" fill="#050505"/><rect width="${l}" height="${l}" fill="${t}"/><rect x="${l}" y="${l}" width="${l}" height="${l}" fill="${r}"/><rect x="${l}" width="${l}" height="${(.45*n).toFixed(4)}" fill="#ffffff"/></pattern><pattern id="${o}orb-wire-${e}" patternUnits="userSpaceOnUse" width="${l}" height="${l}" patternTransform="rotate(${c})"><rect width="100%" height="100%" fill="#050505"/><path d="M0 0 L ${l} ${l} M ${l} 0 L0 ${l}" stroke="${t}" stroke-width="${(.075*n).toFixed(4)}" fill="none"/></pattern>`}function tq(e,t){let r=Math.cos(t),a=Math.sin(t);return[e[0],e[1]*r-e[2]*a,e[1]*a+e[2]*r]}function t$(e,t){let r=Math.cos(t),a=Math.sin(t);return[e[0]*r+e[2]*a,e[1],-e[0]*a+e[2]*r]}let tW=[[.08,.06],[1.03,.34],[.55,1.13],[1.38,-.48]];function tj(e,t,r,a,o){var n,l;let i,u,{o:s,distanceIndex:c,roughSeed:f,normal:d}=t,p=.55*Math.sin(13*a+f)+.3*Math.sin(29*a+1.7*f)+.15*Math.sin(53*a-.8*f),m=.65*Math.sin(7*a+.7*f)+.35*Math.sin(31*a-1.2*f),h=.6*Math.sin(11*a-.9*f)+.4*Math.sin(37*a+1.4*f),g=r*(1+p*e.roughness),b=[Math.cos(a)*g+r*m*e.roughnessX,Math.sin(a)*g+r*h*e.roughnessY,0];b=[(b=t$(b=tq(b,s[0]*e.spread),s[1]*e.spread))[0]+d[0]*c*e.ringDistance,b[1]+d[1]*c*e.ringDistance,b[2]+d[2]*c*e.ringDistance],n=b=tq(b=t$(b,e.turn+o),e.pitch),i=Math.cos(l=e.roll),u=Math.sin(l),b=[n[0]*i-n[1]*u,n[0]*u+n[1]*i,n[2]];let v=1/(1-e.perspective*b[2]*.6);return{x:b[0]*v,y:b[1]*v*e.oval,z:b[2],q:v}}let t_=new Map([["portal",.2],["glass",.1],["bubble",.06]]),tQ=new Map([["bloom",.06],["chrome",.12],["pearl",.14],["bubble",.08],["glass",.2],["prism",.18],["portal",.36],["pixel",.32],["wire",.28]]);function tH(e,t){return{tilt:Number(e.orbTilt)||0,detail:A(Number(e.orbDetail)||2,.5,5),twist:Number(e.orbTwist)||0,phase:t}}let tU=0,tV={outerArm:[.66,.1,1,.01],middleArm:[.22,0,.6,.01],innerArm:[.085,0,.3,.005],outerRate:[1,-24,24,1],middleRate:[-8,-48,48,1],innerRate:[25,-96,96,1],phase:[0,0,360,1],rotation:[-90,-180,180,1],scale:[.85,.2,1.5,.01],stroke:[1.3,.3,6,.1],centerX:[0,-.6,.6,.01],centerY:[0,-.6,.6,.01]},tJ={flatView:!0,pitch:[0,-180,180,1],turn:[0,-180,180,1]},tK={animate:!0,speed:[.08,-.5,.5,.01],trail:[.72,.02,1,.01],mechanism:!1},tZ=[tV,tJ,a,tK];function t0(e){let t={};for(let[r,a]of Object.entries(e))void 0!==a&&(t[r]=a);return t}let t1=(e,t,r={})=>t0(Object.fromEntries(Object.keys(t).map(t=>[t,e[t]??r[t]]))),t2=(e,t)=>{let a=e[t];return(0,r.F)(a)?a:{}},t5=2*Math.PI;function t3(e,t){e.beginPath(),t.forEach(([t,r],a)=>a?e.lineTo(t,r):e.moveTo(t,r))}let t4=el[2],t8={flatView:!0,...o,outerArm:.66,middleArm:.22,innerArm:.085,outerRate:1,middleRate:-8,innerRate:25,pitch:0,turn:0,phase:0,rotation:-90,scale:.85,stroke:1.3,centerX:0,centerY:0,animate:!0,speed:.08,trail:.72,mechanism:!1,resolution:1200,backgroundTransparent:!1},t6=[200,400,600,1e3,1200,1800,2400],t7=e=>"string"==typeof e&&/^#[0-9a-f]{6}$/i.test(e);function t9(e){let t=Number(e.expFps);return{expFps:[24,30,60].includes(t)?t:24,expDur:Math.max(1,Math.min(20,Number(e.expDur)||6))}}let re=2*Math.PI;function rt(e,t){let r=0,a=0,o=[[0,0]],n=[e.outerRate,e.middleRate,e.innerRate];return[e.outerArm,e.middleArm,e.innerArm].forEach((l,i)=>{let u=re*t*n[i]+e.rotation*Math.PI/180+(2===i?e.phase*Math.PI/180:0);r+=l*Math.cos(u),a+=l*Math.sin(u),o.push([r,a])}),o}let rr=(e,t)=>parseInt(e.slice(t,t+2),16),ra=new Map([["graticule",{create:function(e){let t=eg(e.gpu),a=document.createElement("canvas"),o=b(a),n={target:ew(t,{filter:"linear",unit:0}),painter:function(e){let{gl:t}=e,r=null,a=new Float32Array(0);return{paint(o,n,l){let i=e.program("graticule-wire",ez,eB);r?.generation!==e.generation&&(r=function(e,t){let{gl:r}=e,a=r.createVertexArray();r.bindVertexArray(a);let o=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,o),r.bufferData(r.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,1,1]),r.STATIC_DRAW);let n=r.getAttribLocation(t,"aCorner");r.enableVertexAttribArray(n),r.vertexAttribPointer(n,2,r.FLOAT,!1,0,0);let l=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,l);let i=r.getAttribLocation(t,"aSegment");r.enableVertexAttribArray(i),r.vertexAttribPointer(i,4,r.FLOAT,!1,20,0),r.vertexAttribDivisor(i,1);let u=r.getAttribLocation(t,"aKind");return r.enableVertexAttribArray(u),r.vertexAttribPointer(u,1,r.FLOAT,!1,20,16),r.vertexAttribDivisor(u,1),{generation:e.generation,vao:a,corners:o,instances:l}}(e,i)),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT);let u=function(e){let t=e.squares.length;for(let r of e.strokes)for(let e of r.runs)t+=e.length-1;return t}(o);if(!u)return;a.length<5*u&&(a=new Float32Array(5*u*2));var s=a;let c=0,f=(e,t,r,a,o)=>{s[c++]=e,s[c++]=t,s[c++]=r,s[c++]=a,s[c++]=o};for(let{runs:e,cap:t}of o.strokes){let r=+("square"===t);for(let t of e)for(let e=1;e<t.length;e++)f(t[e-1][0],t[e-1][1],t[e][0],t[e][1],r)}for(let[e,t]of o.squares)f(e,t,e,t,2);let d=e.uniforms(i);t.useProgram(i),t.bindVertexArray(r.vao),t.bindBuffer(t.ARRAY_BUFFER,r.instances),t.bufferData(t.ARRAY_BUFFER,a,t.STREAM_DRAW,0,5*u),t.uniform2f(d("uRes"),n,l),t.uniform1f(d("uHalf"),o.lineWidth/2),t.enable(t.BLEND),t.blendEquation(t.MAX),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,u),t.blendEquation(t.FUNC_ADD),t.disable(t.BLEND)},release(){r?.generation===e.generation&&(t.deleteVertexArray(r.vao),t.deleteBuffer(r.corners),t.deleteBuffer(r.instances)),r=null}}}(t)},l={P:Object.fromEntries(ek.map(e=>[e.key,e.def])),pal:ev[0],seed:1024,mode:0,qMode:0,xray:0,noYellow:1,lock:0,invert:0,outline:1,upright:1,lineStyle:"solid",backStyle:"match",viewName:"front",resW:1200,expFps:24,expDur:4,anim:!1},i=em(e.frameDue);function u(){let r;v(a,l.P,l.resW,"graticule",e.maxDimension);let u=i.at(T(l.P,"uHold")),s=l.lock?1:(r=A((T(l.P,"uPhase")-.45)/.55,0,1))*r*(3-2*r),{width:c,height:f}=a,d={state:l,t:u,width:c,height:f,shapes:s<.999?function(e,t,r,a){let o,{P:n}=e,l=function(e){let t={front:[],back:[],ring:null};for(let r of function(e){let t=[],r=0,a=T(e,"uMeridians"),o=T(e,"uParallels");for(let e=0;e<a;e++){let o=e*Math.PI/a,n=Math.cos(o),l=Math.sin(o);t.push({fn:e=>[Math.cos(e)*n,Math.sin(e),Math.cos(e)*l],i:r++})}for(let e=0;e<o;e++){let a=-Math.PI/2+(e+1)*Math.PI/(o+1),n=Math.sin(a),l=Math.cos(a);t.push({fn:e=>[Math.cos(e)*l,n,Math.sin(e)*l],i:r++})}return t}(e.P))!function(e,t,r){let{P:a,seed:o,t:n,W:l,H:i}=e,u=T(a,"uRotX")+n*T(a,"uSpinX"),s=T(a,"uRotY")+n*T(a,"uSpinY"),c=Math.max(3,Math.round(T(a,"uResPts"))),f=T(a,"uRough")*(eO(a,i)/156)*2.2,d=-T(a,"uRadius")/T(a,"uDist"),{ox:p,oy:m}=eL(a,131*o+17*t.i+1,131*o+17*t.i+991,c),h=null,g=!0;for(let e=0;e<=c;e++){let o=e%c,n=function(e,t,r){let a=Math.cos(-r),o=Math.sin(-r),n=e[0]*a-e[2]*o,l=e[1],i=e[0]*o+e[2]*a,u=Math.cos(-t),s=Math.sin(-t);return[n,l*u-i*s,l*s+i*u]}(t.fn(o/c*eN),u,s),b=function(e,t,r,a){let o=T(e,"uRadius"),n=T(e,"uDist"),l=T(e,"uFocal"),i=t[2]*o+n;return i<=.001?null:[r/2+l*t[0]*o/i*a,a/2-l*t[1]*o/i*a]}(a,n,l,i),v=n[2]<d;if(!b){h=null;continue}let x=[b[0]+f*p[o],b[1]+f*m[o]];h&&v===g?h.push(x):(h&&h.length>1&&(g?r.front:r.back).push(h),h=[x],g=v)}h&&h.length>1&&(g?r.front:r.back).push(h)}(e,r,t);return e.outline&&(t.ring=function(e){let{P:t,seed:r,W:a,H:o}=e,n=Math.max(3,Math.round(T(t,"uResPts"))),l=eO(t,o),i=T(t,"uRough")*(l/156)*2.2,u=Math.max(12,n),{ox:s,oy:c}=eL(t,131*r+7777,131*r+4242,u),f=[];for(let e=0;e<u;e++){let t=e/u*eN;f.push([a/2+l*Math.cos(t)+i*s[e],o/2-l*Math.sin(t)+i*c[e]])}return f.push([f[0][0],f[0][1]]),f}(e)),t}({P:n,seed:e.seed,outline:e.outline,t,W:r,H:a}),i=Math.max(.5,T(n,"uWeight")*(a/400)),u={lineWidth:i,strokes:[],squares:[]},s=(o=[],"hidden"!==e.backStyle&&o.push([l.back,"dotted"===e.backStyle?"dotted":e.lineStyle]),o.push([l.front,e.lineStyle]),l.ring&&o.push([[l.ring],e.lineStyle]),o),c=Math.max(1,s.reduce((e,[t])=>e+t.length,0)),f=!(eC(n,"uTrim",1)>.995&&.001>eE(n,"uTrimStag")&&.001>eE(n,"uTrimOff")&&.5>eE(n,"uTrimTravel")),d=0;for(let[r,a]of s){let o=r.flatMap(e=>{if(!f)return d++,[e];let r=function(e,t,r,a){let o=eC(e,"uTrim",1),n=eC(e,"uTrimStag",0),l=Math.max(0,Math.min(1,o*(1+n)-n*(r<=1?0:t/(r-1)))),i=eC(e,"uTrimOff",0)+(T(e,"uTrimTravel")>=.5?.2*a:0);return{vis:l,off:i=(i%1+1)%1}}(n,d++,c,t);return function(e,t,r){if(t>=.999)return[e];if(t<=.001)return[];let a=eG(e);if(a<1e-4)return[];let o=(r%1+1)%1,n=o+t;return(n<=1?[eq(e,o*a,n*a)]:[eq(e,o*a,a),eq(e,0,(n-1)*a)]).filter(e=>e.length>=2)}(e,r.vis,r.off)});if("squares"===a&&e.upright){for(let e of o)u.squares.push(...function(e,t,r){let a=[],o=r+Math.max(1.6,2.6*r*T(e,"uGapMul"));if(o<1e-6||t.length<2)return a;let n=t.length>2&&.5>Math.hypot(t[0][0]-t[t.length-1][0],t[0][1]-t[t.length-1][1]),l=eG(t),i=n?Math.max(0,l-.25*o):l+1e-8,u=0,s=0;for(let e=1;e<t.length;e++){let[r,n]=t[e-1],[l,c]=t[e],f=Math.hypot(l-r,c-n);if(!(f<1e-8)){for(;s<=u+f+1e-8;){if(s>i)return a;let e=Math.max(0,Math.min(1,(s-u)/f));a.push([r+(l-r)*e,n+(c-n)*e]),s+=o}u+=f}}return a}(n,e,i));continue}let l=function(e,t,r){let a=T(e,"uGapMul");return"dotted"===r||"squares"===r?[.01,Math.max(1.6,2.6*t*a)]:"dashed"===r?[Math.max(2.4,3.4*t*a),Math.max(2,2.4*t*a)]:[]}(n,i,a);u.strokes.push({runs:l.length?o.flatMap(e=>(function(e,[t,r]){let a=t+r,o=[],n=[e[0]],l=0;for(let r=1;r<e.length;r++){let[i,u]=e[r-1],[s,c]=e[r],f=Math.hypot(s-i,c-u);if(f<1e-8)continue;let d=0;for(;d<f;){let e=l<t,r=e?t:a,p=Math.min(f-d,r-l);d+=p,l+=p;let m=d/f,h=[i+(s-i)*m,u+(c-u)*m];e&&n?.push(h),l<r-1e-9||(e?(n&&n.length>=2&&o.push(n),n=null):(n=[h],l=0))}}return n&&n.length>=2&&o.push(n),o})(e,l)):o,cap:eI(a)})}return u}(l,u,c,f):null};t.render(o,c,f,()=>(function(e,t,r){let{gl:a}=e;a.disable(a.SCISSOR_TEST);let o=t.target.bind(r.width,r.height);r.shapes&&t.painter.paint(r.shapes,r.width,r.height),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,r.width,r.height),function(e,t,r){let{gl:a}=e,o=e.program("graticule",eM,eP),n=e.uniforms(o),{state:l}=t;for(let i of(a.useProgram(o),e.bindFullscreenTriangle(o,"a"),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,r),a.uniform1i(n("uWire"),0),a.uniform1f(n("uPremultiply"),1),a.uniform2f(n("uRes"),t.width,t.height),a.uniform1f(n("uSeed"),l.seed%1e4*.0137),eR))a.uniform1f(n(i),T(l.P,i));a.uniform1f(n("uTime"),t.t),a.uniform1f(n("uMode"),l.mode),a.uniform1f(n("uQMode"),l.qMode),a.uniform1f(n("uXray"),l.xray),a.uniform1f(n("uNoYellow"),l.noYellow),a.uniform1f(n("uLock"),l.lock),a.uniform1f(n("uInvert"),l.invert),function(e,t,r){let a=eF(r),o=new Float32Array(12);for(let e=0;e<4;e++)o.set(ey(a[e%a.length]),3*e);e.uniform1f(t("uPalOn"),1),e.uniform1f(t("uPalN"),Math.min(a.length,4)),e.uniform1f(t("uBackgroundTransparent"),+!!r.transparent),e.uniform3fv(t("uBg"),ey(r.background)),e.uniform3fv(t("uPal[0]"),o)}(a,n,l.pal),a.uniform1i(n("uPlate"),1),a.uniform1f(n("uPlateOn"),0),a.uniform1f(n("uPlateMask"),1),a.uniform1f(n("uPlateInfuse"),.45),a.uniform1f(n("uPlateFit"),2),a.uniform1f(n("uPlateScale"),1),a.uniform1f(n("uPlateHold"),0),a.uniform1f(n("uPlateInvert"),0),a.uniform2f(n("uPlateRes"),0,0),a.drawArrays(a.TRIANGLES,0,3)}(e,r,o)})(t,n,d))}function s(e){Object.hasOwn(e,"pal")?l.pal=eD(null==e.pal?null:ex(e.pal),e.customPalette):null!=e.palIndex?l.pal=eD(e.palIndex,e.customPalette):Object.hasOwn(e,"customPalette")&&(l.pal=eD(ex(l.pal.id),e.customPalette)),null!=e.seed&&(l.seed=0|Number(e.seed)),null!=e.mode&&(l.mode=0|Number(e.mode)),null!=e.qMode&&(l.qMode=0|Number(e.qMode)),null!=e.xray&&(l.xray=+!!e.xray),null!=e.noYellow&&(l.noYellow=+!!e.noYellow),null!=e.lock&&(l.lock=+!!e.lock),null!=e.invert&&(l.invert=+!!e.invert),null!=e.outline&&(l.outline=+!!e.outline),null!=e.upright&&(l.upright=+!!e.upright),e.lineStyle&&(l.lineStyle=e.lineStyle),e.backStyle&&(l.backStyle=e.backStyle),function(e,t){let a=!!t.viewName&&t.viewName!==e.viewName,o=(0,r.F)(t.P)?t.P:null;if(a){let r=eT.get(t.viewName);if(r&&(e.viewName=t.viewName,[e.P.uRotX,e.P.uRotY]=r),o&&!Object.hasOwn(t,"pal")){let{uRotX:e,uRotY:t,...r}=o;o=r}}o&&Object.assign(e.P,o)}(l,e);e.resW&&e.resW!==l.resW&&(l.resW=0|Number(e.resW)),null!=e.expFps&&(l.expFps=0|Number(e.expFps)),null!=e.expDur&&Number.isFinite(Number(e.expDur))&&(l.expDur=Math.max(.5,Math.min(60,Number(e.expDur)))),(0,r.F)(e.P)&&null!=e.P.uHold&&i.invalidate(),null!=e.anim&&!!e.anim!==l.anim&&(l.anim=!!e.anim,l.anim&&i.restart()),l.anim||u()}let c=D(a,{start:e=>({x:e.clientX,y:e.clientY,rotX:T(l.P,"uRotX"),rotY:T(l.P,"uRotY")}),move(e,t){let r=a.getBoundingClientRect().width||1;l.P.uRotY=eA("uRotY",t.rotY+(e.clientX-t.x)/r*4),l.P.uRotX=eA("uRotX",t.rotX+(e.clientY-t.y)/r*2.4),l.anim||u()}}),f=()=>{let e;return e=w(l.pal),{P:{...l.P},pal:l.pal.id,customPalette:e&&{background:e.background,colors:e.colors,...e.transparent?{transparent:!0}:{}},palIndex:ex(l.pal.id),seed:l.seed,mode:l.mode,qMode:l.qMode,xray:l.xray,noYellow:l.noYellow,anim:l.anim,resW:l.resW,expFps:l.expFps,expDur:l.expDur,lock:l.lock,invert:l.invert,outline:l.outline,upright:l.upright,lineStyle:l.lineStyle,backStyle:l.backStyle,viewName:l.viewName}};return{element:a,applyRaw:s,getRaw:f,getPalette:()=>F(l.pal),setPaletteColors(e){l.pal=eD(ex(l.pal.id),M(e)),u()},tick(e){if(!l.anim)return;let{P:t}=l;i.advance(e,T(t,"uSpeed"),T(t,"uHold"))&&u()},resize:()=>s(f()),destroy(){c(),n.target.release(),n.painter.release()}}},dial:ep,pixelated:!0}],["orb",{create:function(e){let t=eg(e.gpu),a=document.createElement("canvas"),o=b(a),n={P:Object.fromEntries(e_.map(e=>[e.key,e.default])),palette:ev[0],seed:1024,mode:0,qMode:0,xray:0,noYellow:1,anim:!1,resW:1200,expFps:24,expDur:4},l=em(e.frameDue),i=()=>v(a,n.P,n.resW,e.worldId,e.maxDimension),u=()=>{i();let e=l.at(T(n.P,"uHold")),{width:r,height:u}=a;t.render(o,r,u,a=>(function(e,t,r){let a=e.program("orb",eU,eV),o=e.uniforms(a),n=(e,r)=>t.uniform1f(o(e),r);for(let l of(t.useProgram(a),e.bindFullscreenTriangle(a,"a"),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.uniform2f(o("uRes"),r.width,r.height),n("uSeed",r.seed%1e4*.0137),eQ))n(l,Number(r.P[l]));n("uTime",r.time),n("uMode",r.mode),n("uQMode",r.qMode),n("uXray",r.xray),n("uNoYellow",r.noYellow);let{colors:l,count:i}=function(e){let t=eF(e),r=new Float32Array(12);for(let e=0;e<4;e++)r.set(ey(t[e%t.length]),3*e);return{colors:r,count:Math.min(t.length,4)}}(r.palette);n("uPalOn",1),n("uPalN",i),n("uBackgroundTransparent",+!!r.palette.transparent),t.uniform3fv(o("uBg"),ey(r.palette.background)),t.uniform3fv(o("uPal[0]"),l),n("uPremultiply",1),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,null),t.uniform1i(o("uPlate"),0),n("uPlateOn",0),n("uPlateInvert",0),t.drawArrays(t.TRIANGLES,0,3)})(t,a,{...n,time:e,width:r,height:u}))},s=D(a,{start:e=>({x:e.clientX,y:e.clientY,turn:Number(n.P.uRotY),pitch:Number(n.P.uRotX)}),move(e,t){let r=a.getBoundingClientRect().width||1,{P:o}=n;o.uRotY=eH("uRotY",t.turn+(e.clientX-t.x)/r*4),o.uRotX=eH("uRotX",t.pitch+(e.clientY-t.y)/r*2.4),n.anim||u()}});i();let c={element:a,applyRaw(e){let{resized:t,toggled:a}=function(e,t){let a,o=(a=t.customPalette,(0,r.F)(a)?a:null);if(eJ(t,"pal")){let r=t.pal;e.palette=eS(null==r?null:ex(r),o,0)}else null!==t.palIndex&&void 0!==t.palIndex?e.palette=eS(t.palIndex,o,0):eJ(t,"customPalette")&&(e.palette=eS(ex(e.palette.id),o,0));t.P&&Object.assign(e.P,t.P),null!=t.seed&&(e.seed=0|Number(t.seed)),null!=t.mode&&(e.mode=0|Number(t.mode)),null!=t.qMode&&(e.qMode=0|Number(t.qMode)),null!=t.xray&&(e.xray=+!!t.xray),null!=t.noYellow&&(e.noYellow=+!!t.noYellow);let n=!!t.resW&&t.resW!==e.resW;n&&(e.resW=0|Number(t.resW)),null!=t.expFps&&(e.expFps=0|Number(t.expFps)),null!=t.expDur&&(e.expDur=0|Number(t.expDur));let l=null!=t.anim&&!!t.anim!==e.anim;return l&&(e.anim=!!t.anim),{resized:n,toggled:l}}(n,e);t&&i(),e.P&&null!==e.P.uHold&&void 0!==e.P.uHold&&l.invalidate(),a&&n.anim&&l.restart(),n.anim||u()},getRaw:()=>(function(e){let{palette:t}=e;return{P:{...e.P},pal:t.id,customPalette:M(w(t)),palIndex:ex(t.id),seed:e.seed,mode:e.mode,qMode:e.qMode,xray:e.xray,noYellow:e.noYellow,anim:e.anim,resW:e.resW,expFps:e.expFps,expDur:e.expDur}})(n),getPalette:()=>F(n.palette),setPaletteColors(e){n.palette=eS(ex(n.palette.id),e,0),u()},tick(e){if(!n.anim)return;let{P:t}=n;l.advance(e,T(t,"uSpeed"),T(t,"uHold"))&&u()},resize:()=>c.applyRaw(c.getRaw()),destroy:s};return c},dial:eW,pixelated:!0}],["portal",{create:function(e){var t;let a=eg(e.gpu),o=document.createElement("canvas"),n=b(o),l=ew(a,{filter:"nearest",unit:1}),i=Object.fromEntries(Object.entries(tl).map(([e,t])=>[e,t.def])),u=1024,s=1200,c=0,f=24,d=4,p=ev[tt],m=!0,h=em(e.frameDue),g=(e,t)=>{p=eS(e,t,tt)},x=()=>v(o,i,s,e.worldId,e.maxDimension),F=()=>{x();let e=h.at(T(i,"uHold")),t={width:o.width,height:o.height,time:e,P:i,seed:u,qMode:c,palette:p};a.render(n,t.width,t.height,()=>{var e;let r;return(e=a.gl).disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),r=l.bind(t.width,t.height),void(!function(e,t){let{gl:r}=e,a=e.program("portal:portal",ta,to),o=e.uniforms(a),n=tr(t.palette);for(let n of(r.viewport(0,0,t.width,t.height),r.useProgram(a),e.bindFullscreenTriangle(a,"a"),r.uniform2f(o("uRes"),t.width,t.height),r.uniform1f(o("uTime"),t.time),ti))r.uniform1f(o(n),T(t.P,n));r.uniform1f(o("uPalN"),n.count),r.uniform1f(o("uBackgroundTransparent"),+!!t.palette.transparent),r.uniform3fv(o("uBg"),n.background),r.uniform3fv(o("uPal[0]"),n.colors),r.drawArrays(r.TRIANGLES,0,3)}(a,t),function(e,t,r){let{gl:a}=e,o=e.program("portal:shift",ta,tn),n=e.uniforms(o),l=tr(t.palette);for(let l of(a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,t.width,t.height),a.useProgram(o),e.bindFullscreenTriangle(o,"a"),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,r),a.uniform1i(n("uScene"),1),a.uniform1i(n("uPlate"),1),a.uniform1f(n("uPremultiply"),1),a.uniform2f(n("uRes"),t.width,t.height),a.uniform1f(n("uSeed"),t.seed%1e4*.0137),tu))a.uniform1f(n(l),T(t.P,l));for(let e of(a.uniform1f(n("uQMode"),t.qMode),a.uniform1f(n("uPalOn"),1),a.uniform1f(n("uPalN"),l.count),a.uniform1f(n("uBackgroundTransparent"),+!!t.palette.transparent),a.uniform3fv(n("uBg"),l.background),a.uniform3fv(n("uPal[0]"),l.colors),tc))a.uniform1f(n(e),0);a.uniform2f(n("uPlateRes"),0,0),a.drawArrays(a.TRIANGLES,0,3)}(a,t,r))})},S=(t={pan:()=>({x:Number(i.uPanX),y:Number(i.uPanY)}),look(e,t){i.uPanX=ts("uPanX",e),i.uPanY=ts("uPanY",t),m||F()}},D(o,{start:e=>({x:e.clientX,y:e.clientY,pan:t.pan()}),move(e,r){let a=o.getBoundingClientRect().width||1;t.look(r.pan.x+(e.clientX-r.x)/a*2,r.pan.y-(e.clientY-r.y)/a*2)}}));return x(),{element:o,applyRaw(e){let t,a;t=e.customPalette,a=(0,r.F)(t)?t:null,Object.hasOwn(e,"pal")?g(null==e.pal?null:ex(e.pal),a):null!=e.palIndex?g(e.palIndex,a):Object.hasOwn(e,"customPalette")&&g(ex(p.id),a),Object.assign(i,e.P),null!=e.seed&&(u=0|Number(e.seed)),null!=e.qMode&&(c=0|Number(e.qMode)),e.resW&&e.resW!==s&&(s=0|Number(e.resW),x()),null!=e.expFps&&(f=0|Number(e.expFps)),null!=e.expDur&&(d=0|Number(e.expDur)),null!=e.P.uHold&&h.invalidate(),null!=e.anim&&!!e.anim!==m&&(m=!!e.anim)&&h.restart(),m||F()},getRaw:()=>({P:{...i},pal:p.id,customPalette:M(w(p)),palIndex:ex(p.id),seed:u,qMode:c,anim:m,resW:s,expFps:f,expDur:d}),getPalette:()=>y({background:p.background,colors:p.marks,transparent:p.transparent}),setPaletteColors(e){g(ex(p.id),e),F()},tick(e){m&&h.advance(e,T(i,"uSpeed"),T(i,"uHold"))&&F()},resize(){},destroy(){S(),l.release()}}},dial:te,pixelated:!0}],["graph",{create:function(e){let t,a,o,n,l=document.createElement("canvas"),i=b(l),u=(t={nodes:[],edges:[]},a="",o=[],n="",{graph(e,r){let o=[e,r.nodes,r.clusters,r.depth,r.branching,r.spread,r.radius,r.crosslinks,r.hub].join("|");return o!==a&&(t=function(e,t){let r={rand:ee(e),t,nodes:[],edges:[],groups:[]},a=Math.round(t.nodes),o=Math.round(t.clusters);for(!function(e,t){let{rand:r,t:a,nodes:o,edges:n,groups:l}=e;o.push({id:0,cluster:0,level:0,x:0,y:0,z:0,parent:-1,value:r()});for(let e=0;e<t;e++){let t=et(r),i=a.radius*Math.min(.92,.42+.32*r()+.15*a.hub),u={id:o.length,cluster:e,level:0,x:t[0]*i,y:t[1]*i,z:t[2]*i,parent:-1,value:r()};o.push(u),l.push([u.id]),a.hub>.02&&n.push({a:0,b:u.id,cross:!0})}}(r,o);r.nodes.length<a;)!function(e,t){let{rand:r,t:a,nodes:o,edges:n,groups:l}=e,i=(o.length-1-t)%t,u=l[i],s=function(e,t){let{rand:r,t:a,nodes:o}=e,n=o[t[Math.floor(Math.pow(r(),Math.max(1,.65*a.branching))*t.length)]];for(let e=0;e<8&&n.level>=a.depth;e++)n=o[t[Math.floor(r()*t.length)]];return n.level>=a.depth?o[t[0]]:n}(e,u),c=et(r),f=et(r),d=f[0]*c[0]+f[1]*c[1]+f[2]*c[2],p=f[0]-c[0]*d,m=f[1]-c[1]*d,h=f[2]-c[2]*d,g=Math.hypot(p,m,h)||1;p/=g,m/=g,h/=g;let b=a.spread*(.42+.9*r())*(1-s.level/Math.max(1,a.depth)*.55),v=s.x+p*b+c[0]*(r()-.46)*b*.45,x=s.y+m*b+c[1]*(r()-.46)*b*.45,y=s.z+h*b+c[2]*(r()-.46)*b*.45,F=Math.hypot(v,x,y),S=.96*a.radius;F>S&&(v=v/F*S,x=x/F*S,y=y/F*S);let w={id:o.length,cluster:i,level:Math.min(a.depth,s.level+1),x:v,y:x,z:y,parent:s.id,value:r()};o.push(w),u.push(w.id),n.push({a:s.id,b:w.id,cross:!1})}(r,o);return!function(e){let{rand:t,t:r,nodes:a,edges:o,groups:n}=e,l=Math.floor(a.length*r.crosslinks);for(let e=0;e<l;e++){let e=Math.floor(t()*a.length),r=.72>t(),l=r?n[a[e].cluster]:null,i=r&&l?l[Math.floor(t()*l.length)]:Math.floor(t()*a.length);e!==i&&o.push({a:e,b:i,cross:!0})}for(let e=1;e<a.length;e++)t()<.18*r.hub&&o.push({a:0,b:e,cross:!0})}(r),{nodes:r.nodes,edges:r.edges}}(e,r),a=o),t},ratios(e,r){let l=`${a}|${r.join("|")}`;return l!==n&&(o=function(e,t,r){let a=e.map(e=>e*t),o=a.map(Math.floor),n=t-o.reduce((e,t)=>e+t,0),l=[0,1,2,3].sort((e,t)=>a[t]-o[t]-(a[e]-o[e]));for(let e=0;e<n;e++)o[l[e%4]]++;let i=[];o.forEach((e,t)=>{for(let r=0;r<e;r++)i.push(t)});let u=ee(0x6d2b79f5^r);for(let e=i.length-1;e>0;e--){let t=Math.floor(u()*(e+1));[i[e],i[t]]=[i[t],i[e]]}return i}(r,t.nodes.length,e),n=l),o}}),s={...eu,backgroundTransparent:!1,background:es.background,colors:[...es.colors],colorRatios:[...ei]},c=606,f={},d=0,p=performance.now();function m(){var t,r;let a,o,n,p,m,{width:h,height:b}=g(l,e.pixelRatio,e.maxDimension);(l.width!==h||l.height!==b)&&(l.width=h,l.height=b);let v=(t=s,a=e=>R(t[e]),o=e=>!!t[e],{nodes:a("nodes"),clusters:a("clusters"),depth:a("depth"),branching:a("branching"),spread:a("spread"),crosslinks:a("crosslinks"),hub:a("hub"),radius:a("radius"),perspective:a("perspective"),distance:a("distance"),shell:o("shell"),showGuides:o("showGuides"),guides:a("guides"),guideTilt:a("guideTilt"),guideRoughness:a("guideRoughness"),guideWidth:a("guideWidth"),shape:t.shape,size:a("size"),variation:a("variation"),depthScale:a("depthScale"),connections:o("connections"),edgeOpacity:a("edgeOpacity"),edgeWidth:a("edgeWidth"),lineRoughness:a("lineRoughness"),lineRoundness:R(t.lineRoundness??.65),dash:a("dash"),dashGap:a("dashGap"),colorMode:t.colorMode,pitch:a("pitch"),turn:a("turn"),zoom:a("zoom"),drift:a("drift"),backgroundTransparent:o("backgroundTransparent"),background:t.background,colors:t.colors}),x=u.graph(c,v);!function(e,t,r,a){let{P:o}=a,n=Math.min(t,r)/800;if(e.clearRect(0,0,t,r),!o.backgroundTransparent){let a=eo(o.background);a&&(e.fillStyle=a),e.fillRect(0,0,t,r)}!function(e,t,r,a,o){let{P:n,scene:l}=t;e.save();let i=eo(n.colors[2]);i&&(e.strokeStyle=i),e.globalAlpha=.42,en(e,n,Math.max(.1,n.guideWidth*o),o),n.showGuides&&l.guides.forEach((r,a)=>{e.beginPath(),ea(e,function(e,t,r,a,o){if(a<=0)return e;let n=8*a*r;return e.map((r,a)=>{if(0===a||a===e.length-1)return r;let l=e[a-1],i=e[a+1],u=i.x-l.x,s=i.y-l.y,c=Math.hypot(u,s)||1,f=er(o+317*t+53*a)*n;return{x:r.x-s/c*f,y:r.y+u/c*f}})}(r,a,o,n.guideRoughness,t.seed),n.lineRoundness),e.stroke()}),n.shell&&(e.beginPath(),e.arc(.5*r,.5*a,l.radius,0,2*Math.PI),e.stroke()),e.restore()}(e,a,t,r,n),o.connections&&function(e,t,r){let{P:a,scene:o}=t;e.save();let n=eo(a.colors[0]);n&&(e.strokeStyle=n),e.globalAlpha=a.edgeOpacity,en(e,a,Math.max(.3,a.edgeWidth*r),r),e.beginPath(),t.graph.edges.forEach((n,l)=>{ea(e,function(e,t,r,a,o,n){if(o<=0)return[e,t];let l=t.x-e.x,i=t.y-e.y,u=Math.hypot(l,i)||1,s=-i/u,c=l/u,f=14*o*a,d=[e];for(let t=1;t<4;t++){let a=t/4,o=er(n+17*r+101*t)*f*Math.sin(a*Math.PI);d.push({x:e.x+l*a+s*o,y:e.y+i*a+c*o})}return d.push(t),d}(o.points[n.a],o.points[n.b],l,r,a.lineRoughness,t.seed),a.lineRoundness)}),e.stroke(),e.restore()}(e,a,n),a.scene.points.slice().sort((e,t)=>e.z-t.z).forEach(t=>(function(e,t,r){let{P:a}=t,{size:o}=r,n=eo(function(e,t,r,a){if(Object.hasOwn(r,e.id)){let a=r[e.id];return 4===a?t.background:t.colors[R(a)%4]}return"cluster"===t.colorMode?t.colors[e.cluster%4]:"random"===t.colorMode?t.colors[Math.floor(4*e.value)%4]:"ratio"===t.colorMode?t.colors[a[e.id]??0]:t.colors[Math.floor(e.level/Math.max(1,t.depth+1)*4)%4]}(r.node,a,t.paint,t.ratios));n&&(e.fillStyle=n),"dot"===a.shape?(e.beginPath(),e.arc(r.x,r.y,.55*o,0,2*Math.PI),e.fill()):"cross"===a.shape?(e.fillRect(r.x-.65*o,r.y-.16*o,1.3*o,.32*o),e.fillRect(r.x-.16*o,r.y-.65*o,.32*o,1.3*o)):e.fillRect(r.x-.5*o,r.y-.5*o,o,o)})(e,a,t))}(i,h,b,{P:v,seed:c,paint:f,graph:x,scene:(r=d,n=v.turn+r,p=v.pitch+Math.sin(.31*r)*v.drift,m={P:v,cy:Math.cos(n),sy:Math.sin(n),cx:Math.cos(p),sx:Math.sin(p),w:h,h:b},{points:x.nodes.map(e=>(function(e,t){let{P:r,w:a,h:o}=e,n=ef(e,t.x,t.y,t.z),l=Math.max(.45,r.size*(1+(t.value-.5)*r.variation)*(1+n.z/r.radius*r.depthScale*.5)*Math.min(a,o)/800);return{...n,size:l,node:t}})(m,e)),guides:function(e){let{P:t}=e,r=[];for(let a=0;a<Math.round(t.guides);a++){let o=[],n=t.guideTilt+a*Math.PI/Math.max(1,t.guides);for(let r=0;r<=96;r++){let a=r/96*Math.PI*2,l=Math.cos(a)*t.radius,i=Math.sin(a)*t.radius;o.push(ef(e,l,i*Math.sin(n),i*Math.cos(n)))}r.push(o)}return r}(m),radius:v.radius*Math.min(h,b)*.88*v.zoom*v.perspective/v.distance}),ratios:"ratio"===v.colorMode?u.ratios(c,ec(s).normalized):[]})}function h(){return{seed:c,P:{...s,colors:[...s.colors],colorRatios:ec(s).values},paint:{...f}}}function v(e){if((0,r.F)(e.P)){var t;c=parseInt(String(e.seed),10)||c,s=function(e,t){let r={...e};t.background&&t.colors&&(r.backgroundTransparent=!!t.backgroundTransparent);let{colors:a,colorRatios:o}=t,n={...r,...t,colors:Array.isArray(a)?a.slice(0,4):r.colors,colorRatios:Array.isArray(o)?o.slice(0,4):r.colorRatios};return n.nodes=Math.round(Math.max(100,Math.min(4e3,R(n.nodes)||1400))),n.clusters=Math.round(R(n.clusters)),n.depth=Math.round(R(n.depth)),n.guides=Math.round(R(n.guides)),n.resolution=R(n.resolution)||1200,{...n,...H(n)}}(s,e.P),e.paint&&"object"==typeof e.paint&&(t=e.paint,f=(0,r.F)(t)?{...t}:Array.isArray(t)?Object.fromEntries(t.map((e,t)=>[String(t),e])):{}),m()}}let x=D(l,{start:e=>({x:e.clientX,y:e.clientY,pitch:R(s.pitch),turn:R(s.turn)}),move(e,t){s.turn=t.turn+(e.clientX-t.x)*.006,s.pitch=Math.max(-1.5,Math.min(1.5,t.pitch+(e.clientY-t.y)*.006)),m()}}),F=()=>{s.pitch=-.18,s.turn=.35,s.zoom=1,d=0,m()};return l.addEventListener("dblclick",F),m(),{element:l,applyRaw:v,getRaw:h,getPalette:()=>y(h().P),setPaletteColors(e){v({P:{background:e.background,colors:e.colors,backgroundTransparent:!!e.transparent}})},tick(t){let r=Math.min(.05,(t-p)/1e3);p=t,s.animate&&(d+=r*R(s.speed),e.frameDue("native",t)&&m())},resize:m,destroy(){x(),l.removeEventListener("dblclick",F)}}},dial:{config:U,toDial:function(e){let{P:t}=e,r=H(t);return{seed:String(e.seed??606),topology:V({nodes:t.nodes,clusters:t.clusters,depth:t.depth,branching:t.branching,spread:t.spread,crosslinks:t.crosslinks,hub:t.hub}),sphere:V({radius:t.radius,perspective:t.perspective,distance:t.distance,shell:!!t.shell,showGuides:!1!==t.showGuides,guides:t.guides,guideTilt:t.guideTilt,guideRoughness:t.guideRoughness,guideStrokeSize:t.guideWidth}),pixels:V({shape:t.shape,nodeThickness:t.size,variation:t.variation,depthScale:t.depthScale,colorMode:t.colorMode}),lines:V({connections:!1!==t.connections,opacity:t.edgeOpacity,width:t.edgeWidth,roughness:t.lineRoughness,roughRoundness:t.lineRoundness??.65,dash:t.dash,dashGap:t.dashGap}),edit:V({enabled:!!t.editEnabled,brush:t.brush,paintColor:String(t.paintColor??0)}),camera:V({pitch:t.pitch,turn:t.turn,zoom:t.zoom}),motion:V({animate:!!t.animate,speed:t.speed,drift:t.drift}),output:{resolution:String(t.resolution||1200),timing:r.exportMode,duration:Q(r.exportDuration),cycles:Q(r.exportCycles),fps:String(r.exportFps)}}},fromDial:function(e,t){let r,a,o,n,l,i=J(e,"topology"),u=J(e,"sphere"),s=J(e,"pixels"),c=J(e,"lines"),f=J(e,"edit"),d=J(e,"camera"),p=J(e,"motion");return{seed:parseInt(String(e.seed),10)||0,P:{...V({nodes:i.nodes,clusters:i.clusters,depth:i.depth,branching:i.branching,spread:i.spread,crosslinks:i.crosslinks,hub:i.hub,radius:u.radius,perspective:u.perspective,distance:u.distance,shell:!!u.shell,showGuides:!!u.showGuides,guides:u.guides,guideTilt:u.guideTilt,guideRoughness:u.guideRoughness,guideWidth:u.guideStrokeSize,shape:s.shape,size:s.nodeThickness,variation:s.variation,depthScale:s.depthScale,colorMode:s.colorMode,connections:!!c.connections,edgeOpacity:c.opacity,edgeWidth:c.width,lineRoughness:c.roughness,lineRoundness:c.roughRoundness,dash:c.dash,dashGap:c.dashGap,editEnabled:!!f.enabled,brush:f.brush,paintColor:Number(f.paintColor),pitch:d.pitch,turn:d.turn,zoom:d.zoom,animate:!!p.animate,speed:p.speed,drift:p.drift,resolution:Number(J(e,"output").resolution)}),...(r=J(e,"output"),a=H(t.P),o=K(r.duration),n=K(r.cycles),(l=r.timing)===a.exportMode&&(Z(o,a.exportDuration)?l="duration":Z(n,a.exportCycles)&&(l="cycles")),H(V({speed:J(e,"motion").speed,exportMode:l,exportFps:Number(r.fps),exportDuration:Z(o,a.exportDuration)?o:a.exportDuration,exportCycles:Z(n,a.exportCycles)?n:a.exportCycles})))}}}}}],["rings",{create:function(e){var t,a;let o,n,l,i,u,s,c,f,d=`rings${++tU}-`,p=document.createElementNS("http://www.w3.org/2000/svg","svg");p.style.isolation="isolate";let m=(t=e.gpu,(o=document.createElement("canvas")).width=96,o.height=96,n=o.getContext("2d"),l=!!(t&&n),i="",u="",s=0,{invalidate(){u=""},get(e){if(!t||!n||!l)return"";let r=performance.now(),{look:a}=e,c=[e.style,a.id,JSON.stringify(a.params),a.colors.join(","),a.background,e.tiltKey,t.generation].join("|");if(c===u&&(!e.moving||r-s<125))return i;u=c,s=r;try{t.render(n,96,96,()=>(function(e,t){let{gl:r}=e,a=e.program("rings:orb",tD,tz),o=e.uniforms(a),{look:n}=t;for(let l of(r.disable(r.BLEND),r.disable(r.DEPTH_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SCISSOR_TEST),r.disable(r.CULL_FACE),r.colorMask(!0,!0,!0,!0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,96,96),r.useProgram(a),e.bindFullscreenTriangle(a,"a"),r.uniform2f(o("uRes"),96,96),r.uniform1f(o("uTime"),t.time),tB))r.uniform1f(o(l),T(n.params,l));r.uniform1f(o("uTilt"),t.tilt),r.uniform1f(o("uPalN"),4),r.uniform1i(o("uStyle"),Math.max(0,tP.indexOf(t.style))),r.uniform3fv(o("uBg"),new Float32Array(tN(n.background))),r.uniform3fv(o("uPal[0]"),new Float32Array(n.colors.flatMap(tN))),r.drawArrays(r.TRIANGLES,0,3)})(t,e))}catch{return l=!1,""}return i=o.toDataURL("image/png")}}),g=tR(),b=null,v={phase:0,orbPhase:0},x=performance.now(),F=()=>b?function(e){let{params:t,colors:a}=e;return{id:e.id??null,params:(0,r.F)(t)?t:{},background:e.background??null,colors:Array.isArray(a)?a:[]}}(b):function(e){let t=e||"active",r=tY.find(e=>"active"!==t&&e.id===t)??tY[0],a=ev[ex(r.pal)??0],{marks:o}=a;return{id:"active"===t?tL(tY[0]):`${String(t)}|${tL(r)}`,params:{...tX,...r.P},background:a.background,colors:Array.from({length:4},(e,t)=>o[t%o.length])}}(g.portalPreset);function S(){var t,r;let a,o,n=h(g.aspectRatio,e.worldId),l=2*Math.max(1,n),i=2*Math.max(1,1/n);p.setAttribute("viewBox",[-l/2,-i/2,l,i].join(" ")),p.innerHTML=function(e,t,r,a,o){var n,l;let i,u=function(e,t){let r,a=Math.round(A(R(e.rings),1,16)),o=Math.round(A(R(e.concentric),1,8));return{shape:{spread:R(e.spread),ringDistance:R(e.ringDistance),roughness:R(e.roughness),roughnessX:R(e.roughnessX),roughnessY:R(e.roughnessY),turn:R(e.turn),pitch:R(e.pitch),roll:R(e.roll),perspective:R(e.perspective),oval:R(e.oval)},colors:tk.map((t,r)=>tA(e.colors[r],t)),count:a,nested:o,spacing:R(e.spacing),radius:R(e.radius),stroke:R(e.stroke).toFixed(4),opacity:R(e.opacity).toFixed(3),blend:((r=parseInt(tA(e.background,"#ffffff").slice(1),16))>>16)*.299+(r>>8&255)*.587+(255&r)*.114<105?"screen":"multiply",concentricMotion:!!e.concentricMotion,concentricSpeed:R(e.concentricSpeed),orbs:e.orbsEnabled?{shader:tC(e),perRing:Math.max(1,Math.min(Math.round(A(R(e.orbsPerRing),1,6)),Math.floor(160/(a*o)))),size:R(e.orbSize),texture:t}:null}}(e,a),s=a?`<pattern id="${o}orb-shader-actual" patternUnits="objectBoundingBox" patternContentUnits="objectBoundingBox" width="1" height="1"><image href="${a}" x="0" y="0" width="1" height="1" preserveAspectRatio="xMidYMid slice"/></pattern>`:"",c=`<defs>${(n=u.colors,l=tH(e,t.phase),(i=e=>n.map((t,r)=>e(r,t,n[(r+1)%4],l,o)).join(""))(tI)+i(tG))}${s}</defs>`,f=e.backgroundTransparent?"none":tA(e.background,"#ffffff"),{vw:d,vh:p}=r;return c+`<rect x="${-d/2}" y="${-p/2}" width="${d}" height="${p}" fill="${f}"/>`+function(e,t,r){let{shape:a,count:o,nested:n,orbs:l}=e,i=[],u=[];for(let s=n-1;s>=0;s--){let c=(s-(n-1)/2)*e.spacing,f=A(e.radius+c,.08,.96),d=1===n?0:(s-(n-1)/2)/((n-1)/2),p=e.concentricMotion?t.phase*(1+d*e.concentricSpeed):t.phase;for(let n=0;n<o;n++){let c=function(e,t,r,a){let o=e<4?tW[e]:[Math.acos(A(1-e/Math.max(1,t-1)*2,-1,1)),2.399963229728653*e],n=1===t?0:(e-(t-1)/2)/((t-1)/2),l=1.61803398875*e+2.41421356237*r,i=tq([0,0,1],o[0]*a);return i=t$(i,o[1]*a),{o,distanceIndex:n,roughSeed:l,normal:i}}(n,o,s,a.spread);if(i.push(`<path d="${function(e,t,r,a){let o="";for(let n=0;n<=112;n++){let l=tj(e,t,r,n/112*Math.PI*2,a);o+=(n?"L":"M")+l.x.toFixed(4)+" "+l.y.toFixed(4)}return o+"Z"}(a,c,f,p)}" fill="none" stroke="${e.colors[n%4]}" stroke-width="${e.stroke}" stroke-linecap="round" stroke-linejoin="round" opacity="${e.opacity}" style="mix-blend-mode:${e.blend}"/>`),l)for(let e=0;e<l.perRing;e++){let o=tj(a,c,f,e/l.perRing*Math.PI*2+1.713*n+.821*s+t.orbPhase,p);u.push(function(e,t,r,a){let{shader:o,texture:n}=e,l=A(.58+(t.z+.8)*.25,.38,1).toFixed(3),i=e.size*t.q,u=i.toFixed(4),s=t.x.toFixed(4),c=t.y.toFixed(4),f=`url(#${a}orb-gradient-${r%4})`;if("gloss"===o&&!n)return`<circle cx="${s}" cy="${c}" r="${u}" fill="${f}" opacity="${l}"/>`;let d=n?"shader-actual":`${o}-${r%4}`,p=n?t_.get(o)??.08:tQ.get(o)??.24,m="";return"bubble"===o?m=`<circle cx="${s}" cy="${c}" r="${(.91*i).toFixed(4)}" fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width="${(.055*i).toFixed(4)}" pointer-events="none"/>`:"bloom"===o&&(m=`<circle cx="${s}" cy="${c}" r="${(.82*i).toFixed(4)}" fill="none" stroke="#ffffff" stroke-opacity=".2" stroke-width="${(.04*i).toFixed(4)}" pointer-events="none"/>`),`<g opacity="${l}"><circle cx="${s}" cy="${c}" r="${u}" fill="url(#${a}orb-${d})"/><circle cx="${s}" cy="${c}" r="${u}" fill="${f}" opacity="${p}" pointer-events="none"/>${m}</g>`}(l,o,n,r))}}}return i.join("")+u.join("")}(u,t,o)}(g,v,{vw:l,vh:i},g.orbsEnabled?(a=tC(g),o=tH(g,v.phase),m.get({style:a,look:"portal"===a?F():{id:"rings",params:(t=o.twist,r=o.detail,{...tX,uTwist:t,uWarp:r}),colors:g.colors,background:g.background},tilt:o.tilt,tiltKey:g.orbTilt,time:v.orbPhase,moving:!!(g.orbMotion||g.animate)})):"",d)}function w(){return{P:{...g,colors:[...g.colors]},..."portal"===g.orbShader?{portalSnapshot:b??F()}:{}}}function M(e){var t;if(!(0,r.F)(e.P))return;let a=(t=e.portalSnapshot,(0,r.F)(t)&&t.params?t:null);a&&(b=a,m.invalidate()),g=function(e,t,r){let a={...e};t.background&&t.colors&&(a.backgroundTransparent=!!t.backgroundTransparent);let o={...a,...t,colors:Array.isArray(t.colors)?t.colors.slice(0,4):[...a.colors]};for(;o.colors.length<4;)o.colors.push(tk[o.colors.length]);return o.rings=Math.round(A(Number(o.rings)||4,1,16)),o.concentric=Math.round(A(Number(o.concentric)||1,1,8)),o.orbsPerRing=Math.round(A(Number(o.orbsPerRing)||1,1,6)),o.orbShader=tC(o),"active"===o.portalPreset||r(o.portalPreset)||(o.portalPreset="active"),o.portalPreset!==e.portalPreset&&(o.orbShader="portal"),o.orbDetail=A(Number(o.orbDetail)||2,.5,5),o.resolution=Number(o.resolution)||1200,o.exportCycles=Math.round(A(Number(o.exportCycles)||1,1,10)),o.exportFps=tE.includes(R(o.exportFps))?R(o.exportFps):24,o}(g,e.P,tO),S()}let P=(a={get:()=>({turn:R(g.turn),pitch:R(g.pitch)}),set(e,t){g.turn=e,g.pitch=t,S()},reset(){let e=tR();g.pitch=e.pitch,g.turn=e.turn,g.roll=e.roll,v.phase=0,v.orbPhase=0,S()}},c=D(p,{start:e=>({x:e.clientX,y:e.clientY,...a.get()}),move(e,t){a.set(t.turn+(e.clientX-t.x)*.009,A(t.pitch-(e.clientY-t.y)*.009,-Math.PI,Math.PI))}}),f=()=>a.reset(),p.addEventListener("dblclick",f),()=>{c(),p.removeEventListener("dblclick",f)});return S(),{element:p,applyRaw:M,getRaw:w,getPalette:()=>y(w().P),setPaletteColors(e){M({P:{background:e.background,colors:e.colors,backgroundTransparent:!!e.transparent}})},tick(t){let r=Math.min(.05,(t-x)/1e3);x=t,g.animate&&(v.phase+=r*R(g.speed)),g.orbMotion&&(v.orbPhase+=r*R(g.orbSpeed)),(g.animate||g.orbMotion)&&e.frameDue("native",t)&&S()},resize(){},destroy:P}},dial:tM}],["pulse",{create:function(e){let t,a,o=eg(e.gpu),n=document.createElement("canvas"),l=b(n),i={P:{rings:4,radius:.95,softness:.62,intensity:1,centerX:0,centerY:0,oval:1,orbCount:3,orbSpread:.55,sizeVariation:.22,merge:.5,diffusion:.55,phaseOffset:.65,warp:.04,grain:0,blur:.42,bloom:.18,twist:0,octaves:3,step:.05,density:1,exposure:1,bands:0,scatter:0,blend:1,burn:0,crush:0,animate:!0,speed:.05,pulse:0,travel:0,drift:.02,resolution:1200,backgroundTransparent:!1,background:tm,colors:[...th]},seed:505,expFps:24,expDur:4},u=new Float32Array(12),s=0,c=performance.now(),f=()=>{let{width:t,height:r}=g(n,e.pixelRatio,e.maxDimension);(n.width!==t||n.height!==r)&&(n.width=t,n.height=r);let{P:a,seed:c}=i;o.render(l,t,r,e=>(function(e,t,r){var a;let o=e.program("pulse",tv,tx),n=e.uniforms(o),{P:l}=r;for(let[a,i]of(t.useProgram(o),e.bindFullscreenTriangle(o,"a"),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.uniform2f(n("uRes"),r.width,r.height),t.uniform2f(n("uCenter"),tF(l,"centerX"),tF(l,"centerY")),t.uniform1f(n("uTime"),r.time),t.uniform1f(n("uSeed"),r.seed),ty))t.uniform1f(n(a),tF(l,i));t.uniform1f(n("uBackgroundTransparent"),+!!l.backgroundTransparent),t.uniform1f(n("uPremultiply"),1),t.uniform3fv(n("uBg"),tb(l.background)),a=r.palette,l.colors.forEach((e,t)=>a.set(tb(e),3*t)),t.uniform3fv(n("uPal[0]"),r.palette),t.drawArrays(t.TRIANGLES,0,3)})(o,e,{P:a,seed:c,time:s,width:t,height:r,palette:u}))},d=(t=D(n,{start:e=>({x:e.clientX,y:e.clientY,cx:Number(i.P.centerX),cy:Number(i.P.centerY)}),move(e,t){let{P:r}=i;r.centerX=tp(t.cx+(e.clientX-t.x)/n.clientWidth*2),r.centerY=tp(t.cy-(e.clientY-t.y)/n.clientHeight*2),f()}}),a=()=>{i.P.centerX=0,i.P.centerY=0,f()},n.addEventListener("dblclick",a),()=>{t(),n.removeEventListener("dblclick",a)});f();let p={element:n,applyRaw(e){if((0,r.F)(e.P)){if(i.P=function(e,t){let r={...e};t.background&&t.colors&&(r.backgroundTransparent=!!t.backgroundTransparent);let{colors:a}=t,o={...r,...t,colors:Array.isArray(a)?a.slice(0,4):r.colors};return o.rings=Math.round(A(Number(o.rings)||4,1,10)),o.orbCount=Math.round(A(Number(o.orbCount)||3,3,8)),o.resolution=Number(o.resolution)||1200,o}(i.P,e.P),null!=e.seed){let t=Math.round(Number(e.seed));i.seed=Number.isFinite(t)?Math.max(0,t):505}e.expFps&&(i.expFps=Math.max(1,Math.round(Number(e.expFps)))),e.expDur&&(i.expDur=Math.max(1,Number(e.expDur)))}f()},getRaw:()=>({P:{...i.P,colors:[...i.P.colors]},seed:i.seed,expFps:i.expFps,expDur:i.expDur}),getPalette:()=>y(i.P),setPaletteColors(e){p.applyRaw({P:{background:e.background,colors:e.colors,backgroundTransparent:!!e.transparent}})},tick(t){let r=Math.min(.05,(t-c)/1e3);c=t,i.P.animate&&(s+=r*Number(i.P.speed),e.frameDue("native",t)&&f())},resize:()=>p.applyRaw(p.getRaw()),destroy:d};return p},dial:td}],["orb7",{create:function(e){var t;let a,o,n=eg(e.gpu),l=document.createElement("canvas"),i=b(l),u=ew(n,{filter:"linear",unit:0}),s={P:{...e7},seed:1408,qMode:0,anim:!0,resW:1200,expFps:24,expDur:4,palIndex:e8,palLock:!1,customPalette:null},c=em(e.frameDue),f=()=>v(l,s.P,s.resW,e.worldId,e.maxDimension),d=()=>{f();let{P:e}=s,t={width:l.width,height:l.height,time:c.at(T(e,"frameHold")),P:e,seed:s.seed,qMode:s.qMode,palette:function(e,t,r){let a,o=S(e6(t),r),n=o.marks,l=new Float32Array(12);for(let e=0;e<4;e++)l.set(ey(n[Math.min(e,n.length-1)]||"#ffffff"),3*e);return{background:ey("white"===(a=e.backgroundMode||"palette")?"#ffffff":"black"===a||"transparent"===a?"#000000":"custom"===a?String(e.backgroundColor||"#000000"):o.background),colors:l,count:Math.min(4,n.length),transparent:"transparent"===e.backgroundMode}}(e,s.palIndex,s.customPalette)};n.render(i,t.width,t.height,()=>{var e;let r;return(e=n.gl).disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),r=u.bind(t.width,t.height),void(!function(e,t){let{gl:r}=e,a=e.program("orb7:orb",e0,e1),o=e.uniforms(a),{P:n}=t;for(let[l,i]of(r.viewport(0,0,t.width,t.height),r.useProgram(a),e.bindFullscreenTriangle(a,"a"),r.uniform2f(o("uRes"),t.width,t.height),r.uniform1f(o("uTime"),t.time),r.uniform1f(o("uSourceMatch"),+!!n.sourceMatch),e5))r.uniform1f(o(l),T(n,i));r.uniform3f(o("uRgb"),T(n,"phaseR"),T(n,"phaseG"),T(n,"phaseB")),r.drawArrays(r.TRIANGLES,0,3)}(n,t),function(e,t,r){let{gl:a}=e,o=e.program("orb7:post",e0,e2),n=e.uniforms(o),{P:l,palette:i}=t;for(let[i,u]of(a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,t.width,t.height),a.useProgram(o),e.bindFullscreenTriangle(o,"a"),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,r),a.uniform1i(n("uScene"),0),a.uniform1f(n("uPremultiply"),1),a.uniform1f(n("uSourceMatch"),+!!l.sourceMatch),a.uniform2f(n("uRes"),t.width,t.height),a.uniform1f(n("uSeed"),t.seed%1e4*.0137),a.uniform1f(n("uQMode"),t.qMode),e3))a.uniform1f(n(i),T(l,u));a.uniform1f(n("uStabilize"),+(!1!==l.stabilizeColors)),a.uniform1f(n("uPaletteGlow"),+(!1!==l.paletteGlow)),a.uniform1f(n("uPalN"),i.count),a.uniform1f(n("uTransparent"),+!!i.transparent),a.uniform3fv(n("uBg"),i.background),a.uniform3fv(n("uGlowColor"),ey(String(l.glowColor||"#99edff"))),a.uniform3fv(n("uPal[0]"),i.colors),a.drawArrays(a.TRIANGLES,0,3)}(n,t,r))})},p=(t=s.P,a=D(l,{start:e=>({x:e.clientX,y:e.clientY,lookX:Number(t.lookX),lookY:Number(t.lookY),orbitX:Number(t.orbitX),orbitY:Number(t.orbitY),moved:!1}),move(e,r){let a=l.getBoundingClientRect().width,o=e.clientX-r.x,n=e.clientY-r.y;Math.hypot(o,n)>3&&(r.moved=!0),!1!==t.orbitDrag?(t.orbitX=r.orbitX+o/a*6.28,t.orbitY=A(r.orbitY+n/a*3.14,-1.55,1.55)):(t.lookX=A(r.lookX+o/a*2,-2,2),t.lookY=A(r.lookY-n/a*2,-2,2)),d()},end(e,r,a){a&&(r.moved||(t.zoom=A(Number(t.zoom)*(e.shiftKey?.8:1.25),.25,4)),d())}}),o=e=>{e.preventDefault(),t.orbitX=0,t.orbitY=0,t.zoom=1.2,t.lookX=-.16,t.lookY=0,d()},l.addEventListener("dblclick",o),()=>{a(),l.removeEventListener("dblclick",o)});f();let m={element:l,applyRaw(e){(0,r.F)(e.P)&&Object.assign(s.P,e.P),null!=e.seed&&(s.seed=0|Number(e.seed)),null!=e.qMode&&(s.qMode=0|Number(e.qMode)),function(e,t){let a=t.pal?e4.findIndex(e=>e.id===t.pal):-1;if(a>=0)e.palIndex=a;else null!=t.palIndex&&(e.palIndex=Math.max(0,Math.min(e4.length-1,0|Number(t.palIndex))));if(Object.hasOwn(t,"customPalette")){let a;e.customPalette=y((a=t.customPalette,(0,r.F)(a)?a:null))}else(null!=t.pal||null!=t.palIndex)&&(e.customPalette=null)}(s,e),null!=e.palLock&&(s.palLock=!!e.palLock),e.expFps&&(s.expFps=0|Number(e.expFps)),e.expDur&&(s.expDur=0|Number(e.expDur)),e.resW&&e.resW!==s.resW&&(s.resW=0|Number(e.resW)),null!=e.anim&&(s.anim=!!e.anim),d(),c.restart()},getRaw:()=>({P:{...s.P},seed:s.seed,qMode:s.qMode,anim:s.anim,resW:s.resW,expFps:s.expFps,expDur:s.expDur,pal:e4[s.palIndex].id,palIndex:s.palIndex,palLock:s.palLock,customPalette:M(y(s.customPalette))}),getPalette:()=>{var e,t,r;let a,o,n,l;return e=s.P,t=s.palIndex,r=s.customPalette,a=e6(t),o=r??{background:a.background,colors:a.marks},n=e.backgroundMode,l=o.background,"white"===n?l="#ffffff":"custom"===n?l=String(e.backgroundColor):"black"===n&&(l="#000000"),{...o,background:l,transparent:"transparent"===n}},setPaletteColors(e,t){!function(e,t,r){let{P:a}=e;e.customPalette=y(t),-1===r&&(a.backgroundMode=t.transparent?"transparent":"custom",a.backgroundColor=t.background),a.sourceMatch=!1}(s,e,t),d()},tick(e){if(!s.anim)return;let{P:t}=s;c.advance(e,T(t,"speed"),T(t,"frameHold"))&&d()},resize:()=>m.applyRaw(m.getRaw()),destroy(){p(),u.release()}};return m},dial:eZ}],["spirograph",{create:function(e){let t=document.createElement("canvas"),a=b(t),o={...t8,background:t4.background,colors:[...t4.colors]},n=t9({}),l=0,u=performance.now();function s(){let r,n,u,s,c,f,d,{width:p,height:m}=g(t,e.pixelRatio,e.maxDimension);t.width!==p&&(t.width=p),t.height!==m&&(t.height=m);let h=(b=o,r=e=>R(b[e]),{flatView:!!b.flatView,roughness:r("roughness"),roughDetail:r("roughDetail"),roughRoundness:r("roughRoundness"),outerArm:r("outerArm"),middleArm:r("middleArm"),innerArm:r("innerArm"),outerRate:r("outerRate"),middleRate:r("middleRate"),innerRate:r("innerRate"),pitch:r("pitch"),turn:r("turn"),phase:r("phase"),rotation:r("rotation"),scale:r("scale"),stroke:r("stroke"),centerX:r("centerX"),centerY:r("centerY"),trail:r("trail"),mechanism:!!b.mechanism,backgroundTransparent:!!b.backgroundTransparent,background:b.background,colors:b.colors});var b,v,x=(v=l,n=.43*Math.min(p,m)*h.scale/(h.outerArm+h.middleArm+h.innerArm),u=(h.flatView?0:h.pitch)*Math.PI/180,s=(h.flatView?0:h.turn)*Math.PI/180,c=([e,t])=>{let[r,a]=i(e,t,h),o=-r*Math.sin(s),l=r*Math.cos(s),c=a*Math.cos(u)-o*Math.sin(u);return[p*(.5+h.centerX/2)+l*n,m*(.5+h.centerY/2)+c*n]},f=rt(h,v),d=[h.outerArm+h.middleArm+h.innerArm,h.middleArm+h.innerArm,h.innerArm].map((e,t)=>Array.from({length:257},(r,a)=>{let o=a/256*re;return c([f[t][0]+e*Math.cos(o),f[t][1]+e*Math.sin(o)])})),{segments:function(e,t,r){let a=Math.max(2400,180*Math.max(Math.abs(e.outerRate),Math.abs(e.middleRate),Math.abs(e.innerRate))),o=[],n=t-e.trail;for(let t=0;t<128;t++){let l=[],i=Math.max(2,Math.ceil(a*e.trail/128));for(let a=0;a<=i;a++)l.push(r(rt(e,n+e.trail*(t+a/i)/128)[3]));o.push({pts:l,color:function(e,t){let r=t/128*4,a=Math.floor(r),o=r-a,n=e[a%4],l=e[(a+1)%4],i=[1,3,5].map(e=>Math.round(rr(n,e)*(1-o)+rr(l,e)*o));return`rgb(${i.join(",")})`}(e.colors,t)})}return o}(h,v,c),centers:f.map(c),guides:d,line:h.stroke*Math.min(p,m)/1200});for(let{pts:e,color:t}of(a.clearRect(0,0,p,m),h.backgroundTransparent||(a.fillStyle=h.background,a.fillRect(0,0,p,m)),a.lineWidth=x.line,a.lineJoin="round",a.lineCap="round",x.segments))t3(a,e),a.strokeStyle=t,a.stroke();h.mechanism&&function(e,t){for(let r of(e.lineWidth=Math.max(1,t.line),e.strokeStyle="#ffffff99",t.guides))t3(e,r),e.stroke();for(let[r,a]of(e.strokeStyle="#ffff00",t3(e,t.centers),e.stroke(),e.fillStyle="#ffffff",t.centers))e.beginPath(),e.arc(r,a,Math.max(2,2*t.line),0,t5),e.fill()}(a,x)}function c(){return{P:{...o,colors:[...o.colors]},...n}}function f(e){(0,r.F)(e.P)&&(o=function(e,t){let r={...e,...t};for(let e of(t.background&&t.colors&&(r.backgroundTransparent=!!t.backgroundTransparent),tZ))for(let[t,a]of Object.entries(e))r[t]=function(e,t,r){if(!Array.isArray(t))return!!e;let[,a,o,n]=t.map(Number),l=Number(e),i=Number.isFinite(l)?Math.max(a,Math.min(o,l)):Number(t8[r]);return 1===n?Math.round(i):i}(r[t],a,t);let a=Array.isArray(r.colors)?r.colors:[],o=Number(r.resolution);return{...r,background:t7(r.background)?r.background:t4.background,colors:t4.colors.map((e,t)=>{let r=a[t];return t7(r)?r:e}),resolution:t6.includes(o)?o:1200}}(o,e.P),n=t9(e),s())}let d=z(t,()=>o,s),p=()=>{o.flatView=!0,o.pitch=0,o.turn=0,o.centerX=0,o.centerY=0,s()};return t.addEventListener("dblclick",p),s(),{element:t,applyRaw:f,getRaw:c,getPalette:()=>y(c().P),setPaletteColors(e){f({P:{background:e.background,colors:e.colors,backgroundTransparent:!!e.transparent}})},tick(t){let r=Math.min(.05,(t-u)/1e3);u=t,o.animate&&(l+=r*R(o.speed),e.frameDue("native",t)&&s())},resize:s,destroy(){d(),t.removeEventListener("dblclick",p)}}},dial:{config:{geometry:tV,camera:tJ,texture:a,color:{backgroundTransparent:!1,background:{type:"color",default:"#000000"},color1:{type:"color",default:"#adff00"},color2:{type:"color",default:"#ab77ff"},color3:{type:"color",default:"#99edff"},color4:{type:"color",default:"#f57ec3"}},motion:tK,output:{resolution:{type:"select",options:["200","400","600","1000","1200","1800","2400"],default:"1200"},fps:{type:"select",options:["24","30","60"],default:"24"},duration:[6,1,20,1],randomize:{type:"action"},savePng:{type:"action",label:"Save PNG"},saveSvg:{type:"action",label:"Download SVG"},copySvg:{type:"action",label:"Copy SVG"},saveMp4:{type:"action",label:"Save MP4"},saveGif:{type:"action",label:"Save GIF"},reset:{type:"action"}}},toDial:function(e){let{P:t}=e,r=Array.isArray(t.colors)?t.colors:[];return{geometry:t1(t,tV),camera:{flatView:!1!==t.flatView,pitch:t.pitch??0,turn:t.turn??0},texture:t1(t,a,{...o}),color:{backgroundTransparent:!!t.backgroundTransparent,...t0({background:t.background}),...Object.fromEntries(r.map((e,t)=>[`color${t+1}`,e]))},motion:t1(t,tK),output:{resolution:String(t.resolution),fps:String(e.expFps??24),duration:e.expDur??6}}},fromDial:function(e){let t=t2(e,"color"),r=t2(e,"output");return{P:{...t2(e,"geometry"),...t2(e,"texture"),...t2(e,"camera"),...t2(e,"motion"),background:t.background,backgroundTransparent:!!t.backgroundTransparent,colors:[t.color1,t.color2,t.color3,t.color4],resolution:Number(r.resolution)},expFps:Number(r.fps),expDur:Number(r.duration)}}}}],["blend",$]]);e.s(["f",0,function(e){return ra.get(e)}],874011),e.s(["f",0,function(e){let t=new Map;return(r,a)=>{let o=1e3/e(),n=t.get(r);return(void 0===n||!(a-n<o-.5))&&(t.set(r,void 0===n?a:n+Math.max(1,Math.floor((a-n+.5)/o))*o),!0)}}],923090);let ro=new Set,rn=0;function rl(e){for(let t of(rn=ro.size?requestAnimationFrame(rl):0,ro))try{t.callback(e)}catch(e){ro.delete(t),t.onError(e)}}e.s(["f",0,function(e,t){let r={callback:e,onError:t};return ro.add(r),rn||(rn=requestAnimationFrame(rl)),()=>{ro.delete(r),!ro.size&&rn&&(cancelAnimationFrame(rn),rn=0)}}],134135);let ri=(e,t,r)=>Math.min(r,Math.max(t,e)),ru=(e,t)=>t.split(".").reduce((e,t)=>(0,r.F)(e)?e[t]:void 0,e);function rs(e,t,a){let o=t.split("."),n=e;for(let e of o.slice(0,-1)){let t=n[e],a=(0,r.F)(t)?t:{};n[e]=a,n=a}n[o[o.length-1]]=a}let rc=(e,t,r,a)=>+ri(t.min+Math.round((e-t.min)/t.step)*t.step,r,a).toFixed(8);function rf(e,t,r){let a,o,n=new Map(t.map(e=>[e.path,e])),l={},i=(a=ri(r,0,1),o="pingpong"===e.mode?1-Math.abs(2*a-1):a,"smooth"===e.easing?o*o*(3-2*o):o);for(let t of e.tracks){let e=n.get(t.path);if(!e)continue;let r=t.from+(t.to-t.from)*i;rs(l,t.path,rc(r,e,e.min,e.max))}return l}e.s(["f",0,function(e,t,a){let o,n,l=function e(t,a=""){return Object.entries(t).flatMap(([t,o])=>{if("output"===t||t.startsWith("_"))return[];let n=a?`${a}.${t}`:t;if(Array.isArray(o)&&o.length>=3&&o.every(e=>"number"==typeof e&&Number.isFinite(e))){let[,e,t,r=.01]=o;return[{path:n,min:e,max:t,step:r}]}return(0,r.F)(o)&&!o.type?e(o,n):[]})}(e.dial.config),i=(o=new Map(l.map(e=>[e.path,e])),n=new Set,{tracks:(t?.tracks??[]).flatMap(e=>{let t=o.get(e.path);return!t||n.has(e.path)?[]:(n.add(e.path),[{path:e.path,...e.drag?{drag:!0}:{},from:ri(e.from,t.min,t.max),to:ri(e.to,t.min,t.max)}])}).slice(0,8),duration:t?ri(t.duration,.5,120):6,mode:t?.mode??"pingpong",easing:t?.easing??"smooth"});if(!i.tracks.length)return null;let u=t?ri(t.progress,0,1):0,s=t?.enabled===!0,c=!1,f=0,d=t=>{let a=e.getRaw(),o=e.dial.toDial(a),n=e.dial.fromDial(o,a),l=e.dial.fromDial(function e(t,a){let o={...t};for(let[n,l]of Object.entries(a)){let a=t[n];o[n]=(0,r.F)(l)?e((0,r.F)(a)?a:{},l):l}return o}(o,t),a);e.applyRaw({P:{},...function e(t,a){let o={};for(let[n,l]of Object.entries(a)){let a=t[n];JSON.stringify(l)!==JSON.stringify(a)&&(o[n]=(0,r.F)(l)?e((0,r.F)(a)?a:{},l):l)}return o}(n,l)})},p=null,m=e=>{e.preventDefault(),e.stopImmediatePropagation()},h=t=>{if(p||0!==t.button||!t.isPrimary||!i.tracks.some(e=>e.drag))return;let r=a.getBoundingClientRect().width;r&&(p={id:t.pointerId,x:t.clientX,width:r,values:e.dial.toDial(e.getRaw())},s=!1,m(t),a.setPointerCapture(t.pointerId))},g=e=>{p&&e.pointerId===p.id&&(m(e),d(function(e,t,r,a){let o={};for(let n of e.tracks.filter(e=>e.drag)){let e=t.find(e=>e.path===n.path);if(!e)continue;let l=Math.min(n.from,n.to),i=Math.max(n.from,n.to),u=ru(r,n.path),s=ri(("number"==typeof u&&Number.isFinite(u)?u:n.from)+a*(n.to-n.from),l,i);rs(o,n.path,rc(s,e,l,i))}return o}(i,l,p.values,(e.clientX-p.x)/p.width)))},b=e=>{if(!p||e.pointerId!==p.id)return;let{id:t}=p;p=null,m(e),a.hasPointerCapture(t)&&a.releasePointerCapture(t)},v={capture:!0};for(let e of(a.addEventListener("pointerdown",h,v),a.addEventListener("pointermove",g,v),["pointerup","pointercancel","lostpointercapture"]))a.addEventListener(e,b,v);return{setAllowed(e){e&&!c&&s&&d(rf(i,l,u)),c=e,f=0},tick(e,t){if(!c||!s)return;if(!f){f=e;return}if(e-f<1e3/Math.min(30,t)-.5)return;let r=Math.min(.1,(e-f)/1e3);f=e;let a=u+r/i.duration;"once"===i.mode?(u=Math.min(1,a),a>=1&&(s=!1)):u=a%1,d(rf(i,l,u))},destroy(){for(let e of(a.removeEventListener("pointerdown",h,v),a.removeEventListener("pointermove",g,v),["pointerup","pointercancel","lostpointercapture"]))a.removeEventListener(e,b,v)}}}],471598)},361387,e=>{var t=e.i(979175);e.s(["f",0,function(){let e=new Set,r=new Set,a=new Set,o=0,n=0,l=()=>{o=0;let l=[...r],i=(0,t.$)(l.length,Math.random).map(e=>l[e]);r.clear();let u=performance.now();for(let t of(n=Math.max(u,n),i)){if(!t.element.isConnected)continue;e.add(t.key),t.element.style.opacity="1";let r=t.element.animate([{opacity:0},{opacity:1}],{duration:200,delay:n-u,easing:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fill:"backwards"});t.animation=r,a.add(t),r.finished.then(()=>{r.cancel(),a.delete(t)},()=>a.delete(t)),n+=200}};return{reveal(t,n){let i=t.getBoundingClientRect(),u=i.bottom<0||i.top>innerHeight,s=matchMedia("(prefers-reduced-motion: reduce)").matches;if(e.has(n)||u||s)return e.add(n),t.style.opacity="1",()=>{};let c={element:t,key:n};return r.add(c),o||(o=requestAnimationFrame(l)),()=>{r.delete(c),c.animation?.cancel(),a.delete(c)}},destroy(){for(let e of(cancelAnimationFrame(o),r.clear(),a))e.animation?.cancel();a.clear()}}}])},979175,e=>{e.s(["r",0,function(e){let t=0x811c9dc5;for(let r of e)t=Math.imul(t^r.charCodeAt(0),0x1000193);return()=>{let e=t+=0x6d2b79f5;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}},"$",0,function(e,t){let r=Array.from({length:e},(e,t)=>t);for(let a=e-1;a>0;a--){let e=Math.floor(t()*(a+1));[r[a],r[e]]=[r[e],r[a]]}return r}])}])})();

//# debugId=59c07f78-1684-5f77-df89-cbbbd634a019
