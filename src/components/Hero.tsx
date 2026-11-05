import React, { useState } from 'react';
import { 
  ArrowRight, Database, Cpu, GraduationCap, 
  CheckCircle2, ArrowUpRight, BarChart3, Users, BookOpen
} from 'lucide-react';

interface HeroProps {
  setRoute?: (route: { page: string; courseId: string; aiTab?: 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel' }) => void;
}

export default function Hero({ setRoute }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'academy' | 'datascience' | 'ai'>('academy');

  return (
    <section className="relative overflow-hidden bg-cohere-canvas pt-12 pb-16 sm:pt-18 sm:pb-24 border-b border-black/[0.06]">
      {/* Subtle Cohere Grid & Background Atmosphere */}
      <div className="absolute inset-0 cohere-grid-bg opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cohere-coral/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── MONUMENTAL EDITORIAL HERO STATEMENT ── */}
        <div className="max-w-4xl space-y-5">
          
          {/* Subtle Unboxed Kicker Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cohere-slate">
            <span className="font-semibold text-cohere-ink uppercase tracking-wider">MounTech Solution</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2018 in Kathmandu</span>
            <span aria-hidden="true">·</span>
            <span className="text-cohere-coral font-semibold">Promoting AI Solutions & Capacity Building</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-cohere-ink tracking-[-0.04em] leading-[1.06] text-balance">
            Applied AI, Data Science & Technical Education for Nepal.
          </h1>

          {/* Core Mandate Body Text */}
          <p className="text-base sm:text-lg text-cohere-subtle max-w-2xl font-normal leading-relaxed">
            Bridging the gap between global AI advancements and local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.
          </p>

          {/* Conversion Funnel CTA Paths */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="cta-mountech-academy"
              onClick={() => setRoute?.({ page: 'school', courseId: 'ai-agents' })}
              className="rounded-full px-6 py-3 text-sm font-semibold bg-cohere-ink hover:bg-black text-white shadow-md shadow-black/10 transition-all flex items-center gap-2 group active:scale-95 whitespace-nowrap"
            >
              <GraduationCap size={16} />
              <span>Explore Mountech Academy</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="cta-enterprise-consulting"
              onClick={() => setRoute?.({ page: 'consulting', courseId: 'ai-agents' })}
              className="rounded-full px-6 py-3 text-sm font-semibold bg-white hover:bg-cohere-stone text-cohere-ink border border-black/[0.1] transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <span>Enterprise Consulting</span>
              <ArrowUpRight size={14} className="text-cohere-slate" />
            </button>

            <button
              onClick={() => setRoute?.({ page: 'ai', courseId: 'ai-agents', aiTab: 'overview' })}
              className="px-4 py-3 text-xs font-mono text-cohere-slate hover:text-cohere-ink flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Cpu size={14} className="text-cohere-coral" />
              <span>AI Tools & Initiatives</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

        </div>

        {/* ── LIGHTWEIGHT INTERACTIVE CAPABILITY SPOTLIGHT ── */}
        <div className="mt-12 rounded-2xl bg-white border border-black/[0.08] shadow-sm overflow-hidden">
          
          {/* Segmented Tab Bar */}
          <div className="px-4 sm:px-6 py-3 border-b border-black/[0.06] bg-[#f8f7f4] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('academy')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'academy'
                    ? 'bg-white text-cohere-ink font-semibold shadow-sm'
                    : 'text-cohere-slate hover:text-cohere-ink'
                }`}
              >
                <GraduationCap size={14} className="text-cohere-teal" />
                <span>Mountech Academy (40h)</span>
              </button>

              <button
                onClick={() => setActiveTab('datascience')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'datascience'
                    ? 'bg-white text-cohere-ink font-semibold shadow-sm'
                    : 'text-cohere-slate hover:text-cohere-ink'
                }`}
              >
                <BarChart3 size={14} className="text-[#38bdf8]" />
                <span>Enterprise Data Science</span>
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'ai'
                    ? 'bg-white text-cohere-ink font-semibold shadow-sm'
                    : 'text-cohere-slate hover:text-cohere-ink'
                }`}
              >
                <Cpu size={14} className="text-cohere-coral" />
                <span>AI Solutions & Tools</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-cohere-slate hidden sm:inline">
              Core Strategic Offerings
            </span>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8">
            {activeTab === 'academy' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="text-[10px] font-mono text-cohere-teal font-bold uppercase tracking-wider">
                    APPLIED TECHNICAL EDUCATION
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-cohere-ink">
                    40-Hour Intensive Engineering Masterclasses
                  </h3>
                  <p className="text-xs sm:text-sm text-cohere-subtle leading-relaxed">
                    Designed by systems engineers to bridge global AI advancements with local production code. Cohorts gain practical mastery in building multi-agent systems, fine-tuning transformer models, and architecting zero-trust cloud infrastructure.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-cohere-ink/80">
                    <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-black/[0.04]">
                      ✓ Small Mentored Cohorts
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-black/[0.04]">
                      ✓ Production Capstones
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-black/[0.04]">
                      ✓ MLDSN Verified Credentials
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 p-5 rounded-xl bg-[#f8f7f4] border border-black/[0.06] space-y-3 text-center sm:text-left">
                  <div className="text-xs font-mono text-cohere-slate">CURRENT STATUS</div>
                  <div className="text-base font-bold text-cohere-ink">Admissions Active</div>
                  <p className="text-[11px] text-cohere-subtle leading-relaxed">
                    Explore upcoming intakes for Agentic Systems and Generative Transformers.
                  </p>
                  <button
                    onClick={() => setRoute?.({ page: 'school', courseId: 'ai-agents' })}
                    className="w-full py-2.5 px-4 rounded-lg bg-cohere-ink hover:bg-black text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Academy Syllabus</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'datascience' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="text-[10px] font-mono text-[#0284c7] font-bold uppercase tracking-wider">
                    SCALABLE DATA ENGINEERING
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-cohere-ink">
                    Enterprise Data Science & Storage Tiers
                  </h3>
                  <p className="text-xs sm:text-sm text-cohere-subtle leading-relaxed">
                    From lightweight SMB dashboards to multi-node analytical lakehouses, we build robust data pipelines, low-latency OLAP querying, and deterministic business intelligence structured for diverse institutional complexities.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-cohere-ink/80">
                    <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-black/[0.04]">
                      ✓ Automated ETL Ingestion
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-black/[0.04]">
                      ✓ Sub-20ms OLAP Queries
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-black/[0.04]">
                      ✓ Strict Role-Based Governance
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 p-5 rounded-xl bg-[#f8f7f4] border border-black/[0.06] space-y-3 text-center sm:text-left">
                  <div className="text-xs font-mono text-cohere-slate">ARCHITECTURE TIERS</div>
                  <div className="text-base font-bold text-cohere-ink">SMB to Enterprise</div>
                  <p className="text-[11px] text-cohere-subtle leading-relaxed">
                    Tailored architectures supporting DuckDB, ClickHouse, and modern data warehouses.
                  </p>
                  <button
                    onClick={() => setRoute?.({ page: 'datascience', courseId: 'ai-agents' })}
                    className="w-full py-2.5 px-4 rounded-lg bg-cohere-ink hover:bg-black text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Inspect Data Tiers</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="text-[10px] font-mono text-cohere-coral font-bold uppercase tracking-wider">
                    APPLIED AUTOMATION & RESILIENCE
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-cohere-ink">
                    AI Disaster Management & Multi-Agent Workflows
                  </h3>
                  <p className="text-xs sm:text-sm text-cohere-subtle leading-relaxed">
                    Our AI portfolio consolidates production tools: the 3-layer hydrological flood early warning monitor, deterministic B2B trade compliance swarms, and air-gapped document intelligence—alongside our sovereign AI R&D pilot.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-cohere-ink/80">
                    <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-black/[0.04]">
                      ✓ Hydrology Telemetry Monitor
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-black/[0.04]">
                      ✓ Customs ASYCUDA Automation
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#f4f3ef] border border-black/[0.04]">
                      ✓ Devanagari Document OCR
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 p-5 rounded-xl bg-[#f8f7f4] border border-black/[0.06] space-y-3 text-center sm:text-left">
                  <div className="text-xs font-mono text-cohere-slate">AI TOOLS PORTAL</div>
                  <div className="text-base font-bold text-cohere-ink">Interactive Hub</div>
                  <p className="text-[11px] text-cohere-subtle leading-relaxed">
                    Test the flood surge model, PII sanitizer, and trade verification DAG.
                  </p>
                  <button
                    onClick={() => setRoute?.({ page: 'ai', courseId: 'ai-agents', aiTab: 'overview' })}
                    className="w-full py-2.5 px-4 rounded-lg bg-cohere-ink hover:bg-black text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Launch AI Tools Hub</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
