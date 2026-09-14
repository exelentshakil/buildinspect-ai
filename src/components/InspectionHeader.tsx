"use client";

import React from "react";
import {
  Building2,
  MapPin,
  Calendar,
  UserCheck,
  AlertTriangle,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers
} from "lucide-react";
import { InspectionProperty } from "@/lib/types";

interface InspectionHeaderProps {
  properties: InspectionProperty[];
  selectedProperty: InspectionProperty;
  onSelectProperty: (property: InspectionProperty) => void;
  activeModuleCount: number;
}

export function InspectionHeader({
  properties,
  selectedProperty,
  onSelectProperty,
  activeModuleCount
}: InspectionHeaderProps) {
  const majorCount = selectedProperty.defects.filter((d) => d.severity === "Major Defect").length;
  const safetyCount = selectedProperty.defects.filter((d) => d.severity === "Safety Hazard").length;
  const totalCostLow = selectedProperty.defects.reduce((acc, d) => acc + d.costEstimateLow, 0);
  const totalCostHigh = selectedProperty.defects.reduce((acc, d) => acc + d.costEstimateHigh, 0);

  return (
    <section className="w-full bg-[var(--color-panel)] border-b border-[var(--color-border)] py-6 px-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Top Controls & Property Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap shrink-0">
                <AlertTriangle className="w-3 h-3 shrink-0" />
                Live Inspection Field Record • Ref #{selectedProperty.refNumber}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--color-text-muted)] font-mono">
                Jurisdiction: {selectedProperty.jurisdiction}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
              {selectedProperty.address}, {selectedProperty.suburb} {selectedProperty.state}
            </h1>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Client: <strong className="text-[var(--color-text-primary)]">{selectedProperty.clientName}</strong> • Lead Surveyor:{" "}
              <strong className="text-[var(--color-text-primary)]">{selectedProperty.leadInspector}</strong> ({selectedProperty.accreditation})
            </p>
          </div>

          {/* Quick Property Switcher Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] whitespace-nowrap shrink-0">
              Select Site:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {properties.map((prop) => (
                <button
                  key={prop.id}
                  type="button"
                  onClick={() => onSelectProperty(prop)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    prop.id === selectedProperty.id
                      ? "bg-sky-600 text-white shadow-xs"
                      : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]"
                  }`}
                >
                  <span>{prop.suburb} ({prop.propertyType.split(" ")[0]})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bento KPI Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* KPI 1: Risk Index */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
              <span>Overall Risk Index</span>
              <ShieldCheck className="w-4 h-4 text-sky-500" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                {selectedProperty.overallRiskScore}
                <span className="text-sm font-normal text-[var(--color-text-muted)]">/100</span>
              </div>
              <span className="inline-block mt-1 text-xs font-semibold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">
                {selectedProperty.overallRating}
              </span>
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">
              AS 4349.1 Structural Criteria
            </div>
          </div>

          {/* KPI 2: Defects Identified */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
              <span>Identified Defects</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                {selectedProperty.defects.length}
                <span className="text-xs font-normal text-[var(--color-text-muted)] ml-1">Items</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs">
                <span className="font-bold text-rose-600 dark:text-rose-400">{majorCount} Major</span>
                <span className="text-[var(--color-text-muted)]">•</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{safetyCount} Safety</span>
              </div>
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">
              Computer Vision & Forensic Audit
            </div>
          </div>

          {/* KPI 3: Rectification Liability */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
              <span>Rectification Liability</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="my-2">
              <div className="text-lg sm:text-xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                ${totalCostLow.toLocaleString()} - ${totalCostHigh.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                AUD (Excl. 10% GST)
              </div>
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">
              Rawkins / Cordell Australian Rates
            </div>
          </div>

          {/* KPI 4: Active Modules */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-semibold">
              <span>Platform Modules</span>
              <Layers className="w-4 h-4 text-sky-500" />
            </div>
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums tracking-tight text-[var(--color-text-primary)]">
                {activeModuleCount}
                <span className="text-xs font-normal text-[var(--color-text-muted)] ml-1">Active</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-sky-600 dark:text-sky-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Extensible Plugin Architecture</span>
              </div>
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">
              Zero-Downtime Micro-Kernel
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
