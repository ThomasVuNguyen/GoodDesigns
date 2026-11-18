# Motion notes: Some Ideas Are Too Loud to Ignore

Lovable · 01:00.12 · https://www.youtube.com/watch?v=ADXWl44apao

This is live action, and most of its movement is cutting and performance: inserts of hands and feet cut to a tick, a book cover that changes between shots, a singer who bursts into frame, a door that swings open on a band. The motion design is small and kept to the brand's moments: a heart that grows into the wordmark at the start and end, a prompt typed on Lovable's glowing gradient, and the 'earworms' logo, whose letters wriggle up into place like worms. The sequences below are chosen for how picture and sound move together.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▅▆▆▅▄▄▃▄▄▄▄▄▄▄▄▄▅▆▄▄▄▃▄▃▃▄▄▄▆▆▄▄▅▅▅▄▆▆▇▆▅▅▄▃▃▂▄▂▅▄▂▃▃▃▂▃▃▄▁▁
01:00  ▁
```

## Sequences

### 01. A heart appears beside her and becomes the wordmark

00:00.00–00:01.90 (1.90 s) · 24 frames at 12 fps, 0.083 s apart · logo reveal, tracking shot, screen-fixed overlay, bookend

The camera tracks back as she walks along the flats. At about 0.17 a small gradient heart pops up to her right and pulses for half a second. At 0.75 it becomes the Lovable mark with the wordmark beside it, and it stays fixed on screen while she walks past beneath it. A cut at 1.88 to the passer-by with earbuds takes it away. The same heart comes back at 58 to end the film.

Motion: `▁▅▅▅▅▅▅▅▅▅▅▅▅▆▆▆▆▆▅▅▆▆▆█`

- 00:00.00 `motion/heart-on-the-walk/f-001.webp` ▁
- 00:00.08 `motion/heart-on-the-walk/f-002.webp` ▅
- 00:00.17 `motion/heart-on-the-walk/f-003.webp` ▅
- 00:00.25 `motion/heart-on-the-walk/f-004.webp` ▅
- 00:00.33 `motion/heart-on-the-walk/f-005.webp` ▅
- 00:00.42 `motion/heart-on-the-walk/f-006.webp` ▅
- 00:00.50 `motion/heart-on-the-walk/f-007.webp` ▅
- 00:00.58 `motion/heart-on-the-walk/f-008.webp` ▅
- 00:00.67 `motion/heart-on-the-walk/f-009.webp` ▅
- 00:00.75 `motion/heart-on-the-walk/f-010.webp` ▅
- 00:00.83 `motion/heart-on-the-walk/f-011.webp` ▅
- 00:00.92 `motion/heart-on-the-walk/f-012.webp` ▅
- 00:01.00 `motion/heart-on-the-walk/f-013.webp` ▅
- 00:01.08 `motion/heart-on-the-walk/f-014.webp` ▆
- 00:01.17 `motion/heart-on-the-walk/f-015.webp` ▆
- 00:01.25 `motion/heart-on-the-walk/f-016.webp` ▆
- 00:01.33 `motion/heart-on-the-walk/f-017.webp` ▆
- 00:01.42 `motion/heart-on-the-walk/f-018.webp` ▆
- 00:01.50 `motion/heart-on-the-walk/f-019.webp` ▅
- 00:01.58 `motion/heart-on-the-walk/f-020.webp` ▅
- 00:01.67 `motion/heart-on-the-walk/f-021.webp` ▆
- 00:01.75 `motion/heart-on-the-walk/f-022.webp` ▆
- 00:01.83 `motion/heart-on-the-walk/f-023.webp` ▆
- 00:01.92 `motion/heart-on-the-walk/f-024.webp` █

### 02. The song strips to a tick and the shop seems to play it

00:12.20–00:18.60 (6.40 s) · 27 frames at 4 fps, 0.250 s apart · inserts, rhythm montage, sound drop, whistle

At 12.35 the film cuts from her face to a hand working a small blue object, and within a few frames the music falls away to a fast, even tick. The inserts that follow each move in time: a boot taps (12.93), the hand again, fingers drum a notebook (14.0), she glances sideways (14.5), the fingers again, a bearded man purses his lips as a whistled note enters (16.1 to 17.3), pages riffle, the flip clock reads 9:25 (17.52). Each insert is under a second and shot close in shallow focus. At 17.77 she is in close-up, eyes shut; an off-screen 'Excuse me' opens them, and at 18.48 a book slides into frame over a hush.

Motion: `▅▂▂▅▂▅▂▆▅▆▁▁▁▆▅▆▄▄▆▃▆▆▆▂▂▆▄`

- 00:12.20 `motion/the-shop-keeps-time/f-001.webp` ▅
- 00:12.45 `motion/the-shop-keeps-time/f-002.webp` ▂
- 00:12.70 `motion/the-shop-keeps-time/f-003.webp` ▂
- 00:12.95 `motion/the-shop-keeps-time/f-004.webp` ▅
- 00:13.20 `motion/the-shop-keeps-time/f-005.webp` ▂
- 00:13.45 `motion/the-shop-keeps-time/f-006.webp` ▅
- 00:13.70 `motion/the-shop-keeps-time/f-007.webp` ▂
- 00:13.95 `motion/the-shop-keeps-time/f-008.webp` ▆
- 00:14.20 `motion/the-shop-keeps-time/f-009.webp` ▅
- 00:14.45 `motion/the-shop-keeps-time/f-010.webp` ▆
- 00:14.70 `motion/the-shop-keeps-time/f-011.webp` ▁
- 00:14.95 `motion/the-shop-keeps-time/f-012.webp` ▁
- 00:15.20 `motion/the-shop-keeps-time/f-013.webp` ▁
- 00:15.45 `motion/the-shop-keeps-time/f-014.webp` ▆
- 00:15.70 `motion/the-shop-keeps-time/f-015.webp` ▅
- 00:15.95 `motion/the-shop-keeps-time/f-016.webp` ▆
- 00:16.20 `motion/the-shop-keeps-time/f-017.webp` ▄
- 00:16.45 `motion/the-shop-keeps-time/f-018.webp` ▄
- 00:16.70 `motion/the-shop-keeps-time/f-019.webp` ▆
- 00:16.95 `motion/the-shop-keeps-time/f-020.webp` ▃
- 00:17.20 `motion/the-shop-keeps-time/f-021.webp` ▆
- 00:17.45 `motion/the-shop-keeps-time/f-022.webp` ▆
- 00:17.70 `motion/the-shop-keeps-time/f-023.webp` ▆
- 00:17.95 `motion/the-shop-keeps-time/f-024.webp` ▂
- 00:18.20 `motion/the-shop-keeps-time/f-025.webp` ▂
- 00:18.45 `motion/the-shop-keeps-time/f-026.webp` ▆
- 00:18.70 `motion/the-shop-keeps-time/f-027.webp` ▄

### 03. The cover changes, three times

00:18.40–00:28.40 (10.00 s) · 31 frames at 3 fps, 0.333 s apart · loop, insert swap, escalation, top shot

The same short run of shots plays three times: the cover in a top shot, a tilted shelf, her face. The cover flips between versions from one pass to the next: 'Bobby York' with cartoon worms (18.48), 'Boko Yout' with the band's faces (20.39), 'Bobby York' (24.02), 'Boko Yout' (26.44). Her reaction grows with each pass: unease at 22.15, a wince at 25.86, a startled look up at 28.11. The customer's smile (23.02) is the only shot that never changes. The book cuts are locked-off top shots, so the swap reads instantly.

Motion: `▆▄▃▅▂▁▅▂▂▅▃▅▁▅▁▁▄▁▁▁▄▁▅▁▅▂▂▅▄▆▅`

- 00:18.40 `motion/cover-loop/f-001.webp` ▆
- 00:18.73 `motion/cover-loop/f-002.webp` ▄
- 00:19.07 `motion/cover-loop/f-003.webp` ▃
- 00:19.40 `motion/cover-loop/f-004.webp` ▅
- 00:19.73 `motion/cover-loop/f-005.webp` ▂
- 00:20.07 `motion/cover-loop/f-006.webp` ▁
- 00:20.40 `motion/cover-loop/f-007.webp` ▅
- 00:20.73 `motion/cover-loop/f-008.webp` ▂
- 00:21.07 `motion/cover-loop/f-009.webp` ▂
- 00:21.40 `motion/cover-loop/f-010.webp` ▅
- 00:21.73 `motion/cover-loop/f-011.webp` ▃
- 00:22.07 `motion/cover-loop/f-012.webp` ▅
- 00:22.40 `motion/cover-loop/f-013.webp` ▁
- 00:22.73 `motion/cover-loop/f-014.webp` ▅
- 00:23.07 `motion/cover-loop/f-015.webp` ▁
- 00:23.40 `motion/cover-loop/f-016.webp` ▁
- 00:23.73 `motion/cover-loop/f-017.webp` ▄
- 00:24.07 `motion/cover-loop/f-018.webp` ▁
- 00:24.40 `motion/cover-loop/f-019.webp` ▁
- 00:24.73 `motion/cover-loop/f-020.webp` ▁
- 00:25.07 `motion/cover-loop/f-021.webp` ▄
- 00:25.40 `motion/cover-loop/f-022.webp` ▁
- 00:25.73 `motion/cover-loop/f-023.webp` ▅
- 00:26.07 `motion/cover-loop/f-024.webp` ▁
- 00:26.40 `motion/cover-loop/f-025.webp` ▅
- 00:26.73 `motion/cover-loop/f-026.webp` ▂
- 00:27.07 `motion/cover-loop/f-027.webp` ▂
- 00:27.40 `motion/cover-loop/f-028.webp` ▅
- 00:27.73 `motion/cover-loop/f-029.webp` ▄
- 00:28.07 `motion/cover-loop/f-030.webp` ▆
- 00:28.40 `motion/cover-loop/f-031.webp` ▅

### 04. The singer rises into the aisle

00:28.60–00:30.30 (1.70 s) · 18 frames at 10 fps, 0.100 s apart · over the shoulder, entrance, performance, long take

At 28.78 the film cuts behind her shoulder, looking down an aisle of shelves. At about 29.1 the singer rises into the left of frame with an arm flung over his head, turns, and by 29.5 is facing her with a microphone, other band members and a crowd behind him. The camera eases past her shoulder to centre him. After a run of half-second cuts the shot holds for over four seconds, so the band's arrival gets room.

Motion: `▅▄█▆▆▆▆▆▆▆▆▆▆▅▅▄▄▄`

- 00:28.60 `motion/singer-bursts-in/f-001.webp` ▅
- 00:28.70 `motion/singer-bursts-in/f-002.webp` ▄
- 00:28.80 `motion/singer-bursts-in/f-003.webp` █
- 00:28.90 `motion/singer-bursts-in/f-004.webp` ▆
- 00:29.00 `motion/singer-bursts-in/f-005.webp` ▆
- 00:29.10 `motion/singer-bursts-in/f-006.webp` ▆
- 00:29.20 `motion/singer-bursts-in/f-007.webp` ▆
- 00:29.30 `motion/singer-bursts-in/f-008.webp` ▆
- 00:29.40 `motion/singer-bursts-in/f-009.webp` ▆
- 00:29.50 `motion/singer-bursts-in/f-010.webp` ▆
- 00:29.60 `motion/singer-bursts-in/f-011.webp` ▆
- 00:29.70 `motion/singer-bursts-in/f-012.webp` ▆
- 00:29.80 `motion/singer-bursts-in/f-013.webp` ▆
- 00:29.90 `motion/singer-bursts-in/f-014.webp` ▅
- 00:30.00 `motion/singer-bursts-in/f-015.webp` ▅
- 00:30.10 `motion/singer-bursts-in/f-016.webp` ▄
- 00:30.20 `motion/singer-bursts-in/f-017.webp` ▄
- 00:30.30 `motion/singer-bursts-in/f-018.webp` ▄

### 05. Door 925 opens, the sound drops, the band crashes in

00:41.30–00:45.20 (3.90 s) · 24 frames at 6 fps, 0.167 s apart · reveal, sound drop, hard cut, sync hit

From behind her shoulder a teal door marked '925' swings open (41.4 to 42.3) on the band packed into a green kitchen, all looking at her. As the gap widens the song collapses to a low rumble. She steps in at 42.79, and the band leans toward her in a held shot. At 44.75 the film cuts to a wide of the kitchen with the band playing around her table, and the full mix slams back in within a frame or two.

Motion: `▆▄▄▄▄▄▄▄▄▅▂▂▁▁▅▁▂▂▂▂▅▂▂▂`

- 00:41.30 `motion/door-925/f-001.webp` ▆
- 00:41.47 `motion/door-925/f-002.webp` ▄
- 00:41.63 `motion/door-925/f-003.webp` ▄
- 00:41.80 `motion/door-925/f-004.webp` ▄
- 00:41.97 `motion/door-925/f-005.webp` ▄
- 00:42.13 `motion/door-925/f-006.webp` ▄
- 00:42.30 `motion/door-925/f-007.webp` ▄
- 00:42.47 `motion/door-925/f-008.webp` ▄
- 00:42.63 `motion/door-925/f-009.webp` ▄
- 00:42.80 `motion/door-925/f-010.webp` ▅
- 00:42.97 `motion/door-925/f-011.webp` ▂
- 00:43.13 `motion/door-925/f-012.webp` ▂
- 00:43.30 `motion/door-925/f-013.webp` ▁
- 00:43.47 `motion/door-925/f-014.webp` ▁
- 00:43.63 `motion/door-925/f-015.webp` ▅
- 00:43.80 `motion/door-925/f-016.webp` ▁
- 00:43.97 `motion/door-925/f-017.webp` ▂
- 00:44.13 `motion/door-925/f-018.webp` ▂
- 00:44.30 `motion/door-925/f-019.webp` ▂
- 00:44.47 `motion/door-925/f-020.webp` ▂
- 00:44.63 `motion/door-925/f-021.webp` ▅
- 00:44.80 `motion/door-925/f-022.webp` ▂
- 00:44.97 `motion/door-925/f-023.webp` ▂
- 00:45.13 `motion/door-925/f-024.webp` ▂

### 06. The prompt is typed on Lovable's glow

00:46.40–00:49.20 (2.80 s) · 23 frames at 8 fps, 0.125 s apart · type-on, push in, pressed state, brand gradient

At 46.51 a black prompt box floats on a glowing pink, blue and orange field, already reading 'Build an app for the' and typing on a letter or two per frame. At 47.97 it cuts much closer: the words 'songs in my head' are now headline size and slide left so the cursor stays in frame. At about 48.8 the send arrow turns pink as it is pressed, and at 49.09 the film cuts to an extreme close-up of her eye.

Motion: `▂▇▂▂▂▂▂▂▂▂▂▂▇▄▄▅▅▅▄▂▂▇▂`

- 00:46.40 `motion/type-the-prompt/f-001.webp` ▂
- 00:46.52 `motion/type-the-prompt/f-002.webp` ▇
- 00:46.65 `motion/type-the-prompt/f-003.webp` ▂
- 00:46.77 `motion/type-the-prompt/f-004.webp` ▂
- 00:46.90 `motion/type-the-prompt/f-005.webp` ▂
- 00:47.02 `motion/type-the-prompt/f-006.webp` ▂
- 00:47.15 `motion/type-the-prompt/f-007.webp` ▂
- 00:47.27 `motion/type-the-prompt/f-008.webp` ▂
- 00:47.40 `motion/type-the-prompt/f-009.webp` ▂
- 00:47.52 `motion/type-the-prompt/f-010.webp` ▂
- 00:47.65 `motion/type-the-prompt/f-011.webp` ▂
- 00:47.77 `motion/type-the-prompt/f-012.webp` ▂
- 00:47.90 `motion/type-the-prompt/f-013.webp` ▇
- 00:48.02 `motion/type-the-prompt/f-014.webp` ▄
- 00:48.15 `motion/type-the-prompt/f-015.webp` ▄
- 00:48.27 `motion/type-the-prompt/f-016.webp` ▅
- 00:48.40 `motion/type-the-prompt/f-017.webp` ▅
- 00:48.52 `motion/type-the-prompt/f-018.webp` ▅
- 00:48.65 `motion/type-the-prompt/f-019.webp` ▄
- 00:48.77 `motion/type-the-prompt/f-020.webp` ▂
- 00:48.90 `motion/type-the-prompt/f-021.webp` ▂
- 00:49.02 `motion/type-the-prompt/f-022.webp` ▇
- 00:49.15 `motion/type-the-prompt/f-023.webp` ▂

### 07. The earworms logo wriggles into place

00:49.80–00:51.80 (2.00 s) · 25 frames at 12 fps, 0.083 s apart · letter by letter, product reveal, build, screen in scene

The laptop sits in the dark kitchen with an empty dark green preview. From about 50.35 the letters of 'earworms' rise one at a time from below, each bending into place like a worm before it settles, the 'w' a loop. At about 50.7 a card of the band on stage slides up from the bottom right, then grows to the centre with more cards behind it, and by 51.6 the page is complete with 'Now playing Boko Yout'. It is shot on the laptop in the room, not as a screen recording.

Motion: `▁▆▁▁▁▁▁▁▁▁▁▂▂▃▃▃▃▃▃▂▂▂▂▂▂`

Onion skin: `motion/earworms-builds/trail.webp`

- 00:49.80 `motion/earworms-builds/f-001.webp` ▁
- 00:49.88 `motion/earworms-builds/f-002.webp` ▆
- 00:49.97 `motion/earworms-builds/f-003.webp` ▁
- 00:50.05 `motion/earworms-builds/f-004.webp` ▁
- 00:50.13 `motion/earworms-builds/f-005.webp` ▁
- 00:50.22 `motion/earworms-builds/f-006.webp` ▁
- 00:50.30 `motion/earworms-builds/f-007.webp` ▁
- 00:50.38 `motion/earworms-builds/f-008.webp` ▁
- 00:50.47 `motion/earworms-builds/f-009.webp` ▁
- 00:50.55 `motion/earworms-builds/f-010.webp` ▁
- 00:50.63 `motion/earworms-builds/f-011.webp` ▁
- 00:50.72 `motion/earworms-builds/f-012.webp` ▂
- 00:50.80 `motion/earworms-builds/f-013.webp` ▂
- 00:50.88 `motion/earworms-builds/f-014.webp` ▃
- 00:50.97 `motion/earworms-builds/f-015.webp` ▃
- 00:51.05 `motion/earworms-builds/f-016.webp` ▃
- 00:51.13 `motion/earworms-builds/f-017.webp` ▃
- 00:51.22 `motion/earworms-builds/f-018.webp` ▃
- 00:51.30 `motion/earworms-builds/f-019.webp` ▃
- 00:51.38 `motion/earworms-builds/f-020.webp` ▂
- 00:51.47 `motion/earworms-builds/f-021.webp` ▂
- 00:51.55 `motion/earworms-builds/f-022.webp` ▂
- 00:51.63 `motion/earworms-builds/f-023.webp` ▂
- 00:51.72 `motion/earworms-builds/f-024.webp` ▂
- 00:51.80 `motion/earworms-builds/f-025.webp` ▂

### 08. The heart turns into Lovable

00:57.70–00:59.30 (1.60 s) · 20 frames at 12 fps, 0.083 s apart · end card, fade up, icon morph, re-centre

At 57.77 the film cuts to a pink-to-violet gradient. 'For every idea,' fades up at about 57.9, then 'there's' and a pale heart at 58.0; the heart turns solid white by 58.25. At about 58.66 the heart becomes the Lovable mark and the wordmark wipes on beside it, while the whole line slides left to stay centred. The music, back at full a quarter of a second before the cut, fades over the last half second.

Motion: `▂█▁▁▁▁▁▁▁▁▁▂▂▁▁▁▁▁▁▁`

Onion skin: `motion/end-card/trail.webp`

- 00:57.70 `motion/end-card/f-001.webp` ▂
- 00:57.78 `motion/end-card/f-002.webp` █
- 00:57.87 `motion/end-card/f-003.webp` ▁
- 00:57.95 `motion/end-card/f-004.webp` ▁
- 00:58.03 `motion/end-card/f-005.webp` ▁
- 00:58.12 `motion/end-card/f-006.webp` ▁
- 00:58.20 `motion/end-card/f-007.webp` ▁
- 00:58.28 `motion/end-card/f-008.webp` ▁
- 00:58.37 `motion/end-card/f-009.webp` ▁
- 00:58.45 `motion/end-card/f-010.webp` ▁
- 00:58.53 `motion/end-card/f-011.webp` ▁
- 00:58.62 `motion/end-card/f-012.webp` ▂
- 00:58.70 `motion/end-card/f-013.webp` ▂
- 00:58.78 `motion/end-card/f-014.webp` ▁
- 00:58.87 `motion/end-card/f-015.webp` ▁
- 00:58.95 `motion/end-card/f-016.webp` ▁
- 00:59.03 `motion/end-card/f-017.webp` ▁
- 00:59.12 `motion/end-card/f-018.webp` ▁
- 00:59.20 `motion/end-card/f-019.webp` ▁
- 00:59.28 `motion/end-card/f-020.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Cold open on a brick walkway of low London flats on an overcast day. She walks toward a backward-tracking camera in a patchwork brown jacket, the one costume that carries through every location. A small gradient heart has just appeared beside her.
- 00:01.00 `seconds/second-00002.webp` The heart has become the Lovable mark and wordmark, held at a fixed spot on screen while she walks past beneath it. The brand is named in the first second and then left alone until the end.
- 00:02.00 `seconds/second-00003.webp` A passer-by in profile with wired earbuds, eyes half shut: the first person shown listening. Shallow focus, the brick a soft wash behind.
- 00:03.00 `seconds/second-00004.webp` She glances back over her shoulder at someone passing. The camera stays close and a little low; the street is soft grey behind her.
- 00:04.00 `seconds/second-00005.webp` The same close-up, her eyes dropping shut for a moment. The tune has got in. Most of the film's acting is in her face, and it starts small.
- 00:05.00 `seconds/second-00006.webp` Workers in hi-vis paste a wall with giant pink posters reading '9-2-5', with smaller '9-2-5's stacked down the sides like a chorus. A site radio sits at their feet.
- 00:06.00 `seconds/second-00007.webp` A low close-up of that battered yellow radio on the wet pavement: an on-screen source for the music she cannot get away from.
- 00:07.00 `seconds/second-00008.webp` She walks past the posters, frowning, as a worker smooths one flat. The '92' fills the background in the same hot pink as Lovable's gradient.
- 00:09.00 `seconds/second-00010.webp` A brass shop bell swings over a door in close-up, and the soundtrack rings it. The cut takes her indoors, and the music behind it goes muffled.
- 00:10.00 `seconds/second-00011.webp` A wide of the bookshop: a long table, desk lamps, shelves of children's books, a travel agent's sign across the road. Warm amber after the grey street.
- 00:12.00 `seconds/second-00013.webp` A tight insert of a hand working a small blue object, close to the lens in shallow focus. From here the shop is shown in inserts that each seem to keep time.
- 00:14.00 `seconds/second-00015.webp` Fingers drumming on the edge of a notebook. Hands, feet and objects are shot as if they were the instruments while the song strips down to a tick.
- 00:16.00 `seconds/second-00017.webp` An older man with a grey beard fiddles with something at his collar; a moment later his lips purse as a whistled note joins the soundtrack.
- 00:17.00 `seconds/second-00018.webp` Pages riffled under a hand. In the next shot a flip clock on the desk reads 9:25, the number from the posters again.
- 00:18.00 `seconds/second-00019.webp` A book slides across the wooden counter in a smear of motion, just after an off-screen 'Excuse me' has pulled her out of her head.
- 00:19.00 `seconds/second-00020.webp` Top shot of the counter: 'My Little Ear Worm by Bobby York', cartoon pink worms with a drum kit. The real book, as the customer sees it.
- 00:20.00 `seconds/second-00021.webp` The same cover a second later, now 'by Boko Yout', with the band's faces on the worms and the singer at a microphone. The only thing that has changed is what she sees.
- 00:21.00 `seconds/second-00022.webp` A low, tilted angle up a shelf of dark spines: a breath between covers that returns in each pass of the loop.
- 00:22.00 `seconds/second-00023.webp` Her close-up against the bright shop window, looking up, uneasy. This face shot gets a stronger reaction each time the loop comes round.
- 00:23.00 `seconds/second-00024.webp` The customer, smiling and waiting, in warm shallow focus. The one person in the shop who seems to hear nothing.
- 00:24.00 `seconds/second-00025.webp` Back to 'Bobby York' and the plain worms. Cutting between the two covers is the joke, and the film plays it three times.
- 00:26.00 `seconds/second-00027.webp` 'Boko Yout' again, faces back on the worms, as the music starts to open up.
- 00:28.00 `seconds/second-00029.webp` Her head snaps up, eyes wide. The sung vocal has just come in: she hears the singer before we see him.
- 00:29.00 `seconds/second-00030.webp` Over her shoulder, the singer rises into the aisle with an arm flung over his head and lands with a microphone. The shelves frame him like a stage.
- 00:30.00 `seconds/second-00031.webp` He sings between the shelves with band members and a crowd behind him. At about four seconds it is the longest shot so far.
- 00:33.00 `seconds/second-00034.webp` She backs away down the aisle, the shelves running deep behind her. Her first answer to the idea is to escape it.
- 00:35.00 `seconds/second-00036.webp` A high wide of a terraced street lined with parked cars, and her walking alone down the middle. The vocal drops out as she leaves the band behind.
- 00:36.00 `seconds/second-00037.webp` A man in a denim jacket passes close to the lens and wipes across her. Foreground passers-by keep the street alive without anyone performing.
- 00:37.00 `seconds/second-00038.webp` A hand to her ear and neck as she walks, the gesture of someone trying to shake a tune.
- 00:38.00 `seconds/second-00039.webp` Her profile in the foreground, turning toward a black cab coming up the street. The cab says London without a landmark.
- 00:39.00 `seconds/second-00040.webp` The singer leans out of the cab's rear window, mouth open, an arm up, as it passes. The earworm is now chasing her across the city.
- 00:40.00 `seconds/second-00041.webp` She smiles in spite of herself. The turn of the film, from resisting the tune to giving in to it.
- 00:41.00 `seconds/second-00042.webp` A door marked '925' in old raised numerals, seen past her shoulder in teal light. It swings open on the band crowded inside.
- 00:42.00 `seconds/second-00043.webp` Through the gap: the singer and band packed into a green kitchen, all looking straight at her. The sound has dropped to a low rumble.
- 00:43.00 `seconds/second-00044.webp` She steps in, the singer's orange collar soft in the foreground. A held breath before the drop.
- 00:45.00 `seconds/second-00046.webp` Wide on the kitchen: the band plays around a small table where she sits at a laptop, with '925' in fridge magnets top left. The whole band crashed in on this cut.
- 00:47.00 `seconds/second-00048.webp` A black prompt box floats on Lovable's pink, blue and orange glow, typing 'Build an app for the songs i…'. The film's premise, in her words.
- 00:48.00 `seconds/second-00049.webp` Cut closer as she finishes 'songs in my head'. The text runs off the left edge to keep the cursor in frame, and the send arrow is about to be pressed.
- 00:49.00 `seconds/second-00050.webp` An extreme close-up of her eye, closing for a beat while the app builds. A human pause where a loading screen would go.
- 00:50.00 `seconds/second-00051.webp` The laptop in the dim kitchen: Lovable's editor with the chat on the left and a dark green preview where an 'e' is wriggling into place.
- 00:51.00 `seconds/second-00052.webp` 'earworms' finished in lime green over a carousel of the band on stage, with 'Now playing Boko Yout' and play controls. The description links to this site.
- 00:52.00 `seconds/second-00053.webp` The singer holds the mic to her ear while the guitarist grins; she looks up laughing. The tune has turned into company.
- 00:53.00 `seconds/second-00054.webp` 'Some ideas are too loud to ignore.' in small white sans over the kitchen, now empty of the band, as she dances alone. The sound thins on this cut.
- 00:55.00 `seconds/second-00056.webp` Close on the laptop playing the earworms site. The band now lives inside the thing she built.
- 00:57.00 `seconds/second-00058.webp` Wide on the empty kitchen, her arms up, the laptop glowing on the table.
- 00:58.00 `seconds/second-00059.webp` End card on a pink-to-violet gradient: 'For every idea, there's' and a white heart that has just faded up.
- 00:59.00 `seconds/second-00060.webp` The heart has turned into the Lovable mark and wordmark, closing the bracket the first-second heart opened.
