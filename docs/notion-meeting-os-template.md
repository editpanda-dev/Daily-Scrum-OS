# AIM Research Team OS - Notion Meeting OS Template

이 문서는 AIM 팀이 Notion을 회의록 중심 공간으로 사용할 때의 추천 구조입니다. 목표는 회의록을 예쁘게 남기는 것이 아니라, 회의에서 나온 목표, 담당 업무, 결정사항, 자료 링크가 Research Team OS의 대시보드와 캘린더로 옮기기 쉬운 형태로 남도록 만드는 것입니다.

## 운영 구조

Notion은 회의 원본과 주차별 리서치 아카이브를 맡고, Research Team OS는 업무 진행 현황, 캘린더, 데일리 스크럼, 업무 스택 가시화를 맡습니다.

```text
Google Meet / STT 초안
-> Notion 회의록에서 팀원이 검수
-> TODO / BLOCKED / DECISION / ARCHIVE 포맷 정리
-> Research Team OS에 붙여넣기
-> 대시보드와 캘린더에서 업무 추적
```

## Notion DB 1: 회의록

권장 데이터베이스 이름: `AIM 회의록`

| 속성 | 타입 | 예시 |
| --- | --- | --- |
| 회의명 | Title | 2주차 A/B 테스트 설계 회의 |
| 회의일 | Date | 2026-07-05 |
| 주차 | Select | 2주차 |
| 회의 유형 | Select | 정기회의, 데일리 스크럼, 실험설계, 고객검증, 논문작성 |
| 참석자 | Person 또는 Multi-select | 지우진, 최서린, 최은서 |
| 작성자 | Select | 지우진 |
| 상태 | Select | 초안, 검수중, 확정, OS 반영완료 |
| 관련 자료 | URL 또는 Files | Google Drive 링크 |
| OS 반영 여부 | Checkbox | checked |

## 회의록 페이지 템플릿

아래 내용을 Notion의 회의록 DB 템플릿으로 만들어두면 됩니다.

```text
# 회의 목적

이번 회의에서 확정해야 할 것:

---

# 1. 이번 주 개인 목표

GOAL: @지우진 
GOAL: @최서린 
GOAL: @최은서 

---

# 2. 개인 조사 페이지

ARCHIVE: 지우진 개인 페이지 - URL
ARCHIVE: 최서린 개인 페이지 - URL
ARCHIVE: 최은서 개인 페이지 - URL

---

# 3. 안건별 논의

AGENDA: 안건명
지우진: 
최서린: 
최은서: 
DECISION: 

AGENDA: 안건명
지우진: 
최서린: 
최은서: 
DECISION: 

---

# 4. 결정 사항

DECISION: 
DECISION: 
DECISION: 

---

# 5. 다음 R&R

TODO: @지우진 YYYY-MM-DD~YYYY-MM-DD 업무내용
TODO: @최서린 YYYY-MM-DD~YYYY-MM-DD 업무내용
TODO: @최은서 YYYY-MM-DD~YYYY-MM-DD 업무내용

---

# 6. 막힌 점

BLOCKED: @담당자 YYYY-MM-DD~YYYY-MM-DD 막힌내용

---

# 7. 다음 회의 전 확인할 것

CHECK: 확인할 질문 또는 자료
CHECK: 확인할 질문 또는 자료

---

# 8. 자료 아카이브

ARCHIVE: 자료명 - URL
ARCHIVE: 자료명 - URL
```

## Notion DB 2: 주차별 개인 리서치

권장 데이터베이스 이름: `AIM 개인 리서치`

| 속성 | 타입 | 예시 |
| --- | --- | --- |
| 제목 | Title | 2주차_지우진_A/B 테스트 지표 정리 |
| 담당자 | Select 또는 Person | 지우진 |
| 주차 | Select | 2주차 |
| 카테고리 | Select | 고객검증, 실험설계, 선행연구, 데이터, 프로토타입 |
| 상태 | Select | 작성중, 공유완료, 회의반영, 보류 |
| 관련 회의록 | Relation | 2주차 A/B 테스트 설계 회의 |
| 자료 링크 | URL | Google Drive URL |

## 개인 리서치 페이지 템플릿

```text
# 이번 주 개인 목표

GOAL: @이름 목표내용

---

# 조사 요약

핵심 요약:

---

# 근거 자료

ARCHIVE: 자료명 - URL
ARCHIVE: 자료명 - URL

---

# 회의에서 논의하고 싶은 질문

QUESTION: 
QUESTION: 

---

# 다음 업무 후보

TODO_CANDIDATE: @담당자 YYYY-MM-DD~YYYY-MM-DD 업무내용
```

## 작성 규칙

- 회의 중 자유롭게 말한 내용은 `이름: 의견` 형태로 남깁니다.
- 확정된 결정은 반드시 `DECISION:`으로 시작합니다.
- 실제 업무는 반드시 `TODO: @담당자 시작일~종료일 업무내용` 형식으로 씁니다.
- 막힌 업무는 반드시 `BLOCKED: @담당자 시작일~종료일 막힌내용` 형식으로 씁니다.
- 자료 링크는 `ARCHIVE: 자료명 - URL` 형식으로 남깁니다.
- 날짜는 `YYYY-MM-DD`만 사용합니다.
- 시작일과 종료일이 같아도 `YYYY-MM-DD~YYYY-MM-DD`로 씁니다.

## 팀 운영 방식

1. 회의 전, 각자 `AIM 개인 리서치`에 이번 주 개인 페이지를 작성합니다.
2. 회의 전, 팀원들은 서로의 개인 페이지를 읽고 질문을 남깁니다.
3. 회의 중, Notion 회의록에 안건별 발언과 결정사항을 기록합니다.
4. 회의 후, `TODO`, `BLOCKED`, `DECISION`, `ARCHIVE` 형식만 한 번 검수합니다.
5. 검수된 액션아이템을 Research Team OS에 반영합니다.
6. Research Team OS에서 데일리 스크럼과 캘린더로 진행 상황을 확인합니다.

## OS와 연결할 때의 기준

Notion에서 모든 것을 처리하려고 하면 대시보드가 무거워질 수 있습니다. 따라서 Notion은 근거와 맥락을 보관하고, OS는 실행 상태를 보여주는 방식이 가장 가볍습니다.

- Notion: 회의 원문, 개인 조사, 자료 링크, 논의 맥락
- Research Team OS: 업무 카드, 담당자, 시작일, 종료일, 상태, 데일리 스크럼
- Google Drive: 원본 파일, 보고서, 이미지, PDF, 실험 자료

## 예시

```text
AGENDA: 구매버튼 클릭 측정 방식
지우진: 구매버튼 클릭은 CTR과 다르게 상세 페이지 진입 이후의 행동이라 별도 지표로 분리해야 한다.
최서린: 소비자 신뢰 관점에서는 단순 클릭보다 구매 의도에 더 가까운 행동으로 볼 수 있다.
최은서: 자극물별 버튼 위치와 문구가 달라지면 안 되므로 실험 페이지 조건을 통제해야 한다.
DECISION: 구매버튼 클릭은 CTR, CVR과 분리된 핵심 행동지표로 측정한다.

TODO: @지우진 2026-07-05~2026-07-10 구매버튼 클릭 이벤트 정의서 작성
TODO: @최서린 2026-07-05~2026-07-08 소비자 신뢰 선행연구 3편 요약
TODO: @최은서 2026-07-06~2026-07-09 Human/AI 광고 자극물 후보 정리

ARCHIVE: A/B 테스트 지표 정리 - Google Drive URL
```
