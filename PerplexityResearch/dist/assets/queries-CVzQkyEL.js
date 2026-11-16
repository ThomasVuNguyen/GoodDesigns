import{i as e}from"./marketingHostRouteAliases-C9ECm_mk.js";import{r as t}from"./react-query-Cbxks9GV.js";import{U as n,a as r,i}from"./HeaderLogo-BN7xinmJ.js";var a=`2025-02-19`,o=n(`
  *[
    _type == "paidAdLandingPage" &&
    slug.current == $slug &&
    language == $language
  ][0] {
    _id,
    _type,
    "slug": slug.current,
    language,
    conversion {
      _type,
      flow,
      subSegment,
      checkout {
        tier,
        billingInterval,
        enterprise
      },
      workflow {
        _type,
        inputType,
        inputPlaceholder,
        fileAccept,
        fileUploadLabel,
        prefillTemplate,
        generatingMode,
        generatingTitle,
        generatingSteps[] { _key, text }
      }
    },
    hero {
      _type,
      title,
      subtitle,
      ctaLabel,
      emailPlaceholder,
      hideModelRail,
      media {
        _type,
        type,
        type == "staticImage" => {
          staticImage {
            _type,
            asset,
            crop,
            hotspot,
            alt
          }
        },
        type == "taskChips" => {
          taskChips {
            _type,
            tasks[] {
              _key,
              _type,
              label,
              connector-> {
                _id,
                _type,
                name,
                icon { _type, asset, crop, hotspot }
              }
            }
          }
        },
        type == "promptWithBackground" => {
          promptWithBackground {
            _type,
            prompt,
            backgroundImage { _type, asset, crop, hotspot, alt },
            connector-> {
              _id,
              _type,
              name,
              icon { _type, asset, crop, hotspot }
            }
          }
        }
      }
    },
    sections[] {
      _key,
      _type,
      _type == "threeUpCardsSection" => {
        heading,
        body,
        cards[] {
          _key,
          _type,
          title,
          body,
          media {
            _type,
            type,
            type == "staticImage" => {
              staticImage { _type, asset, crop, hotspot, alt }
            },
            type == "taskChecklist" => {
              taskChecklist {
                _type,
                tasks[] { _key, _type, label }
              }
            },
            type == "connectorHub" => {
              connectorHub {
                _type,
                connectors[]-> {
                  _id,
                  _type,
                  name,
                  icon { _type, asset, crop, hotspot }
                }
              }
            },
            type == "scheduledAutomations" => {
              scheduledAutomations {
                _type,
                automations[] {
                  _key,
                  _type,
                  title,
                  schedule,
                  connectors[]-> {
                    _id,
                    _type,
                    name,
                    icon { _type, asset, crop, hotspot }
                  }
                }
              }
            }
          }
        }
      },
      _type == "capabilityGridSection" => {
        heading,
        body,
        presentation,
        items[] { _key, _type, iconKey, title, body, example }
      },
      _type == "promptMarqueeSection" => {
        heading,
        prompts[] { _key, _type, category, prompt }
      },
      _type == "faqSection" => {
        heading,
        items[] { _key, _type, question, answer }
      },
      _type == "workflowShowcaseSection" => {
        heading,
        body,
        tabs[] {
          _key,
          _type,
          label,
          image { _type, asset, crop, hotspot, alt }
        }
      }
    },
    bottomCta {
      _type,
      title,
      subtitle,
      ctaLabel,
      emailPlaceholder
    }
  }
`),s=n(`
  *[
    _type == "paidAdGatedAsset" &&
    slug.current == $slug
  ][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    description,
    file {
      _type,
      asset-> {
        _id,
        url
      }
    },
    downloadFilename,
    thumbnail {
      _type,
      asset,
      crop,
      hotspot,
      alt
    },
    keyThings[] {
      _key,
      _type,
      title,
      description
    },
    summary,
    campaignId
  }
`),c=r({apiVersion:a,requestTagPrefix:`paid-ad-landing-page`}),l=i(c.config());async function u(t,n){return t.fetch(o,{language:e,slug:n})}async function d(e,t){return e.fetch(s,{slug:t})}var f=`sanity/paid-ad-landing-page/entry`,p=`sanity/paid-ad-gated-asset/entry`,m=3e5,h=6e5;function g(e){return e.conversion.flow===`workflow`}function _(e){return!!e?.trim()}function v(e){return!!e.children?.some(e=>e._type===`paidAdWorkflowVisitorWebsite`||_(e.text))}function y(e){if(e.generatingMode!==`custom`)return!0;let t=e.generatingSteps;return!!(Array.isArray(t)&&t.length>=1&&t.length<=5&&t.every(e=>Array.isArray(e.text)&&e.text.some(v)))}function b(e){return e?!!((e.inputType===`file`?Array.isArray(e.fileAccept)&&e.fileAccept.length>0:e.inputType===`url`)&&Array.isArray(e.prefillTemplate)&&e.prefillTemplate.some(v)&&y(e)):!1}function x(e){let t=e.conversion;return t?.flow?t.flow===`workflow`?b(t.workflow):_(e.hero?.emailPlaceholder):!1}function S(e){return!!e?.asset}function C(e){if(!_(e))return!1;try{let t=new URL(e);return t.protocol===`https:`&&t.hostname===`cdn.sanity.io`}catch{return!1}}function w(e){return!!(e&&_(e.name)&&S(e.icon))}function T(e){if(!e?.type)return!1;switch(e.type){case`staticImage`:return`staticImage`in e&&S(e.staticImage);case`taskChips`:{let t=`taskChips`in e?e.taskChips?.tasks:null;return!!(t?.length===3&&t.every(e=>_(e.label)&&(!e.connector||w(e.connector))))}case`promptWithBackground`:{let t=`promptWithBackground`in e?e.promptWithBackground:null;return!!(t&&_(t.prompt)&&S(t.backgroundImage)&&w(t.connector))}default:return!1}}function E(e){if(!e?.type)return!1;switch(e.type){case`staticImage`:return`staticImage`in e&&S(e.staticImage);case`taskChecklist`:{let t=`taskChecklist`in e?e.taskChecklist?.tasks:null;return!!(t&&t.length>=1&&t.length<=5&&t.every(e=>_(e.label)))}case`connectorHub`:{let t=`connectorHub`in e?e.connectorHub?.connectors:null;return!!(t?.length===6&&t.every(w))}case`scheduledAutomations`:{let t=`scheduledAutomations`in e?e.scheduledAutomations?.automations:null;return!!(t&&t.length>=1&&t.length<=3&&t.every(e=>_(e.title)&&_(e.schedule)&&!!e.connectors?.length&&e.connectors?.every(w)))}default:return!1}}function D(e){switch(e._type){case`threeUpCardsSection`:return!!(e.cards?.length===3&&e.cards.every(e=>_(e.title)&&_(e.body)&&E(e.media)));case`capabilityGridSection`:return!!(_(e.heading)&&_(e.body)&&e.presentation&&e.items?.length&&e.items.every(t=>t.iconKey&&_(t.title)&&_(t.body)&&(e.presentation!==`withExample`||_(t.example))));case`promptMarqueeSection`:return!!(_(e.heading)&&e.prompts?.length&&e.prompts.every(e=>_(e.category)&&_(e.prompt)));case`faqSection`:return!!(_(e.heading)&&e.items?.length&&e.items.every(e=>_(e.question)&&_(e.answer)));case`workflowShowcaseSection`:return!!(_(e.heading)&&e.tabs&&e.tabs.length>=2&&e.tabs.every(e=>_(e.label)&&S(e.image)));default:return!0}}function O(e){return!!(e&&_(e.slug)&&x(e)&&e.hero&&_(e.hero.title)&&_(e.hero.ctaLabel)&&T(e.hero.media)&&e.sections?.length&&e.sections.every(D)&&e.bottomCta&&_(e.bottomCta.title))}var k={getKey:({slug:e})=>t.makeEphemeralQueryKey(f,e),getOptions:(e,t)=>({queryKey:k.getKey(e),queryFn:async()=>{let t=await u(e.sanityClient,e.slug);return O(t)?t:null},enabled:e.slug.length>0,staleTime:m,gcTime:h,...t})};function A(e){return!!(e&&_(e.title)&&_(e.slug)&&_(e.description)&&_(e.file?.asset?._id)&&C(e.file?.asset?.url)&&_(e.downloadFilename)&&S(e.thumbnail)&&e.keyThings?.length&&e.keyThings.length<=4&&e.keyThings.every(e=>_(e.title)&&_(e.description))&&_(e.summary)&&_(e.campaignId))}async function j(e,t){let n=await d(e,t);return A(n)?n:null}var M={getKey:({slug:e})=>t.makeEphemeralQueryKey(p,e),getOptions:(e,t)=>({queryKey:M.getKey(e),queryFn:()=>j(e.sanityClient,e.slug),enabled:e.slug.length>0,staleTime:m,gcTime:h,...t})};export{c as a,l as i,M as n,k as r,g as t};
