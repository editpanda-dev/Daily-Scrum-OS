# AIM Research Team OS

논문 작성과 HUFStudy 운영을 위한 내부 팀 OS입니다. 고객용 AdTrace AI 서비스와 분리된 별도 Vercel 앱입니다.

Production URL:

```text
https://research-team-os.vercel.app
```

## 목적

- Notion 회의록 ZIP 업로드와 하위 페이지 Markdown 파싱
- 산발적인 회의록에서 팀 목표, 핵심 안건, 결정사항, 다음 아젠다, R&R 정리
- 회의록 정리본 `.md` 자동 생성
- 데일리 스크럼 기록
- 태스크 상태와 마감일 관리
- 팀원별 현재 업무와 다음 업무 가시화
- 논문 섹션별 작성 상태 추적
- A/B 테스트 설계와 CTR, CVR, 구매버튼 클릭 측정 방식 정리
- 주간보고서, 선행연구, 광고 자극물, 회의록 아카이빙
- Google Drive 자료 링크 아카이빙

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

기본 화면은 브라우저 `localStorage` fallback으로도 동작합니다. 팀원들이 같은 데이터를 공유하려면 Vercel Serverless API와 Supabase DB를 연결합니다.

앱의 저장 구조는 단일 Supabase 테이블에 팀 OS 전체 상태를 JSONB로 저장하는 방식입니다. 별도 백엔드 서버 없이 Vercel Serverless Function이 Supabase REST API를 호출합니다.

## Notion ZIP 운영 방식

1. Notion에서 회의록 페이지를 하위 페이지 포함 Markdown/CSV ZIP으로 export합니다.
2. 앱 첫 화면의 `Notion ZIP 업로드`에 ZIP 파일을 넣고 `ZIP 분석`을 누릅니다.
3. 앱이 ZIP 안의 `.md`, `.markdown`, `.txt` 파일을 읽어 아래 항목을 추출합니다.

- 현재 팀 목표
- 프로젝트 주제 / 방향
- 핵심 아젠다
- 개인 성과 공유
- 최근 결정사항
- 다음 아젠다
- R&R / 액션아이템

4. 추출된 `TODO`와 `BLOCKED`는 태스크 보드와 캘린더에 자동 반영됩니다.
5. `정리본 복사` 또는 `정리본.md 다운로드`로 회의록 정리본을 보관할 수 있습니다.

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

CLI로 등록할 경우:

```bash
npx vercel env add SUPABASE_URL production
npx vercel env add SUPABASE_SERVICE_ROLE_KEY production
npx vercel env add TEAM_OS_PASSCODE production
npx vercel --prod
```

현재 코드에는 Supabase 연결 로직이 포함되어 있습니다. 다만 Vercel 프로젝트에 위 환경변수가 없으면 자동으로 로컬 모드로 동작합니다.

## Google Drive 자료 운영

공유 폴더:

```text
https://drive.google.com/drive/folders/1FcPQHlpGc736etJQKGEEhqWpasH56tun?usp=drive_link
```

무료 운영을 우선하므로 파일 업로드는 Google Drive 공유 폴더에서 직접 하고, 이 OS에는 자료명, 유형, 공유 링크, 요약을 저장합니다. 저장된 링크는 `자료 열기`로 바로 이동할 수 있습니다.

앱 안에서 바로 Drive 업로드까지 하려면 Google Picker 또는 Drive API OAuth 설정이 필요합니다. 비용은 들지 않을 수 있지만 Google Cloud 프로젝트, OAuth 동의 화면, API 키/클라이언트 ID, 권한 검수 가능성이 생겨 MVP 운영에는 부담이 큽니다. 지금 구조는 가장 단순하고 무료인 방식입니다.

## Notion 회의록 운영

회의 원본과 주차별 개인 리서치는 Notion에서 관리하고, 확정된 `TODO`, `BLOCKED`, `DECISION`, `ARCHIVE`만 Research Team OS에 반영합니다.

- Notion 회의록 템플릿: `docs/notion-meeting-os-template.md`
- Google Docs 대체 템플릿: `docs/google-docs-meeting-template.md`

## GitHub / Vercel

- GitHub: https://github.com/editpanda-dev/Daily-Scrum-OS
- Vercel: https://research-team-os.vercel.app
