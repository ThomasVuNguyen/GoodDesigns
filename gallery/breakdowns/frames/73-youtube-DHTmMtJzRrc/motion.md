# Motion notes: Tidy Tabs by Arc | A browser that tidies for you

The Browser Company · 00:20.54 · https://www.youtube.com/watch?v=DHTmMtJzRrc

Every shot is either a flat blue card with a few words or a magnified piece of Arc's sidebar. There is no camera in a physical sense: the 'moves' are scrolls, one pull-back from a close-up, and the interface's own animations. Three of those carry the film. New tabs fade up at the bottom of the list. The divider beside 'Clear' turns into a moving wavy line while the feature works. And the rows rearrange into groups in about a third of a second, with small grey labels appearing between them. The first demo plays these in one take; the later ones are cut so the viewer sees only the click or only the sort, never the wait.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▂▅▅▅▅▅▅▅▅▅▅▄▅▅▅▁▅▅▂▁▁
```

## Sequences

### 01. Two words, one at a time

00:00.00–00:01.45 (1.45 s) · 18 frames at 12 fps, 0.083 s apart · word-by-word, hard cut, flat color

The film opens on empty blue. 'Don't' appears at 0.17, already centered, and 'worry' is added at 0.5, the pair re-centering as a block. Neither word animates; each simply arrives. At 1.30 a hard cut throws us into the sidebar.

Motion: `▁▃▁▁▁▁▃▁▁▁▁▁▁▁▁▁█▄`

Onion skin: `motion/dont-worry/trail.webp`

- 00:00.00 `motion/dont-worry/f-001.webp` ▁
- 00:00.08 `motion/dont-worry/f-002.webp` ▃
- 00:00.17 `motion/dont-worry/f-003.webp` ▁
- 00:00.25 `motion/dont-worry/f-004.webp` ▁
- 00:00.33 `motion/dont-worry/f-005.webp` ▁
- 00:00.42 `motion/dont-worry/f-006.webp` ▁
- 00:00.50 `motion/dont-worry/f-007.webp` ▃
- 00:00.58 `motion/dont-worry/f-008.webp` ▁
- 00:00.67 `motion/dont-worry/f-009.webp` ▁
- 00:00.75 `motion/dont-worry/f-010.webp` ▁
- 00:00.83 `motion/dont-worry/f-011.webp` ▁
- 00:00.92 `motion/dont-worry/f-012.webp` ▁
- 00:01.00 `motion/dont-worry/f-013.webp` ▁
- 00:01.08 `motion/dont-worry/f-014.webp` ▁
- 00:01.17 `motion/dont-worry/f-015.webp` ▁
- 00:01.25 `motion/dont-worry/f-016.webp` ▁
- 00:01.33 `motion/dont-worry/f-017.webp` █
- 00:01.42 `motion/dont-worry/f-018.webp` ▄

### 02. Tabs pile up and the list scrolls with them

00:01.25–00:04.45 (3.20 s) · 27 frames at 8 fps, 0.125 s apart · fade in, scroll, accumulate

One tab at 1.33, a second at about 1.67, a third fading up at 2.0 and solid by 2.17, then a San Diego zoo list at 2.67, Sebo at 3.33, another zoo tab at 3.5 and an Oscars tab ghosting in at 3.83. As each one lands, the view scrolls down so the newest row stays in frame and the oldest leave off the top; 'New Tab' is gone by 2.0. The pointer never moves from the page on the right. The pile is shown as something that just happens to you while you read.

Motion: `▇▄▄▄▄▄▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▇▁`

- 00:01.25 `motion/rabbit-hole/f-001.webp` ▇
- 00:01.38 `motion/rabbit-hole/f-002.webp` ▄
- 00:01.50 `motion/rabbit-hole/f-003.webp` ▄
- 00:01.62 `motion/rabbit-hole/f-004.webp` ▄
- 00:01.75 `motion/rabbit-hole/f-005.webp` ▄
- 00:01.88 `motion/rabbit-hole/f-006.webp` ▄
- 00:02.00 `motion/rabbit-hole/f-007.webp` ▅
- 00:02.12 `motion/rabbit-hole/f-008.webp` ▅
- 00:02.25 `motion/rabbit-hole/f-009.webp` ▅
- 00:02.38 `motion/rabbit-hole/f-010.webp` ▅
- 00:02.50 `motion/rabbit-hole/f-011.webp` ▅
- 00:02.62 `motion/rabbit-hole/f-012.webp` ▅
- 00:02.75 `motion/rabbit-hole/f-013.webp` ▅
- 00:02.88 `motion/rabbit-hole/f-014.webp` ▅
- 00:03.00 `motion/rabbit-hole/f-015.webp` ▅
- 00:03.12 `motion/rabbit-hole/f-016.webp` ▅
- 00:03.25 `motion/rabbit-hole/f-017.webp` ▅
- 00:03.38 `motion/rabbit-hole/f-018.webp` ▅
- 00:03.50 `motion/rabbit-hole/f-019.webp` ▅
- 00:03.62 `motion/rabbit-hole/f-020.webp` ▅
- 00:03.75 `motion/rabbit-hole/f-021.webp` ▅
- 00:03.88 `motion/rabbit-hole/f-022.webp` ▅
- 00:04.00 `motion/rabbit-hole/f-023.webp` ▅
- 00:04.12 `motion/rabbit-hole/f-024.webp` ▅
- 00:04.25 `motion/rabbit-hole/f-025.webp` ▅
- 00:04.38 `motion/rabbit-hole/f-026.webp` ▇
- 00:04.50 `motion/rabbit-hole/f-027.webp` ▁

### 03. 'Tab', then 'freely' in italic

00:04.30–00:05.60 (1.30 s) · 17 frames at 12 fps, 0.083 s apart · word-by-word, italic, hard cut

Cut to blue at 4.37 with 'Tab' alone in the middle. At about 4.8 'freely' is added in italic and the line re-centers. Same rule as the opening: words arrive whole, the block keeps itself centered. Cut to the close-up at 5.54.

Motion: `▅█▁▁▁▁▃▁▁▁▁▁▁▁▁█▃`

Onion skin: `motion/tab-freely/trail.webp`

- 00:04.30 `motion/tab-freely/f-001.webp` ▅
- 00:04.38 `motion/tab-freely/f-002.webp` █
- 00:04.47 `motion/tab-freely/f-003.webp` ▁
- 00:04.55 `motion/tab-freely/f-004.webp` ▁
- 00:04.63 `motion/tab-freely/f-005.webp` ▁
- 00:04.72 `motion/tab-freely/f-006.webp` ▁
- 00:04.80 `motion/tab-freely/f-007.webp` ▃
- 00:04.88 `motion/tab-freely/f-008.webp` ▁
- 00:04.97 `motion/tab-freely/f-009.webp` ▁
- 00:05.05 `motion/tab-freely/f-010.webp` ▁
- 00:05.13 `motion/tab-freely/f-011.webp` ▁
- 00:05.22 `motion/tab-freely/f-012.webp` ▁
- 00:05.30 `motion/tab-freely/f-013.webp` ▁
- 00:05.38 `motion/tab-freely/f-014.webp` ▁
- 00:05.47 `motion/tab-freely/f-015.webp` ▁
- 00:05.55 `motion/tab-freely/f-016.webp` █
- 00:05.63 `motion/tab-freely/f-017.webp` ▃

### 04. Click, ripple, pull back, sort

00:05.50–00:07.75 (2.25 s) · 28 frames at 12 fps, 0.083 s apart · cursor, button press, wavy line, pull back, regroup

The close-up holds on 'Clear' with the pointer coming up to the broom at 5.67. The broom darkens as it is pressed around 6.0. From 6.33 the thin divider to its left starts to ripple and spreads into a wavy line. At about 6.4 the view starts to pull back and keeps shrinking until about 7.3, so the whole unsorted list and the page beside it come into frame while the line is still wavy. At 7.5 the tabs rearrange into three labeled groups in one or two frames. One continuous take covers the whole feature: the button, the wait and the result.

Motion: `▇▂▃▂▂▁▁▁▁▆▆▆▆▆▆▆▆▆▆▆▆▆▆▂▅▄▁▁`

- 00:05.50 `motion/first-clear/f-001.webp` ▇
- 00:05.58 `motion/first-clear/f-002.webp` ▂
- 00:05.67 `motion/first-clear/f-003.webp` ▃
- 00:05.75 `motion/first-clear/f-004.webp` ▂
- 00:05.83 `motion/first-clear/f-005.webp` ▂
- 00:05.92 `motion/first-clear/f-006.webp` ▁
- 00:06.00 `motion/first-clear/f-007.webp` ▁
- 00:06.08 `motion/first-clear/f-008.webp` ▁
- 00:06.17 `motion/first-clear/f-009.webp` ▁
- 00:06.25 `motion/first-clear/f-010.webp` ▆
- 00:06.33 `motion/first-clear/f-011.webp` ▆
- 00:06.42 `motion/first-clear/f-012.webp` ▆
- 00:06.50 `motion/first-clear/f-013.webp` ▆
- 00:06.58 `motion/first-clear/f-014.webp` ▆
- 00:06.67 `motion/first-clear/f-015.webp` ▆
- 00:06.75 `motion/first-clear/f-016.webp` ▆
- 00:06.83 `motion/first-clear/f-017.webp` ▆
- 00:06.92 `motion/first-clear/f-018.webp` ▆
- 00:07.00 `motion/first-clear/f-019.webp` ▆
- 00:07.08 `motion/first-clear/f-020.webp` ▆
- 00:07.17 `motion/first-clear/f-021.webp` ▆
- 00:07.25 `motion/first-clear/f-022.webp` ▆
- 00:07.33 `motion/first-clear/f-023.webp` ▆
- 00:07.42 `motion/first-clear/f-024.webp` ▂
- 00:07.50 `motion/first-clear/f-025.webp` ▅
- 00:07.58 `motion/first-clear/f-026.webp` ▄
- 00:07.67 `motion/first-clear/f-027.webp` ▁
- 00:07.75 `motion/first-clear/f-028.webp` ▁

### 05. The name fades up

00:08.40–00:09.80 (1.40 s) · 18 frames at 12 fps, 0.083 s apart · fade in, title card, hard cut

At 8.54 the blue card opens on 'Tidy Tabs' at low opacity, solid by about 8.67, a faster and softer entrance than the other words get. It holds for a second and cuts at 9.68 to the next close-up.

Motion: `▁▁█▄▁▁▁▁▁▁▁▁▁▁▁█▃▂`

Onion skin: `motion/name-card/trail.webp`

- 00:08.40 `motion/name-card/f-001.webp` ▁
- 00:08.48 `motion/name-card/f-002.webp` ▁
- 00:08.57 `motion/name-card/f-003.webp` █
- 00:08.65 `motion/name-card/f-004.webp` ▄
- 00:08.73 `motion/name-card/f-005.webp` ▁
- 00:08.82 `motion/name-card/f-006.webp` ▁
- 00:08.90 `motion/name-card/f-007.webp` ▁
- 00:08.98 `motion/name-card/f-008.webp` ▁
- 00:09.07 `motion/name-card/f-009.webp` ▁
- 00:09.15 `motion/name-card/f-010.webp` ▁
- 00:09.23 `motion/name-card/f-011.webp` ▁
- 00:09.32 `motion/name-card/f-012.webp` ▁
- 00:09.40 `motion/name-card/f-013.webp` ▁
- 00:09.48 `motion/name-card/f-014.webp` ▁
- 00:09.57 `motion/name-card/f-015.webp` ▁
- 00:09.65 `motion/name-card/f-016.webp` █
- 00:09.73 `motion/name-card/f-017.webp` ▃
- 00:09.82 `motion/name-card/f-018.webp` ▂

### 06. The same close-up, a different Space

00:09.60–00:10.90 (1.30 s) · 17 frames at 12 fps, 0.083 s apart · match framing, cursor, wavy line, cut on action

The salmon Space is framed like the first close-up, with 'Clear' top right and two tabs below. The pointer sits on the broom from 9.67; the divider starts to ripple at about 10.5 and is a full wavy line by 10.75. At 10.84 the film cuts to a wide shot before any tab has moved, so the waiting part of the feature is left in this shot and the result goes to the next.

Motion: `▁█▂▂▂▂▁▂▂▁▂▂▂▄▃▇▃`

- 00:09.60 `motion/salmon-click/f-001.webp` ▁
- 00:09.68 `motion/salmon-click/f-002.webp` █
- 00:09.77 `motion/salmon-click/f-003.webp` ▂
- 00:09.85 `motion/salmon-click/f-004.webp` ▂
- 00:09.93 `motion/salmon-click/f-005.webp` ▂
- 00:10.02 `motion/salmon-click/f-006.webp` ▂
- 00:10.10 `motion/salmon-click/f-007.webp` ▁
- 00:10.18 `motion/salmon-click/f-008.webp` ▂
- 00:10.27 `motion/salmon-click/f-009.webp` ▂
- 00:10.35 `motion/salmon-click/f-010.webp` ▁
- 00:10.43 `motion/salmon-click/f-011.webp` ▂
- 00:10.52 `motion/salmon-click/f-012.webp` ▂
- 00:10.60 `motion/salmon-click/f-013.webp` ▂
- 00:10.68 `motion/salmon-click/f-014.webp` ▄
- 00:10.77 `motion/salmon-click/f-015.webp` ▃
- 00:10.85 `motion/salmon-click/f-016.webp` ▇
- 00:10.93 `motion/salmon-click/f-017.webp` ▃

### 07. Super Bowl, Valentine's Day, Grammys

00:10.80–00:12.20 (1.40 s) · 18 frames at 12 fps, 0.083 s apart · regroup, labels appear, hold

The wide shot opens on the unsorted list next to a CBS Sports article on Super Bowl predictions. At about 11.3 the rows shuffle and grey labels open up between them, and by 11.42 the list reads 'Super Bowl', 'Valentine's Day', 'Grammys'. It then holds for most of a second so the labels can be read before the cut at 12.18.

Motion: `▇▃▃▃▃▃▅▄▃▃▃▃▃▃▃▃▇▄`

- 00:10.80 `motion/super-bowl-sort/f-001.webp` ▇
- 00:10.88 `motion/super-bowl-sort/f-002.webp` ▃
- 00:10.97 `motion/super-bowl-sort/f-003.webp` ▃
- 00:11.05 `motion/super-bowl-sort/f-004.webp` ▃
- 00:11.13 `motion/super-bowl-sort/f-005.webp` ▃
- 00:11.22 `motion/super-bowl-sort/f-006.webp` ▃
- 00:11.30 `motion/super-bowl-sort/f-007.webp` ▅
- 00:11.38 `motion/super-bowl-sort/f-008.webp` ▄
- 00:11.47 `motion/super-bowl-sort/f-009.webp` ▃
- 00:11.55 `motion/super-bowl-sort/f-010.webp` ▃
- 00:11.63 `motion/super-bowl-sort/f-011.webp` ▃
- 00:11.72 `motion/super-bowl-sort/f-012.webp` ▃
- 00:11.80 `motion/super-bowl-sort/f-013.webp` ▃
- 00:11.88 `motion/super-bowl-sort/f-014.webp` ▃
- 00:11.97 `motion/super-bowl-sort/f-015.webp` ▃
- 00:12.05 `motion/super-bowl-sort/f-016.webp` ▃
- 00:12.13 `motion/super-bowl-sort/f-017.webp` ▇
- 00:12.22 `motion/super-bowl-sort/f-018.webp` ▄

### 08. Universal Studios, Vision Pro, Nintendo Games

00:12.10–00:13.55 (1.45 s) · 18 frames at 12 fps, 0.083 s apart · regroup, labels appear, repetition

A teal Space over a painted sky, with a talking-head YouTube video open. The shot starts already mid-trip and with no close-up before it: Universal tips, a Vision Pro durability test and Mario titles mixed together. From about 12.42 the rows scatter and settle, and by 12.58 they sit under 'Universal Studios', 'Vision Pro' and 'Nintendo Games'. No click is shown at all; by the third time, the film trusts the viewer to supply it.

Motion: `▃█▄▄▄▆▅▄▄▄▄▄▄▄▄▄▄█`

- 00:12.10 `motion/vision-pro-sort/f-001.webp` ▃
- 00:12.18 `motion/vision-pro-sort/f-002.webp` █
- 00:12.27 `motion/vision-pro-sort/f-003.webp` ▄
- 00:12.35 `motion/vision-pro-sort/f-004.webp` ▄
- 00:12.43 `motion/vision-pro-sort/f-005.webp` ▄
- 00:12.52 `motion/vision-pro-sort/f-006.webp` ▆
- 00:12.60 `motion/vision-pro-sort/f-007.webp` ▅
- 00:12.68 `motion/vision-pro-sort/f-008.webp` ▄
- 00:12.77 `motion/vision-pro-sort/f-009.webp` ▄
- 00:12.85 `motion/vision-pro-sort/f-010.webp` ▄
- 00:12.93 `motion/vision-pro-sort/f-011.webp` ▄
- 00:13.02 `motion/vision-pro-sort/f-012.webp` ▄
- 00:13.10 `motion/vision-pro-sort/f-013.webp` ▄
- 00:13.18 `motion/vision-pro-sort/f-014.webp` ▄
- 00:13.27 `motion/vision-pro-sort/f-015.webp` ▄
- 00:13.35 `motion/vision-pro-sort/f-016.webp` ▄
- 00:13.43 `motion/vision-pro-sort/f-017.webp` ▄
- 00:13.52 `motion/vision-pro-sort/f-018.webp` █

### 09. Lamp Shopping, Oppenheimer, Arc Browser

00:13.45–00:14.95 (1.50 s) · 19 frames at 12 fps, 0.083 s apart · regroup, labels appear, repetition

An orange Space over a dark forest, beside a product page for a white ceramic lamp. The list holds unsorted until about 13.92, then reorders in about two frames, and from 14.0 reads 'Lamp Shopping', 'Oppenheimer' and 'Arc Browser'. The sort comes later in this shot than in the last, about 0.4 s in rather than 0.25, then holds until the cut to 'Now available in Arc' at 14.88.

Motion: `▄▇▃▃▃▃▅▅▃▃▃▃▃▃▃▃▄█▁`

- 00:13.45 `motion/lamp-sort/f-001.webp` ▄
- 00:13.53 `motion/lamp-sort/f-002.webp` ▇
- 00:13.62 `motion/lamp-sort/f-003.webp` ▃
- 00:13.70 `motion/lamp-sort/f-004.webp` ▃
- 00:13.78 `motion/lamp-sort/f-005.webp` ▃
- 00:13.87 `motion/lamp-sort/f-006.webp` ▃
- 00:13.95 `motion/lamp-sort/f-007.webp` ▅
- 00:14.03 `motion/lamp-sort/f-008.webp` ▅
- 00:14.12 `motion/lamp-sort/f-009.webp` ▃
- 00:14.20 `motion/lamp-sort/f-010.webp` ▃
- 00:14.28 `motion/lamp-sort/f-011.webp` ▃
- 00:14.37 `motion/lamp-sort/f-012.webp` ▃
- 00:14.45 `motion/lamp-sort/f-013.webp` ▃
- 00:14.53 `motion/lamp-sort/f-014.webp` ▃
- 00:14.62 `motion/lamp-sort/f-015.webp` ▃
- 00:14.70 `motion/lamp-sort/f-016.webp` ▃
- 00:14.78 `motion/lamp-sort/f-017.webp` ▄
- 00:14.87 `motion/lamp-sort/f-018.webp` █
- 00:14.95 `motion/lamp-sort/f-019.webp` ▁

### 10. End on the wait, not the result

00:16.00–00:17.45 (1.45 s) · 18 frames at 12 fps, 0.083 s apart · close-up, wavy line, cut before result

A close-up of the teal Space, with a pinned 'letterboxd' tab above 'Clear'. The pointer is under the broom at 16.08 and the divider begins to ripple at about 16.42, a full wave by 16.58. The pointer drifts left along the wave while it moves. The cut to the logo comes at 17.35 with the line still wavy: the film's last product image is the feature at work.

Motion: `▇▁▁▁▁▁▂▃▃▃▂▂▃▂▂▂█▁`

- 00:16.00 `motion/last-click/f-001.webp` ▇
- 00:16.08 `motion/last-click/f-002.webp` ▁
- 00:16.17 `motion/last-click/f-003.webp` ▁
- 00:16.25 `motion/last-click/f-004.webp` ▁
- 00:16.33 `motion/last-click/f-005.webp` ▁
- 00:16.42 `motion/last-click/f-006.webp` ▁
- 00:16.50 `motion/last-click/f-007.webp` ▂
- 00:16.58 `motion/last-click/f-008.webp` ▃
- 00:16.67 `motion/last-click/f-009.webp` ▃
- 00:16.75 `motion/last-click/f-010.webp` ▃
- 00:16.83 `motion/last-click/f-011.webp` ▂
- 00:16.92 `motion/last-click/f-012.webp` ▂
- 00:17.00 `motion/last-click/f-013.webp` ▃
- 00:17.08 `motion/last-click/f-014.webp` ▂
- 00:17.17 `motion/last-click/f-015.webp` ▂
- 00:17.25 `motion/last-click/f-016.webp` ▂
- 00:17.33 `motion/last-click/f-017.webp` █
- 00:17.42 `motion/last-click/f-018.webp` ▁

### 11. Logo, then the address

00:17.25–00:20.25 (3.00 s) · 13 frames at 4 fps, 0.250 s apart · logo, swap, hold

The Arc logo appears at 17.35, a white looping line on the same blue, and holds still for over a second. At about 18.7 it is swapped on a single frame for 'arc.net', which holds to the end at 20.5. No animation on the logo and no tagline: the address is the call to action.

Motion: `▆▁▁▁▁▁▃▁▁▁▁▁▁`

- 00:17.25 `motion/end-card/f-001.webp` ▆
- 00:17.50 `motion/end-card/f-002.webp` ▁
- 00:17.75 `motion/end-card/f-003.webp` ▁
- 00:18.00 `motion/end-card/f-004.webp` ▁
- 00:18.25 `motion/end-card/f-005.webp` ▁
- 00:18.50 `motion/end-card/f-006.webp` ▁
- 00:18.75 `motion/end-card/f-007.webp` ▃
- 00:19.00 `motion/end-card/f-008.webp` ▁
- 00:19.25 `motion/end-card/f-009.webp` ▁
- 00:19.50 `motion/end-card/f-010.webp` ▁
- 00:19.75 `motion/end-card/f-011.webp` ▁
- 00:20.00 `motion/end-card/f-012.webp` ▁
- 00:20.25 `motion/end-card/f-013.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` 'Don't worry' in heavy white sans on flat Arc blue (about #124CF6). 'Don't' appears at 0.17 and 'worry' at 0.5, one word per beat. The film reassures before it has shown any problem.
- 00:01.00 `seconds/second-00002.webp` A hard cut to Arc's sidebar, magnified so one tab row is about the height of a headline. A photo of a pine forest shows through on the left, a sliver of white page sits on the right, and the pointer rests out on the page. One tab so far: 'The 15 Best Vacuum Cl…'.
- 00:02.00 `seconds/second-00003.webp` Tabs keep arriving at the bottom of the list and the view scrolls down with them: vacuum reviews, the 2024 Oscars, tips for a visit to San Diego. This is the rabbit hole from the video's description, shown and never said.
- 00:03.00 `seconds/second-00004.webp` Zoo lists, a site called Sebo, more Oscars. The tabs have nothing in common, which is the point. New rows fade up from transparent rather than sliding in.
- 00:04.00 `seconds/second-00005.webp` Back to blue for 'Tab', alone. It is used as a verb, which is Arc's voice: tabbing is something you do, like browsing.
- 00:05.00 `seconds/second-00006.webp` 'Tab freely', with 'freely' set in italic. The only styled word in the film, and the permission the ad is selling.
- 00:06.00 `seconds/second-00007.webp` Close on the top of the sidebar: 'Clear' with a small broom icon, and the pointer on it. The divider line to its left has started to ripple. The film puts the camera right on the one control that matters.
- 00:07.00 `seconds/second-00008.webp` The camera has pulled back to show the sidebar beside an article page ('The Best…', a vacuum review), still with the same unsorted tabs. The pull-back gives the viewer the whole list just before it changes.
- 00:08.00 `seconds/second-00009.webp` Sorted. The same tabs now sit under small grey labels, 'Vacuum Shopping', 'Movies' and 'San Diego Zoo', with the tab you were on kept at the top. Nothing else on screen has changed, so the change reads at a glance.
- 00:09.00 `seconds/second-00010.webp` 'Tidy Tabs' on blue: the feature's name arrives only after the viewer has watched it work once. It fades up in a few frames instead of cutting on.
- 00:10.00 `seconds/second-00011.webp` A second Space, in salmon with a black-and-white mountain wallpaper. The same close-up of 'Clear' and the same pointer, framed almost identically to the first, so the second demo is recognized instantly.
- 00:11.00 `seconds/second-00012.webp` Wide on the salmon Space beside a CBS Sports article, mid-sort: Super Bowl 58, Valentine's Day lists and Grammys tabs settling under their labels. The film skipped the wait by cutting away from the close-up while the line was still wavy.
- 00:12.00 `seconds/second-00013.webp` A third Space in teal over a painted sky: Universal Studios tips, a Vision Pro durability video and Mario games, still mixed. The open page is a blurred YouTube video of a man talking, so it reads as someone's real browsing, not a staged page.
- 00:13.00 `seconds/second-00014.webp` The teal list sorted into 'Universal Studios', 'Vision Pro' and 'Nintendo Games'. Each wide shot starts messy and ends sorted within about half a second.
- 00:14.00 `seconds/second-00015.webp` A fourth Space in orange over a dark forest: a white lamp product page, with tabs sorted into 'Lamp Shopping', 'Oppenheimer' and 'Arc Browser'. One of the groups is Arc's own launch video, a quiet in-joke.
- 00:15.00 `seconds/second-00016.webp` 'Now available in Arc' on blue, the longest line in the film and the only one that is plain information.
- 00:16.00 `seconds/second-00017.webp` Back to a close-up: a pinned 'letterboxd' tab above the teal Space's 'Clear', the pointer under the broom, the divider just starting to ripple. The film returns to the button one more time instead of ending on a result.
- 00:17.00 `seconds/second-00018.webp` The Arc logo, a white looping line drawing, alone on blue. The cut comes while the divider is still wavy, so the last product image is the feature working, not finished.
- 00:19.00 `seconds/second-00020.webp` 'arc.net' replaces the logo at about 18.7 and holds to the end, in the same white sans as the rest of the copy.
