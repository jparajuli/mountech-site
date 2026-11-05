import React from 'react';
import { 
  GraduationCap, Database, Building2, Cpu, Users, 
  ArrowRight, Globe2
} from 'lucide-react';

interface CoreSolutionsProps {
  onSelectSolution?: (targetPage: string) => void;
}

interface PillarSummary {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  targetPage: string;
  ctaText: string;
  icon: React.ReactNode;
  accentClass: string;
}

const PILLARS: PillarSummary[] = [
  {
    id: 'academy',
    number: '01',
    title: 'Mountech Academy',
    tag: 'Technical Education',
    description: 'Applied 40-hour cohorts in Agentic AI Systems, Transformer Foundations, and Cloud Engineering.',
    targetPage: 'school',
    ctaText: 'Explore Tracks',
    icon: <GraduationCap size={18} className="text-cohere-teal" />,
    accentClass: 'text-cohere-teal'
  },
  {
    id: 'datascience',
    number: '02',
    title: 'Data Science',
    tag: 'Analytics & OLAP',
    description: 'High-throughput data pipelines, sub-20ms OLAP querying, and scalable lakehouse architectures.',
    targetPage: 'datascience',
    ctaText: 'View Architectures',
    icon: <Database size={18} className="text-[#0284c7]" />,
    accentClass: 'text-[#0284c7]'
  },
  {
    id: 'consulting',
    number: '03',
    title: 'Technology Consulting',
    tag: 'Enterprise Advisory',
    description: 'Systems modernization, DevSecOps pipelines, and compliance audits led by senior engineering pods.',
    targetPage: 'consulting',
    ctaText: 'Request Audit',
    icon: <Building2 size={18} className="text-cohere-ink" />,
    accentClass: 'text-cohere-ink'
  },
  {
    id: 'ai',
    number: '04',
    title: 'AI Systems & Tools',
    tag: 'Disaster AI & Agents',
    description: 'Operational hydrological early warnings, B2B trade compliance swarms, and sovereign AI R&D.',
    targetPage: 'ai',
    ctaText: 'Discover Tools',
    icon: <Cpu size={18} className="text-cohere-coral" />,
    accentClass: 'text-cohere-coral'
  },
  {
    id: 'community',
    number: '05',
    title: 'MLDSN Community Hub',
    tag: 'Non-Profit Ecosystem',
    description: 'Grassroots network connecting 10,000+ engineers, open-source projects, and research fellows since 2018.',
    targetPage: 'community',
    ctaText: 'Visit Community',
    icon: <Users size={18} className="text-emerald-600" />,
    accentClass: 'text-emerald-600'
  }
];

export default function CoreSolutions({ onSelectSolution }: CoreSolutionsProps) {
  return (
    <section 
      id="core-solutions"
      aria-label="Core Focus Areas"
      className="py-14 sm:py-20 bg-[#fbfbfa] border-b border-black/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <header className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cohere-slate">
            <span className="font-semibold text-cohere-ink uppercase tracking-wider">Five Strategic Pillars</span>
            <span aria-hidden="true">·</span>
            <span>Applied Infrastructure</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-cohere-ink tracking-tight text-balance">
            Our Core Strategic Pillars
          </h2>

          <p className="text-sm text-cohere-subtle leading-relaxed">
            Delivering practical technology solutions across five clear domains: education, data engineering, enterprise consulting, applied AI systems, and nationwide community development.
          </p>
        </header>

        {/* ── CORE STRATEGIC PORTFOLIO PILLAR FEATURE STRIP ── */}
        <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-r from-white via-[#fbfbfa] to-cohere-stone/60 border border-cohere-coral/20 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-1.5 text-xs font-mono text-cohere-coral font-semibold uppercase tracking-wider">
              <Globe2 size={13} />
              <span>Core Portfolio Mandate</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-cohere-ink">
              Promoting AI Solutions &amp; Capacity Building in Nepal
            </h3>
            <p className="text-xs sm:text-sm text-cohere-ink/80 leading-relaxed">
              Bridging the gap between global AI advancements and local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.
            </p>
          </div>

          <button
            onClick={() => onSelectSolution?.('ai')}
            className="rounded-full px-5 py-2 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm transition-all flex items-center justify-center gap-1.5 whitespace-nowrap self-start md:self-auto shrink-0 active:scale-95"
          >
            <span>Explore AI Portal</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* ── 5 PILLARS: MINIMAL, LIGHTWEIGHT & CLEAN GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PILLARS.map((pillar) => (
            <div 
              key={pillar.id}
              className="bg-white rounded-xl p-5 border border-black/[0.08] hover:border-black/[0.2] transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg bg-[#f4f3ef]">
                    {pillar.icon}
                  </div>
                  <span className="font-mono text-xs font-semibold text-cohere-slate">
                    {pillar.number}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-cohere-slate block mb-0.5">
                    {pillar.tag}
                  </span>
                  <h3 className="font-display text-base font-bold text-cohere-ink leading-snug">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs text-cohere-subtle leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-2 border-t border-black/[0.05]">
                <button
                  onClick={() => onSelectSolution?.(pillar.targetPage)}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-cohere-ink hover:text-cohere-coral transition-colors group"
                >
                  <span>{pillar.ctaText}</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-cohere-slate group-hover:text-cohere-coral" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
