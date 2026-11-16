const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["/assets/stegaEncodeSourceMap-DmQHEk6q.js","/assets/stegaClean-BU_A08x3.js","/assets/browser-DtWuJuCa.js","/assets/rolldown-runtime-B0Z9INg1.js"])))=>i.map(i=>d[i]);
import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{B as t,_ as n,d as r,f as i,h as a,l as o,m as s,p as c,u as l,v as u,y as d,z as f}from"./vendors-D1Zalr9i.js";import{i as p,n as m,r as h,t as g}from"./vite-DdJffFJk.js";import{i as _,tt as ee}from"./aether-core-QcG0bkmv.js";import{t as te}from"./browserSanityDocumentMode-DNjJBRnV.js";import{n as ne,t as re}from"./stegaClean-BU_A08x3.js";import{t as ie}from"./withInstrumentationScope-Dt0Rn3ck.js";var ae=[480,720,960,1320],oe={fit:`max`,quality:80,auto:`format`},se={fit:`crop`,quality:80,auto:`format`};function ce({rules:e=[],fallback:t}){return[...e.map(({media:e,size:t})=>`${e} ${t}`),t].join(`, `)}function le(e){if(e.mode===`fixed`){let{transform:t=se,...n}=e;return{...n,transform:t}}if(e.mode===`responsive`){let{candidateWidths:t=ae,quality:n=oe.quality,sizes:r,...i}=e;return{...i,sizes:ce(r),candidateWidths:t,transform:{...oe,quality:n}}}let{sizes:t,...n}=e,{candidateWidths:r,transform:i,width:a,height:o}=e;return{...n,sizes:ce(t),candidateWidths:r,transform:i,...a===void 0?{}:{width:a},...o===void 0?{}:{height:o}}}var ue=`aqo64vfr`,de=`production`,fe=`image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg`;function pe(e){let[,t,n,r]=e.split(`-`);if(!t||!n||!r)throw Error(`Malformed asset _ref '${e}'. Expected an id like "${fe}".`);let[i,a]=n.split(`x`),o=+i,s=+a;if(!(isFinite(o)&&isFinite(s)))throw Error(`Malformed asset _ref '${e}'. Expected an id like "${fe}".`);return{id:t,width:o,height:s,format:r}}var me=e=>{let t=e;return t?typeof t._ref==`string`:!1},he=e=>{let t=e;return t?typeof t._id==`string`:!1},ge=e=>{let t=e;return t&&t.asset?typeof t.asset.url==`string`:!1},_e=e=>{if(typeof e==`object`&&e){let t=e;return t._upload&&(!t.asset||!t.asset._ref)}return!1};function ve(e){if(!e)return null;let t;if(typeof e==`string`&&ye(e))t={asset:{_ref:be(e)}};else if(typeof e==`string`)t={asset:{_ref:e}};else if(me(e))t={asset:e};else if(he(e))t={asset:{_ref:e._id||``}};else if(ge(e))t={asset:{_ref:be(e.asset.url)}};else if(typeof e.asset==`object`)t={...e};else return null;let n=e;return n.crop&&(t.crop=n.crop),n.hotspot&&(t.hotspot=n.hotspot),xe(t)}function ye(e){return/^https?:\/\//.test(`${e}`)}function be(e){return`image-${e.split(`/`).slice(-1)[0]}`.replace(/\.([a-z]+)$/,`-$1`)}function xe(e){if(e.crop&&e.hotspot)return e;let t={...e};return t.crop||={left:0,top:0,bottom:0,right:0},t.hotspot||={x:.5,y:.5,height:1,width:1},t}var Se=[[`width`,`w`],[`height`,`h`],[`format`,`fm`],[`download`,`dl`],[`blur`,`blur`],[`sharpen`,`sharp`],[`invert`,`invert`],[`orientation`,`or`],[`minHeight`,`min-h`],[`maxHeight`,`max-h`],[`minWidth`,`min-w`],[`maxWidth`,`max-w`],[`quality`,`q`],[`fit`,`fit`],[`crop`,`crop`],[`saturation`,`sat`],[`auto`,`auto`],[`dpr`,`dpr`],[`pad`,`pad`],[`frame`,`frame`]];function Ce(e){let t={...e||{}},n=t.source;delete t.source;let r=ve(n);if(!r){if(n&&_e(n))return`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8HwQACfsD/QNViZkAAAAASUVORK5CYII=`;throw Error(`Unable to resolve image URL from source (${JSON.stringify(n)})`)}let i=pe(r.asset._ref||r.asset._id||``),a=Math.round(r.crop.left*i.width),o=Math.round(r.crop.top*i.height),s={left:a,top:o,width:Math.round(i.width-r.crop.right*i.width-a),height:Math.round(i.height-r.crop.bottom*i.height-o)},c=r.hotspot.height*i.height/2,l=r.hotspot.width*i.width/2,u=r.hotspot.x*i.width,d=r.hotspot.y*i.height,f={left:u-l,top:d-c,right:u+l,bottom:d+c};return t.rect||t.focalPoint||t.ignoreImageParams||t.crop||(t={...t,...Te({crop:s,hotspot:f},t)}),we({...t,asset:i})}function we(e){let t=(e.baseUrl||`/sanity/`).replace(/\/+$/,``),n=e.vanityName?`/${e.vanityName}`:``,r=`${e.asset.id}-${e.asset.width}x${e.asset.height}.${e.asset.format}${n}`,i;i=e.mediaLibraryId?`${t}/media-libraries/${e.mediaLibraryId}/images/${r}`:e.canvasId?`${t}/images/canvases/${e.canvasId}/${r}`:`${t}/images/${e.projectId}/${e.dataset}/${r}`;let a=[];if(e.rect){let{left:t,top:n,width:r,height:i}=e.rect;(t!==0||n!==0||i!==e.asset.height||r!==e.asset.width)&&a.push(`rect=${t},${n},${r},${i}`)}e.bg&&a.push(`bg=${e.bg}`),e.focalPoint&&(a.push(`fp-x=${e.focalPoint.x}`),a.push(`fp-y=${e.focalPoint.y}`));let o=[e.flipHorizontal&&`h`,e.flipVertical&&`v`].filter(Boolean).join(``);return o&&a.push(`flip=${o}`),Se.forEach(t=>{let[n,r]=t;typeof e[n]<`u`?a.push(`${r}=${encodeURIComponent(e[n])}`):typeof e[r]<`u`&&a.push(`${r}=${encodeURIComponent(e[r])}`)}),a.length===0?i:`${i}?${a.join(`&`)}`}function Te(e,t){let n,r=t.width,i=t.height;if(!(r&&i))return{width:r,height:i,rect:e.crop};let a=e.crop,o=e.hotspot,s=r/i;if(a.width/a.height>s){let e=Math.round(a.height),t=Math.round(e*s),r=Math.max(0,Math.round(a.top)),i=Math.round((o.right-o.left)/2+o.left),c=Math.max(0,Math.round(i-t/2));c<a.left?c=a.left:c+t>a.left+a.width&&(c=a.left+a.width-t),n={left:c,top:r,width:t,height:e}}else{let e=a.width,t=Math.round(e/s),r=Math.max(0,Math.round(a.left)),i=Math.round((o.bottom-o.top)/2+o.top),c=Math.max(0,Math.round(i-t/2));c<a.top?c=a.top:c+t>a.top+a.height&&(c=a.top+a.height-t),n={left:r,top:c,width:e,height:t}}return{width:r,height:i,rect:n}}var Ee=[`clip`,`crop`,`fill`,`fillmax`,`max`,`scale`,`min`],De=[`top`,`bottom`,`left`,`right`,`center`,`focalpoint`,`entropy`],Oe=[`format`];function ke(e){return e&&`config`in e?typeof e.config==`function`:!1}function Ae(e){return e&&`clientConfig`in e?typeof e.clientConfig==`object`:!1}function je(e){let{apiHost:t,projectId:n,dataset:r}=e,i={baseUrl:(t||`https://api.sanity.io`).replace(/^https:\/\/api\./,`https://cdn.`)},a=e.resource??e[`~experimental_resource`];if(a?.type===`media-library`){if(typeof a.id!=`string`||a.id.length===0)throw Error(`Media library clients must include an id in "resource"`);return{...i,mediaLibraryId:a.id}}if(a?.type===`canvas`){if(typeof a.id!=`string`||a.id.length===0)throw Error(`Canvas clients must include an id in "resource"`);return{...i,canvasId:a.id}}if(a?.type===`dataset`){if(typeof a.id!=`string`||a.id.length===0)throw Error(`Dataset clients must include an id in "resource"`);let[e,t]=a.id.split(`.`);if(!e||!t)throw Error(`Dataset resource id must be in the format "projectId.dataset", got: `+a.id);return{...i,projectId:e,dataset:t}}return{...i,projectId:n,dataset:r}}function Me(e){let t=Se;for(let n of t){let[t,r]=n;if(e===t||e===r)return t}return e}function Ne(e){let t={};return t=ke(e)?je(e.config()):Ae(e)?je(e.clientConfig):e||{},t}function Pe(e,t){return new e(null,Ne(t))}function Fe(e){return Pe(Le,e)}function Ie(e,t){let n=t.baseUrl||e.baseUrl,r={baseUrl:n};for(let e in t)if(t.hasOwnProperty(e)){let n=Me(e);r[n]=t[e]}return{baseUrl:n,...r}}var Le=class e{options;constructor(e,t){this.options=e?{...e.options||{},...t||{}}:{...t||{}}}withOptions(t){let n=Ie(this.options,t);return new e(this,n)}image(e){return this.withOptions({source:e})}dataset(e){return this.withOptions({dataset:e})}projectId(e){return this.withOptions({projectId:e})}withClient(t){let n=Ne(t),r={...this.options};return delete r.baseUrl,delete r.projectId,delete r.dataset,delete r.mediaLibraryId,delete r.canvasId,new e(null,{...n,...r})}bg(e){return this.withOptions({bg:e})}dpr(e){return this.withOptions(e&&e!==1?{dpr:e}:{})}width(e){return this.withOptions({width:e})}height(e){return this.withOptions({height:e})}focalPoint(e,t){return this.withOptions({focalPoint:{x:e,y:t}})}maxWidth(e){return this.withOptions({maxWidth:e})}minWidth(e){return this.withOptions({minWidth:e})}maxHeight(e){return this.withOptions({maxHeight:e})}minHeight(e){return this.withOptions({minHeight:e})}size(e,t){return this.withOptions({width:e,height:t})}blur(e){return this.withOptions({blur:e})}sharpen(e){return this.withOptions({sharpen:e})}rect(e,t,n,r){return this.withOptions({rect:{left:e,top:t,width:n,height:r}})}format(e){return this.withOptions({format:e})}invert(e){return this.withOptions({invert:e})}orientation(e){return this.withOptions({orientation:e})}quality(e){return this.withOptions({quality:e})}forceDownload(e){return this.withOptions({download:e})}flipHorizontal(){return this.withOptions({flipHorizontal:!0})}flipVertical(){return this.withOptions({flipVertical:!0})}ignoreImageParams(){return this.withOptions({ignoreImageParams:!0})}fit(e){if(Ee.indexOf(e)===-1)throw Error(`Invalid fit mode "${e}"`);return this.withOptions({fit:e})}crop(e){if(De.indexOf(e)===-1)throw Error(`Invalid crop mode "${e}"`);return this.withOptions({crop:e})}saturation(e){return this.withOptions({saturation:e})}auto(e){if(Oe.indexOf(e)===-1)throw Error(`Invalid auto mode "${e}"`);return this.withOptions({auto:e})}pad(e){return this.withOptions({pad:e})}vanityName(e){return this.withOptions({vanityName:e})}frame(e){if(e!==1)throw Error(`Invalid frame value "${e}"`);return this.withOptions({frame:e})}url(){return Ce(this.options)}toString(){return this.url()}};function Re(e){let t=!1,n;return(...r)=>(t||=(n=e(...r),!0),n)}(e=>Re((...t)=>{console.warn(e.join(` `),...t)}))(["The default export of @sanity/image-url has been deprecated. Use the named export `createImageUrlBuilder` instead."]);var v=t(),ze=Fe({dataset:de,projectId:ue});function Be(e){if(e.mode===`fixed`)return ze.image(e.source).withOptions({...e.transform,width:e.width,height:e.height}).url();let t=e.candidateWidths[e.candidateWidths.length-1];return ze.image(e.source).withOptions({...e.transform,width:t}).url()}function Ve(e,t){return ze.image(e).rect(Math.round(t.width*.02),Math.round(t.height*.02),1,1).width(1).height(1).format(`png`).url()}function He(e){return e.candidateWidths.map(t=>`${Be({...e,candidateWidths:[t]})} ${t}w`).join(`, `)}function y(e){return e}var b=`academyModule`,x=`blog`,Ue=`Research`,We=`changelogEntry`,Ge=`customerStory`,Ke=`event`,qe=`solutionPage`,Je=`versus`,S=`guide`,Ye=`legalDoc`,Xe=`legalHubPage`,C=`useCase`,w=`workshop`,Ze=`workshopPage`,Qe=`{
  name,
  paths[]{
    d,
    fill,
    stroke,
    fillRule,
    clipRule
  }
}`,T=`(
  language == $locale ||
  (
    (!defined(language) || language in $sourceLocales) &&
    !defined(*[
      _type == "translation.metadata" &&
      references(^._id) &&
      count(translations[
        language == $locale &&
        value->_type == $translatedDocumentType &&
        (
          $translatedDocumentType == "${b}" ||
          $translatedDocumentType == "${Ge}" ||
          $translatedDocumentType == "${S}" ||
          $translatedDocumentType == "${Ye}" ||
          $translatedDocumentType == "${C}" ||
          defined(value->publishedAt)
        )
      ]) > 0
    ][0])
  )
)`,E=`(
  language == $locale ||
  (
    (!defined(language) || language in $sourceLocales) &&
    !defined(*[
      _type == "translation.metadata" &&
      references(^._id) &&
      count(translations[
        language == $locale &&
        value->_type == $translatedDocumentType &&
        ($draft || defined(value->publishedAt))
      ]) > 0
    ][0])
  )
)`,$e=`(
  ${T} &&
  (
    language == $locale ||
    !defined(*[
      _id == ^._id + "--" + $locale &&
      _type == $translatedDocumentType &&
      defined(publishedAt)
    ][0])
  )
)`,et=`(
  ${E} &&
  (
    language == $locale ||
    !defined(*[
      _id == ^._id + "--" + $locale &&
      _type == $translatedDocumentType &&
      ($draft || defined(publishedAt))
    ][0])
  )
)`,D=`select(
  language == $locale => 0,
  language == $defaultSourceLocale => 1,
  !defined(language) => 2,
  language in $sourceLocales => 3,
  4
)`,tt=y(`*[
  _type == "${b}" &&
  slug.current == $slug &&
  ${T}
] | order(
  ${D}
)[0]{
  _id,
  title,
  "slug": slug.current,
  video,
  body,
  "relatedModules": (relatedModules[]{
    "resolved": coalesce(
      *[
        _type == "translation.metadata" &&
        references(^._ref)
      ][0].translations[
        language == $locale &&
        value->_type == "${b}"
      ][0].value->,
      @->
    )
  }.resolved)[
    _type == "${b}" &&
    defined(slug.current)
  ]{
    _id,
    "language": coalesce(language, $defaultSourceLocale),
    title,
    "slug": slug.current,
    summary,
    duration,
    thumbnail{
      ...,
      asset{..., "url": @->url}
    }
  }
}`),nt=y(`{
  "featuredId": *[_type == "academyAggregator"][0].featured->_id,
  "modules": *[
    _type == "${b}" &&
    defined(slug.current) &&
    ${T}
  ] | order(
    coalesce(customOrder, 9999) asc,
    title asc
  ){
    _id,
    "language": coalesce(language, $defaultSourceLocale),
    "sourceId": coalesce(
      *[
        _type == "translation.metadata" &&
        references(^._id)
      ][0].translations[
        language == $defaultSourceLocale
      ][0].value->_id,
      _id
    ),
    title,
    "slug": slug.current,
    summary,
    category,
    duration,
    thumbnail{
      ...,
      asset{..., "url": @->url}
    }
  }
}`),rt=y(`*[
  _type == "${x}" &&
  slug.current == $slug &&
  ($draft || defined(publishedAt)) &&
  ${et}
] | order(
  ${D}
)[0]{
  _id,
  title,
  "slug": slug.current,
  category,
  heroImage{
    ...,
    asset{..., "url": @->url}
  },
  "headerImage": select(
    category == "Ideas" => headerImage{
      ...,
      asset{..., "url": @->url}
    }
  ),
  summary,
  author,
  publishedAt,
  "relatedArticles": select(
    !$localizeRelatedArticles => relatedArticles[]->,
    (coalesce(
      *[
        _type == "translation.metadata" &&
        references(^._id)
      ][0].translations[
        language in $sourceLocales &&
        value->_type == "${x}"
      ][0].value->,
      *[
        _type == "${x}" &&
        _id == array::join(string::split(^._id, "--")[0...-1], "--") &&
        string::split(^._id, "--")[-1] == $locale
      ][0],
      @
    ).relatedArticles[]{
      "resolved": coalesce(
        *[
          _id == ^._ref + "--" + $locale &&
          _type == "${x}" &&
          defined(slug.current) &&
          ($draft || defined(publishedAt))
        ][0],
        *[
          _type == "translation.metadata" &&
          references(^._ref)
        ][0].translations[
          language == $locale &&
          value->_type == "${x}" &&
          defined(value->slug.current) &&
          ($draft || defined(value->publishedAt))
        ][0].value->,
        @->
      )
    }.resolved)
  )[defined(slug.current) && ($draft || defined(publishedAt))]{
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt
  },
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset{..., "url": @->url},
      defined(mobileImage.asset) => {
        "mobileImage": mobileImage{..., asset{..., "url": @->url}}
      }
    },
    _type == "blogImageCarousel" => {
      ...,
      slides[]{..., asset{..., "url": @->url}}
    },
    _type == "videoEmbed" => {
      ...,
      muxVideo->{
        title,
        "playbackId": muxVideo.asset->playbackId,
        thumbnail{..., asset{..., "url": @->url}}
      },
      mobileMuxVideo->{
        title,
        "playbackId": muxVideo.asset->playbackId,
        "aspectRatio": muxVideo.asset->data.aspect_ratio,
        thumbnail{..., asset{..., "url": @->url}}
      }
    }
  }
}`),O=`_id,
  title,
  "slug": slug.current,
  category,
  heroImage{
    _type,
    defined(alt) => {alt},
    defined(crop) => {crop},
    defined(hotspot) => {hotspot},
    asset{
      _ref,
      _type,
      "url": @->url
    }
  },
  summary,
  publishedAt`,it=`*[
  _type == "${x}" &&
  slug.current == $slug &&
  (!defined(language) || language in $sourceLocales)
]._id`,at=y(`*[
  _type == "${x}" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  (
    _id in ${it} ||
    (
      language == $locale &&
      (
        string::split(_id, "--")[0] in ${it} ||
        _id in *[
          _type == "translation.metadata" &&
          references(${it})
        ].translations[].value._ref
      )
    )
  )
] | order(select(language == $locale => 0, 1))[0]{
  "slug": slug.current,
  title,
  heroImage{
    _type,
    alt,
    crop,
    hotspot,
    asset{
      _ref,
      _type,
      "url": @->url
    }
  },
  summary
}`),ot=y(`{
  "landing": *[
    _type == "blogLanding" &&
    _id == "blogLanding"
  ][0]{
    home{
      "featuredLeft": coalesce(
        *[_id == ^.featuredLeft._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.featuredLeft._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        featuredLeft->
      ){${O}},
      "featuredRight": coalesce(
        *[_id == ^.featuredRight._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.featuredRight._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        featuredRight->
      ){${O}},
      "subFeaturedOne": coalesce(
        *[_id == ^.subFeaturedOne._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.subFeaturedOne._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        subFeaturedOne->
      ){${O}},
      "subFeaturedTwo": coalesce(
        *[_id == ^.subFeaturedTwo._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.subFeaturedTwo._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        subFeaturedTwo->
      ){${O}},
      "subFeaturedThree": coalesce(
        *[_id == ^.subFeaturedThree._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.subFeaturedThree._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        subFeaturedThree->
      ){${O}}
    },
    research{
      "subFeaturedOne": coalesce(
        *[_id == ^.subFeaturedOne._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.subFeaturedOne._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        subFeaturedOne->
      ){${O}},
      "subFeaturedTwo": coalesce(
        *[_id == ^.subFeaturedTwo._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.subFeaturedTwo._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        subFeaturedTwo->
      ){${O}},
      "subFeaturedThree": coalesce(
        *[_id == ^.subFeaturedThree._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.subFeaturedThree._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        subFeaturedThree->
      ){${O}}
    }
  },
  "posts": *[
    _type == "${x}" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    ${$e}
  ] | order(
    publishedAt desc,
    ${D}
  ){${O}}
}`),st=y(`{
  "landing": *[
    _type == "blogLanding" &&
    _id == "blogLanding"
  ][0]{
    news{
      "featured": coalesce(
        *[
          _id == ^.featured._ref + "--" + $locale &&
          _type == $translatedDocumentType &&
          defined(slug.current) &&
          defined(publishedAt)
        ][0],
        *[
          _type == "translation.metadata" &&
          references(^.featured._ref)
        ][0].translations[
          language == $locale &&
          value->_type == $translatedDocumentType &&
          defined(value->slug.current) &&
          defined(value->publishedAt)
        ][0].value->,
        featured->
      ){_id, title, "slug": slug.current, category, heroImage{..., asset{..., "url": @->url}}, summary, author, publishedAt}
    },
    ideas{
      "featured": coalesce(
        *[
          _id == ^.featured._ref + "--" + $locale &&
          _type == $translatedDocumentType &&
          defined(slug.current) &&
          defined(publishedAt)
        ][0],
        *[
          _type == "translation.metadata" &&
          references(^.featured._ref)
        ][0].translations[
          language == $locale &&
          value->_type == $translatedDocumentType &&
          defined(value->slug.current) &&
          defined(value->publishedAt)
        ][0].value->,
        featured->
      ){_id, title, "slug": slug.current, category, heroImage{..., asset{..., "url": @->url}}, summary, author, publishedAt}
    },
    developers{
      "featured": coalesce(
        *[
          _id == ^.featured._ref + "--" + $locale &&
          _type == $translatedDocumentType &&
          defined(slug.current) &&
          defined(publishedAt)
        ][0],
        *[
          _type == "translation.metadata" &&
          references(^.featured._ref)
        ][0].translations[
          language == $locale &&
          value->_type == $translatedDocumentType &&
          defined(value->slug.current) &&
          defined(value->publishedAt)
        ][0].value->,
        featured->
      ){_id, title, "slug": slug.current, category, heroImage{..., asset{..., "url": @->url}}, summary, author, publishedAt}
    }
  },
  "totalPosts": count(*[
    _type == "${x}" &&
    category == $category &&
    defined(slug.current) &&
    defined(publishedAt) &&
    ${$e}
  ]),
  "posts": *[
    _type == "${x}" &&
    category == $category &&
    defined(slug.current) &&
    defined(publishedAt) &&
    ${$e}
  ] | order(
    publishedAt desc,
    ${D}
  )[$offset...$end]{
    _id,
    title,
    "slug": slug.current,
    category,
    heroImage{..., asset{..., "url": @->url}},
    summary,
    author,
    publishedAt
  }
}`),ct=y(`{
  "landing": *[
    _type == "blogLanding" &&
    _id == "blogLanding"
  ][0]{
    research{
      "featured": coalesce(
        *[_id == ^.featured._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.featured._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        featured->
      ){_id, title, "slug": slug.current, category, heroImage{..., asset{..., "url": @->url}}, summary, author, publishedAt},
      "subFeaturedOne": coalesce(
        *[_id == ^.subFeaturedOne._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.subFeaturedOne._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        subFeaturedOne->
      ){_id, title, "slug": slug.current, category, heroImage{..., asset{..., "url": @->url}}, summary, author, publishedAt},
      "subFeaturedTwo": coalesce(
        *[_id == ^.subFeaturedTwo._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.subFeaturedTwo._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        subFeaturedTwo->
      ){_id, title, "slug": slug.current, category, heroImage{..., asset{..., "url": @->url}}, summary, author, publishedAt},
      "subFeaturedThree": coalesce(
        *[_id == ^.subFeaturedThree._ref + "--" + $locale && _type == $translatedDocumentType && defined(slug.current) && defined(publishedAt)][0],
        *[_type == "translation.metadata" && references(^.subFeaturedThree._ref)][0].translations[language == $locale && value->_type == $translatedDocumentType && defined(value->slug.current) && defined(value->publishedAt)][0].value->,
        subFeaturedThree->
      ){_id, title, "slug": slug.current, category, heroImage{..., asset{..., "url": @->url}}, summary, author, publishedAt}
    }
  },
  "posts": *[
    _type == "${x}" &&
    category == "${Ue}" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    ${$e}
  ] | order(
    publishedAt desc,
    ${D}
  )[$offset...$end]{
    _id,
    title,
    "slug": slug.current,
    category,
    heroImage{..., asset{..., "url": @->url}},
    summary,
    author,
    publishedAt
  }
}`),lt=y(`*[
  _type == "${We}" &&
  slug.current == $slug &&
  ($draft || defined(publishedAt)) &&
  ${E}
] | order(
  ${D}
)[0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  heroImage{
    ...,
    asset{..., "url": @->url}
  },
  intro,
  body[]{
    ...,
    _type == "image" => { ..., asset{..., "url": @->url} },
    _type == "videoEmbed" => {
      ...,
      muxVideo->{
        title,
        "playbackId": muxVideo.asset->playbackId,
        thumbnail{..., asset{..., "url": @->url}}
      },
      mobileMuxVideo->{
        title,
        "playbackId": muxVideo.asset->playbackId,
        "aspectRatio": muxVideo.asset->data.aspect_ratio,
        thumbnail{..., asset{..., "url": @->url}}
      }
    },
    _type == "videoReference" => {
      ...,
      video->{
        title,
        "playbackId": muxVideo.asset->playbackId,
        thumbnail{..., asset{..., "url": @->url}}
      }
    }
  },
  "nextEntry": *[
    _type == "changelogEntry" &&
    publishedAt < ^.publishedAt &&
    (
      language == ^.language ||
      (
        (!defined(^.language) || ^.language in $sourceLocales) &&
        (!defined(language) || language in $sourceLocales)
      )
    )
  ] | order(publishedAt desc)[0]{
    title,
    "slug": slug.current
  }
}`),ut=y(`*[
  _type == "${We}" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  ${T} &&
  (
    language == $locale ||
    !defined(*[
      _type == "${We}" &&
      language == $locale &&
      defined(slug.current) &&
      defined(publishedAt) &&
      (
        slug.current == ^.slug.current ||
        _id == ^._id + "--" + $locale ||
        _id == ^._id + "." + $locale
      )
    ][0])
  )
] | order(publishedAt desc)[0...$limit]{
  _id,
  "language": coalesce(language, $defaultSourceLocale),
  title,
  "slug": slug.current,
  publishedAt,
  intro,
  heroImage{
    ...,
    asset{..., "url": @->url}
  }
}`),dt=y(`*[
  _type == "${Ge}" &&
  slug.current == $slug &&
  ${T}
] | order(
  ${D}
)[0]{
  _id,
  "slug": slug.current,
  customerType,
  customerName,
  customerDescription,
  companyWebsiteUrl,
  companyLogo,
  heroImage,
  heading,
  metrics[]{
    _key,
    number,
    description
  },
  body[]
}`),ft=y(`*[
  _type == "${Ge}" &&
  defined(slug.current) &&
  ${T}
] | order(
  select(defined(publishedAt) => 0, 1) asc,
  publishedAt desc,
  select(defined(migrationSortOrder) => migrationSortOrder, 999999999) asc
){
  _id,
  "translationMetadataIds": *[_type == "translation.metadata" && references(^._id)]._id,
  "language": coalesce(language, $defaultSourceLocale),
  "slug": slug.current,
  customerType,
  customerName,
  companyLogo,
  heroImage,
  heading,
  summary,
  metrics[]{
    _key,
    number,
    description
  }
}`),pt=y(`*[
  _type == "${Ke}" &&
  slug.current == $slug &&
  ($draft || defined(publishedAt)) &&
  ${E}
] | order(
  ${D},
  _id asc
)[0]{
  _id,
  _type,
  "language": coalesce(language, $defaultSourceLocale),
  eventName,
  "slug": slug.current,
  date,
  timezone,
  startTime,
  endTime,
  location,
  primaryCta,
  hero,
  sections[]{
    ...,
    _type == "eventSpeakers" => {
      // An unpublished speaker reference resolves to null; drop it rather than render an empty card.
      speakers[defined(speaker->name)]{
        _key,
        talk,
        "speaker": speaker->{ _id, name, attribution, headshot }
      }
    }
  },
  finalCta
}`),mt=y(`*[
  _type == "${Je}" &&
  slug.current == $slug &&
  ($draft || defined(publishedAt)) &&
  ${E}
] | order(
  ${D},
  _id asc
)[0]{
  _id, _type, title,
  "language": coalesce(language, $defaultSourceLocale),
  "slug": slug.current,
  competitor{name, logo{asset->{url}}},
  hero{...,
    media{..., backgroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, foregroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, video{..., video->{"playbackId": muxVideo.asset->playbackId, thumbnail{asset->{_id, metadata{dimensions{width, height}}}}}}, promptCard}
  },
  sections[]{...,
    logos[]{_key, name, railHeight, logo{..., asset->{_id, metadata{dimensions{width, height}}}}},
    "customerStory": coalesce(
      *[_type == "translation.metadata" && references(^.customerStory._ref)][0].translations[
        language == $locale && value->_type == "customerStory"
      ][0].value->,
      *[
        _type == "customerStory" && language == $locale &&
        _id == ^.customerStory._ref + "--" + $locale
      ][0],
      *[
        _type == "customerStory" && language == $locale &&
        _id == ^.customerStory._ref + "." + $locale
      ][0],
      customerStory->
    ){"slug": slug.current, customerName, companyLogo{asset->{_id, metadata{dimensions{width, height}}}}},
    cards[]{...,
      media{..., backgroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, foregroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, calloutImage{..., asset->{_id, metadata{dimensions{width, height}}}}, video{..., video->{"playbackId": muxVideo.asset->playbackId, thumbnail{asset->{_id, metadata{dimensions{width, height}}}}}}}
    }
  },
  bottomCta{..., background{..., backgroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, foregroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, calloutImage{..., asset->{_id, metadata{dimensions{width, height}}}}, video{..., video->{"playbackId": muxVideo.asset->playbackId, thumbnail{asset->{_id, metadata{dimensions{width, height}}}}}}}}
}`),ht=y(`*[
  _type == "${qe}" &&
  slug.current == $slug &&
  ($draft || defined(publishedAt)) &&
  ${E}
] | order(
  ${D},
  _id asc
)[0]{
  _id, _type, title,
  "language": coalesce(language, $defaultSourceLocale),
  "slug": slug.current,
  hero{...,
    media{..., backgroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, foregroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, video{..., video->{"playbackId": muxVideo.asset->playbackId, thumbnail{asset->{_id, metadata{dimensions{width, height}}}}}}, promptCard}
  },
  sections[]{...,
    logos[]{_key, name, railHeight, logo{..., asset->{_id, metadata{dimensions{width, height}}}}},
    backgroundImage{asset->{_id, metadata{dimensions{width, height}}}},
    features[]{..., uiImage{..., asset->{_id, metadata{dimensions{width, height}}}}, uiVideo{alt, "hevc": hevc.asset->url, "webm": webm.asset->url}},
    "customerStory": coalesce(
      *[_type == "translation.metadata" && references(^.customerStory._ref)][0].translations[
        language == $locale && value->_type == "customerStory"
      ][0].value->,
      *[
        _type == "customerStory" && language == $locale &&
        _id == ^.customerStory._ref + "--" + $locale
      ][0],
      *[
        _type == "customerStory" && language == $locale &&
        _id == ^.customerStory._ref + "." + $locale
      ][0],
      customerStory->
    ){"slug": slug.current, customerName, companyLogo{asset->{_id, metadata{dimensions{width, height}}}}},
    featured{..., media{..., backgroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, foregroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, calloutImage{..., asset->{_id, metadata{dimensions{width, height}}}}, video{..., video->{"playbackId": muxVideo.asset->playbackId, thumbnail{asset->{_id, metadata{dimensions{width, height}}}}}}},
      "useCase": coalesce(
        *[_type == "translation.metadata" && references(^.useCase._ref)][0].translations[
          language == $locale && value->_type == "useCase"
        ][0].value->,
        *[
          _type == "useCase" && language == $locale &&
          _id == ^.useCase._ref + "--" + $locale
        ][0],
        *[
          _type == "useCase" && language == $locale &&
          _id == ^.useCase._ref + "." + $locale
        ][0],
        useCase->
      ){"slug": slug.current, title}
    },
    _type == "useCaseShowcaseSection" => {
      cards[]{...,
        "useCase": coalesce(
          *[_type == "translation.metadata" && references(^.useCase._ref)][0].translations[
            language == $locale && value->_type == "useCase"
          ][0].value->,
          *[
            _type == "useCase" && language == $locale &&
            _id == ^.useCase._ref + "--" + $locale
          ][0],
          *[
            _type == "useCase" && language == $locale &&
            _id == ^.useCase._ref + "." + $locale
          ][0],
          useCase->
        ){"slug": slug.current, title, description}
      }
    },
    _type == "twoUpSection" => {
      cards[]{...,
        media{..., backgroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, foregroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, calloutImage{..., asset->{_id, metadata{dimensions{width, height}}}}, video{..., video->{"playbackId": muxVideo.asset->playbackId, thumbnail{asset->{_id, metadata{dimensions{width, height}}}}}}}
      }
    },
    _type == "threeUpSection" => {
      cards[]{...,
        media{..., backgroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, foregroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, calloutImage{..., asset->{_id, metadata{dimensions{width, height}}}}, video{..., video->{"playbackId": muxVideo.asset->playbackId, thumbnail{asset->{_id, metadata{dimensions{width, height}}}}}}}
      }
    },
    tiles[]{_key, connector->{name, icon{asset->{_id, metadata{dimensions{width, height}}}}}}
  },
  bottomCta{..., background{..., backgroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, foregroundImage{..., asset->{_id, metadata{dimensions{width, height}}}}, calloutImage{..., asset->{_id, metadata{dimensions{width, height}}}}, video{..., video->{"playbackId": muxVideo.asset->playbackId, thumbnail{asset->{_id, metadata{dimensions{width, height}}}}}}}}
}`),gt=`workshopType == "upcoming" &&
  defined(slug.current) && defined(startsAt) && defined(registrationUrl) &&
  dateTime(startsAt) + coalesce(duration, 60) * 60 > dateTime(now())`,_t=`workshopType in ["on-demand", "short-session"] &&
  defined(slug.current)`,vt=`_id,
  "language": coalesce(language, $defaultSourceLocale),
  "slug": slug.current,
  title,
  description,
  workshopType,
  duration,
  startsAt,
  timeZone,
  registrationUrl,
  publishedAt,
  "speakers": speakers[]->{
    _id,
    name,
    attribution,
    headshot{
      ...,
      asset{..., "url": @->url}
    }
  }`,yt=`"featuredAcademyModules": (featuredAcademyModules[]{
    "resolved": coalesce(
      *[
        _type == "translation.metadata" &&
        references(^._ref)
      ][0].translations[
        language == $locale &&
        value->_type == $academyDocumentType &&
        defined(value->slug.current)
      ][0].value->,
      @->
    )
  }.resolved)[
    _type == "${b}"
  ]{
    _id,
  "language": coalesce(language, \$defaultSourceLocale),
  "slug": slug.current,
  title,
  summary,
  duration,
  thumbnail{
    ...,
    asset{..., "url": @->url}
  }
  }`,bt=y(`*[
  _type == "${Ze}" &&
  _id == "${Ze}"
][0]{
  ${yt}
}`),xt=`(
  ${E} &&
  (
    language == $locale ||
    !defined(*[
      _id == ^._id + "--" + $locale &&
      _type == $translatedDocumentType &&
      language == $locale &&
      defined(slug.current) &&
      ($draft || defined(publishedAt)) &&
      (${gt} || ${_t})
    ][0])
  )
)`,St=y(`{
  "page": *[
    _type == "${Ze}" &&
    _id == "${Ze}"
  ][0]{
    ${yt}
  },
  "upcomingWorkshops": *[
    _type == "${w}" &&
    ${gt} &&
    ($draft || defined(publishedAt)) &&
    ${xt}
  ] | order(
    startsAt asc,
    ${D}
  ){
    ${vt}
  },
  "onDemandWorkshops": *[
    _type == "${w}" &&
    workshopType == "on-demand" &&
    defined(slug.current) &&
    ($draft || defined(publishedAt)) &&
    ${xt}
  ] | order(
    publishedAt desc,
    ${D}
  ){
    ${vt}
  },
  "shortSessions": *[
    _type == "${w}" &&
    workshopType == "short-session" &&
    defined(slug.current) &&
    ($draft || defined(publishedAt)) &&
    ${xt}
  ] | order(
    publishedAt desc,
    ${D}
  ){
    ${vt}
  }
}`),Ct=y(`{
  "selectedWorkshop": *[
    _type == "${w}" &&
    workshopType in ["on-demand", "short-session"] &&
    slug.current == $slug &&
    ($draft || defined(publishedAt)) &&
    ${E}
  ] | order(
    ${D}
  )[0]{
    ${vt},
    video,
    body,
    "moreWorkshops": coalesce(
      (relatedWorkshops[]{
        "resolved": coalesce(
          *[
            _type == "translation.metadata" &&
            references(^._ref)
          ][0].translations[
            language == $locale &&
            value->_type == $translatedDocumentType &&
            ($draft || defined(value->publishedAt))
          ][0].value->,
          @->
        )
      }.resolved)[
        _type == "${w}" &&
        ${_t} &&
        ($draft || defined(publishedAt))
      ][0...4]{
        ${vt}
      },
      []
    )
  }
}{
  "workshop": selectedWorkshop{
    _id,
    language,
    slug,
    title,
    description,
    workshopType,
    duration,
    startsAt,
    timeZone,
    registrationUrl,
    publishedAt,
    speakers,
    video,
    body
  },
  "moreWorkshops": coalesce(selectedWorkshop.moreWorkshops, [])
}`);`${w}${_t}${T}${D}${vt}`;var wt=y(`*[
  _type == "${C}" &&
  slug.current == $slug &&
  ${T}
] | order(
  ${D}
)[0]{
  _id,
  "sourceId": coalesce(
    *[_type == "translation.metadata" && references(^._id)][0]._id,
    _id
  ),
  "language": coalesce(language, $defaultSourceLocale),
  title,
  "slug": slug.current,
  description,
  products,
  features,
  solutions,
  body[]{
    ...,
    _type == "image" => { ..., asset{..., "url": @->url} }
  }
}`),Tt=`defined(slug.current) && defined(title)`,Et=`(coalesce(
    connectors,
    *[_type == "translation.metadata" && references(^._id)][0].translations[
      language == $defaultSourceLocale
    ][0].value->connectors,
    *[_id == string::split(^._id, "--")[0]][0].connectors
  )[]->)[defined(icon.asset)]{
    _id,
    name,
    icon{asset, crop, hotspot}
  }`,Dt=`"connectors": ${Et}`,Ot=y(`*[
  _type == "${C}" &&
  ${Tt} &&
  ${T}
] | order(
  ${D},
  title asc,
  _id asc
){
  _id,
  "sourceId": coalesce(
    *[_type == "translation.metadata" && references(^._id)][0]._id,
    _id
  ),
  "language": coalesce(language, $defaultSourceLocale),
  title,
  "slug": slug.current,
  description,
  products,
  features,
  solutions,
  ${Dt}
}`),kt=y(`*[
  _type == "${C}" &&
  ${Tt} &&
  ${T}
] | order(
  coalesce(
    publishedAt,
    *[_type == "translation.metadata" && references(^._id)][0].translations[
      language == $defaultSourceLocale
    ][0].value->publishedAt
  ) desc,
  coalesce(migrationSortOrder, 9999) asc,
  title asc,
  _id asc
){
  _id,
  "sourceId": coalesce(
    *[_type == "translation.metadata" && references(^._id)][0]._id,
    _id
  ),
  "language": coalesce(language, $defaultSourceLocale),
  title,
  "slug": slug.current,
  description,
  products,
  features,
  solutions,
  migrationSortOrder,
  ${Dt}
}`),At=`defined(title) && defined(slug.current) && defined(description) &&
  defined(thumbnail.asset) && defined(file.asset->url) &&
  count(keyPoints) > 0 && count(summary) > 0`,jt=y(`*[
  _type == "${S}" &&
  ${At} &&
  ${T} &&
  (language == $locale || !defined(*[
    _id == ^._id + "--" + $locale && _type == "${S}"
  ][0]))
]{
  _id,
  "sourceId": coalesce(
    *[_type == "translation.metadata" && references(^._id)][0]._id,
    string::split(_id, "--")[0]
  ),
  "createdAt": coalesce(
    *[_type == "translation.metadata" && references(^._id)][0].translations[
      language == $defaultSourceLocale
    ][0].value->_createdAt,
    *[_id == string::split(^._id, "--")[0]][0]._createdAt,
    _createdAt
  ),
  "language": coalesce(language, $defaultSourceLocale),
  title, shortTitle, description,
  "slug": slug.current,
  "cover": select(
    guidePreview.status == "ready" &&
    guidePreview.sourceFile.asset._ref == file.asset._ref => guidePreview.pages[role == "front"][0]{
      width, height, image{..., asset{..., "url": @->url}}
    }
  ),
  thumbnail{
    ...,
    asset{..., "url": @->url, "width": @->metadata.dimensions.width, "height": @->metadata.dimensions.height}
  }
}`),Mt=`(
  (_type == "${S}" && ${At}) ||
  (_type == "${b}" && defined(title) && defined(slug.current) &&
    defined(video) && defined(thumbnail.asset)) ||
  (_type == "${C}" && ${Tt} && defined(description)) ||
  (_type == "${w}" && defined(title) && defined(publishedAt) &&
    (${gt} || ${_t}))
)`,Nt=`{..., asset{..., "url": @->url,
  "width": @->metadata.dimensions.width, "height": @->metadata.dimensions.height}}`,Pt=y(`*[_type == "resourceHubPage"][0]{
  "featured": featuredItems[0...3]{
    _key, backgroundImage${Nt}, useCaseImage${Nt},
    "resourceId": coalesce(guide, useCase, academyModule)._ref
  },
  "mainGuideId": mainGuide._ref,
  "secondaryGuideIds": secondaryGuides[0...3]._ref,
  "workshopIds": workshops[0...8]._ref,
  "useCaseIds": useCases[0...8]._ref,
  "academyModuleIds": academyModules[0...3]._ref,
  "resources": (
    coalesce(featuredItems[0...3]{"ref": coalesce(guide, useCase, academyModule)}.ref, []) +
    [mainGuide] + coalesce(secondaryGuides[0...3], []) + coalesce(workshops[0...8], []) +
    coalesce(useCases[0...8], []) + coalesce(academyModules[0...3], [])
  )[]{_ref, "resolved": ${`select(
  $locale == $defaultSourceLocale =>
    *[_id == ^._ref && ${Mt}][0],
  coalesce(
    *[_id == ^._ref + "--" + $locale && _type == ^->_type &&
      language == $locale && ${Mt}][0],
    (*[_type == "translation.metadata" && references(^._ref)][0]
      .translations[language == $locale].value->)[
      _type == ^->_type && ${Mt}
    ] | order(_id asc)[0],
    *[_id == ^._ref && ${Mt}][0]
  )
)${`{
  _id, _type, title, shortTitle, description, "summary": select(_type == "academyModule" => summary), duration,
  "sourceId": _id, "createdAt": _createdAt,
  "slug": slug.current, "language": coalesce(language, $defaultSourceLocale),
  products, solutions, workshopType, startsAt, timeZone, registrationUrl,
  "connectors": select(_type == "${C}" => ${Et}),
  thumbnail${Nt},
  "cover": select(guidePreview.status == "ready" &&
    guidePreview.sourceFile.asset._ref == file.asset._ref =>
      guidePreview.pages[role == "front"][0]{width, height, image${Nt}}),
  speakers[]->{_id, name, headshot${Nt}}
}`}`}}
}`),Ft=y(`*[
  _type == "${S}" &&
  slug.current == $slug &&
  ${T}
] | order(
  ${D}
)[0]{
  _id,
  "language": coalesce(language, $defaultSourceLocale),
  title,
  shortTitle,
  "slug": slug.current,
  description,
  thumbnail{
    ...,
    asset{
      ...,
      "url": @->url,
      "width": @->metadata.dimensions.width,
      "height": @->metadata.dimensions.height
    }
  },
  file{
    ...,
    asset->{_id, url}
  },
  keyPoints[]{
    _key,
    _type,
    icon${Qe},
    title,
    description
  },
  summary,
  "guidePreview": select(
    guidePreview.status == "ready" &&
    guidePreview.sourceFile.asset._ref == file.asset._ref => guidePreview{
      status,
      sourceFile,
      pages[]{
        _key,
        role,
        pageNumber,
        width,
        height,
        image{
          ...,
          asset{..., "url": @->url}
        }
      }
    }
  ),
  "relatedGuides": (relatedGuides[]{
    "resolved": coalesce(
      *[
        _id == ^._ref + "--" + $locale &&
        _type == "${S}"
      ][0],
      *[
        _type == "translation.metadata" &&
        references(^._ref)
      ][0].translations[
        language == $locale &&
        value->_type == "${S}"
      ][0].value->,
      @->
    )
  }.resolved)[
    _type == "${S}" &&
    defined(title) &&
    defined(slug.current) &&
    defined(thumbnail.asset)
  ][0...3]{
    _id,
    "language": coalesce(language, $defaultSourceLocale),
    title,
    shortTitle,
    "cover": select(guidePreview.status == "ready" && guidePreview.sourceFile.asset._ref == file.asset._ref => guidePreview.pages[role == "front"][0]{
      width, height, image{asset{..., "url": @->url}}
    }),
    "slug": slug.current,
    thumbnail{
      ...,
      asset{..., "url": @->url, "width": @->metadata.dimensions.width, "height": @->metadata.dimensions.height}
    }
  }
}`),It=y(`*[
  _type == "${Ye}" &&
  slug.current == $slug &&
  ${T}
] | order(
  ${D}
)[0]{
  _id,
  title,
  "slug": slug.current,
  category,
  hideGlobalCallout,
  "globalCallout": coalesce(
    (*[
      _type == "${Xe}" &&
      language == $locale
    ] | order(_id asc))[0].globalCallout,
    *[
      _id == "${Xe}" &&
      _type == "${Xe}"
    ][0].globalCallout
  ),
  body[]
}`),Lt=y(`*[
  _type == "${Ye}" &&
  defined(slug.current) &&
  defined(category) &&
  ${T}
] | order(category asc, title asc){
  _id,
  "language": coalesce(language, $defaultSourceLocale),
  title,
  "slug": slug.current,
  category
}`),Rt=y(`coalesce(
  (*[
    _id == "${Xe}" &&
    _type == "${Xe}"
  ][0].featuredDocuments[]{
    "resolvedSlug": coalesce(
      *[
        _type == "translation.metadata" &&
        references(^._ref)
      ][0].translations[
        language == $locale &&
        value->_type == $translatedDocumentType
      ][0].value->slug.current,
      @->slug.current
    )
  }{
    "document": *[
      _type == "${Ye}" &&
      defined(^.resolvedSlug) &&
      defined(slug.current) &&
      slug.current == ^.resolvedSlug &&
      ${T}
    ] | order(
      ${D}
    )[0]{
      _id,
      title,
      "slug": slug.current,
      hubPageDescription,
      hubPageThumbnail
    }
  })[defined(document._id)].document,
  []
)`),zt=[`request`,`response`,`progress`,`error`,`abort`],Bt=[`processOptions`,`validateOptions`,`interceptRequest`,`finalizeOptions`,`onRequest`,`onResponse`,`onError`,`onReturn`,`onHeaders`];function Vt(e,t){let n=[],r=Bt.reduce((e,t)=>(e[t]=e[t]||[],e),{processOptions:[m],validateOptions:[h]});function i(e){let n=zt.reduce((e,t)=>(e[t]=function(){let e=Object.create(null),t=0;return{publish:function(t){for(let n in e)e[n](t)},subscribe:function(n){let r=t++;return e[r]=n,function(){delete e[r]}}}}(),e),{}),i=(e=>function(t,n,...r){let i=t===`onError`,a=n;for(let n=0;n<e[t].length&&(a=(0,e[t][n])(a,...r),!i||a);n++);return a})(r),a=i(`processOptions`,e);i(`validateOptions`,a);let o={options:a,channels:n,applyMiddleware:i},s,c=n.request.subscribe(e=>{s=t(e,(t,r)=>((e,t,r)=>{let a=e,o=t;if(!a)try{o=i(`onResponse`,t,r)}catch(e){o=null,a=e}a&&=i(`onError`,a,r),a?n.error.publish(a):o&&n.response.publish(o)})(t,r,e))});n.abort.subscribe(()=>{c(),s&&s.abort()});let l=i(`onReturn`,n,o);return l===n&&n.request.publish(o),l}return i.use=function(e){if(!e)throw Error(`Tried to add middleware that resolved to falsey value`);if(typeof e==`function`)throw Error(`Tried to add middleware that was a function. It probably expects you to pass options to it.`);if(e.onReturn&&r.onReturn.length>0)throw Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");return Bt.forEach(t=>{e[t]&&r[t].push(e[t])}),n.push(e),i},i.clone=()=>Vt(n,t),e.forEach(i.use),i}var Ht,Ut,Wt=g(function(){if(Ut)return Ht;Ut=1;var e=function(e){return e.replace(/^\s+|\s+$/g,``)},t=function(e){return Object.prototype.toString.call(e)===`[object Array]`};return Ht=function(n){if(!n)return{};for(var r=Object.create(null),i=e(n).split(`
`),a=0;a<i.length;a++){var o=i[a],s=o.indexOf(`:`),c=e(o.slice(0,s)).toLowerCase(),l=e(o.slice(s+1));typeof r[c]>`u`?r[c]=l:t(r[c])?r[c].push(l):r[c]=[r[c],l]}return r}}()),Gt=class{onabort;onerror;onreadystatechange;ontimeout;readyState=0;response;responseText=``;responseType=``;status;statusText;withCredentials;#e;#t;#n;#r={};#i;#a={};#o;open(e,t,n){this.#e=e,this.#t=t,this.#n=``,this.readyState=1,this.onreadystatechange?.(),this.#i=void 0}abort(){this.#i&&this.#i.abort()}getAllResponseHeaders(){return this.#n}setRequestHeader(e,t){this.#r[e]=t}setInit(e,t=!0){this.#a=e,this.#o=t}send(e){let t=this.responseType!==`arraybuffer`,n={...this.#a,method:this.#e,headers:this.#r,body:e};typeof AbortController==`function`&&this.#o&&(this.#i=new AbortController,typeof EventTarget<`u`&&this.#i.signal instanceof EventTarget&&(n.signal=this.#i.signal)),typeof document<`u`&&(n.credentials=this.withCredentials?`include`:`omit`),fetch(this.#t,n).then(e=>(e.headers.forEach((e,t)=>{this.#n+=`${t}: ${e}\r\n`}),this.status=e.status,this.statusText=e.statusText,this.readyState=3,this.onreadystatechange?.(),t?e.text():e.arrayBuffer())).then(e=>{typeof e==`string`?this.responseText=e:this.response=e,this.readyState=4,this.onreadystatechange?.()}).catch(e=>{e.name===`AbortError`?this.onabort?.():this.onerror?.(e)})}},Kt=typeof XMLHttpRequest==`function`?`xhr`:`fetch`,qt=Kt===`xhr`?XMLHttpRequest:Gt,Jt=(e,t)=>{let n=e.options,r=e.applyMiddleware(`finalizeOptions`,n),i={},a=e.applyMiddleware(`interceptRequest`,void 0,{adapter:Kt,context:e});if(a){let e=setTimeout(t,0,null,a);return{abort:()=>clearTimeout(e)}}let o=new qt;o instanceof Gt&&typeof r.fetch==`object`&&o.setInit(r.fetch,r.useAbortSignal??!0);let s=r.headers,c=r.timeout,l=!1,u=!1,d=!1;if(o.onerror=e=>{m(o instanceof Gt?e instanceof Error?e:Error(`Request error while attempting to reach is ${r.url}`,{cause:e}):Error(`Request error while attempting to reach is ${r.url}${e.lengthComputable?`(${e.loaded} of ${e.total} bytes transferred)`:``}`))},o.ontimeout=e=>{m(Error(`Request timeout while attempting to reach ${r.url}${e.lengthComputable?`(${e.loaded} of ${e.total} bytes transferred)`:``}`))},o.onabort=()=>{p(!0),l=!0},o.onreadystatechange=function(){c&&(p(),i.socket=setTimeout(()=>f(`ESOCKETTIMEDOUT`),c.socket)),!l&&o&&o.readyState===4&&o.status!==0&&function(){if(!(l||u||d)){if(o.status===0)return void m(Error(`Unknown XHR error`));p(),u=!0,t(null,{body:o.response||(o.responseType===``||o.responseType===`text`?o.responseText:``),url:r.url,method:r.method,headers:Wt(o.getAllResponseHeaders()),statusCode:o.status,statusMessage:o.statusText})}}()},o.open(r.method,r.url,!0),o.withCredentials=!!r.withCredentials,s&&o.setRequestHeader)for(let e in s)s.hasOwnProperty(e)&&o.setRequestHeader(e,s[e]);return r.rawBody&&(o.responseType=`arraybuffer`),e.applyMiddleware(`onRequest`,{options:r,adapter:Kt,request:o,context:e}),o.send(r.body||null),c&&(i.connect=setTimeout(()=>f(`ETIMEDOUT`),c.connect)),{abort:function(){l=!0,o&&o.abort()}};function f(t){d=!0,o.abort();let n=Error(t===`ESOCKETTIMEDOUT`?`Socket timed out on request to ${r.url}`:`Connection timed out on request to ${r.url}`);n.code=t,e.channels.error.publish(n)}function p(e){(e||l||o&&o.readyState>=2&&i.connect)&&clearTimeout(i.connect),i.socket&&clearTimeout(i.socket)}function m(e){if(u)return;p(!0),u=!0,o=null;let n=e||Error(`Network error while attempting to reach ${r.url}`);n.isNetworkError=!0,n.request=r,t(n)}},Yt=(e=[],t=Jt)=>Vt(e,t);function Xt(e){return{}}var Zt,Qt,$t,en,tn,nn={exports:{}};tn||(tn=1,function(e,t){t.formatArgs=function(t){if(t[0]=(this.useColors?`%c`:``)+this.namespace+(this.useColors?` %c`:` `)+t[0]+(this.useColors?`%c `:` `)+`+`+e.exports.humanize(this.diff),!this.useColors)return;let n=`color: `+this.color;t.splice(1,0,n,`color: inherit`);let r=0,i=0;t[0].replace(/%[a-zA-Z%]/g,e=>{e!==`%%`&&(r++,e===`%c`&&(i=r))}),t.splice(i,0,n)},t.save=function(e){try{e?t.storage.setItem(`debug`,e):t.storage.removeItem(`debug`)}catch{}},t.load=function(){let e;try{e=t.storage.getItem(`debug`)||t.storage.getItem(`DEBUG`)}catch{}return!e&&typeof process<`u`&&`env`in process&&(e={}.DEBUG),e},t.useColors=function(){if(typeof window<`u`&&window.process&&(window.process.type===`renderer`||window.process.__nwjs))return!0;if(typeof navigator<`u`&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<`u`&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<`u`&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<`u`&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<`u`&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function(){try{return localStorage}catch{}}(),t.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=`#0000CC.#0000FF.#0033CC.#0033FF.#0066CC.#0066FF.#0099CC.#0099FF.#00CC00.#00CC33.#00CC66.#00CC99.#00CCCC.#00CCFF.#3300CC.#3300FF.#3333CC.#3333FF.#3366CC.#3366FF.#3399CC.#3399FF.#33CC00.#33CC33.#33CC66.#33CC99.#33CCCC.#33CCFF.#6600CC.#6600FF.#6633CC.#6633FF.#66CC00.#66CC33.#9900CC.#9900FF.#9933CC.#9933FF.#99CC00.#99CC33.#CC0000.#CC0033.#CC0066.#CC0099.#CC00CC.#CC00FF.#CC3300.#CC3333.#CC3366.#CC3399.#CC33CC.#CC33FF.#CC6600.#CC6633.#CC9900.#CC9933.#CCCC00.#CCCC33.#FF0000.#FF0033.#FF0066.#FF0099.#FF00CC.#FF00FF.#FF3300.#FF3333.#FF3366.#FF3399.#FF33CC.#FF33FF.#FF6600.#FF6633.#FF9900.#FF9933.#FFCC00.#FFCC33`.split(`.`),t.log=console.debug||console.log||(()=>{}),e.exports=(en?$t:(en=1,$t=function(e){function t(e){let r,i,a,o=null;function s(...e){if(!s.enabled)return;let n=s,i=Number(new Date);n.diff=i-(r||i),n.prev=r,n.curr=i,r=i,e[0]=t.coerce(e[0]),typeof e[0]!=`string`&&e.unshift(`%O`);let a=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(r,i)=>{if(r===`%%`)return`%`;a++;let o=t.formatters[i];if(typeof o==`function`){let t=e[a];r=o.call(n,t),e.splice(a,1),a--}return r}),t.formatArgs.call(n,e),(n.log||t.log).apply(n,e)}return s.namespace=e,s.useColors=t.useColors(),s.color=t.selectColor(e),s.extend=n,s.destroy=t.destroy,Object.defineProperty(s,"enabled",{enumerable:!0,configurable:!1,get:()=>o===null?(i!==t.namespaces&&(i=t.namespaces,a=t.enabled(e)),a):o,set:e=>{o=e}}),typeof t.init==`function`&&t.init(s),s}function n(e,n){let r=t(this.namespace+(typeof n>`u`?`:`:n)+e);return r.log=this.log,r}function r(e,t){let n=0,r=0,i=-1,a=0;for(;n<e.length;)if(r<t.length&&(t[r]===e[n]||t[r]===`*`))t[r]===`*`?(i=r,a=n,r++):(n++,r++);else{if(i===-1)return!1;r=i+1,a++,n=a}for(;r<t.length&&t[r]===`*`;)r++;return r===t.length}return t.debug=t,t.default=t,t.coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){let e=[...t.names,...t.skips.map(e=>`-`+e)].join(`,`);return t.enable(``),e},t.enable=function(e){t.save(e),t.namespaces=e,t.names=[],t.skips=[];let n=(typeof e==`string`?e:``).trim().replace(/\s+/g,`,`).split(`,`).filter(Boolean);for(let e of n)e[0]===`-`?t.skips.push(e.slice(1)):t.names.push(e)},t.enabled=function(e){for(let n of t.skips)if(r(e,n))return!1;for(let n of t.names)if(r(e,n))return!0;return!1},t.humanize=function(){if(Qt)return Zt;Qt=1;var e=1e3,t=60*e,n=60*t,r=24*n,i=7*r;function a(e,t,n,r){var i=t>=1.5*n;return Math.round(e/n)+` `+r+(i?`s`:``)}return Zt=function(o,s){s||={};var c,l,u=typeof o;if(u===`string`&&o.length>0)return function(a){if(!((a=String(a)).length>100)){var o=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a);if(o){var s=parseFloat(o[1]);switch((o[2]||`ms`).toLowerCase()){case`years`:case`year`:case`yrs`:case`yr`:case`y`:return 315576e5*s;case`weeks`:case`week`:case`w`:return s*i;case`days`:case`day`:case`d`:return s*r;case`hours`:case`hour`:case`hrs`:case`hr`:case`h`:return s*n;case`minutes`:case`minute`:case`mins`:case`min`:case`m`:return s*t;case`seconds`:case`second`:case`secs`:case`sec`:case`s`:return s*e;case`milliseconds`:case`millisecond`:case`msecs`:case`msec`:case`ms`:return s;default:return}}}}(o);if(u===`number`&&isFinite(o))return s.long?(c=o,(l=Math.abs(c))>=r?a(c,l,r,`day`):l>=n?a(c,l,n,`hour`):l>=t?a(c,l,t,`minute`):l>=e?a(c,l,e,`second`):c+` ms`):function(i){var a=Math.abs(i);return a>=r?Math.round(i/r)+`d`:a>=n?Math.round(i/n)+`h`:a>=t?Math.round(i/t)+`m`:a>=e?Math.round(i/e)+`s`:i+`ms`}(o);throw Error(`val is not a non-empty string or a valid number. val=`+JSON.stringify(o))}}(),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach(n=>{t[n]=e[n]}),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let n=0;for(let t=0;t<e.length;t++)n=(n<<5)-n+e.charCodeAt(t),n|=0;return t.colors[Math.abs(n)%t.colors.length]},t.enable(t.load()),t}))(t);let{formatters:n}=e.exports;n.j=function(e){try{return JSON.stringify(e)}catch(e){return`[UnexpectedJSONParseError]: `+e.message}}}(nn,nn.exports)),nn.exports;var rn=typeof Buffer>`u`?()=>!1:e=>Buffer.isBuffer(e);function an(e){return Object.prototype.toString.call(e)===`[object Object]`}function on(e){if(!1===an(e))return!1;let t=e.constructor;if(t===void 0)return!0;let n=t.prototype;return!1!==an(n)&&!1!==n.hasOwnProperty(`isPrototypeOf`)}var sn=[`boolean`,`string`,`number`];function cn(){return{processOptions:e=>{let t=e.body;return!t||typeof t.pipe==`function`||rn(t)||sn.indexOf(typeof t)===-1&&!Array.isArray(t)&&!on(t)?e:Object.assign({},e,{body:JSON.stringify(e.body),headers:Object.assign({},e.headers,{"Content-Type":`application/json`})})}}}function ln(e){return{onResponse:n=>{let r=n.headers[`content-type`]||``,i=e&&e.force||r.indexOf(`application/json`)!==-1;return n.body&&r&&i?Object.assign({},n,{body:t(n.body)}):n},processOptions:e=>Object.assign({},e,{headers:Object.assign({Accept:`application/json`},e.headers)})};function t(e){try{return JSON.parse(e)}catch(e){throw e.message=`Failed to parsed response body as JSON: ${e.message}`,e}}}var un={};typeof globalThis<`u`?un=globalThis:typeof window<`u`?un=window:typeof global<`u`?un=global:typeof self<`u`&&(un=self);var dn=un;function fn(e={}){let t=e.implementation||dn.Observable;if(!t)throw Error("`Observable` is not available in global scope, and no implementation was passed");return{onReturn:(e,n)=>new t(t=>(e.error.subscribe(e=>t.error(e)),e.progress.subscribe(e=>t.next(Object.assign({type:`progress`},e))),e.response.subscribe(e=>{t.next(Object.assign({type:`response`},e)),t.complete()}),e.request.publish(n),()=>e.abort.publish()))}}function pn(){return{onRequest:e=>{if(e.adapter!==`xhr`)return;let t=e.request,n=e.context;function r(e){return t=>{let r=t.lengthComputable?t.loaded/t.total*100:-1;n.channels.progress.publish({stage:e,percent:r,total:t.total,loaded:t.loaded,lengthComputable:t.lengthComputable})}}`upload`in t&&`onprogress`in t.upload&&(t.upload.onprogress=r(`upload`)),`onprogress`in t&&(t.onprogress=r(`download`))}}}var mn=(e,t,n)=>(n.method===`GET`||n.method===`HEAD`)&&(e.isNetworkError||!1);function hn(e){return 100*2**e+100*Math.random()}var gn=(e={})=>(e=>{let t=e.maxRetries||5,n=e.retryDelay||hn,r=e.shouldRetry;return{onError:(e,i)=>{let a=i.options,o=a.maxRetries||t,s=a.retryDelay||n,c=a.shouldRetry||r,l=a.attemptNumber||0;if((u=a.body)!==null&&typeof u==`object`&&typeof u.pipe==`function`||!c(e,l,a)||l>=o)return e;var u;let d=Object.assign({},i,{options:Object.assign({},a,{attemptNumber:l+1})});return setTimeout(()=>i.channels.request.publish(d),s(l)),null}}})({shouldRetry:mn,...e});gn.shouldRetry=mn,_n=Xt;var _n;function k(e){return typeof e==`function`}function vn(e){var t=e(function(e){Error.call(e),e.stack=Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var yn=vn(function(e){return function(t){e(this),this.message=t?t.length+` errors occurred during unsubscription:
`+t.map(function(e,t){return t+1+`) `+e.toString()}).join(`
  `):``,this.name=`UnsubscriptionError`,this.errors=t}});function bn(e,t){if(e){var n=e.indexOf(t);0<=n&&e.splice(n,1)}}var xn=function(){function e(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return e.prototype.unsubscribe=function(){var e,t,r,i,o;if(!this.closed){this.closed=!0;var s=this._parentage;if(s){if(this._parentage=null,Array.isArray(s))try{for(var c=u(s),l=c.next();!l.done;l=c.next())l.value.remove(this)}catch(t){e={error:t}}finally{try{l&&!l.done&&(t=c.return)&&t.call(c)}finally{if(e)throw e.error}}else s.remove(this)}var d=this.initialTeardown;if(k(d))try{d()}catch(e){o=e instanceof yn?e.errors:[e]}var f=this._finalizers;if(f){this._finalizers=null;try{for(var p=u(f),m=p.next();!m.done;m=p.next()){var h=m.value;try{wn(h)}catch(e){o??=[],e instanceof yn?o=n(n([],a(o)),a(e.errors)):o.push(e)}}}catch(e){r={error:e}}finally{try{m&&!m.done&&(i=p.return)&&i.call(p)}finally{if(r)throw r.error}}}if(o)throw new yn(o)}},e.prototype.add=function(t){if(t&&t!==this){if(this.closed)wn(t);else{if(t instanceof e){if(t.closed||t._hasParent(this))return;t._addParent(this)}(this._finalizers=this._finalizers??[]).push(t)}}},e.prototype._hasParent=function(e){var t=this._parentage;return t===e||Array.isArray(t)&&t.includes(e)},e.prototype._addParent=function(e){var t=this._parentage;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e},e.prototype._removeParent=function(e){var t=this._parentage;t===e?this._parentage=null:Array.isArray(t)&&bn(t,e)},e.prototype.remove=function(t){var n=this._finalizers;n&&bn(n,t),t instanceof e&&t._removeParent(this)},e.EMPTY=(function(){var t=new e;return t.closed=!0,t})(),e}(),Sn=xn.EMPTY;function Cn(e){return e instanceof xn||e&&`closed`in e&&k(e.remove)&&k(e.add)&&k(e.unsubscribe)}function wn(e){k(e)?e():e.unsubscribe()}var A={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},Tn={setTimeout:function(e,t){var r=[...arguments].slice(2),i=Tn.delegate;return i?.setTimeout?i.setTimeout.apply(i,n([e,t],a(r))):setTimeout.apply(void 0,n([e,t],a(r)))},clearTimeout:function(e){return(Tn.delegate?.clearTimeout||clearTimeout)(e)},delegate:void 0};function En(e){Tn.setTimeout(function(){var t=A.onUnhandledError;if(t)t(e);else throw e})}function Dn(){}var On=(function(){return jn(`C`,void 0,void 0)})();function kn(e){return jn(`E`,void 0,e)}function An(e){return jn(`N`,e,void 0)}function jn(e,t,n){return{kind:e,value:t,error:n}}var j=null;function Mn(e){if(A.useDeprecatedSynchronousErrorHandling){var t=!j;if(t&&(j={errorThrown:!1,error:null}),e(),t){var n=j,r=n.errorThrown,i=n.error;if(j=null,r)throw i}}else e()}function Nn(e){A.useDeprecatedSynchronousErrorHandling&&j&&(j.errorThrown=!0,j.error=e)}var Pn=function(e){c(t,e);function t(t){var n=e.call(this)||this;return n.isStopped=!1,t?(n.destination=t,Cn(t)&&t.add(n)):n.destination=Vn,n}return t.create=function(e,t,n){return new M(e,t,n)},t.prototype.next=function(e){this.isStopped?Bn(An(e),this):this._next(e)},t.prototype.error=function(e){this.isStopped?Bn(kn(e),this):(this.isStopped=!0,this._error(e))},t.prototype.complete=function(){this.isStopped?Bn(On,this):(this.isStopped=!0,this._complete())},t.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,e.prototype.unsubscribe.call(this),this.destination=null)},t.prototype._next=function(e){this.destination.next(e)},t.prototype._error=function(e){try{this.destination.error(e)}finally{this.unsubscribe()}},t.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},t}(xn),Fn=Function.prototype.bind;function In(e,t){return Fn.call(e,t)}var Ln=function(){function e(e){this.partialObserver=e}return e.prototype.next=function(e){var t=this.partialObserver;if(t.next)try{t.next(e)}catch(e){Rn(e)}},e.prototype.error=function(e){var t=this.partialObserver;if(t.error)try{t.error(e)}catch(e){Rn(e)}else Rn(e)},e.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(e){Rn(e)}},e}(),M=function(e){c(t,e);function t(t,n,r){var i=e.call(this)||this,a;if(k(t)||!t)a={next:t??void 0,error:n??void 0,complete:r??void 0};else{var o;i&&A.useDeprecatedNextContext?(o=Object.create(t),o.unsubscribe=function(){return i.unsubscribe()},a={next:t.next&&In(t.next,o),error:t.error&&In(t.error,o),complete:t.complete&&In(t.complete,o)}):a=t}return i.destination=new Ln(a),i}return t}(Pn);function Rn(e){A.useDeprecatedSynchronousErrorHandling?Nn(e):En(e)}function zn(e){throw e}function Bn(e,t){var n=A.onStoppedNotification;n&&Tn.setTimeout(function(){return n(e,t)})}var Vn={closed:!0,next:Dn,error:zn,complete:Dn},Hn=(function(){return typeof Symbol==`function`&&Symbol.observable||`@@observable`})();function Un(e){return e}function Wn(){return Gn([...arguments])}function Gn(e){return e.length===0?Un:e.length===1?e[0]:function(t){return e.reduce(function(e,t){return t(e)},t)}}var N=function(){function e(e){e&&(this._subscribe=e)}return e.prototype.lift=function(t){var n=new e;return n.source=this,n.operator=t,n},e.prototype.subscribe=function(e,t,n){var r=this,i=Jn(e)?e:new M(e,t,n);return Mn(function(){var e=r,t=e.operator,n=e.source;i.add(t?t.call(i,n):n?r._subscribe(i):r._trySubscribe(i))}),i},e.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(t){e.error(t)}},e.prototype.forEach=function(e,t){var n=this;return t=Kn(t),new t(function(t,r){var i=new M({next:function(t){try{e(t)}catch(e){r(e),i.unsubscribe()}},error:r,complete:t});n.subscribe(i)})},e.prototype._subscribe=function(e){return this.source?.subscribe(e)},e.prototype[Hn]=function(){return this},e.prototype.pipe=function(){return Gn([...arguments])(this)},e.prototype.toPromise=function(e){var t=this;return e=Kn(e),new e(function(e,n){var r;t.subscribe(function(e){return r=e},function(e){return n(e)},function(){return e(r)})})},e.create=function(t){return new e(t)},e}();function Kn(e){return e??A.Promise??Promise}function qn(e){return e&&k(e.next)&&k(e.error)&&k(e.complete)}function Jn(e){return e&&e instanceof Pn||qn(e)&&Cn(e)}function Yn(e){return k(e?.lift)}function P(e){return function(t){if(Yn(t))return t.lift(function(t){try{return e(t,this)}catch(e){this.error(e)}});throw TypeError(`Unable to lift unknown Observable type`)}}function F(e,t,n,r,i){return new Xn(e,t,n,r,i)}var Xn=function(e){c(t,e);function t(t,n,r,i,a,o){var s=e.call(this,t)||this;return s.onFinalize=a,s.shouldUnsubscribe=o,s._next=n?function(e){try{n(e)}catch(e){t.error(e)}}:e.prototype._next,s._error=i?function(e){try{i(e)}catch(e){t.error(e)}finally{this.unsubscribe()}}:e.prototype._error,s._complete=r?function(){try{r()}catch(e){t.error(e)}finally{this.unsubscribe()}}:e.prototype._complete,s}return t.prototype.unsubscribe=function(){var t;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;e.prototype.unsubscribe.call(this),!n&&((t=this.onFinalize)==null||t.call(this))}},t}(Pn),Zn=vn(function(e){return function(){e(this),this.name=`ObjectUnsubscribedError`,this.message=`object unsubscribed`}}),Qn=function(e){c(t,e);function t(){var t=e.call(this)||this;return t.closed=!1,t.currentObservers=null,t.observers=[],t.isStopped=!1,t.hasError=!1,t.thrownError=null,t}return t.prototype.lift=function(e){var t=new $n(this,this);return t.operator=e,t},t.prototype._throwIfClosed=function(){if(this.closed)throw new Zn},t.prototype.next=function(e){var t=this;Mn(function(){var n,r;if(t._throwIfClosed(),!t.isStopped){t.currentObservers||=Array.from(t.observers);try{for(var i=u(t.currentObservers),a=i.next();!a.done;a=i.next())a.value.next(e)}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}}})},t.prototype.error=function(e){var t=this;Mn(function(){if(t._throwIfClosed(),!t.isStopped){t.hasError=t.isStopped=!0,t.thrownError=e;for(var n=t.observers;n.length;)n.shift().error(e)}})},t.prototype.complete=function(){var e=this;Mn(function(){if(e._throwIfClosed(),!e.isStopped){e.isStopped=!0;for(var t=e.observers;t.length;)t.shift().complete()}})},t.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(t.prototype,"observed",{get:function(){return this.observers?.length>0},enumerable:!1,configurable:!0}),t.prototype._trySubscribe=function(t){return this._throwIfClosed(),e.prototype._trySubscribe.call(this,t)},t.prototype._subscribe=function(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)},t.prototype._innerSubscribe=function(e){var t=this,n=this,r=n.hasError,i=n.isStopped,a=n.observers;return r||i?Sn:(this.currentObservers=null,a.push(e),new xn(function(){t.currentObservers=null,bn(a,e)}))},t.prototype._checkFinalizedStatuses=function(e){var t=this,n=t.hasError,r=t.thrownError,i=t.isStopped;n?e.error(r):i&&e.complete()},t.prototype.asObservable=function(){var e=new N;return e.source=this,e},t.create=function(e,t){return new $n(e,t)},t}(N),$n=function(e){c(t,e);function t(t,n){var r=e.call(this)||this;return r.destination=t,r.source=n,r}return t.prototype.next=function(e){var t,n;(n=(t=this.destination)?.next)==null||n.call(t,e)},t.prototype.error=function(e){var t,n;(n=(t=this.destination)?.error)==null||n.call(t,e)},t.prototype.complete=function(){var e,t;(t=(e=this.destination)?.complete)==null||t.call(e)},t.prototype._subscribe=function(e){return this.source?.subscribe(e)??Sn},t}(Qn),er={now:function(){return(er.delegate||Date).now()},delegate:void 0},tr=function(e){c(t,e);function t(t,n,r){t===void 0&&(t=1/0),n===void 0&&(n=1/0),r===void 0&&(r=er);var i=e.call(this)||this;return i._bufferSize=t,i._windowTime=n,i._timestampProvider=r,i._buffer=[],i._infiniteTimeWindow=!0,i._infiniteTimeWindow=n===1/0,i._bufferSize=Math.max(1,t),i._windowTime=Math.max(1,n),i}return t.prototype.next=function(t){var n=this,r=n.isStopped,i=n._buffer,a=n._infiniteTimeWindow,o=n._timestampProvider,s=n._windowTime;r||(i.push(t),!a&&i.push(o.now()+s)),this._trimBuffer(),e.prototype.next.call(this,t)},t.prototype._subscribe=function(e){this._throwIfClosed(),this._trimBuffer();for(var t=this._innerSubscribe(e),n=this,r=n._infiniteTimeWindow,i=n._buffer.slice(),a=0;a<i.length&&!e.closed;a+=r?1:2)e.next(i[a]);return this._checkFinalizedStatuses(e),t},t.prototype._trimBuffer=function(){var e=this,t=e._bufferSize,n=e._timestampProvider,r=e._buffer,i=e._infiniteTimeWindow,a=(i?1:2)*t;if(t<1/0&&a<r.length&&r.splice(0,r.length-a),!i){for(var o=n.now(),s=0,c=1;c<r.length&&r[c]<=o;c+=2)s=c;s&&r.splice(0,s+1)}},t}(Qn),nr=function(e){c(t,e);function t(t,n){return e.call(this)||this}return t.prototype.schedule=function(e,t){return t===void 0&&(t=0),this},t}(xn),rr={setInterval:function(e,t){var r=[...arguments].slice(2),i=rr.delegate;return i?.setInterval?i.setInterval.apply(i,n([e,t],a(r))):setInterval.apply(void 0,n([e,t],a(r)))},clearInterval:function(e){return(rr.delegate?.clearInterval||clearInterval)(e)},delegate:void 0},ir=function(e){c(t,e);function t(t,n){var r=e.call(this,t,n)||this;return r.scheduler=t,r.work=n,r.pending=!1,r}return t.prototype.schedule=function(e,t){if(t===void 0&&(t=0),this.closed)return this;this.state=e;var n=this.id,r=this.scheduler;return n!=null&&(this.id=this.recycleAsyncId(r,n,t)),this.pending=!0,this.delay=t,this.id=this.id??this.requestAsyncId(r,this.id,t),this},t.prototype.requestAsyncId=function(e,t,n){return n===void 0&&(n=0),rr.setInterval(e.flush.bind(e,this),n)},t.prototype.recycleAsyncId=function(e,t,n){if(n===void 0&&(n=0),n!=null&&this.delay===n&&this.pending===!1)return t;t!=null&&rr.clearInterval(t)},t.prototype.execute=function(e,t){if(this.closed)return Error(`executing a cancelled action`);this.pending=!1;var n=this._execute(e,t);if(n)return n;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},t.prototype._execute=function(e,t){var n=!1,r;try{this.work(e)}catch(e){n=!0,r=e||Error(`Scheduled action threw falsy error`)}if(n)return this.unsubscribe(),r},t.prototype.unsubscribe=function(){if(!this.closed){var t=this,n=t.id,r=t.scheduler,i=r.actions;this.work=this.state=this.scheduler=null,this.pending=!1,bn(i,this),n!=null&&(this.id=this.recycleAsyncId(r,n,null)),this.delay=null,e.prototype.unsubscribe.call(this)}},t}(nr),ar=function(){function e(t,n){n===void 0&&(n=e.now),this.schedulerActionCtor=t,this.now=n}return e.prototype.schedule=function(e,t,n){return t===void 0&&(t=0),new this.schedulerActionCtor(this,e).schedule(n,t)},e.now=er.now,e}(),or=new(function(e){c(t,e);function t(t,n){n===void 0&&(n=ar.now);var r=e.call(this,t,n)||this;return r.actions=[],r._active=!1,r}return t.prototype.flush=function(e){var t=this.actions;if(this._active){t.push(e);return}var n;this._active=!0;do if(n=e.execute(e.state,e.delay))break;while(e=t.shift());if(this._active=!1,n){for(;e=t.shift();)e.unsubscribe();throw n}},t}(ar))(ir),sr=new N(function(e){return e.complete()});function cr(e){return e&&k(e.schedule)}function lr(e){return e[e.length-1]}function ur(e){return k(lr(e))?e.pop():void 0}function dr(e){return cr(lr(e))?e.pop():void 0}function fr(e,t){return typeof lr(e)==`number`?e.pop():t}var pr=(function(e){return e&&typeof e.length==`number`&&typeof e!=`function`});function mr(e){return k(e?.then)}function hr(e){return k(e[Hn])}function gr(e){return Symbol.asyncIterator&&k(e?.[Symbol.asyncIterator])}function _r(e){return TypeError(`You provided `+(typeof e==`object`&&e?`an invalid object`:`'`+e+`'`)+` where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function vr(){return typeof Symbol!=`function`||!Symbol.iterator?`@@iterator`:Symbol.iterator}var yr=vr();function br(e){return k(e?.[yr])}function xr(e){return o(this,arguments,function(){var t,n,i,a;return s(this,function(o){switch(o.label){case 0:t=e.getReader(),o.label=1;case 1:o.trys.push([1,,9,10]),o.label=2;case 2:return[4,r(t.read())];case 3:return n=o.sent(),i=n.value,a=n.done,a?[4,r(void 0)]:[3,5];case 4:return[2,o.sent()];case 5:return[4,r(i)];case 6:return[4,o.sent()];case 7:return o.sent(),[3,2];case 8:return[3,10];case 9:return t.releaseLock(),[7];case 10:return[2]}})})}function Sr(e){return k(e?.getReader)}function I(e){if(e instanceof N)return e;if(e!=null){if(hr(e))return Cr(e);if(pr(e))return wr(e);if(mr(e))return Tr(e);if(gr(e))return Dr(e);if(br(e))return Er(e);if(Sr(e))return Or(e)}throw _r(e)}function Cr(e){return new N(function(t){var n=e[Hn]();if(k(n.subscribe))return n.subscribe(t);throw TypeError(`Provided object does not correctly implement Symbol.observable`)})}function wr(e){return new N(function(t){for(var n=0;n<e.length&&!t.closed;n++)t.next(e[n]);t.complete()})}function Tr(e){return new N(function(t){e.then(function(e){t.closed||(t.next(e),t.complete())},function(e){return t.error(e)}).then(null,En)})}function Er(e){return new N(function(t){var n,r;try{for(var i=u(e),a=i.next();!a.done;a=i.next()){var o=a.value;if(t.next(o),t.closed)return}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}t.complete()})}function Dr(e){return new N(function(t){kr(e,t).catch(function(e){return t.error(e)})})}function Or(e){return Dr(xr(e))}function kr(e,t){var n,r,a,o;return i(this,void 0,void 0,function(){var i,c;return s(this,function(s){switch(s.label){case 0:s.trys.push([0,5,6,11]),n=l(e),s.label=1;case 1:return[4,n.next()];case 2:if(r=s.sent(),r.done)return[3,4];if(i=r.value,t.next(i),t.closed)return[2];s.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return c=s.sent(),a={error:c},[3,11];case 6:return s.trys.push([6,,9,10]),r&&!r.done&&(o=n.return)?[4,o.call(n)]:[3,8];case 7:s.sent(),s.label=8;case 8:return[3,10];case 9:if(a)throw a.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function L(e,t,n,r,i){r===void 0&&(r=0),i===void 0&&(i=!1);var a=t.schedule(function(){n(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(a),!i)return a}function Ar(e,t){return t===void 0&&(t=0),P(function(n,r){n.subscribe(F(r,function(n){return L(r,e,function(){return r.next(n)},t)},function(){return L(r,e,function(){return r.complete()},t)},function(n){return L(r,e,function(){return r.error(n)},t)}))})}function jr(e,t){return t===void 0&&(t=0),P(function(n,r){r.add(e.schedule(function(){return n.subscribe(r)},t))})}function Mr(e,t){return I(e).pipe(jr(t),Ar(t))}function Nr(e,t){return I(e).pipe(jr(t),Ar(t))}function Pr(e,t){return new N(function(n){var r=0;return t.schedule(function(){r===e.length?n.complete():(n.next(e[r++]),n.closed||this.schedule())})})}function Fr(e,t){return new N(function(n){var r;return L(n,t,function(){r=e[yr](),L(n,t,function(){var e,t,i;try{e=r.next(),t=e.value,i=e.done}catch(e){n.error(e);return}i?n.complete():n.next(t)},0,!0)}),function(){return k(r?.return)&&r.return()}})}function Ir(e,t){if(!e)throw Error(`Iterable cannot be null`);return new N(function(n){L(n,t,function(){var r=e[Symbol.asyncIterator]();L(n,t,function(){r.next().then(function(e){e.done?n.complete():n.next(e.value)})},0,!0)})})}function Lr(e,t){return Ir(xr(e),t)}function Rr(e,t){if(e!=null){if(hr(e))return Mr(e,t);if(pr(e))return Pr(e,t);if(mr(e))return Nr(e,t);if(gr(e))return Ir(e,t);if(br(e))return Fr(e,t);if(Sr(e))return Lr(e,t)}throw _r(e)}function zr(e,t){return t?Rr(e,t):I(e)}function R(){var e=[...arguments];return zr(e,dr(e))}function Br(e,t){var n=k(e)?e:function(){return e},r=function(e){return e.error(n())};return new N(t?function(e){return t.schedule(r,0,e)}:r)}function Vr(e){return!!e&&(e instanceof N||k(e.lift)&&k(e.subscribe))}var Hr=vn(function(e){return function(){e(this),this.name=`EmptyError`,this.message=`no elements in sequence`}});function z(e,t){var n=typeof t==`object`;return new Promise(function(r,i){var a=!1,o;e.subscribe({next:function(e){o=e,a=!0},error:i,complete:function(){a?r(o):n?r(t.defaultValue):i(new Hr)}})})}function Ur(e,t){var n=typeof t==`object`;return new Promise(function(r,i){var a=new M({next:function(e){r(e),a.unsubscribe()},error:i,complete:function(){n?r(t.defaultValue):i(new Hr)}});e.subscribe(a)})}function Wr(e){return e instanceof Date&&!isNaN(e)}function B(e,t){return P(function(n,r){var i=0;n.subscribe(F(r,function(n){r.next(e.call(t,n,i++))}))})}var Gr=Array.isArray;function Kr(e,t){return Gr(t)?e.apply(void 0,n([],a(t))):e(t)}function qr(e){return B(function(t){return Kr(e,t)})}function Jr(e,t,n){return n===void 0&&(n=Un),function(r){Yr(t,function(){for(var i=e.length,a=Array(i),o=i,s=i,c=function(i){Yr(t,function(){var c=zr(e[i],t),l=!1;c.subscribe(F(r,function(e){a[i]=e,l||(l=!0,s--),s||r.next(n(a.slice()))},function(){--o||r.complete()}))},r)},l=0;l<i;l++)c(l)},r)}}function Yr(e,t,n){e?L(n,e,t):t()}function Xr(e,t,n,r,i,a,o,s){var c=[],l=0,u=0,d=!1,f=function(){d&&!c.length&&!l&&t.complete()},p=function(e){return l<r?m(e):c.push(e)},m=function(e){a&&t.next(e),l++;var s=!1;I(n(e,u++)).subscribe(F(t,function(e){i?.(e),a?p(e):t.next(e)},function(){s=!0},void 0,function(){if(s)try{l--;for(var e=function(){var e=c.shift();o?L(t,o,function(){return m(e)}):m(e)};c.length&&l<r;)e();f()}catch(e){t.error(e)}}))};return e.subscribe(F(t,p,function(){d=!0,f()})),function(){s?.()}}function V(e,t,n){return n===void 0&&(n=1/0),k(t)?V(function(n,r){return B(function(e,i){return t(n,e,r,i)})(I(e(n,r)))},n):(typeof t==`number`&&(n=t),P(function(t,r){return Xr(t,r,e,n)}))}function Zr(e){return e===void 0&&(e=1/0),V(Un,e)}function Qr(){return Zr(1)}function $r(){var e=[...arguments];return Qr()(zr(e,dr(e)))}function ei(e){return new N(function(t){I(e()).subscribe(t)})}function ti(e,t,n){e===void 0&&(e=0),n===void 0&&(n=or);var r=-1;return t!=null&&(cr(t)?n=t:r=t),new N(function(t){var i=Wr(e)?+e-n.now():e;i<0&&(i=0);var a=0;return n.schedule(function(){t.closed||(t.next(a++),0<=r?this.schedule(void 0,r):t.complete())},i)})}function ni(){var e=[...arguments],t=dr(e),n=fr(e,1/0),r=e;return r.length?r.length===1?I(r[0]):Zr(n)(zr(r,t)):sr}var ri=Array.isArray;function ii(e){return e.length===1&&ri(e[0])?e[0]:e}function H(e,t){return P(function(n,r){var i=0;n.subscribe(F(r,function(n){return e.call(t,n,i++)&&r.next(n)}))})}function ai(e){return P(function(t,n){var r=null,i=!1,a;r=t.subscribe(F(n,void 0,void 0,function(o){a=I(e(o,ai(e)(t))),r?(r.unsubscribe(),r=null,a.subscribe(n)):i=!0})),i&&(r.unsubscribe(),r=null,a.subscribe(n))})}function oi(){var e=[...arguments],t=ur(e);return t?Wn(oi.apply(void 0,n([],a(e))),qr(t)):P(function(t,r){Jr(n([t],a(ii(e))))(r)})}function si(){var e=[...arguments];return oi.apply(void 0,n([],a(e)))}function ci(e){return P(function(t,n){try{t.subscribe(n)}finally{n.add(e)}})}function li(e){e===void 0&&(e={});var t=e.connector,n=t===void 0?function(){return new Qn}:t,r=e.resetOnError,i=r===void 0||r,a=e.resetOnComplete,o=a===void 0||a,s=e.resetOnRefCountZero,c=s===void 0||s;return function(e){var t,r,a,s=0,l=!1,u=!1,d=function(){r?.unsubscribe(),r=void 0},f=function(){d(),t=a=void 0,l=u=!1},p=function(){var e=t;f(),e?.unsubscribe()};return P(function(e,m){s++,!u&&!l&&d();var h=a??=n();m.add(function(){s--,s===0&&!u&&!l&&(r=ui(p,c))}),h.subscribe(m),!t&&s>0&&(t=new M({next:function(e){return h.next(e)},error:function(e){u=!0,d(),r=ui(f,i,e),h.error(e)},complete:function(){l=!0,d(),r=ui(f,o),h.complete()}}),I(e).subscribe(t))})(e)}}function ui(e,t){var r=[...arguments].slice(2);if(t===!0){e();return}if(t!==!1){var i=new M({next:function(){i.unsubscribe(),e()}});return I(t.apply(void 0,n([],a(r)))).subscribe(i)}}function di(e,t,n){var r,i,a,o,s=!1;return e&&typeof e==`object`?(r=e.bufferSize,o=r===void 0?1/0:r,i=e.windowTime,t=i===void 0?1/0:i,a=e.refCount,s=a!==void 0&&a,n=e.scheduler):o=e??1/0,li({connector:function(){return new tr(o,t,n)},resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:s})}function fi(e,t,n){var r=k(e)||t||n?{next:e,error:t,complete:n}:e;return r?P(function(e,t){var n;(n=r.subscribe)==null||n.call(r);var i=!0;e.subscribe(F(t,function(e){var n;(n=r.next)==null||n.call(r,e),t.next(e)},function(){var e;i=!1,(e=r.complete)==null||e.call(r),t.complete()},function(e){var n;i=!1,(n=r.error)==null||n.call(r,e),t.error(e)},function(){var e,t;i&&((e=r.unsubscribe)==null||e.call(r)),(t=r.finalize)==null||t.call(r)}))}):Un}var pi=`drafts`,mi=`versions`,U=`.`,hi=`${pi}${U}`,gi=`${mi}${U}`;function _i(e){return e.startsWith(hi)}function vi(e){return e.startsWith(gi)}function yi(e){return vi(e)?hi+Si(e):_i(e)?e:hi+e}function bi(e,t){if(t===`drafts`||t===`published`)throw Error(`Version can not be "published" or "drafts"`);return`${gi}${t}${U}${Si(e)}`}function xi(e){if(!vi(e))return;let[t,n]=e.split(U);return n}function Si(e){return vi(e)?e.split(U).slice(2).join(U):_i(e)?e.slice(hi.length):e}var Ci=e=>crypto.getRandomValues(new Uint8Array(e)),wi=(e,t,n)=>{let r=(2<<Math.log(e.length-1)/Math.LN2)-1,i=-~(1.6*r*t/e.length);return(a=t)=>{if(a<=0)return``;let o=``;for(;;){let t=n(i),s=i|0;for(;s--;)if(o+=e[t[s]&r]||``,o.length===a)return o}}},Ti=(e,t=21)=>wi(e,t,Ci),Ei=/\r\n|[\n\r\u2028\u2029]/;function Di(e,t,n){let r=e.split(Ei),{start:i,end:a,markerLines:o}=Oi({start:ki(t.start,r),end:t.end?ki(t.end,r):void 0},r),s=`${a}`.length;return e.split(Ei,a).slice(i,a).map((e,t)=>{let r=i+1+t,a=` ${` ${r}`.slice(-s)} |`,c=o[r],l=!o[r+1];if(!c)return` ${a}${e.length>0?` ${e}`:``}`;let u=``;if(Array.isArray(c)){let t=e.slice(0,Math.max(c[0]-1,0)).replace(/[^\t]/g,` `),r=c[1]||1;u=[`
 `,a.replace(/\d/g,` `),` `,t,`^`.repeat(r)].join(``),l&&n&&(u+=` `+n)}return[`>`,a,e.length>0?` ${e}`:``,u].join(``)}).join(`
`)}function Oi(e,t){let n={...e.start},r={...n,...e.end},i=n.line??-1,a=n.column??0,o=r.line,s=r.column,c=Math.max(i-3,0),l=Math.min(t.length,o+3);i===-1&&(c=0),o===-1&&(l=t.length);let u=o-i,d={};if(u)for(let e=0;e<=u;e++){let n=e+i;d[n]=a?e===0?[a,t[n-1].length-a+1]:e===u?[0,s]:[0,t[n-e].length]:!0}else d[i]=a===s?!a||[a,0]:[a,s-a];return{start:c,end:l,markerLines:d}}function ki(e,t){let n=0;for(let r=0;r<t.length;r++){let i=t[r].length+1;if(n+i>e)return{line:r+1,column:e-n};n+=i}return{line:t.length,column:t[t.length-1]?.length??0}}var Ai=5,ji=class extends Error{response;statusCode=400;responseBody;details;constructor(e,t){let n=Ni(e,t);super(n.message),Object.assign(this,n)}},Mi=class extends Error{response;statusCode=500;responseBody;details;constructor(e){let t=Ni(e);super(t.message),Object.assign(this,t)}};function Ni(e,t){let n=e.body,r={response:e,statusCode:e.statusCode,responseBody:zi(n,e),message:``,details:void 0};if(!re(n))return r.message=Ri(e,n),r;let i=n.error;if(typeof i==`string`&&typeof n.message==`string`)return r.message=`${i} - ${n.message}`,r;if(typeof i!=`object`||!i)return r.message=typeof i==`string`?i:typeof n.message==`string`?n.message:Ri(e,n),r;if(Pi(i)||Fi(i)){let e=i.items||[],t=e.slice(0,Ai).map(e=>e.error?.description).filter(Boolean),a=t.length?`:
- ${t.join(`
- `)}`:``;return e.length>Ai&&(a+=`
...and ${e.length-Ai} more`),r.message=`${i.description}${a}`,r.details=n.error,r}if(Ii(i)){let e=t?.options?.query?.tag;return r.message=Li(i,e),r.details=n.error,r}return`description`in i&&typeof i.description==`string`?(r.message=i.description,r.details=i,r):(r.message=Ri(e,n),r)}function Pi(e){return`type`in e&&e.type===`mutationError`&&`description`in e&&typeof e.description==`string`}function Fi(e){return`type`in e&&e.type===`actionError`&&`description`in e&&typeof e.description==`string`}function Ii(e){return re(e)&&e.type===`queryParseError`&&typeof e.query==`string`&&typeof e.start==`number`&&typeof e.end==`number`}function Li(e,t){let{query:n,start:r,end:i,description:a}=e;if(!n||typeof r>`u`)return`GROQ query parse error: ${a}`;let o=t?`

Tag: ${t}`:``;return`GROQ query parse error:
${Di(n,{start:r,end:i},a)}${o}`}function Ri(e,t){let n=typeof t==`string`?` (${Bi(t,100)})`:``,r=e.statusMessage?` ${e.statusMessage}`:``;return`${e.method}-request to ${e.url} resulted in HTTP ${e.statusCode}${r}${n}`}function zi(e,t){return(t.headers[`content-type`]||``).toLowerCase().indexOf(`application/json`)===-1?e:JSON.stringify(e,null,2)}function Bi(e,t){return e.length>t?`${e.slice(0,t)}\u2026`:e}var Vi=class extends Error{projectId;addOriginUrl;constructor({projectId:e}){super(`CorsOriginError`),this.name=`CorsOriginError`,this.projectId=e;let t=new URL(`https://sanity.io/manage/project/${e}/api`);if(typeof location<`u`){let{origin:e}=location;t.searchParams.set(`cors`,`add`),t.searchParams.set(`origin`,e),this.addOriginUrl=t,this.message=`The current origin is not allowed to connect to the Live Content API. Add it here: ${t}`}else this.message=`The current origin is not allowed to connect to the Live Content API. Change your configuration here: ${t}`}},Hi={onResponse:(e,t)=>{if(e.statusCode>=500)throw new Mi(e);if(e.statusCode>=400)throw new ji(e,t);return e}};function Ui(e={}){let t={},n=t=>e.ignoreWarnings!==void 0&&(Array.isArray(e.ignoreWarnings)?e.ignoreWarnings:[e.ignoreWarnings]).some(e=>typeof e==`string`?t.includes(e):e instanceof RegExp&&e.test(t));return{onResponse:e=>{let r=e.headers[`x-sanity-warning`],i=Array.isArray(r)?r:[r];for(let e of i)!e||t[e]||n(e)||(t[e]=!0,console.warn(e));return e}}}function Wi(e,t={}){return Yt([gn({shouldRetry:Gi}),...e,Ui(t),cn(),ln(),pn(),Hi,fn({implementation:N})])}function Gi(e,t,n){if(n.maxRetries===0)return!1;let r=n.method===`GET`||n.method===`HEAD`,i=(n.uri||n.url).startsWith(`/data/query`),a=e.response&&(e.response.statusCode===429||e.response.statusCode===502||e.response.statusCode===503);return(r||i)&&a?!0:gn.shouldRetry(e,t,n)}var Ki=`https://www.sanity.io/help/`;function qi(e){return Ki+e}var Ji=[`image`,`file`],Yi=[`before`,`after`,`replace`],W=e=>{if(!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(e))throw Error(`Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters`)},Xi=e=>{if(!/^[-a-z0-9]+$/i.test(e))throw Error("`projectId` can only contain only a-z, 0-9 and dashes")},Zi=e=>{if(Ji.indexOf(e)===-1)throw Error(`Invalid asset type: ${e}. Must be one of ${Ji.join(`, `)}`)},Qi=(e,t)=>{if(typeof t!=`object`||!t||Array.isArray(t))throw Error(`${e}() takes an object of properties`)},$i=(e,t)=>{if(typeof t!=`string`||!/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(t)||t.includes(`..`))throw Error(`${e}(): "${t}" is not a valid document ID`)},G=(e,t)=>{if(!t._id)throw Error(`${e}() requires that the document contains an ID ("_id" property)`);$i(e,t._id)},ea=(e,t)=>{if(typeof t!=`string`)throw Error(`\`${e}()\`: \`${t}\` is not a valid document type`)},ta=(e,t)=>{if(!t._type)throw Error(`\`${e}()\` requires that the document contains a type (\`_type\` property)`);ea(e,t._type)},na=(e,t)=>{if(t._id&&t._id!==e)throw Error(`The provided document ID (\`${t._id}\`) does not match the generated version ID (\`${e}\`)`)},ra=(e,t,n)=>{let r=`insert(at, selector, items)`;if(Yi.indexOf(e)===-1){let e=Yi.map(e=>`"${e}"`).join(`, `);throw Error(`${r} takes an "at"-argument which is one of: ${e}`)}if(typeof t!=`string`)throw Error(`${r} takes a "selector"-argument which must be a string`);if(!Array.isArray(n))throw Error(`${r} takes an "items"-argument which must be an array`)},K=e=>{if(e.dataset)return e.dataset;let t=e.resource;if(t&&t.type===`dataset`){let e=t.id.split(`.`);if(e.length!==2)throw Error(`Dataset resource ID must be in the format "project.dataset"`);return e[1]}throw Error("`dataset` must be provided to perform queries")},ia=e=>{if(typeof e!=`string`||!/^[a-z0-9._-]{1,75}$/i.test(e))throw Error(`Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long.`);return e},aa=e=>{let t=e.resource;if(!t)throw Error("`resource` must be provided to perform resource queries");let{type:n,id:r}=t;switch(n){case`dataset`:if(r.split(`.`).length!==2)throw Error(`Dataset resource ID must be in the format "project.dataset"`);return;case`dashboard`:case`media-library`:case`canvas`:return;default:throw Error(`Unsupported resource type: ${n.toString()}`)}},q=(e,t)=>{if(t.resource)throw Error(`\`${e}\` does not support resource-based operations`)};function oa(e){let t=!1,n;return(...r)=>(t||=(n=e(...r),!0),n)}var J=e=>oa((...t)=>console.warn(e.join(` `),...t)),sa=J(["Because you set `withCredentials` to true, we will override your `useCdn`",`setting to be false since (cookie-based) credentials are never set on the CDN`]),ca=J(["Since you haven't set a value for `useCdn`, we will deliver content using our",`global, edge-cached API-CDN. If you wish to have content delivered faster, set`,"`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."]),la=J(["The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.","The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."]),ua=J(["The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"]),da=J([`You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.`,`See ${qi(`js-client-browser-token`)} for more information and how to hide this warning.`]),fa=J(["You have configured Sanity client to use a token, but also provided `withCredentials: true`.","This is no longer supported - only token will be used - remove `withCredentials: true`."]),pa=J([`Using the Sanity client without specifying an API version is deprecated.`,`See ${qi(`js-client-api-version`)}`]);J(["The default export of @sanity/client has been deprecated. Use the named export `createClient` instead."]);var ma=J(["You have called `createVersion()` with a defined `document`. The recommended approach is to provide a `baseId` and `releaseId` instead."]),ha=J(["The `~experimental_resource` configuration property has been renamed to `resource`.","Please update your client configuration to use `resource` instead. Support for `~experimental_resource` will be removed in a future version."]),ga=`apicdn.sanity.io`,_a={apiHost:`https://api.sanity.io`,apiVersion:`1`,useProjectHostname:!0,stega:{enabled:!1}},va=[`localhost`,`127.0.0.1`,`0.0.0.0`],ya=e=>va.indexOf(e)!==-1;function ba(e){if(e===`1`||e===`X`)return;let t=new Date(e);if(!(/^\d{4}-\d{2}-\d{2}$/.test(e)&&t instanceof Date&&t.getTime()>0))throw Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`")}function xa(e){if(Array.isArray(e)&&e.length>1&&e.includes(`raw`))throw TypeError(`Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives`)}var Sa=(e,t)=>{let n={...t,...e,stega:{...typeof t.stega==`boolean`?{enabled:t.stega}:t.stega||_a.stega,...typeof e.stega==`boolean`?{enabled:e.stega}:e.stega||{}}};n.apiVersion||pa();let r={..._a,...n};r[`~experimental_resource`]&&!r.resource&&(ha(),r.resource=r[`~experimental_resource`]);let i=r.resource,a=r.useProjectHostname&&!i;if(typeof Promise>`u`){let e=qi(`js-client-promise-polyfill`);throw Error(`No native Promise-implementation found, polyfill needed - see ${e}`)}if(a&&!r.projectId)throw Error("Configuration must contain `projectId`");if(i&&aa(r),typeof r.perspective<`u`&&xa(r.perspective),`encodeSourceMap`in r)throw Error(`It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?`);if(`encodeSourceMapAtPath`in r)throw Error(`It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?`);if(typeof r.stega.enabled!=`boolean`)throw Error(`stega.enabled must be a boolean, received ${r.stega.enabled}`);if(r.stega.enabled&&r.stega.studioUrl===void 0)throw Error(`stega.studioUrl must be defined when stega.enabled is true`);if(r.stega.enabled&&typeof r.stega.studioUrl!=`string`&&typeof r.stega.studioUrl!=`function`)throw Error(`stega.studioUrl must be a string or a function, received ${r.stega.studioUrl}`);let o=typeof window<`u`&&window.location&&window.location.hostname,s=o&&ya(window.location.hostname),c=!!r.token;r.withCredentials&&c&&(fa(),r.withCredentials=!1),o&&s&&c&&r.ignoreBrowserTokenWarning!==!0?da():typeof r.useCdn>`u`&&ca(),a&&Xi(r.projectId),r.dataset&&W(r.dataset),`requestTagPrefix`in r&&(r.requestTagPrefix=r.requestTagPrefix?ia(r.requestTagPrefix).replace(/\.+$/,``):void 0),r.apiVersion=`${r.apiVersion}`.replace(/^v/,``),r.isDefaultApi=r.apiHost===_a.apiHost,r.useCdn===!0&&r.withCredentials&&sa(),r.useCdn=r.useCdn!==!1&&!r.withCredentials,ba(r.apiVersion);let l=r.apiHost.split(`://`,2),u=l[0],d=l[1],f=r.isDefaultApi?ga:d;return a?(r.url=`${u}://${r.projectId}.${d}/v${r.apiVersion}`,r.cdnUrl=`${u}://${r.projectId}.${f}/v${r.apiVersion}`):(r.url=`${r.apiHost}/v${r.apiVersion}`,r.cdnUrl=r.url),r},Ca=class extends Error{name=`ConnectionFailedError`},wa=class extends Error{name=`DisconnectError`;reason;constructor(e,t,n={}){super(e,n),this.reason=t}},Ta=class extends Error{name=`ChannelError`;data;constructor(e,t){super(e),this.data=t}},Ea=class extends Error{name=`MessageError`;data;constructor(e,t,n={}){super(e,n),this.data=t}},Da=class extends Error{name=`MessageParseError`},Oa=[`channelError`,`disconnect`];function ka(e,t){return ei(()=>{let t=e();return Vr(t)?t:R(t)}).pipe(V(e=>Aa(e,t)))}function Aa(e,t){return new N(n=>{let r=t.includes(`open`),i=t.includes(`reconnect`);function a(t){if(`data`in t){let[e,r]=ja(t);n.error(e?new Da(`Unable to parse EventSource error message`,{cause:r}):new Ea((r?.data).message,r));return}e.readyState===e.CLOSED?n.error(new Ca(`EventSource connection failed`)):i&&n.next({type:`reconnect`})}function o(){n.next({type:`open`})}function s(t){let[r,i]=ja(t);if(r){n.error(new Da(`Unable to parse EventSource message`,{cause:r}));return}if(t.type===`channelError`){let t=new URL(e.url).searchParams.get(`tag`);n.error(new Ta(Ma(i?.data,t),i.data));return}if(t.type===`disconnect`){n.error(new wa(`Server disconnected client: ${i.data?.reason||`unknown error`}`));return}n.next({type:t.type,id:t.lastEventId,...i.data?{data:i.data}:{}})}e.addEventListener(`error`,a),r&&e.addEventListener(`open`,o);let c=[...new Set([...Oa,...t])].filter(e=>e!==`error`&&e!==`open`&&e!==`reconnect`);return c.forEach(t=>e.addEventListener(t,s)),()=>{e.removeEventListener(`error`,a),r&&e.removeEventListener(`open`,o),c.forEach(t=>e.removeEventListener(t,s)),e.close()}})}function ja(e){try{let t=typeof e.data==`string`&&JSON.parse(e.data);return[null,{type:e.type,id:e.lastEventId,...Na(t)?{}:{data:t}}]}catch(e){return[e,null]}}function Ma(e,t){let n=e.error;return n?Ii(n)?Li(n,t):n.description?n.description:typeof n==`string`?n:JSON.stringify(n,null,2):e.message||`Unknown listener error`}function Na(e){for(let t in e)return!1;return!0}function Pa(e){if(typeof e==`string`)return{id:e};if(Array.isArray(e))return{query:`*[_id in $ids]`,params:{ids:e}};if(typeof e==`object`&&e&&`query`in e&&typeof e.query==`string`)return`params`in e&&typeof e.params==`object`&&e.params!==null?{query:e.query,params:e.params}:{query:e.query};let t=[`* Document ID (<docId>)`,`* Array of document IDs`,"* Object containing `query`"].join(`
`);throw Error(`Unknown selection - must be one of:

${t}`)}var Fa=class{selection;operations;constructor(e,t={}){this.selection=e,this.operations=t}set(e){return this._assign(`set`,e)}setIfMissing(e){return this._assign(`setIfMissing`,e)}diffMatchPatch(e){return Qi(`diffMatchPatch`,e),this._assign(`diffMatchPatch`,e)}unset(e){if(!Array.isArray(e))throw Error(`unset(attrs) takes an array of attributes to unset, non-array given`);return this.operations=Object.assign({},this.operations,{unset:e}),this}inc(e){return this._assign(`inc`,e)}dec(e){return this._assign(`dec`,e)}insert(e,t,n){return ra(e,t,n),this._assign(`insert`,{[e]:t,items:n})}append(e,t){return this.insert(`after`,`${e}[-1]`,t)}prepend(e,t){return this.insert(`before`,`${e}[0]`,t)}splice(e,t,n,r){let i=typeof n>`u`||n===-1,a=t<0?t-1:t,o=i?-1:Math.max(0,t+n),s=`${e}[${a}:${a<0&&o>=0?``:o}]`;return this.insert(`replace`,s,r||[])}ifRevisionId(e){return this.operations.ifRevisionID=e,this}serialize(){return{...Pa(this.selection),...this.operations}}toJSON(){return this.serialize()}reset(){return this.operations={},this}_assign(e,t,n=!0){return Qi(e,t),this.operations=Object.assign({},this.operations,{[e]:Object.assign({},n&&this.operations[e]||{},t)}),this}_set(e,t){return this._assign(e,t,!1)}},Ia=class e extends Fa{#e;constructor(e,t,n){super(e,t),this.#e=n}clone(){return new e(this.selection,{...this.operations},this.#e)}commit(e){if(!this.#e)throw Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");let t=typeof this.selection==`string`,n=Object.assign({returnFirst:t,returnDocuments:!0},e);return this.#e.mutate({patch:this.serialize()},n)}},Y=class e extends Fa{#e;constructor(e,t,n){super(e,t),this.#e=n}clone(){return new e(this.selection,{...this.operations},this.#e)}commit(e){if(!this.#e)throw Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");let t=typeof this.selection==`string`,n=Object.assign({returnFirst:t,returnDocuments:!0},e);return this.#e.mutate({patch:this.serialize()},n)}},La={returnDocuments:!1},Ra=class{operations;trxId;constructor(e=[],t){this.operations=e,this.trxId=t}create(e){return Qi(`create`,e),this._add({create:e})}createIfNotExists(e){let t=`createIfNotExists`;return Qi(t,e),G(t,e),this._add({[t]:e})}createOrReplace(e){let t=`createOrReplace`;return Qi(t,e),G(t,e),this._add({[t]:e})}delete(e){return $i(`delete`,e),this._add({delete:{id:e}})}transactionId(e){return e?(this.trxId=e,this):this.trxId}serialize(){return[...this.operations]}toJSON(){return this.serialize()}reset(){return this.operations=[],this}_add(e){return this.operations.push(e),this}},za=class e extends Ra{#e;constructor(e,t,n){super(e,n),this.#e=t}clone(){return new e([...this.operations],this.#e,this.trxId)}commit(e){if(!this.#e)throw Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");return this.#e.mutate(this.serialize(),Object.assign({transactionId:this.trxId},La,e||{}))}patch(e,t){let n=typeof t==`function`,r=typeof e!=`string`&&e instanceof Y,i=typeof e==`object`&&(`query`in e||`id`in e);if(r)return this._add({patch:e.serialize()});if(n){let n=t(new Y(e,{},this.#e));if(!(n instanceof Y))throw Error("function passed to `patch()` must return the patch");return this._add({patch:n.serialize()})}if(i){let n=new Y(e,t||{},this.#e);return this._add({patch:n.serialize()})}return this._add({patch:{id:e,...t}})}},Ba=class e extends Ra{#e;constructor(e,t,n){super(e,n),this.#e=t}clone(){return new e([...this.operations],this.#e,this.trxId)}commit(e){if(!this.#e)throw Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");return this.#e.mutate(this.serialize(),Object.assign({transactionId:this.trxId},La,e||{}))}patch(e,t){let n=typeof t==`function`;if(typeof e!=`string`&&e instanceof Ia)return this._add({patch:e.serialize()});if(n){let n=t(new Ia(e,{},this.#e));if(!(n instanceof Ia))throw Error("function passed to `patch()` must return the patch");return this._add({patch:n.serialize()})}return this._add({patch:{id:e,...t}})}},Va=`X-Sanity-Project-ID`;function Ha(e,t={}){let n={};e.headers&&Object.assign(n,e.headers);let r=t.token||e.token;r&&(n.Authorization=`Bearer ${r}`),!t.useGlobalApi&&!e.useProjectHostname&&e.projectId&&(n[Va]=e.projectId);let i=!!(typeof t.withCredentials>`u`?e.withCredentials:t.withCredentials),a=typeof t.timeout>`u`?e.timeout:t.timeout;return Object.assign({},t,{headers:Object.assign({},n,t.headers||{}),timeout:typeof a>`u`?3e5:a,proxy:t.proxy||e.proxy,json:!0,withCredentials:i,fetch:typeof t.fetch==`object`&&typeof e.fetch==`object`?{...e.fetch,...t.fetch}:t.fetch||e.fetch})}var Ua=({query:e,params:t={},options:n={}})=>{let r=new URLSearchParams,{tag:i,includeMutations:a,returnQuery:o,...s}=n;i&&r.append(`tag`,i),r.append(`query`,e);for(let[e,n]of Object.entries(t))n!==void 0&&r.append(`$${e}`,JSON.stringify(n));for(let[e,t]of Object.entries(s))t&&r.append(e,`${t}`);return o===!1&&r.append(`returnQuery`,`false`),a===!1&&r.append(`includeMutations`,`false`),`?${r}`},Wa=(e,t)=>e===!1?void 0:typeof e>`u`?t:e,Ga=(e={})=>({dryRun:e.dryRun,returnIds:!0,returnDocuments:Wa(e.returnDocuments,!0),visibility:e.visibility||`sync`,autoGenerateArrayKeys:e.autoGenerateArrayKeys,skipCrossDatasetReferenceValidation:e.skipCrossDatasetReferenceValidation}),Ka=e=>e.type===`response`,qa=e=>e.body,Ja=(e,t)=>e.reduce((e,n)=>(e[t(n)]=n,e),Object.create(null)),Ya=11264;function Xa(e,t,n,r,i={},a={}){let o=`stega`in a?{...n||{},...typeof a.stega==`boolean`?{enabled:a.stega}:a.stega||{}}:n,s=o.enabled?ne(i):i,c=a.filterResponse===!1?e=>e:e=>e.result,{cache:l,next:u,...d}={useAbortSignal:typeof a.signal<`u`,resultSourceMap:o.enabled?`withKeyArraySelector`:a.resultSourceMap,...a,returnQuery:a.filterResponse===!1&&a.returnQuery!==!1},f=typeof l<`u`||typeof u<`u`?{...d,fetch:{cache:l,next:u}}:d,m=Z(e,t,`query`,{query:r,params:s},f);return o.enabled?m.pipe(si(zr(p(()=>import(`./stegaEncodeSourceMap-DmQHEk6q.js`).then(function(e){return e.stegaEncodeSourceMap$1}),__vite__mapDeps([0,1]),import.meta.url).then(({stegaEncodeSourceMap:e})=>e))),B(([e,t])=>{let n=t(e.result,e.resultSourceMap,o);return c({...e,result:n})})):m.pipe(B(c))}function Za(e,t,n,r={}){return vo(e,t,{uri:$(e,`doc`,(()=>{if(!r.releaseId)return n;let e=xi(n);if(!e){if(_i(n))throw Error(`The document ID (\`${n}\`) is a draft, but \`options.releaseId\` is set as \`${r.releaseId}\``);return bi(n,r.releaseId)}if(e!==r.releaseId)throw Error(`The document ID (\`${n}\`) is already a version of \`${e}\` release, but this does not match the provided \`options.releaseId\` (\`${r.releaseId}\`)`);return n})()),json:!0,tag:r.tag,signal:r.signal,query:r.includeAllVersions===void 0?void 0:{includeAllVersions:r.includeAllVersions}}).pipe(H(Ka),B(e=>{let t=e.body.documents;return t?r.includeAllVersions?t:t[0]:r.includeAllVersions?[]:void 0}))}function Qa(e,t,n,r={}){return vo(e,t,{uri:$(e,`doc`,n.join(`,`)),json:!0,tag:r.tag,signal:r.signal}).pipe(H(Ka),B(e=>{let t=Ja(e.body.documents||[],e=>e._id);return n.map(e=>t[e]||null)}))}function $a(e,t,n,r={}){return Z(e,t,`query`,{query:`*[sanity::partOfRelease($releaseId)]`,params:{releaseId:n}},r)}function eo(e,t,n,r){return G(`createIfNotExists`,n),lo(e,t,n,`createIfNotExists`,r)}function to(e,t,n,r){return G(`createOrReplace`,n),lo(e,t,n,`createOrReplace`,r)}function no(e,t,n,r,i){return G(`createVersion`,n),ta(`createVersion`,n),ma(),X(e,t,{actionType:`sanity.action.document.version.create`,publishedId:r,document:n},i)}function ro(e,t,n,r,i,a,o){if(!r)throw Error("`createVersion()` requires `baseId` when no `document` is provided");if(!n)throw Error("`createVersion()` requires `publishedId` when `baseId` is provided");return $i(`createVersion`,r),$i(`createVersion`,n),X(e,t,{actionType:`sanity.action.document.version.create`,publishedId:n,baseId:r,versionId:i?bi(n,i):yi(n),ifBaseRevisionId:a},o)}function io(e,t,n,r){return Z(e,t,`mutate`,{mutations:[{delete:Pa(n)}]},r)}function ao(e,t,n,r=!1,i){return X(e,t,{actionType:`sanity.action.document.version.discard`,versionId:n,purge:r},i)}function oo(e,t,n,r){return G(`replaceVersion`,n),ta(`replaceVersion`,n),X(e,t,{actionType:`sanity.action.document.version.replace`,document:n},r)}function so(e,t,n,r,i){return X(e,t,{actionType:`sanity.action.document.version.unpublish`,versionId:n,publishedId:r},i)}function co(e,t,n,r){let i;return i=n instanceof Y||n instanceof Ia?{patch:n.serialize()}:n instanceof za||n instanceof Ba?n.serialize():n,Z(e,t,`mutate`,{mutations:Array.isArray(i)?i:[i],transactionId:r&&r.transactionId||void 0},r)}function X(e,t,n,r){return Z(e,t,`actions`,{actions:Array.isArray(n)?n:[n],transactionId:r&&r.transactionId||void 0,skipCrossDatasetReferenceValidation:r&&r.skipCrossDatasetReferenceValidation||void 0,dryRun:r&&r.dryRun||void 0},r)}function Z(e,t,n,r,i={}){let a=n===`mutate`,o=n===`actions`,s=n===`query`,c=a||o?``:Ua(r),l=!a&&!o&&c.length<Ya,u=l?c:``,d=i.returnFirst,{timeout:f,token:p,tag:m,headers:h,returnQuery:g,lastLiveEventId:_,cacheMode:ee}=i,te=$(e,n,u);return vo(e,t,{method:l?`GET`:`POST`,uri:te,json:!0,body:l?void 0:r,query:a&&Ga(i),timeout:f,headers:h,token:p,tag:m,returnQuery:g,perspective:i.perspective,resultSourceMap:i.resultSourceMap,lastLiveEventId:Array.isArray(_)?_[0]:_,cacheMode:ee,canUseCdn:s,signal:i.signal,fetch:i.fetch,useAbortSignal:i.useAbortSignal,useCdn:i.useCdn}).pipe(H(Ka),B(qa),B(e=>{if(!a)return e;let t=e.results||[];if(i.returnDocuments)return d?t[0]&&t[0].document:t.map(e=>e.document);let n=d?`documentId`:`documentIds`,r=d?t[0]&&t[0].id:t.map(e=>e.id);return{transactionId:e.transactionId,results:t,[n]:r}}))}function lo(e,t,n,r,i={}){let a={[r]:n},o=Object.assign({returnFirst:!0,returnDocuments:!0},i);return Z(e,t,`mutate`,{mutations:[a]},o)}var uo=e=>{let t=e.config();return t.dataset!==void 0&&t.projectId!==void 0||t.resource!==void 0},fo=(e,t)=>uo(e)&&t.startsWith($(e,`query`)),po=(e,t)=>uo(e)&&t.startsWith($(e,`mutate`)),mo=(e,t)=>uo(e)&&t.startsWith($(e,`doc`,``)),ho=(e,t)=>uo(e)&&t.startsWith($(e,`listen`)),go=(e,t)=>uo(e)&&t.startsWith($(e,`history`,``)),_o=(e,t)=>t.startsWith(`/data/`)||fo(e,t)||po(e,t)||mo(e,t)||ho(e,t)||go(e,t);function vo(e,t,n){let r=n.url||n.uri,i=e.config(),a=typeof n.canUseCdn>`u`?[`GET`,`HEAD`].indexOf(n.method||`GET`)>=0&&_o(e,r):n.canUseCdn,o=(n.useCdn??i.useCdn)&&a,s=n.tag&&i.requestTagPrefix?[i.requestTagPrefix,n.tag].join(`.`):n.tag||i.requestTagPrefix;if(s&&n.tag!==null&&(n.query={tag:ia(s),...n.query}),[`GET`,`HEAD`,`POST`].indexOf(n.method||`GET`)>=0&&fo(e,r)){let e=n.resultSourceMap??i.resultSourceMap;e!==void 0&&e!==!1&&(n.query={resultSourceMap:e,...n.query});let t=n.perspective||i.perspective;typeof t<`u`&&(t===`previewDrafts`&&ua(),xa(t),n.query={perspective:Array.isArray(t)?t.join(`,`):t,...n.query},(Array.isArray(t)&&t.length>0||t===`previewDrafts`||t===`drafts`)&&o&&(o=!1,la())),n.lastLiveEventId&&(n.query={...n.query,lastLiveEventId:n.lastLiveEventId}),n.returnQuery===!1&&(n.query={returnQuery:`false`,...n.query}),o&&n.cacheMode==`noStale`&&(n.query={cacheMode:`noStale`,...n.query})}let c=Ha(i,Object.assign({},n,{url:yo(e,r,o)})),l=new N(e=>t(c,i.requester).subscribe(e));return n.signal?l.pipe(bo(n.signal)):l}function Q(e,t,n){return vo(e,t,n).pipe(H(e=>e.type===`response`),B(e=>e.body))}function $(e,t,n){let r=e.config();if(r.resource)return aa(r),`${Co(r)}/${n===void 0?t:`${t}/${n}`}`.replace(/\/($|\?)/,`$1`);let i=`/${t}/${K(r)}`;return`/data${n===void 0?i:`${i}/${n}`}`.replace(/\/($|\?)/,`$1`)}function yo(e,t,n=!1){let{url:r,cdnUrl:i}=e.config();return`${n?i:r}/${t.replace(/^\//,``)}`}function bo(e){return t=>new N(n=>{let r=()=>n.error(So(e));if(e&&e.aborted){r();return}let i=t.subscribe(n);return e.addEventListener(`abort`,r),()=>{e.removeEventListener(`abort`,r),i.unsubscribe()}})}var xo=!!globalThis.DOMException;function So(e){if(xo)return new DOMException(e?.reason??`The operation was aborted.`,`AbortError`);let t=Error(e?.reason??`The operation was aborted.`);return t.name=`AbortError`,t}var Co=e=>{let t=e.resource;if(!t)throw Error("`resource` must be provided to perform resource queries");let{type:n,id:r}=t;switch(n){case`dataset`:{let e=r.split(`.`);if(e.length!==2)throw Error(`Dataset ID must be in the format "project.dataset"`);return`/projects/${e[0]}/datasets/${e[1]}`}case`canvas`:return`/canvases/${r}`;case`media-library`:return`/media-libraries/${r}`;case`dashboard`:return`/dashboards/${r}`;default:throw Error(`Unsupported resource type: ${n.toString()}`)}};function wo(e,t,n){return Q(e,t,{method:`POST`,uri:`/agent/action/generate/${K(e.config())}`,body:n})}function To(e,t,n){return Q(e,t,{method:`POST`,uri:`/agent/action/patch/${K(e.config())}`,body:n})}function Eo(e,t,n){return Q(e,t,{method:`POST`,uri:`/agent/action/prompt/${K(e.config())}`,body:n})}function Do(e,t,n){return Q(e,t,{method:`POST`,uri:`/agent/action/transform/${K(e.config())}`,body:n})}function Oo(e,t,n){return Q(e,t,{method:`POST`,uri:`/agent/action/translate/${K(e.config())}`,body:n})}var ko=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}generate(e){return wo(this.#e,this.#t,e)}transform(e){return Do(this.#e,this.#t,e)}translate(e){return Oo(this.#e,this.#t,e)}},Ao=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}generate(e){return z(wo(this.#e,this.#t,e))}transform(e){return z(Do(this.#e,this.#t,e))}translate(e){return z(Oo(this.#e,this.#t,e))}prompt(e){return z(Eo(this.#e,this.#t,e))}patch(e){return z(To(this.#e,this.#t,e))}},jo=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}upload(e,t,n){return No(this.#e,this.#t,e,t,n)}},Mo=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}upload(e,t,n){return z(No(this.#e,this.#t,e,t,n).pipe(H(e=>e.type===`response`),B(e=>e.body.document)))}};function No(e,t,n,r,i={}){Zi(n);let a=i.extract||void 0;a&&!a.length&&(a=[`none`]);let o=e.config(),s=Fo(i,r),{tag:c,label:l,title:u,description:d,creditLine:f,filename:p,source:m}=s,h=o.resource?.type===`media-library`,g=h?{title:u,filename:p}:{label:l,title:u,description:d,filename:p,meta:a,creditLine:f};return m&&!h&&(g.sourceId=m.id,g.sourceName=m.name,g.sourceUrl=m.url),vo(e,t,{tag:c,method:`POST`,timeout:s.timeout||0,uri:Po(o,n),headers:s.contentType?{"Content-Type":s.contentType}:{},query:g,body:r})}function Po(e,t){let n=t===`image`?`images`:`files`,r=e.resource;if(r){let{type:e,id:t}=r;switch(e){case`dataset`:throw Error("Assets are not supported for dataset resources, yet. Configure the client with `{projectId: <projectId>, dataset: <datasetId>}` instead.");case`canvas`:return`/canvases/${t}/assets/${n}`;case`media-library`:return`/media-libraries/${t}/upload`;case`dashboard`:return`/dashboards/${t}/assets/${n}`;default:throw Error(`Unsupported resource type: ${e.toString()}`)}}return`assets/${n}/${K(e)}`}function Fo(e,t){return typeof File>`u`||!(t instanceof File)?e:Object.assign({filename:e.preserveFilename===!1?void 0:t.name,contentType:t.type},e)}var Io=(e,t)=>Object.keys(t).concat(Object.keys(e)).reduce((n,r)=>(n[r]=typeof e[r]>`u`?t[r]:e[r],n),{}),Lo=(e,t)=>t.reduce((t,n)=>(typeof e[n]>`u`||(t[n]=e[n]),t),{}),Ro=ei(()=>p(()=>import(`./browser-DtWuJuCa.js`).then(t=>e(t.default,1)),__vite__mapDeps([2,3]),import.meta.url)).pipe(B(({default:e})=>e),di(1));function zo(){return function(e){return e.pipe(ai((e,t)=>e instanceof Ca?$r(R({type:`reconnect`}),ti(1e3).pipe(V(()=>t))):Br(()=>e)))}}var Bo=14800,Vo=[`includePreviousRevision`,`includeResult`,`includeMutations`,`includeAllVersions`,`visibility`,`effectFormat`,`enableResume`,`tag`],Ho={includeResult:!0};function Uo(e,t,n={}){let{url:r,token:i,withCredentials:a,requestTagPrefix:o,headers:s}=this.config(),c=n.tag&&o?[o,n.tag].join(`.`):n.tag,l={...Io(n,Ho),tag:c},u=Ua({query:e,params:t,options:{tag:c,...Lo(l,Vo)}}),d=`${r}${$(this,`listen`,u)}`;if(d.length>Bo)return Br(()=>Error(`Query too large for listener`));let f=l.events?l.events:[`mutation`],p={};return a&&(p.withCredentials=!0),(i||s)&&(p.headers={},i&&(p.headers.Authorization=`Bearer ${i}`),s&&Object.assign(p.headers,s)),ka(()=>(typeof EventSource>`u`||p.headers?Ro:R(EventSource)).pipe(B(e=>new e(d,p))),f).pipe(zo(),H(e=>f.includes(e.type)),B(e=>({type:e.type,...`data`in e?e.data:{}})))}function Wo(e,t){return Go(typeof e==`function`?{predicate:e,...t}:e)}function Go(e){return t=>{let n,r=!1,{predicate:i,...a}=e;return ni(t.pipe(fi(t=>{e.predicate(t)&&(r=!0,n=t)}),ci(()=>{r=!1,n=void 0}),li(a)),new N(e=>{r&&e.next(n),e.complete()}))}}var Ko=`2021-03-25`,qo=class{#e;constructor(e){this.#e=e}events({includeDrafts:e=!1,tag:t}={}){let{projectId:n,apiVersion:r,token:i,withCredentials:a,requestTagPrefix:o,headers:s}=this.#e.config(),c=r.replace(/^v/,``);if(c!==`X`&&c<Ko)throw Error(`The live events API requires API version ${Ko} or later. The current API version is ${c}. Please update your API version to use this feature.`);if(e&&!i&&!a)throw Error(`The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role.`);let l=$(this.#e,`live/events`),u=new URL(this.#e.getUrl(l,!1)),d=t&&o?[o,t].join(`.`):t;d&&u.searchParams.set(`tag`,d),e&&u.searchParams.set(`includeDrafts`,`true`);let f={};e&&a&&(f.withCredentials=!0),(e&&i||s)&&(f.headers={},e&&i&&(f.headers.Authorization=`Bearer ${i}`),s&&Object.assign(f.headers,s));let p=`${u.href}::${JSON.stringify(f)}`,m=Yo.get(p);if(m)return m;let h=ka(()=>(typeof EventSource>`u`||f.headers?Ro:R(EventSource)).pipe(B(e=>new e(u.href,f))),[`message`,`restart`,`welcome`,`reconnect`,`goaway`]),g=Jo(u,{method:`OPTIONS`,mode:`cors`,credentials:f.withCredentials?`include`:`omit`,headers:f.headers}).pipe(ai(()=>{throw new Vi({projectId:n})})),_=h.pipe(zo(),V(e=>e.type===`reconnect`?g.pipe(V(()=>R(e))):R(e)),ai(e=>g.pipe(V(()=>{throw e}))),B(e=>{if(e.type===`message`){let{data:t,...n}=e;return{...n,tags:t.tags}}return e})).pipe(ci(()=>Yo.delete(p)),Wo({predicate:e=>e.type===`welcome`}));return Yo.set(p,_),_}};function Jo(e,t){return new N(n=>{let r=new AbortController,i=r.signal;return fetch(e,{...t,signal:r.signal}).then(e=>{n.next(e),n.complete()},e=>{i.aborted||n.error(e)}),()=>r.abort()})}var Yo=new Map,Xo=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}create(e,t){return $o(this.#e,this.#t,`PUT`,e,t)}edit(e,t){return $o(this.#e,this.#t,`PATCH`,e,t)}delete(e){return $o(this.#e,this.#t,`DELETE`,e)}list(){q(`dataset`,this.#e.config());let e=this.#e.config(),t=e.projectId,n=`/datasets`;return e.useProjectHostname===!1&&(n=`/projects/${t}/datasets`),Q(this.#e,this.#t,{uri:n,tag:null})}getEmbeddingsSettings(e){return q(`dataset`,this.#e.config()),W(e),Q(this.#e,this.#t,{uri:Qo(this.#e,e),tag:null})}editEmbeddingsSettings(e,t){return q(`dataset`,this.#e.config()),W(e),Q(this.#e,this.#t,{method:`PUT`,uri:Qo(this.#e,e),body:t,tag:null})}},Zo=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}create(e,t){return q(`dataset`,this.#e.config()),z($o(this.#e,this.#t,`PUT`,e,t))}edit(e,t){return q(`dataset`,this.#e.config()),z($o(this.#e,this.#t,`PATCH`,e,t))}delete(e){return q(`dataset`,this.#e.config()),z($o(this.#e,this.#t,`DELETE`,e))}list(){q(`dataset`,this.#e.config());let e=this.#e.config(),t=e.projectId,n=`/datasets`;return e.useProjectHostname===!1&&(n=`/projects/${t}/datasets`),z(Q(this.#e,this.#t,{uri:n,tag:null}))}getEmbeddingsSettings(e){return q(`dataset`,this.#e.config()),W(e),z(Q(this.#e,this.#t,{uri:Qo(this.#e,e),tag:null}))}editEmbeddingsSettings(e,t){return q(`dataset`,this.#e.config()),W(e),z(Q(this.#e,this.#t,{method:`PUT`,uri:Qo(this.#e,e),body:t,tag:null}))}};function Qo(e,t){let n=e.config();return n.useProjectHostname===!1?`/projects/${n.projectId}/datasets/${t}/settings/embeddings`:`/datasets/${t}/settings/embeddings`}function $o(e,t,n,r,i){return q(`dataset`,e.config()),W(r),Q(e,t,{method:n,uri:`/datasets/${r}`,body:i,tag:null})}var es=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}getPlaybackInfo(e,t={}){let n=this.#e.config(),r=(n.resource||n[`~experimental_resource`])?.id,{instanceId:i,libraryId:a}=is(e),o=a||r;if(!o)throw Error(`Could not determine Media Library ID - you need to provide a valid Media Library ID in the client config or a Media Library GDR`);let s=as(i,o),c=os(t);return Q(this.#e,this.#t,{method:`GET`,uri:s,query:c})}},ts=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}getPlaybackInfo(e,t={}){return z(new es(this.#e.observable,this.#t).getPlaybackInfo(e,t))}},ns=/^media-library:(ml[^:]+):([^:]+)$/;function rs(e){return typeof e==`object`&&`_ref`in e}function is(e){let t=rs(e)?e._ref:e,n=ns.exec(t);if(n){let[,e,t]=n;return{libraryId:e,instanceId:t}}if(typeof e==`string`&&e.startsWith(`video-`))return{instanceId:e};throw Error(`Invalid video asset instance identifier "${t}": must be a valid video instance id or a Global Dataset Reference (GDR) to the video asset in the Media Library`)}function as(e,t){return`/media-libraries/${t}/video/${e}/playback-info`}function os(e){let t={};if(e.transformations){let{thumbnail:n,animated:r,storyboard:i}=e.transformations;n&&(n.width&&(t.thumbnailWidth=n.width),n.height&&(t.thumbnailHeight=n.height),n.time!==void 0&&(t.thumbnailTime=n.time),n.fit&&(t.thumbnailFit=n.fit),n.format&&(t.thumbnailFormat=n.format)),r&&(r.width&&(t.animatedWidth=r.width),r.height&&(t.animatedHeight=r.height),r.start!==void 0&&(t.animatedStart=r.start),r.end!==void 0&&(t.animatedEnd=r.end),r.fps&&(t.animatedFps=r.fps),r.format&&(t.animatedFormat=r.format)),i&&i.format&&(t.storyboardFormat=i.format)}return e.expiration&&(t.expiration=e.expiration),t}var ss=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}list(e){let t={};return e?.includeMembers===!1&&(t.includeMembers=`false`),e?.includeFeatures===!1&&(t.includeFeatures=`false`),e?.organizationId&&(t.organizationId=e.organizationId),e?.onlyExplicitMembership&&(t.onlyExplicitMembership=`true`),Q(this.#e,this.#t,{uri:`/projects`,query:t})}getById(e){return Q(this.#e,this.#t,{uri:`/projects/${e}`})}},cs=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}list(e){let t={};return e?.includeMembers===!1&&(t.includeMembers=`false`),e?.includeFeatures===!1&&(t.includeFeatures=`false`),e?.organizationId&&(t.organizationId=e.organizationId),e?.onlyExplicitMembership&&(t.onlyExplicitMembership=`true`),z(Q(this.#e,this.#t,{uri:`/projects`,query:t}))}getById(e){return z(Q(this.#e,this.#t,{uri:`/projects/${e}`}))}},ls=Ti(`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`,8),us=(e,t)=>t?bi(e,t):yi(e);function ds(e,{releaseId:t,publishedId:n,document:r}){if(n&&r._id){let e=us(n,t);return na(e,r),e}if(r._id){let n=_i(r._id),i=vi(r._id);if(!n&&!i)throw Error(`\`${e}()\` requires a document with an \`_id\` that is a version or draft ID`);if(t){if(n)throw Error(`\`${e}()\` was called with a document ID (\`${r._id}\`) that is a draft ID, but a release ID (\`${t}\`) was also provided.`);let i=xi(r._id);if(i!==t)throw Error(`\`${e}()\` was called with a document ID (\`${r._id}\`) that is a version ID, but the release ID (\`${t}\`) does not match the document's version ID (\`${i}\`).`)}return r._id}if(n)return us(n,t);throw Error(`\`${e}()\` requires either a publishedId or a document with an \`_id\``)}var fs=(e,t)=>{if(typeof e==`object`&&e&&(`releaseId`in e||`metadata`in e)){let{releaseId:n=ls(),metadata:r={}}=e;return[n,r,t]}return[ls(),{},e]},ps=(e,t)=>{let[n,r,i]=fs(e,t);return{action:{actionType:`sanity.action.release.create`,releaseId:n,metadata:{...r,releaseType:r.releaseType||`undecided`}},options:i}},ms=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}get({releaseId:e},t){return Za(this.#e,this.#t,`_.releases.${e}`,t)}create(e,t){let{action:n,options:r}=ps(e,t),{releaseId:i,metadata:a}=n;return X(this.#e,this.#t,n,r).pipe(B(e=>({...e,releaseId:i,metadata:a})))}edit({releaseId:e,patch:t},n){let r={actionType:`sanity.action.release.edit`,releaseId:e,patch:t};return X(this.#e,this.#t,r,n)}publish({releaseId:e},t){let n={actionType:`sanity.action.release.publish`,releaseId:e};return X(this.#e,this.#t,n,t)}archive({releaseId:e},t){let n={actionType:`sanity.action.release.archive`,releaseId:e};return X(this.#e,this.#t,n,t)}unarchive({releaseId:e},t){let n={actionType:`sanity.action.release.unarchive`,releaseId:e};return X(this.#e,this.#t,n,t)}schedule({releaseId:e,publishAt:t},n){let r={actionType:`sanity.action.release.schedule`,releaseId:e,publishAt:t};return X(this.#e,this.#t,r,n)}unschedule({releaseId:e},t){let n={actionType:`sanity.action.release.unschedule`,releaseId:e};return X(this.#e,this.#t,n,t)}delete({releaseId:e},t){let n={actionType:`sanity.action.release.delete`,releaseId:e};return X(this.#e,this.#t,n,t)}fetchDocuments({releaseId:e},t){return $a(this.#e,this.#t,e,t)}},hs=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}get({releaseId:e},t){return z(Za(this.#e,this.#t,`_.releases.${e}`,t))}async create(e,t){let{action:n,options:r}=ps(e,t),{releaseId:i,metadata:a}=n;return{...await z(X(this.#e,this.#t,n,r)),releaseId:i,metadata:a}}edit({releaseId:e,patch:t},n){let r={actionType:`sanity.action.release.edit`,releaseId:e,patch:t};return z(X(this.#e,this.#t,r,n))}publish({releaseId:e},t){let n={actionType:`sanity.action.release.publish`,releaseId:e};return z(X(this.#e,this.#t,n,t))}archive({releaseId:e},t){let n={actionType:`sanity.action.release.archive`,releaseId:e};return z(X(this.#e,this.#t,n,t))}unarchive({releaseId:e},t){let n={actionType:`sanity.action.release.unarchive`,releaseId:e};return z(X(this.#e,this.#t,n,t))}schedule({releaseId:e,publishAt:t},n){let r={actionType:`sanity.action.release.schedule`,releaseId:e,publishAt:t};return z(X(this.#e,this.#t,r,n))}unschedule({releaseId:e},t){let n={actionType:`sanity.action.release.unschedule`,releaseId:e};return z(X(this.#e,this.#t,n,t))}delete({releaseId:e},t){let n={actionType:`sanity.action.release.delete`,releaseId:e};return z(X(this.#e,this.#t,n,t))}fetchDocuments({releaseId:e},t){return z($a(this.#e,this.#t,e,t))}},gs=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}getById(e){return Q(this.#e,this.#t,{uri:`/users/${e}`})}},_s=class{#e;#t;constructor(e,t){this.#e=e,this.#t=t}getById(e){return z(Q(this.#e,this.#t,{uri:`/users/${e}`}))}},vs=class e{assets;datasets;live;mediaLibrary;projects;users;agent;releases;#e;#t;listen=Uo;constructor(e,t=_a){this.config(t),this.#t=e,this.assets=new jo(this,this.#t),this.datasets=new Xo(this,this.#t),this.live=new qo(this),this.mediaLibrary={video:new es(this,this.#t)},this.projects=new ss(this,this.#t),this.users=new gs(this,this.#t),this.agent={action:new ko(this,this.#t)},this.releases=new ms(this,this.#t)}clone(){return new e(this.#t,this.config())}config(e){if(e===void 0)return{...this.#e};if(this.#e&&this.#e.allowReconfigure===!1)throw Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");return this.#e=Sa(e,this.#e||{}),this}withConfig(t){let n=this.config();return new e(this.#t,{...n,...t,stega:{...n.stega||{},...typeof t?.stega==`boolean`?{enabled:t.stega}:t?.stega||{}}})}fetch(e,t,n){return Xa(this,this.#t,this.#e.stega,e,t,n)}getDocument(e,t){if(t?.includeAllVersions===!0)return Za(this,this.#t,e,{...t,includeAllVersions:!0});let n={signal:t?.signal,tag:t?.tag,releaseId:t?.releaseId,...t&&`includeAllVersions`in t?{includeAllVersions:!1}:{}};return Za(this,this.#t,e,n)}getDocuments(e,t){return Qa(this,this.#t,e,t)}create(e,t){return lo(this,this.#t,e,`create`,t)}createIfNotExists(e,t){return eo(this,this.#t,e,t)}createOrReplace(e,t){return to(this,this.#t,e,t)}createVersion({document:e,publishedId:t,releaseId:n,baseId:r,ifBaseRevisionId:i},a){if(!e)return ro(this,this.#t,t,r,n,i,a);let o=ds(`createVersion`,{document:e,publishedId:t,releaseId:n}),s={...e,_id:o},c=t||Si(e._id);return no(this,this.#t,s,c,a)}delete(e,t){return io(this,this.#t,e,t)}discardVersion({releaseId:e,publishedId:t},n,r){let i=us(t,e);return ao(this,this.#t,i,n,r)}replaceVersion({document:e,publishedId:t,releaseId:n},r){let i=ds(`replaceVersion`,{document:e,publishedId:t,releaseId:n}),a={...e,_id:i};return oo(this,this.#t,a,r)}unpublishVersion({releaseId:e,publishedId:t},n){let r=bi(t,e);return so(this,this.#t,r,t,n)}mutate(e,t){return co(this,this.#t,e,t)}patch(e,t){return new Ia(e,t,this)}transaction(e){return new Ba(e,this)}action(e,t){return X(this,this.#t,e,t)}request(e){return Q(this,this.#t,e)}getUrl(e,t){return yo(this,e,t)}getDataUrl(e,t){return $(this,e,t)}},ys=class e{assets;datasets;live;mediaLibrary;projects;users;agent;releases;observable;#e;#t;listen=Uo;constructor(e,t=_a){this.config(t),this.#t=e,this.assets=new Mo(this,this.#t),this.datasets=new Zo(this,this.#t),this.live=new qo(this),this.mediaLibrary={video:new ts(this,this.#t)},this.projects=new cs(this,this.#t),this.users=new _s(this,this.#t),this.agent={action:new Ao(this,this.#t)},this.releases=new hs(this,this.#t),this.observable=new vs(e,t)}clone(){return new e(this.#t,this.config())}config(e){if(e===void 0)return{...this.#e};if(this.#e&&this.#e.allowReconfigure===!1)throw Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");return this.observable&&this.observable.config(e),this.#e=Sa(e,this.#e||{}),this}withConfig(t){let n=this.config();return new e(this.#t,{...n,...t,stega:{...n.stega||{},...typeof t?.stega==`boolean`?{enabled:t.stega}:t?.stega||{}}})}fetch(e,t,n){return z(Xa(this,this.#t,this.#e.stega,e,t,n))}getDocument(e,t){if(t?.includeAllVersions===!0)return z(Za(this,this.#t,e,{...t,includeAllVersions:!0}));let n={signal:t?.signal,tag:t?.tag,releaseId:t?.releaseId,...t&&`includeAllVersions`in t?{includeAllVersions:!1}:{}};return z(Za(this,this.#t,e,n))}getDocuments(e,t){return z(Qa(this,this.#t,e,t))}create(e,t){return z(lo(this,this.#t,e,`create`,t))}createIfNotExists(e,t){return z(eo(this,this.#t,e,t))}createOrReplace(e,t){return z(to(this,this.#t,e,t))}createVersion({document:e,publishedId:t,releaseId:n,baseId:r,ifBaseRevisionId:i},a){if(!e)return Ur(ro(this,this.#t,t,r,n,i,a));let o=ds(`createVersion`,{document:e,publishedId:t,releaseId:n}),s={...e,_id:o},c=t||Si(e._id);return Ur(no(this,this.#t,s,c,a))}delete(e,t){return z(io(this,this.#t,e,t))}discardVersion({releaseId:e,publishedId:t},n,r){let i=us(t,e);return z(ao(this,this.#t,i,n,r))}replaceVersion({document:e,publishedId:t,releaseId:n},r){let i=ds(`replaceVersion`,{document:e,publishedId:t,releaseId:n}),a={...e,_id:i};return Ur(oo(this,this.#t,a,r))}unpublishVersion({releaseId:e,publishedId:t},n){let r=bi(t,e);return z(so(this,this.#t,r,t,n))}mutate(e,t){return z(co(this,this.#t,e,t))}patch(e,t){return new Y(e,t,this)}transaction(e){return new za(e,this)}action(e,t){return z(X(this,this.#t,e,t))}request(e){return z(Q(this,this.#t,e))}dataRequest(e,t,n){return z(Z(this,this.#t,e,t,n))}getUrl(e,t){return yo(this,e,t)}getDataUrl(e,t){return $(this,e,t)}};function bs(e,t){return{requester:Wi(e),createClient:n=>{let r=Wi(e,{ignoreWarnings:n.ignoreWarnings});return new t((e,t)=>(t||r)({maxRedirects:0,maxRetries:n.maxRetries,retryDelay:n.retryDelay,lineage:n.lineage,...e}),n)}}}var xs=bs([],ys);xs.requester;var Ss=xs.createClient,Cs=`2024-01-01`;function ws({apiVersion:e=Cs,requestTagPrefix:t,useCdn:n=!0}={}){return Ss({projectId:ue,dataset:de,apiVersion:e,requestTagPrefix:t,useCdn:n})}var Ts=`/marketing/api/sanity`;function Es({apiVersion:e,token:t,useCdn:n}){if(t)throw Error(`Sanity proxy clients cannot send browser tokens`);return{fetch:async(t,r={})=>{let i=new URLSearchParams({apiVersion:e,params:JSON.stringify(r),query:t,useCdn:String(n)});i.set(`draft`,te()?`1`:`0`);let a=await globalThis.fetch(`${Ts}?${i.toString()}`);if(!a.ok)throw Error(`Sanity proxy request failed with status ${a.status}`);return await a.json()}}}var Ds=(0,e(f(),1).memo)(function(e){let t=e.priority?{fetchPriority:`high`,loading:`eager`}:{fetchPriority:`auto`,loading:`lazy`};if(e.mode===`fixed`){let{alt:n,height:r,mode:i,priority:a,source:o,transform:s,width:c,...l}=e;return(0,v.jsx)(`img`,{...l,...t,alt:n,height:r,src:Be(e),width:c})}if(e.mode===`custom`){let{alt:n,candidateWidths:r,height:i,mode:a,priority:o,sizes:s,source:c,transform:l,width:u,...d}=e;return(0,v.jsx)(`img`,{...d,...t,alt:n,height:i,sizes:s,src:Be(e),srcSet:He(e),width:u})}let{alt:n,aspectRatio:r,candidateWidths:i,height:a,mode:o,priority:s,sizes:c,source:l,style:u,transform:d,width:f,...p}=e;return(0,v.jsx)(`img`,{...p,...t,alt:n,height:a,sizes:c,src:Be(e),srcSet:He(e),style:{...u,...r===void 0?{}:{aspectRatio:r}},width:f})}),Os=`/assets/perplexity-research-Cq7JHIYw.svg`,ks=`data:image/svg+xml,%3c!--%20Air:%20Wordmark%20board%20dedc61ed-bfd8-40ab-9b1d-a1d5dee97e64,%20PPLX_Wordmark_B.svg%20(approved%202026%20kit).%20Same%20paths%20and%20fill;%20only%20the%20viewBox%20is%20cropped%20to%20the%20file's%20own%20clip%20rect%20so%20the%20bar%20sets%20the%20clear%20space.%20--%3e%3csvg%20width='480.615'%20height='97.3693'%20viewBox='97%2078%20480.615%2097.3693'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1709_25672)'%3e%3cpath%20d='M507.64%20157.772C497.197%20157.772%20490.907%20152.963%20490.907%20141.818V78H503.605V97.3565H530.187L547.394%20137.712L562.584%2097.3565H577.062L544.784%20175.369H530.424L540.63%20151.907L521.406%20108.501H503.605V139.941C503.605%20144.751%20505.741%20146.628%20510.725%20146.628H522.236V157.772H507.64Z'%20fill='%23121516'/%3e%3cpath%20d='M467.845%20157.772V97.3565H480.543V157.772H467.845ZM467.489%2091.139V78H480.899V91.139H467.489Z'%20fill='%23121516'/%3e%3cpath%20d='M404.356%20157.772L425.005%20126.215L405.899%2097.3566H421.089L433.549%20118.004L446.128%2097.3566H461.318L442.212%20126.215L462.861%20157.772H447.671L433.549%20134.779L419.546%20157.772H404.356Z'%20fill='%23121516'/%3e%3cpath%20d='M377.834%20159.532C359.915%20159.532%20348.285%20146.745%20348.285%20127.271C348.285%20108.501%20360.034%2095.5968%20377.122%2095.5968C394.329%2095.5968%20405.84%20107.445%20405.84%20125.16C405.84%20127.858%20405.722%20129.852%20405.366%20131.494H361.458C362.17%20142.874%20367.747%20148.974%20377.953%20148.974C385.31%20148.974%20390.176%20145.689%20391.956%20139.237H404.891C402.043%20151.907%20391.837%20159.532%20377.834%20159.532ZM361.458%20121.64H392.905C392.193%20111.317%20386.853%20106.155%20377.122%20106.155C367.984%20106.155%20362.288%20111.903%20361.458%20121.64Z'%20fill='%23121516'/%3e%3cpath%20d='M328.431%20157.772V78H341.128V157.772H328.431Z'%20fill='%23121516'/%3e%3cpath%20d='M263.88%20175.369V97.3565H276.578V103.457C280.375%2098.4123%20287.021%2095.5968%20294.853%2095.5968C311.111%2095.5968%20321.316%20107.915%20321.316%20127.506C321.316%20147.097%20311.111%20159.532%20294.853%20159.532C287.021%20159.532%20280.375%20156.717%20276.578%20151.672V175.369H263.88ZM292.123%20148.035C302.685%20148.035%20308.263%20140.997%20308.263%20127.506C308.263%20114.132%20302.685%20107.093%20292.123%20107.093C281.443%20107.093%20275.866%20114.132%20275.866%20127.506C275.866%20140.997%20281.443%20148.035%20292.123%20148.035Z'%20fill='%23121516'/%3e%3cpath%20d='M224.479%20157.772V97.3566H237.176V103.809C239.55%2099.7028%20244.178%2097.3566%20249.874%2097.3566H258.181V109.322H249.874C241.092%20109.322%20237.176%20113.546%20237.176%20122.931V157.772H224.479Z'%20fill='%23121516'/%3e%3cpath%20d='M188.82%20159.532C170.9%20159.532%20159.271%20146.745%20159.271%20127.271C159.271%20108.501%20171.019%2095.5968%20188.107%2095.5968C205.315%2095.5968%20216.825%20107.445%20216.825%20125.16C216.825%20127.858%20216.706%20129.852%20216.35%20131.494H172.443C173.155%20142.874%20178.733%20148.974%20188.938%20148.974C196.296%20148.974%20201.161%20145.689%20202.941%20139.237H215.876C213.028%20151.907%20202.823%20159.532%20188.82%20159.532ZM172.443%20121.64H203.891C203.179%20111.317%20197.838%20106.155%20188.107%20106.155C178.97%20106.155%20173.274%20111.903%20172.443%20121.64Z'%20fill='%23121516'/%3e%3cpath%20d='M97%20175.369V97.3565H109.698V103.457C113.495%2098.4123%20120.141%2095.5968%20127.973%2095.5968C144.231%2095.5968%20154.436%20107.915%20154.436%20127.506C154.436%20147.097%20144.231%20159.532%20127.973%20159.532C120.141%20159.532%20113.495%20156.717%20109.698%20151.672V175.369H97ZM125.244%20148.035C135.805%20148.035%20141.383%20140.997%20141.383%20127.506C141.383%20114.132%20135.805%20107.093%20125.244%20107.093C114.563%20107.093%20108.986%20114.132%20108.986%20127.506C108.986%20140.997%20114.563%20148.035%20125.244%20148.035Z'%20fill='%23121516'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1709_25672'%3e%3crect%20width='480.615'%20height='97.3693'%20fill='white'%20transform='translate(97%2078)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e`,As=e(d(),1),js=`inline-flex min-h-11 shrink-0 items-center`,Ms=ie({name:`logo`},function({variant:e,colorMode:t,href:n,label:r}){let{track:i}=ee(),a=(0,v.jsx)(`img`,{src:e===`research`?Os:ks,alt:``,className:(0,As.default)(e===`research`?`h-auto w-24`:`block h-[18px] w-auto`,t===`dark`&&`invert`)});return e===`simplified`?(0,v.jsx)(`span`,{className:js,"aria-hidden":!0,children:a}):(0,v.jsx)(_,{href:n,hardNav:!0,"aria-label":r,className:js,onTrackEvent:()=>i({event:`header logo selected`,data:{destination:n}}),children:a})});export{Pt as A,w as B,jt as C,Lt as D,It as E,C as F,Ve as G,Ct as H,Ot as I,Be as K,Je as L,ht as M,kt as N,Ye as O,wt as P,mt as R,S,at as T,y as U,bt as V,He as W,dt as _,ws as a,Ke as b,b as c,st as d,ot as f,ut as g,We as h,Es as i,qe as j,Rt as k,rt as l,lt as m,ks as n,nt as o,ct as p,le as q,Ds as r,tt as s,Ms as t,x as u,Ge as v,Ft as w,pt as x,ft as y,St as z};
