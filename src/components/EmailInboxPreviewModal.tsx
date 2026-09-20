import React from 'react';
import { DispatchedEmailPreview } from '../services/emailVerification';
import { Mail, Clock, ShieldCheck, Copy, Check, X, ArrowRight } from 'lucide-react';

interface EmailInboxPreviewModalProps {
  email: DispatchedEmailPreview | null;
  isOpen: boolean;
  onClose: () => void;
  onUseCode: (code: string) => void;
}

export default function EmailInboxPreviewModal({
  email,
  isOpen,
  onClose,
  onUseCode
}: EmailInboxPreviewModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !email) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(email.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white border border-black/[0.12] rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Email Client Header Bar */}
        <div className="px-5 py-3.5 bg-cohere-stone border-b border-black/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cohere-ink text-white flex items-center justify-center">
              <Mail size={14} />
            </div>
            <span className="text-xs font-mono font-bold text-cohere-ink">
              Simulated Inbox • MounTech Secure Mail Relay
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-cohere-slate hover:text-cohere-ink hover:bg-black/[0.05]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Email Meta */}
        <div className="p-5 border-b border-black/[0.06] bg-cohere-stone/30 space-y-2 text-xs">
          <div className="flex justify-between items-start">
            <span className="font-bold text-cohere-ink text-sm sm:text-base leading-snug">
              {email.subject}
            </span>
            <span className="font-mono text-[10px] text-cohere-slate whitespace-nowrap ml-2">
              Just now
            </span>
          </div>

          <div className="font-mono text-[11px] text-cohere-slate space-y-0.5">
            <div>From: <strong className="text-cohere-ink">{email.sender}</strong></div>
            <div>To: <strong className="text-cohere-ink">{email.recipientEmail}</strong></div>
          </div>
        </div>

        {/* Email Body */}
        <div className="p-6 space-y-5 text-xs text-cohere-ink leading-relaxed">
          <p>
            Hello <strong>{email.recipientName}</strong>,
          </p>
          <p className="text-cohere-subtle">
            You initiated an application for the <strong>{email.courseTitle}</strong> cohort at MounTech Academy. To verify your email authenticity and reserve your seat allocation, please utilize the single-use 6-digit confirmation code below:
          </p>

          {/* Big Verification Code Box */}
          <div className="p-5 rounded-2xl bg-cohere-stone border-2 border-dashed border-cohere-ink/30 text-center space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-cohere-slate">
              AUTHENTICATION SECURITY CODE
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-black tracking-[0.25em] text-cohere-ink">
              {email.code}
            </div>
            <div className="text-[10px] font-mono text-cohere-slate flex items-center justify-center gap-1">
              <Clock size={11} />
              <span>Valid for {email.expiresInMinutes} minutes • Single-use cryptographic token</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <button
              onClick={() => {
                onUseCode(email.code);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-full bg-cohere-ink hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Auto-Fill Code & Verify</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-full bg-cohere-stone hover:bg-[#e4e2dc] text-cohere-ink font-semibold text-xs border border-black/[0.08] flex items-center justify-center gap-1.5 transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'Code Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <p className="text-[10px] text-cohere-slate pt-2 border-t border-black/[0.06]">
            Security Notice: MounTech Solutions will never solicit passwords or two-factor tokens via unverified telephone calls. If you did not initiate this request, discard this message.
          </p>
        </div>
      </div>
    </div>
  );
}
