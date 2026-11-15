import React, { useState } from 'react';
import {
  ArrowRight, Waves, Bot, FileText, Database, FlaskConical
} from 'lucide-react';
import { MEDIA_ASSETS } from '../assets/media';
import MediaFrame from './MediaFrame';
import { RevealBlock, InteractiveCard } from './MotionPrimitives';
import { AiTabType } from './AiSolutions';

interface ProjectsSectionProps {
  summaryOnly?: boolean;
  onOpenProject: (page: string, aiTab?: AiTabType) => void;
}

interface RealProject {
  id: string;
  category: 'Applied AI' | 'Engineering Systems' | 'R&D Pilot';
  title: string;
  domain: string;
  summary: string;
  stack: string;
  targetPage: string;
  aiTab?: AiTabType;
  actionLabel: string;
  image?: string;
  imageAlt?: string;
  icon: React.ReactNode;
}

const REAL_PROJECTS: RealProject[] = [
  {
    id: 'disaster-ai',
    category: 'Applied AI',
    title: 'AI Disaster Management Framework',
    domain: 'Hydrological Early Warning · 3-Layer Architecture',
    summary:
      'Integrates Department of Hydrology & Meteorology (DHM) telemetry, ESA Sentinel radar data, physics-informed neural networks (PINNs), and CAP-v1.2 Devanagari voice alerting for Himalayan river basins.',
    stack: 'Apache Kafka · T-GCN & PINNs · CAP-v1.2 · Devanagari TTS',
    targetPage: 'ai',
    aiTab: 'disaster',
    actionLabel: 'Inspect Telemetry Model',
    image: MEDIA_ASSETS.hydroDisasterAi,
    imageAlt: 'Geospatial hydrological contour visualization of Himalayan river valley terrain',
    icon: <Waves size={18} className="text-[#22D3EE]" />,
  },
  {
    id: 'multi-agent-trade',
    category: 'Engineering Systems',
    title: 'B2B Customs & Trade Multi-Agent Workflows',
    domain: 'Cross-Border Compliance · Deterministic DAGs',
    summary:
      'Directed Acyclic Graph multi-agent pipeline automating ASYCUDA Harmonized System (HS Code) classification, Letter of Credit reconciliation, and human-in-the-loop verification.',
    stack: 'Agentic DAGs · Structured JSON Schema · OCR Extraction',
    targetPage: 'ai',
    aiTab: 'agents',
    actionLabel: 'Open Agent Workbench',
    icon: <Bot size={18} className="text-[#2563EB]" />,
  },
  {
    id: 'doc-intel-pii',
    category: 'Engineering Systems',
    title: 'Devanagari Document Intelligence & PII Redaction',
    domain: 'Bilingual NLP · Air-Gapped Sanitization',
    summary:
      'Sub-15ms on-premise regex and named-entity redaction sandbox engineered for bilingual Nepali-English institutional records with strict zero-egress boundaries.',
    stack: 'Devanagari OCR · On-Premise NER · Zero-Egress Boundary',
    targetPage: 'ai',
    aiTab: 'doc-intel',
    actionLabel: 'Launch PII Sandbox',
    icon: <FileText size={18} className="text-[#2563EB]" />,
  },
  {
    id: 'data-tiers',
    category: 'Engineering Systems',
    title: 'Multi-Scale Enterprise Data Lakehouse Tiers',
    domain: 'Data Science · Streaming OLAP',
    summary:
      'Scalable data engineering blueprints tailored from SMB reporting pipelines up to high-throughput ClickHouse, Qdrant vector indices, and Apache Iceberg analytical clusters.',
    stack: 'PostgreSQL · DuckDB · ClickHouse · Qdrant · Apache Iceberg',
    targetPage: 'datascience',
    actionLabel: 'Explore Storage Matrix',
    icon: <Database size={18} className="text-[#0891B2]" />,
  },
  {
    id: 'project-alpine',
    category: 'R&D Pilot',
    title: 'Project Alpine: Sovereign AI Exploration',
    domain: 'Active R&D Pilot · Devanagari BPE & Green Compute',
    summary:
      'Ongoing internal R&D investigating byte-level Devanagari BPE tokenization and local hydroelectric compute sizing for open-weight inference within Nepal.',
    stack: 'Byte-Level BPE · Open-Weight Quantization · Hydropower Sizing',
    targetPage: 'ai',
    aiTab: 'sovereign',
    actionLabel: 'Read R&D Blueprint',
    icon: <FlaskConical size={18} className="text-[#6366F1]" />,
  },
];

