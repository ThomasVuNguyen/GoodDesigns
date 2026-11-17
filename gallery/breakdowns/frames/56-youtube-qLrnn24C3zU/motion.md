# Motion notes: Do imaginary friends make you smarter?

TED-Ed · 05:14.44 · https://www.youtube.com/watch?v=qLrnn24C3zU

Caitlin McCarthy animates Amia and her imaginary friend Zelba as hand-drawn characters in flat, saturated color with thin colored outlines. Zelba is always a soft, glowing blue shape that can stretch, melt or turn into anything, and the film animates him that way: he morphs into a cat, a cloud of fur, a sea serpent, a heart. Scene changes are soft-edged color blooms that grow out of a character and wash over the frame, and remembered or imagined scenes drop to thin line art on a single color. The motion is full character animation on ones and twos, with smears, squash and stretch and big held reaction poses.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▂▄▁▁▁▄▆▇▆▄▃▅▅▅▆▃▃▆▃▄▃▄▆▃▃▃▄▄▄▄▆▅▃▆▆▄▅▇▄▅▄▅▄▄▅▅▄▅▃▃▄▂▄▃▄▇▄▄▄▄
01:00  ▆▅▅▆▃▃▂▄▃▃▄▆▆▇▆▅▆▆▅▄▆▆▃▅▄▅▄▅▅▅▄▅▄▄▄▄▄▄▄▄▃▃▆▂▃▃▄▅▅▄▄▄▅▆▅▅▄▅▄▇
02:00  ▅▄▅▄▅▄▅▅▅▅▃▃▇▅▄▃▄▄▅▃▄▄▄▇▄▄▄▃▃▄▅▆▃▇▇▅▅▆▅▅▅▅▅▅▃▃▆▆▆▇▆▆▅▆▅▅▅▅▅▅
03:00  ▄▃▅▃▃▃▃▃▆▅▆▅▆▅▄▅▆▆▆▆▆▆▆▆▄▃▃▄▅▇▄▃▃▃▃▃▃▃▃▃▃▂▂▂▂▃▃▅▇▆▆▆▆▆▇▄▂▃▃▃
04:00  ▃▃▃▇▆▆▅▅▆▆▄▄▄▅▄▅▅▅▅▅▇▅▃▅▂▄▃▅▄▅▄▄▆▂▃▂▆▃▅▅▃▅▄▅▆▅▃▄▄▅▆▆▅▅▅▅▅▄▄▄
05:00  ▄▄▄▄▆▅▅▅▅▄▃▃▃▂▂
```

## Sequences

### 01. Two hands meet

00:05.75–00:08.00 (2.25 s) · 19 frames at 8 fps, 0.125 s apart · fade-in, reach, grip, pull-back

Out of white, a pink hand and a blue hand reach in from opposite corners, meet in the middle and grip. The camera pulls back past their legs to the two of them standing hand in hand on yellow. The film's relationship is set before anyone is named.

Motion: `▆▅▅▅▅▆▆▇▆▅▅▅▃▆█▇██▅`

- 00:05.75 `motion/hands/f-001.webp` ▆
- 00:05.88 `motion/hands/f-002.webp` ▅
- 00:06.00 `motion/hands/f-003.webp` ▅
- 00:06.12 `motion/hands/f-004.webp` ▅
- 00:06.25 `motion/hands/f-005.webp` ▅
- 00:06.38 `motion/hands/f-006.webp` ▆
- 00:06.50 `motion/hands/f-007.webp` ▆
- 00:06.62 `motion/hands/f-008.webp` ▇
- 00:06.75 `motion/hands/f-009.webp` ▆
- 00:06.88 `motion/hands/f-010.webp` ▅
- 00:07.00 `motion/hands/f-011.webp` ▅
- 00:07.12 `motion/hands/f-012.webp` ▅
- 00:07.25 `motion/hands/f-013.webp` ▃
- 00:07.38 `motion/hands/f-014.webp` ▆
- 00:07.50 `motion/hands/f-015.webp` █
- 00:07.62 `motion/hands/f-016.webp` ▇
- 00:07.75 `motion/hands/f-017.webp` █
- 00:07.88 `motion/hands/f-018.webp` █
- 00:08.00 `motion/hands/f-019.webp` ▅

### 02. A whisper blooms into a kingdom

00:11.00–00:14.50 (3.50 s) · 29 frames at 8 fps, 0.125 s apart · bloom, soft edge, line art, color wash

Amia leans in to whisper, and a soft orange glow blooms out of the space between them. It grows into a cloud with blurred, grainy edges and swallows the frame; inside, the scene is only thin orange line art. A second bloom in turquoise opens on a line-drawn castle where both of them rule. Every memory scene arrives this way.

Motion: `▅▅▅▄▄▄▄▆▆▆▅▄▃▃▃▃▃▃▃▃▃▃▅▇▇▇▆▄▂`

- 00:11.00 `motion/bloom-castle/f-001.webp` ▅
- 00:11.12 `motion/bloom-castle/f-002.webp` ▅
- 00:11.25 `motion/bloom-castle/f-003.webp` ▅
- 00:11.38 `motion/bloom-castle/f-004.webp` ▄
- 00:11.50 `motion/bloom-castle/f-005.webp` ▄
- 00:11.62 `motion/bloom-castle/f-006.webp` ▄
- 00:11.75 `motion/bloom-castle/f-007.webp` ▄
- 00:11.88 `motion/bloom-castle/f-008.webp` ▆
- 00:12.00 `motion/bloom-castle/f-009.webp` ▆
- 00:12.12 `motion/bloom-castle/f-010.webp` ▆
- 00:12.25 `motion/bloom-castle/f-011.webp` ▅
- 00:12.38 `motion/bloom-castle/f-012.webp` ▄
- 00:12.50 `motion/bloom-castle/f-013.webp` ▃
- 00:12.62 `motion/bloom-castle/f-014.webp` ▃
- 00:12.75 `motion/bloom-castle/f-015.webp` ▃
- 00:12.88 `motion/bloom-castle/f-016.webp` ▃
- 00:13.00 `motion/bloom-castle/f-017.webp` ▃
- 00:13.12 `motion/bloom-castle/f-018.webp` ▃
- 00:13.25 `motion/bloom-castle/f-019.webp` ▃
- 00:13.38 `motion/bloom-castle/f-020.webp` ▃
- 00:13.50 `motion/bloom-castle/f-021.webp` ▃
- 00:13.62 `motion/bloom-castle/f-022.webp` ▃
- 00:13.75 `motion/bloom-castle/f-023.webp` ▅
- 00:13.88 `motion/bloom-castle/f-024.webp` ▇
- 00:14.00 `motion/bloom-castle/f-025.webp` ▇
- 00:14.12 `motion/bloom-castle/f-026.webp` ▇
- 00:14.25 `motion/bloom-castle/f-027.webp` ▆
- 00:14.38 `motion/bloom-castle/f-028.webp` ▄
- 00:14.50 `motion/bloom-castle/f-029.webp` ▂

### 03. Line-drawn faces trade places

00:16.75–00:22.75 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · line art, drift, swap, color wipe

On yellow, Amia's face in thin orange line talks while doodles (stars, hearts, a fish) drift across. Zelba's face slides in from the right and fills with orange color as he listens. A dark red glow then spreads from the left edge and turns the whole frame red, with the faces still in place.

Motion: `▃█▂▃▃▃▃▃▃▃▄▄▄▃▂▂▂▂▂▂▅▆▆▅▄`

- 00:16.75 `motion/faces/f-001.webp` ▃
- 00:17.00 `motion/faces/f-002.webp` █
- 00:17.25 `motion/faces/f-003.webp` ▂
- 00:17.50 `motion/faces/f-004.webp` ▃
- 00:17.75 `motion/faces/f-005.webp` ▃
- 00:18.00 `motion/faces/f-006.webp` ▃
- 00:18.25 `motion/faces/f-007.webp` ▃
- 00:18.50 `motion/faces/f-008.webp` ▃
- 00:18.75 `motion/faces/f-009.webp` ▃
- 00:19.00 `motion/faces/f-010.webp` ▃
- 00:19.25 `motion/faces/f-011.webp` ▄
- 00:19.50 `motion/faces/f-012.webp` ▄
- 00:19.75 `motion/faces/f-013.webp` ▄
- 00:20.00 `motion/faces/f-014.webp` ▃
- 00:20.25 `motion/faces/f-015.webp` ▂
- 00:20.50 `motion/faces/f-016.webp` ▂
- 00:20.75 `motion/faces/f-017.webp` ▂
- 00:21.00 `motion/faces/f-018.webp` ▂
- 00:21.25 `motion/faces/f-019.webp` ▂
- 00:21.50 `motion/faces/f-020.webp` ▂
- 00:21.75 `motion/faces/f-021.webp` ▅
- 00:22.00 `motion/faces/f-022.webp` ▆
- 00:22.25 `motion/faces/f-023.webp` ▆
- 00:22.50 `motion/faces/f-024.webp` ▅
- 00:22.75 `motion/faces/f-025.webp` ▄

### 04. A bad idea fills with color

00:24.50–00:31.00 (6.50 s) · 27 frames at 4 fps, 0.250 s apart · line art, squash, color fill, bloom

Line art on dark red: Amia and Zelba at the table with spaghetti. Amia dumps the bowl on her own head. Then color blooms out from her, orange cloud edges spreading across the frame, and the scene is suddenly full color with the spaghetti on her head.

Motion: `▄▂▃▄▄▃▃▄▄▄▄▄▄▄▃▄▄▄▄▄▄▅▆▆▆▃▂`

- 00:24.50 `motion/spaghetti/f-001.webp` ▄
- 00:24.75 `motion/spaghetti/f-002.webp` ▂
- 00:25.00 `motion/spaghetti/f-003.webp` ▃
- 00:25.25 `motion/spaghetti/f-004.webp` ▄
- 00:25.50 `motion/spaghetti/f-005.webp` ▄
- 00:25.75 `motion/spaghetti/f-006.webp` ▃
- 00:26.00 `motion/spaghetti/f-007.webp` ▃
- 00:26.25 `motion/spaghetti/f-008.webp` ▄
- 00:26.50 `motion/spaghetti/f-009.webp` ▄
- 00:26.75 `motion/spaghetti/f-010.webp` ▄
- 00:27.00 `motion/spaghetti/f-011.webp` ▄
- 00:27.25 `motion/spaghetti/f-012.webp` ▄
- 00:27.50 `motion/spaghetti/f-013.webp` ▄
- 00:27.75 `motion/spaghetti/f-014.webp` ▄
- 00:28.00 `motion/spaghetti/f-015.webp` ▃
- 00:28.25 `motion/spaghetti/f-016.webp` ▄
- 00:28.50 `motion/spaghetti/f-017.webp` ▄
- 00:28.75 `motion/spaghetti/f-018.webp` ▄
- 00:29.00 `motion/spaghetti/f-019.webp` ▄
- 00:29.25 `motion/spaghetti/f-020.webp` ▄
- 00:29.50 `motion/spaghetti/f-021.webp` ▄
- 00:29.75 `motion/spaghetti/f-022.webp` ▅
- 00:30.00 `motion/spaghetti/f-023.webp` ▆
- 00:30.25 `motion/spaghetti/f-024.webp` ▆
- 00:30.50 `motion/spaghetti/f-025.webp` ▆
- 00:30.75 `motion/spaghetti/f-026.webp` ▃
- 00:31.00 `motion/spaghetti/f-027.webp` ▂

### 05. Zelba appears beside her

00:34.00–00:37.75 (3.75 s) · 23 frames at 6 fps, 0.167 s apart · fade-in, glow, hug

Over the parents' shocked dinner table, Zelba fades into the empty chair as a soft glowing blue shape. He leans over and wraps Amia in a hug, the spaghetti still dripping. The glow is the film's rule for anything imaginary.

Motion: `█▂▂▃▃▄▆▄▄▃▂▃▆▆▆▆▅▅▄▂▂█▇`

- 00:34.00 `motion/reveal/f-001.webp` █
- 00:34.17 `motion/reveal/f-002.webp` ▂
- 00:34.33 `motion/reveal/f-003.webp` ▂
- 00:34.50 `motion/reveal/f-004.webp` ▃
- 00:34.67 `motion/reveal/f-005.webp` ▃
- 00:34.83 `motion/reveal/f-006.webp` ▄
- 00:35.00 `motion/reveal/f-007.webp` ▆
- 00:35.17 `motion/reveal/f-008.webp` ▄
- 00:35.33 `motion/reveal/f-009.webp` ▄
- 00:35.50 `motion/reveal/f-010.webp` ▃
- 00:35.67 `motion/reveal/f-011.webp` ▂
- 00:35.83 `motion/reveal/f-012.webp` ▃
- 00:36.00 `motion/reveal/f-013.webp` ▆
- 00:36.17 `motion/reveal/f-014.webp` ▆
- 00:36.33 `motion/reveal/f-015.webp` ▆
- 00:36.50 `motion/reveal/f-016.webp` ▆
- 00:36.67 `motion/reveal/f-017.webp` ▅
- 00:36.83 `motion/reveal/f-018.webp` ▅
- 00:37.00 `motion/reveal/f-019.webp` ▄
- 00:37.17 `motion/reveal/f-020.webp` ▂
- 00:37.33 `motion/reveal/f-021.webp` ▂
- 00:37.50 `motion/reveal/f-022.webp` █
- 00:37.67 `motion/reveal/f-023.webp` ▇

### 06. A thought cloud grows

00:39.50–00:44.00 (4.50 s) · 28 frames at 6 fps, 0.167 s apart · grow, sparkle, push-in

The two sit cross-legged on yellow. A pink frame cuts in with them inside a yellow thought cloud trailing an orange wisp, sparkles twinkling around it. The cloud swells until its edges leave the frame and the yellow is the background again.

Motion: `▅▆▆▆▃▄▄▃▄▆▄▃▄▄▄▅▅▃▃▄▄▅▅▃▂▃▃▄`

- 00:39.50 `motion/thought/f-001.webp` ▅
- 00:39.67 `motion/thought/f-002.webp` ▆
- 00:39.83 `motion/thought/f-003.webp` ▆
- 00:40.00 `motion/thought/f-004.webp` ▆
- 00:40.17 `motion/thought/f-005.webp` ▃
- 00:40.33 `motion/thought/f-006.webp` ▄
- 00:40.50 `motion/thought/f-007.webp` ▄
- 00:40.67 `motion/thought/f-008.webp` ▃
- 00:40.83 `motion/thought/f-009.webp` ▄
- 00:41.00 `motion/thought/f-010.webp` ▆
- 00:41.17 `motion/thought/f-011.webp` ▄
- 00:41.33 `motion/thought/f-012.webp` ▃
- 00:41.50 `motion/thought/f-013.webp` ▄
- 00:41.67 `motion/thought/f-014.webp` ▄
- 00:41.83 `motion/thought/f-015.webp` ▄
- 00:42.00 `motion/thought/f-016.webp` ▅
- 00:42.17 `motion/thought/f-017.webp` ▅
- 00:42.33 `motion/thought/f-018.webp` ▃
- 00:42.50 `motion/thought/f-019.webp` ▃
- 00:42.67 `motion/thought/f-020.webp` ▄
- 00:42.83 `motion/thought/f-021.webp` ▄
- 00:43.00 `motion/thought/f-022.webp` ▅
- 00:43.17 `motion/thought/f-023.webp` ▅
- 00:43.33 `motion/thought/f-024.webp` ▃
- 00:43.50 `motion/thought/f-025.webp` ▂
- 00:43.67 `motion/thought/f-026.webp` ▃
- 00:43.83 `motion/thought/f-027.webp` ▃
- 00:44.00 `motion/thought/f-028.webp` ▄

### 07. Other kids crowd in, then vanish

00:44.25–00:48.00 (3.75 s) · 23 frames at 6 fps, 0.167 s apart · pop-in, stagger, puff

Kids pop up from the bottom edge one at a time, waving and reaching in, until they fill the frame around the pair. Then each one pops into a cloud puff and disappears, and Amia and Zelba are alone again.

Motion: `▄▅▆▅▆▅▄▄▄▃▄▄▄▄▄▆▆▆▅▃▃▃▂`

- 00:44.25 `motion/crowd/f-001.webp` ▄
- 00:44.42 `motion/crowd/f-002.webp` ▅
- 00:44.58 `motion/crowd/f-003.webp` ▆
- 00:44.75 `motion/crowd/f-004.webp` ▅
- 00:44.92 `motion/crowd/f-005.webp` ▆
- 00:45.08 `motion/crowd/f-006.webp` ▅
- 00:45.25 `motion/crowd/f-007.webp` ▄
- 00:45.42 `motion/crowd/f-008.webp` ▄
- 00:45.58 `motion/crowd/f-009.webp` ▄
- 00:45.75 `motion/crowd/f-010.webp` ▃
- 00:45.92 `motion/crowd/f-011.webp` ▄
- 00:46.08 `motion/crowd/f-012.webp` ▄
- 00:46.25 `motion/crowd/f-013.webp` ▄
- 00:46.42 `motion/crowd/f-014.webp` ▄
- 00:46.58 `motion/crowd/f-015.webp` ▄
- 00:46.75 `motion/crowd/f-016.webp` ▆
- 00:46.92 `motion/crowd/f-017.webp` ▆
- 00:47.08 `motion/crowd/f-018.webp` ▆
- 00:47.25 `motion/crowd/f-019.webp` ▅
- 00:47.42 `motion/crowd/f-020.webp` ▃
- 00:47.58 `motion/crowd/f-021.webp` ▃
- 00:47.75 `motion/crowd/f-022.webp` ▃
- 00:47.92 `motion/crowd/f-023.webp` ▂

### 08. The pair melts into a family

00:48.25–00:50.00 (1.75 s) · 22 frames at 12 fps, 0.083 s apart · morph, squash, stretch, split

Amia and Zelba squeeze together into one blue blob, shrink to a dot, stretch into a flat line with bumps, and the bumps grow up into a family of four. One shape becomes many in under two seconds.

Motion: `▂▂▁▄▄▃▄▅▁▄▃▁▂▂▁▃▃▁▄▅▂▆`

- 00:48.25 `motion/melt/f-001.webp` ▂
- 00:48.33 `motion/melt/f-002.webp` ▂
- 00:48.42 `motion/melt/f-003.webp` ▁
- 00:48.50 `motion/melt/f-004.webp` ▄
- 00:48.58 `motion/melt/f-005.webp` ▄
- 00:48.67 `motion/melt/f-006.webp` ▃
- 00:48.75 `motion/melt/f-007.webp` ▄
- 00:48.83 `motion/melt/f-008.webp` ▅
- 00:48.92 `motion/melt/f-009.webp` ▁
- 00:49.00 `motion/melt/f-010.webp` ▄
- 00:49.08 `motion/melt/f-011.webp` ▃
- 00:49.17 `motion/melt/f-012.webp` ▁
- 00:49.25 `motion/melt/f-013.webp` ▂
- 00:49.33 `motion/melt/f-014.webp` ▂
- 00:49.42 `motion/melt/f-015.webp` ▁
- 00:49.50 `motion/melt/f-016.webp` ▃
- 00:49.58 `motion/melt/f-017.webp` ▃
- 00:49.67 `motion/melt/f-018.webp` ▁
- 00:49.75 `motion/melt/f-019.webp` ▄
- 00:49.83 `motion/melt/f-020.webp` ▅
- 00:49.92 `motion/melt/f-021.webp` ▂
- 00:50.00 `motion/melt/f-022.webp` ▆

### 09. The playground

00:55.00–01:00.25 (5.25 s) · 22 frames at 4 fps, 0.250 s apart · bloom, loop, background action

A blue cloud bloom opens on a top-down playground in orange. Kids loop on the swings, slide and seesaw while a yellow imaginary friend appears beside a girl and rides the slide down after her.

Motion: `█▇▄▃▄▃▄▃▄▄▄▃▄▄▅▄▄▄▄▃▄▄`

- 00:55.00 `motion/playground/f-001.webp` █
- 00:55.25 `motion/playground/f-002.webp` ▇
- 00:55.50 `motion/playground/f-003.webp` ▄
- 00:55.75 `motion/playground/f-004.webp` ▃
- 00:56.00 `motion/playground/f-005.webp` ▄
- 00:56.25 `motion/playground/f-006.webp` ▃
- 00:56.50 `motion/playground/f-007.webp` ▄
- 00:56.75 `motion/playground/f-008.webp` ▃
- 00:57.00 `motion/playground/f-009.webp` ▄
- 00:57.25 `motion/playground/f-010.webp` ▄
- 00:57.50 `motion/playground/f-011.webp` ▄
- 00:57.75 `motion/playground/f-012.webp` ▃
- 00:58.00 `motion/playground/f-013.webp` ▄
- 00:58.25 `motion/playground/f-014.webp` ▄
- 00:58.50 `motion/playground/f-015.webp` ▅
- 00:58.75 `motion/playground/f-016.webp` ▄
- 00:59.00 `motion/playground/f-017.webp` ▄
- 00:59.25 `motion/playground/f-018.webp` ▄
- 00:59.50 `motion/playground/f-019.webp` ▄
- 00:59.75 `motion/playground/f-020.webp` ▃
- 01:00.00 `motion/playground/f-021.webp` ▄
- 01:00.25 `motion/playground/f-022.webp` ▄

### 10. A birthday table fills with friends

01:03.75–01:14.00 (10.25 s) · 32 frames at 3 fps, 0.333 s apart · pop-in, stagger, crowd, color wipe

At an empty birthday table the girl blows out the candles and invites someone in. Imaginary guests pop up behind her one after another, every shape and color, until they pack the frame. A dark red wipe then sweeps up from the corner.

Motion: `▇▃▂▃▃▂▄▂▂▂▄▄▃▃▂▄▃▂▂▃▄▅▆▆▆▆▄▄▄▇▇▇`

- 01:03.75 `motion/party/f-001.webp` ▇
- 01:04.08 `motion/party/f-002.webp` ▃
- 01:04.42 `motion/party/f-003.webp` ▂
- 01:04.75 `motion/party/f-004.webp` ▃
- 01:05.08 `motion/party/f-005.webp` ▃
- 01:05.42 `motion/party/f-006.webp` ▂
- 01:05.75 `motion/party/f-007.webp` ▄
- 01:06.08 `motion/party/f-008.webp` ▂
- 01:06.42 `motion/party/f-009.webp` ▂
- 01:06.75 `motion/party/f-010.webp` ▂
- 01:07.08 `motion/party/f-011.webp` ▄
- 01:07.42 `motion/party/f-012.webp` ▄
- 01:07.75 `motion/party/f-013.webp` ▃
- 01:08.08 `motion/party/f-014.webp` ▃
- 01:08.42 `motion/party/f-015.webp` ▂
- 01:08.75 `motion/party/f-016.webp` ▄
- 01:09.08 `motion/party/f-017.webp` ▃
- 01:09.42 `motion/party/f-018.webp` ▂
- 01:09.75 `motion/party/f-019.webp` ▂
- 01:10.08 `motion/party/f-020.webp` ▃
- 01:10.42 `motion/party/f-021.webp` ▄
- 01:10.75 `motion/party/f-022.webp` ▅
- 01:11.08 `motion/party/f-023.webp` ▆
- 01:11.42 `motion/party/f-024.webp` ▆
- 01:11.75 `motion/party/f-025.webp` ▆
- 01:12.08 `motion/party/f-026.webp` ▆
- 01:12.42 `motion/party/f-027.webp` ▄
- 01:12.75 `motion/party/f-028.webp` ▄
- 01:13.08 `motion/party/f-029.webp` ▄
- 01:13.42 `motion/party/f-030.webp` ▇
- 01:13.75 `motion/party/f-031.webp` ▇
- 01:14.08 `motion/party/f-032.webp` ▇

### 11. A line of storytellers

01:14.00–01:20.50 (6.50 s) · 21 frames at 3 fps, 0.333 s apart · line art, color in, slide, bloom

Line-drawn kids on pink act out their stories in place: a sword, a guitar, a dog on a leash. The row slides left, and as each kid reaches center their imaginary friend colors in beside them. The last one grows into a blue heart around Amia.

Motion: `▇▇▅▅▆▅▆▆▅▆▆▆▆▄▅▄▄▄▆▄▅`

- 01:14.00 `motion/lineup/f-001.webp` ▇
- 01:14.33 `motion/lineup/f-002.webp` ▇
- 01:14.67 `motion/lineup/f-003.webp` ▅
- 01:15.00 `motion/lineup/f-004.webp` ▅
- 01:15.33 `motion/lineup/f-005.webp` ▆
- 01:15.67 `motion/lineup/f-006.webp` ▅
- 01:16.00 `motion/lineup/f-007.webp` ▆
- 01:16.33 `motion/lineup/f-008.webp` ▆
- 01:16.67 `motion/lineup/f-009.webp` ▅
- 01:17.00 `motion/lineup/f-010.webp` ▆
- 01:17.33 `motion/lineup/f-011.webp` ▆
- 01:17.67 `motion/lineup/f-012.webp` ▆
- 01:18.00 `motion/lineup/f-013.webp` ▆
- 01:18.33 `motion/lineup/f-014.webp` ▄
- 01:18.67 `motion/lineup/f-015.webp` ▅
- 01:19.00 `motion/lineup/f-016.webp` ▄
- 01:19.33 `motion/lineup/f-017.webp` ▄
- 01:19.67 `motion/lineup/f-018.webp` ▄
- 01:20.00 `motion/lineup/f-019.webp` ▆
- 01:20.33 `motion/lineup/f-020.webp` ▄
- 01:20.67 `motion/lineup/f-021.webp` ▅

### 12. Story time takes over the classroom

01:20.50–01:25.50 (5.00 s) · 21 frames at 4 fps, 0.250 s apart · drop, bloom, fly-in

Amia drops into a desk on yellow, the class around her. As she talks, a story cloud blooms in front of the teacher, a pink sea serpent swims through blue waves inside it, and a ship sails by.

Motion: `▅▅▅▆▆▅▄▃▃▄▆▅▄▄▄▄▄▄▄▇▃`

- 01:20.50 `motion/classroom/f-001.webp` ▅
- 01:20.75 `motion/classroom/f-002.webp` ▅
- 01:21.00 `motion/classroom/f-003.webp` ▅
- 01:21.25 `motion/classroom/f-004.webp` ▆
- 01:21.50 `motion/classroom/f-005.webp` ▆
- 01:21.75 `motion/classroom/f-006.webp` ▅
- 01:22.00 `motion/classroom/f-007.webp` ▄
- 01:22.25 `motion/classroom/f-008.webp` ▃
- 01:22.50 `motion/classroom/f-009.webp` ▃
- 01:22.75 `motion/classroom/f-010.webp` ▄
- 01:23.00 `motion/classroom/f-011.webp` ▆
- 01:23.25 `motion/classroom/f-012.webp` ▅
- 01:23.50 `motion/classroom/f-013.webp` ▄
- 01:23.75 `motion/classroom/f-014.webp` ▄
- 01:24.00 `motion/classroom/f-015.webp` ▄
- 01:24.25 `motion/classroom/f-016.webp` ▄
- 01:24.50 `motion/classroom/f-017.webp` ▄
- 01:24.75 `motion/classroom/f-018.webp` ▄
- 01:25.00 `motion/classroom/f-019.webp` ▄
- 01:25.25 `motion/classroom/f-020.webp` ▇
- 01:25.50 `motion/classroom/f-021.webp` ▃

### 13. Words stream out

01:25.50–01:30.00 (4.50 s) · 28 frames at 6 fps, 0.167 s apart · close-up, stream, arc

Close on Amia with Zelba sitting on her head. Big words and equations ('loquacious', 'e=mc²', 'idiosyncratic', 'ubiquitous') stream out of her mouth in blue script and arc off to the right.

Motion: `▃▃▂▂▃▄▅▅▄▄▅▄▄▅▄▄▅▄▅▄▄▅▄▄▄▇▄▄`

- 01:25.50 `motion/words/f-001.webp` ▃
- 01:25.67 `motion/words/f-002.webp` ▃
- 01:25.83 `motion/words/f-003.webp` ▂
- 01:26.00 `motion/words/f-004.webp` ▂
- 01:26.17 `motion/words/f-005.webp` ▃
- 01:26.33 `motion/words/f-006.webp` ▄
- 01:26.50 `motion/words/f-007.webp` ▅
- 01:26.67 `motion/words/f-008.webp` ▅
- 01:26.83 `motion/words/f-009.webp` ▄
- 01:27.00 `motion/words/f-010.webp` ▄
- 01:27.17 `motion/words/f-011.webp` ▅
- 01:27.33 `motion/words/f-012.webp` ▄
- 01:27.50 `motion/words/f-013.webp` ▄
- 01:27.67 `motion/words/f-014.webp` ▅
- 01:27.83 `motion/words/f-015.webp` ▄
- 01:28.00 `motion/words/f-016.webp` ▄
- 01:28.17 `motion/words/f-017.webp` ▅
- 01:28.33 `motion/words/f-018.webp` ▄
- 01:28.50 `motion/words/f-019.webp` ▅
- 01:28.67 `motion/words/f-020.webp` ▄
- 01:28.83 `motion/words/f-021.webp` ▄
- 01:29.00 `motion/words/f-022.webp` ▅
- 01:29.17 `motion/words/f-023.webp` ▄
- 01:29.33 `motion/words/f-024.webp` ▄
- 01:29.50 `motion/words/f-025.webp` ▄
- 01:29.67 `motion/words/f-026.webp` ▇
- 01:29.83 `motion/words/f-027.webp` ▄
- 01:30.00 `motion/words/f-028.webp` ▄

### 14. The teacher points at everyone

01:32.00–01:41.50 (9.50 s) · 39 frames at 4 fps, 0.250 s apart · loop, arm swing, comic timing

Back of the teacher's head in the foreground. Her arm swings out from her side to point at each kid in turn, the same move over and over, while the kids squirm.

Motion: `▂▄▅▃▄▄▄▃▄▄▃▄▄▃▄▄▄▃▄▄▃▄▄▃▃▅▄▃▄▄▄▃▅▃▂▂▂▂▂`

Onion skin: `motion/pointing/trail.webp`

- 01:32.00 `motion/pointing/f-001.webp` ▂
- 01:32.25 `motion/pointing/f-002.webp` ▄
- 01:32.50 `motion/pointing/f-003.webp` ▅
- 01:32.75 `motion/pointing/f-004.webp` ▃
- 01:33.00 `motion/pointing/f-005.webp` ▄
- 01:33.25 `motion/pointing/f-006.webp` ▄
- 01:33.50 `motion/pointing/f-007.webp` ▄
- 01:33.75 `motion/pointing/f-008.webp` ▃
- 01:34.00 `motion/pointing/f-009.webp` ▄
- 01:34.25 `motion/pointing/f-010.webp` ▄
- 01:34.50 `motion/pointing/f-011.webp` ▃
- 01:34.75 `motion/pointing/f-012.webp` ▄
- 01:35.00 `motion/pointing/f-013.webp` ▄
- 01:35.25 `motion/pointing/f-014.webp` ▃
- 01:35.50 `motion/pointing/f-015.webp` ▄
- 01:35.75 `motion/pointing/f-016.webp` ▄
- 01:36.00 `motion/pointing/f-017.webp` ▄
- 01:36.25 `motion/pointing/f-018.webp` ▃
- 01:36.50 `motion/pointing/f-019.webp` ▄
- 01:36.75 `motion/pointing/f-020.webp` ▄
- 01:37.00 `motion/pointing/f-021.webp` ▃
- 01:37.25 `motion/pointing/f-022.webp` ▄
- 01:37.50 `motion/pointing/f-023.webp` ▄
- 01:37.75 `motion/pointing/f-024.webp` ▃
- 01:38.00 `motion/pointing/f-025.webp` ▃
- 01:38.25 `motion/pointing/f-026.webp` ▅
- 01:38.50 `motion/pointing/f-027.webp` ▄
- 01:38.75 `motion/pointing/f-028.webp` ▃
- 01:39.00 `motion/pointing/f-029.webp` ▄
- 01:39.25 `motion/pointing/f-030.webp` ▄
- 01:39.50 `motion/pointing/f-031.webp` ▄
- 01:39.75 `motion/pointing/f-032.webp` ▃
- 01:40.00 `motion/pointing/f-033.webp` ▅
- 01:40.25 `motion/pointing/f-034.webp` ▃
- 01:40.50 `motion/pointing/f-035.webp` ▂
- 01:40.75 `motion/pointing/f-036.webp` ▂
- 01:41.00 `motion/pointing/f-037.webp` ▂
- 01:41.25 `motion/pointing/f-038.webp` ▂
- 01:41.50 `motion/pointing/f-039.webp` ▂

### 15. Zelba falls and shapeshifts

01:41.75–01:48.50 (6.75 s) · 28 frames at 4 fps, 0.250 s apart · wipe, fall, morph, pile up

A dark red wave wipes up over the classroom and Zelba drops in. He flattens into a puddle, a crowd of small creatures piles onto him, then they're gone and he becomes a cat, a long weasel, and a pink curled ball.

Motion: `▄▆▇▇▅▂▁▃▃▃▃▃▂▂▃▃▃▃▅▃▂▄▅▆▅▄▅▆`

- 01:41.75 `motion/fall-blob/f-001.webp` ▄
- 01:42.00 `motion/fall-blob/f-002.webp` ▆
- 01:42.25 `motion/fall-blob/f-003.webp` ▇
- 01:42.50 `motion/fall-blob/f-004.webp` ▇
- 01:42.75 `motion/fall-blob/f-005.webp` ▅
- 01:43.00 `motion/fall-blob/f-006.webp` ▂
- 01:43.25 `motion/fall-blob/f-007.webp` ▁
- 01:43.50 `motion/fall-blob/f-008.webp` ▃
- 01:43.75 `motion/fall-blob/f-009.webp` ▃
- 01:44.00 `motion/fall-blob/f-010.webp` ▃
- 01:44.25 `motion/fall-blob/f-011.webp` ▃
- 01:44.50 `motion/fall-blob/f-012.webp` ▃
- 01:44.75 `motion/fall-blob/f-013.webp` ▂
- 01:45.00 `motion/fall-blob/f-014.webp` ▂
- 01:45.25 `motion/fall-blob/f-015.webp` ▃
- 01:45.50 `motion/fall-blob/f-016.webp` ▃
- 01:45.75 `motion/fall-blob/f-017.webp` ▃
- 01:46.00 `motion/fall-blob/f-018.webp` ▃
- 01:46.25 `motion/fall-blob/f-019.webp` ▅
- 01:46.50 `motion/fall-blob/f-020.webp` ▃
- 01:46.75 `motion/fall-blob/f-021.webp` ▂
- 01:47.00 `motion/fall-blob/f-022.webp` ▄
- 01:47.25 `motion/fall-blob/f-023.webp` ▅
- 01:47.50 `motion/fall-blob/f-024.webp` ▆
- 01:47.75 `motion/fall-blob/f-025.webp` ▅
- 01:48.00 `motion/fall-blob/f-026.webp` ▄
- 01:48.25 `motion/fall-blob/f-027.webp` ▅
- 01:48.50 `motion/fall-blob/f-028.webp` ▆

### 16. A parade of imaginary friends

01:48.00–01:54.00 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · morph, swap, trios

The ball pops into a lineup of three characters that swaps every second: an old woman, a girl and a dancer; a baby, a woman and a giant; a king, a hooded figure and a grump; a princess, a witch and a long-nosed puppet.

Motion: `▄▅▆▅▂▂▂▅▅▂▂▂▅▅▂▂▂▅▅▂▄▆▅▆▆`

- 01:48.00 `motion/characters/f-001.webp` ▄
- 01:48.25 `motion/characters/f-002.webp` ▅
- 01:48.50 `motion/characters/f-003.webp` ▆
- 01:48.75 `motion/characters/f-004.webp` ▅
- 01:49.00 `motion/characters/f-005.webp` ▂
- 01:49.25 `motion/characters/f-006.webp` ▂
- 01:49.50 `motion/characters/f-007.webp` ▂
- 01:49.75 `motion/characters/f-008.webp` ▅
- 01:50.00 `motion/characters/f-009.webp` ▅
- 01:50.25 `motion/characters/f-010.webp` ▂
- 01:50.50 `motion/characters/f-011.webp` ▂
- 01:50.75 `motion/characters/f-012.webp` ▂
- 01:51.00 `motion/characters/f-013.webp` ▅
- 01:51.25 `motion/characters/f-014.webp` ▅
- 01:51.50 `motion/characters/f-015.webp` ▂
- 01:51.75 `motion/characters/f-016.webp` ▂
- 01:52.00 `motion/characters/f-017.webp` ▂
- 01:52.25 `motion/characters/f-018.webp` ▅
- 01:52.50 `motion/characters/f-019.webp` ▅
- 01:52.75 `motion/characters/f-020.webp` ▂
- 01:53.00 `motion/characters/f-021.webp` ▄
- 01:53.25 `motion/characters/f-022.webp` ▆
- 01:53.50 `motion/characters/f-023.webp` ▅
- 01:53.75 `motion/characters/f-024.webp` ▆
- 01:54.00 `motion/characters/f-025.webp` ▆

### 17. One friend becomes a family

01:55.25–01:59.00 (3.75 s) · 23 frames at 6 fps, 0.167 s apart · morph, bounce, loop

A blue figure lies back, turns green and flattens, then splits into a row of yellow creatures of all sizes. They bounce in place out of step with each other, each one on its own loop.

Motion: `▄▆▅▆▅▃▅▄▄▅▅▅▄▅▄▅▄▄▅▄▄▅▅`

Onion skin: `motion/family/trail.webp`

- 01:55.25 `motion/family/f-001.webp` ▄
- 01:55.42 `motion/family/f-002.webp` ▆
- 01:55.58 `motion/family/f-003.webp` ▅
- 01:55.75 `motion/family/f-004.webp` ▆
- 01:55.92 `motion/family/f-005.webp` ▅
- 01:56.08 `motion/family/f-006.webp` ▃
- 01:56.25 `motion/family/f-007.webp` ▅
- 01:56.42 `motion/family/f-008.webp` ▄
- 01:56.58 `motion/family/f-009.webp` ▄
- 01:56.75 `motion/family/f-010.webp` ▅
- 01:56.92 `motion/family/f-011.webp` ▅
- 01:57.08 `motion/family/f-012.webp` ▅
- 01:57.25 `motion/family/f-013.webp` ▄
- 01:57.42 `motion/family/f-014.webp` ▅
- 01:57.58 `motion/family/f-015.webp` ▄
- 01:57.75 `motion/family/f-016.webp` ▅
- 01:57.92 `motion/family/f-017.webp` ▄
- 01:58.08 `motion/family/f-018.webp` ▄
- 01:58.25 `motion/family/f-019.webp` ▅
- 01:58.42 `motion/family/f-020.webp` ▄
- 01:58.58 `motion/family/f-021.webp` ▄
- 01:58.75 `motion/family/f-022.webp` ▅
- 01:58.92 `motion/family/f-023.webp` ▅

### 18. A toybox comes alive

01:59.50–02:08.00 (8.50 s) · 35 frames at 4 fps, 0.250 s apart · bloom, morph, pop-out, wobble

A blue bloom opens and the yellow creatures run together into a cube: a toybox. It wobbles, the lid springs open, and toys climb out: a bear, a ringed stacker, a car. The box shuts and rounds into a spotted ball.

Motion: `▇▇▆▄▃▄▄▄▄▄▃▄▆▆▅▄▄▄▄▅▅▅▄▄▅▄▆▅▅▅▅▅▅▅▅`

- 01:59.50 `motion/toybox/f-001.webp` ▇
- 01:59.75 `motion/toybox/f-002.webp` ▇
- 02:00.00 `motion/toybox/f-003.webp` ▆
- 02:00.25 `motion/toybox/f-004.webp` ▄
- 02:00.50 `motion/toybox/f-005.webp` ▃
- 02:00.75 `motion/toybox/f-006.webp` ▄
- 02:01.00 `motion/toybox/f-007.webp` ▄
- 02:01.25 `motion/toybox/f-008.webp` ▄
- 02:01.50 `motion/toybox/f-009.webp` ▄
- 02:01.75 `motion/toybox/f-010.webp` ▄
- 02:02.00 `motion/toybox/f-011.webp` ▃
- 02:02.25 `motion/toybox/f-012.webp` ▄
- 02:02.50 `motion/toybox/f-013.webp` ▆
- 02:02.75 `motion/toybox/f-014.webp` ▆
- 02:03.00 `motion/toybox/f-015.webp` ▅
- 02:03.25 `motion/toybox/f-016.webp` ▄
- 02:03.50 `motion/toybox/f-017.webp` ▄
- 02:03.75 `motion/toybox/f-018.webp` ▄
- 02:04.00 `motion/toybox/f-019.webp` ▄
- 02:04.25 `motion/toybox/f-020.webp` ▅
- 02:04.50 `motion/toybox/f-021.webp` ▅
- 02:04.75 `motion/toybox/f-022.webp` ▅
- 02:05.00 `motion/toybox/f-023.webp` ▄
- 02:05.25 `motion/toybox/f-024.webp` ▄
- 02:05.50 `motion/toybox/f-025.webp` ▅
- 02:05.75 `motion/toybox/f-026.webp` ▄
- 02:06.00 `motion/toybox/f-027.webp` ▆
- 02:06.25 `motion/toybox/f-028.webp` ▅
- 02:06.50 `motion/toybox/f-029.webp` ▅
- 02:06.75 `motion/toybox/f-030.webp` ▅
- 02:07.00 `motion/toybox/f-031.webp` ▅
- 02:07.25 `motion/toybox/f-032.webp` ▅
- 02:07.50 `motion/toybox/f-033.webp` ▅
- 02:07.75 `motion/toybox/f-034.webp` ▅
- 02:08.00 `motion/toybox/f-035.webp` ▅

### 19. The box becomes a globe

02:08.75–02:12.75 (4.00 s) · 17 frames at 4 fps, 0.250 s apart · morph, pop-on, stagger

The box rounds off into a yellow globe with orange continents, and small companions pop onto its surface one after another: a dark star, a pink cloud, a pair of lips.

Motion: `▄▆▅▃▃▄▃▃▃▃▃▃▃▅▇▇▆`

- 02:08.75 `motion/globe/f-001.webp` ▄
- 02:09.00 `motion/globe/f-002.webp` ▆
- 02:09.25 `motion/globe/f-003.webp` ▅
- 02:09.50 `motion/globe/f-004.webp` ▃
- 02:09.75 `motion/globe/f-005.webp` ▃
- 02:10.00 `motion/globe/f-006.webp` ▄
- 02:10.25 `motion/globe/f-007.webp` ▃
- 02:10.50 `motion/globe/f-008.webp` ▃
- 02:10.75 `motion/globe/f-009.webp` ▃
- 02:11.00 `motion/globe/f-010.webp` ▃
- 02:11.25 `motion/globe/f-011.webp` ▃
- 02:11.50 `motion/globe/f-012.webp` ▃
- 02:11.75 `motion/globe/f-013.webp` ▃
- 02:12.00 `motion/globe/f-014.webp` ▅
- 02:12.25 `motion/globe/f-015.webp` ▇
- 02:12.50 `motion/globe/f-016.webp` ▇
- 02:12.75 `motion/globe/f-017.webp` ▆

### 20. The film within the film

02:12.50–02:23.75 (11.25 s) · 23 frames at 2 fps, 0.500 s apart · drop-in, projector, slide change

A dark rectangle drops into frame and an audience appears in front of it with a projector. The screen lights up with a flag and Amia and Zelba, then changes slide by slide: a kid on a cat, a girl hugging a squirrel, a cartoon car with a face. The bloom from the last slide opens into pink.

Motion: `▇▅▃▃▅▃▃▅▃▃▅▃▆▄▃▅▄▃▅▄▃▅▇`

- 02:12.50 `motion/screen/f-001.webp` ▇
- 02:13.00 `motion/screen/f-002.webp` ▅
- 02:13.50 `motion/screen/f-003.webp` ▃
- 02:14.00 `motion/screen/f-004.webp` ▃
- 02:14.50 `motion/screen/f-005.webp` ▅
- 02:15.00 `motion/screen/f-006.webp` ▃
- 02:15.50 `motion/screen/f-007.webp` ▃
- 02:16.00 `motion/screen/f-008.webp` ▅
- 02:16.50 `motion/screen/f-009.webp` ▃
- 02:17.00 `motion/screen/f-010.webp` ▃
- 02:17.50 `motion/screen/f-011.webp` ▅
- 02:18.00 `motion/screen/f-012.webp` ▃
- 02:18.50 `motion/screen/f-013.webp` ▆
- 02:19.00 `motion/screen/f-014.webp` ▄
- 02:19.50 `motion/screen/f-015.webp` ▃
- 02:20.00 `motion/screen/f-016.webp` ▅
- 02:20.50 `motion/screen/f-017.webp` ▄
- 02:21.00 `motion/screen/f-018.webp` ▃
- 02:21.50 `motion/screen/f-019.webp` ▅
- 02:22.00 `motion/screen/f-020.webp` ▄
- 02:22.50 `motion/screen/f-021.webp` ▃
- 02:23.00 `motion/screen/f-022.webp` ▅
- 02:23.50 `motion/screen/f-023.webp` ▇

### 21. Companions change roles

02:24.00–02:29.75 (5.75 s) · 24 frames at 4 fps, 0.250 s apart · morph, stagger, shape

Four companions in a row on pink: a dice, a blue figure, a bag, a dog. They melt one at a time, left to right, into simple shapes with faces (a heart, a rectangle, a triangle, a star). The heart then tips over into the next scene.

Motion: `▃▄▄▄▄▄▄▄▄▄▄▄▃▃▃▃▃▃▃▃▃▃▃▅`

- 02:24.00 `motion/roles/f-001.webp` ▃
- 02:24.25 `motion/roles/f-002.webp` ▄
- 02:24.50 `motion/roles/f-003.webp` ▄
- 02:24.75 `motion/roles/f-004.webp` ▄
- 02:25.00 `motion/roles/f-005.webp` ▄
- 02:25.25 `motion/roles/f-006.webp` ▄
- 02:25.50 `motion/roles/f-007.webp` ▄
- 02:25.75 `motion/roles/f-008.webp` ▄
- 02:26.00 `motion/roles/f-009.webp` ▄
- 02:26.25 `motion/roles/f-010.webp` ▄
- 02:26.50 `motion/roles/f-011.webp` ▄
- 02:26.75 `motion/roles/f-012.webp` ▄
- 02:27.00 `motion/roles/f-013.webp` ▃
- 02:27.25 `motion/roles/f-014.webp` ▃
- 02:27.50 `motion/roles/f-015.webp` ▃
- 02:27.75 `motion/roles/f-016.webp` ▃
- 02:28.00 `motion/roles/f-017.webp` ▃
- 02:28.25 `motion/roles/f-018.webp` ▃
- 02:28.50 `motion/roles/f-019.webp` ▃
- 02:28.75 `motion/roles/f-020.webp` ▃
- 02:29.00 `motion/roles/f-021.webp` ▃
- 02:29.25 `motion/roles/f-022.webp` ▃
- 02:29.50 `motion/roles/f-023.webp` ▃
- 02:29.75 `motion/roles/f-024.webp` ▅

### 22. COMPANIONS writes itself

02:37.25–02:46.50 (9.25 s) · 29 frames at 3 fps, 0.333 s apart · swirl, write-on, orbit

Small colored companions swirl around a blue frame in a loose ring. 'COMPANIONS' writes on letter by letter in hand-drawn caps in the middle while the ring keeps turning around it.

Motion: `▆▄▂▆▆▃▄▆▅▃▅▆▅▄▅▆▄▃▆▆▃▃▃▃▃▃▃▃▇`

- 02:37.25 `motion/companions/f-001.webp` ▆
- 02:37.58 `motion/companions/f-002.webp` ▄
- 02:37.92 `motion/companions/f-003.webp` ▂
- 02:38.25 `motion/companions/f-004.webp` ▆
- 02:38.58 `motion/companions/f-005.webp` ▆
- 02:38.92 `motion/companions/f-006.webp` ▃
- 02:39.25 `motion/companions/f-007.webp` ▄
- 02:39.58 `motion/companions/f-008.webp` ▆
- 02:39.92 `motion/companions/f-009.webp` ▅
- 02:40.25 `motion/companions/f-010.webp` ▃
- 02:40.58 `motion/companions/f-011.webp` ▅
- 02:40.92 `motion/companions/f-012.webp` ▆
- 02:41.25 `motion/companions/f-013.webp` ▅
- 02:41.58 `motion/companions/f-014.webp` ▄
- 02:41.92 `motion/companions/f-015.webp` ▅
- 02:42.25 `motion/companions/f-016.webp` ▆
- 02:42.58 `motion/companions/f-017.webp` ▄
- 02:42.92 `motion/companions/f-018.webp` ▃
- 02:43.25 `motion/companions/f-019.webp` ▆
- 02:43.58 `motion/companions/f-020.webp` ▆
- 02:43.92 `motion/companions/f-021.webp` ▃
- 02:44.25 `motion/companions/f-022.webp` ▃
- 02:44.58 `motion/companions/f-023.webp` ▃
- 02:44.92 `motion/companions/f-024.webp` ▃
- 02:45.25 `motion/companions/f-025.webp` ▃
- 02:45.58 `motion/companions/f-026.webp` ▃
- 02:45.92 `motion/companions/f-027.webp` ▃
- 02:46.25 `motion/companions/f-028.webp` ▃
- 02:46.58 `motion/companions/f-029.webp` ▇

### 23. A fight cloud

02:46.50–02:51.00 (4.50 s) · 28 frames at 6 fps, 0.167 s apart · slide-in, echo, cartoon cloud, squash

Amia slides in on a dark ground trailed by colored echoes of herself, and a row of Zelbas slides in with echoes from the other side. They collide in a burst of speed lines and become a yellow fight cloud with arms, legs and stars poking out.

Motion: `█▂▃▅▆▆▇▇▇▆▆▆▅▆▆▇▇▆▆▇▆▆▇▆▆▆▆▇`

- 02:46.50 `motion/fight/f-001.webp` █
- 02:46.67 `motion/fight/f-002.webp` ▂
- 02:46.83 `motion/fight/f-003.webp` ▃
- 02:47.00 `motion/fight/f-004.webp` ▅
- 02:47.17 `motion/fight/f-005.webp` ▆
- 02:47.33 `motion/fight/f-006.webp` ▆
- 02:47.50 `motion/fight/f-007.webp` ▇
- 02:47.67 `motion/fight/f-008.webp` ▇
- 02:47.83 `motion/fight/f-009.webp` ▇
- 02:48.00 `motion/fight/f-010.webp` ▆
- 02:48.17 `motion/fight/f-011.webp` ▆
- 02:48.33 `motion/fight/f-012.webp` ▆
- 02:48.50 `motion/fight/f-013.webp` ▅
- 02:48.67 `motion/fight/f-014.webp` ▆
- 02:48.83 `motion/fight/f-015.webp` ▆
- 02:49.00 `motion/fight/f-016.webp` ▇
- 02:49.17 `motion/fight/f-017.webp` ▇
- 02:49.33 `motion/fight/f-018.webp` ▆
- 02:49.50 `motion/fight/f-019.webp` ▆
- 02:49.67 `motion/fight/f-020.webp` ▇
- 02:49.83 `motion/fight/f-021.webp` ▆
- 02:50.00 `motion/fight/f-022.webp` ▆
- 02:50.17 `motion/fight/f-023.webp` ▇
- 02:50.33 `motion/fight/f-024.webp` ▆
- 02:50.50 `motion/fight/f-025.webp` ▆
- 02:50.67 `motion/fight/f-026.webp` ▆
- 02:50.83 `motion/fight/f-027.webp` ▆
- 02:51.00 `motion/fight/f-028.webp` ▇

### 24. A monster, then a friend

02:51.00–03:00.00 (9.00 s) · 37 frames at 4 fps, 0.250 s apart · loom, warm wipe, reach

Zelba looms over a crouching Amia as a spiky, toothy monster, reaching for her twice. Giant faces of her parents watch from the edges. A warm orange glow spreads in and the monster softens back into smiling Zelba, who helps her up into a hug.

Motion: `▇▅▃▅▃▅▃▅▃▅▇▆▄▆▃▅▄▅▃▅▄▅▃▆▆▅▃▃▃▆▅▄▅▆▅▅▅`

- 02:51.00 `motion/monster/f-001.webp` ▇
- 02:51.25 `motion/monster/f-002.webp` ▅
- 02:51.50 `motion/monster/f-003.webp` ▃
- 02:51.75 `motion/monster/f-004.webp` ▅
- 02:52.00 `motion/monster/f-005.webp` ▃
- 02:52.25 `motion/monster/f-006.webp` ▅
- 02:52.50 `motion/monster/f-007.webp` ▃
- 02:52.75 `motion/monster/f-008.webp` ▅
- 02:53.00 `motion/monster/f-009.webp` ▃
- 02:53.25 `motion/monster/f-010.webp` ▅
- 02:53.50 `motion/monster/f-011.webp` ▇
- 02:53.75 `motion/monster/f-012.webp` ▆
- 02:54.00 `motion/monster/f-013.webp` ▄
- 02:54.25 `motion/monster/f-014.webp` ▆
- 02:54.50 `motion/monster/f-015.webp` ▃
- 02:54.75 `motion/monster/f-016.webp` ▅
- 02:55.00 `motion/monster/f-017.webp` ▄
- 02:55.25 `motion/monster/f-018.webp` ▅
- 02:55.50 `motion/monster/f-019.webp` ▃
- 02:55.75 `motion/monster/f-020.webp` ▅
- 02:56.00 `motion/monster/f-021.webp` ▄
- 02:56.25 `motion/monster/f-022.webp` ▅
- 02:56.50 `motion/monster/f-023.webp` ▃
- 02:56.75 `motion/monster/f-024.webp` ▆
- 02:57.00 `motion/monster/f-025.webp` ▆
- 02:57.25 `motion/monster/f-026.webp` ▅
- 02:57.50 `motion/monster/f-027.webp` ▃
- 02:57.75 `motion/monster/f-028.webp` ▃
- 02:58.00 `motion/monster/f-029.webp` ▃
- 02:58.25 `motion/monster/f-030.webp` ▆
- 02:58.50 `motion/monster/f-031.webp` ▅
- 02:58.75 `motion/monster/f-032.webp` ▄
- 02:59.00 `motion/monster/f-033.webp` ▅
- 02:59.25 `motion/monster/f-034.webp` ▆
- 02:59.50 `motion/monster/f-035.webp` ▅
- 02:59.75 `motion/monster/f-036.webp` ▅
- 03:00.00 `motion/monster/f-037.webp` ▅

### 25. The sea serpent

03:08.00–03:16.25 (8.25 s) · 34 frames at 4 fps, 0.250 s apart · slither, wrap, spiral, shrink

A line of blue drops from the top and becomes a toothy sea serpent that slithers across the floor, wraps around Amia in a spiral and squeezes. Then it unwinds, shrinks to a small tail, and is gone.

Motion: `▆▇▆▄▅▅▅▅▅▅▆▆▅▅▅▅▅▅▆▆▅▅▄▄▄▄▄▄▄▅▅▄▃▅`

- 03:08.00 `motion/serpent/f-001.webp` ▆
- 03:08.25 `motion/serpent/f-002.webp` ▇
- 03:08.50 `motion/serpent/f-003.webp` ▆
- 03:08.75 `motion/serpent/f-004.webp` ▄
- 03:09.00 `motion/serpent/f-005.webp` ▅
- 03:09.25 `motion/serpent/f-006.webp` ▅
- 03:09.50 `motion/serpent/f-007.webp` ▅
- 03:09.75 `motion/serpent/f-008.webp` ▅
- 03:10.00 `motion/serpent/f-009.webp` ▅
- 03:10.25 `motion/serpent/f-010.webp` ▅
- 03:10.50 `motion/serpent/f-011.webp` ▆
- 03:10.75 `motion/serpent/f-012.webp` ▆
- 03:11.00 `motion/serpent/f-013.webp` ▅
- 03:11.25 `motion/serpent/f-014.webp` ▅
- 03:11.50 `motion/serpent/f-015.webp` ▅
- 03:11.75 `motion/serpent/f-016.webp` ▅
- 03:12.00 `motion/serpent/f-017.webp` ▅
- 03:12.25 `motion/serpent/f-018.webp` ▅
- 03:12.50 `motion/serpent/f-019.webp` ▆
- 03:12.75 `motion/serpent/f-020.webp` ▆
- 03:13.00 `motion/serpent/f-021.webp` ▅
- 03:13.25 `motion/serpent/f-022.webp` ▅
- 03:13.50 `motion/serpent/f-023.webp` ▄
- 03:13.75 `motion/serpent/f-024.webp` ▄
- 03:14.00 `motion/serpent/f-025.webp` ▄
- 03:14.25 `motion/serpent/f-026.webp` ▄
- 03:14.50 `motion/serpent/f-027.webp` ▄
- 03:14.75 `motion/serpent/f-028.webp` ▄
- 03:15.00 `motion/serpent/f-029.webp` ▄
- 03:15.25 `motion/serpent/f-030.webp` ▅
- 03:15.50 `motion/serpent/f-031.webp` ▅
- 03:15.75 `motion/serpent/f-032.webp` ▄
- 03:16.00 `motion/serpent/f-033.webp` ▃
- 03:16.25 `motion/serpent/f-034.webp` ▅

### 26. An argument in shapes

03:16.25–03:23.75 (7.50 s) · 31 frames at 4 fps, 0.250 s apart · close-up, jagged shapes, alternating

Close profiles face off from opposite edges: Amia and a blue face, then a real girl. Jagged speech shapes in orange, blue and yellow shoot back and forth between them, swapping every quarter second, until both glare.

Motion: `▅▇▆▅▆▇▆▆▇▆▆▇▆▆▇▆▆▇▆▆▇▆▆▇▆▅▄▃▃▆█`

- 03:16.25 `motion/argue/f-001.webp` ▅
- 03:16.50 `motion/argue/f-002.webp` ▇
- 03:16.75 `motion/argue/f-003.webp` ▆
- 03:17.00 `motion/argue/f-004.webp` ▅
- 03:17.25 `motion/argue/f-005.webp` ▆
- 03:17.50 `motion/argue/f-006.webp` ▇
- 03:17.75 `motion/argue/f-007.webp` ▆
- 03:18.00 `motion/argue/f-008.webp` ▆
- 03:18.25 `motion/argue/f-009.webp` ▇
- 03:18.50 `motion/argue/f-010.webp` ▆
- 03:18.75 `motion/argue/f-011.webp` ▆
- 03:19.00 `motion/argue/f-012.webp` ▇
- 03:19.25 `motion/argue/f-013.webp` ▆
- 03:19.50 `motion/argue/f-014.webp` ▆
- 03:19.75 `motion/argue/f-015.webp` ▇
- 03:20.00 `motion/argue/f-016.webp` ▆
- 03:20.25 `motion/argue/f-017.webp` ▆
- 03:20.50 `motion/argue/f-018.webp` ▇
- 03:20.75 `motion/argue/f-019.webp` ▆
- 03:21.00 `motion/argue/f-020.webp` ▆
- 03:21.25 `motion/argue/f-021.webp` ▇
- 03:21.50 `motion/argue/f-022.webp` ▆
- 03:21.75 `motion/argue/f-023.webp` ▆
- 03:22.00 `motion/argue/f-024.webp` ▇
- 03:22.25 `motion/argue/f-025.webp` ▆
- 03:22.50 `motion/argue/f-026.webp` ▅
- 03:22.75 `motion/argue/f-027.webp` ▄
- 03:23.00 `motion/argue/f-028.webp` ▃
- 03:23.25 `motion/argue/f-029.webp` ▃
- 03:23.50 `motion/argue/f-030.webp` ▆
- 03:23.75 `motion/argue/f-031.webp` █

### 27. Making up

03:23.75–03:30.00 (6.25 s) · 26 frames at 4 fps, 0.250 s apart · pull-back, hug, tilt up

The two girls on a playground mark, arms folded, then reach out, shake hands and hug. The camera tilts up the building to its rooftop at night.

Motion: `█▅▃▃▃▂▃▃▃▃▃▃▃▄▃▃▅▅▅▄▆▇█▇▇▆`

- 03:23.75 `motion/make-up/f-001.webp` █
- 03:24.00 `motion/make-up/f-002.webp` ▅
- 03:24.25 `motion/make-up/f-003.webp` ▃
- 03:24.50 `motion/make-up/f-004.webp` ▃
- 03:24.75 `motion/make-up/f-005.webp` ▃
- 03:25.00 `motion/make-up/f-006.webp` ▂
- 03:25.25 `motion/make-up/f-007.webp` ▃
- 03:25.50 `motion/make-up/f-008.webp` ▃
- 03:25.75 `motion/make-up/f-009.webp` ▃
- 03:26.00 `motion/make-up/f-010.webp` ▃
- 03:26.25 `motion/make-up/f-011.webp` ▃
- 03:26.50 `motion/make-up/f-012.webp` ▃
- 03:26.75 `motion/make-up/f-013.webp` ▃
- 03:27.00 `motion/make-up/f-014.webp` ▄
- 03:27.25 `motion/make-up/f-015.webp` ▃
- 03:27.50 `motion/make-up/f-016.webp` ▃
- 03:27.75 `motion/make-up/f-017.webp` ▅
- 03:28.00 `motion/make-up/f-018.webp` ▅
- 03:28.25 `motion/make-up/f-019.webp` ▅
- 03:28.50 `motion/make-up/f-020.webp` ▄
- 03:28.75 `motion/make-up/f-021.webp` ▆
- 03:29.00 `motion/make-up/f-022.webp` ▇
- 03:29.25 `motion/make-up/f-023.webp` █
- 03:29.50 `motion/make-up/f-024.webp` ▇
- 03:29.75 `motion/make-up/f-025.webp` ▇
- 03:30.00 `motion/make-up/f-026.webp` ▆

### 28. Stars drawn on the rooftop

03:30.00–03:48.00 (18.00 s) · 37 frames at 2 fps, 0.500 s apart · dotted line, draw-on, twinkle, fade

On a rooftop at night, Zelba and Amia watch dotted-line drawings sparkle on and off in the sky: hearts, faces, stars, people. Zelba moves to sit away from her, then back. At 3:40 he flickers out and she stands alone, then walks through the door.

Motion: `▅▂▃▃▃▄▃▃▃▃▄▂▃▃▃▄▃▃▃▂▃▃▂▂▂▂▂▂▂▂▃▃▃▂▂▅▆`

- 03:30.00 `motion/rooftop/f-001.webp` ▅
- 03:30.50 `motion/rooftop/f-002.webp` ▂
- 03:31.00 `motion/rooftop/f-003.webp` ▃
- 03:31.50 `motion/rooftop/f-004.webp` ▃
- 03:32.00 `motion/rooftop/f-005.webp` ▃
- 03:32.50 `motion/rooftop/f-006.webp` ▄
- 03:33.00 `motion/rooftop/f-007.webp` ▃
- 03:33.50 `motion/rooftop/f-008.webp` ▃
- 03:34.00 `motion/rooftop/f-009.webp` ▃
- 03:34.50 `motion/rooftop/f-010.webp` ▃
- 03:35.00 `motion/rooftop/f-011.webp` ▄
- 03:35.50 `motion/rooftop/f-012.webp` ▂
- 03:36.00 `motion/rooftop/f-013.webp` ▃
- 03:36.50 `motion/rooftop/f-014.webp` ▃
- 03:37.00 `motion/rooftop/f-015.webp` ▃
- 03:37.50 `motion/rooftop/f-016.webp` ▄
- 03:38.00 `motion/rooftop/f-017.webp` ▃
- 03:38.50 `motion/rooftop/f-018.webp` ▃
- 03:39.00 `motion/rooftop/f-019.webp` ▃
- 03:39.50 `motion/rooftop/f-020.webp` ▂
- 03:40.00 `motion/rooftop/f-021.webp` ▃
- 03:40.50 `motion/rooftop/f-022.webp` ▃
- 03:41.00 `motion/rooftop/f-023.webp` ▂
- 03:41.50 `motion/rooftop/f-024.webp` ▂
- 03:42.00 `motion/rooftop/f-025.webp` ▂
- 03:42.50 `motion/rooftop/f-026.webp` ▂
- 03:43.00 `motion/rooftop/f-027.webp` ▂
- 03:43.50 `motion/rooftop/f-028.webp` ▂
- 03:44.00 `motion/rooftop/f-029.webp` ▂
- 03:44.50 `motion/rooftop/f-030.webp` ▂
- 03:45.00 `motion/rooftop/f-031.webp` ▃
- 03:45.50 `motion/rooftop/f-032.webp` ▃
- 03:46.00 `motion/rooftop/f-033.webp` ▃
- 03:46.50 `motion/rooftop/f-034.webp` ▂
- 03:47.00 `motion/rooftop/f-035.webp` ▂
- 03:47.50 `motion/rooftop/f-036.webp` ▅
- 03:48.00 `motion/rooftop/f-037.webp` ▆

### 29. A life in photos

03:48.25–03:54.75 (6.50 s) · 27 frames at 4 fps, 0.250 s apart · drop-in, stack, swipe away

Polaroids drop in and pile up on dark red, each labelled with her age: Amia 2 yrs, 7 yrs, 14 yrs, 18, 25, 36, 53, 87. A hand sweeps them off the table and the next scene is under them.

Motion: `▇▇▇▇▆▆▆▆▆▆▆▆▆▆▆▆▆▆▄▃▃▄▇▇▇▇▇`

- 03:48.25 `motion/photos/f-001.webp` ▇
- 03:48.50 `motion/photos/f-002.webp` ▇
- 03:48.75 `motion/photos/f-003.webp` ▇
- 03:49.00 `motion/photos/f-004.webp` ▇
- 03:49.25 `motion/photos/f-005.webp` ▆
- 03:49.50 `motion/photos/f-006.webp` ▆
- 03:49.75 `motion/photos/f-007.webp` ▆
- 03:50.00 `motion/photos/f-008.webp` ▆
- 03:50.25 `motion/photos/f-009.webp` ▆
- 03:50.50 `motion/photos/f-010.webp` ▆
- 03:50.75 `motion/photos/f-011.webp` ▆
- 03:51.00 `motion/photos/f-012.webp` ▆
- 03:51.25 `motion/photos/f-013.webp` ▆
- 03:51.50 `motion/photos/f-014.webp` ▆
- 03:51.75 `motion/photos/f-015.webp` ▆
- 03:52.00 `motion/photos/f-016.webp` ▆
- 03:52.25 `motion/photos/f-017.webp` ▆
- 03:52.50 `motion/photos/f-018.webp` ▆
- 03:52.75 `motion/photos/f-019.webp` ▄
- 03:53.00 `motion/photos/f-020.webp` ▃
- 03:53.25 `motion/photos/f-021.webp` ▃
- 03:53.50 `motion/photos/f-022.webp` ▄
- 03:53.75 `motion/photos/f-023.webp` ▇
- 03:54.00 `motion/photos/f-024.webp` ▇
- 03:54.25 `motion/photos/f-025.webp` ▇
- 03:54.50 `motion/photos/f-026.webp` ▇
- 03:54.75 `motion/photos/f-027.webp` ▇

### 30. Pretend weights

04:03.00–04:09.00 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · bloom, lift, grow

An orange bloom washes over the table into yellow, where Zelba cheers in the foreground. A small Amia strains at a barbell, then in one cut she has grown into a strong woman hoisting a huge one overhead.

Motion: `▇▇▇▆▆▆▆▆▆▆▆▆▆▄▃▄▆▅▂▂▂▂▆▇▇`

- 04:03.00 `motion/lift/f-001.webp` ▇
- 04:03.25 `motion/lift/f-002.webp` ▇
- 04:03.50 `motion/lift/f-003.webp` ▇
- 04:03.75 `motion/lift/f-004.webp` ▆
- 04:04.00 `motion/lift/f-005.webp` ▆
- 04:04.25 `motion/lift/f-006.webp` ▆
- 04:04.50 `motion/lift/f-007.webp` ▆
- 04:04.75 `motion/lift/f-008.webp` ▆
- 04:05.00 `motion/lift/f-009.webp` ▆
- 04:05.25 `motion/lift/f-010.webp` ▆
- 04:05.50 `motion/lift/f-011.webp` ▆
- 04:05.75 `motion/lift/f-012.webp` ▆
- 04:06.00 `motion/lift/f-013.webp` ▆
- 04:06.25 `motion/lift/f-014.webp` ▄
- 04:06.50 `motion/lift/f-015.webp` ▃
- 04:06.75 `motion/lift/f-016.webp` ▄
- 04:07.00 `motion/lift/f-017.webp` ▆
- 04:07.25 `motion/lift/f-018.webp` ▅
- 04:07.50 `motion/lift/f-019.webp` ▂
- 04:07.75 `motion/lift/f-020.webp` ▂
- 04:08.00 `motion/lift/f-021.webp` ▂
- 04:08.25 `motion/lift/f-022.webp` ▂
- 04:08.50 `motion/lift/f-023.webp` ▆
- 04:08.75 `motion/lift/f-024.webp` ▇
- 04:09.00 `motion/lift/f-025.webp` ▇

### 31. Theory of mind

04:09.00–04:22.00 (13.00 s) · 27 frames at 2 fps, 0.500 s apart · arc type, pop-in, embrace

Amia with Zelba behind her. 'THEORY OF MIND' arcs in over their heads word by word. A friend leans in and a crying girl appears, and Amia's face reads each of them. Zelba's arms stretch out and gather the whole group into one hug.

Motion: `▇▄▄▄▄▄▄▄▄▅▄▄▄▅▅▅▄▅▅▄▅▆▇▆▅▃▃`

- 04:09.00 `motion/theory/f-001.webp` ▇
- 04:09.50 `motion/theory/f-002.webp` ▄
- 04:10.00 `motion/theory/f-003.webp` ▄
- 04:10.50 `motion/theory/f-004.webp` ▄
- 04:11.00 `motion/theory/f-005.webp` ▄
- 04:11.50 `motion/theory/f-006.webp` ▄
- 04:12.00 `motion/theory/f-007.webp` ▄
- 04:12.50 `motion/theory/f-008.webp` ▄
- 04:13.00 `motion/theory/f-009.webp` ▄
- 04:13.50 `motion/theory/f-010.webp` ▅
- 04:14.00 `motion/theory/f-011.webp` ▄
- 04:14.50 `motion/theory/f-012.webp` ▄
- 04:15.00 `motion/theory/f-013.webp` ▄
- 04:15.50 `motion/theory/f-014.webp` ▅
- 04:16.00 `motion/theory/f-015.webp` ▅
- 04:16.50 `motion/theory/f-016.webp` ▅
- 04:17.00 `motion/theory/f-017.webp` ▄
- 04:17.50 `motion/theory/f-018.webp` ▅
- 04:18.00 `motion/theory/f-019.webp` ▅
- 04:18.50 `motion/theory/f-020.webp` ▄
- 04:19.00 `motion/theory/f-021.webp` ▅
- 04:19.50 `motion/theory/f-022.webp` ▆
- 04:20.00 `motion/theory/f-023.webp` ▇
- 04:20.50 `motion/theory/f-024.webp` ▆
- 04:21.00 `motion/theory/f-025.webp` ▅
- 04:21.50 `motion/theory/f-026.webp` ▃
- 04:22.00 `motion/theory/f-027.webp` ▃

### 32. Zelba leaves through the mirror

04:23.25–04:30.00 (6.75 s) · 21 frames at 3 fps, 0.333 s apart · melt, pour, reflection

Zelba sits on the bathroom counter by the sink. He melts down into the basin and drains away, and when the mirror clears, the reflection is of grown-up Amia brushing her teeth.

Motion: `▇▂▂▃▂▄▄▃▂▂▃▄▅▆▂▃▅▃▃▆▄`

- 04:23.25 `motion/mirror/f-001.webp` ▇
- 04:23.58 `motion/mirror/f-002.webp` ▂
- 04:23.92 `motion/mirror/f-003.webp` ▂
- 04:24.25 `motion/mirror/f-004.webp` ▃
- 04:24.58 `motion/mirror/f-005.webp` ▂
- 04:24.92 `motion/mirror/f-006.webp` ▄
- 04:25.25 `motion/mirror/f-007.webp` ▄
- 04:25.58 `motion/mirror/f-008.webp` ▃
- 04:25.92 `motion/mirror/f-009.webp` ▂
- 04:26.25 `motion/mirror/f-010.webp` ▂
- 04:26.58 `motion/mirror/f-011.webp` ▃
- 04:26.92 `motion/mirror/f-012.webp` ▄
- 04:27.25 `motion/mirror/f-013.webp` ▅
- 04:27.58 `motion/mirror/f-014.webp` ▆
- 04:27.92 `motion/mirror/f-015.webp` ▂
- 04:28.25 `motion/mirror/f-016.webp` ▃
- 04:28.58 `motion/mirror/f-017.webp` ▅
- 04:28.92 `motion/mirror/f-018.webp` ▃
- 04:29.25 `motion/mirror/f-019.webp` ▃
- 04:29.58 `motion/mirror/f-020.webp` ▆
- 04:29.92 `motion/mirror/f-021.webp` ▄

### 33. The room pulls back to a dollhouse

04:35.75–04:39.00 (3.25 s) · 21 frames at 6 fps, 0.167 s apart · pull-back, reveal, scale

Grown-up Amia on her sofa talking to her cat. The camera pulls back fast: the room is a yellow dollhouse box, and Zelba is leaning over it, looking in.

Motion: `▃▃▆██▃▃▃▃▃▂▃▃▃▃▃▄▄▇▅▆`

- 04:35.75 `motion/dollhouse/f-001.webp` ▃
- 04:35.92 `motion/dollhouse/f-002.webp` ▃
- 04:36.08 `motion/dollhouse/f-003.webp` ▆
- 04:36.25 `motion/dollhouse/f-004.webp` █
- 04:36.42 `motion/dollhouse/f-005.webp` █
- 04:36.58 `motion/dollhouse/f-006.webp` ▃
- 04:36.75 `motion/dollhouse/f-007.webp` ▃
- 04:36.92 `motion/dollhouse/f-008.webp` ▃
- 04:37.08 `motion/dollhouse/f-009.webp` ▃
- 04:37.25 `motion/dollhouse/f-010.webp` ▃
- 04:37.42 `motion/dollhouse/f-011.webp` ▂
- 04:37.58 `motion/dollhouse/f-012.webp` ▃
- 04:37.75 `motion/dollhouse/f-013.webp` ▃
- 04:37.92 `motion/dollhouse/f-014.webp` ▃
- 04:38.08 `motion/dollhouse/f-015.webp` ▃
- 04:38.25 `motion/dollhouse/f-016.webp` ▃
- 04:38.42 `motion/dollhouse/f-017.webp` ▄
- 04:38.58 `motion/dollhouse/f-018.webp` ▄
- 04:38.75 `motion/dollhouse/f-019.webp` ▇
- 04:38.92 `motion/dollhouse/f-020.webp` ▅
- 04:39.08 `motion/dollhouse/f-021.webp` ▆

### 34. Grown up, side by side

04:38.50–04:50.00 (11.50 s) · 24 frames at 2 fps, 0.500 s apart · reach, pull, bloom, walk-by

Zelba appears beside the grown-up Amia. She talks, he listens, reaches over her head and pulls her into a hug, then hands her a drink. A yellow cloud bloom drops in around them as a sofa, and a girl walks past with her own pink imaginary friend.

Motion: `▆▆▄▃▄▄▅▄▃▄▅▅▇▆▃▂▃▃▄▄▅▅▅▆`

- 04:38.50 `motion/together/f-001.webp` ▆
- 04:39.00 `motion/together/f-002.webp` ▆
- 04:39.50 `motion/together/f-003.webp` ▄
- 04:40.00 `motion/together/f-004.webp` ▃
- 04:40.50 `motion/together/f-005.webp` ▄
- 04:41.00 `motion/together/f-006.webp` ▄
- 04:41.50 `motion/together/f-007.webp` ▅
- 04:42.00 `motion/together/f-008.webp` ▄
- 04:42.50 `motion/together/f-009.webp` ▃
- 04:43.00 `motion/together/f-010.webp` ▄
- 04:43.50 `motion/together/f-011.webp` ▅
- 04:44.00 `motion/together/f-012.webp` ▅
- 04:44.50 `motion/together/f-013.webp` ▇
- 04:45.00 `motion/together/f-014.webp` ▆
- 04:45.50 `motion/together/f-015.webp` ▃
- 04:46.00 `motion/together/f-016.webp` ▂
- 04:46.50 `motion/together/f-017.webp` ▃
- 04:47.00 `motion/together/f-018.webp` ▃
- 04:47.50 `motion/together/f-019.webp` ▄
- 04:48.00 `motion/together/f-020.webp` ▄
- 04:48.50 `motion/together/f-021.webp` ▅
- 04:49.00 `motion/together/f-022.webp` ▅
- 04:49.50 `motion/together/f-023.webp` ▅
- 04:50.00 `motion/together/f-024.webp` ▆

### 35. Back to the family

04:53.00–05:04.00 (11.00 s) · 23 frames at 2 fps, 0.500 s apart · wipe, morph, bounce, end card

The sofa scene slides away into dark red. On near-black, Zelba lies back and melts into the bouncing family of yellow creatures from 1:56, the same loop, now with 'TED.COM/PLAY' above.

Motion: `▄▅▆▅▆▂▅▅▄▄▄▄▄▄▄▄▄▄▄▄▄▅▇`

- 04:53.00 `motion/end/f-001.webp` ▄
- 04:53.50 `motion/end/f-002.webp` ▅
- 04:54.00 `motion/end/f-003.webp` ▆
- 04:54.50 `motion/end/f-004.webp` ▅
- 04:55.00 `motion/end/f-005.webp` ▆
- 04:55.50 `motion/end/f-006.webp` ▂
- 04:56.00 `motion/end/f-007.webp` ▅
- 04:56.50 `motion/end/f-008.webp` ▅
- 04:57.00 `motion/end/f-009.webp` ▄
- 04:57.50 `motion/end/f-010.webp` ▄
- 04:58.00 `motion/end/f-011.webp` ▄
- 04:58.50 `motion/end/f-012.webp` ▄
- 04:59.00 `motion/end/f-013.webp` ▄
- 04:59.50 `motion/end/f-014.webp` ▄
- 05:00.00 `motion/end/f-015.webp` ▄
- 05:00.50 `motion/end/f-016.webp` ▄
- 05:01.00 `motion/end/f-017.webp` ▄
- 05:01.50 `motion/end/f-018.webp` ▄
- 05:02.00 `motion/end/f-019.webp` ▄
- 05:02.50 `motion/end/f-020.webp` ▄
- 05:03.00 `motion/end/f-021.webp` ▄
- 05:03.50 `motion/end/f-022.webp` ▅
- 05:04.00 `motion/end/f-023.webp` ▇

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:02.00 `seconds/second-00003.webp` Partner card: 'This lesson was made in partnership with LEGO, LEGO Foundation.'
- 00:07.00 `seconds/second-00008.webp` A pink hand and a blue hand grip in close-up. The relationship before the characters.
- 00:09.00 `seconds/second-00010.webp` Amia and Zelba hand in hand on yellow: flat saturated color with thin colored outlines, Zelba already glowing.
- 00:12.00 `seconds/second-00013.webp` Inside the whisper bloom: flat orange, with faint line art drawing in at the edges.
- 00:15.00 `seconds/second-00016.webp` Memory as line art: the two of them ruling a castle, drawn in thin blue line on turquoise.
- 00:19.00 `seconds/second-00020.webp` Amia's face in orange line on yellow, doodles drifting out as she talks.
- 00:23.00 `seconds/second-00024.webp` The same faces after a red wash, Zelba's color drained to pink.
- 00:26.00 `seconds/second-00027.webp` Line-art dinner: the spaghetti goes on her head.
- 00:31.00 `seconds/second-00032.webp` Color blooms back: the bad idea in full color, Amia smiling under the noodles.
- 00:33.00 `seconds/second-00034.webp` Extreme close-ups of the parents, frozen in shock.
- 00:36.00 `seconds/second-00037.webp` Zelba fades in at the table and hugs her, glowing.
- 00:41.00 `seconds/second-00042.webp` A yellow thought cloud on pink with sparkles: what the two of them share.
- 00:45.00 `seconds/second-00046.webp` Other kids crowd in from the bottom edge, reaching.
- 00:49.00 `seconds/second-00050.webp` The pair melted to a line with bumps, mid-morph into a family.
- 00:53.00 `seconds/second-00054.webp` The family with a blue friend and a monkey added at the edges.
- 00:57.00 `seconds/second-00058.webp` Top-down playground, every kid on a loop.
- 01:04.00 `seconds/second-00065.webp` Alone at a birthday table, blowing out candles.
- 01:12.00 `seconds/second-00073.webp` The table packed with imaginary guests of every shape.
- 01:17.00 `seconds/second-00078.webp` Line-drawn kids on pink, each one's imaginary friend in color beside them.
- 01:20.00 `seconds/second-00081.webp` Zelba as a blue heart around Amia.
- 01:24.00 `seconds/second-00085.webp` A story cloud with a sea serpent blooms in the classroom.
- 01:28.00 `seconds/second-00089.webp` Words and equations stream out of Amia's mouth in blue script.
- 01:34.00 `seconds/second-00095.webp` The teacher's pointing arm, the same swing on a loop.
- 01:46.00 `seconds/second-00107.webp` Zelba as a blue cat, one of many shapes in a few seconds.
- 01:50.00 `seconds/second-00111.webp` Imaginary friends in trios: an old woman, a girl, a dancer.
- 01:52.00 `seconds/second-00113.webp` A princess, a witch and a long-nosed puppet.
- 01:57.00 `seconds/second-00118.webp` A family of yellow creatures, each bouncing on its own loop.
- 02:03.00 `seconds/second-00124.webp` The toybox open, toys climbing out.
- 02:11.00 `seconds/second-00132.webp` A globe with companions popping onto its surface.
- 02:14.00 `seconds/second-00135.webp` The film within the film: an audience watching Amia and Zelba on a projected flag.
- 02:21.00 `seconds/second-00142.webp` A cartoon car with a face on the projected screen.
- 02:27.00 `seconds/second-00148.webp` Companions turned into shapes with faces: heart, rectangle, triangle, star.
- 02:31.00 `seconds/second-00152.webp` A child in bed with a blue companion sprawled on the rug, a cozy cutaway room.
- 02:32.00 `seconds/second-00153.webp` A pink companion as the scapegoat for 'I ♥ MUMMY' drawn on the wall.
- 02:34.00 `seconds/second-00155.webp` A toy car racing across the rug as an errand buddy.
- 02:36.00 `seconds/second-00157.webp` Feeding a baby companion with a spoon: the caregiving role.
- 02:43.00 `seconds/second-00164.webp` 'COMPANIONS' hand-lettered in a ring of small characters.
- 02:48.00 `seconds/second-00169.webp` Amia and a row of Zelbas collide, colored echoes behind each.
- 02:50.00 `seconds/second-00171.webp` The fight as a yellow cartoon cloud.
- 02:52.00 `seconds/second-00173.webp` Zelba as a spiky monster over a crouching Amia.
- 02:57.00 `seconds/second-00178.webp` Warm orange: the monster softens back into Zelba.
- 03:00.00 `seconds/second-00181.webp` A hug on orange, the conflict over.
- 03:03.00 `seconds/second-00184.webp` Three kids on yellow with companions passing between them.
- 03:11.00 `seconds/second-00192.webp` The sea serpent wrapped around Amia in a spiral.
- 03:18.00 `seconds/second-00199.webp` An argument in jagged shapes between close profiles.
- 03:25.00 `seconds/second-00206.webp` Two girls make up, then hug.
- 03:32.00 `seconds/second-00213.webp` The rooftop at night with dotted-line drawings in the sky.
- 03:35.00 `seconds/second-00216.webp` Zelba moves to sit on the far wall, away from her.
- 03:42.00 `seconds/second-00223.webp` Zelba has flickered out; Amia alone under a shooting star.
- 03:46.00 `seconds/second-00227.webp` The empty rooftop as she leaves through the door.
- 03:52.00 `seconds/second-00233.webp` Polaroids of Amia at 2, 7, 14, 18, 25, 36, 53 and 87.
- 03:56.00 `seconds/second-00237.webp` A round table of kids and companions, all equal.
- 04:07.00 `seconds/second-00248.webp` The barbell grown huge, Amia hoisting it overhead.
- 04:12.00 `seconds/second-00253.webp` 'THEORY OF MIND' arcing over Amia and Zelba.
- 04:21.00 `seconds/second-00262.webp` Zelba's arms stretch round the whole group.
- 04:25.00 `seconds/second-00266.webp` Zelba on the bathroom counter by the sink.
- 04:29.00 `seconds/second-00270.webp` The reflection is grown-up Amia.
- 04:31.00 `seconds/second-00272.webp` Rehearsing in the shower.
- 04:34.00 `seconds/second-00275.webp` Grown-up Amia talking to her cat from the sofa.
- 04:38.00 `seconds/second-00279.webp` The room is a dollhouse with Zelba looking in.
- 04:44.00 `seconds/second-00285.webp` Grown-up Amia and Zelba side by side with drinks.
- 04:50.00 `seconds/second-00291.webp` A girl with her own pink imaginary friend walks past.
- 05:00.00 `seconds/second-00301.webp` End card: the family of yellow creatures again, 'TED.COM/PLAY' above.
