import{U as e,a as t,i as n}from"./HeaderLogo-BN7xinmJ.js";var r=`2025-02-19`,i=e(`
  *[
    _type == "connector" &&
    slug.current in $slugs
  ] {
    _id,
    "slug": slug.current,
    icon { _type, asset, crop, hotspot }
  }
`),a=t({apiVersion:r,requestTagPrefix:`computer-smb-connectors`}),o=n(a.config()),s=a,c=o;async function l(e,t){return e.fetch(i,{slugs:t})}var u=l;export{s as a,o as i,l as n,a as o,c as r,u as t};
