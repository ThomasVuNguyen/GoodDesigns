import{j as o}from"./jsx-runtime.DXco-PnT.js";import{r as n}from"./index.Bvt71uJM.js";import{B as pe}from"./_button.C6gEI5Hw.js";import"./index.BHJWNCIg.js";import{c as y}from"./utils.lB_l3zhK.js";import{e as J}from"./_image.DXHTH8KM.js";import"./config.Do2ocrsN.js";import{r as he,Q as be}from"./_quote-media.D1_0rPCH.js";import"./index.DCkm5R9e.js";import{u as $e}from"./_use-in-view.DYmITXyX.js";import{k as ze}from"./_keyframe.Dy_gnIkd.js";import{M as P,a as fe}from"./motion.DQ4LMkoi.js";import{h as ve,M as ye,u as ke,m as E}from"./proxy.DbB8impi.js";import{u as q}from"./use-reduced-motion.CIlg_-Qh.js";import{c as we}from"./index.eB9haOI5.js";import{A as We}from"./index._qkO2sWU.js";import{d as re}from"./_carousel-pause-event.BiH-xfZ0.js";import{L as Ce}from"./index.CW9GYvit.js";globalThis.process??={};globalThis.process.env??={};const de=({size:r=24,color:e="currentColor",...a})=>n.createElement("svg",{viewBox:"0 0 24 24",width:r,height:r,stroke:e,strokeWidth:"2",fill:"none",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...a},n.createElement("path",{d:"M5 4.99c0-.972 0-1.457.202-1.725a1 1 0 0 1 .738-.395c.335-.02.74.25 1.548.788l10.515 7.01c.668.446 1.002.668 1.118.949a1 1 0 0 1 0 .766c-.116.28-.45.503-1.118.948l-10.515 7.01c-.809.54-1.213.809-1.548.789a1 1 0 0 1-.738-.395C5 20.467 5 19.98 5 19.01V4.99Z"}));de.displayName="Play";function He(r,e){if(r==="first")return 0;{const a=e-1;return r==="last"?a:a/2}}function oe(r=.1,{startDelay:e=0,from:a=0,ease:t}={}){return(i,c)=>{const s=typeof a=="number"?a:He(a,c),b=Math.abs(s-i);let f=r*b;if(t){const p=c*r;f=ve(t)(f/p)*p}return e+f}}function Xe(r){return n.useEffect(()=>()=>r(),[])}function Ye(){const r=q(),{reducedMotion:e}=n.useContext(ye);return e==="never"?!1:e==="always"?!0:r}function Oe(){const r=ke(()=>({current:null,animations:[]})),e=Ye()??void 0,a=n.useMemo(()=>we({scope:r,reduceMotion:e}),[r,e]);return Xe(()=>{r.animations.forEach(t=>t.stop()),r.animations.length=0}),[r,a]}const K=4.5,je=0,Ne={sm:{borderRadius:18,borderWidth:1,width:70,height:36},md:{borderRadius:16,borderWidth:1},line:{borderRadius:16,borderWidth:1}},Re={sm:{dark:{strokeOpacity:.48,innerOpacity:.7,bloomOpacity:.8,innerShadow:"rgba(255, 255, 255, 0.3)",saturation:1.2},light:{strokeOpacity:.33,innerOpacity:.46,bloomOpacity:.54,innerShadow:"rgba(0, 0, 0, 0.14)",saturation:.96}},md:{dark:{strokeOpacity:.48,innerOpacity:.7,bloomOpacity:.8,innerShadow:"rgba(255, 255, 255, 0.27)",saturation:1.2},light:{strokeOpacity:.33,innerOpacity:.46,bloomOpacity:.54,innerShadow:"rgba(0, 0, 0, 0.14)",saturation:.96}},line:{dark:{strokeOpacity:.72,innerOpacity:.7,bloomOpacity:.8,innerShadow:"rgba(255, 255, 255, 0.1)",saturation:1.2},light:{strokeOpacity:.72,innerOpacity:.7,bloomOpacity:.8,innerShadow:"rgba(0, 0, 0, 0.14)",saturation:1.2}}},ee={colorful:{border:[{color:"rgb(255, 50, 100)",pos:"33% -7.4%",size:"70px 40px"},{color:"rgb(40, 140, 255)",pos:"12% -5%",size:"60px 35px"},{color:"rgb(50, 200, 80)",pos:"2.1% 68.3%",size:"40px 70px"},{color:"rgb(30, 185, 170)",pos:"2.1% 68.3%",size:"20px 35px"},{color:"rgb(100, 70, 255)",pos:"74.4% 100%",size:"180px 32px"},{color:"rgb(40, 140, 255)",pos:"55% 100%",size:"85px 26px"},{color:"rgb(255, 120, 40)",pos:"93.9% 0%",size:"74px 32px"},{color:"rgb(240, 50, 180)",pos:"100% 27.1%",size:"26px 42px"},{color:"rgb(180, 40, 240)",pos:"100% 27.1%",size:"52px 48px"}],spike:{primary:"rgb(255, 60, 80)",secondary:"rgba(40, 190, 180, 0.98)"},spikeLt:{primary:"rgb(200, 30, 60)",secondary:"rgb(20, 150, 140)"}},mono:{border:[{color:"rgb(180, 180, 180)",pos:"33% -7.4%",size:"70px 40px"},{color:"rgb(140, 140, 140)",pos:"12% -5%",size:"60px 35px"},{color:"rgb(160, 160, 160)",pos:"2.1% 68.3%",size:"40px 70px"},{color:"rgb(130, 130, 130)",pos:"2.1% 68.3%",size:"20px 35px"},{color:"rgb(170, 170, 170)",pos:"74.4% 100%",size:"180px 32px"},{color:"rgb(150, 150, 150)",pos:"55% 100%",size:"85px 26px"},{color:"rgb(190, 190, 190)",pos:"93.9% 0%",size:"74px 32px"},{color:"rgb(145, 145, 145)",pos:"100% 27.1%",size:"26px 42px"},{color:"rgb(165, 165, 165)",pos:"100% 27.1%",size:"52px 48px"}],spike:{primary:"rgb(200, 200, 200)",secondary:"rgb(170, 170, 170)"},spikeLt:{primary:"rgb(80, 80, 80)",secondary:"rgb(120, 120, 120)"}},ocean:{border:[{color:"rgb(100, 80, 220)",pos:"33% -7.4%",size:"70px 40px"},{color:"rgb(60, 120, 255)",pos:"12% -5%",size:"60px 35px"},{color:"rgb(80, 100, 200)",pos:"2.1% 68.3%",size:"40px 70px"},{color:"rgb(50, 140, 220)",pos:"2.1% 68.3%",size:"20px 35px"},{color:"rgb(120, 80, 255)",pos:"74.4% 100%",size:"180px 32px"},{color:"rgb(70, 130, 255)",pos:"55% 100%",size:"85px 26px"},{color:"rgb(140, 100, 240)",pos:"93.9% 0%",size:"74px 32px"},{color:"rgb(90, 110, 230)",pos:"100% 27.1%",size:"26px 42px"},{color:"rgb(130, 70, 255)",pos:"100% 27.1%",size:"52px 48px"}],spike:{primary:"rgb(100, 120, 255)",secondary:"rgba(130, 100, 220, 0.98)"},spikeLt:{primary:"rgb(60, 60, 180)",secondary:"rgb(80, 100, 200)"}},sunset:{border:[{color:"rgb(255, 80, 50)",pos:"33% -7.4%",size:"70px 40px"},{color:"rgb(255, 160, 40)",pos:"12% -5%",size:"60px 35px"},{color:"rgb(255, 120, 60)",pos:"2.1% 68.3%",size:"40px 70px"},{color:"rgb(255, 200, 50)",pos:"2.1% 68.3%",size:"20px 35px"},{color:"rgb(255, 100, 80)",pos:"74.4% 100%",size:"180px 32px"},{color:"rgb(255, 180, 60)",pos:"55% 100%",size:"85px 26px"},{color:"rgb(255, 60, 60)",pos:"93.9% 0%",size:"74px 32px"},{color:"rgb(255, 140, 50)",pos:"100% 27.1%",size:"26px 42px"},{color:"rgb(255, 90, 70)",pos:"100% 27.1%",size:"52px 48px"}],spike:{primary:"rgb(255, 140, 80)",secondary:"rgba(255, 100, 60, 0.98)"},spikeLt:{primary:"rgb(200, 80, 40)",secondary:"rgb(220, 120, 30)"}}},me={colorful:{border:[{color:"rgb(50, 200, 80)",pos:"2% 68%",size:"9px 18px"},{color:"rgb(30, 185, 170)",pos:"2% 68%",size:"4px 8px"},{color:"rgb(255, 120, 40)",pos:"72% -3%",size:"59px 9px"},{color:"rgb(100, 70, 255)",pos:"74% 100%",size:"42px 7px"},{color:"rgb(240, 50, 180)",pos:"100% 27%",size:"10px 17px"},{color:"rgb(180, 40, 240)",pos:"100% 27%",size:"10px 18px"},{color:"rgb(40, 140, 255)",pos:"100% 27%",size:"5px 10px"},{color:"rgb(255, 50, 100)",pos:"100% 27%",size:"11px 12px"}],inner:[{color:"rgba(50, 200, 80, 0.5)",pos:"2% 68%",size:"9px 18px"},{color:"rgba(30, 185, 170, 0.45)",pos:"2% 68%",size:"4px 8px"},{color:"rgba(255, 120, 40, 0.35)",pos:"72% -3%",size:"59px 9px"},{color:"rgba(100, 70, 255, 0.35)",pos:"74% 100%",size:"42px 7px"},{color:"rgba(240, 50, 180, 0.3)",pos:"100% 27%",size:"10px 17px"},{color:"rgba(180, 40, 240, 0.4)",pos:"100% 27%",size:"10px 18px"},{color:"rgba(40, 140, 255, 0.3)",pos:"100% 27%",size:"5px 10px"},{color:"rgba(255, 50, 100, 0.3)",pos:"100% 27%",size:"11px 12px"}]},mono:{border:[{color:"rgb(160, 160, 160)",pos:"2% 68%",size:"9px 18px"},{color:"rgb(140, 140, 140)",pos:"2% 68%",size:"4px 8px"},{color:"rgb(180, 180, 180)",pos:"72% -3%",size:"59px 9px"},{color:"rgb(150, 150, 150)",pos:"74% 100%",size:"42px 7px"},{color:"rgb(170, 170, 170)",pos:"100% 27%",size:"10px 17px"},{color:"rgb(155, 155, 155)",pos:"100% 27%",size:"10px 18px"},{color:"rgb(145, 145, 145)",pos:"100% 27%",size:"5px 10px"},{color:"rgb(165, 165, 165)",pos:"100% 27%",size:"11px 12px"}],inner:[{color:"rgba(160, 160, 160, 0.25)",pos:"2% 68%",size:"9px 18px"},{color:"rgba(140, 140, 140, 0.22)",pos:"2% 68%",size:"4px 8px"},{color:"rgba(180, 180, 180, 0.17)",pos:"72% -3%",size:"59px 9px"},{color:"rgba(150, 150, 150, 0.17)",pos:"74% 100%",size:"42px 7px"},{color:"rgba(170, 170, 170, 0.15)",pos:"100% 27%",size:"10px 17px"},{color:"rgba(155, 155, 155, 0.20)",pos:"100% 27%",size:"10px 18px"},{color:"rgba(145, 145, 145, 0.15)",pos:"100% 27%",size:"5px 10px"},{color:"rgba(165, 165, 165, 0.15)",pos:"100% 27%",size:"11px 12px"}]},ocean:{border:[{color:"rgb(60, 140, 200)",pos:"2% 68%",size:"9px 18px"},{color:"rgb(50, 120, 180)",pos:"2% 68%",size:"4px 8px"},{color:"rgb(100, 80, 220)",pos:"72% -3%",size:"59px 9px"},{color:"rgb(80, 100, 255)",pos:"74% 100%",size:"42px 7px"},{color:"rgb(120, 70, 240)",pos:"100% 27%",size:"10px 17px"},{color:"rgb(90, 80, 220)",pos:"100% 27%",size:"10px 18px"},{color:"rgb(70, 110, 255)",pos:"100% 27%",size:"5px 10px"},{color:"rgb(110, 90, 230)",pos:"100% 27%",size:"11px 12px"}],inner:[{color:"rgba(60, 140, 200, 0.5)",pos:"2% 68%",size:"9px 18px"},{color:"rgba(50, 120, 180, 0.45)",pos:"2% 68%",size:"4px 8px"},{color:"rgba(100, 80, 220, 0.35)",pos:"72% -3%",size:"59px 9px"},{color:"rgba(80, 100, 255, 0.35)",pos:"74% 100%",size:"42px 7px"},{color:"rgba(120, 70, 240, 0.3)",pos:"100% 27%",size:"10px 17px"},{color:"rgba(90, 80, 220, 0.4)",pos:"100% 27%",size:"10px 18px"},{color:"rgba(70, 110, 255, 0.3)",pos:"100% 27%",size:"5px 10px"},{color:"rgba(110, 90, 230, 0.3)",pos:"100% 27%",size:"11px 12px"}]},sunset:{border:[{color:"rgb(255, 180, 50)",pos:"2% 68%",size:"9px 18px"},{color:"rgb(255, 150, 40)",pos:"2% 68%",size:"4px 8px"},{color:"rgb(255, 80, 60)",pos:"72% -3%",size:"59px 9px"},{color:"rgb(255, 100, 80)",pos:"74% 100%",size:"42px 7px"},{color:"rgb(255, 60, 80)",pos:"100% 27%",size:"10px 17px"},{color:"rgb(255, 120, 60)",pos:"100% 27%",size:"10px 18px"},{color:"rgb(255, 200, 50)",pos:"100% 27%",size:"5px 10px"},{color:"rgb(255, 90, 70)",pos:"100% 27%",size:"11px 12px"}],inner:[{color:"rgba(255, 180, 50, 0.5)",pos:"2% 68%",size:"9px 18px"},{color:"rgba(255, 150, 40, 0.45)",pos:"2% 68%",size:"4px 8px"},{color:"rgba(255, 80, 60, 0.35)",pos:"72% -3%",size:"59px 9px"},{color:"rgba(255, 100, 80, 0.35)",pos:"74% 100%",size:"42px 7px"},{color:"rgba(255, 60, 80, 0.3)",pos:"100% 27%",size:"10px 17px"},{color:"rgba(255, 120, 60, 0.4)",pos:"100% 27%",size:"10px 18px"},{color:"rgba(255, 200, 50, 0.3)",pos:"100% 27%",size:"5px 10px"},{color:"rgba(255, 90, 70, 0.3)",pos:"100% 27%",size:"11px 12px"}]}};function Fe(r){return me[r].border.map(e=>`radial-gradient(ellipse ${e.size} at ${e.pos}, ${e.color}, transparent)`).join(`,
    `)}function Me(r){return me[r].inner.map(e=>`radial-gradient(ellipse ${e.size} at ${e.pos}, ${e.color}, transparent)`).join(`,
    `)}function Te(r){return ee[r].border.map(e=>`radial-gradient(ellipse ${e.size} at ${e.pos}, ${e.color}, transparent)`).join(`,
    `)}function Ee(r){const e=ee[r],a=r==="mono"?.225:.45;return e.border.map(t=>{const i=t.color.replace("rgb(","rgba(").replace(")",`, ${a})`);return`radial-gradient(ellipse ${t.size.split(" ").map(c=>{const s=parseInt(c);return`${Math.round(s*.9)}px`}).join(" ")} at ${t.pos}, ${i}, transparent)`}).join(`,
    `)}function Se(r,e){const a=ee[r];return e?a.spike:a.spikeLt}const Ae={colorful:{dark:[{color:"rgb(255, 50, 100)",sizeW:36,sizeH:36,offsetX:0,offsetY:2},{color:"rgb(40, 180, 220)",sizeW:30,sizeH:32,offsetX:39,offsetY:0},{color:"rgb(50, 200, 80)",sizeW:33,sizeH:28,offsetX:-36,offsetY:2},{color:"rgb(180, 40, 240)",sizeW:29,sizeH:34,offsetX:-54,offsetY:0},{color:"rgb(255, 160, 30)",sizeW:27,sizeH:30,offsetX:51,offsetY:-1},{color:"rgb(100, 70, 255)",sizeW:36,sizeH:24,offsetX:21,offsetY:1},{color:"rgb(40, 140, 255)",sizeW:30,sizeH:22,offsetX:-21,offsetY:0},{color:"rgb(240, 50, 180)",sizeW:25,sizeH:28,offsetX:66,offsetY:1},{color:"rgb(30, 185, 170)",sizeW:23,sizeH:30,offsetX:-66,offsetY:-1}],light:[{color:"rgb(255, 50, 100)",sizeW:45,sizeH:36,offsetX:0,offsetY:2},{color:"rgb(40, 140, 255)",sizeW:35,sizeH:32,offsetX:65,offsetY:0},{color:"rgb(50, 200, 80)",sizeW:40,sizeH:28,offsetX:-60,offsetY:2},{color:"rgb(180, 40, 240)",sizeW:35,sizeH:34,offsetX:-90,offsetY:0},{color:"rgb(30, 185, 170)",sizeW:38,sizeH:30,offsetX:85,offsetY:-1},{color:"rgb(100, 70, 255)",sizeW:50,sizeH:24,offsetX:35,offsetY:1},{color:"rgb(40, 140, 255)",sizeW:40,sizeH:22,offsetX:-35,offsetY:0},{color:"rgb(255, 120, 40)",sizeW:35,sizeH:28,offsetX:110,offsetY:1},{color:"rgb(240, 50, 180)",sizeW:30,sizeH:30,offsetX:-110,offsetY:-1}]},mono:{dark:[{color:"rgb(200, 200, 200)",sizeW:36,sizeH:36,offsetX:0,offsetY:2},{color:"rgb(170, 170, 170)",sizeW:30,sizeH:32,offsetX:39,offsetY:0},{color:"rgb(155, 155, 155)",sizeW:33,sizeH:28,offsetX:-36,offsetY:2},{color:"rgb(185, 185, 185)",sizeW:29,sizeH:34,offsetX:-54,offsetY:0},{color:"rgb(165, 165, 165)",sizeW:27,sizeH:30,offsetX:51,offsetY:-1},{color:"rgb(180, 180, 180)",sizeW:36,sizeH:24,offsetX:21,offsetY:1},{color:"rgb(160, 160, 160)",sizeW:30,sizeH:22,offsetX:-21,offsetY:0},{color:"rgb(175, 175, 175)",sizeW:25,sizeH:28,offsetX:66,offsetY:1},{color:"rgb(190, 190, 190)",sizeW:23,sizeH:30,offsetX:-66,offsetY:-1}],light:[{color:"rgb(100, 100, 100)",sizeW:45,sizeH:36,offsetX:0,offsetY:2},{color:"rgb(80, 80, 80)",sizeW:35,sizeH:32,offsetX:65,offsetY:0},{color:"rgb(90, 90, 90)",sizeW:40,sizeH:28,offsetX:-60,offsetY:2},{color:"rgb(70, 70, 70)",sizeW:35,sizeH:34,offsetX:-90,offsetY:0},{color:"rgb(85, 85, 85)",sizeW:38,sizeH:30,offsetX:85,offsetY:-1},{color:"rgb(95, 95, 95)",sizeW:50,sizeH:24,offsetX:35,offsetY:1},{color:"rgb(75, 75, 75)",sizeW:40,sizeH:22,offsetX:-35,offsetY:0},{color:"rgb(105, 105, 105)",sizeW:35,sizeH:28,offsetX:110,offsetY:1},{color:"rgb(65, 65, 65)",sizeW:30,sizeH:30,offsetX:-110,offsetY:-1}]},ocean:{dark:[{color:"rgb(100, 80, 220)",sizeW:36,sizeH:36,offsetX:0,offsetY:2},{color:"rgb(60, 120, 255)",sizeW:30,sizeH:32,offsetX:39,offsetY:0},{color:"rgb(80, 100, 200)",sizeW:33,sizeH:28,offsetX:-36,offsetY:2},{color:"rgb(130, 70, 255)",sizeW:29,sizeH:34,offsetX:-54,offsetY:0},{color:"rgb(70, 130, 255)",sizeW:27,sizeH:30,offsetX:51,offsetY:-1},{color:"rgb(120, 80, 255)",sizeW:36,sizeH:24,offsetX:21,offsetY:1},{color:"rgb(90, 110, 230)",sizeW:30,sizeH:22,offsetX:-21,offsetY:0},{color:"rgb(110, 90, 240)",sizeW:25,sizeH:28,offsetX:66,offsetY:1},{color:"rgb(140, 100, 255)",sizeW:23,sizeH:30,offsetX:-66,offsetY:-1}],light:[{color:"rgb(80, 60, 200)",sizeW:45,sizeH:36,offsetX:0,offsetY:2},{color:"rgb(50, 100, 220)",sizeW:35,sizeH:32,offsetX:65,offsetY:0},{color:"rgb(70, 90, 190)",sizeW:40,sizeH:28,offsetX:-60,offsetY:2},{color:"rgb(110, 60, 220)",sizeW:35,sizeH:34,offsetX:-90,offsetY:0},{color:"rgb(60, 110, 230)",sizeW:38,sizeH:30,offsetX:85,offsetY:-1},{color:"rgb(100, 70, 240)",sizeW:50,sizeH:24,offsetX:35,offsetY:1},{color:"rgb(80, 100, 210)",sizeW:40,sizeH:22,offsetX:-35,offsetY:0},{color:"rgb(90, 80, 225)",sizeW:35,sizeH:28,offsetX:110,offsetY:1},{color:"rgb(120, 90, 245)",sizeW:30,sizeH:30,offsetX:-110,offsetY:-1}]},sunset:{dark:[{color:"rgb(255, 100, 60)",sizeW:36,sizeH:36,offsetX:0,offsetY:2},{color:"rgb(255, 180, 50)",sizeW:30,sizeH:32,offsetX:39,offsetY:0},{color:"rgb(255, 140, 70)",sizeW:33,sizeH:28,offsetX:-36,offsetY:2},{color:"rgb(255, 80, 80)",sizeW:29,sizeH:34,offsetX:-54,offsetY:0},{color:"rgb(255, 200, 60)",sizeW:27,sizeH:30,offsetX:51,offsetY:-1},{color:"rgb(255, 120, 50)",sizeW:36,sizeH:24,offsetX:21,offsetY:1},{color:"rgb(255, 160, 80)",sizeW:30,sizeH:22,offsetX:-21,offsetY:0},{color:"rgb(255, 90, 60)",sizeW:25,sizeH:28,offsetX:66,offsetY:1},{color:"rgb(255, 70, 70)",sizeW:23,sizeH:30,offsetX:-66,offsetY:-1}],light:[{color:"rgb(220, 80, 40)",sizeW:45,sizeH:36,offsetX:0,offsetY:2},{color:"rgb(230, 150, 30)",sizeW:35,sizeH:32,offsetX:65,offsetY:0},{color:"rgb(210, 110, 50)",sizeW:40,sizeH:28,offsetX:-60,offsetY:2},{color:"rgb(200, 60, 60)",sizeW:35,sizeH:34,offsetX:-90,offsetY:0},{color:"rgb(220, 170, 40)",sizeW:38,sizeH:30,offsetX:85,offsetY:-1},{color:"rgb(210, 100, 30)",sizeW:50,sizeH:24,offsetX:35,offsetY:1},{color:"rgb(230, 130, 60)",sizeW:40,sizeH:22,offsetX:-35,offsetY:0},{color:"rgb(190, 70, 50)",sizeW:35,sizeH:28,offsetX:110,offsetY:1},{color:"rgb(180, 50, 50)",sizeW:30,sizeH:30,offsetX:-110,offsetY:-1}]}};function Ie(r,e,a){return Ae[r][e?"dark":"light"].map(t=>{const i=t.offsetX===0?"":t.offsetX>0?` + ${t.offsetX}px`:` - ${Math.abs(t.offsetX)}px`,c=t.offsetY===0?"":t.offsetY>0?` + ${t.offsetY}px`:` - ${Math.abs(t.offsetY)}px`;return`radial-gradient(ellipse calc(${t.sizeW}px * var(--beam-w-${a})) calc(${t.sizeH}px * var(--beam-h-${a})) at calc(var(--beam-x-${a}) * 100%${i}) calc(100%${c}), ${t.color}, transparent)`}).join(`,
       `)}const _e={colorful:[{color:"rgba(255, 50, 100, 0.48)",sizeW:33,sizeH:30,offsetX:0,offsetY:0},{color:"rgba(40, 180, 220, 0.42)",sizeW:24,sizeH:26,offsetX:39,offsetY:-3},{color:"rgba(50, 200, 80, 0.48)",sizeW:27,sizeH:24,offsetX:-36,offsetY:0},{color:"rgba(180, 40, 240, 0.42)",sizeW:23,sizeH:28,offsetX:-54,offsetY:-2},{color:"rgba(255, 160, 30, 0.50)",sizeW:24,sizeH:24,offsetX:51,offsetY:-1},{color:"rgba(100, 70, 255, 0.45)",sizeW:30,sizeH:20,offsetX:21,offsetY:0},{color:"rgba(40, 140, 255, 0.40)",sizeW:25,sizeH:18,offsetX:-21,offsetY:-2},{color:"rgba(240, 50, 180, 0.45)",sizeW:21,sizeH:24,offsetX:66,offsetY:0},{color:"rgba(30, 185, 170, 0.52)",sizeW:18,sizeH:26,offsetX:-66,offsetY:-1}],mono:[{color:"rgba(200, 200, 200, 0.48)",sizeW:33,sizeH:30,offsetX:0,offsetY:0},{color:"rgba(170, 170, 170, 0.42)",sizeW:24,sizeH:26,offsetX:39,offsetY:-3},{color:"rgba(155, 155, 155, 0.48)",sizeW:27,sizeH:24,offsetX:-36,offsetY:0},{color:"rgba(185, 185, 185, 0.42)",sizeW:23,sizeH:28,offsetX:-54,offsetY:-2},{color:"rgba(165, 165, 165, 0.50)",sizeW:24,sizeH:24,offsetX:51,offsetY:-1},{color:"rgba(180, 180, 180, 0.45)",sizeW:30,sizeH:20,offsetX:21,offsetY:0},{color:"rgba(160, 160, 160, 0.40)",sizeW:25,sizeH:18,offsetX:-21,offsetY:-2},{color:"rgba(175, 175, 175, 0.45)",sizeW:21,sizeH:24,offsetX:66,offsetY:0},{color:"rgba(190, 190, 190, 0.52)",sizeW:18,sizeH:26,offsetX:-66,offsetY:-1}],ocean:[{color:"rgba(100, 80, 220, 0.48)",sizeW:33,sizeH:30,offsetX:0,offsetY:0},{color:"rgba(60, 120, 255, 0.42)",sizeW:24,sizeH:26,offsetX:39,offsetY:-3},{color:"rgba(80, 100, 200, 0.48)",sizeW:27,sizeH:24,offsetX:-36,offsetY:0},{color:"rgba(130, 70, 255, 0.42)",sizeW:23,sizeH:28,offsetX:-54,offsetY:-2},{color:"rgba(70, 130, 255, 0.50)",sizeW:24,sizeH:24,offsetX:51,offsetY:-1},{color:"rgba(120, 80, 255, 0.45)",sizeW:30,sizeH:20,offsetX:21,offsetY:0},{color:"rgba(90, 110, 230, 0.40)",sizeW:25,sizeH:18,offsetX:-21,offsetY:-2},{color:"rgba(110, 90, 240, 0.45)",sizeW:21,sizeH:24,offsetX:66,offsetY:0},{color:"rgba(140, 100, 255, 0.52)",sizeW:18,sizeH:26,offsetX:-66,offsetY:-1}],sunset:[{color:"rgba(255, 100, 60, 0.48)",sizeW:33,sizeH:30,offsetX:0,offsetY:0},{color:"rgba(255, 180, 50, 0.42)",sizeW:24,sizeH:26,offsetX:39,offsetY:-3},{color:"rgba(255, 140, 70, 0.48)",sizeW:27,sizeH:24,offsetX:-36,offsetY:0},{color:"rgba(255, 80, 80, 0.42)",sizeW:23,sizeH:28,offsetX:-54,offsetY:-2},{color:"rgba(255, 200, 60, 0.50)",sizeW:24,sizeH:24,offsetX:51,offsetY:-1},{color:"rgba(255, 120, 50, 0.45)",sizeW:30,sizeH:20,offsetX:21,offsetY:0},{color:"rgba(255, 160, 80, 0.40)",sizeW:25,sizeH:18,offsetX:-21,offsetY:-2},{color:"rgba(255, 90, 60, 0.45)",sizeW:21,sizeH:24,offsetX:66,offsetY:0},{color:"rgba(255, 70, 70, 0.52)",sizeW:18,sizeH:26,offsetX:-66,offsetY:-1}]};function Le(r,e){return _e[r].map(a=>{const t=a.offsetX===0?"":a.offsetX>0?` + ${a.offsetX}px`:` - ${Math.abs(a.offsetX)}px`,i=a.offsetY===0?"":` - ${Math.abs(a.offsetY)}px`;return`radial-gradient(ellipse calc(${a.sizeW}px * var(--beam-w-${e})) calc(${a.sizeH}px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%${t}) calc(100%${i}), ${a.color}, transparent)`}).join(`,
    `)}const Be={colorful:{dark:{spikes:[{color1:"rgb(100, 70, 255)",color2:"rgba(100, 70, 255, 1)"},{color1:"rgba(255, 170, 40, 0.59)",color2:"rgba(255, 170, 40, 0.29)"},{color1:"rgb(50, 200, 100)",color2:"rgba(50, 200, 100, 1)"},{color1:"rgba(200, 50, 240, 0.91)",color2:"rgba(200, 50, 240, 0.45)"},{color1:"rgb(40, 140, 255)",color2:"rgba(40, 140, 255, 1)"}]},light:{spikes:[{color1:"rgb(80, 50, 200)",color2:"rgba(80, 50, 200, 0.8)"},{color1:"rgba(210, 130, 0, 0.7)",color2:"rgba(210, 130, 0, 0.46)"},{color1:"rgb(30, 160, 70)",color2:"rgba(30, 160, 70, 0.82)"},{color1:"rgb(160, 30, 190)",color2:"rgba(160, 30, 190, 0.7)"},{color1:"rgb(30, 100, 200)",color2:"rgba(30, 100, 200, 0.78)"}]}},mono:{dark:{spikes:[{color1:"rgb(200, 200, 200)",color2:"rgba(200, 200, 200, 1)"},{color1:"rgba(180, 180, 180, 0.59)",color2:"rgba(180, 180, 180, 0.29)"},{color1:"rgb(190, 190, 190)",color2:"rgba(190, 190, 190, 1)"},{color1:"rgba(170, 170, 170, 0.91)",color2:"rgba(170, 170, 170, 0.45)"},{color1:"rgb(185, 185, 185)",color2:"rgba(185, 185, 185, 1)"}]},light:{spikes:[{color1:"rgb(80, 80, 80)",color2:"rgba(80, 80, 80, 0.8)"},{color1:"rgba(100, 100, 100, 0.7)",color2:"rgba(100, 100, 100, 0.46)"},{color1:"rgb(70, 70, 70)",color2:"rgba(70, 70, 70, 0.82)"},{color1:"rgb(90, 90, 90)",color2:"rgba(90, 90, 90, 0.7)"},{color1:"rgb(85, 85, 85)",color2:"rgba(85, 85, 85, 0.78)"}]}},ocean:{dark:{spikes:[{color1:"rgb(100, 80, 255)",color2:"rgb(100, 80, 255)"},{color1:"rgba(80, 130, 220, 0.59)",color2:"rgba(80, 130, 220, 0.29)"},{color1:"rgb(60, 100, 255)",color2:"rgb(60, 100, 255)"},{color1:"rgba(90, 120, 200, 0.91)",color2:"rgba(90, 120, 200, 0.45)"},{color1:"rgb(120, 90, 255)",color2:"rgb(120, 90, 255)"}]},light:{spikes:[{color1:"rgb(50, 40, 180)",color2:"rgba(50, 40, 180, 0.8)"},{color1:"rgba(40, 80, 200, 0.7)",color2:"rgba(40, 80, 200, 0.46)"},{color1:"rgb(30, 50, 190)",color2:"rgba(30, 50, 190, 0.82)"},{color1:"rgb(60, 90, 180)",color2:"rgba(60, 90, 180, 0.7)"},{color1:"rgb(70, 60, 200)",color2:"rgba(70, 60, 200, 0.78)"}]}},sunset:{dark:{spikes:[{color1:"rgb(255, 100, 80)",color2:"rgb(255, 100, 80)"},{color1:"rgba(255, 150, 80, 0.59)",color2:"rgba(255, 150, 80, 0.29)"},{color1:"rgb(255, 80, 60)",color2:"rgb(255, 80, 60)"},{color1:"rgba(255, 120, 50, 0.91)",color2:"rgba(255, 120, 50, 0.45)"},{color1:"rgb(255, 140, 70)",color2:"rgb(255, 140, 70)"}]},light:{spikes:[{color1:"rgb(200, 60, 30)",color2:"rgba(200, 60, 30, 0.8)"},{color1:"rgba(220, 100, 20, 0.7)",color2:"rgba(220, 100, 20, 0.46)"},{color1:"rgb(180, 40, 20)",color2:"rgba(180, 40, 20, 0.82)"},{color1:"rgb(210, 80, 10)",color2:"rgba(210, 80, 10, 0.7)"},{color1:"rgb(190, 70, 30)",color2:"rgba(190, 70, 30, 0.78)"}]}}};function Z(r,e){const a=r.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*[\d.]+\s*\)$/);if(a)return`rgba(${a[1]}, ${a[2]}, ${a[3]}, ${e})`;const t=r.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);return t?`rgba(${t[1]}, ${t[2]}, ${t[3]}, ${e})`:r}function Pe(r,e,a){const t=Se(r,e),i=t.primary,c=t.secondary,s=Be[r][e?"dark":"light"].spikes;if(r==="mono")return Ve(e,a);if(e){const b=i,f=i,p=c,d=Z(c,.49);return`radial-gradient(ellipse calc(0.8px * var(--beam-spike-${a})) calc(92px * var(--beam-h-${a})) at 8% calc(100% - 2px), ${b}, ${f} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2-${a})) calc(35px * var(--beam-h-${a})) at 22% calc(100% - 4px), ${p}, ${d} 50%, transparent 95%),
       radial-gradient(ellipse calc(2px * (2 - var(--beam-spike-${a}))) calc(72px * var(--beam-h-${a})) at 36% calc(100% - 3px), ${s[0].color1}, ${s[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2-${a})) calc(28px * var(--beam-h-${a})) at 50% calc(100% - 2px), ${s[1].color1}, ${s[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(1.2px * (2 - var(--beam-spike2-${a}))) calc(85px * var(--beam-h-${a})) at 64% calc(100% - 4px), ${s[2].color1}, ${s[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike-${a})) calc(45px * var(--beam-h-${a})) at 78% calc(100% - 2px), ${s[3].color1}, ${s[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(0.6px * (2 - var(--beam-spike-${a}))) calc(60px * var(--beam-h-${a})) at 92% calc(100% - 3px), ${s[4].color1}, ${s[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(21px * var(--beam-spike-${a})) calc(15px * var(--beam-spike2-${a})) at calc(var(--beam-x-${a}) * 100%) calc(100% + 1px), rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.5) 50%, transparent 100%),
       radial-gradient(ellipse calc(42px * var(--beam-w-${a})) calc(40px * var(--beam-h-${a})) at calc(var(--beam-x-${a}) * 100%) 100%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.12) 25%, rgba(255, 255, 255, 0.03) 55%, transparent 80%)`}else{const b=i,f=Z(i,.85),p=c,d=Z(c,.7);return`radial-gradient(ellipse calc(0.8px * var(--beam-spike-${a})) calc(92px * var(--beam-h-${a})) at 8% calc(100% - 2px), ${b}, ${f} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2-${a})) calc(35px * var(--beam-h-${a})) at 22% calc(100% - 4px), ${p}, ${d} 50%, transparent 95%),
       radial-gradient(ellipse calc(2px * (2 - var(--beam-spike-${a}))) calc(72px * var(--beam-h-${a})) at 36% calc(100% - 3px), ${s[0].color1}, ${s[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2-${a})) calc(28px * var(--beam-h-${a})) at 50% calc(100% - 2px), ${s[1].color1}, ${s[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(1.2px * (2 - var(--beam-spike2-${a}))) calc(85px * var(--beam-h-${a})) at 64% calc(100% - 4px), ${s[2].color1}, ${s[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike-${a})) calc(45px * var(--beam-h-${a})) at 78% calc(100% - 2px), ${s[3].color1}, ${s[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(1px * (2 - var(--beam-spike-${a}))) calc(60px * var(--beam-h-${a})) at 92% calc(100% - 3px), ${s[4].color1}, ${s[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(50px * var(--beam-w-${a})) calc(32px * var(--beam-h-${a})) at calc(var(--beam-x-${a}) * 100%) calc(100%), rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.18) 30%, rgba(0, 0, 0, 0.03) 60%, transparent 85%)`}}function Ve(r,e){return r?`radial-gradient(ellipse calc(18px * var(--beam-spike-${e})) calc(30px * var(--beam-h-${e})) at 8% calc(100% - 2px), rgba(200, 200, 200, 0.35), rgba(200, 200, 200, 0.12) 50%, transparent 100%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2-${e})) calc(28px * var(--beam-h-${e})) at 22% calc(100% - 4px), rgba(170, 170, 170, 0.3), rgba(170, 170, 170, 0.1) 50%, transparent 100%),
       radial-gradient(ellipse calc(16px * var(--beam-spike-${e})) calc(32px * var(--beam-h-${e})) at 36% calc(100% - 3px), rgba(190, 190, 190, 0.35), rgba(190, 190, 190, 0.12) 50%, transparent 100%),
       radial-gradient(ellipse calc(20px * var(--beam-spike2-${e})) calc(25px * var(--beam-h-${e})) at 50% calc(100% - 2px), rgba(180, 180, 180, 0.25), rgba(180, 180, 180, 0.08) 55%, transparent 100%),
       radial-gradient(ellipse calc(15px * var(--beam-spike2-${e})) calc(30px * var(--beam-h-${e})) at 64% calc(100% - 4px), rgba(185, 185, 185, 0.32), rgba(185, 185, 185, 0.1) 50%, transparent 100%),
       radial-gradient(ellipse calc(12px * var(--beam-spike-${e})) calc(28px * var(--beam-h-${e})) at 78% calc(100% - 2px), rgba(175, 175, 175, 0.28), rgba(175, 175, 175, 0.09) 50%, transparent 100%),
       radial-gradient(ellipse calc(17px * var(--beam-spike-${e})) calc(26px * var(--beam-h-${e})) at 92% calc(100% - 3px), rgba(195, 195, 195, 0.3), rgba(195, 195, 195, 0.1) 50%, transparent 100%),
       radial-gradient(ellipse calc(21px * var(--beam-spike-${e})) calc(15px * var(--beam-spike2-${e})) at calc(var(--beam-x-${e}) * 100%) calc(100% + 1px), rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.5) 50%, transparent 100%),
       radial-gradient(ellipse calc(42px * var(--beam-w-${e})) calc(40px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.12) 25%, rgba(255, 255, 255, 0.03) 55%, transparent 80%)`:`radial-gradient(ellipse calc(18px * var(--beam-spike-${e})) calc(30px * var(--beam-h-${e})) at 8% calc(100% - 2px), rgba(80, 80, 80, 0.3), rgba(80, 80, 80, 0.1) 50%, transparent 100%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2-${e})) calc(28px * var(--beam-h-${e})) at 22% calc(100% - 4px), rgba(100, 100, 100, 0.25), rgba(100, 100, 100, 0.08) 50%, transparent 100%),
       radial-gradient(ellipse calc(16px * var(--beam-spike-${e})) calc(32px * var(--beam-h-${e})) at 36% calc(100% - 3px), rgba(70, 70, 70, 0.3), rgba(70, 70, 70, 0.1) 50%, transparent 100%),
       radial-gradient(ellipse calc(20px * var(--beam-spike2-${e})) calc(25px * var(--beam-h-${e})) at 50% calc(100% - 2px), rgba(90, 90, 90, 0.22), rgba(90, 90, 90, 0.07) 55%, transparent 100%),
       radial-gradient(ellipse calc(15px * var(--beam-spike2-${e})) calc(30px * var(--beam-h-${e})) at 64% calc(100% - 4px), rgba(85, 85, 85, 0.28), rgba(85, 85, 85, 0.09) 50%, transparent 100%),
       radial-gradient(ellipse calc(12px * var(--beam-spike-${e})) calc(28px * var(--beam-h-${e})) at 78% calc(100% - 2px), rgba(95, 95, 95, 0.24), rgba(95, 95, 95, 0.08) 50%, transparent 100%),
       radial-gradient(ellipse calc(17px * var(--beam-spike-${e})) calc(26px * var(--beam-h-${e})) at 92% calc(100% - 3px), rgba(75, 75, 75, 0.26), rgba(75, 75, 75, 0.08) 50%, transparent 100%),
       radial-gradient(ellipse calc(50px * var(--beam-w-${e})) calc(32px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) calc(100%), rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.18) 30%, rgba(0, 0, 0, 0.03) 60%, transparent 85%)`}function Ue(r){const{size:e}=r;return e==="line"?Ge(r):e==="sm"?De(r):Qe(r)}function De(r){const{id:e,borderRadius:a,borderWidth:t,duration:i,strokeOpacity:c,innerOpacity:s,bloomOpacity:b,innerShadow:f,colorVariant:p,staticColors:d,brightness:m,saturation:g,hueRange:u,theme:z}=r,v=Math.max(0,a-t),h=p==="mono"?.5:1,H=c*h,w=s*h,Y=b*h,C=d?"":`animation: beam-hue-shift-${e} 12s ease-in-out infinite;`,O=d?"":`
@keyframes beam-hue-shift-${e} {
  0% { filter: hue-rotate(-${u}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
  50% { filter: hue-rotate(${u}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
  100% { filter: hue-rotate(-${u}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
}`,k=z==="dark",$=k?`conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )`:`conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 54%,
        rgba(0, 0, 0, 0.08) 57%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.4) 63%,
        rgba(0, 0, 0, 0.55) 66%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.2) 72%,
        rgba(0, 0, 0, 0.08) 75%,
        transparent 78%, transparent 100%
      )`,W=Fe(p),j=Me(p),N=k?`conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )`:`conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 58%,
        rgba(0, 0, 0, 0.02) 62%,
        rgba(0, 0, 0, 0.08) 65%,
        rgba(0, 0, 0, 0.2) 67%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.6) 70%,
        rgba(0, 0, 0, 0.6) 70.5%,
        rgba(0, 0, 0, 0.4) 71.5%,
        rgba(0, 0, 0, 0.2) 73%,
        rgba(0, 0, 0, 0.08) 75%,
        rgba(0, 0, 0, 0.02) 78%,
        transparent 82%
      )`,F=`conic-gradient(
    from var(--beam-angle-${e}),
    transparent 0%, transparent 22%,
    rgba(255, 255, 255, 0.12) 28%, rgba(255, 255, 255, 0.4) 36%,
    white 46%, white 82%,
    rgba(255, 255, 255, 0.4) 88%, rgba(255, 255, 255, 0.12) 94%,
    transparent 97%, transparent 100%
  )`;return`
@property --beam-angle-${e} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

@property --beam-opacity-${e} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${e}"] {
  position: relative;
  border-radius: ${a}px;
  overflow: hidden;
}

[data-beam="${e}"][data-active] {
  animation:
    beam-spin-${e} ${i}s linear infinite,
    beam-fade-in-${e} 0.6s ease forwards;
}

[data-beam="${e}"][data-fading] {
  animation:
    beam-spin-${e} ${i}s linear infinite,
    beam-fade-out-${e} 0.5s ease forwards;
}

[data-beam="${e}"][data-active]::after,
[data-beam="${e}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${v}px;
  padding: ${t}px;
  clip-path: inset(0 round ${a}px);
  background: ${$},${W};
  -webkit-mask:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${e}) * ${H.toFixed(2)} * var(--beam-strength, 1));
  ${C}
}

[data-beam="${e}"][data-active]::before,
[data-beam="${e}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  clip-path: inset(0 round ${a}px);
  background: ${j};
  box-shadow: inset 0 0 5px 1px ${f};
  -webkit-mask-image: ${F};
  -webkit-mask-composite: source-over;
  mask-image: ${F};
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${e}) * ${w.toFixed(2)} * var(--beam-strength, 1));
  ${C}
}

[data-beam="${e}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${v}px;
  clip-path: inset(0 round ${a}px);
  background: ${N};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${t}px;
  filter: blur(8px) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)});
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${e}"][data-active] [data-beam-bloom],
[data-beam="${e}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${e}) * ${Y.toFixed(2)} * var(--beam-strength, 1));
}

@keyframes beam-spin-${e} {
  to { --beam-angle-${e}: 360deg; }
}

@keyframes beam-fade-in-${e} {
  to { --beam-opacity-${e}: 1; }
}

@keyframes beam-fade-out-${e} {
  from { --beam-opacity-${e}: 1; }
  to { --beam-opacity-${e}: 0; }
}
${O}
`}function Qe(r){const{id:e,borderRadius:a,borderWidth:t,duration:i,strokeOpacity:c,innerOpacity:s,bloomOpacity:b,innerShadow:f,colorVariant:p,staticColors:d,brightness:m,saturation:g,hueRange:u,theme:z}=r,v=Math.max(0,a-t),h=p==="mono"?.5:1,H=c*h,w=s*h,Y=b*h,C=d?"":`animation: beam-hue-shift-${e} 12s ease-in-out infinite;`,O=d?"":`
@keyframes beam-hue-shift-${e} {
  0% { filter: hue-rotate(-${u}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
  50% { filter: hue-rotate(${u}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
  100% { filter: hue-rotate(-${u}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
}`,k=z==="dark",$=k?`conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )`:`conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 54%,
        rgba(0, 0, 0, 0.08) 57%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.4) 63%,
        rgba(0, 0, 0, 0.55) 66%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.2) 72%,
        rgba(0, 0, 0, 0.08) 75%,
        transparent 78%, transparent 100%
      )`,W=Te(p),j=Ee(p),N=k?`conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )`:`conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 58%,
        rgba(0, 0, 0, 0.02) 62%,
        rgba(0, 0, 0, 0.08) 65%,
        rgba(0, 0, 0, 0.2) 67%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.6) 70%,
        rgba(0, 0, 0, 0.6) 70.5%,
        rgba(0, 0, 0, 0.4) 71.5%,
        rgba(0, 0, 0, 0.2) 73%,
        rgba(0, 0, 0, 0.08) 75%,
        rgba(0, 0, 0, 0.02) 78%,
        transparent 82%
      )`;return`
@property --beam-angle-${e} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

@property --beam-opacity-${e} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${e}"] {
  position: relative;
  border-radius: ${a}px;
  overflow: hidden;
}

[data-beam="${e}"][data-active] {
  animation:
    beam-spin-${e} ${i}s linear infinite,
    beam-fade-in-${e} 0.6s ease forwards;
}

[data-beam="${e}"][data-fading] {
  animation:
    beam-spin-${e} ${i}s linear infinite,
    beam-fade-out-${e} 0.5s ease forwards;
}

[data-beam="${e}"][data-active]::after,
[data-beam="${e}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${v}px;
  padding: ${t}px;
  clip-path: inset(0 round ${a}px);
  background: ${$},${W};
  -webkit-mask:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${e}) * ${H.toFixed(2)} * var(--beam-strength, 1));
  ${C}
}

[data-beam="${e}"][data-active]::before,
[data-beam="${e}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  background: ${j};
  box-shadow: inset 0 0 9px 1px ${f};
  -webkit-mask-image:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${e}) * ${w.toFixed(2)} * var(--beam-strength, 1));
  clip-path: inset(0 round ${a}px);
  ${C}
}

[data-beam="${e}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${v}px;
  clip-path: inset(0 round ${a}px);
  background: ${N};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${t}px;
  filter: blur(8px) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)});
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${e}"][data-active] [data-beam-bloom],
[data-beam="${e}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${e}) * ${Y.toFixed(2)} * var(--beam-strength, 1));
}

@keyframes beam-spin-${e} {
  to { --beam-angle-${e}: 360deg; }
}

@keyframes beam-fade-in-${e} {
  to { --beam-opacity-${e}: 1; }
}

@keyframes beam-fade-out-${e} {
  from { --beam-opacity-${e}: 1; }
  to { --beam-opacity-${e}: 0; }
}
${O}
`}function Ge(r){const{id:e,borderRadius:a,borderWidth:t,duration:i,strokeOpacity:c,innerOpacity:s,bloomOpacity:b,innerShadow:f,colorVariant:p,staticColors:d,brightness:m,saturation:g,hueRange:u,theme:z}=r,v=Math.max(0,a-t),h=z==="dark",H=c,w=s,Y=b,C=d?"":`animation: beam-hue-shift-${e} 12s ease-in-out infinite;`,O=d?"":`animation: beam-hue-shift-bloom-${e} 8s ease-in-out infinite;`,k=d?"":`
@keyframes beam-hue-shift-${e} {
  0% { filter: hue-rotate(-${u}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
  50% { filter: hue-rotate(${u}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
  100% { filter: hue-rotate(-${u}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
}

@keyframes beam-hue-shift-bloom-${e} {
  0% { filter: blur(8px) hue-rotate(-${u+10}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
  50% { filter: blur(8px) hue-rotate(${u+10}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
  100% { filter: blur(8px) hue-rotate(-${u+10}deg) brightness(${m.toFixed(2)}) saturate(${g.toFixed(2)}); }
}`,$=h?`radial-gradient(
        ellipse calc(24px * var(--beam-w-${e})) calc(28px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) calc(100% + 2px),
        rgba(255, 255, 255, 0.38) 0%,
        rgba(255, 255, 255, 0.12) 30%,
        transparent 65%
      )`:`radial-gradient(
        ellipse calc(35px * var(--beam-w-${e})) calc(28px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) calc(100% + 2px),
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.25) 35%,
        transparent 70%
      )`,W=Ie(p,h,e),j=Le(p,e),N=Pe(p,h,e);return`
@property --beam-x-${e} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

@property --beam-w-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-h-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-spike-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-spike2-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-edge-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-opacity-${e} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${e}"] {
  position: relative;
  border-radius: ${a}px;
  overflow: hidden;
}

[data-beam="${e}"][data-active] {
  animation:
    beam-travel-${e} ${i}s linear infinite,
    beam-edge-fade-${e} ${i}s linear infinite,
    beam-breathe-${e} ${(i*1.3).toFixed(1)}s ease-in-out infinite,
    beam-spike-${e} ${(i*1.33).toFixed(1)}s ease-in-out infinite,
    beam-spike2-${e} ${(i*1.7).toFixed(1)}s ease-in-out infinite,
    beam-fade-in-${e} 0.6s ease forwards;
}

[data-beam="${e}"][data-fading] {
  animation:
    beam-travel-${e} ${i}s linear infinite,
    beam-edge-fade-${e} ${i}s linear infinite,
    beam-breathe-${e} ${(i*1.3).toFixed(1)}s ease-in-out infinite,
    beam-spike-${e} ${(i*1.33).toFixed(1)}s ease-in-out infinite,
    beam-spike2-${e} ${(i*1.7).toFixed(1)}s ease-in-out infinite,
    beam-fade-out-${e} 0.5s ease forwards;
}

[data-beam="${e}"][data-active]::after,
[data-beam="${e}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${v}px;
  padding: ${t}px;
  clip-path: inset(0 round ${a}px);
  background: ${$}, ${W};
  -webkit-mask:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${e})) calc(60px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${e})) calc(60px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${e}) * var(--beam-edge-${e}) * ${H.toFixed(2)} * var(--beam-strength, 1));
  ${C}
}

[data-beam="${e}"][data-active]::before,
[data-beam="${e}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  background: ${j};
  box-shadow: inset 0 0 9px 1px ${f};
  -webkit-mask-image:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${e})) calc(60px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${e})) calc(60px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${e}) * var(--beam-edge-${e}) * ${w.toFixed(2)} * var(--beam-strength, 1));
  clip-path: inset(0 round ${a}px);
  ${C}
}

[data-beam="${e}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${v}px;
  clip-path: inset(0 round ${a}px);
  padding: 0;
  -webkit-mask: radial-gradient(
    ellipse calc(84px * var(--beam-w-${e})) calc(110px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
    white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
  );
  -webkit-mask-composite: source-over;
  mask: radial-gradient(
    ellipse calc(84px * var(--beam-w-${e})) calc(110px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
    white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
  );
  mask-composite: add;
  background: ${N};
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${e}"][data-active] [data-beam-bloom],
[data-beam="${e}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${e}) * var(--beam-edge-${e}) * ${Y.toFixed(2)} * var(--beam-strength, 1));
  ${O}
}

@keyframes beam-travel-${e} {
  0%   { --beam-x-${e}: 0.06;  --beam-w-${e}: 0.5; }
  10%  { --beam-x-${e}: 0.15;  --beam-w-${e}: 0.8; }
  20%  { --beam-x-${e}: 0.25;  --beam-w-${e}: 1.1; }
  30%  { --beam-x-${e}: 0.35;  --beam-w-${e}: 1.3; }
  40%  { --beam-x-${e}: 0.44;  --beam-w-${e}: 1.45; }
  50%  { --beam-x-${e}: 0.5;   --beam-w-${e}: 1.5; }
  60%  { --beam-x-${e}: 0.56;  --beam-w-${e}: 1.45; }
  70%  { --beam-x-${e}: 0.65;  --beam-w-${e}: 1.3; }
  80%  { --beam-x-${e}: 0.75;  --beam-w-${e}: 1.1; }
  90%  { --beam-x-${e}: 0.85;  --beam-w-${e}: 0.8; }
  100% { --beam-x-${e}: 0.94;  --beam-w-${e}: 0.5; }
}

@keyframes beam-edge-fade-${e} {
  0%    { --beam-edge-${e}: 0; }
  12.5% { --beam-edge-${e}: 0; }
  32.5% { --beam-edge-${e}: 1; }
  67.5% { --beam-edge-${e}: 1; }
  87.5% { --beam-edge-${e}: 0; }
  100%  { --beam-edge-${e}: 0; }
}

@keyframes beam-breathe-${e} {
  0%, 100% { --beam-h-${e}: 0.8; }
  25%      { --beam-h-${e}: 1.25; }
  55%      { --beam-h-${e}: 0.85; }
  80%      { --beam-h-${e}: 1.3; }
}

@keyframes beam-spike-${e} {
  0%   { --beam-spike-${e}: 0.8; }
  25%  { --beam-spike-${e}: 1.3; }
  50%  { --beam-spike-${e}: 0.9; }
  75%  { --beam-spike-${e}: 1.4; }
  100% { --beam-spike-${e}: 0.8; }
}

@keyframes beam-spike2-${e} {
  0%   { --beam-spike2-${e}: 1.2; }
  25%  { --beam-spike2-${e}: 0.7; }
  50%  { --beam-spike2-${e}: 1.4; }
  75%  { --beam-spike2-${e}: 0.8; }
  100% { --beam-spike2-${e}: 1.2; }
}

@keyframes beam-fade-in-${e} {
  to { --beam-opacity-${e}: 1; }
}

@keyframes beam-fade-out-${e} {
  from { --beam-opacity-${e}: 1; }
  to { --beam-opacity-${e}: 0; }
}
${k}
`}function Ze(){const[r,e]=n.useState(()=>typeof window>"u"||window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");return n.useEffect(()=>{if(typeof window>"u")return;const a=window.matchMedia("(prefers-color-scheme: dark)"),t=i=>{e(i.matches?"dark":"light")};return a.addEventListener("change",t),()=>a.removeEventListener("change",t)},[]),r}function Ke(r,e){return r==="auto"?e:r}const Je=n.forwardRef(function({children:r,size:e="md",colorVariant:a="colorful",theme:t="dark",staticColors:i=!1,duration:c,active:s=!0,borderRadius:b,brightness:f=1.3,saturation:p,hueRange:d=30,strength:m=1,className:g,style:u,onActivate:z,onDeactivate:v,onAnimationEnd:h,...H},w){const Y=n.useId().replace(/:/g,"-"),C=Ze(),O=n.useRef(null),[k,$]=n.useState(s),[W,j]=n.useState(!1),[N,F]=n.useState(null);n.useEffect(()=>{if(b!=null)return;const x=O.current;if(!x)return;const R=()=>{const ae=x.firstElementChild;if(!ae)return;const ue=getComputedStyle(ae),G=parseFloat(ue.borderTopLeftRadius);!isNaN(G)&&G>0&&F(G)};R();const V=new MutationObserver(R);return V.observe(x,{childList:!0,subtree:!1}),()=>V.disconnect()},[b,r]),n.useEffect(()=>{s&&!k&&!W?$(!0):!s&&k&&!W&&j(!0)},[s,k,W]);const S=n.useCallback(x=>{const R=x.animationName;R.includes("fade-out")?($(!1),j(!1),v?.()):R.includes("fade-in")&&z?.(),h?.(x)},[z,v,h]),M=Ke(t,C),X=Re[e][M],A=Ne[e],I=b??N??A.borderRadius,T=c??(e==="line"?2.4:1.96),L=p??X.saturation,_=e==="line"?Math.min(d,13):d,B=a==="mono"?!0:i,D=n.useMemo(()=>Ue({id:Y,borderRadius:I,borderWidth:A.borderWidth,duration:T,strokeOpacity:X.strokeOpacity,innerOpacity:X.innerOpacity,bloomOpacity:X.bloomOpacity,innerShadow:X.innerShadow,size:e,colorVariant:a,staticColors:B,brightness:f,saturation:L,hueRange:_,theme:M}),[Y,I,A.borderWidth,T,X.strokeOpacity,X.innerOpacity,X.bloomOpacity,X.innerShadow,e,a,B,f,L,_,M]),Q=n.useCallback(x=>{O.current=x,typeof w=="function"?w(x):w&&(w.current=x)},[w]),l={...u??{},"--beam-strength":Math.max(0,Math.min(1,m))};return o.jsxs(o.Fragment,{children:[o.jsx("style",{children:D}),o.jsxs("div",{...H,ref:Q,"data-beam":Y,"data-active":k&&!W?"":void 0,"data-fading":W?"":void 0,className:g,style:l,onAnimationEnd:S,children:[r,o.jsx("div",{"data-beam-bloom":!0})]})]})});J({slug:"discord",label:"Discord",viewBox:"0 0 71 55",inner:`<g clip-path="url(#clip0)">
  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor">
  </path>
 </g>
 <defs>
  <clipPath id="clip0">
   <rect width="71" height="55" fill="white">
   </rect>
  </clipPath>
 </defs>`});const qe=`<path fill="currentColor" d="M-76.186-25.646h5.482c4.269,0,6.695,3.585,6.695,10.49
  c0,7.587-1.726,10.579-6.695,10.717h-5.482V-25.646z M-73.429-7.161h2.803c3.063-0.052,3.788-3.248,3.788-7.791
  c0-0.505,0.338-7.904-3.788-7.912h-2.803V-7.161z M71.149,24.68c0,5.665,1.399,9.975,5.375,9.975c4.445,0,7.095-6.024,7.095-20.179
  c0-15.54-2.398-20.878-6.574-21.058c-4.039-0.18-6.105,3.258-5.896,10.348V24.68z M73.95,5.955c0-4.787,0.553-9.309,2.751-9.309
  c2.931,0,4.05,6.948,4.05,17.825c0,9.916-1.304,16.951-4.42,16.951c-2.004,0-2.381-4.932-2.381-8.91V5.955z M148.412-5.998
  c4.356-0.022,6.188,4.898,6.466,10.46c0.092,1.889,0.125,1.979,0,3.385h-12.932c-0.127-1.406-0.089-1.497,0-3.385
  C142.227-1.1,144.055-6.02,148.412-5.998 M144.688,3.389c-0.051,0.988-0.066,0.973,0,1.713h7.346c0.076-0.744,0.059-0.725,0-1.713
  c-0.134-2.933-1.375-6.682-3.669-6.669C146.072-3.292,144.831,0.457,144.688,3.389 M-22.449-6.41
  c4.363-0.025,6.051,5.307,6.326,10.869c0.094,1.889,0.132,1.979,0,3.386h-12.925c-0.132-1.407-0.094-1.497,0-3.386
  C-28.778-1.1-26.808-6.431-22.449-6.41 M-26.313,3.264c-0.043,0.992-0.069,1.094,0,1.838h7.355c0.069-0.744,0.053-0.843,0-1.838
  c-0.146-2.923-1.384-6.556-3.675-6.543C-24.932-3.292-26.164,0.345-26.313,3.264 M26.525-2.895c2.47,0,4.47,7.751,4.47,17.305
  c0,9.557-2,17.306-4.47,17.306c-2.467,0-4.474-7.749-4.474-17.306C22.051,4.857,24.058-2.895,26.525-2.895 M19.411,14.411
  c0,11.279,2.028,20.35,7.114,20.422c5.227,0.07,7.116-9.143,7.116-20.422c0-11.275-2.027-20.349-7.116-20.418
  C21.579-6.07,19.411,3.135,19.411,14.411 M-22.334,34.685c3.548,0.017,5.42-3.313,6.15-7.556l17.033-0.01
  c-0.862-4.251-0.96-5.141-1.055-8.453l-28.696,0.01c-0.111,1.286,0.009,3.442,0.107,5.434
  C-28.521,29.669-26.692,34.709-22.334,34.685 M-2.811,21.426c0.053,1.467,0.053,1.477,0.263,2.919h-16.11
  c-0.008,0.218-0.017,0.461-0.046,0.964c-0.147,2.931-1.38,6.68-3.676,6.662c-2.289,0.018-3.531-3.731-3.675-6.662
  c-0.048-0.99-0.224-3.137-0.155-3.879h23.399V21.426z M148.533,34.685c3.552,0.017,5.422-3.354,6.144-7.598h19.427
  c-2.445,29.578-43.345,29.813-46.926,6.364v15.272H98.978v-15.44c-2.461,15.088-11.095,17.176-14.882,17.167
  c-3.169-0.017-10.961-2.625-13.828-10.587l0.269,8.666c0.059,5.377,3.488,8.781,7.141,9.276V70.31L44.77,70.318V57.806
  c2.763-0.085,7.191-2.789,7.24-8.827V26.315C51,32.018,46.778,50.443,26.533,50.443c-20.056,0-24.593-19.456-25.452-22.316
  c-3.744,21.206-17.84,22.375-24.033,22.286c-11.12-0.138-17.779-7.786-17.942-7.954c-6.69-6.801-7.979-17.086-7.707-28.178
  c0-2.237,0.574-6.572,0.775-8.703c-7.199,7.728-13.864,6.768-21.785,7.063l-6.644-0.012v12.672
  c-0.009,5.099,1.868,8.15,7.558,8.192v15.238h-39.074V33.805c5.69-0.043,7.638-3.363,7.63-8.467v-45.188
  c0-1.073-0.262-8.067-7.604-8.124v-15.024h42.171c7.948,0,13.598,2.421,17.405,5.419c7.034,5.54,8.439,15.062,9.009,22.113
  C-28.414-24.814-2.955-26.9,1.303,1.075c4.604-21.31,20.31-22.92,23.992-22.938c6.598-0.025,17.874,3.969,21.542,14.749v-13.296
  h23.096v8.551c1.702-6.457,7.401-9.961,13.184-9.996c5.568-0.034,16.982,6.158,19.909,29.715v-31.371
  c-0.017-4.527-2.784-6.863-7.313-6.837l-0.017-12.512h26.891V7.88c2.453-22.48,14.989-29.671,25.548-29.671
  c10.727,0,18.324,5.978,22.22,13.623c4.986,9.791,4.629,20.13,4.331,26.834l-32.715,0.01c-0.113,1.286,0.009,3.442,0.109,5.434
  C142.348,29.669,144.18,34.709,148.533,34.685 M152.202,24.345c0,0.218-0.017,0.461-0.041,0.964
  c-0.144,2.931-1.385,6.68-3.67,6.662c-2.298,0.018-3.531-3.731-3.677-6.662c-0.051-0.99-0.227-3.158-0.151-3.895h32.48
  c0.402-5.112,1.668-19.078-4.243-30.611c-4.655-9.082-12.454-15.409-24.69-15.405c-10.806,0-18.407,5.482-22.844,12.334
  l0.034-33.348H92.995v18.389c4.529-0.021,7.288,0.396,7.313,4.92v10.168c-3.078-6.776-10.047-12.934-18.529-12.459
  c-3.581,0.201-6.218,1.742-9.053,3.791v-2.353H44.103v5.876c-4.927-5.044-10.781-7.323-18.415-7.323
  c-12.246,0-20.404,7.68-24.205,16.521c-2.176-6.311-9.453-16.521-23.628-16.521c-5.809,0-11.207,2.061-15.177,4.512
  c-0.584-7.261-3.862-15.488-9.237-19.735c-4.344-3.434-10.785-5.92-19.385-5.942h-44.519v20.605
  c5.758,0.043,7.609,1.371,7.605,7.059v41.973c0.004,5.519-1.409,7.029-7.605,7.078v21.034l44.506-0.034V30.895
  c-6.133-0.043-7.521-1.553-7.514-7.062v-8.328l7.13,0.044c9.137,0.218,12.282-1.139,15.18-3.407
  c-0.558,3.645-0.279,10.382,0.061,12.957c1.583,13.108,5.547,16.638,9.354,20.505c5.228,5.296,12.397,7.605,19.044,7.648
  C-4.414,53.353,0.41,39.091,1.404,36.698c6.118,14.398,18.282,16.597,25.305,16.55c13.883-0.097,19.453-6.612,22.593-12.382v7.145
  c-0.042,4.99-1.165,7.33-7.179,7.439l0.008,18.114h38.343V55.45c-5.816-0.101-6.985-4.252-7.161-6.928
  c3.547,4.671,10.146,4.948,10.927,4.805c2.792,0.273,9.007-0.527,12.118-6.18v4.771h33.662v-6.395
  c4.872,5.229,11.977,7.75,18.618,7.75c11.062,0,26.878-6.051,28.296-28.921h-24.732V24.345z"/>`;J({slug:"people-magazine-logo",label:"People Magazine logo",viewBox:"-110.463 -45.771 288 119.335",inner:qe});J({slug:"seated",label:"seated",viewBox:"0 0 263 246",inner:'<path d="M217.587 0.72242L45.418 0.000420273C20.294 -0.10558 1.065 19.8544 0 43.1444C0 66.7344 24.862 90.4524 108.631 101.07L108.732 101.084C172.732 109.964 211.236 125.473 230.284 152.18L260.41 60.0384C269.95 30.8594 248.285 0.85142 217.587 0.72242ZM213.52 203.458C222.448 167.542 193.071 143.378 94.354 130.153C62.764 126.397 37.725 120.002 18.565 110.788L51.141 213.328C57.088 232.051 74.436 244.798 94.08 244.88L166.871 245.185C178.439 245.185 204.308 240.514 213.52 203.458Z" fill="currentColor" style="fill-opacity:1;"/>'});const e0={shopify:{company:"Shopify",companyIcon:"shopifyLogo",story:"/case-studies/shopify/",quote:"For Shopify, the real challenge is not about how many different pieces of complex technology we can use but the opposite. Cloudflare helps us find a simple way to achieve something very complex that we can scale and maintain.",person:{image:"/people/duncan-davidson.png",name:"Duncan Davidson",title:"VP of Developer Productivity"}}},ge=["shopify","characterAI","intercom","doordash","discord","zendesk","lovable","npm","siteGPT","liveblocks","leagued","seated","people"];function te(r){return r.replace(/-2$/,"")}function a0(r){return ge.includes(r)}function r0(r=ge){return[...r,...r.map(e=>`${e}-2`)]}const se="shopify";function o0(r,e,a){return e[r]??a}const t0="border-border-100 bg-background-200 rounded-md border border-dashed",s0=P.NORMAL,i0=150,n0=500,ie=fe.NORMAL,ne=P.FAST,c0=260,ce="var(--color-foreground-100)",l0="var(--color-accent-100)";function p0({text:r}){const e=q()??!1,a=n.useMemo(()=>r.split(/\s+/).filter(Boolean),[r]),[t,i]=Oe();return n.useEffect(()=>{if(e||!t.current)return;let c=!1;return(async()=>(await i(t.current,{opacity:0},{duration:0}),!c&&(await i(t.current,{opacity:1},{duration:s0,ease:"easeOut"}),!c&&(await new Promise(b=>setTimeout(b,i0)),!c&&(await i(".browser-quote-word",{color:l0},{duration:ne,delay:oe(ie),ease:"easeOut"}),!c&&(await new Promise(b=>setTimeout(b,n0)),!c&&await i(".browser-quote-word",{color:ce},{duration:ne,delay:oe(ie),ease:"easeOut"})))))))(),()=>{c=!0}},[e,i,t]),e?o.jsx("span",{children:r}):o.jsx("span",{ref:t,className:"opacity-0",children:a.map((c,s)=>o.jsxs(n.Fragment,{children:[s>0?" ":null,o.jsx("span",{className:"browser-quote-word",style:{color:ce},children:c})]},`${s}-${c}`))})}const U={container:{hidden:{},show:{transition:{staggerChildren:fe.NORMAL,delayChildren:.05}}},item:{hidden:{opacity:0},show:{opacity:1,transition:{duration:P.NORMAL,ease:"easeOut"}}}};function b0({children:r,className:e,frameClassName:a="inset-0"}){return o.jsxs("div",{className:y("relative",e),children:[o.jsx("div",{"aria-hidden":!0,className:y("pointer-events-none absolute z-0",t0,a)}),o.jsx("div",{className:"relative z-10",children:r})]})}const f0="relative size-32 shrink-0 sm:size-36 md:size-40";function le({quote:r,variant:e="background",className:a}){const t=e==="solo";return o.jsx("span",{"aria-hidden":!0,className:y(t?"text-foreground-200 h-10 w-32 sm:h-12 sm:w-40 md:h-[3.75rem] md:w-48 xl:h-[4.5rem] xl:w-[12.5rem]":"text-foreground-200 size-[4.5rem] sm:size-20 md:size-24",a),children:o.jsx(be,{value:r.image,fallback:r.companyIcon,alt:"",className:t?"h-full w-full":"size-full",imageClassName:t?"h-full w-full":"max-h-[72%] max-w-[72%] opacity-35"})})}function d0({quote:r,personImageCmsPath:e}){const a=r.person?.image,t=r.person?.name??r.company;return a?o.jsxs("div",{className:y(f0,"rounded-xl"),children:[o.jsx("div",{className:"absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl",children:o.jsx(le,{quote:r})}),o.jsx("img",{src:a,alt:t,width:64,height:64,className:"absolute bottom-0 left-0 z-10 size-14 border-2 object-cover shadow-sm rounded-full sm:size-16",loading:"lazy",decoding:"async","data-cms-path":e,"data-cms-type":"text"})]}):o.jsx("div",{className:y("bg-background-200 relative inline-flex h-auto w-fit shrink-0 items-center justify-center rounded-xl px-3 py-2 sm:px-4 sm:py-2.5"),children:o.jsx(le,{quote:r,variant:"solo"})})}function m0({quoteKey:r,quotes:e,className:a,cmsPathPrefix:t}){const i=o0(r,e,e0.shopify),c=he(i.story),s=p=>t?`${t}.${p}`:`quotes.${r}.${p}`,b=!!i.person?.name,f=i.quote.trim().length>c0;return o.jsx(E.div,{className:y("bg-background-100 relative flex h-full w-full items-start justify-between overflow-hidden",a),children:o.jsx(We,{mode:"wait",initial:!1,children:o.jsx(E.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:P.FAST,ease:"easeOut"},className:"relative flex h-full w-full flex-col items-stretch justify-start gap-5 px-6 pt-3 pb-6 sm:gap-6 sm:p-8 md:gap-6 md:p-10 lg:p-16 xl:p-20",children:o.jsx(b0,{className:"w-full px-5 py-6 pl-8 sm:p-5 sm:pl-8 xl:p-9 xl:pl-12",frameClassName:"inset-0 rounded-lg",children:o.jsxs(E.div,{className:"grid w-full gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:grid-rows-[auto_auto] sm:items-start sm:gap-5 sm:gap-x-10 sm:gap-y-6 md:gap-x-12",variants:U.container,initial:"hidden",animate:"show",children:[o.jsx(E.div,{variants:U.item,className:"-mr-12 flex w-full shrink-0 justify-end sm:col-start-2 sm:mr-0 sm:row-span-2 row-start-3 -mt-6 sm:mt-0",children:o.jsx("div",{"data-cms-path":s("image"),"data-cms-type":"text",children:o.jsx(d0,{quote:i,personImageCmsPath:s("person.image")})})}),o.jsx(E.div,{variants:U.item,className:"min-w-0 sm:col-start-1 sm:row-start-1",children:o.jsx("blockquote",{className:"m-0 border-0 p-0",children:o.jsxs("h3",{className:y("browser-testimony-quote text-foreground-100 relative font-normal text-balance",f&&"browser-testimony-quote--compact-desktop"),"data-cms-path":s("quote"),"data-cms-type":"text",children:[o.jsx("span",{className:"text-foreground-100/40 md:text-foreground-200 absolute -left-4","aria-hidden":"true",children:"“"}),o.jsx(p0,{text:i.quote},r),o.jsx("span",{className:"text-foreground-100/40 md:text-foreground-200 ml-1","aria-hidden":"true",children:"”"})]})})}),o.jsxs(E.div,{variants:U.item,className:"flex flex-col items-start gap-2 sm:col-start-1 sm:row-start-2",children:[b?o.jsxs("p",{className:"text-secondary min-w-0",children:[o.jsx("strong",{className:"text-foreground-100 font-medium","data-cms-path":s("person.name"),"data-cms-type":"text",children:i.person?.name}),", ",o.jsx("span",{"data-cms-path":s("person.title"),"data-cms-type":"text",children:i.person?.title}),", ",o.jsx("span",{"data-cms-path":s("company"),"data-cms-type":"text",children:i.company})]}):o.jsx("p",{className:"text-secondary min-w-0",children:o.jsx("strong",{className:"text-foreground-100 font-medium","data-cms-path":s("company"),"data-cms-type":"text",children:i.company})}),c?o.jsx(pe,{variant:"link",href:c,className:"shrink-0 font-normal text-accent-100 text-(length:--type-p-size)! leading-(--type-p-leading)! md:text-(length:--type-p-size-md)! md:leading-(--type-p-leading)!","data-cms-path":s("story"),"data-cms-type":"text",children:"Read the story"}):null]})]})})},r)})})}function g0({quoteKey:r,quotes:e,beamActive:a=!1,className:t,cmsPathPrefix:i}){return o.jsx("div",{className:y("flex h-full min-h-0 w-full flex-col items-start justify-start overflow-hidden",t),children:o.jsx(Je,{className:"customer-browser-beam h-full min-h-0 w-full",size:"md",colorVariant:"mono",staticColors:!0,theme:"light",active:a,duration:K,borderRadius:je,hueRange:0,strength:1,brightness:1.75,saturation:1.4,style:{"--customer-browser-beam-duration":`${K}s`},children:o.jsx(m0,{quoteKey:r,quotes:e,className:"h-full w-full",cmsPathPrefix:i})})})}const x0=8e3,u0=["fade","slide-up","scale-up"],h0=16,$0={layout:{type:"spring",stiffness:420,damping:36,mass:.85}},z0={layout:{duration:0}};function v0(){return o.jsxs("div",{"aria-hidden":!0,className:"flex shrink-0 items-center gap-1.5 px-4 py-3 sm:px-5 sm:py-4 md:py-5",children:[o.jsx("div",{className:"hover:bg-background-300 bg-background-100 size-4 rounded-full border border-border-100 transition-colors duration-200 ease-out"}),o.jsx("div",{className:"hover:bg-background-300 bg-background-100 size-4 rounded-full border border-border-100 transition-colors duration-200 ease-out"}),o.jsx("div",{className:"hover:bg-background-300 bg-background-100 size-4 rounded-full border border-border-100 transition-colors duration-200 ease-out"})]})}function y0({className:r}){return o.jsxs("svg",{viewBox:"0 0 16 16",fill:"none","aria-hidden":!0,className:r,children:[o.jsx("rect",{x:"4",y:"3",width:"2.5",height:"10",rx:"1",fill:"currentColor"}),o.jsx("rect",{x:"9.5",y:"3",width:"2.5",height:"10",rx:"1",fill:"currentColor"})]})}const xe=n.memo(({quoteKey:r,quote:e,isActive:a,onSelect:t,layoutTransition:i,tabId:c,panelId:s,iconOnly:b=!1,iconLarge:f=!1})=>{const p=e?.company??r,d=a?`Currently showing the ${p} customer story`:`Show the ${p} customer story`,m=!!(e?.favicon?.trim()||e?.companyIcon?.trim());return o.jsx(E.button,{layout:"position",layoutScroll:!0,type:"button",id:c,"aria-controls":s,"aria-current":a?"true":void 0,"aria-label":d,onClick:t,transition:i,className:y("group relative flex shrink-0 items-center border-b-2 px-1.5 py-2 transition-[border-color,color] duration-200 ease-out sm:px-2 sm:py-3 md:px-3 md:py-4",a?"border-accent-100 text-foreground-100":"border-transparent text-secondary"),children:o.jsxs("span",{className:y("flex items-center border border-transparent rounded-md transition-colors duration-200 ease-out",b?"gap-0 px-2.5 py-2 sm:px-3":"gap-2.5 px-2 py-2 sm:px-2.5",a?"bg-background-100 border-border-100 text-foreground-100 group-hover:text-foreground-100/80":"group-hover:bg-background-100 group-hover:border-border-100 group-hover:text-foreground-100/80"),children:[m?o.jsx("span",{"aria-hidden":!0,className:y("shrink-0",f?"h-6 w-14 sm:w-16 md:w-20":"size-6"),children:o.jsx(be,{value:e?.favicon,fallback:e?.companyIcon,alt:"",className:y(f?"h-6 w-14 sm:w-16 md:w-20":"size-6"),imageClassName:y(f?"h-6 w-14 sm:w-16 md:w-20":"size-6")})}):o.jsx("span",{"aria-hidden":!0,className:y("bg-background-200 shrink-0 rounded-sm",f?"h-6 w-14 sm:w-16 md:w-20":"size-6")}),b?null:o.jsx("small",{className:"whitespace-nowrap font-medium!",children:p})]})})});xe.displayName="CompanyTab";function _0({quotes:r,quoteKeys:e,staticMode:a=!1,staticCmsPathPrefix:t,tabIconOnly:i=!1,largeTabIcon:c=!1}){const s=q()??!1,b=n.useId(),f=s?z0:$0,p=r[se],d=a?p?{[se]:p}:{}:r,m=n.useMemo(()=>e.filter(l=>r[l]),[e,r]),g=n.useMemo(()=>a?Object.keys(d).filter(a0):[],[d,a]),{ref:u,isInView:z}=$e({threshold:.2,rootMargin:"100px"}),[v,h]=n.useState(()=>a?g:r0(m)),[H,w]=n.useState(!1),[Y,C]=n.useState(!1),[O,k]=n.useState(!1),[$,W]=n.useState(!1),[j,N]=n.useState(!1),[F,S]=n.useState(!1),M=n.useRef(null),X=n.useRef(!0),A=n.useRef(!1),I=n.useCallback(()=>{const l=M.current;l&&N(l.scrollWidth>l.clientWidth+1)},[]),T=a?g[0]??null:v.length>0?te(v[0]):null,L=`${b}-customer-story-panel`,_=$||Y||O;n.useEffect(()=>{!s||A.current||W(!0)},[s]),n.useEffect(()=>{if(s){S(!1);return}if(X.current){X.current=!1;return}S(!1);const l=requestAnimationFrame(()=>{requestAnimationFrame(()=>S(!0))});return()=>cancelAnimationFrame(l)},[T,s]),n.useEffect(()=>{if(!F||s)return;const l=window.setTimeout(()=>S(!1),K*1e3);return()=>window.clearTimeout(l)},[F,s]),n.useEffect(()=>{if(z&&!H){const l=setTimeout(()=>w(!0),10);return()=>clearTimeout(l)}z||w(!1)},[z,H]);const B=n.useCallback(()=>{h(l=>l.length>1?[l[l.length-1],...l.slice(0,-1)]:l)},[]);n.useEffect(()=>{if(a||!H||!z||_)return;const l=setInterval(B,x0);return()=>clearInterval(l)},[H,z,_,B,a]),n.useEffect(()=>{if(!a)return re($),()=>{$&&re(!1)}},[$,a]),n.useEffect(()=>{const l=M.current;if(!l)return;I();const x=new ResizeObserver(I);return x.observe(l),()=>x.disconnect()},[I]);const D=n.useCallback(l=>{l!==0&&(h(x=>[...x.slice(l),...x.slice(0,l)]),M.current?.scrollTo({left:0,behavior:"smooth"}))},[]),Q=n.useCallback(l=>{l.currentTarget.contains(l.relatedTarget)||k(!1)},[]);return T?o.jsx(E.div,{ref:u,className:"relative h-full w-full",role:"region","aria-roledescription":"carousel","aria-label":"Customer stories",onFocusCapture:()=>k(!0),onBlurCapture:Q,children:o.jsxs(ze.div,{className:"bg-background-200 shadow-stack relative flex h-full w-[calc(100%+24px)] max-w-none translate-x-2 flex-col overflow-hidden rounded-xl border sm:mx-auto sm:w-full sm:max-w-[1200px] sm:translate-x-0",animation:u0,delay:.2,duration:P.SLOW,visible:z,children:[o.jsxs("div",{className:"border-border-100 relative flex shrink-0 items-stretch border-b",children:[o.jsx(v0,{}),o.jsxs("div",{className:"relative min-w-0 flex-1 mask-l-from-95% -ml-5",children:[o.jsx("nav",{ref:M,"aria-label":"Choose a customer story",className:"scrollbar-hide pl-5 overflow-x-auto overscroll-x-contain overflow-y-hidden touch-pan-x",onMouseEnter:()=>C(!0),onMouseLeave:()=>C(!1),children:o.jsx(Ce,{id:"customer-browser-tabs",children:o.jsx("div",{className:"-mb-px flex w-max items-stretch justify-start",children:v.slice(0,h0).map((l,x)=>{const R=te(l),V=a?d:r;return o.jsx(xe,{quoteKey:R,quote:V[R],isActive:x===0,onSelect:()=>D(x),layoutTransition:f,tabId:`${b}-customer-story-tab-${R}`,panelId:L,iconOnly:i,iconLarge:c},l)})})})}),o.jsx("div",{"aria-hidden":!0,className:y("pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background-200 to-transparent transition-opacity duration-200",j?"opacity-100":"opacity-0")})]})]}),o.jsxs("section",{id:L,"aria-roledescription":"slide","aria-label":`Story: ${r[T]?.company??T}`,"aria-live":_?"polite":"off","aria-atomic":"true",className:"relative min-h-0 flex-1 overflow-hidden",children:[!a&&o.jsxs(pe,{type:"button",variant:"outline",size:"xs","aria-pressed":$,"aria-label":$?"Resume customer story and logo rotation":"Pause customer story and logo rotation",onClick:()=>{A.current=!0,W(l=>!l)},className:y("group absolute top-3 left-3 z-30 w-9 justify-start gap-1.5 overflow-hidden bg-background-100/90 px-2.5 py-1.5 transition-[width,color,background-color,border-color,transform,translate]! duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] backdrop-blur-md motion-reduce:transition-none! sm:top-4 sm:left-4",$?"hover:w-[4.5rem] focus-visible:w-[4.5rem]":"hover:w-[5rem] focus-visible:w-[5rem]"),children:[$?o.jsx(de,{className:"size-4 shrink-0","aria-hidden":!0}):o.jsx(y0,{className:"size-4 -translate-x-px shrink-0"}),o.jsx("small",{className:"whitespace-nowrap opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none",children:$?"Play":"Pause"})]}),o.jsx(g0,{quoteKey:T,quotes:a?d:r,beamActive:F,className:"h-full",cmsPathPrefix:t})]})]})}):null}export{_0 as Browser};
