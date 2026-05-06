// Star field — fixed overlay canvas, bursts on scroll & click
(function () {
  'use strict';
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = [
    'position:fixed', 'top:0', 'left:0',
    'width:100%', 'height:100%',
    'pointer-events:none',
    'z-index:9000',
  ].join(';');
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var W, H;

  // ── Stars ───────────────────────────────────────────
  var stars = [];

  function mkStar() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.1 + 0.25,
      baseA: Math.random() * 0.13 + 0.04,
      phase: Math.random() * Math.PI * 2,
      freq:  0.007 + Math.random() * 0.013,
      vx:    (Math.random() - 0.5) * 0.045,
      vy:    (Math.random() - 0.5) * 0.045,
    };
  }

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    var n = W < 640 ? 90 : 180;
    stars = [];
    for (var i = 0; i < n; i++) stars.push(mkStar());
  }
  resize();
  window.addEventListener('resize', resize);

  // ── Burst particles ──────────────────────────────────
  var COLORS = [
    [217, 119,  87],   // #D97757 orange
    [245, 195, 130],   // warm gold
    [255, 235, 195],   // cream star
    [184,  80,  40],   // ember
    [255, 210, 150],   // soft amber
  ];

  var pool = [];

  function burst(x, y, n) {
    for (var i = 0; i < (n || 24); i++) {
      var angle = Math.random() * Math.PI * 2;
      var spd   = Math.random() * 5 + 0.6;
      var c     = COLORS[Math.floor(Math.random() * COLORS.length)];
      pool.push({
        x: x, y: y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 1.2,
        r:    Math.random() * 2.4 + 0.5,
        life: 1.0,
        decay: 0.013 + Math.random() * 0.011,
        color: c,
        grav:  0.07 + Math.random() * 0.06,
      });
    }
  }

  // ── Scroll tracking ──────────────────────────────────
  var scrolling  = false;
  var stopTimer  = null;
  var burstTimer = null;

  window.addEventListener('scroll', function () {
    if (!scrolling) {
      scrolling = true;
      burstTimer = setInterval(function () {
        if (!scrolling) return clearInterval(burstTimer);
        burst(
          W * 0.08 + Math.random() * W * 0.84,
          H * 0.12 + Math.random() * H * 0.76,
          20 + Math.floor(Math.random() * 12)
        );
      }, 110);
    }
    clearTimeout(stopTimer);
    stopTimer = setTimeout(function () {
      scrolling = false;
      clearInterval(burstTimer);
    }, 140);
  });

  // ── Click burst ──────────────────────────────────────
  document.addEventListener('click', function (e) {
    // Skip if clicking interactive elements
    var tag = e.target.tagName;
    if (tag === 'A' || tag === 'BUTTON') {
      burst(e.clientX, e.clientY, 14);
    } else {
      burst(e.clientX, e.clientY, 26);
    }
  });

  // ── Render loop ──────────────────────────────────────
  function frame() {
    requestAnimationFrame(frame);
    ctx.clearRect(0, 0, W, H);

    // Background twinkle stars
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.phase += s.freq;

      if (s.x < -2) s.x = W + 2;
      else if (s.x > W + 2) s.x = -2;
      if (s.y < -2) s.y = H + 2;
      else if (s.y > H + 2) s.y = -2;

      var a = s.baseA * (0.5 + 0.5 * Math.sin(s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 6.2832);
      ctx.fillStyle = 'rgba(155,108,68,' + a.toFixed(3) + ')';
      ctx.fill();
    }

    // Burst particles
    for (var i = pool.length - 1; i >= 0; i--) {
      var p = pool[i];
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += p.grav;
      p.vx *= 0.974;
      p.life -= p.decay;

      if (p.life <= 0) { pool.splice(i, 1); continue; }

      var c = p.color;
      var a = p.life;

      // Soft glow halo
      var gr  = p.r * (1.6 + a * 1.8);
      var grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
      grd.addColorStop(0, 'rgba(' + c + ',' + (a * 0.5).toFixed(3) + ')');
      grd.addColorStop(1, 'rgba(' + c + ',0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, gr, 0, 6.2832);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * Math.max(a, 0.1), 0, 6.2832);
      ctx.fillStyle = 'rgba(' + c + ',' + a.toFixed(3) + ')';
      ctx.fill();
    }
  }

  frame();
}());
