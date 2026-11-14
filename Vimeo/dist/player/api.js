// A small stand-in for https://player.vimeo.com/api/player.js, covering what vimeo.com's modal player calls:
// play, pause, text tracks, the "ended" event and the getters its analytics read.
// Local players (player/<id>.html, same origin) are driven directly through their <video>.
// Real Vimeo embeds (the Staff Picks films) are driven with the player's postMessage protocol.
(function () {
  if (window.Vimeo && window.Vimeo.Player) return;
  var players = new WeakMap();
  var VIMEO = 'https://player.vimeo.com';

  function Player(el) {
    if (players.has(el)) return players.get(el);
    players.set(el, this);
    this.el = el;
    this.handlers = {};
    this.pending = {};
    this.remote = /^https:\/\/player\.vimeo\.com\//.test(el.src);
    var self = this;
    this.ready = new Promise(function (resolve) {
      var done = function () { self.remote ? resolve() : self.attach(resolve); };
      var doc = !self.remote && el.contentDocument;
      if (doc && doc.readyState === 'complete' && doc.querySelector('video')) done();
      else el.addEventListener('load', done, { once: true });
    });
    if (this.remote) {
      window.addEventListener('message', function (e) {
        if (e.source !== el.contentWindow) return;
        var d = e.data;
        try { d = typeof d === 'string' ? JSON.parse(d) : d; } catch (err) { return; }
        if (d.event) (self.handlers[d.event] || []).forEach(function (fn) { fn(d.data); });
        if (d.method && self.pending[d.method]) self.pending[d.method].shift()(d.value);
      });
    }
  }

  Player.prototype.attach = function (resolve) {
    var self = this;
    this.video = this.el.contentDocument.querySelector('video');
    ['play', 'pause', 'ended', 'timeupdate'].forEach(function (name) {
      self.video.addEventListener(name, function () {
        (self.handlers[name] || []).forEach(function (fn) { fn({ seconds: self.video.currentTime, duration: self.video.duration }); });
      });
    });
    resolve();
  };

  Player.prototype.post = function (method, value) {
    var w = this.el.contentWindow;
    if (w) w.postMessage(JSON.stringify(value === undefined ? { method: method } : { method: method, value: value }), VIMEO);
  };

  Player.prototype.ask = function (method, local) {
    var self = this;
    return this.ready.then(function () {
      if (!self.remote) return local(self.video);
      return new Promise(function (resolve) {
        (self.pending[method] = self.pending[method] || []).push(resolve);
        self.post(method);
      });
    });
  };

  Player.prototype.play = function () {
    var self = this;
    return this.ready.then(function () {
      if (self.remote) return self.post('play');
      return self.video.play().catch(function () { self.video.muted = true; return self.video.play(); });
    });
  };
  Player.prototype.pause = function () {
    var self = this;
    return this.ready.then(function () { self.remote ? self.post('pause') : self.video.pause(); });
  };
  Player.prototype.setCurrentTime = function (t) {
    var self = this;
    return this.ready.then(function () { self.remote ? self.post('setCurrentTime', t) : (self.video.currentTime = t); return t; });
  };
  Player.prototype.on = function (name, fn) {
    (this.handlers[name] = this.handlers[name] || []).push(fn);
    var self = this;
    if (this.remote) this.ready.then(function () { self.post('addEventListener', name); });
  };
  Player.prototype.off = function (name, fn) {
    this.handlers[name] = fn ? (this.handlers[name] || []).filter(function (h) { return h !== fn; }) : [];
  };
  Player.prototype.getPaused = function () { return this.ask('getPaused', function (v) { return v.paused; }); };
  Player.prototype.getDuration = function () { return this.ask('getDuration', function (v) { return v.duration || 0; }); };
  Player.prototype.getCurrentTime = function () { return this.ask('getCurrentTime', function (v) { return v.currentTime; }); };
  Player.prototype.getVideoTitle = function () { return this.ask('getVideoTitle', function (v) { return v.dataset.title || ''; }); };
  Player.prototype.getVideoId = function () { return this.ask('getVideoId', function (v) { return Number(v.dataset.id) || 0; }); };
  Player.prototype.getVideoWidth = function () { return this.ask('getVideoWidth', function (v) { return v.videoWidth || null; }); };
  Player.prototype.getVideoHeight = function () { return this.ask('getVideoHeight', function (v) { return v.videoHeight || null; }); };
  // The local films have no caption tracks; Vimeo embeds keep their own caption menu.
  Player.prototype.getTextTracks = function () { return this.remote ? this.ask('getTextTracks') : Promise.resolve([]); };
  Player.prototype.enableTextTrack = function (language, kind) {
    if (this.remote) this.post('enableTextTrack', { language: language, kind: kind });
    return Promise.resolve({ language: language, kind: kind || 'subtitles', label: language });
  };
  Player.prototype.disableTextTrack = function () { if (this.remote) this.post('disableTextTrack'); return Promise.resolve(); };
  Player.prototype.unload = function () { return this.pause(); };
  Player.prototype.destroy = function () { players.delete(this.el); return Promise.resolve(); };

  window.Vimeo = window.Vimeo || {};
  window.Vimeo.Player = Player;
})();
