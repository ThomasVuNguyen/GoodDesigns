# Video frame and transcript study

The local `index.html` previews the current GoodDesigns gallery with a **Breakdown** button on videos 1–13, 16, and 17. Other video cards have no breakdown button. The individual breakdown pages show video playback beside a clickable transcript and a frame library with scene-change and one-second views. Hovering over a frame shows a larger preview and its **Play frame** control; keyboard focus shows the preview too. On touch screens, the play control remains visible.

For local review, serve the repository root with `npx -y http-server . -p 8766 -a 127.0.0.1 -c-1` and open `http://127.0.0.1:8766/notes/good-videos-video-study/index.html#videos`. This server supports video byte ranges, so frame timestamps seek reliably.

The published copy lives in `gallery/breakdowns/`. Run `python3 scripts/publish-video-breakdowns.py` after rebuilding the local study to refresh its pages, 960-pixel WebP frames, and compact 540p video copies. CI copies these committed gallery files into the live site; the full-resolution study media remains local and ignored by Git.

Each video page has a local playable copy, a ten-second visual overview, timestamped transcript, one frame per second, and extra frames at detected scene cuts. The one-second frames are 1280 pixels wide at most. Scene cuts use FFmpeg's scene score threshold of 0.30. This selection is intended for visual and pacing analysis; it does not represent every decoded video frame.

`source/` contains the downloaded clips. `frames/` contains the image sequences and `scene-cuts.csv` files. `transcripts/` contains source WebVTT captions where available and locally recognized speech for the other videos. Video 11 is spoken in Japanese, so its transcript is in Japanese. The `.transcript.txt` files are cleaned, timestamped reading copies. Speech recognition can mishear words and names; the `.vtt` files retain the original timing.

The media and generated pages are local study materials. They are excluded from Git so the GoodDesigns gallery release does not accidentally include a large video archive. To rebuild the study after updating the media or transcripts, run `python3 notes/good-videos-video-study/build_study.py` from the repository root.
