import { InspectionProperty, PluginModule } from "./types";

export const SAMPLE_INSPECTION_PROPERTIES: InspectionProperty[] = [
  {
    id: "prop_barangaroo_42",
    refNumber: "INSP-NSW-2026-8492",
    address: "Lot 42, 18-24 Barangaroo Ave",
    suburb: "Sydney",
    state: "NSW",
    propertyType: "Commercial High-Rise",
    jurisdiction: "NSW (Fair Trading)",
    inspectionStandard: "AS 4349.1-2007 (Commercial Annex B) & NCC 2022",
    clientName: "Lendlease Commercial Property Trust",
    clientEmail: "facilities@lendlease-trust.com.au",
    leadInspector: "David Callinan",
    accreditation: "Chartered Building Surveyor • AIBS #BS-8492 • Fair Trading NSW #BD-19284",
    inspectionDate: "2026-09-14",
    status: "Defects Triaged",
    overallRiskScore: 68,
    overallRating: "Substantial Defect Burden",
    defects: [
      {
        id: "def_01_spalling",
        title: "Basement B2 Concrete Spalling & Exposed Oxidized Rebar",
        category: "Concrete Spalling & Rebar Corrosion",
        severity: "Major Defect",
        location: "Basement Level B2, Grid Reference C4 Transfer Beam",
        imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
        boundingBox: {
          x: 22,
          y: 28,
          width: 52,
          height: 46,
          label: "Concrete Delamination & Rebar Pitting",
          confidence: 0.984
        },
        measurement: "Delamination area 0.85m²; active corrosion carbonation depth >35mm",
        asStandardRef: "AS 3600:2018 Cl 4.3 & AS 4349.1 Cl 3.3.2 (Structural Adequacy)",
        nccCodeRef: "NCC 2022 Vol 1 B1P1 (Structural Resistance)",
        remediationAction: "Break back compromised concrete to sound substrate, abrasive blast rebar to Class 2.5, apply zinc-rich protective coating, and reconstruct with high-strength structural polymer mortar.",
        tradesRequired: ["Structural Remedial Specialist", "Cathodic Protection Engineer"],
        costEstimateLow: 14500,
        costEstimateHigh: 22000,
        urgency: "Immediate (0-7 Days)"
      },
      {
        id: "def_02_roof_flashing",
        title: "Level 28 Parapet Flashing Failure & Membrane Ingress",
        category: "Roof Plumbing & Flashing",
        severity: "Major Defect",
        location: "Level 28 Plant Room North Parapet Capping",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1200&q=80",
        boundingBox: {
          x: 18,
          y: 35,
          width: 64,
          height: 40,
          label: "Flashing Lap Disjoint & Sealant UV Degradation",
          confidence: 0.962
        },
        measurement: "12.4 linear metres of unbonded Colorbond capping with visible pooling",
        asStandardRef: "AS/NZS 3500.3 (Plumbing & Drainage: Stormwater) & AS 4654.2",
        nccCodeRef: "NCC 2022 Vol 1 F3P1 (Weatherproofing)",
        remediationAction: "Remove failing non-compliant silicone sealants, re-profile parapet falls to minimum 1:40, install compliant expansion joints, and mechanically fasten 0.55mm BMT zinc-aluminium capping.",
        tradesRequired: ["Licensed Roof Plumber (NSW Fair Trading)", "Waterproofing Certifier"],
        costEstimateLow: 8800,
        costEstimateHigh: 13500,
        urgency: "Priority (14-30 Days)"
      },
      {
        id: "def_03_fire_collar",
        title: "Unsealed Electrical Cable Bundles Penetrating 2hr Fire Wall",
        category: "Fire Safety Separation",
        severity: "Safety Hazard",
        location: "Level 14 Communications Riser Shaft",
        imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        boundingBox: {
          x: 30,
          y: 20,
          width: 44,
          height: 55,
          label: "Breached Fire Stopping Barrier",
          confidence: 0.991
        },
        measurement: "Open annular gap: 140mm x 90mm with zero intumescent sealant",
        asStandardRef: "AS 1530.4 & AS 4072.1 (Components for the Protection of Openings in Fire-Resisting Separating Elements)",
        nccCodeRef: "NCC 2022 Vol 1 C3P1 (Fire Separation & Resistance)",
        remediationAction: "Install certified tested intumescent fire pillows, high-density mineral wool backing, and apply fire-rated intumescent acrylic mastic with registered installation identification tag.",
        tradesRequired: ["Accredited Passive Fire Protection Installer"],
        costEstimateLow: 2400,
        costEstimateHigh: 4200,
        urgency: "Immediate (0-7 Days)"
      }
    ]
  },
  {
    id: "prop_manly_87",
    refNumber: "INSP-NSW-2026-7201",
    address: "87 Ocean Parade",
    suburb: "Manly",
    state: "NSW",
    propertyType: "Residential Strata",
    jurisdiction: "NSW (Fair Trading)",
    inspectionStandard: "AS 4349.1-2007 (Pre-Purchase Residential Inspection)",
    clientName: "Oceanview Strata Plan #94820",
    clientEmail: "secretary@oceanviewmanly-strata.com.au",
    leadInspector: "Gemma Thornton",
    accreditation: "Registered Building Surveyor • Master Builders Australia #9941",
    inspectionDate: "2026-09-12",
    status: "Report Drafted",
    overallRiskScore: 74,
    overallRating: "Substantial Defect Burden",
    defects: [
      {
        id: "def_04_balcony_efflorescence",
        title: "Balcony Cantilever Efflorescence & Waterproofing Failure",
        category: "Rising Damp & Waterproofing",
        severity: "Major Defect",
        location: "Units 4A & 4B Ocean-Facing Cantilever Balconies",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        boundingBox: {
          x: 25,
          y: 42,
          width: 50,
          height: 45,
          label: "Sub-Tile Efflorescence & Salt Leaching",
          confidence: 0.978
        },
        measurement: "Moisture meter reading: 99.8% saturation; salt crystallization across 4.2m edge",
        asStandardRef: "AS 4654.2:2012 (Waterproofing Membranes for External Above-Ground Use)",
        nccCodeRef: "NCC 2022 Vol 2 H2P2 (Weatherproofing of Balconies)",
        remediationAction: "Strip existing tiles and bedding down to concrete slab, evaluate concrete sound integrity, install liquid polyurethane membrane with 100mm upstands, and reinstate vitrified slip-resistant tiles.",
        tradesRequired: ["Licensed Waterproofer", "Strata Tiler"],
        costEstimateLow: 18500,
        costEstimateHigh: 28000,
        urgency: "Priority (14-30 Days)"
      },
      {
        id: "def_05_brick_crack",
        title: "Cavity Masonry Stepped Crack & Foundation Subsidence",
        category: "Structural Foundation",
        severity: "Major Defect",
        location: "Southern External Return Wall",
        imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80",
        boundingBox: {
          x: 35,
          y: 22,
          width: 38,
          height: 60,
          label: "Diagonal Shear Crack >5mm",
          confidence: 0.989
        },
        measurement: "Maximum crack aperture: 6.2mm at foundation level tapering to 2.1mm at first floor lintel",
        asStandardRef: "AS 2870 (Residential Slabs and Footings) & AS 4349.1 Appendix C",
        nccCodeRef: "NCC 2022 Vol 2 H1P1 (Structural Foundation Performance)",
        remediationAction: "Engage geotechnical engineer to verify soil moisture stability, install Helifix stainless steel helical tie bars with thixotropic grout across fracture zones, and stitch repair brick mortar joints.",
        tradesRequired: ["Structural Engineer", "Remedial Brickwork Mason"],
        costEstimateLow: 12000,
        costEstimateHigh: 19500,
        urgency: "Priority (14-30 Days)"
      }
    ]
  },
  {
    id: "prop_carlton_14",
    refNumber: "INSP-VIC-2026-6190",
    address: "14 Federation Way",
    suburb: "Carlton",
    state: "VIC",
    propertyType: "Heritage Terrace",
    jurisdiction: "VIC (VBA)",
    inspectionStandard: "AS 4349.1 & Heritage Victoria Guidelines",
    clientName: "Julian & Clare Sterling",
    clientEmail: "julian.sterling@sterling-holdings.com.au",
    leadInspector: "Lachlan Ross",
    accreditation: "VBA Registered Building Practitioner #DP-AD-4921",
    inspectionDate: "2026-09-10",
    status: "In Progress",
    overallRiskScore: 52,
    overallRating: "Moderate Risk",
    defects: [
      {
        id: "def_06_rising_damp",
        title: "Heritage Lime Mortar Rising Damp & Salt Fretting",
        category: "Rising Damp & Waterproofing",
        severity: "Major Defect",
        location: "Ground Floor Hallway & Front Parlour North Wall",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        boundingBox: {
          x: 20,
          y: 50,
          width: 60,
          height: 38,
          label: "Moisture Tide Line & Plaster Spalling",
          confidence: 0.955
        },
        measurement: "Tide mark elevated to 850mm above finished floor level; 82% relative moisture",
        asStandardRef: "AS 4349.1 Cl 3.3.4 & Heritage Victoria Technical Note 03",
        nccCodeRef: "NCC 2022 Vol 2 H2P3 (Damp-proofing)",
        remediationAction: "Inject silane/siloxane damp-proof course (DPC) emulsion, strip contaminated salt-laden gypsum render, allow breathable drying cycle, and replaster with hydraulic lime.",
        tradesRequired: ["Heritage Damp Proofing Specialist", "Traditional Solid Plasterer"],
        costEstimateLow: 7500,
        costEstimateHigh: 12000,
        urgency: "Priority (14-30 Days)"
      }
    ]
  }
];

