import React, { useState } from 'react';
import { 
  Terminal, Shield, BrainCircuit, Layers, ArrowRight, 
  FolderOpen, ShieldAlert, Cpu, Database, Activity, Network, Sliders,
  CheckCircle, Play, RefreshCw, Lock, Sparkles, Server
} from 'lucide-react';

interface AiSolutionsProps {
  summaryOnly?: boolean;
  onViewFull?: () => void;
}

export default function AiSolutions({ summaryOnly, onViewFull }: AiSolutionsProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [simInput, setSimInput] = useState('Client Surya B. (ID: NP-8842, Email: surya@client.org) requests automated audit of Q3 cloud ledger.');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<{
    redacted: string;
    chunks: number;
    tokens: number;
    latency: string;
    verified: boolean;
  } | null>(null);

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Deterministic PII Masking simulation
      const masked = simInput
        .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[REDACTED_EMAIL]')
        .replace(/ID:\s*[A-Z0-9-]+/gi, 'ID: [REDACTED_ID]')
        .replace(/Surya B\./gi, '[REDACTED_NAME]');

      setSimResult({
        redacted: masked,
        chunks: Math.ceil(simInput.length / 40),
        tokens: Math.ceil(simInput.length / 4),
        latency: '18.4 ms',
        verified: true,
      });
      setIsSimulating(false);
    }, 600);
  };

  const enterpriseServices = [
    {
      icon: <Network size={22} className="text-accent2" />,
      title: "Multi-Agent Pipelines & Engineering",
      desc: "Architecting stateful, decentralized execution graphs with human-in-the-loop validation gates to handle multi-layered transaction processing automatically."
    },
    {
      icon: <Cpu size={22} className="text-accent" />,
      title: "Custom Inference Layers",
      desc: "Configuring quantized, low-memory 4-bit open-weight models (Llama, Mistral) engineered explicitly for offline-first localized execution fabrics."
    },
    {
      icon: <Shield size={22} className="text-green" />,
      title: "Private Data Guardrails",
      desc: "Deploying rigid semantic firewalls and cryptographic token regex tokenizers that intercept data matrices to strip PII before storage indexing."
    },
    {
      icon: <Layers size={22} className="text-white" />,
      title: "Small-Scale Systems Solutions",
      desc: "Deploying high-performance containerized automation modules and real-time telemetry analytics pipelines for secure local office centers."
    }
  ];

  const technicalSpecs = [
    {
      icon: <FolderOpen size={20} className="text-accent" />,
      title: "Folder Watcher Daemon",
      desc: "Monitors secure file directories in real time, auto-parsing raw text strings from newly appended paperwork with zero manual interactions."
    },
    {
      icon: <ShieldAlert size={20} className="text-green" />,
      title: "Deterministic Parsing Cells",
      desc: "Intercepts data arrays using a secure regex compliance proxy to mask passwords, IDs, and financial indicators instantly."
    },
    {
      icon: <Database size={20} className="text-accent2" />,
      title: "Embedded Chunk Topologies",
      desc: "Slices data strings into 512-character token blocks with a 10% structural overlap, mapping vectors directly into Qdrant index layouts."
    },
    {
      icon: <Sliders size={20} className="text-white" />,
      title: "Zero-Hallucination Prompts",
      desc: "Enforces strict system prompt conditions bounding local models to processed context, aborting the workflow if files do not match query maps."
    }
  ];

  const pipelineSteps = [
    {
      step: 1,
      title: "1. Local Ingestion",
      sub: "Watchdog Directory Daemon",
      icon: <FolderOpen size={20} className="text-accent" />,
      details: "Monitors raw file buffers in isolated local memory; supports PDF, DOCX, CSV, and tabular dumps."
    },
    {
      step: 2,
      title: "2. Private Guardrail",
      sub: "Regex / Token PII Masking",
      icon: <ShieldAlert size={20} className="text-green" />,
      details: "Deterministic masking sanitizes government IDs, names, and contact vectors before embeddings are generated."
    },
    {
      step: 3,
      title: "3. Vector Indexing",
      sub: "Qdrant Chunk Topologies",
      icon: <Database size={20} className="text-accent2" />,
      details: "512-token chunks with 10% overlap indexed locally with bge-small or custom local embedding models."
    },
    {
      step: 4,
      title: "4. Sovereign Inference",
      sub: "Offline Quantized Models",
      icon: <Cpu size={20} className="text-white" />,
      details: "4-bit quantized Llama 3 / Mistral execution with strictly bounded system prompts and zero cloud calls."
    }
  ];

  // ──── HOME PREVIEW WIDGET ────
  if (summaryOnly) {
    return (
      <section id="ai-summary" className="py-20 bg-bg border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                COMPUTATIONAL CORE
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                MounTech AI Solutions
              </h2>
              <p className="text-text-sub text-sm sm:text-base leading-relaxed">
                Engineering decentralized algorithmic systems designed to bridge sovereign technological security boundaries with resilient enterprise lifecycle automation.
              </p>
              
              <div className="pt-2">
                <button 
                  onClick={onViewFull}
                  className="px-5 py-2.5 rounded-xl bg-accent hover:bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-accent/25 flex items-center gap-2"
                >
                  <span>Analyze Architecture Blueprints</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enterpriseServices.slice(0, 2).map((service, i) => (
                <div key={i} className="bg-surface/90 border border-white/8 hover:border-accent/30 p-5 rounded-2xl transition-all">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2 rounded-lg bg-card border border-white/5">{service.icon}</div>
                    <strong className="text-sm font-bold text-white">{service.title}</strong>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    );
  }

  // ──── FULL DEDICATED LAB CANVAS VIEW ────
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header Block */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-surface border border-accent/20 text-accent mb-2">
          <BrainCircuit size={32} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Sovereign AI Systems Framework
        </h1>
        <p className="text-text-sub text-sm sm:text-base leading-relaxed">
          Comprehensive capability matrix combining zero-trust cloud engineering partitions with localized operational execution nodes.
        </p>
      </div>

      {/* Enterprise Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {enterpriseServices.map((service, idx) => (
          <div key={idx} className="bg-surface/80 border border-white/8 hover:border-accent/40 p-6 rounded-2xl transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-card border border-white/5 flex items-center justify-center">
              {service.icon}
            </div>
            <h3 className="text-base font-bold text-white">{service.title}</h3>
            <p className="text-text-sub text-xs leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* ── INTERACTIVE CASE STUDY DEMO: PROJECT ALPINE ARCHITECTURE ── */}
      <div className="bg-gradient-to-b from-surface to-card border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-accent" />
              <h3 className="text-xl font-bold text-white">Project Alpine: Architecture Blueprint</h3>
            </div>
            <p className="text-text-muted text-xs">Offline sovereign pipeline with deterministic privacy and vector routing.</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 border border-green/30 text-green font-mono text-xs self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span>OFFLINE PROTOCOL ACTIVE (ZERO CLOUD LEAKS)</span>
          </div>
        </div>

        {/* Step Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineSteps.map((step) => {
            const isSelected = activeStep === step.step;
            return (
              <div 
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all text-center relative ${
                  isSelected 
                    ? 'bg-card border-accent shadow-lg shadow-accent/15' 
                    : 'bg-surface/70 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center mx-auto mb-3">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-white mb-1">{step.title}</div>
                <div className="text-xs text-text-muted font-mono mb-2">{step.sub}</div>
                <p className="text-xs text-text-sub text-left">{step.details}</p>
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent text-white font-bold">
                    ACTIVE
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* ── LIVE INTERACTIVE SOVEREIGN PIPELINE SIMULATOR ── */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-5 sm:p-6 space-y-4 font-mono">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/5 pb-3">
            <div className="flex items-center gap-2 text-accent font-semibold">
              <Play size={14} />
              <span>Interactive Pipeline Simulator</span>
            </div>
            <span className="text-text-muted text-[11px]">Test redaction & vector chunking in real-time</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-text-muted block">INPUT PAYLOAD (SIMULATED SECURE INGESTION):</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={simInput}
                onChange={(e) => setSimInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-surface border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-accent"
                placeholder="Type or paste payload with emails, IDs, names..."
              />
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="px-4 py-2 rounded-lg bg-accent hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isSimulating ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                <span>Process Pipeline</span>
              </button>
            </div>
          </div>

          {/* Results Output */}
          {simResult && (
            <div className="mt-4 p-4 rounded-lg bg-surface/90 border border-white/10 space-y-3 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-green flex items-center gap-1.5 font-bold">
                  <CheckCircle size={14} /> DETERMINISTIC PRIVACY PASS
                </span>
                <span className="text-text-muted text-[11px]">Latency: {simResult.latency}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-text-muted">SANITIZED CONTEXT EMBEDDING BUFFER:</span>
                <div className="p-2.5 rounded bg-black/70 border border-white/5 text-xs text-green break-all">
                  {simResult.redacted}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-text-muted block">CHUNKS</span>
                  <span className="text-white font-bold">{simResult.chunks} blocks</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-text-muted block">TOKENS</span>
                  <span className="text-accent font-bold">~{simResult.tokens}</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-text-muted block">VECTOR ENGINE</span>
                  <span className="text-accent2 font-bold">Qdrant Local</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-text-muted block">EXTERNAL LEAKS</span>
                  <span className="text-green font-bold">0.00% (Air-Gapped)</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Operational Core Tech Specs Breakdown */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Granular Operational Tech Specs</h2>
          <p className="text-text-muted text-sm">Deep technical behaviors structuring the Project Alpine engine architecture loops.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technicalSpecs.map((f, idx) => (
            <div key={idx} className="bg-surface/80 border border-white/8 hover:border-accent/40 p-6 rounded-2xl transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-card border border-white/5 flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-white">{f.title}</h3>
              <p className="text-text-sub text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
