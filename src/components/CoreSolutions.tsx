import React, { useState } from 'react';
import {
  GraduationCap, Database, Cpu, Building2, Users, ArrowRight
} from 'lucide-react';
import { RevealBlock, InteractiveCard } from './MotionPrimitives';

interface CoreSolutionsProps {
  onSelectSolution?: (
    targetPage: string,
    aiTab?: 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel'
  ) => void;
}

interface CorePillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  targetPage: string;
  aiTab?: 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel';
  icon: React.ReactNode;
}

const CORE_PILLARS: CorePillar[] = [
  {
    id: 'academy',
    number: '01',
    title: 'Mountech Academy',
    subtitle: '40-Hour Intensive Cohorts',
    description: 'Hands-on cohorts in Agentic AI, Transformers, MLOps, Cybersecurity, and Cloud.',
    targetPage: 'school',
    icon: <GraduationCap size={18} className="text-[#0284C7]" />,
  },
  {
    id: 'datascience',
    number: '02',
    title: 'Data Science & Analytics',
    subtitle: 'Pipelines & OLAP',
    description: 'Automated ETL pipelines, vector indexing, and scalable lakehouse tiers from SMB to enterprise.',
    targetPage: 'datascience',
    icon: <Database size={18} className="text-[#15803D]" />,
  },
  {
    id: 'consulting',
    number: '03',
    title: 'Technology Consulting',
    subtitle: 'Modernization & DevSecOps',
    description: 'Legacy systems refactoring, zero-trust cloud operations, and practical AI integration.',
    targetPage: 'consulting',
    icon: <Building2 size={18} className="text-[#0284C7]" />,
  },
  {
    id: 'ai',
    number: '04',
    title: 'Applied AI & Research',
    subtitle: 'Disaster AI · Agents · Pilot',
    description: 'Hydrological flood modeling, customs multi-agent DAGs, Devanagari PII masking, and Sovereign AI R&D.',
    targetPage: 'ai',
    aiTab: 'overview',
    icon: <Cpu size={18} className="text-[#15803D]" />,
  },
  {
    id: 'community',
    number: '05',
    title: 'MLDSN Community',
    subtitle: 'Nepal Ecosystem',
    description: 'Non-profit network connecting 10,000+ AI learners, fellowships, and open workshops since 2018.',
    targetPage: 'community',
    icon: <Users size={18} className="text-[#0284C7]" />,
  },
];

const APPROACH_STEPS = [
  { step: '01', title: 'Research', focus: 'Evaluate local constraints, telemetry signals, and Devanagari language characteristics.' },
  { step: '02', title: 'Innovation', focus: 'Adapt neural and deterministic architectures for Nepal compute and operational realities.' },
  { step: '03', title: 'Engineering', focus: 'Build typed pipelines, hardened containers, and auditable multi-agent graphs.' },
  { step: '04', title: 'Implementation', focus: 'Integrate smoothly into institutional workflows with air-gapped privacy safeguards.' },
  { step: '05', title: 'Impact', focus: 'Transfer capability through hands-on team upskilling and Academy cohorts.' },
];

export default function CoreSolutions({ onSelectSolution }: CoreSolutionsProps) {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section
      id="core-expertise"
      aria-label="Core Areas & Approach"
      className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <RevealBlock>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#0284C7] font-semibold">
                <span>Five Focus Areas</span>
                <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                <span className="text-[#15803D]">Nepal Capacity Building</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F1E2E] tracking-tight">
                Promoting AI Solutions &amp; Capacity Building in Nepal
              </h2>

              <p className="text-sm sm:text-base text-[#5A6D7E] leading-relaxed">
                Bridging the gap between <strong className="font-bold text-[#0F1E2E]">global AI advancements</strong> and{' '}
                <strong className="font-bold text-[#0F1E2E]">local implementation</strong> through{' '}
                <strong className="font-bold text-[#0F1E2E]">Mountech Academy</strong>,{' '}
                <strong className="font-bold text-[#0F1E2E]">workforce upskilling</strong>, and{' '}
                <strong className="font-bold text-[#0F1E2E]">enterprise solution adoption</strong>.
              </p>
            </div>
          </div>
        </RevealBlock>

        {/* Clean 5-Pillar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CORE_PILLARS.map((pillar) => (
            <InteractiveCard
              key={pillar.id}
              onClick={() => onSelectSolution?.(pillar.targetPage, pillar.aiTab)}
              className="group cursor-pointer rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0284C7]/60 hover:shadow-elevated transition-all p-5 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD]/60 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#5A6D7E] tabular-nums">
                    {pillar.number}
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-[#15803D] font-medium">
                    {pillar.subtitle}
                  </div>
                  <h3 className="font-display text-base font-bold text-[#0F1E2E] group-hover:text-[#0284C7] transition-colors mt-0.5">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs text-[#5A6D7E] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0]">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] group-hover:text-[#0369A1]">
                  <span>Explore</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </InteractiveCard>
          ))}
        </div>

        {/* Compact Interactive Our Approach Strip */}
        <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 sm:p-7 space-y-5 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="text-xs font-mono text-[#5A6D7E]">
              <strong className="font-bold text-[#0F1E2E]">Our Approach:</strong> Research → Innovation → Engineering → Implementation → Impact
            </div>
            <span className="text-xs text-[#5A6D7E]">Select a stage to view focus</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {APPROACH_STEPS.map((s, idx) => {
              const isSelected = idx === activeStage;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`px-3.5 py-2.5 rounded-lg border text-left transition-colors flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#0B1924] border-[#0B1924] text-white'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F1E2E] hover:bg-[#F0F9FF]'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-semibold tabular-nums ${
                      isSelected ? 'text-[#2EB6E0]' : 'text-[#0284C7]'
                    }`}
                  >
                    {s.step}
                  </span>
                  <span className="text-xs font-semibold truncate">{s.title}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-[#334155]">
            <div>
              <strong className="text-[#0F1E2E]">{APPROACH_STEPS[activeStage].title}: </strong>
              {APPROACH_STEPS[activeStage].focus}
            </div>
            <button
              type="button"
              onClick={() => onSelectSolution?.('services')}
              className="text-xs font-semibold text-[#15803D] hover:underline whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              Consulting &amp; Data Services →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
