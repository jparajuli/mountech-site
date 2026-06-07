import { ChevronRight } from 'lucide-react';
import Logo from './Logo';

export default function Hero() {
  return (
    <section className="grid-bg" style={{ borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          background: 'var(--accent-dim)', border: '1px solid rgba(79, 156, 249, 0.2)',
          padding: '8px 16px', borderRadius: '30px', fontSize: '0.75rem', color: 'var(--accent)',
          marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center'
        }}>
          <Logo size={16} /> <span>Architecting Intelligence, Securing Infrastructure</span>
        </div>

        <h1 style={{ fontWeight: 800, marginBottom: '20px', lineHeight: 1.1 }}>
          Digital Transformation for <br />
          <span style={{
            backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Enterprise Growth Scales</span>
        </h1>
        
        <p style={{ color: 'var(--text-sub)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          Advanced multi-agent AI, secure cloud operations, and expert advisory designed for sovereign automation.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#contact" style={{
            background: 'var(--accent)', color: '#fff', padding: '14px 24px',
            borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            Initiate Pipeline <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
