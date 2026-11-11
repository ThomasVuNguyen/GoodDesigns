function t(e,n){return{customHTMLBodyEnd:`<script>
    console.log("ph -- t landing")
    posthog.capture('hit_landing_page', { "path": window.location.pathname, "host": window.location.host });
<\/script>

<script>
    function report_posthog_click(href) {
        console.log("ph -- t landing")
        posthog.capture('hit_landing_page', { "path": window.location.pathname, "host": window.location.host });
        console.log("ph -- clicked link landing", href);
        posthog.capture('hit_cta_landing', { "path": window.location.pathname, "host": window.location.host, "href": href });
    }

    window.addEventListener('load', function () {
        // Get current query parameters
        let params = new URL(document.location).searchParams;

        setInterval(function() {
            // Get all links that contains this link
            Array.from(document.links).forEach(
                (e) => {
                    // track conversion
                    e.onclick = function () {
                        report_posthog_click(e.href);
                    };
                }
            );
        }, 200);
    });
<\/script>`,customHTMLHeadStart:`<style>
  html {
    background: black;
  }
      /* ::-webkit-scrollbar { 
display: none; 
} */
</style>

<!-- posthog -->
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_cvM8JgK6STaggawSqoXz2l83uEKpEYF2dWSsIgoOGe4',{api_host:"https://sage.buildspace.so/ingest"})
<\/script>

<!-- Global site tag (gtag.js) - Google Ads: 10880806134 -->
<script async="" src="https://www.googletagmanager.com/gtag/js?id=AW-10880806134"><\/script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-10880806134');
  gtag('event', 'conversion', {'send_to': 'AW-10880806134/38HPCOeLhrEDEPbZr8Qo'});
<\/script>


<!-- TikiToki Pixel -->
<script>
  !function (w, d, t) {
          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};        
          ttq.load('CCQTAD3C77U2F908G590');
          ttq.page();
        }(window, document, 'ttq');
<\/script>`,description:"build your ideas for six weeks.",favicon:"/assets/o2xJbojhYMlMAxIHqToswHAxjcM-99e74e124ce9.svg",robots:"max-image-preview:large",socialImage:"/assets/2PsXKwwa1tmYftB6ZdSjE9jqU-2d8f2f48c971.png",title:"buildspace"}}export{t as a};
//# sourceMappingURL=chunk-Q56WAFAT.mjs.map
