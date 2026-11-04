import React, { useState } from 'react';
import { 
  GraduationCap, Database, Building2, Cpu, Users, 
  ArrowRight, CheckCircle2, ShieldCheck, ArrowUpRight,
  Sparkles, Globe2, BookOpen, Briefcase
} from 'lucide-react';

interface CoreSolutionsProps {
  onSelectSolution?: (targetPage: string) => void;
}

interface KeyArea {
  id: string;
  number: string;
  title: string;
  kicker: string;
  tagline: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  targetPage: string;
  ctaText: string;
  colorClass: string;
}

const KEY_AREAS: KeyArea[] = [
  {
    id: 'academy',
    number: '01',
    title: 'Mountech Academy',
    kicker: 'Technical Pedagogy & Masterclasses',
    tagline: 'Rigorous 40-hour applied engineering cohorts and tailored corporate upskilling.',
    description: 'Bridging the divide between theory and production code. We offer deep-dive masterclasses in Agentic AI Systems, Transformer Foundations, Sovereign Cloud Defense, and Enterprise Data Engineering.',
    highlights: [
      'Hands-on 40-hour intensive syllabi with production code repos and capstone deployments',
      'Corporate upskilling modules tailored for executive leadership, product managers, and senior devs',
      'Industry-recognized digital certification verified through MLDSN Nepal ecosystem',
      'Interactive enrollment with instant admission pass generation and transparent tuition'
    ],
    metrics: [
      { label: 'Curriculum', value: '40 Hours Live' },
      { label: 'Masterclasses', value: '10+ Tracks' },
      { label: 'Cohort Size', value: 'Mentored Cohorts' }
    ],
    targetPage: 'school',
    ctaText: 'Explore Masterclasses',
    colorClass: 'text-cohere-teal'
  },
  {
    id: 'datascience',
    number: '02',
    title: 'Enterprise Data Science',
    kicker: 'Data Engineering & Scalable Analytics',
    tagline: 'High-throughput data pipelines, lakehouses, and predictive modeling matrices.',
    description: 'Transforming unstructured institutional records into actionable, deterministic intelligence. We architect three scalable tiers from lightweight SMB dashboards to multi-node banking OLAP clusters.',
    highlights: [
      'End-to-end automated ETL and real-time streaming data ingestion with Apache Kafka & Iceberg',
      'Sub-20ms analytical query response times utilizing ClickHouse and DuckDB local OLAP engines',
      'Predictive time-series modeling for financial forecasting, inventory routing, and customer retention',
      'Strict data governance and role-based access control complying with national standards'
    ],
    metrics: [
      { label: 'Streaming Speed', value: '< 20ms Query' },
      { label: 'Scalability', value: '3 Scaled Tiers' },
      { label: 'Stack Integrity', value: 'ACID Compliant' }
    ],
    targetPage: 'datascience',
    ctaText: 'View Data Science Matrix',
    colorClass: 'text-[#38bdf8]'
  },
  {
    id: 'consulting',
    number: '03',
    title: 'Technology Consulting',
    kicker: 'Systems Modernization & Advisory',
    tagline: 'Strategic infrastructure guidance, legacy refactoring, and compliance audits.',
    description: 'Partnering with CTOs and enterprise directors to modernize mission-critical systems. We deploy dedicated senior engineering pods to modernize legacy workloads and harden institutional nodes.',
    highlights: [
      'Comprehensive architectural audits for legacy monolithic workloads and cloud migrations',
      'DevSecOps pipelines, automated testing harnesses, and hardened zero-trust network boundaries',
      'Regulatory compliance roadmaps for banking secrecy, medical data privacy, and legal frameworks',
      'Fixed-timeline engineering pods with transparent milestone billing and handover guarantees'
    ],
    metrics: [
      { label: 'Delivery Model', value: 'Dedicated Pods' },
      { label: 'Audit Velocity', value: '2-Week Sprint' },
      { label: 'Coverage', value: 'End-to-End' }
    ],
    targetPage: 'consulting',
    ctaText: 'Request Advisory Audit',
    colorClass: 'text-cohere-ink'
  },
  {
    id: 'ai',
    number: '04',
    title: 'AI Solutions & Capacity Building',
    kicker: 'Core Strategic Portfolio Pillar',
    tagline: 'Bridging the gap between global AI advancements and local implementation across Nepal.',
    description: 'Promoting AI Solutions & Capacity Building in Nepal is one of our core strategic portfolio pillars. We actively bridge the gap between global AI developments and practical local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.',
    highlights: [
      'Tailored AI Education: Applied curriculum and hands-on cohorts through Mountech Academy',
      'Workforce Upskilling: Corporate workshops preparing executive leadership and developer teams',
      'Enterprise Solution Adoption: Production deployment of multi-agent workflows, customs automation, and document OCR',
      'National Resilience & R&D: AI Disaster Management flood warning and Sovereign AI hydro-compute pilot'
    ],
    metrics: [
      { label: 'Strategic Mandate', value: 'Capacity Building' },
      { label: 'Local Impact', value: 'Nationwide' },
      { label: 'Delivery Horizon', value: 'Production + Pilot' }
    ],
    targetPage: 'ai',
    ctaText: 'Discover AI Portfolio',
    colorClass: 'text-cohere-coral'
  },
  {
    id: 'community',
    number: '05',
    title: 'MLDSN Community Hub',
    kicker: 'Non-Profit Ecosystem & Open Research',
    tagline: 'Connecting over 10,000+ AI, ML, and data practitioners across Nepal since 2018.',
    description: 'Machine Learning and Data Science Network (MLDSN) Nepal is our official non-profit affiliate, cultivating grassroots technical talent, open-source AI tooling, academic publications, and rural data literacy.',
    highlights: [
      'Active network of 10,000+ students, researchers, and software engineers nationwide',
      'Organized 65+ technical workshops, open-source hackathons, and guest research seminars',
      'Open academic paper mentoring connecting regional university scholars with global conferences',
      'Grassroots initiatives promoting digital inclusion and local language NLP datasets'
    ],
    metrics: [
      { label: 'Community Size', value: '10,000+ Members' },
      { label: 'Founded', value: '2018 Kathmandu' },
      { label: 'Flagship Events', value: '65+ Completed' }
    ],
    targetPage: 'community',
    ctaText: 'Visit Community Hub',
    colorClass: 'text-emerald-600'
  }
];

