import { NextRequest, NextResponse } from "next/server";
import { generateItineraryMarkdown } from "@/lib/generateItinerary";
import { TravelFormData } from "@/lib/types";

export async function POST(req: NextRequest) {
  let body: Partial<TravelFormData>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

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
  } = body;

  if (!destination || !startDate || !endDate || !mbti) {
    return NextResponse.json(
      { error: "여행지, 시작일, 종료일, MBTI는 필수 입력값입니다." },
      { status: 400 }
    );
  }

  if (!partySize || partySize < 1) {
    return NextResponse.json(
      { error: "인원수는 1명 이상이어야 합니다." },
      { status: 400 }
    );
  }

  if (new Date(endDate) < new Date(startDate)) {
    return NextResponse.json(
      { error: "여행 종료일은 시작일보다 빠를 수 없습니다." },
      { status: 400 }
    );
  }

  const formData: TravelFormData = {
    destination,
    partySize: Number(partySize),
    startDate,
    endDate,
    accommodationGu: accommodationGu || "",
    dailyBudget: Number(dailyBudget) || 0,
    styles: styles || [],
    intensity: typeof intensity === "number" ? intensity : 5,
    mbti: mbti as TravelFormData["mbti"],
    extraRequest: extraRequest || "",
  };

  // 실제 서비스 전환 시 이 지점에서 Google Places API + LLM 호출로 교체
  const markdown = generateItineraryMarkdown(formData);

  return NextResponse.json({ markdown });
}
