import React, { useState } from 'react';
import { 
  Bot, Shield, Terminal, ArrowRight, CheckCircle2, 
  Cpu, Lock, Sparkles, Layers, RefreshCw, Server
} from 'lucide-react';

interface AiSolutionsProps {
  summaryOnly?: boolean;
  onViewFull?: () => void;
}

export default function AiSolutions({ summaryOnly, onViewFull }: AiSolutionsProps) {
  const [inputText, setInputText] = useState('Account holder Dilip Yogi (NID: 994-01-2281) requested wire transfer authorization of $48,000 for server cluster expansion.');
  const [pipelineState, setPipelineState] = useState<{
    processed: boolean;
    redactedText: string;
    tokensCount: number;
    latency: string;
    leakageRisk: string;
  }>({
    processed: false,
    redactedText: '',
    tokensCount: 0,
    latency: '0ms',
    leakageRisk: '0.00%'
  });
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Simulate zero-trust regex & PII masking
      const masked = inputText
        .replace(/Dilip Yogi/g, '[REDACTED_IDENTITY_01]')
        .replace(/994-01-2281/g, '[REDACTED_NID_HASH]')
        .replace(/\$48,000/g, '[QUANTITY_BAND_SECURE]');
      
      setPipelineState({
        processed: true,
        redactedText: masked,
        tokensCount: Math.round(inputText.length / 3.8),
        latency: '11.4ms',
        leakageRisk: '0.00% (Air-Gapped Enclave)'
      });
      setIsSimulating(false);
    }, 600);
  };

  const capabilities = [
    {
      tag: "CORE CAPABILITY 01",
      title: "Multi-Agent DAG Execution Graphs",
      desc: "Decomposing complex enterprise workflows into supervised, deterministic agentic nodes with human-in-the-loop consensus protocols."
    },
    {
      tag: "CORE CAPABILITY 02",
      title: "Sovereign Low-Bit Quantization",
      desc: "Deploying 4-bit and 8-bit quantized models optimized for on-premise edge hardware without reliance on foreign API endpoints."
    },
    {
      tag: "CORE CAPABILITY 03",
      title: "Air-Gapped Knowledge Retrieval (RAG)",
      desc: "Sub-second hybrid vector search and neural reranking operating entirely inside your corporate firewall and localized VPC."
    }
  ];

  const enterpriseTracks = [
    {
      sector: "Fintech & Banking",
      spec: "Real-time AML, balance reconciliation, and fraud detection with encrypted PII telemetry."
    },
    {
      sector: "Healthcare & Clinical Systems",
      spec: "Diagnostic report summarization and EHR knowledge graphs under strict patient data privacy."
    },
    {
      sector: "Sovereign Governance",
      spec: "Devanagari NLP tokenization and localized civil records automated indexing with zero cloud leaks."
    }
  ];

  // ──── HOME PREVIEW WIDGET (SUMMARY VIEW) ────
  if (summaryOnly) {
    return (
      <section className="py-20 sm:py-28 bg-[#f5f4f0] border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs text-cohere-coral font-semibold uppercase tracking-widest">
                ENTERPRISE CAPABILITIES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-tight">
                Sovereign AI Systems Architecture
              </h2>
              <p className="text-cohere-subtle text-sm sm:text-base leading-relaxed">
                Transform enterprise workflows with multi-agent topologies and air-gapped language models designed for total data privacy.
              </p>
            </div>

            <button
              onClick={onViewFull}
              className="rounded-full px-6 py-3 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm flex items-center gap-2 self-start md:self-auto transition-all"
            >
              <span>Explore AI Solutions</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <div 
                key={idx}
                className="p-7 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.15] transition-all space-y-4 shadow-sm"
              >
                <div className="font-mono text-[11px] text-cohere-slate">{cap.tag}</div>
                <h3 className="text-lg font-bold text-cohere-ink leading-snug">{cap.title}</h3>
                <p className="text-xs text-cohere-subtle leading-relaxed">{cap.desc}</p>
                <div className="pt-2 flex items-center text-xs font-mono font-semibold text-cohere-coral gap-1">
                  <span>Air-gapped boundary</span>
                  <CheckCircle2 size={13} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // ──── FULL DEDICATED SOVEREIGN AI VIEW ────
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="font-mono text-xs text-cohere-coral font-semibold uppercase tracking-widest">
          PROJECT ALPINE ARCHITECTURE
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cohere-ink tracking-tight">
          Sovereign AI for regulated enterprises.
        </h1>
        <p className="text-lg text-cohere-subtle leading-relaxed">
          Full-stack local models, deterministic agents, and zero-egress data enclaves engineered to replace fragile external cloud APIs.
        </p>
      </div>

      {/* ── INTERACTIVE SOVEREIGN PIPELINE SIMULATOR ── */}
      <div className="rounded-2xl bg-[#0d1117] text-white border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-cohere-teal uppercase">INTERACTIVE SANDBOX</span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal size={20} className="text-cohere-coral" />
              <span>Project Alpine: Zero-Leakage Pipeline Simulator</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/60">
            <span className="px-2.5 py-1 rounded bg-white/10 text-cohere-teal font-semibold">
              TLS 1.3 Air-Gapped
            </span>
          </div>
        </div>

        {/* Input Text Area */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-white/60 block">
            SIMULATION PAYLOAD (ENTERPRISE TRANSACTION WITH SENSITIVE IDENTIFIERS)
          </label>
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cohere-coral resize-none"
          />

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="rounded-full px-6 py-2.5 text-xs font-mono font-bold bg-cohere-coral hover:bg-[#ff6340] text-white flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                <span>Running Zero-Trust Pipeline...</span>
              </>
            ) : (
              <>
                <Cpu size={13} />
                <span>Simulate Ingestion & PII Masking</span>
              </>
            )}
          </button>
        </div>

        {/* Pipeline Output Result */}
        {pipelineState.processed && (
          <div className="p-6 rounded-xl bg-black/70 border border-white/10 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs font-mono text-cohere-teal border-b border-white/10 pb-2">
              <span>ZERO-TRUST OUTPUT TRANSCRIPTION</span>
              <span>Latency: {pipelineState.latency}</span>
            </div>

            <div className="font-mono text-xs text-white/90 leading-relaxed bg-black/40 p-4 rounded-lg border border-white/5">
              {pipelineState.redactedText}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[11px] pt-2">
              <div className="p-2.5 rounded bg-white/5">
                <div className="text-white/40">External Leakage</div>
                <div className="text-cohere-teal font-bold">{pipelineState.leakageRisk}</div>
              </div>
              <div className="p-2.5 rounded bg-white/5">
                <div className="text-white/40">Tokens Processed</div>
                <div className="text-white font-bold">{pipelineState.tokensCount} tokens</div>
              </div>
              <div className="p-2.5 rounded bg-white/5 col-span-2 sm:col-span-1">
                <div className="text-white/40">Execution Node</div>
                <div className="text-cohere-coral font-bold">Local Kathmandu Cluster</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── INDUSTRY BLUEPRINTS ── */}
      <div className="space-y-6">
        <div>
          <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
            PROVEN TRACKS
          </span>
          <h2 className="font-display text-2xl font-bold text-cohere-ink mt-1">
            Enterprise Deployment Profiles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enterpriseTracks.map((track, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-cohere-stone/60 border border-black/[0.08] space-y-2">
              <div className="font-mono text-xs text-cohere-coral font-bold uppercase">{track.sector}</div>
              <p className="text-xs text-cohere-subtle leading-relaxed">{track.spec}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
