import React, { useState } from 'react';
import { 
  Target, Eye, Award, Users, Terminal, Shield, Network, 
  Layers, BookOpen, Heart, ShieldAlert, Globe, Milestone,
  CheckCircle2, Copy, Check, Download, Palette, Sparkles, ExternalLink
} from 'lucide-react';
import Logo from './Logo';

interface AboutProps {
  summaryOnly?: boolean;
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function About({ summaryOnly, setRoute }: AboutProps) {
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [logoVariant, setLogoVariant] = useState<'default' | 'mark'>('default');

  const founders = [
    {
      name: "Surya Basnet",
      role: "Founder & Cloud Strategist",
      specialty: "Enterprise Digitalization Strategy & Cloud Infrastructure Platforms",
      tags: ["Cloud Migration", "Enterprise Architecture", "DevOps"],
      icon: <Layers size={20} className="text-accent" />
    },
    {
      name: "Jhanak Parajuli",
      role: "Founder & Systems Architect",
      specialty: "Distributed Systems & Multi-Agent Algorithmic Engineering",
      tags: ["Multi-Agent DAGs", "Distributed Systems", "Sovereign AI"],
      icon: <Terminal size={20} className="text-accent2" />
    },
    {
      name: "Sarbagya R. Shakya",
      role: "Founder & Education Director",
      specialty: "Educational Infrastructure & Applied Intelligence Frameworks",
      tags: ["Curriculum Architecture", "Ecosystem Scaling", "Skill Acceleration"],
      icon: <BookOpen size={20} className="text-accent" />
    },
    {
      name: "Tej Shahi",
      role: "Founder & Chief AI Researcher",
      specialty: "Deep Learning Research & Sovereign Language Model Optimization",
      tags: ["Attention Mechanics", "PyTorch Quantization", "NLP"],
      icon: <Network size={20} className="text-green" />
    },
    {
      name: "Dilip Yogi",
      role: "Founder & DevSecOps Lead",
      specialty: "High-Performance Compute Clustering & DevSecOps Operations",
      tags: ["Kubernetes Clustering", "Security Guardrails", "Infrastructure"],
      icon: <Shield size={20} className="text-accent" />
    }
  ];

  const values = [
    {
      icon: <ShieldAlert size={22} className="text-accent" />,
      title: "Sovereign Tech Security",
      desc: "We engineer systems with absolute local accountability, safeguarding institutional integrity against systemic external vulnerabilities."
    },
    {
      icon: <Heart size={22} className="text-accent2" />,
      title: "Community Synergy",
      desc: "Our active founding partnership with non-profit groups like MLDSN Nepal drives localized educational acceleration and technical equity."
    },
    {
      icon: <Globe size={22} className="text-green" />,
      title: "Global Execution Scales",
      desc: "We balance domestic localized knowledge parameters with robust, high-performance distributed networks globally."
    }
  ];

  const companyPillars = [
    {
      title: "Advanced AI Systems",
      desc: "Architecting decentralized, stateful multi-agent execution graphs, custom embeddings integration, and localized foundational LLM fine-tuning schemas.",
      icon: <Terminal size={20} className="text-accent2" />
    },
    {
      title: "Sovereign Infrastructure",
      desc: "Deploying high-performance container orchestration arrays, automated feature stores, and declarative cloud architectures under rigid security metrics.",
      icon: <Shield size={20} className="text-green" />
    },
    {
      title: "Ecosystem Literacy",
      desc: "Accelerating regional engineering intelligence through rigorous 40-hour hands-on instruction blocks and non-profit research community alliances.",
      icon: <BookOpen size={20} className="text-accent" />
    }
  ];

  const handleCopySvg = () => {
    const svgContent = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="6" y1="54" x2="58" y2="54" stroke="#4f9cf9" stroke-width="2" stroke-linecap="round"/>
  <polygon points="8,54 20,24 28,40 18,54" fill="#7c3aed"/>
  <polygon points="20,24 28,40 32,54 20,54" fill="#a78bfa"/>
  <polygon points="24,44 42,12 32,54 20,54" fill="#0f172a"/>
  <polygon points="42,12 56,54 32,54" fill="#2563eb"/>
  <polyline points="36,24 42,12 48,24" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="42" cy="12" r="3" fill="#67e8f9"/>
</svg>`;
    navigator.clipboard.writeText(svgContent);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  // ──── HOME SUMMARY VIEW ────
  if (summaryOnly) {
    return (
      <section id="about-summary" className="py-20 bg-surface/80 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-mono text-xs text-accent uppercase tracking-wider mb-2">DNA & Architectural Identity</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                About MounTech Solution (MTS)
              </h2>
            </div>
            <button 
              onClick={() => setRoute({ page: 'about', courseId: 'ai-agents' })}
              className="self-start md:self-auto px-5 py-2.5 rounded-lg border border-white/15 hover:border-accent/50 text-white text-sm font-medium hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <span>Explore Corporate Profile & Brand Specs</span>
              <span className="text-accent">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyPillars.map((pillar, idx) => (
              <div key={idx} className="bg-card/90 border border-white/8 hover:border-accent/30 p-6 rounded-2xl transition-all shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-surface border border-white/5">{pillar.icon}</div>
                  <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                </div>
                <p className="text-text-sub text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ──── FULL DEDICATED CORPORATE & BRAND CANVAS VIEW ────
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Brand Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex justify-center p-3 rounded-2xl bg-surface/90 border border-white/10 shadow-xl">
          <Logo size={56} animated={true} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Corporate Identity & Architecture
        </h1>
        <p className="text-accent font-mono font-medium text-sm sm:text-base">
          MounTech Solution (MTS) • "Summiting AI. Securing the Foundations."
        </p>
        <p className="text-text-sub text-sm sm:text-base leading-relaxed">
          Founded by seasoned systems engineers, researchers, and cloud practitioners to bring sovereign, production-grade intelligence infrastructure to the global stage.
        </p>
      </div>

      {/* ── INTERACTIVE LOGO & BRAND STRUCTURE SHOWCASE ── */}
      <div className="bg-gradient-to-b from-surface/90 to-card/90 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
          
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-dim text-accent border border-accent/20 text-xs font-mono">
              <Award size={14} />
              <span>Emblem Geometry & Design Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Himalayan Peaks & Binary Foundations
            </h2>
            <p className="text-text-sub text-sm leading-relaxed">
              Our emblem pairs the iconic high-altitude topography of the Himalayas with the elemental binary language of modern digital computing. The overlapping vector peaks represent institutional stability and elevated execution standards, while the integrated circuit conduits and binary matrices reflect multi-agent coordination, vector spaces, and sovereign cloud automation.
            </p>

            {/* Design System Spec Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[10px] font-mono text-text-muted">PRIMARY BLUE</div>
                <div className="text-accent font-mono text-xs font-semibold">#4F9CF9 / 60A5FA</div>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[10px] font-mono text-text-muted">DEEP VIOLET</div>
                <div className="text-accent2 font-mono text-xs font-semibold">#A78BFA / 7C3AED</div>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[10px] font-mono text-text-muted">ACTIVE GREEN</div>
                <div className="text-green font-mono text-xs font-semibold">#34D399</div>
              </div>
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                <div className="text-[10px] font-mono text-text-muted">CANVAS VOID</div>
                <div className="text-white font-mono text-xs font-semibold">#080C10 / #0D1117</div>
              </div>
            </div>

            {/* Logo Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopySvg}
                className="px-4 py-2 rounded-lg bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                {copiedSvg ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedSvg ? 'SVG Vector Copied!' : 'Copy Logo SVG'}</span>
              </button>
              <span className="text-xs text-text-muted font-mono">Scalable Vector • Zero Dependencies</span>
            </div>
          </div>

          {/* Logo Interactive Frame */}
          <div className="w-full lg:w-80 flex flex-col items-center justify-center p-8 rounded-2xl bg-black/60 border border-white/10 shadow-inner">
            <div className="p-6 rounded-2xl bg-[#080c10] border border-white/10 shadow-2xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent2/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <Logo size={120} animated={true} />
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="font-extrabold text-white tracking-tight">MOUNTECH SOLUTION</div>
              <div className="text-[11px] font-mono text-accent">Core Geometric Mark</div>
            </div>
          </div>

        </div>
      </div>

      {/* Core Institutional Pillars: Mission, Vision, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface/80 border border-white/10 p-8 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center text-accent">
            <Target size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Institutional Mission</h3>
          <p className="text-text-sub text-sm leading-relaxed">
            To bridge the gap between advanced computational algorithms and operational legacy frameworks, empowering mid-market enterprises and governmental organizations with sovereign, resilient technologies.
          </p>
        </div>

        <div className="bg-surface/80 border border-white/10 p-8 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-accent2-dim border border-accent2/20 flex items-center justify-center text-accent2">
            <Eye size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Strategic Vision</h3>
          <p className="text-text-sub text-sm leading-relaxed">
            To operate as the premier algorithmic architecture network across South Asia and global markets, accelerating enterprise transformation through transparent scientific discovery and disciplined execution.
          </p>
        </div>

        <div className="bg-surface/80 border border-white/10 p-8 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-green-dim border border-green/20 flex items-center justify-center text-green">
            <Globe size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Global-Local Synergy</h3>
          <p className="text-text-sub text-sm leading-relaxed">
            Combining deep localized engineering talents with globally compliant distributed cloud standards, fostering regional technology sovereignty and international excellence.
          </p>
        </div>
      </div>

      {/* Operational Principles */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Core Operational Principles</h2>
          <p className="text-text-muted text-sm mt-1">The engineering tenets governing every deployment and training module.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-card/70 border border-white/5 p-6 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-3">
                {v.icon}
                <h4 className="text-base font-bold text-white">{v.title}</h4>
              </div>
              <p className="text-text-sub text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Evolution Roadmap */}
      <div className="bg-surface/60 border border-white/10 p-8 sm:p-10 rounded-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Milestone className="text-green" size={24} />
          <h2 className="text-xl sm:text-2xl font-bold text-white">Roadmap & Strategic Evolution</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-2 border-accent pl-4 space-y-1.5">
            <span className="font-mono text-xs text-accent font-semibold">PHASE 01 • RESEARCH ORIGINS</span>
            <h4 className="text-white font-bold text-sm">Data Science & AI Lab</h4>
            <p className="text-text-sub text-xs leading-relaxed">
              Founded as an advanced research collective developing custom embedding architectures, algorithm optimization, and secure infrastructure auditing.
            </p>
          </div>
          <div className="border-l-2 border-green pl-4 space-y-1.5">
            <span className="font-mono text-xs text-green font-semibold">PHASE 02 • ENTERPRISE EXPANSION</span>
            <h4 className="text-white font-bold text-sm">MounTech Solution (MTS)</h4>
            <p className="text-text-sub text-xs leading-relaxed">
              Scaled into full-stack multi-agent AI system integrations, enterprise DevSecOps pipelines, and technical advisory for global operations.
            </p>
          </div>
          <div className="border-l-2 border-accent2 pl-4 space-y-1.5">
            <span className="font-mono text-xs text-accent2 font-semibold">PHASE 03 • ACADEMY & SCALE</span>
            <h4 className="text-white font-bold text-sm">Tech Literacy & Innovation Hub</h4>
            <p className="text-text-sub text-xs leading-relaxed">
              Launched the 40-hour deep-tier Academy modules, sovereign AI sandboxes, and community research fellowships with MLDSN Nepal.
            </p>
          </div>
        </div>
      </div>

      {/* Founding Leadership & Systems Architects */}
      <div className="space-y-8 pt-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-2 rounded-xl bg-green-dim text-green mb-1">
            <Users size={24} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Systems Architects & Founding Leadership
          </h2>
          <p className="text-text-sub text-sm max-w-xl mx-auto">
            The core founding engineers and researchers overseeing our algorithmic graphs, cloud architectures, and training standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {founders.map((founder, idx) => (
            <div 
              key={idx} 
              className="bg-card/90 border border-white/8 hover:border-accent/40 p-6 rounded-2xl flex flex-col justify-between transition-all shadow-md group"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-surface border border-white/10 group-hover:border-accent/40 transition-colors">
                    {founder.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors">
                      {founder.name}
                    </h3>
                    <div className="text-xs font-mono text-accent font-medium mt-0.5">
                      {founder.role}
                    </div>
                  </div>
                </div>
                
                <p className="text-text-sub text-xs leading-relaxed mb-4">
                  {founder.specialty}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                {founder.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface text-text-muted border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
