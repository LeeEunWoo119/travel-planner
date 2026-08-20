import { MockPlace, StyleTag } from "./types";

/**
 * MVP 목데이터입니다. name의 "{city}"는 사용자가 입력한 여행지 이름으로 치환됩니다.
 * 실제 서비스 전환 시 이 파일을 Google Places API 등 실제 데이터 소스로 교체하면 됩니다.
 * 일부러 rating 4.0 미만 항목과 isAd:true 항목을 섞어두어, 필터링 로직이 실제로
 * "구글 평점 4.0 이상 + 광고 제외" 조건을 지키는지 확인할 수 있게 했습니다.
 */
export const MOCK_PLACES_TEMPLATE: MockPlace[] = [
  // 맛집 -----------------------------------------------------------
  { id: "f1", name: "{city} 골목 오코노미야키", category: "맛집", rating: 4.6, isAd: false, indoorOutdoor: "indoor", tone: "emotional", groupFriendly: true, local: true, priceLevel: 2, note: "현지인 단골이 많은 좁은 골목 식당, 웨이팅 감안" },
  { id: "f2", name: "{city} 미슐랭 오마카세", category: "맛집", rating: 4.8, isAd: false, indoorOutdoor: "indoor", tone: "practical", groupFriendly: false, local: false, priceLevel: 3, note: "예약 필수, 코스로 정확한 타이밍에 서빙" },
  { id: "f3", name: "{city} 관광특구 대형 뷔페", category: "맛집", rating: 3.6, isAd: true, indoorOutdoor: "indoor", tone: "practical", groupFriendly: true, local: false, priceLevel: 2, note: "광고성 큐레이션 상단 노출 매장 (필터 대상)" },
  { id: "f4", name: "{city} 시장 안 라멘집", category: "맛집", rating: 4.3, isAd: false, indoorOutdoor: "indoor", tone: "emotional", groupFriendly: true, local: true, priceLevel: 1, note: "재래시장 안 3대째 이어온 라멘집" },
  { id: "f5", name: "{city} 스폰서 이자카야", category: "맛집", rating: 4.1, isAd: true, indoorOutdoor: "indoor", tone: "emotional", groupFriendly: true, local: false, priceLevel: 2, note: "협찬 표기된 매장 (필터 대상)" },
  { id: "f6", name: "{city} 단체석 화로구이", category: "맛집", rating: 4.4, isAd: false, indoorOutdoor: "indoor", tone: "practical", groupFriendly: true, local: false, priceLevel: 2, note: "룸 좌석이 있어 4인 이상 그룹에 적합" },
  { id: "f7", name: "{city} 로컬 국숫집", category: "맛집", rating: 4.5, isAd: false, indoorOutdoor: "indoor", tone: "emotional", groupFriendly: false, local: true, priceLevel: 1, note: "동네 주민들만 아는 조용한 국숫집" },

  // 관광 -----------------------------------------------------------
  { id: "s1", name: "{city} 전망대", category: "관광", rating: 4.5, isAd: false, indoorOutdoor: "indoor", tone: "practical", groupFriendly: true, local: false, priceLevel: 2, note: "도시 전경을 한눈에, 효율적인 동선의 필수 코스" },
  { id: "s2", name: "{city} 옛 골목 산책로", category: "관광", rating: 4.7, isAd: false, indoorOutdoor: "outdoor", tone: "emotional", groupFriendly: true, local: true, priceLevel: 1, note: "해질녘 분위기가 좋은 야외 산책 코스" },
  { id: "s3", name: "{city} 대형 테마파크", category: "관광", rating: 4.4, isAd: false, indoorOutdoor: "outdoor", tone: "practical", groupFriendly: true, local: false, priceLevel: 3, note: "동선이 명확하고 시간표대로 움직이기 좋음" },
  { id: "s4", name: "{city} 유료 홍보관", category: "관광", rating: 3.4, isAd: true, indoorOutdoor: "indoor", tone: "practical", groupFriendly: true, local: false, priceLevel: 1, note: "입장 유도형 광고 스팟 (필터 대상)" },
  { id: "s5", name: "{city} 고요한 사원", category: "관광", rating: 4.6, isAd: false, indoorOutdoor: "outdoor", tone: "emotional", groupFriendly: false, local: true, priceLevel: 1, note: "아침 일찍 가면 관광객 없이 조용함" },
  { id: "s6", name: "{city} 강변 야경 포인트", category: "관광", rating: 4.5, isAd: false, indoorOutdoor: "outdoor", tone: "emotional", groupFriendly: true, local: true, priceLevel: 1, note: "노을부터 야경까지 이어지는 감성 포인트" },
  { id: "s7", name: "{city} 역사박물관", category: "관광", rating: 4.2, isAd: false, indoorOutdoor: "indoor", tone: "practical", groupFriendly: true, local: false, priceLevel: 1, note: "동선이 잘 짜여 있어 정해진 시간 안에 관람 가능" },

  // 쇼핑 -----------------------------------------------------------
  { id: "p1", name: "{city} 로컬 편집숍 거리", category: "쇼핑", rating: 4.4, isAd: false, indoorOutdoor: "outdoor", tone: "emotional", groupFriendly: true, local: true, priceLevel: 2, note: "현지 디자이너 브랜드가 모인 거리" },
  { id: "p2", name: "{city} 대형 아울렛", category: "쇼핑", rating: 4.1, isAd: false, indoorOutdoor: "indoor", tone: "practical", groupFriendly: true, local: false, priceLevel: 2, note: "브랜드별 구역이 명확해 효율적으로 둘러보기 좋음" },
  { id: "p3", name: "{city} 관광객 전용 기념품점", category: "쇼핑", rating: 3.3, isAd: true, indoorOutdoor: "indoor", tone: "practical", groupFriendly: true, local: false, priceLevel: 1, note: "여행사 제휴 광고 매장 (필터 대상)" },
  { id: "p4", name: "{city} 동네 소품샵 골목", category: "쇼핑", rating: 4.5, isAd: false, indoorOutdoor: "outdoor", tone: "emotional", groupFriendly: false, local: true, priceLevel: 1, note: "작은 소품샵들이 이어진 조용한 골목" },

  // 카페 -----------------------------------------------------------
  { id: "c1", name: "{city} 루프탑 카페", category: "카페", rating: 4.5, isAd: false, indoorOutdoor: "outdoor", tone: "emotional", groupFriendly: true, local: false, priceLevel: 2, note: "노을 시간대 뷰가 좋은 루프탑" },
  { id: "c2", name: "{city} 스터디용 프랜차이즈 카페", category: "카페", rating: 4.0, isAd: false, indoorOutdoor: "indoor", tone: "practical", groupFriendly: true, local: false, priceLevel: 1, note: "콘센트와 좌석이 넉넉해 쉬어가기 좋음" },
  { id: "c3", name: "{city} 협찬 디저트 카페", category: "카페", rating: 4.2, isAd: true, indoorOutdoor: "indoor", tone: "emotional", groupFriendly: true, local: false, priceLevel: 2, note: "인플루언서 협찬 표기 매장 (필터 대상)" },
  { id: "c4", name: "{city} 골목 안 로스터리", category: "카페", rating: 4.7, isAd: false, indoorOutdoor: "indoor", tone: "emotional", groupFriendly: false, local: true, priceLevel: 2, note: "동네 사람들이 원두 사러 오는 작은 로스터리" },
  { id: "c5", name: "{city} 대로변 저평점 카페", category: "카페", rating: 3.7, isAd: false, indoorOutdoor: "indoor", tone: "practical", groupFriendly: true, local: false, priceLevel: 1, note: "평점 미달로 자동 제외 예시" },

  // 로컬 -----------------------------------------------------------
  { id: "l1", name: "{city} 동네 목욕탕", category: "로컬", rating: 4.4, isAd: false, indoorOutdoor: "indoor", tone: "emotional", groupFriendly: false, local: true, priceLevel: 1, note: "여행자보다 주민이 훨씬 많은 목욕탕" },
  { id: "l2", name: "{city} 새벽 수산시장", category: "로컬", rating: 4.6, isAd: false, indoorOutdoor: "outdoor", tone: "practical", groupFriendly: true, local: true, priceLevel: 1, note: "이른 아침 상인들의 생생한 하루 시작" },
  { id: "l3", name: "{city} 주민 커뮤니티 공원", category: "로컬", rating: 4.3, isAd: false, indoorOutdoor: "outdoor", tone: "emotional", groupFriendly: true, local: true, priceLevel: 1, note: "주민들의 산책, 운동이 이어지는 동네 공원" },
  { id: "l4", name: "{city} 단골 동네 선술집", category: "로컬", rating: 4.5, isAd: false, indoorOutdoor: "indoor", tone: "emotional", groupFriendly: false, local: true, priceLevel: 1, note: "관광지도에 잘 나오지 않는 작은 선술집" },
];

export function buildMockPlaces(city: string): MockPlace[] {
  return MOCK_PLACES_TEMPLATE.map((p) => ({
    ...p,
    name: p.name.replace("{city}", city || "여행지"),
  }));
}

export function filterQualityPlaces(places: MockPlace[]): MockPlace[] {
  // 핵심 필터 규칙: 구글 평점 4.0 이상 + 광고(스폰서) 제외
  return places.filter((p) => p.rating >= 4.0 && !p.isAd);
}

export const ALL_STYLE_TAGS: StyleTag[] = ["맛집", "관광", "쇼핑", "카페", "로컬"];
