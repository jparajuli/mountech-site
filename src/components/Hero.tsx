import React, { useState } from 'react';
import { 
  ArrowRight, Terminal, Shield, Cpu, Activity, 
  Layers, Lock, Sparkles, Check, Copy, Play, ArrowUpRight
} from 'lucide-react';

interface HeroProps {
  setRoute?: (route: { page: string; courseId: string }) => void;
}

export default function Hero({ setRoute }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'agents' | 'rag' | 'security'>('agents');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "[09:14:02.102] DAG Router: Initiating sovereign pipeline handshake...",
    "[09:14:02.145] Auth: Enclave verified • Hardware token valid",
    "[09:14:02.189] Rerank: Cosine similarity matched 8 candidate passages",
    "[09:14:02.240] Synthesis: Streaming 124 tokens/sec on local node"
  ]);

  const handleRunSimulation = () => {
    setIsRunning(true);
    const newLog = `[${new Date().toLocaleTimeString()}.${Math.floor(Math.random() * 900 + 100)}] Query dispatched -> Multi-agent node completed in 14.8ms`;
    setTimeout(() => {
      setTelemetryLogs(prev => [newLog, ...prev.slice(0, 4)]);
      setIsRunning(false);
    }, 400);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install @mountech/sovereign-agent');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-cohere-canvas pt-14 pb-20 sm:pt-20 sm:pb-28 border-b border-black/[0.06]">
      {/* Subtle Cohere Grid & Atmospheric Gradient */}
      <div className="absolute inset-0 cohere-grid-bg opacity-70 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cohere-coral/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#7c3aed]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── MONUMENTAL COHERE-STYLE TYPOGRAPHIC HERO ── */}
        <div className="max-w-4xl space-y-6">
          
          {/* Status Capsule Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.08] text-[11px] font-mono text-cohere-slate">
            <span className="w-2 h-2 rounded-full bg-cohere-teal animate-pulse" />
            <span className="font-semibold text-cohere-ink uppercase tracking-wider">
              SOVEREIGN TECH MATRIX 2026
            </span>
            <span className="text-black/30">•</span>
            <span>Kathmandu Nodes Active</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-cohere-ink tracking-[-0.04em] leading-[1.06]">
            Applied AI & Data Science <br className="hidden sm:inline" />
            Infrastructure for Nepal.
          </h1>

          {/* Restrained Editorial Body Text */}
          <p className="text-lg sm:text-xl text-cohere-subtle max-w-2xl font-normal leading-relaxed">
            MounTech Solution engineers sovereign multi-agent execution graphs, localized LLM inferencing fabrics, and resilient hydro-powered compute. Zero cloud leaks, deterministic accuracy.
          </p>

          {/* Two Distinct Conversion Funnel CTA Paths */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              id="cta-enterprise-consulting"
              onClick={() => setRoute?.({ page: 'consulting', courseId: 'ai-agents' })}
              className="rounded-full px-7 py-3.5 text-sm font-semibold bg-cohere-ink hover:bg-black text-white shadow-md shadow-black/10 transition-all flex items-center gap-2 group active:scale-95"
            >
              <span>Enterprise AI Consulting</span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="cta-mountech-academy"
              onClick={() => setRoute?.({ page: 'school', courseId: 'ai-agents' })}
              className="rounded-full px-7 py-3.5 text-sm font-semibold bg-cohere-stone hover:bg-[#e4e2dc] text-cohere-ink border border-black/[0.08] transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Mountech Academy</span>
              <ArrowUpRight size={14} className="text-cohere-slate" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('disaster-framework');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setRoute?.({ page: 'home', courseId: 'ai-agents' });
                  setTimeout(() => {
                    document.getElementById('disaster-framework')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }
              }}
              className="px-4 py-3 text-xs font-mono text-cohere-slate hover:text-cohere-ink flex items-center gap-1.5 transition-colors"
            >
              <span>Disaster AI Framework</span>
              <ArrowUpRight size={13} />
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
                onClick={() => setActiveTab('agents')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                  activeTab === 'agents'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu size={14} className="text-cohere-coral" />
                <span>Multi-Agent Router</span>
              </button>

              <button
                onClick={() => setActiveTab('rag')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                  activeTab === 'rag'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers size={14} className="text-[#38bdf8]" />
                <span>Sovereign RAG</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
                  activeTab === 'security'
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Shield size={14} className="text-cohere-teal" />
                <span>Zero-Trust Enclave</span>
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
                <span>{isRunning ? 'Synthesizing...' : 'Run Simulation'}</span>
              </button>

              <button
                onClick={handleCopyInstall}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white/70 text-[11px] font-mono border border-white/5 transition-colors"
                title="Copy package command"
              >
                {copied ? <Check size={12} className="text-cohere-teal" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'SDK'}</span>
              </button>
            </div>

          </div>

          {/* Console Body: 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            
            {/* Left Column: Interactive Telemetry State */}
            <div className="lg:col-span-7 p-5 sm:p-7 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-white/50 border-b border-white/5 pb-3">
                <span>PIPELINE DISPATCH WORKBENCH</span>
                <span className="text-cohere-teal flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cohere-teal inline-block" />
                  Latency: 14.8ms
                </span>
              </div>

              {activeTab === 'agents' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-white/80">
                    <span className="text-cohere-coral font-bold">Input Context: </span>
                    "Reconcile Q4 balance ledger against localized microservice transactions with PII masking."
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="text-cohere-teal">✓</span>
                      <span>Supervisor Node: DAG decomposed into 3 sub-tasks</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="text-cohere-teal">✓</span>
                      <span>Masking Agent: Redacted 14 Nepali citizenship / account IDs</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <span className="text-cohere-teal">✓</span>
                      <span>Ledger Agent: Deterministic arithmetic check validated</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'rag' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-white/80">
                    <span className="text-[#38bdf8] font-bold">Vector Strategy: </span>
                    "Hybrid BM25 + Devanagari/English Cross-Encoder Reranker"
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-white/5">
                      <div className="text-white/40">Recall Accuracy</div>
                      <div className="text-white font-bold text-sm">99.4% Top-3</div>
                    </div>
                    <div className="p-2 rounded bg-white/5">
                      <div className="text-white/40">Chunking Overlap</div>
                      <div className="text-white font-bold text-sm">128 tokens / 15%</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-white/80">
                    <span className="text-cohere-teal font-bold">Boundary Defense: </span>
                    "Zero External Egress • On-Premise GPU Inference Gateway"
                  </div>

                  <div className="space-y-1 text-[11px] text-white/70">
                    <div>• Air-gapped model weights in encrypted NVMe array</div>
                    <div>• Localized tokenizers preventing telemetry exfiltration</div>
                    <div>• Compliant with Nepal Data Governance & GDPR protocols</div>
                  </div>
                </div>
              )}

              {/* Stream Logs Output */}
              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] font-mono text-white/40 uppercase mb-1.5">Live Telemetry Terminal</div>
                <div className="p-3 rounded-lg bg-black/60 font-mono text-[11px] text-white/70 space-y-1 h-28 overflow-y-auto">
                  {telemetryLogs.map((log, idx) => (
                    <div key={idx} className={idx === 0 ? "text-cohere-coral" : "text-white/60"}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Key Metric Pillars */}
            <div className="lg:col-span-5 p-5 sm:p-7 bg-[#10141d] flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-4">
                  PERFORMANCE SPECS
                </span>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">100%</span>
                      <span className="text-xs font-mono text-cohere-teal font-semibold">ZERO LEAKAGE</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Data sovereignty compliance with air-gapped boundary execution.</p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">&lt; 15ms</span>
                      <span className="text-xs font-mono text-cohere-coral font-semibold">P99 LATENCY</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Direct kernel quantization on localized edge and cluster compute.</p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">10,000+</span>
                      <span className="text-xs font-mono text-[#38bdf8] font-semibold">MLDSN NETWORK</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Ecosystem engineering partnership across Nepal since 2018.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <span>Cluster State: NOMINAL</span>
                <span className="text-cohere-teal">● Active TLS 1.3</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}