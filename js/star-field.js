// Star field: floating twinkle stars (dark/violet theme)
(function () {
  'use strict';

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.position      = 'fixed';
  canvas.style.top           = '0';
  canvas.style.left          = '0';
  canvas.style.width         = '100%';
  canvas.style.height        = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex        = '9000';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0;
  var stars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = [];
    var n = W < 640 ? 80 : 160;
    for (var i = 0; i < n; i++) {
      stars.push({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.18 + 0.04,
        phase: Math.random() * 6.28,
        freq:  0.007 + Math.random() * 0.013,
        vx:    (Math.random() - 0.5) * 0.04,
        vy:    (Math.random() - 0.5) * 0.04,
      });
    }
  }
  resize();
  window.addEventListener('resize', resize);

  function paint() {
    requestAnimationFrame(paint);
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.phase += s.freq;
      if (s.x < -2) s.x = W + 2;
      else if (s.x > W + 2) s.x = -2;
      if (s.y < -2) s.y = H + 2;
      else if (s.y > H + 2) s.y = -2;

      var a = s.alpha * (0.45 + 0.55 * Math.sin(s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 6.2832);
      ctx.fillStyle = 'rgba(200,190,255,' + a.toFixed(3) + ')';
      ctx.fill();
    }
  }

  paint();
}());