export default function ProjectsSection({ summaryOnly = true, onOpenProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'All' | 'Applied AI' | 'Engineering Systems' | 'R&D Pilot'>('All');

  const visibleProjects = filter === 'All'
    ? REAL_PROJECTS
    : REAL_PROJECTS.filter((p) => p.category === filter);

  const featured = REAL_PROJECTS[0];
  const secondary = visibleProjects.filter((p) => !summaryOnly || p.id !== featured.id);

  return (
    <section
      id="projects"
      aria-label="Projects and Case Studies"
      className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <RevealBlock>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] font-semibold">
                <span>Projects &amp; Applied Initiatives</span>
                <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                <span className="text-[#64748B] font-normal">Engineering &amp; Research Portfolio</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Real architectures built for local reliability.
              </h2>

              <p className="text-base text-[#64748B] leading-relaxed">
                Explore MounTech&apos;s applied technical initiatives, interactive sandboxes, and active research pilots—each documented transparently without inflated claims.
              </p>
            </div>

            {/* Interactive Category Filter */}
            <div className="flex items-center gap-1 p-1 bg-white border border-[#E2E8F0] rounded-xl self-start lg:self-auto overflow-x-auto max-w-full">
              {(['All', 'Applied AI', 'Engineering Systems', 'R&D Pilot'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                    filter === tab
                      ? 'bg-[#2563EB] text-white font-semibold'
                      : 'text-[#64748B] hover:text-[#172033]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </RevealBlock>

        {/* Featured Flagship Card on Summary View when All or Applied AI selected */}
        {summaryOnly && (filter === 'All' || filter === 'Applied AI') && (
          <div className="rounded-2xl overflow-hidden bg-[#101828] border border-[#1E293B] text-white grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-elevated">
            <div className="lg:col-span-6 flex">
              <MediaFrame
                src={featured.image!}
                alt={featured.imageAlt!}
                title={featured.title}
                aspectClass="aspect-[4/3] lg:h-full lg:min-h-[320px]"
                darkFallback={true}
                className="flex-1"
              />
            </div>

            <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                  <span className="text-[#22D3EE] font-semibold">{featured.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.domain}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {featured.title}
                </h3>

                <p className="text-sm text-[#CBD5E1] leading-relaxed">
                  {featured.summary}
                </p>

                <div className="pt-2 text-xs font-mono text-[#94A3B8]">
                  {featured.stack}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onOpenProject(featured.targetPage, featured.aiTab)}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{featured.actionLabel}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(summaryOnly && (filter === 'All' || filter === 'Applied AI') ? secondary : visibleProjects).map((proj) => (
            <InteractiveCard
              key={proj.id}
              onClick={() => onOpenProject(proj.targetPage, proj.aiTab)}
              className="group cursor-pointer rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/50 hover:shadow-elevated transition-all p-7 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#2563EB] font-semibold">{proj.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate max-w-[240px]">{proj.domain}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                    {proj.icon}
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-[#172033] group-hover:text-[#2563EB] transition-colors">
                  {proj.title}
                </h3>

                <p className="text-sm text-[#64748B] leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono text-[#64748B]">{proj.stack}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenProject(proj.targetPage, proj.aiTab);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] group-hover:text-[#1D4ED8] whitespace-nowrap shrink-0"
                >
                  <span>{proj.actionLabel}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
}
