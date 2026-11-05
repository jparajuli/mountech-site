import React from 'react';
import Logo from './Logo';
import { 
  Users, Shield, Terminal, BookOpen, Layers, 
  Network, ArrowRight, CheckCircle2, Globe2, Cpu
} from 'lucide-react';

interface AboutProps {
  summaryOnly?: boolean;
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function About({ summaryOnly, setRoute }: AboutProps) {
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
      icon: <BookOpen size={18} className="text-cohere-teal" />
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

  const principles = [
    {
      title: "Promoting Local Capacity Building",
      desc: "Bridging the gap between global AI advancements and local implementation through tailored education, developer masterclasses, and executive upskilling across Nepal."
    },
    {
      title: "Pragmatic & Deterministic Engineering",
      desc: "Focusing on verifiable, production-ready systems with auditable logic—from hydrological disaster sensors to automated cross-border customs trade compliance."
    },
    {
      title: "Data Sovereignty & Institutional Privacy",
      desc: "Advocating for secure, localized data governance and exploring sovereign computing to ensure Nepal's sensitive data remains protected within national borders."
    }
  ];

  // ──── HOME PREVIEW (SUMMARY VIEW) ────
  if (summaryOnly) {
    return (
      <section className="py-16 sm:py-24 bg-cohere-canvas border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cohere-slate">
                <span className="font-semibold text-cohere-ink uppercase tracking-wider">About MounTech</span>
                <span aria-hidden="true">·</span>
                <span>Kathmandu, Nepal</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-cohere-ink tracking-tight">
                Promoting AI Solutions &amp; Capacity Building in Nepal
              </h2>

              <p className="text-cohere-subtle text-sm leading-relaxed">
                MounTech Solution was founded by five systems architects and researchers with a unifying vision: bridging the divide between cutting-edge global AI and practical domestic implementation across education, enterprise, and civil infrastructure.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setRoute({ page: 'about', courseId: 'ai-agents' })}
                  className="rounded-full px-5 py-2.5 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>Meet the Founding Team</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Right Founders Grid Preview */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {team.slice(0, 4).map((member, idx) => (
                <div 
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-white border border-black/[0.07] hover:border-black/[0.18] transition-all space-y-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full bg-cohere-stone border border-black/[0.08] flex items-center justify-center font-mono text-xs font-bold text-cohere-ink">
                      {member.initials}
                    </div>
                    <span className="text-[10px] font-mono text-cohere-slate">Architect</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-cohere-ink">{member.name}</h3>
                    <div className="text-[11px] text-cohere-coral font-medium">{member.role}</div>
                  </div>

                  <p className="text-[11px] text-cohere-subtle leading-snug line-clamp-2">{member.focus}</p>
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
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Brand Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cohere-slate">
          <span className="font-semibold text-cohere-ink uppercase tracking-wider">Company Identity &amp; Leadership</span>
          <span aria-hidden="true">·</span>
          <span>MounTech Solution</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cohere-ink tracking-tight text-balance">
          Summiting AI. Securing the Foundations.
        </h1>

        <p className="text-lg text-cohere-subtle leading-relaxed">
          MounTech Solution unites academic research, enterprise computing pipelines, and deep technical education. Promoting AI Solutions &amp; Capacity Building in Nepal is our core mandate: delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.
        </p>
      </div>

      {/* ── CORE GUIDING PRINCIPLES SECTION ── */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono text-cohere-slate uppercase tracking-wider">
            FOUNDATIONAL VALUES
          </span>
          <h2 className="font-display text-2xl font-bold text-cohere-ink mt-1">
            Our Guiding Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, idx) => (
            <div key={idx} className="p-7 rounded-2xl bg-white border border-black/[0.08] space-y-3 shadow-sm">
              <div className="text-xs font-mono text-cohere-coral font-bold">
                PRINCIPLE 0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-cohere-ink">{p.title}</h3>
              <p className="text-xs text-cohere-subtle leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── THE 5 FOUNDING SYSTEMS ARCHITECTS ── */}
      <div className="space-y-6 pt-4 border-t border-black/[0.06]">
        <div>
          <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
            ENGINEERING LEADERSHIP
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-cohere-ink tracking-tight mt-1">
            Founding Systems Architects
          </h2>
          <p className="text-cohere-subtle text-xs sm:text-sm max-w-2xl mt-1">
            Combining extensive backgrounds in distributed computing, cloud mesh engineering, and applied deep learning research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white border border-black/[0.08] hover:border-black/[0.18] transition-all space-y-3.5 shadow-sm"
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
                <span className="text-cohere-ink font-semibold">Sanepa Office</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
