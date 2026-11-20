# Motion notes: Why you should never vote: an explainer

Jon Bois · 02:36.57 · https://www.youtube.com/watch?v=x5ue-PkMjxM

Nearly all of the film is one flat mint canvas with things pasted on it, and a virtual camera that travels across it: the first detected cut comes at 0:46.7, and there are only 11 in 157 seconds, a median shot of 6.45 seconds. Instead of cutting, the camera tilts down from each reason card to its props, whips sideways to the next card, pushes into details (a dollar bill, a URL, an address) and pulls back to show where they sit. The props barely animate themselves; a red X stamps, wedges snap into a pie, a bill repeats into a row. The hard cuts gather where the film leaves the canvas or loses its footing: three across the form's fine print, four in and out of the inverted voter footage, three around the phone filming a laptop. The motion also escalates with the script, from smooth, centered moves for the first two reasons to whips and spins through the Q-83 bureaucracy, tinted and inverted footage, and finally a handheld phone. The sequences below follow the title, the dollar line, the calendar, the URL and map, the whip back through reason three, the corridor, the faces, the pie and the searches.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▄▄▅▅▁▄▆▄▄▄▆▄▁▁▁▆▅▁▇▆▂▁▄▅▅▅▁▁▅▅▄▆▁▄▆▄▁▅▅▄▄▇▁▆▆▅▆▇▃▅▅▃▁▅▆▇▆▆▅▅
01:00  ▅▆▆▆▆███▇▇▆▄▅▆▅▄▄▄▅▅▄▃▅▆▅▁▅▆▅▄▃▄▃▃▃▄▅▆▆▆▆▅▅▄▅▃▁▅▆▂▄▅▆▆▄▂▆▆▄▁
02:00  ▆▅▁▁▁▁▁▁▁▁▁▁▁▅▂▆▆▅▅▅▅▅▅▆▆▅▅▅▅▅▄▁▁▁▁▁▁
```

## Sequences

### 01. The title rises out of the wallpaper, then the canvas is revealed

00:00.50–00:07.25 (6.75 s) · 28 frames at 4 fps, 0.250 s apart · cut-outs, rise in, tilt, pull back, push in

The tooth wallpaper sits alone until about 0.75, when the floss box enters from the bottom edge. From 1.25 the hammer, the toothbrush and the title follow it up from below the frame, and the cluster settles by 3.25 with the toothbrush and hammer either side of 'vote' and the saw underneath. It holds, drifting slightly, until 6.0. Then the camera drops fast down the canvas, so title, tools and wallpaper all leave by the top, and at 6.75 it is pulled far back: the card for reason one and the voter-fee map sit side by side, small, on a plain mint field. By 7.0 it has pushed into the card. The first seven seconds already show the method: everything lives on one surface and the camera goes to it.

Motion: `▄▄▄▄▄▅▅▅▅▆▆▅▁▁▁▁▁▁▁▁▁▅▆▇▆▅▅▄`

- 00:00.50 `motion/title-open/f-001.webp` ▄
- 00:00.75 `motion/title-open/f-002.webp` ▄
- 00:01.00 `motion/title-open/f-003.webp` ▄
- 00:01.25 `motion/title-open/f-004.webp` ▄
- 00:01.50 `motion/title-open/f-005.webp` ▄
- 00:01.75 `motion/title-open/f-006.webp` ▅
- 00:02.00 `motion/title-open/f-007.webp` ▅
- 00:02.25 `motion/title-open/f-008.webp` ▅
- 00:02.50 `motion/title-open/f-009.webp` ▅
- 00:02.75 `motion/title-open/f-010.webp` ▆
- 00:03.00 `motion/title-open/f-011.webp` ▆
- 00:03.25 `motion/title-open/f-012.webp` ▅
- 00:03.50 `motion/title-open/f-013.webp` ▁
- 00:03.75 `motion/title-open/f-014.webp` ▁
- 00:04.00 `motion/title-open/f-015.webp` ▁
- 00:04.25 `motion/title-open/f-016.webp` ▁
- 00:04.50 `motion/title-open/f-017.webp` ▁
- 00:04.75 `motion/title-open/f-018.webp` ▁
- 00:05.00 `motion/title-open/f-019.webp` ▁
- 00:05.25 `motion/title-open/f-020.webp` ▁
- 00:05.50 `motion/title-open/f-021.webp` ▁
- 00:05.75 `motion/title-open/f-022.webp` ▅
- 00:06.00 `motion/title-open/f-023.webp` ▆
- 00:06.25 `motion/title-open/f-024.webp` ▇
- 00:06.50 `motion/title-open/f-025.webp` ▆
- 00:06.75 `motion/title-open/f-026.webp` ▅
- 00:07.00 `motion/title-open/f-027.webp` ▅
- 00:07.25 `motion/title-open/f-028.webp` ▄

### 02. From the map to the dollar bill parked beside it

00:15.00–00:20.50 (5.50 s) · 34 frames at 6 fps, 0.167 s apart · pan, push in, repeat, pull back

The $1 bill has sat small to the right of the map since about 0:11. At 15.5 the camera swings right past the map onto it and pushes in, so by 16.3 the bill fills the middle of the frame on 'picture it like this'. At 18.3 copies of it appear either side, a row sliding through the frame, and from 19.5 the camera pulls back fast until the bills are a thin strip with the East Coast and Cuba at left edge. The bill was planted five seconds before the voice needed it.

Motion: `▄▅▅▆▇▇▆▄▄▃▂▂▁▁▁▁▁▁▁▆▇▇▇▇▇▇▇▇▆▄▃▃▂▁`

- 00:15.00 `motion/dollar-line/f-001.webp` ▄
- 00:15.17 `motion/dollar-line/f-002.webp` ▅
- 00:15.33 `motion/dollar-line/f-003.webp` ▅
- 00:15.50 `motion/dollar-line/f-004.webp` ▆
- 00:15.67 `motion/dollar-line/f-005.webp` ▇
- 00:15.83 `motion/dollar-line/f-006.webp` ▇
- 00:16.00 `motion/dollar-line/f-007.webp` ▆
- 00:16.17 `motion/dollar-line/f-008.webp` ▄
- 00:16.33 `motion/dollar-line/f-009.webp` ▄
- 00:16.50 `motion/dollar-line/f-010.webp` ▃
- 00:16.67 `motion/dollar-line/f-011.webp` ▂
- 00:16.83 `motion/dollar-line/f-012.webp` ▂
- 00:17.00 `motion/dollar-line/f-013.webp` ▁
- 00:17.17 `motion/dollar-line/f-014.webp` ▁
- 00:17.33 `motion/dollar-line/f-015.webp` ▁
- 00:17.50 `motion/dollar-line/f-016.webp` ▁
- 00:17.67 `motion/dollar-line/f-017.webp` ▁
- 00:17.83 `motion/dollar-line/f-018.webp` ▁
- 00:18.00 `motion/dollar-line/f-019.webp` ▁
- 00:18.17 `motion/dollar-line/f-020.webp` ▆
- 00:18.33 `motion/dollar-line/f-021.webp` ▇
- 00:18.50 `motion/dollar-line/f-022.webp` ▇
- 00:18.67 `motion/dollar-line/f-023.webp` ▇
- 00:18.83 `motion/dollar-line/f-024.webp` ▇
- 00:19.00 `motion/dollar-line/f-025.webp` ▇
- 00:19.17 `motion/dollar-line/f-026.webp` ▇
- 00:19.33 `motion/dollar-line/f-027.webp` ▇
- 00:19.50 `motion/dollar-line/f-028.webp` ▇
- 00:19.67 `motion/dollar-line/f-029.webp` ▆
- 00:19.83 `motion/dollar-line/f-030.webp` ▄
- 00:20.00 `motion/dollar-line/f-031.webp` ▃
- 00:20.17 `motion/dollar-line/f-032.webp` ▃
- 00:20.33 `motion/dollar-line/f-033.webp` ▂
- 00:20.50 `motion/dollar-line/f-034.webp` ▁

### 03. Along the line to a million dollars

00:20.00–00:25.00 (5.00 s) · 21 frames at 4 fps, 0.250 s apart · pan, type in, deadpan

The camera tracks right along the row of bills for two and a half seconds of nothing but bills, the coast falling away at left. At 22.5 a heap of cash slides in from the right edge, and from 23.5 the serif '= $1,000,000' follows it in, letter by letter as the frame moves. The voice has said 'if you have a lot more money than that' and the pan is the punchline's timing: the heap arrives only once the line has run long enough to feel pointless.

Motion: `▃▂▁▁▁▁▁▁▁▁▅▄▅▅▅▅▅▅▅▅▅`

- 00:20.00 `motion/million/f-001.webp` ▃
- 00:20.25 `motion/million/f-002.webp` ▂
- 00:20.50 `motion/million/f-003.webp` ▁
- 00:20.75 `motion/million/f-004.webp` ▁
- 00:21.00 `motion/million/f-005.webp` ▁
- 00:21.25 `motion/million/f-006.webp` ▁
- 00:21.50 `motion/million/f-007.webp` ▁
- 00:21.75 `motion/million/f-008.webp` ▁
- 00:22.00 `motion/million/f-009.webp` ▁
- 00:22.25 `motion/million/f-010.webp` ▁
- 00:22.50 `motion/million/f-011.webp` ▅
- 00:22.75 `motion/million/f-012.webp` ▄
- 00:23.00 `motion/million/f-013.webp` ▅
- 00:23.25 `motion/million/f-014.webp` ▅
- 00:23.50 `motion/million/f-015.webp` ▅
- 00:23.75 `motion/million/f-016.webp` ▅
- 00:24.00 `motion/million/f-017.webp` ▅
- 00:24.25 `motion/million/f-018.webp` ▅
- 00:24.50 `motion/million/f-019.webp` ▅
- 00:24.75 `motion/million/f-020.webp` ▅
- 00:25.00 `motion/million/f-021.webp` ▅

### 04. Down to the calendar, the X, and Employment Mart

00:31.00–00:35.50 (4.50 s) · 28 frames at 6 fps, 0.167 s apart · tilt, stamp, rise in

At 31.3 the camera tilts down off the card for reason two and finds the clip-art calendar sitting beneath it. It holds while a red X lands on Tuesday at about 32.3, with no scale or bounce, just there on the next frame. At 34.0 the camera tilts down again; the calendar leaves the top as EMPLOYMENT MART rises from the bottom, settled by 35.0. The canvas is laid out like a page, and the camera reads it top to bottom.

Motion: `▁▁▁▁▆▇▁▁▁▁▁▁▁▁▁▁▁▆▆▅▆▆▆▆▆▁▁▁`

- 00:31.00 `motion/calendar/f-001.webp` ▁
- 00:31.17 `motion/calendar/f-002.webp` ▁
- 00:31.33 `motion/calendar/f-003.webp` ▁
- 00:31.50 `motion/calendar/f-004.webp` ▁
- 00:31.67 `motion/calendar/f-005.webp` ▆
- 00:31.83 `motion/calendar/f-006.webp` ▇
- 00:32.00 `motion/calendar/f-007.webp` ▁
- 00:32.17 `motion/calendar/f-008.webp` ▁
- 00:32.33 `motion/calendar/f-009.webp` ▁
- 00:32.50 `motion/calendar/f-010.webp` ▁
- 00:32.67 `motion/calendar/f-011.webp` ▁
- 00:32.83 `motion/calendar/f-012.webp` ▁
- 00:33.00 `motion/calendar/f-013.webp` ▁
- 00:33.17 `motion/calendar/f-014.webp` ▁
- 00:33.33 `motion/calendar/f-015.webp` ▁
- 00:33.50 `motion/calendar/f-016.webp` ▁
- 00:33.67 `motion/calendar/f-017.webp` ▁
- 00:33.83 `motion/calendar/f-018.webp` ▆
- 00:34.00 `motion/calendar/f-019.webp` ▆
- 00:34.17 `motion/calendar/f-020.webp` ▅
- 00:34.33 `motion/calendar/f-021.webp` ▆
- 00:34.50 `motion/calendar/f-022.webp` ▆
- 00:34.67 `motion/calendar/f-023.webp` ▆
- 00:34.83 `motion/calendar/f-024.webp` ▆
- 00:35.00 `motion/calendar/f-025.webp` ▆
- 00:35.17 `motion/calendar/f-026.webp` ▁
- 00:35.33 `motion/calendar/f-027.webp` ▁
- 00:35.50 `motion/calendar/f-028.webp` ▁

### 05. A whip pan past an Internet Explorer 6 ad

00:43.50–00:45.25 (1.75 s) · 22 frames at 12 fps, 0.083 s apart · whip pan, motion blur, background gag

From the Form Q-83 close-up, the camera whips left at about 43.6. In the blur a full-color 'Download Internet Explorer 6 Now!' ad, pasted on the canvas between the form and the URL card, crosses the frame from left to right in under a second, and the camera lands on the URL card by 44.9 as the voice says 'navigate your browser to the following address'. The ad is never mentioned; it is there for whoever pauses.

Motion: `▇▇▇▆▆▆▆▆▆▅▅▅▆▆▆▆▆▆▆▆▆▆`

- 00:43.50 `motion/whip-to-url/f-001.webp` ▇
- 00:43.58 `motion/whip-to-url/f-002.webp` ▇
- 00:43.67 `motion/whip-to-url/f-003.webp` ▇
- 00:43.75 `motion/whip-to-url/f-004.webp` ▆
- 00:43.83 `motion/whip-to-url/f-005.webp` ▆
- 00:43.92 `motion/whip-to-url/f-006.webp` ▆
- 00:44.00 `motion/whip-to-url/f-007.webp` ▆
- 00:44.08 `motion/whip-to-url/f-008.webp` ▆
- 00:44.17 `motion/whip-to-url/f-009.webp` ▆
- 00:44.25 `motion/whip-to-url/f-010.webp` ▅
- 00:44.33 `motion/whip-to-url/f-011.webp` ▅
- 00:44.42 `motion/whip-to-url/f-012.webp` ▅
- 00:44.50 `motion/whip-to-url/f-013.webp` ▆
- 00:44.58 `motion/whip-to-url/f-014.webp` ▆
- 00:44.67 `motion/whip-to-url/f-015.webp` ▆
- 00:44.75 `motion/whip-to-url/f-016.webp` ▆
- 00:44.83 `motion/whip-to-url/f-017.webp` ▆
- 00:44.92 `motion/whip-to-url/f-018.webp` ▆
- 00:45.00 `motion/whip-to-url/f-019.webp` ▆
- 00:45.08 `motion/whip-to-url/f-020.webp` ▆
- 00:45.17 `motion/whip-to-url/f-021.webp` ▆
- 00:45.25 `motion/whip-to-url/f-022.webp` ▆

### 06. The camera reads the URL

00:46.25–00:48.25 (2.00 s) · 17 frames at 8 fps, 0.125 s apart · push in, scan, snap back

At 46.6 the camera jumps in close on the URL so the italic serif lines fill the frame, then slides right across them, the start of each line leaving the left edge, as if the viewer is being made to copy it out. By 47.9 it snaps back to the full card. The voice, over the scan: 'Typing it incorrectly will put your computer at risk of spam.'

Motion: `▁▁▁▆▆▇▇▇▇▇▇▇▇▆▆▁▁`

- 00:46.25 `motion/url-read/f-001.webp` ▁
- 00:46.38 `motion/url-read/f-002.webp` ▁
- 00:46.50 `motion/url-read/f-003.webp` ▁
- 00:46.62 `motion/url-read/f-004.webp` ▆
- 00:46.75 `motion/url-read/f-005.webp` ▆
- 00:46.88 `motion/url-read/f-006.webp` ▇
- 00:47.00 `motion/url-read/f-007.webp` ▇
- 00:47.12 `motion/url-read/f-008.webp` ▇
- 00:47.25 `motion/url-read/f-009.webp` ▇
- 00:47.38 `motion/url-read/f-010.webp` ▇
- 00:47.50 `motion/url-read/f-011.webp` ▇
- 00:47.62 `motion/url-read/f-012.webp` ▇
- 00:47.75 `motion/url-read/f-013.webp` ▇
- 00:47.88 `motion/url-read/f-014.webp` ▆
- 00:48.00 `motion/url-read/f-015.webp` ▆
- 00:48.12 `motion/url-read/f-016.webp` ▁
- 00:48.25 `motion/url-read/f-017.webp` ▁

### 07. Spinning into the System Administrator's address

00:54.00–00:58.25 (4.25 s) · 27 frames at 6 fps, 0.167 s apart · rotate, zoom, pixel type

The street map of Lenexa enters from the top, and from 54.5 the camera rotates and zooms at once: by 55.0 the map has turned a quarter turn, and by 55.7 it is close and the street names are upside down. Over them an address block in a pixel font stays level and readable, held to 56.3: 'Office of the System Administrator'. Then the camera spins back out, the map level and small again by 58.0. It is the first rotating move in the film, and it lands on its most bureaucratic line.

Motion: `▆▆▆▅▆▆▇▇▇▇█▇▅▄▃▅▇▇▇▇▇▆▆▅▃▂▅`

- 00:54.00 `motion/map-spin/f-001.webp` ▆
- 00:54.17 `motion/map-spin/f-002.webp` ▆
- 00:54.33 `motion/map-spin/f-003.webp` ▆
- 00:54.50 `motion/map-spin/f-004.webp` ▅
- 00:54.67 `motion/map-spin/f-005.webp` ▆
- 00:54.83 `motion/map-spin/f-006.webp` ▆
- 00:55.00 `motion/map-spin/f-007.webp` ▇
- 00:55.17 `motion/map-spin/f-008.webp` ▇
- 00:55.33 `motion/map-spin/f-009.webp` ▇
- 00:55.50 `motion/map-spin/f-010.webp` ▇
- 00:55.67 `motion/map-spin/f-011.webp` █
- 00:55.83 `motion/map-spin/f-012.webp` ▇
- 00:56.00 `motion/map-spin/f-013.webp` ▅
- 00:56.17 `motion/map-spin/f-014.webp` ▄
- 00:56.33 `motion/map-spin/f-015.webp` ▃
- 00:56.50 `motion/map-spin/f-016.webp` ▅
- 00:56.67 `motion/map-spin/f-017.webp` ▇
- 00:56.83 `motion/map-spin/f-018.webp` ▇
- 00:57.00 `motion/map-spin/f-019.webp` ▇
- 00:57.17 `motion/map-spin/f-020.webp` ▇
- 00:57.33 `motion/map-spin/f-021.webp` ▇
- 00:57.50 `motion/map-spin/f-022.webp` ▆
- 00:57.67 `motion/map-spin/f-023.webp` ▆
- 00:57.83 `motion/map-spin/f-024.webp` ▅
- 00:58.00 `motion/map-spin/f-025.webp` ▃
- 00:58.17 `motion/map-spin/f-026.webp` ▂
- 00:58.33 `motion/map-spin/f-027.webp` ▅

### 08. Whipping back up through reason three

01:01.75–01:03.50 (1.75 s) · 22 frames at 12 fps, 0.083 s apart · whip tilt, motion blur, layout reveal

From the census form at the bottom of reason three, the camera whips back up the canvas in about half a second instead of cutting. Each frame catches a row of what came before: the census form (62.25), then the map, the error dialog and the end of the URL (62.4), then the printers folder, the 'Access the Q-83 form at:' card and the Internet Explorer 6 ad (62.6), and then the card for reason three and Form Q-83, where it pushes in by 63.0. The voice is going back to the form ('Once your Q-83 form is printed'), and the camera goes back with it, showing for a blink that the whole reason is laid out in rows on one page.

Motion: `▃▆▆▆▅▅▅▅▅▅▆▆▇▇▇▇▇▇▇▆▆▅`

- 01:01.75 `motion/board-reveal/f-001.webp` ▃
- 01:01.83 `motion/board-reveal/f-002.webp` ▆
- 01:01.92 `motion/board-reveal/f-003.webp` ▆
- 01:02.00 `motion/board-reveal/f-004.webp` ▆
- 01:02.08 `motion/board-reveal/f-005.webp` ▅
- 01:02.17 `motion/board-reveal/f-006.webp` ▅
- 01:02.25 `motion/board-reveal/f-007.webp` ▅
- 01:02.33 `motion/board-reveal/f-008.webp` ▅
- 01:02.42 `motion/board-reveal/f-009.webp` ▅
- 01:02.50 `motion/board-reveal/f-010.webp` ▅
- 01:02.58 `motion/board-reveal/f-011.webp` ▆
- 01:02.67 `motion/board-reveal/f-012.webp` ▆
- 01:02.75 `motion/board-reveal/f-013.webp` ▇
- 01:02.83 `motion/board-reveal/f-014.webp` ▇
- 01:02.92 `motion/board-reveal/f-015.webp` ▇
- 01:03.00 `motion/board-reveal/f-016.webp` ▇
- 01:03.08 `motion/board-reveal/f-017.webp` ▇
- 01:03.17 `motion/board-reveal/f-018.webp` ▇
- 01:03.25 `motion/board-reveal/f-019.webp` ▇
- 01:03.33 `motion/board-reveal/f-020.webp` ▆
- 01:03.42 `motion/board-reveal/f-021.webp` ▆
- 01:03.50 `motion/board-reveal/f-022.webp` ▅

### 09. Cutting through the fine print into the corridor

01:04.75–01:10.50 (5.75 s) · 35 frames at 6 fps, 0.167 s apart · hard cut, scale jump, pan, footage panel

Three of the detected hard cuts land here, at 64.9, 65.6 and 67.1, and between them the camera jumps and slides so fast that nearly every sampled frame is a new crop of the same form: the cost categories, the profit factors, the markup-rate lines, contracting-officer approval. At 68.3 it pulls back to the whole form, and from 68.7 it pans right, where a rectangle of night-vision corridor footage is pasted beside it on the canvas. By 70.0 the footage fills the frame and the 'DEPT. OF REGISTRARS' lower third settles in. The film enters live footage by panning onto it, not by cutting to it.

Motion: `▁██▇▇███████▇▇██████▆▇▇▇▇▇▇▇▇▇▇▇▇▇▇`

- 01:04.75 `motion/form-cuts/f-001.webp` ▁
- 01:04.92 `motion/form-cuts/f-002.webp` █
- 01:05.08 `motion/form-cuts/f-003.webp` █
- 01:05.25 `motion/form-cuts/f-004.webp` ▇
- 01:05.42 `motion/form-cuts/f-005.webp` ▇
- 01:05.58 `motion/form-cuts/f-006.webp` █
- 01:05.75 `motion/form-cuts/f-007.webp` █
- 01:05.92 `motion/form-cuts/f-008.webp` █
- 01:06.08 `motion/form-cuts/f-009.webp` █
- 01:06.25 `motion/form-cuts/f-010.webp` █
- 01:06.42 `motion/form-cuts/f-011.webp` █
- 01:06.58 `motion/form-cuts/f-012.webp` █
- 01:06.75 `motion/form-cuts/f-013.webp` ▇
- 01:06.92 `motion/form-cuts/f-014.webp` ▇
- 01:07.08 `motion/form-cuts/f-015.webp` █
- 01:07.25 `motion/form-cuts/f-016.webp` █
- 01:07.42 `motion/form-cuts/f-017.webp` █
- 01:07.58 `motion/form-cuts/f-018.webp` █
- 01:07.75 `motion/form-cuts/f-019.webp` █
- 01:07.92 `motion/form-cuts/f-020.webp` █
- 01:08.08 `motion/form-cuts/f-021.webp` ▆
- 01:08.25 `motion/form-cuts/f-022.webp` ▇
- 01:08.42 `motion/form-cuts/f-023.webp` ▇
- 01:08.58 `motion/form-cuts/f-024.webp` ▇
- 01:08.75 `motion/form-cuts/f-025.webp` ▇
- 01:08.92 `motion/form-cuts/f-026.webp` ▇
- 01:09.08 `motion/form-cuts/f-027.webp` ▇
- 01:09.25 `motion/form-cuts/f-028.webp` ▇
- 01:09.42 `motion/form-cuts/f-029.webp` ▇
- 01:09.58 `motion/form-cuts/f-030.webp` ▇
- 01:09.75 `motion/form-cuts/f-031.webp` ▇
- 01:09.92 `motion/form-cuts/f-032.webp` ▇
- 01:10.08 `motion/form-cuts/f-033.webp` ▇
- 01:10.25 `motion/form-cuts/f-034.webp` ▇
- 01:10.42 `motion/form-cuts/f-035.webp` ▇

### 10. The corridor goes dark and the whispers multiply

01:12.00–01:24.50 (12.50 s) · 26 frames at 2 fps, 0.500 s apart · tint, drift, fade to black, small type

The camera drifts and tilts through the green corridor while the lower third slides off the top at 73.5. From 73.0 small grey serif lines appear on the floor and ceiling, 'what are you doing? you do not belong here', three or four copies at once, at different sizes. The picture darkens as the camera tilts up to the ceiling tiles (75–76), sweeps a row of office doors (77–79), and sinks to near black by 80.5 with one whisper left. A glowing tunnel of corridor fades up from 82.0, and at 84.0 a man in glasses is staring into the lens. The type is barely legible at full screen, so it reads as something overheard.

Motion: `▄▆▆▅▅▄▄▄▄▄▄▄▅▅▅▅▅▄▃▂▄▅▄▆▅▁`

- 01:12.00 `motion/corridor/f-001.webp` ▄
- 01:12.50 `motion/corridor/f-002.webp` ▆
- 01:13.00 `motion/corridor/f-003.webp` ▆
- 01:13.50 `motion/corridor/f-004.webp` ▅
- 01:14.00 `motion/corridor/f-005.webp` ▅
- 01:14.50 `motion/corridor/f-006.webp` ▄
- 01:15.00 `motion/corridor/f-007.webp` ▄
- 01:15.50 `motion/corridor/f-008.webp` ▄
- 01:16.00 `motion/corridor/f-009.webp` ▄
- 01:16.50 `motion/corridor/f-010.webp` ▄
- 01:17.00 `motion/corridor/f-011.webp` ▄
- 01:17.50 `motion/corridor/f-012.webp` ▄
- 01:18.00 `motion/corridor/f-013.webp` ▅
- 01:18.50 `motion/corridor/f-014.webp` ▅
- 01:19.00 `motion/corridor/f-015.webp` ▅
- 01:19.50 `motion/corridor/f-016.webp` ▅
- 01:20.00 `motion/corridor/f-017.webp` ▅
- 01:20.50 `motion/corridor/f-018.webp` ▄
- 01:21.00 `motion/corridor/f-019.webp` ▃
- 01:21.50 `motion/corridor/f-020.webp` ▂
- 01:22.00 `motion/corridor/f-021.webp` ▄
- 01:22.50 `motion/corridor/f-022.webp` ▅
- 01:23.00 `motion/corridor/f-023.webp` ▄
- 01:23.50 `motion/corridor/f-024.webp` ▆
- 01:24.00 `motion/corridor/f-025.webp` ▅
- 01:24.50 `motion/corridor/f-026.webp` ▁

### 11. The footage slides away and the canvas comes back

01:26.50–01:28.25 (1.75 s) · 22 frames at 12 fps, 0.083 s apart · pan, footage panel, return

At about 86.9 a strip of mint appears at the right edge of the staring face, and the camera pans right off the footage rectangle, the corridor sliding out left. The card for reason four enters at 87.4 and is centered by 88.0, on 'People will think you are strange'. As at 1:09, the footage was a panel on the canvas all along.

Motion: `▁▂▆▆▆▆▆▇▆▆▆▆▆▆▆▆▆▆▆▆▇▆`

- 01:26.50 `motion/exit-to-card/f-001.webp` ▁
- 01:26.58 `motion/exit-to-card/f-002.webp` ▂
- 01:26.67 `motion/exit-to-card/f-003.webp` ▆
- 01:26.75 `motion/exit-to-card/f-004.webp` ▆
- 01:26.83 `motion/exit-to-card/f-005.webp` ▆
- 01:26.92 `motion/exit-to-card/f-006.webp` ▆
- 01:27.00 `motion/exit-to-card/f-007.webp` ▆
- 01:27.08 `motion/exit-to-card/f-008.webp` ▇
- 01:27.17 `motion/exit-to-card/f-009.webp` ▆
- 01:27.25 `motion/exit-to-card/f-010.webp` ▆
- 01:27.33 `motion/exit-to-card/f-011.webp` ▆
- 01:27.42 `motion/exit-to-card/f-012.webp` ▆
- 01:27.50 `motion/exit-to-card/f-013.webp` ▆
- 01:27.58 `motion/exit-to-card/f-014.webp` ▆
- 01:27.67 `motion/exit-to-card/f-015.webp` ▆
- 01:27.75 `motion/exit-to-card/f-016.webp` ▆
- 01:27.83 `motion/exit-to-card/f-017.webp` ▆
- 01:27.92 `motion/exit-to-card/f-018.webp` ▆
- 01:28.00 `motion/exit-to-card/f-019.webp` ▆
- 01:28.08 `motion/exit-to-card/f-020.webp` ▆
- 01:28.17 `motion/exit-to-card/f-021.webp` ▇
- 01:28.25 `motion/exit-to-card/f-022.webp` ▆

### 12. Down to the candidates, and in on 'the very worst one'

01:47.50–01:57.75 (10.25 s) · 32 frames at 3 fps, 0.333 s apart · tilt, push in, cut-outs, exit

At 107.7 the camera tilts down from the card for reason five to the cut-out faces, eight photos in two loose rows, and holds there through 'All of them' and 'Especially this one' (to about 110.7). Then a slow push-in starts, drifting down and to the right toward Sanders; Clinton and the blonde face at right slide off either edge by 113.7, and his smiling photo fills the frame by 114.3 on 'He's the very worst one'. At 116.3 the camera tilts down past him, his tie and jacket leaving the top of the frame at 117.0, and the card for reason six is already rising beneath.

Motion: `▅▆▇▄▁▂▃▃▄▄▅▅▅▆▆▆▆▆▅▅▄▄▃▂▁▁▃▇▆▆▆▆`

- 01:47.50 `motion/faces/f-001.webp` ▅
- 01:47.83 `motion/faces/f-002.webp` ▆
- 01:48.17 `motion/faces/f-003.webp` ▇
- 01:48.50 `motion/faces/f-004.webp` ▄
- 01:48.83 `motion/faces/f-005.webp` ▁
- 01:49.17 `motion/faces/f-006.webp` ▂
- 01:49.50 `motion/faces/f-007.webp` ▃
- 01:49.83 `motion/faces/f-008.webp` ▃
- 01:50.17 `motion/faces/f-009.webp` ▄
- 01:50.50 `motion/faces/f-010.webp` ▄
- 01:50.83 `motion/faces/f-011.webp` ▅
- 01:51.17 `motion/faces/f-012.webp` ▅
- 01:51.50 `motion/faces/f-013.webp` ▅
- 01:51.83 `motion/faces/f-014.webp` ▆
- 01:52.17 `motion/faces/f-015.webp` ▆
- 01:52.50 `motion/faces/f-016.webp` ▆
- 01:52.83 `motion/faces/f-017.webp` ▆
- 01:53.17 `motion/faces/f-018.webp` ▆
- 01:53.50 `motion/faces/f-019.webp` ▅
- 01:53.83 `motion/faces/f-020.webp` ▅
- 01:54.17 `motion/faces/f-021.webp` ▄
- 01:54.50 `motion/faces/f-022.webp` ▄
- 01:54.83 `motion/faces/f-023.webp` ▃
- 01:55.17 `motion/faces/f-024.webp` ▂
- 01:55.50 `motion/faces/f-025.webp` ▁
- 01:55.83 `motion/faces/f-026.webp` ▁
- 01:56.17 `motion/faces/f-027.webp` ▃
- 01:56.50 `motion/faces/f-028.webp` ▇
- 01:56.83 `motion/faces/f-029.webp` ▆
- 01:57.17 `motion/faces/f-030.webp` ▆
- 01:57.50 `motion/faces/f-031.webp` ▆
- 01:57.83 `motion/faces/f-032.webp` ▆

### 13. A pie chart built one wrong wedge at a time

02:01.00–02:15.75 (14.75 s) · 31 frames at 2 fps, 0.500 s apart · hold, snap on, tilt, chart

The camera arrives on '10,000 Americans cast a vote for President' over a solid black disc by 121.5 and holds still for five seconds. A white sliver labeled '1 vote = 1%' snaps on at about 126.8, on 'your vote only counts for 1%'. An orange 'Electoral stuff' wedge snaps on at 130.5 on 'Plus the electoral stuff', and at 133.3 a red 'All of the government problems' wedge appears over the label as the camera tilts, so the title runs down the right side at a steep angle. The chart never animates; only the camera reacts. At 135.7 the film cuts away to handheld phone footage.

Motion: `▆▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▁▁▁▁▃▆▃▁▁▆▆`

- 02:01.00 `motion/pie/f-001.webp` ▆
- 02:01.50 `motion/pie/f-002.webp` ▅
- 02:02.00 `motion/pie/f-003.webp` ▁
- 02:02.50 `motion/pie/f-004.webp` ▁
- 02:03.00 `motion/pie/f-005.webp` ▁
- 02:03.50 `motion/pie/f-006.webp` ▁
- 02:04.00 `motion/pie/f-007.webp` ▁
- 02:04.50 `motion/pie/f-008.webp` ▁
- 02:05.00 `motion/pie/f-009.webp` ▁
- 02:05.50 `motion/pie/f-010.webp` ▁
- 02:06.00 `motion/pie/f-011.webp` ▁
- 02:06.50 `motion/pie/f-012.webp` ▁
- 02:07.00 `motion/pie/f-013.webp` ▁
- 02:07.50 `motion/pie/f-014.webp` ▁
- 02:08.00 `motion/pie/f-015.webp` ▁
- 02:08.50 `motion/pie/f-016.webp` ▁
- 02:09.00 `motion/pie/f-017.webp` ▁
- 02:09.50 `motion/pie/f-018.webp` ▁
- 02:10.00 `motion/pie/f-019.webp` ▁
- 02:10.50 `motion/pie/f-020.webp` ▂
- 02:11.00 `motion/pie/f-021.webp` ▁
- 02:11.50 `motion/pie/f-022.webp` ▁
- 02:12.00 `motion/pie/f-023.webp` ▁
- 02:12.50 `motion/pie/f-024.webp` ▁
- 02:13.00 `motion/pie/f-025.webp` ▃
- 02:13.50 `motion/pie/f-026.webp` ▆
- 02:14.00 `motion/pie/f-027.webp` ▃
- 02:14.50 `motion/pie/f-028.webp` ▁
- 02:15.00 `motion/pie/f-029.webp` ▁
- 02:15.50 `motion/pie/f-030.webp` ▆
- 02:16.00 `motion/pie/f-031.webp` ▆

### 14. A phone filming a laptop, and the end card

02:15.50–02:30.00 (14.50 s) · 30 frames at 2 fps, 0.500 s apart · handheld, screen recording, typing, rise in

The polished canvas is replaced by a phone held up to a laptop screen, swaying, soft and catching glare. Searches are typed live: 'examples of government problems' (from 135.7), 'CORRUPTION' in spaced capitals (138.6), 'what is voter fraud' (140.5), 'orwellian nightmare definition' with results (143.0), and, after the voice has stopped at 2:24, 'what color pill in the matrix was the good one' (145.5). Two more hard cuts, at 138.6 and 148.5, carry it out. At 148.5 the mint returns and the end card rises from the bottom, settled by 149.5.

Motion: `▆▆▆▅▅▅▆▅▅▅▄▅▅▅▅▆▇▆▅▅▆▅▅▄▅▅▅▅▆▅`

- 02:15.50 `motion/searches/f-001.webp` ▆
- 02:16.00 `motion/searches/f-002.webp` ▆
- 02:16.50 `motion/searches/f-003.webp` ▆
- 02:17.00 `motion/searches/f-004.webp` ▅
- 02:17.50 `motion/searches/f-005.webp` ▅
- 02:18.00 `motion/searches/f-006.webp` ▅
- 02:18.50 `motion/searches/f-007.webp` ▆
- 02:19.00 `motion/searches/f-008.webp` ▅
- 02:19.50 `motion/searches/f-009.webp` ▅
- 02:20.00 `motion/searches/f-010.webp` ▅
- 02:20.50 `motion/searches/f-011.webp` ▄
- 02:21.00 `motion/searches/f-012.webp` ▅
- 02:21.50 `motion/searches/f-013.webp` ▅
- 02:22.00 `motion/searches/f-014.webp` ▅
- 02:22.50 `motion/searches/f-015.webp` ▅
- 02:23.00 `motion/searches/f-016.webp` ▆
- 02:23.50 `motion/searches/f-017.webp` ▇
- 02:24.00 `motion/searches/f-018.webp` ▆
- 02:24.50 `motion/searches/f-019.webp` ▅
- 02:25.00 `motion/searches/f-020.webp` ▅
- 02:25.50 `motion/searches/f-021.webp` ▆
- 02:26.00 `motion/searches/f-022.webp` ▅
- 02:26.50 `motion/searches/f-023.webp` ▅
- 02:27.00 `motion/searches/f-024.webp` ▄
- 02:27.50 `motion/searches/f-025.webp` ▅
- 02:28.00 `motion/searches/f-026.webp` ▅
- 02:28.50 `motion/searches/f-027.webp` ▅
- 02:29.00 `motion/searches/f-028.webp` ▅
- 02:29.50 `motion/searches/f-029.webp` ▆
- 02:30.00 `motion/searches/f-030.webp` ▅

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` The film opens on wallpaper: molars and the triangle-and-serpent emblem of dentistry, faded into a flat mint. Nothing in the script is about teeth.
- 00:03.00 `seconds/second-00004.webp` The title, 'Why you shouldn't vote', in heavy geometric sans between two hairline rules, ringed by cut-out photos of floss, a toothbrush, a hammer and a handsaw. Every photo is tinted into the same dark green, so clip art from anywhere reads as one set.
- 00:07.00 `seconds/second-00008.webp` The template for every reason: a huge numeral, a two-line claim in bold sans under a rule, and a thin-ruled box with an italic serif caption, like a mail-order catalog. Here the product is 'Voting stones', three gems.
- 00:12.00 `seconds/second-00013.webp` 'Voter fees by state, 2014 Presidential election': a plain outline map with a dollar figure in every state, and Cuba drawn in at $68. There was no presidential election in 2014 and there is no fee to vote. A tiny $1 bill already sits at right, waiting for its line.
- 00:17.00 `seconds/second-00018.webp` The camera has swung right and pushed in on that parked dollar bill, now filling the middle of the frame.
- 00:21.00 `seconds/second-00022.webp` Pulled back: the bill has become a row of bills running out to sea off the East Coast, the line '100 feet long'.
- 00:24.00 `seconds/second-00025.webp` At the end of the row, a heap of cash and '= $1,000,000' in italic serif. The voice: 'And if you have a lot more money than that, then you have $1 million.'
- 00:30.00 `seconds/second-00031.webp` '2. You'll probably be stuck at work', with 'Voting tea': a phone dunked in a teacup.
- 00:33.00 `seconds/second-00034.webp` A clip-art desk calendar headed 'welcome to this calendar', its weekdays reading S ? M T W T F S, with a red X stamped on Tuesday.
- 00:36.00 `seconds/second-00037.webp` EMPLOYMENT MART, a strip-mall storefront crushed to two tones, slides up from the bottom of the canvas.
- 00:39.00 `seconds/second-00040.webp` '3. You haven't filled out your Q-83 form'. The catalog box holds 'The Incredible Voting Dog', which is a cinder block.
- 00:43.00 `seconds/second-00044.webp` FORM Q-83, a dense government procurement form with numbered boxes for report number, contracting office code and DUNS number. It stays white and untinted, the first thing on the canvas not in mint.
- 00:45.00 `seconds/second-00046.webp` 'Access the Q-83 form at:' over a URL seven lines long in small italic serif, full of 'proxy', 'portal', 'DEPARTMENT_PORTAL.aspx' and a run of zeros.
- 00:47.00 `seconds/second-00048.webp` The camera pushes in until the URL is huge and reads across it from left to right, as if someone is copying it out.
- 00:52.00 `seconds/second-00053.webp` A Windows printers folder over an 'IBM Rational Portfolio Manager' dialog: 'Database error. Please contact your System Administrator'. Real interface pieces, pasted flat on the mint.
- 00:56.00 `seconds/second-00057.webp` The camera has spun into a street map until the street names are upside down, and an address block in a pixel font sits level over them: 'Office of the System Administrator, c/o Melanie McKenzie, 801-C W 95th Street, Lenexa, KS 66219'. The map keeps its own tan and blue, untinted.
- 01:00.00 `seconds/second-00061.webp` Below the map, the 2010 Census form, 'Start here', for the phone number 'associated with your name in the most recent census'.
- 01:02.00 `seconds/second-00063.webp` A fast whip back up the canvas retraces reason three in half a second: the census form, then the map and the error dialog, then the printers folder, the URL card and the Internet Explorer 6 ad, all small and laid out in rows on one mint field, before the camera lands on Form Q-83.
- 01:06.00 `seconds/second-00067.webp` Hard cuts across the form's fine print, 'TOTAL COSTS', 'PROFIT', 'MARKUP RATE (Line 32 + 33 divided by 31)', each a different scale and crop.
- 01:11.00 `seconds/second-00072.webp` The canvas gives way to footage: an empty office corridor tinted night-vision green, with a lower third, 'DEPT. OF REGISTRARS, EST. 1247', between two swords, an all-seeing eye and a square and compass.
- 01:15.00 `seconds/second-00076.webp` The corridor has gone almost black. Tiny serif lines repeat across the ceiling: 'what are you doing? you do not belong here'.
- 01:22.00 `seconds/second-00083.webp` A long corridor glowing green at the end of a dark tunnel, the horror-film shot under 'they will all talk about you as though you are stupid'.
- 01:24.00 `seconds/second-00085.webp` A man in glasses stares straight into the lens from the corridor as the voice says 'They will all see you.'
- 01:28.00 `seconds/second-00089.webp` Back on the mint: '4. People will think you are strange', with 'Voter's Helper™', a shovel.
- 01:32.00 `seconds/second-00093.webp` The footage of people 'lined up to vote' is shown as an inverted, blue negative: here a high angle on cars along a curving lane.
- 01:37.00 `seconds/second-00098.webp` Inverted again: the backs of people standing in a line in a meeting room. 'They're just standing around doing nothing.'
- 01:41.00 `seconds/second-00102.webp` A poll worker at a table, still in negative, his face lit like an X-ray.
- 01:45.00 `seconds/second-00106.webp` '5. All of the candidates are bad', with 'Voter's supper': a fork next to an electrical outlet.
- 01:50.00 `seconds/second-00111.webp` Candidate photos cut out as rough polygons: Trump, Cruz, Kasich, Clinton and Sanders, plus three faces the voice never mentions. A handwritten-looking aside sits between them: 'NOTE TO JON: remember to take these guys out, they aren't in the race anymore. they were too handsome. love, jon'. Its arrows point at Cruz and Kasich, who left the race on May 3 and May 4, 2016; the video went up on May 4.
- 01:54.00 `seconds/second-00115.webp` The push-in ends filling the frame with Sanders's smiling photo: 'He's the very worst one.'
- 01:58.00 `seconds/second-00119.webp` '6. The math just doesn't add up', with 'Emergency voting kit': a Dracula DVD and a crowbar.
- 02:04.00 `seconds/second-00125.webp` '10,000 Americans cast a vote for President' over a solid black disc. The disc holds for five seconds before anything is added.
- 02:07.00 `seconds/second-00128.webp` A white sliver appears, labeled '1 vote = 1%', a fraction of the disc nowhere near one percent.
- 02:11.00 `seconds/second-00132.webp` An orange wedge, 'Electoral stuff', arrives on the voice's 'Plus the electoral stuff, so who cares.'
- 02:14.00 `seconds/second-00135.webp` A red wedge, 'All of the government problems', overlaps the label, and the camera tilts until the title is printed on a slant.
- 02:16.00 `seconds/second-00137.webp` Hard cut to a phone held up to a laptop: a Google search typed live, 'examples of government problems', the screen soft and catching glare.
- 02:19.00 `seconds/second-00140.webp` 'CORRUPTION' typed in spaced capitals, close and out of focus.
- 02:23.00 `seconds/second-00144.webp` 'orwellian nightmare definition', with real results and '(0.57 seconds)'.
- 02:26.00 `seconds/second-00147.webp` The last search, after the voice has finished: 'what color pill in the matrix was the good one'.
- 02:30.00 `seconds/second-00151.webp` End card: 'Presented by Jon Bois at A HUGE DOG', a sauropod engraving between the words, and 'Please do not share this video with anyone. Sharing is a form of theft. Besides, I made it just for you.'
