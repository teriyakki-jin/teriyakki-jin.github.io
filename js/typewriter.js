(function () {
  'use strict';
  var roles = [
    'Java Backend Developer',
    'Spring Boot Architect',
    'AI Engineer',
    'Full-Stack Developer',
  ];
  var el = document.getElementById('typewriter-text');
  if (!el) return;

  var roleIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    var current = roles[roleIdx];
    if (deleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
    }

    var wait = deleting ? 50 : 90;
    if (!deleting && charIdx === current.length) {
      wait = 2400;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      wait = 380;
    }
    setTimeout(tick, wait);
  }

  tick();
}());
