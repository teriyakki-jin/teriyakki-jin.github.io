// Star field: floating twinkle stars + scroll/click burst
(function () {
  'use strict';

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.position       = 'fixed';
  canvas.style.top            = '0';
  canvas.style.left           = '0';
  canvas.style.width          = '100%';
  canvas.style.height         = '100%';
  canvas.style.pointerEvents  = 'none';
  canvas.style.zIndex         = '9000';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0;
  var stars = [], pool = [];

  // ── resize ────────────────────────────────────────────
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = [];
    var n = W < 640 ? 90 : 180;
    for (var i = 0; i < n; i++) {
      stars.push({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 1.3 + 0.4,
        alpha: Math.random() * 0.22 + 0.08,
        phase: Math.random() * 6.28,
        freq:  0.008 + Math.random() * 0.014,
        vx:    (Math.random() - 0.5) * 0.05,
        vy:    (Math.random() - 0.5) * 0.05,
      });
    }
  }
  resize();
  window.addEventListener('resize', resize);

  // ── burst ─────────────────────────────────────────────
  var COLORS = [
    [217, 119,  87],
    [245, 190, 110],
    [255, 230, 180],
    [190,  80,  40],
    [255, 215, 140],
  ];

  function burst(x, y, n) {
    n = n || 26;
    for (var i = 0; i < n; i++) {
      var ang = Math.random() * 6.2832;
      var spd = 1.5 + Math.random() * 5.5;
      pool.push({
        x: x, y: y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 1.5,
        r:    1.2 + Math.random() * 3,
        life: 1,
        decay: 0.011 + Math.random() * 0.013,
        color: COLORS[0 | Math.random() * COLORS.length],
        grav:  0.09 + Math.random() * 0.07,
      });
    }
  }

  // ── click burst ────────────────────────────────────────
  document.addEventListener('click', function (e) {
    burst(e.clientX, e.clientY, 30);
  });

  // ── paint ─────────────────────────────────────────────
  function paint() {
    requestAnimationFrame(paint);
    ctx.clearRect(0, 0, W, H);

    // Twinkle stars
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
      ctx.fillStyle = 'rgba(160,110,65,' + a.toFixed(3) + ')';
      ctx.fill();
    }

    // Burst particles
    for (var j = pool.length - 1; j >= 0; j--) {
      var p = pool[j];
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += p.grav;
      p.vx *= 0.972;
      p.life -= p.decay;
      if (p.life <= 0) { pool.splice(j, 1); continue; }

      var c  = p.color;
      var al = p.life;
      var gr = p.r * (2 + al * 2);

      var grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(gr, 0.1));
      grd.addColorStop(0, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (al * 0.55).toFixed(3) + ')');
      grd.addColorStop(1, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, gr, 0, 6.2832);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * Math.max(al, 0.1), 0, 6.2832);
      ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + al.toFixed(3) + ')';
      ctx.fill();
    }
  }

  paint();

  // Small burst on load to confirm it's working
  setTimeout(function () {
    burst(W * 0.5, H * 0.35, 18);
  }, 600);

}());
