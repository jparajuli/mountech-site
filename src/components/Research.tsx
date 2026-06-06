import React from 'react';
import { Landmark, GraduationCap, FileText, Share2 } from 'lucide-react';

export default function Research() {
  const operations = [
    { icon: <FileText size={18} />, title: "Academic Publications", desc: "Authoring and contributing core technical breakthroughs to globally recognized journals and algorithmic review conventions." },
    { icon: <GraduationCap size={18} />, title: "University Networks", desc: "Forging dynamic technology development partnerships with global and local academic institutions for applied innovation cycles." },
    { icon: <Landmark size={18} />, title: "Grants & Resource Funding", desc: "Securing capital channels for cutting-edge research paradigms and compute resource acquisitions." }
  ];

  return (
    <section id="research" style={{ padding: '90px 24px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ maxWidth: '700px', marginBottom: '56px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--accent2)' }}>MOUNTECH LABS & INNOVATION</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '8px', marginBottom: '16px' }}>Scientific Research & Node Innovation</h2>
          <p style={{ color: 'var(--text-sub)', fontSize: '1.05rem' }}>
            Advancing basic and applied technology frameworks through deep mathematical modeling and empirical computer science.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {operations.map((op, idx) => (
            <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: 'var(--accent2)', background: 'var(--bg)', border: '1px solid var(--border)', padding: '10px', borderRadius: '6px', alignSelf: 'start' }}>
                {op.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>{op.title}</h3>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 1.6 }}>{op.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
