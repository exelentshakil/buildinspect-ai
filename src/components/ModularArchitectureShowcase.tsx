"use client";

import React, { useState } from "react";
import {
  Layers,
  Cpu,
  Code2,
  CheckCircle2,
  Flame,
  Bug,
  Plane,
  Wrench,
  TrendingUp,
  Eye,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database
} from "lucide-react";
import { PluginModule } from "@/lib/types";

interface ModularArchitectureShowcaseProps {
  modules: PluginModule[];
  onToggleModule: (id: string) => void;
}

export function ModularArchitectureShowcase({
  modules,
  onToggleModule
}: ModularArchitectureShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"modules" | "sdk" | "eventbus">("modules");

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "Eye":
        return <Eye className="w-5 h-5 text-sky-500" />;
      case "Bug":
        return <Bug className="w-5 h-5 text-amber-500" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-rose-500" />;
      case "Plane":
        return <Plane className="w-5 h-5 text-indigo-500" />;
      case "Wrench":
        return <Wrench className="w-5 h-5 text-emerald-500" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-purple-500" />;
      default:
        return <Layers className="w-5 h-5 text-sky-500" />;
    }
  };

  const pluginSdkCode = `// Core Plugin Interface: How future modules plug in without re-architecting
export interface InspectionPluginDefinition {
  id: string;
  name: string;
  version: string;
  category: "Vision" | "Sensors" | "Standards" | "Marketplace";
  
  // 1. Dynamic Schema Extensions (stored in JSONB without altering Core DB tables)
  schemaExtensions: Record<string, z.ZodTypeAny>;
  
  // 2. Lifecycle Event Hooks
  hooks: {
    onImageUploaded?: (event: ImageUploadEvent) => Promise<DefectTag[]>;
    onDefectDetected?: (defect: Defect) => Promise<RemediationEstimate>;
    onReportGenerating?: (context: ReportContext) => Promise<ReportSection>;
  };

  // 3. UI Component Injection Slots
  uiSlots: {
    fieldToolbar?: React.ComponentType<{ propertyId: string }>;
    reportSection?: React.ComponentType<{ report: InspectionReport }>;
  };
}

// Example: Registering FLIR Thermal Infrared Module in 1 line
export const FlirThermalPlugin: InspectionPluginDefinition = {
  id: "flir-thermal-ir",
  name: "FLIR Radiometric Wet Cavity Sensor",
  version: "1.5.0",
  category: "Sensors",
  schemaExtensions: {
    deltaTempKelvin: z.number(),
    moistureZoneConfirmed: z.boolean(),
  },
  hooks: {
    onImageUploaded: async (evt) => parseRadiometricFlir(evt.buffer),
  },
};`;

  const eventBusArchitecture = `// Asynchronous Event Bus (Inngest / Webhook Architecture)
// The core inspection engine remains lightweight and decoupled:

[Field Inspector App]
        │ (4K Photo Upload)
        ▼
[Core Ingestion API] ──► [PostgreSQL (Supabase Multi-Tenant RBAC)]
        │ (Emits "inspection.defect.tagged")
        ▼
┌────────────────────────────────────────────────────────┐
│            EVENT BUS (Decoupled Fan-Out)               │
├────────────────────────────────┬───────────────────────┤
│                                │                       │
▼                                ▼                       ▼
[AS 4349.1 Vision Worker]  [Thermal FLIR Sensor]  [Drone 3D Mesh]
(OpenAI + Gemini Fallback) (Radiometric Delta-T)  (Photogrammetry)
        │                                │                       │
        └────────────────┬───────────────┴───────────────────────┘
                         ▼
        [Unified Defect Schedule & Cost Engine]
                         ▼
        [1-Click AS 4349.1 PDF & Client Portal]`;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-5 sm:p-6 shadow-sm space-y-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
              3. Modular Architecture & Plugin Extension Hub
            </h2>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Designed for long-term scalability: Add new AI vision models, sensors, and trade integrations with zero core refactoring.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-[var(--color-panel-subtle)] p-1 rounded-lg border border-[var(--color-border)]">
          <button
            type="button"
            onClick={() => setActiveTab("modules")}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "modules"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            Active Modules
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sdk")}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "sdk"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            Plugin SDK Interface
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("eventbus")}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === "eventbus"
                ? "bg-sky-600 text-white shadow-xs"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            Event Bus Architecture
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Plugin Modules Grid */}
      {activeTab === "modules" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`rounded-xl border p-4 flex flex-col justify-between transition-all ${
                mod.enabled
                  ? "border-sky-500/40 bg-[var(--color-panel)] shadow-xs"
                  : "border-[var(--color-border)] bg-[var(--color-panel-subtle)] opacity-75"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)]">
                      {getModuleIcon(mod.iconName)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text-primary)]">
                        {mod.name}
                      </h4>
                      <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                        {mod.version} • {mod.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      mod.enabled
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-500/10 text-slate-500 border border-slate-500/20"
                    }`}
                  >
                    {mod.enabled ? "Active" : "Disabled"}
                  </span>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {mod.description}
                </p>

                {/* Event Hooks Supported */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Hooks:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {mod.eventHooks.map((h) => (
                      <span
                        key={h}
                        className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--color-panel-subtle)] text-[var(--color-text-muted)] border border-[var(--color-border)]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Toggle Switch */}
              <div className="pt-3 mt-3 border-t border-[var(--color-border)] flex items-center justify-between">
                <span className="text-xs text-[var(--color-text-muted)]">
                  {mod.enabled ? "Mounted in Pipeline" : "Standby (1-Click Mount)"}
                </span>
                <button
                  type="button"
                  onClick={() => onToggleModule(mod.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    mod.enabled
                      ? "bg-slate-200 dark:bg-slate-800 text-[var(--color-text-secondary)] hover:bg-rose-500 hover:text-white"
                      : "bg-sky-600 text-white hover:bg-sky-500"
                  }`}
                >
                  {mod.enabled ? "Deactivate" : "Mount Plugin"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: TypeScript Plugin SDK Definition */}
      {activeTab === "sdk" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>src/lib/plugins/types.ts — Standardized Plugin Contract</span>
            <span>TypeScript 5.7 Strict Mode</span>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 text-sky-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 max-h-[450px]">
            {pluginSdkCode}
          </pre>
        </div>
      )}

      {/* Tab 3: Decoupled Event Bus Diagram */}
      {activeTab === "eventbus" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>High-Throughput Asynchronous Architecture (Inngest / Webhook Fan-Out)</span>
            <span>Zero Blocking on Field App</span>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 max-h-[450px]">
            {eventBusArchitecture}
          </pre>
        </div>
      )}
    </div>
  );
}
