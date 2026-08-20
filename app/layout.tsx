import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const display = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "AI 여행 리서치 에이전트 · 여행 조건 입력",
  description:
    "인원수, 구 단위 숙소, MBTI 성향을 반영해 구글 평점 4.0 이상 · 광고 없는 장소만 추천하는 AI 여행 리서치 에이전트",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
