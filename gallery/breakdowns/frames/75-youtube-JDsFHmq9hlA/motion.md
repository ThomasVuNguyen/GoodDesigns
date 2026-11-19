# Motion notes: What we make of this moment, will make this moment.

Anthropic · 01:12.02 · https://www.youtube.com/watch?v=JDsFHmq9hlA

Almost nothing in the footage is animated. The motion is in the type and the cutting. A word or two of a question sits on each shot, a median shot of 0.96 seconds and eleven cuts in the busiest ten seconds, and the type moves only when the word asks for it: 'incurable?' assembles, 'see?' rises out of braille, 'second?' smears with speed, 'allergies?' hides behind test tubes. Then the film flips its rhythm. A single wordless shot of Earth holds for three and a half seconds, and a 19-second dive follows that the cut detector barely sees, because each project image pushes in and dissolves into the next. The logo moves twice, at each end. The sequences below follow the open through the slash, the word moves, the pause on Earth, the dive and the logo swap.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▁▁▁▁▆▅▇▇▆▇█▅▆▆▄▅▅▄▅▅▅▅▆▅▆▂▄▅▆▅▅▇▅▅▅▆▆▆▁▁▃▇▆▅▆▆▆▆▆▆▆▆▆▇▆▅▆▆▆▆
01:00  ▆▁▁▁▁▁▁▁▁▁▁▁▁
```

## Sequences

### 01. The wordmark builds, then its slash opens into the film

00:00.00–00:05.20 (5.20 s) · 43 frames at 8 fps, 0.125 s apart · glyph scramble, logo build, mask, push in

'A\' sits alone on cream paper until about 0.4. From 0.5 the wordmark unfolds outward from it, and each new letter slot cycles through stand-in glyphs (an X, a sprig, a flower-like asterisk where the O will go) before resolving. ANTHROP\C is complete by 1.75 and holds while the voice finishes its line. At 3.9 the backslash starts to lean and widen, by 4.4 it is a dark parallelogram twice the width of a letter, and at 4.6 it fills with footage as the camera pushes toward it, the letters sliding off both sides. By 4.75 the slash is the frame: a gloved hand holding a vial, and the first word, 'Can'.

Motion: `▁▁▁▁▁▁▁▁▁▁▂▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▃▃▃▄▅▆▇▇▅▄▃`

- 00:00.00 `motion/logo-open/f-001.webp` ▁
- 00:00.12 `motion/logo-open/f-002.webp` ▁
- 00:00.25 `motion/logo-open/f-003.webp` ▁
- 00:00.38 `motion/logo-open/f-004.webp` ▁
- 00:00.50 `motion/logo-open/f-005.webp` ▁
- 00:00.62 `motion/logo-open/f-006.webp` ▁
- 00:00.75 `motion/logo-open/f-007.webp` ▁
- 00:00.88 `motion/logo-open/f-008.webp` ▁
- 00:01.00 `motion/logo-open/f-009.webp` ▁
- 00:01.12 `motion/logo-open/f-010.webp` ▁
- 00:01.25 `motion/logo-open/f-011.webp` ▂
- 00:01.38 `motion/logo-open/f-012.webp` ▁
- 00:01.50 `motion/logo-open/f-013.webp` ▁
- 00:01.62 `motion/logo-open/f-014.webp` ▁
- 00:01.75 `motion/logo-open/f-015.webp` ▂
- 00:01.88 `motion/logo-open/f-016.webp` ▁
- 00:02.00 `motion/logo-open/f-017.webp` ▁
- 00:02.12 `motion/logo-open/f-018.webp` ▁
- 00:02.25 `motion/logo-open/f-019.webp` ▁
- 00:02.38 `motion/logo-open/f-020.webp` ▁
- 00:02.50 `motion/logo-open/f-021.webp` ▁
- 00:02.62 `motion/logo-open/f-022.webp` ▁
- 00:02.75 `motion/logo-open/f-023.webp` ▁
- 00:02.88 `motion/logo-open/f-024.webp` ▁
- 00:03.00 `motion/logo-open/f-025.webp` ▁
- 00:03.12 `motion/logo-open/f-026.webp` ▁
- 00:03.25 `motion/logo-open/f-027.webp` ▁
- 00:03.38 `motion/logo-open/f-028.webp` ▁
- 00:03.50 `motion/logo-open/f-029.webp` ▁
- 00:03.62 `motion/logo-open/f-030.webp` ▁
- 00:03.75 `motion/logo-open/f-031.webp` ▁
- 00:03.88 `motion/logo-open/f-032.webp` ▂
- 00:04.00 `motion/logo-open/f-033.webp` ▃
- 00:04.12 `motion/logo-open/f-034.webp` ▃
- 00:04.25 `motion/logo-open/f-035.webp` ▃
- 00:04.38 `motion/logo-open/f-036.webp` ▄
- 00:04.50 `motion/logo-open/f-037.webp` ▅
- 00:04.62 `motion/logo-open/f-038.webp` ▆
- 00:04.75 `motion/logo-open/f-039.webp` ▇
- 00:04.88 `motion/logo-open/f-040.webp` ▇
- 00:05.00 `motion/logo-open/f-041.webp` ▅
- 00:05.12 `motion/logo-open/f-042.webp` ▄
- 00:05.25 `motion/logo-open/f-043.webp` ▃

### 02. 'incurable?' gathers around a laughing face

00:06.60–00:08.05 (1.45 s) · 18 frames at 12 fps, 0.083 s apart · kinetic type, letters assemble, handheld, whip

At 6.64 the film whips from the applauding ward into a blurred close-up of the girl laughing. By 7.0 the letters of 'incurable?' are scattered across the frame around her face, a c up at the top, a u low, the question mark far right. Over the next half second they drift toward the center, 'incurabl e ?' at 7.5, and the word is whole by 7.75. It is the first of the words that act out their meaning: the hardest word in the question comes together while she laughs.

Motion: `▇▇▇▇▇▇▆▇▇▆▇▇▇▇▇▆▇▆`

- 00:06.60 `motion/incurable/f-001.webp` ▇
- 00:06.68 `motion/incurable/f-002.webp` ▇
- 00:06.77 `motion/incurable/f-003.webp` ▇
- 00:06.85 `motion/incurable/f-004.webp` ▇
- 00:06.93 `motion/incurable/f-005.webp` ▇
- 00:07.02 `motion/incurable/f-006.webp` ▇
- 00:07.10 `motion/incurable/f-007.webp` ▆
- 00:07.18 `motion/incurable/f-008.webp` ▇
- 00:07.27 `motion/incurable/f-009.webp` ▇
- 00:07.35 `motion/incurable/f-010.webp` ▆
- 00:07.43 `motion/incurable/f-011.webp` ▇
- 00:07.52 `motion/incurable/f-012.webp` ▇
- 00:07.60 `motion/incurable/f-013.webp` ▇
- 00:07.68 `motion/incurable/f-014.webp` ▇
- 00:07.77 `motion/incurable/f-015.webp` ▇
- 00:07.85 `motion/incurable/f-016.webp` ▆
- 00:07.93 `motion/incurable/f-017.webp` ▇
- 00:08.02 `motion/incurable/f-018.webp` ▆

### 03. A dot grows into a halftone ring

00:08.00–00:09.00 (1.00 s) · 13 frames at 12 fps, 0.083 s apart · halftone, grow, distort, hard cut

A hard cut at 8.08 to black with one small orange dot in the center. It swells into a ring of rainbow halftone dots by 8.25, 'Do' in its hollow, then stretches and warps until its edge runs off frame at 8.5. 'more' arrives at 8.75 on the drifting edge. The same dot texture returns in the DNA helix at 19.2.

Motion: `▆█▃▄▅▅▆▆▅▆▅▇█`

- 00:08.00 `motion/halftone-ring/f-001.webp` ▆
- 00:08.08 `motion/halftone-ring/f-002.webp` █
- 00:08.17 `motion/halftone-ring/f-003.webp` ▃
- 00:08.25 `motion/halftone-ring/f-004.webp` ▄
- 00:08.33 `motion/halftone-ring/f-005.webp` ▅
- 00:08.42 `motion/halftone-ring/f-006.webp` ▅
- 00:08.50 `motion/halftone-ring/f-007.webp` ▆
- 00:08.58 `motion/halftone-ring/f-008.webp` ▆
- 00:08.67 `motion/halftone-ring/f-009.webp` ▅
- 00:08.75 `motion/halftone-ring/f-010.webp` ▆
- 00:08.83 `motion/halftone-ring/f-011.webp` ▅
- 00:08.92 `motion/halftone-ring/f-012.webp` ▇
- 00:09.00 `motion/halftone-ring/f-013.webp` █

### 04. 'second?' grows huge and blows off with the speed

00:08.90–00:11.60 (2.70 s) · 28 frames at 10 fps, 0.100 s apart · fast cutting, scale jump, motion smear, POV

'in' over a pit crew at 8.96, 'a' at 9.25, then a grainy black and white racing car at 9.4 with 'second?' at normal size. Three cuts land in the next 0.6 seconds, and at 9.96 the same word is suddenly enormous over a close-up face, the only time the type is set this large. At 10.5 its letters smear sideways, and at 10.75 the smeared word streaks across a low POV of a race track before leaving the frame. The question is about speed, and the word moves at it.

Motion: `▇█▇█▇█▇▇█▇████▇▇███▇▆▆▆▅▅▅▇▃`

- 00:08.90 `motion/second/f-001.webp` ▇
- 00:09.00 `motion/second/f-002.webp` █
- 00:09.10 `motion/second/f-003.webp` ▇
- 00:09.20 `motion/second/f-004.webp` █
- 00:09.30 `motion/second/f-005.webp` ▇
- 00:09.40 `motion/second/f-006.webp` █
- 00:09.50 `motion/second/f-007.webp` ▇
- 00:09.60 `motion/second/f-008.webp` ▇
- 00:09.70 `motion/second/f-009.webp` █
- 00:09.80 `motion/second/f-010.webp` ▇
- 00:09.90 `motion/second/f-011.webp` █
- 00:10.00 `motion/second/f-012.webp` █
- 00:10.10 `motion/second/f-013.webp` █
- 00:10.20 `motion/second/f-014.webp` █
- 00:10.30 `motion/second/f-015.webp` ▇
- 00:10.40 `motion/second/f-016.webp` ▇
- 00:10.50 `motion/second/f-017.webp` █
- 00:10.60 `motion/second/f-018.webp` █
- 00:10.70 `motion/second/f-019.webp` █
- 00:10.80 `motion/second/f-020.webp` ▇
- 00:10.90 `motion/second/f-021.webp` ▆
- 00:11.00 `motion/second/f-022.webp` ▆
- 00:11.10 `motion/second/f-023.webp` ▆
- 00:11.20 `motion/second/f-024.webp` ▅
- 00:11.30 `motion/second/f-025.webp` ▅
- 00:11.40 `motion/second/f-026.webp` ▅
- 00:11.50 `motion/second/f-027.webp` ▇
- 00:11.60 `motion/second/f-028.webp` ▃

### 05. 'see?' rises out of braille

00:13.30–00:15.80 (2.50 s) · 26 frames at 10 fps, 0.100 s apart · whip, word by word, dots to letters

A streak of warm light at 13.36 clears the frame, and at 13.8 a fingertip rests on a braille page. 'Change' sits on the finger, then 'the' at 14.3, 'way' at 14.46 and 'we' at 14.6, each on the same spot. The word goes blank at 14.86, and at 15.0 a few white raised dots appear where it was, the start of a braille cell. By 15.15 they have become an 's', and at 15.3 'see?' is whole. The question about sight is read as touch first.

Motion: `█▄▅▅▅█▃▄▄▄▄▃▄▄▄▄▄▄▄▄▄▄▄▃█▄`

- 00:13.30 `motion/braille/f-001.webp` █
- 00:13.40 `motion/braille/f-002.webp` ▄
- 00:13.50 `motion/braille/f-003.webp` ▅
- 00:13.60 `motion/braille/f-004.webp` ▅
- 00:13.70 `motion/braille/f-005.webp` ▅
- 00:13.80 `motion/braille/f-006.webp` █
- 00:13.90 `motion/braille/f-007.webp` ▃
- 00:14.00 `motion/braille/f-008.webp` ▄
- 00:14.10 `motion/braille/f-009.webp` ▄
- 00:14.20 `motion/braille/f-010.webp` ▄
- 00:14.30 `motion/braille/f-011.webp` ▄
- 00:14.40 `motion/braille/f-012.webp` ▃
- 00:14.50 `motion/braille/f-013.webp` ▄
- 00:14.60 `motion/braille/f-014.webp` ▄
- 00:14.70 `motion/braille/f-015.webp` ▄
- 00:14.80 `motion/braille/f-016.webp` ▄
- 00:14.90 `motion/braille/f-017.webp` ▄
- 00:15.00 `motion/braille/f-018.webp` ▄
- 00:15.10 `motion/braille/f-019.webp` ▄
- 00:15.20 `motion/braille/f-020.webp` ▄
- 00:15.30 `motion/braille/f-021.webp` ▄
- 00:15.40 `motion/braille/f-022.webp` ▄
- 00:15.50 `motion/braille/f-023.webp` ▄
- 00:15.60 `motion/braille/f-024.webp` ▃
- 00:15.70 `motion/braille/f-025.webp` █
- 00:15.80 `motion/braille/f-026.webp` ▄

### 06. A sentence laid out across four shots

00:15.70–00:19.20 (3.50 s) · 22 frames at 6 fps, 0.167 s apart · held layout, match on subject, letters assemble

At 15.76 'Map' appears at the top left over a close-up eye, 'an' at the right and 'entire' at the bottom. The three words hold their places through the cut to a fruit fly at 16.36 and to a fly's mapped brain at 17.32, so the sentence becomes a frame the pictures change inside. At 17.5 they leave and the letters 'brai', 'n' and '?' sit apart over the brain, gathering into 'brain?' by 17.75. The word stays for the cut at 18.48 to an older man in an EEG cap: eye, fly, fly brain, human brain.

Motion: `▇▄▄▄▆▃▂▃▂▆▄▃▃▃▄▄▇▂▂▂▂▇`

- 00:15.70 `motion/map-brain/f-001.webp` ▇
- 00:15.87 `motion/map-brain/f-002.webp` ▄
- 00:16.03 `motion/map-brain/f-003.webp` ▄
- 00:16.20 `motion/map-brain/f-004.webp` ▄
- 00:16.37 `motion/map-brain/f-005.webp` ▆
- 00:16.53 `motion/map-brain/f-006.webp` ▃
- 00:16.70 `motion/map-brain/f-007.webp` ▂
- 00:16.87 `motion/map-brain/f-008.webp` ▃
- 00:17.03 `motion/map-brain/f-009.webp` ▂
- 00:17.20 `motion/map-brain/f-010.webp` ▆
- 00:17.37 `motion/map-brain/f-011.webp` ▄
- 00:17.53 `motion/map-brain/f-012.webp` ▃
- 00:17.70 `motion/map-brain/f-013.webp` ▃
- 00:17.87 `motion/map-brain/f-014.webp` ▃
- 00:18.03 `motion/map-brain/f-015.webp` ▄
- 00:18.20 `motion/map-brain/f-016.webp` ▄
- 00:18.37 `motion/map-brain/f-017.webp` ▇
- 00:18.53 `motion/map-brain/f-018.webp` ▂
- 00:18.70 `motion/map-brain/f-019.webp` ▂
- 00:18.87 `motion/map-brain/f-020.webp` ▂
- 00:19.03 `motion/map-brain/f-021.webp` ▂
- 00:19.20 `motion/map-brain/f-022.webp` ▇

### 07. 'allergies?' sits behind the test tubes

00:19.20–00:22.30 (3.10 s) · 26 frames at 8 fps, 0.125 s apart · type in depth, tracking shot, occlusion, halftone

'Eliminate' over a blue halftone DNA helix from 19.2. At 20.04 the camera tracks sideways past a rack of blood tubes, and 'allergies?' sits in the depth of the shot: the tubes pass in front of it, so at 20.0 only 'all' shows, at 20.25 'allergie', at 20.5 'ergies?' and at 20.75 'llergi'. At 21.04 a hand plunges into a pile of peanuts with no word at all. The type is placed in the scene, not on top of it.

Motion: `█▅▅▅▅▅▅▇▄▄▄▅▅▅▅▇▁▅▁▄▅▁▅▅▇▆`

- 00:19.20 `motion/allergies/f-001.webp` █
- 00:19.32 `motion/allergies/f-002.webp` ▅
- 00:19.45 `motion/allergies/f-003.webp` ▅
- 00:19.57 `motion/allergies/f-004.webp` ▅
- 00:19.70 `motion/allergies/f-005.webp` ▅
- 00:19.82 `motion/allergies/f-006.webp` ▅
- 00:19.95 `motion/allergies/f-007.webp` ▅
- 00:20.07 `motion/allergies/f-008.webp` ▇
- 00:20.20 `motion/allergies/f-009.webp` ▄
- 00:20.32 `motion/allergies/f-010.webp` ▄
- 00:20.45 `motion/allergies/f-011.webp` ▄
- 00:20.57 `motion/allergies/f-012.webp` ▅
- 00:20.70 `motion/allergies/f-013.webp` ▅
- 00:20.82 `motion/allergies/f-014.webp` ▅
- 00:20.95 `motion/allergies/f-015.webp` ▅
- 00:21.07 `motion/allergies/f-016.webp` ▇
- 00:21.20 `motion/allergies/f-017.webp` ▁
- 00:21.32 `motion/allergies/f-018.webp` ▅
- 00:21.45 `motion/allergies/f-019.webp` ▁
- 00:21.57 `motion/allergies/f-020.webp` ▄
- 00:21.70 `motion/allergies/f-021.webp` ▅
- 00:21.82 `motion/allergies/f-022.webp` ▁
- 00:21.95 `motion/allergies/f-023.webp` ▅
- 00:22.07 `motion/allergies/f-024.webp` ▅
- 00:22.20 `motion/allergies/f-025.webp` ▇
- 00:22.32 `motion/allergies/f-026.webp` ▆

### 08. Code, an 8-bit game, and an 's' added on the beat

00:24.40–00:27.80 (3.40 s) · 21 frames at 6 fps, 0.167 s apart · pixel art, word by word, plural as a beat

Slanted amber code scrolls at 24.48 with no word on it. At about 24.9 the film turns into an 8-bit side-scroller: a small orange pixel character fires at pixel bugs on a striped floor, with 'Secure' above it and 'our' added at 26.0. At 26.48 a drive bay in blue light takes 'system', the 's' is added at 26.75, and the question mark at 27.0. Each extra letter is its own beat, so the scale of the problem grows as you read.

Motion: `▇▆▆▆▂▂▂▂▂▂▂▃▆▄▄▃▃▄▄▆▆`

- 00:24.40 `motion/systems/f-001.webp` ▇
- 00:24.57 `motion/systems/f-002.webp` ▆
- 00:24.73 `motion/systems/f-003.webp` ▆
- 00:24.90 `motion/systems/f-004.webp` ▆
- 00:25.07 `motion/systems/f-005.webp` ▂
- 00:25.23 `motion/systems/f-006.webp` ▂
- 00:25.40 `motion/systems/f-007.webp` ▂
- 00:25.57 `motion/systems/f-008.webp` ▂
- 00:25.73 `motion/systems/f-009.webp` ▂
- 00:25.90 `motion/systems/f-010.webp` ▂
- 00:26.07 `motion/systems/f-011.webp` ▂
- 00:26.23 `motion/systems/f-012.webp` ▃
- 00:26.40 `motion/systems/f-013.webp` ▆
- 00:26.57 `motion/systems/f-014.webp` ▄
- 00:26.73 `motion/systems/f-015.webp` ▄
- 00:26.90 `motion/systems/f-016.webp` ▃
- 00:27.07 `motion/systems/f-017.webp` ▃
- 00:27.23 `motion/systems/f-018.webp` ▄
- 00:27.40 `motion/systems/f-019.webp` ▄
- 00:27.57 `motion/systems/f-020.webp` ▆
- 00:27.73 `motion/systems/f-021.webp` ▆

### 09. The last question, a flash, and a long look at Earth

00:34.60–00:41.60 (7.00 s) · 29 frames at 4 fps, 0.250 s apart · hold, flash frame, scale jump, push in

'Protect' over a whale underwater at 34.72, and at 35.36 a humpback breaches with 'the', then 'endangered?'. The splash fills the frame by 36.75. At 37.08 there are four frames of plain cream, the color of the title cards, and at 37.24 Earth appears tiny in a field of stars. Nothing moves and no word appears for three and a half seconds, after a cut nearly every second. At 40.75 Earth swells toward the camera, at 41.0 clouds rush past, and at 41.5 the dive lands on the first project.

Motion: `▆▃▄▇▅▅▆▆▅▆█▅▂▁▁▁▁▁▁▁▁▁▁▁▂▇▇▇▆`

- 00:34.60 `motion/whale-to-earth/f-001.webp` ▆
- 00:34.85 `motion/whale-to-earth/f-002.webp` ▃
- 00:35.10 `motion/whale-to-earth/f-003.webp` ▄
- 00:35.35 `motion/whale-to-earth/f-004.webp` ▇
- 00:35.60 `motion/whale-to-earth/f-005.webp` ▅
- 00:35.85 `motion/whale-to-earth/f-006.webp` ▅
- 00:36.10 `motion/whale-to-earth/f-007.webp` ▆
- 00:36.35 `motion/whale-to-earth/f-008.webp` ▆
- 00:36.60 `motion/whale-to-earth/f-009.webp` ▅
- 00:36.85 `motion/whale-to-earth/f-010.webp` ▆
- 00:37.10 `motion/whale-to-earth/f-011.webp` █
- 00:37.35 `motion/whale-to-earth/f-012.webp` ▅
- 00:37.60 `motion/whale-to-earth/f-013.webp` ▂
- 00:37.85 `motion/whale-to-earth/f-014.webp` ▁
- 00:38.10 `motion/whale-to-earth/f-015.webp` ▁
- 00:38.35 `motion/whale-to-earth/f-016.webp` ▁
- 00:38.60 `motion/whale-to-earth/f-017.webp` ▁
- 00:38.85 `motion/whale-to-earth/f-018.webp` ▁
- 00:39.10 `motion/whale-to-earth/f-019.webp` ▁
- 00:39.35 `motion/whale-to-earth/f-020.webp` ▁
- 00:39.60 `motion/whale-to-earth/f-021.webp` ▁
- 00:39.85 `motion/whale-to-earth/f-022.webp` ▁
- 00:40.10 `motion/whale-to-earth/f-023.webp` ▁
- 00:40.35 `motion/whale-to-earth/f-024.webp` ▁
- 00:40.60 `motion/whale-to-earth/f-025.webp` ▂
- 00:40.85 `motion/whale-to-earth/f-026.webp` ▇
- 00:41.10 `motion/whale-to-earth/f-027.webp` ▇
- 00:41.35 `motion/whale-to-earth/f-028.webp` ▇
- 00:41.60 `motion/whale-to-earth/f-029.webp` ▆

### 10. How one project becomes the next

00:41.90–00:44.90 (3.00 s) · 37 frames at 12 fps, 0.083 s apart · push in, dissolve, match on shape, label swap

Each project image is framed around something round in the center, and the camera keeps pushing in while the next picture dissolves up around it. At about 42.6 an iris closes in around the mosquito on its green leaf ('Crop-modeling-Queensland-farmers'), leaving the insect inside the pupil until the pupil goes dark ('Ryan-space-hub-wormholes'). The dark pupil gives way to a glowing solder pad on a circuit board at 43.25 ('Verizon-network-security'), the pad to a cluster of diatoms at 44.0 ('WHOI-oceanography'), and the diatoms to the seeded core of a kiwi at 44.5 ('MCFB-food-bank-maps'). The labels cross-fade with their pictures, so the cut detector sees almost none of these changes and the 19 seconds read as one continuous fall.

Motion: `▇▇▇▆▆▅▅▄▄▇▇▆▆▆▅▅▅▆▆▅▅▅▅▅▅▆▆▅▆▆▆▆▇▇▆▆▆`

- 00:41.90 `motion/dive-handoff/f-001.webp` ▇
- 00:41.98 `motion/dive-handoff/f-002.webp` ▇
- 00:42.07 `motion/dive-handoff/f-003.webp` ▇
- 00:42.15 `motion/dive-handoff/f-004.webp` ▆
- 00:42.23 `motion/dive-handoff/f-005.webp` ▆
- 00:42.32 `motion/dive-handoff/f-006.webp` ▅
- 00:42.40 `motion/dive-handoff/f-007.webp` ▅
- 00:42.48 `motion/dive-handoff/f-008.webp` ▄
- 00:42.57 `motion/dive-handoff/f-009.webp` ▄
- 00:42.65 `motion/dive-handoff/f-010.webp` ▇
- 00:42.73 `motion/dive-handoff/f-011.webp` ▇
- 00:42.82 `motion/dive-handoff/f-012.webp` ▆
- 00:42.90 `motion/dive-handoff/f-013.webp` ▆
- 00:42.98 `motion/dive-handoff/f-014.webp` ▆
- 00:43.07 `motion/dive-handoff/f-015.webp` ▅
- 00:43.15 `motion/dive-handoff/f-016.webp` ▅
- 00:43.23 `motion/dive-handoff/f-017.webp` ▅
- 00:43.32 `motion/dive-handoff/f-018.webp` ▆
- 00:43.40 `motion/dive-handoff/f-019.webp` ▆
- 00:43.48 `motion/dive-handoff/f-020.webp` ▅
- 00:43.57 `motion/dive-handoff/f-021.webp` ▅
- 00:43.65 `motion/dive-handoff/f-022.webp` ▅
- 00:43.73 `motion/dive-handoff/f-023.webp` ▅
- 00:43.82 `motion/dive-handoff/f-024.webp` ▅
- 00:43.90 `motion/dive-handoff/f-025.webp` ▅
- 00:43.98 `motion/dive-handoff/f-026.webp` ▆
- 00:44.07 `motion/dive-handoff/f-027.webp` ▆
- 00:44.15 `motion/dive-handoff/f-028.webp` ▅
- 00:44.23 `motion/dive-handoff/f-029.webp` ▆
- 00:44.32 `motion/dive-handoff/f-030.webp` ▆
- 00:44.40 `motion/dive-handoff/f-031.webp` ▆
- 00:44.48 `motion/dive-handoff/f-032.webp` ▆
- 00:44.57 `motion/dive-handoff/f-033.webp` ▇
- 00:44.65 `motion/dive-handoff/f-034.webp` ▇
- 00:44.73 `motion/dive-handoff/f-035.webp` ▆
- 00:44.82 `motion/dive-handoff/f-036.webp` ▆
- 00:44.90 `motion/dive-handoff/f-037.webp` ▆

### 11. Thirty projects in nineteen seconds

00:41.40–01:00.60 (19.20 s) · 39 frames at 2 fps, 0.500 s apart · list, monospace label, continuous zoom, macro and micro

About every two-thirds of a second a new image and a new label in small white monospace between backslashes: GTC-triage-tool, Crop-modeling-Queensland-farmers, Ryan-space-hub-wormholes, Verizon-network-security, WHOI-oceanography, MCFB-food-bank-maps, Gardener-and-Son-rewilding, Lake-Tahoe-lead-removal, 800years-Indian-history, Mingyang-cuddle-fish, TerraByte-satellite-map, Evidence-Action-safe-water, Kiesow-rose-garden-guide, AgroGuardAI-crop-pests, Gorshkov-pothole-report, Leo-postpartum-symptoms, 53hrs-train-light-patterns, Running-coach, EB-Alzheimers-risk-gene, Squidsoup-light-installations, Avetraso-train-tracker, Salmon-supply-and-demand, Marathon-runner-blood-clot, BK-aquarium-designs, Defensive-plays-Game5, BLA-studios-robotic-welding-arm, Guzman-asteroid-lab, Mozilla-cyber-review, SVO-universe-sim and JZ-lung-cancer-drug. The pictures are textures more than illustrations (diatoms, a thistle, a sliced beet, coral, a nebula), and they run from cells to the stars before ending on a chest X-ray.

Motion: `▇▆▆▆▅▆▆▆▆▆▇▇▆▅▆▅▆▆▆▆▆▅▅▆▇▇▅▆▅▆▇▆▆▆▅▆▅▆▆`

- 00:41.40 `motion/projects/f-001.webp` ▇
- 00:41.90 `motion/projects/f-002.webp` ▆
- 00:42.40 `motion/projects/f-003.webp` ▆
- 00:42.90 `motion/projects/f-004.webp` ▆
- 00:43.40 `motion/projects/f-005.webp` ▅
- 00:43.90 `motion/projects/f-006.webp` ▆
- 00:44.40 `motion/projects/f-007.webp` ▆
- 00:44.90 `motion/projects/f-008.webp` ▆
- 00:45.40 `motion/projects/f-009.webp` ▆
- 00:45.90 `motion/projects/f-010.webp` ▆
- 00:46.40 `motion/projects/f-011.webp` ▇
- 00:46.90 `motion/projects/f-012.webp` ▇
- 00:47.40 `motion/projects/f-013.webp` ▆
- 00:47.90 `motion/projects/f-014.webp` ▅
- 00:48.40 `motion/projects/f-015.webp` ▆
- 00:48.90 `motion/projects/f-016.webp` ▅
- 00:49.40 `motion/projects/f-017.webp` ▆
- 00:49.90 `motion/projects/f-018.webp` ▆
- 00:50.40 `motion/projects/f-019.webp` ▆
- 00:50.90 `motion/projects/f-020.webp` ▆
- 00:51.40 `motion/projects/f-021.webp` ▆
- 00:51.90 `motion/projects/f-022.webp` ▅
- 00:52.40 `motion/projects/f-023.webp` ▅
- 00:52.90 `motion/projects/f-024.webp` ▆
- 00:53.40 `motion/projects/f-025.webp` ▇
- 00:53.90 `motion/projects/f-026.webp` ▇
- 00:54.40 `motion/projects/f-027.webp` ▅
- 00:54.90 `motion/projects/f-028.webp` ▆
- 00:55.40 `motion/projects/f-029.webp` ▅
- 00:55.90 `motion/projects/f-030.webp` ▆
- 00:56.40 `motion/projects/f-031.webp` ▇
- 00:56.90 `motion/projects/f-032.webp` ▆
- 00:57.40 `motion/projects/f-033.webp` ▆
- 00:57.90 `motion/projects/f-034.webp` ▆
- 00:58.40 `motion/projects/f-035.webp` ▅
- 00:58.90 `motion/projects/f-036.webp` ▆
- 00:59.40 `motion/projects/f-037.webp` ▅
- 00:59.90 `motion/projects/f-038.webp` ▆
- 01:00.40 `motion/projects/f-039.webp` ▆

### 12. 'we' turns into 23 logos

01:01.30–01:04.90 (3.60 s) · 91 frames at 25 fps, 0.040 s apart · word swap, logo flicker, every frame

'What we make of this moment,' sits on cream. From 61.4 the spaces on either side of 'we' widen into a slot, and at 61.76 the International Rescue Committee's logo replaces the word. A new logo arrives every two or three frames: Accenture, DoorDash, Bristol Myers Squibb, AIG, Lilly, Jane Street, Legora, Mozilla, Mercado Libre, PayPal, Rakuten, Salesforce, SAP, Shy Bird, KBF Design Gallery, Shopify, Travelers, UST, Walmart, Verizon, Every Cure and OpenEvidence. At 63.98 'we' is back in the slot, and the gap closes by 64.75. A charity, a gallery and a design studio flick past at the same size and speed as Walmart and SAP.

Motion: `▁▁▁▂▃▂▂▂▁▁▁▁▂▁▂▁▁▁▁▁▁▂▁▁▂▁▂▁▁▁▁▁▁▁▁▁▂▁▁▂▁▃▁▁▃▁▃▁▁▂▁▂▁▁▂▁▂▁▁▂▁▁▁▁▂▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▂▂▂▂▁▁▁▁▁`

- 01:01.30 `motion/we-logos/f-001.webp` ▁
- 01:01.34 `motion/we-logos/f-002.webp` ▁
- 01:01.38 `motion/we-logos/f-003.webp` ▁
- 01:01.42 `motion/we-logos/f-004.webp` ▂
- 01:01.46 `motion/we-logos/f-005.webp` ▃
- 01:01.50 `motion/we-logos/f-006.webp` ▂
- 01:01.54 `motion/we-logos/f-007.webp` ▂
- 01:01.58 `motion/we-logos/f-008.webp` ▂
- 01:01.62 `motion/we-logos/f-009.webp` ▁
- 01:01.66 `motion/we-logos/f-010.webp` ▁
- 01:01.70 `motion/we-logos/f-011.webp` ▁
- 01:01.74 `motion/we-logos/f-012.webp` ▁
- 01:01.78 `motion/we-logos/f-013.webp` ▂
- 01:01.82 `motion/we-logos/f-014.webp` ▁
- 01:01.86 `motion/we-logos/f-015.webp` ▂
- 01:01.90 `motion/we-logos/f-016.webp` ▁
- 01:01.94 `motion/we-logos/f-017.webp` ▁
- 01:01.98 `motion/we-logos/f-018.webp` ▁
- 01:02.02 `motion/we-logos/f-019.webp` ▁
- 01:02.06 `motion/we-logos/f-020.webp` ▁
- 01:02.10 `motion/we-logos/f-021.webp` ▁
- 01:02.14 `motion/we-logos/f-022.webp` ▂
- 01:02.18 `motion/we-logos/f-023.webp` ▁
- 01:02.22 `motion/we-logos/f-024.webp` ▁
- 01:02.26 `motion/we-logos/f-025.webp` ▂
- 01:02.30 `motion/we-logos/f-026.webp` ▁
- 01:02.34 `motion/we-logos/f-027.webp` ▂
- 01:02.38 `motion/we-logos/f-028.webp` ▁
- 01:02.42 `motion/we-logos/f-029.webp` ▁
- 01:02.46 `motion/we-logos/f-030.webp` ▁
- 01:02.50 `motion/we-logos/f-031.webp` ▁
- 01:02.54 `motion/we-logos/f-032.webp` ▁
- 01:02.58 `motion/we-logos/f-033.webp` ▁
- 01:02.62 `motion/we-logos/f-034.webp` ▁
- 01:02.66 `motion/we-logos/f-035.webp` ▁
- 01:02.70 `motion/we-logos/f-036.webp` ▁
- 01:02.74 `motion/we-logos/f-037.webp` ▂
- 01:02.78 `motion/we-logos/f-038.webp` ▁
- 01:02.82 `motion/we-logos/f-039.webp` ▁
- 01:02.86 `motion/we-logos/f-040.webp` ▂
- 01:02.90 `motion/we-logos/f-041.webp` ▁
- 01:02.94 `motion/we-logos/f-042.webp` ▃
- 01:02.98 `motion/we-logos/f-043.webp` ▁
- 01:03.02 `motion/we-logos/f-044.webp` ▁
- 01:03.06 `motion/we-logos/f-045.webp` ▃
- 01:03.10 `motion/we-logos/f-046.webp` ▁
- 01:03.14 `motion/we-logos/f-047.webp` ▃
- 01:03.18 `motion/we-logos/f-048.webp` ▁
- 01:03.22 `motion/we-logos/f-049.webp` ▁
- 01:03.26 `motion/we-logos/f-050.webp` ▂
- 01:03.30 `motion/we-logos/f-051.webp` ▁
- 01:03.34 `motion/we-logos/f-052.webp` ▂
- 01:03.38 `motion/we-logos/f-053.webp` ▁
- 01:03.42 `motion/we-logos/f-054.webp` ▁
- 01:03.46 `motion/we-logos/f-055.webp` ▂
- 01:03.50 `motion/we-logos/f-056.webp` ▁
- 01:03.54 `motion/we-logos/f-057.webp` ▂
- 01:03.58 `motion/we-logos/f-058.webp` ▁
- 01:03.62 `motion/we-logos/f-059.webp` ▁
- 01:03.66 `motion/we-logos/f-060.webp` ▂
- 01:03.70 `motion/we-logos/f-061.webp` ▁
- 01:03.74 `motion/we-logos/f-062.webp` ▁
- 01:03.78 `motion/we-logos/f-063.webp` ▁
- 01:03.82 `motion/we-logos/f-064.webp` ▁
- 01:03.86 `motion/we-logos/f-065.webp` ▂
- 01:03.90 `motion/we-logos/f-066.webp` ▁
- 01:03.94 `motion/we-logos/f-067.webp` ▂
- 01:03.98 `motion/we-logos/f-068.webp` ▁
- 01:04.02 `motion/we-logos/f-069.webp` ▁
- 01:04.06 `motion/we-logos/f-070.webp` ▁
- 01:04.10 `motion/we-logos/f-071.webp` ▁
- 01:04.14 `motion/we-logos/f-072.webp` ▁
- 01:04.18 `motion/we-logos/f-073.webp` ▁
- 01:04.22 `motion/we-logos/f-074.webp` ▁
- 01:04.26 `motion/we-logos/f-075.webp` ▁
- 01:04.30 `motion/we-logos/f-076.webp` ▁
- 01:04.34 `motion/we-logos/f-077.webp` ▁
- 01:04.38 `motion/we-logos/f-078.webp` ▁
- 01:04.42 `motion/we-logos/f-079.webp` ▁
- 01:04.46 `motion/we-logos/f-080.webp` ▁
- 01:04.50 `motion/we-logos/f-081.webp` ▁
- 01:04.54 `motion/we-logos/f-082.webp` ▂
- 01:04.58 `motion/we-logos/f-083.webp` ▂
- 01:04.62 `motion/we-logos/f-084.webp` ▂
- 01:04.66 `motion/we-logos/f-085.webp` ▂
- 01:04.70 `motion/we-logos/f-086.webp` ▂
- 01:04.74 `motion/we-logos/f-087.webp` ▁
- 01:04.78 `motion/we-logos/f-088.webp` ▁
- 01:04.82 `motion/we-logos/f-089.webp` ▁
- 01:04.86 `motion/we-logos/f-090.webp` ▁
- 01:04.90 `motion/we-logos/f-091.webp` ▁

### 13. The line finishes, the music stops, the logo returns

01:04.50–01:10.00 (5.50 s) · 23 frames at 4 fps, 0.250 s apart · line by line, music out, logo build, bookend

The second line arrives in two beats, 'will make' at 65.25 and 'this moment.' at 65.5, and the music stops under it at about 65. The full line holds in near silence until 67.0, when 'A\' replaces it at the size and place of the first frame. The wordmark unfolds through the same stand-in glyphs as the opening, a short sound under it, and ANTHROP\C is complete by 68.75 and held in silence to the end.

Motion: `▂▁▁▁▁▁▁▁▁▁▂▁▁▁▁▂▁▁▁▁▁▁▁`

- 01:04.50 `motion/close/f-001.webp` ▂
- 01:04.75 `motion/close/f-002.webp` ▁
- 01:05.00 `motion/close/f-003.webp` ▁
- 01:05.25 `motion/close/f-004.webp` ▁
- 01:05.50 `motion/close/f-005.webp` ▁
- 01:05.75 `motion/close/f-006.webp` ▁
- 01:06.00 `motion/close/f-007.webp` ▁
- 01:06.25 `motion/close/f-008.webp` ▁
- 01:06.50 `motion/close/f-009.webp` ▁
- 01:06.75 `motion/close/f-010.webp` ▁
- 01:07.00 `motion/close/f-011.webp` ▂
- 01:07.25 `motion/close/f-012.webp` ▁
- 01:07.50 `motion/close/f-013.webp` ▁
- 01:07.75 `motion/close/f-014.webp` ▁
- 01:08.00 `motion/close/f-015.webp` ▁
- 01:08.25 `motion/close/f-016.webp` ▂
- 01:08.50 `motion/close/f-017.webp` ▁
- 01:08.75 `motion/close/f-018.webp` ▁
- 01:09.00 `motion/close/f-019.webp` ▁
- 01:09.25 `motion/close/f-020.webp` ▁
- 01:09.50 `motion/close/f-021.webp` ▁
- 01:09.75 `motion/close/f-022.webp` ▁
- 01:10.00 `motion/close/f-023.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Anthropic's short mark, 'A\', in black sans, small and centered on warm cream paper with a faint texture. One voice is heard over it: 'I mean,'.
- 00:01.00 `seconds/second-00002.webp` The wordmark unfolding out of the mark. New letters arrive as stand-in glyphs (an X, a sprig, a flower-like asterisk where the O will be) before they settle. A half-second pause in the voice sits over it.
- 00:02.00 `seconds/second-00003.webp` ANTHROP\C complete, held while the voice finishes: 'what's the best that could happen?' The usual phrase asks for the worst.
- 00:04.00 `seconds/second-00005.webp` The backslash in ANTHROP\C has tilted and stretched into a dark parallelogram. In the next half second the camera pushes into it, and the bar fills with footage.
- 00:05.00 `seconds/second-00006.webp` Through the slash: a gloved hand holding a small vial in a lab, with 'we' set in small white serif over the glass. The question is spelled out one word per beat: 'Can', 'we', 'cure', 'the', 'incurable?'.
- 00:06.00 `seconds/second-00007.webp` Handheld, home-video footage of a hospital ward, a young patient in the middle of nurses and family, all applauding. 'the' sits over her chest.
- 00:07.00 `seconds/second-00008.webp` A tight, blurred close-up of the same girl laughing. The letters of 'incurable?' are scattered around her face and drift together into the word.
- 00:08.00 `seconds/second-00009.webp` Hard cut to black. A small orange dot has grown into a ring of rainbow halftone dots, like a printing screen or a heat map, with 'Do' in its center.
- 00:09.00 `seconds/second-00010.webp` A racing car in grainy black and white, with 'second?' over it. Before it come a pit crew and the words 'in' and 'a'.
- 00:10.00 `seconds/second-00011.webp` 'second?' suddenly huge over a close-up face, the only word in the film set this large. Half a second later it smears sideways with the speed of the next shot.
- 00:11.00 `seconds/second-00012.webp` Low POV down a race track, the kerbs rushing past. The smeared word has just blown off the frame.
- 00:12.00 `seconds/second-00013.webp` A dark lab room lit by light boxes and screens of brain scans. 'Crack the code', a word per beat, ending on 'of Alzheimer's?' over an MRI.
- 00:13.00 `seconds/second-00014.webp` A streak of warm light, a whip between shots that carries no word. It resets the eye between questions.
- 00:14.00 `seconds/second-00015.webp` A fingertip on a braille page, in soft focus on pale green paper. 'Change the way we' is placed on the finger itself, one word at a time.
- 00:15.00 `seconds/second-00016.webp` 'see?' arrives as raised braille dots on the fingertip that resolve into letters. The word is read the way the person in the shot reads.
- 00:16.00 `seconds/second-00017.webp` A fruit fly on a leaf. 'Map', 'an' and 'entire' were set at the top left, right and bottom on the previous shot, an eye, and they stay where they are while the picture changes underneath.
- 00:17.00 `seconds/second-00018.webp` A fly's brain mapped as glowing colored tracts with a network diagram around it. The scattered letters of 'brain?' gather in the center.
- 00:18.00 `seconds/second-00019.webp` An older man in an EEG cap under 'brain?'. Eye, fly, fly's brain, human brain: the question climbs the scale of brains across four shots.
- 00:19.00 `seconds/second-00020.webp` A DNA helix drawn in blue halftone dots on black, with 'Eliminate'. The film's graphics share one texture: dots, as on the halftone ring at 0:08.
- 00:20.00 `seconds/second-00021.webp` A tracking shot past a rack of blood tubes with red and blue caps. 'allergies?' sits behind the tubes in depth, so they slide across the word and hide parts of it.
- 00:21.00 `seconds/second-00022.webp` A hand plunging into a pile of peanuts, with no word. After the question it shows the thing itself.
- 00:22.00 `seconds/second-00023.webp` Top-down on a red rescue helicopter over forest. 'Reach' sits beside it.
- 00:23.00 `seconds/second-00024.webp` Low angle on a drone lowering a medical box to a person in a high-visibility vest. 'the', then 'unreachable?' over hands opening a red med kit in the snow.
- 00:24.00 `seconds/second-00025.webp` Code scrolling at a slant in amber on black, out of focus at the edges. No word on it.
- 00:25.00 `seconds/second-00026.webp` An 8-bit side-scroller: a small orange pixel character fires at pixel bugs. 'Secure' and then 'our' are set above it.
- 00:26.00 `seconds/second-00027.webp` A drive bay in a server rack in cold blue light. 'system' gets its 's' a beat later, then its question mark.
- 00:27.00 `seconds/second-00028.webp` 'systems?' complete. The plural arrives as its own beat.
- 00:28.00 `seconds/second-00029.webp` A teacher in a pink sweater and headscarf in front of a class, with 'students'. 'Help' came on a blurred shot before it.
- 00:29.00 `seconds/second-00030.webp` A yellow highlighter crossing a line of textbook print in extreme close-up, with 'thrive?'.
- 00:30.00 `seconds/second-00031.webp` A doctor's hands holding a patient's across a desk. 'Match more organ donors?' is spelled across this one shot.
- 00:31.00 `seconds/second-00032.webp` Pomegranate seeds in macro, with 'Grow' and 'more'.
- 00:32.00 `seconds/second-00033.webp` Roots seen from below the soil, against the sky, with a botanical engraving drawn over part of the frame. 'with less?'.
- 00:33.00 `seconds/second-00034.webp` Stacks of paper files tied in bundles under a green cast. 'Trade paperwork for' runs across two shots of them.
- 00:34.00 `seconds/second-00035.webp` Low angle on surgeons in blue gowns in an operating room. 'real work?'.
- 00:35.00 `seconds/second-00036.webp` A humpback whale rising out of the sea, with 'the' and then 'endangered?'. The last question.
- 00:37.00 `seconds/second-00038.webp` Earth, tiny and centered in a field of stars. The film holds here for about three and a half seconds with no words, after 32 seconds of a cut nearly every second.
- 00:41.00 `seconds/second-00042.webp` The camera has fallen through the clouds into the first project, labeled '\ GTC-triage-tool \' in small white monospace between backslashes, like the slash in the logo.
- 00:42.00 `seconds/second-00043.webp` A mosquito on a bright green leaf, '\ Crop-modeling-Queensland-farmers \'. Each project gets about two-thirds of a second and one image, chosen for its texture and color.
- 00:43.00 `seconds/second-00044.webp` A glowing solder pad on a green circuit board, '\ Verizon-network-security \'. Large companies and single people get the same label and the same screen time.
- 00:44.00 `seconds/second-00045.webp` Diatoms under a microscope, '\ WHOI-oceanography \'. Each picture is centered on a round shape that the next one grows out of.
- 00:45.00 `seconds/second-00046.webp` A thistle flower in pink macro, '\ Gardener-and-Son-rewilding \'.
- 00:47.00 `seconds/second-00048.webp` A cuttlefish's eye in pale blue, '\ Mingyang-cuddle-fish \', the floating cuttlefish robot of a PhD student in Tokyo named in the video's description.
- 00:50.00 `seconds/second-00051.webp` A pothole seen up close like a crater, '\ Gorshkov-pothole-report \', a developer tracking potholes in Slovenia.
- 00:53.00 `seconds/second-00054.webp` Blurred bars of red, green, blue and yellow, like a DNA sequencing readout, '\ EB-Alzheimers-risk-gene \'. Alzheimer's was asked about at 0:12, and here it is a project.
- 00:54.00 `seconds/second-00055.webp` Mount Fuji seen through a rounded train window, '\ Avetraso-train-tracker \'.
- 00:58.00 `seconds/second-00059.webp` Streaks of light across a warm dark field, '\ Guzman-asteroid-lab \'.
- 00:59.00 `seconds/second-00060.webp` A red nebula in a starfield, '\ SVO-universe-sim \'. The dive has gone from a cell to the universe.
- 01:00.00 `seconds/second-00061.webp` A chest X-ray, '\ JZ-lung-cancer-drug \', the 30th and last label. 'What we make of this moment,' is already fading in over it.
- 01:01.00 `seconds/second-00062.webp` Back on the cream paper of the open: 'What we make of this moment,' in black serif, small and centered. The spaces around 'we' are about to widen.
- 01:02.00 `seconds/second-00063.webp` The 'we' slot holding a customer logo, here Legora's. 23 logos flick through it in 2.2 seconds, from the International Rescue Committee to OpenEvidence.
- 01:04.00 `seconds/second-00065.webp` 'we' is back, still in its widened gap, which closes over the next half second.
- 01:05.00 `seconds/second-00066.webp` The second line arrives in two beats, 'will make' and then 'this moment.', and the music stops under it.
- 01:06.00 `seconds/second-00067.webp` The full line in near silence: 'What we make of this moment, will make this moment.'
- 01:07.00 `seconds/second-00068.webp` 'A\' again, at the same size and place as the first frame. The end mark replays the opening build.
- 01:09.00 `seconds/second-00070.webp` ANTHROP\C held on cream to the end, in silence.
