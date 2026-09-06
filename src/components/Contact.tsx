import React, { useState } from 'react';
import { 
  Mail, ShieldCheck, Phone, MapPin, Send, CheckCircle2, 
  Terminal, ArrowRight, Lock, MessageSquare
} from 'lucide-react';

export default function Contact() {
  const [topic, setTopic] = useState('Enterprise AI & Multi-Agents');
  const [form, setForm] = useState({ name: '', email: '', organization: '', query: '' });
  const [sent, setSent] = useState(false);
  const [txId, setTxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const topics = [
    'Enterprise AI & Multi-Agents',
    'Tech Academy (40h Cohort)',
    'DevSecOps & Cloud Mesh',
    'Data Science & Analytics',
    'Research & Community Collaboration'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const generatedId = `MTS-TX-${Math.floor(100000 + Math.random() * 900000)}`;
    const transmissions = JSON.parse(localStorage.getItem('mountech_transmissions') || '[]');
    transmissions.push({
      ...form,
      topic,
      txId: generatedId,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mountech_transmissions', JSON.stringify(transmissions));

    setTxId(generatedId);
    setSent(true);
    setIsSubmitting(false);
    setForm({ name: '', email: '', organization: '', query: '' });
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-surface/80 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Endpoint Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                COMMUNICATIONS RELAY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                Secure Engineering Gateway
              </h2>
              <p className="text-text-sub text-sm sm:text-base leading-relaxed mt-3">
                Connect directly with our systems architecture unit to map requirements, orchestrate offshore engineering pods, or establish sovereign infrastructure nodes.
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-card/90 border border-white/8 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-accent flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-text-muted uppercase">PRIMARY INQUIRIES</div>
                  <a href="mailto:info@mountech.com.np" className="text-sm font-semibold text-white hover:text-accent font-mono transition-colors">
                    info@mountech.com.np
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-card/90 border border-white/8 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-accent2 flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-text-muted uppercase">ACADEMIC & COMMUNITY HUB</div>
                  <a href="mailto:aimldsn@gmail.com" className="text-sm font-semibold text-white hover:text-accent2 font-mono transition-colors">
                    aimldsn@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-card/90 border border-white/8 p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-green flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-text-muted uppercase">HEADQUARTERS NODE</div>
                  <div className="text-sm font-medium text-white">
                    Kathmandu, Nepal • Global Operations
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Badge */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3 text-xs text-text-muted">
              <Lock size={16} className="text-green flex-shrink-0 mt-0.5" />
              <span>
                All inquiries are transmitted via encrypted TLS 1.3 protocol and verified by internal systems engineers. No marketing tracking pixels.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Matrix Form */}
          <div className="lg:col-span-7 bg-card/90 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {sent ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in duration-200">
                <div className="w-16 h-16 rounded-full bg-green/10 border border-green/30 text-green flex items-center justify-center mx-auto">
                  <ShieldCheck size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Transmission Dispatched</h3>
                  <p className="text-xs sm:text-sm text-text-sub max-w-md mx-auto mt-1">
                    The communications relay has successfully received your parameters. A systems architect will review and respond within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10 max-w-xs mx-auto font-mono text-xs">
                  <div className="text-text-muted text-[10px]">TRANSMISSION REFERENCE</div>
                  <div className="text-green font-bold mt-0.5">{txId}</div>
                </div>

                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2.5 rounded-xl bg-surface hover:bg-white/5 border border-white/15 text-white text-xs font-semibold"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-mono text-text-muted uppercase block mb-2">
                    Select Transmission Track
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          topic === t 
                            ? 'bg-accent text-white font-semibold border-accent shadow-sm' 
                            : 'bg-surface/60 text-text-sub border-white/5 hover:border-white/20'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-text-sub mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                      placeholder="e.g. Pravesh Karki"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-text-sub mb-1.5">Corporate / Contact Email *</label>
                    <input 
                      type="email" 
                      required 
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-sub mb-1.5">Organization / Enterprise Entity</label>
                  <input 
                    type="text" 
                    value={form.organization}
                    onChange={(e) => setForm({...form, organization: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                    placeholder="e.g. FinTech Global / Apex Bank / Academic Lab"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-sub mb-1.5">Technical Specifications / Query Context *</label>
                  <textarea 
                    rows={4} 
                    required 
                    value={form.query}
                    onChange={(e) => setForm({...form, query: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-white/10 text-white text-xs focus:outline-none focus:border-accent resize-none"
                    placeholder="Outline your project scope, compute requirements, or training cohort questions..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-accent hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-accent/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Establishing Secure Handshake...</span>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Dispatch Encrypted Transmission</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
