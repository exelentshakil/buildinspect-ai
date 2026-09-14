"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  ShieldCheck,
  Building2,
  Cpu,
  Sun,
  Moon,
  Layers,
  Activity,
  FileCheck
} from "lucide-react";

interface NavbarProps {
  onOpenArchitectureModal: () => void;
}

export function Navbar({ onOpenArchitectureModal }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-panel)]/90 backdrop-blur-md px-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand & Platform Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-sm font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-[var(--color-text-primary)]">
                  BuildInspect <span className="text-sky-500 font-extrabold">AI</span>
                </span>
                <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs font-semibold text-sky-600 dark:text-sky-400 whitespace-nowrap shrink-0">
                  AU Commercial Platform
                </span>
              </div>
              <span className="text-xs text-[var(--color-text-muted)] truncate hidden sm:inline">
                AS 4349.1 / AS 4349.3 Standards • NCC 2022 BCA Engine • Modular Vision Core
              </span>
            </div>
          </div>

          {/* Header Badges & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Standards Compliance Chip */}
            <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="whitespace-nowrap">AS 4349.1 & NCC 2022 Aligned</span>
            </div>

            {/* Architecture Modal Trigger */}
            <button
              type="button"
              onClick={onOpenArchitectureModal}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-1.5 text-xs font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] transition-colors shadow-2xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <Layers className="w-3.5 h-3.5 text-sky-500" />
              <span className="hidden sm:inline">Modular Architecture</span>
              <span className="sm:hidden">Arch</span>
            </button>

            {/* Health Endpoint Link */}
            <a
              href="/api/health"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors whitespace-nowrap shrink-0"
            >
              <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
              <span>API Health</span>
            </a>

            {/* GitHub Repo */}
            <a
              href="https://github.com/exelentshakil/buildinspect-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] transition-colors"
              title="GitHub Repository"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* Theme Toggle */}
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] transition-colors cursor-pointer"
                title="Toggle Dark/Light Mode"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
