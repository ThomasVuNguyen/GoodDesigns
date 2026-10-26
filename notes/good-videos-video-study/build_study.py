#!/usr/bin/env python3
"""Build a navigable frame and transcript study for selected gallery videos."""

import concurrent.futures
import csv
import html
import json
import re
import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


HERE = Path(__file__).resolve().parent
REPO = HERE.parents[1]
VIDEOS = json.loads((REPO / "gallery/videos.json").read_text())["videos"]
NUMBERS = [*range(1, 14), 16, 17, 28, *range(29, 34)]
TAG = re.compile(r"<[^>]*>")
TIMING = re.compile(r"^((?:\d\d:)?\d\d:\d\d\.\d+)\s+-->")
SCENE_LOG = re.compile(r"n:\s*(\d+)\s+pts:\s*\d+\s+pts_time:([\d.]+)")


def stem(number):
    return f"{number:02d}-{VIDEOS[number - 1]['slug']}"


def source_file(number):
    base = HERE / "source" / stem(number)
    return next((p for ext in ("mp4", "mkv", "webm") if (p := base.with_suffix("." + ext)).exists()), None)


def probe(path):
    p = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration,size:stream=codec_type,width,height,avg_frame_rate", "-of", "json", str(path)],
        capture_output=True, text=True, check=True,
    )
    data = json.loads(p.stdout)
    video = next(s for s in data["streams"] if s["codec_type"] == "video")
    return {"duration": float(data["format"]["duration"]), "bytes": int(data["format"]["size"]),
            "width": video["width"], "height": video["height"], "fps": video["avg_frame_rate"]}


def run_ffmpeg(command):
    p = subprocess.run(command, capture_output=True, text=True)
    if p.returncode:
        raise RuntimeError(p.stderr[-1800:])
    return p.stderr


def extract_frames(number, source):
    base = HERE / "frames" / stem(number)
    seconds = base / "seconds"
    scenes = base / "scene-cuts"
    seconds.mkdir(parents=True, exist_ok=True)
    scenes.mkdir(parents=True, exist_ok=True)
    if not (base / ".seconds-done").exists():
        run_ffmpeg(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
                    "-vf", "fps=1:start_time=0,scale='min(1280,iw)':-2", "-q:v", "4",
                    str(seconds / "second-%05d.jpg")])
        (base / ".seconds-done").touch()
    if not (base / ".scenes-done").exists():
        log = run_ffmpeg(["ffmpeg", "-hide_banner", "-loglevel", "info", "-y", "-i", str(source),
                          "-vf", "select='gt(scene,0.30)',showinfo,scale='min(1280,iw)':-2",
                          "-fps_mode", "vfr", "-q:v", "4", str(scenes / "scene-%05d.jpg")])
        matches = [(int(n) + 1, float(t)) for n, t in SCENE_LOG.findall(log)]
        with (base / "scene-cuts.csv").open("w", newline="") as f:
            w = csv.writer(f)
            w.writerow(["filename", "time_seconds"])
            for n, t in matches:
                w.writerow([f"scene-{n:05d}.jpg", f"{t:.3f}"])
        (base / ".scenes-done").touch()
    return len(list(seconds.glob("second-*.jpg"))), len(list(scenes.glob("scene-*.jpg")))


def format_time(seconds):
    seconds = int(seconds)
    return f"{seconds // 60:02d}:{seconds % 60:02d}"


