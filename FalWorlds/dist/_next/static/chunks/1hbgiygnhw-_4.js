;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="3d9d5eb4-dd3a-b240-fb5a-4451a6a1c64a")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,162300,e=>{e.v({className:"EnzZPq_className",variable:"EnzZPq_variable"})},931823,e=>{"use strict";var r=e.i(843476),t=e.i(662537),n=e.i(648722);let a={className:n.default.className,style:{fontFamily:"'publicSansRounded', 'publicSansRounded Fallback'"}};null!=n.default.variable&&(a.variable=n.default.variable);var i=e.i(162300);let c={className:i.default.className,style:{fontFamily:"'focal', 'focal Fallback'"}};null!=i.default.variable&&(c.variable=i.default.variable);var o=e.i(271645);let s=`
  :root {
    color-scheme: light dark;
    --emergency-background: #ece8ff;
    --emergency-code: #48169c;
    --emergency-title: #202022;
    --emergency-copy: #494950;
    --emergency-primary-background: #202022;
    --emergency-primary-foreground: #fafafa;
    --emergency-primary-hover: #494950;
    --emergency-secondary-background: rgba(22, 22, 24, 0.05);
    --emergency-secondary-foreground: #19191a;
    --emergency-secondary-hover: rgba(22, 22, 24, 0.1);
    --emergency-ambient-purple: #48169c;
    --emergency-ambient-lime: #f0fccb;
  }

  * { box-sizing: border-box; }
  html, body { min-height: 100%; margin: 0; }

  body {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    background: var(--emergency-background);
    color: var(--emergency-title);
    font-family: var(--font-public-sans-rounded, "Public Sans Rounded"),
      ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
  }

  .emergency-header {
    position: relative;
    z-index: 10;
    height: 67px;
    flex: 0 0 67px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    background: var(--emergency-background);
  }

  .emergency-logo {
    display: block;
    width: 100px;
    height: 40px;
    color: var(--emergency-title);
    text-decoration: none;
  }

  .emergency-logo svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .emergency-main {
    --emergency-viewport-height: calc(100dvh - 67px);
    --emergency-track-height: min(800px, var(--emergency-viewport-height));
    --emergency-code-height: 156px;
    --emergency-copy-gap: 40px;
    --emergency-content-top: clamp(
      32px,
      calc(var(--emergency-track-height) / 2 - 168.8046875px),
      231.1953125px
    );
    position: relative;
    isolation: isolate;
    flex: 1;
    display: flex;
    min-height: var(--emergency-viewport-height);
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: auto;
    background: var(--emergency-background);
  }

  .emergency-decor {
    position: absolute;
    z-index: -1;
    inset: 0;
    pointer-events: none;
  }

  .emergency-decor-item {
    position: absolute;
    z-index: 0;
    display: block;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .emergency-decor-item--top-left {
    top: -86px;
    left: -192px;
    width: 555px;
    aspect-ratio: 555.126 / 474.403;
    background-image: url("/assets/error-pages/decor-top-left.svg");
  }

  .emergency-decor-item--bottom-right {
    right: -70px;
    bottom: 20px;
    width: 266px;
    aspect-ratio: 264.874 / 172.213;
    background-image: url("/assets/error-pages/decor-bottom-right.svg");
  }

  .emergency-pixels {
    position: absolute;
    z-index: 2;
    display: block;
    overflow: hidden;
    background: var(--emergency-background);
    box-shadow: 0 0 0 1px var(--emergency-background);
  }

  .emergency-pixels--top-right {
    top: 63px;
    right: 88px;
    width: 89px;
    height: 33px;
  }

  .emergency-pixels--left-middle {
    bottom: 241px;
    left: 57px;
    width: 24px;
    height: 16px;
  }

  .emergency-pixels--left-bottom {
    bottom: 93px;
    left: 188px;
    width: 8px;
    height: 8px;
  }

  .emergency-pixel-base { fill: var(--emergency-ambient-purple); }
  .emergency-pixel-accent { fill: var(--emergency-ambient-lime); }

  .emergency-track {
    position: relative;
    width: min(100%, 480px);
    height: var(--emergency-track-height);
    flex: 0 0 auto;
  }

  .emergency-content {
    position: absolute;
    top: var(--emergency-content-top);
    left: 0;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
    text-align: center;
  }

  .emergency-code {
    position: relative;
    width: 100%;
    height: var(--emergency-code-height);
    flex: 0 0 auto;
  }

  .emergency-code::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--emergency-code);
    mask-image: url("/assets/error-pages/code-500.svg");
    mask-position: 50% 50%;
    mask-repeat: no-repeat;
    mask-size: auto 100%;
    -webkit-mask-image: url("/assets/error-pages/code-500.svg");
    -webkit-mask-position: 50% 50%;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: auto 100%;
  }

  .emergency-copy {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: var(--emergency-copy-gap);
  }

  .emergency-title {
    margin: 0;
    color: var(--emergency-title);
    font-family: var(--font-heading, "Focal"), ui-sans-serif, system-ui,
      sans-serif;
    font-size: 30px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .emergency-message {
    margin: 12px 0 0;
    color: var(--emergency-copy);
    font-size: 18px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .emergency-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 27.609375px;
  }

  .emergency-button {
    display: inline-flex;
    min-height: 36px;
    align-items: center;
    justify-content: center;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 8px 16px;
    font: inherit;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.125;
    letter-spacing: -0.01em;
    text-decoration: none;
    cursor: pointer;
    transition: none;
    white-space: normal;
  }

  .emergency-button--primary {
    min-width: 98px;
    background: var(--emergency-primary-background);
    color: var(--emergency-primary-foreground);
  }

  .emergency-button--secondary {
    min-width: 173px;
    background: var(--emergency-secondary-background);
    color: var(--emergency-secondary-foreground);
  }

  .emergency-button--primary:hover {
    background: var(--emergency-primary-hover);
  }

  .emergency-button--secondary:hover {
    background: var(--emergency-secondary-hover);
  }

  .emergency-button:focus-visible,
  .emergency-logo:focus-visible {
    outline: 2px solid var(--emergency-code);
    outline-offset: 3px;
  }

  .emergency-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --emergency-background: #19191a;
      --emergency-code: #c0b1ff;
      --emergency-title: #f4f4f5;
      --emergency-copy: #a6a6ae;
      --emergency-primary-background: #fafafa;
      --emergency-primary-foreground: #161618;
      --emergency-primary-hover: #e4e4e7;
      --emergency-secondary-background: rgba(255, 255, 255, 0.1);
      --emergency-secondary-foreground: #fafafa;
      --emergency-secondary-hover: rgba(255, 255, 255, 0.15);
      --emergency-ambient-purple: #a284ff;
      --emergency-ambient-lime: #f1ffc4;
    }
  }

  @media (max-width: 1023px) {
    .emergency-header {
      height: 64px;
      flex-basis: 64px;
    }

    .emergency-main {
      --emergency-viewport-height: calc(100dvh - 64px);
    }
  }

  @media (min-width: 768px) and (max-height: 700px) {
    .emergency-main {
      --emergency-content-top: clamp(
        16px,
        calc(var(--emergency-track-height) / 2 - 177.8px),
        137px
      );
    }

    .emergency-copy { margin-top: 24px; }
    .emergency-actions { margin-top: 20px; }
  }

  @media (max-width: 767px) {
    .emergency-main {
      --emergency-track-height: min(756px, var(--emergency-viewport-height));
      --emergency-code-height: 95px;
      --emergency-copy-gap: 35px;
      --emergency-content-top: clamp(
        32px,
        calc(var(--emergency-track-height) / 2 - 129.6015625px),
        248.3984375px
      );
    }

    .emergency-decor-item--top-left {
      top: -56px;
      left: -135px;
      width: 326px;
    }

    .emergency-decor-item--bottom-right {
      right: -44px;
      bottom: 6px;
      width: 150px;
    }

    .emergency-pixels--top-right {
      top: 52px;
      right: 36px;
      width: 53px;
      height: 19px;
    }

    .emergency-pixels--left-middle {
      bottom: 136px;
      left: 28px;
      width: 14px;
      height: 10px;
    }

    .emergency-pixels--left-bottom {
      bottom: 49px;
      left: 105px;
      width: 5px;
      height: 5px;
    }

    .emergency-track { width: 100%; }
    .emergency-title {
      font-size: 20px;
      letter-spacing: -0.03em;
    }
    .emergency-message { font-size: 16px; }
    .emergency-actions { margin-top: 29.203125px; }
  }

  @media (max-height: 560px) {
    .emergency-track {
      height: auto;
      min-height: var(--emergency-track-height);
    }

    .emergency-content {
      position: relative;
      top: auto;
      left: auto;
      padding-top: 32px;
      padding-bottom: 32px;
    }
  }

  @media (max-width: 320px) {
    .emergency-actions { flex-direction: column; }
    .emergency-button { width: 100%; }
  }
`;function m(){return(0,r.jsxs)("svg",{viewBox:"0 0 120 48",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[(0,r.jsx)("path",{d:"M120 6.46345V41.6633C120 47.2476 119.937 47.4986 119.248 47.4986H110.724C110.034 47.4986 109.909 47.2476 109.909 41.6633V6.46345C109.909 0.879154 110.034 0.628174 110.724 0.628174H119.248C119.937 0.628174 120 0.879154 120 6.46345Z"}),(0,r.jsx)("path",{d:"M96.0997 27.0431V25.7255C96.0997 22.5882 94.6581 21.3333 92.1509 21.3333C89.7065 21.3333 88.3902 22.651 88.0142 24.9725C87.8888 25.6627 87.9515 26.2274 87.5754 26.2274H79.1138C78.6124 26.2274 78.6124 26.1019 78.6124 25.6627C78.6124 22.3372 81.7463 15.4353 92.6524 15.4353C100.362 15.4353 105.878 18.5098 105.878 27.0431V39.5921C105.878 42.4783 107.445 46.5568 107.445 47.1215C107.445 47.3724 107.257 47.4979 107.068 47.4979H97.6667C97.2279 47.4979 97.1652 47.247 96.8518 45.6783L96.6011 44.4862C96.4131 43.545 96.2877 43.2313 95.9117 43.2313C95.4102 43.2313 95.0968 44.3607 93.7179 45.6783C92.2136 47.0587 90.3959 47.9999 87.262 47.9999C82.185 47.9999 77.6095 45.1136 77.6095 38.8391C77.6095 31.8117 83.0625 28.8 91.1481 28.4862C95.3476 28.298 96.0997 28.7372 96.0997 27.0431ZM96.0997 36.1411V34.8862C96.0997 33.6313 95.7863 33.2548 94.7208 33.3176L92.4017 33.4431C89.4558 33.6313 87.7008 35.1372 87.7008 37.9607C87.7008 40.7215 89.205 42.1019 91.3988 42.1019C93.8433 42.1019 96.0997 39.8431 96.0997 36.1411Z"}),(0,r.jsx)("path",{d:"M60.5509 23.6548C60.5509 22.4627 60.0495 22.3372 57.7304 22.3372H56.6021C56.1634 22.3372 56.1007 22.0234 56.1007 19.4509V19.0117C56.1007 16.4392 56.1634 16.1882 56.6021 16.1882H57.9184C60.2375 16.1882 60.5509 15.9999 60.5509 14.8705V10.9804C60.5509 3.6392 64.2489 0 71.3943 0C74.2148 0 76.1579 0.439212 76.4713 0.627448C76.5966 0.752936 76.5966 0.941172 76.5966 3.26273V4.07842C76.5966 6.46272 76.5966 7.02742 76.4086 7.02742C76.2206 7.02742 75.3431 6.46272 73.8388 6.46272C71.8331 6.46272 70.5795 7.46664 70.5795 10.9804V14.8705C70.5795 15.9999 71.0182 16.1882 73.8388 16.1882H76.6593C77.2234 16.1882 77.2234 16.4392 77.2234 19.0117V19.4509C77.2234 22.0234 77.1607 22.3372 76.722 22.3372H73.8388C71.0182 22.3372 70.5795 22.4627 70.5795 23.6548V41.6626C70.5795 47.2469 70.3914 47.4979 69.89 47.4979H61.1777C60.6762 47.4979 60.5509 47.2469 60.5509 41.6626V23.6548Z"}),(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M30.1574 0.740479C30.9676 0.740479 31.6169 1.39923 31.6944 2.20567C32.3853 9.39891 38.1102 15.1234 45.3039 15.8142C46.1104 15.8917 46.7692 16.541 46.7692 17.3511V30.8959C46.7692 31.706 46.1104 32.3553 45.3039 32.4328C38.1102 33.1236 32.3853 38.8481 31.6944 46.0414C31.6169 46.8478 30.9676 47.5065 30.1574 47.5065H16.6118C15.8016 47.5065 15.1523 46.8478 15.0748 46.0414C14.384 38.8481 8.65901 33.1236 1.46528 32.4328C0.658799 32.3553 0 31.706 0 30.8959V17.3511C0 16.541 0.658803 15.8917 1.46529 15.8142C8.65902 15.1234 14.384 9.39891 15.0748 2.20567C15.1523 1.39923 15.8016 0.740479 16.6118 0.740479H30.1574ZM9.39037 24.0839C9.39037 31.865 15.6915 38.1728 23.4644 38.1728C31.2373 38.1728 37.5385 31.865 37.5385 24.0839C37.5385 16.3028 31.2373 9.99498 23.4644 9.99498C15.6915 9.99498 9.39037 16.3028 9.39037 24.0839Z"})]})}function g(){return(0,r.jsxs)("div",{className:"emergency-decor","aria-hidden":"true",children:[(0,r.jsx)("span",{className:"emergency-decor-item emergency-decor-item--top-left"}),(0,r.jsxs)("svg",{className:"emergency-pixels emergency-pixels--top-right",viewBox:"0 0 11 4",children:[(0,r.jsx)("rect",{className:"emergency-pixel-base",x:"0",y:"3",width:"1",height:"1"}),(0,r.jsx)("rect",{className:"emergency-pixel-base",x:"3",y:"0",width:"1",height:"1"}),(0,r.jsx)("rect",{className:"emergency-pixel-base",x:"4",y:"0",width:"1",height:"1"}),(0,r.jsx)("rect",{className:"emergency-pixel-base",x:"9",y:"0",width:"1",height:"1"}),(0,r.jsx)("rect",{className:"emergency-pixel-base",x:"10",y:"0",width:"1",height:"1"})]}),(0,r.jsxs)("svg",{className:"emergency-pixels emergency-pixels--left-middle",viewBox:"0 0 3 2",children:[(0,r.jsx)("rect",{className:"emergency-pixel-accent",x:"0",y:"0",width:"1",height:"1"}),(0,r.jsx)("rect",{className:"emergency-pixel-base",x:"0",y:"1",width:"1",height:"1"}),(0,r.jsx)("rect",{className:"emergency-pixel-base",x:"2",y:"0",width:"1",height:"1"}),(0,r.jsx)("rect",{className:"emergency-pixel-base",x:"2",y:"1",width:"1",height:"1"})]}),(0,r.jsx)("svg",{className:"emergency-pixels emergency-pixels--left-bottom",viewBox:"0 0 1 1",children:(0,r.jsx)("rect",{className:"emergency-pixel-base",width:"1",height:"1"})}),(0,r.jsx)("span",{className:"emergency-decor-item emergency-decor-item--bottom-right"})]})}function l({onRetry:e}){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("header",{className:"emergency-header",children:(0,r.jsx)("a",{className:"emergency-logo",href:"/","aria-label":"fal home",children:(0,r.jsx)(m,{})})}),(0,r.jsxs)("main",{className:"emergency-main",children:[(0,r.jsx)(g,{}),(0,r.jsx)("div",{className:"emergency-track",children:(0,r.jsxs)("section",{className:"emergency-content","aria-labelledby":"emergency-error-title",children:[(0,r.jsx)("div",{className:"emergency-code","aria-hidden":"true"}),(0,r.jsx)("span",{className:"emergency-sr-only",children:"Error 500"}),(0,r.jsxs)("div",{className:"emergency-copy",children:[(0,r.jsx)("h1",{className:"emergency-title",id:"emergency-error-title",tabIndex:-1,autoFocus:!0,children:"Something broke on our end."}),(0,r.jsxs)("p",{className:"emergency-message",children:["Our engineers are on it. Try refreshing,",(0,r.jsx)("br",{}),"or check the status page for updates."]}),(0,r.jsxs)("div",{className:"emergency-actions",children:[(0,r.jsx)("a",{className:"emergency-button emergency-button--primary",href:"",role:"button",onClick:r=>{r.preventDefault(),e()},children:"Try again"}),(0,r.jsx)("a",{className:"emergency-button emergency-button--secondary",href:"https://status.fal.ai",children:"Check status page"})]})]})]})})]})]})}e.s(["default",0,function({error:e,reset:n,retry:i}){return(0,o.useEffect)(()=>{console.error("Global error:",e),t.y(e,e.digest?{tags:{digest:e.digest}}:void 0)},[e]),(0,r.jsxs)("html",{lang:"en",className:`${c.variable} ${a.variable}`,children:[(0,r.jsxs)("head",{children:[(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("meta",{name:"robots",content:"noindex, nofollow"}),(0,r.jsx)("title",{children:"Something broke on our end. | fal"}),(0,r.jsx)("style",{dangerouslySetInnerHTML:{__html:s}})]}),(0,r.jsx)("body",{children:(0,r.jsx)(l,{onRetry:i??n})})]})}],931823)},648722,e=>{e.v({className:"UoPfiG_className",variable:"UoPfiG_variable"})}]);

//# debugId=3d9d5eb4-dd3a-b240-fb5a-4451a6a1c64a
