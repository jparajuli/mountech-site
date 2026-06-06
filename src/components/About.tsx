import React from 'react';
import { Target, Eye, ShieldCheck, Award } from 'lucide-react';
import Logo from './Logo';

export default function About({ summaryOnly }: { summaryOnly?: boolean }) {
  if (summaryOnly) {
    return (
      <section id="about-summary" style={{ padding: '64px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--accent)' }}>CORPORATE IDENTITY</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '8px', marginBottom: '16px' }}>
              "Architecting Intelligence, Securing Infrastructure"
            </h2>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              MounTech Solutions serves as a global technology bridge, converging secure computational infrastructure with next-generation algorithmic scaling frameworks.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '24px', borderRadius: '8px', width: '220px' }}>
              <Target size={20} style={{ color: 'var(--accent)', marginBottom: '8px' }} />
              <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>Our Mission</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Deploying resilient data networks globally.</div>
            </div>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: '24px', borderRadius: '8px', width: '220px' }}>
              <Eye size={20} style={{ color: 'var(--accent2)', marginBottom: '8px' }} />
              <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>Our Vision</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Sovereign technological automation.</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Logo size={64} />
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '12px' }}>Corporate Profile</h1>
        <p style={{ color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '1.1rem' }}>
          Motto: "Architecting Intelligence, Securing Infrastructure."
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* Brand Blueprint Breakdown */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award style={{ color: 'var(--accent)' }} /> Iconographic Core Geometry
          </h2>
          <p style={{ color: 'var(--text-sub)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Our corporate emblem synthesizes the towering peaks of the local topography with technical network topology metrics. The overlapping vector paths represent multi-agent software arrays processing in parallel, anchored by a protective cryptographic hexagonal system hull. The green summit vertex indicates verified infrastructure availability and uptime.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Target style={{ color: 'var(--green)' }} /> Institutional Mission
          </h2>
          <p style={{ color: 'var(--text-sub)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            To bridge the gap between advanced computational engineering and operational legacy infrastructures, empowering mid-market enterprises, global entities, and governmental institutions with highly resilient, data-driven, sovereign technological frameworks.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '40px', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Eye style={{ color: 'var(--accent2)' }} /> Strategic Vision
          </h2>
          <p style={{ color: 'var(--text-sub)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            To operate as the premier algorithmic architecture hub and technical infrastructure network within South Asia and across the global digital frontier, accelerating national and private digital transformation through transparent scientific discovery and rigorous field execution.
          </p>
        </div>
      </div>
    </div>
  );
}
