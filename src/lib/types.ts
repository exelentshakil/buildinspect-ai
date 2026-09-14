export type DefectSeverity = "Major Defect" | "Minor Defect" | "Safety Hazard" | "Further Investigation";

export type PropertyType =
  | "Commercial High-Rise"
  | "Residential Strata"
  | "Heritage Terrace"
  | "Industrial Warehouse";

export type AustralianJurisdiction =
  | "NSW (Fair Trading)"
  | "VIC (VBA)"
  | "QLD (QBCC)"
  | "WA (DMIRS)";

export interface BoundingBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
  label: string;
  confidence: number; // 0-1
}

export interface InspectionDefect {
  id: string;
  title: string;
  category:
    | "Structural Foundation"
    | "Roof Plumbing & Flashing"
    | "Rising Damp & Waterproofing"
    | "Concrete Spalling & Rebar Corrosion"
    | "Fire Safety Separation"
    | "Timber Pest & Decay";
  severity: DefectSeverity;
  location: string;
  imageUrl: string;
  boundingBox: BoundingBox;
  measurement: string;
  asStandardRef: string;
  nccCodeRef: string;
  remediationAction: string;
  tradesRequired: string[];
  costEstimateLow: number;
  costEstimateHigh: number;
  urgency: "Immediate (0-7 Days)" | "Priority (14-30 Days)" | "Routine (3-6 Months)";
}

export interface InspectionProperty {
  id: string;
  refNumber: string;
  address: string;
  suburb: string;
  state: "NSW" | "VIC" | "QLD" | "WA";
  propertyType: PropertyType;
  jurisdiction: AustralianJurisdiction;
  inspectionStandard: string;
  clientName: string;
  clientEmail: string;
  leadInspector: string;
  accreditation: string;
  inspectionDate: string;
  status: "In Progress" | "Defects Triaged" | "Report Drafted" | "Approved & Dispatched";
  overallRiskScore: number; // 0-100
  overallRating: "Satisfactory" | "Moderate Risk" | "Substantial Defect Burden" | "Urgent Safety Hazard";
  defects: InspectionDefect[];
}

export interface PluginModule {
  id: string;
  slug: string;
  name: string;
  version: string;
  category: "Vision & Sensors" | "Compliance & Standards" | "Tender & Marketplace" | "Reporting & Exports";
  status: "active" | "installed" | "available";
  description: string;
  iconName: string;
  author: string;
  eventHooks: string[];
  schemaFields: string[];
  enabled: boolean;
}

export interface AiAnalysisPayload {
  provider: "openai" | "gemini" | "deterministic-fallback";
  model: string;
  latencyMs: number;
  tokensUsed: number;
  executiveSummary: string;
  structuralHealthIndex: number;
  weatherproofingScore: number;
  fireSafetyScore: number;
  detectedDefects: Array<{
    title: string;
    severity: DefectSeverity;
    category: string;
    measurement: string;
    codeRef: string;
    remediation: string;
    costAud: number;
  }>;
  overallConclusion: string;
}
