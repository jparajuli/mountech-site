import React from 'react';
import { BarChart3, ShieldCheck, Database, Sliders } from 'lucide-react';

export default function DataScience() {
  const scales = [
    { title: "Small Scale (SMB)", target: "Rapid Insight Engines", solution: "Custom lightweight dashboard telemetry metrics and data migration pipelines." },
    { title: "Medium Scale", target: "Strategic Aggregation", solution: "Centralized database management architectures, predictive warehousing systems, and cross-department modeling." },
    { title: "Large Scale Enterprise", target: "Predictive Clusters", solution: "High-throughput data modeling streams, automated multi-layered predictive engines, and high-frequency BI clusters." }
  ];

  return (
    <section id="datascience" style={{ padding: '90px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--green)' }}>ANALYTICS & CORE INTELLIGENCE</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '8px', marginBottom: '16px' }}>Enterprise Data Science Matrix</h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: '600px', margin: '0 auto' }}>
            Delivering robust data engineering, automated visualization metrics, and deterministic predictive models structured for diverse organizational complexities.
          </p>
        </div>

        {/* Scalability Tiers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {scales.map((s, idx) => (
            <div key={idx} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '28px' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--text-muted)' }}>SCALE FACTOR</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '4px', marginBottom: '12px' }}>{s.title}</h3>
              <div style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 500, marginBottom: '8px' }}>{s.target}</div>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.solution}</p>
            </div>
          ))}
        </div>

        {/* End-to-End Core Framework Feature Banner */}
        <div style={{ background: 'var(--card)', border: '1px solid rgba(52, 211, 153, 0.15)', borderRadius: '12px', padding: '32px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Sliders size={20} style={{ color: 'var(--green)' }} /> End-to-End ML & BI Systems Support
            </h3>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem' }}>
              We construct everything from data ingestion layers and validation pipelines up to localized deployment frameworks and rich Business Intelligence arrays.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 20px', borderRadius: '6px', textAlign: 'center' }}>
              <Database size={18} style={{ color: 'var(--accent)', marginBottom: '4px' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>Robust MLOps</div>
            </div>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '12px 20px', borderRadius: '6px', textAlign: 'center' }}>
              <BarChart3 size={18} style={{ color: 'var(--accent2)', marginBottom: '4px' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>Live BI Hubs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
