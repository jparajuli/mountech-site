import React, { useState } from 'react';
import { 
  ChevronRight, Terminal, Shield, Cpu, Activity, 
  Layers, CheckCircle, ArrowUpRight, Sparkles, Server, Database
} from 'lucide-react';
import Logo from './Logo';

interface HeroProps {
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function Hero({ setRoute }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'agents' | 'rag' | 'cloud'>('agents');

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-white/10 grid-bg">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent2/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface/90 border border-accent/25 text-xs text-text shadow-lg backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="font-mono text-accent font-semibold text-[11px] tracking-wide">MOUNTECH SOLUTION</span>
            <span className="text-white/20">•</span>
            <span className="text-text-sub text-[11px] hidden sm:inline">Summiting AI. Securing the Foundations.</span>
            <span className="text-text-sub text-[11px] sm:hidden">Enterprise AI & Cloud</span>
            <ChevronRight size={12} className="text-accent" />
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
            Sovereign AI Systems & <br />
            <span className="bg-gradient-to-r from-blue-400 via-accent to-accent2 bg-clip-text text-transparent">
              Digital Infrastructure Foundations
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-text-sub max-w-2xl mx-auto leading-relaxed">
            MounTech Solution (MTS) engineers decentralized multi-agent architectures, sovereign inference fabrics, and enterprise cloud operations designed for uncompromised resilience.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
            <button
              onClick={() => setRoute({ page: 'school', courseId: 'ai-agents' })}
              className="px-6 py-3 rounded-xl bg-accent hover:bg-blue-600 text-white font-semibold text-sm shadow-xl shadow-accent/25 flex items-center gap-2 active:scale-95 transition-transform"
            >
              <span>Explore Tech Academy (40h)</span>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents' })}
              className="px-6 py-3 rounded-xl bg-surface hover:bg-card text-white font-semibold text-sm border border-white/10 hover:border-accent/40 flex items-center gap-2 shadow-sm transition-colors"
            >
              <Cpu size={16} className="text-accent" />
              <span>Analyze AI Blueprints</span>
            </button>

            <button
              onClick={() => setRoute({ page: 'consulting', courseId: 'ai-agents' })}
              className="px-5 py-3 rounded-xl bg-transparent hover:bg-white/5 text-text-sub hover:text-white font-medium text-sm flex items-center gap-1.5 transition-colors"
            >
              <span>Consulting Services</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* ── INTERACTIVE LIVE ARCHITECTURE TELEMETRY TERMINAL ── */}
        <div className="max-w-4xl mx-auto mt-6 rounded-2xl bg-surface/90 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden">
          
          {/* Terminal Top Bar */}
          <div className="px-4 py-3 bg-[#080c10]/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-text-muted ml-2">mts-orchestrator@sovereign-node:~</span>
            </div>

