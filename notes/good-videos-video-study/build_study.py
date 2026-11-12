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
NUMBERS = [*range(1, 14), 16, 17, 28, *range(29, 36), *range(41, 48)]
# Seconds between library frames. Short clips are sampled more densely than one per second.
FRAME_STEP = {47: 0.25}
CURATED_FRAMES = {
    # Apple MacBook Pro M6: selected by reviewing the one-second contact sheet.
    # The cut detector misses the film's shifting masks and typography.
    34: [0, 2, 4, 6, 7, 8, 10, 11, 14, 16, 17, 19, 20, 22, 23, 27, 29, 32, 36, 39],
}
SHOT_NOTES = {
    # Google Labs Playground: one shot per camera idea, with its position, lens and move.
    35: {
        0: "Screen POV. A wide lens sits where the laptop is and looks up at her; the arched window frames her head.",
        2: "Same POV. Chat bubbles are composited in screen space, as if the lens is the phone receiving them.",
        5: "High over-the-shoulder onto the laptop, her hair soft in the foreground. First look at the product.",
        6: "Extreme macro on the screen, tilted. The pixel grid and cursor turn the prompt box into texture.",
        10: "Macro along the keyboard at key height. Fingers enter from frame right with very shallow focus.",
        12: "High three-quarter angle across the laptop. The ube latte jar in the foreground ties prop to prompt.",
        14: "Close side profile from below on a wide lens, lit by the window. A reaction beat.",
        15: "Locked-off, symmetrical wide of the brick nook. The mug on the table is the prop the game will reuse.",
        16: "Same lock-off, re-dressed as the game. The match frame is the transformation: nothing moves but the world.",
        18: "Worm's-eye wide from under the desk. Her foot on the desk forces deep perspective toward her knitting.",
        21: "Tabletop height. A yarn ball flies into the lens while the prompt UI floats beside her.",
        22: "Same camera; the wall bursts open into a racetrack. A cartoon cutaway inside the live set.",
        25: "Insert of her real cat on the cat tree, composited in front of the game world.",
        28: "Identical framing, now the illustrated giant-boss cat. Second match-frame transformation.",
        29: "Phone screen fills the frame. Pure gameplay, no room.",
        30: "First-person POV down at the phone in her hands, knitting on her lap.",
        33: "High-angle medium as she eats a sandwich in the hallway. Sets up the next prompt.",
        34: "One-point-perspective hallway, deep and centered, with her at the far end.",
        36: "Same hallway frame turned into a tower-defense lane; olives march along the real floor.",
        40: "Front-on lock-off of the living room as a haunted endless runner, HUD over the plate.",
        43: "Same plate swapped to a western level. The genre changes, the camera does not.",
        46: "Same plate again as a city platformer. Three genres from one locked-off shot.",
        50: "Eye-level, centered medium close-up on the orange sofa, eyes off camera. A thinking beat.",
        54: "Full-screen title card of the game she made. Push-in on the Share button.",
        55: "New character, same screen-POV grammar: phone held to the lens with a share notification.",
        57: "Locked-off centered wide of his room, window light from frame right.",
        58: "Same frame; the wall cracks into voxel blocks and the room starts to break apart.",
        60: "Full transformation into the ocean battle, with pixel-type tagline over the live plate.",
        63: "Glitch transition: RGB pixel smear collapses the image to black.",
        65: "End card. Pixel wordmark and line on black, the type style borrowed from the games.",
    },
    # Kevin Ngo's JavaScript animations: one frame per visual idea, transition or style move.
    41: {
        0: "Opening wide in torn paper and crayon: the girl in her lit window, the Claude spark in the night sky, paper planes climbing toward it.",
        3: "Insert on her notepad. The question appears word by word in hand lettering, her green sleeve entering from frame right.",
        5: "Warm reverse inside her room: yellow wall, pink curtains, her drawing of the spark pinned up. She lifts the folded note to send it.",
        6: "Back to the night sky. Her plane is one of many, each trailing a dashed flight line.",
        8: "Centered character shot. The spark holds her note like a sign, eyes closed, thinking.",
        10: "The answer becomes a list. Each love gets a flat color field and a lowercase caption: a newsprint book with letters floating up, 'words'.",
        11: "'the sea' on pink: the spark rides a newspaper boat over torn-paper waves. Subject and caption keep the same positions card to card.",
        13: "'rain': a cloud cut from newsprint over a green umbrella. Found paper keeps every card in one material.",
        14: "'the stars' breaks the square into a round night sky, with a planet, comet and spiral galaxy around the spark.",
        17: "Every card collapses into one heart collage around the spark, on a background of handwritten-letter texture.",
        19: "The spark folds its reply into a plane and sends it back down, reversing the opening flight.",
        22: "Her hands hold the reply: her own question with 'you' circled in red and a small spark drawn in the corner.",
        23: "Reaction close-up, eyes closed, wide smile. The ink shows through the paper backwards.",
        26: "She pins the note to her window, 'you' still circled, next to her drawing of the spark.",
        27: "The last frame matches the first. She writes again while new planes leave the other windows in town.",
    },
    42: {
        0: "Top-down specimen view of a fly on an orange. Fine cross-hatching and diagonal cream stripes give it the look of a natural-history engraving.",
        2: "Cut to a dark navy diagram: the egg as a thin outline with a dividing nucleus. A small lineage tree sketches itself in the corner.",
        3: "Nuclei multiply into a dotted lattice, and the tree in the corner branches with them.",
        6: "Green bands paint the body plan onto the embryo. Development reads as graphic design, with no labels.",
        7: "Back in warm paper: the larva breaks out of its egg onto fruit flesh drawn as pebble-like cells.",
        8: "The larva grows across the frame in one long diagonal.",
        9: "Pupal stage, back on navy: the adult forms inside the case as spiral clusters of cells.",
        10: "The adult climbs out of the brown pupal case onto the same orange as the first frame, wings still pale.",
        12: "Fly's-eye view: the world through a fisheye circle with faint hexagonal facets. Bananas, a window, a lamp, a spider and a cloud cut past.",
        13: "Inside the head: the brain as a glowing wiring diagram, the second science interlude.",
        14: "Top-down plate of fruit. Colored rings around the peach show the smell the fly is following.",
        15: "A fast top-down flight across the kitchen in two-frame hops: plate, lampshade, rug, tiles, curtain, window.",
        18: "Danger: a hatched shadow sweeps in, and red arcs and an arrow plot the fly's escape.",
        20: "Two flies face to face on the fruit at sunset. The male's wing song is drawn as a fan of lines with a target ring.",
        21: "Courtship as a diagram: pink and yellow looping paths trace the dance around the pair.",
        23: "Night, with tally marks counting days in the sky as she lays a neat row of eggs.",
        24: "A water drop on a leaf works as a lens. The window and sun bend inside it, with the fly at its edge.",
        26: "Back to the navy egg diagram with one dividing nucleus, so the cycle restarts. Signed 'opus 5'.",
    },
    43: {
        0: "Cream paper, one blue dot, one ring. The whole film grows from this mark.",
        1: "Arcs ripple out from the dot like sound waves. The graphic motif doubles as the soundtrack.",
        3: "The ring turns into a porthole onto a riso-printed jellyfish scene.",
        5: "Full-bleed riso scene: a temple bell struck, its rings echoing over halftone water. The pink and yellow inks sit slightly out of register.",
        7: "Montage of things that make sound: record, phone, frogs, bats, wave, a cat in the rain, a bee. Every subject sits on the same center dot.",
        8: "The wave curls around the center point. Each scene is composed around the dot, not around its subject.",
        10: "A Ferris wheel with its hub exactly on the dot, so the cut reads almost like a dissolve.",
        11: "Piano strings from above, curving like ripples. From here the cuts land every six frames.",
        13: "A snowflake at night. Even the quiet subjects are radial.",
        14: "Second pass: the same scenes return with a white ring drawn over them, now cutting every three frames.",
        15: "The cat at the rainy window again, inside the ring.",
        16: "Everything shrinks into a grid of round thumbnails around the dot: the whole montage at once.",
        17: "The thumbnails drain to blue dots and scatter, clearing the page.",
        20: "A pink dot appears and orbits the blue one: a second voice.",
        22: "A riso flower blooms where the two orbits meet.",
        24: "Night version: two ringed dots, blue and pink, circling each other.",
        25: "A sky full of ringed dots, many voices.",
        27: "End card: 'opus 5', a blue and a pink dot, and 'claude' below, all in the same hand lettering.",
    },
    44: {
        0: "Top-down specimen view of a bee on comb, the cells filled with different colors of pollen. The engraved, cross-hatched style of the fruit fly film.",
        1: "The bee drops to bare line work for a beat, showing the drawing underneath.",
        2: "Dark brown interlude: a seed-of-life rosette in thin blue line, geometry the film returns to at the end.",
        4: "The egg as a diagram, nuclei multiplying into a dotted lattice. The fruit fly film's template, recolored for the hive.",
        6: "Green and magenta bands paint the body plan onto the egg.",
        8: "Back in the comb: a curled larva in its cell, a worker leaning in to feed it.",
        10: "The pupa mounted in a wooden specimen frame, flanked by ghosted silhouettes of the stages before and after.",
        11: "Same frame, now holding the grey adult forming inside. One fixed layout works as a slideshow of stages.",
        12: "Emergence from inside the cell: only the mandibles break through the wax cap.",
        13: "Freshly emerged and still grey. A second later she is fully colored, so the color arriving is the bee maturing.",
        15: "Building comb: hexagons drawn first as construction geometry, then filled in as solid wax.",
        17: "The bee heads toward a bright opening, light falling in rays: the first flight out.",
        18: "Bee's-eye view: a sunflower rendered through hexagonal facets in a round vignette.",
        20: "Top-down map of the meadow, the flight path traced between flower patches.",
        21: "Side view of a blossoming apple branch against the sky, the longest-held composition in the film.",
        24: "A round inset diagrams the flower in cross-section as the bee works the blossom.",
        30: "Time-lapse in one held frame: petals drop and the blossoms swell into green apples while the bee keeps visiting.",
        38: "End of the hold: the branch is heavy with ripening fruit.",
        40: "Waggle dance on the dark comb. A red line traces the run and its angle to a small sun icon.",
        42: "The dance decoded: the same angle laid over the meadow map, with distance ticks pointing to the flowers.",
        43: "Two bees face to face, mirrored from above, passing food.",
        45: "Capping honey: amber cells under fine hatching.",
        46: "The hive entrance in a hollow tree at night. Tally marks in the sky count the days.",
        47: "Same framing by day, with more tallies. A locked-off match cut passes time.",
        48: "Inside the hive: a symmetrical one-point view out through the entrance.",
        49: "Push-in to the bee's face, the outside world reflected upside down in its eye.",
        52: "Ends on the seed-of-life geometry, signed 'op'.",
    },
    45: {
        0: "Split screen, same prompt. Left, Sonnet 5: flat silhouettes on blocks of color. Right, Sonnet 5.5: ballpoint and crayon on cream, an eye peering out of a cracked egg.",
        2: "Sonnet 5.5 hatches its character and adds a running caption, '230 million years ago'. The left panel never uses text.",
        5: "The hatchling chases a dragonfly. The right panel gives its character something to want.",
        8: "160 million years ago: teal-striped sauropod legs fill the frame, with the little dinosaur underneath for scale.",
        14: "68 million years ago: a scribbled orange sun with the little dinosaur in front of it.",
        15: "The sun becomes a T. rex eye, a match cut on the circle. The left panel never changes its framing.",
        17: "Both models reach for the same beat, a volcano and a T. rex: a black triangle on the left, a snarling crayon drawing on the right.",
        19: "The busiest frame: T. rex, Triceratops and pterosaurs overlapping in loose ballpoint.",
        25: "A red target ring marks the asteroid before impact.",
        27: "Impact. The right panel shatters into a yellow scribbled starburst; the left goes black with embers.",
        29: "Graphite scribbles fill the sky with ash. The caption ticks to '66 million years ago'.",
        32: "Black crayon sky drips down over an empty white ground. Texture carries the mood instead of color.",
        35: "A small survivor curls up next to a skeleton under a pale moon.",
        39: "Life returns as ferns unfurl, '40 million years ago'.",
        41: "'5 million years ago': a shaggy mammal among the ferns. On the left, a flock of bird silhouettes.",
        43: "'0 million years ago': a robin on a branch, eyeing a worm.",
        44: "Same branch, same worm, the robin swapped for a T. rex. The match cut makes the film's point: birds are dinosaurs.",
        46: "The caption types 'still here.' under an egg in a nest. The film ends on an egg, as it began.",
    },
    46: {
        0: "Opens on the finished picture: a sunrise meadow, the orange block creature, a rainbow pond, and a dip pen at frame right. Signed 'opus 5'.",
        1: "The same picture flips to night, a preview of the middle of the story.",
        3: "Back to a blank page. The pen sets the horizon, with Bézier handles, construction circles and a grid over cross-hatched paper.",
        5: "The body is blocked in as a rectangle and scribbled in with orange-red crayon.",
        7: "Legs, side nubs and closed eyes. A spark is drawn above the head, the construction guides still showing.",
        8: "The eyes open. The character comes alive the moment its eyes are drawn.",
        11: "Cut to the finished night scene. The pen leans in from the top right as a character in its own right.",
        13: "Close on the creature as the pen points at a star, a dandelion clock beside them.",
        15: "The pen connects stars freehand on a hatched navy sky.",
        17: "The constellation turns out to be the creature.",
        18: "A spirograph rose drawn by the pen on teal, a show-off flourish.",
        19: "A Lissajous figure on a blueprint grid, the creature watching from the corner.",
        20: "The creature gets dizzy: spiral eyes.",
        21: "It tips over and a small block falls off.",
        28: "Happy '^ ^' eyes as the pen taps the ground and a sparkle pops.",
        30: "A '> <' squint as the pen pokes the ground beside it. A comic beat between two characters.",
        33: "A gold star pops out of the constellation.",
        37: "Dawn wipes in across the night sky.",
        40: "The pen paints a butterfly and flowers into the grass.",
        41: "Low angle up at the pen as it draws a cloud and birds.",
        47: "The pen signs 'opus 5' on a torn paper scrap while the creature squints.",
        48: "The film closes on its opening picture, so it loops.",
    },
    # Kimi Code tutorial #4: only the first eight seconds, the cold open, sampled every quarter second.
    47: {
        0: "Establishing wide from behind the black spiral-stair railing. A tall, quiet loft with her small at the far desk; only the K mark sits in the corner.",
        1: "Cut to an eye-level medium in warm window light as she writes. 'Build' sets in a light serif in the empty wall above her shoulder.",
        1.75: "'3D' and 'Websites' land, the second word on the red panel at right. Each word takes its own patch of empty wall, so the title wraps around her and never crosses her.",
        2.25: "'With' fills the gap at left. The whole title is set in about a second and a half, word by word.",
        2.75: "A punch-in as she turns the page. The title is already typing itself out letter by letter ('Build 3D' is down to 'B') while 'Kimi Code' arrives low at right by the laptop.",
        3.25: "Cut to a lateral move behind a red pillar, the room empty. 'Kimi [Quick G' types in at left over the KIMI Academy series mark.",
        3.5: "'Kimi Cod [Quick Guide]'. Both lines type at once, each at its own pace.",
        4: "The brackets drop away, leaving a plain two-line series card. A small type edit, timed as its own beat.",
        4.25: "The camera keeps moving while the card holds still; the blurred pillar slides across the frame and sells the depth.",
        4.75: "Cut back to her, now looking straight into the lens. The b-roll ends and she starts talking to you.",
        5.5: "The name label decodes in from glyph noise, still reading 'R0quel', as the small caption 'Hi, I'm Raquel' appears below.",
        6.25: "It settles to 'Raquel, KIMI Global Team' in the same serif as the title, tying the lower third to the opening type.",
        7.25: "Hard switch to a paper-texture board. Her shot shrinks into a framed card as two AI-built ceramics sites slide in at left.",
        7.75: "The settled layout: two sites stacked at left, her card at right, and the caption 'Both of these websites were built with AI' sets up the tutorial's comparison.",
    },
}
FRAME_COPY = {
    # Tab label and intro for videos with SHOT_NOTES. Others fall back to DEFAULT_FRAME_COPY.
    35: ("Shots and angles", "One frame per shot idea, with where the camera sits and how it moves."),
    47: ("Beats", "One frame per beat of the cold open: each cut, title move and type change."),
}
TRANSCRIPT_KIND = {47: "YouTube auto captions, trimmed to the opening and corrected to the on-screen name"}
DEFAULT_FRAME_COPY = ("Key frames", "One frame per visual idea, with a note on its style, composition or transition.")
# Music-only soundtracks. Whisper returns only hallucinated lines for these, so no transcript is kept.
NO_NARRATION = set(range(41, 47))
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
                    "-vf", f"fps={1 / FRAME_STEP.get(number, 1):g}:start_time=0,scale='min(1280,iw)':-2", "-q:v", "4",
                    str(seconds / "second-%05d.jpg")])
        (base / ".seconds-done").touch()
    if not (base / ".scenes-done").exists():
        try:
            log = run_ffmpeg(["ffmpeg", "-hide_banner", "-loglevel", "info", "-y", "-i", str(source),
                              "-vf", "select='gt(scene,0.30)',showinfo,scale='min(1280,iw)':-2",
                              "-fps_mode", "vfr", "-q:v", "4", str(scenes / "scene-%05d.jpg")])
        except RuntimeError as error:
            # A film with no hard cuts selects no frames, and FFmpeg treats the empty output as an error.
            if "No filtered frames" not in str(error):
                raise
            log = ""
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


