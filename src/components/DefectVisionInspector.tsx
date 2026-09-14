"use client";

import React, { useState } from "react";
import {
  Eye,
  AlertTriangle,
  ShieldAlert,
  Crosshair,
  Wrench,
  DollarSign,
  BookOpen,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Maximize2,
  Cpu,
  Layers
} from "lucide-react";
import { InspectionDefect, InspectionProperty, AiAnalysisPayload } from "@/lib/types";

interface DefectVisionInspectorProps {
  property: InspectionProperty;
  onRunAiAnalysis: () => Promise<void>;
  isAnalyzing: boolean;
  aiAnalysis: AiAnalysisPayload | null;
}

export function DefectVisionInspector({
  property,
  onRunAiAnalysis,
  isAnalyzing,
  aiAnalysis
}: DefectVisionInspectorProps) {
  const [selectedDefectId, setSelectedDefectId] = useState<string>(
    property.defects[0]?.id || ""
  );

  const currentDefect =
    property.defects.find((d) => d.id === selectedDefectId) || property.defects[0];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Major Defect":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30";
      case "Safety Hazard":
        return "bg-red-600 text-white font-bold animate-pulse";
      case "Minor Defect":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      default:
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30";
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 sm:p-6 shadow-sm space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
              1. Computer Vision Defect Detection & Bounding Box Analysis
            </h2>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Multi-modal vision analysis trained on AS 4349.1 defect taxonomies and Australian NCC tolerances.
          </p>
        </div>

        {/* Live AI Trigger Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onRunAiAnalysis}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white shadow-sm transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running Dual AI Vision Scan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Trigger Live AI Defect Scan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Vision Workspace: Canvas & Inspector Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Photo Canvas with Interactive Bounding Box (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden border border-[var(--color-border)] bg-slate-950 shadow-inner group">
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentDefect.imageUrl}
              alt={currentDefect.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1548346835-0345c02743f2?auto=format&fit=crop&w=1200&q=80";
              }}
            />

            {/* Simulated Bounding Box Overlay */}
            <div
              style={{
                left: `${currentDefect.boundingBox.x}%`,
                top: `${currentDefect.boundingBox.y}%`,
                width: `${currentDefect.boundingBox.width}%`,
                height: `${currentDefect.boundingBox.height}%`
              }}
              className="absolute border-2 border-rose-500 bg-rose-500/20 backdrop-blur-[1px] transition-all rounded-sm shadow-[0_0_15px_rgba(244,63,94,0.5)] flex flex-col justify-between p-1.5"
            >
              {/* Top Tag */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 bg-rose-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded shadow-xs tracking-wider">
                  <Crosshair className="w-2.5 h-2.5" />
                  {currentDefect.boundingBox.label}
                </span>
                <span className="bg-black/80 text-emerald-400 text-[11px] font-mono px-1.5 py-0.5 rounded">
                  {(currentDefect.boundingBox.confidence * 100).toFixed(1)}% Match
                </span>
              </div>

              {/* Bottom Tag */}
              <div className="bg-black/80 text-white text-[11px] font-mono px-1.5 py-0.5 rounded self-start truncate max-w-full">
                {currentDefect.measurement}
              </div>
            </div>

            {/* Canvas HUD Status Bar */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between p-2 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>4K Optical Ingest • Latency: 180ms</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">
                AS 4349.1 Appendix C Verified
              </span>
            </div>
          </div>

          {/* Defect Selector Carousel Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {property.defects.map((d, index) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDefectId(d.id)}
                className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer shrink-0 w-64 ${
                  d.id === currentDefect.id
                    ? "border-sky-500 bg-[var(--color-brand-subtle)] shadow-xs"
                    : "border-[var(--color-border)] hover:bg-[var(--color-panel-subtle)]"
                }`}
              >
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.imageUrl}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[var(--color-border)]"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1548346835-0345c02743f2?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                      Item #{index + 1}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                        d.severity === "Major Defect"
                          ? "bg-rose-500/20 text-rose-600 dark:text-rose-400"
                          : d.severity === "Safety Hazard"
                          ? "bg-red-600 text-white"
                          : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {d.severity.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">
                    {d.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Defect Specification & Compliance Card (5 Columns) */}
        <div className="lg:col-span-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Header / Severity Badge */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${getSeverityBadge(
                  currentDefect.severity
                )}`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {currentDefect.severity}
              </span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                {currentDefect.urgency}
              </span>
            </div>

            {/* Defect Title & Location */}
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)] leading-snug">
                {currentDefect.title}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                <strong>Location:</strong> {currentDefect.location}
              </p>
            </div>

            {/* Metric & Measurement */}
            <div className="p-3 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                Forensic Laser Measurement
              </span>
              <div className="text-xs font-mono font-bold text-[var(--color-text-primary)]">
                {currentDefect.measurement}
              </div>
            </div>

            {/* Standards & Code Compliance Reference */}
            <div className="p-3 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Statutory Code & Standard Citation</span>
              </div>
              <div className="text-xs text-[var(--color-text-primary)] font-medium">
                <strong>Australian Standard:</strong> {currentDefect.asStandardRef}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] font-mono">
                <strong>National Construction Code:</strong> {currentDefect.nccCodeRef}
              </div>
            </div>

            {/* Prescriptive Remediation Action */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs font-bold text-[var(--color-text-secondary)]">
                <Wrench className="w-3.5 h-3.5 text-amber-500" />
                <span>Mandated Remedial Action:</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {currentDefect.remediationAction}
              </p>
            </div>

            {/* Required Licensed Trades */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-[var(--color-text-muted)]">Trades:</span>
              {currentDefect.tradesRequired.map((trade) => (
                <span
                  key={trade}
                  className="px-2 py-0.5 rounded bg-[var(--color-panel)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-medium"
                >
                  {trade}
                </span>
              ))}
            </div>
          </div>

          {/* Cost Liability Footer */}
          <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
            <div>
              <span className="text-xs text-[var(--color-text-muted)] font-semibold block">
                Estimated Trade Cost
              </span>
              <span className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                ${currentDefect.costEstimateLow.toLocaleString()} - ${currentDefect.costEstimateHigh.toLocaleString()} AUD
              </span>
            </div>
            <div className="text-right text-xs text-[var(--color-text-muted)]">
              <span>Confidence: {(currentDefect.boundingBox.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
