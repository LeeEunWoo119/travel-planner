"use client";

import { useState, ReactNode } from "react";
import { ALL_STYLE_TAGS } from "@/lib/mockPlaces";
import { MBTI, StyleTag, TravelFormData } from "@/lib/types";
import MbtiLegend from "@/components/MbtiLegend";
import ResultView from "@/components/ResultView";

const MBTI_LIST: MBTI[] = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
];

const todayPlus = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

export default function Home() {
  const [form, setForm] = useState<TravelFormData>({
    destination: "Tokyo, Japan",
    partySize: 2,
    startDate: todayPlus(3),
    endDate: todayPlus(7),
    accommodationGu: "",
    dailyBudget: 20000,
    styles: ["맛집", "관광", "카페", "로컬"],
    intensity: 4,
    mbti: "INFP",
    extraRequest: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState<string | null>(null);

  const toggleStyle = (tag: StyleTag) => {
    setForm((f) => ({
      ...f,
      styles: f.styles.includes(tag)
        ? f.styles.filter((s) => s !== tag)
        : [...f.styles, tag],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setMarkdown(null);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "요청 처리 중 오류가 발생했습니다.");
      } else {
        setMarkdown(data.markdown);
      }
    } catch (e) {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (markdown) navigator.clipboard.writeText(markdown);
  };

  return (
    <main className="min-h-screen bg-[var(--color-paper)]">
      <div className="grid md:grid-cols-[38%_62%] min-h-screen">
        {/* 좌측 히어로 패널 */}
        <div className="bg-[var(--color-mist)] px-8 md:px-12 py-14 flex flex-col justify-between">
          <div>
            <span className="inline-block text-[11px] tracking-[0.15em] font-semibold text-[#4a5457] mb-6">
              MOCK-BASED TRAVEL PLANNING
            </span>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.15] text-[#2f3436]">
              AI 여행
              <br />
              리서치
              <br />
              에이전트
            </h1>
            <p className="mt-6 text-sm md:text-base font-semibold text-[#3c4548]">
              여행 계획보다, 여행 리서치를 AI에게 맡겨보세요.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#5b6265]">
              인원수, 구 단위 숙소 위치, MBTI 성향을 바탕으로 다음 단계의
              맞춤형 여행 리서치 경험을 준비합니다.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-2">
            {["MVP · Mock 데이터", "구글 평점 4.0+", "광고 제외"].map((b) => (
              <span
                key={b}
                className="text-[11px] px-3 py-1.5 rounded-full bg-white/50 border border-[var(--color-sage)] text-[#3c4548]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* 우측 폼 패널 */}
        <div className="px-6 md:px-16 py-14">
          <div className="max-w-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-[0.15em] font-semibold text-[#5b6265]">
                START YOUR RESEARCH
              </span>
              <span className="text-[11px] px-3 py-1 rounded-full bg-[var(--color-linen)] border border-[var(--color-sage)]">
                MVP · Mock data
              </span>
            </div>
            <h2 className="font-display text-3xl mt-3 mb-8 text-[#2f3436]">
              여행 조건 입력
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="여행지">
                <input
                  className="input"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  placeholder="Tokyo, Japan"
                />
              </Field>

              <Field label="인원수">
                <input
                  type="number"
                  min={1}
                  className="input"
                  value={form.partySize}
                  onChange={(e) =>
                    setForm({ ...form, partySize: Number(e.target.value) })
                  }
                />
              </Field>

              <Field label="여행 시작일">
                <input
                  type="date"
                  className="input"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </Field>

              <Field label="여행 종료일">
                <input
                  type="date"
                  className="input"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </Field>

              <Field label="숙소 (구 단위)">
                <input
                  className="input"
                  value={form.accommodationGu}
                  onChange={(e) =>
                    setForm({ ...form, accommodationGu: e.target.value })
                  }
                  placeholder="예: 서울 구로구"
                />
              </Field>

              <Field label="예산 (하루)">
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    className="input pr-14"
                    value={form.dailyBudget}
                    onChange={(e) =>
                      setForm({ ...form, dailyBudget: Number(e.target.value) })
                    }
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#5b6265]">
                    JPY
                  </span>
                </div>
              </Field>
            </div>

            <div className="mt-6">
              <Label>MBTI</Label>
              <select
                className="input mt-2"
                value={form.mbti}
                onChange={(e) => setForm({ ...form, mbti: e.target.value as MBTI })}
              >
                {MBTI_LIST.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <MbtiLegend mbti={form.mbti} />
            </div>

            <div className="mt-6">
              <Label>여행 스타일</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {ALL_STYLE_TAGS.map((tag) => {
                  const active = form.styles.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleStyle(tag)}
                      className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                        active
                          ? "bg-[var(--color-sage)] border-[var(--color-sage)] text-[#20302e]"
                          : "bg-white border-[var(--color-sage)]/60 text-[#5b6265]"
                      }`}
                    >
                      {active ? "✓ " : "+ "}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <Label>여행 강도</Label>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-[#5b6265] w-14">여유롭게</span>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={form.intensity}
                  onChange={(e) =>
                    setForm({ ...form, intensity: Number(e.target.value) })
                  }
                  className="w-full accent-[var(--color-sage)]"
                />
                <span className="text-xs text-[#5b6265] w-14 text-right">빡빡하게</span>
              </div>
            </div>

            <div className="mt-6">
              <Label>추가 요청</Label>
              <textarea
                className="input mt-2 min-h-[90px] resize-none"
                value={form.extraRequest}
                onChange={(e) => setForm({ ...form, extraRequest: e.target.value })}
                placeholder="관광객에게 너무 유명한 곳보다는 현지인들이 많이 방문하는 맛집을 추천해주세요."
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-8 w-full py-3.5 rounded-xl bg-[var(--color-clay)] hover:opacity-85 transition-opacity font-semibold text-[#2f3436] disabled:opacity-50"
            >
              {loading ? "리서치 중..." : "여행 리서치 시작하기"}
            </button>

            {error && (
              <p className="mt-3 text-sm text-red-500">{error}</p>
            )}

            {markdown && (
              <div className="mt-8">
                <ResultView markdown={markdown} onCopy={handleCopy} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <label className="text-xs font-semibold text-[#5b6265]">{children}</label>
  );
}
