# Motion notes: Starship - Go For Orbit

SpaceX · 21:10.36 · https://www.youtube.com/watch?v=8ySMdUIF3cY

There is no motion design worth studying here beyond a plain title fade and one restrained lower-third system. The movement that matters is the camera and the cut working for scale: a booster's engine ring rising into frame, a ship's nose climbing through a dawn horizon, a twenty-second pull-back from one heat tile to the whole stack, a montage of earlier flights that slows as it reaches the present, and a splashdown filmed from the water.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▁▁▁▂▂▂▂▂▁▁▁▅▅▂▂▂▂▁▁▂▂▆▆▄▃▂▅▆▄▄▅▅▄▄▅▄▅▂▂▄▃▄▃▅▂▃▃▂▅▂▃▃▃▃▃▃▄▄▄▂
01:00  ▂▄▁▁▄▁▄▅▅▆▃▂▁▂▃▁▁▁▂▂▂▁▄▂▂▅▅▅▆▆▆▇▇▆▆▅▅▅▅▄▆▅▃▅▅▆▅▅▅▄▂▂▄▁▁▁▅▂▂▄
02:00  ▁▁▁▁▁▁▁▁▁▁▁▁▅▁▁▁▁▁▁▁▂▃▃▅▂▂▂▄▂▃▂▄▃▄▂▂▂▃▂▅▅▄▃▃▂▂▂▂▅▂▂▃▄▄▅▄▄▃▄▃
03:00  ▃▃▃▃▃▄▅▄▄▄▄▄▃▂▁▂▂▄▄▄▅▅▄▄▁▂▂▄▃▃▃▄▃▄▄▂▂▂▄▃▃▂▂▃▄▄▁▁▃▂▃▄▅▅▅▄▄▄▄▄
04:00  ▄▃▃▃▃▃▃▂▄▂▂▄▂▅▁▁▁▁▁▁▂▂▂▃▃▄▃▃▃▃▅▁▁▁▁▄▅▅▅▅▄▆▆▆▆▆▇▆▁▁▄▁▁▄▃▃▄▅▃▄
05:00  ▃▅▄▄▂▂▃▄▃▃▃▅▂▂▂▂▄▃▂▂▄▁▂▂▂▂▁▁▁▁▄▁▁▂▁▁▁▁▁▃▂▂▁▃▄▅▅▄▅▄▄▃▅▃▃▄▄▃▃▃
06:00  ▄▂▃▆▅▃▂▄▃▄▄▄▄▃▂▂▂▄▂▂▂▂▅▅▅▅▆▆▆▆▆▆▆▄▅▄▅▅▅▆▇▅▅▄▅▅▅▆▇▅▃▄▃▂▂▅▅▆▆▄
07:00  ▅▅▃▂▃▅▅▅▆▅▄▁▄▃▁▄▁▄▁▁▄▃▄▄▁▁▅▃▃▄▃▄▁▁▄▁▄▁▁▄▃▃▃▃▅▄▄▂▄▃▂▄▃▄▆█▆▆▅▄
08:00  ▅▅▅▄▅▃▃▁▁▁▄▁▁▄▁▄▅▄▁▁▆▄▅▅▆▄▃▄▅▅▆▁▁▁▁▁▆▇▆▅▆▅▅▅▆▇▅▄▃▄▅▅▄▄▄▂▂▂▂▂
09:00  ▂▂▂▂▄▆▄▂▂▂▁▁▁▁▁▁▁▁▁▄▃▄▃▅▅▃▃▄▅▄▄▃▄▂▂▁▅▅▅▅▅▅▄▃▂▃▃▄▂▂▂▂▂▄▄▂▄▂▂▄
10:00  ▂▂▃▄▂▂▄▄▃▄▂▂▂▄▁▁▁▁▁▂▁▂▂▁▂▂▂▅▃▂▂▄▁▁▁▁▁▁▁▄▂▂▂▂▂▁▁▁▁▅▂▄▄▄▃▃▃▅▄▄
11:00  ▄▄▄▄▄▄▄▅▃▃▃▄▂▁▃▂▂▄▂▄▅▅▄▄▁▃▄▄▅▅▄▅▅▄▅▄▅▆▆▅▆▅▄▄▃▄▄▅▃▄▄▄▂▄▃▅▃▄▁▁
12:00  ▁▄▅▄▅▄▅▃▃▄▅▂▂▂▄▄▃▃▃▃▃▃▄▂▄▂▁▁▁▁▁▅▁▁▅▆▃▂▁▅▃▄▃▄▅▄▃▅▅▇▇▁▁▁▁▁▁▁▁▁
13:00  ▁▅▅▄▆▇▆▅▄▄▅▄▄▅▅▄▅▄▅▅▄▃▃▅▄▄▅▄▄▅▅▄▃▃▃▅▇▆▅▆▅▆▅▄▄▅▄▃▄▃▄▄▅▄▂▁▁▁▁▁
14:00  ▂▂▃▃▃▃▃▃▃▃▃▄▃▅▅▃▆▃▄▂▁▄▃▂▂▂▅▅▆▄▄▄▄▃▄▅▅▆▅▇▇▇▆▄▆▆▅▄▅▅▅▄▅▆▅▆▄▆▅▅
15:00  ▄▄▂▂▂▂▄▃▄▆▃▃▃▃▃▃▃▂▄▁▁▁▃▂▁▁▃▆▆▃▅▁▁▁▂▃▄▅▄▅▂▂▁▄▁▁▅▅▅▅▅▃▄▄▄▄▃▃▃▅
16:00  ▄▄▄▃▃▃▂▅▄▄▅▄▃▄▅▃▃▅▅▆▃▃▄▂▂▂▄▄▃▄▃▄▂▂▄▅▅▄▄▅▃▅▂▄▄▅▄▄▄▄▃▂▂▂▂▅▆▆▅▄
17:00  ▅▄▄▄▄▃▅▄▃▃▄▂▂▄▂▃▄▄▅▄▄▄▄▄▄▄▂▂▂▅▄▄▄▄▅▂▂▂▂▂▂▄▅▅▆▁▄▂▂▄▁▁▁▁▁▁▅▄▄▃
18:00  ▄▃▃▃▂▂▂▃▂▂▂▃▁▁▆▅▅▅▅▄▄▅▆▅▅▃▄▃▂▁▅▃▃▄▆▅▅▄▅▄▄▄▄▂▃▃▄▅▃▃▄▄▂▄▃▃▄▂▄▃
19:00  ▃▄▃▅▅▄▃▂▃▄▅▃▅▄▄▃▃▄▂▃▆▃▂▃▁▃▃▂▅▃▃▅▃▄▄▄▄▆▅▅▅▃▅▆▆▆▆▅▇▆▆▆▆▇▅▅▅▃▂▂
20:00  ▄▄▃▄▃▅█▇▆▆▅▆▆▅▅▆▅▄▄▃▄▄▄▅▄▄▅▇▄▆▇▃▃▃▃▄▃▄▂▂▄▁▁▁▂▂▂▄▄▅▅▅▅▃▃▃▄▄▃▄
21:00  ▄▄▃▂▂▂▂▅▁▁▁
```

## Sequences

### 01. The engine ring climbs into frame

00:48.20–00:56.20 (8.00 s) · 25 frames at 3 fps, 0.333 s apart · reveal from below, slow rise, lower third, flash-forward

The shot opens on brown smoke with only the tops of a few lit bells at the bottom edge. Over about four seconds the booster's base rises into frame until, by 52, the full ring and the inner engines fill the lower half, exhaust streaming purple below. At about 53 'FLIGHT 14' fades up at lower right and the date line follows under a hairline rule. The vehicle is introduced by its engines, from beneath, and only partly: the frame is never wide enough to hold it.

Motion: `▇▂▂▂▂▂▂▃▃▃▃▃▃▃▃▃▃▃▄▃▃▃▃▄▄`

- 00:48.20 `motion/engine-ring/f-001.webp` ▇
- 00:48.53 `motion/engine-ring/f-002.webp` ▂
- 00:48.87 `motion/engine-ring/f-003.webp` ▂
- 00:49.20 `motion/engine-ring/f-004.webp` ▂
- 00:49.53 `motion/engine-ring/f-005.webp` ▂
- 00:49.87 `motion/engine-ring/f-006.webp` ▂
- 00:50.20 `motion/engine-ring/f-007.webp` ▂
- 00:50.53 `motion/engine-ring/f-008.webp` ▃
- 00:50.87 `motion/engine-ring/f-009.webp` ▃
- 00:51.20 `motion/engine-ring/f-010.webp` ▃
- 00:51.53 `motion/engine-ring/f-011.webp` ▃
- 00:51.87 `motion/engine-ring/f-012.webp` ▃
- 00:52.20 `motion/engine-ring/f-013.webp` ▃
- 00:52.53 `motion/engine-ring/f-014.webp` ▃
- 00:52.87 `motion/engine-ring/f-015.webp` ▃
- 00:53.20 `motion/engine-ring/f-016.webp` ▃
- 00:53.53 `motion/engine-ring/f-017.webp` ▃
- 00:53.87 `motion/engine-ring/f-018.webp` ▃
- 00:54.20 `motion/engine-ring/f-019.webp` ▄
- 00:54.53 `motion/engine-ring/f-020.webp` ▃
- 00:54.87 `motion/engine-ring/f-021.webp` ▃
- 00:55.20 `motion/engine-ring/f-022.webp` ▃
- 00:55.53 `motion/engine-ring/f-023.webp` ▃
- 00:55.87 `motion/engine-ring/f-024.webp` ▄
- 00:56.20 `motion/engine-ring/f-025.webp` ▄

### 02. A ship's nose rises through the horizon

02:13.00–02:21.00 (8.00 s) · 25 frames at 3 fps, 0.333 s apart · drone descent, silhouette, dawn, reveal

Straight after the title, a level frame of dawn over flat water and mudflats holds empty for a second and a half. At about 134.5 the tip of the ship's nose appears at the bottom edge, and as the camera sinks it rises slowly, a forward flap following at about 137, until by 139 the tip has passed the horizon and by 141 the nose stands above it, black against the pink sky. The move is slow and even, with no cut. The vehicle is measured against the landscape before anyone explains it.

Motion: `▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▂▃▃`

- 02:13.00 `motion/nose-through-horizon/f-001.webp` ▁
- 02:13.33 `motion/nose-through-horizon/f-002.webp` ▁
- 02:13.67 `motion/nose-through-horizon/f-003.webp` ▁
- 02:14.00 `motion/nose-through-horizon/f-004.webp` ▁
- 02:14.33 `motion/nose-through-horizon/f-005.webp` ▁
- 02:14.67 `motion/nose-through-horizon/f-006.webp` ▁
- 02:15.00 `motion/nose-through-horizon/f-007.webp` ▁
- 02:15.33 `motion/nose-through-horizon/f-008.webp` ▁
- 02:15.67 `motion/nose-through-horizon/f-009.webp` ▁
- 02:16.00 `motion/nose-through-horizon/f-010.webp` ▁
- 02:16.33 `motion/nose-through-horizon/f-011.webp` ▁
- 02:16.67 `motion/nose-through-horizon/f-012.webp` ▁
- 02:17.00 `motion/nose-through-horizon/f-013.webp` ▁
- 02:17.33 `motion/nose-through-horizon/f-014.webp` ▁
- 02:17.67 `motion/nose-through-horizon/f-015.webp` ▁
- 02:18.00 `motion/nose-through-horizon/f-016.webp` ▁
- 02:18.33 `motion/nose-through-horizon/f-017.webp` ▁
- 02:18.67 `motion/nose-through-horizon/f-018.webp` ▁
- 02:19.00 `motion/nose-through-horizon/f-019.webp` ▁
- 02:19.33 `motion/nose-through-horizon/f-020.webp` ▁
- 02:19.67 `motion/nose-through-horizon/f-021.webp` ▁
- 02:20.00 `motion/nose-through-horizon/f-022.webp` ▂
- 02:20.33 `motion/nose-through-horizon/f-023.webp` ▂
- 02:20.67 `motion/nose-through-horizon/f-024.webp` ▃
- 02:21.00 `motion/nose-through-horizon/f-025.webp` ▃

### 03. From one tile to the whole stack

03:48.40–03:56.40 (8.00 s) · 25 frames at 3 fps, 0.333 s apart · pull-back, crane down, unbroken take, unit of scale

The shot opens on a wall of black hexagonal tiles with one bare tile at the center, the tile the film has just spent a minute on. The camera pulls back and starts to descend: by 232.6 the bottom edge of the ship's tiled skirt enters, at 233.3 the steel structure below it appears, and by 236 the sea and the tower are in frame and the tile is a speck. The take does not cut; it keeps sinking down the booster until 248, with vents starting to steam. A thing you could hold in two hands becomes the unit you measure the rocket by.

Motion: `▂▂▂▂▃▃▃▃▄▄▄▄▅▅▅▅▅▅▅▅▅▄▄▄▄`

- 03:48.40 `motion/tile-to-stack/f-001.webp` ▂
- 03:48.73 `motion/tile-to-stack/f-002.webp` ▂
- 03:49.07 `motion/tile-to-stack/f-003.webp` ▂
- 03:49.40 `motion/tile-to-stack/f-004.webp` ▂
- 03:49.73 `motion/tile-to-stack/f-005.webp` ▃
- 03:50.07 `motion/tile-to-stack/f-006.webp` ▃
- 03:50.40 `motion/tile-to-stack/f-007.webp` ▃
- 03:50.73 `motion/tile-to-stack/f-008.webp` ▃
- 03:51.07 `motion/tile-to-stack/f-009.webp` ▄
- 03:51.40 `motion/tile-to-stack/f-010.webp` ▄
- 03:51.73 `motion/tile-to-stack/f-011.webp` ▄
- 03:52.07 `motion/tile-to-stack/f-012.webp` ▄
- 03:52.40 `motion/tile-to-stack/f-013.webp` ▅
- 03:52.73 `motion/tile-to-stack/f-014.webp` ▅
- 03:53.07 `motion/tile-to-stack/f-015.webp` ▅
- 03:53.40 `motion/tile-to-stack/f-016.webp` ▅
- 03:53.73 `motion/tile-to-stack/f-017.webp` ▅
- 03:54.07 `motion/tile-to-stack/f-018.webp` ▅
- 03:54.40 `motion/tile-to-stack/f-019.webp` ▅
- 03:54.73 `motion/tile-to-stack/f-020.webp` ▅
- 03:55.07 `motion/tile-to-stack/f-021.webp` ▅
- 03:55.40 `motion/tile-to-stack/f-022.webp` ▄
- 03:55.73 `motion/tile-to-stack/f-023.webp` ▄
- 03:56.07 `motion/tile-to-stack/f-024.webp` ▄
- 03:56.40 `motion/tile-to-stack/f-025.webp` ▄

### 04. A montage of earlier flights that slows down

20:05.50–20:13.50 (8.00 s) · 33 frames at 4 fps, 0.250 s apart · montage, flicker cuts, decelerating, archive

Out of the onboard engine bay at about 1206.1, the film cuts several times in under a second, then settles into shots of 0.6 to 0.8 s: what look like earlier test flights: fire at the base of a vehicle on the pad, a fireball in the sky, a falling ship trailing smoke, a cheering crowd under a hanging vehicle, a booster's engines lit as it comes down, a booster descending to the tower at sunset. The shots lengthen as the montage nears the present, to about a second by 1217 and three seconds after that. It plays under 'a handful of unique decision points', so the past arrives as a blur and slows down to land on this flight.

Motion: `▅▃██████▅▅▆▄▇▂▂▇▆▆▆▂▂▆▆▆▇▅▆▆▇▂▂▂▇`

- 20:05.50 `motion/history-montage/f-001.webp` ▅
- 20:05.75 `motion/history-montage/f-002.webp` ▃
- 20:06.00 `motion/history-montage/f-003.webp` █
- 20:06.25 `motion/history-montage/f-004.webp` █
- 20:06.50 `motion/history-montage/f-005.webp` █
- 20:06.75 `motion/history-montage/f-006.webp` █
- 20:07.00 `motion/history-montage/f-007.webp` █
- 20:07.25 `motion/history-montage/f-008.webp` █
- 20:07.50 `motion/history-montage/f-009.webp` ▅
- 20:07.75 `motion/history-montage/f-010.webp` ▅
- 20:08.00 `motion/history-montage/f-011.webp` ▆
- 20:08.25 `motion/history-montage/f-012.webp` ▄
- 20:08.50 `motion/history-montage/f-013.webp` ▇
- 20:08.75 `motion/history-montage/f-014.webp` ▂
- 20:09.00 `motion/history-montage/f-015.webp` ▂
- 20:09.25 `motion/history-montage/f-016.webp` ▇
- 20:09.50 `motion/history-montage/f-017.webp` ▆
- 20:09.75 `motion/history-montage/f-018.webp` ▆
- 20:10.00 `motion/history-montage/f-019.webp` ▆
- 20:10.25 `motion/history-montage/f-020.webp` ▂
- 20:10.50 `motion/history-montage/f-021.webp` ▂
- 20:10.75 `motion/history-montage/f-022.webp` ▆
- 20:11.00 `motion/history-montage/f-023.webp` ▆
- 20:11.25 `motion/history-montage/f-024.webp` ▆
- 20:11.50 `motion/history-montage/f-025.webp` ▇
- 20:11.75 `motion/history-montage/f-026.webp` ▅
- 20:12.00 `motion/history-montage/f-027.webp` ▆
- 20:12.25 `motion/history-montage/f-028.webp` ▆
- 20:12.50 `motion/history-montage/f-029.webp` ▇
- 20:12.75 `motion/history-montage/f-030.webp` ▂
- 20:13.00 `motion/history-montage/f-031.webp` ▂
- 20:13.25 `motion/history-montage/f-032.webp` ▂
- 20:13.50 `motion/history-montage/f-033.webp` ▇

### 05. Splashdown from the water

20:51.30–20:59.30 (8.00 s) · 25 frames at 3 fps, 0.333 s apart · water level, lens flare, steam bank, coda

A close shot holds the ship on a bright plume over grey sea, tilting upright. At 1252.9 it cuts to a camera at water level facing the sunset: the ship is small under a dark cloud, descending on its engines, and lens flares bloom as it nears the horizon. At about 1257.5 the plume reaches the water and a bank of steam rolls right across the frame until it swallows the picture, then black at 1260. It is the biggest event of the mission's end, and the film gives it eight seconds with no cheering.

Motion: `▄▃▃▄▆▃▃▃▃▄▃▃▃▃▃▄▄▃▄▃▃▃▃▄▄`

- 20:51.30 `motion/splashdown/f-001.webp` ▄
- 20:51.63 `motion/splashdown/f-002.webp` ▃
- 20:51.97 `motion/splashdown/f-003.webp` ▃
- 20:52.30 `motion/splashdown/f-004.webp` ▄
- 20:52.63 `motion/splashdown/f-005.webp` ▆
- 20:52.97 `motion/splashdown/f-006.webp` ▃
- 20:53.30 `motion/splashdown/f-007.webp` ▃
- 20:53.63 `motion/splashdown/f-008.webp` ▃
- 20:53.97 `motion/splashdown/f-009.webp` ▃
- 20:54.30 `motion/splashdown/f-010.webp` ▄
- 20:54.63 `motion/splashdown/f-011.webp` ▃
- 20:54.97 `motion/splashdown/f-012.webp` ▃
- 20:55.30 `motion/splashdown/f-013.webp` ▃
- 20:55.63 `motion/splashdown/f-014.webp` ▃
- 20:55.97 `motion/splashdown/f-015.webp` ▃
- 20:56.30 `motion/splashdown/f-016.webp` ▄
- 20:56.63 `motion/splashdown/f-017.webp` ▄
- 20:56.97 `motion/splashdown/f-018.webp` ▃
- 20:57.30 `motion/splashdown/f-019.webp` ▄
- 20:57.63 `motion/splashdown/f-020.webp` ▃
- 20:57.97 `motion/splashdown/f-021.webp` ▃
- 20:58.30 `motion/splashdown/f-022.webp` ▃
- 20:58.63 `motion/splashdown/f-023.webp` ▃
- 20:58.97 `motion/splashdown/f-024.webp` ▄
- 20:59.30 `motion/splashdown/f-025.webp` ▄

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Cold open in near darkness: a black wall and a door edge. The film starts by withholding the picture.
- 00:07.00 `seconds/second-00008.webp` A glowing engine part on a furnace stand, orange light on red walls. The first image of Raptor is something being made, not something flying.
- 00:13.00 `seconds/second-00014.webp` A pale printed part hangs from a robot arm inside a round chamber. The voice calls Raptor 'one of the most impressive feats of engineering' over the factory, not over a launch.
- 00:43.00 `seconds/second-00044.webp` A furnace door open on white-hot parts. The line ends on 'pretty scary', the cold open's thesis.
- 00:52.00 `seconds/second-00053.webp` The booster's engine ring climbs into frame through brown smoke, every bell lit. The camera finds the vehicle from underneath.
- 00:55.00 `seconds/second-00056.webp` 'FLIGHT 14 / September 28, 2026 | First orbital mission' set small at lower right: bold wide caps, a hairline rule, letterspaced small caps. The same lower-third system names every person and place.
- 01:02.00 `seconds/second-00063.webp` An onboard camera looks along the ship's skin at the curve of the Earth, the sun flaring. The scale jumps from shop floor to orbit in one cut.
- 01:08.00 `seconds/second-00069.webp` The onboard feed tears into orange horizontal streaks for about a second. The signal breakup is kept, not cleaned.
- 01:15.00 `seconds/second-00076.webp` The ship's flap against the blue limb of the Earth: the reference image the film returns to whenever it needs to say 'orbit'.
- 01:26.00 `seconds/second-00087.webp` Monitors in mission control show the same magenta engine-bay feed. The cut carries the picture from the vehicle into the room.
- 01:35.00 `seconds/second-00096.webp` A controller with a hand at her ear, half her face in shadow. The anomaly is told in faces before the call comes.
- 01:50.00 `seconds/second-00111.webp` Two men in caps lean toward a screen as the loop says 'we are not committing to orbit'. The setback lands on reactions, not on a graphic.
- 01:52.00 `seconds/second-00113.webp` The towers seen small through the control room window, controllers' desks in the foreground. People and vehicle share one frame, miles apart.
- 02:05.00 `seconds/second-00126.webp` Title: 'STARSHIP' resolves letter by letter in thin, wide-spaced caps over the ship in orbit, then gives way to 'GO FOR ORBIT'. A plain fade, held long.
- 02:16.00 `seconds/second-00137.webp` Dawn over flat water, then the ship's nose rises into frame and through the horizon. The first full view of the vehicle is a silhouette measured against the land.
- 02:29.00 `seconds/second-00150.webp` Jeremy Pedro, Director, Starship Engineering, framed mid-shot with ship hardware behind him. Every interview is staged in front of the work.
- 02:50.00 `seconds/second-00171.webp` Lars Blackmore, Sr. Principal Mars Landing Engineer, outdoors against a white factory wall: 'We're trying to make something that's a rocket, but that can act like a spacecraft.'
- 02:54.00 `seconds/second-00175.webp` A static fire seen from straight above, the vehicle's base in a pool of fire. It leads into the line about a ship that can 'come safely out of orbit and survive'.
- 03:38.00 `seconds/second-00219.webp` A technician presses a bare, silvery tile into a wall of black ones. 'Refly them on 41.'
- 03:48.00 `seconds/second-00229.webp` Start of an unbroken twenty-second shot: one bare tile in a field of black hexagons, filling the frame.
- 03:56.00 `seconds/second-00237.webp` The same shot, pulled back and down: the tile is a speck on the ship's skirt, the booster's steel and the sea now in frame.
- 04:07.00 `seconds/second-00248.webp` The shot ends on the booster beside the tower, venting white. The pull-back has gone from a hand's width to the whole stack.
- 04:17.00 `seconds/second-00258.webp` The tower fades up from black as a column of lights in the dark. Near silence except for loop calls.
- 04:23.00 `seconds/second-00264.webp` 'FLIGHT 14 / 7:22 AM | Launch day' over the pad at first light, palms in silhouette. Time of day turns the film into a clock.
- 04:26.00 `seconds/second-00267.webp` The Starbase control room from the floor, curved light strips across the ceiling. The score returns on this cut.
- 04:47.00 `seconds/second-00288.webp` A controller in a green cap raises binoculars toward the pad. Distance, acted out.
- 04:49.00 `seconds/second-00290.webp` The stacked vehicle seen through the control room window over a row of heads. The same composition as the cold open, now on launch morning.
- 04:55.00 `seconds/second-00296.webp` Liftoff from a camera on the tower: steam and fire fill the frame. The launch is roar for about 22 seconds.
- 05:08.00 `seconds/second-00309.webp` Wide: the rocket a thin line above two banks of orange steam, clouds above. Scale through weather.
- 05:24.00 `seconds/second-00325.webp` The ship's flap over the Earth while the loop repeats the cold open's call: 'no-go for orbit'. The film has caught up with its own opening.
- 05:31.00 `seconds/second-00332.webp` A black card, 'PAYLOAD', in small white caps. Three such cards are the film's only chapter markers.
- 05:46.00 `seconds/second-00347.webp` The Redmond satellite team at their desks, a screen above them. The customer's room becomes the second stage of the story.
- 06:07.00 `seconds/second-00368.webp` A man with both hands on his head in Redmond after 'that would be the end of the show'.
- 06:17.00 `seconds/second-00378.webp` Jeremy Pedro again, on camera: 'Everything pre-flight we had determined, let's do the conservative thing.' The interview takes over from the room, in past tense.
- 06:38.00 `seconds/second-00399.webp` A controller in a cap rubs his face, subtitled: 'There's a pneumatics leak.' Room talk too quiet to hear is captioned as evidence.
- 06:42.00 `seconds/second-00403.webp` Two men conferring, subtitled: 'This is why we need more engines on the ship.'
- 07:02.00 `seconds/second-00423.webp` Shana Diez, Sr. Director, Starship Reliability, outdoors in front of blue launch hardware: 'A development program has a very different risk concept.'
- 08:03.00 `seconds/second-00484.webp` The ship's engines light for the orbital burn, blue against the dark. The score stops a second into this shot, right after 'Burn 2 startup'.
- 08:20.00 `seconds/second-00501.webp` Elon Musk, named in the interviews but never captioned, at a console with a hand to his chin beside an older controller.
- 08:33.00 `seconds/second-00514.webp` 'ORBITAL / 26,373 km/hr | Altitude 276 km' over the ship and the Earth. The milestone is stated as two numbers.
- 08:36.00 `seconds/second-00517.webp` A wide of the Starbase control room as people turn and clap: the first time the room is shown loose.
- 09:20.00 `seconds/second-00561.webp` Akash Badshah, Sr. Director, Satellite Engineering, at his desk in Redmond: 'I can't say I slept a ton last night.'
- 09:25.00 `seconds/second-00566.webp` Over a shoulder at a monitor showing the deploy, subtitled: 'First contact.'
- 09:45.00 `seconds/second-00586.webp` Richard Bielski, Sr. Software Engineer, grinning: 'Gave us a little heart attack there.'
- 10:15.00 `seconds/second-00616.webp` The ship's camera watches a satellite drift off toward the Earth's limb. The Earth is the ruler.
- 10:40.00 `seconds/second-00641.webp` A grey long-range tracking image of the whole ship in space, side on, against black: the vehicle seen whole in orbit.
- 11:13.00 `seconds/second-00674.webp` Jonathan Herman, Sr. Director, Starlink Constellation Engineering, in front of racks of satellites: 'half of all the internet traffic that is on Earth today'.
- 12:14.00 `seconds/second-00735.webp` A man walks past a wall of racked satellites taller than the frame. A person for scale in the factory.
- 12:57.00 `seconds/second-00778.webp` 'Ship splashdown zones': a dark globe with Starbase marked and an arc running out over the Pacific to a ring around Hawaii. The film's one explanatory graphic.
- 13:01.00 `seconds/second-00782.webp` An older controller speaks while Elon Musk rubs his forehead beside him. The decision is shown as a room, not a person.
- 13:06.00 `seconds/second-00787.webp` A man in a cap standing over the consoles, subtitled: 'It's like 90% of the shit that we want.' The swearing stays in.
- 13:24.00 `seconds/second-00805.webp` The same debate, subtitled: 'Hawaii has a really good runway.'
- 13:49.00 `seconds/second-00830.webp` Shana Diez explaining long coasts with both hands: the longest any vehicle 'of its caliber and size will ever have coasted'.
- 14:42.00 `seconds/second-00883.webp` A controller with her hand at her ear, subtitled: 'E also wants to go to Hawaii.'
- 14:51.00 `seconds/second-00892.webp` At a console, subtitled: 'We're going to Hawaii.' The decision lands as overheard speech.
- 15:09.00 `seconds/second-00910.webp` The onboard feed breaks into grey blocks for a few frames, and the film cuts out on the breakup to Texas.
- 15:13.00 `seconds/second-00914.webp` 'MCGREGOR, TEXAS / Rocket Development Facility' over test stands reflected in a wet pad.
- 16:13.00 `seconds/second-00974.webp` Kelly Oliver, Manager, Test Operations, by a pickup truck, telling the origin story: 'Elon came to town and we lit it that evening.'
- 16:37.00 `seconds/second-00998.webp` Black-and-white high-speed footage of an engine firing horizontally: the early tests he is describing.
- 17:03.00 `seconds/second-01024.webp` Jacob McKenzie, VP, Raptor, framed against rows of engines. The backdrop is a production line, not a single hero engine.
- 17:33.00 `seconds/second-01054.webp` Jake Berkowitz, Lead Propulsion Engineer, in a hard hat, hand flat to show a temperature gradient. Ten minutes earlier he was named as 'the final go for the engine systems'.
- 17:50.00 `seconds/second-01071.webp` Four people stand at a road barrier watching a test plume far off across the grass. People small, the plume beyond them.
- 18:26.00 `seconds/second-01107.webp` A console screen reading 'SPLASHDOWN COMMITTED' over a yellow arc. The interface is filmed, never recreated.
- 18:36.00 `seconds/second-01117.webp` A controller pulls his headset on, face filling the frame. The burn is played as a run of tight faces.
- 19:43.00 `seconds/second-01184.webp` A controller drops his head to the desk, then is grabbed by a colleague. The release after 'Deorbit burn shutdown'.
- 19:56.00 `seconds/second-01197.webp` Reentry from the ship's camera: the flap glowing magenta against the dawn line.
- 20:07.00 `seconds/second-01208.webp` Fire and debris: the first of a run of what look like earlier test flights, cut fast under 'a handful of unique decision points'. The failures are in the highlight reel.
- 20:42.00 `seconds/second-01243.webp` A camera on the sea looks up through cloud at the ship, a dark speck descending.
- 20:57.00 `seconds/second-01258.webp` Splashdown from water level at sunset: the plume hits the sea and a bank of steam rolls across the frame.
- 21:03.00 `seconds/second-01264.webp` Last shot: a ship on the tower at dusk, pink cloud behind it, over a rehearsal poll for a return to launch site. No celebration, just the next question.
