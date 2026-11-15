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
    <section id="contact" className="py-20 sm:py-28 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Collaboration CTA Banner */}
        <div className="rounded-2xl bg-[#101828] text-white p-8 sm:p-12 border border-[#1E293B] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="text-xs font-mono text-[#22D3EE]">Collaborate with MounTech Solution</div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Partner with us on applied AI, data systems, or technical education.
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              We collaborate with Nepalese enterprises, universities, research groups, and engineering teams looking to adopt reliable AI systems and build local technical capacity.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="mailto:info@mountech.com.np"
              className="px-6 py-3 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors whitespace-nowrap"
            >
              Email info@mountech.com.np
            </a>
            <a
              href="mailto:aimldsn@gmail.com"
              className="px-6 py-3 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors whitespace-nowrap"
            >
              Academy &amp; Community Desk
            </a>
          </div>
        </div>

        {/* Contact Console Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-2">
                <span className="font-semibold text-[#2563EB]">Direct Inquiries</span>
                <span aria-hidden="true">·</span>
                <span>Admissions &amp; Advisory Open</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">
                Connect with our architects &amp; admissions desk.
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed mt-3">
                Reach out for enterprise architecture audits, corporate workforce upskilling, Mountech Academy cohorts, or applied research partnerships.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#64748B]">Enterprise Inquiries</div>
                  <a
                    href="mailto:info@mountech.com.np"
                    className="text-sm font-semibold text-[#172033] hover:text-[#2563EB] font-mono transition-colors"
                  >
                    info@mountech.com.np
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#64748B]">Academy &amp; Community Admissions</div>
                  <a
                    href="mailto:aimldsn@gmail.com"
                    className="text-sm font-semibold text-[#172033] hover:text-[#2563EB] font-mono transition-colors"
                  >
                    aimldsn@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#0891B2] shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#64748B]">Headquarters</div>
                  <div className="text-sm font-semibold text-[#172033]">
                    Sanepa Heights, Lalitpur · Kathmandu Valley, Nepal
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#64748B] shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#64748B]">Office Hours &amp; Response</div>
                  <div className="text-sm font-semibold text-[#172033]">
                    Sun – Fri, 9:00 AM – 6:00 PM NPT · 24h Response SLA
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#EFF6FF]/60 border border-[#BFDBFE] flex items-start gap-3">
              <ShieldCheck size={18} className="text-[#2563EB] shrink-0 mt-0.5" />
              <div className="text-xs text-[#334155] leading-relaxed">
                <span className="font-semibold text-[#172033] block mb-0.5">
                  Strict Confidentiality
                </span>
                All technical scopes, architecture reviews, and applicant records are handled under strict professional confidentiality.
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-10">
            {sentRecord ? (
              <div className="text-center py-8 space-y-5">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={30} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-[#172033]">Inquiry Successfully Received</h4>
                  <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto mt-1.5 leading-relaxed">
                    Thank you, <span className="font-semibold text-[#172033]">{sentRecord.name}</span>. Our team in Kathmandu has logged your inquiry and will follow up at <span className="font-mono text-[#172033]">{sentRecord.email}</span> within 24 business hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] max-w-md mx-auto text-xs text-left space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-mono text-[#64748B] pb-1 border-b border-[#E2E8F0]">
                    <span>Inquiry Reference</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check size={11} /> Logged
                    </span>
                  </div>
                  <div className="text-[#172033] font-bold text-sm font-mono">{sentRecord.transmissionId}</div>
                  <div className="text-xs text-[#64748B]">
                    Topic: <span className="text-[#172033] font-semibold">{sentRecord.topic}</span>
                  </div>
                  <div className="text-xs text-[#64748B]">
                    Organization: <span className="text-[#172033]">{sentRecord.organization}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSentRecord(null)}
                    className="rounded-lg px-6 py-2.5 bg-[#101828] hover:bg-[#1E293B] text-white text-xs font-semibold transition-colors"
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
                            ? 'bg-[#2563EB] text-white font-semibold border-[#2563EB]'
                            : 'bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#172033]'
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs text-[#172033] focus:outline-none focus:border-[#2563EB]"
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
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-xs text-[#172033] focus:outline-none ${
                        emailWarning ? 'border-amber-500' : 'border-[#E2E8F0] focus:border-[#2563EB]'
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs text-[#172033] focus:outline-none focus:border-[#2563EB]"
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs text-[#172033] focus:outline-none focus:border-[#2563EB]"
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
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E2E8F0] text-xs text-[#172033] focus:outline-none focus:border-[#2563EB] leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !form.name || !form.email || !form.query}
                  className="w-full rounded-lg py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs shadow-subtle flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
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
