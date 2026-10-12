(function () {
  'use strict';
  var section = document.getElementById('projects');
  if (!section) return;
  var toolbar = section.querySelector('.project-toolbar');
  var about = document.getElementById('about');
  if (about) {
    var divider = section.previousElementSibling;
    var anchor = about.previousElementSibling;
    if (divider && divider.classList.contains('section-divider-v')) anchor.before(divider);
    anchor.before(section);
    section.querySelector('.section-label').textContent = '01 / Projects';
    about.querySelector('.section-label').textContent = '02 / About';
    var skills = document.getElementById('skills');
    if (skills) skills.querySelector('.section-label').textContent = '03 / Skills';
  }
  var cards = Array.from(section.querySelectorAll('.project-card'));
  var featured = {
    'telconet-sentinel': {
      label: '01 / 망 설계 · 장애 탐지',
      image: 'https://raw.githubusercontent.com/teriyakki-jin/telconet-sentinel/main/docs/assets/grafana-bfd-repeated-trials.png',
      alt: 'OSPF와 BFD 반복 실험 결과를 비교하는 Grafana 대시보드'
    },
    'netsentry': {
      label: '02 / 모니터링 · 운영 자동화',
      image: 'https://raw.githubusercontent.com/teriyakki-jin/netsentry/main/docs/images/netsentry-expanded-topology.png',
      alt: '가상 장비와 서비스 상태, 장애 대응 흐름을 보여주는 NetSentry 운영 화면'
    },
    'network-forensics-lab': {
      label: '03 / 패킷 분석 · 트러블슈팅',
      image: 'https://raw.githubusercontent.com/teriyakki-jin/network-forensics-lab/main/assets/kibana-lens-dashboard.png',
      alt: 'Snort와 Suricata의 탐지 결과를 비교하는 Kibana 대시보드'
    }
  };
  var network = ['telconet-sentinel', 'netsentry', 'network-forensics-lab', 'zero-trust-network-lab', 'securescope'];
  var security = ['network-forensics-lab', 'zero-trust-network-lab', 'securescope', 'llm-security-gateway', 'firm-sentry', 'agent-runtime-security-lab', 'consentledger'];

  cards.forEach(function (card) {
    var link = card.querySelector('a[href*="github.com/"]');
    var slug = link ? new URL(link.href).pathname.split('/').filter(Boolean).pop().toLowerCase() : '';
    card.dataset.project = slug;
    card.dataset.network = String(network.includes(slug));
    card.dataset.security = String(security.includes(slug));
    card.dataset.backend = String(!network.includes(slug));
    card.classList.add('project-compact');
    var features = card.querySelector('.project-features');
    if (features) {
      var details = document.createElement('details');
      details.className = 'project-details';
      var summary = document.createElement('summary');
      summary.textContent = '구현 내용과 검증 결과';
      details.appendChild(summary);
      details.appendChild(features);
      Array.from(card.querySelectorAll('.project-desc')).slice(1).forEach(function (note) {
        details.appendChild(note);
      });
      card.insertBefore(details, card.querySelector('.project-stack'));
    }
    if (featured[slug]) {
      var info = featured[slug];
      card.dataset.featured = 'true';
      card.classList.add('project-featured');
      var label = document.createElement('p');
      label.className = 'project-focus';
      label.textContent = info.label;
      card.prepend(label);
      var media = document.createElement('a');
      media.className = 'project-media';
      media.href = info.image;
      media.target = '_blank';
      media.rel = 'noopener';
      media.setAttribute('aria-label', info.alt + ' 원본 보기');
      var img = document.createElement('img');
      img.src = info.image;
      img.alt = info.alt;
      img.loading = 'lazy';
      img.addEventListener('error', function () { media.hidden = true; });
      media.appendChild(img);
      card.querySelector('.project-header').after(media);
    }
    var copy = document.createElement('div');
    copy.className = 'project-copy';
    Array.from(card.children).forEach(function (child) {
      if (!child.classList.contains('project-media')) copy.appendChild(child);
    });
    card.appendChild(copy);
  });

  Object.keys(featured).forEach(function (slug) {
    var card = cards.find(function (item) { return item.dataset.project === slug; });
    if (card) section.appendChild(card);
  });
  cards.filter(function (card) { return !card.dataset.featured; }).forEach(function (card) {
    section.appendChild(card);
  });

  function filter(value) {
    var count = 0;
    cards.forEach(function (card) {
      var visible = value === 'all' || card.dataset[value] === 'true';
      card.hidden = !visible;
      if (visible) count++;
    });
    toolbar.querySelectorAll('button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === value));
    });
    toolbar.querySelector('.project-result-count').textContent = count + '개 프로젝트';
  }
  toolbar.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-filter]');
    if (button) filter(button.dataset.filter);
  });
  toolbar.hidden = false;
  filter('featured');
}());
