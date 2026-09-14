"use client";

import React from "react";
import {
  X,
  Layers,
  ShieldCheck,
  Database,
  Cloud,
  Cpu,
  Lock,
  Zap,
  CheckCircle2
} from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArchitectureModal({ isOpen, onClose }: ArchitectureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
                BuildInspect AI • Enterprise Architecture Blueprint
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Scalable Cloud Foundations, Multi-Tenant Security & Extensible AI Workflows
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-panel-subtle)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Pillars of Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1: Modular Micro-Kernel */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-600 dark:text-sky-400">
              <Cpu className="w-4 h-4" />
              <span>1. Extensible Plugin Micro-Kernel</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Core platform provides Authentication, Organization Tenancy, and Unified Reporting. All specialized inspection domains (Timber Pest, Drone Photogrammetry, Thermal FLIR, Trade Marketplace) are packaged as isolated plugins that register event hooks and extend JSONB data models without database migrations.
            </p>
          </div>

          {/* Pillar 2: Multi-Tenant Data Isolation */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <Database className="w-4 h-4" />
              <span>2. Multi-Tenant RBAC & Data Sovereignty</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Built on PostgreSQL with Row-Level Security (RLS). Strict isolation between enterprise inspection firms, strata managers, and client purchasers. Hosted in AWS Sydney (<code className="font-mono">ap-southeast-2</code>) satisfying Australian Privacy Principles (APP) and commercial data governance.
            </p>
          </div>

          {/* Pillar 3: Optical Storage Pipeline */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Cloud className="w-4 h-4" />
              <span>3. Large Media & Offline-First Sync</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Field surveyors routinely capture 100+ high-res 4K inspection photos in basements and subfloors with zero cell reception. The mobile/tablet PWA captures locally in IndexedDB/SQLite and background-uploads to Cloudflare R2 / S3 via pre-signed chunked URLs once reconnected.
            </p>
          </div>

          {/* Pillar 4: Dual-Provider AI Reliability */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
              <ShieldCheck className="w-4 h-4" />
              <span>4. Dual-Provider AI & Statutory Safety Fallback</span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Multi-modal defect classification runs primarily on OpenAI GPT-4o-mini with sub-second failover to Google Gemini 2.0 Flash. If both external APIs are unreachable, our local deterministic AS 4349.1 rules engine guarantees 100% uninterrupted field inspection sign-offs.
            </p>
          </div>
        </div>

        {/* Commercial Roadmap & IP Ownership */}
        <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs space-y-2 text-sky-900 dark:text-sky-200">
          <div className="font-bold flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-sky-600" />
            <span>Commercial IP Assignment & Confidentiality Guarantee:</span>
          </div>
          <p className="leading-relaxed">
            All code, database architectures, trained AI vision adapters, and documentation developed for this platform are 100% assigned as work-for-hire intellectual property directly to the client. Full willingness to sign Australian mutual Non-Disclosure Agreements (NDA) prior to detailed specification handover.
          </p>
        </div>

        {/* Footer Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-500 cursor-pointer transition-all"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
}
