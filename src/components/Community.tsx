import React, { useState } from 'react';
import { 
  Users, Award, Globe, Rocket, BookOpen, 
  ExternalLink, Calendar, CheckCircle2, HeartHandshake, ArrowRight
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
      icon: <Users size={20} className="text-accent" />,
      title: "Community & Flagship Events",
      desc: "Building a powerful networking matrix for AI, ML, and Data Science enthusiasts across Nepal and globally through impactful workshops, hackathons, and technical bootcamps."
    },
    {
      icon: <BookOpen size={20} className="text-accent2" />,
      title: "Applied Research & Publications",
      desc: "Driving regional academic excellence via peer-reviewed paper support, technical blogs, and bridging gaps between data science industry tracks and local research bodies."
    },
    {
      icon: <Globe size={20} className="text-green" />,
      title: "Digital Nepal & Rural Inclusion",
      desc: "Actively working to bridge the urban-rural technological divide by promoting data literacy, tech-driven localization solutions, and rural digital infrastructure inclusion."
    }
  ];

  const milestones = [
    { label: "Community Members", value: "10,000+" },
    { label: "Founded Year", value: "2018" },
    { label: "Workshops & Hackathons", value: "65+" },
    { label: "Research Fellowships", value: "30+" }
  ];

  // ──── HOME PREVIEW WIDGET (SUMMARY VIEW) ────
  if (summaryOnly) {
    return (
      <section id="community-summary" className="py-20 bg-surface/80 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs text-green uppercase tracking-wider">
                ECOSYSTEM ALLIANCE • EST. 2018
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                MLDSN Nepal Community Hub
              </h2>
              <p className="text-text-sub text-sm sm:text-base leading-relaxed">
                Associated directly with MounTech Solution (MTS), Machine Learning and Data Science Network (MLDSN) Nepal is a premier non-profit platform advancing localized engineering discovery, data science literacy, and technical accessibility.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-3">
                <button 
                  onClick={() => setRoute({ page: 'community', courseId: 'ai-agents' })}
                  className="px-5 py-2.5 rounded-xl bg-accent hover:bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-accent/25 flex items-center gap-2"
                >
                  <span>Explore Community Hub</span>
                  <ArrowRight size={15} />
                </button>
                <a
                  href="https://mldsnnepal.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-surface hover:bg-white/5 border border-white/15 text-white font-semibold text-xs flex items-center gap-1.5"
                >
                  <span>mldsnnepal.org</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              {pillars.slice(0, 2).map((p, i) => (
                <div key={i} className="bg-card/90 border border-white/8 hover:border-accent/30 p-5 rounded-2xl transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-surface border border-white/5">{p.icon}</div>
                    <strong className="text-sm font-bold text-white">{p.title}</strong>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    );
  }

  // ──── FULL DEDICATED CANVAS VIEW ────
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Brand Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs text-accent uppercase tracking-wider">
          NON-PROFIT AFFILIATE LAYER
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Machine Learning & Data Science Network
        </h1>
        <p className="text-text-sub text-sm sm:text-base leading-relaxed">
          Nepal's leading sovereign tech community dedicated to advancing artificial intelligence, deep learning mechanics, and inclusive structural digitalization since 2018.
        </p>
        
        <div className="pt-2 flex justify-center">
          <a 
            href="https://mldsnnepal.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-accent hover:bg-blue-600 text-white font-semibold text-sm shadow-xl shadow-accent/25 flex items-center gap-2 transition-all active:scale-95"
          >
            <span>Visit Official Site: mldsnnepal.org</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Community Milestones Counter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
        {milestones.map((m, i) => (
          <div key={i} className="p-5 rounded-2xl bg-surface border border-white/10">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{m.value}</div>
            <div className="text-xs text-text-muted mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Core Objectives Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, idx) => (
          <div key={idx} className="bg-surface/80 border border-white/10 p-7 rounded-2xl space-y-4">
            <div className="p-3 rounded-xl bg-card border border-white/5 w-fit">
              {p.icon}
            </div>
            <h3 className="text-lg font-bold text-white">{p.title}</h3>
            <p className="text-text-sub text-xs sm:text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Community Newsletter & Event Alerts */}
      <div className="bg-gradient-to-b from-surface to-card border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-accent-dim text-accent flex items-center justify-center mx-auto">
          <Calendar size={22} />
        </div>
        <h3 className="text-xl font-bold text-white">Join MLDSN Community Circles</h3>
        <p className="text-text-sub text-xs sm:text-sm max-w-lg mx-auto">
          Receive notifications on upcoming physical hackathons, guest research lectures, and open-source project sprints in Kathmandu and virtual hubs.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-xl bg-green/10 border border-green/30 text-green font-mono text-xs flex items-center justify-center gap-2">
            <CheckCircle2 size={16} />
            <span>Telemetry subscription logged! You will receive future event invites.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-accent hover:bg-blue-600 text-white font-semibold text-xs whitespace-nowrap transition-colors"
            >
              Get Event Invites
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
