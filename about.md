---
layout: page
title: About
permalink: /about/
---

<div class="about-intro">
  <h2>안녕하세요, 진예규입니다</h2>
  <p>
    부산대학교 전기컴퓨터공학부 정보컴퓨터공학을 졸업한 개발자입니다.<br>
    AI와 풀스택 개발에 관심이 많으며, 데이터 기반의 서비스를 만드는 것을 좋아합니다.
  </p>
</div>

---

## 🎓 Education

<div class="edu-item">
  <strong>부산대학교 (Pusan National University)</strong><br>
  전기컴퓨터공학부 정보컴퓨터공학 · 졸업
</div>

---

## 🛠 Skills

<div class="skill-section">
  <h4>Frontend</h4>
  <div class="skill-badges">
    <span class="badge badge-blue">React</span>
    <span class="badge badge-blue">TypeScript</span>
    <span class="badge badge-blue">Vite</span>
    <span class="badge badge-blue">Tailwind CSS</span>
  </div>

  <h4>Backend</h4>
  <div class="skill-badges">
    <span class="badge badge-green">Spring Boot</span>
    <span class="badge badge-green">Java</span>
    <span class="badge badge-green">FastAPI</span>
    <span class="badge badge-green">Python</span>
  </div>

  <h4>AI / ML</h4>
  <div class="skill-badges">
    <span class="badge badge-purple">PyTorch</span>
    <span class="badge badge-purple">Transformers</span>
    <span class="badge badge-purple">XGBoost</span>
    <span class="badge badge-purple">scikit-learn</span>
  </div>

  <h4>DevOps / Tools</h4>
  <div class="skill-badges">
    <span class="badge badge-gray">Docker</span>
    <span class="badge badge-gray">GitHub Actions</span>
    <span class="badge badge-gray">Nginx</span>
    <span class="badge badge-gray">Git</span>
  </div>
</div>

---

## 🚀 Projects

<div class="project-card">
  <div class="project-header">
    <h3 class="project-title">NodeConnection — 블록체인 증명서 발급 시스템</h3>
    <a href="https://github.com/node-connection/node-connection-backend" target="_blank" class="project-link">GitHub →</a>
  </div>
  <p class="project-desc">Hyperledger Fabric 블록체인을 활용한 부동산 등기사항증명서 발급·위변조 방지 시스템. 전세사기 예방을 목적으로 등기 데이터를 온체인에 기록해 투명성과 무결성을 확보합니다. (졸업 프로젝트)</p>
  <ul class="project-features">
    <li>등기 데이터 SHA-256 해시화 후 온체인 저장, QR코드로 블록체인 원본 대조 위변조 검증</li>
    <li>발급자 정보를 PDC(Private Data Collection)에 격리 저장해 등기소 직원만 열람 가능</li>
    <li>NextAuth.js의 JWE 토큰(alg: dir, enc: A256GCM)을 Java에서 복호화하는 커스텀 메서드 개발</li>
  </ul>
  <div class="project-stack">
    <span class="badge badge-green">Spring Boot</span>
    <span class="badge badge-green">Java</span>
    <span class="badge badge-gray">Hyperledger Fabric</span>
    <span class="badge badge-gray">Docker</span>
  </div>
</div>

<div class="project-card">
  <div class="project-header">
    <h3 class="project-title">ConsentLedger</h3>
    <a href="https://github.com/teriyakki-jin/consentledger" target="_blank" class="project-link">GitHub →</a>
  </div>
  <p class="project-desc">개인정보보호법상 마이데이터 전송요구권의 동의 관리·감사·전송 요청을 처리하는 React + Spring Boot 풀스택 웹 서비스. SHA-256 해시 체인 감사 로그와 Claude AI 기반 이상 탐지를 핵심 기능으로 합니다.</p>
  <ul class="project-features">
    <li>SHA-256 해시 체인 + DB 트리거로 감사 로그 위변조 원천 차단, 비관적 락으로 동시성 직렬화</li>
    <li>JWT(사용자) · API Key(에이전트) 이중 인증, RBAC 3단계 권한 관리</li>
    <li>Spring AI MCP 서버 통합으로 Claude Desktop 연동, Claude Sonnet 기반 보안 이상 탐지 (Prompt Injection 방어 포함)</li>
  </ul>
  <div class="project-stack">
    <span class="badge badge-green">Spring Boot</span>
    <span class="badge badge-green">Java</span>
    <span class="badge badge-blue">React</span>
    <span class="badge badge-blue">TypeScript</span>
    <span class="badge badge-gray">PostgreSQL</span>
    <span class="badge badge-purple">Spring AI</span>
    <span class="badge badge-gray">Docker</span>
  </div>
</div>

<div class="project-card">
  <div class="project-header">
    <h3 class="project-title">NEXUS — 모의주식거래 플랫폼</h3>
    <a href="https://github.com/teriyakki-jin/stock-frontend" target="_blank" class="project-link">GitHub →</a>
  </div>
  <p class="project-desc">Bloomberg Terminal 스타일의 모의주식거래 풀스택 플랫폼. KIS OpenAPI · Yahoo Finance 실시간 시세를 기반으로 주문 체결, 포트폴리오 분석, AI 리포트 챗봇을 제공합니다.</p>
  <ul class="project-features">
    <li>WebSocket STOMP 기반 실시간 시세 브로드캐스트, GBM 시뮬레이션으로 장외 시간 시세 유지</li>
    <li>RSI · MACD · 볼린저밴드 기술적 분석, MDD · 섹터 비중 포트폴리오 분석</li>
    <li>증권사 리서치 기반 RAG 챗봇 (NEUTRAL/AGGRESSIVE/CONSERVATIVE 페르소나), 수익률 리더보드</li>
  </ul>
  <div class="project-stack">
    <span class="badge badge-blue">React</span>
    <span class="badge badge-blue">TypeScript</span>
    <span class="badge badge-green">Spring Boot</span>
    <span class="badge badge-green">Java</span>
    <span class="badge badge-gray">Redis</span>
    <span class="badge badge-gray">PostgreSQL</span>
    <span class="badge badge-gray">Docker</span>
  </div>
