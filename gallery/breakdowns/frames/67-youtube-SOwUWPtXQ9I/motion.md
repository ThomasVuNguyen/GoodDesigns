# Motion notes: Jensen Huang just pulled out of Nvidia...

Fireship · 05:35.23 · https://www.youtube.com/watch?v=SOwUWPtXQ9I

Almost every picture is borrowed, so the motion is in how borrowed pictures are handled. A small kit repeats for five minutes: titles typed one word per spoken word, cutouts that pop or rise in on a name, highlighter sweeps and red boxes on documents, number stamps spun on at an angle, and a lens warp that opens the next picture out of a hole in the middle of the last one. Elements arrive on the word they illustrate, so the picture keeps pace with a voice that never pauses.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▅▄▅▃▇▆▁▆▆▅▆▆▇▆▅▆▁▄▁▁▇▆▄▆▅▁▅▂▅▆▁▆▆▆▆▆▇▇▇▇▆▅▅▆▇▄▅▄▆▅▅▅▆▁▁▆▇▃▅▁
01:00  ▁▁▁▁▅▄▅▁▄▇▇▁▁▇▇▆▁▁▁▅▂▆▆▅▁▆▇▂▁▁▅▄▆▁▁▁▁▅▆▅▁▆▁▁▁▁▅▄█▁▁▁▃▅▁▅▅▃▆▅
02:00  ▇▆▁▅▄▁▁█▇▁▆▃▄▅▅▆▅▃▅▇▇▁▁▄▁▇▅▁▆▆▁▇▆▁▁▇▁▇▃▃▁▂▆▁▅▇▃▅▁▆▅▂▇▂▅▆▅▂▁▁
03:00  ▅▁▆▆▁▁▁▆▁▂▁▁▂▅▄▆▇▆▅▅▅▅▅▆▁▅▁▆▁▁▅▃▄▄▅▅▅▁▆▁▃▅▁▆▁▁▆▅▂▁▁▁▆▁▁█▅▁▅▁
04:00  ▆▁▆▆▁▅▁▁▆▁▁▄▁▅▁▁▄▁▇▄▄▄▃▆▁▆▄▃▃▆▆▇▇▇▆▆▂▁▁▇▃▁▅▄▄▆▁▄▆▅▅▆▆▂▄▃▄▅▄▅
05:00  ▇▄▃▅▁▄▄▅▆▇▅▂▁▄▁▃▄▄▆▇▂▃▅▄▁▄▃▃▅▃▅▁▁▁▁▁
```

## Sequences

### 01. Typed card, then cutouts piling onto the logo

00:00.00–00:04.80 (4.80 s) · 30 frames at 6 fps, 0.167 s apart · type-on, glow, cutout pop-on, label

'Over the weekend…' types on one word at a time with the voice (0.0, 0.17, 0.33), flares with a soft glow at 0.5 and cuts to the Nvidia logo at 0.83. At 1.67, on 'leather-loving', the first Huang cutout appears at the right edge; three more pop in on top of it by 2.5, each a different press photo of the same jacket, and a close portrait replaces the pile at 2.83. The name label snaps on at 3.67 on 'Jensen'. At 4.5 the email page sweeps in over two or three frames. Nothing eases: every element appears in one or two frames, so the timing does the work.

Motion: `▄▃▄▆▆▆▁▁▁▅▁▆▁▅▅▁▁▆▁▁▁▁▅▁▁▁▁███`

- 00:00.00 `motion/type-card-cutouts/f-001.webp` ▄
- 00:00.17 `motion/type-card-cutouts/f-002.webp` ▃
- 00:00.33 `motion/type-card-cutouts/f-003.webp` ▄
- 00:00.50 `motion/type-card-cutouts/f-004.webp` ▆
- 00:00.67 `motion/type-card-cutouts/f-005.webp` ▆
- 00:00.83 `motion/type-card-cutouts/f-006.webp` ▆
- 00:01.00 `motion/type-card-cutouts/f-007.webp` ▁
- 00:01.17 `motion/type-card-cutouts/f-008.webp` ▁
- 00:01.33 `motion/type-card-cutouts/f-009.webp` ▁
- 00:01.50 `motion/type-card-cutouts/f-010.webp` ▅
- 00:01.67 `motion/type-card-cutouts/f-011.webp` ▁
- 00:01.83 `motion/type-card-cutouts/f-012.webp` ▆
- 00:02.00 `motion/type-card-cutouts/f-013.webp` ▁
- 00:02.17 `motion/type-card-cutouts/f-014.webp` ▅
- 00:02.33 `motion/type-card-cutouts/f-015.webp` ▅
- 00:02.50 `motion/type-card-cutouts/f-016.webp` ▁
- 00:02.67 `motion/type-card-cutouts/f-017.webp` ▁
- 00:02.83 `motion/type-card-cutouts/f-018.webp` ▆
- 00:03.00 `motion/type-card-cutouts/f-019.webp` ▁
- 00:03.17 `motion/type-card-cutouts/f-020.webp` ▁
- 00:03.33 `motion/type-card-cutouts/f-021.webp` ▁
- 00:03.50 `motion/type-card-cutouts/f-022.webp` ▁
- 00:03.67 `motion/type-card-cutouts/f-023.webp` ▅
- 00:03.83 `motion/type-card-cutouts/f-024.webp` ▁
- 00:04.00 `motion/type-card-cutouts/f-025.webp` ▁
- 00:04.17 `motion/type-card-cutouts/f-026.webp` ▁
- 00:04.33 `motion/type-card-cutouts/f-027.webp` ▁
- 00:04.50 `motion/type-card-cutouts/f-028.webp` █
- 00:04.67 `motion/type-card-cutouts/f-029.webp` █
- 00:04.83 `motion/type-card-cutouts/f-030.webp` █

### 02. A photo, a stamped caption, a captioned clip

00:07.60–00:12.40 (4.80 s) · 30 frames at 6 fps, 0.167 s apart · slide in, stamp, caption reveal, hard cut

The dinner photo pushes in over the email by 8.0 and holds clean for a second. At 9.0, on 'unfaithful to his wife', 'Succulent Chinese affair' slams on in red, tilted about ten degrees, with no animation in or out. At 10.0 a hard cut to the stock clip, whose caption resolves in place over about half a second, letters filling in from scattered fragments, so it reads just as the pillow lands. Two jokes in three seconds, neither one spoken.

Motion: `▇▇█▆▁▁▁▁▄▁▁▁▁▁█▆▆▆▆▇▇▆▆▆▆▆▇▇▆▇`

- 00:07.60 `motion/caption-gags/f-001.webp` ▇
- 00:07.77 `motion/caption-gags/f-002.webp` ▇
- 00:07.93 `motion/caption-gags/f-003.webp` █
- 00:08.10 `motion/caption-gags/f-004.webp` ▆
- 00:08.27 `motion/caption-gags/f-005.webp` ▁
- 00:08.43 `motion/caption-gags/f-006.webp` ▁
- 00:08.60 `motion/caption-gags/f-007.webp` ▁
- 00:08.77 `motion/caption-gags/f-008.webp` ▁
- 00:08.93 `motion/caption-gags/f-009.webp` ▄
- 00:09.10 `motion/caption-gags/f-010.webp` ▁
- 00:09.27 `motion/caption-gags/f-011.webp` ▁
- 00:09.43 `motion/caption-gags/f-012.webp` ▁
- 00:09.60 `motion/caption-gags/f-013.webp` ▁
- 00:09.77 `motion/caption-gags/f-014.webp` ▁
- 00:09.93 `motion/caption-gags/f-015.webp` █
- 00:10.10 `motion/caption-gags/f-016.webp` ▆
- 00:10.27 `motion/caption-gags/f-017.webp` ▆
- 00:10.43 `motion/caption-gags/f-018.webp` ▆
- 00:10.60 `motion/caption-gags/f-019.webp` ▆
- 00:10.77 `motion/caption-gags/f-020.webp` ▇
- 00:10.93 `motion/caption-gags/f-021.webp` ▇
- 00:11.10 `motion/caption-gags/f-022.webp` ▆
- 00:11.27 `motion/caption-gags/f-023.webp` ▆
- 00:11.43 `motion/caption-gags/f-024.webp` ▆
- 00:11.60 `motion/caption-gags/f-025.webp` ▆
- 00:11.77 `motion/caption-gags/f-026.webp` ▆
- 00:11.93 `motion/caption-gags/f-027.webp` ▇
- 00:12.10 `motion/caption-gags/f-028.webp` ▇
- 00:12.27 `motion/caption-gags/f-029.webp` ▆
- 00:12.43 `motion/caption-gags/f-030.webp` ▇

### 03. A number stamped on, an arrow drawn, a headline slammed down

00:23.80–00:30.50 (6.70 s) · 28 frames at 4 fps, 0.250 s apart · stamp, spin in, vignette fade, arrow draw, slam

'$4.8 billion' spins in at 24.0 and settles at an angle across the news summary in half a second. At 26.83 it cuts to a stock chart; at 28.0 a clip fades in over the chart through a soft oval vignette, and a red arrow draws on from the top right at 28.75 to point at the drop. At 29.5 the lawsuit page arrives and a headline strip smears on and lands at 30.0, tilted. Each of the three is a different gesture for the same idea: put the claim on top of the evidence.

Motion: `█▄▆▅▂▁▁▁▁▁▁▁▇▁▁▁▄▅▆▁▄▁▇▄▅▁▁▁`

- 00:23.80 `motion/stamp-and-arrow/f-001.webp` █
- 00:24.05 `motion/stamp-and-arrow/f-002.webp` ▄
- 00:24.30 `motion/stamp-and-arrow/f-003.webp` ▆
- 00:24.55 `motion/stamp-and-arrow/f-004.webp` ▅
- 00:24.80 `motion/stamp-and-arrow/f-005.webp` ▂
- 00:25.05 `motion/stamp-and-arrow/f-006.webp` ▁
- 00:25.30 `motion/stamp-and-arrow/f-007.webp` ▁
- 00:25.55 `motion/stamp-and-arrow/f-008.webp` ▁
- 00:25.80 `motion/stamp-and-arrow/f-009.webp` ▁
- 00:26.05 `motion/stamp-and-arrow/f-010.webp` ▁
- 00:26.30 `motion/stamp-and-arrow/f-011.webp` ▁
- 00:26.55 `motion/stamp-and-arrow/f-012.webp` ▁
- 00:26.80 `motion/stamp-and-arrow/f-013.webp` ▇
- 00:27.05 `motion/stamp-and-arrow/f-014.webp` ▁
- 00:27.30 `motion/stamp-and-arrow/f-015.webp` ▁
- 00:27.55 `motion/stamp-and-arrow/f-016.webp` ▁
- 00:27.80 `motion/stamp-and-arrow/f-017.webp` ▄
- 00:28.05 `motion/stamp-and-arrow/f-018.webp` ▅
- 00:28.30 `motion/stamp-and-arrow/f-019.webp` ▆
- 00:28.55 `motion/stamp-and-arrow/f-020.webp` ▁
- 00:28.80 `motion/stamp-and-arrow/f-021.webp` ▄
- 00:29.05 `motion/stamp-and-arrow/f-022.webp` ▁
- 00:29.30 `motion/stamp-and-arrow/f-023.webp` ▇
- 00:29.55 `motion/stamp-and-arrow/f-024.webp` ▄
- 00:29.80 `motion/stamp-and-arrow/f-025.webp` ▅
- 00:30.05 `motion/stamp-and-arrow/f-026.webp` ▁
- 00:30.30 `motion/stamp-and-arrow/f-027.webp` ▁
- 00:30.55 `motion/stamp-and-arrow/f-028.webp` ▁

### 04. Time card, then a lens warp into the next picture

00:55.20–00:58.80 (3.60 s) · 30 frames at 8 fps, 0.125 s apart · type-on, lens warp, fisheye, stamp

'A few months later' types on word by word from 55.5 to 56.0. At 56.17 a small hole opens in the middle of the card with the next picture inside it, and it bulges outward like a fisheye lens, pushing the type to the edges, until 7Road's website fills the frame by about 56.9. The '7ROAD' label stamps on at 57.5, just ahead of 'Seven Road'. The same warp returns several times (1:09.7, 2:37.0, 2:44.8, 4:39.3), always to open a picture out of the one before it.

Motion: `█▃▁▄▃▁▁▂▆▆▇██▇▅▃▂▁▄▁▁▁▁▁▁▁▁▁█▁`

- 00:55.20 `motion/lens-warp-reveal/f-001.webp` █
- 00:55.33 `motion/lens-warp-reveal/f-002.webp` ▃
- 00:55.45 `motion/lens-warp-reveal/f-003.webp` ▁
- 00:55.58 `motion/lens-warp-reveal/f-004.webp` ▄
- 00:55.70 `motion/lens-warp-reveal/f-005.webp` ▃
- 00:55.83 `motion/lens-warp-reveal/f-006.webp` ▁
- 00:55.95 `motion/lens-warp-reveal/f-007.webp` ▁
- 00:56.08 `motion/lens-warp-reveal/f-008.webp` ▂
- 00:56.20 `motion/lens-warp-reveal/f-009.webp` ▆
- 00:56.33 `motion/lens-warp-reveal/f-010.webp` ▆
- 00:56.45 `motion/lens-warp-reveal/f-011.webp` ▇
- 00:56.58 `motion/lens-warp-reveal/f-012.webp` █
- 00:56.70 `motion/lens-warp-reveal/f-013.webp` █
- 00:56.83 `motion/lens-warp-reveal/f-014.webp` ▇
- 00:56.95 `motion/lens-warp-reveal/f-015.webp` ▅
- 00:57.08 `motion/lens-warp-reveal/f-016.webp` ▃
- 00:57.20 `motion/lens-warp-reveal/f-017.webp` ▂
- 00:57.33 `motion/lens-warp-reveal/f-018.webp` ▁
- 00:57.45 `motion/lens-warp-reveal/f-019.webp` ▄
- 00:57.58 `motion/lens-warp-reveal/f-020.webp` ▁
- 00:57.70 `motion/lens-warp-reveal/f-021.webp` ▁
- 00:57.83 `motion/lens-warp-reveal/f-022.webp` ▁
- 00:57.95 `motion/lens-warp-reveal/f-023.webp` ▁
- 00:58.08 `motion/lens-warp-reveal/f-024.webp` ▁
- 00:58.20 `motion/lens-warp-reveal/f-025.webp` ▁
- 00:58.33 `motion/lens-warp-reveal/f-026.webp` ▁
- 00:58.45 `motion/lens-warp-reveal/f-027.webp` ▁
- 00:58.58 `motion/lens-warp-reveal/f-028.webp` ▁
- 00:58.70 `motion/lens-warp-reveal/f-029.webp` █
- 00:58.83 `motion/lens-warp-reveal/f-030.webp` ▁

### 05. A name explained with arrows and labels

01:06.00–01:11.50 (5.50 s) · 34 frames at 6 fps, 0.167 s apart · label, arrow, pop-on, lens warp

'Huang Le (黄乐)' sits alone in the top left. At 66.5, on 'Alice Huang', a portrait pops in with a hand-drawn arrow from the name and a yellow 'ALICE HUANG' label. At 68.0, on 'Jensen Huang', a second photo joins at the right with its own arrow and label. At 69.67 a lens warp zooms into the dinner photo, and 'HUANG' and 'HUANG' pop onto the two faces at 70.17. Each label appears on the spoken name, so the viewer reads the same word the voice is saying.

Motion: `▁▁▁▇▁▁▁▁▁▁▁▁▆▁▁▁▁▁▁▁▁▅████▆▄▁▂▁▃▁▁`

- 01:06.00 `motion/name-diagram/f-001.webp` ▁
- 01:06.17 `motion/name-diagram/f-002.webp` ▁
- 01:06.33 `motion/name-diagram/f-003.webp` ▁
- 01:06.50 `motion/name-diagram/f-004.webp` ▇
- 01:06.67 `motion/name-diagram/f-005.webp` ▁
- 01:06.83 `motion/name-diagram/f-006.webp` ▁
- 01:07.00 `motion/name-diagram/f-007.webp` ▁
- 01:07.17 `motion/name-diagram/f-008.webp` ▁
- 01:07.33 `motion/name-diagram/f-009.webp` ▁
- 01:07.50 `motion/name-diagram/f-010.webp` ▁
- 01:07.67 `motion/name-diagram/f-011.webp` ▁
- 01:07.83 `motion/name-diagram/f-012.webp` ▁
- 01:08.00 `motion/name-diagram/f-013.webp` ▆
- 01:08.17 `motion/name-diagram/f-014.webp` ▁
- 01:08.33 `motion/name-diagram/f-015.webp` ▁
- 01:08.50 `motion/name-diagram/f-016.webp` ▁
- 01:08.67 `motion/name-diagram/f-017.webp` ▁
- 01:08.83 `motion/name-diagram/f-018.webp` ▁
- 01:09.00 `motion/name-diagram/f-019.webp` ▁
- 01:09.17 `motion/name-diagram/f-020.webp` ▁
- 01:09.33 `motion/name-diagram/f-021.webp` ▁
- 01:09.50 `motion/name-diagram/f-022.webp` ▅
- 01:09.67 `motion/name-diagram/f-023.webp` █
- 01:09.83 `motion/name-diagram/f-024.webp` █
- 01:10.00 `motion/name-diagram/f-025.webp` █
- 01:10.17 `motion/name-diagram/f-026.webp` █
- 01:10.33 `motion/name-diagram/f-027.webp` ▆
- 01:10.50 `motion/name-diagram/f-028.webp` ▄
- 01:10.67 `motion/name-diagram/f-029.webp` ▁
- 01:10.83 `motion/name-diagram/f-030.webp` ▂
- 01:11.00 `motion/name-diagram/f-031.webp` ▁
- 01:11.17 `motion/name-diagram/f-032.webp` ▃
- 01:11.33 `motion/name-diagram/f-033.webp` ▁
- 01:11.50 `motion/name-diagram/f-034.webp` ▁

### 06. A two-color map, and text that twists away

01:38.50–01:48.50 (10.00 s) · 31 frames at 3 fps, 0.333 s apart · slide in, legend, text swirl, glitch

The world map slides in from the right under the headline at 98.67, China already red. At 99.67, on 'isn't in China', the legend pops in: 'China' and 'Not China'. At 101.0 the headline bends into a ribbon and spins off to the left in about half a second, and a new paragraph lands in its place while the map stays still. At 106.0 a brief glitch, and Malaysia and Indonesia appear in red on 'data centers in Malaysia and Indonesia'. The map holds for about ten seconds, longer than almost any picture in the film, because this is the part that needs explaining.

Motion: `▆▆▆▃▁▁▁▄▇▆▃▁▁▁▁▁▁▁▁▁▁▁▅▅▁▁▁▁▇▇█`

- 01:38.50 `motion/map-and-swirl/f-001.webp` ▆
- 01:38.83 `motion/map-and-swirl/f-002.webp` ▆
- 01:39.17 `motion/map-and-swirl/f-003.webp` ▆
- 01:39.50 `motion/map-and-swirl/f-004.webp` ▃
- 01:39.83 `motion/map-and-swirl/f-005.webp` ▁
- 01:40.17 `motion/map-and-swirl/f-006.webp` ▁
- 01:40.50 `motion/map-and-swirl/f-007.webp` ▁
- 01:40.83 `motion/map-and-swirl/f-008.webp` ▄
- 01:41.17 `motion/map-and-swirl/f-009.webp` ▇
- 01:41.50 `motion/map-and-swirl/f-010.webp` ▆
- 01:41.83 `motion/map-and-swirl/f-011.webp` ▃
- 01:42.17 `motion/map-and-swirl/f-012.webp` ▁
- 01:42.50 `motion/map-and-swirl/f-013.webp` ▁
- 01:42.83 `motion/map-and-swirl/f-014.webp` ▁
- 01:43.17 `motion/map-and-swirl/f-015.webp` ▁
- 01:43.50 `motion/map-and-swirl/f-016.webp` ▁
- 01:43.83 `motion/map-and-swirl/f-017.webp` ▁
- 01:44.17 `motion/map-and-swirl/f-018.webp` ▁
- 01:44.50 `motion/map-and-swirl/f-019.webp` ▁
- 01:44.83 `motion/map-and-swirl/f-020.webp` ▁
- 01:45.17 `motion/map-and-swirl/f-021.webp` ▁
- 01:45.50 `motion/map-and-swirl/f-022.webp` ▁
- 01:45.83 `motion/map-and-swirl/f-023.webp` ▅
- 01:46.17 `motion/map-and-swirl/f-024.webp` ▅
- 01:46.50 `motion/map-and-swirl/f-025.webp` ▁
- 01:46.83 `motion/map-and-swirl/f-026.webp` ▁
- 01:47.17 `motion/map-and-swirl/f-027.webp` ▁
- 01:47.50 `motion/map-and-swirl/f-028.webp` ▁
- 01:47.83 `motion/map-and-swirl/f-029.webp` ▇
- 01:48.17 `motion/map-and-swirl/f-030.webp` ▇
- 01:48.50 `motion/map-and-swirl/f-031.webp` █

### 07. Boxes stack up, a meme splits the frame, photos pile on

02:03.30–02:11.50 (8.20 s) · 34 frames at 4 fps, 0.250 s apart · stack, split screen, meme, photo pile, date stamp

From 123.6 Nvidia boxes pile onto the aerial row by row, building a stack at the right while the voice says 'found a bunch of Nvidia GPUs'. At 127.3 the stack slides left and the frame splits into the four-panel 'GPU / GPWE' meme by 128.2. At 130.0, on 'kept showing up in the same places', dated photos drop in one after another (March 2024, then June 2024, then January, February and September 2025) until the frame is a collage. The pile is the claim: many photos, many dates.

Motion: `▅▅▆▅▁▁▁▁▁▁▁▁▁▁▁▁████▆▁▁▁▁▁▁▇▆▆▅▁▁▁`

- 02:03.30 `motion/boxes-to-timeline/f-001.webp` ▅
- 02:03.55 `motion/boxes-to-timeline/f-002.webp` ▅
- 02:03.80 `motion/boxes-to-timeline/f-003.webp` ▆
- 02:04.05 `motion/boxes-to-timeline/f-004.webp` ▅
- 02:04.30 `motion/boxes-to-timeline/f-005.webp` ▁
- 02:04.55 `motion/boxes-to-timeline/f-006.webp` ▁
- 02:04.80 `motion/boxes-to-timeline/f-007.webp` ▁
- 02:05.05 `motion/boxes-to-timeline/f-008.webp` ▁
- 02:05.30 `motion/boxes-to-timeline/f-009.webp` ▁
- 02:05.55 `motion/boxes-to-timeline/f-010.webp` ▁
- 02:05.80 `motion/boxes-to-timeline/f-011.webp` ▁
- 02:06.05 `motion/boxes-to-timeline/f-012.webp` ▁
- 02:06.30 `motion/boxes-to-timeline/f-013.webp` ▁
- 02:06.55 `motion/boxes-to-timeline/f-014.webp` ▁
- 02:06.80 `motion/boxes-to-timeline/f-015.webp` ▁
- 02:07.05 `motion/boxes-to-timeline/f-016.webp` ▁
- 02:07.30 `motion/boxes-to-timeline/f-017.webp` █
- 02:07.55 `motion/boxes-to-timeline/f-018.webp` █
- 02:07.80 `motion/boxes-to-timeline/f-019.webp` █
- 02:08.05 `motion/boxes-to-timeline/f-020.webp` █
- 02:08.30 `motion/boxes-to-timeline/f-021.webp` ▆
- 02:08.55 `motion/boxes-to-timeline/f-022.webp` ▁
- 02:08.80 `motion/boxes-to-timeline/f-023.webp` ▁
- 02:09.05 `motion/boxes-to-timeline/f-024.webp` ▁
- 02:09.30 `motion/boxes-to-timeline/f-025.webp` ▁
- 02:09.55 `motion/boxes-to-timeline/f-026.webp` ▁
- 02:09.80 `motion/boxes-to-timeline/f-027.webp` ▁
- 02:10.05 `motion/boxes-to-timeline/f-028.webp` ▇
- 02:10.30 `motion/boxes-to-timeline/f-029.webp` ▆
- 02:10.55 `motion/boxes-to-timeline/f-030.webp` ▆
- 02:10.80 `motion/boxes-to-timeline/f-031.webp` ▅
- 02:11.05 `motion/boxes-to-timeline/f-032.webp` ▁
- 02:11.30 `motion/boxes-to-timeline/f-033.webp` ▁
- 02:11.55 `motion/boxes-to-timeline/f-034.webp` ▁

### 08. The ownership diagram completes itself

02:36.80–02:40.40 (3.60 s) · 30 frames at 8 fps, 0.125 s apart · lens warp, arrow draw, box pop-on, cutout rise

A lens warp opens the diagram out of the Apex filing at 157.0. The dashed 'collateral pledge' arrow draws left to right from 157.5 to 157.9, the red Apex box pops on at 158.0, and the orange Alibaba box pops on above it at 158.6 with its 'parent company' arrow at 158.9. At 159.2, just after 'with a straight face', a grinning Huang cutout rises from the bottom left, and a hand emoji appears at 159.6. Five elements in about two seconds, each a single frame pop.

Motion: `▁▆███▅▁▁▂▄▂▁▁▁▅▁▂▁▁▁▃▅▄▃▁▁▁▁▁▁`

- 02:36.80 `motion/diagram-build/f-001.webp` ▁
- 02:36.93 `motion/diagram-build/f-002.webp` ▆
- 02:37.05 `motion/diagram-build/f-003.webp` █
- 02:37.18 `motion/diagram-build/f-004.webp` █
- 02:37.30 `motion/diagram-build/f-005.webp` █
- 02:37.43 `motion/diagram-build/f-006.webp` ▅
- 02:37.55 `motion/diagram-build/f-007.webp` ▁
- 02:37.68 `motion/diagram-build/f-008.webp` ▁
- 02:37.80 `motion/diagram-build/f-009.webp` ▂
- 02:37.93 `motion/diagram-build/f-010.webp` ▄
- 02:38.05 `motion/diagram-build/f-011.webp` ▂
- 02:38.18 `motion/diagram-build/f-012.webp` ▁
- 02:38.30 `motion/diagram-build/f-013.webp` ▁
- 02:38.43 `motion/diagram-build/f-014.webp` ▁
- 02:38.55 `motion/diagram-build/f-015.webp` ▅
- 02:38.68 `motion/diagram-build/f-016.webp` ▁
- 02:38.80 `motion/diagram-build/f-017.webp` ▂
- 02:38.93 `motion/diagram-build/f-018.webp` ▁
- 02:39.05 `motion/diagram-build/f-019.webp` ▁
- 02:39.18 `motion/diagram-build/f-020.webp` ▁
- 02:39.30 `motion/diagram-build/f-021.webp` ▃
- 02:39.43 `motion/diagram-build/f-022.webp` ▅
- 02:39.55 `motion/diagram-build/f-023.webp` ▄
- 02:39.68 `motion/diagram-build/f-024.webp` ▃
- 02:39.80 `motion/diagram-build/f-025.webp` ▁
- 02:39.93 `motion/diagram-build/f-026.webp` ▁
- 02:40.05 `motion/diagram-build/f-027.webp` ▁
- 02:40.18 `motion/diagram-build/f-028.webp` ▁
- 02:40.30 `motion/diagram-build/f-029.webp` ▁
- 02:40.43 `motion/diagram-build/f-030.webp` ▁

### 09. From the last joke to the sponsor's wordmark

04:35.00–04:41.00 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · logo pop-on, lens warp, wordmark

The stock photo of a man holding two women's hands holds still from 275.0. Claude's logo pops onto one woman's head at 276.3, on 'Claude', and ChatGPT's onto the other at 277.0, on 'ChatGPT'. At 279.3 the lens warp opens a black hole in the middle of the photo with the Manufact wordmark inside it; it fills the frame by 280.0, on the sponsor's name. The ad arrives through the same transition the story has used all along.

Motion: `▇▁▁▁▁▂▁▂▁▁▁▁▁▁▁▁▁▇█▇▅▁▁▁▁`

- 04:35.00 `motion/sponsor-pivot/f-001.webp` ▇
- 04:35.25 `motion/sponsor-pivot/f-002.webp` ▁
- 04:35.50 `motion/sponsor-pivot/f-003.webp` ▁
- 04:35.75 `motion/sponsor-pivot/f-004.webp` ▁
- 04:36.00 `motion/sponsor-pivot/f-005.webp` ▁
- 04:36.25 `motion/sponsor-pivot/f-006.webp` ▂
- 04:36.50 `motion/sponsor-pivot/f-007.webp` ▁
- 04:36.75 `motion/sponsor-pivot/f-008.webp` ▂
- 04:37.00 `motion/sponsor-pivot/f-009.webp` ▁
- 04:37.25 `motion/sponsor-pivot/f-010.webp` ▁
- 04:37.50 `motion/sponsor-pivot/f-011.webp` ▁
- 04:37.75 `motion/sponsor-pivot/f-012.webp` ▁
- 04:38.00 `motion/sponsor-pivot/f-013.webp` ▁
- 04:38.25 `motion/sponsor-pivot/f-014.webp` ▁
- 04:38.50 `motion/sponsor-pivot/f-015.webp` ▁
- 04:38.75 `motion/sponsor-pivot/f-016.webp` ▁
- 04:39.00 `motion/sponsor-pivot/f-017.webp` ▁
- 04:39.25 `motion/sponsor-pivot/f-018.webp` ▇
- 04:39.50 `motion/sponsor-pivot/f-019.webp` █
- 04:39.75 `motion/sponsor-pivot/f-020.webp` ▇
- 04:40.00 `motion/sponsor-pivot/f-021.webp` ▅
- 04:40.25 `motion/sponsor-pivot/f-022.webp` ▁
- 04:40.50 `motion/sponsor-pivot/f-023.webp` ▁
- 04:40.75 `motion/sponsor-pivot/f-024.webp` ▁
- 04:41.00 `motion/sponsor-pivot/f-025.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Cold open on a typed card: 'Over the weekend…' in heavy cream caps on black, one word per spoken word. The first words are also the first picture.
- 00:02.00 `seconds/second-00003.webp` The Nvidia logo on black, cutouts of Jensen Huang in his leather jacket piling in from the right on 'leather-loving co-founder and CEO'. Found press photos, used as a running gag.
- 00:04.00 `seconds/second-00005.webp` His name label, 'JENSEN HUANG', lands on the word. Every person in the film is introduced this way: a cutout and a label in the same display type.
- 00:06.00 `seconds/second-00007.webp` The employee email as a plain page of text. The primary document comes first, before any joke.
- 00:08.00 `seconds/second-00009.webp` A photo of Huang at a dinner table with a woman slides over the email. The film presents it as the affair; nothing yet says who she is.
- 00:09.00 `seconds/second-00010.webp` 'Succulent Chinese affair' stamped across the photo at an angle in red caps, a play on an old meme. The first caption gag lands nine seconds in.
- 00:11.00 `seconds/second-00012.webp` A stock clip of a man being hit with a pillow, captioned 'She had my surname, I thought she was you!'. The shared-surname gag is planted here and paid off a minute later.
- 00:13.00 `seconds/second-00014.webp` Headline: 'Jensen Huang Scandal Sparks Divorce Speculation', arriving on 'a very expensive lawyer'. The headline is the punchline.
- 00:17.00 `seconds/second-00018.webp` A House select committee letter beside its seal, with a cutout of the woman next to it. Official paper is paired with a face so you know whose story it is.
- 00:25.00 `seconds/second-00026.webp` '$4.8 billion' in green, spun onto a news summary at an angle. The number the voice says is stamped on the page that reports it.
- 00:30.00 `seconds/second-00031.webp` A class action complaint, with the headline 'Nvidia and Jensen Huang sued in US over affair with alleged Chinese spy' slammed on at an angle.
- 00:34.00 `seconds/second-00035.webp` 'In today's video…' over a clip of Huang eating a corn dog in front of a Chinese flag. Even the roadmap card gets a joke.
- 00:38.00 `seconds/second-00039.webp` Culper Research's report, its title 'NVIDIA (NVDA): The China Problem' curling in across the page. 'A couple of guys reading corporate filings' are shown by their filing.
- 00:41.00 `seconds/second-00042.webp` A man at a trading desk under a red crash line, and a viewer's post: 'jensen popped the ai bubble with his huang'. The cold open ends on someone else's joke.
- 00:44.00 `seconds/second-00045.webp` The Code Report ident drawing itself in white outline and flaring. The only music in the body of the film sits under these four seconds.
- 00:52.00 `seconds/second-00053.webp` The 2022 Commerce Department press release on export controls, highlighted, with a red '2022' tag pinned to its corner.
- 00:55.00 `seconds/second-00056.webp` 'A few months later' typed on black. Seven cards in this one style mark the turns of the script.
- 00:57.00 `seconds/second-00058.webp` 7Road's game website, opened out of the time card by a lens warp, a '7ROAD' label stamped on.
- 01:04.00 `seconds/second-00065.webp` The highlighted paragraph narrows to a red box around one line about the British Virgin Islands company, the rest blurred away. The page shrinks to the clause being spoken.
- 01:07.00 `seconds/second-00068.webp` 'Huang Le (黄乐)' set in the corner, an arrow curling to a portrait labelled 'ALICE HUANG'. The name is explained as a diagram.
- 01:11.00 `seconds/second-00072.webp` The dinner photo again, both faces labelled 'HUANG', with 'not related' written between them.
- 01:16.00 `seconds/second-00077.webp` The résumé claim quoted large over its dimmed source page: '4 years in media, 8 years in securities. Formerly a news reporter for Hunan TV and CCTV-1'.
- 01:22.00 `seconds/second-00083.webp` A portrait composited in front of an office: the 7Road badge crossed out, a pointing hand at the Megaspeed sign. The rename is acted out with stickers.
- 01:28.00 `seconds/second-00089.webp` A chart from a news story on Megaspeed's Nvidia imports, with a red '$4.8B' tag. Ten employees, then the money.
- 01:30.00 `seconds/second-00091.webp` A reaction meme of a man tapping his temple, on 'the business model is actually pretty clever'.
- 01:33.00 `seconds/second-00094.webp` The Commerce Department rule, the clause about where an entity's 'ultimate parent company is headquartered' highlighted. The loophole in the regulation's own words.
- 01:40.00 `seconds/second-00101.webp` A world map under the headline, China in red, and a legend that pops in: 'China' and 'Not China'. Two colors carry the whole explanation.
- 01:47.00 `seconds/second-00108.webp` Malaysia and Indonesia turn red: where the chips physically sit.
- 01:54.00 `seconds/second-00115.webp` A dancing man cutout over the Alibaba paragraph, on 'sketchy, but technically legal'.
- 02:05.00 `seconds/second-00126.webp` Nvidia-branded boxes stacked over an aerial of a data center campus: 'a bunch of Nvidia GPUs just sitting there unopened'.
- 02:08.00 `seconds/second-00129.webp` A four-panel meme: 'GPU' over an American flag, 'GPWE' over a Soviet one, on 'redistributed for the good of the collective'. The punchline is a picture.
- 02:11.00 `seconds/second-00132.webp` Photos of the two at events pile up with dates stamped on: March 2024, June 2024, January, February and September 2025. A timeline built from snapshots.
- 02:14.00 `seconds/second-00135.webp` 'May 2026' on black: the next time card, on 'May 13th of this year'.
- 02:16.00 `seconds/second-00137.webp` Culper's logo, a cartoon profile in a tricorn hat, pasted over the face in a film still of a trader at his screens. The short seller is cast as a character.
- 02:26.00 `seconds/second-00147.webp` Megaspeed's statement of financial position with two line items boxed in red, the report's summary curling down onto it. The claim and the filing it rests on, in one frame.
- 02:36.00 `seconds/second-00157.webp` Apex's financial statements, the line naming Alibaba Group as ultimate holding company boxed, a hand emoji pointing at it.
- 02:40.00 `seconds/second-00161.webp` The finished ownership diagram: Speedmatrix pledged as collateral to Apex, Apex owned by Alibaba, with a grinning Huang cutout risen in on 'a straight face'.
- 02:47.00 `seconds/second-00168.webp` A news photo of an embrace, the report's paragraph sliding up beneath it with 'uncomfortably close' highlighted in blue.
- 02:50.00 `seconds/second-00171.webp` 'That same week…' on black.
- 02:53.00 `seconds/second-00174.webp` A photo of Huang and the president pointing, captioned as a two-line joke exchange in the film's display type.
- 02:58.00 `seconds/second-00179.webp` The Times headline, 'Despite Denial, Trump Was Told on Trip to China About Spying on Nvidia Leader', its key lines highlighted. The source is named in the voice and shown on screen.
- 03:02.00 `seconds/second-00183.webp` 'Five months later…' on black.
- 03:08.00 `seconds/second-00189.webp` A split collage: figures in suits with the woman above, a cartoon figure in a Chinese-flag shirt in front of empty benches below. The classified memo, drawn as a cartoon.
- 03:14.00 `seconds/second-00195.webp` A close cutout of Huang pressing his lips together, on 'which is awkward'.
- 03:20.00 `seconds/second-00201.webp` Footage through a window of Huang in a crowded room, his quote set below in white: 'it was all completely normal and not unusual'. His words are shown, not heard.
- 03:36.00 `seconds/second-00217.webp` 'Breaking news' on black: the story catches up with the recording.
- 03:37.00 `seconds/second-00218.webp` A meme of an aide whispering in Huang's ear, captioned 'Sir, they know about your other… other woman'.
- 03:50.00 `seconds/second-00231.webp` A chart meme, 'why is dating hard for guys?', with 'Jensen Huang' at the top and a cutout of him laughing, captioned with a pun on his name.
- 03:56.00 `seconds/second-00237.webp` The Times quote, 'I don't think you should be talking to me directly.' highlighted, followed by 'He then hung up.'
- 03:58.00 `seconds/second-00239.webp` Four cartoon creatures sitting in chairs above the Nvidia wordmark: the board meeting.
- 04:04.00 `seconds/second-00245.webp` The press release narrowed to one highlighted line: 'Jensen Huang has resigned as President, Chief Executive Officer'.
- 04:14.00 `seconds/second-00255.webp` 'we expect the company's operations… to continue without interruption' highlighted: the same words the voice says were used four days earlier.
- 04:18.00 `seconds/second-00259.webp` The page and the cutout melt into a liquid smear that opens on keynote stage footage.
- 04:22.00 `seconds/second-00263.webp` Huang alone on a dark stage under 'RTX Blackwell', a viewer's post sliding up with a CUDA pun.
- 04:27.00 `seconds/second-00268.webp` A news card, 'A short seller flagged Nvidia CEO's ties to a suspected Chinese spy six months before the scandal', with Culper's logo. The short seller bookends the story.
- 04:30.00 `seconds/second-00271.webp` The distracted-boyfriend meme rebuilt with Huang's face, on 'a reason that wasn't even in their report'.
- 04:32.00 `seconds/second-00273.webp` Huang, arms crossed, beside a giant soap bubble: 'popped the AI bubble'.
- 04:36.00 `seconds/second-00277.webp` Stock photo from behind: a man holding hands with two women at once. The sponsor read starts inside the affair joke.
- 04:38.00 `seconds/second-00279.webp` Claude's and ChatGPT's logos pinned on the two women's heads: 'involved in both Claude and ChatGPT at the same time without consequence'.
- 04:40.00 `seconds/second-00281.webp` Manufact's wordmark on black, opened out of the photo by a lens warp.
- 04:43.00 `seconds/second-00284.webp` A forced-perspective tourist photo with the pyramid replaced by a black triangle, on 'the Vercel of MCP'.
- 04:51.00 `seconds/second-00292.webp` A cyclist knocked off his bike by an antelope, beside an architecture diagram: 'surprisingly painful'.
- 04:53.00 `seconds/second-00294.webp` The mcp-use GitHub repo with a '10.8K GH stars' stamp and a pointing hand.
- 04:57.00 `seconds/second-00298.webp` The HorseTinder demo in an inspector: a horse's dating profile rendered as a UI card.
- 05:07.00 `seconds/second-00308.webp` HorseTinder's swipe cards rendered inside a Claude chat: the claim 'my app was live inside the chat', shown.
- 05:24.00 `seconds/second-00325.webp` A failed tool call in the session log, marked with a hand-drawn red arrow.
- 05:28.00 `seconds/second-00329.webp` Manufact's wordmark with 'Deploy free' and 'Link below' stickers.
- 05:31.00 `seconds/second-00332.webp` End card: The Code Report logo, a hand cutting a credit card on 'No credit card required', and 'Link below'.
