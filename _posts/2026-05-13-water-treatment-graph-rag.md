---
layout: post
title: "Water Treatment Graph RAG — 수처리 도메인 특화 하이브리드 지식 그래프 검색 시스템"
author: teriyakki-jin
tags: project RAG NLP Python FastAPI Next.js Neo4j
published: true
---

> 한국 수도법·먹는물 수질기준·정수처리 공정 문서를 Neo4j 지식 그래프와 벡터 검색으로 이중 색인하고, 병렬 하이브리드 검색으로 단순 키워드 RAG가 처리하기 어려운 멀티홉 추론 질의에 답하는 도메인 특화 Graph RAG 시스템

**GitHub**: [github.com/teriyakki-jin/Graph-RAG-with-water](https://github.com/teriyakki-jin/Graph-RAG-with-water)

<br/>

## 개요

한국 수처리 법령·공정·사고 문서 8종을 GPT-4o로 자동 파싱해 **20종 노드 / 24종 관계**의 지식 그래프를 구축하고, Neo4j Graph DB와 KR-SBERT 벡터 인덱스를 병렬로 조회하는 하이브리드 검색 파이프라인을 구현했습니다.

"잔류염소 기준을 초과한 수질사고 사례와 그에 적용된 처벌 조항은 무엇인가" 같이 여러 엔티티를 연결해야 하는 멀티홉 질의를 처리하는 것이 목표입니다. RAGAS에서 영감을 받은 자체 5-지표 평가 프레임워크로 40문항을 평가해 **Overall 0.830** 을 기록했습니다.

<br/>

## 핵심 기능

**🔀 하이브리드 병렬 검색**  
그래프 검색(LLM → Cypher → Neo4j)과 벡터 검색(KR-SBERT → Neo4j Vector Index)을 `asyncio`로 동시에 실행하고 두 컨텍스트를 통합해 최종 답변을 생성합니다. 순수 벡터 RAG 대비 수치 정확도와 법령 근거 추적에서 강점을 보입니다.

**🧠 복합 질의 자동 분해**  
비교·인과·절차 키워드 또는 80자 초과 질의를 복합 질의로 판단해 서브쿼리로 분해한 뒤 병렬 검색 후 통합합니다. 멀티홉 질의는 벡터 k를 기본 4에서 8로 자동 확장합니다.

**📡 SSE 스트리밍 API**  
FastAPI SSE 엔드포인트로 답변을 토큰 단위로 스트리밍하여 긴 응답 대기 없이 실시간으로 출력합니다. 인메모리 LRU 캐시(TTL 1시간)로 반복 질의 응답 시간을 단축합니다.

**🕸️ 지식 그래프 시각화**  
Next.js + D3.js force-directed graph로 Neo4j 전체 노드·엣지를 시각화하고, 노드 클릭 시 이웃 탐색과 상세 정보를 실시간으로 렌더링합니다.

**📊 도메인 특화 평가 프레임워크**  
RAGAS에서 영감을 받은 5-지표(Keyword Recall·Faithfulness·Numeric Accuracy·Context Precision·Answer Relevancy)와 40문항 평가셋으로 카테고리별·난이도별 성능을 정량 측정합니다.

<br/>

## 시스템 아키텍처

```
[사용자 질문]
     │
     ▼
┌─────────────────────────────────────────┐
│            FastAPI (port 9000)          │
│                                         │
│  QueryService                           │
│  ├── 복합 질의 → 서브쿼리 분해 (LLM)    │
│  └── 단순 질의 → 직접 hybrid_query      │
│                                         │
│  HybridRetriever (asyncio 병렬)         │
│  ├── GraphRetriever                     │
│  │   └── LLM → Cypher 생성 → Neo4j    │
│  └── VectorRetriever                   │
│      └── KR-SBERT → Neo4j 벡터검색    │
│                                         │
│  Context 통합 → LLM → 최종 답변        │
└─────────────────────────────────────────┘
     │
     ▼
[Next.js 16 + D3.js 그래프 시각화]
```

### LLM 호출 흐름 (단순 질의 기준)

| 단계 | 모델 | 역할 |
|------|------|------|
| Cypher 생성 | gpt-4o-mini | 질문 → Cypher 쿼리 변환 |
| 그래프 결과 해석 | gpt-4o-mini | 그래프 조회 결과 → 중간 답변 |
| 최종 통합 답변 | gpt-4o-mini | 그래프 + 벡터 컨텍스트 → 최종 답변 |

<br/>

## 기술 스택

```
Backend : FastAPI 0.115 · uvicorn · slowapi (Rate Limiting) · SSE · Python 3.10
Graph DB: Neo4j 5.20 Community (Docker Compose)
LLM     : GPT-4o-mini (질의) · GPT-4o (그래프 추출)
그래프 추출: LangChain LLMGraphTransformer
Embedding: KR-SBERT (snunlp/KR-SBERT-V40K-klueNLI-augSTS, 768차원)
Frontend: Next.js 16 · TypeScript · D3.js (force-directed graph)
평가    : RAGAS 영감 자체 프레임워크 (5지표, 40문항)
```

<br/>

## 도메인 온톨로지

수처리 법령·공정·사고를 표현하는 **20종 노드 / 24종 관계**를 직접 설계했습니다.

| 분류 | 노드 타입 |
|------|----------|
| 법제 | 법령, 조문, 고시 |
| 수질기준 | 건강항목, 심미적항목, 소독부산물, 미생물항목 |
| 수치 | 수질기준값, 검사주기, 검사방법 |
| 시설·공정 | 정수장, 공정, 소독방법, 약품 |
| 기관·지역 | 기관, 지역 |
| 사고·위반 | 수질사고, 위반항목, 처벌규정 |

관계는 `규정한다`, `기준값이다`, `위반한다`, `처벌받는다`, `원인이다` 등 24종으로 법령-사고-처벌을 체인으로 연결합니다.

<br/>

## 벤치마크 결과

40문항, 실패 0건 / 평균 응답 시간 **9.8초** (v6 기준)

| 지표 | 점수 |
|------|------|
| **Overall** | **0.830** |
| Keyword Recall | 0.800 |
| Faithfulness | 0.770 |
| Numeric Accuracy | **0.918** |
| Context Precision | **0.936** |
| Answer Relevancy | 0.803 |

### 카테고리별

| 카테고리 | Overall |
|----------|---------|
| 기준값 단순 조회 | **0.875** |
| 공정 분석 | 0.849 |
| 법령 | 0.842 |
| 소독 비교 | 0.826 |
| 사고 사례 | 0.803 |
| 멀티홉 | 0.738 |

수치 기준값 조회와 법령 처벌 규정 조회에서 강점을 보이며, 멀티홉 Faithfulness(0.51)는 컨텍스트 근거 부족으로 개선 여지가 있습니다.

<br/>

## 기술적 도전

### 1. OpenAI TPM 한도 — 자동 재시도 로직으로 대응

GPT-4o TPM 30,000 한도로 인해 그래프 추출 파이프라인에서 429 Rate Limit이 빈번하게 발생했습니다. `batch_size=2` + 지수 백오프(65초 × 최대 4회 재시도)를 구현해 대용량 문서도 무인 인제스트를 완료할 수 있도록 했습니다.

### 2. Windows 예약 포트 충돌

Windows가 7998–8201 범위 포트를 동적으로 예약하여 FastAPI의 기본 포트 8000, 8080이 모두 사용 불가였습니다. `netsh interface ipv4 show excludedportrange` 로 예약 범위를 확인하고 포트를 9000으로 변경해 해결했습니다.

### 3. 멀티홉 Faithfulness 저하 분석

멀티홉 카테고리의 Faithfulness가 0.51로 낮게 나타났습니다. 그래프 검색이 반환하는 Cypher 결과가 엔티티 간 관계만 담고 설명 텍스트가 부족할 때, LLM이 컨텍스트 대신 사전 학습 지식으로 답변을 채우는 현상임을 평가 결과 분석으로 파악했습니다. 서브쿼리 분해 품질 개선과 프롬프트 강화를 다음 개선 방향으로 식별했습니다.

<br/>

## 데이터

한국 수처리 도메인 문서 8종 직접 수집·정제

| 문서 | 내용 |
|------|------|
| 수도법 발췌 | 수도법 주요 조문 |
| 먹는물 수질기준 전체 | 전 항목 기준값 |
| 정수처리공정 | 공정 전반 설명 |
| 소독공정 상세 | 염소·오존·UV 상세 |
| 수질사고 사례 | 낙동강 페놀·인천 붉은수돗물 등 |
| 수질사고 처벌규정 | 위반 시 벌칙·과태료 |
| THM 소독부산물 | THM·HAA 등 정보 |
| 처벌·과태료 Q&A | 보충 자료 |

인제스트 결과: 8종 문서 → 14개 청크 → 약 200개 노드 / 약 160개 관계

<br/>

---

**[→ GitHub 바로가기](https://github.com/teriyakki-jin/Graph-RAG-with-water)**
