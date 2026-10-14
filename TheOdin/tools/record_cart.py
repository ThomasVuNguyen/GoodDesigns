#!/usr/bin/env python3
"""Record the cart drawer and cart page sections for single-line carts of every variant.

The live cart is a throwaway session cart (no order is placed). The local cart emulator in
dist/odin-local/shim.js assembles any cart from these line templates.
Output: .cache/cart/{empty,<variant>,<variant>-q2,pair}.json
"""
import http.cookiejar
import json
import os
import time
import urllib.error
import urllib.request

ORIGIN = 'https://the-odin.com'
ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
OUT = os.path.join(ROOT, '.cache', 'cart')
CART_PAGE_SECTION = 'template--21672899575943__cart-section'
HEAD = {'User-Agent': 'Mozilla/5.0 (Macintosh) Chrome/130', 'Content-Type': 'application/json', 'Accept': 'application/json'}

jar = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))


def call(path, body=None):
    data = json.dumps(body).encode() if body is not None else None
    for attempt in range(8):
        try:
            return json.loads(opener.open(urllib.request.Request(ORIGIN + path, data=data, headers=HEAD), timeout=60).read())
        except urllib.error.HTTPError as e:
            if e.code != 429:
                raise
            time.sleep(10 * (attempt + 1))
    raise RuntimeError('rate limited: ' + path)


def snapshot(name, lines):
    if os.path.exists(os.path.join(OUT, name + '.json')):
        return
    time.sleep(1.5)
    call('/cart/clear.js', {})
    for vid, qty in lines:
        call('/cart/add.js', {'items': [{'id': vid, 'quantity': qty}]})
    r = call('/cart/update.js', {'updates': {}, 'sections': 'cart-drawer-section', 'sections_url': '/'})
    page = call('/cart/update.js', {'updates': {}, 'sections': CART_PAGE_SECTION, 'sections_url': '/cart'})
    r['sections'].update(page['sections'])
    json.dump(r, open(os.path.join(OUT, name + '.json'), 'w'))
    print(name, r['item_count'], r['total_price'])


def main():
    os.makedirs(OUT, exist_ok=True)
    pages = [l.strip() for l in open(os.path.join(ROOT, 'tools', 'pages.txt')) if l.startswith('/products/')]
    variants = []
    for p in pages:
        product = call(p + '.js')
        variants += [v['id'] for v in product['variants']]
    snapshot('empty', [])
    for vid in variants:
        snapshot(str(vid), [(vid, 1)])
    snapshot(f'{variants[1]}-q2', [(variants[1], 2)])
    snapshot('pair', [(variants[1], 1), (variants[-1], 1)])
    call('/cart/clear.js', {})


if __name__ == '__main__':
    main()
