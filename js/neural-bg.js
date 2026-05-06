// Animated purple dot grid for homepage hero section
(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0, t = 0;

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize);
  resize();

  function draw() {
    t += 0.007;
    ctx.clearRect(0, 0, W, H);

    var gap  = 38;
    var cols = Math.ceil(W / gap) + 1;
    var rows = Math.ceil(H / gap) + 1;

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        var x    = i * gap;
        var y    = j * gap;
        var wave = Math.sin(i * 0.38 + t) * Math.cos(j * 0.38 + t);
        var al   = (wave + 1) / 2 * 0.22 + 0.025;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 6.2832);
        ctx.fillStyle = 'rgba(167,139,250,' + al.toFixed(3) + ')';
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}());
