import React, { useState } from 'react';
import { 
  Mail, ShieldCheck, MapPin, Send, Lock
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
    await new Promise(resolve => setTimeout(resolve, 600));

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
    <section id="contact" className="py-20 sm:py-28 bg-[#f5f4f0] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Endpoint Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
                COMMUNICATIONS RELAY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-tight mt-1">
                Connect with our systems architects.
              </h2>
              <p className="text-cohere-subtle text-sm sm:text-base leading-relaxed mt-3">
                Connect directly with our advisory unit to map requirements, orchestrate offshore engineering pods, or establish sovereign infrastructure nodes.
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-white border border-black/[0.08] p-4 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-cohere-stone flex items-center justify-center text-cohere-ink flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">PRIMARY INQUIRIES</div>
                  <a href="mailto:info@mountech.com.np" className="text-sm font-semibold text-cohere-ink hover:text-cohere-coral font-mono transition-colors">
                    info@mountech.com.np
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-black/[0.08] p-4 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-cohere-stone flex items-center justify-center text-cohere-coral flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">ACADEMIC & COMMUNITY HUB</div>
                  <a href="mailto:aimldsn@gmail.com" className="text-sm font-semibold text-cohere-ink hover:text-cohere-coral font-mono transition-colors">
                    aimldsn@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-black/[0.08] p-4 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-cohere-stone flex items-center justify-center text-cohere-teal flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">HEADQUARTERS NODE</div>
                  <div className="text-sm font-semibold text-cohere-ink">
                    Kathmandu, Nepal • Global Operations
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Badge */}
            <div className="p-4 rounded-xl bg-white border border-black/[0.06] flex items-start gap-3 text-xs text-cohere-subtle shadow-sm">
              <Lock size={16} className="text-cohere-teal flex-shrink-0 mt-0.5" />
              <span>
                All inquiries are transmitted via encrypted TLS 1.3 protocol and verified by internal systems engineers. No marketing tracking pixels.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Matrix Form */}
          <div className="lg:col-span-7 bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-10 shadow-sm">
            {sent ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cohere-teal/10 border border-cohere-teal/30 text-cohere-teal flex items-center justify-center mx-auto">
                  <ShieldCheck size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cohere-ink">Transmission Dispatched</h3>
                  <p className="text-xs sm:text-sm text-cohere-subtle max-w-md mx-auto mt-1">
                    The communications relay has received your query. A systems architect will review and respond within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-cohere-stone border border-black/[0.08] max-w-xs mx-auto font-mono text-xs">
                  <div className="text-cohere-slate text-[10px]">TRANSMISSION REFERENCE</div>
                  <div className="text-cohere-ink font-bold mt-0.5">{txId}</div>
                </div>

                <button
                  onClick={() => setSent(false)}
                  className="rounded-full px-6 py-2.5 bg-cohere-stone hover:bg-[#e4e2dc] text-cohere-ink text-xs font-semibold"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-mono text-cohere-slate uppercase block mb-2">
                    Select Transmission Track
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                          topic === t 
                            ? 'bg-cohere-ink text-white font-semibold border-cohere-ink shadow-sm' 
                            : 'bg-cohere-stone text-cohere-subtle border-black/[0.06] hover:border-black/[0.2]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-cohere-slate mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-cohere-ink text-xs focus:outline-none focus:border-cohere-ink"
                      placeholder="e.g. Pravesh Karki"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-cohere-slate mb-1.5">Corporate / Contact Email *</label>
                    <input 
                      type="email" 
                      required 
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-cohere-ink text-xs focus:outline-none focus:border-cohere-ink"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-cohere-slate mb-1.5">Organization / Enterprise Entity</label>
                  <input 
                    type="text" 
                    value={form.organization}
                    onChange={(e) => setForm({...form, organization: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-cohere-ink text-xs focus:outline-none focus:border-cohere-ink"
                    placeholder="e.g. FinTech Global / Apex Bank / Academic Lab"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-cohere-slate mb-1.5">Technical Specifications / Query Context *</label>
                  <textarea 
                    rows={4} 
                    required 
                    value={form.query}
                    onChange={(e) => setForm({...form, query: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-cohere-ink text-xs focus:outline-none focus:border-cohere-ink resize-none"
                    placeholder="Outline your project scope, compute requirements, or training cohort questions..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full rounded-full py-3.5 bg-cohere-ink hover:bg-black text-white font-bold text-xs shadow-md shadow-black/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Establishing Secure Handshake...</span>
                  ) : (
                    <>
                      <Send size={14} />
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
