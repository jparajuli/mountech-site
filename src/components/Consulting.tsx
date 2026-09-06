import React, { useState } from 'react';
import { 
  Network, Bot, Cpu, Sliders, Layers, CheckCircle, 
  ArrowRight, ShieldCheck, Clock, FileCheck, PhoneCall, Sparkles
} from 'lucide-react';

interface ConsultingProps {
  summaryOnly?: boolean;
  onViewFull?: () => void;
  onInitiateContact?: (scopeDetails?: string) => void;
}

export default function Consulting({ summaryOnly, onViewFull, onInitiateContact }: ConsultingProps) {
  const [currentStack, setCurrentStack] = useState('monolith');
  const [targetGoal, setTargetGoal] = useState('agents');
  const [orgScale, setOrgScale] = useState('mid');

  const pillars = [
    {
      icon: <Layers size={22} className="text-accent" />,
      title: "Enterprise Digitalization Strategy",
      desc: "Architecting the migration of legacy operations into distributed cloud networks. Overhauling monolithic frameworks with highly resilient, decoupled microservices and centralized systems of record."
    },
    {
      icon: <Bot size={22} className="text-accent2" />,
      title: "LLMOps & Custom Generative Networks",
      desc: "Advising engineering groups on vector database retrieval parameters (RAG), private inference scaling, context window caching optimizations, and secure multi-agent governance."
    },
    {
      icon: <Cpu size={22} className="text-green" />,
      title: "Robotics & Edge Automation",
      desc: "Structuring real-time hardware-to-software orchestration loops. Designing Industrial IoT telemetry syncing, edge computational nodes, and intelligent physical sensory pipelines."
    }
  ];

  const getEstimate = () => {
    let weeks = "6-8 Weeks";
    let arch = "Hybrid Sovereign Cloud + Multi-Agent Pipeline";
    if (orgScale === 'enterprise') {
      weeks = "12-16 Weeks";
      arch = "High-Availability Distributed K8s + Private On-Prem LLM Cluster";
    } else if (orgScale === 'small') {
      weeks = "3-4 Weeks";
      arch = "Lightweight Docker Microservices + Guardrailed RAG Mesh";
    }
    return { weeks, arch };
  };

  // ──── HOME SUMMARY VIEW ────
  if (summaryOnly) {
    return (
      <section id="consulting-summary" className="py-20 bg-surface/80 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-wider">MOUNTECH ADVISORY</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Specialized Technology Advisory
              </h2>
            </div>
            <button 
              onClick={onViewFull}
              className="self-start md:self-auto px-5 py-2.5 rounded-lg border border-white/15 hover:border-accent/50 text-white text-sm font-medium hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <span>Explore Consulting Tracks & Estimator</span>
              <span className="text-accent">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, idx) => (
              <div key={idx} className="bg-card/90 border border-white/8 hover:border-accent/30 p-6 rounded-2xl transition-all shadow-sm">
                <div className="p-3 rounded-xl bg-surface border border-white/5 w-fit mb-4">{p.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-text-sub text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const estimate = getEstimate();

  // ──── FULL DEDICATED CONSULTING VIEW ────
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Header Block */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs text-accent uppercase tracking-wider">
          STRATEGIC ADVISORY WING
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering Transformation Roadmap
        </h1>
        <p className="text-text-sub text-sm sm:text-base leading-relaxed">
          Providing technical domain consultation to maximize digital capacity, resolve engineering bottlenecks, and deploy automated sovereign intelligence assets.
        </p>
      </div>

      {/* Core Consulting Tracks */}
      <div className="space-y-6">
        {pillars.map((p, idx) => (
          <div 
            key={idx} 
            className="bg-surface/90 border border-white/10 hover:border-accent/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start transition-all"
          >
            <div className="p-4 rounded-xl bg-card border border-white/5 shadow-inner">
              {p.icon}
            </div>
            <div className="flex-1 space-y-3">
              <h2 className="text-xl font-bold text-white">{p.title}</h2>
              <p className="text-text-sub text-sm leading-relaxed">{p.desc}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-text font-mono bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                  <CheckCircle size={14} className="text-green" />
                  <span>Technical Architecture Auditing</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text font-mono bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                  <CheckCircle size={14} className="text-green" />
                  <span>Risk Mitigation & Security Plan</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text font-mono bg-black/40 px-3 py-2 rounded-lg border border-white/5">
                  <CheckCircle size={14} className="text-green" />
                  <span>Zero-Trust Migration Protocols</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── INTERACTIVE DIGITAL TRANSFORMATION ESTIMATOR & SCOPE PLANNER ── */}
      <div className="bg-gradient-to-b from-surface to-card border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2 rounded-lg bg-accent-dim text-accent">
            <Sliders size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Interactive Transformation Scope Estimator</h3>
            <p className="text-text-muted text-xs">Configure your parameters to generate an initial architecture milestone plan.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Current State */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-text-muted uppercase">1. Current Infrastructure</label>
            <select
              value={currentStack}
              onChange={(e) => setCurrentStack(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-accent"
            >
              <option value="monolith">Legacy Monolith / On-Premise Servers</option>
              <option value="cloud-unmanaged">Public Cloud (Un-orchestrated VMs)</option>
              <option value="siloed-data">Fragmented Database / Siloed Data Warehouses</option>
              <option value="hybrid">Existing Hybrid Kubernetes Cluster</option>
            </select>
          </div>

          {/* Target Objective */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-text-muted uppercase">2. Target Milestone</label>
            <select
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-accent"
            >
              <option value="agents">Autonomous Multi-Agent AI Workflow</option>
              <option value="rag">Sovereign RAG Knowledge Vector Engine</option>
              <option value="cloud-k8s">Zero-Downtime Kubernetes Container Mesh</option>
              <option value="bi-data">Predictive Real-Time BI & Telemetry Hub</option>
            </select>
          </div>

          {/* Scale */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-text-muted uppercase">3. Operational Scale</label>
            <select
              value={orgScale}
              onChange={(e) => setOrgScale(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-accent"
            >
              <option value="small">Small Scale (1-50 seats / Regional Node)</option>
              <option value="mid">Mid-Market (50-500 seats / Multi-branch)</option>
              <option value="enterprise">Enterprise Tier (500+ seats / Global Distributed)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Estimated Recommendation Output */}
        <div className="p-6 rounded-xl bg-black/60 border border-accent/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <Clock size={14} />
              <span>ESTIMATED DELIVERY TIMELINE: <strong className="text-white text-sm">{estimate.weeks}</strong></span>
            </div>
            <div className="text-sm font-semibold text-white">
              Recommended Blueprint: <span className="text-green font-mono">{estimate.arch}</span>
            </div>
            <p className="text-xs text-text-sub">
              Includes comprehensive security audit, blue/green rollout sandbox, and team training handoff.
            </p>
          </div>

          <a
            href="#contact"
            className="whitespace-nowrap px-5 py-3 rounded-xl bg-accent hover:bg-blue-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-accent/25 transition-transform active:scale-95"
          >
            <span>Book Scope Consultation</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

    </div>
  );
}
