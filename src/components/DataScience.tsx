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
    <section id="datascience" className="py-20 sm:py-28 bg-[#f5f4f0] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-12 space-y-3">
          <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
            ANALYTICS & INTELLIGENCE MATRIX
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-tight">
            Enterprise Data Science & Storage Tiers
          </h2>
          <p className="text-cohere-subtle text-sm sm:text-base leading-relaxed">
            Delivering robust data engineering, automated visualization metrics, and deterministic predictive models structured for diverse organizational complexities.
          </p>
        </div>

        {/* Scalability Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {scales.map((s, idx) => {
            const isSelected = selectedTier === idx;
            return (
              <div 
                key={idx} 
                onClick={() => setSelectedTier(idx)}
                className={`p-7 rounded-2xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-white border-cohere-ink shadow-md -translate-y-0.5' 
                    : 'bg-white/70 border-black/[0.08] hover:border-black/[0.2]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-cohere-slate uppercase">TIER 0{idx + 1}</span>
                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cohere-ink text-white">
                      SELECTED
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-cohere-ink mb-1">{s.title}</h3>
                <div className="text-cohere-coral text-xs font-semibold mb-3">{s.target}</div>
                <p className="text-cohere-subtle text-xs leading-relaxed mb-4">{s.solution}</p>

                <div className="pt-3 border-t border-black/[0.06] space-y-1.5 text-[11px] font-mono">
                  <div className="flex justify-between text-cohere-slate">
                    <span>Throughput:</span>
                    <span className="text-cohere-ink font-semibold">{s.throughput}</span>
                  </div>
                  <div className="flex justify-between text-cohere-slate">
                    <span>Storage Stack:</span>
                    <span className="text-cohere-teal font-semibold">{s.storage.split('+')[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tier Deep-Dive Architecture Inspector */}
        <div className="bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-black/[0.06] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cohere-stone text-cohere-ink">
                <Database size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-cohere-ink">
                  {scales[selectedTier].title} Architecture Blueprint
                </h4>
                <div className="text-xs font-mono text-cohere-slate">
                  Configured Storage Stack: {scales[selectedTier].storage}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-cohere-stone text-cohere-ink">
                Latency: <strong className="text-cohere-teal">{scales[selectedTier].latency}</strong>
              </span>
              <span className="px-3 py-1 rounded-full bg-cohere-stone text-cohere-ink">
                Throughput: <strong className="text-cohere-coral">{scales[selectedTier].throughput}</strong>
              </span>
            </div>
          </div>

          <p className="text-xs text-cohere-subtle leading-relaxed">
            <strong className="text-cohere-ink">Optimal Target Applications: </strong>
            {scales[selectedTier].useCase}
          </p>
        </div>

      </div>
    </section>
  );
}
