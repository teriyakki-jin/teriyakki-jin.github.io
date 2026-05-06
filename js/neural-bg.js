// Neural network background — pure Canvas 2D with 3D perspective projection
(function () {
  'use strict';

  var canvas = document.getElementById('header-canvas');
  if (!canvas || !canvas.getContext) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = canvas.getContext('2d');
  var wrapper = canvas.parentElement;

  function resize() {
    canvas.width  = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  var isMobile = window.innerWidth < 640;
  var N = isMobile ? 28 : 56;

  var nodes = [];
  for (var i = 0; i < N; i++) {
    nodes.push({
      x:  (Math.random() - 0.5) * 1000,
      y:  (Math.random() - 0.5) * 200,
      z:  (Math.random() - 0.5) * 300,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.26,
      vz: (Math.random() - 0.5) * 0.14,
      pulse:     0,
      pulseDur:  55 + Math.floor(Math.random() * 70),
      nextPulse: Math.floor(Math.random() * 220),
    });
  }

  var FOV     = 400;
  var MAX_DSQ = 195 * 195;
  var cam     = { x: 0, y: 0 };
  var tgt     = { x: 0, y: 0 };

  document.addEventListener('mousemove', function (e) {
    tgt.x = (e.clientX / window.innerWidth  - 0.5) * 80;
    tgt.y = (e.clientY / window.innerHeight - 0.5) * 28;
  });

  function project(n) {
    var z = n.z + FOV;
    if (z < 10) z = 10;
    var s = FOV / z;
    return {
      x: (n.x - cam.x) * s + canvas.width  * 0.5,
      y: (n.y - cam.y) * s + canvas.height * 0.5,
      s: s,
      a: Math.min(1, z / (FOV + 130)),
    };
  }

  function frame() {
    requestAnimationFrame(frame);

    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Smooth camera drift
    cam.x += (tgt.x - cam.x) * 0.04;
    cam.y += (tgt.y - cam.y) * 0.04;

    var proj = new Array(N);

    for (var i = 0; i < N; i++) {
      var n = nodes[i];
      n.x += n.vx; n.y += n.vy; n.z += n.vz;
      if (Math.abs(n.x) > 500) n.vx *= -1;
      if (Math.abs(n.y) > 100) n.vy *= -1;
      if (Math.abs(n.z) > 150) n.vz *= -1;

      // Occasional pulse
      if (n.nextPulse <= 0) {
        n.pulse    = n.pulseDur;
        n.nextPulse = 160 + Math.floor(Math.random() * 280);
      } else {
        n.nextPulse--;
      }
      if (n.pulse > 0) n.pulse--;

      proj[i] = project(n);
    }

    // Lines
    for (var i = 0; i < N; i++) {
      for (var j = i + 1; j < N; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var dz = nodes[i].z - nodes[j].z;
        var dSq = dx*dx + dy*dy + dz*dz;
        if (dSq >= MAX_DSQ) continue;

        var t    = 1 - dSq / MAX_DSQ;
        var minA = Math.min(proj[i].a, proj[j].a);
        var a    = (t * t * 0.26 * minA).toFixed(3);

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(217,119,87,' + a + ')';
        ctx.lineWidth   = t * 1.3;
        ctx.moveTo(proj[i].x, proj[i].y);
        ctx.lineTo(proj[j].x, proj[j].y);
        ctx.stroke();
      }
    }

    // Nodes (drawn after lines — painter's order)
    for (var i = 0; i < N; i++) {
      var p = proj[i];
      var n = nodes[i];
      var r = p.s * 4.5;
      if (r < 0.2) continue;

      var pulseT = n.pulse > 0 ? Math.sin((1 - n.pulse / n.pulseDur) * Math.PI) : 0;
      var alpha  = Math.min(1, p.a * 0.9 + pulseT * 0.35);

      // Soft glow halo
      var gr  = r * (3.8 + pulseT * 2.2);
      var grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
      grd.addColorStop(0, 'rgba(217,119,87,' + (alpha * 0.28 + pulseT * 0.18).toFixed(3) + ')');
      grd.addColorStop(1, 'rgba(217,119,87,0)');
      ctx.beginPath();
      ctx.arc(p.x, p.y, gr, 0, 6.2832);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(r, 0.5), 0, 6.2832);
      ctx.fillStyle = 'rgba(217,119,87,' + alpha.toFixed(3) + ')';
      ctx.fill();
    }
  }

  frame();
}());
