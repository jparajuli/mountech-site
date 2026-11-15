import React, { useState } from 'react';
import {
  Mail, ShieldCheck, MapPin, CheckCircle2, Clock, ArrowRight, Check
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
    query: '',
  });
  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  const [sentRecord, setSentRecord] = useState<ContactRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const topics = [
    'Enterprise AI & Multi-Agents',
    'Mountech Academy (40h Cohort)',
    'DevSecOps & Cloud Modernization',
    'Disaster Resilience & Sensor AI',
    'Data Science & Analytics',
    'University & Research Collaboration',
  ];

  const handleEmailChange = (val: string) => {
    setForm((prev) => ({ ...prev, email: val }));
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
      const record = await DatabaseService.saveContact({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        organization: form.organization.trim() || 'Independent / Research',
        topic,
        query: form.query.trim(),
        connectionMethod: 'rest_tls13',
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
    <section id="contact" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#5A6D7E] mb-2">
                <span className="font-semibold text-[#0284C7]">Let&apos;s Collaborate</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#15803D]">Admissions &amp; Advisory Open</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F1E2E] tracking-tight">
                Connect with our architects &amp; admissions desk.
              </h2>
              <p className="text-[#5A6D7E] text-sm leading-relaxed mt-3">
                Partner with <strong className="font-bold text-[#0F1E2E]">MounTech Solution</strong> on applied AI engineering, enterprise data architectures, corporate upskilling, or{' '}
                <strong className="font-bold text-[#0F1E2E]">Mountech Academy cohorts</strong>.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-subtle">
                <div className="w-10 h-10 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#5A6D7E]">Enterprise Inquiries</div>
                  <a
                    href="mailto:info@mountech.com.np"
                    className="text-sm font-semibold text-[#0F1E2E] hover:text-[#0284C7] font-mono transition-colors"
                  >
                    info@mountech.com.np
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-subtle">
                <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#15803D] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#5A6D7E]">Academy &amp; Community Admissions</div>
                  <a
                    href="mailto:aimldsn@gmail.com"
                    className="text-sm font-semibold text-[#0F1E2E] hover:text-[#15803D] font-mono transition-colors"
                  >
                    aimldsn@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-subtle">
                <div className="w-10 h-10 rounded-lg bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#5A6D7E]">Headquarters</div>
                  <div className="text-sm font-semibold text-[#0F1E2E]">
                    Sanepa Heights, Lalitpur · Kathmandu Valley, Nepal
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] p-4 rounded-xl shadow-subtle">
                <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#5A6D7E] shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#5A6D7E]">Office Hours &amp; Response</div>
                  <div className="text-sm font-semibold text-[#0F1E2E]">
                    Sun – Fri, 9:00 AM – 6:00 PM NPT · <strong className="font-bold text-[#15803D]">24h Response SLA</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-start gap-3">
              <ShieldCheck size={18} className="text-[#15803D] shrink-0 mt-0.5" />
              <div className="text-xs text-[#334155] leading-relaxed">
                <span className="font-semibold text-[#0F1E2E] block mb-0.5">
                  Strict Confidentiality
                </span>
                All technical scopes, architecture discussions, and student records are handled under strict professional confidentiality.
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-subtle">
            {sentRecord ? (
              <div className="text-center py-8 space-y-5">
                <div className="w-14 h-14 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={30} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0F1E2E]">Inquiry Successfully Received</h3>
                  <p className="text-xs sm:text-sm text-[#5A6D7E] max-w-md mx-auto mt-1.5 leading-relaxed">
                    Thank you, <span className="font-semibold text-[#0F1E2E]">{sentRecord.name}</span>. Our team in Kathmandu has logged your inquiry and will respond to <span className="font-mono text-[#0F1E2E]">{sentRecord.email}</span> within 24 business hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] max-w-md mx-auto text-xs text-left space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-mono text-[#5A6D7E] pb-1 border-b border-[#E2E8F0]">
                    <span>Inquiry Reference</span>
                    <span className="text-[#15803D] font-bold flex items-center gap-1">
                      <Check size={11} /> Logged
                    </span>
                  </div>
                  <div className="text-[#0F1E2E] font-bold text-sm font-mono">{sentRecord.transmissionId}</div>
                  <div className="text-xs text-[#5A6D7E]">
                    Topic: <span className="text-[#0F1E2E] font-semibold">{sentRecord.topic}</span>
                  </div>
                  <div className="text-xs text-[#5A6D7E]">
                    Organization: <span className="text-[#0F1E2E]">{sentRecord.organization}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSentRecord(null)}
                    className="rounded-lg px-6 py-2.5 bg-[#0B1924] hover:bg-[#122636] text-white text-xs font-semibold transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-mono text-[#334155] block mb-2 font-semibold">
                    Select Inquiry Scope *
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap ${
                          topic === t
                            ? 'bg-[#0284C7] text-white font-semibold border-[#0284C7]'
                            : 'bg-[#F8FAFC] text-[#5A6D7E] border-[#E2E8F0] hover:text-[#0F1E2E]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#334155] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Aayush Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F1E2E] focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#334155] block mb-1">
                      Business / Academic Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="e.g. aayush@organization.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border text-xs text-[#0F1E2E] focus:outline-none ${
                        emailWarning ? 'border-amber-500' : 'border-[#E2E8F0] focus:border-[#0284C7]'
                      }`}
                    />
                    {emailWarning && (
                      <div className="text-[11px] text-amber-700 mt-1">{emailWarning}</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#334155] block mb-1">
                      Organization / University
                    </label>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="e.g. University / Enterprise Name"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F1E2E] focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#334155] block mb-1">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F1E2E] focus:outline-none focus:border-[#0284C7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#334155] block mb-1">
                    Project Scope / Requirement Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.query}
                    onChange={(e) => setForm({ ...form, query: e.target.value })}
                    placeholder="Describe your enterprise requirements, research collaboration, or cohort inquiries..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F1E2E] focus:outline-none focus:border-[#0284C7] leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !form.name || !form.email || !form.query}
                  className="w-full rounded-lg py-3 bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs shadow-subtle flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
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
