import React, { useState } from 'react';
import { DisasterLayer, BasinSensorData } from '../types';
import { 
  Waves, Radio, AlertTriangle, ShieldAlert, Cpu, 
  Satellite, BellRing, ChevronRight, Activity, Zap, Play, RotateCcw
} from 'lucide-react';

const LAYERS: DisasterLayer[] = [
  {
    layer: 1,
    layerCode: 'L1-INGEST',
    title: 'Multi-Modal Data Ingestion Fabric',
    category: 'Edge & Remote Sensing',
    summary: 'High-frequency telemetry aggregation from terrestrial hydrology sensors, radar satellites, and national weather stations.',
    dataSources: [
      'Nepal Department of Hydrology & Meteorology (DHM) API & telemetry stream',
      'Terrestrial IoT ultrasonic river water level sensors with solar backup',
      'ESA Sentinel-1/2 & NASA GPM constellation synthetic aperture radar for soil saturation',
      'Local meteorological radar rainfall estimation & mountain gauge telemetry'
    ],
    modelsAndTech: [
      'Apache Kafka & MQTT Edge Ingestion',
      'Geospatial Raster Vectorization Engine',
      'Low-Power LoRaWAN & Satellite Uplink Fallbacks'
    ],
    outputArtifact: 'Unified 10-second Geospatial Hydrological Tensor Grid',
    operationalStatus: 'Active Continuous'
  },
  {
    layer: 2,
    layerCode: 'L2-PREDICT',
    title: 'Predictive Physics-Informed AI Engine',
    category: 'Spatio-Temporal Deep Learning',
    summary: 'Neural hydrodynamic simulation forecasting river surges up to 6 hours ahead and mapping dynamic landslide vulnerability.',
    dataSources: [
      'Layer 1 Unified Hydro Tensor Stream',
      'SRTM High-Resolution Digital Elevation Model (DEM) of Nepal Himalayas',
      'Historic 40-year Monsoon Flood Inundation & Debris Flow Database',
      'Real-time soil shear stress and pore-water pressure indices'
    ],
    modelsAndTech: [
      'Temporal Graph Convolutional Networks (T-GCN)',
      'Physics-Informed Neural Networks (PINNs) for Saint-Venant hydraulic flow',
      'Multi-task Landslide Susceptibility XGBoost + Vision Transformer'
    ],
    outputArtifact: 'Probabilistic 6-Hour Inundation Maps & Surge Horizon Curves',
    operationalStatus: 'Predictive Mesh'
  },
  {
    layer: 3,
    layerCode: 'L3-DISPATCH',
    title: 'Automated Early Warning Autonomous Agents',
    category: 'Edge Dispatch & Multi-Channel Alerting',
    summary: 'Autonomous decision agents that trigger localized evacuations, automated phone calls in Nepali, and acoustic siren networks.',
    dataSources: [
      'Layer 2 Surge Probability Matrix (> 85% confidence threshold)',
      'Municipal Geo-fenced Population & Vulnerability Demographics',
      'Telecommunication Tower Cell ID coverage mappings (NTC / Ncell)'
    ],
    modelsAndTech: [
      'Devanagari Neural Text-to-Speech (TTS) for Automated Voice IVR Calls',
      'Cell Broadcast Emergency Alert Protocol (CAP-v1.2 compliant)',
      'Automated District Emergency Operation Center (DEOC) Agent Dashboards'
    ],
    outputArtifact: 'Instant Localized Evacuation Warnings (< 30 sec from threshold cross)',
    operationalStatus: 'Multi-Channel Standby'
  }
];

const INITIAL_BASINS: BasinSensorData[] = [
  {
    station: 'Chatara Hydrology Post',
    riverBasin: 'Sapta Koshi Basin',
    currentLevelM: 5.4,
    warningLevelM: 6.0,
    dangerLevelM: 7.5,
    trend: 'Stable',
    riskScore: 32,
    lastReading: '2 mins ago'
  },
  {
    station: 'Devghat Confluence Post',
    riverBasin: 'Narayani / Trishuli Basin',
    currentLevelM: 6.8,
    warningLevelM: 7.3,
    dangerLevelM: 8.4,
    trend: 'Rising',
    riskScore: 58,
    lastReading: 'Just now'
  },
  {
    station: 'Chisapani Gorge Post',
    riverBasin: 'Karnali River Basin',
    currentLevelM: 8.2,
    warningLevelM: 10.0,
    dangerLevelM: 11.5,
    trend: 'Stable',
    riskScore: 24,
    lastReading: '4 mins ago'
  },
  {
    station: 'Helambu / Melamchi Gauge',
    riverBasin: 'Melamchi Debris Flow Basin',
    currentLevelM: 3.9,
    warningLevelM: 4.2,
    dangerLevelM: 5.0,
    trend: 'Stable',
    riskScore: 44,
    lastReading: '1 min ago'
  }
];

