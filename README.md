# 진예규 | Backend · AI · Security Portfolio

**백엔드부터 AI까지, 시스템 전체의 흐름을 설계하고 배포합니다.**

부산대학교 컴퓨터공학을 전공하고, KT AIVLE School에서 AI와 웹 서비스 프로젝트를 진행했습니다. 네트워크 엔지니어 직무에 맞춰 망 설계, 장애 대응, 패킷 분석, 운영 자동화 프로젝트를 먼저 소개합니다.

대표 프로젝트는 TelcoNet Sentinel, NetSentry, Network Forensics Lab입니다. 분야별 필터로 전체 23개 프로젝트를 확인하고, 상세 구현과 검증 결과를 펼쳐볼 수 있습니다. 네트워크 실험은 로컬 랩과 가상 장비를 사용했습니다.

[포트폴리오 사이트](https://teriyakki-jin.github.io) · [GitHub 프로필](https://github.com/teriyakki-jin)

## 주요 프로젝트

사이트에 소개한 프로젝트 목록입니다.

| 프로젝트 | 핵심 구현 |
| --- | --- |
| [TelcoNet Sentinel](https://github.com/teriyakki-jin/telconet-sentinel) | OSPF/BFD 장애 탐지 비교, 경로 전환 계측, 링크·노드·SRLG 영향 분석 |
| [NetSentry](https://github.com/teriyakki-jin/netsentry) | 가상 장비·서비스 상태 수집, 알림 상관분석, 장애 전환 운영 콘솔 |
| [Zero Trust Network Lab](https://github.com/teriyakki-jin/zero-trust-network-lab) | Keycloak 인증, OPA 정책 판단, FastAPI 요청별 접근 제어 |
| [Network Forensics Lab](https://github.com/teriyakki-jin/network-forensics-lab) | 차량 Ethernet 공격 트래픽, Snort/Suricata 교차 분석, 사건 타임라인과 증거 목록 |
| [LLM Security Gateway](https://github.com/teriyakki-jin/llm-security-gateway) | 프롬프트 인젝션 검사, 개인정보 마스킹, 하이브리드 암호화 프록시 |
| [Firm-Sentry](https://github.com/teriyakki-jin/firm-sentry) | ELF 보호 설정·위험 API 정적 분석, SARIF 보고서, AFL++ 퍼징 실습 |
| [QuantRisk Lab](https://github.com/teriyakki-jin/quant-risk-lab) | 포트폴리오 위험 기여도, 독립 계산 교차검증, 재현성 ID와 백테스트 |
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
