#!/usr/bin/env python3
"""Rebuild Town/dist/index.html from a saved copy of the reference page's server-rendered HTML.

Inputs (kept outside the repo because they are third-party material):
  TOWN_SRC/index.html   server-rendered markup fetched from the reference URL
  TOWN_SRC/css/*.css    the reference stylesheets

The build keeps the reference's layout, class names, fonts and imagery. Images, fonts and logos are linked
straight from https://www.town.com (its CDN allows cross-origin use), so no third-party files are copied
into this repository. Long descriptive copy is replaced with original stand-in wording, and the client-rendered
widgets (profile card, floating prompt bar) are authored in app.js.
"""
import re, html, urllib.parse, os, json, sys, time
V = str(int(time.time()))

SRC = os.environ.get('TOWN_SRC', '/tmp/town')
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist')
OUT = os.path.abspath(OUT)
h = open(f'{SRC}/index.html').read()
head, body = h.split('<body', 1)
body = '<body' + body
body = re.sub(r'<script\b.*?</script>', '', body, flags=re.S)
body = re.sub(r'<noscript>.*?</noscript>', '', body, flags=re.S)

# ---------- images: link to the reference CDN
REMOTE = 'https://www.town.com'
def img_url(m):
    u = html.unescape(m.group(0))
    if u.startswith('/_next/image'):
        u = urllib.parse.parse_qs(urllib.parse.urlparse(u).query)['url'][0]
    return REMOTE + u.split('?')[0]
body = re.sub(r'(?<![\w./])/_next/image\?url=[^\s"]+?(?=\s\d?x?|,|"|$)', img_url, body)
body = re.sub(r'(?<![\w./])/(?:images|integrations|api/pipedream-integrations)/[^\s"\',)]*?(?:\.(?:png|jpe?g|webp|svg)|/icon)(?:\?dpl=[\w_]+)?(?=[\s"\',)])', img_url, body)
# collapse repeated srcSet candidates (all point at one file now)
body = re.sub(r'\s(?:srcSet|srcset)="[^"]*"', '', body)
body = re.sub(r'\ssizes="[^"]*"', '', body)

