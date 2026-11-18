# Motion notes: Meet Custom Agents: Your 24/7 AI Team

Notion · 01:10.91 · https://www.youtube.com/watch?v=yrEic418kjg

Notion's agents launch film is almost all motion design, with about a dozen hard cuts in 71 seconds. The world is warm off-white paper with thick black hand-drawn line, then navy for night. Real Notion UI is laid flat on the same paper, and three round badges taken from the app's sidebar (a purple checkbox, an orange speech bubble, a teal folder, each with two dot eyes) are the characters. They fly on dashed speed lines in their own colors, and each one introduces its job by sweeping through at huge scale and dragging a title in behind it. Halftone-stippled hands place them at the start and flick the film into night near the end. Most moves are quick and snappy: things arrive with a smear and settle, with little drift.

## How to read this

Each sequence is a run of frames sampled at a fixed rate, listed in order with its timestamp, so stepping through the files is a flip book of the move. The bar after each frame is the motion energy from it to the next frame: the mean change in RGB between consecutive source frames (24 fps, downscaled to 96x54), on a log scale from the film's noise floor to its 99th percentile. ▁ is a hold, █ is a full-frame wipe or the fastest movement in the film, and a small shape gliding across a flat field sits around ▃–▅. A run like ▁▂▅█▅▂▁ is an ease-in-out; █▅▃▂▁ is an ease-out that lands and settles. `trail.webp`, where present, is an onion skin of the sequence: moving shapes from every frame over the static background, earlier positions fainter.

## Film timeline

One character per second.

```
00:00  ▄▆▄▄▄▄▆▆▄▄▃▃▅▃▄▂▁▆▆▆▅▅▄▇▃▄▄▆▄▅▄▅▃▇▁▅▇▇▅▇▆▄▆▄▆▅▅▅▅▆▅▄▄▅█▅▆▆▆▆
01:00  ▆▆▅▅▂▄▁▁▁▁▁
```

## Sequences

### 01. Busywork on a conveyor that runs out

00:00.30–00:08.10 (7.80 s) · 32 frames at 4 fps, 0.250 s apart · draw-on, conveyor, drop-in, speed-up, jump cut

A belt of black line and rollers slides in from the right at 0.4 with task cards riding on it. New cards keep dropping onto it from the top of frame in a smeared tumble (about 2.3, 4.0 and 5.7). At 6.3 the belt accelerates into a motion blur, then its rounded end arrives from the right at 6.8 and the belt shrinks away. The last card tips off the end, and at 7.9 the film jumps straight to the pile it made. Work that never stops coming, shown as a machine, before any product appears.

Motion: `▂▅▆▆▆▅▄▁▄▄▄▄▅▃▁▄▃▄▄▄▃▃▅▆▆▆▆▆▅▅▆▄`

- 00:00.30 `motion/conveyor/f-001.webp` ▂
- 00:00.55 `motion/conveyor/f-002.webp` ▅
- 00:00.80 `motion/conveyor/f-003.webp` ▆
- 00:01.05 `motion/conveyor/f-004.webp` ▆
- 00:01.30 `motion/conveyor/f-005.webp` ▆
- 00:01.55 `motion/conveyor/f-006.webp` ▅
- 00:01.80 `motion/conveyor/f-007.webp` ▄
- 00:02.05 `motion/conveyor/f-008.webp` ▁
- 00:02.30 `motion/conveyor/f-009.webp` ▄
- 00:02.55 `motion/conveyor/f-010.webp` ▄
- 00:02.80 `motion/conveyor/f-011.webp` ▄
- 00:03.05 `motion/conveyor/f-012.webp` ▄
- 00:03.30 `motion/conveyor/f-013.webp` ▅
- 00:03.55 `motion/conveyor/f-014.webp` ▃
- 00:03.80 `motion/conveyor/f-015.webp` ▁
- 00:04.05 `motion/conveyor/f-016.webp` ▄
- 00:04.30 `motion/conveyor/f-017.webp` ▃
- 00:04.55 `motion/conveyor/f-018.webp` ▄
- 00:04.80 `motion/conveyor/f-019.webp` ▄
- 00:05.05 `motion/conveyor/f-020.webp` ▄
- 00:05.30 `motion/conveyor/f-021.webp` ▃
- 00:05.55 `motion/conveyor/f-022.webp` ▃
- 00:05.80 `motion/conveyor/f-023.webp` ▅
- 00:06.05 `motion/conveyor/f-024.webp` ▆
- 00:06.30 `motion/conveyor/f-025.webp` ▆
- 00:06.55 `motion/conveyor/f-026.webp` ▆
- 00:06.80 `motion/conveyor/f-027.webp` ▆
- 00:07.05 `motion/conveyor/f-028.webp` ▆
- 00:07.30 `motion/conveyor/f-029.webp` ▅
- 00:07.55 `motion/conveyor/f-030.webp` ▅
- 00:07.80 `motion/conveyor/f-031.webp` ▆
- 00:08.05 `motion/conveyor/f-032.webp` ▄

