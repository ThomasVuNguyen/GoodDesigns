import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{B as t,z as n}from"./vendors-D1Zalr9i.js";import{c as r,o as i,s as a}from"./i18n-BSBp_gjh.js";import{g as o,r as s,s as c,tt as l}from"./aether-core-QcG0bkmv.js";import{s as u}from"./pplx-icons-Bk_3cWR9.js";import{h as d}from"./SingularAttributionProviderShared-z7CMx0Xo.js";import{t as f}from"./Footer-BlZFfvsD.js";import{n as p}from"./attribution-CUjTAxbx.js";import{n as m,t as h}from"./personalEmailDomains-Dzml4d8c.js";import{t as g}from"./Logo-B8ExDequ.js";import{t as _}from"./Faq-CO_10EsE.js";import{n as v,r as y}from"./contactSalesNavigation-DCYRObqq.js";import{n as b,t as x}from"./gen-enterprise-shared-D0Koj_yq.js";import{t as S}from"./EnterpriseHeader-CablqQIu.js";var C=t(),w=e(n(),1),T=x,E=`/static/images/gen/enterprise`,D=`#20808d`,O=`
.ent-demo-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 0 32px;
  border-radius: var(--radius-full);
  background: ${D};
  color: #fff;
  font-family: var(--font-sans, sans-serif);
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  isolation: isolate;
  box-shadow: 0 4px 20px -2px rgba(9, 23, 23, 0.18);
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
}
.ent-demo-btn::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -75%;
  width: 60%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
  pointer-events: none;
}
.ent-demo-btn:hover {
  background: #1b6f7a;
  transform: translateY(-1px);
  box-shadow: 0 8px 32px -4px rgba(9, 23, 23, 0.25);
}
.ent-demo-btn:hover::before {
  animation: entDemoShimmer 0.85s ease;
}
.ent-demo-btn:active {
  transform: translateY(0) scale(0.97);
}
@keyframes entDemoShimmer {
  0% { left: -75%; }
  100% { left: 175%; }
}
@media (prefers-reduced-motion: reduce) {
  .ent-demo-btn:hover::before { animation: none; }
}

/* Fused pill: email input + button in one white shell. */
.ent-demo-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 520px;
  height: 64px;
  padding: 4px 4px 4px 26px;
  border-radius: var(--radius-full);
  background: #fff;
  border: 1px solid rgba(9, 23, 23, 0.14);
  box-shadow: 0 4px 20px -6px rgba(9, 23, 23, 0.16);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.ent-demo-pill:focus-within {
  border-color: ${D};
  box-shadow: 0 0 0 3px rgba(32, 128, 141, 0.16), 0 4px 20px -6px rgba(9, 23, 23, 0.16);
}
.ent-demo-pill[data-error='true'] {
  border-color: var(--negative-border-strong);
}
.ent-demo-pill input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #091717;
  font-family: var(--font-sans, sans-serif);
  font-size: 17px;
  line-height: 1;
}
.ent-demo-pill input::placeholder {
  color: rgba(9, 23, 23, 0.42);
}
.ent-demo-pill .ent-demo-btn {
  height: 54px;
  padding: 0 26px;
  font-size: 17px;
}
/* On narrow screens the fused single-line pill squeezes the email input so the
   placeholder/value gets clipped. Unfuse into a stacked layout. */
@media (max-width: 560px) {
  .ent-demo-pill {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    height: auto;
    padding: 0;
    border: none;
    background: transparent;
    box-shadow: none;
  }
  .ent-demo-pill:focus-within {
    box-shadow: none;
  }
  .ent-demo-pill input {
    flex: none;
    width: 100%;
    box-sizing: border-box;
    height: 56px;
    padding: 0 24px;
    border-radius: var(--radius-full);
    background: #fff;
    border: 1px solid rgba(9, 23, 23, 0.14);
    box-shadow: 0 4px 20px -6px rgba(9, 23, 23, 0.16);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .ent-demo-pill input:focus {
    border-color: ${D};
    box-shadow: 0 0 0 3px rgba(32, 128, 141, 0.16), 0 4px 20px -6px rgba(9, 23, 23, 0.16);
  }
  .ent-demo-pill[data-error='true'] input {
    border-color: var(--negative-border-strong);
  }
  .ent-demo-pill .ent-demo-btn {
    width: 100%;
    box-sizing: border-box;
    height: 56px;
  }
}
`,k=[{name:`Zoom`,src:`${E}/logo-zoom.svg`,width:114,height:26},{name:`NVIDIA`,src:`${E}/logo-nvidia.svg`,width:160,height:30},{name:`Databricks`,src:`${E}/logo-databricks.svg`,width:160,height:30},{name:`Bridgewater`,src:`${E}/logo-bridgewater.svg`,width:203,height:34},{name:`ElevenLabs`,src:`${E}/logo-elevenlabs.svg`,width:203,height:34},{name:`Amplitude`,src:`${E}/logo-amplitude.svg`,width:203,height:34},{name:`Cavaliers`,src:`${E}/logo-cavaliers.svg`,width:211,height:63},{name:`HP`,src:`${E}/logo-hp.svg`,width:80,height:63},{name:`Vercel`,src:`${E}/logo-vercel.svg`,width:145,height:63},{name:`Stripe`,src:`${E}/logo-stripe.svg`,width:109,height:63},{name:`Snowflake`,src:`${E}/logo-snowflake.svg`,width:202,height:63},{name:`Samsung NEXT`,src:`${E}/logo-samsung-next.svg`,width:90,height:63},{name:`Payment`,src:`${E}/logo-payment.svg`,width:113,height:63}];function A({eyebrow:e}){let{$t:t}=r();return(0,C.jsx)(`section`,{className:`overflow-hidden px-6 sm:px-16 pb-12 sm:pb-24 pt-32`,children:(0,C.jsxs)(`div`,{className:`mx-auto flex flex-col gap-12 lg:gap-24 sm:flex-row max-w-content items-center justify-between`,children:[(0,C.jsxs)(`div`,{className:`flex sm:w-[40%] shrink-0 flex-col gap-8 sm:gap-10`,children:[(0,C.jsxs)(`div`,{className:`flex flex-col gap-5 sm:gap-6`,children:[e&&(0,C.jsx)(c,{variant:`baseSemi`,as:`p`,color:`super`,className:`uppercase`,children:e}),(0,C.jsx)(c,{size:`4xl`,variant:`display`,as:`h1`,className:`tracking-[-1px]`,children:(0,C.jsx)(i,{defaultMessage:`Accurate AI that works for your team`,id:`6c0d4c2c1a`})}),(0,C.jsx)(c,{variant:`section-title`,as:`p`,color:`light`,weight:`normal`,children:(0,C.jsx)(i,{defaultMessage:`One secure platform that orchestrates the best models across your files and tools to handle tasks, deep research, and complex projects.`,id:`944c4cf3fe`})})]}),(0,C.jsx)(`div`,{className:`w-full`,children:(0,C.jsx)(B,{})})]}),(0,C.jsxs)(`div`,{className:`relative w-full sm:w-[46%]`,style:{aspectRatio:`576/555`},children:[(0,C.jsxs)(`div`,{className:`relative size-full overflow-hidden rounded-2xl`,children:[(0,C.jsx)(`video`,{autoPlay:!0,loop:!0,muted:!0,playsInline:!0,className:`absolute scale-[1.6]`,src:`${b}/QopIzqzZrX8RJWdeGhsiU0HwGfI.mp4`}),(0,C.jsx)(`img`,{src:`${b}/dDsAlV00xOR2nqQYsgqPbOesIJ0.png`,alt:t({defaultMessage:`Perplexity search interface with a product growth strategy query`,id:`50b1062961`}),className:`absolute z-[2]`,style:{left:`3.5%`,top:`7%`,width:`93%`}})]}),(0,C.jsx)(`img`,{src:`${b}/vBD2EEUpDdKRyZqrNuD9RbwP5ww.png`,alt:t({defaultMessage:`Organization Files panel showing uploaded team documents`,id:`d6f2e1b27b`}),className:`absolute z-[3]`,style:{left:`-11%`,top:`48%`,width:`51%`}}),(0,C.jsx)(`img`,{src:`${b}/KvCgrOUOrS6rRP9JkvREjjeCzo4.png`,alt:t({defaultMessage:`Integration picker with Google Drive, OneDrive, and SharePoint options`,id:`c4ec06507b`}),className:`absolute z-[3]`,style:{left:`52%`,top:`69%`,width:`46%`}})]})]})})}var j=`flex shrink-0 gap-16 pr-16`;function M(){let e=(0,w.useMemo)(()=>k.map((e,t)=>(0,C.jsx)(`img`,{src:e.src,alt:e.name,width:e.width,height:e.height,className:`shrink-0`},`${e.name}-${t}`)),[]);return(0,C.jsxs)(`section`,{className:`px-10 pb-4`,children:[(0,C.jsx)(c,{variant:`baseSemi`,textAlign:`center`,color:`light`,children:(0,C.jsx)(i,{defaultMessage:`TEAMS THAT LOVE ENTERPRISE PRO`,id:`ef687f4596`})}),(0,C.jsx)(`div`,{className:`mask-fade-h-48 w-full overflow-hidden`,children:(0,C.jsxs)(`div`,{className:`flex animate-marqueeLeft will-change-transform w-max py-6 opacity-60`,style:{animationDuration:`60s`},children:[(0,C.jsx)(`div`,{className:j,children:e}),(0,C.jsx)(`div`,{className:j,children:e})]})})]})}function N(){let{sendDemoCtaClickedEventSingular:e}=d(),t=p(v);return(0,C.jsx)(`section`,{className:`px-6 sm:px-16 pt-24 pb-12`,children:(0,C.jsx)(`div`,{className:`mx-auto max-w-content`,children:(0,C.jsxs)(`div`,{className:`relative overflow-hidden rounded-2xl`,children:[(0,C.jsx)(`img`,{src:`${b}/ovBsAMB9yrsY9YJNeMEdSmQac.png`,alt:``,className:`absolute inset-0 size-full object-cover object-bottom`}),(0,C.jsxs)(`div`,{className:`relative flex flex-col items-center px-6 sm:px-16 py-12 sm:pt-20`,children:[(0,C.jsxs)(`div`,{className:`mb-12 text-center`,children:[(0,C.jsxs)(`div`,{className:`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5`,style:{background:`#dae8e5`},children:[(0,C.jsx)(g,{brand:`computer`,variant:`mark`,size:`tiny`}),(0,C.jsx)(c,{variant:`baseSemi`,as:`span`,children:(0,C.jsx)(i,{defaultMessage:`Perplexity Computer`,id:`de279cd5ca`})})]}),(0,C.jsx)(c,{size:`4xl`,variant:`display`,as:`h2`,className:`mx-auto tracking-[-1.5px]`,children:(0,C.jsx)(i,{defaultMessage:`Computer puts 20 advanced models to work for your organization.`,id:`c8829d0e7d`})}),(0,C.jsx)(c,{variant:`page-title`,as:`p`,weight:`normal`,className:`mx-auto mt-2 leading-[1.2]`,children:(0,C.jsx)(i,{defaultMessage:`Research, analyze, create, design, code, ship, and manage, all from one system.`,id:`d133562abb`})})]}),(0,C.jsx)(`video`,{autoPlay:!0,loop:!0,muted:!0,playsInline:!0,className:`w-full max-w-5xl rounded-2xl`,src:`${b}/ZISa0BOWm2vj4VdPzfR5CEKRN8.mp4`}),(0,C.jsx)(`a`,{href:t,onClick:()=>e(),className:`mt-12 inline-flex h-14 items-center rounded-full bg-white px-8 text-lg font-medium text-black transition-colors duration-300 hover:bg-white/90`,children:(0,C.jsx)(i,{defaultMessage:`Get Started`,id:`a954b18b7b`})})]})]})})})}function P(){let{$t:e}=r(),t=(0,w.useMemo)(()=>[{title:e({defaultMessage:`Internal knowledge and applications`,id:`9912a64d05`}),description:e({defaultMessage:`Surface answers from your files. Find deep insights in seconds using integrations that centralize your company's knowledge — from the tools you already use.`,id:`2a2904b107`}),ctaLabel:e({defaultMessage:`Connect your apps`,id:`69a78491fa`}),image:`${b}/RDoJBSnwBOII8fR7gVXnTBTlYJY.png`},{title:e({defaultMessage:`External research`,id:`0e1ffe2eb9`}),description:e({defaultMessage:`Find reliable sources on the web. Get verifiable, straightforward answers to any question. Then, dive deeper with our automatically generated follow-up prompts.`,id:`b49c8e5644`}),ctaLabel:e({defaultMessage:`Start searching`,id:`9ac5c80dbc`}),image:`${b}/pfrtCawG7x8dMLPBhcStHzbpGk4.png`}],[e]);return(0,C.jsx)(`section`,{className:`px-6 sm:px-16 py-24`,children:(0,C.jsxs)(`div`,{className:`mx-auto max-w-content`,children:[(0,C.jsxs)(`div`,{className:`mb-16 text-center`,children:[(0,C.jsxs)(`div`,{className:`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5`,style:{background:`#dae8e5`},children:[(0,C.jsx)(g,{brand:`perplexity`,variant:`mark`,size:`tiny`}),(0,C.jsx)(c,{variant:`baseSemi`,as:`span`,children:(0,C.jsx)(i,{defaultMessage:`Perplexity Enterprise`,id:`c9f692ec7b`})})]}),(0,C.jsx)(c,{size:`4xl`,variant:`display`,as:`h2`,className:`mx-auto tracking-[-1.5px]`,children:(0,C.jsx)(i,{defaultMessage:`Accurate information is just the start.<br></br>What you do with it is everything.`,id:`370d610223`,values:{br:()=>(0,C.jsx)(`br`,{})}})})]}),(0,C.jsx)(`div`,{className:`flex flex-col gap-16`,children:t.map(e=>(0,C.jsxs)(`div`,{className:`flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16`,children:[(0,C.jsxs)(`div`,{className:`lg:w-2/5 shrink-0 flex flex-col gap-6 items-start`,children:[(0,C.jsxs)(`div`,{children:[(0,C.jsx)(c,{size:`2xl`,variant:`display`,as:`h3`,className:`tracking-[-0.5px]`,children:e.title}),(0,C.jsx)(c,{variant:`base`,as:`p`,color:`light`,className:`mt-3 leading-[1.4]`,children:e.description})]}),(0,C.jsx)(s,{href:T,hardNav:!0,variant:`secondary`,size:`default`,pill:!0,trailingAccessory:u(`arrow-right`),children:e.ctaLabel})]}),(0,C.jsx)(`div`,{className:`lg:flex-1 overflow-hidden rounded-2xl`,children:(0,C.jsx)(`img`,{src:e.image,alt:``,className:`w-full`})})]},e.image))}),(0,C.jsx)(`div`,{className:`mt-16 text-center`,children:(0,C.jsx)(V,{})})]})})}function F(){let{$t:e}=r(),{sendDemoCtaClickedEventSingular:t}=d(),n=p(v),a=(0,w.useMemo)(()=>[{icon:(0,C.jsx)(o,{size:`large`,icon:u(`certificate`)}),title:e({defaultMessage:`SOC 2 Type II Certified`,id:`6f86e9d59b`}),description:e({defaultMessage:`Have peace of mind with industry-leading privacy and security standards.`,id:`bca73e805a`})},{icon:(0,C.jsx)(o,{size:`large`,icon:u(`lock`)}),title:e({defaultMessage:`Data privacy`,id:`a7abcb8b1a`}),description:e({defaultMessage:`We never train our LLMs on enterprise customer's data. Perplexity is also GDPR and HIPAA compliant.`,id:`28a10879ba`})},{icon:(0,C.jsx)(o,{size:`large`,icon:u(`clock`)}),title:e({defaultMessage:`Configurable file retention`,id:`4615642dad`}),description:e({defaultMessage:`Safekeep your work with private search and automatic file deletion up to 1 day.`,id:`35996684c7`})},{icon:(0,C.jsx)(o,{size:`large`,icon:u(`user-plus`)}),title:e({defaultMessage:`User management`,id:`d5526b76bd`}),description:e({defaultMessage:`Easily manage who can upload and download files and how answers are shared.`,id:`594d9335b1`})},{icon:(0,C.jsx)(o,{size:`large`,icon:u(`key`)}),title:e({defaultMessage:`SSO + SCIM`,id:`beceee5629`}),description:e({defaultMessage:`Easily manage access to Perplexity while maintaining total security.`,id:`899638ff0b`})},{icon:(0,C.jsx)(o,{size:`large`,icon:u(`bell`)}),title:e({defaultMessage:`Enhanced visibility`,id:`5f2c08020d`}),description:e({defaultMessage:`Track user activity with audit logs for compliance.`,id:`9181b71fcb`})}],[e]);return(0,C.jsx)(`section`,{className:`px-6 sm:px-16 py-24 pb-12`,style:{background:`#dae8e5`},children:(0,C.jsxs)(`div`,{className:`mx-auto max-w-content`,children:[(0,C.jsxs)(`div`,{className:`mb-14 text-center`,children:[(0,C.jsx)(c,{size:`4xl`,variant:`display`,as:`h2`,className:`tracking-[-1.5px]`,children:(0,C.jsx)(i,{defaultMessage:`Keep your company's data airtight`,id:`812e901894`})}),(0,C.jsx)(c,{variant:`page-title`,as:`p`,weight:`normal`,className:`mx-auto mt-2 leading-[1.2]`,children:(0,C.jsx)(i,{defaultMessage:`At Perplexity, we manage customer data with enterprise-grade security.`,id:`f762f5aa7a`})})]}),(0,C.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6`,children:a.map((e,t)=>(0,C.jsxs)(`div`,{className:`rounded-2xl border border-super-strong p-8`,children:[(0,C.jsx)(`div`,{className:`mb-4 text-primary`,children:e.icon}),(0,C.jsx)(c,{variant:`page-title`,as:`h3`,weight:`normal`,className:`leading-[1.2]`,children:e.title}),(0,C.jsx)(c,{variant:`base`,as:`p`,color:`light`,className:`mt-2 leading-[1.4]`,children:e.description})]},t))}),(0,C.jsx)(`div`,{className:`mt-14 text-center`,children:(0,C.jsx)(s,{href:n,hardNav:!0,variant:`primary`,size:`large`,pill:!0,onTrackEvent:()=>t(),children:(0,C.jsx)(i,{defaultMessage:`Get Started`,id:`172ac89b5b`})})})]})})}function I(){return(0,C.jsx)(`section`,{children:(0,C.jsxs)(`div`,{className:`relative overflow-hidden`,children:[(0,C.jsx)(`img`,{src:`${b}/FuIin3q7X5PJhPeq9JKzuufYUw.png`,alt:``,className:`absolute inset-0 size-full object-cover`}),(0,C.jsx)(`img`,{src:`${b}/e2RAwDHPQc6gTpsvLIol7ocbQ.png`,alt:``,className:`absolute inset-0 size-full object-cover`}),(0,C.jsxs)(`div`,{className:`relative px-12 py-28 text-center`,children:[(0,C.jsx)(c,{variant:`display`,as:`h2`,color:`white`,size:`4xl`,children:(0,C.jsx)(i,{defaultMessage:`Get started with<br></br>Perplexity Enterprise today`,id:`1f94b0a840`,values:{br:()=>(0,C.jsx)(`br`,{})}})}),(0,C.jsx)(`div`,{className:`mt-10`,children:(0,C.jsx)(V,{variant:`primary`})})]})]})})}var L=[{id:`enterprise-usage`,q:a({id:`9c7e68c38d`,defaultMessage:`How is Perplexity's Enterprise AI typically used?`}),a:(0,C.jsx)(i,{...a({id:`538520a10c`,defaultMessage:`Different industries and teams use Perplexity to accelerate research, automate workflows, and make data-driven decisions. Use cases span from benchmarking data from internal documents to external data, conducting analyses for due diligence, or visualizing complex data. Industries like financial services, consulting, healthcare companies and teams like marketing, engineering, sales, and product teams rely on Perplexity for cited, real-time insights. This has helped teams save hours for strategic work and drive faster results across their organization.`})})},{id:`enterprise-benefits`,q:a({id:`a968fb3a4d`,defaultMessage:`What are the benefits of Enterprise AI?`}),a:(0,C.jsx)(i,{...a({id:`4b6f84866b`,defaultMessage:`Perplexity Enterprise transforms how organizations access and act on information by bringing real-time, cited insights from both internal knowledge and the public web into a single platform. Teams can surface precise answers from company files and trusted web sources, visualize and analyze data instantly, and accelerate decision-making across departments—empowering everyone from product and engineering to finance, marketing, and sales. With enterprise-grade security, seamless integrations, and a user-friendly interface, Perplexity enables companies to work smarter, reclaim valuable time, and drive confident, data-backed outcomes at scale.`})})},{id:`computer-access`,q:a({id:`549ec10662`,defaultMessage:`How do you get access to Computer for Enterprise?`}),a:(0,C.jsx)(i,{id:`dab6d44c08`,defaultMessage:`Computer is included with both Enterprise Pro and Enterprise Max. Enterprise Pro seats include {proCredits, number} Computer credits per seat each month and Enterprise Max seats include {maxCredits, number}. If your admin has enabled it, go to the Perplexity homepage and click the Computer icon to start a task.`,values:{proCredits:500,maxCredits:15e3}})},{id:`vs-chatgpt`,q:a({id:`a83b8bc9b2`,defaultMessage:`What makes Perplexity Enterprise's AI different compared to ChatGPT?`}),a:(0,C.jsx)(i,{...a({id:`dff1f9414c`,defaultMessage:`ChatGPT focuses on the foundational LLM layer. Perplexity has built a powerful search and index platform sitting on top of advanced models from Perplexity, OpenAI, Anthropic, and other leading AI providers. This unique focus makes us the best at search; we find the most relevant sources and use the latest frontier LLM models to deliver everything from faster answers to comprehensive research reports with data visualizations, all backed by live citations.`})})},{id:`pro-vs-max`,q:a({id:`d60c6b938a`,defaultMessage:`What is the difference between Enterprise Pro and Enterprise Max?`}),a:(0,C.jsx)(i,{id:`ec85151d5b`,defaultMessage:`Enterprise Pro is for teams that need accurate, cited answers for everyday work. Enterprise Max is built for the hardest problems at scale. It includes everything in Enterprise Pro plus higher limits on Deep Research, asset generation, and file uploads, and raises Computer credits from {proCredits, number} to {maxCredits, number} per seat each month.`,values:{proCredits:500,maxCredits:15e3}})},{id:`pricing`,q:a({id:`cc64caa759`,defaultMessage:`How is Perplexity Enterprise priced?`}),a:(0,C.jsx)(i,{...a({id:`6da9e3e929`,defaultMessage:`Perplexity Enterprise Pro seats are $40 per user per month or $400 per user per year. Perplexity Enterprise Max seats are $325 per user per month or $3,250 per user per year. Organizations can have a mix of Enterprise Pro and Enterprise Max users.`})})},{id:`api-pricing`,q:a({id:`cc05e62bda`,defaultMessage:`How does the Perplexity API pricing work with Enterprise plans?`}),a:(0,C.jsx)(i,{...a({id:`2e2662f17b`,defaultMessage:`Perplexity API pricing and Perplexity Enterprise pricing are priced separately. To learn more about our API pricing, visit our developer docs to learn about our different APIs and how we price.`})})}];function R(){return(0,C.jsx)(_,{items:L})}function z(e,t){t.current?.cancel(),t.current=e.current?.animate([{transform:`translateX(0)`},{transform:`translateX(-6px)`},{transform:`translateX(5px)`},{transform:`translateX(-4px)`},{transform:`translateX(3px)`},{transform:`translateX(-1px)`},{transform:`translateX(0)`}],{duration:400,easing:`ease-in-out`})??null}function B(){let{$t:e}=r(),{track:t}=l(),{sendDemoEmailEnteredEventSingular:n}=d(),[a,o]=(0,w.useState)(``),[s,u]=(0,w.useState)(``),f=(0,w.useRef)(null),p=(0,w.useRef)(null),g=e=>{u(e),z(f,p)};return(0,C.jsxs)(`form`,{onSubmit:async r=>{r.preventDefault();let i=a.trim();if(!i||!m(i)){g(e({defaultMessage:`Please enter a valid work email`,id:`df046f7727`}));return}if(h(i)){g(e({defaultMessage:`Please enter a work email address`,id:`bbe6711a72`}));return}u(``),t({event:`enterprise demo cta clicked`,data:{hasEmail:!0}}),await n(i),y({email:i})},className:`flex w-full max-w-[520px] flex-col items-start gap-2`,noValidate:!0,children:[(0,C.jsxs)(`div`,{ref:f,className:`ent-demo-pill`,"data-error":s?`true`:`false`,children:[(0,C.jsx)(`input`,{"aria-label":e({defaultMessage:`Work email`,id:`5877456d15`}),type:`email`,placeholder:e({defaultMessage:`you@company.com`,id:`fecc5019a5`}),value:a,onChange:e=>{o(e.target.value),s&&u(``)}}),(0,C.jsx)(`button`,{type:`submit`,className:`ent-demo-btn`,children:(0,C.jsx)(i,{defaultMessage:`Book Demo`,id:`5583a98448`})})]}),(0,C.jsx)(`div`,{className:`min-h-5`,children:s&&(0,C.jsx)(c,{variant:`small`,as:`p`,color:`negative`,children:s})})]})}function V({variant:e=`primary`}){let{sendDemoCtaClickedEventSingular:t}=d(),n=p(v);return(0,C.jsx)(s,{href:n,hardNav:!0,variant:e,size:`large`,pill:!0,onTrackEvent:()=>t(),children:(0,C.jsx)(i,{defaultMessage:`Get Started`,id:`0f8bea58a9`})})}function H({heroEyebrow:e,belowLogoTicker:t}){let{$t:n}=r(),{sendDemoCtaClickedEventSingular:i}=d();return(0,C.jsxs)(`div`,{className:`min-h-screen`,"data-color-scheme":`light`,style:{background:`#fbfaf4`},children:[(0,C.jsx)(`style`,{dangerouslySetInnerHTML:{__html:`
        @keyframes logoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        ${O}
      `}}),(0,C.jsx)(S,{ctaUrl:v,ctaLabel:n({defaultMessage:`Get Started`,id:`0f8bea58a9`}),onCtaClick:()=>i()}),(0,C.jsx)(A,{eyebrow:e}),(0,C.jsx)(M,{}),t,(0,C.jsx)(N,{}),(0,C.jsx)(P,{}),(0,C.jsx)(F,{}),(0,C.jsx)(R,{}),(0,C.jsx)(I,{}),(0,C.jsx)(f,{})]})}function U(){return(0,C.jsx)(H,{})}export{U as n,H as r,V as t};
