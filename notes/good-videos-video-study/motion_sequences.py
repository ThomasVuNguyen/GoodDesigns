"""Motion sequences for films whose movement does not survive one-frame-per-second sampling.

Each sequence is a short run of frames sampled at a fixed rate (its `fps`), with a note on what
moves and how. The build also writes an onion-skin trail per sequence (earlier positions faded,
the last frame solid) and a motion-energy curve: the mean RGB change between consecutive
24 fps frames, downscaled to 96x54. Everything is also written to `motion.md` beside the
frames, so an agent reading the folder gets the motion as text, in order, with timings.
"""

import html
import json
import shutil
import subprocess
from fractions import Fraction

import numpy as np
from PIL import Image

SPARK = "▁▂▃▄▅▆▇█"

MOTION_INTRO = {
    52: ("Most of the film is live action cut on the line reads. The motion design is in the last five seconds: "
         "the title builds word by word behind a jumping runner, then a Chat/Task toggle flips and gives way to the wordmark."),
    53: ("Kozmonot Animation Studio builds the whole film from flat dots on flat color fields. People are dots, a group is a ring "
         "or a fan of dots, and the storyteller is the red one. There is one hard cut in five minutes. Every other scene change "
         "goes through a shape: the camera dives into a dot, a speech bubble or the O of a word, a circle irises open or shut, "
         "or a hand-drawn fire swirls across the frame. Motifs return (the campfire, the amphitheater of listeners, the "
         "speech bubble, the compass), and the ending replays them in reverse."),
}

