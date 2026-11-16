const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["/assets/-SWV3FE67-Da9eT2E2.js","/assets/rolldown-runtime-B0Z9INg1.js","/assets/vendors-D1Zalr9i.js","/assets/vite-DdJffFJk.js","/assets/hls.js-CLbMnAaJ.js"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{z as t}from"./vendors-D1Zalr9i.js";import{i as n}from"./vite-DdJffFJk.js";var r=e(t(),1),i=({condition:e,fallback:t,children:n,...i})=>e?r.createElement(r.Suspense,{fallback:t,...i},n):r.createElement(r.Fragment,null,t),a=()=>{let[e,t]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{typeof window<`u`&&t(!0)},[]),e},o=(e,t)=>{let[n,i]=(0,r.useState)(!1);return(0,r.useEffect)(()=>{if(typeof IntersectionObserver==`function`){let n=new IntersectionObserver(([e])=>{i(e.isIntersecting)},t);return e.current&&n.observe(e.current),()=>{n.disconnect()}}},[e,t]),n},s=r.lazy(()=>n(()=>import(`./-SWV3FE67-Da9eT2E2.js`),__vite__mapDeps([0,1,2,3,4]),import.meta.url)),c=e=>{let{style:t,className:n,onIntersection:i,placeholder:a}=e,s=r.useRef(null),c=o(s);return(0,r.useEffect)(()=>{c&&i&&i()},[c,i]),r.createElement(r.Fragment,null,r.createElement(`mux-player`,{ref:s,"data-mux-player-react-lazy-placeholder":!0,placeholder:a??``,style:{"--mux-player-react-lazy-placeholder":a?`url('${a}');`:``,...t},className:n||``,nohotkeys:!0,"aria-hidden":!0,tabIndex:-1},r.createElement(`div`,{"data-mux-player-react-lazy-placeholder-overlay":!0})),r.createElement(`style`,null,`
        mux-player[data-mux-player-react-lazy-placeholder] {
          aspect-ratio: 16/9;
          display: block;
          background-color: var(--media-background-color, #000);
          width: 100%;
          position: relative;
          background-image: var(--mux-player-react-lazy-placeholder);
          background-repeat: no-repeat;
          background-size: var(--media-object-fit, contain);
          background-position: var(--media-object-position, 50% 50%);
          --controls: none;
          --controls-backdrop-color: rgba(0, 0, 0, 0.6);
        }
        mux-player [data-mux-player-react-lazy-placeholder-overlay] {
          position: absolute;
          inset: 0;
          background-color: var(--controls-backdrop-color);
        }
      `))},l={PAGE:`page`,VIEWPORT:`viewport`},u=r.forwardRef((e,t)=>{let{loading:n=l.VIEWPORT,...o}=e,u=a(),[d,f]=(0,r.useState)(()=>n!==l.VIEWPORT);return r.createElement(i,{condition:u&&d,fallback:r.createElement(c,{style:o.style,className:o.className,placeholder:o.placeholder,onIntersection:()=>f(!0)})},r.createElement(s,{...o,ref:t}))});export{u as default};
