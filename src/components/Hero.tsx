import React, { useState } from 'react';
import { 
  ArrowRight, Database, Cpu, GraduationCap, 
  Layers, CheckCircle2, Play, ArrowUpRight, BarChart3, Users
} from 'lucide-react';

interface HeroProps {
  setRoute?: (route: { page: string; courseId: string; aiTab?: 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel' }) => void;
}

export default function Hero({ setRoute }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'datascience' | 'agents' | 'academy'>('academy');
  const [isRunning, setIsRunning] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "[10:15:01] System Ingest: ETL pipeline active across 4 regional nodes",
    "[10:15:02] Analytics Engine: Partition aggregated (24,190 records in 18ms)",
    "[10:15:03] Academy Intake: Fall Cohort registration open for 40h Tracks",
    "[10:15:04] AI Router: Document parsing & DAG agent readiness nominal"
  ]);

  const handleRunSimulation = () => {
    setIsRunning(true);
    const newLog = `[${new Date().toLocaleTimeString()}] Telemetry Benchmark: Query dispatched -> Executed in 12.4ms across localized pipeline`;
    setTimeout(() => {
      setTelemetryLogs(prev => [newLog, ...prev.slice(0, 3)]);
      setIsRunning(false);
    }, 400);
  };

  return (
    <section className="relative overflow-hidden bg-cohere-canvas pt-14 pb-20 sm:pt-20 sm:pb-28 border-b border-black/[0.06]">
      {/* Subtle Cohere Grid & Atmospheric Gradient */}
      <div className="absolute inset-0 cohere-grid-bg opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cohere-coral/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#7c3aed]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── MONUMENTAL EDITORIAL HERO STATEMENT ── */}
        <div className="max-w-4xl space-y-6">
          
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

          {/* Restrained Editorial Body Text */}
          <p className="text-lg sm:text-xl text-cohere-subtle max-w-2xl font-normal leading-relaxed">
            Bridging the gap between global AI advancements and local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.
          </p>

          {/* Conversion Funnel CTA Paths */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              id="cta-mountech-academy"
              onClick={() => setRoute?.({ page: 'school', courseId: 'ai-agents' })}
              className="rounded-full px-7 py-3.5 text-sm font-semibold bg-cohere-ink hover:bg-black text-white shadow-md shadow-black/10 transition-all flex items-center gap-2 group active:scale-95 whitespace-nowrap"
            >
              <GraduationCap size={16} />
              <span>Explore Mountech Academy</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="cta-enterprise-consulting"
              onClick={() => setRoute?.({ page: 'consulting', courseId: 'ai-agents' })}
              className="rounded-full px-7 py-3.5 text-sm font-semibold bg-cohere-stone hover:bg-[#e4e2dc] text-cohere-ink border border-black/[0.08] transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <span>Enterprise Consulting</span>
              <ArrowUpRight size={14} className="text-cohere-slate" />
            </button>

            <button
              onClick={() => setRoute?.({ page: 'datascience', courseId: 'ai-agents' })}
              className="rounded-full px-5 py-3.5 text-sm font-medium text-cohere-ink hover:bg-black/[0.04] transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Database size={15} className="text-cohere-teal" />
              <span>Data Science Matrix</span>
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

          {/* 5 Core Pillars Unboxed Summary Strip */}
          <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-cohere-slate border-t border-black/[0.06]">
            <span className="font-semibold text-cohere-ink">5 Core Focus Areas:</span>
            <button 
              onClick={() => setRoute?.({ page: 'school', courseId: 'ai-agents' })}
              className="hover:text-cohere-ink hover:underline font-medium"
            >
              1. Academy (40h Masterclasses)
            </button>
            <span aria-hidden="true" className="text-black/20">·</span>
            <button 
              onClick={() => setRoute?.({ page: 'datascience', courseId: 'ai-agents' })}
              className="hover:text-cohere-ink hover:underline font-medium"
            >
              2. Data Science Infrastructure
            </button>
            <span aria-hidden="true" className="text-black/20">·</span>
            <button 
              onClick={() => setRoute?.({ page: 'consulting', courseId: 'ai-agents' })}
              className="hover:text-cohere-ink hover:underline font-medium"
            >
              3. Technology Consulting
            </button>
            <span aria-hidden="true" className="text-black/20">·</span>
            <button 
              onClick={() => setRoute?.({ page: 'ai', courseId: 'ai-agents' })}
              className="hover:text-cohere-ink hover:underline font-medium text-cohere-coral"
            >
              4. AI Solutions & Tools
            </button>
            <span aria-hidden="true" className="text-black/20">·</span>
            <button 
              onClick={() => setRoute?.({ page: 'community', courseId: 'ai-agents' })}
              className="hover:text-cohere-ink hover:underline font-medium"
            >
              5. MLDSN Community
            </button>
          </div>

        </div>

        {/* ── COHERE-STYLE INTERACTIVE DEVELOPER PLAYGROUND CONSOLE ── */}
        <div className="mt-14 sm:mt-18 rounded-2xl bg-[#0d1117] text-white border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Top Control Bar with Tabs */}
          <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#12161f]">
            
            {/* Console Tabs */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('academy')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                  activeTab === 'academy'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <GraduationCap size={14} className="text-cohere-teal" />
                <span>Mountech Academy</span>
              </button>

              <button
                onClick={() => setActiveTab('datascience')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                  activeTab === 'datascience'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <BarChart3 size={14} className="text-[#38bdf8]" />
                <span>Data Science Matrix</span>
              </button>

              <button
                onClick={() => setActiveTab('agents')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                  activeTab === 'agents'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu size={14} className="text-cohere-coral" />
                <span>AI Tools & Workflows</span>
              </button>
            </div>

            {/* Quick Trigger Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="px-3 py-1.5 rounded-md bg-cohere-coral hover:bg-[#ff6340] text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
              >
                <Play size={12} className={isRunning ? 'animate-spin' : ''} />
                <span>{isRunning ? 'Benchmarking...' : 'Run Diagnostics'}</span>
              </button>
            </div>

          </div>

          {/* Console Body: 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Left Column: Interactive Telemetry State */}
            <div className="lg:col-span-7 p-5 sm:p-7 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-white/50 border-b border-white/5 pb-3">
                <span>OPERATIONAL CAPABILITY CONSOLE</span>
                <span className="text-cohere-teal flex items-center gap-1">
                  Verified Engine Nominal
                </span>
              </div>

              {activeTab === 'academy' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-white/80">
                    <span className="text-cohere-teal font-bold">Featured Masterclass: </span>
                    "Agentic AI Systems: Building Autonomous Multi-Agent Workflows (40 Hours)"
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="text-cohere-teal">✓</span>
                      <span>Syllabus: LangGraph, AutoGen, Human-in-the-Loop Consensus</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="text-cohere-teal">✓</span>
                      <span>Capstones: Automated trade auditing & financial ledger reconciliation</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="text-cohere-teal">✓</span>
                      <span>Certification: Verified digital credential backed by MLDSN Nepal</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'datascience' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-white/80">
                    <span className="text-[#38bdf8] font-bold">Data Architecture: </span>
                    "Distributed Lakehouse & Fast OLAP Ingest for Nepali Enterprises"
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-white/5">
                      <div className="text-white/40">Query Response</div>
                      <div className="text-white font-bold text-sm tabular-nums">&lt; 18ms</div>
                    </div>
                    <div className="p-2 rounded bg-white/5">
                      <div className="text-white/40">Pipeline Throughput</div>
                      <div className="text-white font-bold text-sm tabular-nums">75,000 evt/s</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'agents' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-white/80">
                    <span className="text-cohere-coral font-bold">AI Portfolio: </span>
                    "Disaster Management AI · B2B Multi-Agent Workflows · Sovereign AI R&D"
                  </div>

                  <div className="space-y-1 text-[11px] text-white/70">
                    <div>• Disaster AI: 3-layer hydrology telemetry & river surge warning</div>
                    <div>• Enterprise Agents: Customs classification & automated compliance</div>
                    <div>• Sovereign AI (R&D): Exploring localized LLMs on green hydro-compute</div>
                  </div>
                </div>
              )}

              {/* Stream Logs Output */}
              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1.5">Operational Activity Logs</div>
                <div className="p-3 rounded-lg bg-black/60 font-mono text-[11px] text-white/70 space-y-1 h-28 overflow-y-auto">
                  {telemetryLogs.map((log, idx) => (
                    <div key={idx} className={idx === 0 ? "text-cohere-teal" : "text-white/60"}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Key Operational Pillars */}
            <div className="lg:col-span-5 p-5 sm:p-7 bg-[#10141d] flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-4">
                  CAPABILITY MATRIX
                </span>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight tabular-nums">40h</span>
                      <span className="text-xs font-mono text-cohere-teal font-semibold">APPLIED ACADEMY</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Rigorous cohort masterclasses in AI agents, transformers, and data engineering.</p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight tabular-nums">3 Tiers</span>
                      <span className="text-xs font-mono text-cohere-coral font-semibold">DATA SCIENCE</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Scalable storage, automated analytics, and predictive modeling for SMB to Enterprise.</p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight tabular-nums">10,000+</span>
                      <span className="text-xs font-mono text-[#38bdf8] font-semibold">MLDSN ALLIANCE</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Non-profit research and community alliance advancing Nepal's technical talent since 2018.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <span>Kathmandu HQ & Online Tracks</span>
                <span className="text-cohere-teal font-semibold">Admissions Active</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
