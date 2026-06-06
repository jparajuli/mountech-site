import React from 'react';
import { ChevronRight } from 'lucide-react';
import Logo from './Logo';

export default function Hero() {
  return (
    <section className="grid-bg" id="about" style={{ padding: '120px 24px 100px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Branding Badge Container */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--accent-dim)',
          border: '1px solid rgba(79, 156, 249, 0.2)',
          padding: '8px 16px',
          borderRadius: '30px',
          fontSize: '0.8rem',
          fontFamily: "'JetBrains Mono', monospace",
          color: 'var(--accent)',
          marginBottom: '32px'
        }}>
          <Logo size={18} /> Architecting Intelligence, Securing Infrastructure
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          lineHeight: 1.15,
          marginBottom: '24px'
        }}>
          Digital Transformation Engineered for <br />
          <span style={{
            backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Enterprise Growth Scales</span>
        </h1>
        
        <p style={{ color: 'var(--text-sub)', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto 40px', lineHeight: 1.7 }}>
          MounTech integrates advanced multi-agent configurations, secure cloud data operations, and comprehensive IT advisory matrices to deliver sovereign automation.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="#contact" style={{
            background: 'var(--accent)',
            color: '#fff',
            padding: '14px 28px',
            borderRadius: '6px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 20px rgba(79, 156, 249, 0.25)'
          }}>
            Initiate Modernization Pipeline <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
