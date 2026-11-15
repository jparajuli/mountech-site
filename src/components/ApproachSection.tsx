import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search, Lightbulb, Code2, Rocket, Compass, ArrowRight
} from 'lucide-react';
import { RevealBlock } from './MotionPrimitives';

interface ApproachStage {
  step: string;
  title: string;
  summary: string;
  detail: string;
  deliverable: string;
  icon: React.ReactNode;
}

const STAGES: ApproachStage[] = [
  {
    step: '01',
    title: 'Research',
    summary: 'Contextual problem framing, literature grounding, and local data evaluation.',
    detail:
      'Every engagement starts by studying domain constraints in Nepal—from Devanagari morphological tokenization to Himalayan catchment hydrology and institutional compliance boundaries.',
    deliverable: 'Technical Feasibility & Baseline Benchmarks',
    icon: <Search size={18} />,
  },
  {
    step: '02',
    title: 'Innovation',
    summary: 'Adapting frontier architectures to fit local compute, language, and latency realities.',
    detail:
      'Rather than importing brittle wrappers, we prototype physics-informed neural networks, byte-level tokenizers, and hybrid deterministic-agent graphs built for domestic environments.',
    deliverable: 'Validated Architecture & Prototype Models',
    icon: <Lightbulb size={18} />,
  },
  {
    step: '03',
    title: 'Engineering',
    summary: 'Production software craft with strict schema contracts, security, and observability.',
    detail:
      'Systems are built on typed pipelines, vectorized OLAP stores, zero-trust container topologies, and automated test suites so models behave reliably under real operational loads.',
    deliverable: 'Hardened Pipelines, APIs & Agent Runtimes',
    icon: <Code2 size={18} />,
  },
  {
    step: '04',
    title: 'Implementation',
    summary: 'Smooth enterprise integration, air-gapped deployment, and team knowledge transfer.',
    detail:
      'We deploy into existing institutional infrastructure—whether connecting ASYCUDA customs workflows, DHM river gauges, or private clouds—paired with hands-on workforce training.',
    deliverable: 'Live Deployment & Team Enablement',
    icon: <Rocket size={18} />,
  },
  {
    step: '05',
    title: 'Impact',
    summary: 'Sustained local capability through continuous iteration and ecosystem capacity building.',
    detail:
      'True success means Nepalese engineers and institutions can operate, audit, and evolve their systems independently—supported by Mountech Academy and the MLDSN community.',
    deliverable: 'Autonomous Operations & Workforce Readiness',
    icon: <Compass size={18} />,
  },
];

export default function ApproachSection({
  onExploreServices,
}: {
  onExploreServices?: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeStage = STAGES[activeIndex];

  return (
    <section
      id="our-approach"
      aria-label="Our Approach"
      className="py-20 sm:py-28 bg-white border-b border-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <RevealBlock>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] font-semibold">
                <span>Our Approach</span>
                <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                <span className="text-[#64748B] font-normal">Five-Stage Delivery Methodology</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                How ideas move from research to durable impact.
              </h2>

              <p className="text-base text-[#64748B] leading-relaxed">
                Select any stage in our methodology to inspect how MounTech connects rigorous research with production engineering and long-term capacity building.
              </p>
            </div>

            {onExploreServices && (
              <button
                type="button"
                onClick={onExploreServices}
                className="px-5 py-2.5 rounded-lg text-xs font-semibold border border-[#E2E8F0] hover:border-[#2563EB] text-[#172033] hover:text-[#2563EB] transition-colors flex items-center gap-2 self-start md:self-auto whitespace-nowrap shrink-0"
              >
                <span>Explore Consulting &amp; Services</span>
                <ArrowRight size={13} />
              </button>
            )}
          </div>
        </RevealBlock>

        {/* Interactive 5-Stage Horizontal Step Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={stage.step}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                  isActive
                    ? 'bg-[#101828] border-[#101828] text-white shadow-elevated'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#172033] hover:bg-[#EFF6FF] hover:border-[#BFDBFE]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-mono text-xs font-semibold tabular-nums ${
                      isActive ? 'text-[#22D3EE]' : 'text-[#2563EB]'
                    }`}
                  >
                    {stage.step}
                  </span>
                  <span className={isActive ? 'text-[#22D3EE]' : 'text-[#64748B]'}>
                    {stage.icon}
                  </span>
                </div>
                <div>
                  <div className="font-display text-sm font-bold">{stage.title}</div>
                  <div
                    className={`text-xs mt-1 line-clamp-2 leading-snug ${
                      isActive ? 'text-[#CBD5E1]' : 'text-[#64748B]'
                    }`}
                  >
                    {stage.summary}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Panel */}
        <div className="rounded-2xl bg-[#EFF6FF]/65 border border-[#BFDBFE] p-6 sm:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.step}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-8 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] font-semibold">
                  <span>Stage {activeStage.step}</span>
                  <span aria-hidden="true">·</span>
                  <span>Research → Innovation → Engineering → Implementation → Impact</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#172033]">
                  {activeStage.step}. {activeStage.title}
                </h3>
                <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                  {activeStage.detail}
                </p>
              </div>

              <div className="lg:col-span-4 p-5 rounded-xl bg-white border border-[#E2E8F0] space-y-1.5 shadow-subtle">
                <div className="text-xs font-mono text-[#64748B]">Primary Stage Output</div>
                <div className="text-sm font-bold text-[#172033]">{activeStage.deliverable}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
