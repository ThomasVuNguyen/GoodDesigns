"""The Craft section: how a film is put together, written for people and for agents learning the craft.

Each film's craft notes live in `studies/<NN>-<slug>.json` under "craft". The section has four parts:

- a lede: what the film is and what is worth learning from it;
- a film map: parallel lanes (story, voices, sound, picture) laid against the running time, so you
  can see how the pieces stack up at any moment. Every segment seeks the player;
- aspects: essays on only the crafts the film actually uses (story, voices, frames, world, screens,
  sound, trust), each anchored to timestamped moments with the frame from that second;
- patterns: techniques worth reusing, and a line on what the film does not lean on.

The same content is written to `frames/<video>/craft.md` so an agent reading the folder gets it as text.
"""

import html

LANES = {
    "story": "Story",
    "voices": "Voices",
    "sound": "Sound",
    "picture": "Picture",
}
# Segment kinds with a fixed color, so the legend reads the same on every page. Other kinds fall back to neutral.
KINDS = {
    "voices": {
        "interview": "On-camera interview",
        "interview-vo": "Interview audio over other pictures",
        "narrator": "Narrator",
        "dialogue": "People talking in the scene",
        "archival": "Archival or found audio",
        "text": "On-screen words carry the script",
        "song": "Sung lyrics",
        "commentary": "Live commentary or callouts",
    },
    "sound": {
        "music": "Music",
        "song": "Song with vocals",
        "sfx": "Designed sound effects",
        "ambience": "Location sound and room tone",
        "silence": "Near silence",
    },
    "picture": {
        "interview": "Interview setup",
        "b-roll": "Observational footage",
        "staged": "Staged or scripted live action",
        "screen": "Product screens",
        "graphics": "Motion graphics",
        "archive": "Archive footage or stills",
        "title": "Titles and end card",
        "footage": "Documentary or mission footage",
        "stock": "Stock footage, memes and found clips",
    },
}
ASPECTS = {
    "story": "Story and structure",
    "voices": "Voices and script",
    "frames": "How the frames work together",
    "world": "The world and its graphics",
    "screens": "Showing the product",
    "sound": "Music and sound",
    "trust": "Trust, warmth and craft",
}


def clock(seconds):
    seconds = int(round(seconds))
    return f"{seconds // 60}:{seconds % 60:02d}"


def frame_path(name, t, count):
    return f"frames/{name}/seconds/second-{min(count, int(t) + 1):05d}.jpg"


def _map(craft, duration):
    lanes = craft.get("map", {}).get("lanes", [])
    if not lanes:
        return ""
    tick_every = 60 if duration > 600 else 30 if duration > 90 else 10  # long films get a wide, scrolling map
    ticks = "".join(f'<span class="craft-tick" style="left:{t / duration * 100:.3f}%">{clock(t)}</span>'
                    for t in range(0, int(duration), tick_every))
    rows, used = [], {}
    for lane in lanes:
        lane_id = lane["id"]
        label = lane.get("label") or LANES.get(lane_id, lane_id.title())
        segs = []
        for i, seg in enumerate(lane["segments"]):
            start, end = max(0.0, seg["start"]), min(duration, seg["end"])
            kind = seg.get("kind", "")
            if kind in KINDS.get(lane_id, {}) and kind not in used.setdefault(lane_id, []):
                used[lane_id].append(kind)
            kind_class = f" k-{lane_id}-{kind}" if kind else ""
            alt = " is-alt" if lane_id == "story" and i % 2 else ""
            note = seg.get("note", "")
            title = f'{seg["label"]} · {clock(start)}–{clock(end)}' + (f" · {note}" if note else "")
            segs.append(
                f'<button type="button" class="craft-seg{kind_class}{alt}" data-seek="{start:.3f}" data-end="{end:.3f}" '
                f'data-lane="{html.escape(label)}" data-label="{html.escape(seg["label"])}" '
                f'data-span="{clock(start)}–{clock(end)}" data-note="{html.escape(note)}" '
                f'style="left:{start / duration * 100:.3f}%;width:{max(0.25, (end - start) / duration * 100):.3f}%" '
                f'title="{html.escape(title)}" aria-label="{html.escape(label)}: {html.escape(title)}">'
                f'<span>{html.escape(seg["label"])}</span></button>')
        rows.append(f'<div class="craft-lane" data-lane-id="{lane_id}"><span class="craft-lane-label">{html.escape(label)}</span>'
                    f'<div class="craft-track">{"".join(segs)}</div></div>')
    legend = []
    for lane_id, kinds in used.items():
        items = "".join(f'<li><i class="k-{lane_id}-{k}"></i>{html.escape(KINDS[lane_id][k])}</li>' for k in kinds)
        legend.append(f'<div><span>{LANES[lane_id]}</span><ul>{items}</ul></div>')
    long_class = " is-long" if duration > 600 else ""
    return (f'<figure class="craft-map{long_class}" data-duration="{duration:.3f}">'
            f'<div class="craft-lanes-scroll"><div class="craft-lanes">{"".join(rows)}<div class="craft-ticks">{ticks}</div>'
            '<div class="craft-playhead" aria-hidden="true"></div></div></div>'
            '<p class="craft-map-note" aria-live="polite">Select a segment to read it and play the film from there.</p>'
            f'<figcaption class="craft-legend">{"".join(legend)}</figcaption></figure>')


