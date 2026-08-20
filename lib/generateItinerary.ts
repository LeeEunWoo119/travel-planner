import { MockPlace, TravelFormData } from "./types";
import { buildMockPlaces, filterQualityPlaces } from "./mockPlaces";

function diffDays(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  const ms = e.getTime() - s.getTime();
  const days = Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
  return Number.isFinite(days) && days > 0 ? days : 1;
}

function mbtiRules(mbti: string) {
  const ei = (mbti[0] || "E").toUpperCase(); // I / E
  // 두 번째 글자는 로직에서 의도적으로 사용하지 않음
  const tf = (mbti[2] || "T").toUpperCase(); // F / T
  const jp = (mbti[3] || "J").toUpperCase(); // J / P
  return {
    indoorLeaning: ei === "I",
    emotionalLeaning: tf === "F",
    tightSchedule: jp === "J",
  };
}

function pickTimeBlocks(jpTight: boolean, intensity: number) {
  // 강도 0(여유롭게)~10(빡빡하게), J는 정확한 시간, P는 여유 구간 표기
  const stopsPerDay = jpTight
    ? Math.max(3, Math.min(6, 3 + Math.round(intensity / 2.5)))
    : Math.max(2, Math.min(4, 2 + Math.round(intensity / 4)));

  if (jpTight) {
    const base = ["09:00", "11:30", "14:00", "16:30", "19:00", "21:00"];
    return base.slice(0, stopsPerDay);
  }
  const base = ["오전 중", "점심 전후", "오후 느긋하게", "해질녘", "저녁 이후"];
  return base.slice(0, stopsPerDay);
}

function scorePlace(
  place: MockPlace,
  opts: {
    styles: string[];
    indoorLeaning: boolean;
    emotionalLeaning: boolean;
    partySize: number;
    preferLocal: boolean;
    budgetLevel: 1 | 2 | 3;
  }
): number {
  let score = 0;
  if (opts.styles.length === 0 || opts.styles.includes(place.category)) score += 3;
  if (opts.indoorLeaning && place.indoorOutdoor === "indoor") score += 2;
  if (!opts.indoorLeaning && place.indoorOutdoor === "outdoor") score += 2;
  if (opts.emotionalLeaning && place.tone === "emotional") score += 2;
  if (!opts.emotionalLeaning && place.tone === "practical") score += 2;
  if (opts.partySize >= 4 && place.groupFriendly) score += 2;
  if (opts.preferLocal && place.local) score += 2;
  if (place.priceLevel <= opts.budgetLevel) score += 1;
  score += (place.rating - 4.0) * 2; // 평점이 높을수록 소폭 가점
  return score;
}

function budgetToLevel(dailyBudget: number): 1 | 2 | 3 {
  if (dailyBudget < 15000) return 1;
  if (dailyBudget < 40000) return 2;
  return 3;
}

