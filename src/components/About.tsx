import React from 'react';
import { 
  Target, Eye, Award, Users, Terminal, Shield, Network, 
  Layers, BookOpen, Heart, ShieldAlert, Globe, Milestone
} from 'lucide-react';
import Logo from './Logo';

interface AboutProps {
  summaryOnly?: boolean;
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function About({ summaryOnly, setRoute }: AboutProps) {
  const founders = [
    {
      name: "Surya Basnet",
      role: "Founder",
      specialty: "Enterprise Digitalization Strategy & Cloud Infrastructure Platforms",
      icon: <Layers size={18} style={{ color: 'var(--accent)' }} />
    },
    {
      name: "Jhanak Parajuli",
      role: "Founder",
      specialty: "Distributed Systems & Multi-Agent Algorithmic Engineering",
      icon: <Terminal size={18} style={{ color: 'var(--accent2)' }} />
    },
    {
      name: "Sarbagya R. Shakya",
      role: "Founder",
      specialty: "Educational Infrastructure & Applied Intelligence Frameworks",
      icon: <BookOpen size={18} style={{ color: 'var(--accent)' }} />
    },
    {
      name: "Tej Shahi",
      role: "Founder",
      specialty: "Deep Learning Research & Sovereign Language Model Optimization",
      icon: <Network size={18} style={{ color: 'var(--green)' }} />
    },
    {
      name: "Dilip Yogi",
      role: "Founder",
      specialty: "High-Performance Compute Clustering & DevSecOps Operations",
      icon: <Shield size={18} style={{ color: 'var(--accent)' }} />
    }
  ];

  const values = [
    {
      icon: <ShieldAlert size={20} style={{ color: 'var(--accent)' }} />,
      title: "Sovereign Tech Security",
      desc: "We engineer systems with absolute local accountability, safeguarding institutional integrity against systemic external vulnerabilities."
    },
    {
      icon: <Heart size={20} style={{ color: 'var(--accent2)' }} />,
      title: "Community Synergy",
      desc: "Our active partnership with non-profit groups like MLDSN Nepal drives localized educational acceleration and technical equity."
    },
    {
      icon: <Globe size={20} style={{ color: 'var(--green)' }} />,
      title: "Global Execution Scales",
      desc: "We balance domestic localized knowledge parameters with robust, high-performance distributed networks globally."
    }
  ];

  const companyPillars = [
    {
      title: "Advanced AI Systems",
      desc: "Architecting decentralized, stateful multi-agent execution graphs, custom embeddings integration, and localized foundational LLM fine-tuning schemas.",
      icon: <Terminal size={18} style={{ color: 'var(--accent2)' }} />
    },
    {
      title: "Sovereign Infrastructure",
      desc: "Deploying high-performance container orchestration arrays, automated feature stores, and declarative cloud architectures under rigid security metrics.",
      icon: <Shield size={18} style={{ color: 'var(--green)' }} />
    },
    {
      title: "Ecosystem Literacy",
      desc: "Accelerating regional engineering intelligence through rigorous 40-hour hands-on instruction blocks and non-profit research community alliances.",
      icon: <BookOpen size={18} style={{ color: 'var(--accent)' }} />
    }
  ];

  if (summaryOnly) {
    return (
      <section id="about-summary" style={{ padding: '80px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--accent)' }}>DNA & IDENTITY</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '8px' }}>About MounTech Solution</h2>
            </div>
            <button 
              onClick={() => setRoute({ page: 'about', courseId: 'ai-agents' })}
              style={{
                background: 'transparent', border: '1px solid var(--border-hover)', color: '#fff',
                padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500
              }}
            >
              Explore Corporate Profile & Team →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {companyPillars.map((pillar, idx) => (
              <div key={idx} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  {pillar.icon}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{pillar.title}</h3>
                </div>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.85rem', lineHeight: 1.6 }}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Logo size={64} />
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '12px' }}>Corporate Profile</h1>
        <p style={{ color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '1.1rem' }}>
          MounTech Solution (MTS) • "Summiting AI. Securing the Foundations."
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '56px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award style={{ color: 'var(--accent)' }} /> Himalayan Binary Design
          </h3>
          <p style={{ color: 'var(--text-sub)', lineHeight: 1.6, fontSize: '0.9rem' }}>
            Our corporate emblem synthesizes the iconic mountain peaks of Nepal with the fundamental language of digitalization. The overlapping vector peaks celebrate our geographic origins and structural engineering stability, while the integrated, floating binary matrices symbolize multi-agent configurations, secure cloud data operations, and automated systems transformation logic.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Target style={{ color: 'var(--green)' }} /> Institutional Mission
          </h3>
          <p style={{ color: 'var(--text-sub)', lineHeight: 1.6, fontSize: '0.9rem' }}>
            To bridge the gap between advanced computational engineering and operational legacy infrastructures, empowering mid-market enterprises, global entities, and governmental institutions with highly resilient, data-driven, sovereign technological frameworks.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '32px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Eye style={{ color: 'var(--accent2)' }} /> Strategic Vision
          </h3>
          <p style={{ color: 'var(--text-sub)', lineHeight: 1.6, fontSize: '0.9rem' }}>
            To operate as the premier algorithmic architecture hub and technical infrastructure network within South Asia and across the global digital frontier, accelerating national and private digital transformation through transparent scientific discovery and rigorous field execution.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Our Operational Values</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>The fundamental guidelines that steer our software engineering pipelines.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {values.map((v, i) => (
            <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '28px', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                {v.icon} <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{v.title}</h4>
              </div>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.85rem', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: '12px', marginBottom: '64px' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Milestone style={{ color: 'var(--green)' }} /> Roadmap & Strategic Evolution
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '16px' }}>
            <span style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>PHASE 01 • DATA LAB ORIGINS</span>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginTop: '4px' }}>Began as an aligned research matrix providing deep algorithmic optimization, custom embedding architectures, and infrastructure auditing layers.</p>
          </div>
          <div style={{ borderLeft: '2px solid var(--green)', paddingLeft: '16px' }}>
            <span style={{ fontFamily: 'monospace', color: 'var(--green)', fontSize: '0.8rem', fontWeight: 600 }}>PHASE 02 • INTEGRATED ENTERPRISE SOLUTION</span>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginTop: '4px' }}>Scaled into MounTech Solution (MTS), providing production-grade multi-agent operations, cloud DevSecOps configurations, and expert technical consulting protocols.</p>
          </div>
          <div style={{ borderLeft: '2px solid var(--accent2)', paddingLeft: '16px' }}>
            <span style={{ fontFamily: 'monospace', color: 'var(--accent2)', fontSize: '0.8rem', fontWeight: 600 }}>PHASE 03 • REGIONAL SKILL ACCELERATION</span>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginTop: '4px' }}>Launched the 40-hour deep-tier Academy modules alongside non-profit community vectors to establish sovereign technology independence.</p>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '56px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Users size={32} style={{ color: 'var(--green)', marginBottom: '12px' }} />
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>Systems Architects & Leadership</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px' }}>
            The core founding network managing our multi-agent pipelines and secure infrastructure nodes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {founders.map((m, idx) => (
            <div key={idx} style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
              padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '8px', borderRadius: '6px' }}>{m.icon}</div>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#fff' }}>{m.name}</h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.05em' }}>{m.role.toUpperCase()}</div>
                  </div>
                </div>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.85rem', lineHeight: 1.5 }}>{m.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
