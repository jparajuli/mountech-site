import React, { useState } from 'react';
import { 
  Users, Globe, BookOpen, ExternalLink, 
  CheckCircle2, ArrowRight, Calendar
} from 'lucide-react';

interface CommunityProps {
  summaryOnly?: boolean;
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function Community({ summaryOnly, setRoute }: CommunityProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const pillars = [
    {
      icon: <Users size={20} className="text-cohere-ink" />,
      title: "Community & Flagship Events",
      desc: "Building an expansive networking matrix for AI, ML, and Data Science enthusiasts across Nepal and globally through workshops, hackathons, and technical bootcamps."
    },
    {
      icon: <BookOpen size={20} className="text-cohere-coral" />,
      title: "Applied Research & Publications",
      desc: "Driving regional academic excellence via peer-reviewed paper support, technical blogs, and bridging data science industry tracks with regional universities."
    },
    {
      icon: <Globe size={20} className="text-cohere-teal" />,
      title: "Digital Nepal & Rural Inclusion",
      desc: "Actively working to bridge the technological divide by promoting data literacy, tech-driven localization solutions, and rural digital infrastructure inclusion."
    }
  ];

  const milestones = [
    { label: "Active Network Members", value: "10,000+" },
    { label: "Established Year", value: "2018" },
    { label: "Workshops & Hackathons", value: "65+" },
    { label: "Research Fellowships", value: "30+" }
  ];

  // ──── HOME PREVIEW WIDGET (SUMMARY VIEW) ────
  if (summaryOnly) {
    return (
      <section id="community-summary" className="py-20 sm:py-28 bg-cohere-canvas border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
                ECOSYSTEM ALLIANCE • EST. 2018
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-tight">
                MLDSN Nepal Community Hub
              </h2>
              <p className="text-cohere-subtle text-base leading-relaxed">
                Associated directly with MounTech Solution (MTS), Machine Learning and Data Science Network (MLDSN) Nepal is a premier non-profit platform advancing localized engineering discovery, data science literacy, and technical accessibility.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-3">
                <button 
                  onClick={() => setRoute({ page: 'community', courseId: 'ai-agents' })}
                  className="rounded-full px-6 py-3 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm flex items-center gap-2 transition-all"
                >
                  <span>Explore Community Hub</span>
                  <ArrowRight size={14} />
                </button>
                <a
                  href="https://mldsnnepal.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-5 py-3 text-xs font-mono font-semibold bg-cohere-stone hover:bg-[#e4e2dc] text-cohere-ink border border-black/[0.08] flex items-center gap-1.5 transition-all"
                >
                  <span>mldsnnepal.org</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              {pillars.slice(0, 2).map((p, i) => (
                <div key={i} className="p-6 rounded-2xl bg-cohere-stone/60 border border-black/[0.08] hover:border-black/[0.2] transition-all space-y-2">
                  <div className="flex items-center gap-2.5">
                    {p.icon}
                    <h3 className="text-base font-bold text-cohere-ink">{p.title}</h3>
                  </div>
                  <p className="text-xs text-cohere-subtle leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    );
  }

  // ──── FULL DEDICATED COMMUNITY VIEW ────
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Brand Header */}
      <div className="max-w-3xl space-y-4">
        <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
          NON-PROFIT AFFILIATE LAYER
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cohere-ink tracking-tight">
          Machine Learning & Data Science Network
        </h1>
        <p className="text-lg text-cohere-subtle leading-relaxed">
          Nepal's premier sovereign tech community dedicated to advancing artificial intelligence, deep learning mechanics, and inclusive structural digitalization since 2018.
        </p>
        
        <div className="pt-2">
          <a 
            href="https://mldsnnepal.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-full px-7 py-3.5 text-xs font-bold bg-cohere-ink hover:bg-black text-white shadow-sm inline-flex items-center gap-2"
          >
            <span>Visit Official Site: mldsnnepal.org</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Community Milestones Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {milestones.map((m, i) => (
          <div key={i} className="p-6 rounded-2xl bg-cohere-stone/70 border border-black/[0.08] text-center space-y-1">
            <div className="text-3xl font-extrabold text-cohere-ink font-mono">{m.value}</div>
            <div className="text-xs text-cohere-slate">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Core Objectives Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-white border border-black/[0.08] space-y-3 shadow-sm">
            <div className="p-3 rounded-xl bg-cohere-stone w-fit">
              {p.icon}
            </div>
            <h3 className="text-lg font-bold text-cohere-ink">{p.title}</h3>
            <p className="text-xs text-cohere-subtle leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Newsletter / Circle Alerts */}
      <div className="p-8 sm:p-12 rounded-2xl bg-cohere-stone/60 border border-black/[0.08] max-w-2xl mx-auto text-center space-y-4">
        <h3 className="font-display text-2xl font-bold text-cohere-ink">Join MLDSN Community Circles</h3>
        <p className="text-xs sm:text-sm text-cohere-subtle max-w-md mx-auto">
          Get notified about upcoming in-person hackathons, guest research lectures, and open-source project sprints in Kathmandu.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-xl bg-white border border-cohere-teal/30 text-cohere-teal font-mono text-xs flex items-center justify-center gap-2 shadow-sm">
            <CheckCircle2 size={16} />
            <span>Registration logged! You will receive future event notifications.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-2.5 rounded-full bg-white border border-black/[0.1] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
            />
            <button
              type="submit"
              className="rounded-full px-6 py-2.5 bg-cohere-ink hover:bg-black text-white font-bold text-xs shadow-sm transition-all"
            >
              Join Circles
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
