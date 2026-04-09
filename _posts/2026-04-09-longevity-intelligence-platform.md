---
layout: post
title: "Longevity Intelligence Platform — 혈액 바이오마커로 생물학적 나이를 예측하는 AI 건강 플랫폼"
author: teriyakki-jin
tags: project ML AI Python FastAPI Next.js
published: true
---

> 혈액 검사 수치만으로 생물학적 나이·사망 위험·원인별 사망 확률을 추론하고, Causal DAG + Monte Carlo Digital Twin으로 라이프스타일 개선 효과를 10년 단위로 시뮬레이션하는 풀스택 AI 건강 플랫폼

**GitHub**: [github.com/teriyakki-jin/longevity-intelligence-platform](https://github.com/teriyakki-jin/longevity-intelligence-platform)

<br/>

## 개요

CDC NHANES 2009–2020 공개 데이터셋(약 4만 명)을 기반으로 4개의 ML 모델을 학습하고, FastAPI 백엔드와 Next.js 14 대시보드로 연결한 풀스택 프로젝트입니다.

단순 예측을 넘어서 **"운동을 주 250분으로 늘리면 생물학적 나이가 얼마나 낮아지는가"** 같은 인과적 질문에 정량적으로 답하는 것을 목표로 했습니다.

<br/>

## 핵심 기능

**🧬 Biological Age Clock**  
혈중 포도당, HbA1c, 콜레스테롤, 크레아티닌 등 15개 바이오마커로 생물학적 나이를 예측합니다. LightGBM에 Optuna Bayesian HPO(80 trials)를 적용해 MAE < 5년, Pearson r > 0.95를 달성했습니다. SHAP TreeExplainer로 어떤 바이오마커가 노화를 가속하는지 Waterfall Chart로 시각화합니다.

**☠️ Mortality Risk Modeling**  
Cox Proportional Hazards 모델로 5년·10년 생존 확률과 Kaplan-Meier 곡선을 산출합니다(C-index 0.8373). XGBoost 멀티클래스로 심혈관·암·호흡기·당뇨·사고사 5종 원인별 사망 확률도 함께 제공합니다.

**🔮 Digital Health Twin**  
운동, 수면, 음주 등 라이프스타일 슬라이더를 조작하면 Causal DAG를 통해 관련 바이오마커에 인과 효과가 전파됩니다. Monte Carlo 500회 반복으로 생물학적 나이 변화의 95% 신뢰구간을 계산하고, 10년 궤적을 D3.js로 실시간 렌더링합니다.

**🤖 AI Health Coach**  
Claude API + SSE Streaming으로 예측 결과를 맥락으로 활용하는 개인화 헬스 코칭 채팅을 구현했습니다.

<br/>

## 모델 성능

| 모델 | 알고리즘 | 성능 |
|------|----------|------|
| Biological Age Clock | LightGBM + Optuna | MAE < 5년, r > 0.95 |
| All-cause Mortality | Cox PH (lifelines) | C-index **0.8373** |
| Cause-Specific (5종) | XGBoost | AUC > 0.80 |
| Digital Twin | Monte Carlo × 500 | 95% CI 포함 |

<br/>

## 기술 스택

```
ML      : LightGBM · XGBoost · lifelines · SHAP · Optuna · scikit-learn
Backend : FastAPI · uvicorn · pydantic v2 · Python 3.10
Frontend: Next.js 14 App Router · TypeScript · Tailwind CSS · D3.js
Training: Google Colab · Google Drive
AI      : Claude API (Anthropic) · SSE Streaming
```

<br/>

## 시스템 아키텍처

```
[Google Colab]
  NHANES .xpt + Mortality .dat 파싱
  → Feature Engineering (eGFR, FIB-4, Metabolic Syndrome Score)
  → LightGBM HPO  → blood_clock.joblib
  → Cox PH        → cox.joblib
  → XGBoost 5cls  → cause_specific.joblib
          │
          ▼
[FastAPI :8888]
  POST /api/v1/bioage/predict
  POST /api/v1/mortality/predict
  POST /api/v1/twin/simulate
          │
          ▼
[Next.js 14 :3000]
  /          Bio Age + SHAP Waterfall (D3.js)
  /twin      라이프스타일 슬라이더 + Trajectory
  /mortality 원인별 위험 + Survival Curve
  /coach     SSE 스트리밍 AI 코치
```

<br/>

## 기술적 도전

### 1. CDC 공식 문서의 바이트 위치 오류 — 역공학으로 해결

NHANES 사망률 연계 파일(Fixed-Width .dat)의 follow-up 기간 컬럼 바이트 위치가 공식 문서에 **21–30**으로 명시되어 있었지만, 실제 파싱하면 전체 NaN이 반환됐습니다. 파일을 바이트 단위로 슬라이싱하며 반복 검증한 결과, **실제 위치는 42–47**임을 경험적으로 확인했습니다.

공식 문서를 맹신하지 않고 raw 데이터를 직접 검증하는 것이 얼마나 중요한지 체감한 경험이었습니다.

### 2. pandas nullable Int64 vs float64 — merge 0건 버그

`read_sas()` → SEQN이 `float64`, `read_fwf()` → SEQN이 `Int64(nullable)`. 두 타입 간 merge 시 키 매칭이 실패해 결과가 0행으로 반환됐습니다. pandas nullable 정수 타입과 float 타입의 내부 비교 동작 차이를 파악하고, 양쪽을 `int`로 명시적 캐스팅하여 해결했습니다.

### 3. Digital Twin — 개입 효과 정규화로 비현실적 값 방지

라이프스타일 슬라이더의 raw delta(예: 운동 +190분)를 바이오마커에 직접 전파하면 BMI가 8.3으로 떨어지는 등 물리적으로 불가능한 값이 발생했습니다. 각 개입 변수의 **학습 데이터 표준편차로 delta를 정규화**하여 causal effect가 통계적으로 합리적인 범위 안에서만 적용되도록 제약했습니다.

<br/>

## 데이터

**NHANES (National Health and Nutrition Examination Survey)**

- CDC 공개 데이터 · Public Domain
- 2009–2020, 6개 2년 주기 서베이 사이클
- 약 40,000명 + CDC Mortality Linkage File 조인
- 주요 피처: 혈중 포도당, HbA1c, 콜레스테롤, HDL/LDL, 중성지방, 크레아티닌, 알부민, CRP, ALT/AST, 혈색소, BMI, 흡연·음주 이력

<br/>

---

**[→ GitHub 바로가기](https://github.com/teriyakki-jin/longevity-intelligence-platform)**
