# Motion notes: Arc on Windows. Download now.

The Browser Company · 00:36.62 · https://www.youtube.com/watch?v=LJQsAOon6og

The film cuts fast (a median shot of 0.73 seconds, 35 detected cuts in 37 seconds), and almost nothing moves inside a shot except a cursor. The motion is in the editing: close-ups of old interface parts swapped on cuts, text that arrives a word at a time, and product clips that each show one gesture. The retro half is shot as extreme, soft close-ups of pixels and the product half as tight crops of a crisp window, so the change from past to present can be felt in the texture before the voice stops. The sequences below follow the waiting gags, the march of Start buttons, the reveal, five product gestures and the ending.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▆▇▆▆▆▆▆▄▄▆▆▆▆▆▅▅▆▄▅▆▅▅▆▆▅▆▆▅▆▆▆▅▂▅▃▅▁
```

## Sequences

### 01. Fade up into 1998, then wait for a picture

00:00.00–00:03.60 (3.60 s) · 37 frames at 10 fps, 0.100 s apart · fade from color, camcorder, pixel close-up, progressive load

The first frame is pure electric blue, and the film fades from it into camcorder footage of a beige PC by 0.3. At 1.0 it cuts to a blown-up title bar, where a pixel cursor clicks the minimize button at 1.3 (the button darkens for a frame). At 1.46 IE's Go menu appears, 'Start Page' highlights at 1.7 and 'Search the Internet' at 1.8. An hourglass cursor appears at 2.2 and fades, a search box fills with 'flowers' one letter about every tenth of a second from 2.4 to 2.8, and from 2.88 Van Gogh's Sunflowers comes in a band at a time from the top, completing at about 3.4. Every step is a wait of a few frames, so the joke builds through the cutting.

Motion: `▁▆▇▆▅▅▅▅▅▅█▅▅▇█▅▅▇▇▄▄▄▇▅▆▅▅▅▄█▅▅▅▅▃▃█`

- 00:00.00 `motion/dial-up/f-001.webp` ▁
- 00:00.10 `motion/dial-up/f-002.webp` ▆
- 00:00.20 `motion/dial-up/f-003.webp` ▇
- 00:00.30 `motion/dial-up/f-004.webp` ▆
- 00:00.40 `motion/dial-up/f-005.webp` ▅
- 00:00.50 `motion/dial-up/f-006.webp` ▅
- 00:00.60 `motion/dial-up/f-007.webp` ▅
- 00:00.70 `motion/dial-up/f-008.webp` ▅
- 00:00.80 `motion/dial-up/f-009.webp` ▅
- 00:00.90 `motion/dial-up/f-010.webp` ▅
- 00:01.00 `motion/dial-up/f-011.webp` █
- 00:01.10 `motion/dial-up/f-012.webp` ▅
- 00:01.20 `motion/dial-up/f-013.webp` ▅
- 00:01.30 `motion/dial-up/f-014.webp` ▇
- 00:01.40 `motion/dial-up/f-015.webp` █
- 00:01.50 `motion/dial-up/f-016.webp` ▅
- 00:01.60 `motion/dial-up/f-017.webp` ▅
- 00:01.70 `motion/dial-up/f-018.webp` ▇
- 00:01.80 `motion/dial-up/f-019.webp` ▇
- 00:01.90 `motion/dial-up/f-020.webp` ▄
- 00:02.00 `motion/dial-up/f-021.webp` ▄
- 00:02.10 `motion/dial-up/f-022.webp` ▄
- 00:02.20 `motion/dial-up/f-023.webp` ▇
- 00:02.30 `motion/dial-up/f-024.webp` ▅
- 00:02.40 `motion/dial-up/f-025.webp` ▆
- 00:02.50 `motion/dial-up/f-026.webp` ▅
- 00:02.60 `motion/dial-up/f-027.webp` ▅
- 00:02.70 `motion/dial-up/f-028.webp` ▅
- 00:02.80 `motion/dial-up/f-029.webp` ▄
- 00:02.90 `motion/dial-up/f-030.webp` █
- 00:03.00 `motion/dial-up/f-031.webp` ▅
- 00:03.10 `motion/dial-up/f-032.webp` ▅
- 00:03.20 `motion/dial-up/f-033.webp` ▅
- 00:03.30 `motion/dial-up/f-034.webp` ▅
- 00:03.40 `motion/dial-up/f-035.webp` ▃
- 00:03.50 `motion/dial-up/f-036.webp` ▃
- 00:03.60 `motion/dial-up/f-037.webp` █

### 02. 'You've been waiting.' word by word, then the hourglass

00:03.55–00:05.50 (1.95 s) · 40 frames at 20 fps, 0.050 s apart · word by word, punch-in, rotate, hold

On the teal Windows 95 desktop 'You've' appears at 3.6, 'been' at 3.95, and on 'waiting.' at 4.4 the frame jumps larger, pushing the desktop icons out of shot. The words come at a talking pace, slower than the cuts around them. At 4.84 a hard cut to white lands on the pixel hourglass already tipped on its side; it flips through a half turn in steps (4.9 flat, 5.15 tilted, 5.3 nearly upright) and settles upright at 5.4, the same stuttering spin as the real cursor.

Motion: `▃█▁▁▁▁▁▁▅▁▁▁▁▁▁▁▁▆▁▁▁▁▁▁▁▁█▁▆▁▁▁▁▆▁▆▁▆▁█`

- 00:03.55 `motion/waiting/f-001.webp` ▃
- 00:03.60 `motion/waiting/f-002.webp` █
- 00:03.65 `motion/waiting/f-003.webp` ▁
- 00:03.70 `motion/waiting/f-004.webp` ▁
- 00:03.75 `motion/waiting/f-005.webp` ▁
- 00:03.80 `motion/waiting/f-006.webp` ▁
- 00:03.85 `motion/waiting/f-007.webp` ▁
- 00:03.90 `motion/waiting/f-008.webp` ▁
- 00:03.95 `motion/waiting/f-009.webp` ▅
- 00:04.00 `motion/waiting/f-010.webp` ▁
- 00:04.05 `motion/waiting/f-011.webp` ▁
- 00:04.10 `motion/waiting/f-012.webp` ▁
- 00:04.15 `motion/waiting/f-013.webp` ▁
- 00:04.20 `motion/waiting/f-014.webp` ▁
- 00:04.25 `motion/waiting/f-015.webp` ▁
- 00:04.30 `motion/waiting/f-016.webp` ▁
- 00:04.35 `motion/waiting/f-017.webp` ▁
- 00:04.40 `motion/waiting/f-018.webp` ▆
- 00:04.45 `motion/waiting/f-019.webp` ▁
- 00:04.50 `motion/waiting/f-020.webp` ▁
- 00:04.55 `motion/waiting/f-021.webp` ▁
- 00:04.60 `motion/waiting/f-022.webp` ▁
- 00:04.65 `motion/waiting/f-023.webp` ▁
- 00:04.70 `motion/waiting/f-024.webp` ▁
- 00:04.75 `motion/waiting/f-025.webp` ▁
- 00:04.80 `motion/waiting/f-026.webp` ▁
- 00:04.85 `motion/waiting/f-027.webp` █
- 00:04.90 `motion/waiting/f-028.webp` ▁
- 00:04.95 `motion/waiting/f-029.webp` ▆
- 00:05.00 `motion/waiting/f-030.webp` ▁
- 00:05.05 `motion/waiting/f-031.webp` ▁
- 00:05.10 `motion/waiting/f-032.webp` ▁
- 00:05.15 `motion/waiting/f-033.webp` ▁
- 00:05.20 `motion/waiting/f-034.webp` ▆
- 00:05.25 `motion/waiting/f-035.webp` ▁
- 00:05.30 `motion/waiting/f-036.webp` ▆
- 00:05.35 `motion/waiting/f-037.webp` ▁
- 00:05.40 `motion/waiting/f-038.webp` ▆
- 00:05.45 `motion/waiting/f-039.webp` ▁
- 00:05.50 `motion/waiting/f-040.webp` █

### 03. A counter too close to read, then a number too big to ignore

00:05.50–00:09.45 (3.95 s) · 33 frames at 8 fps, 0.125 s apart · extreme close-up, pull back, rolling digits

At 5.5 the counter fills the frame, its digit boxes so large that only fragments of the caption show at the bottom, and every digit changes on every frame. At about 6.5 the camera is suddenly wide enough to read the whole card: 'Beta Testers Onboarded since Dec 11, 2023'. From there the six digits roll up steadily (about 79,500 at 6.5, 117,731 at 7.5, 186,142 at 9.25), about 40,000 a second, so the count of people waiting rises by more than a hundred thousand in under three seconds. It is the film's one statistic, and it is shown as a crowd in line.

Motion: `█▆▆▆▆▆▇▆▇▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▇▆`

- 00:05.50 `motion/counter/f-001.webp` █
- 00:05.62 `motion/counter/f-002.webp` ▆
- 00:05.75 `motion/counter/f-003.webp` ▆
- 00:05.88 `motion/counter/f-004.webp` ▆
- 00:06.00 `motion/counter/f-005.webp` ▆
- 00:06.12 `motion/counter/f-006.webp` ▆
- 00:06.25 `motion/counter/f-007.webp` ▇
- 00:06.38 `motion/counter/f-008.webp` ▆
- 00:06.50 `motion/counter/f-009.webp` ▇
- 00:06.62 `motion/counter/f-010.webp` ▄
- 00:06.75 `motion/counter/f-011.webp` ▄
- 00:06.88 `motion/counter/f-012.webp` ▄
- 00:07.00 `motion/counter/f-013.webp` ▄
- 00:07.12 `motion/counter/f-014.webp` ▄
- 00:07.25 `motion/counter/f-015.webp` ▄
- 00:07.38 `motion/counter/f-016.webp` ▄
- 00:07.50 `motion/counter/f-017.webp` ▄
- 00:07.62 `motion/counter/f-018.webp` ▄
- 00:07.75 `motion/counter/f-019.webp` ▄
- 00:07.88 `motion/counter/f-020.webp` ▄
- 00:08.00 `motion/counter/f-021.webp` ▄
- 00:08.12 `motion/counter/f-022.webp` ▄
- 00:08.25 `motion/counter/f-023.webp` ▄
- 00:08.38 `motion/counter/f-024.webp` ▄
- 00:08.50 `motion/counter/f-025.webp` ▄
- 00:08.62 `motion/counter/f-026.webp` ▄
- 00:08.75 `motion/counter/f-027.webp` ▄
- 00:08.88 `motion/counter/f-028.webp` ▄
- 00:09.00 `motion/counter/f-029.webp` ▄
- 00:09.12 `motion/counter/f-030.webp` ▄
- 00:09.25 `motion/counter/f-031.webp` ▄
- 00:09.38 `motion/counter/f-032.webp` ▇
- 00:09.50 `motion/counter/f-033.webp` ▆

### 04. Every Start button in four seconds

00:09.35–00:13.30 (3.95 s) · 48 frames at 12 fps, 0.083 s apart · match cut, same crop, cursor continuity, history

Each era of Windows is the same framing: the bottom-left corner in close-up with a cursor on the button. an early toolbar with the four-color flag at 9.42, Windows 95's 'Start' at 10.04 (pressed at 10.55, its dotted focus ring showing by 10.7), XP's green 'start' at 10.96, a dark glass 'start' at 11.46, the Vista and Windows 7 orb beside Internet Explorer at 11.88, Windows 10's flat logo at 12.3 (darkening under the cursor by 12.38), and Windows 11's centered logo at 12.71. Cuts fall about every half second, and because the cursor is always at the same place on the button, the cuts read as one continuous click across 30 years.

Motion: `▄█▆▆▆▄▆▄▇▄▃▃▃▃▇▅▆▆▄▄▇▃▃▃▃▇▃▃▄▃▃▇▅▅▅▄▇▆▄▃█▂▂▂▂▂▂█`

- 00:09.35 `motion/start-buttons/f-001.webp` ▄
- 00:09.43 `motion/start-buttons/f-002.webp` █
- 00:09.52 `motion/start-buttons/f-003.webp` ▆
- 00:09.60 `motion/start-buttons/f-004.webp` ▆
- 00:09.68 `motion/start-buttons/f-005.webp` ▆
- 00:09.77 `motion/start-buttons/f-006.webp` ▄
- 00:09.85 `motion/start-buttons/f-007.webp` ▆
- 00:09.93 `motion/start-buttons/f-008.webp` ▄
- 00:10.02 `motion/start-buttons/f-009.webp` ▇
- 00:10.10 `motion/start-buttons/f-010.webp` ▄
- 00:10.18 `motion/start-buttons/f-011.webp` ▃
- 00:10.27 `motion/start-buttons/f-012.webp` ▃
- 00:10.35 `motion/start-buttons/f-013.webp` ▃
- 00:10.43 `motion/start-buttons/f-014.webp` ▃
- 00:10.52 `motion/start-buttons/f-015.webp` ▇
- 00:10.60 `motion/start-buttons/f-016.webp` ▅
- 00:10.68 `motion/start-buttons/f-017.webp` ▆
- 00:10.77 `motion/start-buttons/f-018.webp` ▆
- 00:10.85 `motion/start-buttons/f-019.webp` ▄
- 00:10.93 `motion/start-buttons/f-020.webp` ▄
- 00:11.02 `motion/start-buttons/f-021.webp` ▇
- 00:11.10 `motion/start-buttons/f-022.webp` ▃
- 00:11.18 `motion/start-buttons/f-023.webp` ▃
- 00:11.27 `motion/start-buttons/f-024.webp` ▃
- 00:11.35 `motion/start-buttons/f-025.webp` ▃
- 00:11.43 `motion/start-buttons/f-026.webp` ▇
- 00:11.52 `motion/start-buttons/f-027.webp` ▃
- 00:11.60 `motion/start-buttons/f-028.webp` ▃
- 00:11.68 `motion/start-buttons/f-029.webp` ▄
- 00:11.77 `motion/start-buttons/f-030.webp` ▃
- 00:11.85 `motion/start-buttons/f-031.webp` ▃
- 00:11.93 `motion/start-buttons/f-032.webp` ▇
- 00:12.02 `motion/start-buttons/f-033.webp` ▅
- 00:12.10 `motion/start-buttons/f-034.webp` ▅
- 00:12.18 `motion/start-buttons/f-035.webp` ▅
- 00:12.27 `motion/start-buttons/f-036.webp` ▄
- 00:12.35 `motion/start-buttons/f-037.webp` ▇
- 00:12.43 `motion/start-buttons/f-038.webp` ▆
- 00:12.52 `motion/start-buttons/f-039.webp` ▄
- 00:12.60 `motion/start-buttons/f-040.webp` ▃
- 00:12.68 `motion/start-buttons/f-041.webp` █
- 00:12.77 `motion/start-buttons/f-042.webp` ▂
- 00:12.85 `motion/start-buttons/f-043.webp` ▂
- 00:12.93 `motion/start-buttons/f-044.webp` ▂
- 00:13.02 `motion/start-buttons/f-045.webp` ▂
- 00:13.10 `motion/start-buttons/f-046.webp` ▂
- 00:13.18 `motion/start-buttons/f-047.webp` ▂
- 00:13.27 `motion/start-buttons/f-048.webp` █

### 05. The desktop, the icon, 'Finally'

00:13.20–00:15.80 (2.60 s) · 22 frames at 8 fps, 0.125 s apart · wide to close, double-click, type card, hold

A wide shot of the Windows 11 desktop holds from 13.25 to 14.45, the longest still image in the film so far, with a tiny cursor moving toward the one icon at top left. A cut pushes in on that icon, the Arc logo and its label, with the cursor beside it. The cursor rests there until 15.15, as if before a double-click, and at 15.2 the blue fills the frame with 'Finally' in small italic bold. The word holds for half a second, and the music jumps about 10 dB right after it, at 15.5.

Motion: `█▅▅▅▅▄▄▄▄▄▇▂▃▃▃▂▄▁▁▁▇▅`

- 00:13.20 `motion/finally/f-001.webp` █
- 00:13.32 `motion/finally/f-002.webp` ▅
- 00:13.45 `motion/finally/f-003.webp` ▅
- 00:13.57 `motion/finally/f-004.webp` ▅
- 00:13.70 `motion/finally/f-005.webp` ▅
- 00:13.82 `motion/finally/f-006.webp` ▄
- 00:13.95 `motion/finally/f-007.webp` ▄
- 00:14.07 `motion/finally/f-008.webp` ▄
- 00:14.20 `motion/finally/f-009.webp` ▄
- 00:14.32 `motion/finally/f-010.webp` ▄
- 00:14.45 `motion/finally/f-011.webp` ▇
- 00:14.57 `motion/finally/f-012.webp` ▂
- 00:14.70 `motion/finally/f-013.webp` ▃
- 00:14.82 `motion/finally/f-014.webp` ▃
- 00:14.95 `motion/finally/f-015.webp` ▃
- 00:15.07 `motion/finally/f-016.webp` ▂
- 00:15.20 `motion/finally/f-017.webp` ▄
- 00:15.32 `motion/finally/f-018.webp` ▁
- 00:15.45 `motion/finally/f-019.webp` ▁
- 00:15.57 `motion/finally/f-020.webp` ▁
- 00:15.70 `motion/finally/f-021.webp` ▇
- 00:15.82 `motion/finally/f-022.webp` ▅

### 06. The window fades up from dark

00:15.60–00:16.80 (1.20 s) · 23 frames at 18 fps, 0.056 s apart · fade from black, app launch, cursor click

At 15.65 a full Arc window cuts in, nearly black, and brightens over about a quarter of a second to full color by 15.9, like an app finishing its launch. The window then holds still on a New York Times photo story while a cursor at bottom right clicks the gallery's next arrow. Under a second later, at 16.76, the cut to the command bar starts the product montage.

Motion: `▁█▆▅▆▅▄▄▄▃▃▃▃▃▃▃▃▃▃▃▃▃█`

- 00:15.60 `motion/launch/f-001.webp` ▁
- 00:15.66 `motion/launch/f-002.webp` █
- 00:15.71 `motion/launch/f-003.webp` ▆
- 00:15.77 `motion/launch/f-004.webp` ▅
- 00:15.82 `motion/launch/f-005.webp` ▆
- 00:15.88 `motion/launch/f-006.webp` ▅
- 00:15.93 `motion/launch/f-007.webp` ▄
- 00:15.99 `motion/launch/f-008.webp` ▄
- 00:16.04 `motion/launch/f-009.webp` ▄
- 00:16.10 `motion/launch/f-010.webp` ▃
- 00:16.16 `motion/launch/f-011.webp` ▃
- 00:16.21 `motion/launch/f-012.webp` ▃
- 00:16.27 `motion/launch/f-013.webp` ▃
- 00:16.32 `motion/launch/f-014.webp` ▃
- 00:16.38 `motion/launch/f-015.webp` ▃
- 00:16.43 `motion/launch/f-016.webp` ▃
- 00:16.49 `motion/launch/f-017.webp` ▃
- 00:16.54 `motion/launch/f-018.webp` ▃
- 00:16.60 `motion/launch/f-019.webp` ▃
- 00:16.66 `motion/launch/f-020.webp` ▃
- 00:16.71 `motion/launch/f-021.webp` ▃
- 00:16.77 `motion/launch/f-022.webp` ▃
- 00:16.82 `motion/launch/f-023.webp` █

### 07. Typing with suggestions, then landing

00:16.75–00:18.30 (1.55 s) · 17 frames at 10 fps, 0.100 s apart · type-on, autocomplete, highlight move

Close on the command bar, 'japan' becomes 'japand', 'japandi i', 'japandi inte' and 'japandi interior' between 16.76 and 17.6, the green suggestion row updating with each letter. At about 17.7 the field autocompletes 'design' as selected text and the green highlight jumps down to 'japandi interior design'. At 18.23 it cuts to the result page. The search is shown at the speed of real typing, not sped up, because the suggestions are the feature.

Motion: `█▃▂▂▂▂▂▂▁▁▇▁▁▁▁▇▁`

- 00:16.75 `motion/command-bar/f-001.webp` █
- 00:16.85 `motion/command-bar/f-002.webp` ▃
- 00:16.95 `motion/command-bar/f-003.webp` ▂
- 00:17.05 `motion/command-bar/f-004.webp` ▂
- 00:17.15 `motion/command-bar/f-005.webp` ▂
- 00:17.25 `motion/command-bar/f-006.webp` ▂
- 00:17.35 `motion/command-bar/f-007.webp` ▂
- 00:17.45 `motion/command-bar/f-008.webp` ▂
- 00:17.55 `motion/command-bar/f-009.webp` ▁
- 00:17.65 `motion/command-bar/f-010.webp` ▁
- 00:17.75 `motion/command-bar/f-011.webp` ▇
- 00:17.85 `motion/command-bar/f-012.webp` ▁
- 00:17.95 `motion/command-bar/f-013.webp` ▁
- 00:18.05 `motion/command-bar/f-014.webp` ▁
- 00:18.15 `motion/command-bar/f-015.webp` ▁
- 00:18.25 `motion/command-bar/f-016.webp` ▇
- 00:18.35 `motion/command-bar/f-017.webp` ▁

### 08. A link opens in a panel over the page

00:21.10–00:22.20 (1.10 s) · 27 frames at 24 fps, 0.042 s apart · dim, grow from center, pop-up preview

At 21.26 the split view dims and fades back, and a small white rectangle appears in the middle of it at 21.35. By 21.43 it has grown to almost the full window height, a blank panel over the dimmed page, and at 21.64 the Storm King Art Center article fills it. The interface move itself is the subject: half a second from click to page, without leaving the window behind.

Motion: `▃▃▃▅▆▆▆▇▆▅▅▃▃█▃▃▃▃▃▃▃▃▃▃▃▃▃`

- 00:21.10 `motion/peek/f-001.webp` ▃
- 00:21.14 `motion/peek/f-002.webp` ▃
- 00:21.18 `motion/peek/f-003.webp` ▃
- 00:21.23 `motion/peek/f-004.webp` ▅
- 00:21.27 `motion/peek/f-005.webp` ▆
- 00:21.31 `motion/peek/f-006.webp` ▆
- 00:21.35 `motion/peek/f-007.webp` ▆
- 00:21.39 `motion/peek/f-008.webp` ▇
- 00:21.43 `motion/peek/f-009.webp` ▆
- 00:21.48 `motion/peek/f-010.webp` ▅
- 00:21.52 `motion/peek/f-011.webp` ▅
- 00:21.56 `motion/peek/f-012.webp` ▃
- 00:21.60 `motion/peek/f-013.webp` ▃
- 00:21.64 `motion/peek/f-014.webp` █
- 00:21.68 `motion/peek/f-015.webp` ▃
- 00:21.73 `motion/peek/f-016.webp` ▃
- 00:21.77 `motion/peek/f-017.webp` ▃
- 00:21.81 `motion/peek/f-018.webp` ▃
- 00:21.85 `motion/peek/f-019.webp` ▃
- 00:21.89 `motion/peek/f-020.webp` ▃
- 00:21.93 `motion/peek/f-021.webp` ▃
- 00:21.98 `motion/peek/f-022.webp` ▃
- 00:22.02 `motion/peek/f-023.webp` ▃
- 00:22.06 `motion/peek/f-024.webp` ▃
- 00:22.10 `motion/peek/f-025.webp` ▃
- 00:22.14 `motion/peek/f-026.webp` ▃
- 00:22.18 `motion/peek/f-027.webp` ▃

### 09. Dragging tabs up the sidebar and into favorites

00:22.20–00:24.20 (2.00 s) · 17 frames at 8 fps, 0.125 s apart · drag, reorder, drop into slot

The 'lofi hip hop radio' tab, its video playing beside the sidebar, is dragged up between 22.22 and 22.43, with the other tabs sliding down to make room. At 22.75 a closer crop shows another tab ('Living Room Photos') lifted and dropped between two others by 23.25. At 23.37 a third crop shows an 'Architizer' tab dragged up into the row of pinned favorites, where it becomes an icon by 24.0. Three drags in two seconds, each from a new framing, so the gesture is learned by repetition.

Motion: `▇▄▄▃▇▃▅▆▄▇▅▅▄▄▃▃▃`

- 00:22.20 `motion/tab-drag/f-001.webp` ▇
- 00:22.32 `motion/tab-drag/f-002.webp` ▄
- 00:22.45 `motion/tab-drag/f-003.webp` ▄
- 00:22.57 `motion/tab-drag/f-004.webp` ▃
- 00:22.70 `motion/tab-drag/f-005.webp` ▇
- 00:22.82 `motion/tab-drag/f-006.webp` ▃
- 00:22.95 `motion/tab-drag/f-007.webp` ▅
- 00:23.07 `motion/tab-drag/f-008.webp` ▆
- 00:23.20 `motion/tab-drag/f-009.webp` ▄
- 00:23.32 `motion/tab-drag/f-010.webp` ▇
- 00:23.45 `motion/tab-drag/f-011.webp` ▅
- 00:23.57 `motion/tab-drag/f-012.webp` ▅
- 00:23.70 `motion/tab-drag/f-013.webp` ▄
- 00:23.82 `motion/tab-drag/f-014.webp` ▄
- 00:23.95 `motion/tab-drag/f-015.webp` ▃
- 00:24.07 `motion/tab-drag/f-016.webp` ▃
- 00:24.20 `motion/tab-drag/f-017.webp` ▃

### 10. Split view, as a flip book of pairs

00:24.20–00:27.35 (3.15 s) · 20 frames at 6 fps, 0.167 s apart · tooltip, two panes, rapid pairs

The cursor rests on a button long enough for its tooltip, 'Open Split View', to appear (24.5 to 25.2). From 25.25 the film cuts through pairs of pages side by side: Vox and a timber courtyard, a construction article, MoMA and a design magazine at 26.37, then a cooking video beside a recipe for spicy peanut noodles at 26.75. Each pair holds about half a second, enough to see that it is two pages and not to read them.

Motion: `▇▂▂▁▁▁▇▄▄▅▇▄▆▇▆▇▆▄▅▇`

- 00:24.20 `motion/split-view/f-001.webp` ▇
- 00:24.37 `motion/split-view/f-002.webp` ▂
- 00:24.53 `motion/split-view/f-003.webp` ▂
- 00:24.70 `motion/split-view/f-004.webp` ▁
- 00:24.87 `motion/split-view/f-005.webp` ▁
- 00:25.03 `motion/split-view/f-006.webp` ▁
- 00:25.20 `motion/split-view/f-007.webp` ▇
- 00:25.37 `motion/split-view/f-008.webp` ▄
- 00:25.53 `motion/split-view/f-009.webp` ▄
- 00:25.70 `motion/split-view/f-010.webp` ▅
- 00:25.87 `motion/split-view/f-011.webp` ▇
- 00:26.03 `motion/split-view/f-012.webp` ▄
- 00:26.20 `motion/split-view/f-013.webp` ▆
- 00:26.37 `motion/split-view/f-014.webp` ▇
- 00:26.53 `motion/split-view/f-015.webp` ▆
- 00:26.70 `motion/split-view/f-016.webp` ▇
- 00:26.87 `motion/split-view/f-017.webp` ▆
- 00:27.03 `motion/split-view/f-018.webp` ▄
- 00:27.20 `motion/split-view/f-019.webp` ▅
- 00:27.37 `motion/split-view/f-020.webp` ▇

### 11. Materials, colors, and a dissolve through the wallpaper

00:27.30–00:31.10 (3.80 s) · 31 frames at 8 fps, 0.125 s apart · Windows material, theme swap, dissolve

At 27.37 a settings menu offers 'Mica (default)' and 'Acrylic', with the cursor moving onto Acrylic, then a dropdown at 28.0. A pink and orange 'DIY Projects' space slides in at 28.12, a light and dark switch is dragged at 29.0, and from 29.42 a pink dot is moved around a color picker as the window tint follows. At 30.17 a pink window starts fading out, the blurred wallpaper shows through it from 30.21 to 30.38, and a green window resolves in its place by 30.5. That dissolve is the one soft transition in the montage, and it fits a feature about translucent windows.

Motion: `▇▆▃▃▃▃▇▅▅▆▆▆▆▇▆▅▃▆▄▄▇▅▅▇▅▆▅▁▁▁▇`

- 00:27.30 `motion/themes/f-001.webp` ▇
- 00:27.43 `motion/themes/f-002.webp` ▆
- 00:27.55 `motion/themes/f-003.webp` ▃
- 00:27.68 `motion/themes/f-004.webp` ▃
- 00:27.80 `motion/themes/f-005.webp` ▃
- 00:27.93 `motion/themes/f-006.webp` ▃
- 00:28.05 `motion/themes/f-007.webp` ▇
- 00:28.18 `motion/themes/f-008.webp` ▅
- 00:28.30 `motion/themes/f-009.webp` ▅
- 00:28.43 `motion/themes/f-010.webp` ▆
- 00:28.55 `motion/themes/f-011.webp` ▆
- 00:28.68 `motion/themes/f-012.webp` ▆
- 00:28.80 `motion/themes/f-013.webp` ▆
- 00:28.93 `motion/themes/f-014.webp` ▇
- 00:29.05 `motion/themes/f-015.webp` ▆
- 00:29.18 `motion/themes/f-016.webp` ▅
- 00:29.30 `motion/themes/f-017.webp` ▃
- 00:29.43 `motion/themes/f-018.webp` ▆
- 00:29.55 `motion/themes/f-019.webp` ▄
- 00:29.68 `motion/themes/f-020.webp` ▄
- 00:29.80 `motion/themes/f-021.webp` ▇
- 00:29.93 `motion/themes/f-022.webp` ▅
- 00:30.05 `motion/themes/f-023.webp` ▅
- 00:30.18 `motion/themes/f-024.webp` ▇
- 00:30.30 `motion/themes/f-025.webp` ▅
- 00:30.43 `motion/themes/f-026.webp` ▆
- 00:30.55 `motion/themes/f-027.webp` ▅
- 00:30.68 `motion/themes/f-028.webp` ▁
- 00:30.80 `motion/themes/f-029.webp` ▁
- 00:30.93 `motion/themes/f-030.webp` ▁
- 00:31.05 `motion/themes/f-031.webp` ▇

### 12. Three words, then Edge in the bin

00:31.00–00:36.40 (5.40 s) · 33 frames at 6 fps, 0.167 s apart · type card, drag to bin, sting, logo

Three cards on the electric blue, each about a second: 'Arc is on Windows' at 31.08, 'Download now' at 32.0, 'arc.net' at 33.0. At 33.83 the sting cuts in: a dark Windows desktop where the Microsoft Edge icon, already selected, is dragged over the Recycle Bin with the 'Move to Recycle Bin' tooltip. It drops at about 34.5 and by 34.75 only the bin is left. At 35.21 the end mark appears on blue (Arc's 'A' peeking around a Windows logo drawn as an open window) and holds to the end as the music fades.

Motion: `▇▁▁▁▁▁▃▁▁▁▁▂▁▁▁▁▁▇▃▃▂▃▄▁▁▇▁▁▁▁▁▁▁`

- 00:31.00 `motion/edge-to-bin/f-001.webp` ▇
- 00:31.17 `motion/edge-to-bin/f-002.webp` ▁
- 00:31.33 `motion/edge-to-bin/f-003.webp` ▁
- 00:31.50 `motion/edge-to-bin/f-004.webp` ▁
- 00:31.67 `motion/edge-to-bin/f-005.webp` ▁
- 00:31.83 `motion/edge-to-bin/f-006.webp` ▁
- 00:32.00 `motion/edge-to-bin/f-007.webp` ▃
- 00:32.17 `motion/edge-to-bin/f-008.webp` ▁
- 00:32.33 `motion/edge-to-bin/f-009.webp` ▁
- 00:32.50 `motion/edge-to-bin/f-010.webp` ▁
- 00:32.67 `motion/edge-to-bin/f-011.webp` ▁
- 00:32.83 `motion/edge-to-bin/f-012.webp` ▂
- 00:33.00 `motion/edge-to-bin/f-013.webp` ▁
- 00:33.17 `motion/edge-to-bin/f-014.webp` ▁
- 00:33.33 `motion/edge-to-bin/f-015.webp` ▁
- 00:33.50 `motion/edge-to-bin/f-016.webp` ▁
- 00:33.67 `motion/edge-to-bin/f-017.webp` ▁
- 00:33.83 `motion/edge-to-bin/f-018.webp` ▇
- 00:34.00 `motion/edge-to-bin/f-019.webp` ▃
- 00:34.17 `motion/edge-to-bin/f-020.webp` ▃
- 00:34.33 `motion/edge-to-bin/f-021.webp` ▂
- 00:34.50 `motion/edge-to-bin/f-022.webp` ▃
- 00:34.67 `motion/edge-to-bin/f-023.webp` ▄
- 00:34.83 `motion/edge-to-bin/f-024.webp` ▁
- 00:35.00 `motion/edge-to-bin/f-025.webp` ▁
- 00:35.17 `motion/edge-to-bin/f-026.webp` ▇
- 00:35.33 `motion/edge-to-bin/f-027.webp` ▁
- 00:35.50 `motion/edge-to-bin/f-028.webp` ▁
- 00:35.67 `motion/edge-to-bin/f-029.webp` ▁
- 00:35.83 `motion/edge-to-bin/f-030.webp` ▁
- 00:36.00 `motion/edge-to-bin/f-031.webp` ▁
- 00:36.17 `motion/edge-to-bin/f-032.webp` ▁
- 00:36.33 `motion/edge-to-bin/f-033.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Camcorder footage of a beige 1990s PC, a Windows 9x splash on the CRT, with a second monitor and a desk phone beside it. The film fades up into it from the same electric blue it ends on.
- 00:01.00 `seconds/second-00002.webp` Internet Explorer's old Go menu, blown up until the pixels show: 'Start Page, Search the Internet, Read Newsgroups'. A pixel cursor drops onto 'Search the Internet'.
- 00:02.00 `seconds/second-00003.webp` An empty search box with a blinking caret, filling the frame. 'flowers' is about to be typed one letter at a time.
- 00:03.00 `seconds/second-00004.webp` The result: Van Gogh's Sunflowers loading line by line into a black browser window, the way images came down a modem.
- 00:04.00 `seconds/second-00005.webp` 'You've been waiting.' in white bold sans over the teal Windows 95 desktop, after the words arrived one at a time. The desktop icons have just been pushed out of frame by a punch-in on the text.
- 00:05.00 `seconds/second-00006.webp` The Windows hourglass on white, enlarged to fill the screen and settling upright after a half turn. The wait, drawn as the icon everyone remembers waiting on.
- 00:06.00 `seconds/second-00007.webp` The waiting gets a number: a counter seen so close that its digits fill the frame, spinning like a slot machine on Arc's electric blue.
- 00:07.00 `seconds/second-00008.webp` Pulled back, the counter reads as a card: 'Beta Testers Onboarded since Dec 11, 2023', climbing past 112,000. The film admits how many people have been in line.
- 00:08.00 `seconds/second-00009.webp` 151,141 and still rising. The voice says 'Ours is a brand-new world' over it.
- 00:09.00 `seconds/second-00010.webp` An early Windows toolbar (the four-color flag, a magnifier, a help icon) in extreme close-up, a cursor drifting over it. The start of a four-second history of the Start button.
- 00:10.00 `seconds/second-00011.webp` The Windows 95 Start button, chunky and grey. The cursor will press it, and the dotted focus ring appears before the next era cuts in.
- 00:11.00 `seconds/second-00012.webp` A dark glass 'start' button from the XP years. Each button is held about half a second, from the same tight crop, so the eras flick past like a flip book.
- 00:12.00 `seconds/second-00013.webp` Windows 10's flat Start logo beside the search magnifier, its square going dark navy under the cursor. One more button and the history reaches Windows 11.
- 00:13.00 `seconds/second-00014.webp` A clean Windows 11 desktop, the default green hills wallpaper, with one icon at the top left. The wide shot is the present day.
- 00:14.00 `seconds/second-00015.webp` Pushed in on that icon: Arc's red and blue logo with a shortcut arrow, labelled 'Arc', a cursor beside it. The cursor double-clicks.
- 00:15.00 `seconds/second-00016.webp` 'Finally' in white italic bold on Windows blue, small and centered. The only word in the film that isn't a fact or an instruction.
- 00:16.00 `seconds/second-00017.webp` Arc's first window on Windows: a green sidebar of folders and tabs, a New York Times photo story on a sustainable house, and the Windows 11 bloom wallpaper behind. It fades up from black as if the app had just launched.
- 00:17.00 `seconds/second-00018.webp` Arc's command bar in close-up, 'japandi interior' typed in, with suggestions in a soft green highlight. Product shots are framed this tight throughout, so each control can be read at phone size.
- 00:18.00 `seconds/second-00019.webp` The AD article the search lands on. It holds less than a second.
- 00:19.00 `seconds/second-00020.webp` The sidebar has slid in over a split view of an Airbnb listing and a sculpture: folders for 'Apartment inspo', 'Recipes' and 'Upstate trip', then saved pages below.
- 00:20.00 `seconds/second-00021.webp` Close on the sidebar, a cursor closing tabs with the small x that appears on hover.
- 00:21.00 `seconds/second-00022.webp` A link opened in a pop-up preview over the dimmed window, the white panel still growing before the Storm King Art Center page loads in it.
- 00:22.00 `seconds/second-00023.webp` A tab for 'lofi hip hop radio' being dragged up the sidebar past a playing video. The demo uses everyday browsing (a lo-fi stream, recipes, a weekend trip), not work.
- 00:23.00 `seconds/second-00024.webp` A tab being dragged into the row of pinned favorites at the top of the sidebar, in a 'Work' space.
- 00:24.00 `seconds/second-00025.webp` A tooltip, 'Open Split View', under the cursor. The film names a control only when its tooltip does.
- 00:25.00 `seconds/second-00026.webp` Split view: a Vox article on mass timber beside a photo of a building's courtyard. The pairs change every half second.
- 00:26.00 `seconds/second-00027.webp` A MoMA page in split view, among pairs of design, architecture and recipe pages. The sites are recognizable on purpose.
- 00:27.00 `seconds/second-00028.webp` A Windows-only setting: the choice between 'Mica (default)' and 'Acrylic', the Windows 11 materials, with the cursor on Acrylic. Arc is shown belonging on Windows, not ported to it.
- 00:28.00 `seconds/second-00029.webp` A 'DIY Projects' space in a pink and orange gradient theme, against a vivid Windows wallpaper.
- 00:29.00 `seconds/second-00030.webp` The theme picker: a light and dark switch and a row of color swatches, a cursor dragging the toggle.
- 00:30.00 `seconds/second-00031.webp` The last product shot, in green: a Japandi style article next to an Instagram grid, settled after a soft dissolve through the blurred wallpaper.
- 00:31.00 `seconds/second-00032.webp` 'Arc is on Windows' in small white bold on electric blue, the same blue as the counter.
- 00:32.00 `seconds/second-00033.webp` 'Download now' on the same blue, in the same place. Each line holds for about a second.
- 00:33.00 `seconds/second-00034.webp` 'arc.net', the third and last card.
- 00:34.00 `seconds/second-00035.webp` The sting: on a Windows desktop, the Microsoft Edge icon dragged onto the Recycle Bin with the system tooltip 'Move to Recycle Bin'. A second later only the bin is left.
- 00:35.00 `seconds/second-00036.webp` The end mark: Arc's 'A' drawn in white outline, peeking around a Windows logo drawn as a window swung open.
- 00:36.00 `seconds/second-00037.webp` The mark holds as the music fades.
