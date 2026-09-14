"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { InspectionHeader } from "@/components/InspectionHeader";
import { DefectVisionInspector } from "@/components/DefectVisionInspector";
import { ReportGeneratorStudio } from "@/components/ReportGeneratorStudio";
import { ModularArchitectureShowcase } from "@/components/ModularArchitectureShowcase";
import { ArchitectureModal } from "@/components/ArchitectureModal";
import { TechnicalSpecsFooter } from "@/components/TechnicalSpecsFooter";
import {
  SAMPLE_INSPECTION_PROPERTIES,
  AVAILABLE_PLUGIN_MODULES
} from "@/lib/constants";
import { InspectionProperty, PluginModule, AiAnalysisPayload } from "@/lib/types";
import { getDeterministicInspectionAnalysis } from "@/lib/ai";

export default function HomePage() {
  const [properties, setProperties] = useState<InspectionProperty[]>(
    SAMPLE_INSPECTION_PROPERTIES
  );
  const [selectedProperty, setSelectedProperty] = useState<InspectionProperty>(
    SAMPLE_INSPECTION_PROPERTIES[0]
  );
  const [modules, setModules] = useState<PluginModule[]>(AVAILABLE_PLUGIN_MODULES);
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysisPayload>(() =>
    getDeterministicInspectionAnalysis(SAMPLE_INSPECTION_PROPERTIES[0])
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  const handleSelectProperty = (property: InspectionProperty) => {
    setSelectedProperty(property);
    setAiAnalysis(getDeterministicInspectionAnalysis(property));
    setIsDispatched(false);
  };

  const handleToggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const handleRunAiAnalysis = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/ai/analyze-inspection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property: selectedProperty })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.analysis) {
          setAiAnalysis(data.analysis);
        }
      } else {
        setAiAnalysis(getDeterministicInspectionAnalysis(selectedProperty));
      }
    } catch {
      setAiAnalysis(getDeterministicInspectionAnalysis(selectedProperty));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDispatchReport = () => {
    setIsDispatched(true);
    setTimeout(() => {
      // Keep dispatched state confirmed
    }, 100);
  };

  const activeModuleCount = modules.filter((m) => m.enabled).length;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)} />

      {/* Header Banner & Property Selector */}
      <InspectionHeader
        properties={properties}
        selectedProperty={selectedProperty}
        onSelectProperty={handleSelectProperty}
        activeModuleCount={activeModuleCount}
      />

      {/* Main Operational Cockpit */}
      <main className="flex-1 w-full px-0 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section 1: Computer Vision & Bounding Box Defect Triage */}
          <DefectVisionInspector
            property={selectedProperty}
            onRunAiAnalysis={handleRunAiAnalysis}
            isAnalyzing={isAnalyzing}
            aiAnalysis={aiAnalysis}
          />

          {/* Section 2: Automated AS 4349.1 Compliance Report Studio */}
          <ReportGeneratorStudio
            property={selectedProperty}
            aiAnalysis={aiAnalysis}
            onDispatchReport={handleDispatchReport}
            isDispatched={isDispatched}
          />

          {/* Section 3: Modular Architecture & Plugin Extension Hub */}
          <ModularArchitectureShowcase
            modules={modules}
            onToggleModule={handleToggleModule}
          />
        </div>
      </main>

      <TechnicalSpecsFooter />

      {/* Architecture Deep-Dive Modal */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
}