export default function CoreSolutions({ onSelectSolution }: CoreSolutionsProps) {
  const [activeAreaId, setActiveAreaId] = useState<string>('ai');

  return (
    <section 
      id="core-solutions"
      aria-label="Core Focus Areas"
      className="py-20 sm:py-28 bg-[#fbfbfa] border-b border-black/[0.06] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <header className="max-w-3xl mb-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cohere-slate">
            <span className="font-semibold text-cohere-ink uppercase tracking-wider">Five Strategic Pillars</span>
            <span aria-hidden="true">·</span>
            <span>Applied Infrastructure</span>
            <span aria-hidden="true">·</span>
            <span>MounTech Solution</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cohere-ink tracking-tight text-balance">
            Our Core Focus Areas: Powering Nepal's Digital & AI Future
          </h2>

          <p className="text-base sm:text-lg text-cohere-subtle font-normal leading-relaxed">
            Organized across five disciplined pillars: practical education via Mountech Academy, enterprise data science, technical consulting, cutting-edge AI tools (including disaster management and sovereign AI R&D), and national community development.
          </p>
        </header>

        {/* ── CORE STRATEGIC PORTFOLIO PILLAR FEATURE BANNER ── */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white via-[#fbfbfa] to-cohere-stone/70 border border-cohere-coral/20 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cohere-coral/[0.04] rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cohere-coral font-semibold uppercase tracking-wider">
                <Globe2 size={14} />
                <span>Core Strategic Portfolio Pillar</span>
                <span aria-hidden="true">·</span>
                <span>National AI Capacity</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-cohere-ink tracking-tight">
                Promoting AI Solutions & Capacity Building in Nepal
              </h3>

              <p className="text-sm sm:text-base text-cohere-ink/80 leading-relaxed font-normal">
                Bridging the gap between global AI advancements and local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.
              </p>

              {/* 3 Core Execution Vectors */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white border border-black/[0.06] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-cohere-ink">
                    <BookOpen size={13} className="text-cohere-teal" />
                    <span>Tailored AI Education</span>
                  </div>
                  <div className="text-[11px] text-cohere-subtle">
                    40-hour hands-on masterclasses via Mountech Academy.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-black/[0.06] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-cohere-ink">
                    <Briefcase size={13} className="text-[#38bdf8]" />
                    <span>Workforce Upskilling</span>
                  </div>
                  <div className="text-[11px] text-cohere-subtle">
                    Corporate sprints for executive leadership & core devs.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-black/[0.06] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-cohere-ink">
                    <Cpu size={13} className="text-cohere-coral" />
                    <span>Enterprise Solution Adoption</span>
                  </div>
                  <div className="text-[11px] text-cohere-subtle">
                    Disaster AI, B2B multi-agents & document intelligence.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => onSelectSolution?.('ai')}
                className="rounded-full px-6 py-3 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
              >
                <span>Explore AI Solutions</span>
                <ArrowRight size={13} />
              </button>
              <button
                onClick={() => onSelectSolution?.('school')}
                className="rounded-full px-6 py-3 text-xs font-semibold bg-white hover:bg-cohere-stone text-cohere-ink border border-black/[0.1] shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
              >
                <span>View Upskilling Academy</span>
                <ArrowUpRight size={13} className="text-cohere-slate" />
              </button>
            </div>
          </div>
        </div>

        {/* ── 5 PILLARS BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KEY_AREAS.map((area, idx) => {
            const isSelected = activeAreaId === area.id;
            const isMarquee = idx === 3; // AI Solutions & Capacity Building given prominent focus

            return (
              <article 
                key={area.id}
                onMouseEnter={() => setActiveAreaId(area.id)}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 border ${
                  isMarquee ? 'md:col-span-2 lg:col-span-1' : ''
                } ${
                  isSelected 
                    ? 'bg-white border-cohere-ink shadow-lg ring-1 ring-black/5 -translate-y-0.5' 
                    : 'bg-[#f4f3ef]/80 hover:bg-white border-black/[0.08] shadow-sm'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="font-bold text-cohere-slate">
                      {area.number}. {area.kicker}
                    </span>
                    <span className={`font-semibold ${area.colorClass}`}>
                      Pillar {area.number}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-cohere-ink tracking-tight mb-1.5">
                    {area.title}
                  </h3>

                  <p className="text-xs font-mono text-cohere-slate mb-3 font-medium">
                    {area.tagline}
                  </p>

                  <p className="text-xs sm:text-[13px] text-cohere-subtle leading-relaxed mb-5">
                    {area.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-5 pt-3 border-t border-black/[0.06]">
                    {area.highlights.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-cohere-ink/90">
                        <CheckCircle2 size={13} className="text-cohere-teal shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Metrics & Action */}
                <div>
                  <div className="grid grid-cols-3 gap-1.5 p-2.5 rounded-xl bg-black/[0.03] border border-black/[0.04] mb-4 text-[10px] font-mono">
                    {area.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="text-center truncate">
                        <div className="text-cohere-slate uppercase tracking-tighter truncate">{m.label}</div>
                        <div className="font-bold text-cohere-ink truncate mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectSolution?.(area.targetPage)}
                    className="w-full rounded-full py-2.5 px-4 text-xs font-semibold bg-cohere-ink hover:bg-black text-white transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-sm whitespace-nowrap"
                  >
                    <span>{area.ctaText}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </article>
            );
          })}
        </div>

        {/* Advisory Callout Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-[#111116] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-lg">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-cohere-teal">
              <ShieldCheck size={14} />
              <span>Multi-Disciplinary Engineering Services</span>
            </div>
            <p className="font-display font-bold text-base sm:text-lg text-white">
              Looking for tailored enterprise solutions across Academy, Data Science, Consulting, or AI?
            </p>
            <p className="text-xs text-white/60">
              Our partners and engineering leads provide direct technical discovery and custom project scoping.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full px-6 py-2.5 text-xs font-semibold bg-white text-cohere-ink hover:bg-[#e4e2dc] transition-all shrink-0 active:scale-95 whitespace-nowrap"
          >
            Contact Advisory Leads
          </button>
        </div>

      </div>
    </section>
  );
}