export const AVAILABLE_PLUGIN_MODULES: PluginModule[] = [
  {
    id: "mod_core_vision",
    slug: "vision-structural-core",
    name: "AS 4349.1 Visual & Structural Core",
    version: "v2.4.1",
    category: "Vision & Sensors",
    status: "active",
    description: "Core AI computer vision engine executing automated crack measurement, concrete spalling segmentation, and AS 4349.1 classification.",
    iconName: "Eye",
    author: "BuildInspect Core Team",
    eventHooks: ["inspection.image.uploaded", "defect.detected", "report.drafted"],
    schemaFields: ["boundingBox", "crackWidthMm", "asStandardClause", "confidenceScore"],
    enabled: true
  },
  {
    id: "mod_timber_pest",
    slug: "timber-pest-as4349-3",
    name: "AS 4349.3 Timber Pest & Termite Radar",
    version: "v1.8.0",
    category: "Compliance & Standards",
    status: "installed",
    description: "Subterranean termite hazard risk calculation, Termatrac radar sensor integration, and timber moisture gradient analysis.",
    iconName: "Bug",
    author: "Australian Pest Managers Partner Hub",
    eventHooks: ["subfloor.scanned", "timber.pest.alert", "termite.barrier.verified"],
    schemaFields: ["termiteSpecies", "moistureLevelPercent", "barrierExpiryDate", "termiteHazardIndex"],
    enabled: true
  },
  {
    id: "mod_thermal_flir",
    slug: "flir-thermal-infrared",
    name: "FLIR Thermal Infrared & Wet Cavity Sensor",
    version: "v1.5.2",
    category: "Vision & Sensors",
    status: "installed",
    description: "Ingests radiometric FLIR images to diagnose concealed moisture leaks, missing insulation batts, and thermal bridges behind plasterboard.",
    iconName: "Flame",
    author: "Thermal Vision Systems AU",
    eventHooks: ["thermal.image.ingested", "cold.bridge.flagged", "water.ingress.mapped"],
    schemaFields: ["deltaTempKelvin", "emissivityValue", "concealedMoistureConfirmed"],
    enabled: true
  },
  {
    id: "mod_drone_photogrammetry",
    slug: "drone-roof-photogrammetry",
    name: "DJI / Autel Drone Roof Photogrammetry",
    version: "v2.1.0",
    category: "Vision & Sensors",
    status: "installed",
    description: "High-altitude multi-rotor 4K orthomosaic stitching. Automatically identifies cracked ridge caps, broken terracotta tiles, and rusted box gutters.",
    iconName: "Plane",
    author: "AeroInspect Australia",
    eventHooks: ["flight.mission.completed", "orthomosaic.rendered", "roof.tile.defect.tagged"],
    schemaFields: ["flightAltitudeMeters", "gpsCoordinates", "roofPitchDegrees", "tileDefectCount"],
    enabled: true
  },
  {
    id: "mod_tradie_marketplace",
    slug: "tradie-tender-marketplace",
    name: "Subcontractor & Tradie Tender Marketplace",
    version: "v1.2.0",
    category: "Tender & Marketplace",
    status: "available",
    description: "Connects verified Australian trades (NSW Fair Trading / QBCC / VBA licensed) directly to the defect schedule for instant competitive tenders.",
    iconName: "Wrench",
    author: "TradieLink Commercial AU",
    eventHooks: ["defect.triage.completed", "quote.requested", "tender.awarded"],
    schemaFields: ["tradeLicenseNumber", "tenderPriceAud", "availabilityWindowDays"],
    enabled: false
  },
  {
    id: "mod_strata_capital_works",
    slug: "strata-capital-works-forecast",
    name: "Strata 10-Year Capital Works Sinking Fund",
    version: "v1.0.4",
    category: "Reporting & Exports",
    status: "available",
    description: "Calculates statutory 10-year maintenance sinking fund allocations according to the Strata Schemes Management Act 2015 (NSW) & VIC equivalent.",
    iconName: "TrendingUp",
    author: "Strata Intelligence AU",
    eventHooks: ["report.finalized", "depreciation.modeled", "sinking.fund.forecasted"],
    schemaFields: ["annualLevyImpactAud", "replacementCycleYears", "reserveBalanceGap"],
    enabled: false
  }
];

