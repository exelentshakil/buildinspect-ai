import { NextRequest, NextResponse } from "next/server";
import { analyzePropertyInspection } from "@/lib/ai";
import { SAMPLE_INSPECTION_PROPERTIES } from "@/lib/constants";
import { InspectionProperty } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let property = body.property as InspectionProperty;

    if (!property && body.propertyId) {
      property = SAMPLE_INSPECTION_PROPERTIES.find((p) => p.id === body.propertyId) || SAMPLE_INSPECTION_PROPERTIES[0];
    }

    if (!property || !property.defects) {
      return NextResponse.json(
        { error: "Invalid inspection property payload. Provide 'property' or 'propertyId'" },
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
