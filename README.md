# 진예규 | Backend · AI · Security Portfolio

**백엔드부터 AI까지, 시스템 전체의 흐름을 설계하고 배포합니다.**

부산대학교 CS 졸업, KT AIVLE School 프로젝트 경험을 바탕으로 백엔드, AI Agent, RAG, 보안 및 클라우드 프로젝트를 소개하는 개인 포트폴리오입니다. 프로젝트별 문제 정의, 핵심 구현, 기술 스택과 GitHub 링크를 정리했습니다.

[포트폴리오 사이트](https://teriyakki-jin.github.io) · [GitHub 프로필](https://github.com/teriyakki-jin)

## 주요 프로젝트

사이트의 Projects 섹션에 표시되는 순서입니다.

| 프로젝트 | 핵심 구현 |
| --- | --- |
| [Agent Runtime Security Lab](https://github.com/teriyakki-jin/agent-runtime-security-lab) | AI Agent의 intent와 런타임 관측 비교, MCP 실행 경계 제어, OPA 정책, Tetragon eBPF, OCSF 감사 증거 |
| [localops-agent](https://github.com/teriyakki-jin/localops-agent) | MCP 기반 로컬-퍼스트 Agent Orchestrator, Planner, Policy Engine, Trace Logger, 승인 기반 실행 |
| [ConsentLedger](https://github.com/teriyakki-jin/consentledger) | 마이데이터 동의·전송 관리, Spring AI MCP, SHA-256 해시 체인 감사 로그 및 무결성 검증 |
| [Water Treatment Graph RAG](https://github.com/teriyakki-jin/Graph-RAG-with-water) | 수처리 도메인 지식 그래프, Neo4j와 KR-SBERT 기반 하이브리드 검색, RAG 평가 |
| [Longevity Intelligence Platform](https://github.com/teriyakki-jin/longevity-intelligence-platform) | 혈액 바이오마커 기반 생물학적 나이 예측, Causal DAG 및 Digital Twin 시뮬레이션 |
| [NodeConnection](https://github.com/node-connection/node-connection-backend) | Hyperledger Fabric 기반 부동산 등기사항증명서 발급 및 위변조 방지 |
| [SecureScope](https://github.com/teriyakki-jin/SecureScope) | 보안 이벤트 수집, 자동 탐지, 실시간 시각화를 연결하는 경량 SIEM |
| [NEXUS](https://github.com/teriyakki-jin/stock-frontend) | 실시간 시세 기반 모의주식거래, 포트폴리오 분석, AI 리포트 챗봇 |

## KT AIVLE School 및 기타 프로젝트

- [자동차 공정 리스크 예측 플랫폼](https://github.com/Aivle8th19team/Aivle_8th_19team): 납품 지연 가능성 및 예상 지연 시간 예측을 지원하는 스마트팩토리 시스템
- Human Activity Recognition: 스마트폰 센서 기반 2단계 행동 분류 모델
- AI Interviewer Agent: 이력서 기반 질문, 답변 평가, 자기 재검토를 연결한 면접관 Agent
- AI Instructor Agent: PPT 분석부터 스크립트, 음성, 자막, 강의 영상 생성까지 자동화
- AI 도서관리시스템 운영 자동화: CI/CD, Auto Scaling, Load Balancer, CloudWatch 구성
- [LyricInsight](https://github.com/teriyakki-jin/LyricInsight): 노래 가사 감정 분석 및 핵심 구절 추출
- [Churn Guard AI](https://github.com/teriyakki-jin/Churn-Guard-AI): 고객 이탈 위험 예측 및 유지 전략 제안
- [Veritas AI](https://github.com/teriyakki-jin/Veritas-AI): 증거 검색 및 모델 앙상블 기반 팩트체킹

## 사이트 구성

Jekyll 기반 정적 사이트로, GitHub Pages에서 배포합니다.

| 경로 | 역할 |
| --- | --- |
| `index.html` | 메인 포트폴리오, 소개, 기술 스택, 프로젝트, 연락처 |
| `about.md` | 상세 소개 |
| `_posts/` | 프로젝트 상세 글 및 기술 기록 |
| `_layouts/`, `_includes/` | 페이지 레이아웃 및 공통 요소 |
| `style.scss`, `_scss/`, `js/` | 스타일 및 인터랙션 |
| `_config.yml` | 사이트 메타데이터 및 Jekyll 설정 |

프로젝트 추가나 소개 변경은 `index.html`, 상세 글은 `_posts/`에서 관리합니다.