# ---------- original stand-in text for long descriptions
REWRITES = [
    ('“Town completely eliminated', '“I stopped explaining my routines to it. It simply picked them up.”'),
    (' wrote down what she needed', ' listed everything she needed to finish\xa0today.'),
    ('Send an email to my vendors', 'Email the vendors about the quarter-end schedule'),
    ('You need to decide if you want to join Figma', 'You still need to confirm whether you are joining the design panel'),
    ('Xolo rescheduled', 'Needs input: Sam moved your dinner with Priya to Tuesday night after checking with her assistant'),
    ('“What used to take me hours', '“Work that ate my afternoons now takes a few minutes, and it comes out sharper.”'),
    ('Start with a Town-made Routine', 'Start from a ready-made Routine, or describe your own.'),
    ('Watches for new emails', 'Sorts incoming mail into labels, drafts replies when one is clearly needed, and helps you find a time to meet.'),
    ('Detects unsolicited recruiter', 'Spots cold pitches from recruiters and vendors, tags them, and can draft a polite pass for you to review.'),
    ('Analyzes your week ahead', 'Reviews the week ahead every Sunday night and suggests ways to group meetings and protect focus time.'),
    ('Researches upcoming meetings', 'Looks into the meetings coming up, skips the low-value ones, and sends a short briefing you can also keep as a doc.'),
    ('When labeled emails arrive', 'When mail from someone new arrives, it researches the person and their company and returns a tidy profile for prep.'),
    ('A daily email with your schedule', 'A daily email covering your schedule, anything urgent, and news on the topics you follow, with an audio version too.'),
    ('Scans the web for news, product', 'Watches the web for competitor news and launches, then delivers a structured briefing on your chosen schedule.'),
    ('Sends you a concise digest', 'Gathers your newsletters into one short digest delivered when you want it.'),
    ('It aggregates development', 'Rolls up engineering activity so you can see what shipped, what merged, and what is stuck without digging.'),
    ('On your chosen weekly schedule', 'Each week, suggests people worth reaching out to whom you have not spoken with in a while, with talking points.'),
    ('Scans inbound email for sales', 'Looks through incoming mail for promising leads, logs the good ones in a sheet, and proposes next steps.'),
    ('Monitors a Slack channel', 'Watches a chat channel for new signups and posts a short background summary on each person and company.'),
    ('Follow up with Marcus', 'Follow up with Dana about the contract edits'),
    ('Send Lena the updated deck', 'Send Ivo the revised deck before the board call'),
    (" work in the team's HubSpot", ' could use the team’s CRM and chat tools right away, and already knew how the team writes a deal recap.'),
    ('Send a birthday or work', 'Post a birthday or work-anniversary note'),
    ('Townies work with over 50', 'Townies plug into dozens of tools, with more added often.'),
    ("Town doesn't share it", 'It is never shared, sold, or used for training.'),
    ("Town's security controls", 'Controls are independently audited to enterprise standards.'),
    ('Town never sends emails', 'Nothing goes out, no email or invite, until you approve it. You choose what happens automatically.'),
    ('Your data is not used to train', 'Your data stays out of model training unless you opt in, whether with us or with our providers.'),
    ('Your data is encrypted', 'Everything is encrypted in transit and at rest, and hosted in the US on managed cloud infrastructure.'),
]
INTEGRATION_TEMPLATES = [
    'Connect {n} so your assistant can look things up and keep records tidy.',
    'Give your assistant access to {n} to read, search, and update what matters.',
    'Let the assistant work inside {n} on your behalf, with your approval.',
    'Bring {n} into your workflow so routine chores stop landing on you.',
]
PEOPLE = {
    'Athena Shiravi': 'Mara Ellison', 'Investor, Avra': 'Founder, Northfield',
    'Head of Talent, Uncork Capital': 'Head of Ops, Larkspur Labs',
}
raw_nodes = list(re.finditer(r'>([^<>]{2,})<', body))
out, last, prev_short, ti = [], 0, '', 0
in_grid = False
for m in raw_nodes:
    t = html.unescape(m.group(1)); rep = None
    if t.strip() == 'Gmail': in_grid = True
    if in_grid and len(t) >= 45 and not any(t.startswith(p) for p, _ in REWRITES):
        rep = INTEGRATION_TEMPLATES[ti % len(INTEGRATION_TEMPLATES)].format(n=prev_short); ti += 1
    else:
        for p, r in REWRITES:
            if t.startswith(p): rep = r; break
    if rep is None:
        for k, v in PEOPLE.items():
            if t.strip() == k: rep = t.replace(k, v)
        if t.strip().startswith('Adriana Roche and Pearl'): rep = t.replace('Adriana Roche', 'Jonah Reyes')
    if in_grid and len(t) < 45 and t.strip(): prev_short = t.strip()
    if rep is not None:
        out.append(body[last:m.start(1)]); out.append(html.escape(rep, quote=False)); last = m.end(1)
out.append(body[last:]); body = ''.join(out)

# ---------- outbound routes -> public destinations
def route(m):
    p = m.group(1)
    return 'href="#top"' if p == '/' else f'href="https://www.town.com{p}"'
body = re.sub(r'href="(/[a-z][^"]*|/)"', route, body)

# ---------- CSS: keep the reference rules, load its fonts from the CDN
D = OUT + '/assets/css'; os.makedirs(D, exist_ok=True)
order = re.findall(r'href="/_next/static/immutable/chunks/([^"]+\.css)"', head)
for f in order:
    c = open(f'{SRC}/css/{f}').read()
    c = re.sub(r'url\(\.\./media/([^)]+)\)', rf'url({REMOTE}/_next/static/immutable/media/\1)', c)
    c = re.sub(r'url\(/fonts/([^)]+)\)', rf'url({REMOTE}/fonts/\1)', c)
    open(f'{D}/{f}', 'w').write(c)
links = ''.join(f'<link rel="stylesheet" href="./assets/css/{f}"/>' for f in order)
htmlattrs = re.sub(r'\sdata-dpl-id="[^"]*"', '', re.search(r'<html([^>]*)>', head).group(1))
doc = (f'<!DOCTYPE html>\n<html{htmlattrs}><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>'
       f'<title>Town | The AI Assistant That Does the Work</title>{links}<link rel="stylesheet" href="./overrides.css?v={V}"/></head>\n')
doc += body.replace('</body>', f'<script src="./app.js?v={V}"></script></body>')
if not doc.rstrip().endswith('</html>'): doc = doc.rstrip() + '</html>'
open(OUT + '/index.html', 'w').write(doc)
print('wrote', len(doc), 'bytes; long-text integrations rewritten:', ti)
