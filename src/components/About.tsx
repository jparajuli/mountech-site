import React, { useState } from 'react';
import Logo from './Logo';
import { 
  Users, Shield, Terminal, BookOpen, Layers, 
  Network, Copy, Check, Download, ArrowRight, ArrowUpRight
} from 'lucide-react';

interface AboutProps {
  summaryOnly?: boolean;
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function About({ summaryOnly, setRoute }: AboutProps) {
  const [copiedSvg, setCopiedSvg] = useState(false);

  const team = [
    {
      name: "Surya Basnet",
      role: "Co-Founder & Infrastructure Architect",
      focus: "Enterprise Cloud Platforms, Resilient Systems & Sovereign Digitalization",
      initials: "SB",
      icon: <Layers size={18} className="text-cohere-ink" />
    },
    {
      name: "Jhanak Parajuli",
      role: "Co-Founder & Systems Lead",
      focus: "Distributed Systems, Multi-Agent Algorithmic Engineering & AI Runtimes",
      initials: "JP",
      icon: <Terminal size={18} className="text-cohere-coral" />
    },
    {
      name: "Sarbagya R. Shakya",
      role: "Co-Founder & Education Director",
      focus: "Technical Pedagogy, Applied Intelligence Curricula & Engineering Academies",
      initials: "SS",
      icon: <BookOpen size={18} className="text-cohere-blue" />
    },
    {
      name: "Tej Shahi",
      role: "Co-Founder & Research Scientist",
      focus: "Deep Learning Foundations, Sovereign Quantization & Language Model Tuning",
      initials: "TS",
      icon: <Network size={18} className="text-cohere-teal" />
    },
    {
      name: "Dilip Yogi",
      role: "Co-Founder & DevSecOps Lead",
      focus: "High-Performance Compute Clusters, Security Hardening & Continuous Delivery",
      initials: "DY",
      icon: <Shield size={18} className="text-cohere-ink" />
    }
  ];

  const brandColors = [
    { name: "Cohere Ink", hex: "#17171c", role: "Primary Canvas Anchor & Brand Dominance" },
    { name: "Coral Ember", hex: "#ff7759", role: "Tactile Product Accent & Dynamic Warmth" },
    { name: "Enterprise Green", hex: "#003c33", role: "Security Enclave & Sovereign Trust" },
    { name: "Mineral Stone", hex: "#eeece7", role: "Card Fill & Subtle Surface Contrast" },
  ];

  const handleCopySvg = () => {
    const svgString = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="30" stroke="rgba(0,0,0,0.1)" stroke-width="1" stroke-dasharray="2 3"/><path d="M 12 48 L 26 22 L 32 32 L 20 48 Z" fill="#00a389"/><path d="M 32 12 L 44 48 L 32 40 L 22 48 Z" fill="#17171c"/><path d="M 32 12 L 52 48 L 40 48 Z" fill="#ff7759"/></svg>`;
    navigator.clipboard.writeText(svgString);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  // ──── HOME PREVIEW (SUMMARY VIEW) ────
  if (summaryOnly) {
    return (
      <section className="py-20 sm:py-28 bg-cohere-canvas border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest block">
                FOUNDED IN KATHMANDU • GLOBAL REACH
              </span>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-[-0.03em] leading-tight">
                Engineering sovereign intelligence with mathematical rigor.
              </h2>

              <p className="text-cohere-subtle text-base leading-relaxed">
                MounTech Solution was established by five systems architects and researchers to build localized high-performance AI infrastructure. We believe modern enterprise intelligence requires absolute sovereignty over data, deterministic workflows, and zero external dependency leaks.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setRoute({ page: 'about', courseId: 'ai-agents' })}
                  className="rounded-full px-6 py-3 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm flex items-center gap-2 group transition-all"
                >
                  <span>Explore Brand Manifesto & Team</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Founders Grid Preview */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {team.slice(0, 4).map((member, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-cohere-stone/70 border border-black/[0.06] hover:border-black/[0.15] transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full bg-white border border-black/[0.08] flex items-center justify-center font-mono text-xs font-bold text-cohere-ink">
                      {member.initials}
                    </div>
                    <span className="font-mono text-[10px] text-cohere-slate">FOUNDING CELL</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-cohere-ink">{member.name}</h3>
                    <div className="text-xs text-cohere-coral font-medium">{member.role}</div>
                  </div>

                  <p className="text-xs text-cohere-subtle leading-relaxed">{member.focus}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>
    );
  }

  // ──── FULL DEDICATED ABOUT & IDENTITY VIEW ────
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      
      {/* Brand Header */}
      <div className="max-w-3xl space-y-4">
        <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
          CORPORATE ARCHITECTURE & IDENTITY
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cohere-ink tracking-[-0.04em]">
          Summiting AI. <br />
          Securing the Foundations.
        </h1>
        <p className="text-lg text-cohere-subtle leading-relaxed">
          MounTech Solution unites academic research, enterprise computing pipelines, and deep community education. Rooted in the high peaks of Nepal and deploying systems across global enterprises.
        </p>
      </div>

      {/* ── BRAND GEOMETRY & LOGO EXPLORER SECTION ── */}
      <div className="p-8 sm:p-12 rounded-2xl bg-cohere-stone/60 border border-black/[0.08] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-6">
          <div>
            <span className="font-mono text-xs text-cohere-coral font-semibold uppercase">IDENTITY SPECIFICATION</span>
            <h2 className="font-display text-2xl font-bold text-cohere-ink mt-1">The Geometric Himalayan Emblem</h2>
          </div>

          <button
            onClick={handleCopySvg}
            className="rounded-full px-5 py-2 text-xs font-mono font-semibold bg-white hover:bg-black hover:text-white border border-black/[0.12] text-cohere-ink shadow-sm flex items-center gap-2 transition-all self-start sm:self-auto"
          >
            {copiedSvg ? <Check size={14} className="text-cohere-teal" /> : <Copy size={14} />}
            <span>{copiedSvg ? 'Vector SVG Copied!' : 'Copy Vector SVG'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex items-center justify-center p-8 bg-white rounded-2xl border border-black/[0.06] shadow-inner">
            <Logo size={96} animated={true} />
          </div>

          <div className="lg:col-span-8 space-y-4 text-sm text-cohere-subtle leading-relaxed">
            <p>
              <strong className="text-cohere-ink">Optical Form & Meaning: </strong>
              The brand emblem combines three sculpted crystalline facets representing the Himalayan summit profile. Each facet delineates a core engineering boundary: distributed compute infrastructure, sovereign language tokenization, and deterministic multi-agent routing.
            </p>
            <p>
              <strong className="text-cohere-ink">Mathematical Grid: </strong>
              Precision Voronoi-inspired angular cuts maintain optical legibility from 16px micro-favicons up to monumental architectural displays.
            </p>
          </div>
        </div>

        {/* Color Palette Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          {brandColors.map((color, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-black/[0.06] space-y-2">
              <div 
                className="w-full h-8 rounded-md border border-black/[0.08]"
                style={{ backgroundColor: color.hex }}
              />
              <div>
                <div className="text-xs font-bold text-cohere-ink">{color.name}</div>
                <div className="text-[11px] font-mono text-cohere-slate">{color.hex}</div>
              </div>
              <div className="text-[10px] text-cohere-subtle leading-tight">{color.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── THE 5 FOUNDING SYSTEMS ARCHITECTS ── */}
      <div className="space-y-8">
        <div>
          <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
            ENGINEERING LEADERSHIP
          </span>
          <h2 className="font-display text-3xl font-extrabold text-cohere-ink tracking-tight mt-1">
            Founding Systems Architects
          </h2>
          <p className="text-cohere-subtle text-sm max-w-2xl mt-1">
            Combining over two decades of distributed computing, cloud mesh engineering, and applied deep learning research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.08] hover:border-black/[0.2] transition-all space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-cohere-stone border border-black/[0.08] flex items-center justify-center font-mono text-xs font-bold text-cohere-ink">
                  {member.initials}
                </div>
                <div className="p-2 rounded-lg bg-cohere-stone/50">
                  {member.icon}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-cohere-ink">{member.name}</h3>
                <div className="text-xs text-cohere-coral font-semibold mt-0.5">{member.role}</div>
              </div>

              <p className="text-xs text-cohere-subtle leading-relaxed">{member.focus}</p>

              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-mono text-cohere-slate">
                <span>Kathmandu, Nepal</span>
                <span className="text-cohere-ink font-semibold">Active Node</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
