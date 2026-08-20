# AI 여행 리서치 에이전트 (Mock MVP)

원본(`ai-travel-research-agent`)과 동일한 컨셉의 Next.js 풀스택 앱이며, 아래 부분만 다르게 구현했습니다.

## 원본과 다른 점

1. **인원수** — 동행자 드롭다운 대신 숫자 입력을 받아, 4명 이상이면 그룹 좌석/예약 가능 장소를 우선 추천합니다.
2. **숙소 (구 단위)** — "서울 구로구"처럼 한국 행정구 단위 텍스트를 입력받아 동선 기준점으로 사용합니다.
3. **MBTI 드롭다운** — 16개 유형 중 선택하면 다음 규칙이 여행 일정 생성 로직에 반영됩니다.
   - 1번째 글자 `I`/`E` → 실내(숙소) 체류 시간 ↔ 야외 활동 시간 비중
   - 2번째 글자 → **로직에 사용하지 않음**
   - 3번째 글자 `F`/`T` → 감성적인 장소 위주 ↔ 현실적인 장소 위주 추천 톤
   - 4번째 글자 `J`/`P` → 타이트한 시간표(정확한 시각) ↔ 여유 있는 일정(느슨한 시간대)
   - 폼 화면에서 4개의 글자 칩으로 어떤 글자가 실제로 적용되는지 바로 보여줍니다.
4. **컬러 팔레트** — `#DCE9F0`, `#AEC6C6`, `#D9C9BA`, `#ECE2DB`, `#EDEBEB` 5가지 색상만 사용합니다.

## 원본과 동일한 점

- 여행지, 여행 시작일/종료일, 예산(하루), 여행 스타일(맛집/관광/쇼핑/카페/로컬), 여행 강도, 추가 요청 입력
- 결과는 **Markdown 형식**으로 반환
- **구글 평점 4.0 이상**, **광고(협찬) 매장 제외** 필터링
- MVP 단계 · Mock 데이터 기반

## 폴더 구조

```
app/
  page.tsx              # 프론트엔드 메인 화면 (폼 + 결과)
  api/recommend/route.ts# 백엔드 API (조건 검증 → 일정 생성)
  layout.tsx, globals.css
components/
  MbtiLegend.tsx         # MBTI 4글자 중 실제 적용되는 글자를 보여주는 컴포넌트
  ResultView.tsx          # Markdown 결과 렌더링
lib/
  types.ts                # 공용 타입
  mockPlaces.ts            # Mock 장소 데이터 (평점/광고 여부 포함)
  generateItinerary.ts      # MBTI/인원수/예산/강도 로직 → Markdown 생성
```

## 실행 방법

```bash
npm install
npm run dev
```

`http://localhost:3000` 접속.

## 실제 서비스로 확장할 때

- `lib/mockPlaces.ts`의 목데이터를 Google Places API(평점, 영업시간, 리뷰) 응답으로 교체
- `app/api/recommend/route.ts`에서 `generateItineraryMarkdown` 호출 부분을 LLM(예: Claude API) 프롬프트 호출로 교체하거나, 목데이터 필터링 결과를 LLM에 컨텍스트로 넘겨 문장을 다듬는 하이브리드 구조로 확장 가능
- 광고 필터링(`isAd`)과 평점 필터링(`rating >= 4.0`) 로직은 실제 API 연동 후에도 `filterQualityPlaces` 함수 하나만 교체하면 유지됩니다.
