# Motion notes: How to Make an Artist Book: From Sketch to Finished Book with Perfect Binding

The Museum of Modern Art · 27:01.94 · https://www.youtube.com/watch?v=gP-ysMxLAOc

MoMA's studio demonstration is live action with a quiet, museum-like system laid over it. Rhea Karam's magenta T-shirt is the brightest color in a white studio, and the film cuts between three setups: a locked-off wide of her talking at the table, overhead shots of her hands on a white surface, and low close-ups in shallow focus. Eight chapter titles rise into the top left from a hidden baseline in bold white sans, and every outside reference, including her own past books, is a cutout on white with a small black caption at bottom left. The motion worth studying is the hands: unfolding, scoring, taping, peeling and pressing, usually shown by cutting between two scales of the same gesture.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▁▁▁▁▅▅▅▅▄▅▅▆▅▅▅▅▁▃▁▅▁▂▄▂▂▂▂▂▅▁▁▁▅▃▆▅▅▄▄▄▄▅▄▄▄▄▄▆▆▆▆▅▅▅▂▅▁▁▅▂
01:00  ▅▃▅▄▄▆▅▂▂▄▁▁▅▃▄▄▅▃▅▃▃▃▅▅▂▅▃▅▅▅▆▅▇▂▂▁▂▂▂▅▁▁▄▁▄▁▄▁▄▅▁▁▄▂▁▄▁▁▄▂
02:00  ▂▂▂▂▃▂▂▅▅▅▅▄▃▅▅▆▆▅▅▅▂▂▁▅▁▁▁▄▅▄▅▁▄▄▅▄▅▃▅▁▂▁▁▃▅▂▃▃▃▃▃▅▅▄▄▅▅▅▅▁
03:00  ▁▄▂▃▃▂▅▂▂▂▁▄▁▃▁▁▂▅▃▃▁▂▂▃▅▄▂▄▃▂▄▁▁▂▅▅▄▄▅▄▄▄▅▄▃▄▅▄▅▅▅▃▅▁▅▄▃▄▅▁
04:00  ▂▁▂▄▃▂▅▁▁▅▄▄▆▅▃▅▇▆▅▄▅▂▆▅▅▄▂▄▅▃▆▆▃▆▆▄▅▅▅▂▁▁▁▁▂▂▂▂▄▃▄▃▃▃▄▅▂▃▂▂
05:00  ▁▂▅▆▆▆▄▅▇▆▅▆▆▆▇▇▆▆▃▅▃▅▂▂▃▄▁▄▂▂▂▁▆▅▃▆▄▄▄▅▄▅▅▁▂▁▁▁▂▃▅▂▁▄▁▂▁▂▄▅
06:00  ▅▅▅▄▄▅▁▄▃▃▃▅▅▄▄▂▅▄▅▅▁▂▅▄▅▅▃▄▆▂▂▂▂▃▂▅▄▄▅▂▂▁▅▁▁▃▁▁▅▁▅▁▁▁▅▁▄▁▁▄
07:00  ▁▄▁▄▂▅▅▅▄▅▅▅▅▁▂▂▂▂▂▅▃▄▄▅▃▃▅▄▆▅▅▅▅▅▅▄▄▃▅▄▃▃▃▄▄▃▅▃▃▃▅▅▅▅▆▅▄▅▄▅
08:00  ▄▃▅▁▁▁▄▁▄▁▁▄▁▁▁▄▁▅▅▅▂▅▄▅▆▄▅▅▅▅▂▄▁▄▅▃▄▅▆▃▃▂▁▁▅▅▄▁▄▅▅▂▂▅▄▄▄▅▄▆
09:00  ▄▅▅▃▂▂▂▅▂▅▁▁▄▁▁▁▄▁▃▁▁▅▂▄▁▅▅▆▄▄▇▆▅▃▅▄▄▂▄▅▄▆▅▄▅▃▄▁▁▁▁▅▅▆▅▄▆▃▃▂
10:00  ▄▂▁▅▅▅▅▆▆▄▄▄▅▅▄▅▂▃▅▂▃▃▅▄▂▄▁▂▁▁▂▂▂▂▅▃▅▂▂▁▁▂▂▂▂▁▅▁▄▁▄▃▂▃▃▅▂▅▂▅
11:00  ▅▄▄▂▄▁▁▄▁▁▁▁▄▂▄▁▁▄▄▅▅▆▄▁▅▆▄▅▅▄▅▂▁▂▁▁▅▄▅▅▂▅▆▅▅▃▆▄▄▄▁▄▂▆▅▂▄▅▂▃
12:00  ▃▃▂▄▂▂▁▂▆▆▄▃▅▂▁▆▆▃▃▄▂▃▅▆▅▄▃▆▅▆▄▅▃▆▅▅▃▅▁▁▁▁▂▂▄▁▁▄▂▃▆▆▄▃▃▄▃▄▃▃
13:00  ▅▅▄▅▆▇▃▅▅▅▂▂▃▅▅▄▅▂▃▅▄▂▃▄▂▁▁▆▆▃▅▄▅▆▅▃▃▃▃▅▂▄▂▅▂▁▁▃▂▂▂▄▅▂▂▂▅▅▅▄
14:00  ▅▅▆▃▄▅▃▃▄▃▃▃▃▅▁▁▅▂▁▄▃▅▃▃▅▃▅▆▁▁▁▁▄▁▁▁▁▁▁▅▄▄▅▃▂▅▄▄▄▂▅▄▄▅▅▂▂▄▅▃
15:00  ▄▅▄▃▂▂▂▃▂▅▆▆▅▃▅▃▃▅▅▅▄▄▂▅▄▄▅▂▂▂▅▄▄▃▂▂▅▂▂▂▂▃▂▅▅▄▃▅▂▃▂▂▃▂▅▂▂▃▅▂
16:00  ▂▁▃▄▅▅▅▅▅▅▄▄▄▄▅▅▆▆▄▄▂▂▃▃▆▅▃▃▅▄▄▃▂▄▃▃▃▂▅▅▆▆▅▅▆▆▆▃▁▃▅▄▄▄▆▅▄▄▅▅
17:00  ▅▅▅▅▆▆▃▅▄▅▅▅▆▅▅▅▅▅▄▄▄▅▅▄▄▃▃▃▄▄▅▁▂▂▂▄▂▂▃▅▄▄▄▄▃▄▃▄▃▃▃▅▅▅▅▄▅▅▅▅
18:00  ▂▁▄▂▁▅▄▄▃▅▆▂▆▄▁▃▆▆▅▄▆▄▂▅▅▄▄▄▃▄▄▆▃▃▃▅▃▂▁▁▄▂▅▅▄▅▁▄▅▆▄▂▂▂▄▅▂▄▅▃
19:00  ▃▅▅▂▁▁▂▂▂▂▂▄▄▃▃▃▃▅▄▂▂▅▅▅▅▄▄▅▅▅▃▅▁▁▁▁▁▁▁▄▁▁▁▁▁▁▁▃▁▁▁▁▃▄▅▅▂▂▂▂
20:00  ▂▂▂▂▂▃▃▅▆▆▆▆▂▁▂▆▅▄▅▂▂▂▂▂▃▆▆▅▂▂▃▂▂▄▃▄▄▅▅▅▄▅▃▂▂▂▁▄▄▄▅▅▅▂▃▄▄▄▅▅
21:00  ▃▅▅▅▄▆▆▄▅▅▄▃▅▄▄▄▃▅▄▆▆▅▂▂▂▅▃▃▄▄▃▄▅▂▁▂▃▂▅▄▂▃▄▄▅▅▄▃▅▃▄▆▅▄▄▂▄▃▅▂
22:00  ▃▃▃▄▄▁▄▄▄▃▅▅▃▄▅▄▅▅▅▃▃▆▅▅▅▅▄▄▅▃▄▄▄▂▄▃▅▅▃▅▄▃▂▂▂▃▅▃▅▅▅▄▅▆▅▄▅▃▂▅
23:00  ▅▅▂▃▅▄▅▅▅▅▂▅▄▃▃▅▂▁▄▁▂▄▂▅▃▄▄▅▂▂▆▅▆▅▅▅▄▅▄▅▃▅▆▆▅▅▅▅▃▅▃▄▄▄▃▄▃▅▅▄
24:00  ▂▂▄▃▄▄▄▃▄▂▂▅▁▃▂▂▂▃▅▅▅▄▅▄▅▂▂▃▅▄▂▁▁▄▃▄▅▄▄▅▅▂▂▅▆▄▅▅▃▅▅▅▅▅▄▄▅▆▅▄
25:00  ▅▅▄▃▃▄▄▄▅▃▃▅▆▄▅▂▂▂▃▂▅▅▅▅▅▃▃▄▄▄▆▅▄▃▅▅▄▄▄▃▄▄▅▅▄▄▄▄▄▄▄▆▂▃▆▅▅▄▅▄
26:00  ▄▄▄▅▁▄▄▃▄▂▂▄▄▃▄▂▃▂▆▆▅▂▂▂▂▂▂▄▄▄▄▄▅▁▂▃▅▂▄▅▂▇▅▅▂▆▁▃▁▃▁▂▁▁▁▁▁▁▁▁
27:00  ▁▁
```

## Sequences

### 01. The cold open is the whole process in eleven seconds

00:04.00–00:15.50 (11.50 s) · 24 frames at 2 fps, 0.500 s apart · montage, inserts, process preview

Before the title, six inserts compress the film: the accordion dummy on the pinboard, both halves of the book fanned open on the table, the spread laid out on screen, a stack of spreads flipped in her hands, the printer feeding a sheet, and her palm pressing a bound book flat. Each holds about two seconds with the camera nearly still, and the hands do all the moving.

Motion: `▅▄▄▅▅▆▄▅▄▄▃▆▆▄▆▅▆▂▆▄▅▅▅▆`

- 00:04.00 `motion/cold-open/f-001.webp` ▅
- 00:04.50 `motion/cold-open/f-002.webp` ▄
- 00:05.00 `motion/cold-open/f-003.webp` ▄
- 00:05.50 `motion/cold-open/f-004.webp` ▅
- 00:06.00 `motion/cold-open/f-005.webp` ▅
- 00:06.50 `motion/cold-open/f-006.webp` ▆
- 00:07.00 `motion/cold-open/f-007.webp` ▄
- 00:07.50 `motion/cold-open/f-008.webp` ▅
- 00:08.00 `motion/cold-open/f-009.webp` ▄
- 00:08.50 `motion/cold-open/f-010.webp` ▄
- 00:09.00 `motion/cold-open/f-011.webp` ▃
- 00:09.50 `motion/cold-open/f-012.webp` ▆
- 00:10.00 `motion/cold-open/f-013.webp` ▆
- 00:10.50 `motion/cold-open/f-014.webp` ▄
- 00:11.00 `motion/cold-open/f-015.webp` ▆
- 00:11.50 `motion/cold-open/f-016.webp` ▅
- 00:12.00 `motion/cold-open/f-017.webp` ▆
- 00:12.50 `motion/cold-open/f-018.webp` ▂
- 00:13.00 `motion/cold-open/f-019.webp` ▆
- 00:13.50 `motion/cold-open/f-020.webp` ▄
- 00:14.00 `motion/cold-open/f-021.webp` ▅
- 00:14.50 `motion/cold-open/f-022.webp` ▅
- 00:15.00 `motion/cold-open/f-023.webp` ▅
- 00:15.50 `motion/cold-open/f-024.webp` ▆

### 02. 'In the Studio / Bookmaking' rises over the page fan

00:15.50–00:18.50 (3.00 s) · 19 frames at 6 fps, 0.167 s apart · mask reveal, rise, type

Hard cut to a dark, low macro of pages fanned around a spine. 'In the Studio' appears small at top left; about a second later 'Bookmaking' rises into place beneath it from a hidden baseline, the bottoms of the letters clipped until it lands. No fade and no scale; the macro holds still under it.

Motion: `▄▇▁▂▂▁▁▁▁▁▃▄▄▃▁▁▁▁▁`

- 00:15.50 `motion/series-title/f-001.webp` ▄
- 00:15.67 `motion/series-title/f-002.webp` ▇
- 00:15.83 `motion/series-title/f-003.webp` ▁
- 00:16.00 `motion/series-title/f-004.webp` ▂
- 00:16.17 `motion/series-title/f-005.webp` ▂
- 00:16.33 `motion/series-title/f-006.webp` ▁
- 00:16.50 `motion/series-title/f-007.webp` ▁
- 00:16.67 `motion/series-title/f-008.webp` ▁
- 00:16.83 `motion/series-title/f-009.webp` ▁
- 00:17.00 `motion/series-title/f-010.webp` ▁
- 00:17.17 `motion/series-title/f-011.webp` ▃
- 00:17.33 `motion/series-title/f-012.webp` ▄
- 00:17.50 `motion/series-title/f-013.webp` ▄
- 00:17.67 `motion/series-title/f-014.webp` ▃
- 00:17.83 `motion/series-title/f-015.webp` ▁
- 00:18.00 `motion/series-title/f-016.webp` ▁
- 00:18.17 `motion/series-title/f-017.webp` ▁
- 00:18.33 `motion/series-title/f-018.webp` ▁
- 00:18.50 `motion/series-title/f-019.webp` ▁

### 03. Her own book, shown as a museum would

01:39.50–01:50.00 (10.50 s) · 33 frames at 3 fps, 0.333 s apart · hard cut, cutout on white, caption

From the studio wide, hard cuts to ECHO photographed as a cutout on white: three spreads, about two seconds each, each fanned to a different angle. The fourth card turns the book edge-on and adds the caption in the same small black type as the Delaunay and Miró cards, so her work sits in the collection's visual system. Then a cut to one of her wheatpastes on a brick wall.

Motion: `▂▇▁▁▁▁▁▅▁▁▁▁▁▁▁▅▁▁▁▁▁▆▁▁▁▁▆▁▁▁▁▇▁`

- 01:39.50 `motion/echo-cards/f-001.webp` ▂
- 01:39.83 `motion/echo-cards/f-002.webp` ▇
- 01:40.17 `motion/echo-cards/f-003.webp` ▁
- 01:40.50 `motion/echo-cards/f-004.webp` ▁
- 01:40.83 `motion/echo-cards/f-005.webp` ▁
- 01:41.17 `motion/echo-cards/f-006.webp` ▁
- 01:41.50 `motion/echo-cards/f-007.webp` ▁
- 01:41.83 `motion/echo-cards/f-008.webp` ▅
- 01:42.17 `motion/echo-cards/f-009.webp` ▁
- 01:42.50 `motion/echo-cards/f-010.webp` ▁
- 01:42.83 `motion/echo-cards/f-011.webp` ▁
- 01:43.17 `motion/echo-cards/f-012.webp` ▁
- 01:43.50 `motion/echo-cards/f-013.webp` ▁
- 01:43.83 `motion/echo-cards/f-014.webp` ▁
- 01:44.17 `motion/echo-cards/f-015.webp` ▁
- 01:44.50 `motion/echo-cards/f-016.webp` ▅
- 01:44.83 `motion/echo-cards/f-017.webp` ▁
- 01:45.17 `motion/echo-cards/f-018.webp` ▁
- 01:45.50 `motion/echo-cards/f-019.webp` ▁
- 01:45.83 `motion/echo-cards/f-020.webp` ▁
- 01:46.17 `motion/echo-cards/f-021.webp` ▁
- 01:46.50 `motion/echo-cards/f-022.webp` ▆
- 01:46.83 `motion/echo-cards/f-023.webp` ▁
- 01:47.17 `motion/echo-cards/f-024.webp` ▁
- 01:47.50 `motion/echo-cards/f-025.webp` ▁
- 01:47.83 `motion/echo-cards/f-026.webp` ▁
- 01:48.17 `motion/echo-cards/f-027.webp` ▆
- 01:48.50 `motion/echo-cards/f-028.webp` ▁
- 01:48.83 `motion/echo-cards/f-029.webp` ▁
- 01:49.17 `motion/echo-cards/f-030.webp` ▁
- 01:49.50 `motion/echo-cards/f-031.webp` ▁
- 01:49.83 `motion/echo-cards/f-032.webp` ▇
- 01:50.17 `motion/echo-cards/f-033.webp` ▁

### 04. Flipping both halves of the dummy

02:50.50–02:58.50 (8.00 s) · 33 frames at 4 fps, 0.250 s apart · overhead, locked-off, page turn

Locked-off overhead on the opened dummy. Her hands turn strips on the left half, then the right, then the left again, so neighboring walls keep changing which photograph they meet. The camera never moves; the only motion is paper turning on the spine.

Motion: `▃▃▆▃▅▅▅▄▅▅▃▅▄▄▃▂▅▅▄▅▅▄▄▅▅▅▄▅▅▄▄▃▃`

- 02:50.50 `motion/dummy-flip/f-001.webp` ▃
- 02:50.75 `motion/dummy-flip/f-002.webp` ▃
- 02:51.00 `motion/dummy-flip/f-003.webp` ▆
- 02:51.25 `motion/dummy-flip/f-004.webp` ▃
- 02:51.50 `motion/dummy-flip/f-005.webp` ▅
- 02:51.75 `motion/dummy-flip/f-006.webp` ▅
- 02:52.00 `motion/dummy-flip/f-007.webp` ▅
- 02:52.25 `motion/dummy-flip/f-008.webp` ▄
- 02:52.50 `motion/dummy-flip/f-009.webp` ▅
- 02:52.75 `motion/dummy-flip/f-010.webp` ▅
- 02:53.00 `motion/dummy-flip/f-011.webp` ▃
- 02:53.25 `motion/dummy-flip/f-012.webp` ▅
- 02:53.50 `motion/dummy-flip/f-013.webp` ▄
- 02:53.75 `motion/dummy-flip/f-014.webp` ▄
- 02:54.00 `motion/dummy-flip/f-015.webp` ▃
- 02:54.25 `motion/dummy-flip/f-016.webp` ▂
- 02:54.50 `motion/dummy-flip/f-017.webp` ▅
- 02:54.75 `motion/dummy-flip/f-018.webp` ▅
- 02:55.00 `motion/dummy-flip/f-019.webp` ▄
- 02:55.25 `motion/dummy-flip/f-020.webp` ▅
- 02:55.50 `motion/dummy-flip/f-021.webp` ▅
- 02:55.75 `motion/dummy-flip/f-022.webp` ▄
- 02:56.00 `motion/dummy-flip/f-023.webp` ▄
- 02:56.25 `motion/dummy-flip/f-024.webp` ▅
- 02:56.50 `motion/dummy-flip/f-025.webp` ▅
- 02:56.75 `motion/dummy-flip/f-026.webp` ▅
- 02:57.00 `motion/dummy-flip/f-027.webp` ▄
- 02:57.25 `motion/dummy-flip/f-028.webp` ▅
- 02:57.50 `motion/dummy-flip/f-029.webp` ▅
- 02:57.75 `motion/dummy-flip/f-030.webp` ▄
- 02:58.00 `motion/dummy-flip/f-031.webp` ▄
- 02:58.25 `motion/dummy-flip/f-032.webp` ▃
- 02:58.50 `motion/dummy-flip/f-033.webp` ▃

### 05. A section title rises from its baseline

02:58.60–02:59.60 (1.00 s) · 13 frames at 12 fps, 0.083 s apart · mask reveal, rise, type

The shared move for all eight chapter titles. 'Printing' slides up into place at top left in about a quarter of a second, clipped by an invisible line below it, then holds over the shot. The live action under it keeps playing; the title never fades in or scales.

Motion: `▃█▁▁▁▁▁▁▂▁▁▁▁`

- 02:58.60 `motion/printing-title/f-001.webp` ▃
- 02:58.68 `motion/printing-title/f-002.webp` █
- 02:58.77 `motion/printing-title/f-003.webp` ▁
- 02:58.85 `motion/printing-title/f-004.webp` ▁
- 02:58.93 `motion/printing-title/f-005.webp` ▁
- 02:59.02 `motion/printing-title/f-006.webp` ▁
- 02:59.10 `motion/printing-title/f-007.webp` ▁
- 02:59.18 `motion/printing-title/f-008.webp` ▁
- 02:59.27 `motion/printing-title/f-009.webp` ▂
- 02:59.35 `motion/printing-title/f-010.webp` ▁
- 02:59.43 `motion/printing-title/f-011.webp` ▁
- 02:59.52 `motion/printing-title/f-012.webp` ▁
- 02:59.60 `motion/printing-title/f-013.webp` ▁

### 06. 'Sequencing' lands on the cut

04:09.00–04:09.80 (0.80 s) · 11 frames at 12 fps, 0.083 s apart · mask reveal, rise, hard cut

Here the title starts its rise on the first frames of the new shot, so the cut and the type arrive together. The first readable frame shows only the tops of the letters above the mask line.

Motion: `▁█▄▄▄▄▄▄▄▄▄`

- 04:09.00 `motion/sequencing-title/f-001.webp` ▁
- 04:09.08 `motion/sequencing-title/f-002.webp` █
- 04:09.17 `motion/sequencing-title/f-003.webp` ▄
- 04:09.25 `motion/sequencing-title/f-004.webp` ▄
- 04:09.33 `motion/sequencing-title/f-005.webp` ▄
- 04:09.42 `motion/sequencing-title/f-006.webp` ▄
- 04:09.50 `motion/sequencing-title/f-007.webp` ▄
- 04:09.58 `motion/sequencing-title/f-008.webp` ▄
- 04:09.67 `motion/sequencing-title/f-009.webp` ▄
- 04:09.75 `motion/sequencing-title/f-010.webp` ▄
- 04:09.83 `motion/sequencing-title/f-011.webp` ▄

### 07. Spraying through a stencil outdoors

07:45.50–07:59.00 (13.50 s) · 28 frames at 2 fps, 0.500 s apart · handheld, gesture, reveal

A slight handheld drift follows her in the courtyard. She shakes the can and sprays a blue band along the print's edge through a cardboard mask. Cut closer as she peels the mask away and tilts the print to camera, the sprayed edge now crisp against the photograph.

Motion: `▃▆▄▃▃▃▃▃▃▆▄▅▅▆▄▅▆▆▅▆▅▄▄▅▅▄▅▅`

- 07:45.50 `motion/spray/f-001.webp` ▃
- 07:46.00 `motion/spray/f-002.webp` ▆
- 07:46.50 `motion/spray/f-003.webp` ▄
- 07:47.00 `motion/spray/f-004.webp` ▃
- 07:47.50 `motion/spray/f-005.webp` ▃
- 07:48.00 `motion/spray/f-006.webp` ▃
- 07:48.50 `motion/spray/f-007.webp` ▃
- 07:49.00 `motion/spray/f-008.webp` ▃
- 07:49.50 `motion/spray/f-009.webp` ▃
- 07:50.00 `motion/spray/f-010.webp` ▆
- 07:50.50 `motion/spray/f-011.webp` ▄
- 07:51.00 `motion/spray/f-012.webp` ▅
- 07:51.50 `motion/spray/f-013.webp` ▅
- 07:52.00 `motion/spray/f-014.webp` ▆
- 07:52.50 `motion/spray/f-015.webp` ▄
- 07:53.00 `motion/spray/f-016.webp` ▅
- 07:53.50 `motion/spray/f-017.webp` ▆
- 07:54.00 `motion/spray/f-018.webp` ▆
- 07:54.50 `motion/spray/f-019.webp` ▅
- 07:55.00 `motion/spray/f-020.webp` ▆
- 07:55.50 `motion/spray/f-021.webp` ▅
- 07:56.00 `motion/spray/f-022.webp` ▄
- 07:56.50 `motion/spray/f-023.webp` ▄
- 07:57.00 `motion/spray/f-024.webp` ▅
- 07:57.50 `motion/spray/f-025.webp` ▅
- 07:58.00 `motion/spray/f-026.webp` ▄
- 07:58.50 `motion/spray/f-027.webp` ▅
- 07:59.00 `motion/spray/f-028.webp` ▅

### 08. Laying a strip of yellow tape

08:30.50–08:50.00 (19.50 s) · 40 frames at 2 fps, 0.500 s apart · overhead, close-up, gesture

Three angles on one strip: overhead as she lines the tape up with a stripe in the photograph, a side close-up as she cuts it off the roll, then a tight overhead as her fingers smooth it down and press it past the crop marks.

Motion: `▂▅▁▁▁▄▃▆▃▃▃▃▅▅▅▆▅▃▃▂▃▂▂▁▁▁▁▃▆▆▃▄▄▁▁▁▅▅▅▆`

- 08:30.50 `motion/tape/f-001.webp` ▂
- 08:31.00 `motion/tape/f-002.webp` ▅
- 08:31.50 `motion/tape/f-003.webp` ▁
- 08:32.00 `motion/tape/f-004.webp` ▁
- 08:32.50 `motion/tape/f-005.webp` ▁
- 08:33.00 `motion/tape/f-006.webp` ▄
- 08:33.50 `motion/tape/f-007.webp` ▃
- 08:34.00 `motion/tape/f-008.webp` ▆
- 08:34.50 `motion/tape/f-009.webp` ▃
- 08:35.00 `motion/tape/f-010.webp` ▃
- 08:35.50 `motion/tape/f-011.webp` ▃
- 08:36.00 `motion/tape/f-012.webp` ▃
- 08:36.50 `motion/tape/f-013.webp` ▅
- 08:37.00 `motion/tape/f-014.webp` ▅
- 08:37.50 `motion/tape/f-015.webp` ▅
- 08:38.00 `motion/tape/f-016.webp` ▆
- 08:38.50 `motion/tape/f-017.webp` ▅
- 08:39.00 `motion/tape/f-018.webp` ▃
- 08:39.50 `motion/tape/f-019.webp` ▃
- 08:40.00 `motion/tape/f-020.webp` ▂
- 08:40.50 `motion/tape/f-021.webp` ▃
- 08:41.00 `motion/tape/f-022.webp` ▂
- 08:41.50 `motion/tape/f-023.webp` ▂
- 08:42.00 `motion/tape/f-024.webp` ▁
- 08:42.50 `motion/tape/f-025.webp` ▁
- 08:43.00 `motion/tape/f-026.webp` ▁
- 08:43.50 `motion/tape/f-027.webp` ▁
- 08:44.00 `motion/tape/f-028.webp` ▃
- 08:44.50 `motion/tape/f-029.webp` ▆
- 08:45.00 `motion/tape/f-030.webp` ▆
- 08:45.50 `motion/tape/f-031.webp` ▃
- 08:46.00 `motion/tape/f-032.webp` ▄
- 08:46.50 `motion/tape/f-033.webp` ▄
- 08:47.00 `motion/tape/f-034.webp` ▁
- 08:47.50 `motion/tape/f-035.webp` ▁
- 08:48.00 `motion/tape/f-036.webp` ▁
- 08:48.50 `motion/tape/f-037.webp` ▅
- 08:49.00 `motion/tape/f-038.webp` ▅
- 08:49.50 `motion/tape/f-039.webp` ▅
- 08:50.00 `motion/tape/f-040.webp` ▆

### 09. Scoring with the bone folder

13:43.50–13:51.00 (7.50 s) · 16 frames at 2 fps, 0.500 s apart · overhead, locked-off, measurement

Locked-off overhead on the scoring board. One hand spreads flat over the print while the other draws the bone folder's point down the groove at four and a quarter inches, once and then again. Only the folder hand travels, so the onion skin shows the two passes as one vertical line.

Motion: `▆▂▂▁▁▂▁▁▃▂▂▂▂▂▂▃`

Onion skin: `motion/score/trail.webp`

- 13:43.50 `motion/score/f-001.webp` ▆
- 13:44.00 `motion/score/f-002.webp` ▂
- 13:44.50 `motion/score/f-003.webp` ▂
- 13:45.00 `motion/score/f-004.webp` ▁
- 13:45.50 `motion/score/f-005.webp` ▁
- 13:46.00 `motion/score/f-006.webp` ▂
- 13:46.50 `motion/score/f-007.webp` ▁
- 13:47.00 `motion/score/f-008.webp` ▁
- 13:47.50 `motion/score/f-009.webp` ▃
- 13:48.00 `motion/score/f-010.webp` ▂
- 13:48.50 `motion/score/f-011.webp` ▂
- 13:49.00 `motion/score/f-012.webp` ▂
- 13:49.50 `motion/score/f-013.webp` ▂
- 13:50.00 `motion/score/f-014.webp` ▂
- 13:50.50 `motion/score/f-015.webp` ▂
- 13:51.00 `motion/score/f-016.webp` ▃

### 10. Folding and burnishing the crease

13:56.50–14:00.00 (3.50 s) · 15 frames at 4 fps, 0.250 s apart · low angle, close-up, fold

A low side angle at table height: the scored print folds over on itself, and the flat of the bone folder slides along the fold with steady pressure until the sheet lies flat.

Motion: `▂▇▅▅▅▅▅▅▅▅▄▃▅▅▄`

- 13:56.50 `motion/fold/f-001.webp` ▂
- 13:56.75 `motion/fold/f-002.webp` ▇
- 13:57.00 `motion/fold/f-003.webp` ▅
- 13:57.25 `motion/fold/f-004.webp` ▅
- 13:57.50 `motion/fold/f-005.webp` ▅
- 13:57.75 `motion/fold/f-006.webp` ▅
- 13:58.00 `motion/fold/f-007.webp` ▅
- 13:58.25 `motion/fold/f-008.webp` ▅
- 13:58.50 `motion/fold/f-009.webp` ▅
- 13:58.75 `motion/fold/f-010.webp` ▅
- 13:59.00 `motion/fold/f-011.webp` ▄
- 13:59.25 `motion/fold/f-012.webp` ▃
- 13:59.50 `motion/fold/f-013.webp` ▅
- 13:59.75 `motion/fold/f-014.webp` ▅
- 14:00.00 `motion/fold/f-015.webp` ▄

### 11. Perfect binding, page by page

16:24.00–16:45.00 (21.00 s) · 33 frames at 1.5 fps, 0.667 s apart · overhead, macro, repetition

A low side angle as she squares the clamped stack, then overhead as she peels the tape backing strip by strip along the spine edge, then a low macro as each page is lifted and pressed onto the next. The cuts follow the rhythm of the repeated gesture.

Motion: `▅▆▄▃▃▂▂▅▄▄▅▃▁▃▄▃▂▃▃▂▂▅▅▅▅▆▅▅▆▅▅▆▆`

- 16:24.00 `motion/bind/f-001.webp` ▅
- 16:24.67 `motion/bind/f-002.webp` ▆
- 16:25.33 `motion/bind/f-003.webp` ▄
- 16:26.00 `motion/bind/f-004.webp` ▃
- 16:26.67 `motion/bind/f-005.webp` ▃
- 16:27.33 `motion/bind/f-006.webp` ▂
- 16:28.00 `motion/bind/f-007.webp` ▂
- 16:28.67 `motion/bind/f-008.webp` ▅
- 16:29.33 `motion/bind/f-009.webp` ▄
- 16:30.00 `motion/bind/f-010.webp` ▄
- 16:30.67 `motion/bind/f-011.webp` ▅
- 16:31.33 `motion/bind/f-012.webp` ▃
- 16:32.00 `motion/bind/f-013.webp` ▁
- 16:32.67 `motion/bind/f-014.webp` ▃
- 16:33.33 `motion/bind/f-015.webp` ▄
- 16:34.00 `motion/bind/f-016.webp` ▃
- 16:34.67 `motion/bind/f-017.webp` ▂
- 16:35.33 `motion/bind/f-018.webp` ▃
- 16:36.00 `motion/bind/f-019.webp` ▃
- 16:36.67 `motion/bind/f-020.webp` ▂
- 16:37.33 `motion/bind/f-021.webp` ▂
- 16:38.00 `motion/bind/f-022.webp` ▅
- 16:38.67 `motion/bind/f-023.webp` ▅
- 16:39.33 `motion/bind/f-024.webp` ▅
- 16:40.00 `motion/bind/f-025.webp` ▅
- 16:40.67 `motion/bind/f-026.webp` ▆
- 16:41.33 `motion/bind/f-027.webp` ▅
- 16:42.00 `motion/bind/f-028.webp` ▅
- 16:42.67 `motion/bind/f-029.webp` ▆
- 16:43.33 `motion/bind/f-030.webp` ▅
- 16:44.00 `motion/bind/f-031.webp` ▅
- 16:44.67 `motion/bind/f-032.webp` ▆
- 16:45.33 `motion/bind/f-033.webp` ▆

### 12. The bound left side opens for the first time

17:05.00–17:17.00 (12.00 s) · 25 frames at 2 fps, 0.500 s apart · overhead, page turn, reveal

Overhead as she turns the bound left side spread by spread: brick, blue triangle, yellow and pale blue bands. Each spread lies flat as it lands, the property of the binding she has just described.

Motion: `▆▆▃▃▅▅▄▄▄▆▅▅▅▅▆▅▅▅▅▅▆▅▅▅▅`

- 17:05.00 `motion/first-flip/f-001.webp` ▆
- 17:05.50 `motion/first-flip/f-002.webp` ▆
- 17:06.00 `motion/first-flip/f-003.webp` ▃
- 17:06.50 `motion/first-flip/f-004.webp` ▃
- 17:07.00 `motion/first-flip/f-005.webp` ▅
- 17:07.50 `motion/first-flip/f-006.webp` ▅
- 17:08.00 `motion/first-flip/f-007.webp` ▄
- 17:08.50 `motion/first-flip/f-008.webp` ▄
- 17:09.00 `motion/first-flip/f-009.webp` ▄
- 17:09.50 `motion/first-flip/f-010.webp` ▆
- 17:10.00 `motion/first-flip/f-011.webp` ▅
- 17:10.50 `motion/first-flip/f-012.webp` ▅
- 17:11.00 `motion/first-flip/f-013.webp` ▅
- 17:11.50 `motion/first-flip/f-014.webp` ▅
- 17:12.00 `motion/first-flip/f-015.webp` ▆
- 17:12.50 `motion/first-flip/f-016.webp` ▅
- 17:13.00 `motion/first-flip/f-017.webp` ▅
- 17:13.50 `motion/first-flip/f-018.webp` ▅
- 17:14.00 `motion/first-flip/f-019.webp` ▅
- 17:14.50 `motion/first-flip/f-020.webp` ▅
- 17:15.00 `motion/first-flip/f-021.webp` ▆
- 17:15.50 `motion/first-flip/f-022.webp` ▅
- 17:16.00 `motion/first-flip/f-023.webp` ▅
- 17:16.50 `motion/first-flip/f-024.webp` ▅
- 17:17.00 `motion/first-flip/f-025.webp` ▅

### 13. Stenciling her name on the cover

22:05.00–22:29.00 (24.00 s) · 25 frames at 1 fps, 1.000 s apart · overhead, low angle, reveal

Overhead as the paper stencil is taped in place, cut to a low angle as the sponge dabs white acrylic through it, then back overhead as the stencil lifts to leave 'RHEA KARAM' in rough white capitals.

Motion: `▁▄▄▄▃▅▅▃▄▅▄▅▅▅▃▃▆▅▅▅▅▄▄▅▃`

- 22:05.00 `motion/stencil/f-001.webp` ▁
- 22:06.00 `motion/stencil/f-002.webp` ▄
- 22:07.00 `motion/stencil/f-003.webp` ▄
- 22:08.00 `motion/stencil/f-004.webp` ▄
- 22:09.00 `motion/stencil/f-005.webp` ▃
- 22:10.00 `motion/stencil/f-006.webp` ▅
- 22:11.00 `motion/stencil/f-007.webp` ▅
- 22:12.00 `motion/stencil/f-008.webp` ▃
- 22:13.00 `motion/stencil/f-009.webp` ▄
- 22:14.00 `motion/stencil/f-010.webp` ▅
- 22:15.00 `motion/stencil/f-011.webp` ▄
- 22:16.00 `motion/stencil/f-012.webp` ▅
- 22:17.00 `motion/stencil/f-013.webp` ▅
- 22:18.00 `motion/stencil/f-014.webp` ▅
- 22:19.00 `motion/stencil/f-015.webp` ▃
- 22:20.00 `motion/stencil/f-016.webp` ▃
- 22:21.00 `motion/stencil/f-017.webp` ▆
- 22:22.00 `motion/stencil/f-018.webp` ▅
- 22:23.00 `motion/stencil/f-019.webp` ▅
- 22:24.00 `motion/stencil/f-020.webp` ▅
- 22:25.00 `motion/stencil/f-021.webp` ▅
- 22:26.00 `motion/stencil/f-022.webp` ▄
- 22:27.00 `motion/stencil/f-023.webp` ▄
- 22:28.00 `motion/stencil/f-024.webp` ▅
- 22:29.00 `motion/stencil/f-025.webp` ▃

### 14. The guillotine cut

23:15.00–23:43.00 (28.00 s) · 29 frames at 1 fps, 1.000 s apart · macro, wide, machine

The stack slides against the back gauge, the clamp wheel turns, and a macro across the clamp shows the colored edges in a thin line. Then a wide as she pulls the long lever across her body, and the macro again on the fresh edge. The same cut is seen at two scales.

Motion: `▅▂▁▄▁▂▄▂▅▃▄▄▅▂▂▆▅▆▅▅▅▄▅▄▅▃▅▆▆`

- 23:15.00 `motion/guillotine/f-001.webp` ▅
- 23:16.00 `motion/guillotine/f-002.webp` ▂
- 23:17.00 `motion/guillotine/f-003.webp` ▁
- 23:18.00 `motion/guillotine/f-004.webp` ▄
- 23:19.00 `motion/guillotine/f-005.webp` ▁
- 23:20.00 `motion/guillotine/f-006.webp` ▂
- 23:21.00 `motion/guillotine/f-007.webp` ▄
- 23:22.00 `motion/guillotine/f-008.webp` ▂
- 23:23.00 `motion/guillotine/f-009.webp` ▅
- 23:24.00 `motion/guillotine/f-010.webp` ▃
- 23:25.00 `motion/guillotine/f-011.webp` ▄
- 23:26.00 `motion/guillotine/f-012.webp` ▄
- 23:27.00 `motion/guillotine/f-013.webp` ▅
- 23:28.00 `motion/guillotine/f-014.webp` ▂
- 23:29.00 `motion/guillotine/f-015.webp` ▂
- 23:30.00 `motion/guillotine/f-016.webp` ▆
- 23:31.00 `motion/guillotine/f-017.webp` ▅
- 23:32.00 `motion/guillotine/f-018.webp` ▆
- 23:33.00 `motion/guillotine/f-019.webp` ▅
- 23:34.00 `motion/guillotine/f-020.webp` ▅
- 23:35.00 `motion/guillotine/f-021.webp` ▅
- 23:36.00 `motion/guillotine/f-022.webp` ▄
- 23:37.00 `motion/guillotine/f-023.webp` ▅
- 23:38.00 `motion/guillotine/f-024.webp` ▄
- 23:39.00 `motion/guillotine/f-025.webp` ▅
- 23:40.00 `motion/guillotine/f-026.webp` ▃
- 23:41.00 `motion/guillotine/f-027.webp` ▅
- 23:42.00 `motion/guillotine/f-028.webp` ▆
- 23:43.00 `motion/guillotine/f-029.webp` ▆

### 15. The finished book opens, then stands

25:37.00–26:01.00 (24.00 s) · 37 frames at 1.5 fps, 0.667 s apart · overhead, reveal, callback

Overhead, the closed book with its two narrow front covers; both halves swing open and fan through the walls. Cut to the book stood on end, opening into a zigzag. The sequence closes on the same low, dark macro of fanned pages it opened with.

Motion: `▅▃▃▃▄▄▄▅▅▅▄▄▄▅▄▄▄▄▄▄▃▆▅▂▃▅▅▅▄▅▄▅▄▄▄▄▄`

- 25:37.00 `motion/finale/f-001.webp` ▅
- 25:37.67 `motion/finale/f-002.webp` ▃
- 25:38.33 `motion/finale/f-003.webp` ▃
- 25:39.00 `motion/finale/f-004.webp` ▃
- 25:39.67 `motion/finale/f-005.webp` ▄
- 25:40.33 `motion/finale/f-006.webp` ▄
- 25:41.00 `motion/finale/f-007.webp` ▄
- 25:41.67 `motion/finale/f-008.webp` ▅
- 25:42.33 `motion/finale/f-009.webp` ▅
- 25:43.00 `motion/finale/f-010.webp` ▅
- 25:43.67 `motion/finale/f-011.webp` ▄
- 25:44.33 `motion/finale/f-012.webp` ▄
- 25:45.00 `motion/finale/f-013.webp` ▄
- 25:45.67 `motion/finale/f-014.webp` ▅
- 25:46.33 `motion/finale/f-015.webp` ▄
- 25:47.00 `motion/finale/f-016.webp` ▄
- 25:47.67 `motion/finale/f-017.webp` ▄
- 25:48.33 `motion/finale/f-018.webp` ▄
- 25:49.00 `motion/finale/f-019.webp` ▄
- 25:49.67 `motion/finale/f-020.webp` ▄
- 25:50.33 `motion/finale/f-021.webp` ▃
- 25:51.00 `motion/finale/f-022.webp` ▆
- 25:51.67 `motion/finale/f-023.webp` ▅
- 25:52.33 `motion/finale/f-024.webp` ▂
- 25:53.00 `motion/finale/f-025.webp` ▃
- 25:53.67 `motion/finale/f-026.webp` ▅
- 25:54.33 `motion/finale/f-027.webp` ▅
- 25:55.00 `motion/finale/f-028.webp` ▅
- 25:55.67 `motion/finale/f-029.webp` ▄
- 25:56.33 `motion/finale/f-030.webp` ▅
- 25:57.00 `motion/finale/f-031.webp` ▄
- 25:57.67 `motion/finale/f-032.webp` ▅
- 25:58.33 `motion/finale/f-033.webp` ▄
- 25:59.00 `motion/finale/f-034.webp` ▄
- 25:59.67 `motion/finale/f-035.webp` ▄
- 26:00.33 `motion/finale/f-036.webp` ▄
- 26:01.00 `motion/finale/f-037.webp` ▄

### 16. The wordmark rises, then credits

26:45.00–26:48.00 (3.00 s) · 19 frames at 6 fps, 0.167 s apart · hard cut, mask reveal, end card

Hard cut from the wide to white. The MoMA wordmark rises into the center from a mask line with the same move as the chapter titles, holds about two seconds, and hard cuts to three columns of small black credits.

Motion: `▁▁█▄▂▁▁▁▁▁▁▁▁▁▁▁▁▆▁`

- 26:45.00 `motion/moma/f-001.webp` ▁
- 26:45.17 `motion/moma/f-002.webp` ▁
- 26:45.33 `motion/moma/f-003.webp` █
- 26:45.50 `motion/moma/f-004.webp` ▄
- 26:45.67 `motion/moma/f-005.webp` ▂
- 26:45.83 `motion/moma/f-006.webp` ▁
- 26:46.00 `motion/moma/f-007.webp` ▁
- 26:46.17 `motion/moma/f-008.webp` ▁
- 26:46.33 `motion/moma/f-009.webp` ▁
- 26:46.50 `motion/moma/f-010.webp` ▁
- 26:46.67 `motion/moma/f-011.webp` ▁
- 26:46.83 `motion/moma/f-012.webp` ▁
- 26:47.00 `motion/moma/f-013.webp` ▁
- 26:47.17 `motion/moma/f-014.webp` ▁
- 26:47.33 `motion/moma/f-015.webp` ▁
- 26:47.50 `motion/moma/f-016.webp` ▁
- 26:47.67 `motion/moma/f-017.webp` ▁
- 26:47.83 `motion/moma/f-018.webp` ▆
- 26:48.00 `motion/moma/f-019.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Opening wide: Rhea Karam at her desk in a white studio of pinned prints and colored spines. Her magenta T-shirt is the strongest color in every wide.
- 00:04.00 `seconds/second-00005.webp` Insert on the pinboard: an accordion dummy of brick and tile photographs hanging from a clip. The cold open starts with the object, not the person.
- 00:07.00 `seconds/second-00008.webp` Hands open the two-sided dummy on the table, both halves fanning at once. The finished idea is shown before any step.
- 00:18.00 `seconds/second-00019.webp` Series title over a low macro of pages fanned around the spine: 'In the Studio' small, 'Bookmaking' large, bold white sans at top left.
- 00:29.00 `seconds/second-00030.webp` Reference card: the work as a photo at right on white, with artist, italic title and year set small in black at bottom left. Every outside reference uses this layout.
- 00:34.00 `seconds/second-00035.webp` Delaunay's book unfolded to its full length as a cutout on white, one tall strip filling the frame height.
- 00:48.00 `seconds/second-00049.webp` Her own small accordion of street photographs pulled open on her lap.
- 00:57.00 `seconds/second-00058.webp` Section title 'Book design' over the top-down sketchbook: the book drawn as rough boxes, flat, open and standing.
- 01:03.00 `seconds/second-00064.webp` Pencil close-up in shallow focus, the words of the sketch soft beyond the hand.
- 01:40.00 `seconds/second-00101.webp` Her book ECHO as a cutout on white, fanned so each photographed wall reads as one vertical strip.
- 01:47.00 `seconds/second-00108.webp` ECHO turned edge-on with the caption 'Rhea Karam / ECHO. 2025', the same card type used for MoMA's collection.
- 01:50.00 `seconds/second-00111.webp` Her wheatpaste on a painted brick wall: a blue square with yellow and red triangles. The book's palette comes from the street.
- 01:56.00 `seconds/second-00117.webp` Section title 'Book dummies' over a color-block accordion dummy standing open on the desk.
- 02:24.00 `seconds/second-00145.webp` The cast-concrete brick slipcase with her name cast into it, one of many material tests for a single book.
- 02:52.00 `seconds/second-00173.webp` Overhead on the finished dummy: both halves open, strip after strip of wall side by side.
- 03:00.00 `seconds/second-00181.webp` Section title 'Printing' over the Epson feeding a print. Every chapter opens with its name in the same place.
- 03:25.00 `seconds/second-00206.webp` Screen insert: two spreads placed on one sheet in her layout software, crop marks at the corners.
- 03:44.00 `seconds/second-00225.webp` Paper swatch books fanned in her hands. Texture and weight are chosen by touch.
- 04:10.00 `seconds/second-00251.webp` Section title 'Sequencing' over the wall of trimmed prints, the yellow window frame cutting the left edge.
- 04:30.00 `seconds/second-00271.webp` Close on her arm reaching across the sequencing wall to swap a print.
- 04:50.00 `seconds/second-00291.webp` A second interview setup: tighter, by the window, with foliage soft behind her.
- 05:20.00 `seconds/second-00321.webp` The prints pinned edge to edge as one composition, a corner in each image ready to sit on a fold.
- 05:51.00 `seconds/second-00352.webp` Section title 'Embellishing prints' over spray-paint cans in shallow focus.
- 06:03.00 `seconds/second-00364.webp` An earlier accordion in black with cut red and yellow triangles, shown low across the table.
- 06:08.00 `seconds/second-00369.webp` Overhead: a book bound in green tarp lifted off the table, one of her industrial-material examples.
- 06:29.00 `seconds/second-00390.webp` A spread in stripes of yellow, pink, black and blue: prints worked over with spray paint and cutting.
- 06:42.00 `seconds/second-00403.webp` Reference card: Joan Miró, 'À toute épreuve (Proof Against All). 1958'.
- 06:51.00 `seconds/second-00412.webp` A full-frame Miró spread on cream paper, held still so the color does the work.
- 06:57.00 `seconds/second-00418.webp` Tauba Auerbach's pop-up: a coil of colored bands rising from a flat black book, white caption at bottom left.
- 07:50.00 `seconds/second-00471.webp` Outdoors in a red sweater and purple gloves, spraying a print's edge through a cardboard stencil. The only scene outside the studio.
- 08:03.00 `seconds/second-00484.webp` Reference card: John Baldessari, 'Lamp. 1993'.
- 08:23.00 `seconds/second-00504.webp` Close on yellow cloth tape being torn off the roll, the print waiting on the table.
- 09:13.00 `seconds/second-00554.webp` Her 'Leporello. 2022' on white: a black accordion with neon triangles cut from each fold.
- 09:17.00 `seconds/second-00558.webp` Her '1982. 2025' with its concrete slipcase: the brick dummy made real.
- 09:47.00 `seconds/second-00588.webp` Cut to the street: paper triangles pasted around a red fire bell on a concrete corner. The collage on the table repeats the move.
- 10:01.00 `seconds/second-00602.webp` Overhead: a blue paper triangle laid on the corner of a brick print, tape gun and cutter at hand.
- 10:53.00 `seconds/second-00654.webp` Signing the back page with a marker, the edition number written into the photographed wall like a tag.
- 11:05.00 `seconds/second-00666.webp` Section title 'Trimming the prints' over the roller trimmer seen straight down, the print squared to its grid.
- 11:25.00 `seconds/second-00686.webp` Macro along the trimmer's steel rail as the blade passes.
- 12:45.00 `seconds/second-00766.webp` Section title 'Scoring and folding' over the bone folder lying across the scoring board.
- 13:46.00 `seconds/second-00827.webp` Overhead: one hand flat on the print, the bone folder's point drawn down the board's groove.
- 13:58.00 `seconds/second-00839.webp` Low side angle on the fold, the bone folder pressed along the crease.
- 14:14.00 `seconds/second-00855.webp` Section title 'Binding' over the dark macro of pages fanned from the spine, reused from the opening.
- 14:28.00 `seconds/second-00869.webp` Her 'Book I. 2025' on white: teal and orange covers with a cut window.
- 15:12.00 `seconds/second-00913.webp` Overhead: the folded sheets in a row with double-sided tape run along each edge.
- 16:20.00 `seconds/second-00981.webp` The stack shaken square and clamped at the spine, held up toward the overhead lens.
- 16:38.00 `seconds/second-00999.webp` Low macro: lifting each page and pulling the tape backing, page by page through the stack.
- 17:12.00 `seconds/second-01033.webp` Overhead: the bound left side flipped spread by spread, each one a different wall.
- 17:56.00 `seconds/second-01077.webp` Left and right books open side by side, city corners meeting across the gutter.
- 18:01.00 `seconds/second-01082.webp` Section title 'Making the cover' over a shallow-focus macro of the finished cover with her stenciled name.
- 18:10.00 `seconds/second-01091.webp` The cover material: cardboard she used as a spray-paint backstop, layered with stencil colors.
- 18:55.00 `seconds/second-01136.webp` Overhead: marking the sprayed cardboard with a steel ruler before cutting.
- 19:32.00 `seconds/second-01173.webp` Reference card: Giorgio de Chirico, 'Défense de savoir (Knowledge Forbidden). 1928'.
- 19:40.00 `seconds/second-01181.webp` The de Chirico book standing open: shattered glass between sheets of lead, shot plainly on gray.
- 20:20.00 `seconds/second-01221.webp` Overhead: the signed back-page print scored to wrap the back cover.
- 22:10.00 `seconds/second-01331.webp` Overhead: a paper stencil of her name taped across the cardboard cover.
- 22:22.00 `seconds/second-01343.webp` Low angle: white acrylic dabbed through the stencil with a sponge.
- 22:29.00 `seconds/second-01350.webp` The stencil lifted: 'RHEA KARAM' in rough white capitals on the sprayed cardboard.
- 23:18.00 `seconds/second-01399.webp` Macro across the guillotine clamp, the stack's colored edges in a thin line under the blade.
- 23:36.00 `seconds/second-01417.webp` Wide: she pulls the guillotine lever across her body. The cut is shown in macro and wide back to back.
- 24:28.00 `seconds/second-01469.webp` Overhead: the two narrow front covers and the back with its stenciled name, ready to join.
- 25:39.00 `seconds/second-01540.webp` Overhead: the finished book closed, its two front covers side by side.
- 25:46.00 `seconds/second-01547.webp` The same overhead with both halves open, walls fanned left and right.
- 25:55.00 `seconds/second-01556.webp` The book stood on end and opened into a zigzag of walls.
- 25:59.00 `seconds/second-01560.webp` The low dark macro of the opening returns: pages fanned around the spine.
- 26:06.00 `seconds/second-01567.webp` Another edition of the same book: plywood and aluminum covers with barrel bolts and industrial pulls.
- 26:41.00 `seconds/second-01602.webp` Macro on a barrel bolt sliding shut.
- 26:46.00 `seconds/second-01607.webp` End card: the MoMA wordmark in black on white.
- 26:48.00 `seconds/second-01609.webp` Credits in three dense columns of small black type, listing every work and fabricator.
