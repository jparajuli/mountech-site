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
      'Integrates DHM river telemetry, ESA Sentinel radar data, physics-informed neural networks (PINNs), and CAP-v1.2 Devanagari voice alerting.',
    stack: 'Apache Kafka · T-GCN & PINNs · CAP-v1.2 · Devanagari TTS',
    targetPage: 'ai',
    aiTab: 'disaster',
    actionLabel: 'Inspect Telemetry Model',
    image: MEDIA_ASSETS.hydroDisasterAi,
    imageAlt: 'Geospatial hydrological contour visualization of Himalayan river valley terrain',
    icon: <Waves size={18} className="text-[#2EB6E0]" />,
  },
  {
    id: 'multi-agent-trade',
    category: 'Engineering Systems',
    title: 'B2B Customs & Trade Multi-Agent Workflows',
    domain: 'Cross-Border Compliance · DAG Orchestration',
    summary:
      'Multi-agent pipeline automating ASYCUDA Harmonized System (HS Code) classification and Letter of Credit reconciliation.',
    stack: 'Agentic DAGs · Structured JSON Schema · OCR',
    targetPage: 'ai',
    aiTab: 'agents',
    actionLabel: 'Open Agent Workbench',
    icon: <Bot size={18} className="text-[#0284C7]" />,
  },
  {
    id: 'doc-intel-pii',
    category: 'Engineering Systems',
    title: 'Devanagari Document Intelligence & PII Redaction',
    domain: 'Bilingual NLP · Air-Gapped Sanitization',
    summary:
      'On-premise regex and NER entity masking engineered for bilingual Nepali-English records with zero external egress.',
    stack: 'Devanagari OCR · On-Premise NER · Zero-Egress',
    targetPage: 'ai',
    aiTab: 'doc-intel',
    actionLabel: 'Launch PII Sandbox',
    icon: <FileText size={18} className="text-[#15803D]" />,
  },
  {
    id: 'data-tiers',
    category: 'Engineering Systems',
    title: 'Enterprise Data Science & Lakehouse Tiers',
    domain: 'Streaming OLAP · Storage Matrix',
    summary:
      'Scalable data pipelines calibrated from SMB reporting to high-throughput ClickHouse, Qdrant, and Apache Iceberg clusters.',
    stack: 'PostgreSQL · DuckDB · ClickHouse · Qdrant',
    targetPage: 'datascience',
    actionLabel: 'Explore Storage Matrix',
    icon: <Database size={18} className="text-[#0284C7]" />,
  },
  {
    id: 'project-alpine',
    category: 'R&D Pilot',
    title: 'Project Alpine: Sovereign AI Exploration',
    domain: 'Active R&D Pilot · Devanagari BPE & Hydro Compute',
    summary:
      'Internal R&D investigating byte-level Devanagari tokenization and local hydroelectric compute sizing for open-weight models.',
    stack: 'Byte-Level BPE · Quantization · Hydropower Sizing',
    targetPage: 'ai',
    aiTab: 'sovereign',
    actionLabel: 'Read R&D Blueprint',
    icon: <FlaskConical size={18} className="text-[#15803D]" />,
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
      aria-label="Projects and Applied Initiatives"
      className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <RevealBlock>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#0284C7] font-semibold">
                <span>Projects &amp; Initiatives</span>
                <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                <span className="text-[#15803D]">Applied Portfolio</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F1E2E] tracking-tight">
                Real architectures built for local reliability.
              </h2>

              <p className="text-sm sm:text-base text-[#5A6D7E] leading-relaxed">
                Inspect our applied AI tools, interactive engineering sandboxes, and active research pilots.
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl self-start lg:self-auto overflow-x-auto max-w-full">
              {(['All', 'Applied AI', 'Engineering Systems', 'R&D Pilot'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                    filter === tab
                      ? 'bg-[#0284C7] text-white font-semibold'
                      : 'text-[#5A6D7E] hover:text-[#0F1E2E]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </RevealBlock>

        {summaryOnly && (filter === 'All' || filter === 'Applied AI') && (
          <div className="rounded-2xl overflow-hidden bg-[#0B1924] border border-[#122636] text-white grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-elevated">
            <div className="lg:col-span-6 flex">
              <MediaFrame
                src={featured.image!}
                alt={featured.imageAlt!}
                title={featured.title}
                aspectClass="aspect-[4/3] lg:h-full lg:min-h-[300px]"
                darkFallback={true}
                className="flex-1"
              />
            </div>

            <div className="lg:col-span-6 p-7 sm:p-9 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                  <span className="text-[#2EB6E0] font-semibold">{featured.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.domain}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {featured.title}
                </h3>

                <p className="text-sm text-[#CBD5E1] leading-relaxed">
                  {featured.summary}
                </p>

                <div className="pt-1 text-xs font-mono text-[#4ADE80]">
                  {featured.stack}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onOpenProject(featured.targetPage, featured.aiTab)}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span>{featured.actionLabel}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(summaryOnly && (filter === 'All' || filter === 'Applied AI') ? secondary : visibleProjects).map((proj) => (
            <InteractiveCard
              key={proj.id}
              onClick={() => onOpenProject(proj.targetPage, proj.aiTab)}
              className="group cursor-pointer rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0284C7]/60 hover:bg-white hover:shadow-elevated transition-all p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#5A6D7E]">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[#15803D] font-semibold shrink-0">{proj.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{proj.domain}</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD]/60 flex items-center justify-center shrink-0">
                    {proj.icon}
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-[#0F1E2E] group-hover:text-[#0284C7] transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5A6D7E] leading-relaxed">
                  {proj.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono text-[#5A6D7E]">{proj.stack}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] group-hover:text-[#0369A1] whitespace-nowrap shrink-0">
                  <span>{proj.actionLabel}</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
}