### 02. The pile gets a count, then blows away

00:09.00–00:13.00 (4.00 s) · 33 frames at 8 fps, 0.125 s apart · pull back, counter, burst, reveal

The camera pulls back from the heap at 9.2 and a purple 'To-do' pill appears on top. Its count jumps 89, 175, 356, 573 in about a second and settles at 628 by 11.6. At 12.4 the whole heap explodes outward in a single frame, cards spinning off every edge, and 'Bye bye, busywork.' is left in the clearing. The line then shrinks very slowly for the next two and a half seconds while the music drops away.

Motion: `▂▃▇▃▃▄▃▃▄▃▃▃▃▃▃▃▂▃▃▃▃▃▃▃▂▃▄▇▇▅▂▃▄`

- 00:09.00 `motion/pile-burst/f-001.webp` ▂
- 00:09.12 `motion/pile-burst/f-002.webp` ▃
- 00:09.25 `motion/pile-burst/f-003.webp` ▇
- 00:09.38 `motion/pile-burst/f-004.webp` ▃
- 00:09.50 `motion/pile-burst/f-005.webp` ▃
- 00:09.62 `motion/pile-burst/f-006.webp` ▄
- 00:09.75 `motion/pile-burst/f-007.webp` ▃
- 00:09.88 `motion/pile-burst/f-008.webp` ▃
- 00:10.00 `motion/pile-burst/f-009.webp` ▄
- 00:10.12 `motion/pile-burst/f-010.webp` ▃
- 00:10.25 `motion/pile-burst/f-011.webp` ▃
- 00:10.38 `motion/pile-burst/f-012.webp` ▃
- 00:10.50 `motion/pile-burst/f-013.webp` ▃
- 00:10.62 `motion/pile-burst/f-014.webp` ▃
- 00:10.75 `motion/pile-burst/f-015.webp` ▃
- 00:10.88 `motion/pile-burst/f-016.webp` ▃
- 00:11.00 `motion/pile-burst/f-017.webp` ▂
- 00:11.12 `motion/pile-burst/f-018.webp` ▃
- 00:11.25 `motion/pile-burst/f-019.webp` ▃
- 00:11.38 `motion/pile-burst/f-020.webp` ▃
- 00:11.50 `motion/pile-burst/f-021.webp` ▃
- 00:11.62 `motion/pile-burst/f-022.webp` ▃
- 00:11.75 `motion/pile-burst/f-023.webp` ▃
- 00:11.88 `motion/pile-burst/f-024.webp` ▃
- 00:12.00 `motion/pile-burst/f-025.webp` ▂
- 00:12.12 `motion/pile-burst/f-026.webp` ▃
- 00:12.25 `motion/pile-burst/f-027.webp` ▄
- 00:12.38 `motion/pile-burst/f-028.webp` ▇
- 00:12.50 `motion/pile-burst/f-029.webp` ▇
- 00:12.62 `motion/pile-burst/f-030.webp` ▅
- 00:12.75 `motion/pile-burst/f-031.webp` ▂
- 00:12.88 `motion/pile-burst/f-032.webp` ▃
- 00:13.00 `motion/pile-burst/f-033.webp` ▄

### 03. Three agents added in the real sidebar

00:14.80–00:17.40 (2.60 s) · 22 frames at 8 fps, 0.125 s apart · hard cut, UI, stagger, cursor

A hard cut at 14.9, on the beat drop, to Notion's sidebar with an empty Agents section. The cursor sits on '+ New agent' and an agent appears above it about every half second: Task routing at 15.4, Q&A at 15.9, Status update at 16.4, each with its colored round icon. At 17.25 it cuts to the title card. The beat is short and plain, but it is where the characters come from.

Motion: `▁▆▄▂▁▂▂▁▁▂▁▂▂▁▁▁▁▁▁▁▇▇`

- 00:14.80 `motion/three-agents/f-001.webp` ▁
- 00:14.93 `motion/three-agents/f-002.webp` ▆
- 00:15.05 `motion/three-agents/f-003.webp` ▄
- 00:15.18 `motion/three-agents/f-004.webp` ▂
- 00:15.30 `motion/three-agents/f-005.webp` ▁
- 00:15.43 `motion/three-agents/f-006.webp` ▂
- 00:15.55 `motion/three-agents/f-007.webp` ▂
- 00:15.68 `motion/three-agents/f-008.webp` ▁
- 00:15.80 `motion/three-agents/f-009.webp` ▁
- 00:15.93 `motion/three-agents/f-010.webp` ▂
- 00:16.05 `motion/three-agents/f-011.webp` ▁
- 00:16.18 `motion/three-agents/f-012.webp` ▂
- 00:16.30 `motion/three-agents/f-013.webp` ▂
- 00:16.43 `motion/three-agents/f-014.webp` ▁
- 00:16.55 `motion/three-agents/f-015.webp` ▁
- 00:16.68 `motion/three-agents/f-016.webp` ▁
- 00:16.80 `motion/three-agents/f-017.webp` ▁
- 00:16.93 `motion/three-agents/f-018.webp` ▁
- 00:17.05 `motion/three-agents/f-019.webp` ▁
- 00:17.18 `motion/three-agents/f-020.webp` ▁
- 00:17.30 `motion/three-agents/f-021.webp` ▇
- 00:17.43 `motion/three-agents/f-022.webp` ▇