def section(name, item, craft):
    duration = item["duration"]
    count = item["second_frames"]
    out = ['<section class="study-section craft-section" id="craft" aria-labelledby="craft-title">',
           '<h2 id="craft-title">Craft</h2>',
           *[f'<p class="craft-lede">{html.escape(p)}</p>' for p in _paragraphs(craft["lede"])],
           f'<p>The map lays the film\'s layers against its running time. Every segment plays the film from that point. '
           f'The same notes are in <a href="frames/{name}/craft.md">craft.md</a> for reading as text.</p>',
           _map(craft, duration)]
    aspects = craft.get("aspects", [])
    if aspects:
        out.append('<nav class="craft-index" aria-label="Craft aspects">' + "".join(
            f'<a href="#c-{a["id"]}">{html.escape(a.get("title") or ASPECTS.get(a["id"], a["id"]))}</a>' for a in aspects) + '</nav>')
    for a in aspects:
        title = a.get("title") or ASPECTS.get(a["id"], a["id"])
        kicker = ASPECTS.get(a["id"], "")
        body = "".join(f"<p>{html.escape(p)}</p>" for p in a["paragraphs"])
        moments = "".join(
            f'<li class="craft-moment"><button type="button" class="craft-moment-thumb" data-seek="{m["t"]:.3f}" '
            f'aria-label="Play from {clock(m["t"])}"><img loading="lazy" src="{frame_path(name, m["t"], count)}" alt=""></button>'
            f'<div><button type="button" class="craft-moment-time" data-seek="{m["t"]:.3f}">{clock(m["t"])}</button>'
            f'<p>{html.escape(m["text"])}</p></div></li>'
            for m in a.get("moments", []))
        out.append(f'<article class="craft-aspect" id="c-{a["id"]}">'
                   f'<p class="craft-kicker">{html.escape(kicker) if kicker and kicker != title else ""}</p>'
                   f'<h3>{html.escape(title)}</h3><div class="craft-body">{body}</div>'
                   + (f'<ol class="craft-moments">{moments}</ol>' if moments else '') + '</article>')
    patterns = craft.get("patterns", [])
    if patterns:
        cards = "".join(
            f'<li><h4>{html.escape(p["name"])}</h4><p>{html.escape(p["text"])}</p>'
            + (f'<button type="button" class="craft-moment-time" data-seek="{p["t"]:.3f}">See it at {clock(p["t"])}</button>'
               if p.get("t") is not None else '') + '</li>'
            for p in patterns)
        out.append(f'<div class="craft-patterns"><h3>Techniques to reuse</h3><ol>{cards}</ol></div>')
    if craft.get("absent"):
        out.append(f'<p class="craft-absent"><strong>Not the lesson here.</strong> {html.escape(craft["absent"])}</p>')
    out.append('</section>')
    return "".join(out)


def _paragraphs(text):
    return text if isinstance(text, list) else [text]


def markdown(name, item, craft):
    duration = item["duration"]
    lines = [f"# Craft notes: {item['title']}", "",
             f"{item['author']} · {clock(duration)} · {item['url']}", "",
             *[p + "\n" for p in _paragraphs(craft["lede"])],
             "Frames are in `seconds/second-NNNNN.jpg`, where NNNNN is the whole second plus one.", ""]
    lanes = craft.get("map", {}).get("lanes", [])
    if lanes:
        lines += ["## Film map", "",
                  "Parallel layers of the film against its running time. Read the lanes together to see what is "
                  "stacked at any moment: what the story is doing, who is speaking, what you hear and what you see.", ""]
        for lane in lanes:
            label = lane.get("label") or LANES.get(lane["id"], lane["id"])
            lines += [f"### {label}", ""]
            for seg in lane["segments"]:
                kind = seg.get("kind")
                kind_text = f" ({KINDS.get(lane['id'], {}).get(kind, kind)})" if kind else ""
                note = f": {seg['note']}" if seg.get("note") else ""
                lines.append(f"- {clock(seg['start'])}–{clock(seg['end'])} **{seg['label']}**{kind_text}{note}")
            lines.append("")
    for a in craft.get("aspects", []):
        lines += [f"## {a.get('title') or ASPECTS.get(a['id'], a['id'])}", ""]
        for p in a["paragraphs"]:
            lines += [p, ""]
        for m in a.get("moments", []):
            lines.append(f"- {clock(m['t'])} `seconds/second-{min(item['second_frames'], int(m['t']) + 1):05d}.jpg` {m['text']}")
        if a.get("moments"):
            lines.append("")
    if craft.get("patterns"):
        lines += ["## Techniques to reuse", ""]
        for p in craft["patterns"]:
            at = f" (see {clock(p['t'])})" if p.get("t") is not None else ""
            lines += [f"- **{p['name']}**{at}. {p['text']}"]
        lines.append("")
    if craft.get("absent"):
        lines += ["## Not the lesson here", "", craft["absent"], ""]
    return "\n".join(lines)
