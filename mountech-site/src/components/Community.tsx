import React, { useState } from 'react';
import {
  Users, Globe, BookOpen, ExternalLink,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { RevealBlock } from './MotionPrimitives';

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
      icon: <Users size={20} className="text-[#0284C7]" />,
      title: 'Community & Flagship Events',
      desc: 'Building an expansive networking matrix for AI, ML, and Data Science enthusiasts across Nepal through workshops, hackathons, and bootcamps.',
    },
    {
      icon: <BookOpen size={20} className="text-[#15803D]" />,
      title: 'Applied Research & Publications',
      desc: 'Driving regional academic excellence via peer-reviewed paper support and bridging data science industry tracks with Nepalese universities.',
    },
    {
      icon: <Globe size={20} className="text-[#0284C7]" />,
      title: 'Digital Nepal & Rural Inclusion',
      desc: 'Working to bridge the technological divide by promoting data literacy, tech-driven localization, and rural digital inclusion.',
    },
  ];

  const milestones = [
    { label: 'Network Members', value: '10,000+' },
    { label: 'Established', value: '2018' },
    { label: 'Workshops & Hackathons', value: '65+' },
    { label: 'Research Fellowships', value: '30+' },
  ];

  if (summaryOnly) {
    return (
      <section id="community-summary" className="py-14 sm:py-16 bg-[#F0FDF4]/60 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealBlock>
            <div className="rounded-2xl bg-white border border-[#E2E8F0] p-7 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-subtle">
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#5A6D7E]">
                  <span className="font-semibold text-[#15803D]">Non-Profit Community Partner</span>
                  <span aria-hidden="true">·</span>
                  <span>Est. 2018</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1E2E] tracking-tight">
                  MLDSN Nepal Community Hub
                </h2>
                <p className="text-sm text-[#5A6D7E] leading-relaxed">
                  Machine Learning and Data Science Network (MLDSN) Nepal unites students, researchers, and engineers through open workshops, hackathons, and research fellowships.
                </p>
              </div>

              <div className="lg:col-span-6 flex flex-col sm:flex-row lg:flex-col gap-5 justify-between">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {milestones.map((m) => (
                    <div key={m.label}>
                      <div className="font-mono text-xl font-bold text-[#0F1E2E] tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-xs text-[#5A6D7E]">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'community', courseId: 'ai-agents' })}
                    className="rounded-lg px-5 py-2.5 text-xs font-semibold bg-[#15803D] hover:bg-[#166534] text-white flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <span>Explore Community Hub</span>
                    <ArrowRight size={13} />
                  </button>
                  <a
                    href="https://mldsnnepal.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg px-4 py-2.5 text-xs font-mono font-semibold bg-[#F8FAFC] hover:bg-[#F0F9FF] text-[#0284C7] border border-[#E2E8F0] flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <span>mldsnnepal.org</span>
                    <ExternalLink size={12} />
                  </a>
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
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#5A6D7E]">
          <span className="font-semibold text-[#15803D]">Non-Profit Affiliate Network</span>
          <span aria-hidden="true">·</span>
          <span>Est. 2018</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F1E2E] tracking-tight">
          Machine Learning &amp; Data Science Network
        </h1>
        <p className="text-lg text-[#5A6D7E] leading-relaxed">
          Nepal&apos;s community dedicated to advancing artificial intelligence, deep learning engineering, and inclusive structural digitalization since 2018.
        </p>

        <div className="pt-2">
          <a
            href="https://mldsnnepal.org"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-7 py-3.5 text-xs font-semibold bg-[#15803D] hover:bg-[#166534] text-white shadow-subtle inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>Visit Official Site: mldsnnepal.org</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {milestones.map((m, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-[#E2E8F0] text-center space-y-1 shadow-subtle">
            <div className="text-3xl font-extrabold text-[#0F1E2E] font-mono tabular-nums">{m.value}</div>
            <div className="text-xs text-[#5A6D7E]">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-white border border-[#E2E8F0] space-y-3 shadow-subtle">
            <div className="p-3 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD]/60 w-fit">
              {p.icon}
            </div>
            <h3 className="font-display text-lg font-bold text-[#0F1E2E]">{p.title}</h3>
            <p className="text-xs sm:text-sm text-[#5A6D7E] leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-8 sm:p-12 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] max-w-2xl mx-auto text-center space-y-4">
        <h3 className="font-display text-2xl font-bold text-[#0F1E2E]">Join MLDSN Community Circles</h3>
        <p className="text-xs sm:text-sm text-[#5A6D7E] max-w-md mx-auto">
          Receive announcements for upcoming Kathmandu hackathons, guest research seminars, and open-source engineering sprints.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-xl bg-white border border-[#86EFAC] text-[#15803D] font-mono text-xs flex items-center justify-center gap-2 shadow-subtle">
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
              className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs text-[#0F1E2E] focus:outline-none focus:border-[#15803D]"
            />
            <button
              type="submit"
              className="rounded-lg px-6 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs shadow-subtle transition-colors whitespace-nowrap"
            >
              Join Circles
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
