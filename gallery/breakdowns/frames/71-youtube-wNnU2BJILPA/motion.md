# Motion notes: How One of NYC’s Fastest-Growing Startups Scaled to $5 Billion

The Science of Scaling · 16:50.02 · https://www.youtube.com/watch?v=wNnU2BJILPA

Two kinds of movement share this film. The live action is handheld vlog camera: wide lenses close to faces, walk-and-talks, jump cuts and punch-ins inside a single take, and one fast-forward. The graphics come from two packages. The show's own is cream graph paper with tall condensed type and green doodles, used for the title, the sponsor read and the end card. The explainer board is a dark green grid where glossy clay-like icons pop on, lists type themselves out, a camera slides across to follow a lead or a dotted line, and hand lettering labels things the way a person would at a whiteboard. Timelines and counters run on white paper. Type is almost never faded on. It types itself or snaps on one word at a time, in step with the voice.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▅▂▃▃▃▅▃▃▆▄▃▄▄▂▆▅▆▄▅▆▆▄▃▅▄▅▆▆▇▅▄▃▂▄▆▂▂▂▄▂▂▄▁▅▅▂▄▄▃▄▄▅▆▆▇▅▃▆▅▄
01:00  ▆▆▃▃▆▆▆▆▇▆▆▆▃▃▃▄▆▃▂▆▆▇▇█▆▃▃▄▅▅▅▅▆▅▅▄▄▄▆▅▅▅▅▄▇▄▄▃▅▄▆▆▄▆▆▆▄▆▄▅
02:00  ▅▃▄▃▅▁▁▆▅▆▅▆▅▁▅▅▆▁▁▇▆▆▆▇▇▅▆▆▅▄▄▅▅▅▅▆█▇▇▄▇▆▇▇▇▆▄▄▃▆▆▅▅▅▅▅▇▅▅▄
03:00  ▄▄▄▄▄▄▆▆▅▅▅▅▄▆▅▄▃▃▆▆▆▅▄▃▅▃▄▃▄▂▂▄▃▃▄▇▇▅▂▆▇▃▂▄▅▄▄▃▃▄▇▄▄▄▂▂▄▂▃▂
04:00  ▂▂▄▁▁▁▁▁▁▁▁▅▃▄▃▃▄▄▄▄▁▄▁▁▁▅▄▄▂▂▂▄▂▃▃▂▁▁▁▃▄▁▁▁▁▄▂▂▃▅▂▁▁▄▁▁▄▇▅▇
05:00  ▆▆▅▆▄▅▆▆▅▅▇▆▆▆▂▄▃▃▃▅▆▆▆▃▇▇▇▆▅▄▃▃▃▃▂▃▃▄▃▅▄▁▄▁▃▁▁▃▅▂▃▃▇▃▃▃▂▄▅▄
06:00  ▆▆▆▆▄▄▄▄▄▅▂▂▂▂▂▂▆▄▂▅▁▁▁▁▁▅▄▄▃▅▁▁▂▅▃▄▃▅▁▂▅▁▂▂▄▁▃▄▁▁▁▄▂▂▂▃▂▂▂▂
07:00  ▂▄▃▃▄▅▄▅▅▄▄▄▅▂▂▂▂▂▂▅▃▂▃▂▂▂▂▂▃▃▃▄▂▂▂▂▂▂▄▅▅▅▅▅▃▄▃▄▆▅▃▃▃▃▃▄▃▄▅▂
08:00  ▂▂▂▂▂▄▃▃▃▅▁▁▁▄▃▃▃▃▃▃▄▂▅▃▃▃▂▂▁▅▃▃▃▃▄▄▄▄▄▄▄▄▃▃▄▃▄▄▄▅▁▂▂▂▂▂▁▅▂▃
09:00  ▂▃▂▃▂▄▂▁▁▁▅▆▆▇▄▆▄▃▅▄▄▅▄▃▄▅▄▅▅▇▃▄▄▅▆▆▅▄▅▄▄▆▅▅▅▃▃▄▂▄▄▅▅▆▄▄▆▆▅▅
10:00  ▅▅▆▅▆▆▆▆▆▆▆▅▆▆▇▆▅▅▅▅▅▄▃▃▄▂▂▂▄▄▅▂▂▅▆▆▇▆▆▆▇▇▆▆▇▆▆▆▆▆▆▇▇▇▇█▇▇▆█
11:00  ▅▅▇▇▅▄▇▄▂▄▆▇▆▆▅▆▆▆▆▄▁▁▁▅█▇▇▇▇▇█▇▇▇▄▂▄▁▁▁▁▁▄▁▂▂▂▂▄▁▁▅▄▄▄▅▄▄▄▄
12:00  ▅▁▃▃▃▅▄▄▄▄▄▄▄▃▃▃▄▃▃▅▄▂▁▄▄▃▅▃▅▁▆▆▆▅▄▆▆▆▆▆▁▁▄▁▄▄▄▄▅▂▁▄▂▄▁▁▄▁▁▂
13:00  ▅▅▄▄▃▄▃▄▂▂▂▂▂▂▂▅▇▄▅▁▁▁▄▃▄▅▅▁▁▁▁▁▄▂▂▂▃▂▂▄▃▄▆▅▅▁▁▁▂▅▃▁▄▂▂▂▂▃▃▄
14:00  ▅▆▄▃▃▃▄▃▃▂▃▃▃▃▃▃▃▂▃▃▃▂▃▄▁▂▁▁▄▂▂▂▂▂▄▃▃▃▃▄▃▅▅▅▃▄▄▁▄▁▁▄▁▁▆▄▃▂▃▄
15:00  ▅▆▆▆▅▄▂▅▄▄▄▄▃▄▄▄▆▅▅▄▄▃▃▃▃▃▄▂▄▅▆▇▅▃▂▂▄▄▃▆▆▄▅▁▃▁▄▁▄▂▂▂▂▁▆▆▆▅▆▅
16:00  ▆▄▃▅▅▅▆▅▄▃▃▃▅▃▇▇▆▂▂▂▂▁▂▂▃▂▃▃▂▂▂▄▁▁▂▁▂▂▁▃▂▁▁▁▂▂▂▃▅▅▁
```

## Sequences

### 01. A crowd of logos builds around the host

00:00.00–00:05.75 (5.75 s) · 24 frames at 4 fps, 0.250 s apart · pop on, accumulate, frosted chips, jump cut

The film opens on a punch-in and cuts wider at 0.25 on the same take. From about 1.0 company logos fade up one at a time as translucent rounded chips scattered around her: Clay at 1.0, Docker at 1.5, Ramp at 2.0, Hex at 2.5, Unify at 2.75, MaintainX at 3.0, Modal at 3.5, Vimeo at 3.75, Vercel and Rippling at 4.0, Cursor at 4.5, Air at 5.0. Each fades in from transparent over about a quarter second and then stays, so the frame fills as she says 'some of the fastest-growing startups'. At 5.75 it cuts to a white screen of job listings.

Motion: `▆▆▂▂▂▂▃▂▃▃▃▃▃▃▄▄▄▃▄▃▃▃▃▇`

- 00:00.00 `motion/logo-cloud/f-001.webp` ▆
- 00:00.25 `motion/logo-cloud/f-002.webp` ▆
- 00:00.50 `motion/logo-cloud/f-003.webp` ▂
- 00:00.75 `motion/logo-cloud/f-004.webp` ▂
- 00:01.00 `motion/logo-cloud/f-005.webp` ▂
- 00:01.25 `motion/logo-cloud/f-006.webp` ▂
- 00:01.50 `motion/logo-cloud/f-007.webp` ▃
- 00:01.75 `motion/logo-cloud/f-008.webp` ▂
- 00:02.00 `motion/logo-cloud/f-009.webp` ▃
- 00:02.25 `motion/logo-cloud/f-010.webp` ▃
- 00:02.50 `motion/logo-cloud/f-011.webp` ▃
- 00:02.75 `motion/logo-cloud/f-012.webp` ▃
- 00:03.00 `motion/logo-cloud/f-013.webp` ▃
- 00:03.25 `motion/logo-cloud/f-014.webp` ▃
- 00:03.50 `motion/logo-cloud/f-015.webp` ▄
- 00:03.75 `motion/logo-cloud/f-016.webp` ▄
- 00:04.00 `motion/logo-cloud/f-017.webp` ▄
- 00:04.25 `motion/logo-cloud/f-018.webp` ▃
- 00:04.50 `motion/logo-cloud/f-019.webp` ▄
- 00:04.75 `motion/logo-cloud/f-020.webp` ▃
- 00:05.00 `motion/logo-cloud/f-021.webp` ▃
- 00:05.25 `motion/logo-cloud/f-022.webp` ▃
- 00:05.50 `motion/logo-cloud/f-023.webp` ▃
- 00:05.75 `motion/logo-cloud/f-024.webp` ▇

### 02. A bar grows until it fills the frame

00:07.60–00:11.80 (4.20 s) · 26 frames at 6 fps, 0.167 s apart · hand-drawn axes, bar grow, push in, number reveal

A vignetted grid of job listings holds for half a second, then a hard cut at 8.0 lands on the green board, where wobbly white axes draw themselves with a small 'LAST YEAR' bar. From 8.4 a lime 'THIS YEAR' bar rises beside it while the camera pushes in and drifts up and right, so by 9.6 the axes are sliding out of frame and by 10.43 the bar fills the middle of the screen. '5000%' appears inside it at 10.6 and holds for a second before the cut back to the studio at 11.77. The growth is shown by the camera running out of room, not by a scale.

Motion: `▃▃▃█▄▄▄▄▄▄▄▃▃▂▂▂▄▅▃▁▁▁▁▁▁█`

- 00:07.60 `motion/bar-chart/f-001.webp` ▃
- 00:07.77 `motion/bar-chart/f-002.webp` ▃
- 00:07.93 `motion/bar-chart/f-003.webp` ▃
- 00:08.10 `motion/bar-chart/f-004.webp` █
- 00:08.27 `motion/bar-chart/f-005.webp` ▄
- 00:08.43 `motion/bar-chart/f-006.webp` ▄
- 00:08.60 `motion/bar-chart/f-007.webp` ▄
- 00:08.77 `motion/bar-chart/f-008.webp` ▄
- 00:08.93 `motion/bar-chart/f-009.webp` ▄
- 00:09.10 `motion/bar-chart/f-010.webp` ▄
- 00:09.27 `motion/bar-chart/f-011.webp` ▄
- 00:09.43 `motion/bar-chart/f-012.webp` ▃
- 00:09.60 `motion/bar-chart/f-013.webp` ▃
- 00:09.77 `motion/bar-chart/f-014.webp` ▂
- 00:09.93 `motion/bar-chart/f-015.webp` ▂
- 00:10.10 `motion/bar-chart/f-016.webp` ▂
- 00:10.27 `motion/bar-chart/f-017.webp` ▄
- 00:10.43 `motion/bar-chart/f-018.webp` ▅
- 00:10.60 `motion/bar-chart/f-019.webp` ▃
- 00:10.77 `motion/bar-chart/f-020.webp` ▁
- 00:10.93 `motion/bar-chart/f-021.webp` ▁
- 00:11.10 `motion/bar-chart/f-022.webp` ▁
- 00:11.27 `motion/bar-chart/f-023.webp` ▁
- 00:11.43 `motion/bar-chart/f-024.webp` ▁
- 00:11.60 `motion/bar-chart/f-025.webp` ▁
- 00:11.77 `motion/bar-chart/f-026.webp` █

### 03. Title word by word, then out to Times Square

00:12.20–00:18.20 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · word-by-word, punch-in, whip, censor sticker, title card

'GO-TO-' snaps on at 12.7, 'MARKET' at 12.95 and 'ENGINEER' at 13.45 in heavy white sans, one word per beat of her line. At 13.7 a punch-in on the same take reframes her, and the title jumps to a larger stack at lower left. At 14.45 a smeared, motion-blurred cut throws us into Times Square on a wide lens inches from her face. On 'what the' the swear is cut from the audio, and from 15.06 to 15.3 a Clay logo sits over her mouth like a sticker instead of a bleep box. At 16.95 the green board answers with 'WTF is a GTME?', then at 17.95 a wider street shot brings in her name and title.

Motion: `▄▄▃▂▂▃▁▁▁█▆▅▅▅▅▅▅▄▇▁▁▁▆▅▄`

- 00:12.20 `motion/title-to-street/f-001.webp` ▄
- 00:12.45 `motion/title-to-street/f-002.webp` ▄
- 00:12.70 `motion/title-to-street/f-003.webp` ▃
- 00:12.95 `motion/title-to-street/f-004.webp` ▂
- 00:13.20 `motion/title-to-street/f-005.webp` ▂
- 00:13.45 `motion/title-to-street/f-006.webp` ▃
- 00:13.70 `motion/title-to-street/f-007.webp` ▁
- 00:13.95 `motion/title-to-street/f-008.webp` ▁
- 00:14.20 `motion/title-to-street/f-009.webp` ▁
- 00:14.45 `motion/title-to-street/f-010.webp` █
- 00:14.70 `motion/title-to-street/f-011.webp` ▆
- 00:14.95 `motion/title-to-street/f-012.webp` ▅
- 00:15.20 `motion/title-to-street/f-013.webp` ▅
- 00:15.45 `motion/title-to-street/f-014.webp` ▅
- 00:15.70 `motion/title-to-street/f-015.webp` ▅
- 00:15.95 `motion/title-to-street/f-016.webp` ▅
- 00:16.20 `motion/title-to-street/f-017.webp` ▅
- 00:16.45 `motion/title-to-street/f-018.webp` ▄
- 00:16.70 `motion/title-to-street/f-019.webp` ▇
- 00:16.95 `motion/title-to-street/f-020.webp` ▁
- 00:17.20 `motion/title-to-street/f-021.webp` ▁
- 00:17.45 `motion/title-to-street/f-022.webp` ▁
- 00:17.70 `motion/title-to-street/f-023.webp` ▆
- 00:17.95 `motion/title-to-street/f-024.webp` ▅
- 00:18.20 `motion/title-to-street/f-025.webp` ▄

### 04. The logo grows as the years roll

00:34.50–00:39.00 (4.50 s) · 28 frames at 6 fps, 0.167 s apart · odometer, motion blur, scale up, body wipe

Her arm sweeps across the lens at 34.6 and the cut lands on the green board, where a tiny Clay logo pops up at 34.83. Under it a row of years slides left like an odometer: 2017 holds, then a blurred whip at 35.83 lands on 2020, another at 36.83 on 2023 and one at 38.0 on 2026. Each step takes about a third of a second and the logo grows a size with every jump, so the company literally gets bigger with time. It holds on 2026 and cuts back to her at 39.0.

Motion: `▆▆▇▂▂▁▁▁▃▃▃▁▁▁▃▄▃▂▁▁▃▄▄▂▁▁▇▂`

- 00:34.50 `motion/year-counter/f-001.webp` ▆
- 00:34.67 `motion/year-counter/f-002.webp` ▆
- 00:34.83 `motion/year-counter/f-003.webp` ▇
- 00:35.00 `motion/year-counter/f-004.webp` ▂
- 00:35.17 `motion/year-counter/f-005.webp` ▂
- 00:35.33 `motion/year-counter/f-006.webp` ▁
- 00:35.50 `motion/year-counter/f-007.webp` ▁
- 00:35.67 `motion/year-counter/f-008.webp` ▁
- 00:35.83 `motion/year-counter/f-009.webp` ▃
- 00:36.00 `motion/year-counter/f-010.webp` ▃
- 00:36.17 `motion/year-counter/f-011.webp` ▃
- 00:36.33 `motion/year-counter/f-012.webp` ▁
- 00:36.50 `motion/year-counter/f-013.webp` ▁
- 00:36.67 `motion/year-counter/f-014.webp` ▁
- 00:36.83 `motion/year-counter/f-015.webp` ▃
- 00:37.00 `motion/year-counter/f-016.webp` ▄
- 00:37.17 `motion/year-counter/f-017.webp` ▃
- 00:37.33 `motion/year-counter/f-018.webp` ▂
- 00:37.50 `motion/year-counter/f-019.webp` ▁
- 00:37.67 `motion/year-counter/f-020.webp` ▁
- 00:37.83 `motion/year-counter/f-021.webp` ▃
- 00:38.00 `motion/year-counter/f-022.webp` ▄
- 00:38.17 `motion/year-counter/f-023.webp` ▄
- 00:38.33 `motion/year-counter/f-024.webp` ▂
- 00:38.50 `motion/year-counter/f-025.webp` ▁
- 00:38.67 `motion/year-counter/f-026.webp` ▁
- 00:38.83 `motion/year-counter/f-027.webp` ▇
- 00:39.00 `motion/year-counter/f-028.webp` ▂

### 05. A counter that runs behind her head

00:43.20–00:46.00 (2.80 s) · 23 frames at 8 fps, 0.125 s apart · count up, punch-in, matte, depth layering

On 'It's now valued at five billion dollars' the shot punches in at 43.95 and a green box of white numerals fades up across the top of the frame already counting: $2.77 billion, $3.17 billion, $3.96 billion, $4.75 billion, landing on '$5,000,000,000' by 44.7. Her head and hair stay in front of the box, so the middle digits are always hidden. It holds there until the cut. A rotoscoped matte makes the number part of the room instead of a sticker on the screen.

Motion: `█▁▁▁▃▇▇▇▆▅▅▄▄▂▂▂▁▂▂▁▁▁▁`

- 00:43.20 `motion/valuation/f-001.webp` █
- 00:43.33 `motion/valuation/f-002.webp` ▁
- 00:43.45 `motion/valuation/f-003.webp` ▁
- 00:43.58 `motion/valuation/f-004.webp` ▁
- 00:43.70 `motion/valuation/f-005.webp` ▃
- 00:43.83 `motion/valuation/f-006.webp` ▇
- 00:43.95 `motion/valuation/f-007.webp` ▇
- 00:44.08 `motion/valuation/f-008.webp` ▇
- 00:44.20 `motion/valuation/f-009.webp` ▆
- 00:44.33 `motion/valuation/f-010.webp` ▅
- 00:44.45 `motion/valuation/f-011.webp` ▅
- 00:44.58 `motion/valuation/f-012.webp` ▄
- 00:44.70 `motion/valuation/f-013.webp` ▄
- 00:44.83 `motion/valuation/f-014.webp` ▂
- 00:44.95 `motion/valuation/f-015.webp` ▂
- 00:45.08 `motion/valuation/f-016.webp` ▂
- 00:45.20 `motion/valuation/f-017.webp` ▁
- 00:45.33 `motion/valuation/f-018.webp` ▂
- 00:45.45 `motion/valuation/f-019.webp` ▂
- 00:45.58 `motion/valuation/f-020.webp` ▁
- 00:45.70 `motion/valuation/f-021.webp` ▁
- 00:45.83 `motion/valuation/f-022.webp` ▁
- 00:45.95 `motion/valuation/f-023.webp` ▁

### 06. The series title, emphasis passed word to word

01:03.40–01:08.00 (4.60 s) · 29 frames at 6 fps, 0.167 s apart · band wipe, condensed type, scale pulse, slide up

Over the '7:00am' drone shot, green horizontal bands wipe in at 64.07 and leave cream graph paper with a double-stacked 'STORIES OF SCALE' in tall condensed black, a green line running through it. By 64.9 it settles to one line; at 65.07 the words part and an atom-and-book icon grows in the gap. Then the scale moves through the words: 'STORIES' is biggest at 65.7, the icon at 66.1, 'OF' at 66.6, 'SCALE' at 66.9 with a green fill wiping through it at 67.07. At 67.6 the whole card slides up to uncover the station shot underneath.

Motion: `▃▃▃▃▅▇▆▅▄▄▇▆▄▇▄▆▆▄▆▄▄▇▄▆▆▅▆▇▇`

- 01:03.40 `motion/stories-title/f-001.webp` ▃
- 01:03.57 `motion/stories-title/f-002.webp` ▃
- 01:03.73 `motion/stories-title/f-003.webp` ▃
- 01:03.90 `motion/stories-title/f-004.webp` ▃
- 01:04.07 `motion/stories-title/f-005.webp` ▅
- 01:04.23 `motion/stories-title/f-006.webp` ▇
- 01:04.40 `motion/stories-title/f-007.webp` ▆
- 01:04.57 `motion/stories-title/f-008.webp` ▅
- 01:04.73 `motion/stories-title/f-009.webp` ▄
- 01:04.90 `motion/stories-title/f-010.webp` ▄
- 01:05.07 `motion/stories-title/f-011.webp` ▇
- 01:05.23 `motion/stories-title/f-012.webp` ▆
- 01:05.40 `motion/stories-title/f-013.webp` ▄
- 01:05.57 `motion/stories-title/f-014.webp` ▇
- 01:05.73 `motion/stories-title/f-015.webp` ▄
- 01:05.90 `motion/stories-title/f-016.webp` ▆
- 01:06.07 `motion/stories-title/f-017.webp` ▆
- 01:06.23 `motion/stories-title/f-018.webp` ▄
- 01:06.40 `motion/stories-title/f-019.webp` ▆
- 01:06.57 `motion/stories-title/f-020.webp` ▄
- 01:06.73 `motion/stories-title/f-021.webp` ▄
- 01:06.90 `motion/stories-title/f-022.webp` ▇
- 01:07.07 `motion/stories-title/f-023.webp` ▄
- 01:07.23 `motion/stories-title/f-024.webp` ▆
- 01:07.40 `motion/stories-title/f-025.webp` ▆
- 01:07.57 `motion/stories-title/f-026.webp` ▅
- 01:07.73 `motion/stories-title/f-027.webp` ▆
- 01:07.90 `motion/stories-title/f-028.webp` ▇
- 01:08.07 `motion/stories-title/f-029.webp` ▇

### 07. A tracked name, then a fast-forward pace

01:11.80–01:19.20 (7.40 s) · 23 frames at 3 fps, 0.333 s apart · tracked lower third, hand-drawn arrow, speed ramp, locked-off

A locked-off wide of the station lobby. As Everett walks in on his phone, a hand-drawn arrow and 'Everett Berry / HEAD OF GTME, CLAY' appear at 72.1 and travel with him toward frame left, fading out by 74.5. He walks off left, and from about 75.5 the footage runs fast: he smears across the frame as a ghost at 75.8 and 76.4, back and forth by the windows, then drops to normal speed at 77.1 as he walks toward the lens. The onion skin shows the pacing that 'He's working already' refers to.

Motion: `▃▃▄▃▃▃▃▃▃▄▄▅▅▅▆▅▄▃▂▂▂▃▅`

Onion skin: `motion/everett-elevator/trail.webp`

- 01:11.80 `motion/everett-elevator/f-001.webp` ▃
- 01:12.13 `motion/everett-elevator/f-002.webp` ▃
- 01:12.47 `motion/everett-elevator/f-003.webp` ▄
- 01:12.80 `motion/everett-elevator/f-004.webp` ▃
- 01:13.13 `motion/everett-elevator/f-005.webp` ▃
- 01:13.47 `motion/everett-elevator/f-006.webp` ▃
- 01:13.80 `motion/everett-elevator/f-007.webp` ▃
- 01:14.13 `motion/everett-elevator/f-008.webp` ▃
- 01:14.47 `motion/everett-elevator/f-009.webp` ▃
- 01:14.80 `motion/everett-elevator/f-010.webp` ▄
- 01:15.13 `motion/everett-elevator/f-011.webp` ▄
- 01:15.47 `motion/everett-elevator/f-012.webp` ▅
- 01:15.80 `motion/everett-elevator/f-013.webp` ▅
- 01:16.13 `motion/everett-elevator/f-014.webp` ▅
- 01:16.47 `motion/everett-elevator/f-015.webp` ▆
- 01:16.80 `motion/everett-elevator/f-016.webp` ▅
- 01:17.13 `motion/everett-elevator/f-017.webp` ▄
- 01:17.47 `motion/everett-elevator/f-018.webp` ▃
- 01:17.80 `motion/everett-elevator/f-019.webp` ▂
- 01:18.13 `motion/everett-elevator/f-020.webp` ▂
- 01:18.47 `motion/everett-elevator/f-021.webp` ▂
- 01:18.80 `motion/everett-elevator/f-022.webp` ▃
- 01:19.13 `motion/everett-elevator/f-023.webp` ▅

### 08. 'MAKE Everett FAMOUS' on the train wall

02:04.30–02:07.30 (3.00 s) · 25 frames at 8 fps, 0.125 s apart · word-by-word, mixed type, punch-in, running gag

She raises her coffee to the lens, and at 124.8 the shot punches in on Everett alone. 'MAKE' snaps on in bold small caps on the grey wall to the right of his head at 124.8, 'Everett' in a handwritten script under it at 125.3, and 'FAMOUS' at 125.8, each word appearing whole, half a second apart. The type sits in the empty wall between his head and hers, and holds still while he grins.

Motion: `▄▃▆▇▆▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁`

- 02:04.30 `motion/make-famous/f-001.webp` ▄
- 02:04.42 `motion/make-famous/f-002.webp` ▃
- 02:04.55 `motion/make-famous/f-003.webp` ▆
- 02:04.67 `motion/make-famous/f-004.webp` ▇
- 02:04.80 `motion/make-famous/f-005.webp` ▆
- 02:04.92 `motion/make-famous/f-006.webp` ▄
- 02:05.05 `motion/make-famous/f-007.webp` ▂
- 02:05.17 `motion/make-famous/f-008.webp` ▁
- 02:05.30 `motion/make-famous/f-009.webp` ▁
- 02:05.42 `motion/make-famous/f-010.webp` ▁
- 02:05.55 `motion/make-famous/f-011.webp` ▁
- 02:05.67 `motion/make-famous/f-012.webp` ▁
- 02:05.80 `motion/make-famous/f-013.webp` ▁
- 02:05.92 `motion/make-famous/f-014.webp` ▁
- 02:06.05 `motion/make-famous/f-015.webp` ▁
- 02:06.17 `motion/make-famous/f-016.webp` ▁
- 02:06.30 `motion/make-famous/f-017.webp` ▁
- 02:06.42 `motion/make-famous/f-018.webp` ▁
- 02:06.55 `motion/make-famous/f-019.webp` ▁
- 02:06.67 `motion/make-famous/f-020.webp` ▁
- 02:06.80 `motion/make-famous/f-021.webp` ▁
- 02:06.92 `motion/make-famous/f-022.webp` ▁
- 02:07.05 `motion/make-famous/f-023.webp` ▁
- 02:07.17 `motion/make-famous/f-024.webp` ▁
- 02:07.30 `motion/make-famous/f-025.webp` ▁

### 09. The pickle analogy, drawn as a list

04:02.10–04:10.90 (8.80 s) · 27 frames at 3 fps, 0.333 s apart · pop on, typewriter, checkmarks, dim the rest

On the green board a tilted pickle fades up at 242.5, and three dollar signs pop around it by 243.1. Empty dark pills slide in one under another on the right from 243.8 to 245.1. Then each fills with typed text, 'Deli A' to 'Deli E', one row after another from 245.8 to 247.8, a few letters per frame. At 248.5 checkmarks land on Deli B and Deli C, and at 248.8 the other three dim. It all follows Spencer's line from 'build a list of all of the delis' to 'which ones are my customers'.

Motion: `▆▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▆`

Onion skin: `motion/pickle-list/trail.webp`

- 04:02.10 `motion/pickle-list/f-001.webp` ▆
- 04:02.43 `motion/pickle-list/f-002.webp` ▁
- 04:02.77 `motion/pickle-list/f-003.webp` ▂
- 04:03.10 `motion/pickle-list/f-004.webp` ▁
- 04:03.43 `motion/pickle-list/f-005.webp` ▁
- 04:03.77 `motion/pickle-list/f-006.webp` ▁
- 04:04.10 `motion/pickle-list/f-007.webp` ▁
- 04:04.43 `motion/pickle-list/f-008.webp` ▁
- 04:04.77 `motion/pickle-list/f-009.webp` ▁
- 04:05.10 `motion/pickle-list/f-010.webp` ▁
- 04:05.43 `motion/pickle-list/f-011.webp` ▁
- 04:05.77 `motion/pickle-list/f-012.webp` ▁
- 04:06.10 `motion/pickle-list/f-013.webp` ▁
- 04:06.43 `motion/pickle-list/f-014.webp` ▁
- 04:06.77 `motion/pickle-list/f-015.webp` ▁
- 04:07.10 `motion/pickle-list/f-016.webp` ▁
- 04:07.43 `motion/pickle-list/f-017.webp` ▁
- 04:07.77 `motion/pickle-list/f-018.webp` ▁
- 04:08.10 `motion/pickle-list/f-019.webp` ▁
- 04:08.43 `motion/pickle-list/f-020.webp` ▁
- 04:08.77 `motion/pickle-list/f-021.webp` ▁
- 04:09.10 `motion/pickle-list/f-022.webp` ▁
- 04:09.43 `motion/pickle-list/f-023.webp` ▁
- 04:09.77 `motion/pickle-list/f-024.webp` ▁
- 04:10.10 `motion/pickle-list/f-025.webp` ▁
- 04:10.43 `motion/pickle-list/f-026.webp` ▁
- 04:10.77 `motion/pickle-list/f-027.webp` ▆

### 10. From a typed prompt to a full table

04:18.80–04:25.00 (6.20 s) · 20 frames at 3 fps, 0.333 s apart · screen recording, type-on, slide, pan

Straight off Spencer's last line, the frame turns white and a Clay prompt box finishes typing 'I'm looking for a list of all the delis in nyc!! I wanna sell them pickles!!'. The cursor reaches the send button at 260.5 and clicks at 260.8. The prompt slides left as a table of delis wipes in from the right at 261.1, and the recording pans across columns of names, addresses and categories until about 265. The analogy and the product are joined with no narration between them.

Motion: `▇▁▁▁▁▁▁▅▄▄▁▁▁▁▁▁▁▁▂▄`

- 04:18.80 `motion/prompt-table/f-001.webp` ▇
- 04:19.13 `motion/prompt-table/f-002.webp` ▁
- 04:19.47 `motion/prompt-table/f-003.webp` ▁
- 04:19.80 `motion/prompt-table/f-004.webp` ▁
- 04:20.13 `motion/prompt-table/f-005.webp` ▁
- 04:20.47 `motion/prompt-table/f-006.webp` ▁
- 04:20.80 `motion/prompt-table/f-007.webp` ▁
- 04:21.13 `motion/prompt-table/f-008.webp` ▅
- 04:21.47 `motion/prompt-table/f-009.webp` ▄
- 04:21.80 `motion/prompt-table/f-010.webp` ▄
- 04:22.13 `motion/prompt-table/f-011.webp` ▁
- 04:22.47 `motion/prompt-table/f-012.webp` ▁
- 04:22.80 `motion/prompt-table/f-013.webp` ▁
- 04:23.13 `motion/prompt-table/f-014.webp` ▁
- 04:23.47 `motion/prompt-table/f-015.webp` ▁
- 04:23.80 `motion/prompt-table/f-016.webp` ▁
- 04:24.13 `motion/prompt-table/f-017.webp` ▁
- 04:24.47 `motion/prompt-table/f-018.webp` ▁
- 04:24.80 `motion/prompt-table/f-019.webp` ▂
- 04:25.13 `motion/prompt-table/f-020.webp` ▄

### 11. Messy data into a folder, out as a list

04:31.80–04:44.80 (13.00 s) · 27 frames at 2 fps, 0.500 s apart · gather, type-on, camera slide, dotted line

A blue 'GTME' folder sits on the green board as document, chart, globe, phone, cart and map-pin icons pop up around it (271.8 to 273.3). At 273.8 they fly into the folder, which bumps and then slides left and grows. 'Who visits your website' types out beside it from 275.8, 'Buying behavior' from 277.3. At 279.3 a dotted line starts from the folder and the camera slides right with it to an empty list, which types 'Who to sell to', 'Most likely to buy' and 'How to reach them' from 281.3 to 283.3. At 283.8 the dotted line turns from blue to green, as if the system is now connected.

Motion: `▂▂▁▃▅▂▁▃▁▁▁▁▁▁▁▃▄▃▁▁▁▁▁▁▁▁▅`

- 04:31.80 `motion/folder-flow/f-001.webp` ▂
- 04:32.30 `motion/folder-flow/f-002.webp` ▂
- 04:32.80 `motion/folder-flow/f-003.webp` ▁
- 04:33.30 `motion/folder-flow/f-004.webp` ▃
- 04:33.80 `motion/folder-flow/f-005.webp` ▅
- 04:34.30 `motion/folder-flow/f-006.webp` ▂
- 04:34.80 `motion/folder-flow/f-007.webp` ▁
- 04:35.30 `motion/folder-flow/f-008.webp` ▃
- 04:35.80 `motion/folder-flow/f-009.webp` ▁
- 04:36.30 `motion/folder-flow/f-010.webp` ▁
- 04:36.80 `motion/folder-flow/f-011.webp` ▁
- 04:37.30 `motion/folder-flow/f-012.webp` ▁
- 04:37.80 `motion/folder-flow/f-013.webp` ▁
- 04:38.30 `motion/folder-flow/f-014.webp` ▁
- 04:38.80 `motion/folder-flow/f-015.webp` ▁
- 04:39.30 `motion/folder-flow/f-016.webp` ▃
- 04:39.80 `motion/folder-flow/f-017.webp` ▄
- 04:40.30 `motion/folder-flow/f-018.webp` ▃
- 04:40.80 `motion/folder-flow/f-019.webp` ▁
- 04:41.30 `motion/folder-flow/f-020.webp` ▁
- 04:41.80 `motion/folder-flow/f-021.webp` ▁
- 04:42.30 `motion/folder-flow/f-022.webp` ▁
- 04:42.80 `motion/folder-flow/f-023.webp` ▁
- 04:43.30 `motion/folder-flow/f-024.webp` ▁
- 04:43.80 `motion/folder-flow/f-025.webp` ▁
- 04:44.30 `motion/folder-flow/f-026.webp` ▁
- 04:44.80 `motion/folder-flow/f-027.webp` ▅

### 12. The definition typed over the brand's landscape

04:49.60–04:54.00 (4.40 s) · 27 frames at 6 fps, 0.167 s apart · type-on, word by word, brand illustration, mixed weights

A hard cut from the studio to cream graph paper over Clay's clay-modelled landscape of hills, hedges and a rainbow river. 'Clay is the tool that lets' types one word at a time in small italic from 289.8 to 290.6. Then 'GTME' types letter by letter in heavy bold (290.8 to 291.3), its apostrophe-s set small and raised, and 'build those systems' follows in the small italic by 292.8. It holds for half a second and cuts back to the studio at 293.4. The key term is the only heavy word.

Motion: `▇▄▄▂▁▁▁▁▁▂▁▁▁▁▁▂▁▁▁▁▂▂▁▇▁▁▁`

- 04:49.60 `motion/tool-landscape/f-001.webp` ▇
- 04:49.77 `motion/tool-landscape/f-002.webp` ▄
- 04:49.93 `motion/tool-landscape/f-003.webp` ▄
- 04:50.10 `motion/tool-landscape/f-004.webp` ▂
- 04:50.27 `motion/tool-landscape/f-005.webp` ▁
- 04:50.43 `motion/tool-landscape/f-006.webp` ▁
- 04:50.60 `motion/tool-landscape/f-007.webp` ▁
- 04:50.77 `motion/tool-landscape/f-008.webp` ▁
- 04:50.93 `motion/tool-landscape/f-009.webp` ▁
- 04:51.10 `motion/tool-landscape/f-010.webp` ▂
- 04:51.27 `motion/tool-landscape/f-011.webp` ▁
- 04:51.43 `motion/tool-landscape/f-012.webp` ▁
- 04:51.60 `motion/tool-landscape/f-013.webp` ▁
- 04:51.77 `motion/tool-landscape/f-014.webp` ▁
- 04:51.93 `motion/tool-landscape/f-015.webp` ▁
- 04:52.10 `motion/tool-landscape/f-016.webp` ▂
- 04:52.27 `motion/tool-landscape/f-017.webp` ▁
- 04:52.43 `motion/tool-landscape/f-018.webp` ▁
- 04:52.60 `motion/tool-landscape/f-019.webp` ▁
- 04:52.77 `motion/tool-landscape/f-020.webp` ▁
- 04:52.93 `motion/tool-landscape/f-021.webp` ▂
- 04:53.10 `motion/tool-landscape/f-022.webp` ▂
- 04:53.27 `motion/tool-landscape/f-023.webp` ▁
- 04:53.43 `motion/tool-landscape/f-024.webp` ▇
- 04:53.60 `motion/tool-landscape/f-025.webp` ▁
- 04:53.77 `motion/tool-landscape/f-026.webp` ▁
- 04:53.93 `motion/tool-landscape/f-027.webp` ▁

### 13. The sponsor read slides into a product shot

05:36.60–05:48.00 (11.40 s) · 24 frames at 2 fps, 0.500 s apart · slide down, card push, page flips, progress bar

A thin green bar along the bottom of the frame has been growing since 'quick pause'. At 337.1 the studio shot slides down out of frame to uncover the cream show board, and at 338.6 a black card, 'GTM ENGINEERING PLAYBOOK / 5 OPERATIONAL FRAMEWORKS', pushes in from the right with a pale green border and a spiral drawing. It changes to an inside spread with a target and arrow at 342.1 and to a page headed 'FIVE NAMED FRAMEWORKS. ALL OPERATIONAL.' at 344.6. At 347.6 it dissolves back to her, with the cover now standing beside her in the studio. The bar keeps filling the whole time, so viewers can see how long the ad will last.

Motion: `▃▄▅▃▄▅▅▄▁▁▁▅▁▁▁▁▄▁▁▁▁▁▆▆`

- 05:36.60 `motion/playbook/f-001.webp` ▃
- 05:37.10 `motion/playbook/f-002.webp` ▄
- 05:37.60 `motion/playbook/f-003.webp` ▅
- 05:38.10 `motion/playbook/f-004.webp` ▃
- 05:38.60 `motion/playbook/f-005.webp` ▄
- 05:39.10 `motion/playbook/f-006.webp` ▅
- 05:39.60 `motion/playbook/f-007.webp` ▅
- 05:40.10 `motion/playbook/f-008.webp` ▄
- 05:40.60 `motion/playbook/f-009.webp` ▁
- 05:41.10 `motion/playbook/f-010.webp` ▁
- 05:41.60 `motion/playbook/f-011.webp` ▁
- 05:42.10 `motion/playbook/f-012.webp` ▅
- 05:42.60 `motion/playbook/f-013.webp` ▁
- 05:43.10 `motion/playbook/f-014.webp` ▁
- 05:43.60 `motion/playbook/f-015.webp` ▁
- 05:44.10 `motion/playbook/f-016.webp` ▁
- 05:44.60 `motion/playbook/f-017.webp` ▄
- 05:45.10 `motion/playbook/f-018.webp` ▁
- 05:45.60 `motion/playbook/f-019.webp` ▁
- 05:46.10 `motion/playbook/f-020.webp` ▁
- 05:46.60 `motion/playbook/f-021.webp` ▁
- 05:47.10 `motion/playbook/f-022.webp` ▁
- 05:47.60 `motion/playbook/f-023.webp` ▆
- 05:48.10 `motion/playbook/f-024.webp` ▆

### 14. Five years at '~$0'

06:09.60–06:16.00 (6.40 s) · 20 frames at 3 fps, 0.333 s apart · timeline ruler, type-on, scroll, deadpan

On white graph paper the Clay logo fades up at 369.9, 'REVENUE' types out under it, and '~$0' fades in at 370.6 above a small triangle marker. A ruler of years rises into place by 371.3 with 2017 under the marker. Then the years slide left under the fixed marker one by one (2018 at 372.6, 2019 at 372.9, 2020 at 373.6, 2021 at 373.9, 2022 at 374.6) while '~$0' never changes. It holds on 2022 and cuts to Varun drinking water under 'nothing really happened for a while'.

Motion: `▂▂▂▂▂▂▁▂▂▂▂▂▂▂▂▃▂▂▂▇`

- 06:09.60 `motion/revenue-ruler/f-001.webp` ▂
- 06:09.93 `motion/revenue-ruler/f-002.webp` ▂
- 06:10.27 `motion/revenue-ruler/f-003.webp` ▂
- 06:10.60 `motion/revenue-ruler/f-004.webp` ▂
- 06:10.93 `motion/revenue-ruler/f-005.webp` ▂
- 06:11.27 `motion/revenue-ruler/f-006.webp` ▂
- 06:11.60 `motion/revenue-ruler/f-007.webp` ▁
- 06:11.93 `motion/revenue-ruler/f-008.webp` ▂
- 06:12.27 `motion/revenue-ruler/f-009.webp` ▂
- 06:12.60 `motion/revenue-ruler/f-010.webp` ▂
- 06:12.93 `motion/revenue-ruler/f-011.webp` ▂
- 06:13.27 `motion/revenue-ruler/f-012.webp` ▂
- 06:13.60 `motion/revenue-ruler/f-013.webp` ▂
- 06:13.93 `motion/revenue-ruler/f-014.webp` ▂
- 06:14.27 `motion/revenue-ruler/f-015.webp` ▂
- 06:14.60 `motion/revenue-ruler/f-016.webp` ▃
- 06:14.93 `motion/revenue-ruler/f-017.webp` ▂
- 06:15.27 `motion/revenue-ruler/f-018.webp` ▂
- 06:15.60 `motion/revenue-ruler/f-019.webp` ▂
- 06:15.93 `motion/revenue-ruler/f-020.webp` ▇

### 15. 'DATA TOOL' becomes 'SYSTEM'

06:43.80–06:51.80 (8.00 s) · 25 frames at 3 fps, 0.333 s apart · type-on, label swap, camera move, tiles

The Clay logo pops up on the green board at 404.1 and 'DATA TOOL' types under it by 405.1. At 405.5 a red hand-lettered banner sweeps across and replaces it with 'SYSTEM', and the group drifts up while a hand-drawn arrow curls out from the banner at 406.8. The camera follows it down to the right, where three dark tiles pop in one after another, each with a clay-like icon and a typed label: 'Find the Right People' at 407.5, 'Understand them' at 408.8, 'Reach out to them' at 409.8. It cuts back to the studio at 411.4.

Motion: `▆▁▁▁▁▁▁▁▄▅▅▂▁▁▁▁▁▁▁▁▁▁▁▆▂`

- 06:43.80 `motion/data-tool-system/f-001.webp` ▆
- 06:44.13 `motion/data-tool-system/f-002.webp` ▁
- 06:44.47 `motion/data-tool-system/f-003.webp` ▁
- 06:44.80 `motion/data-tool-system/f-004.webp` ▁
- 06:45.13 `motion/data-tool-system/f-005.webp` ▁
- 06:45.47 `motion/data-tool-system/f-006.webp` ▁
- 06:45.80 `motion/data-tool-system/f-007.webp` ▁
- 06:46.13 `motion/data-tool-system/f-008.webp` ▁
- 06:46.47 `motion/data-tool-system/f-009.webp` ▄
- 06:46.80 `motion/data-tool-system/f-010.webp` ▅
- 06:47.13 `motion/data-tool-system/f-011.webp` ▅
- 06:47.47 `motion/data-tool-system/f-012.webp` ▂
- 06:47.80 `motion/data-tool-system/f-013.webp` ▁
- 06:48.13 `motion/data-tool-system/f-014.webp` ▁
- 06:48.47 `motion/data-tool-system/f-015.webp` ▁
- 06:48.80 `motion/data-tool-system/f-016.webp` ▁
- 06:49.13 `motion/data-tool-system/f-017.webp` ▁
- 06:49.47 `motion/data-tool-system/f-018.webp` ▁
- 06:49.80 `motion/data-tool-system/f-019.webp` ▁
- 06:50.13 `motion/data-tool-system/f-020.webp` ▁
- 06:50.47 `motion/data-tool-system/f-021.webp` ▁
- 06:50.80 `motion/data-tool-system/f-022.webp` ▁
- 06:51.13 `motion/data-tool-system/f-023.webp` ▁
- 06:51.47 `motion/data-tool-system/f-024.webp` ▆
- 06:51.80 `motion/data-tool-system/f-025.webp` ▂

### 16. The ruler finally moves

08:48.80–08:57.00 (8.20 s) · 26 frames at 3 fps, 0.333 s apart · timeline ruler, logo stack, count up, callback

The white timeline returns on 2024, with the faded 'LAUNCHED ON Product Hunt' label still at the left edge. 'Figma' fades in under the logo at 530.8 and 'OpenAI' under it at 531.5. At 533.5 the years slide on to 2025, the two names dim, and 'REVENUE' types out with a number already counting: $42 million at 534.8, $68 million at 535.1, $93 million at 535.5, landing on '$100,000,000' at 535.8. The same ruler that sat at '~$0' for five years now spins, and the callback is the point.

Motion: `▇▂▂▁▁▂▁▁▂▂▂▂▁▁▂▂▃▂▂▂▂▁▁▂▆▃`

- 08:48.80 `motion/revenue-counter/f-001.webp` ▇
- 08:49.13 `motion/revenue-counter/f-002.webp` ▂
- 08:49.47 `motion/revenue-counter/f-003.webp` ▂
- 08:49.80 `motion/revenue-counter/f-004.webp` ▁
- 08:50.13 `motion/revenue-counter/f-005.webp` ▁
- 08:50.47 `motion/revenue-counter/f-006.webp` ▂
- 08:50.80 `motion/revenue-counter/f-007.webp` ▁
- 08:51.13 `motion/revenue-counter/f-008.webp` ▁
- 08:51.47 `motion/revenue-counter/f-009.webp` ▂
- 08:51.80 `motion/revenue-counter/f-010.webp` ▂
- 08:52.13 `motion/revenue-counter/f-011.webp` ▂
- 08:52.47 `motion/revenue-counter/f-012.webp` ▂
- 08:52.80 `motion/revenue-counter/f-013.webp` ▁
- 08:53.13 `motion/revenue-counter/f-014.webp` ▁
- 08:53.47 `motion/revenue-counter/f-015.webp` ▂
- 08:53.80 `motion/revenue-counter/f-016.webp` ▂
- 08:54.13 `motion/revenue-counter/f-017.webp` ▃
- 08:54.47 `motion/revenue-counter/f-018.webp` ▂
- 08:54.80 `motion/revenue-counter/f-019.webp` ▂
- 08:55.13 `motion/revenue-counter/f-020.webp` ▂
- 08:55.47 `motion/revenue-counter/f-021.webp` ▂
- 08:55.80 `motion/revenue-counter/f-022.webp` ▁
- 08:56.13 `motion/revenue-counter/f-023.webp` ▁
- 08:56.47 `motion/revenue-counter/f-024.webp` ▂
- 08:56.80 `motion/revenue-counter/f-025.webp` ▆
- 08:57.13 `motion/revenue-counter/f-026.webp` ▃

### 17. Three clock stamps, three meetings

09:36.60–09:42.00 (5.40 s) · 17 frames at 3 fps, 0.333 s apart · time stamp, montage, hard cuts

After she slips out of one meeting, three shots of other meetings follow at about 1.3 seconds each, each with a white clock time centered on it: '1:00pm' at 576.9 over Everett rubbing his eyes, '1:30pm' at 578.3 over a packed room watching a deck, '2:30pm' at 579.6 over a smaller table. The stamps appear on the cut and leave on the next one. A fourth shot of the big room plays clean at 580.9. The film's time stamps, used since '7:00am', here squeeze an afternoon into four seconds.

Motion: `▆▆▂▂▂▆▅▄▆▁▂▂▅▄▆▆▆`

- 09:36.60 `motion/time-stamps/f-001.webp` ▆
- 09:36.93 `motion/time-stamps/f-002.webp` ▆
- 09:37.27 `motion/time-stamps/f-003.webp` ▂
- 09:37.60 `motion/time-stamps/f-004.webp` ▂
- 09:37.93 `motion/time-stamps/f-005.webp` ▂
- 09:38.27 `motion/time-stamps/f-006.webp` ▆
- 09:38.60 `motion/time-stamps/f-007.webp` ▅
- 09:38.93 `motion/time-stamps/f-008.webp` ▄
- 09:39.27 `motion/time-stamps/f-009.webp` ▆
- 09:39.60 `motion/time-stamps/f-010.webp` ▁
- 09:39.93 `motion/time-stamps/f-011.webp` ▂
- 09:40.27 `motion/time-stamps/f-012.webp` ▂
- 09:40.60 `motion/time-stamps/f-013.webp` ▅
- 09:40.93 `motion/time-stamps/f-014.webp` ▄
- 09:41.27 `motion/time-stamps/f-015.webp` ▆
- 09:41.60 `motion/time-stamps/f-016.webp` ▆
- 09:41.93 `motion/time-stamps/f-017.webp` ▆

### 18. 'CONFIDENTIAL' types over a blurred meeting

11:03.60–11:10.00 (6.40 s) · 39 frames at 6 fps, 0.167 s apart · defocus, type-on, letter by letter, censor

From the back of her head at 664.1, the cut lands on a shot of the customer meeting thrown so far out of focus that only shapes and colors remain. 'CONFIDENTIAL' types itself in heavy white caps from 664.3, a letter every one or two frames ('C', 'CO', 'CONFI', 'CONFIDEN'), complete at 667.4. As Everett leans into frame behind the type, the camera drifts and at 667.9 the word jumps larger and recenters. It holds until 669.6 and cuts to a sharp shot of the park sign. The blur and the word together say that the scene exists but cannot be shown.

Motion: `▆▆▇▇▇▃▃▃▃▃▂▂▄▅▆▇▇▇▇▆▅▃▃▃▂▂▆▂▂▂▃▂▂▂▂▃▂▇▃`

- 11:03.60 `motion/confidential/f-001.webp` ▆
- 11:03.77 `motion/confidential/f-002.webp` ▆
- 11:03.93 `motion/confidential/f-003.webp` ▇
- 11:04.10 `motion/confidential/f-004.webp` ▇
- 11:04.27 `motion/confidential/f-005.webp` ▇
- 11:04.43 `motion/confidential/f-006.webp` ▃
- 11:04.60 `motion/confidential/f-007.webp` ▃
- 11:04.77 `motion/confidential/f-008.webp` ▃
- 11:04.93 `motion/confidential/f-009.webp` ▃
- 11:05.10 `motion/confidential/f-010.webp` ▃
- 11:05.27 `motion/confidential/f-011.webp` ▂
- 11:05.43 `motion/confidential/f-012.webp` ▂
- 11:05.60 `motion/confidential/f-013.webp` ▄
- 11:05.77 `motion/confidential/f-014.webp` ▅
- 11:05.93 `motion/confidential/f-015.webp` ▆
- 11:06.10 `motion/confidential/f-016.webp` ▇
- 11:06.27 `motion/confidential/f-017.webp` ▇
- 11:06.43 `motion/confidential/f-018.webp` ▇
- 11:06.60 `motion/confidential/f-019.webp` ▇
- 11:06.77 `motion/confidential/f-020.webp` ▆
- 11:06.93 `motion/confidential/f-021.webp` ▅
- 11:07.10 `motion/confidential/f-022.webp` ▃
- 11:07.27 `motion/confidential/f-023.webp` ▃
- 11:07.43 `motion/confidential/f-024.webp` ▃
- 11:07.60 `motion/confidential/f-025.webp` ▂
- 11:07.77 `motion/confidential/f-026.webp` ▂
- 11:07.93 `motion/confidential/f-027.webp` ▆
- 11:08.10 `motion/confidential/f-028.webp` ▂
- 11:08.27 `motion/confidential/f-029.webp` ▂
- 11:08.43 `motion/confidential/f-030.webp` ▂
- 11:08.60 `motion/confidential/f-031.webp` ▃
- 11:08.77 `motion/confidential/f-032.webp` ▂
- 11:08.93 `motion/confidential/f-033.webp` ▂
- 11:09.10 `motion/confidential/f-034.webp` ▂
- 11:09.27 `motion/confidential/f-035.webp` ▂
- 11:09.43 `motion/confidential/f-036.webp` ▃
- 11:09.60 `motion/confidential/f-037.webp` ▂
- 11:09.77 `motion/confidential/f-038.webp` ▇
- 11:09.93 `motion/confidential/f-039.webp` ▃

### 19. A three-item checklist in clay numerals

11:36.85–11:42.10 (5.25 s) · 22 frames at 4 fps, 0.250 s apart · pop on, hand lettering, type-on, stagger

'GTME Checklist' sits at the top of the green board. A teal 3D '1' fades up at 697.1 and 'KNOW GTM WELL' writes itself under it in hand lettering. A coral '2' follows at 698.1 with 'KNOW CLAY WELL', and a yellow '3' at 699.6 with 'BE A GOOD SALES PERSON', each label appearing a few letters at a time as she says it. Each item takes about a second and a half, matched to her three clauses, and the finished list holds for a beat and a half.

Motion: `▆▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▆`

Onion skin: `motion/checklist/trail.webp`

- 11:36.85 `motion/checklist/f-001.webp` ▆
- 11:37.10 `motion/checklist/f-002.webp` ▁
- 11:37.35 `motion/checklist/f-003.webp` ▁
- 11:37.60 `motion/checklist/f-004.webp` ▁
- 11:37.85 `motion/checklist/f-005.webp` ▁
- 11:38.10 `motion/checklist/f-006.webp` ▁
- 11:38.35 `motion/checklist/f-007.webp` ▁
- 11:38.60 `motion/checklist/f-008.webp` ▁
- 11:38.85 `motion/checklist/f-009.webp` ▁
- 11:39.10 `motion/checklist/f-010.webp` ▁
- 11:39.35 `motion/checklist/f-011.webp` ▁
- 11:39.60 `motion/checklist/f-012.webp` ▁
- 11:39.85 `motion/checklist/f-013.webp` ▁
- 11:40.10 `motion/checklist/f-014.webp` ▁
- 11:40.35 `motion/checklist/f-015.webp` ▁
- 11:40.60 `motion/checklist/f-016.webp` ▁
- 11:40.85 `motion/checklist/f-017.webp` ▁
- 11:41.10 `motion/checklist/f-018.webp` ▁
- 11:41.35 `motion/checklist/f-019.webp` ▁
- 11:41.60 `motion/checklist/f-020.webp` ▁
- 11:41.85 `motion/checklist/f-021.webp` ▁
- 11:42.10 `motion/checklist/f-022.webp` ▆

### 20. Leads pass from one team to the other

13:43.80–13:53.00 (9.20 s) · 29 frames at 3 fps, 0.333 s apart · pop on, camera slide, color change, handoff

From Everett's whiteboard to the green board at 824.5: the blue-green 'INTERNAL' group sits alone, and small pink face tokens pop up beside it from 825.1 to 825.8, the leads it brings in. By 827.5 most of them turn grey and one stays pink. At 829.1 the camera starts sliding right; the 'FORWARD DEPLOYED' group arrives at 829.5, and the pink token travels across the gap to sit beside it by 830.5 while the grey ones stay with the internal team. The colors do the explaining: grey for leads that stop, pink for the enterprise fit that is handed on.

Motion: `▄▇▁▁▁▁▁▁▁▁▁▁▁▁▃▄▅▅▄▃▂▁▁▁▁▁▅▂▂`

- 13:43.80 `motion/lead-handoff/f-001.webp` ▄
- 13:44.13 `motion/lead-handoff/f-002.webp` ▇
- 13:44.47 `motion/lead-handoff/f-003.webp` ▁
- 13:44.80 `motion/lead-handoff/f-004.webp` ▁
- 13:45.13 `motion/lead-handoff/f-005.webp` ▁
- 13:45.47 `motion/lead-handoff/f-006.webp` ▁
- 13:45.80 `motion/lead-handoff/f-007.webp` ▁
- 13:46.13 `motion/lead-handoff/f-008.webp` ▁
- 13:46.47 `motion/lead-handoff/f-009.webp` ▁
- 13:46.80 `motion/lead-handoff/f-010.webp` ▁
- 13:47.13 `motion/lead-handoff/f-011.webp` ▁
- 13:47.47 `motion/lead-handoff/f-012.webp` ▁
- 13:47.80 `motion/lead-handoff/f-013.webp` ▁
- 13:48.13 `motion/lead-handoff/f-014.webp` ▁
- 13:48.47 `motion/lead-handoff/f-015.webp` ▃
- 13:48.80 `motion/lead-handoff/f-016.webp` ▄
- 13:49.13 `motion/lead-handoff/f-017.webp` ▅
- 13:49.47 `motion/lead-handoff/f-018.webp` ▅
- 13:49.80 `motion/lead-handoff/f-019.webp` ▄
- 13:50.13 `motion/lead-handoff/f-020.webp` ▃
- 13:50.47 `motion/lead-handoff/f-021.webp` ▂
- 13:50.80 `motion/lead-handoff/f-022.webp` ▁
- 13:51.13 `motion/lead-handoff/f-023.webp` ▁
- 13:51.47 `motion/lead-handoff/f-024.webp` ▁
- 13:51.80 `motion/lead-handoff/f-025.webp` ▁
- 13:52.13 `motion/lead-handoff/f-026.webp` ▁
- 13:52.47 `motion/lead-handoff/f-027.webp` ▅
- 13:52.80 `motion/lead-handoff/f-028.webp` ▂
- 13:53.13 `motion/lead-handoff/f-029.webp` ▂

### 21. Two teams and one loop

14:45.80–14:54.00 (8.20 s) · 26 frames at 3 fps, 0.333 s apart · pop on, token travel, dotted line, pull back

After a pass by the Clay lobby, the two teams sit on the green board as a pair. Pink lead tokens pop next to 'INTERNAL' at 886.5 and 886.8, most fade to grey, and from 888.1 one pink token crosses to 'FORWARD DEPLOYED'. At 890.1 it turns into green '$$'. Dotted lines start up from both teams at 890.5, the camera pulls back and down, and the Clay logo drops in at the top by 891.5 so the lines close into a triangle. It holds until the cut to Everett at 894.1, on 'two teams, one loop'.

Motion: `▁▆▁▁▁▁▁▃▅▃▁▁▁▁▁▃▄▄▂▁▁▁▁▁▁▇`

- 14:45.80 `motion/revenue-loop/f-001.webp` ▁
- 14:46.13 `motion/revenue-loop/f-002.webp` ▆
- 14:46.47 `motion/revenue-loop/f-003.webp` ▁
- 14:46.80 `motion/revenue-loop/f-004.webp` ▁
- 14:47.13 `motion/revenue-loop/f-005.webp` ▁
- 14:47.47 `motion/revenue-loop/f-006.webp` ▁
- 14:47.80 `motion/revenue-loop/f-007.webp` ▁
- 14:48.13 `motion/revenue-loop/f-008.webp` ▃
- 14:48.47 `motion/revenue-loop/f-009.webp` ▅
- 14:48.80 `motion/revenue-loop/f-010.webp` ▃
- 14:49.13 `motion/revenue-loop/f-011.webp` ▁
- 14:49.47 `motion/revenue-loop/f-012.webp` ▁
- 14:49.80 `motion/revenue-loop/f-013.webp` ▁
- 14:50.13 `motion/revenue-loop/f-014.webp` ▁
- 14:50.47 `motion/revenue-loop/f-015.webp` ▁
- 14:50.80 `motion/revenue-loop/f-016.webp` ▃
- 14:51.13 `motion/revenue-loop/f-017.webp` ▄
- 14:51.47 `motion/revenue-loop/f-018.webp` ▄
- 14:51.80 `motion/revenue-loop/f-019.webp` ▂
- 14:52.13 `motion/revenue-loop/f-020.webp` ▁
- 14:52.47 `motion/revenue-loop/f-021.webp` ▁
- 14:52.80 `motion/revenue-loop/f-022.webp` ▁
- 14:53.13 `motion/revenue-loop/f-023.webp` ▁
- 14:53.47 `motion/revenue-loop/f-024.webp` ▁
- 14:53.80 `motion/revenue-loop/f-025.webp` ▁
- 14:54.13 `motion/revenue-loop/f-026.webp` ▇

### 22. A gag ending on color bars

16:46.50–16:50.00 (3.50 s) · 22 frames at 6 fps, 0.167 s apart · physical comedy, lean into lens, hard cut, color bars

After the credits she tries the promised pickle. At 1007.2 she puts the jar down, covers her mouth and sits back, and from 1007.8 she leans forward until her head fills the lens and goes out of focus by 1009.0. The cut at 1009.5 lands on broadcast color bars with a 'PLEASE STAND BY' banner, and the video ends there. The show's old-TV props in the studio make the broadcast joke fit.

Motion: `▂▂▂▂▃▅▂▃▄▄▄▅▆▆▅▅▄█▁▁▁▁`

- 16:46.50 `motion/stand-by/f-001.webp` ▂
- 16:46.67 `motion/stand-by/f-002.webp` ▂
- 16:46.83 `motion/stand-by/f-003.webp` ▂
- 16:47.00 `motion/stand-by/f-004.webp` ▂
- 16:47.17 `motion/stand-by/f-005.webp` ▃
- 16:47.33 `motion/stand-by/f-006.webp` ▅
- 16:47.50 `motion/stand-by/f-007.webp` ▂
- 16:47.67 `motion/stand-by/f-008.webp` ▃
- 16:47.83 `motion/stand-by/f-009.webp` ▄
- 16:48.00 `motion/stand-by/f-010.webp` ▄
- 16:48.17 `motion/stand-by/f-011.webp` ▄
- 16:48.33 `motion/stand-by/f-012.webp` ▅
- 16:48.50 `motion/stand-by/f-013.webp` ▆
- 16:48.67 `motion/stand-by/f-014.webp` ▆
- 16:48.83 `motion/stand-by/f-015.webp` ▅
- 16:49.00 `motion/stand-by/f-016.webp` ▅
- 16:49.17 `motion/stand-by/f-017.webp` ▄
- 16:49.33 `motion/stand-by/f-018.webp` █
- 16:49.50 `motion/stand-by/f-019.webp` ▁
- 16:49.67 `motion/stand-by/f-020.webp` ▁
- 16:49.83 `motion/stand-by/f-021.webp` ▁
- 16:50.00 `motion/stand-by/f-022.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Cold open in the studio set: Payton Kirol on a desk chair with a hand mic, in a bare white loft with a filing cabinet, an old TV, a rug and scattered props. This set is the narration booth. Every explanation comes back here.
- 00:04.00 `seconds/second-00005.webp` Startup logos (Clay, Ramp, Docker, Hex, Unify, MaintainX, Modal, Vercel, Rippling and more) pop on around her as frosted chips on 'some of the fastest-growing startups'. The claim is shown as a crowd of brands before any number.
- 00:08.00 `seconds/second-00009.webp` Hard cut to the show's chalkboard green: hand-drawn white axes and two bars, 'LAST YEAR' and 'THIS YEAR'. The green grid is the film's whiteboard for every explainer that follows.
- 00:11.00 `seconds/second-00012.webp` The camera has pushed in until the 'THIS YEAR' bar fills the frame, with '5000%' inside it. The statistic is told by scale rather than by labelled axes.
- 00:13.00 `seconds/second-00014.webp` 'GO-TO-MARKET ENGINEER' set word by word in heavy white sans, after a punch-in on the same take. Jump cuts inside one studio take keep the monologue moving.
- 00:15.00 `seconds/second-00016.webp` A handheld wide-angle close-up in Times Square, her face a foot from the lens. The questions ('Is it engineering? Is it marketing?') leave the studio for the street.
- 00:17.00 `seconds/second-00018.webp` 'WTF is a GTME?' on the green board: the swear in hand lettering, the acronym in the bold sans. The word muted in the voice is spelled out in the type.
- 00:18.00 `seconds/second-00019.webp` Lower third 'Payton Kirol / HOST & PRODUCER' over Times Square billboards. She is named only after the hook, eighteen seconds in.
- 00:28.00 `seconds/second-00029.webp` She walks past the Clay logo on the lobby wall: 'which is exactly why I ended up here inside Clay.' The company is introduced as a place she enters.
- 00:35.00 `seconds/second-00036.webp` Clay's 3D logo, a soft blue arch over red and yellow, grows as a year counter rolls from 2017 to 2026. Nine years of history in four seconds.
- 00:42.00 `seconds/second-00043.webp` 'ANTHROPIC' and then 'Google' appear as dark pills on the green board as she names them. Customers are said and shown at once.
- 00:44.00 `seconds/second-00045.webp` A green box counts up to '$5,000,000,000' behind her head, its middle digits hidden by her hair. The number is layered behind the host, so the graphic sits in the room.
- 00:47.00 `seconds/second-00048.webp` A drone shot of a Clay billboard: 'Michelangelo had marble. GTM has clay.' Clay's own advertising stands in as proof that it is a big company.
- 00:51.00 `seconds/second-00052.webp` First look at Everett Berry, walking a sunny street with her. The person the day will follow is seen before he is named.
- 00:54.00 `seconds/second-00055.webp` A full conference table of Clay staff, shot wide, for 'what they actually do all day'.
- 01:03.00 `seconds/second-00064.webp` '7:00am' in small white type over a top-down drone shot of the city. Clock stamps give the day its structure from here to the afternoon.
- 01:05.00 `seconds/second-00066.webp` The series title, 'STORIES OF SCALE', in tall condensed black on cream graph paper with green doodles and an atom-and-book icon between the words. The show package is cream; the explainer board is green.
- 01:10.00 `seconds/second-00071.webp` Burned-in yellow italic subtitles (here 'he's on the phone') appear only for quiet or off-mic lines. Everything else is left to the voice.
- 01:12.00 `seconds/second-00073.webp` 'Everett Berry / HEAD OF GTME, CLAY' with a hand-drawn arrow that follows him as he paces the station on his phone. The lower third is tracked to him rather than pinned in a corner.
- 01:33.00 `seconds/second-00094.webp` Two-shot across the train seats on a wide lens. Most of the commute plays in this one setup while the window light changes.
- 01:45.00 `seconds/second-00106.webp` Close on her face as she asks 'Are you under pressure because we're watching you?' The film keeps the crew's presence in the story.
- 02:06.00 `seconds/second-00127.webp` 'MAKE Everett FAMOUS' builds word by word on the train wall beside him, the name in handwriting between two sans words. The running joke gets a title card inside the shot.
- 02:08.00 `seconds/second-00129.webp` '8:40am' over a blurred overhead line from the moving train.
- 02:13.00 `seconds/second-00134.webp` His LinkedIn post on a laptop screen, shot at an angle in shallow focus. The work of the commute is shown as he made it, not as a clean screen recording.
- 02:16.00 `seconds/second-00137.webp` Her 'so insightful!' comment rebuilt as a white card on the green board, under her own name and title. The comment is the punchline, so it gets a graphic.
- 02:30.00 `seconds/second-00151.webp` The Clay logo wall in the office, awards on the ledge, as they arrive.
- 02:38.00 `seconds/second-00159.webp` A coworker holds up her phone to photograph him across the desks. The 'famous' joke pays off with real reactions in the office.
- 03:00.00 `seconds/second-00181.webp` She bites a cinnamon roll she found on a desk. A small detour that keeps the host's personality between interviews.
- 03:10.00 `seconds/second-00191.webp` Engineers at their desks answer the same question in one line each, named in white lower thirds ('Andrew, GTM ENGINEER', 'George'). Asking several people one question becomes a montage.
- 03:13.00 `seconds/second-00194.webp` Spencer, an internal GTM engineer, on a yellow sofa by the window in a two-shot with her. The interviews are conversations with the host in frame, not formal sit-downs.
- 03:45.00 `seconds/second-00226.webp` She holds up a jar of pickles in the studio: 'I've never had a pickle.' The prop is set up here and paid off in the last minute.
- 04:04.00 `seconds/second-00245.webp` A pickle with dollar signs and a list of delis that types itself; then two delis get check marks. Spencer's analogy is drawn as he says it.
- 04:19.00 `seconds/second-00260.webp` A Clay prompt, 'I'm looking for a list of all the delis in nyc!! I wanna sell them pickles!!', typed into the real product. The analogy becomes a product demo in one cut.
- 04:23.00 `seconds/second-00264.webp` The resulting Clay table of New York delis, as a full-frame screen recording.
- 04:33.00 `seconds/second-00274.webp` Document, chart, phone and cart icons gather around a blue 'GTME' folder on the green board: the narration's 'messy data'.
- 04:43.00 `seconds/second-00284.webp` 'Who to sell to / Most likely to buy / How to reach them' fill a list at the end of a dotted line from the folder. The job is laid out as input, system and output.
- 04:52.00 `seconds/second-00293.webp` 'Clay is the tool that lets GTMEs build those systems' over Clay's own clay-modelled landscape of hills and a river. The one-line product definition is set on the brand's art.
- 05:03.00 `seconds/second-00304.webp` Spencer hypes up a coworker at her desk and she covers her face; 'this is not good hype' is subtitled.
- 05:28.00 `seconds/second-00329.webp` She leans into the lens with a hand up for 'quick pause'. The sponsor read starts with a closer framing, and a thin green bar along the bottom fills over its thirty seconds.
- 05:40.00 `seconds/second-00341.webp` The 'GTM ENGINEERING PLAYBOOK' cover, black with green type, on the cream show board. The free offer is shown as a product.
- 06:06.00 `seconds/second-00367.webp` Varun Anand, named with an arrow as 'COFOUNDER + HEAD OF OPERATIONS', turns to a whiteboard. The founder tells the history standing up, marker in hand.
- 06:11.00 `seconds/second-00372.webp` On white graph paper the Clay logo sits over 'REVENUE ~$0' while the years slide under a marker from 2017 to 2022. The joke is that the number never moves.
- 06:16.00 `seconds/second-00377.webp` Varun drinks from a glass of water under the subtitle 'nothing really happened for a while'. A pause shot used as the punchline.
- 06:22.00 `seconds/second-00383.webp` An empty Clay table filling with company rows, recorded in the product, for 'a spreadsheet that could pull data from anywhere'.
- 06:46.00 `seconds/second-00407.webp` 'DATA TOOL' turns into a red hand-lettered 'SYSTEM' banner under the Clay logo, and three tiles follow: Find the right people, Understand them, Reach out to them.
- 07:02.00 `seconds/second-00423.webp` A tighter studio framing, closer and at chest height. The studio narration cuts between two or three sizes so long passages never sit on one frame.
- 07:06.00 `seconds/second-00427.webp` Varun's whiteboard fills with his own timeline as he talks: years, stick figures, 'Product Hunt'. His drawing and the motion graphics tell the same history twice.
- 07:18.00 `seconds/second-00439.webp` 'STARTUPS ✓ / ENTERPRISE ✗' at 2024 on the timeline. The second act's problem in two words and two marks.
- 08:05.00 `seconds/second-00486.webp` Everett joins Varun at the whiteboard, and the two retell how the role got its name.
- 08:10.00 `seconds/second-00491.webp` The Slack message that named the team, rebuilt as a card on the green board: 'varun 7:29 AM · I like the name GTM engineer … will go w that title for the team', February 7th, 2024.
- 08:27.00 `seconds/second-00508.webp` A Clay table with job titles boxed in red, for 'we'll prove to you that we can solve it through this data test'.
- 08:56.00 `seconds/second-00537.webp` Revenue counts up to '$100,000,000' at 2025 on the same timeline, Figma and OpenAI faded above. The ruler that sat at ~$0 for five years finally moves.
- 09:20.00 `seconds/second-00561.webp` Melina, 'HEAD OF GTM ENABLEMENT', and Daniel, a GTM engineer, are named as she walks into their meeting room.
- 09:21.00 `seconds/second-00562.webp` The 'Pricing & Negotiation Part 2' deck on the room screen, with a clay-modelled cover in Clay's brand style.
- 09:37.00 `seconds/second-00578.webp` '1:00pm', '1:30pm' and '2:30pm' stamped over three meetings in a row. Clock stamps compress an afternoon into four seconds.
- 09:54.00 `seconds/second-00595.webp` She stands among the desks with a laptop and says they have lost Everett. Looking for him becomes the excuse to show more of the office.
- 10:09.00 `seconds/second-00610.webp` 'no one responded' subtitled as she calls his name across the floor.
- 10:15.00 `seconds/second-00616.webp` Everett reappears, laughing, with an explanation about another meeting.
- 10:28.00 `seconds/second-00629.webp` '2:45pm' over a low angle of Manhattan towers and a crossing signal.
- 10:45.00 `seconds/second-00646.webp` Meeting the AWS customer on a street corner, a wide handheld with traffic behind them.
- 11:04.00 `seconds/second-00665.webp` 'CONFIDENTIAL' types itself letter by letter over a heavily blurred shot of the meeting. The film shows that it cannot show the meeting.
- 11:12.00 `seconds/second-00673.webp` She leans on the park wall and talks to camera while the meeting goes on without her.
- 11:32.00 `seconds/second-00693.webp` A walking interview on the sidewalk with yellow subtitles: 'build like a (Proof of Concept) for them'. The brackets spell out the jargon.
- 11:39.00 `seconds/second-00700.webp` 'GTME Checklist': 1, 2, 3 in bubbly 3D numerals with hand-lettered labels: Know GTM well, Know Clay well, Be a good sales person.
- 11:51.00 `seconds/second-00712.webp` George, a GTM engineer, at his desk in a Geese T-shirt, named in a white lower third.
- 12:13.00 `seconds/second-00734.webp` A dissolve puts George in a navy track jacket mid-sentence. 'I ended up talking to George for a very long time' is shown by a change of clothes.
- 12:37.00 `seconds/second-00758.webp` Everett at a frosted whiteboard in a green-walled room. 'I needed to find Everett' leads into the film's main explainer.
- 12:41.00 `seconds/second-00762.webp` '2 GTME TEAMS' on the green board: a blue-green group of clay figures and a pink-orange one. The two teams keep these colors for the rest of the film.
- 13:01.00 `seconds/second-00782.webp` She stands at the board, now written up with 'External / FDE' and 'Sales GTMEs', and checks her understanding with him.
- 13:16.00 `seconds/second-00797.webp` Over Everett's shoulder as he writes 'Pipeline' on the board.
- 13:49.00 `seconds/second-00830.webp` Leads pass from the internal team to 'FORWARD DEPLOYED' as the camera slides right across the green board.
- 14:02.00 `seconds/second-00843.webp` George again, now labelled with an arrow as 'FORWARD DEPLOYED GTME', on the custom builds done before a sale.
- 14:26.00 `seconds/second-00867.webp` 'SAME SKILLS': one group icon splits in two, with 'Personality' written between them.
- 14:44.00 `seconds/second-00885.webp` A quick montage of people met earlier, cut back in as she sums up.
- 14:52.00 `seconds/second-00893.webp` The two teams, the leads and the dollar signs, joined by dotted lines to the Clay logo above: 'two teams, one loop'.
- 15:36.00 `seconds/second-00937.webp` Everett's board for the founder-dinner workflow: Events, Contacts (involved, execs, intent, location), Dinner/Event invites, 'Sent by Kareem', Log responses. The concrete example arrives as handwriting.
- 15:57.00 `seconds/second-00958.webp` The team at the pub around a long red table of drinks.
- 16:03.00 `seconds/second-00964.webp` She waves goodbye from the pub table.
- 16:08.00 `seconds/second-00969.webp` Everett signs off from the pub: 'Thanks so much for hanging out with Clay today.'
- 16:16.00 `seconds/second-00977.webp` The end card: 'STORIES OF SCALE' in the condensed type, 'SUBSCRIBE!' and the crew credits on black, beside her in the studio.
- 16:40.00 `seconds/second-01001.webp` She finally eats a pickle, as promised in the sponsor read.
- 16:49.00 `seconds/second-01010.webp` 'PLEASE STAND BY' over color bars. The video ends on a broadcast gag instead of a logo.