### 04. Stippled hands set the badges down

00:17.20–00:19.60 (2.40 s) · 25 frames at 10 fps, 0.100 s apart · hands, placement, stagger, exit

'Hello, Custom Agents.' A hand from the top left pinches the purple badge and sets it down beside the text (17.3 to 17.9). A finger from the bottom pushes the orange badge up like a button (17.8 to 18.6), and a hand from the right lays down the teal one (18.4 to 18.9). The hands withdraw by 19.4 and the line clears, so only the three badges are left on the page.

Motion: `▁▇▆▆▆▆▆▆▆▆▆▆▆▆▇▇▆▇▇▆▆▆▅▄▄`

Onion skin: `motion/hands-place/trail.webp`

- 00:17.20 `motion/hands-place/f-001.webp` ▁
- 00:17.30 `motion/hands-place/f-002.webp` ▇
- 00:17.40 `motion/hands-place/f-003.webp` ▆
- 00:17.50 `motion/hands-place/f-004.webp` ▆
- 00:17.60 `motion/hands-place/f-005.webp` ▆
- 00:17.70 `motion/hands-place/f-006.webp` ▆
- 00:17.80 `motion/hands-place/f-007.webp` ▆
- 00:17.90 `motion/hands-place/f-008.webp` ▆
- 00:18.00 `motion/hands-place/f-009.webp` ▆
- 00:18.10 `motion/hands-place/f-010.webp` ▆
- 00:18.20 `motion/hands-place/f-011.webp` ▆
- 00:18.30 `motion/hands-place/f-012.webp` ▆
- 00:18.40 `motion/hands-place/f-013.webp` ▆
- 00:18.50 `motion/hands-place/f-014.webp` ▆
- 00:18.60 `motion/hands-place/f-015.webp` ▇
- 00:18.70 `motion/hands-place/f-016.webp` ▇
- 00:18.80 `motion/hands-place/f-017.webp` ▆
- 00:18.90 `motion/hands-place/f-018.webp` ▇
- 00:19.00 `motion/hands-place/f-019.webp` ▇
- 00:19.10 `motion/hands-place/f-020.webp` ▆
- 00:19.20 `motion/hands-place/f-021.webp` ▆
- 00:19.30 `motion/hands-place/f-022.webp` ▆
- 00:19.40 `motion/hands-place/f-023.webp` ▅
- 00:19.50 `motion/hands-place/f-024.webp` ▄
- 00:19.60 `motion/hands-place/f-025.webp` ▄

### 05. Badges dash off and wipe the line on

00:19.50–00:21.60 (2.10 s) · 22 frames at 10 fps, 0.100 s apart · speed lines, fly-through, text reveal, hover

At 19.7 the badges shoot right, each leaving dashed speed lines in its own color, and leave the frame by about 20.5. They fly back through on new paths, and the teal one crosses the center at 21.1 and leaves 'They handle repetitive work, 24/7.' behind it. Purple and orange then hover in place, their dashed trails flickering as if they are still flying.

Motion: `▄▄▅▅▄▄▅▅▅▅▅▄▄▅▅▆▆▆▆▅▄▄`

- 00:19.50 `motion/dash-off/f-001.webp` ▄
- 00:19.60 `motion/dash-off/f-002.webp` ▄
- 00:19.70 `motion/dash-off/f-003.webp` ▅
- 00:19.80 `motion/dash-off/f-004.webp` ▅
- 00:19.90 `motion/dash-off/f-005.webp` ▄
- 00:20.00 `motion/dash-off/f-006.webp` ▄
- 00:20.10 `motion/dash-off/f-007.webp` ▅
- 00:20.20 `motion/dash-off/f-008.webp` ▅
- 00:20.30 `motion/dash-off/f-009.webp` ▅
- 00:20.40 `motion/dash-off/f-010.webp` ▅
- 00:20.50 `motion/dash-off/f-011.webp` ▅
- 00:20.60 `motion/dash-off/f-012.webp` ▄
- 00:20.70 `motion/dash-off/f-013.webp` ▄
- 00:20.80 `motion/dash-off/f-014.webp` ▅
- 00:20.90 `motion/dash-off/f-015.webp` ▅
- 00:21.00 `motion/dash-off/f-016.webp` ▆
- 00:21.10 `motion/dash-off/f-017.webp` ▆
- 00:21.20 `motion/dash-off/f-018.webp` ▆
- 00:21.30 `motion/dash-off/f-019.webp` ▆
- 00:21.40 `motion/dash-off/f-020.webp` ▅
- 00:21.50 `motion/dash-off/f-021.webp` ▄
- 00:21.60 `motion/dash-off/f-022.webp` ▄

