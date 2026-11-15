import React, { useState } from 'react';
import {
  Users, Globe, BookOpen, ExternalLink,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { RevealBlock, InteractiveCard } from './MotionPrimitives';

interface CommunityProps {
  summaryOnly?: boolean;
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function Community({ summaryOnly, setRoute }: CommunityProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const pillars = [
    {
      icon: <Users size={20} className="text-[#2563EB]" />,
      title: 'Community & Flagship Events',
      desc: 'Building an expansive networking matrix for AI, ML, and Data Science enthusiasts across Nepal and globally through workshops, hackathons, and technical bootcamps.',
    },
    {
      icon: <BookOpen size={20} className="text-[#6366F1]" />,
      title: 'Applied Research & Publications',
      desc: 'Driving regional academic excellence via peer-reviewed paper support, technical writing, and bridging data science industry tracks with Nepalese universities.',
    },
    {
      icon: <Globe size={20} className="text-[#0891B2]" />,
      title: 'Digital Nepal & Rural Inclusion',
      desc: 'Working to bridge the technological divide by promoting data literacy, tech-driven localization solutions, and rural digital infrastructure inclusion.',
    },
  ];

  const milestones = [
    { label: 'Active Network Members', value: '10,000+' },
    { label: 'Established Year', value: '2018' },
    { label: 'Workshops & Hackathons', value: '65+' },
    { label: 'Research Fellowships', value: '30+' },
  ];

  if (summaryOnly) {
    return (
      <section id="community-summary" className="py-20 sm:py-28 bg-[#EFF6FF]/45 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealBlock>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                  <span className="font-semibold text-[#2563EB]">Ecosystem Alliance</span>
                  <span aria-hidden="true">·</span>
                  <span>Est. 2018</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                  MLDSN Nepal Community Hub
                </h2>

                <p className="text-[#64748B] text-base leading-relaxed">
                  Associated with MounTech Solution, the Machine Learning and Data Science Network (MLDSN) Nepal is a non-profit platform advancing localized engineering discovery, data science literacy, and open technical education across Nepal.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-[#DBEAFE]">
                  {milestones.map((m) => (
                    <div key={m.label}>
                      <div className="font-mono text-xl font-bold text-[#172033] tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-xs text-[#64748B]">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'community', courseId: 'ai-agents' })}
                    className="rounded-lg px-6 py-3 text-xs font-semibold bg-[#101828] hover:bg-[#1E293B] text-white shadow-subtle flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <span>Explore Community Hub</span>
                    <ArrowRight size={14} />
                  </button>
                  <a
                    href="https://mldsnnepal.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg px-5 py-3 text-xs font-mono font-semibold bg-white hover:bg-[#EFF6FF] text-[#172033] border border-[#E2E8F0] flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>mldsnnepal.org</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                {pillars.map((p, i) => (
                  <InteractiveCard
                    key={i}
                    className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/40 transition-all space-y-2 shadow-subtle"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                        {p.icon}
                      </div>
                      <h3 className="font-display text-base font-bold text-[#172033]">{p.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{p.desc}</p>
                  </InteractiveCard>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
    );
  }

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
          <span className="font-semibold text-[#2563EB]">Non-Profit Affiliate Network</span>
          <span aria-hidden="true">·</span>
          <span>Est. 2018</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172033] tracking-tight">
          Machine Learning &amp; Data Science Network
        </h1>
        <p className="text-lg text-[#64748B] leading-relaxed">
          Nepal&apos;s community dedicated to advancing artificial intelligence, deep learning engineering, and inclusive structural digitalization since 2018.
        </p>

        <div className="pt-2">
          <a
            href="https://mldsnnepal.org"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-7 py-3.5 text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-subtle inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>Visit Official Site: mldsnnepal.org</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {milestones.map((m, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-[#E2E8F0] text-center space-y-1 shadow-subtle">
            <div className="text-3xl font-extrabold text-[#172033] font-mono tabular-nums">{m.value}</div>
            <div className="text-xs text-[#64748B]">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-subtle">
            <div className="p-3 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] w-fit">
              {p.icon}
            </div>
            <h3 className="font-display text-lg font-bold text-[#172033]">{p.title}</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-[#EFF6FF]/65 border border-[#BFDBFE] max-w-2xl mx-auto text-center space-y-4">
        <h3 className="font-display text-2xl font-bold text-[#172033]">Join MLDSN Community Circles</h3>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
          Receive announcements for upcoming Kathmandu hackathons, guest research seminars, and open-source engineering sprints.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-xl bg-white border border-emerald-200 text-emerald-700 font-mono text-xs flex items-center justify-center gap-2 shadow-subtle">
            <CheckCircle2 size={16} />
            <span>Registration logged. You will receive future event notifications.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs text-[#172033] focus:outline-none focus:border-[#2563EB]"
            />
            <button
              type="submit"
              className="rounded-lg px-6 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs shadow-subtle transition-colors whitespace-nowrap"
            >
              Join Circles
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
