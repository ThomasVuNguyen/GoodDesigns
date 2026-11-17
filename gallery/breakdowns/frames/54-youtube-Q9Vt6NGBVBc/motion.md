# Motion notes: What is sumo, and why is it so popular? - Lee Thompson

TED-Ed · 05:37.48 · https://www.youtube.com/watch?v=Q9Vt6NGBVBc

Masayoshi Nakamura and Good General draw sumo's history as flat ukiyo-e color with clean line, under gradient skies of teal, cream and coral. Most of the motion is character animation: walk and run cycles, the ring-entering ritual, throws and tumbles, all timed on twos with snappy holds. Between scenes the camera rarely just cuts. It dives into a map, rushes through a tunnel of flat planes or torii gates, tilts up a layered collage, or lets a sunburst, a dust cloud or a falling body carry it into the next idea. Shapes morph to explain rules: the boundary cycles through polygons before it settles as a circle.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▂▃▁▁▁▃▅▃▃▃▆▆▄▄▄▇▁▁▁▅▅▁▁▁▁▁▃▆▅▇▄▅▄▅▄▄▅▄▅▆▆▄▅▃▂▂▂▂▂▆▄▃▃▆▅▂▂▂▂▂
01:00  ▂▃▃▃▂▂▃▄▃▄▄▅▅▅▄▃▄▄▄▃▃▃▃▄▅▅▅▅▄▃▅▆▅▅▄▂▅▆▆▆▂▄▅▅▆▆▆▇▆▅▅▅▆▆▆▇▇▇▇▇
02:00  ▇▇▆▆▅▄▃▂▃▃▃▃▃▃▂█▇▇▇▇▇▇▂▂▂▂▃▅▅▆▆▅▅▇▆▄▅▅▅▅▅▆▅▅▅▇▆▆▆▆▅▅▂▂▂▂▂▂▂▅
03:00  ▃▃▃▃▂▂▂▂▂▅▄▄▄▄▅▆▂▂▂▂▃▃▇▃▄▆▄▄▅▅▅▇▆▅▅▅▂▅▆▇██▅▅▆█▆▂▃▂▂▃▂▂▂▂▂▂▃▂
04:00  ▃▂▂▂▂▂▄▂▂▂▆▆▆▅▇▇▄▂▂▃▃▃▃▃▃▄▄▃▃▃▂▇▅▅▅▄▄▆▅▄▃▄▃▄▄▄▅▆▃▃▃▅▄▄▄▄▄▆▂▃
05:00  ▃▃▃▅▄▄▅▅▅▅▅▅▅▅▅▆▆▆▆▆▅▆▄▁▂▁▁▂▄▅▂▁▁▁▁▁▁▁
```

## Sequences

### 01. From the map to the street

00:09.75–00:11.75 (2.00 s) · 17 frames at 8 fps, 0.125 s apart · push-in, zoom-through, scale jump, top-down

The map of Japan holds under drifting pink clouds, then the camera dives at the coast: in a quarter second the island fills the frame, then patchwork fields appear from overhead, then a single street with a crowd and two wrestlers seen from straight above. Three scales in under a second, all top-down.

Motion: `▃▃▂▃▃▃▂▅▇█▇█▆▇▄▄▄`

- 00:09.75 `motion/map-dive/f-001.webp` ▃
- 00:09.88 `motion/map-dive/f-002.webp` ▃
- 00:10.00 `motion/map-dive/f-003.webp` ▂
- 00:10.12 `motion/map-dive/f-004.webp` ▃
- 00:10.25 `motion/map-dive/f-005.webp` ▃
- 00:10.38 `motion/map-dive/f-006.webp` ▃
- 00:10.50 `motion/map-dive/f-007.webp` ▂
- 00:10.62 `motion/map-dive/f-008.webp` ▅
- 00:10.75 `motion/map-dive/f-009.webp` ▇
- 00:10.88 `motion/map-dive/f-010.webp` █
- 00:11.00 `motion/map-dive/f-011.webp` ▇
- 00:11.12 `motion/map-dive/f-012.webp` █
- 00:11.25 `motion/map-dive/f-013.webp` ▆
- 00:11.38 `motion/map-dive/f-014.webp` ▇
- 00:11.50 `motion/map-dive/f-015.webp` ▄
- 00:11.62 `motion/map-dive/f-016.webp` ▄
- 00:11.75 `motion/map-dive/f-017.webp` ▄

### 02. The pros crash the event

00:14.75–00:16.00 (1.25 s) · 11 frames at 8 fps, 0.125 s apart · smash cut, angle change, pop-in

Four shots in one second. The overhead crowd widens, cuts low to two officials over a sprawled wrestler, then two wrestlers in dark jackets pop in small on a gradient sky and cut straight to a medium of them. The speed of the cutting is the intrusion.

Motion: `▄▅▅▆▆█▇▇▆▆▁`

- 00:14.75 `motion/crash/f-001.webp` ▄
- 00:14.88 `motion/crash/f-002.webp` ▅
- 00:15.00 `motion/crash/f-003.webp` ▅
- 00:15.12 `motion/crash/f-004.webp` ▆
- 00:15.25 `motion/crash/f-005.webp` ▆
- 00:15.38 `motion/crash/f-006.webp` █
- 00:15.50 `motion/crash/f-007.webp` ▇
- 00:15.62 `motion/crash/f-008.webp` ▇
- 00:15.75 `motion/crash/f-009.webp` ▆
- 00:15.88 `motion/crash/f-010.webp` ▆
- 00:16.00 `motion/crash/f-011.webp` ▁

### 03. The jackets turn to show their guild

00:19.25–00:21.00 (1.75 s) · 15 frames at 8 fps, 0.125 s apart · turn, stagger, reveal

Arms folded, the two pros turn their backs to us one after the other, about three quarters of a second apart. Each turn takes a single drawing: the faces are gone and 東京 and 相撲, Tokyo and sumo, are printed across their backs.

Motion: `▁▄▄▆▆▆▁▅▅▆▆▆▁▂▁`

- 00:19.25 `motion/turn/f-001.webp` ▁
- 00:19.38 `motion/turn/f-002.webp` ▄
- 00:19.50 `motion/turn/f-003.webp` ▄
- 00:19.62 `motion/turn/f-004.webp` ▆
- 00:19.75 `motion/turn/f-005.webp` ▆
- 00:19.88 `motion/turn/f-006.webp` ▆
- 00:20.00 `motion/turn/f-007.webp` ▁
- 00:20.12 `motion/turn/f-008.webp` ▅
- 00:20.25 `motion/turn/f-009.webp` ▅
- 00:20.38 `motion/turn/f-010.webp` ▆
- 00:20.50 `motion/turn/f-011.webp` ▆
- 00:20.62 `motion/turn/f-012.webp` ▆
- 00:20.75 `motion/turn/f-013.webp` ▁
- 00:20.88 `motion/turn/f-014.webp` ▂
- 00:21.00 `motion/turn/f-015.webp` ▁

### 04. A slash, then the escape

00:26.75–00:31.75 (5.00 s) · 31 frames at 6 fps, 0.167 s apart · pull-back, frame inside frame, slash wipe, anticipation

The backs shrink into a small panel that opens out into a road to the horizon, the pair walking off with the money bags. Dark figures slide in at the frame edges and a yellow diagonal slashes across: the killing is never drawn. After the slash one pro lies flat; the other clutches his head, crouches, and launches into a run.

Motion: `▄▄▇▇▄▃▃▃▃▃▃▂▆▆██▂▃▃▃▃▂▄▅▅▄▅▅▆▆▄`

- 00:26.75 `motion/escape/f-001.webp` ▄
- 00:26.92 `motion/escape/f-002.webp` ▄
- 00:27.08 `motion/escape/f-003.webp` ▇
- 00:27.25 `motion/escape/f-004.webp` ▇
- 00:27.42 `motion/escape/f-005.webp` ▄
- 00:27.58 `motion/escape/f-006.webp` ▃
- 00:27.75 `motion/escape/f-007.webp` ▃
- 00:27.92 `motion/escape/f-008.webp` ▃
- 00:28.08 `motion/escape/f-009.webp` ▃
- 00:28.25 `motion/escape/f-010.webp` ▃
- 00:28.42 `motion/escape/f-011.webp` ▃
- 00:28.58 `motion/escape/f-012.webp` ▂
- 00:28.75 `motion/escape/f-013.webp` ▆
- 00:28.92 `motion/escape/f-014.webp` ▆
- 00:29.08 `motion/escape/f-015.webp` █
- 00:29.25 `motion/escape/f-016.webp` █
- 00:29.42 `motion/escape/f-017.webp` ▂
- 00:29.58 `motion/escape/f-018.webp` ▃
- 00:29.75 `motion/escape/f-019.webp` ▃
- 00:29.92 `motion/escape/f-020.webp` ▃
- 00:30.08 `motion/escape/f-021.webp` ▃
- 00:30.25 `motion/escape/f-022.webp` ▂
- 00:30.42 `motion/escape/f-023.webp` ▄
- 00:30.58 `motion/escape/f-024.webp` ▅
- 00:30.75 `motion/escape/f-025.webp` ▅
- 00:30.92 `motion/escape/f-026.webp` ▄
- 00:31.08 `motion/escape/f-027.webp` ▅
- 00:31.25 `motion/escape/f-028.webp` ▅
- 00:31.42 `motion/escape/f-029.webp` ▆
- 00:31.58 `motion/escape/f-030.webp` ▆
- 00:31.75 `motion/escape/f-031.webp` ▄

### 05. Running in place

00:31.75–00:39.25 (7.50 s) · 31 frames at 4 fps, 0.250 s apart · run cycle, locked-off, loop, away from camera

Locked-off, one-point road. He runs away from camera but never gets smaller: the same run cycle loops in place for seven seconds, arms flailing, while nothing else in the frame moves. The distance is covered in the next shot.

Motion: `▅▅▄▅▄▅▅▄▅▄▅▄▅▅▄▅▄▅▄▅▅▄▅▄▅▄▅▅▄▅▆`

Onion skin: `motion/run/trail.webp`

- 00:31.75 `motion/run/f-001.webp` ▅
- 00:32.00 `motion/run/f-002.webp` ▅
- 00:32.25 `motion/run/f-003.webp` ▄
- 00:32.50 `motion/run/f-004.webp` ▅
- 00:32.75 `motion/run/f-005.webp` ▄
- 00:33.00 `motion/run/f-006.webp` ▅
- 00:33.25 `motion/run/f-007.webp` ▅
- 00:33.50 `motion/run/f-008.webp` ▄
- 00:33.75 `motion/run/f-009.webp` ▅
- 00:34.00 `motion/run/f-010.webp` ▄
- 00:34.25 `motion/run/f-011.webp` ▅
- 00:34.50 `motion/run/f-012.webp` ▄
- 00:34.75 `motion/run/f-013.webp` ▅
- 00:35.00 `motion/run/f-014.webp` ▅
- 00:35.25 `motion/run/f-015.webp` ▄
- 00:35.50 `motion/run/f-016.webp` ▅
- 00:35.75 `motion/run/f-017.webp` ▄
- 00:36.00 `motion/run/f-018.webp` ▅
- 00:36.25 `motion/run/f-019.webp` ▄
- 00:36.50 `motion/run/f-020.webp` ▅
- 00:36.75 `motion/run/f-021.webp` ▅
- 00:37.00 `motion/run/f-022.webp` ▄
- 00:37.25 `motion/run/f-023.webp` ▅
- 00:37.50 `motion/run/f-024.webp` ▄
- 00:37.75 `motion/run/f-025.webp` ▅
- 00:38.00 `motion/run/f-026.webp` ▄
- 00:38.25 `motion/run/f-027.webp` ▅
- 00:38.50 `motion/run/f-028.webp` ▅
- 00:38.75 `motion/run/f-029.webp` ▄
- 00:39.00 `motion/run/f-030.webp` ▅
- 00:39.25 `motion/run/f-031.webp` ▆

### 06. The world slides past him

00:39.00–00:43.50 (4.50 s) · 28 frames at 6 fps, 0.167 s apart · background slide, parallax, rise-up, scale

The runner stays center while the scenery does the travelling: the Tokyo skyline pops up at the horizon, a torii gate grows over him and slides out of frame, then the ground turns to an empty coral plain. A small magistrate's house rises at the horizon and grows to fill the frame as he reaches its door.

Motion: `▄▆▆▆▇▆▇▇▇▄▅▅▄▅▄▅▅▄▅▆▆▅▃▄▃▃▄▃`

- 00:39.00 `motion/gates/f-001.webp` ▄
- 00:39.17 `motion/gates/f-002.webp` ▆
- 00:39.33 `motion/gates/f-003.webp` ▆
- 00:39.50 `motion/gates/f-004.webp` ▆
- 00:39.67 `motion/gates/f-005.webp` ▇
- 00:39.83 `motion/gates/f-006.webp` ▆
- 00:40.00 `motion/gates/f-007.webp` ▇
- 00:40.17 `motion/gates/f-008.webp` ▇
- 00:40.33 `motion/gates/f-009.webp` ▇
- 00:40.50 `motion/gates/f-010.webp` ▄
- 00:40.67 `motion/gates/f-011.webp` ▅
- 00:40.83 `motion/gates/f-012.webp` ▅
- 00:41.00 `motion/gates/f-013.webp` ▄
- 00:41.17 `motion/gates/f-014.webp` ▅
- 00:41.33 `motion/gates/f-015.webp` ▄
- 00:41.50 `motion/gates/f-016.webp` ▅
- 00:41.67 `motion/gates/f-017.webp` ▅
- 00:41.83 `motion/gates/f-018.webp` ▄
- 00:42.00 `motion/gates/f-019.webp` ▅
- 00:42.17 `motion/gates/f-020.webp` ▆
- 00:42.33 `motion/gates/f-021.webp` ▆
- 00:42.50 `motion/gates/f-022.webp` ▅
- 00:42.67 `motion/gates/f-023.webp` ▃
- 00:42.83 `motion/gates/f-024.webp` ▄
- 00:43.00 `motion/gates/f-025.webp` ▃
- 00:43.17 `motion/gates/f-026.webp` ▃
- 00:43.33 `motion/gates/f-027.webp` ▄
- 00:43.50 `motion/gates/f-028.webp` ▃

### 07. The magistrate rules

00:49.50–00:53.75 (4.25 s) · 18 frames at 4 fps, 0.250 s apart · gesture, hold, tilt up

Symmetrical front view of the magistrate at his desk. One gesture carries the verdict: he lifts a paper decree overhead and holds it for two seconds. The camera then tilts up to the roof ornament as a transition.

Motion: `▆▃▃▄▃▃▃▃▃▃▃▃▃▃▃▃▆█`

- 00:49.50 `motion/decree/f-001.webp` ▆
- 00:49.75 `motion/decree/f-002.webp` ▃
- 00:50.00 `motion/decree/f-003.webp` ▃
- 00:50.25 `motion/decree/f-004.webp` ▄
- 00:50.50 `motion/decree/f-005.webp` ▃
- 00:50.75 `motion/decree/f-006.webp` ▃
- 00:51.00 `motion/decree/f-007.webp` ▃
- 00:51.25 `motion/decree/f-008.webp` ▃
- 00:51.50 `motion/decree/f-009.webp` ▃
- 00:51.75 `motion/decree/f-010.webp` ▃
- 00:52.00 `motion/decree/f-011.webp` ▃
- 00:52.25 `motion/decree/f-012.webp` ▃
- 00:52.50 `motion/decree/f-013.webp` ▃
- 00:52.75 `motion/decree/f-014.webp` ▃
- 00:53.00 `motion/decree/f-015.webp` ▃
- 00:53.25 `motion/decree/f-016.webp` ▃
- 00:53.50 `motion/decree/f-017.webp` ▆
- 00:53.75 `motion/decree/f-018.webp` █

### 08. The ring-entering ritual

00:54.00–01:00.00 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · pose to pose, holds, clap, character

A lone wrestler drops onto blank ground and runs the ceremony as poses with holds between them: arms out, arms high, a clap at the chest, arms high again. Each pose is held for a quarter to half a second, so the ritual reads as a sequence of positions rather than a flow. The same animation returns at 3:52.

Motion: `▅▅▃▃▂▂▁▃▂▂▂▂▁▃▃▂▂▁▃▂▂▂▂▃▂`

Onion skin: `motion/ritual/trail.webp`

- 00:54.00 `motion/ritual/f-001.webp` ▅
- 00:54.25 `motion/ritual/f-002.webp` ▅
- 00:54.50 `motion/ritual/f-003.webp` ▃
- 00:54.75 `motion/ritual/f-004.webp` ▃
- 00:55.00 `motion/ritual/f-005.webp` ▂
- 00:55.25 `motion/ritual/f-006.webp` ▂
- 00:55.50 `motion/ritual/f-007.webp` ▁
- 00:55.75 `motion/ritual/f-008.webp` ▃
- 00:56.00 `motion/ritual/f-009.webp` ▂
- 00:56.25 `motion/ritual/f-010.webp` ▂
- 00:56.50 `motion/ritual/f-011.webp` ▂
- 00:56.75 `motion/ritual/f-012.webp` ▂
- 00:57.00 `motion/ritual/f-013.webp` ▁
- 00:57.25 `motion/ritual/f-014.webp` ▃
- 00:57.50 `motion/ritual/f-015.webp` ▃
- 00:57.75 `motion/ritual/f-016.webp` ▂
- 00:58.00 `motion/ritual/f-017.webp` ▂
- 00:58.25 `motion/ritual/f-018.webp` ▁
- 00:58.50 `motion/ritual/f-019.webp` ▃
- 00:58.75 `motion/ritual/f-020.webp` ▂
- 00:59.00 `motion/ritual/f-021.webp` ▂
- 00:59.25 `motion/ritual/f-022.webp` ▂
- 00:59.50 `motion/ritual/f-023.webp` ▂
- 00:59.75 `motion/ritual/f-024.webp` ▃
- 01:00.00 `motion/ritual/f-025.webp` ▂

### 09. The stomp

01:00.00–01:04.00 (4.00 s) · 25 frames at 6 fps, 0.167 s apart · arc, anticipation, squash, settle

Arm swept up and across, then the leg goes high in a sideways lift with the body tilted to balance, and it drops into a wide squat. The squat lands with a little settle, and the arm then extends low and holds.

Motion: `▂▂▂▂▂▂▂▃▄▁▂▂▁▂▄▄▃▂▂▅▂▂▂▃▂`

Onion skin: `motion/shiko/trail.webp`

- 01:00.00 `motion/shiko/f-001.webp` ▂
- 01:00.17 `motion/shiko/f-002.webp` ▂
- 01:00.33 `motion/shiko/f-003.webp` ▂
- 01:00.50 `motion/shiko/f-004.webp` ▂
- 01:00.67 `motion/shiko/f-005.webp` ▂
- 01:00.83 `motion/shiko/f-006.webp` ▂
- 01:01.00 `motion/shiko/f-007.webp` ▂
- 01:01.17 `motion/shiko/f-008.webp` ▃
- 01:01.33 `motion/shiko/f-009.webp` ▄
- 01:01.50 `motion/shiko/f-010.webp` ▁
- 01:01.67 `motion/shiko/f-011.webp` ▂
- 01:01.83 `motion/shiko/f-012.webp` ▂
- 01:02.00 `motion/shiko/f-013.webp` ▁
- 01:02.17 `motion/shiko/f-014.webp` ▂
- 01:02.33 `motion/shiko/f-015.webp` ▄
- 01:02.50 `motion/shiko/f-016.webp` ▄
- 01:02.67 `motion/shiko/f-017.webp` ▃
- 01:02.83 `motion/shiko/f-018.webp` ▂
- 01:03.00 `motion/shiko/f-019.webp` ▂
- 01:03.17 `motion/shiko/f-020.webp` ▅
- 01:03.33 `motion/shiko/f-021.webp` ▂
- 01:03.50 `motion/shiko/f-022.webp` ▂
- 01:03.67 `motion/shiko/f-023.webp` ▂
- 01:03.83 `motion/shiko/f-024.webp` ▃
- 01:04.00 `motion/shiko/f-025.webp` ▂

### 10. Petals carry us to the court

01:06.00–01:12.00 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · particle dissolve, fade, rise-up, color shift

Pink petals blow in around the squatting wrestler, thicken, and dissolve him away. The sky warms from teal to coral as an emperor rises up from the bottom edge on a red-railed platform, petals still falling. The particles are the bridge between centuries.

Motion: `▂▂▃▄▄▅▄▃▃▃▃▄▄▄▄▄▄▄▄▅▅▅▅▅▅`

- 01:06.00 `motion/petals/f-001.webp` ▂
- 01:06.25 `motion/petals/f-002.webp` ▂
- 01:06.50 `motion/petals/f-003.webp` ▃
- 01:06.75 `motion/petals/f-004.webp` ▄
- 01:07.00 `motion/petals/f-005.webp` ▄
- 01:07.25 `motion/petals/f-006.webp` ▅
- 01:07.50 `motion/petals/f-007.webp` ▄
- 01:07.75 `motion/petals/f-008.webp` ▃
- 01:08.00 `motion/petals/f-009.webp` ▃
- 01:08.25 `motion/petals/f-010.webp` ▃
- 01:08.50 `motion/petals/f-011.webp` ▃
- 01:08.75 `motion/petals/f-012.webp` ▄
- 01:09.00 `motion/petals/f-013.webp` ▄
- 01:09.25 `motion/petals/f-014.webp` ▄
- 01:09.50 `motion/petals/f-015.webp` ▄
- 01:09.75 `motion/petals/f-016.webp` ▄
- 01:10.00 `motion/petals/f-017.webp` ▄
- 01:10.25 `motion/petals/f-018.webp` ▄
- 01:10.50 `motion/petals/f-019.webp` ▄
- 01:10.75 `motion/petals/f-020.webp` ▅
- 01:11.00 `motion/petals/f-021.webp` ▅
- 01:11.25 `motion/petals/f-022.webp` ▅
- 01:11.50 `motion/petals/f-023.webp` ▅
- 01:11.75 `motion/petals/f-024.webp` ▅
- 01:12.00 `motion/petals/f-025.webp` ▅

### 11. A throw at court

01:23.50–01:30.50 (7.00 s) · 29 frames at 4 fps, 0.250 s apart · clash, arc, flip, hold

The two wrestlers bow, lunge, and grapple in front of the emperor. At 1:27 one heaves the other up in a high arc, legs to the sky, and he lands flat on his back. The winner stays crouched over him and everything holds, petals still drifting.

Motion: `▃▄▅▅▄▅▅▅▅▅▅▅▅▅▅▅▅▄▄▄▃▃▃▃▃▃▃▃▃`

- 01:23.50 `motion/court-bout/f-001.webp` ▃
- 01:23.75 `motion/court-bout/f-002.webp` ▄
- 01:24.00 `motion/court-bout/f-003.webp` ▅
- 01:24.25 `motion/court-bout/f-004.webp` ▅
- 01:24.50 `motion/court-bout/f-005.webp` ▄
- 01:24.75 `motion/court-bout/f-006.webp` ▅
- 01:25.00 `motion/court-bout/f-007.webp` ▅
- 01:25.25 `motion/court-bout/f-008.webp` ▅
- 01:25.50 `motion/court-bout/f-009.webp` ▅
- 01:25.75 `motion/court-bout/f-010.webp` ▅
- 01:26.00 `motion/court-bout/f-011.webp` ▅
- 01:26.25 `motion/court-bout/f-012.webp` ▅
- 01:26.50 `motion/court-bout/f-013.webp` ▅
- 01:26.75 `motion/court-bout/f-014.webp` ▅
- 01:27.00 `motion/court-bout/f-015.webp` ▅
- 01:27.25 `motion/court-bout/f-016.webp` ▅
- 01:27.50 `motion/court-bout/f-017.webp` ▅
- 01:27.75 `motion/court-bout/f-018.webp` ▄
- 01:28.00 `motion/court-bout/f-019.webp` ▄
- 01:28.25 `motion/court-bout/f-020.webp` ▄
- 01:28.50 `motion/court-bout/f-021.webp` ▃
- 01:28.75 `motion/court-bout/f-022.webp` ▃
- 01:29.00 `motion/court-bout/f-023.webp` ▃
- 01:29.25 `motion/court-bout/f-024.webp` ▃
- 01:29.50 `motion/court-bout/f-025.webp` ▃
- 01:29.75 `motion/court-bout/f-026.webp` ▃
- 01:30.00 `motion/court-bout/f-027.webp` ▃
- 01:30.25 `motion/court-bout/f-028.webp` ▃
- 01:30.50 `motion/court-bout/f-029.webp` ▃

### 12. Close, then wide for the trip

01:30.75–01:35.00 (4.25 s) · 27 frames at 6 fps, 0.167 s apart · close-up, pull-back, trip

Hard cut to a tight two-shot: a glance, a shove, the clinch. The camera pulls back as they shift, and in the wide one hooks a leg and trips the other to the ground. The style turns from striking to grappling and tripping in one move.

Motion: `▇▅▆▇▆▆▅▅▅▅▆▆▆▆▅▅▅▅▅▅▅▄▃▂▁▂▂`

- 01:30.75 `motion/close-grapple/f-001.webp` ▇
- 01:30.92 `motion/close-grapple/f-002.webp` ▅
- 01:31.08 `motion/close-grapple/f-003.webp` ▆
- 01:31.25 `motion/close-grapple/f-004.webp` ▇
- 01:31.42 `motion/close-grapple/f-005.webp` ▆
- 01:31.58 `motion/close-grapple/f-006.webp` ▆
- 01:31.75 `motion/close-grapple/f-007.webp` ▅
- 01:31.92 `motion/close-grapple/f-008.webp` ▅
- 01:32.08 `motion/close-grapple/f-009.webp` ▅
- 01:32.25 `motion/close-grapple/f-010.webp` ▅
- 01:32.42 `motion/close-grapple/f-011.webp` ▆
- 01:32.58 `motion/close-grapple/f-012.webp` ▆
- 01:32.75 `motion/close-grapple/f-013.webp` ▆
- 01:32.92 `motion/close-grapple/f-014.webp` ▆
- 01:33.08 `motion/close-grapple/f-015.webp` ▅
- 01:33.25 `motion/close-grapple/f-016.webp` ▅
- 01:33.42 `motion/close-grapple/f-017.webp` ▅
- 01:33.58 `motion/close-grapple/f-018.webp` ▅
- 01:33.75 `motion/close-grapple/f-019.webp` ▅
- 01:33.92 `motion/close-grapple/f-020.webp` ▅
- 01:34.08 `motion/close-grapple/f-021.webp` ▅
- 01:34.25 `motion/close-grapple/f-022.webp` ▄
- 01:34.42 `motion/close-grapple/f-023.webp` ▃
- 01:34.58 `motion/close-grapple/f-024.webp` ▂
- 01:34.75 `motion/close-grapple/f-025.webp` ▁
- 01:34.92 `motion/close-grapple/f-026.webp` ▂
- 01:35.08 `motion/close-grapple/f-027.webp` ▂

### 13. A tunnel of flat planes

01:36.25–01:40.00 (3.75 s) · 31 frames at 8 fps, 0.125 s apart · fly-through, perspective, tunnel, flat shapes

Pink and teal trapezoids slide in at the horizon behind the wrestler, and the camera rushes forward into a corridor built from flat colored planes: floors, walls and ceilings flip past every few frames. A samurai helmet waits at the end of the tunnel.

Motion: `▃▄▄▆▅▆▅▆▅▆▆▇▅▇▆▇▆▇▅▆▅▆▅▆▅▆▅▆▅▅▃`

- 01:36.25 `motion/corridor/f-001.webp` ▃
- 01:36.38 `motion/corridor/f-002.webp` ▄
- 01:36.50 `motion/corridor/f-003.webp` ▄
- 01:36.62 `motion/corridor/f-004.webp` ▆
- 01:36.75 `motion/corridor/f-005.webp` ▅
- 01:36.88 `motion/corridor/f-006.webp` ▆
- 01:37.00 `motion/corridor/f-007.webp` ▅
- 01:37.12 `motion/corridor/f-008.webp` ▆
- 01:37.25 `motion/corridor/f-009.webp` ▅
- 01:37.38 `motion/corridor/f-010.webp` ▆
- 01:37.50 `motion/corridor/f-011.webp` ▆
- 01:37.62 `motion/corridor/f-012.webp` ▇
- 01:37.75 `motion/corridor/f-013.webp` ▅
- 01:37.88 `motion/corridor/f-014.webp` ▇
- 01:38.00 `motion/corridor/f-015.webp` ▆
- 01:38.12 `motion/corridor/f-016.webp` ▇
- 01:38.25 `motion/corridor/f-017.webp` ▆
- 01:38.38 `motion/corridor/f-018.webp` ▇
- 01:38.50 `motion/corridor/f-019.webp` ▅
- 01:38.62 `motion/corridor/f-020.webp` ▆
- 01:38.75 `motion/corridor/f-021.webp` ▅
- 01:38.88 `motion/corridor/f-022.webp` ▆
- 01:39.00 `motion/corridor/f-023.webp` ▅
- 01:39.12 `motion/corridor/f-024.webp` ▆
- 01:39.25 `motion/corridor/f-025.webp` ▅
- 01:39.38 `motion/corridor/f-026.webp` ▆
- 01:39.50 `motion/corridor/f-027.webp` ▅
- 01:39.62 `motion/corridor/f-028.webp` ▆
- 01:39.75 `motion/corridor/f-029.webp` ▅
- 01:39.88 `motion/corridor/f-030.webp` ▅
- 01:40.00 `motion/corridor/f-031.webp` ▃

### 14. The helmet looks around

01:40.00–01:47.75 (7.75 s) · 32 frames at 4 fps, 0.250 s apart · turnaround, head turn, push-in

The samurai helmet turns its head left, to the back, right and front again, a full turnaround drawn as about eight angles. It looks around a second time and then the camera pushes into its black crown, which becomes the next transition.

Motion: `▃▂▂▂▅▄▅▄▅▄▅▅▆▅▆▅▅▅▆▆▅▅▆▆▆▅▅▆▇▇▆▇`

- 01:40.00 `motion/helmet/f-001.webp` ▃
- 01:40.25 `motion/helmet/f-002.webp` ▂
- 01:40.50 `motion/helmet/f-003.webp` ▂
- 01:40.75 `motion/helmet/f-004.webp` ▂
- 01:41.00 `motion/helmet/f-005.webp` ▅
- 01:41.25 `motion/helmet/f-006.webp` ▄
- 01:41.50 `motion/helmet/f-007.webp` ▅
- 01:41.75 `motion/helmet/f-008.webp` ▄
- 01:42.00 `motion/helmet/f-009.webp` ▅
- 01:42.25 `motion/helmet/f-010.webp` ▄
- 01:42.50 `motion/helmet/f-011.webp` ▅
- 01:42.75 `motion/helmet/f-012.webp` ▅
- 01:43.00 `motion/helmet/f-013.webp` ▆
- 01:43.25 `motion/helmet/f-014.webp` ▅
- 01:43.50 `motion/helmet/f-015.webp` ▆
- 01:43.75 `motion/helmet/f-016.webp` ▅
- 01:44.00 `motion/helmet/f-017.webp` ▅
- 01:44.25 `motion/helmet/f-018.webp` ▅
- 01:44.50 `motion/helmet/f-019.webp` ▆
- 01:44.75 `motion/helmet/f-020.webp` ▆
- 01:45.00 `motion/helmet/f-021.webp` ▅
- 01:45.25 `motion/helmet/f-022.webp` ▅
- 01:45.50 `motion/helmet/f-023.webp` ▆
- 01:45.75 `motion/helmet/f-024.webp` ▆
- 01:46.00 `motion/helmet/f-025.webp` ▆
- 01:46.25 `motion/helmet/f-026.webp` ▅
- 01:46.50 `motion/helmet/f-027.webp` ▅
- 01:46.75 `motion/helmet/f-028.webp` ▆
- 01:47.00 `motion/helmet/f-029.webp` ▇
- 01:47.25 `motion/helmet/f-030.webp` ▇
- 01:47.50 `motion/helmet/f-031.webp` ▆
- 01:47.75 `motion/helmet/f-032.webp` ▇

### 15. A bout on the hill, then up into the sky

01:48.00–01:54.00 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · loop, silhouette, tilt up

Two wrestlers grapple on a black hill silhouette while the sky cools from cream to teal. Around 1:53 the hill sinks out of frame as the camera tilts up into pink cloud bands.

Motion: `█▂▃▅▅▅▃▅▅▅▄▅▅▅▅▅▅▆▆▆▆▆▆▆▆`

- 01:48.00 `motion/hill/f-001.webp` █
- 01:48.25 `motion/hill/f-002.webp` ▂
- 01:48.50 `motion/hill/f-003.webp` ▃
- 01:48.75 `motion/hill/f-004.webp` ▅
- 01:49.00 `motion/hill/f-005.webp` ▅
- 01:49.25 `motion/hill/f-006.webp` ▅
- 01:49.50 `motion/hill/f-007.webp` ▃
- 01:49.75 `motion/hill/f-008.webp` ▅
- 01:50.00 `motion/hill/f-009.webp` ▅
- 01:50.25 `motion/hill/f-010.webp` ▅
- 01:50.50 `motion/hill/f-011.webp` ▄
- 01:50.75 `motion/hill/f-012.webp` ▅
- 01:51.00 `motion/hill/f-013.webp` ▅
- 01:51.25 `motion/hill/f-014.webp` ▅
- 01:51.50 `motion/hill/f-015.webp` ▅
- 01:51.75 `motion/hill/f-016.webp` ▅
- 01:52.00 `motion/hill/f-017.webp` ▅
- 01:52.25 `motion/hill/f-018.webp` ▆
- 01:52.50 `motion/hill/f-019.webp` ▆
- 01:52.75 `motion/hill/f-020.webp` ▆
- 01:53.00 `motion/hill/f-021.webp` ▆
- 01:53.25 `motion/hill/f-022.webp` ▆
- 01:53.50 `motion/hill/f-023.webp` ▆
- 01:53.75 `motion/hill/f-024.webp` ▆
- 01:54.00 `motion/hill/f-025.webp` ▆

### 16. A tilt through the collage

01:54.00–02:06.00 (12.00 s) · 25 frames at 2 fps, 0.500 s apart · tilt, parallax, layering

A slow vertical move through a dense ukiyo-e collage of a boat, a Buddha, cranes, wrestlers, Mount Fuji and a temple, every layer drifting at its own speed so the flat drawings gain depth. It climbs past the clouds to a torii with an offering box.

Motion: `▆▆▇▇▇▇▇▇▇▇▇▇▇▇▇▇▆▆▆▆▅▅▄▄▄`

- 01:54.00 `motion/collage/f-001.webp` ▆
- 01:54.50 `motion/collage/f-002.webp` ▆
- 01:55.00 `motion/collage/f-003.webp` ▇
- 01:55.50 `motion/collage/f-004.webp` ▇
- 01:56.00 `motion/collage/f-005.webp` ▇
- 01:56.50 `motion/collage/f-006.webp` ▇
- 01:57.00 `motion/collage/f-007.webp` ▇
- 01:57.50 `motion/collage/f-008.webp` ▇
- 01:58.00 `motion/collage/f-009.webp` ▇
- 01:58.50 `motion/collage/f-010.webp` ▇
- 01:59.00 `motion/collage/f-011.webp` ▇
- 01:59.50 `motion/collage/f-012.webp` ▇
- 02:00.00 `motion/collage/f-013.webp` ▇
- 02:00.50 `motion/collage/f-014.webp` ▇
- 02:01.00 `motion/collage/f-015.webp` ▇
- 02:01.50 `motion/collage/f-016.webp` ▇
- 02:02.00 `motion/collage/f-017.webp` ▆
- 02:02.50 `motion/collage/f-018.webp` ▆
- 02:03.00 `motion/collage/f-019.webp` ▆
- 02:03.50 `motion/collage/f-020.webp` ▆
- 02:04.00 `motion/collage/f-021.webp` ▅
- 02:04.50 `motion/collage/f-022.webp` ▅
- 02:05.00 `motion/collage/f-023.webp` ▄
- 02:05.50 `motion/collage/f-024.webp` ▄
- 02:06.00 `motion/collage/f-025.webp` ▄

### 17. Sunburst wipe

02:14.50–02:17.00 (2.50 s) · 21 frames at 8 fps, 0.125 s apart · radial wipe, rotate, reveal

A thin line drops into the offering box, and a radial burst of wedges in coral, teal, cream and sage opens from it and covers the frame in about half a second. It keeps turning as a wrestler steps into the middle of it.

Motion: `▂▂▁▃▃▆▆███▇█▃▇▂▇▇▃▇▇▃`

- 02:14.50 `motion/sunburst/f-001.webp` ▂
- 02:14.62 `motion/sunburst/f-002.webp` ▂
- 02:14.75 `motion/sunburst/f-003.webp` ▁
- 02:14.88 `motion/sunburst/f-004.webp` ▃
- 02:15.00 `motion/sunburst/f-005.webp` ▃
- 02:15.12 `motion/sunburst/f-006.webp` ▆
- 02:15.25 `motion/sunburst/f-007.webp` ▆
- 02:15.38 `motion/sunburst/f-008.webp` █
- 02:15.50 `motion/sunburst/f-009.webp` █
- 02:15.62 `motion/sunburst/f-010.webp` █
- 02:15.75 `motion/sunburst/f-011.webp` ▇
- 02:15.88 `motion/sunburst/f-012.webp` █
- 02:16.00 `motion/sunburst/f-013.webp` ▃
- 02:16.12 `motion/sunburst/f-014.webp` ▇
- 02:16.25 `motion/sunburst/f-015.webp` ▂
- 02:16.38 `motion/sunburst/f-016.webp` ▇
- 02:16.50 `motion/sunburst/f-017.webp` ▇
- 02:16.62 `motion/sunburst/f-018.webp` ▃
- 02:16.75 `motion/sunburst/f-019.webp` ▇
- 02:16.88 `motion/sunburst/f-020.webp` ▇
- 02:17.00 `motion/sunburst/f-021.webp` ▃

### 18. The rays spin away

02:17.00–02:22.00 (5.00 s) · 21 frames at 4 fps, 0.250 s apart · rotate, loop, reverse wipe

The wedges rotate steadily behind the wrestler as he loosens his shoulders. At 2:21 they collapse back into a point and reveal the sumo guild's hall on a pink-to-lime gradient.

Motion: `▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇█▇▆▃▂`

- 02:17.00 `motion/rays/f-001.webp` ▇
- 02:17.25 `motion/rays/f-002.webp` ▇
- 02:17.50 `motion/rays/f-003.webp` ▇
- 02:17.75 `motion/rays/f-004.webp` ▇
- 02:18.00 `motion/rays/f-005.webp` ▇
- 02:18.25 `motion/rays/f-006.webp` ▇
- 02:18.50 `motion/rays/f-007.webp` ▇
- 02:18.75 `motion/rays/f-008.webp` ▇
- 02:19.00 `motion/rays/f-009.webp` ▇
- 02:19.25 `motion/rays/f-010.webp` ▇
- 02:19.50 `motion/rays/f-011.webp` ▇
- 02:19.75 `motion/rays/f-012.webp` ▇
- 02:20.00 `motion/rays/f-013.webp` ▇
- 02:20.25 `motion/rays/f-014.webp` ▇
- 02:20.50 `motion/rays/f-015.webp` ▇
- 02:20.75 `motion/rays/f-016.webp` ▇
- 02:21.00 `motion/rays/f-017.webp` █
- 02:21.25 `motion/rays/f-018.webp` ▇
- 02:21.50 `motion/rays/f-019.webp` ▆
- 02:21.75 `motion/rays/f-020.webp` ▃
- 02:22.00 `motion/rays/f-021.webp` ▂

### 19. A queue forms

02:28.00–02:34.00 (6.00 s) · 19 frames at 3 fps, 0.333 s apart · pop-in, stagger, pan

People pop out of the hall's door one at a time and line up to its right. The camera pans with the line until the hall is gone and only the queue is left, then a row of shopfronts drops in from the top.

Motion: `▅▅▅▆▆▆▆▆▆▆▅▅▅▅▅▅▇▇█`

- 02:28.00 `motion/queue/f-001.webp` ▅
- 02:28.33 `motion/queue/f-002.webp` ▅
- 02:28.67 `motion/queue/f-003.webp` ▅
- 02:29.00 `motion/queue/f-004.webp` ▆
- 02:29.33 `motion/queue/f-005.webp` ▆
- 02:29.67 `motion/queue/f-006.webp` ▆
- 02:30.00 `motion/queue/f-007.webp` ▆
- 02:30.33 `motion/queue/f-008.webp` ▆
- 02:30.67 `motion/queue/f-009.webp` ▆
- 02:31.00 `motion/queue/f-010.webp` ▆
- 02:31.33 `motion/queue/f-011.webp` ▅
- 02:31.67 `motion/queue/f-012.webp` ▅
- 02:32.00 `motion/queue/f-013.webp` ▅
- 02:32.33 `motion/queue/f-014.webp` ▅
- 02:32.67 `motion/queue/f-015.webp` ▅
- 02:33.00 `motion/queue/f-016.webp` ▅
- 02:33.33 `motion/queue/f-017.webp` ▇
- 02:33.67 `motion/queue/f-018.webp` ▇
- 02:34.00 `motion/queue/f-019.webp` █

### 20. Street-corner sumo

02:34.00–02:41.75 (7.75 s) · 24 frames at 3 fps, 0.333 s apart · loop, background characters, locked-off

Locked-off in front of the shops: two wrestlers circle and shove while spectators at either side bob in short loops. The bout never resolves; it is a loop that stands for many bouts.

Motion: `█▅▄▄▄▅▅▄▅▅▅▅▅▅▅▅▅▅▅▅▅▅▄▇`

- 02:34.00 `motion/street/f-001.webp` █
- 02:34.33 `motion/street/f-002.webp` ▅
- 02:34.67 `motion/street/f-003.webp` ▄
- 02:35.00 `motion/street/f-004.webp` ▄
- 02:35.33 `motion/street/f-005.webp` ▄
- 02:35.67 `motion/street/f-006.webp` ▅
- 02:36.00 `motion/street/f-007.webp` ▅
- 02:36.33 `motion/street/f-008.webp` ▄
- 02:36.67 `motion/street/f-009.webp` ▅
- 02:37.00 `motion/street/f-010.webp` ▅
- 02:37.33 `motion/street/f-011.webp` ▅
- 02:37.67 `motion/street/f-012.webp` ▅
- 02:38.00 `motion/street/f-013.webp` ▅
- 02:38.33 `motion/street/f-014.webp` ▅
- 02:38.67 `motion/street/f-015.webp` ▅
- 02:39.00 `motion/street/f-016.webp` ▅
- 02:39.33 `motion/street/f-017.webp` ▅
- 02:39.67 `motion/street/f-018.webp` ▅
- 02:40.00 `motion/street/f-019.webp` ▅
- 02:40.33 `motion/street/f-020.webp` ▅
- 02:40.67 `motion/street/f-021.webp` ▅
- 02:41.00 `motion/street/f-022.webp` ▅
- 02:41.33 `motion/street/f-023.webp` ▄
- 02:41.67 `motion/street/f-024.webp` ▇

### 21. A brawl cloud

02:44.50–02:51.75 (7.25 s) · 30 frames at 4 fps, 0.250 s apart · cartoon cloud, stars, pop, dissolve to map

The grapple tips over and becomes a cartoon dust cloud with stars, the dark sky behind it. A head, a fist and a foot poke out and vanish in turn while the cloud boils. Then a hole opens in the middle, the cloud breaks into puffs, and the map of Japan is underneath.

Motion: `▅▆▅▆█▆▆▅▆▅▅▆▆▅▆▆▅▆▅▅▆▅▆▅▅▅▆▅▃▂`

- 02:44.50 `motion/cloud/f-001.webp` ▅
- 02:44.75 `motion/cloud/f-002.webp` ▆
- 02:45.00 `motion/cloud/f-003.webp` ▅
- 02:45.25 `motion/cloud/f-004.webp` ▆
- 02:45.50 `motion/cloud/f-005.webp` █
- 02:45.75 `motion/cloud/f-006.webp` ▆
- 02:46.00 `motion/cloud/f-007.webp` ▆
- 02:46.25 `motion/cloud/f-008.webp` ▅
- 02:46.50 `motion/cloud/f-009.webp` ▆
- 02:46.75 `motion/cloud/f-010.webp` ▅
- 02:47.00 `motion/cloud/f-011.webp` ▅
- 02:47.25 `motion/cloud/f-012.webp` ▆
- 02:47.50 `motion/cloud/f-013.webp` ▆
- 02:47.75 `motion/cloud/f-014.webp` ▅
- 02:48.00 `motion/cloud/f-015.webp` ▆
- 02:48.25 `motion/cloud/f-016.webp` ▆
- 02:48.50 `motion/cloud/f-017.webp` ▅
- 02:48.75 `motion/cloud/f-018.webp` ▆
- 02:49.00 `motion/cloud/f-019.webp` ▅
- 02:49.25 `motion/cloud/f-020.webp` ▅
- 02:49.50 `motion/cloud/f-021.webp` ▆
- 02:49.75 `motion/cloud/f-022.webp` ▅
- 02:50.00 `motion/cloud/f-023.webp` ▆
- 02:50.25 `motion/cloud/f-024.webp` ▅
- 02:50.50 `motion/cloud/f-025.webp` ▅
- 02:50.75 `motion/cloud/f-026.webp` ▅
- 02:51.00 `motion/cloud/f-027.webp` ▆
- 02:51.25 `motion/cloud/f-028.webp` ▅
- 02:51.50 `motion/cloud/f-029.webp` ▃
- 02:51.75 `motion/cloud/f-030.webp` ▂

### 22. Bans spread across the map

02:52.00–03:00.00 (8.00 s) · 25 frames at 3 fps, 0.333 s apart · pop-in, stagger, tilt away

Red crosses appear on city after city, a beat apart, until the map is dotted with them. Then the whole map tips flat away from camera like a lid closing, and the next scene is behind it.

Motion: `▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▄▆▃`

- 02:52.00 `motion/bans/f-001.webp` ▂
- 02:52.33 `motion/bans/f-002.webp` ▂
- 02:52.67 `motion/bans/f-003.webp` ▂
- 02:53.00 `motion/bans/f-004.webp` ▂
- 02:53.33 `motion/bans/f-005.webp` ▂
- 02:53.67 `motion/bans/f-006.webp` ▂
- 02:54.00 `motion/bans/f-007.webp` ▂
- 02:54.33 `motion/bans/f-008.webp` ▂
- 02:54.67 `motion/bans/f-009.webp` ▂
- 02:55.00 `motion/bans/f-010.webp` ▂
- 02:55.33 `motion/bans/f-011.webp` ▂
- 02:55.67 `motion/bans/f-012.webp` ▂
- 02:56.00 `motion/bans/f-013.webp` ▂
- 02:56.33 `motion/bans/f-014.webp` ▂
- 02:56.67 `motion/bans/f-015.webp` ▂
- 02:57.00 `motion/bans/f-016.webp` ▂
- 02:57.33 `motion/bans/f-017.webp` ▂
- 02:57.67 `motion/bans/f-018.webp` ▂
- 02:58.00 `motion/bans/f-019.webp` ▂
- 02:58.33 `motion/bans/f-020.webp` ▂
- 02:58.67 `motion/bans/f-021.webp` ▂
- 02:59.00 `motion/bans/f-022.webp` ▂
- 02:59.33 `motion/bans/f-023.webp` ▄
- 02:59.67 `motion/bans/f-024.webp` ▆
- 03:00.00 `motion/bans/f-025.webp` ▃

### 23. The boundary draws itself

03:04.50–03:07.00 (2.50 s) · 21 frames at 8 fps, 0.125 s apart · draw-on, ellipse, line

Two wrestlers crouch face to face, still. A short line appears under them and opens out into an ellipse that draws itself around both, closing in about three quarters of a second. The rule arrives as a line.

Motion: `▁▂▂▂▁▂▂▂▁▂▂▂▂▂▂▂▁▂▂▂▂`

Onion skin: `motion/ring/trail.webp`

- 03:04.50 `motion/ring/f-001.webp` ▁
- 03:04.62 `motion/ring/f-002.webp` ▂
- 03:04.75 `motion/ring/f-003.webp` ▂
- 03:04.88 `motion/ring/f-004.webp` ▂
- 03:05.00 `motion/ring/f-005.webp` ▁
- 03:05.12 `motion/ring/f-006.webp` ▂
- 03:05.25 `motion/ring/f-007.webp` ▂
- 03:05.38 `motion/ring/f-008.webp` ▂
- 03:05.50 `motion/ring/f-009.webp` ▁
- 03:05.62 `motion/ring/f-010.webp` ▂
- 03:05.75 `motion/ring/f-011.webp` ▂
- 03:05.88 `motion/ring/f-012.webp` ▂
- 03:06.00 `motion/ring/f-013.webp` ▂
- 03:06.12 `motion/ring/f-014.webp` ▂
- 03:06.25 `motion/ring/f-015.webp` ▂
- 03:06.38 `motion/ring/f-016.webp` ▂
- 03:06.50 `motion/ring/f-017.webp` ▁
- 03:06.62 `motion/ring/f-018.webp` ▂
- 03:06.75 `motion/ring/f-019.webp` ▂
- 03:06.88 `motion/ring/f-020.webp` ▂
- 03:07.00 `motion/ring/f-021.webp` ▂

### 24. The ring tries on shapes

03:09.50–03:14.25 (4.75 s) · 20 frames at 4 fps, 0.250 s apart · morph, top-down, shape cycle

Top-down, the two wrestlers locked in the middle. The boundary around them morphs: diamond, square, octagon, diamond, hexagon, a bow-tie, a barrel, and finally the circle. Each shape holds about a quarter second before morphing, then the circle holds.

Motion: `▅▆▅▃▂▃▅▃▃▃▄▄▄▃▃▄▄▃▃▃`

- 03:09.50 `motion/shapes/f-001.webp` ▅
- 03:09.75 `motion/shapes/f-002.webp` ▆
- 03:10.00 `motion/shapes/f-003.webp` ▅
- 03:10.25 `motion/shapes/f-004.webp` ▃
- 03:10.50 `motion/shapes/f-005.webp` ▂
- 03:10.75 `motion/shapes/f-006.webp` ▃
- 03:11.00 `motion/shapes/f-007.webp` ▅
- 03:11.25 `motion/shapes/f-008.webp` ▃
- 03:11.50 `motion/shapes/f-009.webp` ▃
- 03:11.75 `motion/shapes/f-010.webp` ▃
- 03:12.00 `motion/shapes/f-011.webp` ▄
- 03:12.25 `motion/shapes/f-012.webp` ▄
- 03:12.50 `motion/shapes/f-013.webp` ▄
- 03:12.75 `motion/shapes/f-014.webp` ▃
- 03:13.00 `motion/shapes/f-015.webp` ▃
- 03:13.25 `motion/shapes/f-016.webp` ▄
- 03:13.50 `motion/shapes/f-017.webp` ▄
- 03:13.75 `motion/shapes/f-018.webp` ▃
- 03:14.00 `motion/shapes/f-019.webp` ▃
- 03:14.25 `motion/shapes/f-020.webp` ▃

### 25. 土俵 slams in

03:14.50–03:16.25 (1.75 s) · 15 frames at 8 fps, 0.125 s apart · type, scale-down, white wipe

A white panel slides across, and 土俵 arrives far too big for the frame, then scales down to center in about a quarter second with 'DOHYO' set in spaced capitals beneath. It is the only full-screen title in the film.

Motion: `▂▃▂▇▇▇▇▆▃▂▂▂▂▂▂`

- 03:14.50 `motion/dohyo/f-001.webp` ▂
- 03:14.62 `motion/dohyo/f-002.webp` ▃
- 03:14.75 `motion/dohyo/f-003.webp` ▂
- 03:14.88 `motion/dohyo/f-004.webp` ▇
- 03:15.00 `motion/dohyo/f-005.webp` ▇
- 03:15.12 `motion/dohyo/f-006.webp` ▇
- 03:15.25 `motion/dohyo/f-007.webp` ▇
- 03:15.38 `motion/dohyo/f-008.webp` ▆
- 03:15.50 `motion/dohyo/f-009.webp` ▃
- 03:15.62 `motion/dohyo/f-010.webp` ▂
- 03:15.75 `motion/dohyo/f-011.webp` ▂
- 03:15.88 `motion/dohyo/f-012.webp` ▂
- 03:16.00 `motion/dohyo/f-013.webp` ▂
- 03:16.12 `motion/dohyo/f-014.webp` ▂
- 03:16.25 `motion/dohyo/f-015.webp` ▂

### 26. Pushed out

03:20.50–03:26.00 (5.50 s) · 34 frames at 6 fps, 0.167 s apart · shrink, pull-back, push, fall

The title shrinks to a speck, then a huge close-up of the wrestlers pulls back to a wide of the ring. One drives the other to the edge and over the line; a cut to a low angle shows him falling backwards out of the ring, and the background drains to grey.

Motion: `▁▄▄▄▄▃▃▃▃▃█▇▆▆▄▃▂▂▁▃▄▃▄▄▃▅▅▇▇▆▆▆▄▄`

- 03:20.50 `motion/push-out/f-001.webp` ▁
- 03:20.67 `motion/push-out/f-002.webp` ▄
- 03:20.83 `motion/push-out/f-003.webp` ▄
- 03:21.00 `motion/push-out/f-004.webp` ▄
- 03:21.17 `motion/push-out/f-005.webp` ▄
- 03:21.33 `motion/push-out/f-006.webp` ▃
- 03:21.50 `motion/push-out/f-007.webp` ▃
- 03:21.67 `motion/push-out/f-008.webp` ▃
- 03:21.83 `motion/push-out/f-009.webp` ▃
- 03:22.00 `motion/push-out/f-010.webp` ▃
- 03:22.17 `motion/push-out/f-011.webp` █
- 03:22.33 `motion/push-out/f-012.webp` ▇
- 03:22.50 `motion/push-out/f-013.webp` ▆
- 03:22.67 `motion/push-out/f-014.webp` ▆
- 03:22.83 `motion/push-out/f-015.webp` ▄
- 03:23.00 `motion/push-out/f-016.webp` ▃
- 03:23.17 `motion/push-out/f-017.webp` ▂
- 03:23.33 `motion/push-out/f-018.webp` ▂
- 03:23.50 `motion/push-out/f-019.webp` ▁
- 03:23.67 `motion/push-out/f-020.webp` ▃
- 03:23.83 `motion/push-out/f-021.webp` ▄
- 03:24.00 `motion/push-out/f-022.webp` ▃
- 03:24.17 `motion/push-out/f-023.webp` ▄
- 03:24.33 `motion/push-out/f-024.webp` ▄
- 03:24.50 `motion/push-out/f-025.webp` ▃
- 03:24.67 `motion/push-out/f-026.webp` ▅
- 03:24.83 `motion/push-out/f-027.webp` ▅
- 03:25.00 `motion/push-out/f-028.webp` ▇
- 03:25.17 `motion/push-out/f-029.webp` ▇
- 03:25.33 `motion/push-out/f-030.webp` ▆
- 03:25.50 `motion/push-out/f-031.webp` ▆
- 03:25.67 `motion/push-out/f-032.webp` ▆
- 03:25.83 `motion/push-out/f-033.webp` ▄
- 03:26.00 `motion/push-out/f-034.webp` ▄

### 27. Falling, and gaining weight

03:25.75–03:30.00 (4.25 s) · 18 frames at 4 fps, 0.250 s apart · free fall, tumble, speed lines, morph

In a grey void he tumbles head over heels, speed lines streaking upward behind him. As he turns, his body grows heavier and his belt changes from red to gold: weight becoming an advantage, drawn mid-fall.

Motion: `▅▄▃▄▄▃▄▄▅▅▅▅▅▅▅▆▅▄`

Onion skin: `motion/fall/trail.webp`

- 03:25.75 `motion/fall/f-001.webp` ▅
- 03:26.00 `motion/fall/f-002.webp` ▄
- 03:26.25 `motion/fall/f-003.webp` ▃
- 03:26.50 `motion/fall/f-004.webp` ▄
- 03:26.75 `motion/fall/f-005.webp` ▄
- 03:27.00 `motion/fall/f-006.webp` ▃
- 03:27.25 `motion/fall/f-007.webp` ▄
- 03:27.50 `motion/fall/f-008.webp` ▄
- 03:27.75 `motion/fall/f-009.webp` ▅
- 03:28.00 `motion/fall/f-010.webp` ▅
- 03:28.25 `motion/fall/f-011.webp` ▅
- 03:28.50 `motion/fall/f-012.webp` ▅
- 03:28.75 `motion/fall/f-013.webp` ▅
- 03:29.00 `motion/fall/f-014.webp` ▅
- 03:29.25 `motion/fall/f-015.webp` ▅
- 03:29.50 `motion/fall/f-016.webp` ▆
- 03:29.75 `motion/fall/f-017.webp` ▅
- 03:30.00 `motion/fall/f-018.webp` ▄

### 28. It rains wrestlers

03:30.00–03:36.00 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · fall, crowd, color bars, rise-up

More wrestlers float down around him in mawashi of every color while flat colored bars flash across. Then torii gates, lanterns and fox statues rise from the bottom of the frame and fill it.

Motion: `▄▅▅▅▇▅▅█▅▅▆▇▅▅▅▅▅▅▅▅▅▅▅▄▃`

- 03:30.00 `motion/rain/f-001.webp` ▄
- 03:30.25 `motion/rain/f-002.webp` ▅
- 03:30.50 `motion/rain/f-003.webp` ▅
- 03:30.75 `motion/rain/f-004.webp` ▅
- 03:31.00 `motion/rain/f-005.webp` ▇
- 03:31.25 `motion/rain/f-006.webp` ▅
- 03:31.50 `motion/rain/f-007.webp` ▅
- 03:31.75 `motion/rain/f-008.webp` █
- 03:32.00 `motion/rain/f-009.webp` ▅
- 03:32.25 `motion/rain/f-010.webp` ▅
- 03:32.50 `motion/rain/f-011.webp` ▆
- 03:32.75 `motion/rain/f-012.webp` ▇
- 03:33.00 `motion/rain/f-013.webp` ▅
- 03:33.25 `motion/rain/f-014.webp` ▅
- 03:33.50 `motion/rain/f-015.webp` ▅
- 03:33.75 `motion/rain/f-016.webp` ▅
- 03:34.00 `motion/rain/f-017.webp` ▅
- 03:34.25 `motion/rain/f-018.webp` ▅
- 03:34.50 `motion/rain/f-019.webp` ▅
- 03:34.75 `motion/rain/f-020.webp` ▅
- 03:35.00 `motion/rain/f-021.webp` ▅
- 03:35.25 `motion/rain/f-022.webp` ▅
- 03:35.50 `motion/rain/f-023.webp` ▅
- 03:35.75 `motion/rain/f-024.webp` ▄
- 03:36.00 `motion/rain/f-025.webp` ▃

### 29. Through the torii

03:36.00–03:41.75 (5.75 s) · 24 frames at 4 fps, 0.250 s apart · fly-through, nested frames, tunnel

The shrine slides past and the camera flies through a torii, then another and another, each gate framing the next, until they become a green box corridor. Wrestlers are waiting at the far end.

Motion: `▃▂▂▂▂▅▆▆▆▇▆▆▆▆▇▇███████▇`

- 03:36.00 `motion/torii/f-001.webp` ▃
- 03:36.25 `motion/torii/f-002.webp` ▂
- 03:36.50 `motion/torii/f-003.webp` ▂
- 03:36.75 `motion/torii/f-004.webp` ▂
- 03:37.00 `motion/torii/f-005.webp` ▂
- 03:37.25 `motion/torii/f-006.webp` ▅
- 03:37.50 `motion/torii/f-007.webp` ▆
- 03:37.75 `motion/torii/f-008.webp` ▆
- 03:38.00 `motion/torii/f-009.webp` ▆
- 03:38.25 `motion/torii/f-010.webp` ▇
- 03:38.50 `motion/torii/f-011.webp` ▆
- 03:38.75 `motion/torii/f-012.webp` ▆
- 03:39.00 `motion/torii/f-013.webp` ▆
- 03:39.25 `motion/torii/f-014.webp` ▆
- 03:39.50 `motion/torii/f-015.webp` ▇
- 03:39.75 `motion/torii/f-016.webp` ▇
- 03:40.00 `motion/torii/f-017.webp` █
- 03:40.25 `motion/torii/f-018.webp` █
- 03:40.50 `motion/torii/f-019.webp` █
- 03:40.75 `motion/torii/f-020.webp` █
- 03:41.00 `motion/torii/f-021.webp` █
- 03:41.25 `motion/torii/f-022.webp` █
- 03:41.50 `motion/torii/f-023.webp` █
- 03:41.75 `motion/torii/f-024.webp` ▇

### 30. A ring of wrestlers

03:41.75–03:44.75 (3.00 s) · 13 frames at 4 fps, 0.250 s apart · rotation, loop, floating

Five wrestlers float in a ring holding hands and turn slowly on a dark ground, like figures in a dance. The ring rotates by about a quarter turn in three seconds, then one figure swings toward the camera and fills the frame.

Motion: `▇▅▆▅▆▅▆▅▆▅▆▆▇`

- 03:41.75 `motion/dance/f-001.webp` ▇
- 03:42.00 `motion/dance/f-002.webp` ▅
- 03:42.25 `motion/dance/f-003.webp` ▆
- 03:42.50 `motion/dance/f-004.webp` ▅
- 03:42.75 `motion/dance/f-005.webp` ▆
- 03:43.00 `motion/dance/f-006.webp` ▅
- 03:43.25 `motion/dance/f-007.webp` ▆
- 03:43.50 `motion/dance/f-008.webp` ▅
- 03:43.75 `motion/dance/f-009.webp` ▆
- 03:44.00 `motion/dance/f-010.webp` ▅
- 03:44.25 `motion/dance/f-011.webp` ▆
- 03:44.50 `motion/dance/f-012.webp` ▆
- 03:44.75 `motion/dance/f-013.webp` ▇

### 31. Back out of the tunnel

03:44.75–03:47.00 (2.25 s) · 19 frames at 8 fps, 0.125 s apart · pull-back, tunnel, reveal

A hand sweeps past the lens and the camera pulls back out through the green corridor to a single wrestler standing at its end, then cuts to him alone on the cream ground.

Motion: `█▇█▇█▇███▇█▇█▅▁▂▂▃▂`

- 03:44.75 `motion/back-out/f-001.webp` █
- 03:44.88 `motion/back-out/f-002.webp` ▇
- 03:45.00 `motion/back-out/f-003.webp` █
- 03:45.12 `motion/back-out/f-004.webp` ▇
- 03:45.25 `motion/back-out/f-005.webp` █
- 03:45.38 `motion/back-out/f-006.webp` ▇
- 03:45.50 `motion/back-out/f-007.webp` █
- 03:45.62 `motion/back-out/f-008.webp` █
- 03:45.75 `motion/back-out/f-009.webp` █
- 03:45.88 `motion/back-out/f-010.webp` ▇
- 03:46.00 `motion/back-out/f-011.webp` █
- 03:46.12 `motion/back-out/f-012.webp` ▇
- 03:46.25 `motion/back-out/f-013.webp` █
- 03:46.38 `motion/back-out/f-014.webp` ▅
- 03:46.50 `motion/back-out/f-015.webp` ▁
- 03:46.62 `motion/back-out/f-016.webp` ▂
- 03:46.75 `motion/back-out/f-017.webp` ▂
- 03:46.88 `motion/back-out/f-018.webp` ▃
- 03:47.00 `motion/back-out/f-019.webp` ▂

### 32. Rinsing with water

03:47.75–03:51.25 (3.50 s) · 15 frames at 4 fps, 0.250 s apart · gesture, hold

He lifts a small yellow ladle to his mouth, rinses, and holds the pose while the head bobs slightly. The ritual is shown as one gesture held long enough to read.

Motion: `▂▃▃▃▃▂▂▂▁▂▂▂▂▄▃`

Onion skin: `motion/rinse/trail.webp`

- 03:47.75 `motion/rinse/f-001.webp` ▂
- 03:48.00 `motion/rinse/f-002.webp` ▃
- 03:48.25 `motion/rinse/f-003.webp` ▃
- 03:48.50 `motion/rinse/f-004.webp` ▃
- 03:48.75 `motion/rinse/f-005.webp` ▃
- 03:49.00 `motion/rinse/f-006.webp` ▂
- 03:49.25 `motion/rinse/f-007.webp` ▂
- 03:49.50 `motion/rinse/f-008.webp` ▂
- 03:49.75 `motion/rinse/f-009.webp` ▁
- 03:50.00 `motion/rinse/f-010.webp` ▂
- 03:50.25 `motion/rinse/f-011.webp` ▂
- 03:50.50 `motion/rinse/f-012.webp` ▂
- 03:50.75 `motion/rinse/f-013.webp` ▂
- 03:51.00 `motion/rinse/f-014.webp` ▄
- 03:51.25 `motion/rinse/f-015.webp` ▃

### 33. The rope ties itself

04:09.75–04:16.00 (6.25 s) · 39 frames at 6 fps, 0.167 s apart · spotlights, snake, knot, flash

Pale spotlight bars sweep across as the wrestler turns. A thick white rope snakes in, wraps his waist and ties itself into the big loop at the back. Two helpers haul the ends in a glowing pull, and at 4:15.75 he stands in the finished yokozuna rope with zigzag paper streamers.

Motion: `▁▂▄▅▆▇▆▇▇▆▆▇▆▆▇▇▆▅▅▅▅▅▅▅▅▅▇▇▆▇▇▇▇▇▆▇▆▅▃`

- 04:09.75 `motion/yokozuna/f-001.webp` ▁
- 04:09.92 `motion/yokozuna/f-002.webp` ▂
- 04:10.08 `motion/yokozuna/f-003.webp` ▄
- 04:10.25 `motion/yokozuna/f-004.webp` ▅
- 04:10.42 `motion/yokozuna/f-005.webp` ▆
- 04:10.58 `motion/yokozuna/f-006.webp` ▇
- 04:10.75 `motion/yokozuna/f-007.webp` ▆
- 04:10.92 `motion/yokozuna/f-008.webp` ▇
- 04:11.08 `motion/yokozuna/f-009.webp` ▇
- 04:11.25 `motion/yokozuna/f-010.webp` ▆
- 04:11.42 `motion/yokozuna/f-011.webp` ▆
- 04:11.58 `motion/yokozuna/f-012.webp` ▇
- 04:11.75 `motion/yokozuna/f-013.webp` ▆
- 04:11.92 `motion/yokozuna/f-014.webp` ▆
- 04:12.08 `motion/yokozuna/f-015.webp` ▇
- 04:12.25 `motion/yokozuna/f-016.webp` ▇
- 04:12.42 `motion/yokozuna/f-017.webp` ▆
- 04:12.58 `motion/yokozuna/f-018.webp` ▅
- 04:12.75 `motion/yokozuna/f-019.webp` ▅
- 04:12.92 `motion/yokozuna/f-020.webp` ▅
- 04:13.08 `motion/yokozuna/f-021.webp` ▅
- 04:13.25 `motion/yokozuna/f-022.webp` ▅
- 04:13.42 `motion/yokozuna/f-023.webp` ▅
- 04:13.58 `motion/yokozuna/f-024.webp` ▅
- 04:13.75 `motion/yokozuna/f-025.webp` ▅
- 04:13.92 `motion/yokozuna/f-026.webp` ▅
- 04:14.08 `motion/yokozuna/f-027.webp` ▇
- 04:14.25 `motion/yokozuna/f-028.webp` ▇
- 04:14.42 `motion/yokozuna/f-029.webp` ▆
- 04:14.58 `motion/yokozuna/f-030.webp` ▇
- 04:14.75 `motion/yokozuna/f-031.webp` ▇
- 04:14.92 `motion/yokozuna/f-032.webp` ▇
- 04:15.08 `motion/yokozuna/f-033.webp` ▇
- 04:15.25 `motion/yokozuna/f-034.webp` ▇
- 04:15.42 `motion/yokozuna/f-035.webp` ▆
- 04:15.58 `motion/yokozuna/f-036.webp` ▇
- 04:15.75 `motion/yokozuna/f-037.webp` ▆
- 04:15.92 `motion/yokozuna/f-038.webp` ▅
- 04:16.08 `motion/yokozuna/f-039.webp` ▃

### 34. Wrestlers become dolls

04:16.00–04:26.00 (10.00 s) · 21 frames at 2 fps, 0.500 s apart · morph, drop-in, stagger, grid floor

On a perspective grid floor he shrinks into a round, doll-like figure. The shōgun appears on a dais, and more dolls drop in at left and right with a small bounce, until a full row flanks him.

Motion: `▃▅▂▃▃▂▃▃▃▃▃▃▃▃▃▃▃▃▃▄▄`

- 04:16.00 `motion/dolls/f-001.webp` ▃
- 04:16.50 `motion/dolls/f-002.webp` ▅
- 04:17.00 `motion/dolls/f-003.webp` ▂
- 04:17.50 `motion/dolls/f-004.webp` ▃
- 04:18.00 `motion/dolls/f-005.webp` ▃
- 04:18.50 `motion/dolls/f-006.webp` ▂
- 04:19.00 `motion/dolls/f-007.webp` ▃
- 04:19.50 `motion/dolls/f-008.webp` ▃
- 04:20.00 `motion/dolls/f-009.webp` ▃
- 04:20.50 `motion/dolls/f-010.webp` ▃
- 04:21.00 `motion/dolls/f-011.webp` ▃
- 04:21.50 `motion/dolls/f-012.webp` ▃
- 04:22.00 `motion/dolls/f-013.webp` ▃
- 04:22.50 `motion/dolls/f-014.webp` ▃
- 04:23.00 `motion/dolls/f-015.webp` ▃
- 04:23.50 `motion/dolls/f-016.webp` ▃
- 04:24.00 `motion/dolls/f-017.webp` ▃
- 04:24.50 `motion/dolls/f-018.webp` ▃
- 04:25.00 `motion/dolls/f-019.webp` ▃
- 04:25.50 `motion/dolls/f-020.webp` ▄
- 04:26.00 `motion/dolls/f-021.webp` ▄

### 35. A hand lifts the shōgun away

04:29.25–04:34.00 (4.75 s) · 20 frames at 4 fps, 0.250 s apart · hand of god, lift, flash, tumble

A giant hand reaches in from the top, pinches the shōgun off his dais and lifts him out of frame. A pale yellow flash, then the dolls tumble loose in a grey void.

Motion: `▃▃▃▂▂▂▃▃▆▇█▄▅▅▅▅▄▄▅▄`

- 04:29.25 `motion/overthrow/f-001.webp` ▃
- 04:29.50 `motion/overthrow/f-002.webp` ▃
- 04:29.75 `motion/overthrow/f-003.webp` ▃
- 04:30.00 `motion/overthrow/f-004.webp` ▂
- 04:30.25 `motion/overthrow/f-005.webp` ▂
- 04:30.50 `motion/overthrow/f-006.webp` ▂
- 04:30.75 `motion/overthrow/f-007.webp` ▃
- 04:31.00 `motion/overthrow/f-008.webp` ▃
- 04:31.25 `motion/overthrow/f-009.webp` ▆
- 04:31.50 `motion/overthrow/f-010.webp` ▇
- 04:31.75 `motion/overthrow/f-011.webp` █
- 04:32.00 `motion/overthrow/f-012.webp` ▄
- 04:32.25 `motion/overthrow/f-013.webp` ▅
- 04:32.50 `motion/overthrow/f-014.webp` ▅
- 04:32.75 `motion/overthrow/f-015.webp` ▅
- 04:33.00 `motion/overthrow/f-016.webp` ▅
- 04:33.25 `motion/overthrow/f-017.webp` ▄
- 04:33.50 `motion/overthrow/f-018.webp` ▄
- 04:33.75 `motion/overthrow/f-019.webp` ▅
- 04:34.00 `motion/overthrow/f-020.webp` ▄

### 36. The arena rises

04:36.75–04:43.00 (6.25 s) · 20 frames at 3 fps, 0.333 s apart · rise-up, push-in, particles

Wrestlers pop up on a small ring and the stands of a modern arena rise up around them, the camera pushing in as the roof canopy drops into place. Confetti dots drift through.

Motion: `▇▃▅▅▅▅▆▅▄▄▃▃▄▄▄▄▃▃▃▄`

- 04:36.75 `motion/arena/f-001.webp` ▇
- 04:37.08 `motion/arena/f-002.webp` ▃
- 04:37.42 `motion/arena/f-003.webp` ▅
- 04:37.75 `motion/arena/f-004.webp` ▅
- 04:38.08 `motion/arena/f-005.webp` ▅
- 04:38.42 `motion/arena/f-006.webp` ▅
- 04:38.75 `motion/arena/f-007.webp` ▆
- 04:39.08 `motion/arena/f-008.webp` ▅
- 04:39.42 `motion/arena/f-009.webp` ▄
- 04:39.75 `motion/arena/f-010.webp` ▄
- 04:40.08 `motion/arena/f-011.webp` ▃
- 04:40.42 `motion/arena/f-012.webp` ▃
- 04:40.75 `motion/arena/f-013.webp` ▄
- 04:41.08 `motion/arena/f-014.webp` ▄
- 04:41.42 `motion/arena/f-015.webp` ▄
- 04:41.75 `motion/arena/f-016.webp` ▄
- 04:42.08 `motion/arena/f-017.webp` ▃
- 04:42.42 `motion/arena/f-018.webp` ▃
- 04:42.75 `motion/arena/f-019.webp` ▃
- 04:43.08 `motion/arena/f-020.webp` ▄

### 37. The arena is on TV

04:46.75–04:48.00 (1.25 s) · 11 frames at 8 fps, 0.125 s apart · pull-back, frame inside frame, reveal

The whole arena shrinks into a TV screen held up by a gloved hand with a remote. The scale jump reveals the broadcast in a quarter second.

Motion: `▄▇██▆▄▃▄▃▄▃`

- 04:46.75 `motion/tv/f-001.webp` ▄
- 04:46.88 `motion/tv/f-002.webp` ▇
- 04:47.00 `motion/tv/f-003.webp` █
- 04:47.12 `motion/tv/f-004.webp` █
- 04:47.25 `motion/tv/f-005.webp` ▆
- 04:47.38 `motion/tv/f-006.webp` ▄
- 04:47.50 `motion/tv/f-007.webp` ▃
- 04:47.62 `motion/tv/f-008.webp` ▄
- 04:47.75 `motion/tv/f-009.webp` ▃
- 04:47.88 `motion/tv/f-010.webp` ▄
- 04:48.00 `motion/tv/f-011.webp` ▃

### 38. Instant replay

04:50.75–04:57.00 (6.25 s) · 26 frames at 4 fps, 0.250 s apart · loop, rewind, prop swap

The remote becomes a referee's gunbai fan in the hand. On the screen the same throw plays, rewinds and plays again: a kick, a fall, back to standing, a kick, a fall.

Motion: `▄▅▆▅▄▄▄▄▅▄▄▄▄▄▄▅▄▄▄▄▄▅▄▄▄▆`

- 04:50.75 `motion/replay/f-001.webp` ▄
- 04:51.00 `motion/replay/f-002.webp` ▅
- 04:51.25 `motion/replay/f-003.webp` ▆
- 04:51.50 `motion/replay/f-004.webp` ▅
- 04:51.75 `motion/replay/f-005.webp` ▄
- 04:52.00 `motion/replay/f-006.webp` ▄
- 04:52.25 `motion/replay/f-007.webp` ▄
- 04:52.50 `motion/replay/f-008.webp` ▄
- 04:52.75 `motion/replay/f-009.webp` ▅
- 04:53.00 `motion/replay/f-010.webp` ▄
- 04:53.25 `motion/replay/f-011.webp` ▄
- 04:53.50 `motion/replay/f-012.webp` ▄
- 04:53.75 `motion/replay/f-013.webp` ▄
- 04:54.00 `motion/replay/f-014.webp` ▄
- 04:54.25 `motion/replay/f-015.webp` ▄
- 04:54.50 `motion/replay/f-016.webp` ▅
- 04:54.75 `motion/replay/f-017.webp` ▄
- 04:55.00 `motion/replay/f-018.webp` ▄
- 04:55.25 `motion/replay/f-019.webp` ▄
- 04:55.50 `motion/replay/f-020.webp` ▄
- 04:55.75 `motion/replay/f-021.webp` ▄
- 04:56.00 `motion/replay/f-022.webp` ▅
- 04:56.25 `motion/replay/f-023.webp` ▄
- 04:56.50 `motion/replay/f-024.webp` ▄
- 04:56.75 `motion/replay/f-025.webp` ▄
- 04:57.00 `motion/replay/f-026.webp` ▆

### 39. Sixty kilograms heavier

04:57.25–05:03.00 (5.75 s) · 24 frames at 4 fps, 0.250 s apart · inflate, pose, squash

A thin wrestler stands on a ring that rises under him. As he runs through the ritual poses his body balloons between drawings, belly swelling sideways, until he settles twice his width.

Motion: `▇▄▃▂▂▂▂▂▃▃▃▃▃▂▂▂▃▂▃▃▃▄▃▂`

- 04:57.25 `motion/weight/f-001.webp` ▇
- 04:57.50 `motion/weight/f-002.webp` ▄
- 04:57.75 `motion/weight/f-003.webp` ▃
- 04:58.00 `motion/weight/f-004.webp` ▂
- 04:58.25 `motion/weight/f-005.webp` ▂
- 04:58.50 `motion/weight/f-006.webp` ▂
- 04:58.75 `motion/weight/f-007.webp` ▂
- 04:59.00 `motion/weight/f-008.webp` ▂
- 04:59.25 `motion/weight/f-009.webp` ▃
- 04:59.50 `motion/weight/f-010.webp` ▃
- 04:59.75 `motion/weight/f-011.webp` ▃
- 05:00.00 `motion/weight/f-012.webp` ▃
- 05:00.25 `motion/weight/f-013.webp` ▃
- 05:00.50 `motion/weight/f-014.webp` ▂
- 05:00.75 `motion/weight/f-015.webp` ▂
- 05:01.00 `motion/weight/f-016.webp` ▂
- 05:01.25 `motion/weight/f-017.webp` ▃
- 05:01.50 `motion/weight/f-018.webp` ▂
- 05:01.75 `motion/weight/f-019.webp` ▃
- 05:02.00 `motion/weight/f-020.webp` ▃
- 05:02.25 `motion/weight/f-021.webp` ▃
- 05:02.50 `motion/weight/f-022.webp` ▄
- 05:02.75 `motion/weight/f-023.webp` ▃
- 05:03.00 `motion/weight/f-024.webp` ▂

### 40. A scroll unrolls into the end card

05:20.75–05:22.00 (1.25 s) · 11 frames at 8 fps, 0.125 s apart · unroll, wipe, map

A white sheet covers the arena, its rolled edge unrolls, and a red-and-white illustrated map of castles and roads on a grid pops on piece by piece in under half a second.

Motion: `▅▅▅▅█▆▅▆▄▄▄`

- 05:20.75 `motion/unroll/f-001.webp` ▅
- 05:20.88 `motion/unroll/f-002.webp` ▅
- 05:21.00 `motion/unroll/f-003.webp` ▅
- 05:21.12 `motion/unroll/f-004.webp` ▅
- 05:21.25 `motion/unroll/f-005.webp` █
- 05:21.38 `motion/unroll/f-006.webp` ▆
- 05:21.50 `motion/unroll/f-007.webp` ▅
- 05:21.62 `motion/unroll/f-008.webp` ▆
- 05:21.75 `motion/unroll/f-009.webp` ▄
- 05:21.88 `motion/unroll/f-010.webp` ▄
- 05:22.00 `motion/unroll/f-011.webp` ▄

### 41. Castles become a city

05:27.50–05:30.00 (2.50 s) · 16 frames at 6 fps, 0.167 s apart · morph, pop, time passing

As the credits slide up, the castles on the map flicker and rebuild as modern blocks and towers, and the smoking steam engine on the road turns into a car. Even the credit card shows history changing.

Motion: `▃▂▃▃▃▂▅▅▄▇▅▃▂▁▁▂`

- 05:27.50 `motion/castles/f-001.webp` ▃
- 05:27.67 `motion/castles/f-002.webp` ▂
- 05:27.83 `motion/castles/f-003.webp` ▃
- 05:28.00 `motion/castles/f-004.webp` ▃
- 05:28.17 `motion/castles/f-005.webp` ▃
- 05:28.33 `motion/castles/f-006.webp` ▂
- 05:28.50 `motion/castles/f-007.webp` ▅
- 05:28.67 `motion/castles/f-008.webp` ▅
- 05:28.83 `motion/castles/f-009.webp` ▄
- 05:29.00 `motion/castles/f-010.webp` ▇
- 05:29.17 `motion/castles/f-011.webp` ▅
- 05:29.33 `motion/castles/f-012.webp` ▃
- 05:29.50 `motion/castles/f-013.webp` ▂
- 05:29.67 `motion/castles/f-014.webp` ▁
- 05:29.83 `motion/castles/f-015.webp` ▁
- 05:30.00 `motion/castles/f-016.webp` ▂

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:02.00 `seconds/second-00003.webp` A quote card in thin grey type: 'The object in sumo is simple: knock your opponent out of the circle or down to the ground.' The circle is the film's thesis.
- 00:07.00 `seconds/second-00008.webp` Opening map: Japan as one flat yellow shape over a teal-to-coral gradient, pink cloud bands drifting. The palette for the whole film.
- 00:12.00 `seconds/second-00013.webp` Straight down onto a street: a wrestler's topknot, the crowd as heads with hats. Flat ukiyo-e color with clean, even line.
- 00:16.00 `seconds/second-00017.webp` Two pros from the Tokyo guild in dark jackets, arms folded. Even faces and weight, no shading, just line and fill.
- 00:21.00 `seconds/second-00022.webp` Their backs to us, 東京 and 相撲 across the jackets. Type is carried by costume, not captions.
- 00:29.00 `seconds/second-00030.webp` After the slash: one pro down, the other clutching his head. The violence is implied by a cut.
- 00:35.00 `seconds/second-00036.webp` A one-point road to the horizon, the runner centered. The film loves symmetrical, locked-off frames.
- 00:43.00 `seconds/second-00044.webp` He reaches the magistrate's house, which rose from the horizon to fill the frame.
- 00:51.00 `seconds/second-00052.webp` The magistrate lifts his decree, framed symmetrically between teal sayagata panels.
- 00:55.00 `seconds/second-00056.webp` A lone wrestler on a blank cream ground, arms raised. The ritual is staged with nothing around it.
- 01:02.00 `seconds/second-00063.webp` Mid-stomp, leg high, body tilted: the strongest pose in the film's animation.
- 01:07.00 `seconds/second-00068.webp` Petals dissolve the wrestler. Particles carry the transition from Edo back to the imperial court.
- 01:13.00 `seconds/second-00074.webp` The emperor on his red-railed platform under a coral sky, petals falling.
- 01:19.00 `seconds/second-00080.webp` The wrestlers flank the emperor in profile, a frieze composition.
- 01:27.00 `seconds/second-00088.webp` The throw: one wrestler upended in a high arc while the emperor watches, unmoved.
- 01:31.00 `seconds/second-00092.webp` A close two-shot as they clash, the only close framing in the court scene.
- 01:38.00 `seconds/second-00099.webp` Inside a tunnel of flat colored planes, the perspective built from trapezoids.
- 01:41.00 `seconds/second-00102.webp` The samurai helmet as a character, pink face, white moustache, gold crest.
- 01:45.00 `seconds/second-00106.webp` Its turnaround: the helmet seen from the back.
- 01:49.00 `seconds/second-00110.webp` Two wrestlers on a black hill silhouette, the sky shifting to teal.
- 01:57.00 `seconds/second-00118.webp` The collage: a boat, a bridge, cherry trees and a giant blue Buddha in overlapping layers.
- 02:01.00 `seconds/second-00122.webp` Fuji, a temple, cranes and wrestlers in one stacked ukiyo-e composition.
- 02:07.00 `seconds/second-00128.webp` A torii and offering box alone on the gradient, coins falling in: sumo as fundraising.
- 02:16.00 `seconds/second-00137.webp` The wrestler steps into a spinning sunburst of coral, teal and cream wedges.
- 02:22.00 `seconds/second-00143.webp` The guild hall on a pink-to-lime gradient, 相撲会所 on its front.
- 02:32.00 `seconds/second-00153.webp` The queue of customers stretches across frame, each figure a different costume.
- 02:36.00 `seconds/second-00157.webp` Street-corner sumo between shopfronts, spectators at the edges.
- 02:46.00 `seconds/second-00167.webp` A cartoon dust cloud with stars, the brawl drawn as a gag.
- 02:56.00 `seconds/second-00177.webp` Red crosses spread across the map: bans in the cities.
- 03:05.00 `seconds/second-00186.webp` The boundary drawn in as a single ellipse around the crouching pair.
- 03:11.00 `seconds/second-00192.webp` Top-down, the boundary mid-morph: the rule is still being decided.
- 03:16.00 `seconds/second-00197.webp` 土俵 / DOHYO, white on the gradient, the film's one title card.
- 03:26.00 `seconds/second-00207.webp` Falling backwards out of the ring into grey.
- 03:29.00 `seconds/second-00210.webp` Mid-fall, he gets heavier: belt now gold, body rounder.
- 03:34.00 `seconds/second-00215.webp` Torii, lanterns and fox statues rising out of the dark.
- 03:42.00 `seconds/second-00223.webp` Five wrestlers in a floating ring of held hands.
- 03:49.00 `seconds/second-00230.webp` Rinsing with the ladle, one gesture held.
- 03:54.00 `seconds/second-00235.webp` The ritual again: the exact animation from 0:54 reused, now as an invented tradition.
- 04:15.00 `seconds/second-00256.webp` The rope pulled tight by two helpers in a glowing burst.
- 04:16.00 `seconds/second-00257.webp` The finished yokozuna, zigzag streamers at his waist, on a perspective grid.
- 04:24.00 `seconds/second-00265.webp` A full court of doll-wrestlers flanking the shōgun on his dais.
- 04:30.00 `seconds/second-00271.webp` A giant hand pinches the shōgun off his dais: 1868 as a gesture.
- 04:41.00 `seconds/second-00282.webp` The modern arena, stands rising around a small ring.
- 04:52.00 `seconds/second-00293.webp` The bout on a TV screen, a gunbai fan held in front.
- 05:00.00 `seconds/second-00301.webp` The thin wrestler mid-inflation, belly swelling sideways.
- 05:18.00 `seconds/second-00319.webp` Banners and portraits at the top of the arena, the end of a long tilt up.
- 05:23.00 `seconds/second-00324.webp` End card: a red-and-white map of castles and roads on a grid.
