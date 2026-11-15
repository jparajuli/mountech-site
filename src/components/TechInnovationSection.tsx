import React, { useState } from 'react';
import {
  Cpu, Waves, Database, ShieldCheck, Globe, Terminal, ArrowRight
} from 'lucide-react';
import { RevealBlock } from './MotionPrimitives';
import { AiTabType } from './AiSolutions';

interface TechDomain {
  id: string;
  title: string;
  focus: string;
  technologies: string[];
  description: string;
  targetPage: string;
  aiTab?: AiTabType;
  courseId?: string;
  icon: React.ReactNode;
}

const TECH_DOMAINS: TechDomain[] = [
  {
    id: 'agentic',
    title: 'Multi-Agent DAG Orchestration',
    focus: 'Stateful Reasoning & Deterministic Guardrails',
    technologies: ['Directed Acyclic Graphs', 'RAG Indexing', 'Qdrant Vector DB', 'Structured JSON Validation'],
    description:
      'Replacing brittle linear prompt chains with verifiable execution graphs designed for compliance, invoice extraction, and institutional auditability.',
    targetPage: 'ai',
    aiTab: 'agents',
    icon: <Cpu size={18} className="text-[#22D3EE]" />,
  },
  {
    id: 'pinn',
    title: 'Physics-Informed & Spatio-Temporal AI',
    focus: 'Hydrological & Geological Resilience',
    technologies: ['Physics-Informed Neural Networks', 'Temporal GCN', 'ESA Sentinel Radar', 'CAP-v1.2'],
    description:
      'Embedding Saint-Venant hydraulic equations and satellite raster telemetry into neural architectures tailored for Himalayan river basins.',
    targetPage: 'ai',
    aiTab: 'disaster',
    icon: <Waves size={18} className="text-[#22D3EE]" />,
  },
  {
    id: 'lakehouse',
    title: 'Streaming OLAP & Vector Data Platforms',
    focus: 'High-Throughput Analytical Infrastructure',
    technologies: ['PostgreSQL & DuckDB', 'ClickHouse', 'Apache Iceberg', 'Apache Kafka'],
    description:
      'End-to-end data pipelines balancing cost efficiency for growing enterprises with sub-second analytical querying at national scale.',
    targetPage: 'datascience',
    icon: <Database size={18} className="text-[#22D3EE]" />,
  },
  {
    id: 'nlp',
    title: 'Devanagari NLP & Air-Gapped Inference',
    focus: 'Bilingual Tokenization & Local Privacy',
    technologies: ['Byte-Level BPE', 'Devanagari OCR', 'On-Premise NER Masking', 'Zero-Egress Containers'],
    description:
      'Custom tokenizer research and sensitive entity redaction ensuring Nepali documents are parsed accurately without external cloud leakage.',
    targetPage: 'ai',
    aiTab: 'doc-intel',
    icon: <Globe size={18} className="text-[#22D3EE]" />,
  },
  {
    id: 'devsecops',
    title: 'Zero-Trust Cloud & DevSecOps',
    focus: 'Hardened Infrastructure Automation',
    technologies: ['Kubernetes', 'Terraform IaC', 'Container Micro-Segmentation', 'Telemetry Auditing'],
    description:
      'Declarative infrastructure automation and blue-team hardening across hybrid and on-premise server environments.',
    targetPage: 'consulting',
    icon: <ShieldCheck size={18} className="text-[#22D3EE]" />,
  },
  {
    id: 'emerging',
    title: 'Consensus Ledgers & Quantum Readiness',
    focus: 'Next-Generation Computational Research',
    technologies: ['Solidity & Rust Smart Contracts', 'zk-SNARK Circuits', 'IBM Qiskit', 'Variational Algorithms'],
    description:
      'Foundational curriculum and applied exploration in distributed cryptographic ledgers and quantum circuit programming.',
    targetPage: 'course-detail',
    courseId: 'quantum',
    icon: <Terminal size={18} className="text-[#22D3EE]" />,
  },
];

export default function TechInnovationSection({
  onNavigate,
}: {
  onNavigate: (page: string, aiTab?: AiTabType, courseId?: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string>('agentic');
  const active = TECH_DOMAINS.find((d) => d.id === selectedId) || TECH_DOMAINS[0];

  return (
    <section
      id="technology-innovation"
      aria-label="Technology and Innovation"
      className="py-20 sm:py-28 bg-[#101828] text-[#F8FAFC] border-b border-white/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 mt-grid-dark opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <RevealBlock>
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#22D3EE]">
              <span>Technology &amp; Innovation</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="text-[#94A3B8]">Emerging Domains</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Foundational stacks powering our research and systems.
            </h2>

            <p className="text-base text-[#CBD5E1] leading-relaxed">
              Select a domain to inspect the architectures, protocols, and toolchains we engineer across enterprise deployments and academic cohorts.
            </p>
          </div>
        </RevealBlock>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Domain Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECH_DOMAINS.map((domain) => {
              const isSelected = domain.id === selectedId;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setSelectedId(domain.id)}
                  className={`text-left p-5 rounded-xl border transition-all space-y-2.5 ${
                    isSelected
                      ? 'bg-[#1E293B] border-[#22D3EE]/70 shadow-glow-blue'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center">
                      {domain.icon}
                    </div>
                    <span className="text-xs font-mono text-[#22D3EE]">
                      {isSelected ? 'Selected' : 'Inspect'}
                    </span>
                  </div>
                  <div className="font-display text-base font-bold text-white">
                    {domain.title}
                  </div>
                  <div className="text-xs text-[#94A3B8]">{domain.focus}</div>
                </button>
              );
            })}
          </div>

          {/* Domain Inspector Detail Panel */}
          <div className="lg:col-span-5 rounded-2xl bg-[#182235] border border-white/15 p-7 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-5">
              <div className="text-xs font-mono text-[#22D3EE]">Domain Specification</div>
              <h3 className="font-display text-2xl font-bold text-white">{active.title}</h3>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">{active.description}</p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono text-[#94A3B8]">Core Technologies &amp; Standards</div>
              <ul className="space-y-2">
                {active.technologies.map((tech) => (
                  <li key={tech} className="flex items-center gap-2.5 text-sm text-[#F8FAFC]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] shrink-0" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate(active.targetPage, active.aiTab, active.courseId)}
                className="w-full py-3 px-5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors flex items-center justify-center gap-2"
              >
                <span>Open Related Capability</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
