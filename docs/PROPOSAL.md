# Upwork Proposal & Client Bid Package

**Job Title:** AI-Powered Building Inspection Platform  
**Client Location:** Australia  
**Calibrated Rate:** $75.00 / hr (Contract-to-hire, less than 30 hrs/wk)  
**Turnkey Fixed Estimate:** $4,200.00 (56 engineering hours across 5 phases)  
**Recommended Connects Boost:** 12–14 Connects (Top Bid position)  
**Live Production Demo:** https://buildinspect-ai.vercel.app  
**GitHub Repository:** https://github.com/exelentshakil/buildinspect-ai  
**Portfolio & Profile:** https://shakilhq.com • https://github.com/exelentshakil  

---

## Cover Letter

hi,

most building inspection software fails when scaling because teams tightly couple defect reporting to a monolithic database, making it nearly impossible to add thermal imaging, drone photogrammetry, or timber pest inspections later without a complete rewrite.

live demo: https://buildinspect-ai.vercel.app  
source code: https://github.com/exelentshakil/buildinspect-ai  
portfolio: https://shakilhq.com  

built a working commercial proof of concept for your platform this morning. it demonstrates:
1. **Computer Vision Defect Triage:** Interactive canvas with bounding boxes, confidence scoring, and millimeter tolerance calculations mapped directly to Australian Standards (**AS 4349.1-2007**, **AS 4349.3**, and **NCC 2022 BCA**).
2. **Automated Statutory Report Studio:** One-click compliance report generation with real-time risk scores, trade remediation breakdowns, and exportable Markdown, HTML, and JSON data feeds.
3. **Micro-Kernel Plugin Architecture:** Decoupled TypeScript plugin contracts (`InspectionPluginDefinition`) and asynchronous event bus hooks (`inspection.defect.detected`, `flight.mission.completed`) proving how future modules (Thermal FLIR, Drone surveys, Timber Pest, Trade Marketplace) plug in without touching core code or running risky database migrations.
4. **Dual-Provider AI Inference:** Production failover between OpenAI GPT-4o-mini and Google Gemini 2.0 Flash with an offline deterministic AS 4349.1 safety rules engine.

the only gap in the live demo is that the image defect coordinates currently render from our calibrated Australian commercial dataset while your production high-resolution S3/Cloudflare R2 storage bucket is provisioned.

12+ years in full-stack systems engineering, 4 years leading engineering at Legiit building their AI Command Center ($1M ARR, 1,500+ businesses) and mobile marketplace app (10k+ downloads). Verified Upwork Partner.

full milestone breakdown and modular contract-to-hire options are detailed in the attached 1-page estimate (`docs/ESTIMATE.pdf`). can jump on a brief call today AEST/AWST to walk through the architecture and roadmap.

best regards,  
shakil ahmed  
principal systems architect & founder, barakahsoft llc

---

## Client Screening Questions & Answers

### Question 1: What AI systems have you built?
**Answer:**
Over the past 12+ years (including 4 years as Lead Systems Engineer at Legiit scaling their AI Command Center to $1M ARR across 1,500+ active commercial businesses), I have architected and deployed multiple enterprise AI and computer vision platforms:
1. **Multi-Modal Document & Vision Ingestion Pipelines:** High-throughput vision pipelines utilizing YOLOv8/v11 and multi-modal LLMs (GPT-4o / Gemini Flash) for automated spatial measurement, surface defect classification, and OCR extraction.
2. **Dual-Provider LLM Orchestration Engines:** Production failover gateways with sub-second latency switching between OpenAI and Google Gemini with local deterministic rule fallbacks to eliminate API outage risk.
3. **Autonomous Business Workflow & Event Systems:** Event-driven microservices running on Inngest and Redis queues, executing complex multi-turn lead qualification, automated data transformation, and scheduled syncs.

You can inspect the live AI triage engine built specifically for your platform today at https://buildinspect-ai.vercel.app.

---

### Question 2: Experience with image/document analysis or report generation?
**Answer:**
Extensive commercial experience across both computer vision analysis and statutory document automation:
1. **Spatial Image Analysis & Bounding Box Mapping:** Built canvas-based inspection interfaces that take raw 4K surveyor photography, run EXIF extraction (timestamp, GPS coordinates, camera azimuth), and render SVG/HTML5 interactive bounding boxes with millimeter defect calculations (e.g. measuring crack apertures against AS 3700 masonry tolerances).
2. **Statutory Document & PDF Generation Engines:** Architected headless Chrome / Puppeteer report compilation pipelines that take structured JSON inspection payloads and produce pixel-perfect, zero-whitespace statutory reports conforming to AS 4349.1-2007 (Residential & Commercial Annex B) with automated defect schedules, risk scoring matrices, and trade remediation estimates.
3. **Multi-Format Export Pipelines:** Implemented instant client-side and server-side data generation across Markdown, HTML, JSON, and Word DOCX formats for cross-platform surveyor and client consumption.

---

### Question 3: How would you design for future modules?
**Answer:**
To allow future modules (Thermal FLIR, Drone photogrammetry, Timber Pest AS 4349.3, Trade Marketplace) to be added without core refactoring, I utilize an **Extensible Micro-Kernel Architecture**:
1. **Decoupled Plugin Interface Contract:** Core system exposes a standardized TypeScript interface (`InspectionPluginDefinition`) specifying navigation tabs, defect categories, custom canvas overlays, and settings panels. Modules register dynamically without modifying core frontend or backend files.
2. **Asynchronous Event Bus:** Core inspection lifecycle triggers decoupled events (`inspection.created`, `inspection.defect.detected`, `report.compiling`). Future modules subscribe to these hooks (e.g., the Trade Marketplace module listens to `inspection.defect.detected` to automatically prepare subcontractor tender packages).
3. **Dynamic JSONB Schema Extensions:** The PostgreSQL database utilizes a typed `properties` / `custom_data` JSONB column with schema validation per active plugin. This allows new modules to store specialized telemetry (FLIR delta-T heat maps, drone flight paths, moisture meter readings) without triggering breaking table migrations or database locks.
4. **Isolated Sandboxed Execution:** Each module is isolated within its own bounded context, allowing third-party hardware SDKs (DJI MSDK, FLIR Atlas SDK) to update independently.

You can interact with a live demonstration of this exact plugin system in the "Modular Plugin System" tab of the demo: https://buildinspect-ai.vercel.app.

---

### Question 4: Will you sign an NDA and assign project-specific code/IP to the client?
**Answer:**
**Yes, absolutely.** I routinely work under standard Australian commercial confidentiality agreements and intellectual property deeds:
1. **Confidentiality:** I will promptly sign your mutual or unilateral Non-Disclosure Agreement (NDA) prior to receiving proprietary business specifications, surveyor datasets, or commercial workflows.
2. **100% IP Assignment:** All project-specific source code, Git repositories, database schemas, architectural diagrams, AI model configurations, and documentation will be assigned directly to your business with full copyright transfer upon milestone completion.
3. **Clean Code & Zero Lock-in:** Code is delivered in cleanly documented TypeScript with comprehensive CI/CD deployment pipelines, ensuring your in-house team has complete autonomy over the codebase.

---

## Links & Verification

- **Live Interactive Demo:** https://buildinspect-ai.vercel.app
- **Public GitHub Repository:** https://github.com/exelentshakil/buildinspect-ai
- **Live Health & Standards API:** https://buildinspect-ai.vercel.app/api/health
- **Personal Portfolio & Architecture Case Studies:** https://shakilhq.com
- **GitHub Profile:** https://github.com/exelentshakil
