import{a as P,b as C,c as H,d as O,e as F,g as V}from"./chunk-R7GPEXD2.js";import{a as A}from"./chunk-J7NTLVPZ.js";import{a as $}from"./chunk-M65MOCFB.js";import{$ as u,Ca as S,Da as I,F as b,Ga as L,g as w,qa as x,sa as M,ya as k}from"./chunk-2PJ4KWGC.js";import"./chunk-5WLRVGM2.js";var G="0.1.23";var X=(o,e)=>{let{offset:t,animation:i,duration:r,easing:s,placement:n,trigger:a,triggerout:l,flip:p,arrow:d}=e,g=`${L(t?.toString()||"",o)||"0"}`,y=o.getAttribute("fs-tooltip-instance")||"";return{...e,instance:y,target:o,animation:i,duration:r,easing:s,placement:u(n)&&n?n:"top",trigger:u(a)&&a?a:"hover",triggerout:u(l)&&l?l:"hover",flip:p,offset:g,arrow:d,tooltipSelector:`[fs-tooltip-instance="${y}"] [fs-tooltip-element="tooltip"]`,tooltipActiveSelectorAttribute:"fs-tooltip-active",tooltipActiveSelector:`[fs-tooltip-instance="${y}"] [fs-tooltip-element="tooltip"][fs-tooltip-active]`,isTransitioning:!1,virtual:!1,show:()=>Promise.resolve(),hide:()=>Promise.resolve(),updatePosition:()=>Promise.resolve(),destroy:()=>{}}};var T=["target","tooltip","richtext-tooltip-template","arrow"],v={animation:{key:"animation",values:{fade:"fade","slide-up":"slide-up","slide-down":"slide-down","slide-left":"slide-left","slide-right":"slide-right",grow:"grow",shrink:"shrink",spin:"spin"}},duration:{key:"duration"},easing:{key:"easing",values:{linear:"linear",ease:"ease",easein:"ease-in",easeout:"ease-out"}},trigger:{key:"trigger",values:{hover:"hover",click:"click"}},triggerout:{key:"triggerout",values:{hover:"hover",click:"click"}},placement:{key:"placement",values:{top:"top","top-start":"top-start","top-end":"top-end",right:"right","right-start":"right-start","right-end":"right-end",bottom:"bottom","bottom-start":"bottom-start","bottom-end":"bottom-end",left:"left","left-start":"left-start","left-end":"left-end"}},offset:{key:"offset"},arrow:{key:"arrow"},padding:{key:"padding"},content:{key:"content"},flip:{key:"flip"},setup:{key:"setup",values:{simple:"simple",richtext:"richtext",virtual:"virtual"}},width:{key:"width"},height:{key:"height"}};var Y=o=>{let{tooltipSelector:e,tooltipActiveSelector:t,animation:i,easing:r,duration:s,instance:n}=o,a="";i?a=`
    ${e} {
      opacity: 0 !important;
      display: block !important;
      transition-duration: ${s}ms;
      transition-timing-function: ${r};
      transition-property: opacity, transform;
    }

    ${t} {
      opacity: 1 !important;
    }

    ${W(e,t,i)}
  `:a=`
      ${e} {
        opacity: 0 !important;
        display: block !important;
      }
      ${t} {
        opacity: 1 !important;
      }
    `;let l=document.querySelector(`style[fs-tooltip-instancestyles="${n}"]`);if(l)return l;let p=document.createElement("style");return p.setAttribute("fs-tooltip-instancestyles",n),p.textContent=a,document.head.appendChild(p),p},W=(o,e,t)=>{let i={fade:`
      ${o} {
        transition-property: opacity;
      }
    `,"slide-up":`
      ${o} {
        transform: translateY(10px);
      }
      ${e} {
        transform: translateY(0);
      }
    `,"slide-down":`
      ${o} {
        transform: translateY(-10px);
      }
      ${e} {
        transform: translateY(0);
      }
    `,"slide-left":`
      ${o} {
        transform: translateX(10px);
      }
      ${e} {
        transform: translateX(0);
      }
    `,"slide-right":`
      ${o} {
        transform: translateX(-10px);
      }
      ${e} {
        transform: translateX(0);
      }
    `,grow:`
      ${o} {
        transform: scale(0.95);
      }
      ${e} {
        transform: scale(1);
      }
    `,shrink:`
      ${o} {
        transform: scale(1.05);
      }
      ${e} {
        transform: scale(1);
      }
    `,spin:`
      ${o} {
        transform: rotate(-180deg);
      }
      ${e} {
        transform: rotate(0);
      }
    `};return i[t]||i.fade};var{getAttribute:it,getInstance:N,queryElement:ot,getElementSelector:st,queryAllElements:q}=k(b,T,v);var m=A({activeTooltip:null,lastTarget:null}),h=new Map,c=o=>h.get(o),j=o=>{let t=o.composedPath().filter(s=>s instanceof HTMLElement&&s.getAttribute("tooltip-element")==="target");if(!t.length)return null;let i=m.get();if(i.activeTooltip?.trigger==="click"){let s=t.find(n=>c(n)?.trigger==="click"&&c(n)===i.activeTooltip);if(s)return s}let r=t.find(s=>c(s)?.virtual);if(r){let s=c(r);if(s){let n=r.getBoundingClientRect();if(o.clientX>=n.left&&o.clientX<=n.right&&o.clientY>=n.top&&o.clientY<=n.bottom)return r;i.activeTooltip===s&&s.hide()}return null}for(let s of t){let n=c(s);if(!n)continue;let a=s.getBoundingClientRect();if(o.clientX>=a.left&&o.clientX<=a.right&&o.clientY>=a.top&&o.clientY<=a.bottom&&n.trigger==="hover")return s}return null},E;document.addEventListener("mousemove",o=>{E&&window.clearTimeout(E),E=window.setTimeout(()=>{let e=j(o),t=m.get();if(!e)return;let i=c(e);i&&(t.activeTooltip?.trigger==="click"&&!i.virtual&&i!==t.activeTooltip||(t.activeTooltip!==i&&!i.isTransitioning?i.show(o):i.virtual&&t.activeTooltip===i&&i.updatePosition(o.clientX,o.clientY)))},16)});var f=class{target;tooltip;arrowElement;placement;trigger;triggerOut;animation;duration;easing;offset;virtual;instance;isTransitioning=!1;tooltipSelector;tooltipActiveSelectorAttribute;tooltipActiveSelector;setup;flip;triggerout;arrow;fscomponentclass;fscomponentinstance;fscomponentname;fscomponentlastupdate;cleanupFns=[];isVisible=!1;updateFn;hideTimeout;constructor(e,t){this.target=e,this.placement=t.placement,this.trigger=t.trigger,this.triggerOut=t.triggerout,this.animation=t.animation||"",this.duration=t.duration||"0",this.easing=t.easing||"ease-out",this.setup=t.setup||"virtual",this.flip=t.flip==="true"?"true":"false",this.offset=t.offset||"0",this.virtual=t.setup==="virtual",this.tooltip=e?.querySelector(':scope > [fs-tooltip-element="tooltip"]'),this.arrowElement=this.tooltip?.querySelector('[fs-tooltip-element="arrow"]'),this.instance=t.instance,this.tooltipSelector=t.tooltipSelector,this.tooltipActiveSelectorAttribute=t.tooltipActiveSelectorAttribute,this.tooltipActiveSelector=t.tooltipActiveSelector,this.triggerout=t.triggerout,this.arrow=t.arrow==="true"?"true":"false",this.fscomponentclass=t.fscomponentclass||"",this.fscomponentinstance=t.fscomponentinstance||"",this.fscomponentname=t.fscomponentname||"",this.fscomponentlastupdate=t.fscomponentlastupdate||"",this.init(),h.set(e,this)}init=()=>{this.target.style.position="relative",this.tooltip.style.position=(this.virtual,"fixed"),this.tooltip.style.pointerEvents="none",Y(this),this.trigger==="hover"&&(this.target.addEventListener("mouseenter",this.handleMouseEnter),this.target.addEventListener("mousemove",this.handleMouseMove)),this.triggerOut==="hover"&&this.target.addEventListener("mouseleave",this.handleMouseLeave),this.trigger==="click"&&this.target.addEventListener("click",this.handleClick),this.triggerOut==="click"&&document.addEventListener("click",this.handleClickOutside),this.cleanupFns.push(()=>{this.target.removeEventListener("mouseenter",this.handleMouseEnter),this.target.removeEventListener("mouseleave",this.handleMouseLeave),this.target.removeEventListener("mousemove",this.handleMouseMove),this.target.removeEventListener("click",this.handleClick),document.removeEventListener("click",this.handleClickOutside),this.updateFn?.(),this.hideTimeout&&clearTimeout(this.hideTimeout)})};handleMouseEnter=async e=>{!this.isVisible&&this.trigger==="hover"&&await this.show(e)};handleMouseLeave=()=>{this.triggerOut==="hover"&&(this.hideTimeout=window.setTimeout(()=>{this.hide()},50))};handleMouseMove=e=>{this.isVisible&&this.virtual&&this.updatePosition(e.clientX,e.clientY)};handleClick=async e=>{e.stopPropagation(),m.get().activeTooltip?.target===this.target?await this.hide():await this.show(e)};handleClickOutside=e=>{let t=e.target;this.target.contains(t)||this.hide()};computeUpdatePositon=e=>{let t=[C(Number(this.offset)),this.flip==="true"||this.virtual?O({fallbackAxisSideDirection:"start",fallbackStrategy:"bestFit",boundary:this.virtual?this.target:void 0}):void 0,H({padding:5,boundary:this.virtual?this.target:void 0}),this.arrow==="true"&&this.arrowElement?F({element:this.arrowElement}):void 0].filter(Boolean);V(e,this.tooltip,{placement:this.placement,middleware:t,strategy:(this.virtual,"fixed")}).then(({x:i,y:r,placement:s,middlewareData:n})=>{if(Object.assign(this.tooltip.style,{left:`${i}px`,top:`${r}px`}),this.arrow==="true"&&this.arrowElement&&n.arrow){let{x:a,y:l}=n.arrow,p={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];this.arrowElement.style.setProperty("inset","auto","important"),this.arrowElement.style.setProperty("left",`${a}px`,"important"),this.arrowElement.style.setProperty("top",`${l}px`,"important"),this.arrowElement.style.setProperty("right","auto","important"),this.arrowElement.style.setProperty("bottom","auto","important"),p&&this.arrowElement.style.setProperty(p,"-4px","important")}})};updatePosition=async(e,t)=>{let i=this.virtual&&e!==void 0&&t!==void 0?this.createVirtualElement(e,t):this.target;this.updateFn?.(),this.updateFn=P(i,this.tooltip,()=>this.computeUpdatePositon(i)),this.cleanupFns.push(()=>this.updateFn?.())};createVirtualElement=(e,t)=>{let i=this.target.getBoundingClientRect(),r=Math.min(Math.max(e,i.left),i.right),s=Math.min(Math.max(t,i.top),i.bottom);return{getBoundingClientRect(){return{width:0,height:0,x:r,y:s,top:s,right:r,bottom:s,left:r}}}};show=async e=>{this.isTransitioning||this.isVisible||(this.isTransitioning=!0,this.tooltip.setAttribute(this.tooltipActiveSelectorAttribute,""),this.tooltip.setAttribute("aria-hidden","false"),this.virtual&&e?await this.updatePosition(e.clientX,e.clientY):await this.updatePosition(),this.isVisible=!0,this.isTransitioning=!1)};hide=async()=>{if(this.isTransitioning||!this.isVisible)return;this.isTransitioning=!0,this.tooltip.removeAttribute(this.tooltipActiveSelectorAttribute),this.tooltip.setAttribute("aria-hidden","true"),this.isVisible=!1,this.isTransitioning=!1,m.get().activeTooltip?.target,this.target};destroy=()=>{this.cleanupFns.forEach(t=>t()),this.cleanupFns=[],h.delete(this.target);let e=document.querySelector(`style[fs-tooltip-instancestyles="${this.instance}"]`);this.target&&this.target.remove(),e&&e.remove(),this.isVisible=!1}};var R=w("tooltip"),B=(o,e)=>{let t=[];return o.forEach(i=>{let r=i.querySelector(':scope > [fs-tooltip-element="tooltip"]'),s=i.querySelector(':scope > [fs-tooltip-element="arrow"]');if(!r||!i)return;let n=i.getAttribute("id")||`tooltip-${Math.floor(Math.random()*1e4)}`;r.id=n,r.setAttribute("role","tooltip"),r.setAttribute("aria-hidden","true"),i.setAttribute("aria-describedby",n);let a=N(i);if(!a){R.error({},"No instance index found for the tooltip",i);return}let l=e.instances[a];if(!l?.setup){R.error({},"No configs found for the tooltip",i);return}let d={...X(i,l),arrowElement:s,tooltip:r,target:i},g=new f(i,d);t.push(g)}),t};var D=async o=>({init:async()=>{let t=$(M);t||(await I(),await S());let i=[],r=q("target");return i.push(...B(r,o)),o?.resetix&&await x(),{result:i,destroy(){t||i.forEach(s=>{s.destroy?.()})}}},version:"1.0.0"});export{T as ELEMENTS,v as SETTINGS,D as init,G as version};
