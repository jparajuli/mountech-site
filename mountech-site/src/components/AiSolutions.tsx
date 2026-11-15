import React, { useState, useEffect } from 'react';
import {
  Bot, ArrowRight, CheckCircle2, Cpu, RefreshCw,
  Waves, FileText, Play
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
    entitiesRedacted: 0,
  });
  const [isMasking, setIsMasking] = useState(false);

  const [agentStep, setAgentStep] = useState<number>(4);
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
        entitiesRedacted: 4,
      });
      setIsMasking(false);
    }, 350);
  };

  const handleRunAgentWorkflow = () => {
    setIsAgentRunning(true);
    setAgentStep(0);
    const intervals = [250, 550, 850, 1150];
    intervals.forEach((delay, idx) => {
      setTimeout(() => {
        setAgentStep(idx + 1);
        if (idx === intervals.length - 1) {
          setIsAgentRunning(false);
        }
      }, delay);
    });
  };

  const aiInitiatives = [
    {
      id: 'disaster' as AiTabType,
      title: 'AI Disaster Management Framework',
      status: 'Active Telemetry Model',
      statusColor: 'text-[#0284C7]',
      category: 'Geological & Hydrological AI',
      desc: '3-layer early warning architecture combining sensor telemetry, physics-guided hydrodynamic modeling, and automated evacuation broadcast agents.',
      highlights: [
        'Real-time ingestion from Department of Hydrology & Meteorology (DHM) telemetry',
        'Physics-Informed Neural Networks forecasting flash floods up to 6 hours ahead',
        'Automated Devanagari voice IVR and Cell Broadcast alerts triggered in under 30 seconds',
      ],
    },
    {
      id: 'agents' as AiTabType,
      title: 'B2B Multi-Agent Workflow Engine',
      status: 'Applied Solution',
      statusColor: 'text-[#15803D]',
      category: 'Autonomous Process Automation',
      desc: 'Directed Acyclic Graph (DAG) multi-agent workflows built for South Asian cross-border trade, customs classification, and logistics routing.',
      highlights: [
        'Automated ASYCUDA Harmonized System (HS Code) classification',
        'Verification of Letters of Credit (LC) and cross-border customs declarations',
        'Deterministic execution with auditable validation logs',
      ],
    },
    {
      id: 'doc-intel' as AiTabType,
      title: 'Document Intelligence & PII Redaction',
      status: 'Applied Solution',
      statusColor: 'text-[#15803D]',
      category: 'NLP & Vision Tooling',
      desc: 'Document parsing supporting bilingual English-Devanagari text, tabular extraction, and air-gapped PII redaction.',
      highlights: [
        'Sub-15ms on-premise regex and NER masking of citizenship and banking identifiers',
        'Devanagari OCR specialized for Nepali institutional and legal formats',
        'Strict zero-egress boundary without external API exposure',
      ],
    },
    {
      id: 'sovereign' as AiTabType,
      title: 'Applied Sovereign AI (R&D Pilot)',
      status: 'Active R&D Pilot',
      statusColor: 'text-[#0284C7]',
      category: 'Research & Infrastructure Pilot',
      desc: 'Ongoing research exploration into hosting fine-tuned open-weight models on Nepal’s green hydroelectric compute with specialized Devanagari tokenizers.',
      highlights: [
        'Exploratory pilot evaluating energy-efficient inference on domestic hydropower',
        'Custom bilingual tokenizers tuned for Nepali legal and technical vocabulary',
        'Air-gapped weight hosting research to study institutional data residency',
      ],
    },
  ];

  if (summaryOnly) {
    return (
      <section id="ai-solutions-summary" className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5A6D7E]">
                <span className="font-semibold text-[#15803D]">Applied AI &amp; Research</span>
                <span aria-hidden="true">·</span>
                <span>Capacity Building in Nepal</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F1E2E] tracking-tight">
                AI Solutions &amp; Applied Research
              </h2>

              <p className="text-[#5A6D7E] text-base leading-relaxed">
                Bridging global AI advancements and local implementation through tailored enterprise systems, disaster telemetry, and focused R&amp;D pilots.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onViewFull?.('overview')}
              className="rounded-lg px-5 py-2.5 text-xs font-semibold bg-[#0B1924] hover:bg-[#122636] text-white shadow-subtle flex items-center gap-2 self-start md:self-auto transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explore Research &amp; AI Lab</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiInitiatives.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0284C7]/40 transition-colors flex flex-col justify-between space-y-5 shadow-subtle"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#5A6D7E]">{item.category}</span>
                    <span className={`font-semibold ${item.statusColor}`}>
                      {item.id === 'sovereign' ? 'R&D Pilot' : 'Active'}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-[#0F1E2E] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#5A6D7E] leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => onViewFull?.(item.id)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-[#0284C7] bg-[#F0F9FF] hover:bg-[#E0F2FE] transition-colors flex items-center justify-between whitespace-nowrap shrink-0"
                  >
                    <span>Inspect System</span>
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

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5A6D7E]">
          <span className="font-semibold text-[#15803D]">Research &amp; Innovation Hub</span>
          <span aria-hidden="true">·</span>
          <span>Applied Systems &amp; Pilots</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F1E2E] tracking-tight">
          Applied AI &amp; Research Lab
        </h1>

        <p className="text-base sm:text-lg text-[#5A6D7E] leading-relaxed">
          Bridging the gap between global AI advancements and local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.
        </p>
      </div>

      {/* Interactive Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white border border-[#E2E8F0] rounded-xl overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'overview'
              ? 'bg-[#0284C7] text-white font-semibold'
              : 'text-[#5A6D7E] hover:text-[#0F1E2E]'
          }`}
        >
          All AI Initiatives
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('disaster')}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
            activeTab === 'disaster'
              ? 'bg-[#0284C7] text-white font-semibold'
              : 'text-[#5A6D7E] hover:text-[#0F1E2E]'
          }`}
        >
          <Waves size={13} />
          <span>Disaster Management AI</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
            activeTab === 'agents'
              ? 'bg-[#0284C7] text-white font-semibold'
              : 'text-[#5A6D7E] hover:text-[#0F1E2E]'
          }`}
        >
          <Bot size={13} />
          <span>B2B Multi-Agent Workflows</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('doc-intel')}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
            activeTab === 'doc-intel'
              ? 'bg-[#0284C7] text-white font-semibold'
              : 'text-[#5A6D7E] hover:text-[#0F1E2E]'
          }`}
        >
          <FileText size={13} />
          <span>Document Intelligence &amp; PII</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sovereign')}
          className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
            activeTab === 'sovereign'
              ? 'bg-[#0284C7] text-white font-semibold'
              : 'text-[#5A6D7E] hover:text-[#0F1E2E]'
          }`}
        >
          <Cpu size={13} />
          <span>Sovereign AI (R&amp;D Pilot)</span>
        </button>
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiInitiatives.map((item) => (
              <div
                key={item.id}
                className="p-8 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0284C7]/40 transition-colors space-y-5 shadow-subtle flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#5A6D7E]">{item.category}</span>
                    <span className={`font-semibold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#0F1E2E]">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#5A6D7E] leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#E2E8F0]">
                    {item.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#334155]">
                        <CheckCircle2 size={14} className="text-[#15803D] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-[#0B1924] hover:bg-[#122636] text-white transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Inspect {item.title}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-display font-bold text-base text-[#0F1E2E]">
                Need a custom AI tool or machine learning pipeline?
              </div>
              <p className="text-xs sm:text-sm text-[#334155] max-w-xl">
                We architect tailored agentic workflows, geospatial risk modeling, and on-premise NLP tools under strict confidentiality agreements.
              </p>
            </div>
            <a
              href="#contact"
              className="rounded-lg px-5 py-2.5 text-xs font-semibold bg-[#15803D] text-white hover:bg-[#166534] transition-colors whitespace-nowrap shrink-0"
            >
              Discuss Custom Tooling
            </a>
          </div>
        </div>
      )}

      {/* Disaster Management */}
      {activeTab === 'disaster' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-xs text-[#0F1E2E] flex items-center justify-between gap-4">
            <div>
              <strong>Applied AI Initiative:</strong> Hydrological Early Warning Telemetry &amp; Physics-Guided Neural Forecasting.
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="font-mono text-xs font-semibold text-[#0284C7] hover:underline whitespace-nowrap shrink-0"
            >
              ← Back to Overview
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#1E3345] shadow-elevated">
            <DisasterFramework />
          </div>
        </div>
      )}

      {/* Multi-Agent Workflows */}
      {activeTab === 'agents' && (
        <div className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono text-[#0284C7] font-semibold">Autonomous Multi-Agent Workflows</div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F1E2E]">
              Deterministic B2B Agent Workflows
            </h2>
            <p className="text-sm text-[#5A6D7E] leading-relaxed">
              Automating complex document processing for South Asian cross-border trade, customs harmonized code classification, and compliance verification.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1924] text-white border border-[#1E3345] shadow-elevated space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#2EB6E0]">Interactive Agent Workbench</span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bot size={18} className="text-[#2EB6E0]" />
                  <span>Customs ASYCUDA &amp; Trade Compliance DAG</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={handleRunAgentWorkflow}
                disabled={isAgentRunning}
                className="rounded-lg px-5 py-2.5 text-xs font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white flex items-center gap-2 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
              >
                <Play size={12} className={isAgentRunning ? 'animate-spin' : ''} />
                <span>{isAgentRunning ? 'Running Agent Graph...' : 'Run Trade Verification DAG'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
              {[
                { step: 1, label: 'Ingest Invoices & L/C', desc: 'Devanagari/English OCR extraction' },
                { step: 2, label: 'HS Code Classifier', desc: '8-digit tariff mapping & audit' },
                { step: 3, label: 'Cross-Border Check', desc: 'Birgunj/Tatopani route validation' },
                { step: 4, label: 'Audit Hash Verified', desc: 'Deterministic compliance signoff' },
              ].map((s) => {
                const isComplete = agentStep >= s.step;
                const isCurrent = agentStep === s.step && isAgentRunning;

                return (
                  <div
                    key={s.step}
                    className={`p-4 rounded-xl border transition-all ${
                      isComplete
                        ? 'bg-[#122636] border-[#2EB6E0]/60 text-white'
                        : isCurrent
                        ? 'bg-[#0284C7]/25 border-[#0284C7] text-white'
                        : 'bg-white/5 border-white/10 text-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-[#94A3B8]">Node 0{s.step}</span>
                      {isComplete && <CheckCircle2 size={14} className="text-[#4ADE80]" />}
                    </div>
                    <div className="font-bold text-white text-xs mb-1">{s.label}</div>
                    <div className="text-[11px] text-[#CBD5E1]">{s.desc}</div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-[#07121A] border border-white/10 font-mono text-xs text-[#E2E8F0] space-y-1.5">
              <div className="text-[11px] text-[#94A3B8]">Execution Trace Output</div>
              <div className="text-[#4ADE80]">
                ✓ Sample invoice NP-88392 mapped to HS Code 8471.50.00 (Processing Units)
              </div>
              <div className="text-[#CBD5E1]">
                Letter of Credit manifest checked against schema rules with zero arithmetic discrepancy.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-2">
              <div className="font-bold text-sm text-[#0F1E2E]">ASYCUDA Schema Alignment</div>
              <p className="text-[#5A6D7E] leading-relaxed">
                Structures extracted customs line items to fit existing clearing workflows cleanly.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-2">
              <div className="font-bold text-sm text-[#0F1E2E]">Human-in-the-Loop Gateways</div>
              <p className="text-[#5A6D7E] leading-relaxed">
                Uncertain extractions pause automatically for compliance officer review and approval.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-2">
              <div className="font-bold text-sm text-[#0F1E2E]">Deterministic Calculations</div>
              <p className="text-[#5A6D7E] leading-relaxed">
                Typed validation rules prevent arithmetic drift across tariff and tax summaries.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Document Intelligence */}
      {activeTab === 'doc-intel' && (
        <div className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono text-[#0284C7] font-semibold">Air-Gapped Document Intelligence</div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F1E2E]">
              Devanagari OCR &amp; PII Redaction Sandbox
            </h2>
            <p className="text-sm text-[#5A6D7E] leading-relaxed">
              Test our client-side entity masking demonstration. Sensitive national IDs, names, and financial figures are sanitized before downstream model processing.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1924] text-white border border-[#1E3345] shadow-elevated space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
              <span className="text-[#2EB6E0]">PII Redaction Playground</span>
              <span className="text-[#94A3B8]">Local Browser Execution</span>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono text-[#CBD5E1] block">
                Sample Enterprise Text (With Sensitive Identifiers)
              </label>
              <textarea
                rows={3}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#07121A] border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-[#2EB6E0] resize-none"
              />

              <button
                type="button"
                onClick={handleSimulateMasking}
                disabled={isMasking}
                className="rounded-lg px-6 py-2.5 text-xs font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white flex items-center gap-2 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
              >
                {isMasking ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Redacting Identifiers...</span>
                  </>
                ) : (
                  <>
                    <Cpu size={13} />
                    <span>Sanitize &amp; Redact PII</span>
                  </>
                )}
              </button>
            </div>

            {pipelineState.processed && (
              <div className="p-5 rounded-xl bg-[#07121A] border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#4ADE80] border-b border-white/10 pb-2">
                  <span>Sanitized Output</span>
                  <span className="tabular-nums">Latency: {pipelineState.latency}</span>
                </div>

                <div className="font-mono text-xs text-white/90 leading-relaxed bg-[#0B1924] p-3.5 rounded-lg border border-white/10">
                  {pipelineState.redactedText}
                </div>

                <div className="grid grid-cols-3 gap-2 font-mono text-xs pt-1 tabular-nums">
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-[#94A3B8] text-[11px]">Redacted Items</div>
                    <div className="text-[#2EB6E0] font-bold">{pipelineState.entitiesRedacted} Fields</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-[#94A3B8] text-[11px]">Approx. Tokens</div>
                    <div className="text-white font-bold">{pipelineState.tokensCount} Tokens</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5">
                    <div className="text-[#94A3B8] text-[11px]">External Egress</div>
                    <div className="text-[#4ADE80] font-bold">0 Bytes Sent</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sovereign AI */}
      {activeTab === 'sovereign' && (
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#0F1E2E] space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0284C7]">
              <Cpu size={15} />
              <span>Research &amp; Development Status: Active Pilot Initiative</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-[#334155]">
              Sovereign AI is an active research pilot at MounTech Solution. Project Alpine investigates localized language models running on Nepal&apos;s hydroelectric compute while commercial delivery centers on <strong>Mountech Academy</strong>, <strong>Data Science</strong>, and <strong>Consulting</strong>.
            </p>
          </div>

          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#0F1E2E]">
              Project Alpine: Sovereign AI Exploration Blueprint
            </h2>
            <p className="text-sm text-[#5A6D7E] leading-relaxed">
              Investigating the technical and economic viability of hosting air-gapped open weights inside Nepal with minimal cross-border telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-subtle">
              <div className="text-xs font-mono text-[#0284C7] font-semibold">01 · Benchmarking</div>
              <h3 className="text-base font-bold text-[#0F1E2E]">Devanagari Tokenizer Optimization</h3>
              <p className="text-xs text-[#5A6D7E] leading-relaxed">
                Generic tokenizers fragment Nepali words excessively. We evaluate custom byte-level BPE vocabularies to reduce token overhead and latency.
              </p>
              <div className="pt-2 text-xs font-mono text-[#15803D]">Status: Research Ongoing</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-subtle">
              <div className="text-xs font-mono text-[#0284C7] font-semibold">02 · Compute Sizing</div>
              <h3 className="text-base font-bold text-[#0F1E2E]">Hydroelectric Compute Economics</h3>
              <p className="text-xs text-[#5A6D7E] leading-relaxed">
                Modeling localized inference hardware utilization paired with Nepal&apos;s clean hydroelectric grid capacity.
              </p>
              <div className="pt-2 text-xs font-mono text-[#0284C7]">Status: Pilot Feasibility</div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-subtle">
              <div className="text-xs font-mono text-[#0284C7] font-semibold">03 · Air-Gapped Topologies</div>
              <h3 className="text-base font-bold text-[#0F1E2E]">Zero-Egress Institutional Testing</h3>
              <p className="text-xs text-[#5A6D7E] leading-relaxed">
                Designing isolated container topologies with strict firewall policies so sensitive institutional records stay inside organizational boundaries.
              </p>
              <div className="pt-2 text-xs font-mono text-[#5A6D7E]">Status: Architecture Blueprint</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B1924] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs space-y-1">
              <div className="font-bold text-sm">Interested in collaborating on Applied AI research?</div>
              <p className="text-[#CBD5E1]">
                We welcome collaboration with universities, MLDSN research fellows, and engineering teams.
              </p>
            </div>
            <a
              href="#contact"
              className="rounded-lg px-5 py-2.5 text-xs font-semibold bg-[#15803D] hover:bg-[#166534] text-white transition-colors whitespace-nowrap shrink-0"
            >
              Contact Research Lead
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
