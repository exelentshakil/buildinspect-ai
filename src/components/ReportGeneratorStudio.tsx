"use client";

import React, { useState } from "react";
import {
  FileText,
  Copy,
  Check,
  Download,
  Send,
  Printer,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Calendar,
  UserCheck,
  ExternalLink,
  Code
} from "lucide-react";
import { InspectionProperty, AiAnalysisPayload } from "@/lib/types";

interface ReportGeneratorStudioProps {
  property: InspectionProperty;
  aiAnalysis: AiAnalysisPayload;
  onDispatchReport: () => void;
  isDispatched: boolean;
}

export function ReportGeneratorStudio({
  property,
  aiAnalysis,
  onDispatchReport,
  isDispatched
}: ReportGeneratorStudioProps) {
  const [activeView, setActiveView] = useState<"preview" | "markdown" | "json">("preview");
  const [copied, setCopied] = useState<string | null>(null);

  const majorCount = property.defects.filter((d) => d.severity === "Major Defect").length;
  const safetyCount = property.defects.filter((d) => d.severity === "Safety Hazard").length;
  const totalCostLow = property.defects.reduce((acc, d) => acc + d.costEstimateLow, 0);
  const totalCostHigh = property.defects.reduce((acc, d) => acc + d.costEstimateHigh, 0);

  const reportMarkdown = `# AUSTRALIAN COMMERCIAL & RESIDENTIAL BUILDING CONDITION REPORT
Standard: ${property.inspectionStandard}
Reference: ${property.refNumber}
Date: ${property.inspectionDate}

## 1. PROPERTY & SURVEY DETAILS
- Address: ${property.address}, ${property.suburb} ${property.state}
- Property Type: ${property.propertyType}
- Regulatory Authority: ${property.jurisdiction}
- Client: ${property.clientName} (${property.clientEmail})
- Lead Surveyor: ${property.leadInspector}
- Accreditation: ${property.accreditation}

## 2. EXECUTIVE SUMMARY & RISK ASSESSMENT
${aiAnalysis.executiveSummary}

Overall Risk Score: ${property.overallRiskScore} / 100 (${property.overallRating})
Structural Health Index: ${aiAnalysis.structuralHealthIndex} / 100
Weatherproofing Integrity: ${aiAnalysis.weatherproofingScore} / 100
Passive Fire Safety: ${aiAnalysis.fireSafetyScore} / 100

## 3. SCHEDULE OF IDENTIFIED DEFECTS (${property.defects.length} Items)
${property.defects
  .map(
    (d, i) => `### Item ${i + 1}: ${d.title}
- Severity: ${d.severity} (${d.urgency})
- Location: ${d.location}
- Measurement: ${d.measurement}
- Australian Standard: ${d.asStandardRef}
- NCC 2022 Reference: ${d.nccCodeRef}
- Mandatory Remediation: ${d.remediationAction}
- Required Trades: ${d.tradesRequired.join(", ")}
- Estimated Rectification: $${d.costEstimateLow.toLocaleString()} - $${d.costEstimateHigh.toLocaleString()} AUD
`
  )
  .join("\n")}

## 4. TOTAL RECTIFICATION LIABILITY
Estimated Range: $${totalCostLow.toLocaleString()} AUD to $${totalCostHigh.toLocaleString()} AUD (Excl. 10% GST).

## 5. STATUTORY RECOMMENDATIONS
${aiAnalysis.overallConclusion}

Inspector Declaration:
I confirm that this inspection was conducted in accordance with AS 4349.1-2007 (Inspection of Buildings) without bias or vendor conflict of interest.
Signed: ${property.leadInspector} (${property.accreditation})
`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Building Inspection Report - ${property.refNumber}</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #0f172a; line-height: 1.5; }
h1 { color: #0284c7; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
h2 { color: #334155; margin-top: 24px; }
.badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; }
.badge-major { background: #ffe4e6; color: #e11d48; }
.badge-safety { background: #fee2e2; color: #dc2626; }
table { width: 100%; border-collapse: collapse; margin-top: 16px; }
th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; font-size: 13px; }
th { background: #f1f5f9; }
.footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
</style>
</head>
<body>
<h1>BuildInspect AI • Australian Building Condition Report</h1>
<p><strong>Reference:</strong> ${property.refNumber} | <strong>Date:</strong> ${property.inspectionDate} | <strong>Standard:</strong> ${property.inspectionStandard}</p>
<p><strong>Property:</strong> ${property.address}, ${property.suburb} ${property.state} (${property.propertyType})</p>
<p><strong>Client:</strong> ${property.clientName} | <strong>Surveyor:</strong> ${property.leadInspector}</p>

<h2>Executive Assessment</h2>
<p>${aiAnalysis.executiveSummary.replace(/\n/g, "<br>")}</p>

<h2>Defect Summary Table</h2>
<table>
<thead>
<tr>
<th>Item</th>
<th>Defect Category</th>
<th>Severity</th>
<th>Code Standard</th>
<th>Estimated Cost (AUD)</th>
</tr>
</thead>
<tbody>
${property.defects
  .map(
    (d) => `<tr>
<td>${d.title}</td>
<td>${d.category}</td>
<td><span class="badge ${d.severity === 'Major Defect' ? 'badge-major' : 'badge-safety'}">${d.severity}</span></td>
<td>${d.asStandardRef}</td>
<td>$${d.costEstimateLow.toLocaleString()} - $${d.costEstimateHigh.toLocaleString()}</td>
</tr>`
  )
  .join("")}
</tbody>
</table>

<h2>Conclusion & Recommendations</h2>
<p>${aiAnalysis.overallConclusion}</p>

<div class="footer">
<p>© 2026 BuildInspect AI Pty Ltd • Generated under AS 4349.1-2007 Guidelines • Reg #BS-8492</p>
</div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `AS4349-report-${property.refNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 sm:p-6 shadow-sm space-y-5">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
              2. Automated AS 4349.1 Compliance Report Studio
            </h2>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Automated synthesis of multi-photo vision tags into statutory Australian inspection documents.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Format Tabs */}
          <div className="flex items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-lg border border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => setActiveView("preview")}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeView === "preview"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Report Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveView("markdown")}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeView === "markdown"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Markdown
            </button>
            <button
              type="button"
              onClick={() => setActiveView("json")}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeView === "json"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              JSON
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownloadHtml}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] text-xs font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-panel-subtle)] cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download HTML</span>
          </button>

          <button
            type="button"
            onClick={onDispatchReport}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              isDispatched
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-xs"
            }`}
          >
            {isDispatched ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Dispatched to Client!</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>1-Click Dispatch Report</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* View 1: Formal AS 4349.1 Visual Report */}
      {activeView === "preview" && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Official Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-900 dark:border-slate-100 pb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Official Statutory Audit
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--color-text-primary)]">
                AUSTRALIAN BUILDING CONDITION REPORT
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] font-mono mt-0.5">
                Conforming to Australian Standard AS 4349.1-2007 (Inspection of Buildings)
              </p>
            </div>
            <div className="text-right text-xs font-mono">
              <div className="font-bold text-[var(--color-text-primary)]">
                Report #{property.refNumber}
              </div>
              <div className="text-[var(--color-text-muted)]">
                Inspected: {property.inspectionDate}
              </div>
              <div className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                AIBS Accredited
              </div>
            </div>
          </div>

          {/* Property & Inspector Details Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs">
            <div>
              <span className="text-[var(--color-text-muted)] font-semibold block">Property Asset:</span>
              <strong className="text-[var(--color-text-primary)] block mt-0.5">
                {property.address}, {property.suburb} {property.state}
              </strong>
              <span className="text-[var(--color-text-muted)]">{property.propertyType}</span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] font-semibold block">Client / Applicant:</span>
              <strong className="text-[var(--color-text-primary)] block mt-0.5">
                {property.clientName}
              </strong>
              <span className="text-[var(--color-text-muted)]">{property.clientEmail}</span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] font-semibold block">Lead Building Surveyor:</span>
              <strong className="text-[var(--color-text-primary)] block mt-0.5">
                {property.leadInspector}
              </strong>
              <span className="text-[var(--color-text-muted)]">{property.accreditation}</span>
            </div>
          </div>

          {/* Section 1: Executive Findings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-1.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              <span>1.0 Executive Findings & Compliance Index</span>
            </h4>
            <div className="p-4 rounded-xl bg-[var(--color-panel-subtle)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] leading-relaxed space-y-2">
              <p className="whitespace-pre-line">{aiAnalysis.executiveSummary}</p>
            </div>

            {/* Health Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Structural Reliability</span>
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                    {aiAnalysis.structuralHealthIndex}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full"
                    style={{ width: `${aiAnalysis.structuralHealthIndex}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Weatherproofing Integrity</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    {aiAnalysis.weatherproofingScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${aiAnalysis.weatherproofingScore}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span>Fire Separation Integrity</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {aiAnalysis.fireSafetyScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${aiAnalysis.fireSafetyScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Defect Schedule Table (table-fixed 100% standard) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] border-b border-[var(--color-border)] pb-1.5 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>2.0 Forensic Defect Schedule & Statutory Citations</span>
            </h4>

            <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
              <table className="table-fixed w-full min-w-[960px] text-xs text-left">
                <thead className="bg-[var(--color-panel-subtle)] border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-semibold">
                  <tr>
                    <th style={{ width: "22%" }} className="py-3 px-4">Defect Description</th>
                    <th style={{ width: "16%" }} className="py-3 px-3">Location</th>
                    <th style={{ width: "12%" }} className="py-3 px-3">Severity</th>
                    <th style={{ width: "18%" }} className="py-3 px-3">Standard / NCC Code</th>
                    <th style={{ width: "20%" }} className="py-3 px-3">Mandated Remediation</th>
                    <th style={{ width: "12%" }} className="py-3 px-4 text-right">Est. Cost (AUD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {property.defects.map((defect) => (
                    <tr key={defect.id} className="hover:bg-[var(--color-panel-subtle)]/60">
                      <td className="py-3 px-4">
                        <div className="font-bold text-[var(--color-text-primary)] truncate">
                          {defect.title}
                        </div>
                        <div className="text-[11px] text-[var(--color-text-muted)] truncate">
                          {defect.measurement}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-[var(--color-text-secondary)] truncate">
                        {defect.location}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold whitespace-nowrap shrink-0 ${
                            defect.severity === "Major Defect"
                              ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                              : defect.severity === "Safety Hazard"
                              ? "bg-red-600 text-white"
                              : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {defect.severity}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-mono text-[11px] text-[var(--color-text-primary)] truncate">
                          {defect.asStandardRef}
                        </div>
                        <div className="text-[10px] text-[var(--color-text-muted)] truncate">
                          {defect.nccCodeRef}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-[var(--color-text-secondary)] text-[11px] truncate">
                        {defect.remediationAction}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap shrink-0">
                        ${defect.costEstimateLow.toLocaleString()} - ${defect.costEstimateHigh.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-slate-900 text-white font-bold">
                    <td colSpan={5} className="py-3 px-4 text-right uppercase tracking-wider text-xs">
                      Total Projected Rectification Liability (Excl. GST):
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-emerald-400 whitespace-nowrap shrink-0">
                      ${totalCostLow.toLocaleString()} - ${totalCostHigh.toLocaleString()} AUD
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Statutory Conclusion */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-1.5 text-xs">
            <span className="font-bold text-amber-800 dark:text-amber-300 block">
              Statutory Recommendations & Cooling-Off Period Notice:
            </span>
            <p className="text-amber-900 dark:text-amber-200 leading-relaxed">
              {aiAnalysis.overallConclusion}
            </p>
          </div>
        </div>
      )}

      {/* View 2: Formatted Markdown Export */}
      {activeView === "markdown" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Markdown format conforming to AS 4349.1 clause structure
            </span>
            <button
              type="button"
              onClick={() => handleCopy(reportMarkdown, "md")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-medium hover:bg-[var(--color-panel-subtle)] cursor-pointer"
            >
              {copied === "md" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === "md" ? "Copied Markdown" : "Copy Markdown"}</span>
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed border border-slate-800">
            {reportMarkdown}
          </pre>
        </div>
      )}

      {/* View 3: JSON API Output */}
      {activeView === "json" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Raw REST API / Webhook Payload
            </span>
            <button
              type="button"
              onClick={() =>
                handleCopy(
                  JSON.stringify(
                    {
                      property,
                      aiAnalysis,
                      generatedAt: new Date().toISOString(),
                      complianceStandard: "AS 4349.1-2007"
                    },
                    null,
                    2
                  ),
                  "json"
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-medium hover:bg-[var(--color-panel-subtle)] cursor-pointer"
            >
              {copied === "json" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied === "json" ? "Copied JSON" : "Copy JSON Payload"}</span>
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed border border-slate-800">
            {JSON.stringify(
              {
                propertyId: property.id,
                refNumber: property.refNumber,
                jurisdiction: property.jurisdiction,
                riskScore: property.overallRiskScore,
                defects: property.defects,
                aiAnalysis,
                complianceCert: "AS-4349.1-VALIDATED"
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