export function generateItineraryMarkdown(form: TravelFormData): string {
  const {
    destination,
    partySize,
    startDate,
    endDate,
    accommodationGu,
    dailyBudget,
    styles,
    intensity,
    mbti,
    extraRequest,
  } = form;

  const rules = mbtiRules(mbti);
  const days = diffDays(startDate, endDate);
  const timeBlocks = pickTimeBlocks(rules.tightSchedule, intensity);
  const preferLocal =
    styles.includes("로컬") ||
    /현지|로컬|주민/.test(extraRequest || "");

  const allPlaces = buildMockPlaces(destination);
  const qualityPlaces = filterQualityPlaces(allPlaces); // 평점 4.0 미만 + 광고 제외

  const budgetLevel = budgetToLevel(dailyBudget);

  const scored = qualityPlaces
    .map((p) => ({
      place: p,
      score: scorePlace(p, {
        styles,
        indoorLeaning: rules.indoorLeaning,
        emotionalLeaning: rules.emotionalLeaning,
        partySize,
        preferLocal,
        budgetLevel,
      }),
    }))
    .sort((a, b) => b.score - a.score);

  const used = new Set<string>();
  const dayPlans: { date: string; picks: MockPlace[] }[] = [];

  for (let d = 0; d < days; d++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + d);
    const picks: MockPlace[] = [];
    for (const { place } of scored) {
      if (picks.length >= timeBlocks.length) break;
      if (used.has(place.id)) continue;
      picks.push(place);
      used.add(place.id);
    }
    // 후보가 부족하면 재사용 허용 (목데이터 한계 보완)
    if (picks.length < timeBlocks.length) {
      for (const { place } of scored) {
        if (picks.length >= timeBlocks.length) break;
        if (picks.find((x) => x.id === place.id)) continue;
        picks.push(place);
      }
    }
    dayPlans.push({ date: date.toISOString().slice(0, 10), picks });
  }

  const eiLabel = rules.indoorLeaning
    ? "I(내향) — 숙소·실내 체류 시간 확대"
    : "E(외향) — 야외 활동 시간 확대";
  const tfLabel = rules.emotionalLeaning
    ? "F(감정) — 감성적이고 분위기 있는 장소 위주"
    : "T(사고) — 동선이 명확한 현실적인 장소 위주";
  const jpLabel = rules.tightSchedule
    ? "J(판단) — 정해진 시간표대로 타이트하게 진행"
    : "P(인식) — 여유 구간으로 느슨하게 진행";

  const lines: string[] = [];

  lines.push(`# ${destination || "여행지"} 여행 리서치 결과`);
  lines.push("");
  lines.push(
    `> **조건 요약** · 인원 ${partySize}명 · ${startDate} ~ ${endDate} (${days}일) · 숙소 기준 **${accommodationGu || "미입력"}** · 하루 예산 ${dailyBudget.toLocaleString()}원`
  );
  lines.push(">");
  lines.push(`> **MBTI(${mbti}) 반영** — ${eiLabel} / ${tfLabel} / ${jpLabel} (2번째 글자는 로직에 사용하지 않음)`);
  lines.push(">");
  lines.push(`> 모든 추천 장소는 **구글 평점 4.0 이상**, **광고/협찬 매장 제외** 기준으로 필터링되었습니다.`);
  lines.push("");

  if (extraRequest && extraRequest.trim()) {
    lines.push(`**추가 요청 반영:** ${extraRequest.trim()}`);
    lines.push("");
  }

  lines.push("---");

  dayPlans.forEach((dp, idx) => {
    lines.push("");
    lines.push(`## Day ${idx + 1} · ${dp.date}`);
    lines.push("");
    dp.picks.forEach((place, i) => {
      const time = timeBlocks[i] || `일정 ${i + 1}`;
      const desc = rules.emotionalLeaning
        ? place.note
        : `${place.note} (카테고리: ${place.category}, 예상 인원 적합도: ${
            partySize >= 4 && place.groupFriendly ? "그룹 이용 원활" : "소규모 방문 적합"
          })`;
      lines.push(
        `- **${time}** — **${place.name}** ⭐ ${place.rating.toFixed(1)}  \n  ${desc}`
      );
    });
    if (!rules.tightSchedule) {
      lines.push("");
      lines.push(`  *（P 성향 반영: 이동 사이 여유 시간을 넉넉히 두었어요. 컨디션에 따라 순서를 바꿔도 좋습니다.）*`);
    }
  });

  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push("### 참고");
  lines.push(`- 인원수(${partySize}명) 기준으로 좌석/예약 규모가 맞는 장소를 우선 배치했습니다.`);
  lines.push(`- 숙소가 위치한 **${accommodationGu || "입력한 구"}** 를 기준으로 동선을 구성했습니다.`);
  lines.push(`- 본 결과는 MVP 목데이터 기반이며, 실제 서비스 연동 시 실시간 평점/영업시간 데이터로 교체됩니다.`);

  return lines.join("\n");
}
