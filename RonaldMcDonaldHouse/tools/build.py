"""Step 2: turn source.html (captured response) into dist/index.html with local assets and no trackers."""
import re, json, html, os
from urllib.parse import urljoin
ORIGIN='https://ronaldmcdonaldhouse.org'
here=os.path.dirname(os.path.abspath(__file__)); root=os.path.dirname(here); dist=os.path.join(root,'dist')
plan=json.load(open(os.path.join(here,'assets-plan.json')))
have={u:l for u,l in plan.items() if os.path.exists(os.path.join(dist,l))}
def rewrite_text(s, escaped=False):
    for u in sorted(have,key=len,reverse=True):
        l='/'+have[u]
        for a in (u, u[len(ORIGIN):]):
            for v in ({a, html.escape(a,quote=False)} if escaped else {a}):
                s=s.replace(v,l)
    return s
src=open(os.path.join(root,'source.html')).read()
# remove tracking / platform scripts
src=re.sub(r'<script[^>]*src="https://static\.cloudflareinsights[^>]*></script>','',src)
src=re.sub(r'<script[^>]*src="/layouts/system/VisitorIdentification\.js"[^>]*></script>','',src)
src=re.sub(r'<noscript>.*?googletagmanager.*?</noscript>','',src,flags=re.S)
def drop(m):
    b=m.group(1)
    if 'gdprCheck' in b: return m.group(0)
    return '' if re.search(r'googletagmanager|dataLayer|__CF\$cv|challenge-platform|ttq|fbq',b) else m.group(0)
src=re.sub(r'<script(?![^>]*src)[^>]*>(.*?)</script>',drop,src,flags=re.S)
src=rewrite_text(src,True)
src=re.sub(r'<link rel="canonical"[^>]*>','',src)
# internal page links keep pointing at the public site
src=re.sub(r'(href=")(/(?!assets/)[^"/][^"]*)"',lambda m:f'{m.group(1)}{ORIGIN}{m.group(2)}"',src)
open(os.path.join(dist,'index.html'),'w').write(src)
# css
css_p=os.path.join(dist,have[ORIGIN+'/content/dest/sxa/css/rmh-sxa.min.css'])
css=open(css_p).read()
base=ORIGIN+'/content/dest/sxa/css/rmh-sxa.min.css'
def cssurl(m):
    r=m.group(1).strip('\'"')
    if r.startswith(('data:','#')): return m.group(0)
    full=urljoin(base,r)
    key=full.split('#')[0] if '.svg#' not in full else full
    for k in (full,full.split('#')[0]):
        if k in have: return f'url(/{have[k]})'
    return m.group(0)
css=re.sub(r'url\(([^)]+)\)',cssurl,css)
open(css_p,'w').write(css)
left=[u for u in re.findall(r'https?://[^"\'\s)<>]+',src) if 'ronaldmcdonaldhouse.org' in u and u.count('/')>3 and '/assets/' not in u]
print('remaining absolute origin urls in html:',len(left)); print(*sorted(set(left))[:40],sep='\n')
print('scripts left:',re.findall(r'<script[^>]*src="[^"]*"',src))
