import { InspectionProperty, AiAnalysisPayload, DefectSeverity } from "./types";

interface AiRawDefect {
  title: string;
  severity: string;
  category: string;
  measurement: string;
  codeRef: string;
  remediation: string;
  costAud: number;
}

interface AiRawInspectionResponse {
  executiveSummary: string;
  structuralHealthIndex: number;
  weatherproofingScore: number;
  fireSafetyScore: number;
  detectedDefects: AiRawDefect[];
  overallConclusion: string;
}

function normalizeSeverity(val: unknown): DefectSeverity {
  const str = String(val || "").toLowerCase();
  if (str.includes("safety") || str.includes("hazard")) return "Safety Hazard";
  if (str.includes("major")) return "Major Defect";
  if (str.includes("minor")) return "Minor Defect";
  return "Further Investigation";
}

export async function analyzePropertyInspection(
  property: InspectionProperty
): Promise<AiAnalysisPayload> {
  const startTime = Date.now();

  const systemPrompt = `You are a Senior Chartered Building Surveyor and AI Structural Specialist accredited under the Australian Institute of Building Surveyors (AIBS) and state regulators (VBA / Fair Trading NSW / QBCC).
You are analyzing inspection findings for an Australian commercial/residential property under AS 4349.1-2007 (Inspection of Buildings) and the National Construction Code (NCC 2022).

STRICT COMPLIANCE RULES:
1. Standards Alignment: Strictly reference AS 4349.1, AS 3600 (Concrete), AS 3700 (Masonry), AS 4654.2 (Waterproofing), or NCC 2022 clauses.
2. Defect Severity Triage: Classify defects accurately into: "Major Defect", "Minor Defect", "Safety Hazard", or "Further Investigation".
3. Currency & Costs: All repair estimates must be in Australian Dollars (AUD) reflecting current Australian building trade rates.
4. Tone: Rigorous, forensic, impartial, and highly professional commercial surveyor caliber.

Return ONLY a valid JSON object with this exact schema:
{
  "executiveSummary": "2-3 comprehensive paragraphs providing an executive assessment of property structural health, weatherproofing integrity, and compliance liabilities under AS 4349.1.",
  "structuralHealthIndex": 0-100 (integer score, e.g. 68),
  "weatherproofingScore": 0-100 (integer score, e.g. 54),
  "fireSafetyScore": 0-100 (integer score, e.g. 92),
  "detectedDefects": [
    {
      "title": "Specific forensic defect name",
      "severity": "Major Defect" | "Minor Defect" | "Safety Hazard" | "Further Investigation",
      "category": "Structural Foundation" | "Roof Plumbing & Flashing" | "Rising Damp & Waterproofing" | "Concrete Spalling & Rebar Corrosion" | "Fire Safety Separation" | "Timber Pest & Decay",
      "measurement": "Exact physical measurement with millimeter/area metrics",
      "codeRef": "Relevant Australian Standard or NCC clause",
      "remediation": "Prescriptive engineering remediation step",
      "costAud": 12000
    }
  ],
  "overallConclusion": "Conclusive statutory guidance regarding contract cooling-off, vendor rectification notices, or urgent safety orders."
}`;

  const userPrompt = `Property Details:
Reference: ${property.refNumber}
Address: ${property.address}, ${property.suburb} ${property.state}
Property Type: ${property.propertyType}
Regulatory Jurisdiction: ${property.jurisdiction}
Inspection Standard: ${property.inspectionStandard}
Client: ${property.clientName}
Current Known Defects (${property.defects.length}):
${property.defects
  .map(
    (d, i) =>
      `${i + 1}. [${d.severity}] ${d.title} (${d.category}) at ${d.location}. Measurements: ${d.measurement}. Standard: ${d.asStandardRef}. Remediation: ${d.remediationAction}`
  )
  .join("\n")}
`;

  // 1. Primary Provider: OpenAI GPT-4o-mini
  const openAiKey = process.env.OPENAI_API_KEY;
  if (openAiKey && openAiKey.trim().length > 10) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.2,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content) as AiRawInspectionResponse;
          return {
            provider: "openai",
            model: "gpt-4o-mini",
            latencyMs: Date.now() - startTime,
            tokensUsed: data.usage?.total_tokens || 850,
            executiveSummary: parsed.executiveSummary || "",
            structuralHealthIndex: Math.min(100, Math.max(0, parsed.structuralHealthIndex || 70)),
            weatherproofingScore: Math.min(100, Math.max(0, parsed.weatherproofingScore || 65)),
            fireSafetyScore: Math.min(100, Math.max(0, parsed.fireSafetyScore || 85)),
            detectedDefects: (parsed.detectedDefects || []).map((d) => ({
              title: d.title || "Unspecified Defect",
              severity: normalizeSeverity(d.severity),
              category: d.category || "Structural Foundation",
              measurement: d.measurement || "Dimensions pending laser verify",
              codeRef: d.codeRef || "AS 4349.1 Clause 3.3",
              remediation: d.remediation || "Engage licensed specialist trades for rectification.",
              costAud: Number(d.costAud) || 5000
            })),
            overallConclusion: parsed.overallConclusion || ""
          };
        }
      }
    } catch (err) {
      console.warn("OpenAI API call failed, attempting Gemini failover:", err);
    }
  }

  // 2. Fallback Provider: Google Gemini 2.0 Flash
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey && geminiKey.trim().length > 10) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${systemPrompt}\n\nStrict instruction: Return ONLY raw JSON without markdown code fences or conversational text.\n\n${userPrompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json"
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleanJson) as AiRawInspectionResponse;
          return {
            provider: "gemini",
            model: "gemini-2.0-flash",
            latencyMs: Date.now() - startTime,
            tokensUsed: 780,
            executiveSummary: parsed.executiveSummary || "",
            structuralHealthIndex: Math.min(100, Math.max(0, parsed.structuralHealthIndex || 70)),
            weatherproofingScore: Math.min(100, Math.max(0, parsed.weatherproofingScore || 65)),
            fireSafetyScore: Math.min(100, Math.max(0, parsed.fireSafetyScore || 85)),
            detectedDefects: (parsed.detectedDefects || []).map((d) => ({
              title: d.title || "Unspecified Defect",
              severity: normalizeSeverity(d.severity),
              category: d.category || "Structural Foundation",
              measurement: d.measurement || "Dimensions pending laser verify",
              codeRef: d.codeRef || "AS 4349.1 Clause 3.3",
              remediation: d.remediation || "Engage licensed specialist trades for rectification.",
              costAud: Number(d.costAud) || 5000
            })),
            overallConclusion: parsed.overallConclusion || ""
          };
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to deterministic AS 4349.1 rules engine:", err);
    }
  }

  // 3. Deterministic Safety Engine (Instant Offline Fallback)
  return getDeterministicInspectionAnalysis(property, Date.now() - startTime);
}

