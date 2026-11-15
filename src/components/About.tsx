import React from 'react';
import {
  Shield, Terminal, BookOpen, Layers, Network, ArrowRight
} from 'lucide-react';
import { MEDIA_ASSETS } from '../assets/media';
import MediaFrame from './MediaFrame';
import { RevealBlock } from './MotionPrimitives';

interface AboutProps {
  summaryOnly?: boolean;
  setRoute: (route: { page: string; courseId: string; aiTab?: 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel' }) => void;
}

export default function About({ summaryOnly, setRoute }: AboutProps) {
  const team = [
    {
      name: 'Surya Basnet',
      role: 'Co-Founder & Infrastructure Architect',
      focus: 'Enterprise Cloud Platforms, Resilient Systems & Sovereign Digitalization',
      initials: 'SB',
      icon: <Layers size={18} className="text-[#0284C7]" />,
    },
    {
      name: 'Jhanak Parajuli',
      role: 'Co-Founder & Systems Lead',
      focus: 'Distributed Systems, Multi-Agent Algorithmic Engineering & AI Runtimes',
      initials: 'JP',
      icon: <Terminal size={18} className="text-[#15803D]" />,
    },
    {
      name: 'Sarbagya R. Shakya',
      role: 'Co-Founder & Education Director',
      focus: 'Technical Pedagogy, Applied Intelligence Curricula & Engineering Academies',
      initials: 'SS',
      icon: <BookOpen size={18} className="text-[#0284C7]" />,
    },
    {
      name: 'Tej Shahi',
      role: 'Co-Founder & Research Scientist',
      focus: 'Deep Learning Foundations, Sovereign Quantization & Language Model Tuning',
      initials: 'TS',
      icon: <Network size={18} className="text-[#15803D]" />,
    },
    {
      name: 'Dilip Yogi',
      role: 'Co-Founder & DevSecOps Lead',
      focus: 'High-Performance Compute Clusters, Security Hardening & Continuous Delivery',
      initials: 'DY',
      icon: <Shield size={18} className="text-[#0284C7]" />,
    },
  ];

  const principles = [
    {
      number: '01',
      title: 'Promoting Local Capacity Building',
      desc: 'Bridging the gap between global AI advancements and local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.',
    },
    {
      number: '02',
      title: 'Pragmatic & Deterministic Engineering',
      desc: 'Building verifiable systems with auditable engineering foundations—from hydrological disaster telemetry to automated trade compliance workflows.',
    },
    {
      number: '03',
      title: 'Data Sovereignty & Institutional Privacy',
      desc: 'Advocating for air-gapped processing boundaries and localized data governance so institutional records remain protected within Nepal.',
    },
  ];

  if (summaryOnly) {
    return (
      <section id="about-mountech" className="py-16 sm:py-24 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealBlock>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex">
                <div className="w-full rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] shadow-subtle flex">
                  <MediaFrame
                    src={MEDIA_ASSETS.appliedResearchLab}
                    alt="MounTech engineers and researchers collaborating at workstations in Kathmandu"
                    title="MounTech Applied AI & Engineering Studio"
                    aspectClass="aspect-[4/3] lg:h-full lg:min-h-[320px]"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#5A6D7E]">
                    <span className="font-semibold text-[#0284C7]">About MounTech</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#15803D]">Sanepa Heights, Lalitpur</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F1E2E] tracking-tight">
                    Advancing Applied AI &amp; Technical Leadership in Nepal
                  </h2>

                  <p className="text-sm sm:text-base text-[#5A6D7E] leading-relaxed">
                    Founded by five systems architects and researchers, MounTech Solution builds self-reliant engineering capability in Nepal through production data systems, applied AI research, and hands-on cohort training.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] space-y-1.5">
                  <div className="text-xs font-mono font-semibold text-[#0F1E2E]">Founding Architects</div>
                  <p className="text-xs text-[#5A6D7E]">
                    Surya Basnet · Jhanak Parajuli · Sarbagya R. Shakya · Tej Shahi · Dilip Yogi
                  </p>
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'about', courseId: 'ai-agents' })}
                    className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#0B1924] hover:bg-[#122636] text-white transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Meet Our Architects &amp; Principles</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'community', courseId: 'ai-agents' })}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#15803D] hover:bg-[#F0FDF4] transition-colors whitespace-nowrap shrink-0"
                  >
                    MLDSN Nepal Alliance
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
    );
  }

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5A6D7E]">
            <span className="font-semibold text-[#0284C7]">Company Identity &amp; Leadership</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#15803D]">MounTech Solution</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F1E2E] tracking-tight">
            Engineering Intelligence. Empowering Innovation.
          </h1>

          <p className="text-base sm:text-lg text-[#5A6D7E] leading-relaxed">
            MounTech Solution unites applied AI research, enterprise data engineering, systems consulting, and technical education—delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-subtle">
            <MediaFrame
              src={MEDIA_ASSETS.appliedResearchLab}
              alt="MounTech engineering studio in Kathmandu"
              title="Kathmandu Engineering Studio"
              aspectClass="aspect-[4/3]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-[#E2E8F0]">
        <div>
          <span className="text-xs font-mono text-[#15803D] font-semibold">Foundational Values</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E2E] mt-1">
            Our Guiding Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p) => (
            <div
              key={p.number}
              className="p-7 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-subtle"
            >
              <div className="text-xs font-mono font-semibold text-[#0284C7]">{p.number}.</div>
              <h3 className="text-lg font-bold text-[#0F1E2E]">{p.title}</h3>
              <p className="text-sm text-[#5A6D7E] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-[#E2E8F0]">
        <div>
          <span className="font-mono text-xs text-[#0284C7] font-semibold">Engineering Leadership</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1E2E] tracking-tight mt-1">
            Founding Systems Architects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#0284C7]/50 transition-colors space-y-4 shadow-subtle"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center font-mono text-xs font-bold text-[#0284C7]">
                  {member.initials}
                </div>
                <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                  {member.icon}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#0F1E2E]">{member.name}</h3>
                <div className="text-xs text-[#15803D] font-semibold mt-0.5">{member.role}</div>
              </div>

              <p className="text-xs text-[#5A6D7E] leading-relaxed">{member.focus}</p>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#5A6D7E]">
                <span>Kathmandu, Nepal</span>
                <span className="text-[#0F1E2E] font-medium">Sanepa Office</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