export const AUSTRALIAN_STANDARDS_CODE_CATALOG = [
  {
    code: "AS 4349.1-2007",
    title: "Inspection of Buildings: Pre-purchase Inspections — Residential Buildings",
    clause: "Clause 3.3.2",
    clauseName: "Major Defects (Loss of Utility / Structural Integrity)"
  },
  {
    code: "AS 4349.3-2010",
    title: "Inspection of Buildings: Timber Pest Inspections",
    clause: "Clause 2.4",
    clauseName: "Subterranean Termite Evidence & Conducive Conditions"
  },
  {
    code: "AS 3700:2018",
    title: "Masonry Structures",
    clause: "Clause 8.2",
    clauseName: "Permissible Crack Width Limits (<2.0mm Serviceability)"
  },
  {
    code: "AS 3600:2018",
    title: "Concrete Structures",
    clause: "Clause 4.3",
    clauseName: "Durability Requirements & Concrete Cover to Reinforcement"
  },
  {
    code: "AS 4654.2:2012",
    title: "Waterproofing Membranes for External Above-Ground Use",
    clause: "Clause 2.8",
    clauseName: "Upstand Heights & Terminations for Balconies and Roof Terraces"
  },
  {
    code: "NCC 2022 Vol 1 & 2",
    title: "National Construction Code (Building Code of Australia)",
    clause: "Part H2P1 / B1P1",
    clauseName: "Structural Reliability & Weatherproofing Compliance"
  }
];
