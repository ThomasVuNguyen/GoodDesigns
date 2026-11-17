# Motion notes: 4 ways to tell a great story

TED-Ed · 05:05.53 · https://www.youtube.com/watch?v=JOs-q7rXqdk

Kozmonot Animation Studio builds the whole film from flat dots on flat color fields. People are dots, a group is a ring or a fan of dots, and the storyteller is the red one. There is one hard cut in five minutes. Every other scene change goes through a shape: the camera dives into a dot, a speech bubble or the O of a word, a circle irises open or shut, or a hand-drawn fire swirls across the frame. Motifs return (the campfire, the amphitheater of listeners, the speech bubble, the compass), and the ending replays them in reverse.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▂▄▁▁▁▄▅▂▅▃▁▁▁▁█▄▅▃▁▁▅▆▆▅▅▆▁▃▃▅█▇▆▆▆▅▆▆▆▆▆▇██▇▆▅▄▅▅▅▅▅▅▇▇▆▆▇▇
01:00  █▂▂▅▂▆▄▂▃▃▇▁▁▆▄▆▃▁▇▃▇▄▅▃▁▁▃▅▇▇▇▅▄▄▂▃▅▆▅▄▃▃▂▁▇▆▃▁▁▇▅▂▃▅▄▄▇▅▄▆
02:00  ▇▄▇▇▄█▄▆█▆▅▃▂▂▆▄▄▁▃▁▃▂▆▄▁▃▁▁▂▄▃▄▆▄▃▄▁▅▁▄▄▆▄▁▄▇▃▂▂▂▂▆▅▃▃▄▃▂▄▄
03:00  ▄▂▆▃▆▇▅▄▂▁▁▁▁▁▆▃▃▆▅▄▃▁▆▆▆▄▁▆▃▃▂▃▂▂▂▁▂▃▂▂▃▄▂▅▃▁▃▄▁▂▃▄▁▄▆▄▁▁▂▂
04:00  ▂▂▂▁▁▁▁▁▂▃▁▁▁▃▃▇▆▅▆▅▆▆▁▁▁▄▃▁▁▂▂▆▂▁▆▅▇▇▅▃▃▅▄▄▁▆▃▂▂▂▂▂▄▆▃▂▃▄▄▂
05:00  ▂▃▃▄▄▃
```

## Sequences

### 01. A dot gathers its people

00:06.00–00:10.00 (4.00 s) · 25 frames at 6 fps, 0.167 s apart · iris-in, orbit, burst, spring

A peach disc with a red center closes in on itself over about a second until only the red dot is left, like an iris shutting on the subject. A thin arc circles the dot once as a wind-up. At 8.0 five colored dots burst out from behind it to their places, a ring pulses outward and fades, and the lines to them grow out wobbly and straighten as if on springs. Faces arrive last, at 10.25.

Motion: `▆▆▆▅▅▄▁▁▂▂▂▂▄▅▆▅▅▄▃▃▄▄▃▂▁`

- 00:06.00 `motion/bond/f-001.webp` ▆
- 00:06.17 `motion/bond/f-002.webp` ▆
- 00:06.33 `motion/bond/f-003.webp` ▆
- 00:06.50 `motion/bond/f-004.webp` ▅
- 00:06.67 `motion/bond/f-005.webp` ▅
- 00:06.83 `motion/bond/f-006.webp` ▄
- 00:07.00 `motion/bond/f-007.webp` ▁
- 00:07.17 `motion/bond/f-008.webp` ▁
- 00:07.33 `motion/bond/f-009.webp` ▂
- 00:07.50 `motion/bond/f-010.webp` ▂
- 00:07.67 `motion/bond/f-011.webp` ▂
- 00:07.83 `motion/bond/f-012.webp` ▂
- 00:08.00 `motion/bond/f-013.webp` ▄
- 00:08.17 `motion/bond/f-014.webp` ▅
- 00:08.33 `motion/bond/f-015.webp` ▆
- 00:08.50 `motion/bond/f-016.webp` ▅
- 00:08.67 `motion/bond/f-017.webp` ▅
- 00:08.83 `motion/bond/f-018.webp` ▄
- 00:09.00 `motion/bond/f-019.webp` ▃
- 00:09.17 `motion/bond/f-020.webp` ▃
- 00:09.33 `motion/bond/f-021.webp` ▄
- 00:09.50 `motion/bond/f-022.webp` ▄
- 00:09.67 `motion/bond/f-023.webp` ▃
- 00:09.83 `motion/bond/f-024.webp` ▂
- 00:10.00 `motion/bond/f-025.webp` ▁

### 02. Pull back through the O

00:13.75–00:16.75 (3.00 s) · 19 frames at 6 fps, 0.167 s apart · zoom-out, type as frame, ease-out, hard cut

The network doesn't cut away. A lime 'O' sweeps in at huge scale with the network inside its counter, and the camera pulls back until 'STORY' sits mid-frame with the red dot as the O's center. Most of that scale change happens in the first half second; the word keeps shrinking slowly for two more. Then the film's only hard cut, to orange at 16.75.

Motion: `▁▁▇██▄▄▄▄▄▄▄▄▄▃▃▄▄▇`

- 00:13.75 `motion/story/f-001.webp` ▁
- 00:13.92 `motion/story/f-002.webp` ▁
- 00:14.08 `motion/story/f-003.webp` ▇
- 00:14.25 `motion/story/f-004.webp` █
- 00:14.42 `motion/story/f-005.webp` █
- 00:14.58 `motion/story/f-006.webp` ▄
- 00:14.75 `motion/story/f-007.webp` ▄
- 00:14.92 `motion/story/f-008.webp` ▄
- 00:15.08 `motion/story/f-009.webp` ▄
- 00:15.25 `motion/story/f-010.webp` ▄
- 00:15.42 `motion/story/f-011.webp` ▄
- 00:15.58 `motion/story/f-012.webp` ▄
- 00:15.75 `motion/story/f-013.webp` ▄
- 00:15.92 `motion/story/f-014.webp` ▄
- 00:16.08 `motion/story/f-015.webp` ▃
- 00:16.25 `motion/story/f-016.webp` ▃
- 00:16.42 `motion/story/f-017.webp` ▄
- 00:16.58 `motion/story/f-018.webp` ▄
- 00:16.75 `motion/story/f-019.webp` ▇

### 03. A dot writes the line

00:16.75–00:18.75 (2.00 s) · 17 frames at 8 fps, 0.125 s apart · type-on, cursor, stagger

'Stories helped make us who we are' types on line by line, a small red dot running ahead like a cursor. The ellipsis is set last, one dot at a time, and those three dots become the next scene.

Motion: `▇▁▂▃▃▃▃▃▃▃▂▂▁▁▁▂▁`

Onion skin: `motion/type-on/trail.webp`

- 00:16.75 `motion/type-on/f-001.webp` ▇
- 00:16.88 `motion/type-on/f-002.webp` ▁
- 00:17.00 `motion/type-on/f-003.webp` ▂
- 00:17.12 `motion/type-on/f-004.webp` ▃
- 00:17.25 `motion/type-on/f-005.webp` ▃
- 00:17.38 `motion/type-on/f-006.webp` ▃
- 00:17.50 `motion/type-on/f-007.webp` ▃
- 00:17.62 `motion/type-on/f-008.webp` ▃
- 00:17.75 `motion/type-on/f-009.webp` ▃
- 00:17.88 `motion/type-on/f-010.webp` ▃
- 00:18.00 `motion/type-on/f-011.webp` ▂
- 00:18.12 `motion/type-on/f-012.webp` ▂
- 00:18.25 `motion/type-on/f-013.webp` ▁
- 00:18.38 `motion/type-on/f-014.webp` ▁
- 00:18.50 `motion/type-on/f-015.webp` ▁
- 00:18.62 `motion/type-on/f-016.webp` ▂
- 00:18.75 `motion/type-on/f-017.webp` ▁

### 04. The ellipsis opens a window

00:20.00–00:23.00 (3.00 s) · 25 frames at 8 fps, 0.125 s apart · push-in, pan, zoom-through

The camera pushes in and drifts right, so the text slides out left while the ellipsis grows. By 21.75 the third dot holds a cave painting, and the camera keeps pushing until that dot is the whole frame. A circle is the transition, as it is almost everywhere in the film.

Motion: `▃▄▄▅▅▆▆▆▆▆▅▅▅▅▆▆▇▇▇▇▇▆▄▅▅`

- 00:20.00 `motion/portal/f-001.webp` ▃
- 00:20.12 `motion/portal/f-002.webp` ▄
- 00:20.25 `motion/portal/f-003.webp` ▄
- 00:20.38 `motion/portal/f-004.webp` ▅
- 00:20.50 `motion/portal/f-005.webp` ▅
- 00:20.62 `motion/portal/f-006.webp` ▆
- 00:20.75 `motion/portal/f-007.webp` ▆
- 00:20.88 `motion/portal/f-008.webp` ▆
- 00:21.00 `motion/portal/f-009.webp` ▆
- 00:21.12 `motion/portal/f-010.webp` ▆
- 00:21.25 `motion/portal/f-011.webp` ▅
- 00:21.38 `motion/portal/f-012.webp` ▅
- 00:21.50 `motion/portal/f-013.webp` ▅
- 00:21.62 `motion/portal/f-014.webp` ▅
- 00:21.75 `motion/portal/f-015.webp` ▆
- 00:21.88 `motion/portal/f-016.webp` ▆
- 00:22.00 `motion/portal/f-017.webp` ▇
- 00:22.12 `motion/portal/f-018.webp` ▇
- 00:22.25 `motion/portal/f-019.webp` ▇
- 00:22.38 `motion/portal/f-020.webp` ▇
- 00:22.50 `motion/portal/f-021.webp` ▇
- 00:22.62 `motion/portal/f-022.webp` ▆
- 00:22.75 `motion/portal/f-023.webp` ▄
- 00:22.88 `motion/portal/f-024.webp` ▅
- 00:23.00 `motion/portal/f-025.webp` ▅

### 05. Iris out to the next idea

00:24.75–00:25.75 (1.00 s) · 13 frames at 12 fps, 0.083 s apart · iris-out, draw-on

A salmon circle opens from the center over the cave painting and covers the frame in about half a second. A yellow cloud outline then draws itself into the clean space.

Motion: `▅▅▆▆▇▇▇▇▆▃▁▁▁`

- 00:24.75 `motion/iris-cloud/f-001.webp` ▅
- 00:24.83 `motion/iris-cloud/f-002.webp` ▅
- 00:24.92 `motion/iris-cloud/f-003.webp` ▆
- 00:25.00 `motion/iris-cloud/f-004.webp` ▆
- 00:25.08 `motion/iris-cloud/f-005.webp` ▇
- 00:25.17 `motion/iris-cloud/f-006.webp` ▇
- 00:25.25 `motion/iris-cloud/f-007.webp` ▇
- 00:25.33 `motion/iris-cloud/f-008.webp` ▇
- 00:25.42 `motion/iris-cloud/f-009.webp` ▆
- 00:25.50 `motion/iris-cloud/f-010.webp` ▃
- 00:25.58 `motion/iris-cloud/f-011.webp` ▁
- 00:25.67 `motion/iris-cloud/f-012.webp` ▁
- 00:25.75 `motion/iris-cloud/f-013.webp` ▁

### 06. Dots queue into a mind

00:27.00–00:29.50 (2.50 s) · 16 frames at 6 fps, 0.167 s apart · stream, grow, pan

A red dot enters the cloud, then a row of dots streams in from the left, each entering as the next arrives. The outline gains folds with every dot until it reads as a brain, and the row pushes the whole picture right.

Motion: `▂▂▁▃▄▃▃▂▁▂▂▃▄▅▅▆`

Onion skin: `motion/mind/trail.webp`

- 00:27.00 `motion/mind/f-001.webp` ▂
- 00:27.17 `motion/mind/f-002.webp` ▂
- 00:27.33 `motion/mind/f-003.webp` ▁
- 00:27.50 `motion/mind/f-004.webp` ▃
- 00:27.67 `motion/mind/f-005.webp` ▄
- 00:27.83 `motion/mind/f-006.webp` ▃
- 00:28.00 `motion/mind/f-007.webp` ▃
- 00:28.17 `motion/mind/f-008.webp` ▂
- 00:28.33 `motion/mind/f-009.webp` ▁
- 00:28.50 `motion/mind/f-010.webp` ▂
- 00:28.67 `motion/mind/f-011.webp` ▂
- 00:28.83 `motion/mind/f-012.webp` ▃
- 00:29.00 `motion/mind/f-013.webp` ▄
- 00:29.17 `motion/mind/f-014.webp` ▅
- 00:29.33 `motion/mind/f-015.webp` ▅
- 00:29.50 `motion/mind/f-016.webp` ▆

### 07. Fire-swirl wipe

00:29.75–00:31.75 (2.00 s) · 25 frames at 12 fps, 0.083 s apart · shape wipe, swirl, particle dissolve

Flame shapes in red and yellow sweep in from the left and cover the frame in about a quarter second. As they swirl, purple shows through the gaps with the campfire already in place, and the last scraps of flame drift off right as particles. The same wipe comes back at 59.75.

Motion: `▆▆▆▆█████████████▇▇▇▆▆▆▆▆`

- 00:29.75 `motion/fire-swirl/f-001.webp` ▆
- 00:29.83 `motion/fire-swirl/f-002.webp` ▆
- 00:29.92 `motion/fire-swirl/f-003.webp` ▆
- 00:30.00 `motion/fire-swirl/f-004.webp` ▆
- 00:30.08 `motion/fire-swirl/f-005.webp` █
- 00:30.17 `motion/fire-swirl/f-006.webp` █
- 00:30.25 `motion/fire-swirl/f-007.webp` █
- 00:30.33 `motion/fire-swirl/f-008.webp` █
- 00:30.42 `motion/fire-swirl/f-009.webp` █
- 00:30.50 `motion/fire-swirl/f-010.webp` █
- 00:30.58 `motion/fire-swirl/f-011.webp` █
- 00:30.67 `motion/fire-swirl/f-012.webp` █
- 00:30.75 `motion/fire-swirl/f-013.webp` █
- 00:30.83 `motion/fire-swirl/f-014.webp` █
- 00:30.92 `motion/fire-swirl/f-015.webp` █
- 00:31.00 `motion/fire-swirl/f-016.webp` █
- 00:31.08 `motion/fire-swirl/f-017.webp` █
- 00:31.17 `motion/fire-swirl/f-018.webp` ▇
- 00:31.25 `motion/fire-swirl/f-019.webp` ▇
- 00:31.33 `motion/fire-swirl/f-020.webp` ▇
- 00:31.42 `motion/fire-swirl/f-021.webp` ▆
- 00:31.50 `motion/fire-swirl/f-022.webp` ▆
- 00:31.58 `motion/fire-swirl/f-023.webp` ▆
- 00:31.67 `motion/fire-swirl/f-024.webp` ▆
- 00:31.75 `motion/fire-swirl/f-025.webp` ▆

### 08. Rings breathe out from the fire

00:31.75–00:35.75 (4.00 s) · 17 frames at 4 fps, 0.250 s apart · radial, ripple, loop, color drift

Dashed rings expand from the fire one after another while concentric rows of dots drift outward and grow until they fill the frame. Over the next ten seconds the dots shift from lavender to pink. Fire drawing people together is said with rings alone, no figures.

Motion: `▆▅▆▆▅▅▆▆▆▅▆▆▆▅▅▆▅`

Onion skin: `motion/rings/trail.webp`

- 00:31.75 `motion/rings/f-001.webp` ▆
- 00:32.00 `motion/rings/f-002.webp` ▅
- 00:32.25 `motion/rings/f-003.webp` ▆
- 00:32.50 `motion/rings/f-004.webp` ▆
- 00:32.75 `motion/rings/f-005.webp` ▅
- 00:33.00 `motion/rings/f-006.webp` ▅
- 00:33.25 `motion/rings/f-007.webp` ▆
- 00:33.50 `motion/rings/f-008.webp` ▆
- 00:33.75 `motion/rings/f-009.webp` ▆
- 00:34.00 `motion/rings/f-010.webp` ▅
- 00:34.25 `motion/rings/f-011.webp` ▆
- 00:34.50 `motion/rings/f-012.webp` ▆
- 00:34.75 `motion/rings/f-013.webp` ▆
- 00:35.00 `motion/rings/f-014.webp` ▅
- 00:35.25 `motion/rings/f-015.webp` ▅
- 00:35.50 `motion/rings/f-016.webp` ▆
- 00:35.75 `motion/rings/f-017.webp` ▅

### 09. The fire becomes a vortex

00:41.00–00:45.75 (4.75 s) · 25 frames at 5 fps, 0.200 s apart · flare, spiral, shrink to a point, color change

The flame flares into a ball and blows out into a ring of fire between the dashed circles. The rings spiral inward while everything shrinks toward the center, down to a speck by 45.0, when the background lightens and turns green.

Motion: `▆▆▆▇███████████▇▇▆▆▅▇█▄▄▅`

- 00:41.00 `motion/vortex/f-001.webp` ▆
- 00:41.20 `motion/vortex/f-002.webp` ▆
- 00:41.40 `motion/vortex/f-003.webp` ▆
- 00:41.60 `motion/vortex/f-004.webp` ▇
- 00:41.80 `motion/vortex/f-005.webp` █
- 00:42.00 `motion/vortex/f-006.webp` █
- 00:42.20 `motion/vortex/f-007.webp` █
- 00:42.40 `motion/vortex/f-008.webp` █
- 00:42.60 `motion/vortex/f-009.webp` █
- 00:42.80 `motion/vortex/f-010.webp` █
- 00:43.00 `motion/vortex/f-011.webp` █
- 00:43.20 `motion/vortex/f-012.webp` █
- 00:43.40 `motion/vortex/f-013.webp` █
- 00:43.60 `motion/vortex/f-014.webp` █
- 00:43.80 `motion/vortex/f-015.webp` █
- 00:44.00 `motion/vortex/f-016.webp` ▇
- 00:44.20 `motion/vortex/f-017.webp` ▇
- 00:44.40 `motion/vortex/f-018.webp` ▆
- 00:44.60 `motion/vortex/f-019.webp` ▆
- 00:44.80 `motion/vortex/f-020.webp` ▅
- 00:45.00 `motion/vortex/f-021.webp` ▇
- 00:45.20 `motion/vortex/f-022.webp` █
- 00:45.40 `motion/vortex/f-023.webp` ▄
- 00:45.60 `motion/vortex/f-024.webp` ▄
- 00:45.80 `motion/vortex/f-025.webp` ▅

### 10. The fire relights

00:45.50–00:48.00 (2.50 s) · 21 frames at 8 fps, 0.125 s apart · drop-in, overshoot, settle

Two logs drop in spinning, the flame pops up taller than its resting height and settles back over about a second, and yellow-green dots appear around it.

Motion: `▁▃▅▅▅▅▅▅▅▅▅▄▅▅▄▄▄▄▅▄▄`

Onion skin: `motion/relight/trail.webp`

- 00:45.50 `motion/relight/f-001.webp` ▁
- 00:45.62 `motion/relight/f-002.webp` ▃
- 00:45.75 `motion/relight/f-003.webp` ▅
- 00:45.88 `motion/relight/f-004.webp` ▅
- 00:46.00 `motion/relight/f-005.webp` ▅
- 00:46.12 `motion/relight/f-006.webp` ▅
- 00:46.25 `motion/relight/f-007.webp` ▅
- 00:46.38 `motion/relight/f-008.webp` ▅
- 00:46.50 `motion/relight/f-009.webp` ▅
- 00:46.62 `motion/relight/f-010.webp` ▅
- 00:46.75 `motion/relight/f-011.webp` ▅
- 00:46.88 `motion/relight/f-012.webp` ▄
- 00:47.00 `motion/relight/f-013.webp` ▅
- 00:47.12 `motion/relight/f-014.webp` ▅
- 00:47.25 `motion/relight/f-015.webp` ▄
- 00:47.38 `motion/relight/f-016.webp` ▄
- 00:47.50 `motion/relight/f-017.webp` ▄
- 00:47.62 `motion/relight/f-018.webp` ▄
- 00:47.75 `motion/relight/f-019.webp` ▅
- 00:47.88 `motion/relight/f-020.webp` ▄
- 00:48.00 `motion/relight/f-021.webp` ▄

### 11. Into the speech bubble

00:52.25–00:56.00 (3.75 s) · 23 frames at 6 fps, 0.167 s apart · pop, push-in, zoom-through, accelerate

A red dot beside the fire grows a tiny speech bubble with an ellipsis in it. Then the camera dives: within a quarter second the bubble fills a quarter of the frame, and by 55.75 its cream interior is the background, the three dots inside it.

Motion: `▅▅▅▅▅▅▅▅▅▄▅▅▇██▇▇▅▆▇██▆`

- 00:52.25 `motion/bubble/f-001.webp` ▅
- 00:52.42 `motion/bubble/f-002.webp` ▅
- 00:52.58 `motion/bubble/f-003.webp` ▅
- 00:52.75 `motion/bubble/f-004.webp` ▅
- 00:52.92 `motion/bubble/f-005.webp` ▅
- 00:53.08 `motion/bubble/f-006.webp` ▅
- 00:53.25 `motion/bubble/f-007.webp` ▅
- 00:53.42 `motion/bubble/f-008.webp` ▅
- 00:53.58 `motion/bubble/f-009.webp` ▅
- 00:53.75 `motion/bubble/f-010.webp` ▄
- 00:53.92 `motion/bubble/f-011.webp` ▅
- 00:54.08 `motion/bubble/f-012.webp` ▅
- 00:54.25 `motion/bubble/f-013.webp` ▇
- 00:54.42 `motion/bubble/f-014.webp` █
- 00:54.58 `motion/bubble/f-015.webp` █
- 00:54.75 `motion/bubble/f-016.webp` ▇
- 00:54.92 `motion/bubble/f-017.webp` ▇
- 00:55.08 `motion/bubble/f-018.webp` ▅
- 00:55.25 `motion/bubble/f-019.webp` ▆
- 00:55.42 `motion/bubble/f-020.webp` ▇
- 00:55.58 `motion/bubble/f-021.webp` █
- 00:55.75 `motion/bubble/f-022.webp` █
- 00:55.92 `motion/bubble/f-023.webp` ▆

### 12. Through the red dot

00:56.00–00:58.75 (2.75 s) · 23 frames at 8 fps, 0.125 s apart · pan, zoom-through, nested circles

The three dots slide left past camera like a pan. The next dot carries a tiny fire; it grows as it reaches center until its lime core, with the fire and rings of dots, becomes the frame. Each scene is entered through a circle in the one before.

Motion: `▆▆▇▆▆▆▆▇▇▆▆▆▆▆▆▇▇▇▇██▇▇`

- 00:56.00 `motion/through-dot/f-001.webp` ▆
- 00:56.12 `motion/through-dot/f-002.webp` ▆
- 00:56.25 `motion/through-dot/f-003.webp` ▇
- 00:56.38 `motion/through-dot/f-004.webp` ▆
- 00:56.50 `motion/through-dot/f-005.webp` ▆
- 00:56.62 `motion/through-dot/f-006.webp` ▆
- 00:56.75 `motion/through-dot/f-007.webp` ▆
- 00:56.88 `motion/through-dot/f-008.webp` ▇
- 00:57.00 `motion/through-dot/f-009.webp` ▇
- 00:57.12 `motion/through-dot/f-010.webp` ▆
- 00:57.25 `motion/through-dot/f-011.webp` ▆
- 00:57.38 `motion/through-dot/f-012.webp` ▆
- 00:57.50 `motion/through-dot/f-013.webp` ▆
- 00:57.62 `motion/through-dot/f-014.webp` ▆
- 00:57.75 `motion/through-dot/f-015.webp` ▆
- 00:57.88 `motion/through-dot/f-016.webp` ▇
- 00:58.00 `motion/through-dot/f-017.webp` ▇
- 00:58.12 `motion/through-dot/f-018.webp` ▇
- 00:58.25 `motion/through-dot/f-019.webp` ▇
- 00:58.38 `motion/through-dot/f-020.webp` █
- 00:58.50 `motion/through-dot/f-021.webp` █
- 00:58.62 `motion/through-dot/f-022.webp` ▇
- 00:58.75 `motion/through-dot/f-023.webp` ▇

### 13. Near and far as scale

01:00.50–01:06.25 (5.75 s) · 24 frames at 4 fps, 0.250 s apart · converge, scale, ripple, slide

Specks converge into three green dots. One springs up into a huge disc (nearby) while another shrinks to a speck that sends out a ripple ring (distant lands). The big disc slides to center and the rest vanish.

Motion: `▄▄▃▁▁▂▂▁▁▃▆▄▂▁▁▁▂▃▃▂▇▆▆▁`

Onion skin: `motion/near-far/trail.webp`

- 01:00.50 `motion/near-far/f-001.webp` ▄
- 01:00.75 `motion/near-far/f-002.webp` ▄
- 01:01.00 `motion/near-far/f-003.webp` ▃
- 01:01.25 `motion/near-far/f-004.webp` ▁
- 01:01.50 `motion/near-far/f-005.webp` ▁
- 01:01.75 `motion/near-far/f-006.webp` ▂
- 01:02.00 `motion/near-far/f-007.webp` ▂
- 01:02.25 `motion/near-far/f-008.webp` ▁
- 01:02.50 `motion/near-far/f-009.webp` ▁
- 01:02.75 `motion/near-far/f-010.webp` ▃
- 01:03.00 `motion/near-far/f-011.webp` ▆
- 01:03.25 `motion/near-far/f-012.webp` ▄
- 01:03.50 `motion/near-far/f-013.webp` ▂
- 01:03.75 `motion/near-far/f-014.webp` ▁
- 01:04.00 `motion/near-far/f-015.webp` ▁
- 01:04.25 `motion/near-far/f-016.webp` ▁
- 01:04.50 `motion/near-far/f-017.webp` ▂
- 01:04.75 `motion/near-far/f-018.webp` ▃
- 01:05.00 `motion/near-far/f-019.webp` ▃
- 01:05.25 `motion/near-far/f-020.webp` ▂
- 01:05.50 `motion/near-far/f-021.webp` ▇
- 01:05.75 `motion/near-far/f-022.webp` ▆
- 01:06.00 `motion/near-far/f-023.webp` ▆
- 01:06.25 `motion/near-far/f-024.webp` ▁

### 14. Faces pop out of a dot

01:06.75–01:10.25 (3.50 s) · 22 frames at 6 fps, 0.167 s apart · pop, stagger, merge, iris-out

A dot gets a laughing face, then a second and third dot pop out to its right with tense and amazed faces. They squeeze back into one dot, which opens as a purple iris onto the next scene.

Motion: `▁▁▁▁▁▁▃▃▄▃▃▂▁▁▁▁▁▄▃██▆`

- 01:06.75 `motion/faces/f-001.webp` ▁
- 01:06.92 `motion/faces/f-002.webp` ▁
- 01:07.08 `motion/faces/f-003.webp` ▁
- 01:07.25 `motion/faces/f-004.webp` ▁
- 01:07.42 `motion/faces/f-005.webp` ▁
- 01:07.58 `motion/faces/f-006.webp` ▁
- 01:07.75 `motion/faces/f-007.webp` ▃
- 01:07.92 `motion/faces/f-008.webp` ▃
- 01:08.08 `motion/faces/f-009.webp` ▄
- 01:08.25 `motion/faces/f-010.webp` ▃
- 01:08.42 `motion/faces/f-011.webp` ▃
- 01:08.58 `motion/faces/f-012.webp` ▂
- 01:08.75 `motion/faces/f-013.webp` ▁
- 01:08.92 `motion/faces/f-014.webp` ▁
- 01:09.08 `motion/faces/f-015.webp` ▁
- 01:09.25 `motion/faces/f-016.webp` ▁
- 01:09.42 `motion/faces/f-017.webp` ▁
- 01:09.58 `motion/faces/f-018.webp` ▄
- 01:09.75 `motion/faces/f-019.webp` ▃
- 01:09.92 `motion/faces/f-020.webp` █
- 01:10.08 `motion/faces/f-021.webp` █
- 01:10.25 `motion/faces/f-022.webp` ▆

### 15. Constellation to world map

01:12.75–01:19.25 (6.50 s) · 21 frames at 3 fps, 0.333 s apart · pull-back, parallax, morph

Dots and lines multiply as the camera pulls back, and big dots pass close to camera, which gives the flat network depth. At 78.5 the network rearranges into a world map made of the same dots.

Motion: `▁▄▇▅▄▃▂▇▇▃▃▂▂▁▁▂▆█▆▄▃`

- 01:12.75 `motion/constellation/f-001.webp` ▁
- 01:13.08 `motion/constellation/f-002.webp` ▄
- 01:13.42 `motion/constellation/f-003.webp` ▇
- 01:13.75 `motion/constellation/f-004.webp` ▅
- 01:14.08 `motion/constellation/f-005.webp` ▄
- 01:14.42 `motion/constellation/f-006.webp` ▃
- 01:14.75 `motion/constellation/f-007.webp` ▂
- 01:15.08 `motion/constellation/f-008.webp` ▇
- 01:15.42 `motion/constellation/f-009.webp` ▇
- 01:15.75 `motion/constellation/f-010.webp` ▃
- 01:16.08 `motion/constellation/f-011.webp` ▃
- 01:16.42 `motion/constellation/f-012.webp` ▂
- 01:16.75 `motion/constellation/f-013.webp` ▂
- 01:17.08 `motion/constellation/f-014.webp` ▁
- 01:17.42 `motion/constellation/f-015.webp` ▁
- 01:17.75 `motion/constellation/f-016.webp` ▂
- 01:18.08 `motion/constellation/f-017.webp` ▆
- 01:18.42 `motion/constellation/f-018.webp` █
- 01:18.75 `motion/constellation/f-019.webp` ▆
- 01:19.08 `motion/constellation/f-020.webp` ▄
- 01:19.42 `motion/constellation/f-021.webp` ▃

### 16. The world becomes a storyteller

01:20.25–01:23.50 (3.25 s) · 21 frames at 6 fps, 0.167 s apart · iris-in, stream, stack

The map shrinks inside a purple circle that closes down to a red dot with a purple rim. Purple dots peel off that rim in a curving stream and stack into a pyramid beneath it, the red dot left on top.

Motion: `▂▅▇█▇▄▁▁▁▂▃▂▄▅▅▅▅▄▄▃▂`

- 01:20.25 `motion/storyteller/f-001.webp` ▂
- 01:20.42 `motion/storyteller/f-002.webp` ▅
- 01:20.58 `motion/storyteller/f-003.webp` ▇
- 01:20.75 `motion/storyteller/f-004.webp` █
- 01:20.92 `motion/storyteller/f-005.webp` ▇
- 01:21.08 `motion/storyteller/f-006.webp` ▄
- 01:21.25 `motion/storyteller/f-007.webp` ▁
- 01:21.42 `motion/storyteller/f-008.webp` ▁
- 01:21.58 `motion/storyteller/f-009.webp` ▁
- 01:21.75 `motion/storyteller/f-010.webp` ▂
- 01:21.92 `motion/storyteller/f-011.webp` ▃
- 01:22.08 `motion/storyteller/f-012.webp` ▂
- 01:22.25 `motion/storyteller/f-013.webp` ▄
- 01:22.42 `motion/storyteller/f-014.webp` ▅
- 01:22.58 `motion/storyteller/f-015.webp` ▅
- 01:22.75 `motion/storyteller/f-016.webp` ▅
- 01:22.92 `motion/storyteller/f-017.webp` ▅
- 01:23.08 `motion/storyteller/f-018.webp` ▄
- 01:23.25 `motion/storyteller/f-019.webp` ▄
- 01:23.42 `motion/storyteller/f-020.webp` ▃
- 01:23.58 `motion/storyteller/f-021.webp` ▂

### 17. The pyramid melts into hearts

01:26.75–01:32.75 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · swirl, scatter, morph, color shift

The pyramid loosens into a swirl, spreads into a scatter, and turns from purple to red as it goes. The dots become hearts and settle into a six-fold pattern, then flip to purple dots for a beat and back to red.

Motion: `▃▄▅▅▆▇▇▇▇▇▇▇▇▇▇▇▇▅▆▃▁▁▁▄▅`

- 01:26.75 `motion/hearts/f-001.webp` ▃
- 01:27.00 `motion/hearts/f-002.webp` ▄
- 01:27.25 `motion/hearts/f-003.webp` ▅
- 01:27.50 `motion/hearts/f-004.webp` ▅
- 01:27.75 `motion/hearts/f-005.webp` ▆
- 01:28.00 `motion/hearts/f-006.webp` ▇
- 01:28.25 `motion/hearts/f-007.webp` ▇
- 01:28.50 `motion/hearts/f-008.webp` ▇
- 01:28.75 `motion/hearts/f-009.webp` ▇
- 01:29.00 `motion/hearts/f-010.webp` ▇
- 01:29.25 `motion/hearts/f-011.webp` ▇
- 01:29.50 `motion/hearts/f-012.webp` ▇
- 01:29.75 `motion/hearts/f-013.webp` ▇
- 01:30.00 `motion/hearts/f-014.webp` ▇
- 01:30.25 `motion/hearts/f-015.webp` ▇
- 01:30.50 `motion/hearts/f-016.webp` ▇
- 01:30.75 `motion/hearts/f-017.webp` ▇
- 01:31.00 `motion/hearts/f-018.webp` ▅
- 01:31.25 `motion/hearts/f-019.webp` ▆
- 01:31.50 `motion/hearts/f-020.webp` ▃
- 01:31.75 `motion/hearts/f-021.webp` ▁
- 01:32.00 `motion/hearts/f-022.webp` ▁
- 01:32.25 `motion/hearts/f-023.webp` ▁
- 01:32.50 `motion/hearts/f-024.webp` ▄
- 01:32.75 `motion/hearts/f-025.webp` ▅

### 18. Dots that move like liquid

01:36.50–01:39.75 (3.25 s) · 21 frames at 6 fps, 0.167 s apart · squash and stretch, smear, color shift

As the dots rearrange, the fast ones stretch into smears and neighbors briefly merge like drops of liquid. It is the film's nearest thing to cartoon squash and stretch, and it turns from red to magenta to purple on the way.

Motion: `▅▅▅▆▆▆▆▆▆▆▅▅▅▅▅▅▅▄▄▄▄`

- 01:36.50 `motion/liquid/f-001.webp` ▅
- 01:36.67 `motion/liquid/f-002.webp` ▅
- 01:36.83 `motion/liquid/f-003.webp` ▅
- 01:37.00 `motion/liquid/f-004.webp` ▆
- 01:37.17 `motion/liquid/f-005.webp` ▆
- 01:37.33 `motion/liquid/f-006.webp` ▆
- 01:37.50 `motion/liquid/f-007.webp` ▆
- 01:37.67 `motion/liquid/f-008.webp` ▆
- 01:37.83 `motion/liquid/f-009.webp` ▆
- 01:38.00 `motion/liquid/f-010.webp` ▆
- 01:38.17 `motion/liquid/f-011.webp` ▅
- 01:38.33 `motion/liquid/f-012.webp` ▅
- 01:38.50 `motion/liquid/f-013.webp` ▅
- 01:38.67 `motion/liquid/f-014.webp` ▅
- 01:38.83 `motion/liquid/f-015.webp` ▅
- 01:39.00 `motion/liquid/f-016.webp` ▅
- 01:39.17 `motion/liquid/f-017.webp` ▅
- 01:39.33 `motion/liquid/f-018.webp` ▄
- 01:39.50 `motion/liquid/f-019.webp` ▄
- 01:39.67 `motion/liquid/f-020.webp` ▄
- 01:39.83 `motion/liquid/f-021.webp` ▄

### 19. The amphitheater, then into the bubble

01:40.25–01:46.00 (5.75 s) · 24 frames at 4 fps, 0.250 s apart · settle, draw-on, push-in, unroll

The dots settle into a fan of listeners under a speaker dot, and red arcs draw in between them like sound waves. A small speech bubble pops above the speaker, the camera dives into it, and its outline unrolls off the bottom of the frame, leaving the three dots.

Motion: `▃▃▃▃▂▃▂▂▂▂▂▁▁▁▁▁▁▇█▇▅▃▅▄`

- 01:40.25 `motion/amphitheater/f-001.webp` ▃
- 01:40.50 `motion/amphitheater/f-002.webp` ▃
- 01:40.75 `motion/amphitheater/f-003.webp` ▃
- 01:41.00 `motion/amphitheater/f-004.webp` ▃
- 01:41.25 `motion/amphitheater/f-005.webp` ▂
- 01:41.50 `motion/amphitheater/f-006.webp` ▃
- 01:41.75 `motion/amphitheater/f-007.webp` ▂
- 01:42.00 `motion/amphitheater/f-008.webp` ▂
- 01:42.25 `motion/amphitheater/f-009.webp` ▂
- 01:42.50 `motion/amphitheater/f-010.webp` ▂
- 01:42.75 `motion/amphitheater/f-011.webp` ▂
- 01:43.00 `motion/amphitheater/f-012.webp` ▁
- 01:43.25 `motion/amphitheater/f-013.webp` ▁
- 01:43.50 `motion/amphitheater/f-014.webp` ▁
- 01:43.75 `motion/amphitheater/f-015.webp` ▁
- 01:44.00 `motion/amphitheater/f-016.webp` ▁
- 01:44.25 `motion/amphitheater/f-017.webp` ▁
- 01:44.50 `motion/amphitheater/f-018.webp` ▇
- 01:44.75 `motion/amphitheater/f-019.webp` █
- 01:45.00 `motion/amphitheater/f-020.webp` ▇
- 01:45.25 `motion/amphitheater/f-021.webp` ▅
- 01:45.50 `motion/amphitheater/f-022.webp` ▃
- 01:45.75 `motion/amphitheater/f-023.webp` ▅
- 01:46.00 `motion/amphitheater/f-024.webp` ▄

### 20. A ball with a goal meets an obstacle

01:50.50–01:55.00 (4.50 s) · 19 frames at 4 fps, 0.250 s apart · pop, slide-in, roll

A red ball appears and a thought bubble rises from it in three puffs, showing a flag. A yellow triangle slides in from the right. The ball rolls up its side and slides back down.

Motion: `▃▁▁▂▃▂▁▁▂▄▆▆▂▃▄▄▃▃▅`

Onion skin: `motion/goal/trail.webp`

- 01:50.50 `motion/goal/f-001.webp` ▃
- 01:50.75 `motion/goal/f-002.webp` ▁
- 01:51.00 `motion/goal/f-003.webp` ▁
- 01:51.25 `motion/goal/f-004.webp` ▂
- 01:51.50 `motion/goal/f-005.webp` ▃
- 01:51.75 `motion/goal/f-006.webp` ▂
- 01:52.00 `motion/goal/f-007.webp` ▁
- 01:52.25 `motion/goal/f-008.webp` ▁
- 01:52.50 `motion/goal/f-009.webp` ▂
- 01:52.75 `motion/goal/f-010.webp` ▄
- 01:53.00 `motion/goal/f-011.webp` ▆
- 01:53.25 `motion/goal/f-012.webp` ▆
- 01:53.50 `motion/goal/f-013.webp` ▂
- 01:53.75 `motion/goal/f-014.webp` ▃
- 01:54.00 `motion/goal/f-015.webp` ▄
- 01:54.25 `motion/goal/f-016.webp` ▄
- 01:54.50 `motion/goal/f-017.webp` ▃
- 01:54.75 `motion/goal/f-018.webp` ▃
- 01:55.00 `motion/goal/f-019.webp` ▅

### 21. Over the top

01:55.00–02:02.50 (7.50 s) · 23 frames at 3 fps, 0.333 s apart · draw-on, tilt, roll, settle

A white plank draws itself in along the slope. The ball rides it up, the plank tips over the peak like a seesaw, and the ball rolls down the far side to the flag, the resolution, at 122.

Motion: `▅▄▄▇▆▆▆▅▅▄▄▃▂▅▇█▇▅▄▃▄▄▃`

Onion skin: `motion/seesaw/trail.webp`

- 01:55.00 `motion/seesaw/f-001.webp` ▅
- 01:55.33 `motion/seesaw/f-002.webp` ▄
- 01:55.67 `motion/seesaw/f-003.webp` ▄
- 01:56.00 `motion/seesaw/f-004.webp` ▇
- 01:56.33 `motion/seesaw/f-005.webp` ▆
- 01:56.67 `motion/seesaw/f-006.webp` ▆
- 01:57.00 `motion/seesaw/f-007.webp` ▆
- 01:57.33 `motion/seesaw/f-008.webp` ▅
- 01:57.67 `motion/seesaw/f-009.webp` ▅
- 01:58.00 `motion/seesaw/f-010.webp` ▄
- 01:58.33 `motion/seesaw/f-011.webp` ▄
- 01:58.67 `motion/seesaw/f-012.webp` ▃
- 01:59.00 `motion/seesaw/f-013.webp` ▂
- 01:59.33 `motion/seesaw/f-014.webp` ▅
- 01:59.67 `motion/seesaw/f-015.webp` ▇
- 02:00.00 `motion/seesaw/f-016.webp` █
- 02:00.33 `motion/seesaw/f-017.webp` ▇
- 02:00.67 `motion/seesaw/f-018.webp` ▅
- 02:01.00 `motion/seesaw/f-019.webp` ▄
- 02:01.33 `motion/seesaw/f-020.webp` ▃
- 02:01.67 `motion/seesaw/f-021.webp` ▄
- 02:02.00 `motion/seesaw/f-022.webp` ▄
- 02:02.33 `motion/seesaw/f-023.webp` ▃

### 22. The 4 keys badge wipes

02:05.50–02:08.75 (3.25 s) · 21 frames at 6 fps, 0.167 s apart · pop, scale-up, shape wipe

The middle dot becomes a purple '4 keys' badge. It grows past the edges of the frame, and a purple slab with a rounded cutout sweeps across, leaving lime for the list.

Motion: `▇▅█▇▂▁▁▁▁▁▁▁▄▆█████▅▄`

- 02:05.50 `motion/keys/f-001.webp` ▇
- 02:05.67 `motion/keys/f-002.webp` ▅
- 02:05.83 `motion/keys/f-003.webp` █
- 02:06.00 `motion/keys/f-004.webp` ▇
- 02:06.17 `motion/keys/f-005.webp` ▂
- 02:06.33 `motion/keys/f-006.webp` ▁
- 02:06.50 `motion/keys/f-007.webp` ▁
- 02:06.67 `motion/keys/f-008.webp` ▁
- 02:06.83 `motion/keys/f-009.webp` ▁
- 02:07.00 `motion/keys/f-010.webp` ▁
- 02:07.17 `motion/keys/f-011.webp` ▁
- 02:07.33 `motion/keys/f-012.webp` ▁
- 02:07.50 `motion/keys/f-013.webp` ▄
- 02:07.67 `motion/keys/f-014.webp` ▆
- 02:07.83 `motion/keys/f-015.webp` █
- 02:08.00 `motion/keys/f-016.webp` █
- 02:08.17 `motion/keys/f-017.webp` █
- 02:08.33 `motion/keys/f-018.webp` █
- 02:08.50 `motion/keys/f-019.webp` █
- 02:08.67 `motion/keys/f-020.webp` ▅
- 02:08.83 `motion/keys/f-021.webp` ▄

### 23. Key 1: empathy as color

02:08.75–02:14.00 (5.25 s) · 22 frames at 4 fps, 0.250 s apart · spiral-in, ring, color propagation

'1.' sets, cyan dots spiral in around a red dot, and 'CHARACTER' rises from the bottom edge. The center turns blue, then the ring does: listener and character end up the same color.

Motion: `▅▅▆▇▆▅▅▄▅▄▂▁▁▁▂▁▂▃▂▁▃▇`

- 02:08.75 `motion/key-1/f-001.webp` ▅
- 02:09.00 `motion/key-1/f-002.webp` ▅
- 02:09.25 `motion/key-1/f-003.webp` ▆
- 02:09.50 `motion/key-1/f-004.webp` ▇
- 02:09.75 `motion/key-1/f-005.webp` ▆
- 02:10.00 `motion/key-1/f-006.webp` ▅
- 02:10.25 `motion/key-1/f-007.webp` ▅
- 02:10.50 `motion/key-1/f-008.webp` ▄
- 02:10.75 `motion/key-1/f-009.webp` ▅
- 02:11.00 `motion/key-1/f-010.webp` ▄
- 02:11.25 `motion/key-1/f-011.webp` ▂
- 02:11.50 `motion/key-1/f-012.webp` ▁
- 02:11.75 `motion/key-1/f-013.webp` ▁
- 02:12.00 `motion/key-1/f-014.webp` ▁
- 02:12.25 `motion/key-1/f-015.webp` ▂
- 02:12.50 `motion/key-1/f-016.webp` ▁
- 02:12.75 `motion/key-1/f-017.webp` ▂
- 02:13.00 `motion/key-1/f-018.webp` ▃
- 02:13.25 `motion/key-1/f-019.webp` ▂
- 02:13.50 `motion/key-1/f-020.webp` ▁
- 02:13.75 `motion/key-1/f-021.webp` ▃
- 02:14.00 `motion/key-1/f-022.webp` ▇

### 24. Key 2: a seesaw of tension

02:14.00–02:22.50 (8.50 s) · 22 frames at 2.5 fps, 0.400 s apart · fall-in, assemble, tilt, swap

The ring falls apart and reassembles as a seesaw; '1.' drops out and '2.' drops in from the top. The red dot faces a question mark and the plank tips back and forth. The question mark becomes a warning sign for 'actual danger'.

Motion: `▇▅▅▄▃▄▂▁▁▁▂▄▃▁▁▁▃▃▂▁▄▇`

- 02:14.00 `motion/key-2/f-001.webp` ▇
- 02:14.40 `motion/key-2/f-002.webp` ▅
- 02:14.80 `motion/key-2/f-003.webp` ▅
- 02:15.20 `motion/key-2/f-004.webp` ▄
- 02:15.60 `motion/key-2/f-005.webp` ▃
- 02:16.00 `motion/key-2/f-006.webp` ▄
- 02:16.40 `motion/key-2/f-007.webp` ▂
- 02:16.80 `motion/key-2/f-008.webp` ▁
- 02:17.20 `motion/key-2/f-009.webp` ▁
- 02:17.60 `motion/key-2/f-010.webp` ▁
- 02:18.00 `motion/key-2/f-011.webp` ▂
- 02:18.40 `motion/key-2/f-012.webp` ▄
- 02:18.80 `motion/key-2/f-013.webp` ▃
- 02:19.20 `motion/key-2/f-014.webp` ▁
- 02:19.60 `motion/key-2/f-015.webp` ▁
- 02:20.00 `motion/key-2/f-016.webp` ▁
- 02:20.40 `motion/key-2/f-017.webp` ▃
- 02:20.80 `motion/key-2/f-018.webp` ▃
- 02:21.20 `motion/key-2/f-019.webp` ▂
- 02:21.60 `motion/key-2/f-020.webp` ▁
- 02:22.00 `motion/key-2/f-021.webp` ▄
- 02:22.40 `motion/key-2/f-022.webp` ▇

### 25. Key 3: detail as hatching

02:22.75–02:32.75 (10.00 s) · 21 frames at 2 fps, 0.500 s apart · morph, texture, fall-out

The seesaw collapses into a circle of fine hatching. The hatching coarsens and thins, then the circle fills solid red, the right level of detail, and drops out of the bottom with '3.'.

Motion: `▆▂▁▁▃▂▁▁▁▁▁▂▄▅▄▃▄▄▆▆▅`

- 02:22.75 `motion/key-3/f-001.webp` ▆
- 02:23.25 `motion/key-3/f-002.webp` ▂
- 02:23.75 `motion/key-3/f-003.webp` ▁
- 02:24.25 `motion/key-3/f-004.webp` ▁
- 02:24.75 `motion/key-3/f-005.webp` ▃
- 02:25.25 `motion/key-3/f-006.webp` ▂
- 02:25.75 `motion/key-3/f-007.webp` ▁
- 02:26.25 `motion/key-3/f-008.webp` ▁
- 02:26.75 `motion/key-3/f-009.webp` ▁
- 02:27.25 `motion/key-3/f-010.webp` ▁
- 02:27.75 `motion/key-3/f-011.webp` ▁
- 02:28.25 `motion/key-3/f-012.webp` ▂
- 02:28.75 `motion/key-3/f-013.webp` ▄
- 02:29.25 `motion/key-3/f-014.webp` ▅
- 02:29.75 `motion/key-3/f-015.webp` ▄
- 02:30.25 `motion/key-3/f-016.webp` ▃
- 02:30.75 `motion/key-3/f-017.webp` ▄
- 02:31.25 `motion/key-3/f-018.webp` ▄
- 02:31.75 `motion/key-3/f-019.webp` ▆
- 02:32.25 `motion/key-3/f-020.webp` ▆
- 02:32.75 `motion/key-3/f-021.webp` ▅

### 26. Key 4: one dot divides, three endings

02:34.50–02:41.00 (6.50 s) · 21 frames at 3 fps, 0.333 s apart · divide, stagger, morph

One dot divides into two, then three, with 'CONCLUSION' rising beneath. The third dot cycles through endings: a laughing face, a heart, then an exclamation mark that stretches up out of it.

Motion: `▃▅▄▂▁▁▁▆▆▃▁▂▂▁▁▅▅▂▅▄▅`

- 02:34.50 `motion/key-4/f-001.webp` ▃
- 02:34.83 `motion/key-4/f-002.webp` ▅
- 02:35.17 `motion/key-4/f-003.webp` ▄
- 02:35.50 `motion/key-4/f-004.webp` ▂
- 02:35.83 `motion/key-4/f-005.webp` ▁
- 02:36.17 `motion/key-4/f-006.webp` ▁
- 02:36.50 `motion/key-4/f-007.webp` ▁
- 02:36.83 `motion/key-4/f-008.webp` ▆
- 02:37.17 `motion/key-4/f-009.webp` ▆
- 02:37.50 `motion/key-4/f-010.webp` ▃
- 02:37.83 `motion/key-4/f-011.webp` ▁
- 02:38.17 `motion/key-4/f-012.webp` ▂
- 02:38.50 `motion/key-4/f-013.webp` ▂
- 02:38.83 `motion/key-4/f-014.webp` ▁
- 02:39.17 `motion/key-4/f-015.webp` ▁
- 02:39.50 `motion/key-4/f-016.webp` ▅
- 02:39.83 `motion/key-4/f-017.webp` ▅
- 02:40.17 `motion/key-4/f-018.webp` ▂
- 02:40.50 `motion/key-4/f-019.webp` ▅
- 02:40.83 `motion/key-4/f-020.webp` ▄
- 02:41.17 `motion/key-4/f-021.webp` ▅

### 27. A journey drawn as a line

02:45.75–02:48.75 (3.00 s) · 19 frames at 6 fps, 0.167 s apart · pop, draw-on, plot

Small icons pop in along an invisible curve. A white line then draws through them left to right, climbing to a peak marked by a triangle and dropping again: a talk as a plot graph.

Motion: `▅▂▄▄▄▃▃▂▂▂▂▂▂▂▂▂▂▂▂`

- 02:45.75 `motion/journey/f-001.webp` ▅
- 02:45.92 `motion/journey/f-002.webp` ▂
- 02:46.08 `motion/journey/f-003.webp` ▄
- 02:46.25 `motion/journey/f-004.webp` ▄
- 02:46.42 `motion/journey/f-005.webp` ▄
- 02:46.58 `motion/journey/f-006.webp` ▃
- 02:46.75 `motion/journey/f-007.webp` ▃
- 02:46.92 `motion/journey/f-008.webp` ▂
- 02:47.08 `motion/journey/f-009.webp` ▂
- 02:47.25 `motion/journey/f-010.webp` ▂
- 02:47.42 `motion/journey/f-011.webp` ▂
- 02:47.58 `motion/journey/f-012.webp` ▂
- 02:47.75 `motion/journey/f-013.webp` ▂
- 02:47.92 `motion/journey/f-014.webp` ▂
- 02:48.08 `motion/journey/f-015.webp` ▂
- 02:48.25 `motion/journey/f-016.webp` ▂
- 02:48.42 `motion/journey/f-017.webp` ▂
- 02:48.58 `motion/journey/f-018.webp` ▂
- 02:48.75 `motion/journey/f-019.webp` ▂

### 28. Ring to triangles to compass

02:51.25–02:56.00 (4.75 s) · 20 frames at 4 fps, 0.250 s apart · color propagation, shape morph, converge

The icons fold into a ring of white dots around a purple center. The dots turn purple one after another around the ring, the center becomes a triangle, then each dot does too, in turn. The triangles fly in to form a compass.

Motion: `▃▇▇▆▄▁▃▄▂▂▂▂▄▂▁▁▁▄▅▄`

- 02:51.25 `motion/compass/f-001.webp` ▃
- 02:51.50 `motion/compass/f-002.webp` ▇
- 02:51.75 `motion/compass/f-003.webp` ▇
- 02:52.00 `motion/compass/f-004.webp` ▆
- 02:52.25 `motion/compass/f-005.webp` ▄
- 02:52.50 `motion/compass/f-006.webp` ▁
- 02:52.75 `motion/compass/f-007.webp` ▃
- 02:53.00 `motion/compass/f-008.webp` ▄
- 02:53.25 `motion/compass/f-009.webp` ▂
- 02:53.50 `motion/compass/f-010.webp` ▂
- 02:53.75 `motion/compass/f-011.webp` ▂
- 02:54.00 `motion/compass/f-012.webp` ▂
- 02:54.25 `motion/compass/f-013.webp` ▄
- 02:54.50 `motion/compass/f-014.webp` ▂
- 02:54.75 `motion/compass/f-015.webp` ▁
- 02:55.00 `motion/compass/f-016.webp` ▁
- 02:55.25 `motion/compass/f-017.webp` ▁
- 02:55.50 `motion/compass/f-018.webp` ▄
- 02:55.75 `motion/compass/f-019.webp` ▅
- 02:56.00 `motion/compass/f-020.webp` ▄

### 29. The compass draws its own path

02:58.00–03:02.00 (4.00 s) · 25 frames at 6 fps, 0.167 s apart · shrink, trail, tracking

The compass shrinks to a small marker and travels, drawing the white line behind it: flat, up a gentle rise, over the peak and down. The camera follows, so the line scrolls while the marker stays near the same spot.

Motion: `▃▄▅▄▄▄▄▃▄▄▅▅▅▄▄▃▃▃▃▃▁▂▂▂▁`

Onion skin: `motion/path/trail.webp`

- 02:58.00 `motion/path/f-001.webp` ▃
- 02:58.17 `motion/path/f-002.webp` ▄
- 02:58.33 `motion/path/f-003.webp` ▅
- 02:58.50 `motion/path/f-004.webp` ▄
- 02:58.67 `motion/path/f-005.webp` ▄
- 02:58.83 `motion/path/f-006.webp` ▄
- 02:59.00 `motion/path/f-007.webp` ▄
- 02:59.17 `motion/path/f-008.webp` ▃
- 02:59.33 `motion/path/f-009.webp` ▄
- 02:59.50 `motion/path/f-010.webp` ▄
- 02:59.67 `motion/path/f-011.webp` ▅
- 02:59.83 `motion/path/f-012.webp` ▅
- 03:00.00 `motion/path/f-013.webp` ▅
- 03:00.17 `motion/path/f-014.webp` ▄
- 03:00.33 `motion/path/f-015.webp` ▄
- 03:00.50 `motion/path/f-016.webp` ▃
- 03:00.67 `motion/path/f-017.webp` ▃
- 03:00.83 `motion/path/f-018.webp` ▃
- 03:01.00 `motion/path/f-019.webp` ▃
- 03:01.17 `motion/path/f-020.webp` ▃
- 03:01.33 `motion/path/f-021.webp` ▁
- 03:01.50 `motion/path/f-022.webp` ▂
- 03:01.67 `motion/path/f-023.webp` ▂
- 03:01.83 `motion/path/f-024.webp` ▂
- 03:02.00 `motion/path/f-025.webp` ▁

### 30. The trap, then a glitch

03:02.00–03:06.50 (4.50 s) · 23 frames at 5 fps, 0.200 s apart · iris-in, hinge, glitch, color shift

A big red disc closes down to a dot on a purple tightrope. The line hinges open beneath it like a trapdoor and the dot drops; vertical streaks tear across the frame while the color shifts from salmon through brown to green.

Motion: `▁▂▆▇▅▂▁▂▃▃▃▄▆▇▆▇▇▇▇▆▇▅▁`

- 03:02.00 `motion/trap/f-001.webp` ▁
- 03:02.20 `motion/trap/f-002.webp` ▂
- 03:02.40 `motion/trap/f-003.webp` ▆
- 03:02.60 `motion/trap/f-004.webp` ▇
- 03:02.80 `motion/trap/f-005.webp` ▅
- 03:03.00 `motion/trap/f-006.webp` ▂
- 03:03.20 `motion/trap/f-007.webp` ▁
- 03:03.40 `motion/trap/f-008.webp` ▂
- 03:03.60 `motion/trap/f-009.webp` ▃
- 03:03.80 `motion/trap/f-010.webp` ▃
- 03:04.00 `motion/trap/f-011.webp` ▃
- 03:04.20 `motion/trap/f-012.webp` ▄
- 03:04.40 `motion/trap/f-013.webp` ▆
- 03:04.60 `motion/trap/f-014.webp` ▇
- 03:04.80 `motion/trap/f-015.webp` ▆
- 03:05.00 `motion/trap/f-016.webp` ▇
- 03:05.20 `motion/trap/f-017.webp` ▇
- 03:05.40 `motion/trap/f-018.webp` ▇
- 03:05.60 `motion/trap/f-019.webp` ▇
- 03:05.80 `motion/trap/f-020.webp` ▆
- 03:06.00 `motion/trap/f-021.webp` ▇
- 03:06.20 `motion/trap/f-022.webp` ▅
- 03:06.40 `motion/trap/f-023.webp` ▁

### 31. A gift for the audience

03:06.25–03:15.25 (9.00 s) · 23 frames at 2.5 fps, 0.400 s apart · pop, morph, grow, assemble

A crosshair dot becomes a light-blue circle with an ellipsis. The dots turn into faces one by one and the last swells into a glossy red ball that pushes out of the circle. White listener dots assemble around it into the amphitheater, then scatter.

Motion: `▁▁▁▅▄▁▁▁▁▁▁▁▁▁▂▁▁▁▁▁▇▆▃`

- 03:06.25 `motion/gift/f-001.webp` ▁
- 03:06.65 `motion/gift/f-002.webp` ▁
- 03:07.05 `motion/gift/f-003.webp` ▁
- 03:07.45 `motion/gift/f-004.webp` ▅
- 03:07.85 `motion/gift/f-005.webp` ▄
- 03:08.25 `motion/gift/f-006.webp` ▁
- 03:08.65 `motion/gift/f-007.webp` ▁
- 03:09.05 `motion/gift/f-008.webp` ▁
- 03:09.45 `motion/gift/f-009.webp` ▁
- 03:09.85 `motion/gift/f-010.webp` ▁
- 03:10.25 `motion/gift/f-011.webp` ▁
- 03:10.65 `motion/gift/f-012.webp` ▁
- 03:11.05 `motion/gift/f-013.webp` ▁
- 03:11.45 `motion/gift/f-014.webp` ▁
- 03:11.85 `motion/gift/f-015.webp` ▂
- 03:12.25 `motion/gift/f-016.webp` ▁
- 03:12.65 `motion/gift/f-017.webp` ▁
- 03:13.05 `motion/gift/f-018.webp` ▁
- 03:13.45 `motion/gift/f-019.webp` ▁
- 03:13.85 `motion/gift/f-020.webp` ▁
- 03:14.25 `motion/gift/f-021.webp` ▇
- 03:14.65 `motion/gift/f-022.webp` ▆
- 03:15.05 `motion/gift/f-023.webp` ▃

### 32. A reel of takeaways

03:17.75–03:25.75 (8.00 s) · 25 frames at 3 fps, 0.333 s apart · drop-through, reel, stop

Light-blue circles drop through the frame like a slot reel and one stops at center as an eye. The reel spins on to a play button, a stack of circles, then a dove: understanding, information, context, hope.

Motion: `▅▆▆▄▂▅▄▃▃▂▁▁▁▇▇▁▁▇▄▄▇▃▃▅▃`

- 03:17.75 `motion/reel/f-001.webp` ▅
- 03:18.08 `motion/reel/f-002.webp` ▆
- 03:18.42 `motion/reel/f-003.webp` ▆
- 03:18.75 `motion/reel/f-004.webp` ▄
- 03:19.08 `motion/reel/f-005.webp` ▂
- 03:19.42 `motion/reel/f-006.webp` ▅
- 03:19.75 `motion/reel/f-007.webp` ▄
- 03:20.08 `motion/reel/f-008.webp` ▃
- 03:20.42 `motion/reel/f-009.webp` ▃
- 03:20.75 `motion/reel/f-010.webp` ▂
- 03:21.08 `motion/reel/f-011.webp` ▁
- 03:21.42 `motion/reel/f-012.webp` ▁
- 03:21.75 `motion/reel/f-013.webp` ▁
- 03:22.08 `motion/reel/f-014.webp` ▇
- 03:22.42 `motion/reel/f-015.webp` ▇
- 03:22.75 `motion/reel/f-016.webp` ▁
- 03:23.08 `motion/reel/f-017.webp` ▁
- 03:23.42 `motion/reel/f-018.webp` ▇
- 03:23.75 `motion/reel/f-019.webp` ▄
- 03:24.08 `motion/reel/f-020.webp` ▄
- 03:24.42 `motion/reel/f-021.webp` ▇
- 03:24.75 `motion/reel/f-022.webp` ▃
- 03:25.08 `motion/reel/f-023.webp` ▃
- 03:25.42 `motion/reel/f-024.webp` ▅
- 03:25.75 `motion/reel/f-025.webp` ▃

### 33. Rambling

03:25.50–03:29.75 (4.25 s) · 22 frames at 5 fps, 0.200 s apart · shrink, iris-out, rays, spin-out

The dove shrinks to a sad red face; a dot grows and wipes the frame to lime. An ellipsis dot sits in a sun of rays that turn and fade, then shrinks to nothing.

Motion: `▅▄▂▂▁▁▁▂▃▆█▂▃▃▄▄▃▃▄▄▃▁`

- 03:25.50 `motion/ramble/f-001.webp` ▅
- 03:25.70 `motion/ramble/f-002.webp` ▄
- 03:25.90 `motion/ramble/f-003.webp` ▂
- 03:26.10 `motion/ramble/f-004.webp` ▂
- 03:26.30 `motion/ramble/f-005.webp` ▁
- 03:26.50 `motion/ramble/f-006.webp` ▁
- 03:26.70 `motion/ramble/f-007.webp` ▁
- 03:26.90 `motion/ramble/f-008.webp` ▂
- 03:27.10 `motion/ramble/f-009.webp` ▃
- 03:27.30 `motion/ramble/f-010.webp` ▆
- 03:27.50 `motion/ramble/f-011.webp` █
- 03:27.70 `motion/ramble/f-012.webp` ▂
- 03:27.90 `motion/ramble/f-013.webp` ▃
- 03:28.10 `motion/ramble/f-014.webp` ▃
- 03:28.30 `motion/ramble/f-015.webp` ▄
- 03:28.50 `motion/ramble/f-016.webp` ▄
- 03:28.70 `motion/ramble/f-017.webp` ▃
- 03:28.90 `motion/ramble/f-018.webp` ▃
- 03:29.10 `motion/ramble/f-019.webp` ▄
- 03:29.30 `motion/ramble/f-020.webp` ▄
- 03:29.50 `motion/ramble/f-021.webp` ▃
- 03:29.70 `motion/ramble/f-022.webp` ▁

### 34. 'meaning' in one stroke

03:30.50–03:37.50 (7.00 s) · 22 frames at 3 fps, 0.333 s apart · draw-on, handwriting, disintegrate

Out of drifting confetti, 'meaning' is written in one continuous red line with the pen tip leading. A moment after it finishes, the word breaks up from the left into the same confetti.

Motion: `▂▃▃▃▂▂▂▂▂▂▂▂▂▁▁▁▁▁▃▁▄▂`

- 03:30.50 `motion/meaning/f-001.webp` ▂
- 03:30.83 `motion/meaning/f-002.webp` ▃
- 03:31.17 `motion/meaning/f-003.webp` ▃
- 03:31.50 `motion/meaning/f-004.webp` ▃
- 03:31.83 `motion/meaning/f-005.webp` ▂
- 03:32.17 `motion/meaning/f-006.webp` ▂
- 03:32.50 `motion/meaning/f-007.webp` ▂
- 03:32.83 `motion/meaning/f-008.webp` ▂
- 03:33.17 `motion/meaning/f-009.webp` ▂
- 03:33.50 `motion/meaning/f-010.webp` ▂
- 03:33.83 `motion/meaning/f-011.webp` ▂
- 03:34.17 `motion/meaning/f-012.webp` ▂
- 03:34.50 `motion/meaning/f-013.webp` ▂
- 03:34.83 `motion/meaning/f-014.webp` ▁
- 03:35.17 `motion/meaning/f-015.webp` ▁
- 03:35.50 `motion/meaning/f-016.webp` ▁
- 03:35.83 `motion/meaning/f-017.webp` ▁
- 03:36.17 `motion/meaning/f-018.webp` ▁
- 03:36.50 `motion/meaning/f-019.webp` ▃
- 03:36.83 `motion/meaning/f-020.webp` ▁
- 03:37.17 `motion/meaning/f-021.webp` ▄
- 03:37.50 `motion/meaning/f-022.webp` ▂

### 35. The compass points at its virtues

03:42.00–03:55.50 (13.50 s) · 21 frames at 1.5 fps, 0.667 s apart · grow, pop, needle swing

The compass grows from a speck. Each value pops in at a different corner (a fist for powerful, a calm face for humility, a halo for honesty, a pulsing heart for vulnerability) and the needle swings to point at it. Then green dots gather around the compass and it shrinks away to a red dot.

Motion: `▁▄▄▄▁▁▁▅▃▁▁▃▄▃▄▁▂▅▆▅▂`

Onion skin: `motion/virtues/trail.webp`

- 03:42.00 `motion/virtues/f-001.webp` ▁
- 03:42.67 `motion/virtues/f-002.webp` ▄
- 03:43.33 `motion/virtues/f-003.webp` ▄
- 03:44.00 `motion/virtues/f-004.webp` ▄
- 03:44.67 `motion/virtues/f-005.webp` ▁
- 03:45.33 `motion/virtues/f-006.webp` ▁
- 03:46.00 `motion/virtues/f-007.webp` ▁
- 03:46.67 `motion/virtues/f-008.webp` ▅
- 03:47.33 `motion/virtues/f-009.webp` ▃
- 03:48.00 `motion/virtues/f-010.webp` ▁
- 03:48.67 `motion/virtues/f-011.webp` ▁
- 03:49.33 `motion/virtues/f-012.webp` ▃
- 03:50.00 `motion/virtues/f-013.webp` ▄
- 03:50.67 `motion/virtues/f-014.webp` ▃
- 03:51.33 `motion/virtues/f-015.webp` ▄
- 03:52.00 `motion/virtues/f-016.webp` ▁
- 03:52.67 `motion/virtues/f-017.webp` ▂
- 03:53.33 `motion/virtues/f-018.webp` ▅
- 03:54.00 `motion/virtues/f-019.webp` ▆
- 03:54.67 `motion/virtues/f-020.webp` ▅
- 03:55.33 `motion/virtues/f-021.webp` ▂

### 36. Exaggeration inflates

04:08.50–04:15.50 (7.00 s) · 22 frames at 3 fps, 0.333 s apart · scale-up, hollow, spread, slam

The three dots swell and grow orange halos while their red cores shrink to nothing, leaving empty shells. They drift apart, slam back together, and the merged circle fills the frame with red.

Motion: `▂▄▂▂▂▁▁▁▁▁▁▁▁▁▃▃▁▂▃▆▇▆`

- 04:08.50 `motion/inflate/f-001.webp` ▂
- 04:08.83 `motion/inflate/f-002.webp` ▄
- 04:09.17 `motion/inflate/f-003.webp` ▂
- 04:09.50 `motion/inflate/f-004.webp` ▂
- 04:09.83 `motion/inflate/f-005.webp` ▂
- 04:10.17 `motion/inflate/f-006.webp` ▁
- 04:10.50 `motion/inflate/f-007.webp` ▁
- 04:10.83 `motion/inflate/f-008.webp` ▁
- 04:11.17 `motion/inflate/f-009.webp` ▁
- 04:11.50 `motion/inflate/f-010.webp` ▁
- 04:11.83 `motion/inflate/f-011.webp` ▁
- 04:12.17 `motion/inflate/f-012.webp` ▁
- 04:12.50 `motion/inflate/f-013.webp` ▁
- 04:12.83 `motion/inflate/f-014.webp` ▁
- 04:13.17 `motion/inflate/f-015.webp` ▃
- 04:13.50 `motion/inflate/f-016.webp` ▃
- 04:13.83 `motion/inflate/f-017.webp` ▁
- 04:14.17 `motion/inflate/f-018.webp` ▂
- 04:14.50 `motion/inflate/f-019.webp` ▃
- 04:14.83 `motion/inflate/f-020.webp` ▆
- 04:15.17 `motion/inflate/f-021.webp` ▇
- 04:15.50 `motion/inflate/f-022.webp` ▆

### 37. Spotlight

04:15.50–04:21.50 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · wipe-up, light sweep, scale

A navy stage with a green floor wipes up from below. A yellow spotlight swings in from the left; when it lands on the dot, the dot grows several times its size, and as the beam moves on to the right and out of frame, the dot shrinks back. The floor drops out and purple rises in its place.

Motion: `▆▇▆▄▆▇▅▄▅▅▅▆▆▆▅▅▅▄▄▇▆▂▅▇▆`

- 04:15.50 `motion/spotlight/f-001.webp` ▆
- 04:15.75 `motion/spotlight/f-002.webp` ▇
- 04:16.00 `motion/spotlight/f-003.webp` ▆
- 04:16.25 `motion/spotlight/f-004.webp` ▄
- 04:16.50 `motion/spotlight/f-005.webp` ▆
- 04:16.75 `motion/spotlight/f-006.webp` ▇
- 04:17.00 `motion/spotlight/f-007.webp` ▅
- 04:17.25 `motion/spotlight/f-008.webp` ▄
- 04:17.50 `motion/spotlight/f-009.webp` ▅
- 04:17.75 `motion/spotlight/f-010.webp` ▅
- 04:18.00 `motion/spotlight/f-011.webp` ▅
- 04:18.25 `motion/spotlight/f-012.webp` ▆
- 04:18.50 `motion/spotlight/f-013.webp` ▆
- 04:18.75 `motion/spotlight/f-014.webp` ▆
- 04:19.00 `motion/spotlight/f-015.webp` ▅
- 04:19.25 `motion/spotlight/f-016.webp` ▅
- 04:19.50 `motion/spotlight/f-017.webp` ▅
- 04:19.75 `motion/spotlight/f-018.webp` ▄
- 04:20.00 `motion/spotlight/f-019.webp` ▄
- 04:20.25 `motion/spotlight/f-020.webp` ▇
- 04:20.50 `motion/spotlight/f-021.webp` ▆
- 04:20.75 `motion/spotlight/f-022.webp` ▂
- 04:21.00 `motion/spotlight/f-023.webp` ▅
- 04:21.25 `motion/spotlight/f-024.webp` ▇
- 04:21.50 `motion/spotlight/f-025.webp` ▆

### 38. A star cracks and falls

04:21.25–04:26.25 (5.00 s) · 21 frames at 4 fps, 0.250 s apart · morph, crack, shatter, fall

The red X shrinks to a speck and returns as a star. Hairline cracks spread across it, it breaks apart at 265, and the pieces fall out of the bottom of the frame.

Motion: `▇▆▃▁▁▁▁▁▁▁▁▁▁▁▁▄▄▅▅▅▂`

Onion skin: `motion/star/trail.webp`

- 04:21.25 `motion/star/f-001.webp` ▇
- 04:21.50 `motion/star/f-002.webp` ▆
- 04:21.75 `motion/star/f-003.webp` ▃
- 04:22.00 `motion/star/f-004.webp` ▁
- 04:22.25 `motion/star/f-005.webp` ▁
- 04:22.50 `motion/star/f-006.webp` ▁
- 04:22.75 `motion/star/f-007.webp` ▁
- 04:23.00 `motion/star/f-008.webp` ▁
- 04:23.25 `motion/star/f-009.webp` ▁
- 04:23.50 `motion/star/f-010.webp` ▁
- 04:23.75 `motion/star/f-011.webp` ▁
- 04:24.00 `motion/star/f-012.webp` ▁
- 04:24.25 `motion/star/f-013.webp` ▁
- 04:24.50 `motion/star/f-014.webp` ▁
- 04:24.75 `motion/star/f-015.webp` ▁
- 04:25.00 `motion/star/f-016.webp` ▄
- 04:25.25 `motion/star/f-017.webp` ▄
- 04:25.50 `motion/star/f-018.webp` ▅
- 04:25.75 `motion/star/f-019.webp` ▅
- 04:26.00 `motion/star/f-020.webp` ▅
- 04:26.25 `motion/star/f-021.webp` ▂

### 39. A gift, then sound waves

04:29.25–04:36.00 (6.75 s) · 21 frames at 3 fps, 0.333 s apart · spiral, orbit, morph, ripple

Dots spiral out of the ellipsis into a ring around it, and the center becomes a white gift icon. The gift splits back into three dots and arcs ripple out on both sides, closing into a speech bubble.

Motion: `▁▂▂▂▂▅▆▆▄▁▁▁▁▁▂▆▇▅▅▅▆`

- 04:29.25 `motion/waves/f-001.webp` ▁
- 04:29.58 `motion/waves/f-002.webp` ▂
- 04:29.92 `motion/waves/f-003.webp` ▂
- 04:30.25 `motion/waves/f-004.webp` ▂
- 04:30.58 `motion/waves/f-005.webp` ▂
- 04:30.92 `motion/waves/f-006.webp` ▅
- 04:31.25 `motion/waves/f-007.webp` ▆
- 04:31.58 `motion/waves/f-008.webp` ▆
- 04:31.92 `motion/waves/f-009.webp` ▄
- 04:32.25 `motion/waves/f-010.webp` ▁
- 04:32.58 `motion/waves/f-011.webp` ▁
- 04:32.92 `motion/waves/f-012.webp` ▁
- 04:33.25 `motion/waves/f-013.webp` ▁
- 04:33.58 `motion/waves/f-014.webp` ▁
- 04:33.92 `motion/waves/f-015.webp` ▂
- 04:34.25 `motion/waves/f-016.webp` ▆
- 04:34.58 `motion/waves/f-017.webp` ▇
- 04:34.92 `motion/waves/f-018.webp` ▅
- 04:35.25 `motion/waves/f-019.webp` ▅
- 04:35.58 `motion/waves/f-020.webp` ▅
- 04:35.92 `motion/waves/f-021.webp` ▆

### 40. Every motif in reverse

04:36.00–04:42.00 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · callback, zoom-through, morph

Speech bubble, amphitheater, campfire, and finally the red network from the opening, each turning into the next. The ending runs the film's motifs backwards to where it began.

Motion: `▆▅▆██▄▆▆▅▆▄▃▃▃▃▃▃▃▃▄▅▃▅▆▅`

- 04:36.00 `motion/callback/f-001.webp` ▆
- 04:36.25 `motion/callback/f-002.webp` ▅
- 04:36.50 `motion/callback/f-003.webp` ▆
- 04:36.75 `motion/callback/f-004.webp` █
- 04:37.00 `motion/callback/f-005.webp` █
- 04:37.25 `motion/callback/f-006.webp` ▄
- 04:37.50 `motion/callback/f-007.webp` ▆
- 04:37.75 `motion/callback/f-008.webp` ▆
- 04:38.00 `motion/callback/f-009.webp` ▅
- 04:38.25 `motion/callback/f-010.webp` ▆
- 04:38.50 `motion/callback/f-011.webp` ▄
- 04:38.75 `motion/callback/f-012.webp` ▃
- 04:39.00 `motion/callback/f-013.webp` ▃
- 04:39.25 `motion/callback/f-014.webp` ▃
- 04:39.50 `motion/callback/f-015.webp` ▃
- 04:39.75 `motion/callback/f-016.webp` ▃
- 04:40.00 `motion/callback/f-017.webp` ▃
- 04:40.25 `motion/callback/f-018.webp` ▃
- 04:40.50 `motion/callback/f-019.webp` ▃
- 04:40.75 `motion/callback/f-020.webp` ▄
- 04:41.00 `motion/callback/f-021.webp` ▅
- 04:41.25 `motion/callback/f-022.webp` ▃
- 04:41.50 `motion/callback/f-023.webp` ▅
- 04:41.75 `motion/callback/f-024.webp` ▆
- 04:42.00 `motion/callback/f-025.webp` ▅

### 41. Let it mean something

04:42.00–04:45.00 (3.00 s) · 19 frames at 6 fps, 0.167 s apart · type, slide, stagger

'Let' appears, then 'it' and 'mean' rise in while 'something' slides in from the right and docks beside 'mean'. Three red dots tick in one at a time as the ellipsis.

Motion: `▅▂▂▁▄▅▅▅▄▄▂▁▁▁▁▁▁▁▁`

- 04:42.00 `motion/let-it/f-001.webp` ▅
- 04:42.17 `motion/let-it/f-002.webp` ▂
- 04:42.33 `motion/let-it/f-003.webp` ▂
- 04:42.50 `motion/let-it/f-004.webp` ▁
- 04:42.67 `motion/let-it/f-005.webp` ▄
- 04:42.83 `motion/let-it/f-006.webp` ▅
- 04:43.00 `motion/let-it/f-007.webp` ▅
- 04:43.17 `motion/let-it/f-008.webp` ▅
- 04:43.33 `motion/let-it/f-009.webp` ▄
- 04:43.50 `motion/let-it/f-010.webp` ▄
- 04:43.67 `motion/let-it/f-011.webp` ▂
- 04:43.83 `motion/let-it/f-012.webp` ▁
- 04:44.00 `motion/let-it/f-013.webp` ▁
- 04:44.17 `motion/let-it/f-014.webp` ▁
- 04:44.33 `motion/let-it/f-015.webp` ▁
- 04:44.50 `motion/let-it/f-016.webp` ▁
- 04:44.67 `motion/let-it/f-017.webp` ▁
- 04:44.83 `motion/let-it/f-018.webp` ▁
- 04:45.00 `motion/let-it/f-019.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:02.00 `seconds/second-00003.webp` A quote card in thin grey type, Audre Lorde's 'What is most important to me must be spoken…'. Four seconds of stillness before the animation.
- 00:09.00 `seconds/second-00010.webp` The visual system in one frame: flat dots on cream, the red dot at the center, five friends on spring-like lines. People are dots for the rest of the film.
- 00:14.00 `seconds/second-00015.webp` A pull-back through type: the network turns out to sit inside the O of 'STORY'. Lime type on salmon.
- 00:18.00 `seconds/second-00019.webp` 'Stories helped make us who we are…' in a rounded sans, the last line in lime. The ellipsis is three red dots, and they will move.
- 00:23.00 `seconds/second-00024.webp` Cave painting in white line on red: hunters, a canoe, a spiral. Inside the circle the camera just dived through.
- 00:29.00 `seconds/second-00030.webp` Dots queue into a cloud outline that grows brain folds: ideas entering a mind.
- 00:33.00 `seconds/second-00034.webp` Campfire on purple, ringed by dashed circles and rows of dots. The fire is the film's one textured, hand-animated element.
- 00:42.00 `seconds/second-00043.webp` The fire flares into a vortex of flame bands inside the rings, the start of a transition rather than a scene.
- 00:47.00 `seconds/second-00048.webp` The same fire relit on green, yellow-green dots for the people around it.
- 00:53.00 `seconds/second-00054.webp` A red dot by the fire grows a tiny speech bubble. The camera is about to dive into it.
- 00:57.00 `seconds/second-00058.webp` Inside the bubble, the next red dot opens like a porthole onto a lime disc with the fire.
- 01:03.00 `seconds/second-00064.webp` Near and far as scale: a huge green disc, a small dot, a speck with a ripple ring.
- 01:08.00 `seconds/second-00069.webp` Dots become emoji faces for laughter, tension and amazement.
- 01:16.00 `seconds/second-00077.webp` Stories spread: a dense constellation of dots and lines, big dots passing close as the camera pulls back.
- 01:19.00 `seconds/second-00080.webp` The constellation resolves into a world map made of the same dots.
- 01:24.00 `seconds/second-00085.webp` The storyteller as the red dot on top of a pyramid of purple listeners.
- 01:32.00 `seconds/second-00093.webp` Hearts in a six-fold pattern: the listeners' response.
- 01:37.00 `seconds/second-00098.webp` Dots smear and stretch like liquid while they rearrange.
- 01:42.00 `seconds/second-00103.webp` The amphitheater: a speaker dot at the top, listeners in a fan, red arcs as sound waves. The layout returns three times.
- 01:54.00 `seconds/second-00115.webp` Story structure as a physics toy: a ball with a goal (the flag in its thought bubble) against a triangle obstacle.
- 01:59.00 `seconds/second-00120.webp` A plank turns the obstacle into a seesaw, and the ball rides it over the top.
- 02:06.00 `seconds/second-00127.webp` '4 keys' in a purple badge on sky blue.
- 02:11.00 `seconds/second-00132.webp` Key 1, character: a red dot ringed by cyan listeners. Number and label in a heavy rounded sans.
- 02:13.00 `seconds/second-00134.webp` Center and ring turn the same blue. Empathy is shown as shared color.
- 02:17.00 `seconds/second-00138.webp` Key 2, tension: the dot on a seesaw against a question mark.
- 02:22.00 `seconds/second-00143.webp` The question mark becomes a warning sign, the danger version of tension.
- 02:25.00 `seconds/second-00146.webp` Key 3, detail: a circle packed with fine hatching, too much detail.
- 02:31.00 `seconds/second-00152.webp` The hatching thins and the circle fills solid: the right amount.
- 02:35.00 `seconds/second-00156.webp` Key 4, conclusion: one dot has divided into three.
- 02:38.00 `seconds/second-00159.webp` The third dot cycles through the kinds of ending: funny, moving, surprising. Here, the heart.
- 02:49.00 `seconds/second-00170.webp` The journey: icons strung on one white line that climbs to a peak and falls, a talk's throughline as a plot graph.
- 02:55.00 `seconds/second-00176.webp` A ring of triangles around a purple center, about to fold into the compass.
- 02:59.00 `seconds/second-00180.webp` The compass travels and draws the line behind it.
- 03:04.00 `seconds/second-00185.webp` The trap: a tightrope that hinges open under the dot.
- 03:05.00 `seconds/second-00186.webp` A glitch between scenes: vertical streaks and a muddy color shift, the film's only rough texture.
- 03:12.00 `seconds/second-00193.webp` The gift: a light-blue circle whose three dots turn into faces.
- 03:20.00 `seconds/second-00201.webp` What the audience takes away, one icon at a time: an eye for a new way of understanding.
- 03:23.00 `seconds/second-00204.webp` A play button: actionable information.
- 03:25.00 `seconds/second-00206.webp` A dove: hope.
- 03:28.00 `seconds/second-00209.webp` Rambling: the ellipsis inside a sun of rays that keep turning.
- 03:33.00 `seconds/second-00214.webp` 'meaning' handwritten in one continuous red line, confetti all around.
- 03:46.00 `seconds/second-00227.webp` The compass needle swings toward a fist, 'powerful'. Each value is a direction.
- 03:52.00 `seconds/second-00233.webp` A purple heart pulses by the needle: vulnerability.
- 04:05.00 `seconds/second-00246.webp` Three dots with checkmarks: the story has to be true.
- 04:10.00 `seconds/second-00251.webp` Exaggeration: the dots inflate, their red cores draining to empty orange halos.
- 04:17.00 `seconds/second-00258.webp` A spotlight on a stage. The dot grows while it stands in the light.
- 04:24.00 `seconds/second-00265.webp` A reputation drawn as a star that cracks before it shatters.
- 04:35.00 `seconds/second-00276.webp` The gift sends out sound-wave arcs on both sides.
- 04:39.00 `seconds/second-00280.webp` Callback: the campfire network from the opening returns.
- 04:44.00 `seconds/second-00285.webp` 'Let it mean something…', the red ellipsis ticking in.
- 04:58.00 `seconds/second-00299.webp` The credits bar slides up under a recap of the triangle ring.
