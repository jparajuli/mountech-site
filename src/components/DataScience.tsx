import React, { useState } from 'react';
import { Database } from 'lucide-react';

export default function DataScience() {
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const scales = [
    {
      title: 'Small Scale (SMB)',
      target: 'Rapid Insight Engines',
      solution: 'Custom lightweight dashboard telemetry metrics, automated ETL parsers, and data migration pipelines.',
      throughput: '5,000 events / sec',
      storage: 'PostgreSQL + DuckDB Local OLAP',
      latency: '< 25ms querying',
      useCase: 'Branch offices, retail point-of-sale aggregations, customer churn predictors.',
    },
    {
      title: 'Medium Scale',
      target: 'Strategic Aggregation',
      solution: 'Centralized database management architectures, predictive warehousing systems, and cross-department modeling.',
      throughput: '75,000 events / sec',
      storage: 'ClickHouse + Qdrant Vector Indices',
      latency: '< 12ms querying',
      useCase: 'Fintech payment ledgers, real-time logistics routing, automated operational analytics.',
    },
    {
      title: 'Large Scale Enterprise',
      target: 'Predictive Clusters',
      solution: 'High-throughput data modeling streams, automated multi-layered predictive engines, and high-frequency BI clusters.',
      throughput: '500,000+ events / sec',
      storage: 'Apache Iceberg + Distributed Spark + Triton',
      latency: '< 5ms streaming',
      useCase: 'Banking fraud detection, telecommunications traffic analytics, institutional registers.',
    },
  ];

  return (
    <section id="datascience" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0284C7] font-semibold">
            <span>Data Science &amp; Analytics</span>
            <span aria-hidden="true" className="text-[#94A3B8]">·</span>
            <span className="text-[#5A6D7E] font-normal">Architecture Matrix</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0F1E2E] tracking-tight">
            Enterprise Data Science &amp; Storage Tiers
          </h1>
          <p className="text-[#5A6D7E] text-base leading-relaxed">
            Delivering robust data engineering, automated analytics metrics, and deterministic predictive models structured for diverse institutional scales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {scales.map((s, idx) => {
            const isSelected = selectedTier === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedTier(idx)}
                className={`text-left p-7 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#0B1924] border-[#0B1924] text-white shadow-elevated'
                    : 'bg-white border-[#E2E8F0] hover:border-[#0284C7]/50 text-[#0F1E2E]'
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className={isSelected ? 'text-[#2EB6E0]' : 'text-[#5A6D7E]'}>
                    Tier 0{idx + 1}
                  </span>
                  {isSelected && (
                    <span className="font-semibold text-[#4ADE80]">Selected</span>
                  )}
                </div>

                <h3 className={`font-display text-lg font-bold mb-1 ${isSelected ? 'text-white' : 'text-[#0F1E2E]'}`}>
                  {s.title}
                </h3>
                <div className={`text-xs font-semibold mb-3 ${isSelected ? 'text-[#2EB6E0]' : 'text-[#15803D]'}`}>
                  {s.target}
                </div>
                <p className={`text-xs leading-relaxed mb-4 ${isSelected ? 'text-[#CBD5E1]' : 'text-[#5A6D7E]'}`}>
                  {s.solution}
                </p>

                <div className={`pt-3 border-t space-y-1.5 text-xs font-mono tabular-nums ${
                  isSelected ? 'border-white/10' : 'border-[#E2E8F0]'
                }`}>
                  <div className="flex justify-between">
                    <span className={isSelected ? 'text-[#94A3B8]' : 'text-[#5A6D7E]'}>Throughput</span>
                    <span className="font-semibold">{s.throughput}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isSelected ? 'text-[#94A3B8]' : 'text-[#5A6D7E]'}>Core Engine</span>
                    <span className={isSelected ? 'text-[#2EB6E0] font-semibold' : 'text-[#0284C7] font-semibold'}>
                      {s.storage.split('+')[0]}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 space-y-4 shadow-subtle">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#E2E8F0] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7]">
                <Database size={20} />
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-[#0F1E2E]">
                  {scales[selectedTier].title} Architecture Blueprint
                </h4>
                <div className="text-xs font-mono text-[#5A6D7E]">
                  Configured Storage Stack: {scales[selectedTier].storage}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#5A6D7E] tabular-nums">
              <span>
                Latency: <strong className="text-[#15803D]">{scales[selectedTier].latency}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Throughput: <strong className="text-[#0F1E2E]">{scales[selectedTier].throughput}</strong>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#5A6D7E] leading-relaxed">
            <strong className="text-[#0F1E2E]">Target Applications: </strong>
            {scales[selectedTier].useCase}
          </p>
        </div>
      </div>
    </section>
  );
}