### 06. The capability wipe

00:22.90–00:23.90 (1.00 s) · 25 frames at 24 fps, 0.042 s apart · scale, wipe, speed lines, repeat

The purple badge enters from the left at many times its normal size and sweeps right in about half a second. 'Route tasks automatically' is revealed in its wake, as if the badge is pulling it on, and purple dashes above and below the line retract after it. The same move, timed the same way, introduces 'Answer questions instantly' in orange at 33.25 and 'Write updates autonomously' in teal at 42.6. Repeating one entrance three times makes three features read as one system.

Motion: `▆▁▁▆█▁▁█▁█▁█▁▁█▁▇▁▁▆▁▆▁▅▁`

- 00:22.90 `motion/badge-wipe/f-001.webp` ▆
- 00:22.94 `motion/badge-wipe/f-002.webp` ▁
- 00:22.98 `motion/badge-wipe/f-003.webp` ▁
- 00:23.02 `motion/badge-wipe/f-004.webp` ▆
- 00:23.07 `motion/badge-wipe/f-005.webp` █
- 00:23.11 `motion/badge-wipe/f-006.webp` ▁
- 00:23.15 `motion/badge-wipe/f-007.webp` ▁
- 00:23.19 `motion/badge-wipe/f-008.webp` █
- 00:23.23 `motion/badge-wipe/f-009.webp` ▁
- 00:23.27 `motion/badge-wipe/f-010.webp` █
- 00:23.32 `motion/badge-wipe/f-011.webp` ▁
- 00:23.36 `motion/badge-wipe/f-012.webp` █
- 00:23.40 `motion/badge-wipe/f-013.webp` ▁
- 00:23.44 `motion/badge-wipe/f-014.webp` ▁
- 00:23.48 `motion/badge-wipe/f-015.webp` █
- 00:23.52 `motion/badge-wipe/f-016.webp` ▁
- 00:23.57 `motion/badge-wipe/f-017.webp` ▇
- 00:23.61 `motion/badge-wipe/f-018.webp` ▁
- 00:23.65 `motion/badge-wipe/f-019.webp` ▁
- 00:23.69 `motion/badge-wipe/f-020.webp` ▆
- 00:23.73 `motion/badge-wipe/f-021.webp` ▁
- 00:23.77 `motion/badge-wipe/f-022.webp` ▆
- 00:23.82 `motion/badge-wipe/f-023.webp` ▁
- 00:23.86 `motion/badge-wipe/f-024.webp` ▅
- 00:23.90 `motion/badge-wipe/f-025.webp` ▁

### 07. Requests carried onto a board

00:24.50–00:28.20 (3.70 s) · 23 frames at 6 fps, 0.167 s apart · pop-in, carry, slide-in, transform

Three request cards pop in one after another from 24.6: Slack, a Notion comment, an email. The purple badge flies in at 25.5 and lands on the stack. It tilts the stack and carries it left as a board slides in from the right (26.6 to 27.2), drops it into To-do, and by 27.6 the requests have become task cards. Priority tags arrive at 28.6, and around 31.3 the badge lifts the Urgent card to the top.

Motion: `▅▂▃▁▂▃▅▅▅▄▂▂▅▅▅▇▆▆▆▆▂▁▄`

- 00:24.50 `motion/route/f-001.webp` ▅
- 00:24.67 `motion/route/f-002.webp` ▂
- 00:24.83 `motion/route/f-003.webp` ▃
- 00:25.00 `motion/route/f-004.webp` ▁
- 00:25.17 `motion/route/f-005.webp` ▂
- 00:25.33 `motion/route/f-006.webp` ▃
- 00:25.50 `motion/route/f-007.webp` ▅
- 00:25.67 `motion/route/f-008.webp` ▅
- 00:25.83 `motion/route/f-009.webp` ▅
- 00:26.00 `motion/route/f-010.webp` ▄
- 00:26.17 `motion/route/f-011.webp` ▂
- 00:26.33 `motion/route/f-012.webp` ▂
- 00:26.50 `motion/route/f-013.webp` ▅
- 00:26.67 `motion/route/f-014.webp` ▅
- 00:26.83 `motion/route/f-015.webp` ▅
- 00:27.00 `motion/route/f-016.webp` ▇
- 00:27.17 `motion/route/f-017.webp` ▆
- 00:27.33 `motion/route/f-018.webp` ▆
- 00:27.50 `motion/route/f-019.webp` ▆
- 00:27.67 `motion/route/f-020.webp` ▆
- 00:27.83 `motion/route/f-021.webp` ▂
- 00:28.00 `motion/route/f-022.webp` ▁
- 00:28.17 `motion/route/f-023.webp` ▄

### 08. Questions flood in, the count runs to zero