</div>

<div class="project-card">
  <div class="project-header">
    <h3 class="project-title">자동차 공정 리스크 예측 플랫폼</h3>
    <a href="https://github.com/Aivle8th19team/Aivle_8th_19team" target="_blank" class="project-link">GitHub →</a>
  </div>
  <p class="project-desc">현장 이미지와 센서 데이터를 기반으로 차체·도장·엔진·프레스·용접 공정의 이상 징후와 납기 리스크를 예측·시각화하는 풀스택 웹서비스. KT AIVLE School 8기 팀 프로젝트.</p>
  <ul class="project-features">
    <li>비전 기반(도장·차체·용접) 및 센서 기반(엔진·프레스·앞유리) 다중 검사 모델 통합 대시보드</li>
    <li>이상/경고 건수, 지연 시간 추정, KPI 히스토리 차트 실시간 제공</li>
    <li>JWT 인증, 게시판 CRUD, 챗봇 상담 기능 포함</li>
  </ul>
  <div class="project-stack">
    <span class="badge badge-blue">React</span>
    <span class="badge badge-blue">TypeScript</span>
    <span class="badge badge-green">Spring Boot</span>
    <span class="badge badge-green">FastAPI</span>
    <span class="badge badge-purple">PyTorch</span>
    <span class="badge badge-purple">YOLO</span>
  </div>
</div>

<div class="project-card">
  <div class="project-header">
    <h3 class="project-title">LyricInsight</h3>
    <a href="https://github.com/teriyakki-jin/LyricInsight" target="_blank" class="project-link">GitHub →</a>
  </div>
  <p class="project-desc">노래 가사를 분석해 감정과 핵심 구절을 자동으로 추출하는 AI 웹 애플리케이션</p>
  <ul class="project-features">
    <li>44가지 감정 레이블 기반 다중 레이블 분류 (KPoEM 모델 파인튜닝)</li>
    <li>단어별 감정 기여도 분석 및 가사 통계 시각화</li>
    <li>아티스트·곡명 검색, 분석 히스토리 기능</li>
  </ul>
  <div class="project-stack">
    <span class="badge badge-blue">React</span>
    <span class="badge badge-green">Spring Boot</span>
    <span class="badge badge-green">FastAPI</span>
    <span class="badge badge-purple">PyTorch</span>
    <span class="badge badge-blue">TypeScript</span>
  </div>
</div>

<div class="project-card">
  <div class="project-header">
    <h3 class="project-title">Churn Guard AI</h3>
    <a href="https://github.com/teriyakki-jin/Churn-Guard-AI" target="_blank" class="project-link">GitHub →</a>
  </div>
  <p class="project-desc">통신사 고객 이탈 위험을 예측하고 맞춤형 유지 전략을 제안하는 ML 웹 애플리케이션</p>
  <ul class="project-features">
    <li>XGBoost · RandomForest · GradientBoosting 앙상블로 이탈 확률 실시간 예측</li>
    <li>개인화된 유지 전략 자동 생성 및 A/B 모델 비교</li>
    <li>실시간 KPI 대시보드, CSV/PDF 리포트 내보내기</li>
  </ul>
  <div class="project-stack">
    <span class="badge badge-blue">React</span>
    <span class="badge badge-green">FastAPI</span>
    <span class="badge badge-purple">XGBoost</span>
    <span class="badge badge-gray">Docker</span>
  </div>
</div>

<div class="project-card">
  <div class="project-header">
    <h3 class="project-title">Veritas AI</h3>
    <a href="https://github.com/teriyakki-jin/Veritas-AI" target="_blank" class="project-link">GitHub →</a>
  </div>
  <p class="project-desc">LIAR · FEVER · FakeNewsNet 데이터셋을 통합한 AI 팩트체킹 시스템. BM25 기반 위키피디아 증거 검색 후 3개 DistilBERT 모델을 병렬 추론하고 가중 앙상블로 진위를 판별합니다.</p>
  <ul class="project-features">
    <li>Wikipedia 5,993개 문서 대상 BM25 증거 검색 및 Leave-One-Out 증거 영향도 분석</li>
    <li>LIAR(6-class) · FEVER(3-class) · FakeNewsNet(2-class) 모델 병렬 추론 후 가중 앙상블</li>
    <li>SSE 기반 실시간 스트리밍, 배치 처리(최대 50건), URL/본문 기사 분석 지원</li>
  </ul>
  <div class="project-stack">
    <span class="badge badge-green">FastAPI</span>
    <span class="badge badge-purple">Python</span>
    <span class="badge badge-purple">DistilBERT</span>
    <span class="badge badge-purple">Transformers</span>
    <span class="badge badge-gray">Docker</span>
  </div>
</div>

---

## 📬 Contact

<div class="contact-links">
  <a href="https://github.com/teriyakki-jin" target="_blank">GitHub: @teriyakki-jin</a>
</div>
