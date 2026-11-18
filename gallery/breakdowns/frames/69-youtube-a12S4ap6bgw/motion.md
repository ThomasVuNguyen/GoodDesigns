# Motion notes: New Year. New You. Introducing Notion Faces.

Notion · 00:29.23 · https://www.youtube.com/watch?v=a12S4ap6bgw

There is no camera and no hard cut the detector can see: the whole film plays on one white page, and every change is either a slide or an instant swap. Two habits run through it. Things move right to left, as if someone were swiping through a carousel (the title is pushed off left, the wall steps and leaves left, the single face enters from the right). And the face changes by swapping whole drawings on a single frame, like flipping through options in a picker, while the UI moments use small, familiar interface moves: a button press, avatars stacking, initials turning into pictures.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▂▂▆█▅▇▇▆▆█▄▂▃▂▃▄▃▄▅▃▂▅▂▁▃▃▁▁▁▁
```

## Sequences

### 01. Add a line, re-center the block

00:00.00–00:02.00 (2.00 s) · 17 frames at 8 fps, 0.125 s apart · type-on, re-center, hold

'New year.' appears at 0.17 on a blank white frame with no animation at all. At 1.42 'New you.' is added beneath it and the pair jumps up to stay centered as a block. Nothing slides or fades; the text behaves like a document being written. The same rule returns at the end, when 'Make it.' is appended to 'Think it.'

Motion: `▁▄▁▁▁▁▁▁▁▁▁▅▁▁▁▁▁`

Onion skin: `motion/title-build/trail.webp`

- 00:00.00 `motion/title-build/f-001.webp` ▁
- 00:00.12 `motion/title-build/f-002.webp` ▄
- 00:00.25 `motion/title-build/f-003.webp` ▁
- 00:00.38 `motion/title-build/f-004.webp` ▁
- 00:00.50 `motion/title-build/f-005.webp` ▁
- 00:00.62 `motion/title-build/f-006.webp` ▁
- 00:00.75 `motion/title-build/f-007.webp` ▁
- 00:00.88 `motion/title-build/f-008.webp` ▁
- 00:01.00 `motion/title-build/f-009.webp` ▁
- 00:01.12 `motion/title-build/f-010.webp` ▁
- 00:01.25 `motion/title-build/f-011.webp` ▁
- 00:01.38 `motion/title-build/f-012.webp` ▅
- 00:01.50 `motion/title-build/f-013.webp` ▁
- 00:01.62 `motion/title-build/f-014.webp` ▁
- 00:01.75 `motion/title-build/f-015.webp` ▁
- 00:01.88 `motion/title-build/f-016.webp` ▁
- 00:02.00 `motion/title-build/f-017.webp` ▁

### 02. The wall pushes the title off

00:02.60–00:04.50 (1.90 s) · 24 frames at 12 fps, 0.083 s apart · slide, push, ease out, stagger

At 2.79 a blue tile cuts in at the top right and the title starts moving left, gone by about 2.95. The wall of tiles follows fast from the right, in staggered rows so it never looks like one rigid sheet, and then decelerates for over a second, coming to rest at about 4.4. Fast in, long settle: the crowd arrives with energy and then lets you look.

Motion: `▅▅▆██████████████▇▇▆▅▄▂▁`

- 00:02.60 `motion/wall-arrives/f-001.webp` ▅
- 00:02.68 `motion/wall-arrives/f-002.webp` ▅
- 00:02.77 `motion/wall-arrives/f-003.webp` ▆
- 00:02.85 `motion/wall-arrives/f-004.webp` █
- 00:02.93 `motion/wall-arrives/f-005.webp` █
- 00:03.02 `motion/wall-arrives/f-006.webp` █
- 00:03.10 `motion/wall-arrives/f-007.webp` █
- 00:03.18 `motion/wall-arrives/f-008.webp` █
- 00:03.27 `motion/wall-arrives/f-009.webp` █
- 00:03.35 `motion/wall-arrives/f-010.webp` █
- 00:03.43 `motion/wall-arrives/f-011.webp` █
- 00:03.52 `motion/wall-arrives/f-012.webp` █
- 00:03.60 `motion/wall-arrives/f-013.webp` █
- 00:03.68 `motion/wall-arrives/f-014.webp` █
- 00:03.77 `motion/wall-arrives/f-015.webp` █
- 00:03.85 `motion/wall-arrives/f-016.webp` █
- 00:03.93 `motion/wall-arrives/f-017.webp` █
- 00:04.02 `motion/wall-arrives/f-018.webp` ▇
- 00:04.10 `motion/wall-arrives/f-019.webp` ▇
- 00:04.18 `motion/wall-arrives/f-020.webp` ▆
- 00:04.27 `motion/wall-arrives/f-021.webp` ▅
- 00:04.35 `motion/wall-arrives/f-022.webp` ▄
- 00:04.43 `motion/wall-arrives/f-023.webp` ▂
- 00:04.52 `motion/wall-arrives/f-024.webp` ▁

### 03. One column to the left

00:04.90–00:05.80 (0.90 s) · 15 frames at 16 fps, 0.062 s apart · step, slide, carousel

After half a second at rest, the whole wall shifts left by exactly one column between 5.05 and 5.6, bringing in a woman with long curls and a sunglasses tile on blue. It is the move of a carousel advancing one card, and it says there are more faces than fit on the screen.

Motion: `▁▁▃▅▇█████▇▆▃▃▅`

- 00:04.90 `motion/wall-step/f-001.webp` ▁
- 00:04.96 `motion/wall-step/f-002.webp` ▁
- 00:05.03 `motion/wall-step/f-003.webp` ▃
- 00:05.09 `motion/wall-step/f-004.webp` ▅
- 00:05.15 `motion/wall-step/f-005.webp` ▇
- 00:05.21 `motion/wall-step/f-006.webp` █
- 00:05.28 `motion/wall-step/f-007.webp` █
- 00:05.34 `motion/wall-step/f-008.webp` █
- 00:05.40 `motion/wall-step/f-009.webp` █
- 00:05.46 `motion/wall-step/f-010.webp` █
- 00:05.53 `motion/wall-step/f-011.webp` ▇
- 00:05.59 `motion/wall-step/f-012.webp` ▆
- 00:05.65 `motion/wall-step/f-013.webp` ▃
- 00:05.71 `motion/wall-step/f-014.webp` ▃
- 00:05.78 `motion/wall-step/f-015.webp` ▅

### 04. A sliding-puzzle reshuffle

00:05.70–00:07.90 (2.20 s) · 19 frames at 8 fps, 0.125 s apart · sliding puzzle, gaps, one at a time

From 5.8 the wall rearranges like a sliding-tile puzzle. A tile leaves through an edge, and a gap opens. A neighbor slides into it, and new tiles come in from the top or bottom: a blue sunglasses tile up at 5.9, a red tile out at the bottom at 6.2, the heart-eyes face sliding left at 6.8, a red bob back in at 7.3, a bearded face on yellow dropping in at 7.6. Only one or two tiles move at a time, so the eye can follow each one. By 7.75 every slot is full again.

Motion: `▄▇▇▇▇▇▇▇▆▆▆▆▇▇▆▆▅▁▁`

- 00:05.70 `motion/tile-shuffle/f-001.webp` ▄
- 00:05.83 `motion/tile-shuffle/f-002.webp` ▇
- 00:05.95 `motion/tile-shuffle/f-003.webp` ▇
- 00:06.08 `motion/tile-shuffle/f-004.webp` ▇
- 00:06.20 `motion/tile-shuffle/f-005.webp` ▇
- 00:06.33 `motion/tile-shuffle/f-006.webp` ▇
- 00:06.45 `motion/tile-shuffle/f-007.webp` ▇
- 00:06.58 `motion/tile-shuffle/f-008.webp` ▇
- 00:06.70 `motion/tile-shuffle/f-009.webp` ▆
- 00:06.83 `motion/tile-shuffle/f-010.webp` ▆
- 00:06.95 `motion/tile-shuffle/f-011.webp` ▆
- 00:07.08 `motion/tile-shuffle/f-012.webp` ▆
- 00:07.20 `motion/tile-shuffle/f-013.webp` ▇
- 00:07.33 `motion/tile-shuffle/f-014.webp` ▇
- 00:07.45 `motion/tile-shuffle/f-015.webp` ▆
- 00:07.58 `motion/tile-shuffle/f-016.webp` ▆
- 00:07.70 `motion/tile-shuffle/f-017.webp` ▅
- 00:07.83 `motion/tile-shuffle/f-018.webp` ▁
- 00:07.95 `motion/tile-shuffle/f-019.webp` ▁

### 05. Many leave, one arrives

00:08.70–00:10.30 (1.60 s) · 20 frames at 12 fps, 0.083 s apart · slide out, stagger, enter from right, ease out

At 8.75 the wall slides left and its tiles drop out in a quick stagger, the last grey tile vanishing at about 9.35. For a frame or two the page is empty. At 9.42 a single face, much larger and with no tile behind it, enters at the right edge and eases to the center, slowing all the way until about 10.2. The direction stays the same, so the one face reads as the next card in the same carousel.

Motion: `▃▆▇█████▆▇▇▇▇▇▆▆▆▅▄▄`

- 00:08.70 `motion/wall-exit/f-001.webp` ▃
- 00:08.78 `motion/wall-exit/f-002.webp` ▆
- 00:08.87 `motion/wall-exit/f-003.webp` ▇
- 00:08.95 `motion/wall-exit/f-004.webp` █
- 00:09.03 `motion/wall-exit/f-005.webp` █
- 00:09.12 `motion/wall-exit/f-006.webp` █
- 00:09.20 `motion/wall-exit/f-007.webp` █
- 00:09.28 `motion/wall-exit/f-008.webp` █
- 00:09.37 `motion/wall-exit/f-009.webp` ▆
- 00:09.45 `motion/wall-exit/f-010.webp` ▇
- 00:09.53 `motion/wall-exit/f-011.webp` ▇
- 00:09.62 `motion/wall-exit/f-012.webp` ▇
- 00:09.70 `motion/wall-exit/f-013.webp` ▇
- 00:09.78 `motion/wall-exit/f-014.webp` ▇
- 00:09.87 `motion/wall-exit/f-015.webp` ▆
- 00:09.95 `motion/wall-exit/f-016.webp` ▆
- 00:10.03 `motion/wall-exit/f-017.webp` ▆
- 00:10.12 `motion/wall-exit/f-018.webp` ▅
- 00:10.20 `motion/wall-exit/f-019.webp` ▄
- 00:10.28 `motion/wall-exit/f-020.webp` ▄

### 06. Eight looks, swapped on single frames

00:10.10–00:15.85 (5.75 s) · 24 frames at 4 fps, 0.250 s apart · swap, accumulate, picker rhythm, hold

The face never moves; the drawing is replaced in one frame each time, with only a tiny settle after. Tongue out at 10.25, a donut at 10.92, a toothy grin at 11.79, sunglasses at 12.38, square glasses at 12.88, a pencil in the hair at 13.42, frazzled hair with stress marks at 14.04, a graduation cap at 14.96. Holds run from half a second to just under a second, about the time it takes to read each joke. Some changes stay (the grin, the glasses) and some are swapped out, so it plays as one person through a year, not a menu of unrelated options.

Motion: `▅▂▁▄▁▁▃▂▁▄▁▄▁▃▁▃▃▁▁▄▁▁▁▆`

- 00:10.10 `motion/try-on/f-001.webp` ▅
- 00:10.35 `motion/try-on/f-002.webp` ▂
- 00:10.60 `motion/try-on/f-003.webp` ▁
- 00:10.85 `motion/try-on/f-004.webp` ▄
- 00:11.10 `motion/try-on/f-005.webp` ▁
- 00:11.35 `motion/try-on/f-006.webp` ▁
- 00:11.60 `motion/try-on/f-007.webp` ▃
- 00:11.85 `motion/try-on/f-008.webp` ▂
- 00:12.10 `motion/try-on/f-009.webp` ▁
- 00:12.35 `motion/try-on/f-010.webp` ▄
- 00:12.60 `motion/try-on/f-011.webp` ▁
- 00:12.85 `motion/try-on/f-012.webp` ▄
- 00:13.10 `motion/try-on/f-013.webp` ▁
- 00:13.35 `motion/try-on/f-014.webp` ▃
- 00:13.60 `motion/try-on/f-015.webp` ▁
- 00:13.85 `motion/try-on/f-016.webp` ▃
- 00:14.10 `motion/try-on/f-017.webp` ▃
- 00:14.35 `motion/try-on/f-018.webp` ▁
- 00:14.60 `motion/try-on/f-019.webp` ▁
- 00:14.85 `motion/try-on/f-020.webp` ▄
- 00:15.10 `motion/try-on/f-021.webp` ▁
- 00:15.35 `motion/try-on/f-022.webp` ▁
- 00:15.60 `motion/try-on/f-023.webp` ▁
- 00:15.85 `motion/try-on/f-024.webp` ▆

### 07. Click the default avatar

00:15.90–00:17.60 (1.70 s) · 21 frames at 12 fps, 0.083 s apart · swap in place, cursor, button press, pop

At 15.88 the capped face is replaced, in the same place, by Notion's default avatar, a grey 'N' in a white circle with a drop shadow. A cursor rises from the bottom right at 16.4 and stops on its edge. The circle presses in slightly from about 16.95, and at 17.16 the portrait pops into it. The cursor drifts away at 17.3. It is the whole feature in one before-and-after, done with the most ordinary UI gesture there is.

Motion: `▇▄▃▂▂▂▃▅▄▃▁▁▁▃▄▆▅▄▅▂▁`

Onion skin: `motion/avatar-click/trail.webp`

- 00:15.90 `motion/avatar-click/f-001.webp` ▇
- 00:15.98 `motion/avatar-click/f-002.webp` ▄
- 00:16.07 `motion/avatar-click/f-003.webp` ▃
- 00:16.15 `motion/avatar-click/f-004.webp` ▂
- 00:16.23 `motion/avatar-click/f-005.webp` ▂
- 00:16.32 `motion/avatar-click/f-006.webp` ▂
- 00:16.40 `motion/avatar-click/f-007.webp` ▃
- 00:16.48 `motion/avatar-click/f-008.webp` ▅
- 00:16.57 `motion/avatar-click/f-009.webp` ▄
- 00:16.65 `motion/avatar-click/f-010.webp` ▃
- 00:16.73 `motion/avatar-click/f-011.webp` ▁
- 00:16.82 `motion/avatar-click/f-012.webp` ▁
- 00:16.90 `motion/avatar-click/f-013.webp` ▁
- 00:16.98 `motion/avatar-click/f-014.webp` ▃
- 00:17.07 `motion/avatar-click/f-015.webp` ▄
- 00:17.15 `motion/avatar-click/f-016.webp` ▆
- 00:17.23 `motion/avatar-click/f-017.webp` ▅
- 00:17.32 `motion/avatar-click/f-018.webp` ▄
- 00:17.40 `motion/avatar-click/f-019.webp` ▅
- 00:17.48 `motion/avatar-click/f-020.webp` ▂
- 00:17.57 `motion/avatar-click/f-021.webp` ▁

### 08. From one avatar to a team

00:18.00–00:20.70 (2.70 s) · 23 frames at 8 fps, 0.125 s apart · shrink, stagger, facepile, swap left to right

The avatar shrinks from about 18.1 to 18.3 and holds small and alone. From 18.7 it slides left while grey initial circles stack out to its right, Y, J, M, A (19.0 to 19.3), followed by 'Share' and a comment icon. After a second of plain initials, they turn into faces one at a time, left to right, between 20.2 and 20.5. The faces belong to people from the opening wall, so the film closes its own loop.

Motion: `▄▆▅▃▁▃▅▅▄▄▄▄▃▂▂▂▁▂▃▃▂▂▁`

- 00:18.00 `motion/to-facepile/f-001.webp` ▄
- 00:18.12 `motion/to-facepile/f-002.webp` ▆
- 00:18.25 `motion/to-facepile/f-003.webp` ▅
- 00:18.38 `motion/to-facepile/f-004.webp` ▃
- 00:18.50 `motion/to-facepile/f-005.webp` ▁
- 00:18.62 `motion/to-facepile/f-006.webp` ▃
- 00:18.75 `motion/to-facepile/f-007.webp` ▅
- 00:18.88 `motion/to-facepile/f-008.webp` ▅
- 00:19.00 `motion/to-facepile/f-009.webp` ▄
- 00:19.12 `motion/to-facepile/f-010.webp` ▄
- 00:19.25 `motion/to-facepile/f-011.webp` ▄
- 00:19.38 `motion/to-facepile/f-012.webp` ▄
- 00:19.50 `motion/to-facepile/f-013.webp` ▃
- 00:19.62 `motion/to-facepile/f-014.webp` ▂
- 00:19.75 `motion/to-facepile/f-015.webp` ▂
- 00:19.88 `motion/to-facepile/f-016.webp` ▂
- 00:20.00 `motion/to-facepile/f-017.webp` ▁
- 00:20.12 `motion/to-facepile/f-018.webp` ▂
- 00:20.25 `motion/to-facepile/f-019.webp` ▃
- 00:20.38 `motion/to-facepile/f-020.webp` ▃
- 00:20.50 `motion/to-facepile/f-021.webp` ▂
- 00:20.62 `motion/to-facepile/f-022.webp` ▂
- 00:20.75 `motion/to-facepile/f-023.webp` ▁

### 09. Three lines rise and tighten

00:21.40–00:22.30 (0.90 s) · 15 frames at 16 fps, 0.062 s apart · stagger, rise, leading settles

At 21.5 the facepile is gone and 'Create your' is on the page; 'new look with' and 'Notion Faces' follow a frame apart. The lines arrive loosely spaced and pull together into a tight block over the next half second, settling by about 22.1. It is the only text in the film that moves, and the only line that names the feature.

Motion: `▁▁▆▇▆▆▅▅▄▄▄▃▃▂▂`

- 00:21.40 `motion/headline/f-001.webp` ▁
- 00:21.46 `motion/headline/f-002.webp` ▁
- 00:21.52 `motion/headline/f-003.webp` ▆
- 00:21.59 `motion/headline/f-004.webp` ▇
- 00:21.65 `motion/headline/f-005.webp` ▆
- 00:21.71 `motion/headline/f-006.webp` ▆
- 00:21.77 `motion/headline/f-007.webp` ▅
- 00:21.84 `motion/headline/f-008.webp` ▅
- 00:21.90 `motion/headline/f-009.webp` ▄
- 00:21.96 `motion/headline/f-010.webp` ▄
- 00:22.02 `motion/headline/f-011.webp` ▄
- 00:22.09 `motion/headline/f-012.webp` ▃
- 00:22.15 `motion/headline/f-013.webp` ▃
- 00:22.21 `motion/headline/f-014.webp` ▂
- 00:22.27 `motion/headline/f-015.webp` ▂

### 10. Think it, make it, logo

00:23.90–00:26.00 (2.10 s) · 18 frames at 8 fps, 0.125 s apart · append, re-center, slide, fade-in

'Think it.' replaces the headline at 24.08; 'Make it.' is added at 24.54 and the line re-centers, echoing the opening. At 25.25 the Notion icon appears alone. From about 25.6 it slides left while 'Notion' fades in beside it, grey first and solid by 25.85. Then nothing moves for the last three seconds.

Motion: `▁▅▁▁▁▃▁▁▁▁▁▄▁▂▄▄▁▁`

- 00:23.90 `motion/sign-off/f-001.webp` ▁
- 00:24.02 `motion/sign-off/f-002.webp` ▅
- 00:24.15 `motion/sign-off/f-003.webp` ▁
- 00:24.27 `motion/sign-off/f-004.webp` ▁
- 00:24.40 `motion/sign-off/f-005.webp` ▁
- 00:24.52 `motion/sign-off/f-006.webp` ▃
- 00:24.65 `motion/sign-off/f-007.webp` ▁
- 00:24.77 `motion/sign-off/f-008.webp` ▁
- 00:24.90 `motion/sign-off/f-009.webp` ▁
- 00:25.02 `motion/sign-off/f-010.webp` ▁
- 00:25.15 `motion/sign-off/f-011.webp` ▁
- 00:25.27 `motion/sign-off/f-012.webp` ▄
- 00:25.40 `motion/sign-off/f-013.webp` ▁
- 00:25.52 `motion/sign-off/f-014.webp` ▂
- 00:25.65 `motion/sign-off/f-015.webp` ▄
- 00:25.77 `motion/sign-off/f-016.webp` ▄
- 00:25.90 `motion/sign-off/f-017.webp` ▁
- 00:26.02 `motion/sign-off/f-018.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` 'New year.' alone on white, small black sans, centered, with nothing else on the page. The film opens on half of an idiom everyone can finish.
- 00:01.00 `seconds/second-00002.webp` 'New you.' arrives under it and the two lines re-center as a block, the way text settles when you add a line on a page.
- 00:03.00 `seconds/second-00004.webp` A wall of portrait tiles slides in from the right and has pushed the title off to the left. The tiles enter staggered, so the wall reads as a moving crowd rather than a grid.
- 00:04.00 `seconds/second-00005.webp` The wall at rest, three tiles across and two down. Colored tiles (yellow, blue, red) show the face cropped into a white circle, the way an avatar is cropped; pale grey tiles show the whole drawing. Spiral eyes, a wink, heart eyes: the expressions are part of the system.
- 00:05.00 `seconds/second-00006.webp` Mid-step: the whole wall shifts left one column, and a woman with long curls enters on the right. More than a dozen people in one ink style, with hair, glasses and skin shading doing the variety.
- 00:06.00 `seconds/second-00007.webp` The wall starts to reshuffle like a sliding puzzle. A gap opens at the right and a blue tile slides into it.
- 00:07.00 `seconds/second-00008.webp` Two gaps at the left edge, tiles moving through them one at a time. The crowd keeps rearranging without ever cutting.
- 00:08.00 `seconds/second-00009.webp` Settled again, with a bearded face on yellow at top left. Of six tiles, three are colored and three are grey, a ratio that holds through the wall.
- 00:09.00 `seconds/second-00010.webp` The wall has gone off left and one face has slid in from the right, still easing toward the center. From many people to one person in half a second.
- 00:10.00 `seconds/second-00011.webp` The face at the center of the white page, alone and large, tongue out. Grey skin carries a fine halftone stipple, the only texture in the film.
- 00:11.00 `seconds/second-00012.webp` A donut in her mouth, bitten. The first accessory, and the funniest: the holidays before the resolutions.
- 00:12.00 `seconds/second-00013.webp` Sunglasses and a toothy grin. The grin she gained a second ago stays on; changes pile up instead of resetting.
- 00:13.00 `seconds/second-00014.webp` Square glasses, and a pencil tucked into her hair. The look turns studious.
- 00:14.00 `seconds/second-00015.webp` Frazzled hair flying out, with little stress marks at the sides. The one bad day in the sequence.
- 00:15.00 `seconds/second-00016.webp` A graduation cap on top, glasses still on. The last look ends the year on an achievement.
- 00:16.00 `seconds/second-00017.webp` A hard change to Notion's default avatar: a grey 'N' in a white circle with a soft shadow, in the same spot and at about the same size as the face. A cursor rises toward it.
- 00:17.00 `seconds/second-00018.webp` One click and the portrait has filled the circle. The feature is shown in the slot where it will be seen, not in an editor.
- 00:18.00 `seconds/second-00019.webp` The avatar shrinks to a small circle and sits alone for a beat, an ordinary piece of UI now.
- 00:19.00 `seconds/second-00020.webp` The avatar slides left as grey initial circles (Y, J, M, A) pile in beside it, then 'Share' and a comment icon. It is the top corner of a shared Notion page.
- 00:20.00 `seconds/second-00021.webp` The initials have turned into faces one by one, left to right, and they are faces from the opening wall. The whole team has made one.
- 00:22.00 `seconds/second-00023.webp` 'Create your new look with Notion Faces' in three bold centered lines. The only line that names the feature.
- 00:24.00 `seconds/second-00025.webp` 'Think it.' alone in small sans; 'Make it.' is added beside it half a second later, and the line re-centers, like the opening.
- 00:25.00 `seconds/second-00026.webp` The Notion icon alone on white.
- 00:26.00 `seconds/second-00027.webp` The icon slides left as 'Notion' fades in beside it, grey first and then black. The music starts fading here.
- 00:28.00 `seconds/second-00029.webp` The wordmark holds in near silence for the last two seconds.
