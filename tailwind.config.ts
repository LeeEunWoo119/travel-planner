import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 지정된 5개 색상만 사용
      colors: {
        mist: "#DCE9F0",   // 옅은 하늘빛 — 배경, 강조 영역
        sage: "#AEC6C6",   // 세이지 틸 — 보조 강조, 버튼
        clay: "#D9C9BA",   // 웜 베이지 — 포인트, 선택 상태
        linen: "#ECE2DB",  // 크림 — 카드 배경
        paper: "#EDEBEB",  // 소프트 그레이 — 메인 배경
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
