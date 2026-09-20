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
  const [legacySystem, setLegacySystem] = useState('Monolithic Cloud / Legacy VM');
  const [targetGoal, setTargetGoal] = useState('Air-Gapped Sovereign AI Mesh');
  const [teamScale, setTeamScale] = useState('Mid-Market (50-250 engineers)');

  const advisoryServices = [
    {
      code: "ADVISORY TRACK 01",
      title: "Sovereign AI Strategy & Architecture",
      desc: "Guiding enterprise CTOs on LLM quantization, context window sizing, air-gapped VPC enclaves, and localized GPU infrastructure sizing."
    },
    {
      code: "ADVISORY TRACK 02",
      title: "DevSecOps & Cloud Mesh Engineering",
      desc: "Designing resilient zero-trust Kubernetes topologies, distributed multi-region databases, and hardened automated deployment pipelines."
    },
    {
      code: "ADVISORY TRACK 03",
      title: "Data Sovereignty & Legal Compliance",
      desc: "Assisting organizations with banking regulations, medical record privacy governance, and Nepal Data Protection Act alignments."
    }
  ];

  // Calculated transformation specs
  const estimatedWeeks = teamScale.includes('50-250') ? '6 - 8 Weeks' : '10 - 14 Weeks';
  const podComposition = '1 Principal Architect, 2 Systems Engineers, 1 DevSecOps Specialist';

  // ──── HOME SUMMARY PREVIEW ────
  if (summaryOnly) {
    return (
      <section className="py-20 sm:py-28 bg-cohere-canvas border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
                SYSTEMS ARCHITECTURE & TRANSFORMATION
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-tight">
                Enterprise Technology Advisory
              </h2>
              <p className="text-cohere-subtle text-sm sm:text-base leading-relaxed">
                We partner with leadership teams to modernize legacy infrastructure, implement sovereign AI pipelines, and harden mission-critical nodes.
              </p>
            </div>

            <button
              onClick={onViewFull}
              className="rounded-full px-6 py-3 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm flex items-center gap-2 self-start md:self-auto transition-all"
            >
              <span>Explore Consulting Advisory</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisoryServices.map((service, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-cohere-stone/60 border border-black/[0.08] hover:border-black/[0.2] transition-all space-y-4"
              >
                <div className="font-mono text-[10px] text-cohere-slate">{service.code}</div>
                <h3 className="text-lg font-bold text-cohere-ink leading-snug">{service.title}</h3>
                <p className="text-xs text-cohere-subtle leading-relaxed">{service.desc}</p>
                <div className="pt-2 text-xs font-mono font-semibold text-cohere-ink flex items-center gap-1">
                  <span>Advisory & Implementation Pods →</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // ──── FULL DEDICATED CONSULTING VIEW ────
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
          MOUNTECH ADVISORY GROUP
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cohere-ink tracking-tight">
          Architecting resilient enterprise futures.
        </h1>
        <p className="text-lg text-cohere-subtle leading-relaxed">
          From legacy refactoring to air-gapped sovereign AI topologies, we provide the architectural blueprints and hands-on engineering pods.
        </p>
      </div>

      {/* ── INTERACTIVE TRANSFORMATION SCOPE ESTIMATOR ── */}
      <div className="p-8 sm:p-12 rounded-2xl bg-cohere-stone/60 border border-black/[0.08] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-6">
          <div className="space-y-1">
            <span className="font-mono text-xs text-cohere-coral font-bold uppercase">
              INTERACTIVE ARCHITECTURE PLANNER
            </span>
            <h2 className="font-display text-2xl font-bold text-cohere-ink">
              Enterprise Transformation Scope Estimator
            </h2>
          </div>
          <span className="text-xs font-mono text-cohere-slate">Deterministic Delivery Model</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current State */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-cohere-slate uppercase block">
              1. Current Legacy Foundation
            </label>
            <div className="space-y-2">
              {[
                'Monolithic Cloud / Legacy VM',
                'Basic PostgreSQL & REST Services',
                'Hybrid On-Premise & Vendor Lock-In'
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setLegacySystem(item)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    legacySystem === item
                      ? 'bg-white border-cohere-ink font-bold shadow-sm'
                      : 'bg-white/60 border-black/[0.08] text-cohere-subtle hover:bg-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Target Milestone */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-cohere-slate uppercase block">
              2. Target Sovereignty Objective
            </label>
            <div className="space-y-2">
              {[
                'Air-Gapped Sovereign AI Mesh',
                'Distributed Microservices & Zero-Trust',
                'Sub-Second Vector Search & BI Hub'
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setTargetGoal(item)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    targetGoal === item
                      ? 'bg-white border-cohere-ink font-bold shadow-sm'
                      : 'bg-white/60 border-black/[0.08] text-cohere-subtle hover:bg-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Scale & Timeline Output */}
          <div className="p-6 rounded-xl bg-white border border-black/[0.08] space-y-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-cohere-slate uppercase">CALCULATED ROADMAP</div>
              <div className="text-2xl font-bold font-display text-cohere-ink mt-1">{estimatedWeeks}</div>
              <p className="text-xs text-cohere-subtle mt-1">Estimated phased migration & audit duration.</p>
            </div>

            <div className="pt-3 border-t border-black/[0.06] space-y-2 text-xs">
              <div className="text-[10px] font-mono text-cohere-slate uppercase">RECOMMENDED POD</div>
              <div className="font-semibold text-cohere-ink">{podComposition}</div>
            </div>

            <a
              href="#contact"
              className="w-full text-center rounded-full py-2.5 text-xs font-bold bg-cohere-ink hover:bg-black text-white shadow-sm transition-all"
            >
              Request Architecture Audit
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
