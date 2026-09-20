import React from 'react';
import { HelpCircle, Network, HardDrive, ShieldAlert } from 'lucide-react';

export default function Services() {
  const consultations = [
    { icon: <Network size={20} style={{ color: 'var(--accent)' }} />, title: "Artificial Intelligence Strategy", info: "Advising enterprise engineering groups on fine-tuning workflows, context management pipelines, and infrastructure sizing." },
    { icon: <HardDrive size={20} style={{ color: 'var(--green)' }} />, title: "IT Infrastructure Architecture", info: "Designing clean data architectures, localized system networks, and secure server nodes to maximize system health and uptime." },
    { icon: <ShieldAlert size={20} style={{ color: 'var(--accent2)' }} />, title: "Cross-Domain Compliance", info: "Assisting organizations with the legal and operational aspects of data privacy rules and governance frameworks." }
  ];

  return (
    <section id="consulting" style={{ padding: '90px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--accent)' }}>MOUNTECH ADVISORY GROUP</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '8px' }}>Specialized Domain Consultation</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '6px' }}>Guiding enterprises through complex technology architectures safely.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {consultations.map((c, idx) => (
            <div key={idx} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px' }}>
              <div style={{ marginBottom: '18px' }}>{c.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '12px' }}>{c.title}</h3>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 1.6 }}>{c.info}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