export default function DisasterFramework() {
  const [activeLayer, setActiveLayer] = useState<number>(2);
  const [basins, setBasins] = useState<BasinSensorData[]>(INITIAL_BASINS);
  const [simulatingCloudburst, setSimulatingCloudburst] = useState<boolean>(false);
  const [alertTriggered, setAlertTriggered] = useState<boolean>(false);

  const handleSimulateSurge = () => {
    setSimulatingCloudburst(true);
    setAlertTriggered(false);

    setTimeout(() => {
      setBasins(prev => prev.map(b => {
        if (b.riverBasin.includes('Narayani')) {
          return {
            ...b,
            currentLevelM: 7.6, // crosses warning level
            trend: 'Rising',
            riskScore: 89,
            lastReading: 'Live Cloudburst Spike'
          };
        }
        if (b.riverBasin.includes('Melamchi')) {
          return {
            ...b,
            currentLevelM: 4.4, // crosses warning level
            trend: 'Rising',
            riskScore: 82,
            lastReading: 'Live Cloudburst Spike'
          };
        }
        return b;
      }));
      setAlertTriggered(true);
      setSimulatingCloudburst(false);
    }, 600);
  };

  const handleResetTelemetry = () => {
    setBasins(INITIAL_BASINS);
    setAlertTriggered(false);
  };

  return (
    <section 
      id="disaster-framework"
      aria-label="AI Disaster Management Framework"
      className="py-20 sm:py-28 bg-[#10141d] text-white border-b border-white/10 relative overflow-hidden"
    >
      {/* Visual background ambient light */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-cohere-coral/[0.08] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cohere-teal/[0.08] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-16">
        
        {/* Section Header */}
        <header className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-cohere-teal">
            <Radio size={12} className="animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-white">
              NATIONAL RESILIENCE BLUEPRINT
            </span>
            <span className="text-white/30">•</span>
            <span>Applied AI for Geological Safety</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            AI Disaster Management Framework: 3-Layer Architecture
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed">
            Himalayan terrain demands sub-hour prediction accuracy. Our 3-layer architecture integrates sensor telemetry, physics-guided deep learning, and multi-channel autonomous alert dispatch to safeguard vulnerable communities across Nepal.
          </p>
        </header>

        {/* ── 3-LAYER ARCHITECTURE BREAKDOWN ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Layer Selection & Deep Dive */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">
              Select Architecture Layer to Inspect:
            </div>

            {/* Layer Cards / Accordion */}
            <div className="space-y-3">
              {LAYERS.map((layer) => {
                const isActive = activeLayer === layer.layer;

                return (
                  <article
                    key={layer.layer}
                    onClick={() => setActiveLayer(layer.layer)}
                    className={`cursor-pointer rounded-xl p-5 sm:p-6 border transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/10 border-cohere-coral shadow-lg' 
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          isActive ? 'bg-cohere-coral text-white' : 'bg-white/10 text-white/70'
                        }`}>
                          {layer.layer}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-cohere-teal tracking-widest block">
                            {layer.layerCode} • {layer.category}
                          </span>
                          <h3 className="font-display text-base sm:text-lg font-bold text-white">
                            {layer.title}
                          </h3>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        layer.operationalStatus.includes('Active') 
                          ? 'bg-cohere-teal/20 text-cohere-teal' 
                          : layer.operationalStatus.includes('Predictive') 
                          ? 'bg-cohere-coral/20 text-cohere-coral' 
                          : 'bg-white/10 text-white/80'
                      }`}>
                        {layer.operationalStatus}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-white/75 mt-3 leading-relaxed">
                      {layer.summary}
                    </p>

                    {/* Detailed view for active layer */}
                    {isActive && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-in fade-in duration-200">
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                            Primary Ingest / Inbound Signals:
                          </span>
                          <ul className="space-y-1 text-xs text-white/90">
                            {layer.dataSources.map((ds, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-cohere-coral font-bold">•</span>
                                <span>{ds}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-1">
                            Algorithms & Frameworks:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {layer.modelsAndTech.map((tech, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-white/80">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-2.5 rounded bg-black/40 border border-white/5 text-xs font-mono flex items-center justify-between">
                          <span className="text-white/40">Verified Output:</span>
                          <span className="text-cohere-teal font-semibold">{layer.outputArtifact}</span>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Basin Telemetry Simulator */}
          <div className="lg:col-span-5 bg-[#0a0d14] rounded-2xl p-5 sm:p-6 border border-white/10 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cohere-coral block">
                  LIVE TELEMETRY TESTBED
                </span>
                <h4 className="font-display text-sm font-bold text-white">
                  Nepal Major River Basins (Simulated Feed)
                </h4>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cohere-teal animate-ping" />
                <span className="text-[10px] font-mono text-cohere-teal">LIVE LINK</span>
              </div>
            </div>

            {/* Basin list */}
            <div className="space-y-2.5">
              {basins.map((basin) => {
                const isWarning = basin.currentLevelM >= basin.warningLevelM;
                const isDanger = basin.currentLevelM >= basin.dangerLevelM;

                return (
                  <div 
                    key={basin.station}
                    className={`p-3 rounded-xl border transition-all ${
                      isDanger 
                        ? 'bg-red-950/40 border-red-500/60 text-red-200' 
                        : isWarning 
                        ? 'bg-amber-950/40 border-amber-500/60 text-amber-200' 
                        : 'bg-white/5 border-white/5 text-white/90'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-white">{basin.riverBasin}</span>
                      <span className="text-[10px] text-white/50">{basin.station}</span>
                    </div>

                    <div className="flex items-baseline justify-between my-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-mono font-extrabold text-white">
                          {basin.currentLevelM.toFixed(1)}m
                        </span>
                        <span className="text-[10px] font-mono text-white/50">
                          (Warning: {basin.warningLevelM}m | Danger: {basin.dangerLevelM}m)
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isWarning ? 'bg-cohere-coral text-white animate-pulse' : 'bg-white/10 text-white/70'
                      }`}>
                        {basin.trend} • Risk {basin.riskScore}%
                      </span>
                    </div>

                    {/* Gauge Visual Bar */}
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          isWarning ? 'bg-cohere-coral' : 'bg-cohere-teal'
                        }`}
                        style={{ width: `${Math.min(100, (basin.currentLevelM / basin.dangerLevelM) * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Early Warning Trigger Alert */}
            {alertTriggered && (
              <div className="p-3.5 rounded-xl bg-cohere-coral/20 border border-cohere-coral text-xs text-white space-y-2 animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 font-bold font-mono text-cohere-coral">
                  <AlertTriangle size={14} className="animate-bounce" />
                  <span>LAYER 3 AGENT DISPATCH ACTIVATED:</span>
                </div>
                <p className="text-white/90 leading-snug">
                  Surge threshold exceeded at <strong>Devghat & Melamchi</strong>. Automated Devanagari voice IVR dispatches queued for 4,200 riverside residents via local cell towers.
                </p>
                <div className="text-[10px] font-mono text-white/60">
                  Broadcast Protocol: CAP-v1.2 XML • Gateway Response: 1.4s
                </div>
              </div>
            )}

            {/* Simulation Controls */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleSimulateSurge}
                disabled={simulatingCloudburst}
                className="flex-1 rounded-lg py-2.5 px-3 text-xs font-mono font-semibold bg-cohere-coral hover:bg-[#ff6340] text-white transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
              >
                <Play size={12} className={simulatingCloudburst ? 'animate-spin' : ''} />
                <span>{simulatingCloudburst ? 'Computing Hydro Surge...' : 'Simulate Monsoon Cloudburst'}</span>
              </button>

              <button
                onClick={handleResetTelemetry}
                className="rounded-lg p-2.5 bg-white/10 hover:bg-white/15 text-white transition-colors"
                title="Reset Telemetry Baseline"
              >
                <RotateCcw size={14} />
              </button>
            </div>

          </div>

        </div>

        {/* Technical Cooperation Footnote */}
        <footer className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cohere-teal" />
            <span>Open standard integration: Compatible with Common Alerting Protocol (CAP) and DHM sensor networks.</span>
          </div>
          <div>
            Disaster Analytics Enclave: Version 3.4.1-NP
          </div>
        </footer>

      </div>
    </section>
  );
}
