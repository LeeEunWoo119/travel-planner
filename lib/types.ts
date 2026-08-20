export type MBTI =
  | "ISTJ" | "ISFJ" | "INFJ" | "INTJ"
  | "ISTP" | "ISFP" | "INFP" | "INTP"
  | "ESTP" | "ESFP" | "ENFP" | "ENTP"
  | "ESTJ" | "ESFJ" | "ENFJ" | "ENTJ";

export type StyleTag = "맛집" | "관광" | "쇼핑" | "카페" | "로컬";

export interface TravelFormData {
  destination: string; // 여행지
  partySize: number; // 동행자 -> 인원수로 변경
  startDate: string; // 여행 시작일
  endDate: string; // 여행 종료일
  accommodationGu: string; // 숙소: 한국 행정구 단위 (예: 서울 구로구)
  dailyBudget: number; // 예산 (하루)
  styles: StyleTag[]; // 여행 스타일
  intensity: number; // 여행 강도 0(여유롭게) ~ 10(빡빡하게)
  mbti: MBTI; // MBTI 드롭다운
  extraRequest: string; // 추가 요청
}

export interface MockPlace {
  id: string;
  name: string;
  category: StyleTag;
  rating: number; // 구글 평점 (mock)
  isAd: boolean; // 광고/스폰서 여부 -> 필터링 대상
  indoorOutdoor: "indoor" | "outdoor";
  tone: "emotional" | "practical"; // F/T 매칭용
  groupFriendly: boolean; // 인원수 많을 때 우선
  local: boolean; // "현지인이 많이 찾는" 여부 -> 로컬 스타일/추가요청 매칭
  priceLevel: 1 | 2 | 3; // 1=저렴 2=보통 3=고가, 예산 매칭용
  note: string; // 한 줄 설명
}