def format_frame_time(seconds, step=1):
    """Whole seconds as 00:05; quarter-second frames as 00:05.25."""
    if step >= 1:
        return format_time(seconds)
    return f"{int(seconds) // 60:02d}:{seconds % 60:05.2f}"


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
        second = (int(path.stem.split("-")[-1]) - 1) * FRAME_STEP.get(number, 1)
        draw.text((x + 7, y + thumb_h + 3), format_frame_time(second, FRAME_STEP.get(number, 1)), fill="white", font=font)
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
    if number in TRANSCRIPT_KIND:
        kind = TRANSCRIPT_KIND[number]
    elif vtt.name.endswith(".ja.vtt"):
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

    def frame_card(path, seconds, note=None, step=1):
        label = format_frame_time(seconds, step)
        note = f'<p class="frame-note">{html.escape(note)}</p>' if note else ''

        return (f'<figure class="frame-card"><a href="{path}" target="_blank" rel="noopener" '
                f'aria-label="Open frame at {label}"><img loading="lazy" src="{path}" alt="Frame at {label}"></a>'
                f'<figcaption><span class="frame-label">{label}</span><button class="frame-play" type="button" '
                f'data-seek="{seconds:.3f}" aria-label="Play video at {label}">Play frame</button></figcaption>{note}</figure>')

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
                  if number >= 29 and item["duration"] > 600 else
                  f'<video id="study-video" controls preload="metadata" poster="{thumb}" src="source/{name}.mp4"></video>')
        detail = [topbar(),
                  f'<div class="detail-head"><div><h1>{title}</h1><p>{author} · {format_time(item["duration"])} film</p></div>'
                  f'<a class="source-link" href="{html.escape(item["url"])}" target="_blank" rel="noopener">Watch original ↗</a></div>',
                  '<div class="workspace"><div class="player-card">',
                  player,
                  '</div>']

        note = VIDEOS[number - 1].get("note")
        if note:
            detail.insert(2, f'<p class="study-note">{html.escape(note)}</p>')

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
            missing = 'No narration. The soundtrack is music only.' if number in NO_NARRATION else 'Transcript pending.'
            detail.append(f'<aside class="transcript"><div class="transcript-head"><h2>Transcript</h2></div><p>{missing}</p></aside>')
        detail.append('</div>')

        step = FRAME_STEP.get(number, 1)
        selected = item.get("selected_frames")
        notes = SHOT_NOTES.get(number, {})
        tab_label, note_intro = FRAME_COPY.get(number, DEFAULT_FRAME_COPY)
        grid_class = "frame-grid is-square" if item["width"] == item["height"] else "frame-grid"
        frame_intro = (f'{note_intro} Open a frame at full size or play from its timestamp.'
                       if notes else
                       'Handpicked compositions from the film. Open a frame at full size or play from its timestamp.'
                       if selected else
                       'Hover over a frame to preview it larger. Select a frame for full size, or play from its timestamp.')
        detail.append(
            '<section class="study-section" aria-labelledby="frames-title"><div class="frame-tools">'
            '<h2 id="frames-title">Frame library</h2><div class="frame-tabs" role="tablist" aria-label="Frame collection">'
            f'<button type="button" id="tab-scenes" role="tab" data-tab="scenes" aria-controls="panel-scenes" aria-selected="true">'
            f'{tab_label if notes else "Selected frames" if selected else "Scene changes"} <span>{len(selected) if selected else item["scene_frames"]}</span></button>'
            f'<button type="button" id="tab-seconds" role="tab" data-tab="seconds" aria-controls="panel-seconds" aria-selected="false">'
            f'{"Every second" if step == 1 else "Every quarter second" if step == 0.25 else f"Every {step:g} s"} <span>{item["second_frames"]}</span></button></div></div>'
            f'<p>{frame_intro}</p>')
        detail.append(f'<div class="{grid_class}" id="panel-scenes" role="tabpanel" aria-labelledby="tab-scenes">')
        if selected:
            for second in selected:
                path = f"frames/{name}/seconds/second-{round(second / step) + 1:05d}.jpg"
                detail.append(frame_card(path, second, notes.get(second), step))
        else:
            with (HERE / "frames" / name / "scene-cuts.csv").open() as f:
                for row in csv.DictReader(f):
                    path = f"frames/{name}/scene-cuts/{row['filename']}"
                    detail.append(frame_card(path, float(row["time_seconds"])))
        detail.append(f'</div><div class="{grid_class}" id="panel-seconds" role="tabpanel" aria-labelledby="tab-seconds" hidden>')
        for n in range(1, item["second_frames"] + 1):
            path = f"frames/{name}/seconds/second-{n:05d}.jpg"
            detail.append(frame_card(path, (n - 1) * step, step=step))
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
            "second_frames": seconds, "scene_frames": scenes, "transcript": transcript(number),
            **({"selected_frames": CURATED_FRAMES[number]} if number in CURATED_FRAMES else {}),
            **({"selected_frames": sorted(SHOT_NOTES[number])} if number in SHOT_NOTES else {})}


if __name__ == "__main__":
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        items = sorted(pool.map(one, NUMBERS), key=lambda item: item["number"])
    (HERE / "manifest.json").write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n")
    write_pages(items)
    for item in items:
        print(f"#{item['number']:02d}: {item['second_frames']} second frames, {item['scene_frames']} cuts, transcript={bool(item['transcript'])}")
