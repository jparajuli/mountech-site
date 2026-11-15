import React, { useState } from 'react';

interface ConsultingProps {
  summaryOnly?: boolean;
  onViewFull?: () => void;
}

export default function Consulting({ summaryOnly }: ConsultingProps) {
  const [legacySystem, setLegacySystem] = useState('Monolithic VM / On-Premise Stack');
  const [targetGoal, setTargetGoal] = useState('Automated Workflow & AI Integration');

  const estimatedWeeks =
    legacySystem.includes('Hybrid') || targetGoal.includes('Lakehouse') ? '6 – 10 Weeks' : '4 – 8 Weeks';

  const advisoryServices = [
    {
      code: '01',
      title: 'Cloud & Data Infrastructure Modernization',
      desc: 'Guiding enterprise teams on refactoring monolithic architectures, database indexing, lakehouse migrations, and containerized microservices.',
    },
    {
      code: '02',
      title: 'DevSecOps & Resilient Topologies',
      desc: 'Designing automated CI/CD deployment pipelines, zero-trust network boundaries, container security, and high-availability backup systems.',
    },
    {
      code: '03',
      title: 'Enterprise AI & Workflow Integration',
      desc: 'Assisting organizations with evaluating practical AI tool adoption, trade compliance automation, and aligning systems with institutional data governance.',
    },
  ];

  return (
    <div className={`${summaryOnly ? 'py-16' : 'py-16 sm:py-24'} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14`}>
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#5A6D7E]">
          <span className="font-semibold text-[#15803D]">Enterprise Advisory</span>
          <span aria-hidden="true">·</span>
          <span>MounTech Consulting Group</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F1E2E] tracking-tight">
          Architecting resilient enterprise systems.
        </h1>

        <p className="text-base sm:text-lg text-[#5A6D7E] leading-relaxed">
          From legacy refactoring to practical AI workflow adoption, our systems architects provide architectural blueprints, modernization audits, and dedicated engineering pods.
        </p>
      </div>

      {/* Interactive Transformation Scope Estimator */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-subtle space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#0284C7] font-semibold">
              Interactive Architecture Planner
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F1E2E]">
              Enterprise Transformation Scope Estimator
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5A6D7E]">Structured Milestone Delivery</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2.5">
            <label className="text-xs font-mono text-[#5A6D7E] block font-semibold">
              1. Current Foundation
            </label>
            <div className="space-y-2">
              {[
                'Monolithic VM / On-Premise Stack',
                'Basic SQL Database & Manual ETL',
                'Hybrid Cloud with Data Fragmentation',
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLegacySystem(item)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-colors ${
                    legacySystem === item
                      ? 'bg-[#F0F9FF] border-[#0284C7] font-semibold text-[#0F1E2E]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#5A6D7E] hover:text-[#0F1E2E]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <label className="text-xs font-mono text-[#5A6D7E] block font-semibold">
              2. Target Objective
            </label>
            <div className="space-y-2">
              {[
                'Automated Workflow & AI Integration',
                'Containerized Microservices & CI/CD',
                'Scalable Lakehouse & BI Matrix',
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTargetGoal(item)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-colors ${
                    targetGoal === item
                      ? 'bg-[#F0F9FF] border-[#0284C7] font-semibold text-[#0F1E2E]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#5A6D7E] hover:text-[#0F1E2E]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-[#0B1924] text-white space-y-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#2EB6E0]">Estimated Roadmap</div>
              <div className="text-2xl font-bold font-display text-white mt-1 tabular-nums">
                {estimatedWeeks}
              </div>
              <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed">
                Phased sprint discovery, architecture design &amp; pilot implementation for {legacySystem.split('/')[0].trim()}.
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1 text-xs">
              <div className="text-xs font-mono text-[#94A3B8]">Recommended Pod</div>
              <div className="font-semibold text-white">1 Principal Architect · 2 Systems Engineers</div>
            </div>

            <a
              href="#contact"
              className="w-full text-center rounded-lg py-2.5 px-4 text-xs font-semibold bg-[#15803D] hover:bg-[#166534] text-white transition-colors whitespace-nowrap shrink-0"
            >
              Request Architecture Assessment
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {advisoryServices.map((service) => (
          <div key={service.code} className="p-7 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-subtle">
            <div className="font-mono text-xs text-[#0284C7] font-bold">
              {service.code}.
            </div>
            <h3 className="font-display text-base font-bold text-[#0F1E2E]">{service.title}</h3>
            <p className="text-xs sm:text-sm text-[#5A6D7E] leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
