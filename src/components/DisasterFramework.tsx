import React, { useState } from 'react';
import { DisasterLayer, BasinSensorData } from '../types';
import { AlertTriangle, Play, RotateCcw } from 'lucide-react';

const LAYERS: DisasterLayer[] = [
  {
    layer: 1,
    layerCode: 'L1-INGEST',
    title: 'Multi-Modal Data Ingestion Fabric',
    category: 'Edge & Remote Sensing',
    summary: 'High-frequency telemetry aggregation from terrestrial hydrology sensors, radar satellites, and meteorological gauges.',
    dataSources: [
      'Nepal Department of Hydrology & Meteorology (DHM) telemetry formats',
      'Terrestrial IoT ultrasonic river water level sensors with solar backup',
      'ESA Sentinel-1/2 & NASA GPM synthetic aperture radar for soil saturation',
      'Local meteorological rainfall estimation & mountain gauge telemetry',
    ],
    modelsAndTech: [
      'Apache Kafka & MQTT Edge Ingestion',
      'Geospatial Raster Vectorization Engine',
      'Low-Power LoRaWAN & Satellite Uplinks',
    ],
    outputArtifact: 'Unified 10-second Geospatial Hydrological Tensor Grid',
    operationalStatus: 'Active Continuous',
  },
  {
    layer: 2,
    layerCode: 'L2-PREDICT',
    title: 'Predictive Physics-Informed AI Engine',
    category: 'Spatio-Temporal Deep Learning',
    summary: 'Neural hydrodynamic simulation forecasting river surges up to 6 hours ahead and mapping landslide susceptibility.',
    dataSources: [
      'Layer 1 Unified Hydro Tensor Stream',
      'SRTM High-Resolution Digital Elevation Model (DEM) of Nepal Himalayas',
      'Historical Monsoon Flood Inundation & Debris Flow Datasets',
      'Real-time soil shear stress and pore-water pressure indices',
    ],
    modelsAndTech: [
      'Temporal Graph Convolutional Networks (T-GCN)',
      'Physics-Informed Neural Networks (PINNs) for Saint-Venant flow',
      'Multi-task Landslide Susceptibility XGBoost + Vision Transformer',
    ],
    outputArtifact: 'Probabilistic 6-Hour Inundation Maps & Surge Horizon Curves',
    operationalStatus: 'Predictive Mesh',
  },
  {
    layer: 3,
    layerCode: 'L3-DISPATCH',
    title: 'Automated Early Warning Dispatch Agents',
    category: 'Edge Dispatch & Multi-Channel Alerting',
    summary: 'Decision agents structured to trigger localized warnings, automated Nepali voice calls, and CAP-compliant municipal alerts.',
    dataSources: [
      'Layer 2 Surge Probability Matrix (> 85% confidence threshold)',
      'Municipal Geo-fenced Vulnerability Mappings',
      'Telecommunication Cell Broadcast Coverage Zones',
    ],
    modelsAndTech: [
      'Devanagari Neural Text-to-Speech (TTS) for Automated Voice Calls',
      'Common Alerting Protocol (CAP-v1.2 compliant)',
      'Emergency Operation Center Agent Dashboards',
    ],
    outputArtifact: 'Localized Evacuation Warnings (< 30 sec from threshold cross)',
    operationalStatus: 'Multi-Channel Standby',
  },
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
    lastReading: 'Baseline',
  },
  {
    station: 'Devghat Confluence Post',
    riverBasin: 'Narayani / Trishuli Basin',
    currentLevelM: 6.8,
    warningLevelM: 7.3,
    dangerLevelM: 8.4,
    trend: 'Rising',
    riskScore: 58,
    lastReading: 'Baseline',
  },
  {
    station: 'Chisapani Gorge Post',
    riverBasin: 'Karnali River Basin',
    currentLevelM: 8.2,
    warningLevelM: 10.0,
    dangerLevelM: 11.5,
    trend: 'Stable',
    riskScore: 24,
    lastReading: 'Baseline',
  },
  {
    station: 'Helambu / Melamchi Gauge',
    riverBasin: 'Melamchi Debris Flow Basin',
    currentLevelM: 3.9,
    warningLevelM: 4.2,
    dangerLevelM: 5.0,
    trend: 'Stable',
    riskScore: 44,
    lastReading: 'Baseline',
  },
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
      setBasins((prev) =>
        prev.map((b) => {
          if (b.riverBasin.includes('Narayani')) {
            return {
              ...b,
              currentLevelM: 7.6,
              trend: 'Rising',
              riskScore: 89,
              lastReading: 'Simulated Surge',
            };
          }
          if (b.riverBasin.includes('Melamchi')) {
            return {
              ...b,
              currentLevelM: 4.4,
              trend: 'Rising',
              riskScore: 82,
              lastReading: 'Simulated Surge',
            };
          }
          return b;
        })
      );
      setAlertTriggered(true);
      setSimulatingCloudburst(false);
    }, 550);
  };

  const handleResetTelemetry = () => {
    setBasins(INITIAL_BASINS);
    setAlertTriggered(false);
  };

  return (
    <section
      id="disaster-framework"
      aria-label="AI Disaster Management Framework"
      className="py-16 sm:py-20 bg-[#101828] text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-12">
        <header className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#22D3EE]">
            <span>Applied AI for Geological Safety</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-[#94A3B8]">3-Layer Architecture</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Disaster Management Framework
          </h2>

          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
            Himalayan terrain demands sub-hour prediction accuracy. Our 3-layer architecture combines sensor telemetry, physics-guided deep learning, and CAP-compliant alert workflows.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Layer Selection */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono text-[#94A3B8] mb-2">
              Select Architecture Layer to Inspect
            </div>

            {LAYERS.map((layer) => {
              const isActive = activeLayer === layer.layer;
              return (
                <article
                  key={layer.layer}
                  onClick={() => setActiveLayer(layer.layer)}
                  className={`cursor-pointer rounded-xl p-5 sm:p-6 border transition-all duration-200 ${
                    isActive
                      ? 'bg-[#182235] border-[#2563EB] shadow-elevated'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold tabular-nums ${
                          isActive ? 'bg-[#2563EB] text-white' : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {layer.layer}
                      </span>
                      <div>
                        <span className="text-[11px] font-mono text-[#22D3EE] block">
                          {layer.layerCode} · {layer.category}
                        </span>
                        <h3 className="font-display text-base sm:text-lg font-bold text-white">
                          {layer.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-[#94A3B8]">
                      {layer.operationalStatus}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#CBD5E1] mt-3 leading-relaxed">
                    {layer.summary}
                  </p>

                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                      <div>
                        <span className="text-[11px] font-mono text-[#94A3B8] block mb-1">
                          Primary Ingest &amp; Signals
                        </span>
                        <ul className="space-y-1 text-xs text-white/90">
                          {layer.dataSources.map((ds, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#22D3EE] font-bold">·</span>
                              <span>{ds}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-[11px] font-mono text-[#94A3B8] block mb-1">
                          Models &amp; Frameworks
                        </span>
                        <div className="text-xs font-mono text-[#CBD5E1]">
                          {layer.modelsAndTech.join(' · ')}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#0B1120] border border-white/10 text-xs font-mono flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[#94A3B8]">Output Artifact:</span>
                        <span className="text-[#22D3EE] font-semibold">{layer.outputArtifact}</span>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Hydrological Surge Simulation Console */}
          <div className="lg:col-span-5 bg-[#0B1120] rounded-2xl p-5 sm:p-6 border border-white/10 space-y-5">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[11px] font-mono text-[#22D3EE] block">
                Interactive Basin Simulation
              </span>
              <h4 className="font-display text-sm font-bold text-white mt-0.5">
                Nepal River Basin Threshold Model
              </h4>
            </div>

            <div className="space-y-2.5">
              {basins.map((basin) => {
                const isWarning = basin.currentLevelM >= basin.warningLevelM;
                const isDanger = basin.currentLevelM >= basin.dangerLevelM;

                return (
                  <div
                    key={basin.station}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isDanger
                        ? 'bg-rose-950/40 border-rose-500/60 text-rose-100'
                        : isWarning
                        ? 'bg-amber-950/40 border-amber-500/60 text-amber-100'
                        : 'bg-white/[0.04] border-white/10 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-white">{basin.riverBasin}</span>
                      <span className="text-[11px] text-[#94A3B8]">{basin.station}</span>
                    </div>

                    <div className="flex items-baseline justify-between my-1 tabular-nums">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-mono font-extrabold text-white">
                          {basin.currentLevelM.toFixed(1)}m
                        </span>
                        <span className="text-[11px] font-mono text-[#94A3B8]">
                          Warn {basin.warningLevelM}m · Danger {basin.dangerLevelM}m
                        </span>
                      </div>

                      <span
                        className={`text-[11px] font-mono font-semibold ${
                          isWarning ? 'text-amber-300' : 'text-[#22D3EE]'
                        }`}
                      >
                        {basin.trend} · {basin.riskScore}%
                      </span>
                    </div>

                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isWarning ? 'bg-amber-400' : 'bg-[#22D3EE]'
                        }`}
                        style={{
                          width: `${Math.min(100, (basin.currentLevelM / basin.dangerLevelM) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {alertTriggered && (
              <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-400/50 text-xs text-white space-y-1.5">
                <div className="flex items-center gap-2 font-bold font-mono text-amber-300">
                  <AlertTriangle size={14} />
                  <span>Layer 3 Dispatch Simulation Triggered</span>
                </div>
                <p className="text-[#E2E8F0] leading-snug">
                  Simulated surge threshold exceeded at <strong>Devghat &amp; Melamchi</strong>. CAP-v1.2 XML alert package and Devanagari voice broadcast workflow ready.
                </p>
              </div>
            )}

            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={handleSimulateSurge}
                disabled={simulatingCloudburst}
                className="flex-1 rounded-lg py-2.5 px-3 text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Play size={12} className={simulatingCloudburst ? 'animate-spin' : ''} />
                <span>
                  {simulatingCloudburst ? 'Computing Surge Model...' : 'Simulate Cloudburst Surge'}
                </span>
              </button>

              {alertTriggered && (
                <button
                  type="button"
                  onClick={handleResetTelemetry}
                  className="rounded-lg p-2.5 bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Reset Baseline Model"
                  aria-label="Reset Baseline Model"
                >
                  <RotateCcw size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        <footer className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <span>
            Open standard integration aligned with Common Alerting Protocol (CAP-v1.2) and DHM hydrology workflows.
          </span>
          <span>MounTech Applied Geospatial AI</span>
        </footer>
      </div>
    </section>
  );
}
