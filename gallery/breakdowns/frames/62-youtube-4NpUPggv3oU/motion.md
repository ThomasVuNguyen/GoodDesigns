# Motion notes: Ideas are everywhere

Lovable · 01:00.05 · https://www.youtube.com/watch?v=4NpUPggv3oU

Almost nothing here is a plain cut. The world is a black stage with Lovable's blue, pink and orange gradient glowing along the bottom of the frame like a horizon, and the moving parts are the product's own pieces: the prompt box, the send arrow, the heart, a hand cursor. Type blurs into focus word by word as it is spoken. Apps change under a liquid smear of the gradient while the window holds still. Shapes hand off to each other: the wordmark turns out to sit in a prompt box, the send button becomes a loading flower whose star opens onto the finished app, a sign-up button becomes a database row, a laptop shrinks into a globe icon. The camera pushes into whatever is about to be pressed, and every press gets a visible pressed state.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▁▃▄▃▄▁▂▂▂▂▂▃▂▁▁▃▃▅▅▅▆▅▅▃▄▃▄▄▇▇▆▆▅▅▅▅▆▆▆▅▄▅▄▂▄▅▄▅▄▄▅▅▅▃▃▆▇▆▅▁
01:00  ▁
```

## Sequences

### 01. The first line blurs in word by word

00:00.00–00:02.00 (2.00 s) · 25 frames at 12 fps, 0.083 s apart · blur to focus, word by word, scale down, voice sync

'Ideas' resolves out of a blur at about 0.25, large and soft-glowing on black. 'are' arrives blurred at 0.75 and sharpens over a few frames. At 1.0 the whole line jumps smaller as 'everywhere' joins, also arriving soft, and it is sharp by 1.25. Each word lands with the narrator. At 1.9 the line starts to blur away before the first footage cuts in at 1.97.

Motion: `▁▁▁▁▁▁▁▁▁▂▁▁▃▁▁▁▁▁▁▁▁▁▁▆▃`

- 00:00.00 `motion/line-blurs-in/f-001.webp` ▁
- 00:00.08 `motion/line-blurs-in/f-002.webp` ▁
- 00:00.17 `motion/line-blurs-in/f-003.webp` ▁
- 00:00.25 `motion/line-blurs-in/f-004.webp` ▁
- 00:00.33 `motion/line-blurs-in/f-005.webp` ▁
- 00:00.42 `motion/line-blurs-in/f-006.webp` ▁
- 00:00.50 `motion/line-blurs-in/f-007.webp` ▁
- 00:00.58 `motion/line-blurs-in/f-008.webp` ▁
- 00:00.67 `motion/line-blurs-in/f-009.webp` ▁
- 00:00.75 `motion/line-blurs-in/f-010.webp` ▂
- 00:00.83 `motion/line-blurs-in/f-011.webp` ▁
- 00:00.92 `motion/line-blurs-in/f-012.webp` ▁
- 00:01.00 `motion/line-blurs-in/f-013.webp` ▃
- 00:01.08 `motion/line-blurs-in/f-014.webp` ▁
- 00:01.17 `motion/line-blurs-in/f-015.webp` ▁
- 00:01.25 `motion/line-blurs-in/f-016.webp` ▁
- 00:01.33 `motion/line-blurs-in/f-017.webp` ▁
- 00:01.42 `motion/line-blurs-in/f-018.webp` ▁
- 00:01.50 `motion/line-blurs-in/f-019.webp` ▁
- 00:01.58 `motion/line-blurs-in/f-020.webp` ▁
- 00:01.67 `motion/line-blurs-in/f-021.webp` ▁
- 00:01.75 `motion/line-blurs-in/f-022.webp` ▁
- 00:01.83 `motion/line-blurs-in/f-023.webp` ▁
- 00:01.92 `motion/line-blurs-in/f-024.webp` ▆
- 00:02.00 `motion/line-blurs-in/f-025.webp` ▃

### 02. Footage in small glowing windows

00:01.90–00:06.00 (4.10 s) · 26 frames at 6 fps, 0.167 s apart · picture in black, window shape, fast cutting, caption holds

At 1.97 a small window opens in the black on what looks like home-movie footage, a child on a tricycle, with rounded corners and a soft glow around it. The clips change every half second to a second: a toddler in a garden (2.47), lit apartment windows at night (2.9), a subway platform (3.6), a city street and a taxi (4.0 to 4.6), a figure at a desk under a warm lamp (4.75). Each window takes the shape of its clip, 4:3 for the home movie, portrait for the street, wide for the desk, while the caption stays dead center. Small windows in darkness make the footage feel like glimpses of other people's lives.

Motion: `▅▃▂▅▄▄▃▂▁▁▄▃▅▃▅▄▆▂▁▁▁▁▁▁▄▂`

- 00:01.90 `motion/footage-windows/f-001.webp` ▅
- 00:02.07 `motion/footage-windows/f-002.webp` ▃
- 00:02.23 `motion/footage-windows/f-003.webp` ▂
- 00:02.40 `motion/footage-windows/f-004.webp` ▅
- 00:02.57 `motion/footage-windows/f-005.webp` ▄
- 00:02.73 `motion/footage-windows/f-006.webp` ▄
- 00:02.90 `motion/footage-windows/f-007.webp` ▃
- 00:03.07 `motion/footage-windows/f-008.webp` ▂
- 00:03.23 `motion/footage-windows/f-009.webp` ▁
- 00:03.40 `motion/footage-windows/f-010.webp` ▁
- 00:03.57 `motion/footage-windows/f-011.webp` ▄
- 00:03.73 `motion/footage-windows/f-012.webp` ▃
- 00:03.90 `motion/footage-windows/f-013.webp` ▅
- 00:04.07 `motion/footage-windows/f-014.webp` ▃
- 00:04.23 `motion/footage-windows/f-015.webp` ▅
- 00:04.40 `motion/footage-windows/f-016.webp` ▄
- 00:04.57 `motion/footage-windows/f-017.webp` ▆
- 00:04.73 `motion/footage-windows/f-018.webp` ▂
- 00:04.90 `motion/footage-windows/f-019.webp` ▁
- 00:05.07 `motion/footage-windows/f-020.webp` ▁
- 00:05.23 `motion/footage-windows/f-021.webp` ▁
- 00:05.40 `motion/footage-windows/f-022.webp` ▁
- 00:05.57 `motion/footage-windows/f-023.webp` ▁
- 00:05.73 `motion/footage-windows/f-024.webp` ▁
- 00:05.90 `motion/footage-windows/f-025.webp` ▄
- 00:06.07 `motion/footage-windows/f-026.webp` ▂

### 03. Reasons swap across faceless silhouettes

00:07.00–00:13.00 (6.00 s) · 25 frames at 4 fps, 0.250 s apart · rim light, label swap, dissolve, light failure

A rim-lit silhouette appears at 7.1 with its face in full shadow, and 'No coding skills' fades onto the face at 7.5. From 8.6 the label changes roughly every half second: 'Not enough time', 'Cost too high', 'Language barrier', 'Kids start school', 'Parents say no', 'Afraid to fail', 'Twelve hour shifts', 'Small town', 'Burnout', 'Feels impossible'. The people dissolve into one another on a separate beat (around 9.7, 10.5, 11.1 and 11.4), so reasons and faces never line up one to one; they read as many people, not one. From 12.0 the rim light flickers like a failing bulb, the label dims, and at 12.9 the frame goes black.

Motion: `▃▁▂▁▁▁▂▂▂▁▂▃▂▃▁▃▁▃▄▃▁▃▂▂▁`

- 00:07.00 `motion/reasons-on-faces/f-001.webp` ▃
- 00:07.25 `motion/reasons-on-faces/f-002.webp` ▁
- 00:07.50 `motion/reasons-on-faces/f-003.webp` ▂
- 00:07.75 `motion/reasons-on-faces/f-004.webp` ▁
- 00:08.00 `motion/reasons-on-faces/f-005.webp` ▁
- 00:08.25 `motion/reasons-on-faces/f-006.webp` ▁
- 00:08.50 `motion/reasons-on-faces/f-007.webp` ▂
- 00:08.75 `motion/reasons-on-faces/f-008.webp` ▂
- 00:09.00 `motion/reasons-on-faces/f-009.webp` ▂
- 00:09.25 `motion/reasons-on-faces/f-010.webp` ▁
- 00:09.50 `motion/reasons-on-faces/f-011.webp` ▂
- 00:09.75 `motion/reasons-on-faces/f-012.webp` ▃
- 00:10.00 `motion/reasons-on-faces/f-013.webp` ▂
- 00:10.25 `motion/reasons-on-faces/f-014.webp` ▃
- 00:10.50 `motion/reasons-on-faces/f-015.webp` ▁
- 00:10.75 `motion/reasons-on-faces/f-016.webp` ▃
- 00:11.00 `motion/reasons-on-faces/f-017.webp` ▁
- 00:11.25 `motion/reasons-on-faces/f-018.webp` ▃
- 00:11.50 `motion/reasons-on-faces/f-019.webp` ▄
- 00:11.75 `motion/reasons-on-faces/f-020.webp` ▃
- 00:12.00 `motion/reasons-on-faces/f-021.webp` ▁
- 00:12.25 `motion/reasons-on-faces/f-022.webp` ▃
- 00:12.50 `motion/reasons-on-faces/f-023.webp` ▂
- 00:12.75 `motion/reasons-on-faces/f-024.webp` ▂
- 00:13.00 `motion/reasons-on-faces/f-025.webp` ▁

### 04. 'Until today' turns into the wordmark, inside a prompt

00:13.00–00:17.00 (4.00 s) · 33 frames at 8 fps, 0.125 s apart · gradient sweep, letter dropout, type-on, push in, reveal

'Until' sharpens small at 13.0 and 'today' blurs in at 13.75. At 14.26 the brand gradient sweeps through the letters left to right, blue to pink to orange, and has passed by 14.66. At 14.8 the letters drop out at random and the frame is black by 14.93. The heart pops in at 15.0 and 'Lovable' types on letter by letter from 15.13, each letter appearing grey and settling to white. A gradient glow rises from the bottom edge at 15.5, and at 15.86 the frame jumps closer to show the wordmark sitting inside a dark rounded prompt box with a cursor. By 16.25 the name has been deleted, and 'Create' starts typing at 16.4. The brand name was the first prompt.

Motion: `▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▂▂▃▅▄▄▃▂▂▂▂▂▃▃`

- 00:13.00 `motion/until-today-to-prompt/f-001.webp` ▁
- 00:13.12 `motion/until-today-to-prompt/f-002.webp` ▁
- 00:13.25 `motion/until-today-to-prompt/f-003.webp` ▁
- 00:13.38 `motion/until-today-to-prompt/f-004.webp` ▁
- 00:13.50 `motion/until-today-to-prompt/f-005.webp` ▁
- 00:13.62 `motion/until-today-to-prompt/f-006.webp` ▁
- 00:13.75 `motion/until-today-to-prompt/f-007.webp` ▁
- 00:13.88 `motion/until-today-to-prompt/f-008.webp` ▁
- 00:14.00 `motion/until-today-to-prompt/f-009.webp` ▁
- 00:14.12 `motion/until-today-to-prompt/f-010.webp` ▁
- 00:14.25 `motion/until-today-to-prompt/f-011.webp` ▁
- 00:14.38 `motion/until-today-to-prompt/f-012.webp` ▁
- 00:14.50 `motion/until-today-to-prompt/f-013.webp` ▁
- 00:14.62 `motion/until-today-to-prompt/f-014.webp` ▁
- 00:14.75 `motion/until-today-to-prompt/f-015.webp` ▁
- 00:14.88 `motion/until-today-to-prompt/f-016.webp` ▁
- 00:15.00 `motion/until-today-to-prompt/f-017.webp` ▁
- 00:15.12 `motion/until-today-to-prompt/f-018.webp` ▁
- 00:15.25 `motion/until-today-to-prompt/f-019.webp` ▂
- 00:15.38 `motion/until-today-to-prompt/f-020.webp` ▂
- 00:15.50 `motion/until-today-to-prompt/f-021.webp` ▂
- 00:15.62 `motion/until-today-to-prompt/f-022.webp` ▃
- 00:15.75 `motion/until-today-to-prompt/f-023.webp` ▅
- 00:15.88 `motion/until-today-to-prompt/f-024.webp` ▄
- 00:16.00 `motion/until-today-to-prompt/f-025.webp` ▄
- 00:16.12 `motion/until-today-to-prompt/f-026.webp` ▃
- 00:16.25 `motion/until-today-to-prompt/f-027.webp` ▂
- 00:16.38 `motion/until-today-to-prompt/f-028.webp` ▂
- 00:16.50 `motion/until-today-to-prompt/f-029.webp` ▂
- 00:16.62 `motion/until-today-to-prompt/f-030.webp` ▂
- 00:16.75 `motion/until-today-to-prompt/f-031.webp` ▂
- 00:16.88 `motion/until-today-to-prompt/f-032.webp` ▃
- 00:17.00 `motion/until-today-to-prompt/f-033.webp` ▃

### 05. Send, a loading flower, and the app inside its star

00:19.30–00:20.60 (1.30 s) · 32 frames at 24 fps, 0.042 s apart · button press, loading state, shape reveal, scale through

The hand cursor presses send at 19.3; the arrow button fills with the gradient and fades over about a quarter second while the prompt panel falls away into the dark. At 19.6 a scalloped gradient flower sits alone with a tiny four-point star at its center, pulsing for about a third of a second as the loading state. At 20.05 the star opens like a cutout and the flower scales toward the camera; the finished resume app is visible inside the opening by 20.2, and the flower passes the lens at about 20.35. The app window lands with the name 'Megan', then 'Reed', typing in at 20.42 to 20.55. Waiting is shown as a branded object, and it lasts well under a second.

Motion: `▅▅▅▄▄▆▇▆▅▅▃▃▃▃▃▃▄▄▅▅▆▇▇█▇██▇▆▅▅▄`

- 00:19.30 `motion/send-through-the-flower/f-001.webp` ▅
- 00:19.34 `motion/send-through-the-flower/f-002.webp` ▅
- 00:19.38 `motion/send-through-the-flower/f-003.webp` ▅
- 00:19.43 `motion/send-through-the-flower/f-004.webp` ▄
- 00:19.47 `motion/send-through-the-flower/f-005.webp` ▄
- 00:19.51 `motion/send-through-the-flower/f-006.webp` ▆
- 00:19.55 `motion/send-through-the-flower/f-007.webp` ▇
- 00:19.59 `motion/send-through-the-flower/f-008.webp` ▆
- 00:19.63 `motion/send-through-the-flower/f-009.webp` ▅
- 00:19.68 `motion/send-through-the-flower/f-010.webp` ▅
- 00:19.72 `motion/send-through-the-flower/f-011.webp` ▃
- 00:19.76 `motion/send-through-the-flower/f-012.webp` ▃
- 00:19.80 `motion/send-through-the-flower/f-013.webp` ▃
- 00:19.84 `motion/send-through-the-flower/f-014.webp` ▃
- 00:19.88 `motion/send-through-the-flower/f-015.webp` ▃
- 00:19.93 `motion/send-through-the-flower/f-016.webp` ▃
- 00:19.97 `motion/send-through-the-flower/f-017.webp` ▄
- 00:20.01 `motion/send-through-the-flower/f-018.webp` ▄
- 00:20.05 `motion/send-through-the-flower/f-019.webp` ▅
- 00:20.09 `motion/send-through-the-flower/f-020.webp` ▅
- 00:20.13 `motion/send-through-the-flower/f-021.webp` ▆
- 00:20.18 `motion/send-through-the-flower/f-022.webp` ▇
- 00:20.22 `motion/send-through-the-flower/f-023.webp` ▇
- 00:20.26 `motion/send-through-the-flower/f-024.webp` █
- 00:20.30 `motion/send-through-the-flower/f-025.webp` ▇
- 00:20.34 `motion/send-through-the-flower/f-026.webp` █
- 00:20.38 `motion/send-through-the-flower/f-027.webp` █
- 00:20.43 `motion/send-through-the-flower/f-028.webp` ▇
- 00:20.47 `motion/send-through-the-flower/f-029.webp` ▆
- 00:20.51 `motion/send-through-the-flower/f-030.webp` ▅
- 00:20.55 `motion/send-through-the-flower/f-031.webp` ▅
- 00:20.59 `motion/send-through-the-flower/f-032.webp` ▄

### 06. A wall of prompts typing at once

00:21.00–00:22.90 (1.90 s) · 24 frames at 12 fps, 0.083 s apart · hard cut, pull back, simultaneous type-on, scale through

A hard cut at 21.13 lands close on the heart, surrounded by prompt pills that are all typing at the same time: 'AI meeting summarizer', 'AI chatbot for lawyers', 'Online course platform'. Most of the pull back happens in the first third of a second; then it keeps drifting out slowly so new pills enter at the edges. At about 22.6 the heart scales toward the camera, its gradient fills the frame and becomes the pale blue background of the next app, which fades in from 22.75 to 23.0.

Motion: `▄█▅▄▄▄▄▃▃▃▃▃▃▃▃▃▃▃▃▆█▇▅▄`

- 00:21.00 `motion/prompt-wall/f-001.webp` ▄
- 00:21.08 `motion/prompt-wall/f-002.webp` █
- 00:21.17 `motion/prompt-wall/f-003.webp` ▅
- 00:21.25 `motion/prompt-wall/f-004.webp` ▄
- 00:21.33 `motion/prompt-wall/f-005.webp` ▄
- 00:21.42 `motion/prompt-wall/f-006.webp` ▄
- 00:21.50 `motion/prompt-wall/f-007.webp` ▄
- 00:21.58 `motion/prompt-wall/f-008.webp` ▃
- 00:21.67 `motion/prompt-wall/f-009.webp` ▃
- 00:21.75 `motion/prompt-wall/f-010.webp` ▃
- 00:21.83 `motion/prompt-wall/f-011.webp` ▃
- 00:21.92 `motion/prompt-wall/f-012.webp` ▃
- 00:22.00 `motion/prompt-wall/f-013.webp` ▃
- 00:22.08 `motion/prompt-wall/f-014.webp` ▃
- 00:22.17 `motion/prompt-wall/f-015.webp` ▃
- 00:22.25 `motion/prompt-wall/f-016.webp` ▃
- 00:22.33 `motion/prompt-wall/f-017.webp` ▃
- 00:22.42 `motion/prompt-wall/f-018.webp` ▃
- 00:22.50 `motion/prompt-wall/f-019.webp` ▃
- 00:22.58 `motion/prompt-wall/f-020.webp` ▆
- 00:22.67 `motion/prompt-wall/f-021.webp` █
- 00:22.75 `motion/prompt-wall/f-022.webp` ▇
- 00:22.83 `motion/prompt-wall/f-023.webp` ▅
- 00:22.92 `motion/prompt-wall/f-024.webp` ▄

### 07. A gradient smear carries one app into the next

00:24.30–00:25.10 (0.80 s) · 20 frames at 24 fps, 0.042 s apart · liquid wipe, fixed window, morph, prompt chain

The window never moves. The cursor clicks send in the prompt pill at 24.3, and at about 24.45 a liquid smear of pink, red and orange spreads in from the left across the meeting app like wet paint. Underneath it the content is already the dark revenue dashboard by 24.7, and the smear thins and slides off to the right by about 24.95. The pill clears and starts typing the next request while the new app is still settling. The same move repeats at about 26.1 and 27.6, four apps in five seconds.

Motion: `▂▃▃▄▄▅▅▅▆▆▆▅▅▅▅▄▄▄▄▄`

- 00:24.30 `motion/smear-morph/f-001.webp` ▂
- 00:24.34 `motion/smear-morph/f-002.webp` ▃
- 00:24.38 `motion/smear-morph/f-003.webp` ▃
- 00:24.43 `motion/smear-morph/f-004.webp` ▄
- 00:24.47 `motion/smear-morph/f-005.webp` ▄
- 00:24.51 `motion/smear-morph/f-006.webp` ▅
- 00:24.55 `motion/smear-morph/f-007.webp` ▅
- 00:24.59 `motion/smear-morph/f-008.webp` ▅
- 00:24.63 `motion/smear-morph/f-009.webp` ▆
- 00:24.68 `motion/smear-morph/f-010.webp` ▆
- 00:24.72 `motion/smear-morph/f-011.webp` ▆
- 00:24.76 `motion/smear-morph/f-012.webp` ▅
- 00:24.80 `motion/smear-morph/f-013.webp` ▅
- 00:24.84 `motion/smear-morph/f-014.webp` ▅
- 00:24.88 `motion/smear-morph/f-015.webp` ▅
- 00:24.93 `motion/smear-morph/f-016.webp` ▄
- 00:24.97 `motion/smear-morph/f-017.webp` ▄
- 00:25.01 `motion/smear-morph/f-018.webp` ▄
- 00:25.05 `motion/smear-morph/f-019.webp` ▄
- 00:25.09 `motion/smear-morph/f-020.webp` ▄

### 08. Four sites in a blink, then into a laptop

00:28.30–00:30.40 (2.10 s) · 32 frames at 15 fps, 0.067 s apart · flash cuts, pull back, screen to object, rendered set

At 28.5, on 'minutes', the rhythm breaks: a portfolio for 'Nathan Hale', a revenue pipeline, 'BOOK NEXT VISIT' and an 'Essence' perfume page flash past at one or two frames each. 'Dream Home' lands full frame at 29.0 and holds. From about 29.3 the frame pulls back and the site settles into a laptop screen on a terrazzo desk with a vase and a stack of books, settled by 30.2. At 30.27 it cuts back inside the site. The pull back turns a screen into an object someone owns.

Motion: `▆▇██▇████▇██▆▅▄▃▅▆███▇▇▆▆▅▅▄▅█▇▇`

- 00:28.30 `motion/flash-to-laptop/f-001.webp` ▆
- 00:28.37 `motion/flash-to-laptop/f-002.webp` ▇
- 00:28.43 `motion/flash-to-laptop/f-003.webp` █
- 00:28.50 `motion/flash-to-laptop/f-004.webp` █
- 00:28.57 `motion/flash-to-laptop/f-005.webp` ▇
- 00:28.63 `motion/flash-to-laptop/f-006.webp` █
- 00:28.70 `motion/flash-to-laptop/f-007.webp` █
- 00:28.77 `motion/flash-to-laptop/f-008.webp` █
- 00:28.83 `motion/flash-to-laptop/f-009.webp` █
- 00:28.90 `motion/flash-to-laptop/f-010.webp` ▇
- 00:28.97 `motion/flash-to-laptop/f-011.webp` █
- 00:29.03 `motion/flash-to-laptop/f-012.webp` █
- 00:29.10 `motion/flash-to-laptop/f-013.webp` ▆
- 00:29.17 `motion/flash-to-laptop/f-014.webp` ▅
- 00:29.23 `motion/flash-to-laptop/f-015.webp` ▄
- 00:29.30 `motion/flash-to-laptop/f-016.webp` ▃
- 00:29.37 `motion/flash-to-laptop/f-017.webp` ▅
- 00:29.43 `motion/flash-to-laptop/f-018.webp` ▆
- 00:29.50 `motion/flash-to-laptop/f-019.webp` █
- 00:29.57 `motion/flash-to-laptop/f-020.webp` █
- 00:29.63 `motion/flash-to-laptop/f-021.webp` █
- 00:29.70 `motion/flash-to-laptop/f-022.webp` ▇
- 00:29.77 `motion/flash-to-laptop/f-023.webp` ▇
- 00:29.83 `motion/flash-to-laptop/f-024.webp` ▆
- 00:29.90 `motion/flash-to-laptop/f-025.webp` ▆
- 00:29.97 `motion/flash-to-laptop/f-026.webp` ▅
- 00:30.03 `motion/flash-to-laptop/f-027.webp` ▅
- 00:30.10 `motion/flash-to-laptop/f-028.webp` ▄
- 00:30.17 `motion/flash-to-laptop/f-029.webp` ▅
- 00:30.23 `motion/flash-to-laptop/f-030.webp` █
- 00:30.30 `motion/flash-to-laptop/f-031.webp` ▇
- 00:30.37 `motion/flash-to-laptop/f-032.webp` ▇

### 09. A sign-up becomes a database row, then a padlock

00:35.40–00:38.70 (3.30 s) · 27 frames at 8 fps, 0.125 s apart · push in, button squash, 3D tilt, shape morph

A cut at 35.5 goes close on 'Create account'. The cursor presses at about 36.1, the button swells and then squashes flat, and at 36.26 it becomes a dark row holding the new user's id and 'laura.r@mail.me'. The row tilts back in 3D and drops into a stack of other user rows (36.4 to 36.9), which flatten into the database table by about 37.25. At 37.75 a black plus-shaped form wipes over the table and inverts into a padlock, then a shield at 38.1, with 'Built-in' at 38.25 and 'security' at 38.6. Each step is said by the narrator as it happens: authentication, a database, built-in security.

Motion: `▆▇▃▂▂▃▅▇▇▅▆▆▆▆▆▅▃▂▄█▇▇▇▆▅▄▅`

- 00:35.40 `motion/account-to-database/f-001.webp` ▆
- 00:35.52 `motion/account-to-database/f-002.webp` ▇
- 00:35.65 `motion/account-to-database/f-003.webp` ▃
- 00:35.77 `motion/account-to-database/f-004.webp` ▂
- 00:35.90 `motion/account-to-database/f-005.webp` ▂
- 00:36.02 `motion/account-to-database/f-006.webp` ▃
- 00:36.15 `motion/account-to-database/f-007.webp` ▅
- 00:36.27 `motion/account-to-database/f-008.webp` ▇
- 00:36.40 `motion/account-to-database/f-009.webp` ▇
- 00:36.52 `motion/account-to-database/f-010.webp` ▅
- 00:36.65 `motion/account-to-database/f-011.webp` ▆
- 00:36.77 `motion/account-to-database/f-012.webp` ▆
- 00:36.90 `motion/account-to-database/f-013.webp` ▆
- 00:37.02 `motion/account-to-database/f-014.webp` ▆
- 00:37.15 `motion/account-to-database/f-015.webp` ▆
- 00:37.27 `motion/account-to-database/f-016.webp` ▅
- 00:37.40 `motion/account-to-database/f-017.webp` ▃
- 00:37.52 `motion/account-to-database/f-018.webp` ▂
- 00:37.65 `motion/account-to-database/f-019.webp` ▄
- 00:37.77 `motion/account-to-database/f-020.webp` █
- 00:37.90 `motion/account-to-database/f-021.webp` ▇
- 00:38.02 `motion/account-to-database/f-022.webp` ▇
- 00:38.15 `motion/account-to-database/f-023.webp` ▇
- 00:38.27 `motion/account-to-database/f-024.webp` ▆
- 00:38.40 `motion/account-to-database/f-025.webp` ▅
- 00:38.52 `motion/account-to-database/f-026.webp` ▄
- 00:38.65 `motion/account-to-database/f-027.webp` ▅

### 10. One sentence repaints the app

00:39.40–00:41.10 (1.70 s) · 21 frames at 12 fps, 0.083 s apart · split frame, send, gradient smear, before and after

The frame splits: a dark panel on the left finishes typing 'Make it easy and fun for an 8-year-old to use', and the Spanish lessons app sits on the right. The send button is pressed at about 39.9 and pulses. At 40.2 a magenta smear sweeps across the app from the lower left, and by 40.5 a koala mascot and a warm orange and beige palette are showing through. It is settled by 40.9 and cuts at 41.2. The narrator says 'Just tell Lovable' over it.

Motion: `▄█▅▄▃▂▁▁▁▂▄▅▆▆▅▅▄▂▂▃▄`

- 00:39.40 `motion/edit-by-prompt/f-001.webp` ▄
- 00:39.48 `motion/edit-by-prompt/f-002.webp` █
- 00:39.57 `motion/edit-by-prompt/f-003.webp` ▅
- 00:39.65 `motion/edit-by-prompt/f-004.webp` ▄
- 00:39.73 `motion/edit-by-prompt/f-005.webp` ▃
- 00:39.82 `motion/edit-by-prompt/f-006.webp` ▂
- 00:39.90 `motion/edit-by-prompt/f-007.webp` ▁
- 00:39.98 `motion/edit-by-prompt/f-008.webp` ▁
- 00:40.07 `motion/edit-by-prompt/f-009.webp` ▁
- 00:40.15 `motion/edit-by-prompt/f-010.webp` ▂
- 00:40.23 `motion/edit-by-prompt/f-011.webp` ▄
- 00:40.32 `motion/edit-by-prompt/f-012.webp` ▅
- 00:40.40 `motion/edit-by-prompt/f-013.webp` ▆
- 00:40.48 `motion/edit-by-prompt/f-014.webp` ▆
- 00:40.57 `motion/edit-by-prompt/f-015.webp` ▅
- 00:40.65 `motion/edit-by-prompt/f-016.webp` ▅
- 00:40.73 `motion/edit-by-prompt/f-017.webp` ▄
- 00:40.82 `motion/edit-by-prompt/f-018.webp` ▂
- 00:40.90 `motion/edit-by-prompt/f-019.webp` ▂
- 00:40.98 `motion/edit-by-prompt/f-020.webp` ▃
- 00:41.07 `motion/edit-by-prompt/f-021.webp` ▄

### 11. Hovering fonts on a live headline

00:42.30–00:43.70 (1.40 s) · 15 frames at 10 fps, 0.100 s apart · selection box, dropdown, hover preview, snap

The cursor clicks 'SCALE' at about 42.4 and a thin selection box with a tag appears. A dark font menu opens at 42.5 (Inter, Kalnia, Instrument Serif, Field Gothic, Plus Jakarta Sans). As the cursor moves down the list from 43.0, the headline previews each face in place, and at about 43.5 'SCALE' snaps to a heavy, wide sans. It is a real editing gesture shown at full size, not a menu described.

Motion: `▂▂▄▃▂▂▂▂▂▃▃▄▂▁▁`

- 00:42.30 `motion/font-swap/f-001.webp` ▂
- 00:42.40 `motion/font-swap/f-002.webp` ▂
- 00:42.50 `motion/font-swap/f-003.webp` ▄
- 00:42.60 `motion/font-swap/f-004.webp` ▃
- 00:42.70 `motion/font-swap/f-005.webp` ▂
- 00:42.80 `motion/font-swap/f-006.webp` ▂
- 00:42.90 `motion/font-swap/f-007.webp` ▂
- 00:43.00 `motion/font-swap/f-008.webp` ▂
- 00:43.10 `motion/font-swap/f-009.webp` ▂
- 00:43.20 `motion/font-swap/f-010.webp` ▃
- 00:43.30 `motion/font-swap/f-011.webp` ▃
- 00:43.40 `motion/font-swap/f-012.webp` ▄
- 00:43.50 `motion/font-swap/f-013.webp` ▂
- 00:43.60 `motion/font-swap/f-014.webp` ▁
- 00:43.70 `motion/font-swap/f-015.webp` ▁

### 12. A request for payments, a payment, success

00:47.20–00:49.70 (2.50 s) · 26 frames at 10 fps, 0.100 s apart · send, glow bloom, push in, button press, slide

'Please add a premium subscription to my app for $12/month' is sent at about 47.3. The prompt box drifts up as an orange glow blooms beneath it, 'Payments' fades up in pink at 47.75, and the payments page with Stripe and PayPal builds around it. The camera pushes in to 'Pay $12.00' by 48.5, the cursor presses at about 48.8 and the button glows. At 49.1 it cuts to a huge purple 'Success' pill whose spinner turns into a check by 49.3 as it slides left. The film closes the loop from request to working feature to a paid transaction in two and a half seconds.

Motion: `▃▂▃▄▆█▆▅▅▅▄▃▄▆▄▃▃▃▃▆▂▁▁▁▂▄`

- 00:47.20 `motion/payment-success/f-001.webp` ▃
- 00:47.30 `motion/payment-success/f-002.webp` ▂
- 00:47.40 `motion/payment-success/f-003.webp` ▃
- 00:47.50 `motion/payment-success/f-004.webp` ▄
- 00:47.60 `motion/payment-success/f-005.webp` ▆
- 00:47.70 `motion/payment-success/f-006.webp` █
- 00:47.80 `motion/payment-success/f-007.webp` ▆
- 00:47.90 `motion/payment-success/f-008.webp` ▅
- 00:48.00 `motion/payment-success/f-009.webp` ▅
- 00:48.10 `motion/payment-success/f-010.webp` ▅
- 00:48.20 `motion/payment-success/f-011.webp` ▄
- 00:48.30 `motion/payment-success/f-012.webp` ▃
- 00:48.40 `motion/payment-success/f-013.webp` ▄
- 00:48.50 `motion/payment-success/f-014.webp` ▆
- 00:48.60 `motion/payment-success/f-015.webp` ▄
- 00:48.70 `motion/payment-success/f-016.webp` ▃
- 00:48.80 `motion/payment-success/f-017.webp` ▃
- 00:48.90 `motion/payment-success/f-018.webp` ▃
- 00:49.00 `motion/payment-success/f-019.webp` ▃
- 00:49.10 `motion/payment-success/f-020.webp` ▆
- 00:49.20 `motion/payment-success/f-021.webp` ▂
- 00:49.30 `motion/payment-success/f-022.webp` ▁
- 00:49.40 `motion/payment-success/f-023.webp` ▁
- 00:49.50 `motion/payment-success/f-024.webp` ▁
- 00:49.60 `motion/payment-success/f-025.webp` ▂
- 00:49.70 `motion/payment-success/f-026.webp` ▄

### 13. The published site shrinks into an icon

00:52.50–00:53.60 (1.10 s) · 27 frames at 24 fps, 0.042 s apart · scale down, card, icon morph, blur-in type

The laptop on its stone plinth holds until about 52.79, when the whole picture becomes a rounded card with the gradient horizon showing beneath it. The card shrinks over a fifth of a second into a dark tile at 53.04, a globe appears in the tile at 53.08, and the tile shrinks to icon size. 'Custom' blurs in from the left at 53.2 and 'Domains' from the right at 53.25, sharp by 53.33. A hard cut at 53.58 goes to 'Collaboration' with two named cursors, 'Jonathan' and 'Jodie'. The site you just published becomes the first feature in the list.

Motion: `▃▃▃▃▃▃▃▅▇▅▅▄▄▆▅▃▂▄▃▄▄▄▃▂▁▁▁`

- 00:52.50 `motion/laptop-to-globe/f-001.webp` ▃
- 00:52.54 `motion/laptop-to-globe/f-002.webp` ▃
- 00:52.58 `motion/laptop-to-globe/f-003.webp` ▃
- 00:52.62 `motion/laptop-to-globe/f-004.webp` ▃
- 00:52.67 `motion/laptop-to-globe/f-005.webp` ▃
- 00:52.71 `motion/laptop-to-globe/f-006.webp` ▃
- 00:52.75 `motion/laptop-to-globe/f-007.webp` ▃
- 00:52.79 `motion/laptop-to-globe/f-008.webp` ▅
- 00:52.83 `motion/laptop-to-globe/f-009.webp` ▇
- 00:52.88 `motion/laptop-to-globe/f-010.webp` ▅
- 00:52.92 `motion/laptop-to-globe/f-011.webp` ▅
- 00:52.96 `motion/laptop-to-globe/f-012.webp` ▄
- 00:53.00 `motion/laptop-to-globe/f-013.webp` ▄
- 00:53.04 `motion/laptop-to-globe/f-014.webp` ▆
- 00:53.08 `motion/laptop-to-globe/f-015.webp` ▅
- 00:53.12 `motion/laptop-to-globe/f-016.webp` ▃
- 00:53.17 `motion/laptop-to-globe/f-017.webp` ▂
- 00:53.21 `motion/laptop-to-globe/f-018.webp` ▄
- 00:53.25 `motion/laptop-to-globe/f-019.webp` ▃
- 00:53.29 `motion/laptop-to-globe/f-020.webp` ▄
- 00:53.33 `motion/laptop-to-globe/f-021.webp` ▄
- 00:53.38 `motion/laptop-to-globe/f-022.webp` ▄
- 00:53.42 `motion/laptop-to-globe/f-023.webp` ▃
- 00:53.46 `motion/laptop-to-globe/f-024.webp` ▂
- 00:53.50 `motion/laptop-to-globe/f-025.webp` ▁
- 00:53.54 `motion/laptop-to-globe/f-026.webp` ▁
- 00:53.58 `motion/laptop-to-globe/f-027.webp` ▁

### 14. Rush of apps, a collage, the end line

00:55.20–00:59.20 (4.00 s) · 33 frames at 8 fps, 0.125 s apart · blur out, rush past, collage, pull back, logo swap

'Code Ownership' blurs out at 55.33. Out-of-focus app screens rush past close to the lens from 55.5 and sharpen into a dense collage by 56.0, which pulls back to a tight cluster on black at 56.2. The cards reshuffle inside the cluster for almost two seconds, then the cluster bursts toward the camera at 58.0. The gradient end card follows: 'For every idea, there's' and a heart, and at about 58.75 the heart is replaced by the Lovable mark and wordmark as the music fades out.

Motion: `▄▅▇▇▇▇███▇▄▄▄▄▄▄▄▄▄▄▆▇█▇▅▂▂▂▃▂▂▂▂`

- 00:55.20 `motion/collage-to-end/f-001.webp` ▄
- 00:55.33 `motion/collage-to-end/f-002.webp` ▅
- 00:55.45 `motion/collage-to-end/f-003.webp` ▇
- 00:55.58 `motion/collage-to-end/f-004.webp` ▇
- 00:55.70 `motion/collage-to-end/f-005.webp` ▇
- 00:55.83 `motion/collage-to-end/f-006.webp` ▇
- 00:55.95 `motion/collage-to-end/f-007.webp` █
- 00:56.08 `motion/collage-to-end/f-008.webp` █
- 00:56.20 `motion/collage-to-end/f-009.webp` █
- 00:56.33 `motion/collage-to-end/f-010.webp` ▇
- 00:56.45 `motion/collage-to-end/f-011.webp` ▄
- 00:56.58 `motion/collage-to-end/f-012.webp` ▄
- 00:56.70 `motion/collage-to-end/f-013.webp` ▄
- 00:56.83 `motion/collage-to-end/f-014.webp` ▄
- 00:56.95 `motion/collage-to-end/f-015.webp` ▄
- 00:57.08 `motion/collage-to-end/f-016.webp` ▄
- 00:57.20 `motion/collage-to-end/f-017.webp` ▄
- 00:57.33 `motion/collage-to-end/f-018.webp` ▄
- 00:57.45 `motion/collage-to-end/f-019.webp` ▄
- 00:57.58 `motion/collage-to-end/f-020.webp` ▄
- 00:57.70 `motion/collage-to-end/f-021.webp` ▆
- 00:57.83 `motion/collage-to-end/f-022.webp` ▇
- 00:57.95 `motion/collage-to-end/f-023.webp` █
- 00:58.08 `motion/collage-to-end/f-024.webp` ▇
- 00:58.20 `motion/collage-to-end/f-025.webp` ▅
- 00:58.33 `motion/collage-to-end/f-026.webp` ▂
- 00:58.45 `motion/collage-to-end/f-027.webp` ▂
- 00:58.58 `motion/collage-to-end/f-028.webp` ▂
- 00:58.70 `motion/collage-to-end/f-029.webp` ▃
- 00:58.83 `motion/collage-to-end/f-030.webp` ▂
- 00:58.95 `motion/collage-to-end/f-031.webp` ▂
- 00:59.08 `motion/collage-to-end/f-032.webp` ▂
- 00:59.20 `motion/collage-to-end/f-033.webp` ▂

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Cold open on black: 'Ideas' resolves out of a blur, centered in white sans with a soft glow. The word arrives as the narrator says it.
- 00:01.00 `seconds/second-00002.webp` 'Ideas are everywhere' complete, set smaller than the first word was. The line shrinks to make room as it grows.
- 00:02.00 `seconds/second-00003.webp` 'In homes' over a small window of what looks like home-movie footage, a toddler in a garden. Rounded corners and a glow, like a lit screen in a dark room.
- 00:03.00 `seconds/second-00004.webp` Still 'In homes', now lit apartment windows at night. Same caption, a new window, so homes means many homes.
- 00:04.00 `seconds/second-00005.webp` 'On commutes' over a city street, the window now portrait. Each window takes the shape of its clip.
- 00:05.00 `seconds/second-00006.webp` 'At 2 a.m.': a figure at a desk, back to camera, under one warm lamp. The only warm color in the first thirteen seconds.
- 00:06.00 `seconds/second-00007.webp` 'And most ideas' on black, word by word with the voice. The footage is gone and the film turns.
- 00:07.00 `seconds/second-00008.webp` A rim-lit silhouette, face in total shadow. Anyone could be standing there.
- 00:08.00 `seconds/second-00009.webp` 'No coding skills' set across the dark face. The reason sits where the eyes should be.
- 00:09.00 `seconds/second-00010.webp` 'Cost too high' on the same head. The labels swap about every half second while the narrator keeps talking.
- 00:10.00 `seconds/second-00011.webp` A new silhouette, long hair, with 'Parents say no'. People dissolve into each other on their own beat, separate from the labels.
- 00:11.00 `seconds/second-00012.webp` 'Burnout' over a broader figure in a jacket, the rim light at its brightest.
- 00:12.00 `seconds/second-00013.webp` 'Feels impossible' as the light fails: the silhouette flickers like a dying bulb and drops to black.
- 00:13.00 `seconds/second-00014.webp` 'Until' alone, small, on black. A one-word hold before the hinge.
- 00:14.00 `seconds/second-00015.webp` 'Until today' with the brand gradient sweeping through the letters, blue to pink to orange. The first time the brand's color appears.
- 00:15.00 `seconds/second-00016.webp` The heart mark pops in and 'Lovable' types on beside it, a gradient horizon starting to glow at the bottom edge.
- 00:16.00 `seconds/second-00017.webp` Pushed in: the wordmark was sitting inside a prompt box. It has been deleted and 'Cr' is being typed in its place.
- 00:17.00 `seconds/second-00018.webp` 'Create an AI' at headline size, the frame sliding left to follow the cursor.
- 00:18.00 `seconds/second-00019.webp` 'AI resume builder', the prompt running off the left edge. The input is the film's next sentence.
- 00:19.00 `seconds/second-00020.webp` A hand cursor presses the send arrow, which fills with the gradient. Every press in the film gets a pressed state.
- 00:20.00 `seconds/second-00021.webp` The built app opens: a resume for 'Megan Reed', chat panel on the left, the name still typing in. 'Into reality' has just been said.
- 00:21.00 `seconds/second-00022.webp` A wall of prompt pills typing at once around the heart: 'AI meeting summarizer', 'AI chatbot', 'Online course platform'. 'Anything you can imagine' as a picture.
- 00:22.00 `seconds/second-00023.webp` The wall pulled wider, a dozen half-typed ideas cropped by the frame edges. The heart is about to grow and fill the screen.
- 00:23.00 `seconds/second-00024.webp` A meeting app on a pale blue field, the prompt pill docked bottom left. This window stays put for the next five seconds.
- 00:24.00 `seconds/second-00025.webp` A liquid smear of pink and orange starts across the window. Under it the next app is already loading.
- 00:25.00 `seconds/second-00026.webp` A dark revenue dashboard in the same window, while the pill types the next request, 'Build a multi-user family calendar'.
- 00:26.00 `seconds/second-00027.webp` Mid-smear into the calendar. The transition is the brand gradient itself, used like wet paint.
- 00:27.00 `seconds/second-00028.webp` The family calendar settled, and 'Build an AI avatar marketplace' already typing below it. Request and result overlap.
- 00:28.00 `seconds/second-00029.webp` 'Discover AI Creators', a marketplace of portraits. Right after this the film flashes through four sites in under half a second.
- 00:29.00 `seconds/second-00030.webp` 'Dream Home', a real-estate site full frame. It is about to pull back into a laptop on a terrazzo desk.
- 00:30.00 `seconds/second-00031.webp` Inside the real-estate site: stats and listing cards. 'This isn't just a mock-up or a demo' starts here, over a site being used.
- 00:31.00 `seconds/second-00032.webp` A hand cursor on 'Book Tour'. The narrator's claim is answered with a click.
- 00:32.00 `seconds/second-00033.webp` The booking calendar floats over the same terrazzo desk with a vase and books. The interface is put in a room.
- 00:33.00 `seconds/second-00034.webp` 'Real' beside a toggle that has just switched on. A UI control stands in for a word.
- 00:35.00 `seconds/second-00036.webp` 'Create your account', with the name Laura Rose in the field. Remember the name.
- 00:36.00 `seconds/second-00037.webp` The account becomes a database row, 'laura.r@mail.me', tilting back in 3D. The same user, one shot later, as data.
- 00:37.00 `seconds/second-00038.webp` The row has joined the 'Viewing table' with the other users. 'A database' is said over it.
- 00:38.00 `seconds/second-00039.webp` 'Built-in' over a pink shield with a padlock, black field, gradient horizon.
- 00:39.00 `seconds/second-00040.webp` 'Built-in security' with small status tags. Feature words are set big and short, like a slide.
- 00:40.00 `seconds/second-00041.webp` Split frame: the prompt 'Make it easy and fun for an 8-year-old to use' on the left; the Spanish lessons app on the right, half repainted with a koala mascot.
- 00:41.00 `seconds/second-00042.webp` 'WE SCALE IDEAS' on a soft white site with blurred glass shapes. Visual edits start here.
- 00:42.00 `seconds/second-00043.webp` A cursor lands on 'SCALE' and a selection box with a tag appears around it.
- 00:43.00 `seconds/second-00044.webp` A font menu open (Inter, Kalnia, Instrument Serif, Field Gothic, Plus Jakarta Sans) and 'SCALE' already reset in a heavy wide face.
- 00:44.00 `seconds/second-00045.webp` An image selected with a blue frame: a green inflated form on a case-study card. Images are editable too.
- 00:45.00 `seconds/second-00046.webp` A color palette open beside a selected 'LET'S START' button. It is about to turn brown.
- 00:47.00 `seconds/second-00048.webp` 'Please add a premium subscription to my app for $12/month', typed politely, cursor on send.
- 00:48.00 `seconds/second-00049.webp` The 'Payments' page that answers it, with Stripe and PayPal options and a card form.
- 00:49.00 `seconds/second-00050.webp` A huge purple 'Success' pill, check mark in place. The payment goes through on screen.
- 00:50.00 `seconds/second-00051.webp` 'Add AI chatbot feature' in a white prompt box on the gradient. The narrator says 'to AI' and stops.
- 00:51.00 `seconds/second-00052.webp` The chatbot app, 'Ask AI', running in a window, with no voice over it.
- 00:52.00 `seconds/second-00053.webp` A laptop on a stone plinth under blue light showing 'Your team's knowledge. Finally organized.' after 'Publish' is pressed.
- 00:53.00 `seconds/second-00054.webp` 'Custom Domains' with a globe icon between the words. The laptop shot has just shrunk into that icon.
- 00:54.00 `seconds/second-00055.webp` 'Connectors' with a row of app icons. Six feature names in two seconds under 'Everything you need, all in one place'.
- 00:55.00 `seconds/second-00056.webp` Everything blurs out: app screens rush past close to the lens.
- 00:56.00 `seconds/second-00057.webp` A tight collage of app screens on black ('Habit', 'Flow', 'KICKLAB'), the range of things made with it.
- 00:57.00 `seconds/second-00058.webp` The collage reshuffles card by card, held long enough to read a few names.
- 00:58.00 `seconds/second-00059.webp` End card on a full gradient field: 'For every idea, there's' and a heart. The music is fading.
- 00:59.00 `seconds/second-00060.webp` The heart has become the Lovable mark: 'For every idea, there's Lovable', in near silence. The line is never spoken.