            {/* Terminal View Tabs */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5 text-xs font-mono">
              <button 
                onClick={() => setActiveTab('agents')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeTab === 'agents' ? 'bg-accent text-white font-semibold' : 'text-text-muted hover:text-white'
                }`}
              >
                Multi-Agent Graph
              </button>
              <button 
                onClick={() => setActiveTab('rag')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeTab === 'rag' ? 'bg-accent text-white font-semibold' : 'text-text-muted hover:text-white'
                }`}
              >
                Sovereign RAG
              </button>
              <button 
                onClick={() => setActiveTab('cloud')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  activeTab === 'cloud' ? 'bg-accent text-white font-semibold' : 'text-text-muted hover:text-white'
                }`}
              >
                DevSecOps Mesh
              </button>
            </div>
          </div>

          {/* Terminal Body Content */}
          <div className="p-5 sm:p-6 font-mono text-xs">
            {activeTab === 'agents' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-text-muted border-b border-white/5 pb-2">
                  <span className="text-green flex items-center gap-1.5">
                    <Activity size={14} className="animate-pulse" /> DAG Execution Engine Active
                  </span>
                  <span>Cluster: KTM-AP-01 [Sovereign Edge]</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                    <div className="text-accent text-[11px] font-bold uppercase">Node 01: Intent Router</div>
                    <div className="text-text-sub text-[11px]">Semantic vector similarity: 0.942</div>
                    <div className="text-green text-[10px]">STATUS: COMPLETED (3.2ms)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-accent/30 space-y-1 shadow-inner">
                    <div className="text-accent2 text-[11px] font-bold uppercase">Node 02: Synthesis Agent</div>
                    <div className="text-text-sub text-[11px]">Context window caching: 87.4% hit</div>
                    <div className="text-yellow-400 text-[10px] animate-pulse">STATUS: IN-TRANSIT (11ms)</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                    <div className="text-green text-[11px] font-bold uppercase">Node 03: Guardrail Gate</div>
                    <div className="text-text-sub text-[11px]">Deterministic regex: 0 PII leak</div>
                    <div className="text-text-muted text-[10px]">STATUS: STANDBY</div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-black/60 text-text-sub text-[11px] leading-relaxed flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">$</span>
                    <span>mts agent dispatch --policy=sovereign --latency-target=25ms</span>
                  </div>
                  <span className="text-green font-bold">200 OK • All Guardrails Verified</span>
                </div>
              </div>
            )}

            {activeTab === 'rag' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-text-muted border-b border-white/5 pb-2">
                  <span className="text-accent flex items-center gap-1.5">
                    <Database size={14} /> Qdrant Index Mesh • 512d Dense Vectors
                  </span>
                  <span>Encrypted in Transit (TLS 1.3 + ChaCha20)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-text-muted text-[10px]">EMBEDDING LATENCY</div>
                    <div className="text-white text-base font-bold mt-1">4.2 ms</div>
                    <div className="text-green text-[10px]">bge-small-en-v1.5</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-text-muted text-[10px]">COSINE RECALL</div>
                    <div className="text-accent text-base font-bold mt-1">98.7%</div>
                    <div className="text-text-sub text-[10px]">Top-K = 5 + Rerank</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-text-muted text-[10px]">PII MASKING</div>
                    <div className="text-green text-base font-bold mt-1">100%</div>
                    <div className="text-text-sub text-[10px]">Zero Leak Guarantee</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-text-muted text-[10px]">TOKEN REUSE</div>
                    <div className="text-accent2 text-base font-bold mt-1">4.6x</div>
                    <div className="text-text-sub text-[10px]">Prompt Cache Matrix</div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-black/60 text-text-sub text-[11px]">
                  <span className="text-accent">$</span> query: "Extract tax schedule obligations from encrypted ledger" → 0 hallucinations detected.
                </div>
              </div>
            )}

            {activeTab === 'cloud' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-text-muted border-b border-white/5 pb-2">
                  <span className="text-green flex items-center gap-1.5">
                    <Server size={14} /> DevSecOps Infrastructure Pipeline
                  </span>
                  <span>High-Availability Kubernetes Pods</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-white font-bold text-[11px]">Cluster Availability</div>
                    <div className="text-green text-lg font-bold">99.99%</div>
                    <div className="text-text-muted text-[10px]">Multi-zone redundancy</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-white font-bold text-[11px]">Container Security</div>
                    <div className="text-accent text-lg font-bold">Trivy 0 CVE</div>
                    <div className="text-text-muted text-[10px]">Hardened Alpine Base</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-white font-bold text-[11px]">Compliance Mesh</div>
                    <div className="text-accent2 text-lg font-bold">ISO / SOC2</div>
                    <div className="text-text-muted text-[10px]">Local Data Sovereignty</div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-black/60 text-text-sub text-[11px]">
                  <span className="text-green">$</span> automated blue-green rolling rollout completed across all distributed ingress gateways.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust Proof Pillars Row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className="p-3 rounded-xl bg-surface/40 border border-white/5">
            <div className="text-xl sm:text-2xl font-extrabold text-white">40h+</div>
            <div className="text-xs text-text-muted font-mono mt-0.5">Applied Curriculum</div>
          </div>
          <div className="p-3 rounded-xl bg-surface/40 border border-white/5">
            <div className="text-xl sm:text-2xl font-extrabold text-accent">5 Architects</div>
            <div className="text-xs text-text-muted font-mono mt-0.5">Core Leadership</div>
          </div>
          <div className="p-3 rounded-xl bg-surface/40 border border-white/5">
            <div className="text-xl sm:text-2xl font-extrabold text-green">100% Sovereign</div>
            <div className="text-xs text-text-muted font-mono mt-0.5">Local Data Integrity</div>
          </div>
          <div className="p-3 rounded-xl bg-surface/40 border border-white/5">
            <div className="text-xl sm:text-2xl font-extrabold text-accent2">Since 2018</div>
            <div className="text-xs text-text-muted font-mono mt-0.5">MLDSN Ecosystem</div>
          </div>
        </div>

      </div>
    </section>
  );
}
