# Out of the shell

Seventeen days of brine shrimp from the [MicroScope-v1](https://huggingface.co/datasets/ThomasTheMaker/MicroScope-v1) dataset, drawn as a statechart in the style of [One becomes two](https://kevintngo.github.io/statechart-art/one-becomes-two/) by Kevin Ngo, with the real eyepiece frames and timelapses set into the drawing.

This is not a clone. It borrows the style: one tall wall of paper sheets, glass slides for states, twisted threads for steps, and a step-through mode with a microscope view.

## Run locally

```bash
python3 -m http.server 8866 --directory OutOfTheShell/dist
```

Then open http://localhost:8866/. The sheets are drawn in the browser when the page loads, in a Web Worker, nearest sheet first.

## Files

| path | what it is |
|---|---|
| `dist/kit.js` | paper as a height field, and pencil, pastel, gel pen and cover laid down pixel by pixel through it; lettering in Kevin Sans |
| `dist/chart.js` | the sheets, the states, the steps, their routes on the wall, and the check that walks every step |
| `dist/wall.js` | the drawn things (cysts, hatching stages, nauplius, eyepieces, prints), the slides, threads and tags, and each sheet's scene |
| `dist/render.js` | the worker that draws a sheet and hands back its pixels |
| `dist/page.js` | lays the sheets down the wall, places the real frames and clips in the drawn holes, writes the chart as text, and runs the step-through mode |
| `dist/field/` | frames and clips from the dataset, as cut for the MicroScope-v1 Field Log |
| `dist/fonts/` | Kevin Sans (MIT) |

Everything is in wall millimetres: the wall is 180 mm wide and each sheet renders at `ppm` pixels per millimetre for the screen. Drawing is seeded, so the same code draws the same picture. To use the style for another subject, keep `kit.js`, rewrite the states and steps in `chart.js`, and write new scenes in `wall.js`.

## Credits

Style after statechart art by Kevin Ngo (MIT). The renderer is written for this page, after the approach described in that repository's `tools/kit`. Lettering in Kevin Sans, traced from A. V. Hershey's 1967 fonts (MIT). Frames and clips from ThomasTheMaker/MicroScope-v1.