00:35.00–00:41.20 (6.20 s) · 32 frames at 5 fps, 0.200 s apart · stack, blur scroll, counter, typing dots

Questions arrive one at a time (James Kim at 35.0, Yusuf Khan at 35.75, Lisa Chau at 36.4) with a red unread badge counting 1, 2, 3. Then the list scrolls in a motion blur and the count jumps to 43 by 37.2. The orange badge moves down the list and a '1 reply' tag appears under each question as the count falls. A second blur scroll at 39.6 lands on 0, and the last question gets typing dots at 40.6 and a real answer at 40.9.

Motion: `▆▆▆▅▂▁▄▇█▇███▇▇▅▄▆▅▅▅▅▆█▇▇▆▃▅▆▅▄`

- 00:35.00 `motion/questions/f-001.webp` ▆
- 00:35.20 `motion/questions/f-002.webp` ▆
- 00:35.40 `motion/questions/f-003.webp` ▆
- 00:35.60 `motion/questions/f-004.webp` ▅
- 00:35.80 `motion/questions/f-005.webp` ▂
- 00:36.00 `motion/questions/f-006.webp` ▁
- 00:36.20 `motion/questions/f-007.webp` ▄
- 00:36.40 `motion/questions/f-008.webp` ▇
- 00:36.60 `motion/questions/f-009.webp` █
- 00:36.80 `motion/questions/f-010.webp` ▇
- 00:37.00 `motion/questions/f-011.webp` █
- 00:37.20 `motion/questions/f-012.webp` █
- 00:37.40 `motion/questions/f-013.webp` █
- 00:37.60 `motion/questions/f-014.webp` ▇
- 00:37.80 `motion/questions/f-015.webp` ▇
- 00:38.00 `motion/questions/f-016.webp` ▅
- 00:38.20 `motion/questions/f-017.webp` ▄
- 00:38.40 `motion/questions/f-018.webp` ▆
- 00:38.60 `motion/questions/f-019.webp` ▅
- 00:38.80 `motion/questions/f-020.webp` ▅
- 00:39.00 `motion/questions/f-021.webp` ▅
- 00:39.20 `motion/questions/f-022.webp` ▅
- 00:39.40 `motion/questions/f-023.webp` ▆
- 00:39.60 `motion/questions/f-024.webp` █
- 00:39.80 `motion/questions/f-025.webp` ▇
- 00:40.00 `motion/questions/f-026.webp` ▇
- 00:40.20 `motion/questions/f-027.webp` ▆
- 00:40.40 `motion/questions/f-028.webp` ▃
- 00:40.60 `motion/questions/f-029.webp` ▅
- 00:40.80 `motion/questions/f-030.webp` ▆
- 00:41.00 `motion/questions/f-031.webp` ▅
- 00:41.20 `motion/questions/f-032.webp` ▄

### 09. A row slotted in, a page written, a push to @Today

00:44.30–00:50.10 (5.80 s) · 30 frames at 5 fps, 0.200 s apart · carry, insert, side peek, push in

The 'Launch status reports' database appears at 44.4. The teal badge flies in carrying a tilted row, 'Weekly Status Update @Today', and settles it into the top line as the older briefs shift down (44.6 to 45.5). At 46.9 the row opens as a side page, and the badge drops in the body text at about 48.5. At 49.6 the camera pushes in to '@Today' at display size, where reader avatars start stacking up.

Motion: `▆▆▇▆▄▆▆▃▂▃▄▅▆▇▆▅▃▁▃▄▆▆▄▂▁▁▇█▇▅`

- 00:44.30 `motion/status-row/f-001.webp` ▆
- 00:44.50 `motion/status-row/f-002.webp` ▆
- 00:44.70 `motion/status-row/f-003.webp` ▇
- 00:44.90 `motion/status-row/f-004.webp` ▆
- 00:45.10 `motion/status-row/f-005.webp` ▄
- 00:45.30 `motion/status-row/f-006.webp` ▆
- 00:45.50 `motion/status-row/f-007.webp` ▆
- 00:45.70 `motion/status-row/f-008.webp` ▃
- 00:45.90 `motion/status-row/f-009.webp` ▂
- 00:46.10 `motion/status-row/f-010.webp` ▃
- 00:46.30 `motion/status-row/f-011.webp` ▄
- 00:46.50 `motion/status-row/f-012.webp` ▅
- 00:46.70 `motion/status-row/f-013.webp` ▆
- 00:46.90 `motion/status-row/f-014.webp` ▇
- 00:47.10 `motion/status-row/f-015.webp` ▆
- 00:47.30 `motion/status-row/f-016.webp` ▅
- 00:47.50 `motion/status-row/f-017.webp` ▃
- 00:47.70 `motion/status-row/f-018.webp` ▁
- 00:47.90 `motion/status-row/f-019.webp` ▃
- 00:48.10 `motion/status-row/f-020.webp` ▄
- 00:48.30 `motion/status-row/f-021.webp` ▆
- 00:48.50 `motion/status-row/f-022.webp` ▆
- 00:48.70 `motion/status-row/f-023.webp` ▄
- 00:48.90 `motion/status-row/f-024.webp` ▂
- 00:49.10 `motion/status-row/f-025.webp` ▁
- 00:49.30 `motion/status-row/f-026.webp` ▁
- 00:49.50 `motion/status-row/f-027.webp` ▇
- 00:49.70 `motion/status-row/f-028.webp` █
- 00:49.90 `motion/status-row/f-029.webp` ▇
- 00:50.10 `motion/status-row/f-030.webp` ▅

