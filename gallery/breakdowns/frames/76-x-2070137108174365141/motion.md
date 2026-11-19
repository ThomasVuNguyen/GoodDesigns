# Motion notes: Best-performing @browsercompany feature of all time:

Josh Miller (@joshm) · 00:30.14 · https://x.com/joshm/status/2070137108174365141

The camera hardly moves. Most shots are locked off, and the same wide of the woman at her desk is used for both mornings, so the difference between them has to come from the cutting and the sound. The first half accelerates: shots of two to three seconds give way to faces held a quarter of a second, ending in a whip and a cut to black. The second half slows down and moves by matching: from the painting on the wall, to the same painting on the screen, to the brief floating over a painted landscape. The sequences below follow both lid openings, the build to the scream, the reset through black, the painting and the product.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▅▄▃▂▃▄▅▆▅▆▁▄▂▂▄▂▄▄▄▃▂▅▂▆▄▄▅▃▂▃▄
```

## Sequences

### 01. Sitting down, and the first lid

00:00.00–00:02.75 (2.75 s) · 23 frames at 8 fps, 0.125 s apart · wide to insert, soft focus, title

The film opens mid-action in the wide: she is already settling into the chair, and the only sound is the room (a scrape, a thump). At 0.75 it cuts to a soft close-up of her hand lifting the laptop lid, and at 1.0 'Mornings with Chrome.' appears in white sans, centered, with no animation. A bright, chiming cue starts on the title, and the lid is held open, out of focus, until the cut back to the wide at 2.71.

Motion: `▇▃▃▄▄▄▇▄▅▅▄▄▃▃▃▃▃▂▂▂▂▆▂`

- 00:00.00 `motion/chrome-lid/f-001.webp` ▇
- 00:00.12 `motion/chrome-lid/f-002.webp` ▃
- 00:00.25 `motion/chrome-lid/f-003.webp` ▃
- 00:00.38 `motion/chrome-lid/f-004.webp` ▄
- 00:00.50 `motion/chrome-lid/f-005.webp` ▄
- 00:00.62 `motion/chrome-lid/f-006.webp` ▄
- 00:00.75 `motion/chrome-lid/f-007.webp` ▇
- 00:00.88 `motion/chrome-lid/f-008.webp` ▄
- 00:01.00 `motion/chrome-lid/f-009.webp` ▅
- 00:01.12 `motion/chrome-lid/f-010.webp` ▅
- 00:01.25 `motion/chrome-lid/f-011.webp` ▄
- 00:01.38 `motion/chrome-lid/f-012.webp` ▄
- 00:01.50 `motion/chrome-lid/f-013.webp` ▃
- 00:01.62 `motion/chrome-lid/f-014.webp` ▃
- 00:01.75 `motion/chrome-lid/f-015.webp` ▃
- 00:01.88 `motion/chrome-lid/f-016.webp` ▃
- 00:02.00 `motion/chrome-lid/f-017.webp` ▃
- 00:02.12 `motion/chrome-lid/f-018.webp` ▂
- 00:02.25 `motion/chrome-lid/f-019.webp` ▂
- 00:02.38 `motion/chrome-lid/f-020.webp` ▂
- 00:02.50 `motion/chrome-lid/f-021.webp` ▂
- 00:02.62 `motion/chrome-lid/f-022.webp` ▆
- 00:02.75 `motion/chrome-lid/f-023.webp` ▂

### 02. Reading, then screaming, in one locked-off shot

00:02.70–00:05.70 (3.00 s) · 19 frames at 6 fps, 0.167 s apart · locked off, performance, slow build

The wide holds for 2.9 seconds. She reads, and over the first second her brow tightens while notification sounds land one after another (a ding at about 2.0, plops from 2.2 to 3.5, chimes at 3.0). By 3.75 her mouth is opening, and from 4.25 she is screaming, head tipped forward. The camera does not move or cut in. The music climbs steadily under the whole shot, about 15 dB in three seconds.

Motion: `▆▁▁▁▁▁▂▂▂▃▄▃▂▂▂▂▂▆▂`

- 00:02.70 `motion/build/f-001.webp` ▆
- 00:02.87 `motion/build/f-002.webp` ▁
- 00:03.03 `motion/build/f-003.webp` ▁
- 00:03.20 `motion/build/f-004.webp` ▁
- 00:03.37 `motion/build/f-005.webp` ▁
- 00:03.53 `motion/build/f-006.webp` ▁
- 00:03.70 `motion/build/f-007.webp` ▂
- 00:03.87 `motion/build/f-008.webp` ▂
- 00:04.03 `motion/build/f-009.webp` ▂
- 00:04.20 `motion/build/f-010.webp` ▃
- 00:04.37 `motion/build/f-011.webp` ▄
- 00:04.53 `motion/build/f-012.webp` ▃
- 00:04.70 `motion/build/f-013.webp` ▂
- 00:04.87 `motion/build/f-014.webp` ▂
- 00:05.03 `motion/build/f-015.webp` ▂
- 00:05.20 `motion/build/f-016.webp` ▂
- 00:05.37 `motion/build/f-017.webp` ▂
- 00:05.53 `motion/build/f-018.webp` ▆
- 00:05.70 `motion/build/f-019.webp` ▂

### 03. One scream, then everyone's

00:05.50–00:10.00 (4.50 s) · 37 frames at 8 fps, 0.125 s apart · close-up, accelerating cuts, faces on black, whip

At 5.58 a frame-filling close-up of her scream, and a siren arrives on the cut. From about 6.0 her face is on black too, and the film starts cutting between her and nine strangers screaming straight at the lens: a man in a black T-shirt, a bearded man, a man in glasses, a woman with curly hair, a man in a pink shirt, a woman more shocked than angry, a bald man, another man in thick glasses. Each face holds two to six frames, an eighth to a quarter of a second, and several come back. The changes are face to face on black, so the cut detector misses most of them. At 9.5 it is her again in the room, her mouth closing for a beat at about 9.6, then a whip pan across her green shirt at 9.75 and a hard cut to black at 9.92. The music peaks at about -13 dBFS from 8.25 to 9.25.

Motion: `▆▃▂▂▂▇▅▄▄▅▅▅▅▅▅▅▆▆▆▆▅▅▅▅▆▆▅▆▅▅▆▆▇▆▇▇▁`

- 00:05.50 `motion/faces/f-001.webp` ▆
- 00:05.62 `motion/faces/f-002.webp` ▃
- 00:05.75 `motion/faces/f-003.webp` ▂
- 00:05.88 `motion/faces/f-004.webp` ▂
- 00:06.00 `motion/faces/f-005.webp` ▂
- 00:06.12 `motion/faces/f-006.webp` ▇
- 00:06.25 `motion/faces/f-007.webp` ▅
- 00:06.38 `motion/faces/f-008.webp` ▄
- 00:06.50 `motion/faces/f-009.webp` ▄
- 00:06.62 `motion/faces/f-010.webp` ▅
- 00:06.75 `motion/faces/f-011.webp` ▅
- 00:06.88 `motion/faces/f-012.webp` ▅
- 00:07.00 `motion/faces/f-013.webp` ▅
- 00:07.12 `motion/faces/f-014.webp` ▅
- 00:07.25 `motion/faces/f-015.webp` ▅
- 00:07.38 `motion/faces/f-016.webp` ▅
- 00:07.50 `motion/faces/f-017.webp` ▆
- 00:07.62 `motion/faces/f-018.webp` ▆
- 00:07.75 `motion/faces/f-019.webp` ▆
- 00:07.88 `motion/faces/f-020.webp` ▆
- 00:08.00 `motion/faces/f-021.webp` ▅
- 00:08.12 `motion/faces/f-022.webp` ▅
- 00:08.25 `motion/faces/f-023.webp` ▅
- 00:08.38 `motion/faces/f-024.webp` ▅
- 00:08.50 `motion/faces/f-025.webp` ▆
- 00:08.62 `motion/faces/f-026.webp` ▆
- 00:08.75 `motion/faces/f-027.webp` ▅
- 00:08.88 `motion/faces/f-028.webp` ▆
- 00:09.00 `motion/faces/f-029.webp` ▅
- 00:09.12 `motion/faces/f-030.webp` ▅
- 00:09.25 `motion/faces/f-031.webp` ▆
- 00:09.38 `motion/faces/f-032.webp` ▆
- 00:09.50 `motion/faces/f-033.webp` ▇
- 00:09.62 `motion/faces/f-034.webp` ▆
- 00:09.75 `motion/faces/f-035.webp` ▇
- 00:09.88 `motion/faces/f-036.webp` ▇
- 00:10.00 `motion/faces/f-037.webp` ▁

### 04. A hit, black, silence, birds

00:09.70–00:13.50 (3.80 s) · 16 frames at 4 fps, 0.250 s apart · hard cut to black, silence, same setup, title

The whip ends on black at 9.92 with a hit, and by 10.25 the soundtrack has fallen from -13 dBFS to digital silence. The black holds for 1.1 seconds. At 11.04 the same wide returns, framed identically, and she is calm; birdsong fades up with the picture, very quietly (about -57 dBFS). Nothing else happens for two seconds. At 13.0 'Mornings with Dia.' appears in the same place and type as the first title, and strings enter under it.

Motion: `▇▅▁▁▁▆▁▁▁▂▂▂▂▂▂▂`

- 00:09.70 `motion/reset/f-001.webp` ▇
- 00:09.95 `motion/reset/f-002.webp` ▅
- 00:10.20 `motion/reset/f-003.webp` ▁
- 00:10.45 `motion/reset/f-004.webp` ▁
- 00:10.70 `motion/reset/f-005.webp` ▁
- 00:10.95 `motion/reset/f-006.webp` ▆
- 00:11.20 `motion/reset/f-007.webp` ▁
- 00:11.45 `motion/reset/f-008.webp` ▁
- 00:11.70 `motion/reset/f-009.webp` ▁
- 00:11.95 `motion/reset/f-010.webp` ▂
- 00:12.20 `motion/reset/f-011.webp` ▂
- 00:12.45 `motion/reset/f-012.webp` ▂
- 00:12.70 `motion/reset/f-013.webp` ▂
- 00:12.95 `motion/reset/f-014.webp` ▂
- 00:13.20 `motion/reset/f-015.webp` ▂
- 00:13.45 `motion/reset/f-016.webp` ▂

### 05. What she is looking at

00:14.20–00:17.60 (3.40 s) · 15 frames at 4 fps, 0.250 s apart · eyeline cut, insert, plant

At 14.5 the film cuts to the wall above her desk: a small painting of a figure with a parasol on a sunlit coast, a stack of books below it. The music phrase ends just before the cut and thins to almost nothing by 15.5, so the painting gets a quiet beat. At 16.21 it is back on her, looking up at it with the start of a smile, and the strings come back as she turns to the laptop. The painting is a plant: it will be the first thing on her screen.

Motion: `▂▆▂▂▂▂▂▂▆▂▂▃▃▃▆`

- 00:14.20 `motion/painting/f-001.webp` ▂
- 00:14.45 `motion/painting/f-002.webp` ▆
- 00:14.70 `motion/painting/f-003.webp` ▂
- 00:14.95 `motion/painting/f-004.webp` ▂
- 00:15.20 `motion/painting/f-005.webp` ▂
- 00:15.45 `motion/painting/f-006.webp` ▂
- 00:15.70 `motion/painting/f-007.webp` ▂
- 00:15.95 `motion/painting/f-008.webp` ▂
- 00:16.20 `motion/painting/f-009.webp` ▆
- 00:16.45 `motion/painting/f-010.webp` ▂
- 00:16.70 `motion/painting/f-011.webp` ▂
- 00:16.95 `motion/painting/f-012.webp` ▃
- 00:17.20 `motion/painting/f-013.webp` ▃
- 00:17.45 `motion/painting/f-014.webp` ▃
- 00:17.70 `motion/painting/f-015.webp` ▆

### 06. The second lid opens on the painting

00:17.20–00:20.60 (3.40 s) · 28 frames at 8 fps, 0.125 s apart · low angle, match, title fade, sound from the picture

At 17.75 a low angle across the desk: her hand pulls the lid up, and by 18.25 the screen shows the same painting, framed on white. It is the same gesture as the first lid at 0.75, now in focus and shown in full. The music dips for half a second around 19.0, and at about 19.6 'The Monday Brief' fades up in yellow serif over the painting while a bird coos, the one sound in the film that seems to come from inside a picture.

Motion: `▃▃▃▃▇▄▅▄▆▃▃▂▂▂▂▂▂▃▃▃▃▃▂▂▂▂▂▂`

- 00:17.20 `motion/dia-lid/f-001.webp` ▃
- 00:17.32 `motion/dia-lid/f-002.webp` ▃
- 00:17.45 `motion/dia-lid/f-003.webp` ▃
- 00:17.57 `motion/dia-lid/f-004.webp` ▃
- 00:17.70 `motion/dia-lid/f-005.webp` ▇
- 00:17.82 `motion/dia-lid/f-006.webp` ▄
- 00:17.95 `motion/dia-lid/f-007.webp` ▅
- 00:18.07 `motion/dia-lid/f-008.webp` ▄
- 00:18.20 `motion/dia-lid/f-009.webp` ▆
- 00:18.32 `motion/dia-lid/f-010.webp` ▃
- 00:18.45 `motion/dia-lid/f-011.webp` ▃
- 00:18.57 `motion/dia-lid/f-012.webp` ▂
- 00:18.70 `motion/dia-lid/f-013.webp` ▂
- 00:18.82 `motion/dia-lid/f-014.webp` ▂
- 00:18.95 `motion/dia-lid/f-015.webp` ▂
- 00:19.07 `motion/dia-lid/f-016.webp` ▂
- 00:19.20 `motion/dia-lid/f-017.webp` ▂
- 00:19.32 `motion/dia-lid/f-018.webp` ▃
- 00:19.45 `motion/dia-lid/f-019.webp` ▃
- 00:19.57 `motion/dia-lid/f-020.webp` ▃
- 00:19.70 `motion/dia-lid/f-021.webp` ▃
- 00:19.82 `motion/dia-lid/f-022.webp` ▃
- 00:19.95 `motion/dia-lid/f-023.webp` ▂
- 00:20.07 `motion/dia-lid/f-024.webp` ▂
- 00:20.20 `motion/dia-lid/f-025.webp` ▂
- 00:20.32 `motion/dia-lid/f-026.webp` ▂
- 00:20.45 `motion/dia-lid/f-027.webp` ▂
- 00:20.57 `motion/dia-lid/f-028.webp` ▂

### 07. From the desk into a painted world

00:20.80–00:23.40 (2.60 s) · 22 frames at 8 fps, 0.125 s apart · push in, whoosh, screen recording, painted backdrop

The laptop holds on the desk until about 21.3, when a whoosh carries the film into the screen: the brief now floats as a clean window over a painted landscape of leaves and a red roof, in the same brushy style as the painting. The window drifts slightly larger. At 23.12 it cuts in tight on the header, the yellow 'Monday Brief' type cropped huge across a figure with a parasol, and the first to-dos below.

Motion: `▂▂▂▅▇▇▄▃▃▂▂▂▁▁▂▁▁▃▇▂▂▂`

- 00:20.80 `motion/into-screen/f-001.webp` ▂
- 00:20.93 `motion/into-screen/f-002.webp` ▂
- 00:21.05 `motion/into-screen/f-003.webp` ▂
- 00:21.18 `motion/into-screen/f-004.webp` ▅
- 00:21.30 `motion/into-screen/f-005.webp` ▇
- 00:21.43 `motion/into-screen/f-006.webp` ▇
- 00:21.55 `motion/into-screen/f-007.webp` ▄
- 00:21.68 `motion/into-screen/f-008.webp` ▃
- 00:21.80 `motion/into-screen/f-009.webp` ▃
- 00:21.93 `motion/into-screen/f-010.webp` ▂
- 00:22.05 `motion/into-screen/f-011.webp` ▂
- 00:22.18 `motion/into-screen/f-012.webp` ▂
- 00:22.30 `motion/into-screen/f-013.webp` ▁
- 00:22.43 `motion/into-screen/f-014.webp` ▁
- 00:22.55 `motion/into-screen/f-015.webp` ▂
- 00:22.68 `motion/into-screen/f-016.webp` ▁
- 00:22.80 `motion/into-screen/f-017.webp` ▁
- 00:22.93 `motion/into-screen/f-018.webp` ▃
- 00:23.05 `motion/into-screen/f-019.webp` ▇
- 00:23.18 `motion/into-screen/f-020.webp` ▂
- 00:23.30 `motion/into-screen/f-021.webp` ▂
- 00:23.43 `motion/into-screen/f-022.webp` ▂

### 08. Scrolling the brief to one click

00:23.10–00:26.40 (3.30 s) · 21 frames at 6 fps, 0.167 s apart · scroll, cursor, sticker button, click

The camera glides down the page: 'Respond to Marco's Art Direction' already struck through, 'Finalize Summer Launch Timeline', 'Make Time to Thank Ben', 'Settings Redesign — Prioritization', 'Meeting Prep in Jour', each with a line of context and a Slack, Notion or GitHub icon. At 25.0 it settles on 'You have a busy day today!' and a yellow starburst sticker, 'Prep for this →'; the cursor clicks it at about 25.4, with small clicks in the music. The footer credits 'Google Calendar, Slack, Notion, and GitHub'.

Motion: `▇▂▃▅▆▆▅▅▄▃▂▃▄▅▅▃▁▁▁█▃`

- 00:23.10 `motion/brief/f-001.webp` ▇
- 00:23.27 `motion/brief/f-002.webp` ▂
- 00:23.43 `motion/brief/f-003.webp` ▃
- 00:23.60 `motion/brief/f-004.webp` ▅
- 00:23.77 `motion/brief/f-005.webp` ▆
- 00:23.93 `motion/brief/f-006.webp` ▆
- 00:24.10 `motion/brief/f-007.webp` ▅
- 00:24.27 `motion/brief/f-008.webp` ▅
- 00:24.43 `motion/brief/f-009.webp` ▄
- 00:24.60 `motion/brief/f-010.webp` ▃
- 00:24.77 `motion/brief/f-011.webp` ▂
- 00:24.93 `motion/brief/f-012.webp` ▃
- 00:25.10 `motion/brief/f-013.webp` ▄
- 00:25.27 `motion/brief/f-014.webp` ▅
- 00:25.43 `motion/brief/f-015.webp` ▅
- 00:25.60 `motion/brief/f-016.webp` ▃
- 00:25.77 `motion/brief/f-017.webp` ▁
- 00:25.93 `motion/brief/f-018.webp` ▁
- 00:26.10 `motion/brief/f-019.webp` ▁
- 00:26.27 `motion/brief/f-020.webp` █
- 00:26.43 `motion/brief/f-021.webp` ▃

### 09. End card, and the mark rises

00:26.00–00:30.00 (4.00 s) · 17 frames at 4 fps, 0.250 s apart · end card, soft focus, logo reveal

At 26.25 a soft close-up of her hand resting near the laptop, with 'A better way to start your work day.' in two staggered lines of white sans and 'diabrowser.com' in small serif below. The music dips on the cut and comes back. At 27.0 the Dia mark rises into place above the line, half visible and then whole by 27.25, and the card holds as the strings fade out from 29.0.

Motion: `▁▇▂▂▂▂▄▃▃▃▂▂▂▂▃▄▄`

- 00:26.00 `motion/end-card/f-001.webp` ▁
- 00:26.25 `motion/end-card/f-002.webp` ▇
- 00:26.50 `motion/end-card/f-003.webp` ▂
- 00:26.75 `motion/end-card/f-004.webp` ▂
- 00:27.00 `motion/end-card/f-005.webp` ▂
- 00:27.25 `motion/end-card/f-006.webp` ▂
- 00:27.50 `motion/end-card/f-007.webp` ▄
- 00:27.75 `motion/end-card/f-008.webp` ▃
- 00:28.00 `motion/end-card/f-009.webp` ▃
- 00:28.25 `motion/end-card/f-010.webp` ▃
- 00:28.50 `motion/end-card/f-011.webp` ▂
- 00:28.75 `motion/end-card/f-012.webp` ▂
- 00:29.00 `motion/end-card/f-013.webp` ▂
- 00:29.25 `motion/end-card/f-014.webp` ▂
- 00:29.50 `motion/end-card/f-015.webp` ▃
- 00:29.75 `motion/end-card/f-016.webp` ▄
- 00:30.00 `motion/end-card/f-017.webp` ▄

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` A wide of a woman in a green shirt settling at a wooden desk in a bright loft, a closed laptop in front of her. The soundtrack is only room sound: the scrape and thump of her sitting down.
- 00:01.00 `seconds/second-00002.webp` A tight, soft close-up of a hand lifting a laptop lid, with 'Mornings with Chrome.' in white sans across the middle. A chirpy, ringtone-like cue starts under it.
- 00:03.00 `seconds/second-00004.webp` Back to the wide: she reads the screen, which the film never shows. Pings and plops of notifications pile up on the soundtrack, and her face falls.
- 00:04.00 `seconds/second-00005.webp` The same locked-off wide, her mouth opening. The music is rising, and nothing you hear comes from her.
- 00:05.00 `seconds/second-00006.webp` Mid-scream in the wide, eyes squeezed shut. The scream is silent; at the cut that follows, a siren takes its place.
- 00:06.00 `seconds/second-00007.webp` A stranger in a black T-shirt screaming straight at the lens on black. The cut from her close-up brought a siren with it; no human scream is heard here or anywhere.
- 00:07.00 `seconds/second-00008.webp` Another stranger, in a white T-shirt, framed the same way. Each face holds two to six frames, an eighth to a quarter of a second, with her own face cut onto black among them.
- 00:08.00 `seconds/second-00009.webp` A man in thick glasses, mid-scream. Nine strangers in all, several of them more than once, so the morning reads as everyone's. The music is near its peak.
- 00:09.00 `seconds/second-00010.webp` A woman with curly hair, teeth bared, one of the last faces before the film whips back to her and cuts out.
- 00:10.00 `seconds/second-00011.webp` Black. A hit (the tagger hears a bang or a door) lands on the cut at 9.9, and by 10.25 the sound has dropped to digital silence.
- 00:11.00 `seconds/second-00012.webp` The same wide, the same woman, the same desk, and she is calm. Birdsong fades up from nothing with the picture.
- 00:12.00 `seconds/second-00013.webp` Held. For two seconds the film offers only birds and a still shot, the quietest moment in it.
- 00:13.00 `seconds/second-00014.webp` 'Mornings with Dia.' in the same white sans at the same size. Strings enter with the title, about 15 dB louder than the birds.
- 00:15.00 `seconds/second-00016.webp` A cut to what she is looking at: a small painting on the wall above the desk, a figure with a parasol on a sunlit coast. The music thins to almost nothing under it.
- 00:16.00 `seconds/second-00017.webp` Back on her, looking up at the painting with the start of a smile. The strings return as she turns to the desk.
- 00:17.00 `seconds/second-00018.webp` She looks down and reaches for the laptop. A soft tick sits in the music.
- 00:18.00 `seconds/second-00019.webp` A low angle across the desk as the lid comes up, and the screen shows the same painting. The prop on the wall has become the screen.
- 00:19.00 `seconds/second-00020.webp` The laptop open on the painting. The music dips for half a second to leave room for what comes next.
- 00:20.00 `seconds/second-00021.webp` 'The Monday Brief' fades up in yellow serif over the painting on screen, timed to a bird's coo, the one sound that seems to come from inside the picture.
- 00:22.00 `seconds/second-00023.webp` The screen recording now floats over a painted landscape of green leaves and a red roof, in the same brushy style as the painting. The brief is dated '22 JUNE 2026' and '09:05:00 AM', with 'Top to-dos' below.
- 00:23.00 `seconds/second-00024.webp` A tight crop of the header, 'Monday Brief' in huge yellow serif across the figure with the parasol, and the first to-dos below: 'Respond to Marco's Art Direction' struck through, then 'Finalize Summer Launch Timeline' and 'Make Time to Thank Ben'.
- 00:24.00 `seconds/second-00025.webp` 'You have a busy day today!', with a line on each meeting and a Slack or Notion icon, and a yellow starburst sticker reading 'Prep for this →' beside it.
- 00:25.00 `seconds/second-00026.webp` The cursor on the sticker. The click is marked by soft clicks in the music; it is the only interaction shown.
- 00:26.00 `seconds/second-00027.webp` The end card over a soft close-up of her hand at the laptop: 'A better way to start your work day.' and 'diabrowser.com'. The music dips on the cut and comes back.
- 00:27.00 `seconds/second-00028.webp` The Dia mark rises into place above the line, small and white.
- 00:29.00 `seconds/second-00030.webp` Held to the end as the strings fade out.
