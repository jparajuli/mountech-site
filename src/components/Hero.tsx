import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, BarChart3, Cpu, GraduationCap
} from 'lucide-react';
import { MEDIA_ASSETS } from '../assets/media';
import MediaFrame from './MediaFrame';

interface HeroProps {
  setRoute?: (route: {
    page: string;
    courseId: string;
    aiTab?: 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel';
  }) => void;
}

export default function Hero({ setRoute }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'datascience' | 'academy'>('ai');
  const shouldReduceMotion = useReducedMotion();

  const scrollToSolutions = () => {
    const el = document.getElementById('core-expertise');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setRoute?.({ page: 'services', courseId: 'ai-agents', aiTab: 'overview' });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden mt-hero-gradient text-[#F8FAFC] border-b border-white/10">
      <div className="absolute inset-0 mt-grid-dark opacity-70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24 space-y-12">
        {/* Two-column balanced hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Narrative */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <span className="text-[#22D3EE] font-medium">MounTech Solution</span>
              <span aria-hidden="true">·</span>
              <span>Applied AI &amp; Data Science</span>
              <span aria-hidden="true">·</span>
              <span>Kathmandu, Nepal</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-[#F8FAFC] text-balance">
              Engineering Intelligence.{' '}
              <span className="text-[#22D3EE]">Empowering Innovation.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-xl">
              MounTech Solution applies artificial intelligence, data science, and engineering research to build resilient systems and technical capacity for Nepal. We bridge global AI advancements with local implementation across enterprise consulting, applied systems, and Mountech Academy.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                id="cta-explore-solutions"
                onClick={scrollToSolutions}
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-glow-blue transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                id="cta-lets-collaborate"
                onClick={scrollToContact}
                className="px-6 py-3 rounded-lg text-sm font-semibold bg-white/10 hover:bg-white/15 text-[#F8FAFC] border border-white/15 transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Let&apos;s Collaborate</span>
                <ArrowUpRight size={15} className="text-[#22D3EE]" />
              </button>
            </div>
          </motion.div>

          {/* Right Architectural Hero Graphic */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex items-stretch"
          >
            <div className="w-full rounded-2xl overflow-hidden border border-white/15 bg-[#0B1120] shadow-elevated flex flex-col">
              <MediaFrame
                src={MEDIA_ASSETS.heroAiNetwork}
                alt="Abstract computational neural network transitioning into Himalayan topographic contours"
                title="Applied AI & Computational Systems for Nepal"
                aspectClass="aspect-[16/9] lg:h-full lg:min-h-[340px]"
                eager={true}
                darkFallback={true}
                className="flex-1"
              />
              <div className="px-5 py-3.5 bg-[#101828]/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A3B8]">
                <span className="font-medium text-[#F8FAFC]">Promoting AI Solutions &amp; Capacity Building in Nepal</span>
                <span className="font-mono text-[#22D3EE]">Research · Engineering · Education</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width below-split interactive capability selector */}
        <div className="rounded-2xl bg-[#182235]/85 backdrop-blur-md border border-white/10 overflow-hidden">
          <div className="px-4 sm:px-6 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('ai')}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  activeTab === 'ai'
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#CBD5E1] hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu size={14} />
                <span>Applied AI Systems</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('datascience')}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  activeTab === 'datascience'
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#CBD5E1] hover:text-white hover:bg-white/5'
                }`}
              >
                <BarChart3 size={14} />
                <span>Data Science &amp; Analytics</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('academy')}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  activeTab === 'academy'
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#CBD5E1] hover:text-white hover:bg-white/5'
                }`}
              >
                <GraduationCap size={14} />
                <span>Mountech Academy (40h)</span>
              </button>
            </div>

            <span className="text-xs text-[#94A3B8] hidden sm:inline">
              Core Engineering &amp; Education Focus
            </span>
          </div>

          <div className="p-6 sm:p-7">
            {activeTab === 'ai' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-9 space-y-2">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                    Hydrological Early Warning, Multi-Agent Workflows &amp; Devanagari Document AI
                  </h2>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed">
                    Operational AI frameworks spanning 3-layer river basin surge modeling, ASYCUDA customs classification DAGs, air-gapped PII redaction, and our active Sovereign AI research pilot.
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
                    <span>DHM Sensor Telemetry</span>
                    <span aria-hidden="true">·</span>
                    <span>Deterministic B2B Agents</span>
                    <span aria-hidden="true">·</span>
                    <span>Project Alpine R&amp;D Pilot</span>
                  </div>
                </div>
                <div className="lg:col-span-3 flex lg:justify-end">
                  <button
                    type="button"
                    onClick={() => setRoute?.({ page: 'ai', courseId: 'ai-agents', aiTab: 'overview' })}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-white text-[#101828] hover:bg-[#EFF6FF] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Explore AI Lab</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'datascience' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-9 space-y-2">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                    Scalable ETL Pipelines, Vector OLAP &amp; Enterprise Data Platforms
                  </h2>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed">
                    Structured data architectures calibrated for small businesses through national-scale analytical workloads using PostgreSQL, DuckDB, ClickHouse, Qdrant, and Apache Iceberg.
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
                    <span>Automated ETL Pipelines</span>
                    <span aria-hidden="true">·</span>
                    <span>Low-Latency OLAP</span>
                    <span aria-hidden="true">·</span>
                    <span>Systems Modernization</span>
                  </div>
                </div>
                <div className="lg:col-span-3 flex lg:justify-end">
                  <button
                    type="button"
                    onClick={() => setRoute?.({ page: 'datascience', courseId: 'ai-agents' })}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-white text-[#101828] hover:bg-[#EFF6FF] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Inspect Data Tiers</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'academy' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-9 space-y-2">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                    40-Hour Applied Engineering Masterclasses &amp; Workforce Upskilling
                  </h2>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed">
                    Cohort-based technical education covering Agentic AI, Transformer architectures, MLOps, Cybersecurity, Cloud DevSecOps, and Data Engineering—paired with the MLDSN Nepal network.
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
                    <span>30% Foundations · 70% Labs</span>
                    <span aria-hidden="true">·</span>
                    <span>12 Intensive Tracks</span>
                    <span aria-hidden="true">·</span>
                    <span>Live Faculty Mentorship</span>
                  </div>
                </div>
                <div className="lg:col-span-3 flex lg:justify-end">
                  <button
                    type="button"
                    onClick={() => setRoute?.({ page: 'school', courseId: 'ai-agents' })}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-white text-[#101828] hover:bg-[#EFF6FF] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Browse Academy</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