### 10. A flick turns day into night

00:53.10–00:55.20 (2.10 s) · 26 frames at 12 fps, 0.083 s apart · hands, flick, match on action, color swap

The stippled hand rises beside 'Keep work moving all day...' at 53.2 and curls its fingers. At 53.9 it flicks, and a yellow light-bulb badge pops up and arcs over the text. At 54.4, mid-arc, the film cuts to navy. The bulb keeps going in the same direction, now glowing, the hand finishes its follow-through at the left edge, and the line has become '...and night.' The ellipsis and the bulb's path carry the eye across the cut.

Motion: `▁▅▆▆▁▆▆▅▅▄▁▇▇▆▇█▁▆▇▆▆▄▁▂▁▁`

- 00:53.10 `motion/flick-to-night/f-001.webp` ▁
- 00:53.18 `motion/flick-to-night/f-002.webp` ▅
- 00:53.27 `motion/flick-to-night/f-003.webp` ▆
- 00:53.35 `motion/flick-to-night/f-004.webp` ▆
- 00:53.43 `motion/flick-to-night/f-005.webp` ▁
- 00:53.52 `motion/flick-to-night/f-006.webp` ▆
- 00:53.60 `motion/flick-to-night/f-007.webp` ▆
- 00:53.68 `motion/flick-to-night/f-008.webp` ▅
- 00:53.77 `motion/flick-to-night/f-009.webp` ▅
- 00:53.85 `motion/flick-to-night/f-010.webp` ▄
- 00:53.93 `motion/flick-to-night/f-011.webp` ▁
- 00:54.02 `motion/flick-to-night/f-012.webp` ▇
- 00:54.10 `motion/flick-to-night/f-013.webp` ▇
- 00:54.18 `motion/flick-to-night/f-014.webp` ▆
- 00:54.27 `motion/flick-to-night/f-015.webp` ▇
- 00:54.35 `motion/flick-to-night/f-016.webp` █
- 00:54.43 `motion/flick-to-night/f-017.webp` ▁
- 00:54.52 `motion/flick-to-night/f-018.webp` ▆
- 00:54.60 `motion/flick-to-night/f-019.webp` ▇
- 00:54.68 `motion/flick-to-night/f-020.webp` ▆
- 00:54.77 `motion/flick-to-night/f-021.webp` ▆
- 00:54.85 `motion/flick-to-night/f-022.webp` ▄
- 00:54.93 `motion/flick-to-night/f-023.webp` ▁
- 00:55.02 `motion/flick-to-night/f-024.webp` ▂
- 00:55.10 `motion/flick-to-night/f-025.webp` ▁
- 00:55.18 `motion/flick-to-night/f-026.webp` ▁

### 11. Pull back in steps to a sky of agents

00:55.30–01:03.50 (8.20 s) · 26 frames at 3 fps, 0.333 s apart · towing, scale steps, blink cut, swarm

Close up, glowing agents cross the navy towing their tasks like banners, some horizontal, some vertical (55.4 to 57.4). At 57.4 the frame blinks to empty navy for about a fifth of a second and comes back wider, with dozens of them. At 61.1 it steps out again, and the agents shrink to small colored marks moving on a grid. Each step out is a cut, not a zoom, so the scale jumps. At 63.37 the swarm is gone.

Motion: `▆▆▆▇▆▆▆▆▆▆▇▇▆▆▆▆▆▇▆▅▅▆▅▅▆▂`

- 00:55.30 `motion/night-pullback/f-001.webp` ▆
- 00:55.63 `motion/night-pullback/f-002.webp` ▆
- 00:55.97 `motion/night-pullback/f-003.webp` ▆
- 00:56.30 `motion/night-pullback/f-004.webp` ▇
- 00:56.63 `motion/night-pullback/f-005.webp` ▆
- 00:56.97 `motion/night-pullback/f-006.webp` ▆
- 00:57.30 `motion/night-pullback/f-007.webp` ▆
- 00:57.63 `motion/night-pullback/f-008.webp` ▆
- 00:57.97 `motion/night-pullback/f-009.webp` ▆
- 00:58.30 `motion/night-pullback/f-010.webp` ▆
- 00:58.63 `motion/night-pullback/f-011.webp` ▇
- 00:58.97 `motion/night-pullback/f-012.webp` ▇
- 00:59.30 `motion/night-pullback/f-013.webp` ▆
- 00:59.63 `motion/night-pullback/f-014.webp` ▆
- 00:59.97 `motion/night-pullback/f-015.webp` ▆
- 01:00.30 `motion/night-pullback/f-016.webp` ▆
- 01:00.63 `motion/night-pullback/f-017.webp` ▆
- 01:00.97 `motion/night-pullback/f-018.webp` ▇
- 01:01.30 `motion/night-pullback/f-019.webp` ▆
- 01:01.63 `motion/night-pullback/f-020.webp` ▅
- 01:01.97 `motion/night-pullback/f-021.webp` ▅
- 01:02.30 `motion/night-pullback/f-022.webp` ▆
- 01:02.63 `motion/night-pullback/f-023.webp` ▅
- 01:02.97 `motion/night-pullback/f-024.webp` ▅
- 01:03.30 `motion/night-pullback/f-025.webp` ▆
- 01:03.63 `motion/night-pullback/f-026.webp` ▂