# Times are seconds in the source. `fps` is the sampling rate inside the sequence. `trail: True` adds an onion-skin image,
# only where the background holds still; across a wipe or a camera move the trail turns to mud.
MOTION = {
    52: [
        {"id": "whip-montage", "start": 24.0, "end": 28.5, "fps": 4,
         "title": "Motion-blurred city montage",
         "tags": ["handheld", "whip", "motion blur", "fast cutting"],
         "text": "Four lines of dialogue in four seconds, each on its own shot of a cyclist or the street. Long shutter smears "
                 "the foreground, so the cuts read as one fast ride through the city rather than separate setups."},
        {"id": "title-build", "start": 54.75, "end": 57.0, "fps": 8,
         "title": "The title builds behind the runner",
         "tags": ["type-on", "word by word", "depth layering"],
         "text": "Over the locked-off street, 'LOOK' snaps on at 55.0 in heavy condensed white caps, with no fade or scale. "
                 "'WHAT', 'YOU' and 'CAN DO.' follow at roughly one word every sixth of a second. The jumping runner stays in "
                 "front of the 'U', so the type sits inside the shot instead of on top of it."},
        {"id": "toggle", "start": 56.9, "end": 58.1, "fps": 12,
         "title": "Chat flips to Task",
         "tags": ["hard cut", "toggle", "slide", "glow"],
         "text": "Hard cut to black with a small segmented control. The white pill starts on 'Chat' and slides right to 'Task' "
                 "in about a sixth of a second, picking up a soft glow as it lands. The control holds still for a beat after."},
        {"id": "wordmark", "start": 57.9, "end": 59.6, "fps": 10,
         "title": "The toggle gives way to the wordmark",
         "tags": ["pop", "shrink", "wipe-on", "fade-in"],
         "text": "The Gemini spark pops in at the left of the toggle while the toggle dims and shrinks away behind it. 'Google "
                 "Gemini' then wipes on left to right from the spark over about two thirds of a second, and the 'Try Tasks for "
                 "free' line fades up underneath."},
    ],
    53: [
        {"id": "bond", "start": 6.0, "end": 10.0, "fps": 6,
         "title": "A dot gathers its people",
         "tags": ["iris-in", "orbit", "burst", "spring"],
         "text": "A peach disc with a red center closes in on itself over about a second until only the red dot is left, like "
                 "an iris shutting on the subject. A thin arc circles the dot once as a wind-up. At 8.0 five colored dots burst "
                 "out from behind it to their places, a ring pulses outward and fades, and the lines to them grow out wobbly and "
                 "straighten as if on springs. Faces arrive last, at 10.25."},
        {"id": "story", "start": 13.75, "end": 16.75, "fps": 6,
         "title": "Pull back through the O",
         "tags": ["zoom-out", "type as frame", "ease-out", "hard cut"],
         "text": "The network doesn't cut away. A lime 'O' sweeps in at huge scale with the network inside its counter, and the "
                 "camera pulls back until 'STORY' sits mid-frame with the red dot as the O's center. Most of that scale change "
                 "happens in the first half second; the word keeps shrinking slowly for two more. Then the film's only hard cut, "
                 "to orange at 16.75."},
        {"id": "type-on", "trail": True, "start": 16.75, "end": 18.75, "fps": 8,
         "title": "A dot writes the line",
         "tags": ["type-on", "cursor", "stagger"],
         "text": "'Stories helped make us who we are' types on line by line, a small red dot running ahead like a cursor. The "
                 "ellipsis is set last, one dot at a time, and those three dots become the next scene."},
        {"id": "portal", "start": 20.0, "end": 23.0, "fps": 8,
         "title": "The ellipsis opens a window",
         "tags": ["push-in", "pan", "zoom-through"],
         "text": "The camera pushes in and drifts right, so the text slides out left while the ellipsis grows. By 21.75 the "
                 "third dot holds a cave painting, and the camera keeps pushing until that dot is the whole frame. A circle is "
                 "the transition, as it is almost everywhere in the film."},
        {"id": "iris-cloud", "start": 24.75, "end": 25.75, "fps": 12,
         "title": "Iris out to the next idea",
         "tags": ["iris-out", "draw-on"],
         "text": "A salmon circle opens from the center over the cave painting and covers the frame in about half a second. A "
                 "yellow cloud outline then draws itself into the clean space."},
        {"id": "mind", "trail": True, "start": 27.0, "end": 29.5, "fps": 6,
         "title": "Dots queue into a mind",
         "tags": ["stream", "grow", "pan"],
         "text": "A red dot enters the cloud, then a row of dots streams in from the left, each entering as the next arrives. "
                 "The outline gains folds with every dot until it reads as a brain, and the row pushes the whole picture right."},
        {"id": "fire-swirl", "start": 29.75, "end": 31.75, "fps": 12,
         "title": "Fire-swirl wipe",
         "tags": ["shape wipe", "swirl", "particle dissolve"],
         "text": "Flame shapes in red and yellow sweep in from the left and cover the frame in about a quarter second. As they "
                 "swirl, purple shows through the gaps with the campfire already in place, and the last scraps of flame drift "
                 "off right as particles. The same wipe comes back at 59.75."},
        {"id": "rings", "trail": True, "start": 31.75, "end": 35.75, "fps": 4,
         "title": "Rings breathe out from the fire",
         "tags": ["radial", "ripple", "loop", "color drift"],
         "text": "Dashed rings expand from the fire one after another while concentric rows of dots drift outward and grow until "
                 "they fill the frame. Over the next ten seconds the dots shift from lavender to pink. Fire drawing people "
                 "together is said with rings alone, no figures."},
        {"id": "vortex", "start": 41.0, "end": 45.75, "fps": 5,
         "title": "The fire becomes a vortex",
         "tags": ["flare", "spiral", "shrink to a point", "color change"],
         "text": "The flame flares into a ball and blows out into a ring of fire between the dashed circles. The rings spiral "
                 "inward while everything shrinks toward the center, down to a speck by 45.0, when the background lightens and "
                 "turns green."},
        {"id": "relight", "trail": True, "start": 45.5, "end": 48.0, "fps": 8,
         "title": "The fire relights",
         "tags": ["drop-in", "overshoot", "settle"],
         "text": "Two logs drop in spinning, the flame pops up taller than its resting height and settles back over about a "
                 "second, and yellow-green dots appear around it."},
        {"id": "bubble", "start": 52.25, "end": 56.0, "fps": 6,
         "title": "Into the speech bubble",
         "tags": ["pop", "push-in", "zoom-through", "accelerate"],
         "text": "A red dot beside the fire grows a tiny speech bubble with an ellipsis in it. Then the camera dives: within a "
                 "quarter second the bubble fills a quarter of the frame, and by 55.75 its cream interior is the background, "
                 "the three dots inside it."},
        {"id": "through-dot", "start": 56.0, "end": 58.75, "fps": 8,
         "title": "Through the red dot",
         "tags": ["pan", "zoom-through", "nested circles"],
         "text": "The three dots slide left past camera like a pan. The next dot carries a tiny fire; it grows as it reaches "
                 "center until its lime core, with the fire and rings of dots, becomes the frame. Each scene is entered "
                 "through a circle in the one before."},
        {"id": "near-far", "trail": True, "start": 60.5, "end": 66.25, "fps": 4,
         "title": "Near and far as scale",
         "tags": ["converge", "scale", "ripple", "slide"],
         "text": "Specks converge into three green dots. One springs up into a huge disc (nearby) while another shrinks to a "
                 "speck that sends out a ripple ring (distant lands). The big disc slides to center and the rest vanish."},
        {"id": "faces", "start": 66.75, "end": 70.25, "fps": 6,
         "title": "Faces pop out of a dot",
         "tags": ["pop", "stagger", "merge", "iris-out"],
         "text": "A dot gets a laughing face, then a second and third dot pop out to its right with tense and amazed faces. They "
                 "squeeze back into one dot, which opens as a purple iris onto the next scene."},
        {"id": "constellation", "start": 72.75, "end": 79.25, "fps": 3,
         "title": "Constellation to world map",
         "tags": ["pull-back", "parallax", "morph"],
         "text": "Dots and lines multiply as the camera pulls back, and big dots pass close to camera, which gives the flat "
                 "network depth. At 78.5 the network rearranges into a world map made of the same dots."},
        {"id": "storyteller", "start": 80.25, "end": 83.5, "fps": 6,
         "title": "The world becomes a storyteller",
         "tags": ["iris-in", "stream", "stack"],
         "text": "The map shrinks inside a purple circle that closes down to a red dot with a purple rim. Purple dots peel off "
                 "that rim in a curving stream and stack into a pyramid beneath it, the red dot left on top."},
        {"id": "hearts", "start": 86.75, "end": 92.75, "fps": 4,
         "title": "The pyramid melts into hearts",
         "tags": ["swirl", "scatter", "morph", "color shift"],
         "text": "The pyramid loosens into a swirl, spreads into a scatter, and turns from purple to red as it goes. The dots "
                 "become hearts and settle into a six-fold pattern, then flip to purple dots for a beat and back to red."},
        {"id": "liquid", "start": 96.5, "end": 99.75, "fps": 6,
         "title": "Dots that move like liquid",
         "tags": ["squash and stretch", "smear", "color shift"],
         "text": "As the dots rearrange, the fast ones stretch into smears and neighbors briefly merge like drops of liquid. It "
                 "is the film's nearest thing to cartoon squash and stretch, and it turns from red to magenta to purple on "
                 "the way."},
        {"id": "amphitheater", "start": 100.25, "end": 106.0, "fps": 4,
         "title": "The amphitheater, then into the bubble",
         "tags": ["settle", "draw-on", "push-in", "unroll"],
         "text": "The dots settle into a fan of listeners under a speaker dot, and red arcs draw in between them like sound "
                 "waves. A small speech bubble pops above the speaker, the camera dives into it, and its outline unrolls off "
                 "the bottom of the frame, leaving the three dots."},
        {"id": "goal", "trail": True, "start": 110.5, "end": 115.0, "fps": 4,
         "title": "A ball with a goal meets an obstacle",
         "tags": ["pop", "slide-in", "roll"],
         "text": "A red ball appears and a thought bubble rises from it in three puffs, showing a flag. A yellow triangle slides "
                 "in from the right. The ball rolls up its side and slides back down."},
        {"id": "seesaw", "trail": True, "start": 115.0, "end": 122.5, "fps": 3,
         "title": "Over the top",
         "tags": ["draw-on", "tilt", "roll", "settle"],
         "text": "A white plank draws itself in along the slope. The ball rides it up, the plank tips over the peak like a "
                 "seesaw, and the ball rolls down the far side to the flag, the resolution, at 122."},
        {"id": "keys", "start": 125.5, "end": 128.75, "fps": 6,
         "title": "The 4 keys badge wipes",
         "tags": ["pop", "scale-up", "shape wipe"],
         "text": "The middle dot becomes a purple '4 keys' badge. It grows past the edges of the frame, and a purple slab with "
                 "a rounded cutout sweeps across, leaving lime for the list."},
        {"id": "key-1", "start": 128.75, "end": 134.0, "fps": 4,
         "title": "Key 1: empathy as color",
         "tags": ["spiral-in", "ring", "color propagation"],
         "text": "'1.' sets, cyan dots spiral in around a red dot, and 'CHARACTER' rises from the bottom edge. The center turns "
                 "blue, then the ring does: listener and character end up the same color."},
        {"id": "key-2", "start": 134.0, "end": 142.5, "fps": 2.5,
         "title": "Key 2: a seesaw of tension",
         "tags": ["fall-in", "assemble", "tilt", "swap"],
         "text": "The ring falls apart and reassembles as a seesaw; '1.' drops out and '2.' drops in from the top. The red dot "
                 "faces a question mark and the plank tips back and forth. The question mark becomes a warning sign for "
                 "'actual danger'."},
        {"id": "key-3", "start": 142.75, "end": 152.75, "fps": 2,
         "title": "Key 3: detail as hatching",
         "tags": ["morph", "texture", "fall-out"],
         "text": "The seesaw collapses into a circle of fine hatching. The hatching coarsens and thins, then the circle fills "
                 "solid red, the right level of detail, and drops out of the bottom with '3.'."},
        {"id": "key-4", "start": 154.5, "end": 161.0, "fps": 3,
         "title": "Key 4: one dot divides, three endings",
         "tags": ["divide", "stagger", "morph"],
         "text": "One dot divides into two, then three, with 'CONCLUSION' rising beneath. The third dot cycles through endings: "
                 "a laughing face, a heart, then an exclamation mark that stretches up out of it."},
        {"id": "journey", "start": 165.75, "end": 168.75, "fps": 6,
         "title": "A journey drawn as a line",
         "tags": ["pop", "draw-on", "plot"],
         "text": "Small icons pop in along an invisible curve. A white line then draws through them left to right, climbing to "
                 "a peak marked by a triangle and dropping again: a talk as a plot graph."},
        {"id": "compass", "start": 171.25, "end": 176.0, "fps": 4,
         "title": "Ring to triangles to compass",
         "tags": ["color propagation", "shape morph", "converge"],
         "text": "The icons fold into a ring of white dots around a purple center. The dots turn purple one after another around "
                 "the ring, the center becomes a triangle, then each dot does too, in turn. The triangles fly in to form a "
                 "compass."},
        {"id": "path", "trail": True, "start": 178.0, "end": 182.0, "fps": 6,
         "title": "The compass draws its own path",
         "tags": ["shrink", "trail", "tracking"],
         "text": "The compass shrinks to a small marker and travels, drawing the white line behind it: flat, up a gentle rise, "
                 "over the peak and down. The camera follows, so the line scrolls while the marker stays near the same spot."},
        {"id": "trap", "start": 182.0, "end": 186.5, "fps": 5,
         "title": "The trap, then a glitch",
         "tags": ["iris-in", "hinge", "glitch", "color shift"],
         "text": "A big red disc closes down to a dot on a purple tightrope. The line hinges open beneath it like a trapdoor "
                 "and the dot drops; vertical streaks tear across the frame while the color shifts from salmon through brown "
                 "to green."},
        {"id": "gift", "start": 186.25, "end": 195.25, "fps": 2.5,
         "title": "A gift for the audience",
         "tags": ["pop", "morph", "grow", "assemble"],
         "text": "A crosshair dot becomes a light-blue circle with an ellipsis. The dots turn into faces one by one and the last "
                 "swells into a glossy red ball that pushes out of the circle. White listener dots assemble around it into the "
                 "amphitheater, then scatter."},
        {"id": "reel", "start": 197.75, "end": 205.75, "fps": 3,
         "title": "A reel of takeaways",
         "tags": ["drop-through", "reel", "stop"],
         "text": "Light-blue circles drop through the frame like a slot reel and one stops at center as an eye. The reel spins "
                 "on to a play button, a stack of circles, then a dove: understanding, information, context, hope."},
        {"id": "ramble", "start": 205.5, "end": 209.75, "fps": 5,
         "title": "Rambling",
         "tags": ["shrink", "iris-out", "rays", "spin-out"],
         "text": "The dove shrinks to a sad red face; a dot grows and wipes the frame to lime. An ellipsis dot sits in a sun of "
                 "rays that turn and fade, then shrinks to nothing."},
        {"id": "meaning", "start": 210.5, "end": 217.5, "fps": 3,
         "title": "'meaning' in one stroke",
         "tags": ["draw-on", "handwriting", "disintegrate"],
         "text": "Out of drifting confetti, 'meaning' is written in one continuous red line with the pen tip leading. A moment "
                 "after it finishes, the word breaks up from the left into the same confetti."},
        {"id": "virtues", "trail": True, "start": 222.0, "end": 235.5, "fps": 1.5,
         "title": "The compass points at its virtues",
         "tags": ["grow", "pop", "needle swing"],
         "text": "The compass grows from a speck. Each value pops in at a different corner (a fist for powerful, a calm face for "
                 "humility, a halo for honesty, a pulsing heart for vulnerability) and the needle swings to point at it. Then "
                 "green dots gather around the compass and it shrinks away to a red dot."},
        {"id": "inflate", "start": 248.5, "end": 255.5, "fps": 3,
         "title": "Exaggeration inflates",
         "tags": ["scale-up", "hollow", "spread", "slam"],
         "text": "The three dots swell and grow orange halos while their red cores shrink to nothing, leaving empty shells. They "
                 "drift apart, slam back together, and the merged circle fills the frame with red."},
        {"id": "spotlight", "start": 255.5, "end": 261.5, "fps": 4,
         "title": "Spotlight",
         "tags": ["wipe-up", "light sweep", "scale"],
         "text": "A navy stage with a green floor wipes up from below. A yellow spotlight swings in from the left; when it "
                 "lands on the dot, the dot grows several times its size, and as the beam moves on to the right and out of "
                 "frame, the dot shrinks back. The floor drops out and purple rises in its place."},
        {"id": "star", "trail": True, "start": 261.25, "end": 266.25, "fps": 4,
         "title": "A star cracks and falls",
         "tags": ["morph", "crack", "shatter", "fall"],
         "text": "The red X shrinks to a speck and returns as a star. Hairline cracks spread across it, it breaks apart at 265, and the pieces fall "
                 "out of the bottom of the frame."},
        {"id": "waves", "start": 269.25, "end": 276.0, "fps": 3,
         "title": "A gift, then sound waves",
         "tags": ["spiral", "orbit", "morph", "ripple"],
         "text": "Dots spiral out of the ellipsis into a ring around it, and the center becomes a white gift icon. The gift "
                 "splits back into three dots and arcs ripple out on both sides, closing into a speech bubble."},
        {"id": "callback", "start": 276.0, "end": 282.0, "fps": 4,
         "title": "Every motif in reverse",
         "tags": ["callback", "zoom-through", "morph"],
         "text": "Speech bubble, amphitheater, campfire, and finally the red network from the opening, each turning into the "
                 "next. The ending runs the film's motifs backwards to where it began."},
        {"id": "let-it", "start": 282.0, "end": 285.0, "fps": 6,
         "title": "Let it mean something",
         "tags": ["type", "slide", "stagger"],
         "text": "'Let' appears, then 'it' and 'mean' rise in while 'something' slides in from the right and docks beside "
                 "'mean'. Three red dots tick in one at a time as the ellipsis."},
    ],
}


