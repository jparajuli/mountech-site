import React from 'react';
import { Users, Award, Globe, Rocket, BookOpen, ExternalLink } from 'lucide-react';

interface CommunityProps {
  summaryOnly?: boolean;
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function Community({ summaryOnly, setRoute }: CommunityProps) {
  const pillars = [
    {
      icon: <Users size={20} style={{ color: 'var(--accent)' }} />,
      title: "Community & Events",
      desc: "Building a powerful networking matrix for AI, ML, and Data Science enthusiasts across Nepal and globally through impactful workshops, seminars, and flagships."
    },
    {
      icon: <BookOpen size={20} style={{ color: 'var(--accent2)' }} />,
      title: "Research & Innovation",
      desc: "Driving regional academic excellence via peer-reviewed paper support, technical blogs, and bridging gaps between data science industry tracks and local research bodies."
    },
    {
      icon: <Globe size={20} style={{ color: 'var(--green)' }} />,
      title: "Digital Nepal",
      desc: "Actively working to bridge the urban-rural technological divide by promoting data literacy, tech-driven localization solutions, and rural digital infrastructure inclusion."
    }
  ];

  // ──── HOME PREVIEW WIDGET (SUMMARY VIEW) ────
  if (summaryOnly) {
    return (
      <section id="community-summary" style={{ padding: '80px 24px', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1.2', minWidth: '320px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--green)' }}>ECOSYSTEM PARTNER</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '8px', marginBottom: '16px' }}>
              MLDSN Nepal Community
            </h2>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Associated directly with MounTech Solution (MTS), Machine Learning and Data Science Network (MLDSN) Nepal is a premier non-profit platform established in 2018 to advance localized engineering discovery, data science literacy, and technical accessibility.
            </p>
            <button 
              onClick={() => setRoute({ page: 'community', courseId: 'ai-agents' })}
              style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent)', color: 'var(--accent)', padding: '10px 20px', borderRadius: '8px', fontWeight: 600 }}
            >
              Explore Community Hub →
            </button>
          </div>
          
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
            {pillars.slice(0, 2).map((p, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '20px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  {p.icon} <strong style={{ fontSize: '1rem', color: '#fff' }}>{p.title}</strong>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ──── FULL DEDICATED CANVAS VIEW ────
  return (
    <div style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', fontSize: '0.85rem' }}>NON-PROFIT AFFILIATE LAYER</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', marginTop: '8px' }}>Machine Learning & Data Science Network</h1>
        <p style={{ color: 'var(--text-sub)', maxWidth: '600px', margin: '12px auto 24px', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Nepal's leading sovereign tech community dedicated to advancing artificial intelligence, deep learning mechanics, and inclusive structural digitalization since 2018.
        </p>
        
        {/* Absolute Direct External Link to Core URL Asset */}
        <a 
          href="https://mldsnnepal.org" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--accent)', 
            color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none'
          }}
        >
          Visit mldsnnepal.org <ExternalLink size={16} />
        </a>
      </div>

      {/* Core Objectives Metric Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '56px' }}>
        {pillars.map((p, idx) => (
          <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px' }}>
            <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', width: 'fit-content', border: '1px solid var(--border)', marginBottom: '16px' }}>
              {p.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px', color: '#fff' }}>{p.title}</h3>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Flagship Tracking Timeline Narrative */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Award style={{ color: 'var(--accent2)' }} /> Flagship Milestones & Operational History
        </h2>
        <p style={{ color: 'var(--text-sub)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '20px' }}>
          Initiated with an intensive 3-day National Workshop in May 2018, MLDSN Nepal has grown to orchestrate continuous knowledge-sharing arrays across South Asia. The network's primary annual anchor framework—the <strong>National Workshop on Machine Learning and Data Science (NWMLDS)</strong>—stands as Nepal's premier multi-day training symposium designed explicitly for advanced research engineering tracks, computational students, and algorithmic startup co-founders.
        </p>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
          <div>📍 Origin Core: Kathmandu, Nepal</div>
          <div>✉️ Central Comm Matrix: aimldsn@gmail.com</div>
          <div>🌐 Framework Nodes: 6+ Years Continuous Operation</div>
        </div>
      </div>

    </div>
  );
}
