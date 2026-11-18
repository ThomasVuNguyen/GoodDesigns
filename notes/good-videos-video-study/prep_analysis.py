#!/usr/bin/env python3
"""Evidence kit for writing a film's craft notes: `analysis/<NN>/`, local only and ignored by Git.

Run after `build_study.py <NN>` (for the frames) and after Demucs has split the soundtrack into
`analysis/stems/htdemucs/<NN>/{vocals,no_vocals}.wav`. It writes:

- sheet-XX.jpg: contact sheets of the one-per-second frames, 30 seconds each, labelled with timestamps;
- cuts.txt: detected hard cuts with shot lengths, and the cutting rate per ten seconds;
- audio.txt: loudness of the full mix, the voice stem and the music stem every half second, as numbers
  and as one-line bars, plus spans where music plays, where voice plays, and near-silences;
- spectrum-mix.png and spectrum-music.png: spectrograms with a time axis;
- a tempo estimate for the music stem and how close each cut lands to its beat grid (an estimate).
"""

import csv
import json
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy.io import wavfile
from scipy.signal import stft

HERE = Path(__file__).resolve().parent
VIDEOS = json.loads((HERE.parents[1] / "gallery/videos.json").read_text())["videos"]
BARS = "▁▂▃▄▅▆▇█"


def stem(number):
    return f"{number:02d}-{VIDEOS[number - 1]['slug']}"


def clock(t):
    return f"{int(t) // 60:02d}:{t % 60:05.2f}"