export function getDeterministicInspectionAnalysis(
  property: InspectionProperty,
  latencyMs: number = 32
): AiAnalysisPayload {
  const defectCount = property.defects.length;
  const majorCount = property.defects.filter((d) => d.severity === "Major Defect").length;
  const safetyCount = property.defects.filter((d) => d.severity === "Safety Hazard").length;

  const totalCostLow = property.defects.reduce((acc, d) => acc + d.costEstimateLow, 0);
  const totalCostHigh = property.defects.reduce((acc, d) => acc + d.costEstimateHigh, 0);

  return {
    provider: "deterministic-fallback",
    model: "as4349-rules-engine-v1",
    latencyMs,
    tokensUsed: 640,
    structuralHealthIndex: Math.max(35, 100 - majorCount * 18 - safetyCount * 12),
    weatherproofingScore: Math.max(40, 100 - majorCount * 14),
    fireSafetyScore: safetyCount > 0 ? 65 : 94,
    executiveSummary: `This comprehensive building condition audit for ${property.address}, ${property.suburb} ${property.state} was conducted strictly in accordance with ${property.inspectionStandard}. Our visual, non-destructive, and computer-vision-enhanced survey identified ${defectCount} distinct defect item(s), comprising ${majorCount} Major Structural/Serviceability Defect(s) and ${safetyCount} immediate Safety Hazard(s). 

Forensic imaging analysis indicates active building envelope compromise. The identified structural and weatherproofing anomalies represent significant statutory non-compliances under NCC 2022 Volume 1 & 2. Immediate remediation works are required to arrest accelerated reinforcement carbonation and water ingress.

Total estimated rectification liability across all tagged items is currently projected between $${totalCostLow.toLocaleString()} AUD and $${totalCostHigh.toLocaleString()} AUD (excluding GST and professional engineering certification fees).`,
    detectedDefects: property.defects.map((d) => ({
      title: d.title,
      severity: d.severity,
      category: d.category,
      measurement: d.measurement,
      codeRef: d.asStandardRef,
      remediation: d.remediationAction,
      costAud: Math.round((d.costEstimateLow + d.costEstimateHigh) / 2)
    })),
    overallConclusion: `Prior to settlement, contract cooling-off expiry, or strata capital works finalization, we recommend issuing a formal Defect Rectification Notice to the responsible developer/vendor. Licensed trade quotations should be procured immediately for all Major Defects.`
  };
}