### 12. Press New Agent, cut to the logo

01:03.20–01:06.20 (3.00 s) · 25 frames at 8 fps, 0.125 s apart · cursor, button press, hard cut, fade-in

A single white '+ New Agent' button sits on navy at 63.37. A cursor rises from below, reaches it at about 63.9, and the button gives slightly on the press at 64.1 before the cursor drifts away. At 65.1 it cuts to the Notion icon alone, and the wordmark fades in beside it at 65.7. The call to action is a press the viewer watches happen, not a written line.

Motion: `▅▇▂▂▂▃▁▁▂▄▂▂▁▂▁▇▁▁▂▄▄▃▁▁▁`

- 01:03.20 `motion/button-logo/f-001.webp` ▅
- 01:03.33 `motion/button-logo/f-002.webp` ▇
- 01:03.45 `motion/button-logo/f-003.webp` ▂
- 01:03.58 `motion/button-logo/f-004.webp` ▂
- 01:03.70 `motion/button-logo/f-005.webp` ▂
- 01:03.83 `motion/button-logo/f-006.webp` ▃
- 01:03.95 `motion/button-logo/f-007.webp` ▁
- 01:04.08 `motion/button-logo/f-008.webp` ▁
- 01:04.20 `motion/button-logo/f-009.webp` ▂
- 01:04.33 `motion/button-logo/f-010.webp` ▄
- 01:04.45 `motion/button-logo/f-011.webp` ▂
- 01:04.58 `motion/button-logo/f-012.webp` ▂
- 01:04.70 `motion/button-logo/f-013.webp` ▁
- 01:04.83 `motion/button-logo/f-014.webp` ▂
- 01:04.95 `motion/button-logo/f-015.webp` ▁
- 01:05.08 `motion/button-logo/f-016.webp` ▇
- 01:05.20 `motion/button-logo/f-017.webp` ▁
- 01:05.33 `motion/button-logo/f-018.webp` ▁
- 01:05.45 `motion/button-logo/f-019.webp` ▂
- 01:05.58 `motion/button-logo/f-020.webp` ▄
- 01:05.70 `motion/button-logo/f-021.webp` ▄
- 01:05.83 `motion/button-logo/f-022.webp` ▃
- 01:05.95 `motion/button-logo/f-023.webp` ▁
- 01:06.08 `motion/button-logo/f-024.webp` ▁
- 01:06.20 `motion/button-logo/f-025.webp` ▁

## Key frames

One frame per visual idea, from the one-per-second set.