def clock(seconds):
    return f"{int(seconds) // 60:02d}:{seconds % 60:05.2f}"


def frame_times(seq):
    n = int(round((seq["end"] - seq["start"]) * seq["fps"])) + 1
    return [seq["start"] + k / seq["fps"] for k in range(n)]


def extract(source, base, seqs, run_ffmpeg):
    for seq in seqs:
        folder = base / "motion" / seq["id"]
        key = f'{seq["start"]}-{seq["end"]}-{seq["fps"]}-{seq.get("trail", False)}'
        done = folder / ".done"
        if done.exists() and done.read_text() == key:
            continue
        shutil.rmtree(folder, ignore_errors=True)
        folder.mkdir(parents=True)
        count = len(frame_times(seq))
        run_ffmpeg(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", f'{seq["start"]:.3f}', "-i", str(source),
                    "-vf", f'fps={seq["fps"]:g},scale=\'min(1280,iw)\':-2', "-frames:v", str(count), "-q:v", "3",
                    str(folder / "f-%03d.jpg")])
        if seq.get("trail", False):
            trail(folder)
        done.write_text(key)


def trail(folder):
    """Onion skin: moving pixels from each frame over the static background, older frames fainter."""
    frames = [np.asarray(Image.open(p).convert("RGB").resize((640, 360)), dtype=np.float32)
              for p in sorted(folder.glob("f-*.jpg"))]
    stack = np.stack(frames)
    background = np.median(stack, axis=0)
    canvas = background.copy()
    last = len(frames) - 1
    for i, frame in enumerate(frames):
        mask = np.abs(frame - background).max(axis=2) > 28
        alpha = 0.22 + 0.78 * (i / last) ** 1.6 if last else 1.0
        canvas[mask] = canvas[mask] * (1 - alpha) + frame[mask] * alpha
    Image.fromarray(canvas.clip(0, 255).astype(np.uint8)).save(folder / "trail.jpg", quality=88)


