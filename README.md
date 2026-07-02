# AIM Research Team OS

논문 작성과 HUFStudy 운영을 위한 내부 팀 OS입니다. 고객용 AdTrace AI 서비스와 분리된 별도 Vercel 앱입니다.

Production URL:

```text
https://research-team-os.vercel.app
```

## 목적

- 데일리 스크럼 기록
- 태스크 상태와 마감일 관리
- 논문 섹션별 작성 상태 추적
- A/B 테스트 설계와 CTR, CVR, 구매버튼 클릭 측정 방식 정리
- 주간보고서, 선행연구, 광고 자극물, 회의록 아카이빙
- 고객검증 인사이트와 다음 액션 누적

## 로컬 실행

개발 서버로 확인하려면:

```bash
npm install
npm run dev
```

접속:

```text
http://127.0.0.1:5173
```

## 저장 방식

기본 화면은 브라우저 `localStorage` fallback으로도 동작합니다. 팀원들이 같은 데이터를 공유하려면 Vercel Serverless API와 Supabase DB를 연결해야 합니다.

## Supabase 설정

Supabase SQL Editor에서 아래 파일 내용을 실행합니다.

```text
supabase/schema.sql
```

Vercel Project Settings > Environment Variables에 아래 값을 추가합니다.

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
TEAM_OS_PASSCODE=팀원들이 공유할 패스코드
```

환경변수 추가 후 Vercel에서 재배포하면 상단의 `팀 DB 동기화` 버튼으로 공유 DB에 연결됩니다.

## GitHub / Vercel

- GitHub: https://github.com/editpanda-dev/Daily-Scrum-OS
- Vercel: https://research-team-os.vercel.app
