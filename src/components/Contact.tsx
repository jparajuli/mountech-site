import React, { useState } from 'react';
import { 
  Mail, ShieldCheck, MapPin, Send, CheckCircle2, Phone, Clock, ArrowRight, Check
} from 'lucide-react';
import { DatabaseService } from '../services/database';
import { EmailVerificationService } from '../services/emailVerification';
import { ContactRecord } from '../types';

export default function Contact() {
  const [topic, setTopic] = useState('Enterprise AI & Multi-Agents');
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    organization: '', 
    phone: '',
    query: '' 
  });
  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  const [sentRecord, setSentRecord] = useState<ContactRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const topics = [
    'Enterprise AI & Multi-Agents',
    'Tech Academy (40h Cohort)',
    'DevSecOps & Cloud Mesh',
    'Disaster Resilience & Sensor AI',
    'Data Science & Analytics',
    'Research & Institutional Advisory'
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
    if (!form.name.trim() || !form.email.trim() || !form.query.trim()) return;

    const emailCheck = EmailVerificationService.validateEmail(form.email);
    if (!emailCheck.isValid) {
      setEmailWarning(emailCheck.error || 'Please provide a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Secure persistence in background
      const record = await DatabaseService.saveContact({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        organization: form.organization.trim() || 'Independent / Research',
        topic,
        query: form.query.trim(),
        connectionMethod: 'rest_tls13'
      });

      setSentRecord(record);
      setForm({ name: '', email: '', organization: '', phone: '', query: '' });
      setEmailWarning(null);
    } catch (err) {
      console.error('Contact submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
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
                  COMMUNICATIONS & ADVISORY
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Admissions & Inquiries Open
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-tight">
                Connect with our architects & admissions.
              </h2>
              <p className="text-cohere-subtle text-sm sm:text-base leading-relaxed mt-3">
                Whether you require enterprise sovereign AI deployment, specialized corporate upskilling, or disaster risk early warning integrations, our team in Kathmandu is ready to assist.
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-white border border-black/[0.08] p-4 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-cohere-stone flex items-center justify-center text-cohere-ink flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">ENTERPRISE INQUIRIES</div>
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
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">ACADEMY & COMMUNITY ADMISSIONS</div>
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
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">HEADQUARTERS</div>
                  <div className="text-sm font-semibold text-cohere-ink">
                    Sanepa Heights, Lalitpur • Kathmandu Valley, Nepal
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-black/[0.08] p-4 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-cohere-stone flex items-center justify-center text-cohere-slate flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">OFFICE HOURS & RESPONSE SLA</div>
                  <div className="text-sm font-semibold text-cohere-ink">
                    Sun – Fri, 9:00 AM – 6:00 PM NPT • 24h Response SLA
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Assurance Notice */}
            <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-start gap-3">
              <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-cohere-subtle leading-relaxed">
                <span className="font-semibold text-cohere-ink block mb-0.5">Strict Confidentiality & NDA Alignment</span>
                All technical scopes, architecture discussions, and student data are protected under strict professional confidentiality.
              </div>
            </div>
          </div>

          {/* Right Column: Production Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-black/[0.08] rounded-2xl p-6 sm:p-10 shadow-sm">
            {sentRecord ? (
              <div className="text-center py-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cohere-ink">Inquiry Successfully Received</h3>
                  <p className="text-xs sm:text-sm text-cohere-subtle max-w-md mx-auto mt-1.5 leading-relaxed">
                    Thank you, <span className="font-semibold text-cohere-ink">{sentRecord.name}</span>. A senior systems architect from our Kathmandu office has received your inquiry and will respond to <span className="font-mono text-cohere-ink">{sentRecord.email}</span> within 24 business hours.
                  </p>
                </div>

                {/* Reference Receipt Card */}
                <div className="p-4 rounded-xl bg-cohere-stone border border-black/[0.08] max-w-md mx-auto text-xs text-left space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-cohere-slate pb-1 border-b border-black/[0.06]">
                    <span>INQUIRY REFERENCE ID</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check size={11} /> LOGGED
                    </span>
                  </div>
                  <div className="text-cohere-ink font-bold text-sm font-mono">{sentRecord.transmissionId}</div>
                  <div className="text-[11px] text-cohere-slate">Topic: <span className="text-cohere-ink font-semibold">{sentRecord.topic}</span></div>
                  <div className="text-[11px] text-cohere-slate">Organization: <span className="text-cohere-ink">{sentRecord.organization}</span></div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSentRecord(null)}
                    className="rounded-full px-6 py-2.5 bg-cohere-ink hover:bg-black text-white text-xs font-semibold transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-mono text-cohere-slate uppercase block mb-2">
                    Select Inquiry Scope *
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
                            : 'bg-cohere-stone text-cohere-slate border-black/[0.06] hover:text-cohere-ink hover:border-black/[0.12]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-cohere-slate uppercase block mb-1">
                      Full Legal / Professional Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Aayush Sharma" 
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-cohere-slate uppercase block mb-1">
                      Business / Academic Email *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={form.email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="e.g. aayush@organization.com" 
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border text-xs text-cohere-ink focus:outline-none ${
                        emailWarning ? 'border-amber-400' : 'border-black/[0.08] focus:border-cohere-ink'
                      }`}
                    />
                    {emailWarning && (
                      <div className="text-[10px] text-amber-700 mt-1 font-mono">
                        {emailWarning}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-cohere-slate uppercase block mb-1">
                      Organization / University
                    </label>
                    <input 
                      type="text" 
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="e.g. Himalayan Bank Ltd / IOE Pulchowk" 
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-cohere-slate uppercase block mb-1">
                      Contact Phone / WhatsApp (Optional)
                    </label>
                    <input 
                      type="tel" 
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+977 98XXXXXXXX" 
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-cohere-slate uppercase block mb-1">
                    Project Scope / Requirement Details *
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={form.query}
                    onChange={(e) => setForm({ ...form, query: e.target.value })}
                    placeholder="Describe your enterprise requirements, data scale, timeline, or cohort registration inquiries..." 
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink leading-relaxed"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || !form.name || !form.email || !form.query}
                  className="w-full rounded-full py-3.5 bg-cohere-ink hover:bg-black text-white font-bold text-xs shadow-md shadow-black/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <ArrowRight size={14} />
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
