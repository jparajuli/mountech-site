import React from 'react';
import {
  Brain, BarChart3, FlaskConical, Cpu, Layers, GraduationCap, ArrowRight, Globe2
} from 'lucide-react';
import { RevealBlock, InteractiveCard } from './MotionPrimitives';

interface CoreSolutionsProps {
  onSelectSolution?: (
    targetPage: string,
    aiTab?: 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel'
  ) => void;
}

interface ExpertiseArea {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  targetPage: string;
  aiTab?: 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel';
  icon: React.ReactNode;
  featured?: boolean;
}

const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    id: 'ai-ml',
    number: '01',
    title: 'Artificial Intelligence & Machine Learning',
    subtitle: 'Applied Modeling · Disaster Prediction · Bilingual NLP',
    description:
      'Production machine learning systems engineered for real-world Nepali contexts—spanning physics-informed hydrological flood forecasting, temporal graph networks, and domain-tuned models.',
    targetPage: 'ai',
    aiTab: 'disaster',
    icon: <Brain size={20} className="text-[#2563EB]" />,
    featured: true,
  },
  {
    id: 'data-science',
    number: '02',
    title: 'Data Science & Analytics',
    subtitle: 'ETL Pipelines · Vector OLAP · Enterprise Warehouses',
    description:
      'Structured data architectures across SMB and enterprise scales, utilizing PostgreSQL, DuckDB, ClickHouse, Qdrant, and Apache Iceberg for low-latency decision intelligence.',
    targetPage: 'datascience',
    icon: <BarChart3 size={20} className="text-[#2563EB]" />,
  },
  {
    id: 'applied-research',
    number: '03',
    title: 'Applied AI Research',
    subtitle: 'Devanagari Tokenization · Sovereign AI Pilot',
    description:
      'Dedicated research under Project Alpine investigating custom Devanagari BPE tokenizers, air-gapped model execution, and energy-efficient hydroelectric compute sizing.',
    targetPage: 'ai',
    aiTab: 'sovereign',
    icon: <FlaskConical size={20} className="text-[#6366F1]" />,
  },
  {
    id: 'ai-engineering',
    number: '04',
    title: 'AI Engineering and Solutions',
    subtitle: 'Multi-Agent DAGs · Document OCR · PII Redaction',
    description:
      'Deterministic multi-agent workflows for ASYCUDA trade compliance and air-gapped Devanagari document parsing with sub-15ms sensitive entity masking.',
    targetPage: 'ai',
    aiTab: 'agents',
    icon: <Cpu size={20} className="text-[#2563EB]" />,
  },
  {
    id: 'emerging-tech',
    number: '05',
    title: 'Emerging Technologies',
    subtitle: 'Cloud-Native DevSecOps · Distributed Systems · Quantum Foundations',
    description:
      'Systems modernization advisory, zero-trust Kubernetes deployments, cryptographic consensus architecture, and research readiness in emerging computational paradigms.',
    targetPage: 'consulting',
    icon: <Layers size={20} className="text-[#0891B2]" />,
  },
  {
    id: 'education-training',
    number: '06',
    title: 'Technical Education and Training',
    subtitle: 'Mountech Academy · 40-Hour Intensive Cohorts',
    description:
      'Practitioner-led 40-hour engineering masterclasses and workforce upskilling across Agentic AI, Transformers, MLOps, Cybersecurity, Data Engineering, and Cloud Operations.',
    targetPage: 'school',
    icon: <GraduationCap size={20} className="text-[#2563EB]" />,
    featured: true,
  },
];

export default function CoreSolutions({ onSelectSolution }: CoreSolutionsProps) {
  return (
    <section
      id="core-expertise"
      aria-label="Our Core Expertise"
      className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-[#E2E8F0] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Capacity Building Mandate */}
        <RevealBlock>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] font-semibold">
                <span>Our Core Expertise</span>
                <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                <span className="text-[#64748B] font-normal">Six Integrated Practices</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                Focused capabilities across research, engineering, and education.
              </h2>

              <p className="text-base text-[#64748B] leading-relaxed max-w-2xl">
                Every service reflects active engineering practice at MounTech Solution—combining foundational computer science, production data systems, and tailored training for Nepal&apos;s technical ecosystem.
              </p>
            </div>

            {/* Strategic Portfolio Pillar Strip */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2563EB]">
                <Globe2 size={15} />
                <span>Strategic Portfolio Mandate</span>
              </div>
              <h3 className="font-display text-base font-bold text-[#172033]">
                Promoting AI Solutions &amp; Capacity Building in Nepal
              </h3>
              <p className="text-xs text-[#334155] leading-relaxed">
                Bridging the gap between global AI advancements and local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.
              </p>
            </div>
          </div>
        </RevealBlock>

        {/* Asymmetric 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERTISE_AREAS.map((area) => (
            <InteractiveCard
              key={area.id}
              onClick={() => onSelectSolution?.(area.targetPage, area.aiTab)}
              className="group cursor-pointer rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/50 hover:shadow-elevated transition-all p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center">
                    {area.icon}
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#64748B] tabular-nums">
                    {area.number}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs text-[#64748B] font-medium">
                    {area.subtitle}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#172033] group-hover:text-[#2563EB] transition-colors">
                    {area.title}
                  </h3>
                </div>

                <p className="text-sm text-[#64748B] leading-relaxed">
                  {area.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSolution?.(area.targetPage, area.aiTab);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563EB] group-hover:text-[#1D4ED8] transition-colors whitespace-nowrap"
                >
                  <span>Discover more</span>
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
