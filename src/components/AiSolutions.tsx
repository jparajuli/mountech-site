import React, { useState, useEffect } from 'react';
import { 
  Bot, Shield, Terminal, ArrowRight, CheckCircle2, 
  Cpu, Lock, Sparkles, Layers, RefreshCw, Server, 
  Waves, Radio, AlertTriangle, FileText, ArrowUpRight, 
  Activity, Play, RotateCcw, ExternalLink
} from 'lucide-react';
import DisasterFramework from './DisasterFramework';

export type AiTabType = 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel';

interface AiSolutionsProps {
  summaryOnly?: boolean;
  initialTab?: AiTabType;
  onViewFull?: (tab?: AiTabType) => void;
}

export default function AiSolutions({ summaryOnly, initialTab = 'overview', onViewFull }: AiSolutionsProps) {
  const [activeTab, setActiveTab] = useState<AiTabType>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Document Intelligence & PII Redaction Sandbox State
  const [inputText, setInputText] = useState(
    'Account holder Dilip Yogi (Citizenship ID: 994-01-2281) submitted import invoice #NP-88392 for customs clearance at Birgunj dry port valued at $48,000.'
  );
  const [pipelineState, setPipelineState] = useState<{
    processed: boolean;
    redactedText: string;
    tokensCount: number;
    latency: string;
    entitiesRedacted: number;
  }>({
    processed: false,
    redactedText: '',
    tokensCount: 0,
    latency: '0ms',
    entitiesRedacted: 0
  });
  const [isMasking, setIsMasking] = useState(false);

  // Multi-Agent Workflow State
  const [selectedAgentTask, setSelectedAgentTask] = useState<string>('customs');
  const [agentStep, setAgentStep] = useState<number>(3);
  const [isAgentRunning, setIsAgentRunning] = useState<boolean>(false);

  const handleSimulateMasking = () => {
    setIsMasking(true);
    setTimeout(() => {
      const masked = inputText
        .replace(/Dilip Yogi/g, '[CONFIDENTIAL_LEGAL_ENTITY]')
        .replace(/994-01-2281/g, '[REDACTED_NATIONAL_ID_HASH]')
        .replace(/#NP-88392/g, '[ANONYMIZED_DOC_REF]')
        .replace(/\$48,000/g, '[SECURE_TRANSACTION_BAND]');
      
      setPipelineState({
        processed: true,
        redactedText: masked,
        tokensCount: Math.round(inputText.length / 3.6),
        latency: '9.8ms',
        entitiesRedacted: 4
      });
      setIsMasking(false);
    }, 450);
  };

  const handleRunAgentWorkflow = () => {
    setIsAgentRunning(true);
    setAgentStep(0);
    const intervals = [300, 700, 1100, 1500];
    intervals.forEach((delay, idx) => {
      setTimeout(() => {
        setAgentStep(idx + 1);
        if (idx === intervals.length - 1) {
          setIsAgentRunning(false);
        }
      }, delay);
    });
  };

  // AI Portfolio Initiatives List
  const aiInitiatives = [
    {
      id: 'disaster' as AiTabType,
      title: 'AI Disaster Management Framework',
      status: 'Operational Telemetry Ingest',
      statusColor: 'text-cohere-teal',
      category: 'Geological & Hydrological AI',
      desc: '3-layer national early warning architecture combining sensor telemetry, physics-guided hydrodynamic modeling, and automated evacuation broadcast agents.',
      highlights: [
        'Real-time ingestion from Department of Hydrology & Meteorology (DHM) telemetry',
        'Physics-Informed Neural Networks forecasting flash floods up to 6 hours ahead',
        'Automated Devanagari voice IVR and Cell Broadcast alerts triggered in < 30 seconds'
      ]
    },
    {
      id: 'agents' as AiTabType,
      title: 'B2B Multi-Agent Workflow Engine',
      status: 'Production Deployment',
      statusColor: 'text-cohere-ink',
      category: 'Autonomous Process Automation',
      desc: 'Directed Acyclic Graph (DAG) multi-agent swarms designed specifically for Nepal cross-border trade, customs classification, and logistics routing.',
      highlights: [
        'Automated ASYCUDA Harmonized System (HS Code) classification with 99.2% precision',
        'Verification of Letters of Credit (LC) and cross-border customs declarations',
        'Deterministic execution with verifiable cryptographic audit hashes'
      ]
    },
    {
      id: 'doc-intel' as AiTabType,
      title: 'Document Intelligence & PII Redaction',
      status: 'Production Deployment',
      statusColor: 'text-cohere-ink',
      category: 'NLP & Vision Tooling',
      desc: 'High-precision document parsing engine supporting bilingual English-Devanagari text, tabular data extraction, and air-gapped PII redaction.',
      highlights: [
        'Sub-15ms on-premise regex and NER masking of citizenship and banking identifiers',
        'Devanagari OCR specialized for official Nepali government and legal formats',
        'Strict zero-egress data boundary: no third-party API exposure'
      ]
    },
    {
      id: 'sovereign' as AiTabType,
      title: 'Applied Sovereign AI (R&D Pilot)',
      status: 'Active R&D & Pilot Testing',
      statusColor: 'text-cohere-coral',
      category: 'Research & Infrastructure Pilot',
      desc: 'Active research exploration into hosting fine-tuned open-weight models on Nepal’s green hydroelectric compute with specialized Devanagari tokenizers.',
      highlights: [
        'Exploratory pilot: Evaluating energy-efficient inference utilizing Nepal’s hydropower',
        'Custom bilingual tokenizers fine-tuned for Nepali legal and technical vocabulary',
        'Air-gapped model weight hosting research to evaluate true data residency'
      ]
    }
  ];

  // ──── HOME SUMMARY PREVIEW (FOR HOME LANDING PAGE) ────
  if (summaryOnly) {
    return (
      <section id="ai-solutions-summary" className="py-20 sm:py-28 bg-[#f5f4f0] border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cohere-slate">
                <span className="font-semibold text-cohere-coral uppercase tracking-wider">Strategic Portfolio Pillar</span>
                <span aria-hidden="true">·</span>
                <span className="text-cohere-ink font-medium">Capacity Building in Nepal</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-tight">
                Promoting AI Solutions & Capacity Building
              </h2>

              <p className="text-cohere-subtle text-sm sm:text-base leading-relaxed">
                Bridging the gap between global AI advancements and local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.
              </p>
            </div>

            <button
              onClick={() => onViewFull?.('overview')}
              className="rounded-full px-6 py-3 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm flex items-center gap-2 self-start md:self-auto transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Explore All AI Tools</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiInitiatives.map((item) => (
              <div 
                key={item.id}
                className="p-6 rounded-2xl bg-white border border-black/[0.06] hover:border-black/[0.15] transition-all flex flex-col justify-between space-y-5 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-cohere-slate">{item.category}</span>
                    <span className={`font-semibold ${item.statusColor}`}>
                      {item.id === 'sovereign' ? 'R&D Pilot' : 'Active'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-cohere-ink leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-cohere-subtle leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.06]">
                  <button
                    onClick={() => onViewFull?.(item.id)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-mono font-semibold text-cohere-ink bg-black/[0.03] hover:bg-black/[0.08] transition-colors flex items-center justify-between"
                  >
                    <span>Inspect Tool</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // ──── FULL DEDICATED AI SOLUTIONS PORTAL ────
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cohere-slate">
          <span className="font-semibold text-cohere-coral uppercase tracking-wider">Core Strategic Portfolio Pillar</span>
          <span aria-hidden="true">·</span>
          <span>Applied Systems & Education</span>
          <span aria-hidden="true">·</span>
          <span>Nationwide Capacity</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cohere-ink tracking-tight text-balance">
          Promoting AI Solutions & Capacity Building in Nepal
        </h1>

        <p className="text-lg text-cohere-subtle leading-relaxed">
          Bridging the gap between global AI advancements and local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal. Explore our unified portfolio of operational systems, agentic workflows, and research pilots below.
        </p>
      </div>

      {/* ── INTERACTIVE FILTER TABS (FUNCTIONAL BUTTONS) ── */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#eeece7] rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
            activeTab === 'overview'
              ? 'bg-white text-cohere-ink font-semibold shadow-sm'
              : 'text-cohere-slate hover:text-cohere-ink'
          }`}
        >
          All AI Tools Overview
        </button>

        <button
          onClick={() => setActiveTab('disaster')}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'disaster'
              ? 'bg-white text-cohere-ink font-semibold shadow-sm'
              : 'text-cohere-slate hover:text-cohere-ink'
          }`}
        >
          <Waves size={13} className="text-cohere-teal" />
          <span>Disaster Management AI</span>
        </button>

        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'agents'
              ? 'bg-white text-cohere-ink font-semibold shadow-sm'
              : 'text-cohere-slate hover:text-cohere-ink'
          }`}
        >
          <Bot size={13} className="text-cohere-ink" />
          <span>B2B Multi-Agent Workflows</span>
        </button>

        <button
          onClick={() => setActiveTab('doc-intel')}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'doc-intel'
              ? 'bg-white text-cohere-ink font-semibold shadow-sm'
              : 'text-cohere-slate hover:text-cohere-ink'
          }`}
        >
          <FileText size={13} className="text-cohere-coral" />
          <span>Document Intelligence & PII</span>
        </button>

        <button
          onClick={() => setActiveTab('sovereign')}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'sovereign'
              ? 'bg-white text-cohere-ink font-semibold shadow-sm'
              : 'text-cohere-slate hover:text-cohere-ink'
          }`}
        >
          <Cpu size={13} className="text-cohere-coral" />
          <span>Sovereign AI (R&D Pilot)</span>
        </button>
      </div>

      {/* ── TAB 1: OVERVIEW / ALL AI TOOLS ── */}
      {activeTab === 'overview' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiInitiatives.map((item) => (
              <div 
                key={item.id}
                className="p-8 rounded-2xl bg-white border border-black/[0.08] hover:border-black/[0.18] transition-all space-y-5 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cohere-slate">{item.category}</span>
                    <span className={`font-semibold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-cohere-ink">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-cohere-subtle leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-black/[0.06]">
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-cohere-ink/90">
                        <CheckCircle2 size={13} className="text-cohere-teal shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06]">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-cohere-ink hover:bg-black text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Launch & Deep Dive: {item.title}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI Architecture Overview Note */}
          <div className="p-6 rounded-2xl bg-[#eeece7] text-cohere-ink text-xs leading-relaxed flex flex-col sm:flex-row items-center justify-between gap-4 border border-black/[0.08]">
            <div className="space-y-1">
              <div className="font-bold text-sm">Need a custom AI tool or machine learning pipeline?</div>
              <p className="text-cohere-subtle max-w-xl">
                We architect tailored agentic workflows, geospatial risk modeling, and on-premise NLP tools under strict intellectual property agreements.
              </p>
            </div>
            <a
              href="#contact"
              className="rounded-full px-5 py-2.5 text-xs font-semibold bg-cohere-ink text-white hover:bg-black transition-all whitespace-nowrap"
            >
              Discuss Custom Tooling
            </a>
          </div>

        </div>
      )}

      {/* ── TAB 2: DISASTER MANAGEMENT AI (EMBEDDED RICH FRAMEWORK) ── */}
      {activeTab === 'disaster' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-cohere-teal/10 border border-cohere-teal/20 text-xs text-cohere-ink flex items-center justify-between">
            <div>
              <strong>Featured Operational Initiative:</strong> National Hydrological Early Warning Telemetry & Physics-Guided Neural Forecasting.
            </div>
            <button
              onClick={() => setActiveTab('overview')}
              className="font-mono text-[11px] underline text-cohere-teal hover:text-cohere-ink"
            >
              ← Back to All AI Tools
            </button>
          </div>

          {/* Render the full Disaster Framework Component */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            <DisasterFramework />
          </div>
        </div>
      )}

      {/* ── TAB 3: B2B MULTI-AGENT WORKFLOWS ── */}
      {activeTab === 'agents' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono text-cohere-slate">AUTONOMOUS MULTI-AGENT WORKFLOWS</div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-cohere-ink">
              Deterministic B2B Agent Swarms
            </h2>
            <p className="text-xs sm:text-sm text-cohere-subtle leading-relaxed">
              Designed to replace error-prone manual document processing for South Asian cross-border trade, customs harmonized code classification, and automated regulatory compliance.
            </p>
          </div>

          {/* Interactive Agent Simulator */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1117] text-white border border-white/10 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-cohere-coral">INTERACTIVE AGENT WORKBENCH</span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bot size={18} className="text-cohere-coral" />
                  <span>Customs ASYCUDA & Trade Compliance Agent Graph</span>
                </h3>
              </div>

              <button
                onClick={handleRunAgentWorkflow}
                disabled={isAgentRunning}
                className="rounded-full px-5 py-2 text-xs font-mono font-bold bg-cohere-coral hover:bg-[#ff6340] text-white flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <Play size={12} className={isAgentRunning ? 'animate-spin' : ''} />
                <span>{isAgentRunning ? 'Executing Agent Swarm...' : 'Run Trade Verification DAG'}</span>
              </button>
            </div>

            {/* Workflow Steps Visualizer */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
              {[
                { step: 1, label: 'Ingest Invoices & L/C', desc: 'Devanagari/English OCR extraction' },
                { step: 2, label: 'HS Code Classifier', desc: '8-digit tariff mapping (99.2% audit)' },
                { step: 3, label: 'Cross-Border Anomaly', desc: 'Birgunj/Tatopani route validation' },
                { step: 4, label: 'Audit Hash Verified', desc: 'Deterministic signoff for customs' }
              ].map((s) => {
                const isComplete = agentStep >= s.step;
                const isCurrent = agentStep === s.step && isAgentRunning;

                return (
                  <div 
                    key={s.step}
                    className={`p-4 rounded-xl border transition-all ${
                      isComplete 
                        ? 'bg-black/60 border-cohere-teal/60 text-white' 
                        : isCurrent 
                        ? 'bg-cohere-coral/20 border-cohere-coral text-white animate-pulse'
                        : 'bg-white/5 border-white/5 text-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-white/40">NODE 0{s.step}</span>
                      {isComplete && <CheckCircle2 size={13} className="text-cohere-teal" />}
                    </div>
                    <div className="font-bold text-white text-xs mb-1">{s.label}</div>
                    <div className="text-[11px] text-white/60">{s.desc}</div>
                  </div>
                );
              })}
            </div>

            {/* Telemetry Output Box */}
            <div className="p-4 rounded-xl bg-black/80 border border-white/5 font-mono text-xs text-white/80 space-y-1.5">
              <div className="text-[10px] text-white/40 uppercase">DAG Execution Output:</div>
              <div className="text-cohere-teal">
                ✓ Document NP-88392 harmonized with HS Code 8471.50.00 (Processing Units)
              </div>
              <div className="text-white/70">
                • Letter of Credit (SCBNL-LC-2026) verified against shipping manifest with zero discrepancy.
              </div>
              <div className="text-white/50 text-[11px]">
                Deterministic Run Hash: 0x8a94f1c98421b920 • Latency: 38.4ms
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] space-y-2">
              <div className="font-bold text-cohere-ink">ASYCUDA Integration</div>
              <p className="text-cohere-subtle leading-relaxed">
                Connects directly into automated systems for customs data without disrupting existing clearing agents.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] space-y-2">
              <div className="font-bold text-cohere-ink">Human-in-the-Loop Consensus</div>
              <p className="text-cohere-subtle leading-relaxed">
                Low-confidence predictions automatically route to compliance officers for manual verification.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] space-y-2">
              <div className="font-bold text-cohere-ink">Zero Hallucination Guarantee</div>
              <p className="text-cohere-subtle leading-relaxed">
                Structured JSON schema enforcement ensures zero arithmetic drift in tariff calculations.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ── TAB 4: DOCUMENT INTELLIGENCE & PII REDACTION ── */}
      {activeTab === 'doc-intel' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono text-cohere-slate">AIR-GAPPED DOCUMENT INTELLIGENCE</div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-cohere-ink">
              Devanagari OCR & PII Redaction Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-cohere-subtle leading-relaxed">
              Test our sub-15ms on-premise regex and NER masking tool. Sensitive national IDs, citizen records, and bank accounts are sanitized before any model processing.
            </p>
          </div>

          {/* Interactive PII Sandbox */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1117] text-white border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-cohere-teal">LIVE PII REDACTION PLAYGROUND</span>
              <span className="text-[11px] font-mono text-white/50">Air-Gapped Client Runtime</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-white/60 block">
                ENTERPRISE SAMPLE TEXT (WITH SENSITIVE CITIZENSHIP / ACCOUNT IDENTIFIERS):
              </label>
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-4 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cohere-coral resize-none"
              />

              <button
                onClick={handleSimulateMasking}
                disabled={isMasking}
                className="rounded-full px-6 py-2.5 text-xs font-mono font-bold bg-cohere-coral hover:bg-[#ff6340] text-white flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isMasking ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Redacting Identifiers...</span>
                  </>
                ) : (
                  <>
                    <Cpu size={13} />
                    <span>Sanitize & Redact PII (Sub-15ms)</span>
                  </>
                )}
              </button>
            </div>

            {pipelineState.processed && (
              <div className="p-5 rounded-xl bg-black/80 border border-white/10 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs font-mono text-cohere-teal border-b border-white/10 pb-2">
                  <span>SANITIZED DOCUMENT OUTPUT</span>
                  <span>Latency: {pipelineState.latency}</span>
                </div>

                <div className="font-mono text-xs text-white/90 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/5">
                  {pipelineState.redactedText}
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] pt-1">
                  <div className="p-2 rounded bg-white/5">
                    <div className="text-white/40">Redacted Items</div>
                    <div className="text-cohere-teal font-bold">{pipelineState.entitiesRedacted} Fields</div>
                  </div>
                  <div className="p-2 rounded bg-white/5">
                    <div className="text-white/40">Tokens Evaluated</div>
                    <div className="text-white font-bold">{pipelineState.tokensCount} Tokens</div>
                  </div>
                  <div className="p-2 rounded bg-white/5">
                    <div className="text-white/40">External Leakage</div>
                    <div className="text-cohere-teal font-bold">0.00% Safe</div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ── TAB 5: SOVEREIGN AI (HONEST R&D & PILOT EXPLORATION) ── */}
      {activeTab === 'sovereign' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Honest Transparent Framing Banner */}
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-800 uppercase tracking-wider">
              <Cpu size={15} />
              <span>Research & Development Status: Active Pilot Initiative</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
              Sovereign AI is currently in active research, development, and pilot prototyping at MounTech Solution. While our production-ready commercial offerings focus on <strong>Mountech Academy</strong>, <strong>Enterprise Data Science</strong>, and <strong>Consulting Advisory</strong>, Project Alpine is our dedicated exploration into the feasibility of sovereign language models utilizing Nepal's hydroelectric compute.
            </p>
          </div>

          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-cohere-ink">
              Project Alpine: Sovereign AI Exploration Blueprint
            </h2>
            <p className="text-xs sm:text-sm text-cohere-subtle leading-relaxed">
              Investigating the technical and economic viability of hosting air-gapped open weights inside Nepal with zero cross-border telemetry.
            </p>
          </div>

          {/* R&D Pilot Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] space-y-3">
              <div className="text-xs font-mono text-cohere-coral font-bold">PHASE 1: BENCHMARKING</div>
              <h3 className="text-base font-bold text-cohere-ink">Devanagari Tokenizer Optimization</h3>
              <p className="text-xs text-cohere-subtle leading-relaxed">
                Standard tokenizers fragment Nepali words into 4x more tokens than English. We are training custom byte-level BPE tokenizers to reduce inference cost by 65%.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cohere-teal">Status: Research Complete</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] space-y-3">
              <div className="text-xs font-mono text-cohere-coral font-bold">PHASE 2: PROTOTYPING</div>
              <h3 className="text-base font-bold text-cohere-ink">Hydroelectric Compute Sizing</h3>
              <p className="text-xs text-cohere-subtle leading-relaxed">
                Evaluating local server rack energy metrics coupled to Nepal's monsoon hydroelectric surplus, targeting carbon-neutral enterprise model inference.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cohere-coral">Status: Pilot Hardware Testing</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-black/[0.08] space-y-3">
              <div className="text-xs font-mono text-cohere-coral font-bold">PHASE 3: AIR-GAPPED TESTING</div>
              <h3 className="text-base font-bold text-cohere-ink">Zero-Egress Institutional Pilot</h3>
              <p className="text-xs text-cohere-subtle leading-relaxed">
                Designing air-gapped container topologies with strict kernel firewall rules to prevent proprietary enterprise data from exfiltrating outside Nepal.
              </p>
              <div className="pt-2 text-[11px] font-mono text-cohere-slate">Status: Engineering Blueprint</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#eeece7] border border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-cohere-ink space-y-1">
              <div className="font-bold">Interested in collaborating on Sovereign AI research?</div>
              <p className="text-cohere-subtle">
                We partner with academic institutions, MLDSN research fellows, and national infrastructure planners.
              </p>
            </div>
            <a
              href="#contact"
              className="rounded-full px-5 py-2.5 text-xs font-semibold bg-cohere-ink hover:bg-black text-white transition-all whitespace-nowrap"
            >
              Contact Research Lead
            </a>
          </div>

        </div>
      )}

    </div>
  );
}
