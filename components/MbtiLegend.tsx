"use client";

import { MBTI } from "@/lib/types";

const RULES: Record<
  string,
  { active: boolean; onLabel: string; offLabel: string }
> = {
  "0": { active: true, onLabel: "I → 실내·숙소 시간 확대", offLabel: "E → 야외 활동 시간 확대" },
  "1": { active: false, onLabel: "", offLabel: "이 로직에서는 사용하지 않음" },
  "2": { active: true, onLabel: "F → 감성적인 장소 위주", offLabel: "T → 현실적인 장소 위주" },
  "3": { active: true, onLabel: "J → 타이트한 시간표", offLabel: "P → 여유 있는 일정" },
};

export default function MbtiLegend({ mbti }: { mbti: MBTI }) {
  const letters = mbti.split("");

  return (
    <div className="flex flex-wrap items-stretch gap-2 mt-3">
      {letters.map((letter, i) => {
        const ignored = i === 1;
        return (
          <div
            key={i}
            className={`flex-1 min-w-[120px] rounded-xl border px-3 py-2 transition-colors ${
              ignored
                ? "border-[var(--color-sage)]/40 bg-[var(--color-paper)] opacity-50"
                : "border-[var(--color-sage)] bg-[var(--color-mist)]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-display text-lg ${
                  ignored ? "text-gray-400" : "text-[#2f3436]"
                }`}
              >
                {letter}
              </span>
              {!ignored && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--color-clay)] text-[#2f3436]">
                  적용됨
                </span>
              )}
            </div>
            <p className="text-[11px] leading-snug mt-1 text-[#5b6265]">
              {ignored
                ? "2번째 글자 — 로직에 사용하지 않음"
                : i === 0
                ? letter === "I"
                  ? RULES["0"].onLabel
                  : RULES["0"].offLabel
                : i === 2
                ? letter === "F"
                  ? RULES["2"].onLabel
                  : RULES["2"].offLabel
                : letter === "J"
                ? RULES["3"].onLabel
                : RULES["3"].offLabel}
            </p>
          </div>
        );
      })}
    </div>
  );
}
