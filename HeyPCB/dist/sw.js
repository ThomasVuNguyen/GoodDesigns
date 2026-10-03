/*
 * heypcb's service worker.
 *
 * It exists for ONE reason: Chrome will not offer "Add to Home Screen" for a
 * site that has no worker with a fetch handler, however complete its manifest
 * is. Everything below is written to buy that and as little else as possible,
 * because the failure mode on this side of the line is not a slow page — it is
 * a worker that has cached a document and now serves it to an installed user
 * forever, on an origin where a deploy is a `git push`. There is no cache-bust
 * for that but "uninstall the app", and most users will not know to.
 *
 * So the rules, and each one is load-bearing:
 *
 *   1. NO HTML IS EVER CACHED. Navigations go to the network, full stop. The
 *      one document held on disk is /offline.html, which is served only when
 *      the network THREW. That single rule is what makes a bad deploy
 *      recoverable by deploying again, the way it is without a worker.
 *   2. NOTHING UNDER /api/ IS TOUCHED. Entitlement, wallet balance, plan,
 *      project ownership and the runner proxy all answer there, and every one
 *      of them is server-authoritative by design (see CLAUDE.md, "Security and
 *      billing boundaries"). A cached copy of any of them is a correctness
 *      bug wearing a performance costume.
 *   3. THE ONLY THING CACHED IS CONTENT-ADDRESSED. /_next/static/* carries a
 *      build hash in the path, so a stale entry is not stale — it is a
 *      different URL that nothing asks for any more. Assets without a hash
 *      (/showcase/*.bin, the icons, the vendor logos) are deliberately left to
 *      the HTTP cache, which already handles them and which the user can
 *      clear.
 *   4. THE NEW WORKER TAKES OVER AT ONCE. skipWaiting + clients.claim, with
 *      no reload: because rule 1 means the running page is already showing
 *      network-fresh HTML, there is nothing to correct by reloading, and an
 *      unasked-for reload in the editor would throw away in-flight canvas
 *      state. The next navigation gets everything new on its own.
 *
 * Registered from components/ServiceWorkerRegistrar.tsx, production only.
 */

/*
 * Bump to invalidate everything this worker holds. The caches are keyed on it,
 * and `activate` deletes every cache whose name is not in the current set — so
 * a bump is the escape hatch if a cached asset ever needs to be disowned.
 */
const VERSION = "heypcb-v1";
const PRECACHE = `${VERSION}-precache`;
const STATIC = `${VERSION}-static`;
const KEEP = new Set([PRECACHE, STATIC]);

const OFFLINE_URL = "/offline.html";

/**
 * Paths this worker must never answer for, checked before anything else.
 *
 * `/api/` and `/ingest/` are rule 2 — authoritative state and the analytics
 * proxy. `/auth/` is the OAuth callback, a flow whose whole behaviour is in
 * the response headers. `/_next/data/` is Next's RSC payload: it is HTML's
 * data by another name, so rule 1 covers it too.
 */
const NEVER = ["/api/", "/ingest/", "/auth/", "/_next/data/"];

/** Rule 3: the build-hashed tree, and nothing else. */
const IMMUTABLE = /^\/_next\/static\//;

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      /*
       * `cache: "reload"` so the precache cannot be seeded from the HTTP cache
       * — installing a worker from a stale copy of its own fallback is a bug
       * that only shows up months later.
       */
      const res = await fetch(OFFLINE_URL, { cache: "reload" });
      /*
       * Throwing FAILS THE INSTALL, and that is the outcome we want: a worker
       * that never activates leaves the site exactly as it is without one.
       * Caching whatever came back instead would pin a 404 body — or, in
       * waitlist mode without the /offline.html entry in access-gate's
       * OPEN_PREFIXES, the wall's own HTML — as this app's offline page.
       */
      if (!res.ok) throw new Error(`offline page unavailable: ${res.status}`);
      await cache.put(OFFLINE_URL, res);
    })()
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      /*
       * Navigation preload lets the browser start the network request for a
       * navigation in parallel with booting this worker, instead of after it.
       * Without it every navigation in the installed app pays the worker's
       * cold start — the classic way a PWA ends up SLOWER than the tab it
       * replaced, for a worker that, per rule 1, then just fetches anyway.
       */
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }
      const names = await caches.keys();
      await Promise.all(
        names.map((n) => (KEEP.has(n) ? undefined : caches.delete(n)))
      );
      await self.clients.claim();
    })()
  );
});

/** The page's half of rule 4 — see ServiceWorkerRegistrar.tsx. */
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Not GET: never ours. A POST replayed from a cache is a duplicate mutation.
  if (req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }

  // Cross-origin (Supabase, Stripe, the font CDN) belongs to the browser.
  if (url.origin !== self.location.origin) return;

  if (NEVER.some((p) => url.pathname.startsWith(p))) return;

  /*
   * A ranged request is a partial answer, and a partial answer put in a cache
   * comes back later as a whole one. The 3D tab streams GLBs this way.
   */
  if (req.headers.has("range")) return;

  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloaded = await event.preloadResponse;
          // A 4xx or 5xx IS the answer; only a throw means "no network".
          if (preloaded) return preloaded;
          return await fetch(req);
        } catch {
          const cached = await caches.match(OFFLINE_URL, {
            cacheName: PRECACHE,
          });
          return (
            cached ??
            new Response("Offline.", {
              status: 503,
              headers: { "Content-Type": "text/plain; charset=utf-8" },
            })
          );
        }
      })()
    );
    return;
  }

  if (!IMMUTABLE.test(url.pathname)) return; // rule 3: everything else passes through

  event.respondWith(
    (async () => {
      const cache = await caches.open(STATIC);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      /*
       * Store only a complete, same-origin 200. `res.type === "basic"` rules
       * out opaque cross-origin responses (which have no readable status, so
       * an error would cache as a success) and 206 rules out a partial the
       * range check above did not catch.
       */
      if (res.ok && res.status === 200 && res.type === "basic") {
        cache.put(req, res.clone());
      }
      return res;
    })()
  );
});
