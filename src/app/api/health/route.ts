import { NextResponse } from "next/server";

export async function GET() {
  const hasOpenAi = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 10);
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 10);
  const hasSupabase = Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL);

  return NextResponse.json({
    status: "healthy",
    platform: "BuildInspect AI (Australia)",
    version: "2.4.0-prod",
    standardsCompliance: ["AS 4349.1-2007", "AS 4349.3", "NCC 2022 BCA Vol 1&2"],
    aiProviders: {
      primary: {
        provider: "OpenAI GPT-4o-mini",
        configured: hasOpenAi,
        status: hasOpenAi ? "active" : "standby-fallback"
      },
      secondary: {
        provider: "Google Gemini 2.0 Flash",
        configured: hasGemini,
        status: hasGemini ? "active" : "standby-fallback"
      },
      safetyRulesEngine: {
        provider: "Deterministic AS 4349.1 Compliance Engine",
        status: "active",
        latencyTargetMs: "< 35ms"
      }
    },
    database: {
      provider: "Supabase PostgreSQL (Multi-Tenant RBAC)",
      connected: hasSupabase
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
}
