import React from 'react';
import { Network, Bot, Cpu, Sliders, Layers, CheckCircle } from 'lucide-react';

export default function Consulting({ summaryOnly, onViewFull }: { summaryOnly?: boolean; onViewFull?: () => void }) {
  const pillars = [
    {
      icon: <Layers size={22} style={{ color: 'var(--accent)' }} />,
      title: "Enterprise Digitalization Strategy",
      desc: "Architecting the migration of legacy operations into distributed cloud networks. Overhauling monolithic frameworks with highly resilient, decoupled microservices and centralized systems of record."
    },
    {
      icon: <Bot size={22} style={{ color: 'var(--accent2)' }} />,
      title: "LLMOps & Custom Generative Networks",
      desc: "Advising engineering groups on vector database retrieval parameters (RAG), private inference scaling, context window caching optimizations, and secure multi-agent governance."
    },
    {
      icon: <Cpu size={22} style={{ color: 'var(--green)' }} />,
      title: "Robotics & Edge Automation",
      desc: "Structuring real-time hardware-to-software orchestration loops. Designing Industrial IoT telemetry syncing, edge computational nodes, and intelligent physical sensory pipelines."
    }
  ];

  if (summaryOnly) {
    return (
      <section id="consulting-summary" style={{ padding: '90px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--accent)' }}>MOUNTECH CONSULTING</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '8px' }}>Specialized Technology Advisory</h2>
            </div>
            <button onClick={onViewFull} style={{
              background: 'transparent', border: '1px solid var(--border-hover)', color: 'var(--accent)',
              padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500
            }}>Explore Consulting Tracks →</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {pillars.map((p, idx) => (
              <div key={idx} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '28px' }}>
                <div style={{ marginBottom: '16px' }}>{p.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc.substring(0, 120)}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)' }}>STRATEGIC ADVISORY WING</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.04em', marginTop: '8px' }}>Engineering Transformation Roadmap</h1>
        <p style={{ color: 'var(--text-sub)', maxWidth: '650px', margin: '16px auto 0', lineHeight: 1.7 }}>
          Providing technical domain consultation to maximize digital capacity, resolve engineering blockages, and deploy automated artificial intelligence assets across global and regional bounds.
        </p>
      </div>

      {/* Main Core Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '64px' }}>
        {pillars.map((p, idx) => (
          <div key={idx} style={{
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
            padding: '40px', display: 'flex', gap: '32px', alignItems: 'start', flexWrap: 'wrap'
          }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px' }}>
              {p.icon}
            </div>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '12px' }}>{p.title}</h2>
              <p style={{ color: 'var(--text-sub)', lineHeight: 1.7, marginBottom: '24px' }}>{p.desc}</p>
              
              {/* Deliverables checklist */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#fff' }}>
                  <CheckCircle size={14} style={{ color: 'var(--green)' }} /> Technical Architecture Auditing
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#fff' }}>
                  <CheckCircle size={14} style={{ color: 'var(--green)' }} /> Risk Mitigation Planning
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
