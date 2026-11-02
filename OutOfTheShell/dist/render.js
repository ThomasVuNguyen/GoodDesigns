// render.js — draws sheets off the main thread. Asked for {id, ppm}, it answers with the sheet's pixels.
importScripts('kit.js', 'chart.js', 'wall.js');
const fonts = Promise.all([
  new FontFace('Kevin Sans', 'url(fonts/KevinSans-Regular.woff2)', { weight: '400' }),
  new FontFace('Kevin Sans', 'url(fonts/KevinSans-Bold.woff2)', { weight: '700' }),
].map((f) => f.load().then((ff) => { self.fonts.add(ff); return ff; })));
self.onmessage = async ({ data }) => {
  try {
    await fonts;
    const S = self.Wall.drawTile(data.id, data.ppm), px = self.Kit.pixels(S);
    self.postMessage({ id: data.id, w: S.W, h: S.H, px }, [px.buffer]);
  } catch (err) { self.postMessage({ id: data.id, error: String(err && err.stack || err) }); }
};
