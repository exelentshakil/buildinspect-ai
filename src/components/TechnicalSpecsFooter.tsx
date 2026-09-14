"use client";

import React from "react";
import {
  ShieldCheck,
  Cpu,
  Database,
  Lock,
  FileCheck,
  Activity,
  Code
} from "lucide-react";

export function TechnicalSpecsFooter() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-panel)] py-10 px-0 mt-12 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              <span>Australian Standards Aligned</span>
            </div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Programmed against AS 4349.1-2007 (Residential & Commercial), AS 4349.3 (Timber Pest), AS 3600 (Concrete), AS 3700 (Masonry), and NCC 2022 Volume 1 & 2.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
              <Cpu className="w-4 h-4 text-indigo-500" />
              <span>Dual-Provider AI & Vision</span>
            </div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Primary multi-modal inference via OpenAI GPT-4o-mini with sub-second failover to Google Gemini 2.0 Flash and offline deterministic rules safety engine.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
              <Database className="w-4 h-4 text-emerald-500" />
              <span>Scalable Multi-Tenant RLS</span>
            </div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              PostgreSQL schema with strict tenant isolation, signed S3/R2 storage pipelines for 4K inspection photography, and offline-first surveyor local cache.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
              <Lock className="w-4 h-4 text-amber-500" />
              <span>100% Commercial IP Assignment</span>
            </div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Full readiness to execute mutual Australian Non-Disclosure Agreements (NDA) and complete intellectual property transfer upon project milestones.
            </p>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--color-text-primary)]">
              BuildInspect AI Platform
            </span>
            <span>•</span>
            <span>Engineered by Shakil Ahmed • BarakahSoft LLC</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/api/health"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1 font-mono"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>/api/health</span>
            </a>
            <a
              href="https://github.com/exelentshakil/buildinspect-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-text-primary)] transition-colors"
            >
              GitHub Source
            </a>
            <span className="font-mono">v2.4-PRODUCTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
