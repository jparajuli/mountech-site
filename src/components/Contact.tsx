import React, { useState } from 'react';
import { 
  Mail, ShieldCheck, MapPin, Send, Lock, Database, CheckCircle2, AlertCircle, RefreshCw, Key
} from 'lucide-react';
import { DatabaseService } from '../services/database';
import { EmailVerificationService } from '../services/emailVerification';
import DatabaseLedgerModal from './DatabaseLedgerModal';
import { ContactRecord } from '../types';

export default function Contact() {
  const [topic, setTopic] = useState('Enterprise AI & Multi-Agents');
  const [form, setForm] = useState({ name: '', email: '', organization: '', query: '' });
  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  const [sentRecord, setSentRecord] = useState<ContactRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);

  const topics = [
    'Enterprise AI & Multi-Agents',
    'Tech Academy (40h Cohort)',
    'DevSecOps & Cloud Mesh',
    'Data Science & Analytics',
    'Research & Community Collaboration'
  ];

  const handleEmailChange = (val: string) => {
    setForm(prev => ({ ...prev, email: val }));
    if (val.includes('@')) {
      const validation = EmailVerificationService.validateEmail(val);
      if (!validation.isValid && validation.error) {
        setEmailWarning(validation.error);
      } else if (validation.suggestion) {
        setEmailWarning(`Did you mean @${validation.suggestion}?`);
      } else {
        setEmailWarning(null);
      }
    } else {
      setEmailWarning(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.query) return;

    const emailCheck = EmailVerificationService.validateEmail(form.email);
    if (!emailCheck.isValid) {
      setEmailWarning(emailCheck.error || 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 750));

    // Save using cryptographic DatabaseService
    const record = await DatabaseService.saveContact({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      organization: form.organization.trim() || 'Independent / Research',
      topic,
      query: form.query.trim(),
      connectionMethod: 'rest_tls13'
    });

    setSentRecord(record);
    setIsSubmitting(false);
    setForm({ name: '', email: '', organization: '', query: '' });
    setEmailWarning(null);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#f5f4f0] border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Endpoint Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
                  COMMUNICATIONS RELAY
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Node
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-tight">
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

            {/* Database & Security Info Box */}
            <div className="p-4 rounded-2xl bg-white border border-black/[0.08] space-y-3 shadow-sm">
              <div className="flex items-start gap-3 text-xs text-cohere-subtle">
                <Lock size={16} className="text-cohere-teal flex-shrink-0 mt-0.5" />
                <span>
                  All inquiries are sealed with client-side SHA-256 cryptographic hashes and recorded into the persistent sovereign database ledger.
                </span>
              </div>
              <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between">
                <span className="font-mono text-[10px] text-cohere-slate">
                  Database: Indexed & Persistent
                </span>
                <button
                  onClick={() => setIsLedgerOpen(true)}
                  className="font-mono text-xs text-cohere-ink hover:text-cohere-teal font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Database size={13} />
                  <span>Inspect Database</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Matrix Form */}
          <div className="lg:col-span-7 bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-10 shadow-sm">
            {sentRecord ? (
              <div className="text-center py-10 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <ShieldCheck size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cohere-ink">Transmission Confirmed & Committed</h3>
                  <p className="text-xs sm:text-sm text-cohere-subtle max-w-md mx-auto mt-1">
                    Your transmission has been cryptographically recorded in the sovereign database ledger. A systems architect will review and respond within 24 hours.
                  </p>
                </div>

                {/* Ledger Proof Card */}
                <div className="p-4 rounded-xl bg-cohere-stone border border-black/[0.08] max-w-md mx-auto font-mono text-xs text-left space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-cohere-slate pb-1 border-b border-black/[0.06]">
                    <span>DATABASE RECORD ID</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 size={11} /> COMMITTED
                    </span>
                  </div>
                  <div className="text-cohere-ink font-bold text-sm">{sentRecord.id}</div>
                  <div className="text-[11px] text-cohere-slate">Sender: {sentRecord.name} ({sentRecord.email})</div>
                  <div className="text-[11px] text-cohere-slate">Track: {sentRecord.topic}</div>
                  <div className="pt-2 border-t border-black/[0.06] text-[10px] text-cohere-slate truncate">
                    <span className="text-cohere-ink font-semibold">SHA-256 Checksum: </span>
                    <span className="text-cohere-slate">{sentRecord.checksum}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setIsLedgerOpen(true)}
                    className="rounded-full px-5 py-2.5 bg-cohere-ink text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-black transition-colors"
                  >
                    <Database size={13} />
                    <span>View in Database Ledger</span>
                  </button>
                  <button
                    onClick={() => setSentRecord(null)}
                    className="rounded-full px-5 py-2.5 bg-cohere-stone hover:bg-[#e4e2dc] text-cohere-ink text-xs font-semibold"
                  >
                    Send Another Transmission
                  </button>
                </div>
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
                      onChange={(e) => handleEmailChange(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border text-cohere-ink text-xs focus:outline-none transition-colors ${
                        emailWarning ? 'border-amber-400 focus:border-amber-500' : 'border-black/[0.08] focus:border-cohere-ink'
                      }`}
                      placeholder="name@company.com"
                    />
                    {emailWarning && (
                      <p className="text-[11px] text-amber-700 mt-1 flex items-center gap-1 font-mono">
                        <AlertCircle size={11} />
                        <span>{emailWarning}</span>
                      </p>
                    )}
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

                {/* Connection Protocol Note */}
                <div className="p-3 rounded-xl bg-cohere-stone border border-black/[0.06] text-[11px] font-mono text-cohere-slate flex items-center justify-between">
                  <span>Connection: TLS 1.3 / Client-Indexed Engine</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Key size={11} /> SHA-256 Signed
                  </span>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full rounded-full py-3.5 bg-cohere-ink hover:bg-black text-white font-bold text-xs shadow-md shadow-black/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Hashing & Committing to Database...</span>
                    </span>
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

      {/* Database Ledger Modal */}
      <DatabaseLedgerModal
        isOpen={isLedgerOpen}
        onClose={() => setIsLedgerOpen(false)}
      />
    </section>
  );
}

