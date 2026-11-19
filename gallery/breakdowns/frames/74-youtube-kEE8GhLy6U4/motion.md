# Motion notes: Introducing Arc for iPhone

The Browser Company · 00:40.98 · https://www.youtube.com/watch?v=kEE8GhLy6U4

The film has almost no movement of its own. Nearly every moving thing is borrowed: people packing, running, pushing a van, a house on balloons. What the editors control is the cut and the type. Shots average about 1.3 seconds and get shorter through the packing montage, the white serif sentence either holds still across cuts or stands alone on black, and the few designed moves are the app's own: a smiley that blinks, spaces swiped sideways, an icon flickering through its variants, and a logo outline laid over the last shot. The sequences below follow those cuts and the type across them.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▃▃▄▂▂▄▄▄▄▅▆▆▄▄▄▄▅▆▅▄▃▄▄▄▅▄▅▅▄▄▄▄▄▄▄▃▃▄▄▁▁
```

## Sequences

### 01. One word holds while the clips change under it

00:00.90–00:03.60 (2.70 s) · 23 frames at 8 fps, 0.125 s apart · dissolve on, title over cut, hold

'Home' dissolves on at about 1.3 over a flash-lit laptop on a messy desk and is solid by 1.5. At 2.34 a hard cut drops to near black, a face lit by a laptop, and the word does not move or change size: it sits exactly where it was. It holds until 3.45, then cuts away with the shot to a sleeping figure. Because the text ignores the cut, the two clips read as examples of one word rather than as a story.

Motion: `▃▃▃▃▃▃▃▃▃▃▃▇▁▁▁▁▁▁▁▁▁▅▁`

- 00:00.90 `motion/home-over-cut/f-001.webp` ▃
- 00:01.02 `motion/home-over-cut/f-002.webp` ▃
- 00:01.15 `motion/home-over-cut/f-003.webp` ▃
- 00:01.27 `motion/home-over-cut/f-004.webp` ▃
- 00:01.40 `motion/home-over-cut/f-005.webp` ▃
- 00:01.52 `motion/home-over-cut/f-006.webp` ▃
- 00:01.65 `motion/home-over-cut/f-007.webp` ▃
- 00:01.77 `motion/home-over-cut/f-008.webp` ▃
- 00:01.90 `motion/home-over-cut/f-009.webp` ▃
- 00:02.02 `motion/home-over-cut/f-010.webp` ▃
- 00:02.15 `motion/home-over-cut/f-011.webp` ▃
- 00:02.27 `motion/home-over-cut/f-012.webp` ▇
- 00:02.40 `motion/home-over-cut/f-013.webp` ▁
- 00:02.52 `motion/home-over-cut/f-014.webp` ▁
- 00:02.65 `motion/home-over-cut/f-015.webp` ▁
- 00:02.77 `motion/home-over-cut/f-016.webp` ▁
- 00:02.90 `motion/home-over-cut/f-017.webp` ▁
- 00:03.02 `motion/home-over-cut/f-018.webp` ▁
- 00:03.15 `motion/home-over-cut/f-019.webp` ▁
- 00:03.27 `motion/home-over-cut/f-020.webp` ▁
- 00:03.40 `motion/home-over-cut/f-021.webp` ▁
- 00:03.52 `motion/home-over-cut/f-022.webp` ▅
- 00:03.65 `motion/home-over-cut/f-023.webp` ▁

### 02. 'What if', and the music comes in

00:05.20–00:09.20 (4.00 s) · 33 frames at 8 fps, 0.125 s apart · word-by-word, black and white, music hit, hard cut to color

A woman lifts a laptop over her head in a pale room ('What's out there?' at 5.5), a hand gropes across a dark table from 6.42, and at 7.17 a man in black and white looks around an empty room. 'What' appears on him at about 7.25 and 'if' joins it at 7.5. As 'Where's my phone?' is heard, the music stem jumps about 15 dB, from around -28 to -13 dB, at 7.75, and at 7.92 a hard cut lands on a teal backpack in color with hands grabbing it. Monochrome and quiet give way to color and full volume on the same beat the question is asked.

Motion: `▁▇▃▃▃▄▄▄▄▄▇▂▂▁▂▁▆▄▄▄▄▃▆▄▅▄▄▄▃▄▄▆▃`

- 00:05.20 `motion/what-if/f-001.webp` ▁
- 00:05.33 `motion/what-if/f-002.webp` ▇
- 00:05.45 `motion/what-if/f-003.webp` ▃
- 00:05.58 `motion/what-if/f-004.webp` ▃
- 00:05.70 `motion/what-if/f-005.webp` ▃
- 00:05.83 `motion/what-if/f-006.webp` ▄
- 00:05.95 `motion/what-if/f-007.webp` ▄
- 00:06.08 `motion/what-if/f-008.webp` ▄
- 00:06.20 `motion/what-if/f-009.webp` ▄
- 00:06.33 `motion/what-if/f-010.webp` ▄
- 00:06.45 `motion/what-if/f-011.webp` ▇
- 00:06.58 `motion/what-if/f-012.webp` ▂
- 00:06.70 `motion/what-if/f-013.webp` ▂
- 00:06.83 `motion/what-if/f-014.webp` ▁
- 00:06.95 `motion/what-if/f-015.webp` ▂
- 00:07.08 `motion/what-if/f-016.webp` ▁
- 00:07.20 `motion/what-if/f-017.webp` ▆
- 00:07.33 `motion/what-if/f-018.webp` ▄
- 00:07.45 `motion/what-if/f-019.webp` ▄
- 00:07.58 `motion/what-if/f-020.webp` ▄
- 00:07.70 `motion/what-if/f-021.webp` ▄
- 00:07.83 `motion/what-if/f-022.webp` ▃
- 00:07.95 `motion/what-if/f-023.webp` ▆
- 00:08.07 `motion/what-if/f-024.webp` ▄
- 00:08.20 `motion/what-if/f-025.webp` ▅
- 00:08.32 `motion/what-if/f-026.webp` ▄
- 00:08.45 `motion/what-if/f-027.webp` ▄
- 00:08.57 `motion/what-if/f-028.webp` ▄
- 00:08.70 `motion/what-if/f-029.webp` ▃
- 00:08.82 `motion/what-if/f-030.webp` ▄
- 00:08.95 `motion/what-if/f-031.webp` ▄
- 00:09.07 `motion/what-if/f-032.webp` ▆
- 00:09.20 `motion/what-if/f-033.webp` ▃

### 03. The caption rides a blur, then lands on the snail

00:09.90–00:12.80 (2.90 s) · 24 frames at 8 fps, 0.125 s apart · subtitle-style caption, motion blur, match on idea

'you could bring home with you' comes on with a hard cut at 9.93 to a drawer being emptied, a smear of white sleeve and dark clothes. The line sits mid-frame through the blur and stays on across the cut at 11.51 to a snail crawling over gravel, then leaves at about 12.0 so the snail has a second alone. The caption ends on the one image that says it without words.

Motion: `▇▆▄▅▅▆▇▇▆▆▆▇▅▆▂▂▃▃▃▂▂▃▂▇`

- 00:09.90 `motion/caption-to-snail/f-001.webp` ▇
- 00:10.03 `motion/caption-to-snail/f-002.webp` ▆
- 00:10.15 `motion/caption-to-snail/f-003.webp` ▄
- 00:10.28 `motion/caption-to-snail/f-004.webp` ▅
- 00:10.40 `motion/caption-to-snail/f-005.webp` ▅
- 00:10.53 `motion/caption-to-snail/f-006.webp` ▆
- 00:10.65 `motion/caption-to-snail/f-007.webp` ▇
- 00:10.78 `motion/caption-to-snail/f-008.webp` ▇
- 00:10.90 `motion/caption-to-snail/f-009.webp` ▆
- 00:11.03 `motion/caption-to-snail/f-010.webp` ▆
- 00:11.15 `motion/caption-to-snail/f-011.webp` ▆
- 00:11.28 `motion/caption-to-snail/f-012.webp` ▇
- 00:11.40 `motion/caption-to-snail/f-013.webp` ▅
- 00:11.53 `motion/caption-to-snail/f-014.webp` ▆
- 00:11.65 `motion/caption-to-snail/f-015.webp` ▂
- 00:11.78 `motion/caption-to-snail/f-016.webp` ▂
- 00:11.90 `motion/caption-to-snail/f-017.webp` ▃
- 00:12.03 `motion/caption-to-snail/f-018.webp` ▃
- 00:12.15 `motion/caption-to-snail/f-019.webp` ▃
- 00:12.28 `motion/caption-to-snail/f-020.webp` ▂
- 00:12.40 `motion/caption-to-snail/f-021.webp` ▂
- 00:12.53 `motion/caption-to-snail/f-022.webp` ▃
- 00:12.65 `motion/caption-to-snail/f-023.webp` ▂
- 00:12.78 `motion/caption-to-snail/f-024.webp` ▇

### 04. Packing, then leaving, a little faster each time

00:12.70–00:19.40 (6.70 s) · 41 frames at 6 fps, 0.167 s apart · montage, found footage, mixed aspect ratios, accelerating cuts

Mr. Bean stuffs a suitcase (12.76, letterboxed 4:3), someone hurries down a hallway (13.72), a tent goes up in the desert (14.81), a family rushes down a staircase (15.64), luggage is shoved into a convertible (16.23), the Little Miss Sunshine family pushes its van (16.81) and leaps aboard (17.56), and a bus piled with bags drives at camera (18.23). Shots fall from about a second to 0.58 s and then lengthen again for the bus. The motion inside each clip is all forward and away, so the sequence moves from rooms out onto roads without any designed move.

Motion: `▆▄▅▅▂▁▅▄▄▄▄▄▆▃▃▃▃▆▄▄▄▆▅▅▆▆▆▆▆▆▆▆▆▆▃▃▃▃▃▆▂`

- 00:12.70 `motion/packing-montage/f-001.webp` ▆
- 00:12.87 `motion/packing-montage/f-002.webp` ▄
- 00:13.03 `motion/packing-montage/f-003.webp` ▅
- 00:13.20 `motion/packing-montage/f-004.webp` ▅
- 00:13.37 `motion/packing-montage/f-005.webp` ▂
- 00:13.53 `motion/packing-montage/f-006.webp` ▁
- 00:13.70 `motion/packing-montage/f-007.webp` ▅
- 00:13.87 `motion/packing-montage/f-008.webp` ▄
- 00:14.03 `motion/packing-montage/f-009.webp` ▄
- 00:14.20 `motion/packing-montage/f-010.webp` ▄
- 00:14.37 `motion/packing-montage/f-011.webp` ▄
- 00:14.53 `motion/packing-montage/f-012.webp` ▄
- 00:14.70 `motion/packing-montage/f-013.webp` ▆
- 00:14.87 `motion/packing-montage/f-014.webp` ▃
- 00:15.03 `motion/packing-montage/f-015.webp` ▃
- 00:15.20 `motion/packing-montage/f-016.webp` ▃
- 00:15.37 `motion/packing-montage/f-017.webp` ▃
- 00:15.53 `motion/packing-montage/f-018.webp` ▆
- 00:15.70 `motion/packing-montage/f-019.webp` ▄
- 00:15.87 `motion/packing-montage/f-020.webp` ▄
- 00:16.03 `motion/packing-montage/f-021.webp` ▄
- 00:16.20 `motion/packing-montage/f-022.webp` ▆
- 00:16.37 `motion/packing-montage/f-023.webp` ▅
- 00:16.53 `motion/packing-montage/f-024.webp` ▅
- 00:16.70 `motion/packing-montage/f-025.webp` ▆
- 00:16.87 `motion/packing-montage/f-026.webp` ▆
- 00:17.03 `motion/packing-montage/f-027.webp` ▆
- 00:17.20 `motion/packing-montage/f-028.webp` ▆
- 00:17.37 `motion/packing-montage/f-029.webp` ▆
- 00:17.53 `motion/packing-montage/f-030.webp` ▆
- 00:17.70 `motion/packing-montage/f-031.webp` ▆
- 00:17.87 `motion/packing-montage/f-032.webp` ▆
- 00:18.03 `motion/packing-montage/f-033.webp` ▆
- 00:18.20 `motion/packing-montage/f-034.webp` ▆
- 00:18.37 `motion/packing-montage/f-035.webp` ▃
- 00:18.53 `motion/packing-montage/f-036.webp` ▃
- 00:18.70 `motion/packing-montage/f-037.webp` ▃
- 00:18.87 `motion/packing-montage/f-038.webp` ▃
- 00:19.03 `motion/packing-montage/f-039.webp` ▃
- 00:19.20 `motion/packing-montage/f-040.webp` ▆
- 00:19.37 `motion/packing-montage/f-041.webp` ▂

### 05. Watching the house go by

00:19.30–00:23.30 (4.00 s) · 25 frames at 6 fps, 0.167 s apart · longest shot, reflection, reaction

At 3.84 s this Up shot is the longest in the film. The balloon house drifts across a window from top left, seen mostly as a reflection behind a mother and her children, while a father steps in from the right at about 20.8. By 22.4 the family has turned to each other, wide-eyed. The film slows here, on people watching a home travel, just as the song's vocal begins at about 19.5.

Motion: `▆▂▂▂▂▂▂▂▃▃▄▃▄▄▃▃▃▃▄▄▄▄▃▇▁`

- 00:19.30 `motion/up-window/f-001.webp` ▆
- 00:19.47 `motion/up-window/f-002.webp` ▂
- 00:19.63 `motion/up-window/f-003.webp` ▂
- 00:19.80 `motion/up-window/f-004.webp` ▂
- 00:19.97 `motion/up-window/f-005.webp` ▂
- 00:20.13 `motion/up-window/f-006.webp` ▂
- 00:20.30 `motion/up-window/f-007.webp` ▂
- 00:20.47 `motion/up-window/f-008.webp` ▂
- 00:20.63 `motion/up-window/f-009.webp` ▃
- 00:20.80 `motion/up-window/f-010.webp` ▃
- 00:20.97 `motion/up-window/f-011.webp` ▄
- 00:21.13 `motion/up-window/f-012.webp` ▃
- 00:21.30 `motion/up-window/f-013.webp` ▄
- 00:21.47 `motion/up-window/f-014.webp` ▄
- 00:21.63 `motion/up-window/f-015.webp` ▃
- 00:21.80 `motion/up-window/f-016.webp` ▃
- 00:21.97 `motion/up-window/f-017.webp` ▃
- 00:22.13 `motion/up-window/f-018.webp` ▃
- 00:22.30 `motion/up-window/f-019.webp` ▄
- 00:22.47 `motion/up-window/f-020.webp` ▄
- 00:22.63 `motion/up-window/f-021.webp` ▄
- 00:22.80 `motion/up-window/f-022.webp` ▄
- 00:22.97 `motion/up-window/f-023.webp` ▃
- 00:23.13 `motion/up-window/f-024.webp` ▇
- 00:23.30 `motion/up-window/f-025.webp` ▁

### 06. 'You can', 'Hi there', 'Let's go', run

00:23.10–00:27.40 (4.30 s) · 35 frames at 8 fps, 0.125 s apart · title card, UI as dialogue, blink, cut on action

'You can' sits alone on black from 23.15 to 24.07, a cyclist crosses a black-and-white street to 24.98, and the first product frame is Arc's onboarding screen: a white smiley and 'Hi there' on a shifting purple gradient. The smiley blinks at about 25.46, eyes closing to dots for a single frame. At 26.05 it cuts to the app's 'Let's go' button, and at 26.61 to Jules and Jim racing across a footbridge. The app's own onboarding copy is cut as if it were a line in the film, and old footage answers it.

Motion: `▇▁▁▁▁▁▁▁▆▄▅▅▅▅▄█▂▂▂▂▂▂▂▅▂▃▂▂▇▆▆▆▆▆▆`

- 00:23.10 `motion/you-can-lets-go/f-001.webp` ▇
- 00:23.23 `motion/you-can-lets-go/f-002.webp` ▁
- 00:23.35 `motion/you-can-lets-go/f-003.webp` ▁
- 00:23.48 `motion/you-can-lets-go/f-004.webp` ▁
- 00:23.60 `motion/you-can-lets-go/f-005.webp` ▁
- 00:23.73 `motion/you-can-lets-go/f-006.webp` ▁
- 00:23.85 `motion/you-can-lets-go/f-007.webp` ▁
- 00:23.98 `motion/you-can-lets-go/f-008.webp` ▁
- 00:24.10 `motion/you-can-lets-go/f-009.webp` ▆
- 00:24.23 `motion/you-can-lets-go/f-010.webp` ▄
- 00:24.35 `motion/you-can-lets-go/f-011.webp` ▅
- 00:24.48 `motion/you-can-lets-go/f-012.webp` ▅
- 00:24.60 `motion/you-can-lets-go/f-013.webp` ▅
- 00:24.73 `motion/you-can-lets-go/f-014.webp` ▅
- 00:24.85 `motion/you-can-lets-go/f-015.webp` ▄
- 00:24.98 `motion/you-can-lets-go/f-016.webp` █
- 00:25.10 `motion/you-can-lets-go/f-017.webp` ▂
- 00:25.23 `motion/you-can-lets-go/f-018.webp` ▂
- 00:25.35 `motion/you-can-lets-go/f-019.webp` ▂
- 00:25.48 `motion/you-can-lets-go/f-020.webp` ▂
- 00:25.60 `motion/you-can-lets-go/f-021.webp` ▂
- 00:25.73 `motion/you-can-lets-go/f-022.webp` ▂
- 00:25.85 `motion/you-can-lets-go/f-023.webp` ▂
- 00:25.98 `motion/you-can-lets-go/f-024.webp` ▅
- 00:26.10 `motion/you-can-lets-go/f-025.webp` ▂
- 00:26.23 `motion/you-can-lets-go/f-026.webp` ▃
- 00:26.35 `motion/you-can-lets-go/f-027.webp` ▂
- 00:26.48 `motion/you-can-lets-go/f-028.webp` ▂
- 00:26.60 `motion/you-can-lets-go/f-029.webp` ▇
- 00:26.73 `motion/you-can-lets-go/f-030.webp` ▆
- 00:26.85 `motion/you-can-lets-go/f-031.webp` ▆
- 00:26.98 `motion/you-can-lets-go/f-032.webp` ▆
- 00:27.10 `motion/you-can-lets-go/f-033.webp` ▆
- 00:27.23 `motion/you-can-lets-go/f-034.webp` ▆
- 00:27.35 `motion/you-can-lets-go/f-035.webp` ▆

### 07. Spaces swiped sideways, a list rearranged

00:27.30–00:31.90 (4.60 s) · 38 frames at 8 fps, 0.125 s apart · phone UI, swipe, drag to reorder, floating screen

The phone screen is shown small and unframed, floating in the middle of black with no device around it. The purple 'Browser co' space sits from 27.36, slides left at about 28.3 to reveal the pink 'Crafting' space, which holds until a black card interrupts at 28.95. At 29.86 'Crafting' returns and slides off at about 30.2 to the yellow 'Home' space. From 30.6 the Home list scrolls up and at about 31.3 'Murakami's vinyl collection' is dragged up into the list. Each space has its own color, so a swipe reads as a change of room.

Motion: `▇▂▂▂▂▂▂▃▄▄▃▃▄▇▁▁▁▁▁▁▇▄▄▄▄▄▃▃▃▃▃▃▄▃▁▁▆▁`

- 00:27.30 `motion/spaces-swipe/f-001.webp` ▇
- 00:27.43 `motion/spaces-swipe/f-002.webp` ▂
- 00:27.55 `motion/spaces-swipe/f-003.webp` ▂
- 00:27.68 `motion/spaces-swipe/f-004.webp` ▂
- 00:27.80 `motion/spaces-swipe/f-005.webp` ▂
- 00:27.93 `motion/spaces-swipe/f-006.webp` ▂
- 00:28.05 `motion/spaces-swipe/f-007.webp` ▂
- 00:28.18 `motion/spaces-swipe/f-008.webp` ▃
- 00:28.30 `motion/spaces-swipe/f-009.webp` ▄
- 00:28.43 `motion/spaces-swipe/f-010.webp` ▄
- 00:28.55 `motion/spaces-swipe/f-011.webp` ▃
- 00:28.68 `motion/spaces-swipe/f-012.webp` ▃
- 00:28.80 `motion/spaces-swipe/f-013.webp` ▄
- 00:28.93 `motion/spaces-swipe/f-014.webp` ▇
- 00:29.05 `motion/spaces-swipe/f-015.webp` ▁
- 00:29.18 `motion/spaces-swipe/f-016.webp` ▁
- 00:29.30 `motion/spaces-swipe/f-017.webp` ▁
- 00:29.43 `motion/spaces-swipe/f-018.webp` ▁
- 00:29.55 `motion/spaces-swipe/f-019.webp` ▁
- 00:29.68 `motion/spaces-swipe/f-020.webp` ▁
- 00:29.80 `motion/spaces-swipe/f-021.webp` ▇
- 00:29.93 `motion/spaces-swipe/f-022.webp` ▄
- 00:30.05 `motion/spaces-swipe/f-023.webp` ▄
- 00:30.18 `motion/spaces-swipe/f-024.webp` ▄
- 00:30.30 `motion/spaces-swipe/f-025.webp` ▄
- 00:30.43 `motion/spaces-swipe/f-026.webp` ▄
- 00:30.55 `motion/spaces-swipe/f-027.webp` ▃
- 00:30.68 `motion/spaces-swipe/f-028.webp` ▃
- 00:30.80 `motion/spaces-swipe/f-029.webp` ▃
- 00:30.93 `motion/spaces-swipe/f-030.webp` ▃
- 00:31.05 `motion/spaces-swipe/f-031.webp` ▃
- 00:31.18 `motion/spaces-swipe/f-032.webp` ▃
- 00:31.30 `motion/spaces-swipe/f-033.webp` ▄
- 00:31.43 `motion/spaces-swipe/f-034.webp` ▃
- 00:31.55 `motion/spaces-swipe/f-035.webp` ▁
- 00:31.68 `motion/spaces-swipe/f-036.webp` ▁
- 00:31.80 `motion/spaces-swipe/f-037.webp` ▆
- 00:31.93 `motion/spaces-swipe/f-038.webp` ▁

### 08. The end of the sentence lifts off

00:31.80–00:34.80 (3.00 s) · 19 frames at 6 fps, 0.167 s apart · title card, title over cut, hot-air balloon

'is now in your pocket' arrives on black at 31.86 and stays put through two cuts: at 32.62 to a black-and-white hot-air balloon shot from beneath, its basket swinging, and at 33.62 to a balloon drifting away beyond a tree. The type is the same size and position on black and on footage, and the images under it rise, so the line about being portable ends on things floating away.

Motion: `▆▁▁▁▁▆▄▄▄▄▄▆▂▂▃▃▃▇▂`

- 00:31.80 `motion/pocket-balloon/f-001.webp` ▆
- 00:31.97 `motion/pocket-balloon/f-002.webp` ▁
- 00:32.13 `motion/pocket-balloon/f-003.webp` ▁
- 00:32.30 `motion/pocket-balloon/f-004.webp` ▁
- 00:32.47 `motion/pocket-balloon/f-005.webp` ▁
- 00:32.63 `motion/pocket-balloon/f-006.webp` ▆
- 00:32.80 `motion/pocket-balloon/f-007.webp` ▄
- 00:32.97 `motion/pocket-balloon/f-008.webp` ▄
- 00:33.13 `motion/pocket-balloon/f-009.webp` ▄
- 00:33.30 `motion/pocket-balloon/f-010.webp` ▄
- 00:33.47 `motion/pocket-balloon/f-011.webp` ▄
- 00:33.63 `motion/pocket-balloon/f-012.webp` ▆
- 00:33.80 `motion/pocket-balloon/f-013.webp` ▂
- 00:33.97 `motion/pocket-balloon/f-014.webp` ▂
- 00:34.13 `motion/pocket-balloon/f-015.webp` ▃
- 00:34.30 `motion/pocket-balloon/f-016.webp` ▃
- 00:34.47 `motion/pocket-balloon/f-017.webp` ▃
- 00:34.63 `motion/pocket-balloon/f-018.webp` ▇
- 00:34.80 `motion/pocket-balloon/f-019.webp` ▂

### 09. The app icon flickers through its variants

00:34.70–00:37.40 (2.70 s) · 33 frames at 12 fps, 0.083 s apart · substitution, alternate icons, home screen

A white iPhone home screen with only a search pill and three icons: Spotify, Arc and Messages. From 34.76 Arc's icon changes every one or two frames at 24 fps: the classic red and blue mark, a dark 'Arc' badge, a purple tile, a pastel candy version, a pretzel, a blurred dark blue one, and round again, a dozen or so swaps in 2.6 seconds. The neighbours never move. It shows a small feature (alternate app icons) and also says, without a word, that the app is now on your phone among the apps you already use.

Motion: `▃█▂▄▂▃▂▂▃▂▂▂▄▂▄▂▁▂▂▄▂▄▂▂▂▃▂▂▃▂▄▂█`

- 00:34.70 `motion/icon-flicker/f-001.webp` ▃
- 00:34.78 `motion/icon-flicker/f-002.webp` █
- 00:34.87 `motion/icon-flicker/f-003.webp` ▂
- 00:34.95 `motion/icon-flicker/f-004.webp` ▄
- 00:35.03 `motion/icon-flicker/f-005.webp` ▂
- 00:35.12 `motion/icon-flicker/f-006.webp` ▃
- 00:35.20 `motion/icon-flicker/f-007.webp` ▂
- 00:35.28 `motion/icon-flicker/f-008.webp` ▂
- 00:35.37 `motion/icon-flicker/f-009.webp` ▃
- 00:35.45 `motion/icon-flicker/f-010.webp` ▂
- 00:35.53 `motion/icon-flicker/f-011.webp` ▂
- 00:35.62 `motion/icon-flicker/f-012.webp` ▂
- 00:35.70 `motion/icon-flicker/f-013.webp` ▄
- 00:35.78 `motion/icon-flicker/f-014.webp` ▂
- 00:35.87 `motion/icon-flicker/f-015.webp` ▄
- 00:35.95 `motion/icon-flicker/f-016.webp` ▂
- 00:36.03 `motion/icon-flicker/f-017.webp` ▁
- 00:36.12 `motion/icon-flicker/f-018.webp` ▂
- 00:36.20 `motion/icon-flicker/f-019.webp` ▂
- 00:36.28 `motion/icon-flicker/f-020.webp` ▄
- 00:36.37 `motion/icon-flicker/f-021.webp` ▂
- 00:36.45 `motion/icon-flicker/f-022.webp` ▄
- 00:36.53 `motion/icon-flicker/f-023.webp` ▂
- 00:36.62 `motion/icon-flicker/f-024.webp` ▂
- 00:36.70 `motion/icon-flicker/f-025.webp` ▂
- 00:36.78 `motion/icon-flicker/f-026.webp` ▃
- 00:36.87 `motion/icon-flicker/f-027.webp` ▂
- 00:36.95 `motion/icon-flicker/f-028.webp` ▂
- 00:37.03 `motion/icon-flicker/f-029.webp` ▃
- 00:37.12 `motion/icon-flicker/f-030.webp` ▂
- 00:37.20 `motion/icon-flicker/f-031.webp` ▄
- 00:37.28 `motion/icon-flicker/f-032.webp` ▂
- 00:37.37 `motion/icon-flicker/f-033.webp` █

### 10. The logo drawn over the flying house

00:37.20–00:39.30 (2.10 s) · 18 frames at 8 fps, 0.125 s apart · logo overlay, end card, callback

At 37.33 the film cuts back to Up, now looking up a street between brick buildings at the balloon house rising. A thin white outline of the Arc logo sits over the house, still, while the house climbs past it. It holds for 1.5 seconds before 'Arc for iPhone' appears on black at 38.87. The house that stood for the idea and the mark that stands for the product share one frame.

Motion: `▃▇▂▂▂▂▂▂▂▂▂▂▂▇▁▁▁▁`

- 00:37.20 `motion/logo-over-up/f-001.webp` ▃
- 00:37.33 `motion/logo-over-up/f-002.webp` ▇
- 00:37.45 `motion/logo-over-up/f-003.webp` ▂
- 00:37.58 `motion/logo-over-up/f-004.webp` ▂
- 00:37.70 `motion/logo-over-up/f-005.webp` ▂
- 00:37.83 `motion/logo-over-up/f-006.webp` ▂
- 00:37.95 `motion/logo-over-up/f-007.webp` ▂
- 00:38.08 `motion/logo-over-up/f-008.webp` ▂
- 00:38.20 `motion/logo-over-up/f-009.webp` ▂
- 00:38.33 `motion/logo-over-up/f-010.webp` ▂
- 00:38.45 `motion/logo-over-up/f-011.webp` ▂
- 00:38.58 `motion/logo-over-up/f-012.webp` ▂
- 00:38.70 `motion/logo-over-up/f-013.webp` ▂
- 00:38.83 `motion/logo-over-up/f-014.webp` ▇
- 00:38.95 `motion/logo-over-up/f-015.webp` ▁
- 00:39.08 `motion/logo-over-up/f-016.webp` ▁
- 00:39.20 `motion/logo-over-up/f-017.webp` ▁
- 00:39.33 `motion/logo-over-up/f-018.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Cold open on a found photo-like shot: a white laptop on a cluttered desk with a pizza slice, a water bottle and a plant, lit by a harsh flash. The internet as a place people live in, slightly squalid.
- 00:01.00 `seconds/second-00002.webp` 'Home' dissolves on in a white serif over the laptop, centered. The film's one-word thesis arrives before any product does.
- 00:02.00 `seconds/second-00003.webp` Hard cut to near black: a face lit only by a laptop screen. 'Home' stays exactly where it was across the cut, so the word reads as a title card and the clips change beneath it.
- 00:03.00 `seconds/second-00004.webp` Still dark: the word holds over its second clip. Two very different laptops, one idea.
- 00:04.00 `seconds/second-00005.webp` Someone asleep with their head on the desk, then a man alone at a laptop in an empty office. Three short clips of people stuck to their screens.
- 00:05.00 `seconds/second-00006.webp` A woman in a bright, washed-out room lifts her laptop over her head as if peering out of it. 'What's out there?' is heard, a line lifted from the clip.
- 00:06.00 `seconds/second-00007.webp` A hand reaching across a dark table for something that is not there.
- 00:07.00 `seconds/second-00008.webp` A man in black and white looks around an empty room, and 'What' then 'What if' appear word by word. 'Where's my phone?' is heard and the music jumps to full level.
- 00:08.00 `seconds/second-00009.webp` Hard cut to color: a teal backpack seen from above, hands grabbing it. Packing begins.
- 00:09.00 `seconds/second-00010.webp` A child pulling things out of a lit cupboard, seen from behind.
- 00:10.00 `seconds/second-00011.webp` 'you could bring home with you' sits in the middle of a blurry shot of a drawer being emptied in a hurry. The sentence carries over the cut.
- 00:11.00 `seconds/second-00012.webp` A white sleeve sweeps clothes out of the drawer. The caption is written smaller than 'Home' and sits across the action, like a subtitle.
- 00:12.00 `seconds/second-00013.webp` A snail crossing a path, shallow focus, the clearest picture of the idea: an animal that carries its home on its back. The caption leaves just after the cut to it.
- 00:13.00 `seconds/second-00014.webp` Mr. Bean stuffs a suitcase on his bed, letterboxed in a 4:3 frame on black. Archive formats are kept as found rather than cropped to fill.
- 00:14.00 `seconds/second-00015.webp` A dim hallway, someone rushing past with bags. The montage is now all leaving.
- 00:15.00 `seconds/second-00016.webp` A woman pitches a tent among Joshua trees: a home you can take apart and carry.
- 00:16.00 `seconds/second-00017.webp` A family charges down a staircase with luggage, then a woman in a sunhat stuffs a bag into a convertible.
- 00:17.00 `seconds/second-00018.webp` The Little Miss Sunshine family pushes the yellow van and jumps in as it rolls.
- 00:18.00 `seconds/second-00019.webp` A bus piled high with luggage barrels up a dusty road toward camera. The shots have moved from rooms to roads.
- 00:19.00 `seconds/second-00020.webp` Up: children and a mother watch through a window as the balloon house drifts past, reflected in the glass. The song's vocal starts here.
- 00:20.00 `seconds/second-00021.webp` The house crosses the reflection; the camera holds on the watchers rather than the house.
- 00:21.00 `seconds/second-00022.webp` A father in a striped shirt steps in from the right, looking up. Nobody says anything.
- 00:22.00 `seconds/second-00023.webp` The family turns to each other, amazed. The house has become the image of the whole film: a home that travels.
- 00:23.00 `seconds/second-00024.webp` 'You can' alone on black, in the same serif. The answer to 'What if' is two words long.
- 00:24.00 `seconds/second-00025.webp` A man rides a bicycle down a black-and-white street, pillarboxed. 'You can' is followed by someone simply going.
- 00:25.00 `seconds/second-00026.webp` First product frame: Arc's onboarding screen, a white smiley over a purple gradient with 'Hi there'. The smiley blinks once.
- 00:26.00 `seconds/second-00027.webp` 'Let's go' button under a small Arc logo on the same gradient, the app's own copy used as a line in the film.
- 00:27.00 `seconds/second-00028.webp` Jules and Jim: three friends racing across an iron footbridge, laughing. The film answers the app's 'Let's go' with someone running.
- 00:28.00 `seconds/second-00029.webp` The phone UI floats small in the middle of black: a purple space called 'Browser co' with pinned items, then a swipe to a pink 'Crafting' space.
- 00:29.00 `seconds/second-00030.webp` 'Your home on the internet' on black, between two spaces.
- 00:30.00 `seconds/second-00031.webp` The swipe continues to a yellow 'Home' space with 'Reads for later', 'Home buys', 'Mood board' and 'June trip'. The space is literally named Home.
- 00:31.00 `seconds/second-00032.webp` The Home list scrolls, and 'Murakami's vinyl collection' is dragged into place. Personal, specific item names do the warmth.
- 00:32.00 `seconds/second-00033.webp` 'is now in your pocket' on black, the end of the sentence.
- 00:33.00 `seconds/second-00034.webp` The same caption over a black-and-white hot-air balloon from below, the basket swinging under it.
- 00:34.00 `seconds/second-00035.webp` A balloon drifting away in a grey sky behind a tree, the caption still on.
- 00:35.00 `seconds/second-00036.webp` An iPhone home screen, Arc's icon between Spotify and Messages, flicking through its alternate icons.
- 00:36.00 `seconds/second-00037.webp` The icon keeps changing: candy, pretzel, dark blue, classic. The swap is the app's alternate-icon feature, shown as a flicker.
- 00:37.00 `seconds/second-00038.webp` Back to Up: the balloon house rising between brick buildings, with a thin white outline of the Arc logo drawn over it.
- 00:38.00 `seconds/second-00039.webp` The logo holds over the house as it climbs. The film's two homes, the Pixar house and the browser, share one frame.
- 00:39.00 `seconds/second-00040.webp` 'Arc for iPhone' on black in the same serif. The product's name is the last thing written and the only time it appears.
- 00:40.00 `seconds/second-00041.webp` The title holds to the end with the song still playing.
