# Video frame and transcript study

The local `index.html` previews the current GoodDesigns gallery with a **Breakdown** button on videos 1–13, 16, 17, and 28–33. Other video cards have no breakdown button. The individual breakdown pages show video playback beside a clickable transcript and a frame library with scene-change and one-second views. Hovering over a frame shows a larger preview and its **Play frame** control; keyboard focus shows the preview too. On touch screens, the play control remains visible.

For local review, serve the repository root with `npx -y http-server . -p 8766 -a 127.0.0.1 -c-1` and open `http://127.0.0.1:8766/notes/good-videos-video-study/index.html#videos`. This server supports video byte ranges, so frame timestamps seek reliably.

The published copy lives in `gallery/breakdowns/`. Run `python3 scripts/publish-video-breakdowns.py` after rebuilding the local study to refresh its pages and WebP frames. Short videos have compact 540p playable copies; videos 29–33 use the YouTube player to avoid hosting hours of video. Their frame and transcript buttons still seek the player. The new long-video frames are 720 pixels wide; earlier frames are 960 pixels wide. CI copies these committed gallery files into the live site; the full-resolution study media remains local and ignored by Git.

Each video page has playback, a timestamped transcript, one frame per second, and extra frames at detected scene cuts. The local study also has a ten-second visual overview. The one-second source frames are 1280 pixels wide at most. Scene cuts use FFmpeg's scene score threshold of 0.30. This selection is intended for visual and pacing analysis; it does not represent every decoded video frame.

Video 34, Apple's MacBook Pro M6 film, opens with 20 handpicked frames from the one-second sequence instead of detected cuts. Its moving masks and typography rarely trigger the cut detector, so the automatic set misses most of the visual ideas. The exhaustive every-second view remains available in the second tab. The curated timestamps live in `build_study.py` and the generated `manifest.json`.

`source/` contains the downloaded clips. `frames/` contains the image sequences and `scene-cuts.csv` files. `transcripts/` contains source WebVTT captions where available and locally recognized speech for the other videos. Video 11 is spoken in Japanese, so its transcript is in Japanese. The `.transcript.txt` files are cleaned, timestamped reading copies. Speech recognition can mishear words and names; the `.vtt` files retain the original timing.

The media and generated pages are local study materials. They are excluded from Git so the GoodDesigns gallery release does not accidentally include a large video archive. To rebuild the study after updating the media or transcripts, run `python3 notes/good-videos-video-study/build_study.py` from the repository root.

The standalone motion reference at `gallery/breakdowns/references/cleo-extinct-animals-intro/` contains the 1:07–1:13 intro from Cleo Abram’s “The Real Reason We Should Revive Extinct Animals.” It includes a six-second 1080p clip with audio, 143 individual 1080p WebP frames, a downloadable frame ZIP, and a frame-by-frame viewer. The full source video stays local under `source/`.
