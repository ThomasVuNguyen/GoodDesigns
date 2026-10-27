"""Publish the local frame study as compact, static gallery breakdowns.

The source videos, full-resolution frames, and rendered local pages live in
notes/good-videos-video-study/ and stay ignored by Git. The resulting gallery
assets are committed so CI can deploy them without running media tools.
"""

from concurrent.futures import ThreadPoolExecutor
import json
import os
from pathlib import Path
import re
import shutil
import subprocess


ROOT = Path(__file__).resolve().parents[1]
STUDY = ROOT / "notes/good-videos-video-study"
DEST = ROOT / "gallery/breakdowns"
ITEMS = json.loads((STUDY / "manifest.json").read_text())


def publish_frame(source):
    relative = source.relative_to(STUDY)
    target = (DEST / relative).with_suffix(".webp")
    if target.exists() and target.stat().st_size:
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    temporary = target.with_name(target.stem + ".tmp.webp")
    long_video = next(item["number"] >= 29 and item["duration"] > 600 for item in ITEMS
                      if relative.parts[1] == f"{item['number']:02d}-{item['slug']}")
    subprocess.run(
        ["magick", str(source), "-resize", "720x405>" if long_video else "960x540>", "-quality", "58" if long_video else "68",
         "-define", "webp:method=4", str(temporary)],
        check=True,
    )
    os.replace(temporary, target)


def publish_video(item):
    if item["number"] >= 29 and item["duration"] > 600:
        return  # Long videos use the original YouTube player on their breakdown pages.
    name = f"{item['number']:02d}-{item['slug']}"
    source = STUDY / "source" / f"{name}.mp4"
    target = DEST / "source" / f"{name}.mp4"
    if target.exists() and target.stat().st_size:
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    temporary = target.with_name(target.stem + ".tmp.mp4")
    subprocess.run(
        ["ffmpeg", "-hide_banner", "-loglevel", "error", "-nostdin", "-y",
         "-i", str(source), "-vf", "scale=960:-2:flags=lanczos,fps=24",
         "-c:v", "libx264", "-preset", "veryfast", "-crf", "30",
         "-maxrate", "1500k", "-bufsize", "3000k", "-c:a", "aac",
         "-b:a", "80k", "-movflags", "+faststart", str(temporary)],
        check=True,
    )
    os.replace(temporary, target)


def publish_page(item):
    name = f"{item['number']:02d}-{item['slug']}"
    page = (STUDY / f"{name}.html").read_text()
    page = page.replace('href="index.html#videos"', 'href="../index.html#videos"')
    page = re.sub(r'(frames/[^"<>]+)\.jpg', r'\1.webp', page)
    (DEST / f"{name}.html").write_text(page)
    shutil.copy2(STUDY / "thumbs" / f"{item['slug']}.jpg", DEST / "thumbs" / f"{item['slug']}.jpg")
    transcript = item.get("transcript")
    if transcript:
        for key in ("vtt", "text"):
            source = STUDY / transcript[key]
            target = DEST / transcript[key]
            target.parent.mkdir(parents=True, exist_ok=True)
            if source.suffix == ".vtt":
                target.write_text("\n".join(line.rstrip() for line in source.read_text().splitlines()).rstrip() + "\n")
            else:
                shutil.copy2(source, target)


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    (DEST / "thumbs").mkdir(exist_ok=True)
    shutil.copy2(STUDY / "study.css", DEST / "study.css")
    shutil.copy2(STUDY / "study.js", DEST / "study.js")
    for item in ITEMS:
        publish_page(item)

    frames = [source for item in ITEMS
              for source in (STUDY / "frames" / f"{item['number']:02d}-{item['slug']}").rglob("*.jpg")]
    with ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(publish_frame, frames))
    print(f"Published {len(frames)} WebP frames")

    with ThreadPoolExecutor(max_workers=3) as pool:
        list(pool.map(publish_video, ITEMS))
    print(f"Published {len(ITEMS)} breakdown pages and short-video copies")


if __name__ == "__main__":
    main()
