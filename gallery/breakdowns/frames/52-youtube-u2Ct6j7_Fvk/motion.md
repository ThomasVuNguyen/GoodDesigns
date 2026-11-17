# Motion notes: Keep Projects Moving in the Background with Tasks in Gemini

Google Gemini · 01:00.12 · https://www.youtube.com/watch?v=u2Ct6j7_Fvk

Most of the film is live action cut on the line reads. The motion design is in the last five seconds: the title builds word by word behind a jumping runner, then a Chat/Task toggle flips and gives way to the wordmark.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▁▄▅▆▆▆▆▁▄▅▆▂▄▂▂▃▄▆▆▆▆▇▇▇▇▇█▇▆▂▂▅▅▅▄▄▅▄▅▄▂▄▁▄▂▂▃▄▄▂▄▄▄▁▁▃▂▅▂▁
01:00  ▁
```

## Sequences

### 01. Motion-blurred city montage

00:24.00–00:28.50 (4.50 s) · 19 frames at 4 fps, 0.250 s apart · handheld, whip, motion blur, fast cutting

Four lines of dialogue in four seconds, each on its own shot of a cyclist or the street. Long shutter smears the foreground, so the cuts read as one fast ride through the city rather than separate setups.

Motion: `▆▇▇▇▇▇▇▇████▇▇█▇▇▇▂`

- 00:24.00 `motion/whip-montage/f-001.webp` ▆
- 00:24.25 `motion/whip-montage/f-002.webp` ▇
- 00:24.50 `motion/whip-montage/f-003.webp` ▇
- 00:24.75 `motion/whip-montage/f-004.webp` ▇
- 00:25.00 `motion/whip-montage/f-005.webp` ▇
- 00:25.25 `motion/whip-montage/f-006.webp` ▇
- 00:25.50 `motion/whip-montage/f-007.webp` ▇
- 00:25.75 `motion/whip-montage/f-008.webp` ▇
- 00:26.00 `motion/whip-montage/f-009.webp` █
- 00:26.25 `motion/whip-montage/f-010.webp` █
- 00:26.50 `motion/whip-montage/f-011.webp` █
- 00:26.75 `motion/whip-montage/f-012.webp` █
- 00:27.00 `motion/whip-montage/f-013.webp` ▇
- 00:27.25 `motion/whip-montage/f-014.webp` ▇
- 00:27.50 `motion/whip-montage/f-015.webp` █
- 00:27.75 `motion/whip-montage/f-016.webp` ▇
- 00:28.00 `motion/whip-montage/f-017.webp` ▇
- 00:28.25 `motion/whip-montage/f-018.webp` ▇
- 00:28.50 `motion/whip-montage/f-019.webp` ▂

### 02. The title builds behind the runner

00:54.75–00:57.00 (2.25 s) · 19 frames at 8 fps, 0.125 s apart · type-on, word by word, depth layering

Over the locked-off street, 'LOOK' snaps on at 55.0 in heavy condensed white caps, with no fade or scale. 'WHAT', 'YOU' and 'CAN DO.' follow at roughly one word every sixth of a second. The jumping runner stays in front of the 'U', so the type sits inside the shot instead of on top of it.

Motion: `▁▁▄▁▁▁▁▄▄▁▁▅▁▁▁▁▁▁█`

- 00:54.75 `motion/title-build/f-001.webp` ▁
- 00:54.88 `motion/title-build/f-002.webp` ▁
- 00:55.00 `motion/title-build/f-003.webp` ▄
- 00:55.12 `motion/title-build/f-004.webp` ▁
- 00:55.25 `motion/title-build/f-005.webp` ▁
- 00:55.38 `motion/title-build/f-006.webp` ▁
- 00:55.50 `motion/title-build/f-007.webp` ▁
- 00:55.62 `motion/title-build/f-008.webp` ▄
- 00:55.75 `motion/title-build/f-009.webp` ▄
- 00:55.88 `motion/title-build/f-010.webp` ▁
- 00:56.00 `motion/title-build/f-011.webp` ▁
- 00:56.12 `motion/title-build/f-012.webp` ▅
- 00:56.25 `motion/title-build/f-013.webp` ▁
- 00:56.38 `motion/title-build/f-014.webp` ▁
- 00:56.50 `motion/title-build/f-015.webp` ▁
- 00:56.62 `motion/title-build/f-016.webp` ▁
- 00:56.75 `motion/title-build/f-017.webp` ▁
- 00:56.88 `motion/title-build/f-018.webp` ▁
- 00:57.00 `motion/title-build/f-019.webp` █

### 03. Chat flips to Task

00:56.90–00:58.10 (1.20 s) · 15 frames at 12 fps, 0.083 s apart · hard cut, toggle, slide, glow

Hard cut to black with a small segmented control. The white pill starts on 'Chat' and slides right to 'Task' in about a sixth of a second, picking up a soft glow as it lands. The control holds still for a beat after.

Motion: `▁█▂▂▂▁▁▁▁▁▁▁▁▁▂`

- 00:56.90 `motion/toggle/f-001.webp` ▁
- 00:56.98 `motion/toggle/f-002.webp` █
- 00:57.07 `motion/toggle/f-003.webp` ▂
- 00:57.15 `motion/toggle/f-004.webp` ▂
- 00:57.23 `motion/toggle/f-005.webp` ▂
- 00:57.32 `motion/toggle/f-006.webp` ▁
- 00:57.40 `motion/toggle/f-007.webp` ▁
- 00:57.48 `motion/toggle/f-008.webp` ▁
- 00:57.57 `motion/toggle/f-009.webp` ▁
- 00:57.65 `motion/toggle/f-010.webp` ▁
- 00:57.73 `motion/toggle/f-011.webp` ▁
- 00:57.82 `motion/toggle/f-012.webp` ▁
- 00:57.90 `motion/toggle/f-013.webp` ▁
- 00:57.98 `motion/toggle/f-014.webp` ▁
- 00:58.07 `motion/toggle/f-015.webp` ▂

### 04. The toggle gives way to the wordmark

00:57.90–00:59.60 (1.70 s) · 18 frames at 10 fps, 0.100 s apart · pop, shrink, wipe-on, fade-in

The Gemini spark pops in at the left of the toggle while the toggle dims and shrinks away behind it. 'Google Gemini' then wipes on left to right from the spark over about two thirds of a second, and the 'Try Tasks for free' line fades up underneath.

Motion: `▁▁▂▂▂▂▂▂▂▂▂▂▁▁▁▁▁▁`

- 00:57.90 `motion/wordmark/f-001.webp` ▁
- 00:58.00 `motion/wordmark/f-002.webp` ▁
- 00:58.10 `motion/wordmark/f-003.webp` ▂
- 00:58.20 `motion/wordmark/f-004.webp` ▂
- 00:58.30 `motion/wordmark/f-005.webp` ▂
- 00:58.40 `motion/wordmark/f-006.webp` ▂
- 00:58.50 `motion/wordmark/f-007.webp` ▂
- 00:58.60 `motion/wordmark/f-008.webp` ▂
- 00:58.70 `motion/wordmark/f-009.webp` ▂
- 00:58.80 `motion/wordmark/f-010.webp` ▂
- 00:58.90 `motion/wordmark/f-011.webp` ▂
- 00:59.00 `motion/wordmark/f-012.webp` ▂
- 00:59.10 `motion/wordmark/f-013.webp` ▁
- 00:59.20 `motion/wordmark/f-014.webp` ▁
- 00:59.30 `motion/wordmark/f-015.webp` ▁
- 00:59.40 `motion/wordmark/f-016.webp` ▁
- 00:59.50 `motion/wordmark/f-017.webp` ▁
- 00:59.60 `motion/wordmark/f-018.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Cold open on a long lens down a Harlem street at golden hour, the 158th Street corner in frame. Deep, compressed perspective.
- 00:02.00 `seconds/second-00003.webp` Side-on tracking shot as she runs past construction barriers: 'Right now, I'm reworking my business plan.' Gemini works while she doesn't.
- 00:05.00 `seconds/second-00006.webp` Handheld close-up mid-run as she talks to us. Every character gets the same 'Right now…' line in a different world.
- 00:07.00 `seconds/second-00008.webp` Hard cut from the city to a dairy farm: a wide with a pickup in the foreground and cows across the field.
- 00:09.00 `seconds/second-00010.webp` Medium on the farmer at a fence post. A cow moos and he answers, 'Yeah, I hear ya.' The film's comic rhythm in one beat.
- 00:11.00 `seconds/second-00012.webp` Product in situ: Gemini's task list on a phone propped on a saddle, finished steps in grey, the live step in white with animated dots.
- 00:13.00 `seconds/second-00014.webp` Pink tiled bathroom, a woman in a headwrap painting her toenails as she glances to camera.
- 00:16.00 `seconds/second-00017.webp` Her phone among the makeup: 'Checking marketplaces for used c…' at the foot of a vertical timeline of steps. Each phone insert is dressed with its owner's things.
- 00:17.00 `seconds/second-00018.webp` Pool shot from lane-line height for 'I'm planning my semester abroad.'
- 00:21.00 `seconds/second-00022.webp` Restaurant kitchen through foreground clutter, steam and flame: 'comparing 15 different napkin suppliers.'
- 00:24.00 `seconds/second-00025.webp` A cyclist under the elevated tracks, taxis passing: the start of a fast, motion-blurred city montage.
- 00:28.00 `seconds/second-00029.webp` Locked-off wide of a sunroom full of cats. She reads the paper as a second voice adds, 'I'm also doing that.'
- 00:31.00 `seconds/second-00032.webp` Genre parody: a storm reporter in the rain under a full news lower third, 'STORM MAKES LANDFALL'.
- 00:38.00 `seconds/second-00039.webp` Close on a partygoer in a giraffe costume, red cup in hand. The gag is the gap between the setting and the task.
- 00:40.00 `seconds/second-00041.webp` Low, dark bedroom shot of someone asleep: 'I'm keeping an eye on Doja Cat tickets.'
- 00:42.00 `seconds/second-00043.webp` Symmetrical wide of an empty ice rink under an arched roof, a Zamboni mid-frame: 'I'm researching vacations.'
- 00:44.00 `seconds/second-00045.webp` Hotel room wide, a man bent over his ironing board: 'I'm ironing my tie… but I'm also revising my presentation.'
- 00:48.00 `seconds/second-00049.webp` The payoff insert: a notification on his phone, 'Presentation Formatting: Updated styles across all slides.'
- 00:50.00 `seconds/second-00051.webp` Back to the bathroom phone: 'Car Listings Found: Added four more vehicles near you.' The setups pay off in order.
- 00:51.00 `seconds/second-00052.webp` She looks up from her toes: 'I did it.'
- 00:52.00 `seconds/second-00053.webp` Back to the opening street, now from the ground: the runner jumps in the middle of the road, 'I did it!'
- 00:55.00 `seconds/second-00056.webp` 'LOOK' lands in heavy condensed white caps over the street, with no animation on the word itself.
- 00:56.00 `seconds/second-00057.webp` 'LOOK WHAT YOU CAN DO.' The jumping runner stays in front of the 'U', so the type sits inside the shot.
- 00:57.00 `seconds/second-00058.webp` End card on black: a Chat/Task toggle, the white pill on Task with a soft glow.
- 00:59.00 `seconds/second-00060.webp` Google Gemini lockup, with 'Try Tasks for free in the Gemini app' in small type below.
