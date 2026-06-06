import React, { useState } from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', query: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) {
      setSent(true);
      setForm({ name: '', email: '', query: '' });
    }
  };

  return (
    <section id="contact" style={{ padding: '90px 24px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '16px' }}>Secure Communications Matrix</h2>
          <p style={{ color: 'var(--text-sub)', lineHeight: 1.7, marginBottom: '32px' }}>
            Connect with our system consulting unit to map requirements, orchestrate offshore development teams, or establish infrastructure nodes.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'var(--surface)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <Mail size={20} style={{ color: 'var(--accent)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>ENDPOINT RESOURCE</div>
              <div style={{ fontSize: '1rem', fontWeight: 500 }}>info@mountech.com.np</div>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <ShieldCheck size={48} style={{ color: 'var(--green)', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Transmission Dispatched</h3>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem' }}>The communications relay has received your message bundle successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '6px' }}>Identity Descriptor</label>
                <input 
                  type="text" required value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '6px' }}>Target Routing Email</label>
                <input 
                  type="email" required value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '6px' }}>Query Context Payload</label>
                <textarea 
                  rows={4} required value={form.query}
                  onChange={(e) => setForm({...form, query: e.target.value})}
                  style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff', resize: 'none' }}
                />
              </div>
              <button type="submit" style={{ background: 'var(--accent)', color: '#fff', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                Dispatch Handshake Protocol
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
