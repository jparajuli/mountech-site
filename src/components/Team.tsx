import { Terminal, Shield, Network, Users } from 'lucide-react';

export default function Team({ summaryOnly, onViewFull }: { summaryOnly?: boolean; onViewFull?: () => void }) {
  const members = [
    {
      name: "Jhanak Parajuli",
      role: "Founder & Managing Director",
      specialty: "Distributed Systems & Multi-Agent Architecture Design",
      icon: <Terminal size={18} style={{ color: 'var(--accent)' }} />
    },
    {
      name: "Dr. Amit Thapa",
      role: "Chief AI Systems Scientist",
      specialty: "Sovereign LLM Fine-Tuning & Algorithmic Design",
      icon: <Network size={18} style={{ color: 'var(--accent2)' }} />
    },
    {
      name: "Elena Vance",
      role: "Head of GovTech Systems Integration",
      specialty: "Public Sector Architecture Networks & Compliance Protocols",
      icon: <Shield size={18} style={{ color: 'var(--green)' }} />
    }
  ];

  if (summaryOnly) {
    return (
      <section id="team-summary" style={{ padding: '90px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: '24px', marginBottom: '48px' }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--green)' }}>ENGINEERING LABS</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '8px' }}>Ecosystem Architecture Cell</h2>
            </div>
            <button onClick={onViewFull} style={{
              background: 'transparent', border: '1px solid var(--border-hover)', color: 'var(--text)',
              padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500
            }}>View Full Team Framework →</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {members.slice(0, 2).map((m, idx) => (
              <div key={idx} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  {m.icon}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{m.name}</h3>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 500, marginBottom: '6px' }}>{m.role}</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5 }}>{m.specialty}</p>
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
        <Users size={32} style={{ color: 'var(--green)', marginBottom: '12px' }} />
        <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.04em' }}>Our Systems Architects</h1>
        <p style={{ color: 'var(--text-sub)', maxWidth: '500px', margin: '8px auto 0' }}>
          Meet the operational engineering team managing our multi-agent pipelines and core data clusters.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {members.map((m, idx) => (
          <div key={idx} style={{
            background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px',
            padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '240px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '8px', borderRadius: '6px' }}>{m.icon}</div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{m.name}</h2>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>{m.role}</div>
                </div>
              </div>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 1.6 }}>{m.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
