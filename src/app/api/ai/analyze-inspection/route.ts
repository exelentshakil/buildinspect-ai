import { NextRequest, NextResponse } from "next/server";
import { analyzePropertyInspection } from "@/lib/ai";
import { InspectionProperty } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const property = body.property as InspectionProperty;

    if (!property || !property.defects) {
      return NextResponse.json(
        { error: "Invalid inspection property payload" },
        { status: 400 }
      );
    }

    const analysis = await analyzePropertyInspection(property);
    return NextResponse.json({ success: true, analysis });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal AI analysis failure";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