def make_overview(number):
    name = stem(number)
    out = HERE / "overviews" / f"{name}.jpg"
    out.parent.mkdir(exist_ok=True)
    if out.exists():
        return
    frames = sorted((HERE / "frames" / name / "seconds").glob("second-*.jpg"))
    chosen = frames[::10]
    if not chosen:
        return
    thumb_w, thumb_h, label_h, cols = 220, 124, 24, 8
    rows = (len(chosen) + cols - 1) // cols
    canvas = Image.new("RGB", (cols * thumb_w, rows * (thumb_h + label_h)), "#111111")
    draw = ImageDraw.Draw(canvas)
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 15)
    except OSError:
        font = ImageFont.load_default()
    for i, path in enumerate(chosen):
        x, y = (i % cols) * thumb_w, (i // cols) * (thumb_h + label_h)
        with Image.open(path) as im:
            canvas.paste(ImageOps.fit(im.convert("RGB"), (thumb_w, thumb_h)), (x, y))
        second = int(path.stem.split("-")[-1]) - 1
        draw.text((x + 7, y + thumb_h + 3), format_time(second), fill="white", font=font)
    canvas.save(out, quality=85, optimize=True)


def transcript(number):
    name = stem(number)
    folder = HERE / "transcripts"
    candidates = [folder / f"{name}.en.vtt", folder / f"{name}.ja.vtt", folder / f"{name}.vtt"]
    vtt = next((p for p in candidates if p.exists()), None)
    if not vtt:
        return None
    lines = []
    previous = []
    for block in re.split(r"\n\s*\n", vtt.read_text().replace("\r\n", "\n")):
        raw = block.splitlines()
        pos = next((i for i, line in enumerate(raw) if TIMING.match(line)), None)
        if pos is None:
            continue
        timestamp = TIMING.match(raw[pos]).group(1).split(".")[0]
        if timestamp.count(":") == 1:
            timestamp = "00:" + timestamp
        current = [html.unescape(TAG.sub("", line)).strip() for line in raw[pos + 1:]]
        current = [line for line in current if line]
        if vtt.name.endswith(".en.vtt") and number in (1, 7, 9):
            current = [" ".join(current)] if current else []
        overlap = 0
        for n in range(min(len(previous), len(current)), 0, -1):
            if previous[-n:] == current[:n]:
                overlap = n
                break
        for line in current[overlap:]:
            lines.append(f"[{timestamp}] {line}")
        previous = current
    out = folder / f"{name}.transcript.txt"
    out.write_text("\n".join(lines).strip() + "\n")
    if vtt.name.endswith(".ja.vtt"):
        kind = "Japanese speech recognition"
    elif vtt.name.endswith(".en.vtt"):
        kind = "creator captions" if number in (1, 7, 9, 29, 30, 32, 33) else "YouTube auto captions"
    else:
        kind = "local speech recognition"
    return {"vtt": str(vtt.relative_to(HERE)), "text": str(out.relative_to(HERE)), "kind": kind}


def write_pages(items):
    def document(title, content, gallery=False):
        gallery_css = '<link rel="stylesheet" href="../../gallery/app.css">' if gallery else ''
        main_class = 'gallery' if gallery else 'shell'
        return (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
                f'<meta name="viewport" content="width=device-width, initial-scale=1">'
                f'<title>{html.escape(title)} · GoodDesigns</title>'
                f'<meta name="description" content="A frame and script study of videos worth watching.">'
                f'{gallery_css}<link rel="stylesheet" href="study.css"><script src="study.js" defer></script>'
                f'</head><body><main class="{main_class}">{content}'
                f'<footer class="foot">For design study only. Trademarks, copy and imagery belong to their owners.</footer>'
                f'</main></body></html>')

    def topbar():
        return ('<header class="topbar"><a class="brand" href="index.html#videos" '
                'aria-label="GoodDesigns home">Good<span>Designs</span></a>'
                '<nav class="topnav" aria-label="Main navigation">'
                '<a href="index.html#videos">Back to videos</a>'
                '</nav></header>')

    def frame_card(path, seconds):
        label = format_time(seconds)
        return (f'<figure class="frame-card"><a href="{path}" target="_blank" rel="noopener" '
                f'aria-label="Open frame at {label}"><img loading="lazy" src="{path}" alt="Frame at {label}"></a>'
                f'<figcaption><span class="frame-label">{label}</span><button class="frame-play" type="button" '
                f'data-seek="{seconds:.3f}" aria-label="Play video at {label}">Play frame</button></figcaption></figure>')

    thumbs = HERE / "thumbs"
    thumbs.mkdir(exist_ok=True)
    for item in items:
        name = stem(item["number"])
        number = item["number"]
        title = html.escape(item["title"])
        author = html.escape(item["author"])
        thumb = f'thumbs/{item["slug"]}.jpg'
        shutil.copy2(REPO / "gallery/thumbs/videos" / f'{item["slug"]}.jpg', HERE / thumb)
        page = f"{name}.html"

        player = (f'<div id="study-video" class="youtube-player" data-youtube-id="{html.escape(item["slug"].removeprefix("youtube-"))}"></div>'
                  if number >= 29 else
                  f'<video id="study-video" controls preload="metadata" poster="{thumb}" src="source/{name}.mp4"></video>')
        detail = [topbar(),
                  f'<div class="detail-head"><div><h1>{title}</h1><p>{author} · {format_time(item["duration"])} film</p></div>'
                  f'<a class="source-link" href="{html.escape(item["url"])}" target="_blank" rel="noopener">Watch original ↗</a></div>',
                  '<div class="workspace"><div class="player-card">',
                  player,
                  '</div>']

        tr = item.get("transcript")
        if tr:
            detail.append(
                f'<aside class="transcript" aria-label="Transcript"><div class="transcript-head">'
                f'<h2>Transcript</h2><a href="{tr["text"]}" download>Download text</a></div>'
                f'<p class="transcript-kind">{html.escape(tr["kind"])} · <a href="{tr["vtt"]}">Timed captions</a></p>'
                '<div class="transcript-lines">')
            for line in (HERE / tr["text"]).read_text().splitlines():
                match = re.match(r"^\[(\d\d):(\d\d):(\d\d)\]\s*(.*)", line)
                if not match:
                    continue
                hour, minute, second, words = match.groups()
                at = int(hour) * 3600 + int(minute) * 60 + int(second)
                label = f"{hour}:{minute}:{second}" if int(hour) else f"{minute}:{second}"
                detail.append(
                    f'<button class="transcript-line" type="button" data-time="{at}" data-seek="{at}" '
                    f'aria-label="Play at {label}: {html.escape(words)}">'
                    f'<span class="transcript-time">{label}</span>'
                    f'<span class="transcript-words">{html.escape(words)}</span></button>')
            detail.append('</div></aside>')
        else:
            detail.append('<aside class="transcript"><div class="transcript-head"><h2>Transcript</h2></div><p>Transcript pending.</p></aside>')
        detail.append('</div>')

        detail.append(
            '<section class="study-section" aria-labelledby="frames-title"><div class="frame-tools">'
            '<h2 id="frames-title">Frame library</h2><div class="frame-tabs" role="tablist" aria-label="Frame collection">'
            f'<button type="button" id="tab-scenes" role="tab" data-tab="scenes" aria-controls="panel-scenes" aria-selected="true">'
            f'Scene changes <span>{item["scene_frames"]}</span></button>'
            f'<button type="button" id="tab-seconds" role="tab" data-tab="seconds" aria-controls="panel-seconds" aria-selected="false">'
            f'Every second <span>{item["second_frames"]}</span></button></div></div>'
            '<p>Hover over a frame to preview it larger. Select a frame for full size, or play from its timestamp.</p>')
        detail.append('<div class="frame-grid" id="panel-scenes" role="tabpanel" aria-labelledby="tab-scenes">')
        with (HERE / "frames" / name / "scene-cuts.csv").open() as f:
            for row in csv.DictReader(f):
                path = f"frames/{name}/scene-cuts/{row['filename']}"
                detail.append(frame_card(path, float(row["time_seconds"])))
        detail.append('</div><div class="frame-grid" id="panel-seconds" role="tabpanel" aria-labelledby="tab-seconds" hidden>')
        for n in range(1, item["second_frames"] + 1):
            path = f"frames/{name}/seconds/second-{n:05d}.jpg"
            detail.append(frame_card(path, n - 1))
        detail.append('</div></section>')
        (HERE / page).write_text(document(item["title"], ''.join(detail)))

    site_manifest = json.loads((REPO / "gallery/sites.json").read_text())
    site_cards = []
    for site in site_manifest["sites"]:
        slug = html.escape(site["slug"])
        source_url = f'{site_manifest["repo"]}/tree/{site_manifest["branch"]}/{site["folder"]}'
        site_cards.append(
            f'<li class="card"><a class="thumb" href="https://gooddesigns.web.app/#/{slug}" '
            f'aria-label="View {html.escape(site["name"])}"><img src="../../gallery/thumbs/{slug}.jpg" '
            f'alt="{html.escape(site["name"])} preview" loading="lazy" width="1200" height="750"></a>'
            f'<div class="meta"><h2><a href="https://gooddesigns.web.app/#/{slug}">{html.escape(site["name"])}</a></h2>'
            f'<a class="src" href="{html.escape(source_url)}" target="_blank" rel="noopener">Source ↗</a></div>'
            f'<p class="tag">{html.escape(site["tagline"])}</p></li>')

    available = {item["slug"]: item for item in items}
    video_cards = []
    for video in VIDEOS:
        slug = video["slug"]
        title = html.escape(video["title"])
        thumb = f'thumbs/{slug}.jpg'
        shutil.copy2(REPO / "gallery/thumbs/videos" / f'{slug}.jpg', HERE / thumb)
        breakdown = available.get(slug)
        button = (f'<a class="breakdown-button" href="{stem(breakdown["number"])}.html">Breakdown</a>'
                  if breakdown else '')
        video_cards.append(
            f'<li class="card card--video"><a class="thumb" href="https://gooddesigns.web.app/#/videos/{slug}" '
            f'aria-label="Play {title}"><img src="{thumb}" alt="" loading="lazy" width="1280" height="720">'
            '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22">'
            '<path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span></a>'
            f'<div class="meta"><h2><a href="https://gooddesigns.web.app/#/videos/{slug}">{title}</a></h2>'
            f'<a class="src" href="{html.escape(video["url"])}" target="_blank" rel="noopener">Source ↗</a></div>'
            f'<p class="tag">{html.escape(video["author"])}</p>{button}</li>')

    index = (
        '<header class="masthead"><h1>Good<span>Designs</span></h1>'
        '<p>Recreations of sites worth studying, and videos worth watching. Open one to explore it, or jump to its source.</p>'
        '<nav class="sections" aria-label="Sections">'
        f'<a href="#sites">Sites <span>{len(site_manifest["sites"])}</span></a>'
        f'<a href="#videos">Videos <span>{len(VIDEOS)}</span></a></nav></header>'
        '<section id="sites" class="section" aria-labelledby="sites-title">'
        '<h2 class="section-title" id="sites-title">Good <em>Sites</em></h2>'
        '<ul class="grid" aria-label="Sites">' + ''.join(site_cards) + '</ul></section>'
        '<section id="videos" class="section" aria-labelledby="videos-title">'
        '<h2 class="section-title" id="videos-title">Good <em>Videos</em></h2>'
        '<ul class="grid" aria-label="Videos">' + ''.join(video_cards) + '</ul></section>')
    (HERE / "index.html").write_text(document("Gallery review", index, gallery=True))


def one(number):
    video = VIDEOS[number - 1]
    source = source_file(number)
    if not source:
        raise FileNotFoundError(f"Missing source for #{number}")
    info = probe(source)
    seconds, scenes = extract_frames(number, source)
    make_overview(number)
    return {"number": number, "slug": video["slug"], "title": video["title"],
            "author": video["author"], "url": video["url"], **info,
            "second_frames": seconds, "scene_frames": scenes, "transcript": transcript(number)}


if __name__ == "__main__":
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        items = sorted(pool.map(one, NUMBERS), key=lambda item: item["number"])
    (HERE / "manifest.json").write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n")
    write_pages(items)
    for item in items:
        print(f"#{item['number']:02d}: {item['second_frames']} second frames, {item['scene_frames']} cuts, transcript={bool(item['transcript'])}")
