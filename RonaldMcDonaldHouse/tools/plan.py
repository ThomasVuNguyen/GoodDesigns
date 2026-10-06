"""Step 1: list every asset URL the captured page needs and where it will live locally (writes tools/assets-plan.json)."""
import re, json, hashlib, html, os
from urllib.parse import urlsplit, urljoin
ORIGIN='https://ronaldmcdonaldhouse.org'
here=os.path.dirname(os.path.abspath(__file__)); root=os.path.dirname(here)
def local_path(url):
    u=urlsplit(url); p=u.path
    if p.startswith('/-/media/'): rel='media/'+p[len('/-/media/'):]
    elif p.lower().startswith('/content/'): rel='site/'+p[len('/content/'):]
    elif p.startswith('/layouts/'): rel='site/layouts/'+p[len('/layouts/'):]
    else: raise Exception(p)
    if u.query:
        b,e=os.path.splitext(rel); rel=f"{b}--{hashlib.md5(u.query.encode()).hexdigest()[:8]}{e}"
    return 'assets/'+rel
src=open(os.path.join(root,'source.html')).read()
urls={}
for m in re.finditer(r'(?:src|href|srcset|poster|data-src)="([^"]+)"',src):
    for part in re.split(r',\s+(?=/|https?:)',html.unescape(m.group(1))):
        u=part.split(' ')[0]
        if re.match(r'(https://ronaldmcdonaldhouse\.org)?/(-/media|content|Content)/',u) and not u.endswith('/'):
            if re.search(r'\.(png|jpe?g|gif|svg|webp|css|js|woff2?|ico)(\?|$)',u,re.I): urls[urljoin(ORIGIN,u)]=1
css_url=ORIGIN+'/content/dest/sxa/css/rmh-sxa.min.css'
css=open('/private/tmp/claude-501/-Users-thomasthemaker-Development-ComfySpace-GoodDesigns/f9f6512f-b91b-4cdb-a67f-b507a196d996/scratchpad/w/cap/res/ronaldmcdonaldhouse.org/content/dest/sxa/css/rmh-sxa.min.css').read()
for m in re.finditer(r'url\(([^)]+)\)',css):
    r=m.group(1).strip('\'"')
    if r.startswith(('data:','#')): continue
    urls[urljoin(css_url,r.split('#')[0] if '.svg#' in r else r)]=1
urls.pop(ORIGIN+'/layouts/system/VisitorIdentification.js',None)
plan={u:local_path(u) for u in urls}
json.dump(plan,open(os.path.join(here,'assets-plan.json'),'w'),indent=1)
print(len(plan)); print('\n'.join(plan))
