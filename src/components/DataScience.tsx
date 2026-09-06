import React, { useState } from 'react';
import { 
  BarChart3, Database, Sliders, Activity, Server, 
  ArrowRight, CheckCircle2, Zap, Layers, Cpu
} from 'lucide-react';

export default function DataScience() {
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const scales = [
    { 
      title: "Small Scale (SMB)", 
      target: "Rapid Insight Engines", 
      solution: "Custom lightweight dashboard telemetry metrics, automated ETL parsers, and data migration pipelines.",
      throughput: "5,000 events / sec",
      storage: "PostgreSQL + DuckDB Local OLAP",
      latency: "< 25ms querying",
      useCase: "Branch offices, retail point-of-sale aggregations, customer churn predictors."
    },
    { 
      title: "Medium Scale", 
      target: "Strategic Aggregation", 
      solution: "Centralized database management architectures, predictive warehousing systems, and cross-department modeling.",
      throughput: "75,000 events / sec",
      storage: "ClickHouse + Qdrant Vector Indices",
      latency: "< 12ms querying",
      useCase: "Fintech payment ledgers, real-time logistics routing, automated marketing attribution."
    },
    { 
      title: "Large Scale Enterprise", 
      target: "Predictive Clusters", 
      solution: "High-throughput data modeling streams, automated multi-layered predictive engines, and high-frequency BI clusters.",
      throughput: "500,000+ events / sec",
      storage: "Apache Iceberg + Distributed Spark + Triton",
      latency: "< 5ms streaming",
      useCase: "Banking fraud detection, telecommunications traffic analytics, sovereign government registers."
    }
  ];

  return (
    <section id="datascience" className="py-20 sm:py-28 bg-surface/80 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs text-green uppercase tracking-wider">
            ANALYTICS & CORE INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Enterprise Data Science Matrix
          </h2>
          <p className="text-text-sub text-sm sm:text-base leading-relaxed">
            Delivering robust data engineering, automated visualization metrics, and deterministic predictive models structured for diverse organizational complexities.
          </p>
        </div>

        {/* Scalability Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {scales.map((s, idx) => {
            const isSelected = selectedTier === idx;
            return (
              <div 
                key={idx} 
                onClick={() => setSelectedTier(idx)}
                className={`p-6 sm:p-7 rounded-2xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-card border-green shadow-xl shadow-green/10 -translate-y-1' 
                    : 'bg-card/60 border-white/8 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-text-muted uppercase">SCALE FACTOR 0{idx + 1}</span>
                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-green/15 text-green border border-green/30">
                      SELECTED
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                <div className="text-accent text-xs font-semibold mb-3">{s.target}</div>
                <p className="text-text-sub text-xs leading-relaxed mb-4">{s.solution}</p>

                <div className="pt-3 border-t border-white/5 space-y-1.5 text-[11px] font-mono">
                  <div className="flex justify-between text-text-muted">
                    <span>Throughput:</span>
                    <span className="text-white font-semibold">{s.throughput}</span>
                  </div>
                  <div className="flex justify-between text-text-muted">
                    <span>Engine Stack:</span>
                    <span className="text-green">{s.storage.split('+')[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tier Deep-Dive Architecture Inspector */}
        <div className="bg-black/50 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green/10 text-green border border-green/20">
                <Database size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  {scales[selectedTier].title} Architecture Blueprint
                </h4>
                <div className="text-xs font-mono text-text-muted">
                  Configured Storage Stack: {scales[selectedTier].storage}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-surface border border-white/10 text-white">
                Latency: <strong className="text-green">{scales[selectedTier].latency}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-surface border border-white/10 text-white">
                Capacity: <strong className="text-accent">{scales[selectedTier].throughput}</strong>
              </span>
            </div>
          </div>

          <p className="text-xs text-text-sub leading-relaxed">
            <strong className="text-white">Optimal Use Cases: </strong>
            {scales[selectedTier].useCase}
          </p>
        </div>

        {/* End-to-End Core Framework Feature Banner */}
        <div className="mt-8 bg-card/90 border border-green/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders size={20} className="text-green" />
              <span>End-to-End ML & BI Systems Support</span>
            </h3>
            <p className="text-text-sub text-xs sm:text-sm leading-relaxed">
              We construct everything from data ingestion layers and validation pipelines up to localized deployment frameworks and rich Business Intelligence arrays.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="p-3.5 rounded-xl bg-surface border border-white/10 text-center flex-1 sm:flex-initial">
              <Database size={20} className="text-accent mx-auto mb-1" />
              <div className="text-xs font-bold text-white">Robust MLOps</div>
              <div className="text-[10px] text-text-muted font-mono">DVC & MLflow</div>
            </div>
            <div className="p-3.5 rounded-xl bg-surface border border-white/10 text-center flex-1 sm:flex-initial">
              <BarChart3 size={20} className="text-accent2 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">Live BI Hubs</div>
              <div className="text-[10px] text-text-muted font-mono">Sub-second Sync</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