def sheets(number, out):
    frames = sorted((HERE / "frames" / stem(number) / "seconds").glob("second-*.jpg"))
    cols, rows, w, h, lh = 6, 5, 300, 169, 22
    font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 16)
    for page in range(0, len(frames), cols * rows):
        chunk = frames[page:page + cols * rows]
        canvas = Image.new("RGB", (cols * w, rows * (h + lh)), "#111")
        draw = ImageDraw.Draw(canvas)
        for i, path in enumerate(chunk):
            x, y = (i % cols) * w, (i // cols) * (h + lh)
            with Image.open(path) as im:
                im = im.convert("RGB")
                im.thumbnail((w, h))
                canvas.paste(im, (x, y))
            second = int(path.stem.split("-")[-1]) - 1
            draw.text((x + 6, y + h + 2), f"{second // 60}:{second % 60:02d}", fill="white", font=font)
        canvas.save(out / f"sheet-{page // (cols * rows) + 1:02d}.jpg", quality=82)


def load(path):
    rate, data = wavfile.read(path)
    data = data.astype(np.float32)
    if data.ndim > 1:
        data = data.mean(axis=1)
    peak = np.abs(data).max() or 1
    if data.dtype != np.float32 or peak > 2:
        data = data / 32768.0
    return rate, data


def db_series(data, rate, hop=0.5):
    n = int(rate * hop)
    frames = len(data) // n
    rms = np.sqrt(np.mean(data[:frames * n].reshape(frames, n) ** 2, axis=1) + 1e-12)
    return 20 * np.log10(rms)


def bars(values, low=-60, high=-10):
    return "".join(BARS[int(np.clip((v - low) / (high - low), 0, 0.999) * len(BARS))] for v in values)


def spans(mask, hop, min_len=1.0):
    out, start = [], None
    for i, on in enumerate(list(mask) + [False]):
        if on and start is None:
            start = i
        elif not on and start is not None:
            if (i - start) * hop >= min_len:
                out.append((start * hop, i * hop))
            start = None
    return out


def tempo(data, rate):
    """Tempo from the autocorrelation of spectral flux, 60–180 BPM, and the best beat phase."""
    hop = 512
    _, _, z = stft(data, fs=rate, nperseg=2048, noverlap=2048 - hop)
    mag = np.log1p(np.abs(z))
    flux = np.maximum(0, np.diff(mag, axis=1)).sum(axis=0)
    flux = (flux - flux.mean()) / (flux.std() or 1)
    fps = rate / hop
    ac = np.correlate(flux, flux, mode="full")[len(flux) - 1:]
    lags = np.arange(len(ac))
    valid = (lags >= fps * 60 / 180) & (lags <= fps * 60 / 60)
    if not valid.any():
        return None
    lag = lags[valid][np.argmax(ac[valid])]
    bpm = 60 * fps / lag
    period = lag
    phases = [flux[int(p)::int(period)].sum() if period >= 1 else 0 for p in range(int(period))]
    phase = int(np.argmax(phases)) / fps
    strength = float(ac[lag] / (ac[0] or 1))
    return bpm, phase, strength


def main(number):
    name = stem(number)
    out = HERE / "analysis" / f"{number}"
    out.mkdir(parents=True, exist_ok=True)
    sheets(number, out)

    cuts = []
    with (HERE / "frames" / name / "scene-cuts.csv").open() as f:
        cuts = [float(r["time_seconds"]) for r in csv.DictReader(f)]
    source = next((HERE / "source").glob(f"{name}.*4"))
    duration = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(source)],
                                    capture_output=True, text=True).stdout)
    edges = [0.0, *cuts, duration]
    lines = [f"# Cuts: {name}", "", f"{len(cuts)} detected hard cuts (FFmpeg scene score > 0.30) in {duration:.1f} s. "
             "Dissolves, wipes and masked transitions are often missed; check the contact sheets.", "",
             "Cutting rate, cuts per 10 s:"]
    per10 = [sum(1 for c in cuts if a <= c < a + 10) for a in range(0, int(duration) + 1, 10)]
    lines += [f"  {a // 60:02d}:{a % 60:02d}  {'#' * n} {n}" for a, n in zip(range(0, int(duration) + 1, 10), per10)]
    lines += ["", "Shot list (start, length):"]
    lines += [f"  {clock(a)}  {b - a:5.2f} s" for a, b in zip(edges, edges[1:])]
    lengths = np.diff(edges)
    lines += ["", f"Median shot {np.median(lengths):.2f} s, mean {lengths.mean():.2f} s, shortest {lengths.min():.2f} s, longest {lengths.max():.2f} s."]
    (out / "cuts.txt").write_text("\n".join(lines) + "\n")

    stems = HERE / "analysis" / "stems" / "htdemucs" / str(number)
    rate, mix = load(HERE / "analysis" / "stems" / f"{number}.wav")
    _, vocals = load(stems / "vocals.wav")
    _, music = load(stems / "no_vocals.wav")
    hop = 0.5
    mix_db, voc_db, mus_db = (db_series(x, rate, hop) for x in (mix, vocals, music))
    n = min(len(mix_db), len(voc_db), len(mus_db))
    mix_db, voc_db, mus_db = mix_db[:n], voc_db[:n], mus_db[:n]
    music_on = mus_db > max(-48, np.percentile(mus_db, 95) - 24)
    voice_on = voc_db > max(-45, np.percentile(voc_db, 95) - 22)
    quiet = mix_db < max(-55, np.percentile(mix_db, 95) - 30)
    a = ["# Audio: " + name, "",
         "Demucs (htdemucs, two stems) split the soundtrack into a voice stem and everything else ('music': score, "
         "songs, effects and room sound). Separation is imperfect: sung vocals land in the voice stem, and loud effects "
         "or crowd noise can leak into either. Levels are RMS in dBFS every 0.5 s.", "",
         "## Bars, one character per 0.5 s (▁ ≤ -60 dB, █ ≥ -10 dB)", ""]
    for start in range(0, n, 120):
        t = start * hop
        a += [f"{int(t) // 60:02d}:{int(t) % 60:02d}  mix   {bars(mix_db[start:start + 120])}",
              f"       voice {bars(voc_db[start:start + 120])}",
              f"       music {bars(mus_db[start:start + 120])}", ""]
    a += ["## Spans", "", "Music stem audible:"]
    a += [f"  {clock(s)}–{clock(e)}  ({e - s:.1f} s)" for s, e in spans(music_on, hop)] or ["  none"]
    a += ["", "Voice audible:"]
    a += [f"  {clock(s)}–{clock(e)}  ({e - s:.1f} s)" for s, e in spans(voice_on, hop)] or ["  none"]
    a += ["", "Near silence in the full mix (≥ 0.5 s):"]
    a += [f"  {clock(s)}–{clock(e)}" for s, e in spans(quiet, hop, 0.5)] or ["  none"]
    a += ["", "## Music level against voice", "",
          "Where both play, the music stem sits this many dB under the voice (median per 10 s window). "
          "A gap that widens on speech and closes in pauses is ducking.", ""]
    for start in range(0, n, 20):
        both = music_on[start:start + 20] & voice_on[start:start + 20]
        if both.sum() >= 4:
            gap = np.median(voc_db[start:start + 20][both] - mus_db[start:start + 20][both])
            a.append(f"  {int(start * hop) // 60:02d}:{int(start * hop) % 60:02d}  {gap:+5.1f} dB")
    est = tempo(music, rate) if music_on.mean() > 0.2 else None
    a += ["", "## Tempo estimate (music stem)", ""]
    if est:
        bpm, phase, strength = est
        period = 60 / bpm
        a.append(f"About {bpm:.1f} BPM (beat every {period:.3f} s, first beat near {phase:.2f} s; periodicity strength "
                 f"{strength:.2f}, where under 0.15 means the music has no steady pulse and the grid below means little).")
        if cuts:
            offs = [((c - phase + period / 2) % period) - period / 2 for c in cuts]
            near = sum(abs(o) < 0.07 for o in offs)
            a += [f"{near} of {len(cuts)} cuts land within 70 ms of a beat (chance alone would give about "
                  f"{len(cuts) * 0.14 / period:.0f}).", "", "Cut offsets from the nearest beat:"]
            a += [f"  {clock(c)}  {o * 1000:+5.0f} ms" for c, o in zip(cuts, offs)]
    else:
        a.append("Not estimated: too little music.")
    (out / "audio.txt").write_text("\n".join(a) + "\n")

    width = max(1200, min(4000, int(duration * 40)))
    for label, path in (("mix", HERE / "analysis" / "stems" / f"{number}.wav"), ("music", stems / "no_vocals.wav")):
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(path), "-lavfi",
                        f"showspectrumpic=s={width}x360:legend=1:scale=log:fscale=log:color=intensity", str(out / f"spectrum-{label}.png")],
                       check=True)
    print(f"#{number}: {len(cuts)} cuts, analysis in {out.relative_to(HERE)}")


if __name__ == "__main__":
    for arg in sys.argv[1:]:
        main(int(arg))
