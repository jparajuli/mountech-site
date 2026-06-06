import React from 'react';
import { BrainCircuit, Landmark, Building, Milestone, Layers } from 'lucide-react';

export default function AiSolutions({ summaryOnly, onViewFull }: { summaryOnly?: boolean; onViewFull?: () => void }) {
  const segments = [
    {
      icon: <Milestone size={20} style={{ color: 'var(--accent)' }} />,
      title: "Small-Scale Systems",
      desc: "Localized operational automation, smart analytics pipelines, and specialized fine-tuned semantic search systems."
    },
    {
      icon: <Building size={20} style={{ color: 'var(--accent2)' }} />,
      title: "Medium & Large Enterprise",
      desc: "Multi-agent task forces, distributed knowledge graphs, secure internal database querying modules, and demand forecasting arrays."
    },
    {
      icon: <Landmark size={20} style={{ color: 'var(--green)' }} />,
      title: "Sovereign & Government Tech",
      desc: "Localized LLM configurations, secure processing pipelines for ministries within Nepal and international public sector units, respecting strict compliance structures."
    }
  ];

  if (summaryOnly) {
    return (
      <section id="ai-summary" style={{ padding: '90px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--accent2)' }}>MOUNTECH AI</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '8px' }}>Autonomous AI Scale Engineering</h2>
            </div>
            <button onClick={onViewFull} style={{
              background: 'transparent', border: '1px solid var(--border-hover)', color: 'var(--accent)',
              padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500
            }}>Explore Solutions Matrix →</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {segments.map((s, idx) => (
              <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '28px' }}>
                <div style={{ marginBottom: '16px' }}>{s.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
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
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent2)' }}>CORE MODULE MATRIX</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.04em', marginTop: '8px' }}>Global AI Infrastructure Deployments</h1>
        <p style={{ color: 'var(--text-sub)', maxWidth: '600px', margin: '16px auto 0' }}>
          Engineering fine-tuned algorithmic networks serving cross-border industries, heavy logistics, and state public sector divisions.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {segments.map((s, idx) => (
          <div key={idx} style={{
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
            padding: '40px', display: 'flex', gap: '24px', alignItems: 'start', flexWrap: 'wrap'
          }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px' }}>
              {s.icon}
            </div>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px' }}>{s.title} Solutions Architecture</h2>
              <p style={{ color: 'var(--text-sub)', lineHeight: 1.7, marginBottom: '20px' }}>{s.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}>Custom Inference Layers</span>
                <span style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.8rem', fontFamily: "'JetBrains Mono', monospace" }}>Private Data Guardrails</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