def energy(source, base, fps):
    """Mean RGB change between consecutive frames at the source rate, cached in energy.json."""
    out = base / "energy.json"
    if out.exists():
        return json.loads(out.read_text())
    w, h = 96, 54
    size = w * h * 3
    process = subprocess.Popen(["ffmpeg", "-v", "error", "-i", str(source), "-vf", f"scale={w}:{h}:flags=area",
                                "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    diffs, previous = [], None
    while True:
        chunk = process.stdout.read(size)
        if len(chunk) < size:
            break
        current = np.frombuffer(chunk, np.uint8).astype(np.int16)
        diffs.append(0.0 if previous is None else round(float(np.abs(current - previous).mean()), 2))
        previous = current
    process.wait()
    data = {"fps": float(Fraction(fps)), "diff": diffs}
    out.write_text(json.dumps(data, separators=(",", ":")))
    return data


def levels(data, edges):
    """Energy for each [edges[i], edges[i+1]) window on 0..1.

    The scale is logarithmic between the film's noise floor and its 99th percentile. A linear scale
    lets full-frame wipes flatten everything else, and a small dot crossing a flat field matters.
    """
    diff = np.asarray(data["diff"])
    floor = max(0.05, float(np.percentile(diff, 25)))
    top = np.log1p(float(np.percentile(diff, 99)) / floor) or 1.0
    out = []
    for a, b in zip(edges, edges[1:]):
        window = diff[int(a * data["fps"]):max(int(a * data["fps"]) + 1, int(b * data["fps"]))]
        out.append(min(1.0, float(np.log1p(window.mean() / floor) / top)) if len(window) else 0.0)
    return out


def spark(values):
    return "".join(SPARK[min(len(SPARK) - 1, int(v * len(SPARK)))] for v in values)


def seq_levels(data, seq):
    times = frame_times(seq)
    step = 1 / seq["fps"]
    return levels(data, [t for t in times] + [times[-1] + step])


def bars_svg(values, width, height, label, bands=(), ticks=()):
    n = len(values)
    bar = width / n
    parts = [f'<svg class="energy-svg" viewBox="0 0 {width} {height + (16 if ticks else 0)}" role="img" aria-label="{html.escape(label)}">']
    for x0, x1, href, title in bands:
        parts.append(f'<a href="{href}"><rect class="energy-band" x="{x0:.1f}" y="0" width="{max(1.5, x1 - x0):.1f}" '
                     f'height="{height}"><title>{html.escape(title)}</title></rect></a>')
    for i, v in enumerate(values):
        h = max(0.6, v * (height - 2))
        parts.append(f'<rect class="energy-bar" x="{i * bar:.2f}" y="{height - h:.2f}" width="{max(0.6, bar * 0.8):.2f}" height="{h:.2f}"/>')
    for x, text in ticks:
        parts.append(f'<text x="{x:.1f}" y="{height + 13}" class="energy-tick">{text}</text>')
    parts.append("</svg>")
    return "".join(parts)


def section(number, name, item, seqs, data, frame_card):
    duration = item["duration"]
    width = 1000
    bucket = 0.5 if duration > 90 else 0.25
    edges = list(np.arange(0, duration, bucket)) + [duration]
    tick_every = 30 if duration > 90 else 10
    ticks = [(t / duration * width, f"{int(t) // 60}:{int(t) % 60:02d}") for t in range(0, int(duration), tick_every)]
    bands = [(s["start"] / duration * width, s["end"] / duration * width, f'#m-{s["id"]}', s["title"]) for s in seqs]
    timeline = bars_svg(levels(data, edges), width, 64, "Motion energy across the film", bands, ticks)
    out = ['<section class="study-section motion-section" id="motion" aria-labelledby="motion-title">',
           '<h2 id="motion-title">Motion</h2>',
           f'<p>{html.escape(MOTION_INTRO[number])}</p>',
           f'<p>Each sequence below is sampled at a fixed rate so its frames read as a flip book. Bars show how much the '
           f'picture changes from one source frame to the next: tall bars are fast moves, flat stretches are holds. '
           f'The same notes are in <a href="frames/{name}/motion.md">motion.md</a> for reading as text.</p>',
           f'<figure class="energy-timeline">{timeline}<figcaption>Motion energy across the film, '
           f'{bucket:g} s per bar. Shaded spans are the {len(seqs)} sequences below; select one to jump to it.</figcaption></figure>',
           '<ol class="motion-list">']
    for i, seq in enumerate(seqs, 1):
        times = frame_times(seq)
        folder = f'frames/{name}/motion/{seq["id"]}'
        span = seq["end"] - seq["start"]
        tags = "".join(f"<li>{html.escape(t)}</li>" for t in seq["tags"])
        strip = "".join(frame_card(f"{folder}/f-{k:03d}.jpg", t, step=0.01) for k, t in enumerate(times, 1))
        energy_svg = bars_svg(seq_levels(data, seq), 400, 40, f'Motion energy per frame step for {seq["title"]}')
        trail_html = (f'<figure class="motion-trail"><a href="{folder}/trail.jpg" target="_blank" rel="noopener">'
                      f'<img loading="lazy" src="{folder}/trail.jpg" alt="Onion skin of {html.escape(seq["title"])}"></a>'
                      '<figcaption>Onion skin: earlier positions faded, last frame solid.</figcaption></figure>'
                      if seq.get("trail", False) else '')
        out.append(
            f'<li class="motion-seq" id="m-{seq["id"]}"><div class="motion-head"><h3><span>{i:02d}</span>{html.escape(seq["title"])}</h3>'
            f'<button class="motion-time" type="button" data-seek="{seq["start"]:.3f}" aria-label="Play from {clock(seq["start"])}">'
            f'{clock(seq["start"])}–{clock(seq["end"])} · {span:.2f} s</button></div>'
            f'<ul class="motion-tags">{tags}</ul><p class="motion-text">{html.escape(seq["text"])}</p>'
            f'<p class="motion-rate">{len(times)} frames, {seq["fps"]:g} per second ({1 / seq["fps"]:.3f} s apart)</p>'
            f'<div class="motion-strip">{strip}</div>'
            f'<div class="motion-extra">{trail_html}<figure class="motion-energy">{energy_svg}'
            '<figcaption>Motion per frame step</figcaption></figure></div></li>')
    out.append('</ol></section>')
    return "".join(out)


def markdown(number, name, item, seqs, data, key_frames):
    duration = item["duration"]
    per_second = levels(data, list(range(0, int(duration) + 1)) + [duration])
    rows = [f"{s // 60:02d}:{s % 60:02d}  {spark(per_second[s:s + 60])}" for s in range(0, len(per_second), 60)]
    lines = [f"# Motion notes: {item['title']}", "",
             f"{item['author']} · {clock(duration)} · {item['url']}", "",
             MOTION_INTRO[number], "",
             "## How to read this", "",
             "Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping "
             "through the files is a flip book of the move. The bar after each frame is the motion energy from it to the "
             "next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log "
             "scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the "
             "fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is "
             "an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.jpg`, where present, is an onion skin of "
             "the sequence: moving shapes from every frame over the static background, earlier positions fainter.", "",
             "## Film timeline", "", "One character per second.", "", "```", *rows, "```", "",
             "## Sequences", ""]
    for i, seq in enumerate(seqs, 1):
        times = frame_times(seq)
        energies = seq_levels(data, seq)
        lines += [f"### {i:02d}. {seq['title']}", "",
                  f"{clock(seq['start'])}–{clock(seq['end'])} ({seq['end'] - seq['start']:.2f} s) · {len(times)} frames at "
                  f"{seq['fps']:g} fps, {1 / seq['fps']:.3f} s apart · {', '.join(seq['tags'])}", "",
                  seq["text"], "",
                  f"Motion: `{spark(energies)}`", ""]
        if seq.get("trail", False):
            lines += [f"Onion skin: `motion/{seq['id']}/trail.jpg`", ""]
        lines += [f"- {clock(t)} `motion/{seq['id']}/f-{k:03d}.jpg` {spark([e])}" for k, (t, e) in enumerate(zip(times, energies), 1)]
        lines.append("")
    if key_frames:
        lines += ["## Key frames", "", "One frame per visual idea, from the one-per-second set.", ""]
        lines += [f"- {clock(t)} `seconds/second-{int(t) + 1:05d}.jpg` {note}" for t, note in key_frames]
        lines.append("")
    return "\n".join(lines)
