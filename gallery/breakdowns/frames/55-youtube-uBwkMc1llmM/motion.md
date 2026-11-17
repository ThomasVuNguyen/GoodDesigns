# Motion notes: The incredible engineering of Venice - Stephanie H. Smith

TED-Ed · 06:49.09 · https://www.youtube.com/watch?v=uBwkMc1llmM

Sofia Pashaei draws Venice in flat geometric shapes with no outlines: stacked bands of blue for water, gradient skies, and buildings built from rectangles and arches. Almost every scene change is the same move. A small dot appears on one detail of the current picture, grows into a solid circle that fills the frame, and the next scene is waiting inside it. Within scenes the motion is mostly mechanical and repeated: piles driven one after another, boats sliding past on loops, tiles stacking in a grid, a route drawing itself across a map.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▂▄▁▁▁▃▆▅▂▂▁▁▁▁▁▁▆▂▂▆▃▇▂▂▂▄▅▁▂▂▂▂▂▃▃▂▃▃▃▃▆▆▁▂▇▂▁▁▂▅▆▅▅▃▅▅▃▅▅▂
01:00  ▁▁▆▆▇▁▁▁▇▆▂▁▁▂▆▄▃▄▂▄▂▄▂▄▂▄▂▆▁▁▄▃▄▅▁▁▁▁▃▃▃▅▆▁▁▁▁▁▁▁▁▁▁▄▄▂▁▁▁▇
02:00  ▁▁▁▁▁▁▁▆▂▁▁▁▂▁▁▁▆▁▂▁▁▅▁▁▅▁▅▃▂▂▁▁▂▁▁▁▁▆▃▃▅▃▄▄▄▄▄▆▄▁▁▁▄▅▂▂▆▇▁▁
03:00  ▁▁▁▁▁▇▄▁▁▁▁▁▁▁▁▁▁▇▁▁▁▁▁▁▁▁▁▇▄▁▁▁▁▁▁▁▂▁▁▁▁▆▅▅▅▄▄▅▆▃▁▂▁▁▅▁▁▆▇▁
04:00  ▁▂▁▁▁▁▁▁▆▅▅▅▆▄▆▇▁▁▁▁▇▄▁▂▂▃▆▅▁▁▁▁▅▁▁▁▄▁▁▁▁▁▃▆▂▁▂▂▁▃▃▃▃▃▂▇▄▄▃▄
05:00  ▄▆▆▁▁▅▅▁▁▁▁▆▇▄▅▄▄▄▇▁▃▃▁▇▃▁▃▃▃▃▃▃▃▃▃▃▃▄▂▁▁▆▁▁▃▁▁▁▆▂▂▂▂▂▂▇▁▁▃▃
06:00  ▁▃▃▂▄▄▃▄▆▆▃▃▅▄▃▃▃▃▃▃▃▆▅▂▁▁▁▁▁▁▆▆▁▂▂▁▂▄▆▂▅▁▁▂▂▁▁▁▁▁
```

## Sequences

### 01. A book opens onto the city

00:05.75–00:07.25 (1.50 s) · 13 frames at 8 fps, 0.125 s apart · fade-in, page turn, reveal

A cream book shape fades up on lavender, and its two pages swing open outward in about half a second. A top-down plan of a walled city is printed inside, already full of tiny figures.

Motion: `▅▃▅▆▆▆▆▆▆▇▇▆▂`

- 00:05.75 `motion/book/f-001.webp` ▅
- 00:05.88 `motion/book/f-002.webp` ▃
- 00:06.00 `motion/book/f-003.webp` ▅
- 00:06.12 `motion/book/f-004.webp` ▆
- 00:06.25 `motion/book/f-005.webp` ▆
- 00:06.38 `motion/book/f-006.webp` ▆
- 00:06.50 `motion/book/f-007.webp` ▆
- 00:06.62 `motion/book/f-008.webp` ▆
- 00:06.75 `motion/book/f-009.webp` ▆
- 00:06.88 `motion/book/f-010.webp` ▇
- 00:07.00 `motion/book/f-011.webp` ▇
- 00:07.12 `motion/book/f-012.webp` ▆
- 00:07.25 `motion/book/f-013.webp` ▂

### 02. Raiders fill the plan

00:09.50–00:16.50 (7.00 s) · 22 frames at 3 fps, 0.333 s apart · pop-in, stagger, fire, iris

Figures in green pop in along the streets a few at a time, then small flames flicker on across the plan. A blue dot appears at its center and grows into a circle that carries us out to the sea.

Motion: `▂▁▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁▂█▁`

- 00:09.50 `motion/raid/f-001.webp` ▂
- 00:09.83 `motion/raid/f-002.webp` ▁
- 00:10.17 `motion/raid/f-003.webp` ▁
- 00:10.50 `motion/raid/f-004.webp` ▁
- 00:10.83 `motion/raid/f-005.webp` ▁
- 00:11.17 `motion/raid/f-006.webp` ▁
- 00:11.50 `motion/raid/f-007.webp` ▂
- 00:11.83 `motion/raid/f-008.webp` ▁
- 00:12.17 `motion/raid/f-009.webp` ▁
- 00:12.50 `motion/raid/f-010.webp` ▁
- 00:12.83 `motion/raid/f-011.webp` ▁
- 00:13.17 `motion/raid/f-012.webp` ▁
- 00:13.50 `motion/raid/f-013.webp` ▁
- 00:13.83 `motion/raid/f-014.webp` ▁
- 00:14.17 `motion/raid/f-015.webp` ▁
- 00:14.50 `motion/raid/f-016.webp` ▁
- 00:14.83 `motion/raid/f-017.webp` ▁
- 00:15.17 `motion/raid/f-018.webp` ▁
- 00:15.50 `motion/raid/f-019.webp` ▁
- 00:15.83 `motion/raid/f-020.webp` ▂
- 00:16.17 `motion/raid/f-021.webp` █
- 00:16.50 `motion/raid/f-022.webp` ▁

### 03. Boats flee, riders arrive

00:16.25–00:21.75 (5.50 s) · 23 frames at 4 fps, 0.250 s apart · slide-in, stagger, parallax, wipe

On banded blue sea, small boats slide in from the right one after another. Pink horsemen ride up from the bottom edge on a gallop loop, filling the foreground. A horizontal band then wipes the frame to a top-down view of boats among islands.

Motion: `█▁▁▁▁▁▄▃▃▁▁▁▄▇▇▅▁▁▁▁▇█▇`

- 00:16.25 `motion/flight/f-001.webp` █
- 00:16.50 `motion/flight/f-002.webp` ▁
- 00:16.75 `motion/flight/f-003.webp` ▁
- 00:17.00 `motion/flight/f-004.webp` ▁
- 00:17.25 `motion/flight/f-005.webp` ▁
- 00:17.50 `motion/flight/f-006.webp` ▁
- 00:17.75 `motion/flight/f-007.webp` ▄
- 00:18.00 `motion/flight/f-008.webp` ▃
- 00:18.25 `motion/flight/f-009.webp` ▃
- 00:18.50 `motion/flight/f-010.webp` ▁
- 00:18.75 `motion/flight/f-011.webp` ▁
- 00:19.00 `motion/flight/f-012.webp` ▁
- 00:19.25 `motion/flight/f-013.webp` ▄
- 00:19.50 `motion/flight/f-014.webp` ▇
- 00:19.75 `motion/flight/f-015.webp` ▇
- 00:20.00 `motion/flight/f-016.webp` ▅
- 00:20.25 `motion/flight/f-017.webp` ▁
- 00:20.50 `motion/flight/f-018.webp` ▁
- 00:20.75 `motion/flight/f-019.webp` ▁
- 00:21.00 `motion/flight/f-020.webp` ▁
- 00:21.25 `motion/flight/f-021.webp` ▇
- 00:21.50 `motion/flight/f-022.webp` █
- 00:21.75 `motion/flight/f-023.webp` ▇

### 04. The lagoon fills with islands

00:26.00–00:31.00 (5.00 s) · 21 frames at 4 fps, 0.250 s apart · grow, draw-on, arrows, labels

On a flat map, island shapes grow out of the lagoon one by one. Yellow arrows draw on from the river mouths and point into it, and the labels Po and Piave type on beside them.

Motion: `▇▂▃▂▂▁▁▁▁▁▂▃▂▁▂▃▂▂▂▂▃`

Onion skin: `motion/lagoon/trail.webp`

- 00:26.00 `motion/lagoon/f-001.webp` ▇
- 00:26.25 `motion/lagoon/f-002.webp` ▂
- 00:26.50 `motion/lagoon/f-003.webp` ▃
- 00:26.75 `motion/lagoon/f-004.webp` ▂
- 00:27.00 `motion/lagoon/f-005.webp` ▂
- 00:27.25 `motion/lagoon/f-006.webp` ▁
- 00:27.50 `motion/lagoon/f-007.webp` ▁
- 00:27.75 `motion/lagoon/f-008.webp` ▁
- 00:28.00 `motion/lagoon/f-009.webp` ▁
- 00:28.25 `motion/lagoon/f-010.webp` ▁
- 00:28.50 `motion/lagoon/f-011.webp` ▂
- 00:28.75 `motion/lagoon/f-012.webp` ▃
- 00:29.00 `motion/lagoon/f-013.webp` ▂
- 00:29.25 `motion/lagoon/f-014.webp` ▁
- 00:29.50 `motion/lagoon/f-015.webp` ▂
- 00:29.75 `motion/lagoon/f-016.webp` ▃
- 00:30.00 `motion/lagoon/f-017.webp` ▂
- 00:30.25 `motion/lagoon/f-018.webp` ▂
- 00:30.50 `motion/lagoon/f-019.webp` ▂
- 00:30.75 `motion/lagoon/f-020.webp` ▂
- 00:31.00 `motion/lagoon/f-021.webp` ▃

### 05. Currents push back

00:32.50–00:40.25 (7.75 s) · 24 frames at 3 fps, 0.333 s apart · loop, arrows, morph

An Adriatic arrow pushes in from the sea against the river arrows, and all three pulse on loops. Between them the islands keep changing shape, shrinking and splitting: a maze that will not hold still.

Motion: `▂▃▃▂▂▃▃▃▃▃▂▂▃▃▃▃▃▃▂▃▃▃▃▃`

Onion skin: `motion/currents/trail.webp`

- 00:32.50 `motion/currents/f-001.webp` ▂
- 00:32.83 `motion/currents/f-002.webp` ▃
- 00:33.17 `motion/currents/f-003.webp` ▃
- 00:33.50 `motion/currents/f-004.webp` ▂
- 00:33.83 `motion/currents/f-005.webp` ▂
- 00:34.17 `motion/currents/f-006.webp` ▃
- 00:34.50 `motion/currents/f-007.webp` ▃
- 00:34.83 `motion/currents/f-008.webp` ▃
- 00:35.17 `motion/currents/f-009.webp` ▃
- 00:35.50 `motion/currents/f-010.webp` ▃
- 00:35.83 `motion/currents/f-011.webp` ▂
- 00:36.17 `motion/currents/f-012.webp` ▂
- 00:36.50 `motion/currents/f-013.webp` ▃
- 00:36.83 `motion/currents/f-014.webp` ▃
- 00:37.17 `motion/currents/f-015.webp` ▃
- 00:37.50 `motion/currents/f-016.webp` ▃
- 00:37.83 `motion/currents/f-017.webp` ▃
- 00:38.17 `motion/currents/f-018.webp` ▃
- 00:38.50 `motion/currents/f-019.webp` ▂
- 00:38.83 `motion/currents/f-020.webp` ▃
- 00:39.17 `motion/currents/f-021.webp` ▃
- 00:39.50 `motion/currents/f-022.webp` ▃
- 00:39.83 `motion/currents/f-023.webp` ▃
- 00:40.17 `motion/currents/f-024.webp` ▃

### 06. Piles driven by hand

01:14.50–01:19.75 (5.25 s) · 33 frames at 6 fps, 0.167 s apart · loop, push, splash, stagger

A cross-section of water and banded mud. A pile drops in from the top with a splash, and a pair of giant fingers presses it down into the mud. Each new pile goes in at the left end of the row, so the same two-second loop, repeated, builds the foundation.

Motion: `▆▃▃▅▄▄▃▃▃▁▁▁▃▃▅▄▄▃▃▃▁▁▁▁▂▃▃▅▄▄▃▃▃`

Onion skin: `motion/pile-driving/trail.webp`

- 01:14.50 `motion/pile-driving/f-001.webp` ▆
- 01:14.67 `motion/pile-driving/f-002.webp` ▃
- 01:14.83 `motion/pile-driving/f-003.webp` ▃
- 01:15.00 `motion/pile-driving/f-004.webp` ▅
- 01:15.17 `motion/pile-driving/f-005.webp` ▄
- 01:15.33 `motion/pile-driving/f-006.webp` ▄
- 01:15.50 `motion/pile-driving/f-007.webp` ▃
- 01:15.67 `motion/pile-driving/f-008.webp` ▃
- 01:15.83 `motion/pile-driving/f-009.webp` ▃
- 01:16.00 `motion/pile-driving/f-010.webp` ▁
- 01:16.17 `motion/pile-driving/f-011.webp` ▁
- 01:16.33 `motion/pile-driving/f-012.webp` ▁
- 01:16.50 `motion/pile-driving/f-013.webp` ▃
- 01:16.67 `motion/pile-driving/f-014.webp` ▃
- 01:16.83 `motion/pile-driving/f-015.webp` ▅
- 01:17.00 `motion/pile-driving/f-016.webp` ▄
- 01:17.17 `motion/pile-driving/f-017.webp` ▄
- 01:17.33 `motion/pile-driving/f-018.webp` ▃
- 01:17.50 `motion/pile-driving/f-019.webp` ▃
- 01:17.67 `motion/pile-driving/f-020.webp` ▃
- 01:17.83 `motion/pile-driving/f-021.webp` ▁
- 01:18.00 `motion/pile-driving/f-022.webp` ▁
- 01:18.17 `motion/pile-driving/f-023.webp` ▁
- 01:18.33 `motion/pile-driving/f-024.webp` ▁
- 01:18.50 `motion/pile-driving/f-025.webp` ▂
- 01:18.67 `motion/pile-driving/f-026.webp` ▃
- 01:18.83 `motion/pile-driving/f-027.webp` ▃
- 01:19.00 `motion/pile-driving/f-028.webp` ▅
- 01:19.17 `motion/pile-driving/f-029.webp` ▄
- 01:19.33 `motion/pile-driving/f-030.webp` ▄
- 01:19.50 `motion/pile-driving/f-031.webp` ▃
- 01:19.67 `motion/pile-driving/f-032.webp` ▃
- 01:19.83 `motion/pile-driving/f-033.webp` ▃

### 07. Insects shut out

01:27.25–01:33.75 (6.50 s) · 27 frames at 4 fps, 0.250 s apart · iris, flick, pop-out

A circle grows from one pile into a close-up of the wood in the mud, insects crawling around a clump of fungus. A hand flicks them away one by one, then sweeps the fungus off. The sealed wood stays clean.

Motion: `▃█▁▁▁▁▁▁▁▁▁▁▃▅▅▃▃▄▃▄▄▄▄▆▆▄▁`

- 01:27.25 `motion/insects/f-001.webp` ▃
- 01:27.50 `motion/insects/f-002.webp` █
- 01:27.75 `motion/insects/f-003.webp` ▁
- 01:28.00 `motion/insects/f-004.webp` ▁
- 01:28.25 `motion/insects/f-005.webp` ▁
- 01:28.50 `motion/insects/f-006.webp` ▁
- 01:28.75 `motion/insects/f-007.webp` ▁
- 01:29.00 `motion/insects/f-008.webp` ▁
- 01:29.25 `motion/insects/f-009.webp` ▁
- 01:29.50 `motion/insects/f-010.webp` ▁
- 01:29.75 `motion/insects/f-011.webp` ▁
- 01:30.00 `motion/insects/f-012.webp` ▁
- 01:30.25 `motion/insects/f-013.webp` ▃
- 01:30.50 `motion/insects/f-014.webp` ▅
- 01:30.75 `motion/insects/f-015.webp` ▅
- 01:31.00 `motion/insects/f-016.webp` ▃
- 01:31.25 `motion/insects/f-017.webp` ▃
- 01:31.50 `motion/insects/f-018.webp` ▄
- 01:31.75 `motion/insects/f-019.webp` ▃
- 01:32.00 `motion/insects/f-020.webp` ▄
- 01:32.25 `motion/insects/f-021.webp` ▄
- 01:32.50 `motion/insects/f-022.webp` ▄
- 01:32.75 `motion/insects/f-023.webp` ▄
- 01:33.00 `motion/insects/f-024.webp` ▆
- 01:33.25 `motion/insects/f-025.webp` ▆
- 01:33.50 `motion/insects/f-026.webp` ▄
- 01:33.75 `motion/insects/f-027.webp` ▁

### 08. Sparkle, then back out

01:37.50–01:41.75 (4.25 s) · 18 frames at 4 fps, 0.250 s apart · sparkle, twinkle, iris

Four-point stars twinkle on and off across the bare wood, each one scaling up and vanishing in a few frames. Then a small round window opens on the right showing the piles from outside, and it grows to fill the frame.

Motion: `▁▁▁▄▄▃▄▂▂▄▄▃▄▂▂▁▂▆`

Onion skin: `motion/sparkle/trail.webp`

- 01:37.50 `motion/sparkle/f-001.webp` ▁
- 01:37.75 `motion/sparkle/f-002.webp` ▁
- 01:38.00 `motion/sparkle/f-003.webp` ▁
- 01:38.25 `motion/sparkle/f-004.webp` ▄
- 01:38.50 `motion/sparkle/f-005.webp` ▄
- 01:38.75 `motion/sparkle/f-006.webp` ▃
- 01:39.00 `motion/sparkle/f-007.webp` ▄
- 01:39.25 `motion/sparkle/f-008.webp` ▂
- 01:39.50 `motion/sparkle/f-009.webp` ▂
- 01:39.75 `motion/sparkle/f-010.webp` ▄
- 01:40.00 `motion/sparkle/f-011.webp` ▄
- 01:40.25 `motion/sparkle/f-012.webp` ▃
- 01:40.50 `motion/sparkle/f-013.webp` ▄
- 01:40.75 `motion/sparkle/f-014.webp` ▂
- 01:41.00 `motion/sparkle/f-015.webp` ▂
- 01:41.25 `motion/sparkle/f-016.webp` ▁
- 01:41.50 `motion/sparkle/f-017.webp` ▂
- 01:41.75 `motion/sparkle/f-018.webp` ▆

### 09. The foundation stacks up

01:52.75–02:00.00 (7.25 s) · 23 frames at 3 fps, 0.333 s apart · drop-in, stack, tilt, push-in

A wooden platform drops onto the piles at a slight tilt and settles level. A stone block lands on top of it the same way. The view then wipes up to a white palace standing on a blue band of water.

Motion: `▁▅▁▁▁▁▅▂▁▁▁▁▁▁▁▁▁▁▁▁█▇▁`

- 01:52.75 `motion/foundation/f-001.webp` ▁
- 01:53.08 `motion/foundation/f-002.webp` ▅
- 01:53.42 `motion/foundation/f-003.webp` ▁
- 01:53.75 `motion/foundation/f-004.webp` ▁
- 01:54.08 `motion/foundation/f-005.webp` ▁
- 01:54.42 `motion/foundation/f-006.webp` ▁
- 01:54.75 `motion/foundation/f-007.webp` ▅
- 01:55.08 `motion/foundation/f-008.webp` ▂
- 01:55.42 `motion/foundation/f-009.webp` ▁
- 01:55.75 `motion/foundation/f-010.webp` ▁
- 01:56.08 `motion/foundation/f-011.webp` ▁
- 01:56.42 `motion/foundation/f-012.webp` ▁
- 01:56.75 `motion/foundation/f-013.webp` ▁
- 01:57.08 `motion/foundation/f-014.webp` ▁
- 01:57.42 `motion/foundation/f-015.webp` ▁
- 01:57.75 `motion/foundation/f-016.webp` ▁
- 01:58.08 `motion/foundation/f-017.webp` ▁
- 01:58.42 `motion/foundation/f-018.webp` ▁
- 01:58.75 `motion/foundation/f-019.webp` ▁
- 01:59.08 `motion/foundation/f-020.webp` ▁
- 01:59.42 `motion/foundation/f-021.webp` █
- 01:59.75 `motion/foundation/f-022.webp` ▇
- 02:00.08 `motion/foundation/f-023.webp` ▁

### 10. The bridges burn

02:08.00–02:16.50 (8.50 s) · 27 frames at 3 fps, 0.333 s apart · parallax, flicker, collapse

A view between pink buildings with wooden footbridges crossing the canal behind. One bridge sags, and small flames flicker along the others. The foreground buildings hold still while the bridges move.

Motion: `▂▂▁▁▁▁▁▁▁▁▁▁▂▁▂▁▁▁▁▁▁▁▁▁▁▇▃`

- 02:08.00 `motion/fires/f-001.webp` ▂
- 02:08.33 `motion/fires/f-002.webp` ▂
- 02:08.67 `motion/fires/f-003.webp` ▁
- 02:09.00 `motion/fires/f-004.webp` ▁
- 02:09.33 `motion/fires/f-005.webp` ▁
- 02:09.67 `motion/fires/f-006.webp` ▁
- 02:10.00 `motion/fires/f-007.webp` ▁
- 02:10.33 `motion/fires/f-008.webp` ▁
- 02:10.67 `motion/fires/f-009.webp` ▁
- 02:11.00 `motion/fires/f-010.webp` ▁
- 02:11.33 `motion/fires/f-011.webp` ▁
- 02:11.67 `motion/fires/f-012.webp` ▁
- 02:12.00 `motion/fires/f-013.webp` ▂
- 02:12.33 `motion/fires/f-014.webp` ▁
- 02:12.67 `motion/fires/f-015.webp` ▂
- 02:13.00 `motion/fires/f-016.webp` ▁
- 02:13.33 `motion/fires/f-017.webp` ▁
- 02:13.67 `motion/fires/f-018.webp` ▁
- 02:14.00 `motion/fires/f-019.webp` ▁
- 02:14.33 `motion/fires/f-020.webp` ▁
- 02:14.67 `motion/fires/f-021.webp` ▁
- 02:15.00 `motion/fires/f-022.webp` ▁
- 02:15.33 `motion/fires/f-023.webp` ▁
- 02:15.67 `motion/fires/f-024.webp` ▁
- 02:16.00 `motion/fires/f-025.webp` ▁
- 02:16.33 `motion/fires/f-026.webp` ▇
- 02:16.67 `motion/fires/f-027.webp` ▃

### 11. The Rialto rebuilds itself

02:16.25–02:25.00 (8.75 s) · 27 frames at 3 fps, 0.333 s apart · morph, replace, label

On lavender, a grey wooden arch appears with the label 'Rialto Bridge' typing on above it. At 2:21 it is replaced by a white stone bridge with arches, and at 2:24 by the final covered bridge. Three versions on one spot, each swap a cut.

Motion: `▇▃▁▁▁▁▂▁▁▁▁▁▁▁▅▅▁▁▁▁▁▁▁▆▄▁▁`

- 02:16.25 `motion/rialto/f-001.webp` ▇
- 02:16.58 `motion/rialto/f-002.webp` ▃
- 02:16.92 `motion/rialto/f-003.webp` ▁
- 02:17.25 `motion/rialto/f-004.webp` ▁
- 02:17.58 `motion/rialto/f-005.webp` ▁
- 02:17.92 `motion/rialto/f-006.webp` ▁
- 02:18.25 `motion/rialto/f-007.webp` ▂
- 02:18.58 `motion/rialto/f-008.webp` ▁
- 02:18.92 `motion/rialto/f-009.webp` ▁
- 02:19.25 `motion/rialto/f-010.webp` ▁
- 02:19.58 `motion/rialto/f-011.webp` ▁
- 02:19.92 `motion/rialto/f-012.webp` ▁
- 02:20.25 `motion/rialto/f-013.webp` ▁
- 02:20.58 `motion/rialto/f-014.webp` ▁
- 02:20.92 `motion/rialto/f-015.webp` ▅
- 02:21.25 `motion/rialto/f-016.webp` ▅
- 02:21.58 `motion/rialto/f-017.webp` ▁
- 02:21.92 `motion/rialto/f-018.webp` ▁
- 02:22.25 `motion/rialto/f-019.webp` ▁
- 02:22.58 `motion/rialto/f-020.webp` ▁
- 02:22.92 `motion/rialto/f-021.webp` ▁
- 02:23.25 `motion/rialto/f-022.webp` ▁
- 02:23.58 `motion/rialto/f-023.webp` ▁
- 02:23.92 `motion/rialto/f-024.webp` ▆
- 02:24.25 `motion/rialto/f-025.webp` ▄
- 02:24.58 `motion/rialto/f-026.webp` ▁
- 02:24.92 `motion/rialto/f-027.webp` ▁

### 12. Gondolas on the canals

02:27.00–02:35.00 (8.00 s) · 17 frames at 2 fps, 0.500 s apart · top-down, loop, path

A top-down map of blue canals through sand-colored land. Black gondolas glide along the channels at a steady pace on loops, each following its canal's curve.

Motion: `▄▂▂▂▂▂▁▂▁▁▂▁▁▁▁▁▁`

Onion skin: `motion/canals/trail.webp`

- 02:27.00 `motion/canals/f-001.webp` ▄
- 02:27.50 `motion/canals/f-002.webp` ▂
- 02:28.00 `motion/canals/f-003.webp` ▂
- 02:28.50 `motion/canals/f-004.webp` ▂
- 02:29.00 `motion/canals/f-005.webp` ▂
- 02:29.50 `motion/canals/f-006.webp` ▂
- 02:30.00 `motion/canals/f-007.webp` ▁
- 02:30.50 `motion/canals/f-008.webp` ▂
- 02:31.00 `motion/canals/f-009.webp` ▁
- 02:31.50 `motion/canals/f-010.webp` ▁
- 02:32.00 `motion/canals/f-011.webp` ▂
- 02:32.50 `motion/canals/f-012.webp` ▁
- 02:33.00 `motion/canals/f-013.webp` ▁
- 02:33.50 `motion/canals/f-014.webp` ▁
- 02:34.00 `motion/canals/f-015.webp` ▁
- 02:34.50 `motion/canals/f-016.webp` ▁
- 02:35.00 `motion/canals/f-017.webp` ▁

### 13. Everyone goes by boat

02:37.75–02:47.75 (10.00 s) · 21 frames at 2 fps, 0.500 s apart · slide, pick up, exit

A side view of the quay. A gondola slides in from the left, two people step aboard, and it glides off right out of frame. A small white dot then appears beside the quay and grows into the next circle.

Motion: `▆▃▃▃▄▅▄▃▃▄▄▄▄▄▄▄▄▄▃▄▇`

- 02:37.75 `motion/gondola/f-001.webp` ▆
- 02:38.25 `motion/gondola/f-002.webp` ▃
- 02:38.75 `motion/gondola/f-003.webp` ▃
- 02:39.25 `motion/gondola/f-004.webp` ▃
- 02:39.75 `motion/gondola/f-005.webp` ▄
- 02:40.25 `motion/gondola/f-006.webp` ▅
- 02:40.75 `motion/gondola/f-007.webp` ▄
- 02:41.25 `motion/gondola/f-008.webp` ▃
- 02:41.75 `motion/gondola/f-009.webp` ▃
- 02:42.25 `motion/gondola/f-010.webp` ▄
- 02:42.75 `motion/gondola/f-011.webp` ▄
- 02:43.25 `motion/gondola/f-012.webp` ▄
- 02:43.75 `motion/gondola/f-013.webp` ▄
- 02:44.25 `motion/gondola/f-014.webp` ▄
- 02:44.75 `motion/gondola/f-015.webp` ▄
- 02:45.25 `motion/gondola/f-016.webp` ▄
- 02:45.75 `motion/gondola/f-017.webp` ▄
- 02:46.25 `motion/gondola/f-018.webp` ▄
- 02:46.75 `motion/gondola/f-019.webp` ▃
- 02:47.25 `motion/gondola/f-020.webp` ▄
- 02:47.75 `motion/gondola/f-021.webp` ▇

### 14. No land to farm

02:48.00–02:53.75 (5.75 s) · 24 frames at 4 fps, 0.250 s apart · pinch, drop, fall

Giant fingers rise into an empty cream frame holding one seed, then let go. The seed falls through the frame and lands on the floor of a colonnade whose arch looks out to sea.

Motion: `▅▄▂▁▁▁▁▁▁▁▁▁▁▁▁▃▅▅▄▃▂▆▃▃`

- 02:48.00 `motion/seed/f-001.webp` ▅
- 02:48.25 `motion/seed/f-002.webp` ▄
- 02:48.50 `motion/seed/f-003.webp` ▂
- 02:48.75 `motion/seed/f-004.webp` ▁
- 02:49.00 `motion/seed/f-005.webp` ▁
- 02:49.25 `motion/seed/f-006.webp` ▁
- 02:49.50 `motion/seed/f-007.webp` ▁
- 02:49.75 `motion/seed/f-008.webp` ▁
- 02:50.00 `motion/seed/f-009.webp` ▁
- 02:50.25 `motion/seed/f-010.webp` ▁
- 02:50.50 `motion/seed/f-011.webp` ▁
- 02:50.75 `motion/seed/f-012.webp` ▁
- 02:51.00 `motion/seed/f-013.webp` ▁
- 02:51.25 `motion/seed/f-014.webp` ▁
- 02:51.50 `motion/seed/f-015.webp` ▁
- 02:51.75 `motion/seed/f-016.webp` ▃
- 02:52.00 `motion/seed/f-017.webp` ▅
- 02:52.25 `motion/seed/f-018.webp` ▅
- 02:52.50 `motion/seed/f-019.webp` ▄
- 02:52.75 `motion/seed/f-020.webp` ▃
- 02:53.00 `motion/seed/f-021.webp` ▂
- 02:53.25 `motion/seed/f-022.webp` ▆
- 02:53.50 `motion/seed/f-023.webp` ▃
- 02:53.75 `motion/seed/f-024.webp` ▃

### 15. Routes, then the city plan

02:56.75–03:06.00 (9.25 s) · 19 frames at 2 fps, 0.500 s apart · pop-in, draw-on, card swap

An oval map of the Mediterranean pops onto lavender, sea routes drawn as thin lines from Venice. At 3:05 the card slides down out of frame and a map of the city's canals rises in its place.

Motion: `▇█▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▇█`

- 02:56.75 `motion/trade-map/f-001.webp` ▇
- 02:57.25 `motion/trade-map/f-002.webp` █
- 02:57.75 `motion/trade-map/f-003.webp` ▁
- 02:58.25 `motion/trade-map/f-004.webp` ▁
- 02:58.75 `motion/trade-map/f-005.webp` ▁
- 02:59.25 `motion/trade-map/f-006.webp` ▁
- 02:59.75 `motion/trade-map/f-007.webp` ▁
- 03:00.25 `motion/trade-map/f-008.webp` ▁
- 03:00.75 `motion/trade-map/f-009.webp` ▁
- 03:01.25 `motion/trade-map/f-010.webp` ▁
- 03:01.75 `motion/trade-map/f-011.webp` ▁
- 03:02.25 `motion/trade-map/f-012.webp` ▁
- 03:02.75 `motion/trade-map/f-013.webp` ▁
- 03:03.25 `motion/trade-map/f-014.webp` ▁
- 03:03.75 `motion/trade-map/f-015.webp` ▁
- 03:04.25 `motion/trade-map/f-016.webp` ▁
- 03:04.75 `motion/trade-map/f-017.webp` ▁
- 03:05.25 `motion/trade-map/f-018.webp` ▇
- 03:05.75 `motion/trade-map/f-019.webp` █

### 16. The treaty writes itself

03:27.75–03:36.50 (8.75 s) · 19 frames at 2 fps, 0.500 s apart · rise-up, write-on, title

A cream document with a scalloped border rises up from the bottom edge. Lines of text draw on one at a time from the top down, and at 3:36 'The Fourth Crusade Agreement' sets as its title.

Motion: `▅▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▂▁`

- 03:27.75 `motion/treaty/f-001.webp` ▅
- 03:28.25 `motion/treaty/f-002.webp` ▃
- 03:28.75 `motion/treaty/f-003.webp` ▁
- 03:29.25 `motion/treaty/f-004.webp` ▁
- 03:29.75 `motion/treaty/f-005.webp` ▁
- 03:30.25 `motion/treaty/f-006.webp` ▁
- 03:30.75 `motion/treaty/f-007.webp` ▁
- 03:31.25 `motion/treaty/f-008.webp` ▁
- 03:31.75 `motion/treaty/f-009.webp` ▁
- 03:32.25 `motion/treaty/f-010.webp` ▁
- 03:32.75 `motion/treaty/f-011.webp` ▁
- 03:33.25 `motion/treaty/f-012.webp` ▁
- 03:33.75 `motion/treaty/f-013.webp` ▁
- 03:34.25 `motion/treaty/f-014.webp` ▁
- 03:34.75 `motion/treaty/f-015.webp` ▁
- 03:35.25 `motion/treaty/f-016.webp` ▁
- 03:35.75 `motion/treaty/f-017.webp` ▂
- 03:36.25 `motion/treaty/f-018.webp` ▂
- 03:36.75 `motion/treaty/f-019.webp` ▁

### 17. Handshake, then the fleet

03:41.00–03:49.00 (8.00 s) · 25 frames at 3 fps, 0.333 s apart · slide-up, shake, iris, slide-in

A coral panel slides up with two hands clasping, rings on the fingers. A circle opens from the clasp into the Basilica di San Marco, and a fleet of galleys slides in across the water beneath it.

Motion: `▇▆▅▅▅▅▅▅▅▅▄▅▄▅▄▅▁▅▅▅▅▅▇▅▄`

- 03:41.00 `motion/handshake/f-001.webp` ▇
- 03:41.33 `motion/handshake/f-002.webp` ▆
- 03:41.67 `motion/handshake/f-003.webp` ▅
- 03:42.00 `motion/handshake/f-004.webp` ▅
- 03:42.33 `motion/handshake/f-005.webp` ▅
- 03:42.67 `motion/handshake/f-006.webp` ▅
- 03:43.00 `motion/handshake/f-007.webp` ▅
- 03:43.33 `motion/handshake/f-008.webp` ▅
- 03:43.67 `motion/handshake/f-009.webp` ▅
- 03:44.00 `motion/handshake/f-010.webp` ▅
- 03:44.33 `motion/handshake/f-011.webp` ▄
- 03:44.67 `motion/handshake/f-012.webp` ▅
- 03:45.00 `motion/handshake/f-013.webp` ▄
- 03:45.33 `motion/handshake/f-014.webp` ▅
- 03:45.67 `motion/handshake/f-015.webp` ▄
- 03:46.00 `motion/handshake/f-016.webp` ▅
- 03:46.33 `motion/handshake/f-017.webp` ▁
- 03:46.67 `motion/handshake/f-018.webp` ▅
- 03:47.00 `motion/handshake/f-019.webp` ▅
- 03:47.33 `motion/handshake/f-020.webp` ▅
- 03:47.67 `motion/handshake/f-021.webp` ▅
- 03:48.00 `motion/handshake/f-022.webp` ▅
- 03:48.33 `motion/handshake/f-023.webp` ▇
- 03:48.67 `motion/handshake/f-024.webp` ▅
- 03:49.00 `motion/handshake/f-025.webp` ▄

### 18. A coin, then the route

03:53.75–04:01.00 (7.25 s) · 30 frames at 4 fps, 0.250 s apart · pop, shrink, iris, draw-on

A hand rises holding a large gold coin, which shrinks to its final size. A dark dot then grows from the hand to fill the frame, and the map behind it has a red route drawing itself from Venice down around Greece toward Constantinople.

Motion: `▁▇▁▃▃▁▁▁▁▁▁▁▁▁▁▅███▁▁▁▁▁▁▁▁▁▁▂`

- 03:53.75 `motion/coin/f-001.webp` ▁
- 03:54.00 `motion/coin/f-002.webp` ▇
- 03:54.25 `motion/coin/f-003.webp` ▁
- 03:54.50 `motion/coin/f-004.webp` ▃
- 03:54.75 `motion/coin/f-005.webp` ▃
- 03:55.00 `motion/coin/f-006.webp` ▁
- 03:55.25 `motion/coin/f-007.webp` ▁
- 03:55.50 `motion/coin/f-008.webp` ▁
- 03:55.75 `motion/coin/f-009.webp` ▁
- 03:56.00 `motion/coin/f-010.webp` ▁
- 03:56.25 `motion/coin/f-011.webp` ▁
- 03:56.50 `motion/coin/f-012.webp` ▁
- 03:56.75 `motion/coin/f-013.webp` ▁
- 03:57.00 `motion/coin/f-014.webp` ▁
- 03:57.25 `motion/coin/f-015.webp` ▁
- 03:57.50 `motion/coin/f-016.webp` ▅
- 03:57.75 `motion/coin/f-017.webp` █
- 03:58.00 `motion/coin/f-018.webp` █
- 03:58.25 `motion/coin/f-019.webp` █
- 03:58.50 `motion/coin/f-020.webp` ▁
- 03:58.75 `motion/coin/f-021.webp` ▁
- 03:59.00 `motion/coin/f-022.webp` ▁
- 03:59.25 `motion/coin/f-023.webp` ▁
- 03:59.50 `motion/coin/f-024.webp` ▁
- 03:59.75 `motion/coin/f-025.webp` ▁
- 04:00.00 `motion/coin/f-026.webp` ▁
- 04:00.25 `motion/coin/f-027.webp` ▁
- 04:00.50 `motion/coin/f-028.webp` ▁
- 04:00.75 `motion/coin/f-029.webp` ▁
- 04:01.00 `motion/coin/f-030.webp` ▂

### 19. The route arrives

04:00.50–04:04.50 (4.00 s) · 17 frames at 4 fps, 0.250 s apart · draw-on, arrowhead, ease-out

The red line keeps drawing, slows as it curls up through the Aegean, and lands at Constantinople as an arrowhead.

Motion: `▁▁▂▂▂▂▁▁▁▂▁▁▁▁▁▁▁`

Onion skin: `motion/route/trail.webp`

- 04:00.50 `motion/route/f-001.webp` ▁
- 04:00.75 `motion/route/f-002.webp` ▁
- 04:01.00 `motion/route/f-003.webp` ▂
- 04:01.25 `motion/route/f-004.webp` ▂
- 04:01.50 `motion/route/f-005.webp` ▂
- 04:01.75 `motion/route/f-006.webp` ▂
- 04:02.00 `motion/route/f-007.webp` ▁
- 04:02.25 `motion/route/f-008.webp` ▁
- 04:02.50 `motion/route/f-009.webp` ▁
- 04:02.75 `motion/route/f-010.webp` ▂
- 04:03.00 `motion/route/f-011.webp` ▁
- 04:03.25 `motion/route/f-012.webp` ▁
- 04:03.50 `motion/route/f-013.webp` ▁
- 04:03.75 `motion/route/f-014.webp` ▁
- 04:04.00 `motion/route/f-015.webp` ▁
- 04:04.25 `motion/route/f-016.webp` ▁
- 04:04.50 `motion/route/f-017.webp` ▁

### 20. Sail out, then the Silk Road

04:12.00–04:20.50 (8.50 s) · 18 frames at 2 fps, 0.500 s apart · slide out, pan, draw-on

A merchant ship bobs in profile, then slides out of frame right. The sea wipes down to a map of Asia and a thin white route traces east toward Yuan China.

Motion: `▇▄▄▅▆▆▆█▁▁▁▁▁▁▁▁▂█`

- 04:12.00 `motion/sail/f-001.webp` ▇
- 04:12.50 `motion/sail/f-002.webp` ▄
- 04:13.00 `motion/sail/f-003.webp` ▄
- 04:13.50 `motion/sail/f-004.webp` ▅
- 04:14.00 `motion/sail/f-005.webp` ▆
- 04:14.50 `motion/sail/f-006.webp` ▆
- 04:15.00 `motion/sail/f-007.webp` ▆
- 04:15.50 `motion/sail/f-008.webp` █
- 04:16.00 `motion/sail/f-009.webp` ▁
- 04:16.50 `motion/sail/f-010.webp` ▁
- 04:17.00 `motion/sail/f-011.webp` ▁
- 04:17.50 `motion/sail/f-012.webp` ▁
- 04:18.00 `motion/sail/f-013.webp` ▁
- 04:18.50 `motion/sail/f-014.webp` ▁
- 04:19.00 `motion/sail/f-015.webp` ▁
- 04:19.50 `motion/sail/f-016.webp` ▁
- 04:20.00 `motion/sail/f-017.webp` ▂
- 04:20.50 `motion/sail/f-018.webp` █

### 21. A colonnade of crafts

04:20.50–04:26.75 (6.25 s) · 26 frames at 4 fps, 0.250 s apart · iris, pop-in, stagger

A white dot on the route grows into a cream circle. A colonnade fades up inside, and icons pop into its arches one after another: a palette, then a book and quill.

Motion: `█▇▆▄▁▁▁▁▁▁▁▁▁▄▃▁▁▁▄▂▁▁▁▁▅█`

- 04:20.50 `motion/gallery/f-001.webp` █
- 04:20.75 `motion/gallery/f-002.webp` ▇
- 04:21.00 `motion/gallery/f-003.webp` ▆
- 04:21.25 `motion/gallery/f-004.webp` ▄
- 04:21.50 `motion/gallery/f-005.webp` ▁
- 04:21.75 `motion/gallery/f-006.webp` ▁
- 04:22.00 `motion/gallery/f-007.webp` ▁
- 04:22.25 `motion/gallery/f-008.webp` ▁
- 04:22.50 `motion/gallery/f-009.webp` ▁
- 04:22.75 `motion/gallery/f-010.webp` ▁
- 04:23.00 `motion/gallery/f-011.webp` ▁
- 04:23.25 `motion/gallery/f-012.webp` ▁
- 04:23.50 `motion/gallery/f-013.webp` ▁
- 04:23.75 `motion/gallery/f-014.webp` ▄
- 04:24.00 `motion/gallery/f-015.webp` ▃
- 04:24.25 `motion/gallery/f-016.webp` ▁
- 04:24.50 `motion/gallery/f-017.webp` ▁
- 04:24.75 `motion/gallery/f-018.webp` ▁
- 04:25.00 `motion/gallery/f-019.webp` ▄
- 04:25.25 `motion/gallery/f-020.webp` ▂
- 04:25.50 `motion/gallery/f-021.webp` ▁
- 04:25.75 `motion/gallery/f-022.webp` ▁
- 04:26.00 `motion/gallery/f-023.webp` ▁
- 04:26.25 `motion/gallery/f-024.webp` ▁
- 04:26.50 `motion/gallery/f-025.webp` ▅
- 04:26.75 `motion/gallery/f-026.webp` █

### 22. Panels tile across

04:26.75–04:45.00 (18.25 s) · 37 frames at 2 fps, 0.500 s apart · slide, grid, stack

Panels slide in from the right on lavender: a loom, a printing press, then glassware. The row keeps scrolling left on a loop, the three crafts repeating like a conveyor belt, until the panels slide away and 'ART', 'SILK' and 'SPICES' type on in a column.

Motion: `▇▅▁▁▁▁▁▁▁▁▅▅▁▁▁▁▁▁▁▅▁▁▁▁▁▁▁▁▁▁▁▁▆▆▁▁▃`

- 04:26.75 `motion/tiles/f-001.webp` ▇
- 04:27.25 `motion/tiles/f-002.webp` ▅
- 04:27.75 `motion/tiles/f-003.webp` ▁
- 04:28.25 `motion/tiles/f-004.webp` ▁
- 04:28.75 `motion/tiles/f-005.webp` ▁
- 04:29.25 `motion/tiles/f-006.webp` ▁
- 04:29.75 `motion/tiles/f-007.webp` ▁
- 04:30.25 `motion/tiles/f-008.webp` ▁
- 04:30.75 `motion/tiles/f-009.webp` ▁
- 04:31.25 `motion/tiles/f-010.webp` ▁
- 04:31.75 `motion/tiles/f-011.webp` ▅
- 04:32.25 `motion/tiles/f-012.webp` ▅
- 04:32.75 `motion/tiles/f-013.webp` ▁
- 04:33.25 `motion/tiles/f-014.webp` ▁
- 04:33.75 `motion/tiles/f-015.webp` ▁
- 04:34.25 `motion/tiles/f-016.webp` ▁
- 04:34.75 `motion/tiles/f-017.webp` ▁
- 04:35.25 `motion/tiles/f-018.webp` ▁
- 04:35.75 `motion/tiles/f-019.webp` ▁
- 04:36.25 `motion/tiles/f-020.webp` ▅
- 04:36.75 `motion/tiles/f-021.webp` ▁
- 04:37.25 `motion/tiles/f-022.webp` ▁
- 04:37.75 `motion/tiles/f-023.webp` ▁
- 04:38.25 `motion/tiles/f-024.webp` ▁
- 04:38.75 `motion/tiles/f-025.webp` ▁
- 04:39.25 `motion/tiles/f-026.webp` ▁
- 04:39.75 `motion/tiles/f-027.webp` ▁
- 04:40.25 `motion/tiles/f-028.webp` ▁
- 04:40.75 `motion/tiles/f-029.webp` ▁
- 04:41.25 `motion/tiles/f-030.webp` ▁
- 04:41.75 `motion/tiles/f-031.webp` ▁
- 04:42.25 `motion/tiles/f-032.webp` ▁
- 04:42.75 `motion/tiles/f-033.webp` ▆
- 04:43.25 `motion/tiles/f-034.webp` ▆
- 04:43.75 `motion/tiles/f-035.webp` ▁
- 04:44.25 `motion/tiles/f-036.webp` ▁
- 04:44.75 `motion/tiles/f-037.webp` ▃

### 23. Words replaced by people

04:48.75–04:56.00 (7.25 s) · 30 frames at 4 fps, 0.250 s apart · replace, stagger, grid, wipe up

Figures pop in one at a time across the top row, pushing 'ART' out. The next row replaces 'SILK', the next 'SPICES', until the frame is a grid of people. The grid then wipes up to the Grand Canal, where a gondola slides in.

Motion: `▂▃▄▃▄▃▃▂▃▄▃▄▃▃▁▁▄▄▃▄▃▃▁▁▁▁██▆▂`

- 04:48.75 `motion/people-grid/f-001.webp` ▂
- 04:49.00 `motion/people-grid/f-002.webp` ▃
- 04:49.25 `motion/people-grid/f-003.webp` ▄
- 04:49.50 `motion/people-grid/f-004.webp` ▃
- 04:49.75 `motion/people-grid/f-005.webp` ▄
- 04:50.00 `motion/people-grid/f-006.webp` ▃
- 04:50.25 `motion/people-grid/f-007.webp` ▃
- 04:50.50 `motion/people-grid/f-008.webp` ▂
- 04:50.75 `motion/people-grid/f-009.webp` ▃
- 04:51.00 `motion/people-grid/f-010.webp` ▄
- 04:51.25 `motion/people-grid/f-011.webp` ▃
- 04:51.50 `motion/people-grid/f-012.webp` ▄
- 04:51.75 `motion/people-grid/f-013.webp` ▃
- 04:52.00 `motion/people-grid/f-014.webp` ▃
- 04:52.25 `motion/people-grid/f-015.webp` ▁
- 04:52.50 `motion/people-grid/f-016.webp` ▁
- 04:52.75 `motion/people-grid/f-017.webp` ▄
- 04:53.00 `motion/people-grid/f-018.webp` ▄
- 04:53.25 `motion/people-grid/f-019.webp` ▃
- 04:53.50 `motion/people-grid/f-020.webp` ▄
- 04:53.75 `motion/people-grid/f-021.webp` ▃
- 04:54.00 `motion/people-grid/f-022.webp` ▃
- 04:54.25 `motion/people-grid/f-023.webp` ▁
- 04:54.50 `motion/people-grid/f-024.webp` ▁
- 04:54.75 `motion/people-grid/f-025.webp` ▁
- 04:55.00 `motion/people-grid/f-026.webp` ▁
- 04:55.25 `motion/people-grid/f-027.webp` █
- 04:55.50 `motion/people-grid/f-028.webp` █
- 04:55.75 `motion/people-grid/f-029.webp` ▆
- 04:56.00 `motion/people-grid/f-030.webp` ▂

### 24. A guidebook flips through history

05:01.50–05:13.00 (11.50 s) · 24 frames at 2 fps, 0.500 s apart · iris, pop, page flip

A coral circle grows from a lit window into a 'Venice' guidebook. Its cover flips open to an Ottoman army before the Hagia Sophia, then flips again to a fleet of ships, which grows to fill the frame as the ships sail on.

Motion: `▇▆▁▁▁▁▁▁▆▆▁▁▁▁▁▁▁▁▁▇▁▁▇▄`

- 05:01.50 `motion/book-flip/f-001.webp` ▇
- 05:02.00 `motion/book-flip/f-002.webp` ▆
- 05:02.50 `motion/book-flip/f-003.webp` ▁
- 05:03.00 `motion/book-flip/f-004.webp` ▁
- 05:03.50 `motion/book-flip/f-005.webp` ▁
- 05:04.00 `motion/book-flip/f-006.webp` ▁
- 05:04.50 `motion/book-flip/f-007.webp` ▁
- 05:05.00 `motion/book-flip/f-008.webp` ▁
- 05:05.50 `motion/book-flip/f-009.webp` ▆
- 05:06.00 `motion/book-flip/f-010.webp` ▆
- 05:06.50 `motion/book-flip/f-011.webp` ▁
- 05:07.00 `motion/book-flip/f-012.webp` ▁
- 05:07.50 `motion/book-flip/f-013.webp` ▁
- 05:08.00 `motion/book-flip/f-014.webp` ▁
- 05:08.50 `motion/book-flip/f-015.webp` ▁
- 05:09.00 `motion/book-flip/f-016.webp` ▁
- 05:09.50 `motion/book-flip/f-017.webp` ▁
- 05:10.00 `motion/book-flip/f-018.webp` ▁
- 05:10.50 `motion/book-flip/f-019.webp` ▁
- 05:11.00 `motion/book-flip/f-020.webp` ▇
- 05:11.50 `motion/book-flip/f-021.webp` ▁
- 05:12.00 `motion/book-flip/f-022.webp` ▁
- 05:12.50 `motion/book-flip/f-023.webp` ▇
- 05:13.00 `motion/book-flip/f-024.webp` ▄

### 25. Flags change over the city

05:18.00–05:41.75 (23.75 s) · 25 frames at 1 fps, 1.000 s apart · shrink, flag swap, slow color shift

A coral circle clears the fleet and the Venetian flag grows from a speck. A hand reaches in and takes it, and a circle from the flag opens on Venice by the sea. The flag on the spire swaps from French to Austrian to French to Austrian to Italian, each change a quick flicker, while red shapes fade in across the façade.

Motion: `▇▁▃▃▁▇▃▁▃▃▃▃▃▃▃▃▃▃▃▄▂▁▁▆▁`

- 05:18.00 `motion/flags/f-001.webp` ▇
- 05:19.00 `motion/flags/f-002.webp` ▁
- 05:20.00 `motion/flags/f-003.webp` ▃
- 05:21.00 `motion/flags/f-004.webp` ▃
- 05:22.00 `motion/flags/f-005.webp` ▁
- 05:23.00 `motion/flags/f-006.webp` ▇
- 05:24.00 `motion/flags/f-007.webp` ▃
- 05:25.00 `motion/flags/f-008.webp` ▁
- 05:26.00 `motion/flags/f-009.webp` ▃
- 05:27.00 `motion/flags/f-010.webp` ▃
- 05:28.00 `motion/flags/f-011.webp` ▃
- 05:29.00 `motion/flags/f-012.webp` ▃
- 05:30.00 `motion/flags/f-013.webp` ▃
- 05:31.00 `motion/flags/f-014.webp` ▃
- 05:32.00 `motion/flags/f-015.webp` ▃
- 05:33.00 `motion/flags/f-016.webp` ▃
- 05:34.00 `motion/flags/f-017.webp` ▃
- 05:35.00 `motion/flags/f-018.webp` ▃
- 05:36.00 `motion/flags/f-019.webp` ▃
- 05:37.00 `motion/flags/f-020.webp` ▄
- 05:38.00 `motion/flags/f-021.webp` ▂
- 05:39.00 `motion/flags/f-022.webp` ▁
- 05:40.00 `motion/flags/f-023.webp` ▁
- 05:41.00 `motion/flags/f-024.webp` ▆
- 05:42.00 `motion/flags/f-025.webp` ▁

### 26. Venice becomes a souvenir

05:41.50–05:49.00 (7.50 s) · 23 frames at 3 fps, 0.333 s apart · iris, slide-in, iris

A lavender circle grows from the spire into an open hand. A postcard slides in from the left and settles in the palm. A hole opens in the card and grows into the lagoon, a souvenir-shop picture of the city.

Motion: `▇▃▁▁▁▁▁▁▁▄▂▁▁▁▁▁▁▁▁▁▁▇▅`

- 05:41.50 `motion/souvenir/f-001.webp` ▇
- 05:41.83 `motion/souvenir/f-002.webp` ▃
- 05:42.17 `motion/souvenir/f-003.webp` ▁
- 05:42.50 `motion/souvenir/f-004.webp` ▁
- 05:42.83 `motion/souvenir/f-005.webp` ▁
- 05:43.17 `motion/souvenir/f-006.webp` ▁
- 05:43.50 `motion/souvenir/f-007.webp` ▁
- 05:43.83 `motion/souvenir/f-008.webp` ▁
- 05:44.17 `motion/souvenir/f-009.webp` ▁
- 05:44.50 `motion/souvenir/f-010.webp` ▄
- 05:44.83 `motion/souvenir/f-011.webp` ▂
- 05:45.17 `motion/souvenir/f-012.webp` ▁
- 05:45.50 `motion/souvenir/f-013.webp` ▁
- 05:45.83 `motion/souvenir/f-014.webp` ▁
- 05:46.17 `motion/souvenir/f-015.webp` ▁
- 05:46.50 `motion/souvenir/f-016.webp` ▁
- 05:46.83 `motion/souvenir/f-017.webp` ▁
- 05:47.17 `motion/souvenir/f-018.webp` ▁
- 05:47.50 `motion/souvenir/f-019.webp` ▁
- 05:47.83 `motion/souvenir/f-020.webp` ▁
- 05:48.17 `motion/souvenir/f-021.webp` ▁
- 05:48.50 `motion/souvenir/f-022.webp` ▇
- 05:48.83 `motion/souvenir/f-023.webp` ▅

### 27. The water rises and falls

05:56.00–06:08.50 (12.50 s) · 26 frames at 2 fps, 0.500 s apart · rise, fall, loop, tide

San Marco on coral, the blue band of water at its base. The water rises up the façade and falls away again, over and over, a little higher each time: 250 floods a year as a tide.

Motion: `▁▁▁▁▃▄▄▃▁▁▁▄▃▄▃▁▄▃▄▃▄▃▄▄▃▇`

- 05:56.00 `motion/flood/f-001.webp` ▁
- 05:56.50 `motion/flood/f-002.webp` ▁
- 05:57.00 `motion/flood/f-003.webp` ▁
- 05:57.50 `motion/flood/f-004.webp` ▁
- 05:58.00 `motion/flood/f-005.webp` ▃
- 05:58.50 `motion/flood/f-006.webp` ▄
- 05:59.00 `motion/flood/f-007.webp` ▄
- 05:59.50 `motion/flood/f-008.webp` ▃
- 06:00.00 `motion/flood/f-009.webp` ▁
- 06:00.50 `motion/flood/f-010.webp` ▁
- 06:01.00 `motion/flood/f-011.webp` ▁
- 06:01.50 `motion/flood/f-012.webp` ▄
- 06:02.00 `motion/flood/f-013.webp` ▃
- 06:02.50 `motion/flood/f-014.webp` ▄
- 06:03.00 `motion/flood/f-015.webp` ▃
- 06:03.50 `motion/flood/f-016.webp` ▁
- 06:04.00 `motion/flood/f-017.webp` ▄
- 06:04.50 `motion/flood/f-018.webp` ▃
- 06:05.00 `motion/flood/f-019.webp` ▄
- 06:05.50 `motion/flood/f-020.webp` ▃
- 06:06.00 `motion/flood/f-021.webp` ▄
- 06:06.50 `motion/flood/f-022.webp` ▃
- 06:07.00 `motion/flood/f-023.webp` ▄
- 06:07.50 `motion/flood/f-024.webp` ▄
- 06:08.00 `motion/flood/f-025.webp` ▃
- 06:08.50 `motion/flood/f-026.webp` ▇

### 28. One boat becomes traffic

06:08.75–06:13.00 (4.25 s) · 18 frames at 4 fps, 0.250 s apart · iris, slide-in, multiply, loop

A blue circle from the church door opens on a single motorboat sliding in from the left, seen from above. At 6:12.75 the frame cuts to dozens of boats in lanes, all moving at once.

Motion: `▇▆▆▆▃▃▃▃▃▃▃▃▃▃▃▅▇▆`

- 06:08.75 `motion/traffic/f-001.webp` ▇
- 06:09.00 `motion/traffic/f-002.webp` ▆
- 06:09.25 `motion/traffic/f-003.webp` ▆
- 06:09.50 `motion/traffic/f-004.webp` ▆
- 06:09.75 `motion/traffic/f-005.webp` ▃
- 06:10.00 `motion/traffic/f-006.webp` ▃
- 06:10.25 `motion/traffic/f-007.webp` ▃
- 06:10.50 `motion/traffic/f-008.webp` ▃
- 06:10.75 `motion/traffic/f-009.webp` ▃
- 06:11.00 `motion/traffic/f-010.webp` ▃
- 06:11.25 `motion/traffic/f-011.webp` ▃
- 06:11.50 `motion/traffic/f-012.webp` ▃
- 06:11.75 `motion/traffic/f-013.webp` ▃
- 06:12.00 `motion/traffic/f-014.webp` ▃
- 06:12.25 `motion/traffic/f-015.webp` ▃
- 06:12.50 `motion/traffic/f-016.webp` ▅
- 06:12.75 `motion/traffic/f-017.webp` ▇
- 06:13.00 `motion/traffic/f-018.webp` ▆

### 29. Tourists fill the view

06:21.00–06:24.00 (3.00 s) · 13 frames at 4 fps, 0.250 s apart · slide-in, stagger, foreground

A loggia looking out to the church. Two tourists slide in from the right one after the other, their backs filling the foreground and blocking the view.

Motion: `▃█▄▅▅▅▅▅▄▁▁▁▁`

- 06:21.00 `motion/balcony/f-001.webp` ▃
- 06:21.25 `motion/balcony/f-002.webp` █
- 06:21.50 `motion/balcony/f-003.webp` ▄
- 06:21.75 `motion/balcony/f-004.webp` ▅
- 06:22.00 `motion/balcony/f-005.webp` ▅
- 06:22.25 `motion/balcony/f-006.webp` ▅
- 06:22.50 `motion/balcony/f-007.webp` ▅
- 06:22.75 `motion/balcony/f-008.webp` ▅
- 06:23.00 `motion/balcony/f-009.webp` ▄
- 06:23.25 `motion/balcony/f-010.webp` ▁
- 06:23.50 `motion/balcony/f-011.webp` ▁
- 06:23.75 `motion/balcony/f-012.webp` ▁
- 06:24.00 `motion/balcony/f-013.webp` ▁

### 30. A scroll unrolls into the end card

06:30.50–06:32.00 (1.50 s) · 13 frames at 8 fps, 0.125 s apart · unroll, pop-in

A white sheet's rolled edge unrolls left to right, and the red map of castles pops on behind it in under half a second. It is the TED-Ed end card shared with other lessons.

Motion: `▁▁█▇▆▇▅▅▅▆▅▅▃`

- 06:30.50 `motion/scroll/f-001.webp` ▁
- 06:30.62 `motion/scroll/f-002.webp` ▁
- 06:30.75 `motion/scroll/f-003.webp` █
- 06:30.88 `motion/scroll/f-004.webp` ▇
- 06:31.00 `motion/scroll/f-005.webp` ▆
- 06:31.12 `motion/scroll/f-006.webp` ▇
- 06:31.25 `motion/scroll/f-007.webp` ▅
- 06:31.38 `motion/scroll/f-008.webp` ▅
- 06:31.50 `motion/scroll/f-009.webp` ▅
- 06:31.62 `motion/scroll/f-010.webp` ▆
- 06:31.75 `motion/scroll/f-011.webp` ▅
- 06:31.88 `motion/scroll/f-012.webp` ▅
- 06:32.00 `motion/scroll/f-013.webp` ▃

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:02.00 `seconds/second-00003.webp` A quote card in thin grey type: Erica Jong's 'It is two cities: one above and seemingly solid; one below and reflected in the waters.'
- 00:07.00 `seconds/second-00008.webp` A storybook opens on lavender, a walled city printed across its pages. The history is framed as a book being read.
- 00:14.00 `seconds/second-00015.webp` Raiders and flames across the plan, all icons with no outlines.
- 00:17.00 `seconds/second-00018.webp` The sea as stacked bands of blue under a gradient sky, the film's water everywhere.
- 00:20.00 `seconds/second-00021.webp` Pink horsemen in the foreground, boats behind. Shapes are geometric and flat, with no line work at all.
- 00:23.00 `seconds/second-00024.webp` Top-down: boats among sand-colored islands on one flat blue.
- 00:30.00 `seconds/second-00031.webp` A map of the lagoon with yellow arrows for the rivers, labelled Po and Piave.
- 00:38.00 `seconds/second-00039.webp` The islands shift and split between the arrows: the lagoon refuses to stay put.
- 00:42.00 `seconds/second-00043.webp` A figure peeks out from behind a leaf in a cream square: the lagoon as the perfect place to hide.
- 00:47.00 `seconds/second-00048.webp` Wooden blocks hover over the sea in isometric, about to be stacked.
- 00:52.00 `seconds/second-00053.webp` A giant hand assembles a house from the blocks. Scale is used for emphasis, not realism.
- 00:59.00 `seconds/second-00060.webp` Fishermen's stilted huts in a row on the water bands.
- 01:03.00 `seconds/second-00064.webp` A huge yellow boot steps onto the mud, the newcomers arriving. Scale jumps are the film's emphasis.
- 01:10.00 `seconds/second-00071.webp` A white palace on a blue base under a gradient sky, Venice as one composed object.
- 01:16.00 `seconds/second-00077.webp` Cross-section: a pile pressed into banded mud by a giant pair of fingers.
- 01:19.00 `seconds/second-00080.webp` The row of piles, each one driven by the same loop.
- 01:29.00 `seconds/second-00090.webp` Close on the sealed wood with insects and fungus that can't get in.
- 01:39.00 `seconds/second-00100.webp` Sparkles across the clean wood, the oxygen-free seal.
- 01:57.00 `seconds/second-00118.webp` Platform and stone stacked on the piles: the whole foundation in one cross-section.
- 02:04.00 `seconds/second-00125.webp` The palace again, now with a flag on top: the Republic declared.
- 02:10.00 `seconds/second-00131.webp` Wooden footbridges between pink buildings, the foreground framing the canal.
- 02:14.00 `seconds/second-00135.webp` Small flames along the bridges.
- 02:18.00 `seconds/second-00139.webp` The Rialto's first version, a grey wooden arch, labelled on lavender.
- 02:22.00 `seconds/second-00143.webp` The second version in white stone on the same spot.
- 02:25.00 `seconds/second-00146.webp` The final covered Rialto, the third design on the same spot.
- 02:30.00 `seconds/second-00151.webp` Top-down canals with gondolas in motion, a map that moves.
- 02:42.00 `seconds/second-00163.webp` Everyone travels by gondola, nobles and commoners in the same boat.
- 02:51.00 `seconds/second-00172.webp` A seed dropped from a giant hand: no land to farm.
- 03:00.00 `seconds/second-00181.webp` The Mediterranean on an oval card, sea routes radiating from Venice.
- 03:10.00 `seconds/second-00191.webp` The city's canal plan on the same oval card.
- 03:20.00 `seconds/second-00201.webp` The Rialto with ships passing beneath, on the oval.
- 03:37.00 `seconds/second-00218.webp` The Fourth Crusade Agreement on a cream document with a scalloped border.
- 03:43.00 `seconds/second-00224.webp` Two hands clasp on coral: the deal with Dandolo.
- 03:50.00 `seconds/second-00231.webp` San Marco above a fleet of galleys.
- 03:56.00 `seconds/second-00237.webp` A hand holding up a gold coin, the payment that fell short.
- 04:05.00 `seconds/second-00246.webp` The red route from Venice curling through the Aegean to Constantinople.
- 04:10.00 `seconds/second-00251.webp` The Venetian flag, the lion of Saint Mark, flying.
- 04:13.00 `seconds/second-00254.webp` A merchant ship in profile, bobbing on the bands.
- 04:18.00 `seconds/second-00259.webp` The Silk Road traced across Asia to Yuan China.
- 04:25.00 `seconds/second-00266.webp` A colonnade with a palette and a book in its arches, the Renaissance.
- 04:40.00 `seconds/second-00281.webp` Loom, printing press and glassware panels in a scrolling row.
- 04:47.00 `seconds/second-00288.webp` 'ART', 'SILK', 'SPICES' in a column on lavender.
- 04:52.00 `seconds/second-00293.webp` The words replaced by rows of people: the enslaved trade said by substitution.
- 04:58.00 `seconds/second-00299.webp` The Grand Canal façades with a gondolier passing.
- 05:03.00 `seconds/second-00304.webp` A 'Venice' guidebook, the turn toward tourism foreshadowed.
- 05:08.00 `seconds/second-00309.webp` The guidebook's page: an Ottoman army before the Hagia Sophia.
- 05:15.00 `seconds/second-00316.webp` Galleys and new transoceanic ships crossing.
- 05:20.00 `seconds/second-00321.webp` A hand holding the Venetian flag.
- 05:30.00 `seconds/second-00331.webp` Venice under a flag that keeps changing as it passes between France and Austria.
- 05:46.00 `seconds/second-00347.webp` A Venice postcard held in a hand.
- 05:50.00 `seconds/second-00351.webp` Deck chairs and a white box drift on the lagoon below the campanile: the tourist city.
- 06:00.00 `seconds/second-00361.webp` San Marco with the water partway up its base, mid-flood.
- 06:15.00 `seconds/second-00376.webp` Top-down traffic of motorboats in lanes.
- 06:25.00 `seconds/second-00386.webp` Tourists' backs blocking the view from a loggia.
- 06:40.00 `seconds/second-00401.webp` End card: the red map of castles and roads, shared across TED-Ed lessons.
