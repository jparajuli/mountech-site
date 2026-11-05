import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, Cpu, ArrowRight, 
  Layers, CheckCircle2, Sliders, Calendar, Sparkles
} from 'lucide-react';

interface ConsultingProps {
  summaryOnly?: boolean;
  onViewFull?: () => void;
}

export default function Consulting({ summaryOnly, onViewFull }: ConsultingProps) {
  const [legacySystem, setLegacySystem] = useState('Monolithic VM / On-Premise Stack');
  const [targetGoal, setTargetGoal] = useState('Automated Workflow & AI Integration');

  const advisoryServices = [
    {
      code: "ADVISORY 01",
      title: "Cloud & Data Infrastructure Modernization",
      desc: "Guiding enterprise teams on refactoring monolithic architectures, database indexing, lakehouse migrations, and containerized microservices."
    },
    {
      code: "ADVISORY 02",
      title: "DevSecOps & Resilient Topologies",
      desc: "Designing automated CI/CD deployment pipelines, zero-trust network boundaries, container security, and high-availability backup systems."
    },
    {
      code: "ADVISORY 03",
      title: "Enterprise AI & Workflow Integration",
      desc: "Assisting organizations with evaluating practical AI tool adoption, trade compliance automation, and aligning systems with national data governance."
    }
  ];

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cohere-slate">
          <span className="font-semibold text-cohere-ink uppercase tracking-wider">Enterprise Advisory</span>
          <span aria-hidden="true">·</span>
          <span>MounTech Consulting Group</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cohere-ink tracking-tight text-balance">
          Architecting resilient enterprise futures.
        </h1>

        <p className="text-lg text-cohere-subtle leading-relaxed">
          From legacy refactoring to practical AI workflow adoption, our senior systems architects provide hands-on architectural blueprints, modernization audits, and engineering pods.
        </p>
      </div>

      {/* ── INTERACTIVE TRANSFORMATION SCOPE ESTIMATOR ── */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white border border-black/[0.08] shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cohere-coral font-bold uppercase tracking-wider">
              INTERACTIVE ARCHITECTURE PLANNER
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-cohere-ink">
              Enterprise Transformation Scope Estimator
            </h2>
          </div>
          <span className="text-xs font-mono text-cohere-slate">Structured Milestone Delivery</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current State */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-cohere-slate uppercase block font-semibold">
              1. Current Legacy Foundation
            </label>
            <div className="space-y-2">
              {[
                'Monolithic VM / On-Premise Stack',
                'Basic SQL Database & Manual ETL',
                'Hybrid Cloud with Data Fragmentation'
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setLegacySystem(item)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                    legacySystem === item
                      ? 'bg-[#f4f3ef] border-cohere-ink font-bold text-cohere-ink shadow-sm'
                      : 'bg-white border-black/[0.08] text-cohere-subtle hover:bg-[#faf9f7]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Target Milestone */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-cohere-slate uppercase block font-semibold">
              2. Target Objective
            </label>
            <div className="space-y-2">
              {[
                'Automated Workflow & AI Integration',
                'Containerized Microservices & CI/CD',
                'Scalable Lakehouse & BI Matrix'
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setTargetGoal(item)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                    targetGoal === item
                      ? 'bg-[#f4f3ef] border-cohere-ink font-bold text-cohere-ink shadow-sm'
                      : 'bg-white border-black/[0.08] text-cohere-subtle hover:bg-[#faf9f7]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Scale & Timeline Output */}
          <div className="p-6 rounded-xl bg-[#f8f7f4] border border-black/[0.08] space-y-4 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-cohere-slate uppercase">ESTIMATED ROADMAP</div>
              <div className="text-2xl font-bold font-display text-cohere-ink mt-1">4 - 8 Weeks</div>
              <p className="text-xs text-cohere-subtle mt-1">Phased sprint discovery, architectural design & pilot implementation.</p>
            </div>

            <div className="pt-3 border-t border-black/[0.06] space-y-1 text-xs">
              <div className="text-[10px] font-mono text-cohere-slate uppercase">DELIVERY POD</div>
              <div className="font-semibold text-cohere-ink">1 Principal Architect, 2 Systems Engineers</div>
            </div>

            <a
              href="#contact"
              className="w-full text-center rounded-full py-2.5 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm transition-all"
            >
              Request Architecture Assessment
            </a>
          </div>
        </div>
      </div>

      {/* Services Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {advisoryServices.map((service, idx) => (
          <div key={idx} className="p-7 rounded-2xl bg-white border border-black/[0.08] space-y-3 shadow-sm">
            <div className="font-mono text-xs text-cohere-coral font-bold">{service.code}</div>
            <h3 className="text-base font-bold text-cohere-ink">{service.title}</h3>
            <p className="text-xs text-cohere-subtle leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