- 00:00.00 `seconds/second-00001.webp` Warm off-white and nothing else for half a second. The paper color is the stage for the whole day half of the film.
- 00:01.00 `seconds/second-00002.webp` A hand-drawn conveyor belt (two black lines and a row of rollers) carries task cards: 'Compile latest metrics snapshot for leadership', 'Draft and send weekly team update'. Busywork as a factory line.
- 00:02.00 `seconds/second-00003.webp` A new card tumbles in from the top of frame in a motion-blurred streak and lands on the belt. The work keeps arriving.
- 00:06.00 `seconds/second-00007.webp` The belt speeds up to a blur and runs out: its rounded end slides in from the right.
- 00:07.00 `seconds/second-00008.webp` The last cards tip off the end of the belt, tilting as they fall.
- 00:08.00 `seconds/second-00009.webp` Cut to the heap: dozens of cards at every angle, all believable chores ('Triage inbox and close pending follow-ups', 'Prep handoff notes for items rolling to next week'). The checkbox and type are Notion's own.
- 00:10.00 `seconds/second-00011.webp` The camera pulls back and a purple 'To-do' pill sits on the heap, its count leaping from 89 to 175 and on up.
- 00:11.00 `seconds/second-00012.webp` The count settles in the 600s (628 by the end). A doodled pile has become a Notion view with a number on it.
- 00:12.00 `seconds/second-00013.webp` The heap bursts outward in one frame and the cards fly off every edge, leaving 'Bye bye, busywork.' in bold black sans.
- 00:13.00 `seconds/second-00014.webp` The line alone, shrinking slowly. Under it the music has fallen almost to silence.
- 00:15.00 `seconds/second-00016.webp` The beat drops on a cut to the real product: Notion's sidebar beside a 'Launch Day' page, the cursor on '+ New agent' under an empty Agents heading.
- 00:16.00 `seconds/second-00017.webp` Three agents now listed, each with a round colored icon: Task routing agent (purple), Q&A agent (orange), Status update agent (teal). Those icons are about to become the cast.
- 00:17.00 `seconds/second-00018.webp` 'Hello, Custom Agents.' A halftone-stippled hand with a thick black outline sets the purple checkbox badge down like a game piece.
- 00:18.00 `seconds/second-00019.webp` A finger pushes the orange speech-bubble badge up from the bottom edge as a second hand brings in the teal folder. Each badge has two dot eyes.
- 00:19.00 `seconds/second-00020.webp` The hands are gone and so is the line, leaving three badges on the empty page. Drawn hands have given the sidebar icons life.
- 00:20.00 `seconds/second-00021.webp` The badges dart off with dashed speed lines in their own colors.
- 00:21.00 `seconds/second-00022.webp` 'They handle repetitive work, 24/7.' The teal badge wiped it on as it flew through; purple and orange hover in place with flickering trails.
- 00:23.00 `seconds/second-00024.webp` The purple badge sweeps right at huge scale and drags 'Route tasks automatically' in behind it. Every capability title enters this way.
- 00:25.00 `seconds/second-00026.webp` Three incoming requests as cards: a Slack message in #support-channel-ask, a Notion comment and an email from Paolo.
- 00:27.00 `seconds/second-00028.webp` The purple badge carries the stack, tilted, into the To-do column as the board slides in.
- 00:29.00 `seconds/second-00030.webp` The requests are now tasks with priority tags: Low for Privacy & Compliance, Urgent for Data Governance.
- 00:31.00 `seconds/second-00032.webp` The badge lifts the Urgent card to the top of To-do. Routing is shown as the agent physically moving work.
- 00:33.00 `seconds/second-00034.webp` The same wipe in orange: 'Answer questions instantly'.
- 00:35.00 `seconds/second-00036.webp` One question, from James Kim: 'Where's the demo script?', with a red unread badge reading 1 and a hand-drawn avatar.
- 00:37.00 `seconds/second-00038.webp` The list has flooded and the unread count reads 43: Libby Morano asks how to book a conference room, Wesley Ceceña wants the wifi password.
- 00:38.00 `seconds/second-00039.webp` The orange badge works down the list. A '1 reply' tag appears under each answered question and the count drops to 42.
- 00:41.00 `seconds/second-00042.webp` The count is 0. Catherine Nichols' 'What's the latest launch date?' has its answer: 'New launch date is April 14. Here's the rollout plan.'
- 00:43.00 `seconds/second-00044.webp` Teal wipe: 'Write updates autonomously'.
- 00:45.00 `seconds/second-00046.webp` A 'Launch status reports' database. The teal badge carries in a new row, 'Weekly Status Update @Today', and drops it on top of earlier weekly briefs.
- 00:47.00 `seconds/second-00048.webp` The new row opens as a side page, with Created by: Status update agent.
- 00:49.00 `seconds/second-00050.webp` The badge has written the page: 'Week at a Glance' and a roadmap status list.
- 00:50.00 `seconds/second-00051.webp` A push in to '@Today' at display size, one avatar above it.
- 00:51.00 `seconds/second-00052.webp` Avatars stack up beside it and a '+2' appears, then '+3'. The update is being read: the team benefits.
- 00:52.00 `seconds/second-00053.webp` Cut to 'Keep work moving all day...', ending on an ellipsis.
- 00:53.00 `seconds/second-00054.webp` The stippled hand comes back, fingers curled for a flick.
- 00:54.00 `seconds/second-00055.webp` On the flick the film cuts to navy: '...and night.' The light-bulb badge now glows, and the hand is still finishing its follow-through.
- 00:56.00 `seconds/second-00057.webp` Night agents up close: a glowing plug badge trailing 'Post roadmap summary', a red badge towing 'Catch up on inbox'. Each drags its task like a banner.
- 00:58.00 `seconds/second-00059.webp` A blink to empty navy, then a wider view: dozens of agents crossing on horizontal and vertical paths, each towing a task.
- 01:02.00 `seconds/second-00063.webp` Wider again. Each agent is now a small colored mark with its task, moving on a grid like traffic seen from far above.
- 01:03.00 `seconds/second-00064.webp` The swarm is gone. One white '+ New Agent' button sits on navy.
- 01:04.00 `seconds/second-00065.webp` The cursor has pressed the button and drifts away below it.
- 01:05.00 `seconds/second-00066.webp` Cut to the Notion icon alone on navy; the wordmark fades in beside it half a second later.
- 01:08.00 `seconds/second-00069.webp` The wordmark holds. The music has just ended, and the last two and a half seconds are silent.
