"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ResultView({
  markdown,
  onCopy,
}: {
  markdown: string;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-sage)] bg-white/60 p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-widest font-semibold text-[#5b6265]">
          RESEARCH RESULT · MARKDOWN
        </span>
        <button
          onClick={onCopy}
          className="text-xs px-3 py-1.5 rounded-full bg-[var(--color-clay)] hover:opacity-80 transition-opacity"
        >
          마크다운 복사
        </button>
      </div>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
