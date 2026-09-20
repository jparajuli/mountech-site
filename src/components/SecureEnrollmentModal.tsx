import React, { useState, useEffect, useRef } from 'react';
import { Course } from '../data/courses';
import { 
  EmailVerificationService, 
  EmailValidationResult, 
  DispatchedEmailPreview 
} from '../services/emailVerification';
import { 
  PaymentVerificationService, 
  GATEWAY_METADATA, 
  VerificationProgressStep 
} from '../services/paymentVerification';
import { DatabaseService } from '../services/database';
import { 
  EmailVerificationState, 
  PaymentGatewayType, 
  PaymentVerificationResult, 
  EnrollmentRecord 
} from '../types';
import EmailInboxPreviewModal from './EmailInboxPreviewModal';
import { 
  X, CheckCircle2, ShieldCheck, ArrowRight, Lock, 
  Mail, RefreshCw, AlertCircle, Sparkles, ExternalLink,
  CreditCard, Copy, Check, Clock, Download, Printer, Database
} from 'lucide-react';

interface SecureEnrollmentModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenLedger?: () => void;
}

type ModalStep = 'info' | 'email_verify' | 'payment_select' | 'payment_verifying' | 'success';

export default function SecureEnrollmentModal({
  course,
  isOpen,
  onClose,
  onOpenLedger
}: SecureEnrollmentModalProps) {
  // Navigation / Step state
  const [step, setStep] = useState<ModalStep>('info');

  // Form Fields
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'Intermediate (1-3 years)'
  });

  // Email Validation state
  const [emailValidation, setEmailValidation] = useState<EmailValidationResult>({ isValid: false });
  const [emailTouched, setEmailTouched] = useState(false);

  // Email Verification Code state
  const [emailVerifyState, setEmailVerifyState] = useState<EmailVerificationState | null>(null);
  const [emailPreview, setEmailPreview] = useState<DispatchedEmailPreview | null>(null);
  const [enteredCode, setEnteredCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isDispatchingEmail, setIsDispatchingEmail] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600);
  const [isInboxModalOpen, setIsInboxModalOpen] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Payment state
  const [gateway, setGateway] = useState<PaymentGatewayType>('esewa');
  const [transactionRef, setTransactionRef] = useState('');
  const [refError, setRefError] = useState('');
  const [verificationSteps, setVerificationSteps] = useState<VerificationProgressStep[]>([]);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState<PaymentVerificationResult | null>(null);
  const [savedEnrollment, setSavedEnrollment] = useState<EnrollmentRecord | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  // Countdown timer for email code expiry
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (step === 'email_verify' && emailVerifyState && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, emailVerifyState, secondsRemaining]);

  // Resend cooldown timer
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Validate email whenever email changes
  useEffect(() => {
    if (form.email) {
      const res = EmailVerificationService.validate(form.email);
      setEmailValidation(res);
    } else {
      setEmailValidation({ isValid: false });
    }
  }, [form.email]);

  if (!isOpen || !course) return null;

  // Step 1: Handle Candidate Info -> Trigger Email Dispatch
  const handleProceedToEmailVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);

    const validation = EmailVerificationService.validate(form.email);
    if (!validation.isValid) {
      setEmailValidation(validation);
      return;
    }

    if (!form.name.trim()) return;

    setIsDispatchingEmail(true);
    try {
      const { state, emailPreview: preview } = await EmailVerificationService.dispatchConfirmation(
        form.email,
        form.name,
        course.title
      );
      setEmailVerifyState(state);
      setEmailPreview(preview);
      setSecondsRemaining(600);
      setResendCooldown(30);
      setEnteredCode('');
      setCodeError('');
      setStep('email_verify');
      // Automatically pop open the email simulation modal so user sees the code
      setIsInboxModalOpen(true);
    } catch (err) {
      console.error('Email dispatch error:', err);
    } finally {
      setIsDispatchingEmail(false);
    }
  };

  // Resend Email Code
  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    setIsDispatchingEmail(true);
    try {
      const { state, emailPreview: preview } = await EmailVerificationService.dispatchConfirmation(
        form.email,
        form.name,
        course.title
      );
      setEmailVerifyState(state);
      setEmailPreview(preview);
      setSecondsRemaining(600);
      setResendCooldown(45);
      setCodeError('');
      setIsInboxModalOpen(true);
    } catch (err) {
      console.error('Resend error:', err);
    } finally {
      setIsDispatchingEmail(false);
    }
  };

  // Step 2: Verify Entered Email Code
  const handleVerifyEmailCode = async (codeToVerify?: string) => {
    const code = codeToVerify || enteredCode;
    if (!emailVerifyState) return;

    if (!code || code.trim().length !== 6) {
      setCodeError('Please enter the full 6-digit confirmation code.');
      return;
    }

    setIsVerifyingCode(true);
    setCodeError('');

    try {
      const result = await EmailVerificationService.verifyCode(code, emailVerifyState);
      if (result.success) {
        setEmailVerifyState(result.state);
        // Advance to payment step!
        setStep('payment_select');
      } else {
        setCodeError(result.error || 'Invalid code.');
        setEmailVerifyState(result.state);
      }
    } catch (err) {
      setCodeError('Verification failed. Please retry.');
    } finally {
      setIsVerifyingCode(false);
    }
  };

  // Step 3 -> 4: Payment Verification Handshake
  const handleStartPaymentVerification = async () => {
    const val = PaymentVerificationService.validateReference(gateway, transactionRef);
    if (!val.isValid) {
      setRefError(val.error || 'Invalid payment reference.');
      return;
    }
    setRefError('');

    setStep('payment_verifying');
    setIsVerifyingPayment(true);

    try {
      const result = await PaymentVerificationService.verifyPayment(
        {
          courseId: course.id,
          courseTitle: course.title,
          amount: course.costLocal,
          studentName: form.name,
          studentEmail: form.email,
          studentPhone: form.phone,
          gateway,
          transactionReference: transactionRef
        },
        (steps) => {
          setVerificationSteps(steps);
        }
      );

      setPaymentResult(result);

      if (result.verified) {
        // Commit verified student record to sovereign database!
        const record = await DatabaseService.saveEnrollment({
          receiptId: result.receiptId,
          courseId: course.id,
          courseTitle: course.title,
          studentName: form.name,
          studentEmail: form.email,
          studentPhone: form.phone,
          experienceLevel: form.experience,
          paymentMethod: gateway,
          transactionId: result.gatewayTxId,
          tuitionPaid: course.costLocal,
          verificationHash: result.verificationHash,
          emailVerified: true,
          paymentStatus: 'VERIFIED'
        });

        setSavedEnrollment(record);
        setStep('success');
      } else {
        setRefError(result.message || 'Payment clearance rejected by gateway.');
      }
    } catch (err) {
      setRefError('Network or clearing error. Please check your reference and retry.');
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  const handleQuickFillTestRef = () => {
    const meta = GATEWAY_METADATA[gateway];
    const testId = `${meta.sampleTestId}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTransactionRef(testId);
    setRefError('');
  };

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
        <div 
          className="bg-white rounded-3xl border border-black/[0.12] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-cohere-slate hover:text-cohere-ink hover:bg-black/5 transition-all"
          >
            <X size={18} />
          </button>

          {/* Stepper Progress Indicator */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold text-cohere-coral tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={13} />
                <span>SOVEREIGN ACADEMY ADMISSION</span>
              </span>
              <span className="text-[11px] font-mono text-cohere-slate">
                {step === 'info' && 'Step 1 of 3: Applicant Identity'}
                {step === 'email_verify' && 'Step 2 of 3: Email Authentication'}
                {step === 'payment_select' && 'Step 3 of 3: Gateway Verification'}
                {step === 'payment_verifying' && 'Clearing Payment Settlement...'}
                {step === 'success' && 'Enrolled & Verified'}
              </span>
            </div>

            <div className="h-1.5 w-full bg-cohere-stone rounded-full overflow-hidden flex">
              <div 
                className={`h-full bg-cohere-ink transition-all duration-300 ${
                  step === 'info' ? 'w-1/4' :
                  step === 'email_verify' ? 'w-2/4' :
                  step === 'payment_select' ? 'w-3/4' :
                  'w-full bg-emerald-600'
                }`}
              />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-cohere-ink">
                {step === 'success' ? 'Admission Confirmed' : `Enroll: ${course.title}`}
              </h3>
              <div className="text-xs font-mono text-cohere-slate flex items-center gap-2 mt-0.5">
                <span>Tuition: <strong className="text-cohere-ink">{course.costLocal}</strong></span>
                <span>•</span>
                <span>40 Hours Hands-on Labs</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">Seat Reservation</span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              STEP 1: APPLICANT IDENTITY & STRICT EMAIL VALIDATION
             ══════════════════════════════════════════════════════════════════ */}
          {step === 'info' && (
            <form onSubmit={handleProceedToEmailVerification} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-mono text-cohere-slate mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                  placeholder="e.g. Suman Thapa"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-mono text-cohere-slate">
                    Email Address (Requires Confirmation) *
                  </label>
                  {emailTouched && emailValidation.isValid && (
                    <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                      <CheckCircle2 size={11} />
                      Valid Email Format
                    </span>
                  )}
                </div>

                <input
                  type="email"
                  required
                  value={form.email}
                  onBlur={() => setEmailTouched(true)}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (!emailTouched) setEmailTouched(true);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border text-xs text-cohere-ink focus:outline-none transition-colors ${
                    emailTouched && !emailValidation.isValid && form.email
                      ? 'border-rose-400 bg-rose-50/30'
                      : emailTouched && emailValidation.isValid
                      ? 'border-emerald-400'
                      : 'border-black/[0.08] focus:border-cohere-ink'
                  }`}
                  placeholder="suman@company.com.np"
                />

                {/* Inline Email Validation Feedback */}
                {emailTouched && !emailValidation.isValid && emailValidation.error && (
                  <div className="mt-1.5 p-2 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-800 flex items-start gap-1.5">
                    <AlertCircle size={13} className="flex-shrink-0 mt-0.5 text-rose-600" />
                    <div>
                      <span>{emailValidation.error}</span>
                      {emailValidation.suggestion && (
                        <button
                          type="button"
                          onClick={() => {
                            setForm({ ...form, email: emailValidation.suggestion! });
                          }}
                          className="ml-2 underline font-bold hover:text-black"
                        >
                          Use {emailValidation.suggestion}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-cohere-slate mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-cohere-slate mb-1">
                    Engineering Experience
                  </label>
                  <select
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                  >
                    <option>Beginner (0-1 years)</option>
                    <option>Intermediate (1-3 years)</option>
                    <option>Senior Engineer (3-5+ years)</option>
                    <option>Staff / Principal Architect</option>
                  </select>
                </div>
              </div>

              {/* Security Assurance Notice */}
              <div className="p-3.5 rounded-xl bg-cohere-stone/60 border border-black/[0.06] flex items-start gap-2.5 text-xs text-cohere-subtle">
                <Lock size={15} className="text-cohere-teal flex-shrink-0 mt-0.5" />
                <span>
                  A one-time 6-digit confirmation code will be dispatched to your email address to ensure authentication before payment settlement.
                </span>
              </div>

              <button
                type="submit"
                disabled={isDispatchingEmail || (emailTouched && !emailValidation.isValid)}
                className="w-full rounded-full py-3.5 text-xs font-bold bg-cohere-ink hover:bg-black text-white shadow-md shadow-black/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isDispatchingEmail ? (
                  <span>Dispatching Confirmation Email...</span>
                ) : (
                  <>
                    <span>Proceed to Email Verification</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STEP 2: CONFIRMATION EMAIL VERIFICATION (OTP)
             ══════════════════════════════════════════════════════════════════ */}
          {step === 'email_verify' && (
            <div className="space-y-5 pt-1">
              <div className="p-4 rounded-2xl bg-cohere-stone border border-black/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-cohere-slate">
                    CONFIRMATION EMAIL DISPATCHED
                  </span>
                  <span className="font-mono text-[11px] text-cohere-ink font-semibold flex items-center gap-1">
                    <Clock size={12} />
                    {Math.floor(secondsRemaining / 60)}:{(secondsRemaining % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="text-xs text-cohere-ink font-semibold">
                  We sent a 6-digit verification code to <span className="font-mono underline">{form.email}</span>.
                </div>
                <p className="text-[11px] text-cohere-subtle">
                  Check your inbox to retrieve the single-use authorization code. You can also inspect the simulated email message below:
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setIsInboxModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-cohere-ink text-white font-mono text-xs flex items-center gap-1.5 hover:bg-black shadow-sm transition-all"
                  >
                    <Mail size={13} />
                    <span>View Dispatched Email Preview</span>
                    <ExternalLink size={11} />
                  </button>

                  {emailVerifyState && (
                    <button
                      type="button"
                      onClick={() => {
                        setEnteredCode(emailVerifyState.code);
                        handleVerifyEmailCode(emailVerifyState.code);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white border border-black/[0.1] text-cohere-ink hover:bg-cohere-stone text-xs font-mono font-semibold transition-all"
                    >
                      Quick Auto-Fill ({emailVerifyState.code})
                    </button>
                  )}
                </div>
              </div>

              {/* Code Input Box */}
              <div>
                <label className="block text-xs font-mono text-cohere-slate mb-1.5 uppercase">
                  Enter 6-Digit Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    value={enteredCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setEnteredCode(val);
                      if (codeError) setCodeError('');
                      if (val.length === 6) {
                        handleVerifyEmailCode(val);
                      }
                    }}
                    className="w-full text-center tracking-[0.5em] font-mono text-2xl py-3 rounded-xl bg-cohere-stone border border-black/[0.12] text-cohere-ink focus:outline-none focus:border-cohere-ink"
                    placeholder="______"
                  />
                </div>

                {codeError && (
                  <div className="mt-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-rose-600 flex-shrink-0" />
                    <span>{codeError}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-cohere-slate">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="hover:text-cohere-ink underline font-mono text-[11px]"
                >
                  ← Edit Email Address
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0 || isDispatchingEmail}
                  className="hover:text-cohere-ink font-mono text-[11px] disabled:opacity-50 flex items-center gap-1"
                >
                  <RefreshCw size={12} className={isDispatchingEmail ? 'animate-spin' : ''} />
                  <span>
                    {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend Code'}
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleVerifyEmailCode()}
                disabled={isVerifyingCode || enteredCode.length !== 6}
                className="w-full rounded-full py-3.5 text-xs font-bold bg-cohere-ink hover:bg-black text-white shadow-md shadow-black/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isVerifyingCode ? (
                  <span>Authenticating Code...</span>
                ) : (
                  <>
                    <ShieldCheck size={15} />
                    <span>Verify Email & Unlock Payment</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STEP 3: GATEWAY SELECTION & PAYMENT DETAILS
             ══════════════════════════════════════════════════════════════════ */}
          {step === 'payment_select' && (
            <div className="space-y-5 pt-1">
              {/* Email Verified Banner */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-700" />
                  <span>
                    Verified: <strong>{form.email}</strong>
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-800">
                  TOKEN ACTIVE
                </span>
              </div>

              {/* Gateway Choices */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-cohere-slate uppercase">
                  Select Settlement Gateway
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['esewa', 'khalti', 'connectips', 'card'] as PaymentGatewayType[]).map((gt) => {
                    const meta = GATEWAY_METADATA[gt];
                    const isSelected = gateway === gt;
                    return (
                      <div
                        key={gt}
                        onClick={() => {
                          setGateway(gt);
                          setRefError('');
                        }}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-cohere-ink bg-black/[0.04] shadow-sm ring-1 ring-cohere-ink'
                            : 'border-black/[0.08] bg-cohere-stone/60 hover:border-black/[0.2]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-cohere-ink">{meta.name.split(' ')[0]}</span>
                          {isSelected && <CheckCircle2 size={13} className="text-cohere-ink" />}
                        </div>
                        <div className="text-[10px] text-cohere-slate font-mono mt-0.5 truncate">
                          {meta.settlementType}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Gateway Instructions & Credentials */}
              <div className="p-4 rounded-2xl bg-cohere-stone border border-black/[0.08] space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-cohere-slate">MERCHANT CODE:</span>
                  <strong className="text-cohere-ink">{GATEWAY_METADATA[gateway].merchantCode}</strong>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-cohere-slate">PAYMENT PROTOCOL:</span>
                  <span className="text-cohere-ink">{GATEWAY_METADATA[gateway].clearingProtocol}</span>
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] pt-1 border-t border-black/[0.06]">
                  <span className="text-cohere-slate">TUITION DUE:</span>
                  <strong className="text-base text-cohere-ink">{course.costLocal}</strong>
                </div>
              </div>

              {/* Payment Reference Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-mono text-cohere-slate uppercase">
                    Transaction ID / Reference Code *
                  </label>
                  <button
                    type="button"
                    onClick={handleQuickFillTestRef}
                    className="text-[10px] font-mono text-cohere-ink hover:underline font-semibold flex items-center gap-1"
                  >
                    <Sparkles size={11} />
                    <span>Quick Test Fill</span>
                  </button>
                </div>

                <input
                  type="text"
                  required
                  value={transactionRef}
                  onChange={(e) => {
                    setTransactionRef(e.target.value);
                    if (refError) setRefError('');
                  }}
                  placeholder={GATEWAY_METADATA[gateway].placeholderRef}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs font-mono text-cohere-ink focus:outline-none focus:border-cohere-ink"
                />

                <p className="text-[10px] text-cohere-slate mt-1 font-mono">
                  {GATEWAY_METADATA[gateway].helperText}
                </p>

                {refError && (
                  <div className="mt-2 p-2 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-rose-600 flex-shrink-0" />
                    <span>{refError}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleStartPaymentVerification}
                disabled={!transactionRef.trim()}
                className="w-full rounded-full py-3.5 text-xs font-bold bg-cohere-ink hover:bg-black text-white shadow-md shadow-black/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <ShieldCheck size={15} />
                <span>Verify Payment & Secure Admission</span>
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STEP 4: LIVE PAYMENT VERIFICATION PROGRESS
             ══════════════════════════════════════════════════════════════════ */}
          {step === 'payment_verifying' && (
            <div className="py-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-cohere-ink text-white flex items-center justify-center mx-auto shadow-md">
                  <RefreshCw size={22} className="animate-spin" />
                </div>
                <h4 className="font-bold text-lg text-cohere-ink">
                  Verifying Gateway Settlement
                </h4>
                <p className="text-xs text-cohere-subtle max-w-sm mx-auto">
                  Executing automated clearing handshake with {GATEWAY_METADATA[gateway].name} and checking ledger uniqueness.
                </p>
              </div>

              {/* Progress Steps Card */}
              <div className="p-4 rounded-2xl bg-cohere-stone border border-black/[0.08] space-y-3 font-mono text-xs">
                {verificationSteps.map((s, idx) => (
                  <div key={s.id} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {s.status === 'completed' && <CheckCircle2 size={16} className="text-emerald-600" />}
                      {s.status === 'in_progress' && <RefreshCw size={15} className="text-cohere-ink animate-spin" />}
                      {s.status === 'pending' && <div className="w-3.5 h-3.5 rounded-full border border-black/20" />}
                      {s.status === 'failed' && <AlertCircle size={16} className="text-rose-600" />}
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold ${s.status === 'completed' ? 'text-cohere-ink' : s.status === 'in_progress' ? 'text-cohere-ink font-bold' : 'text-cohere-slate'}`}>
                        {s.label}
                      </div>
                      <div className="text-[11px] text-cohere-subtle font-sans mt-0.5">
                        {s.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {refError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertCircle size={15} className="text-rose-600" />
                    <span>Payment Verification Failed</span>
                  </div>
                  <p>{refError}</p>
                  <button
                    onClick={() => {
                      setStep('payment_select');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-rose-300 text-xs font-bold text-rose-900"
                  >
                    Edit Reference & Retry
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              STEP 5: ADMISSION PASS & SOVEREIGN VERIFICATION RECEIPT
             ══════════════════════════════════════════════════════════════════ */}
          {step === 'success' && savedEnrollment && (
            <div className="space-y-6 pt-1">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-cohere-ink">
                  Enrollment Authenticated & Locked
                </h4>
                <p className="text-xs text-cohere-subtle max-w-sm mx-auto">
                  Your seat has been reserved in the 40-hour cohort. A verification block has been cryptographically signed into the sovereign ledger.
                </p>
              </div>

              {/* Official Academy Pass Card */}
              <div className="p-5 rounded-2xl bg-cohere-stone border border-black/[0.1] space-y-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-black/[0.08] pb-3">
                  <div>
                    <div className="text-[10px] font-mono text-cohere-slate uppercase">ADMISSION PASS CODE</div>
                    <div className="font-mono text-lg font-bold text-cohere-ink">
                      {savedEnrollment.receiptId}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                    VERIFIED • SETTLED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-[10px] font-mono text-cohere-slate uppercase">STUDENT PARTICIPANT</div>
                    <div className="font-bold text-cohere-ink">{savedEnrollment.studentName}</div>
                    <div className="text-[11px] font-mono text-cohere-subtle">{savedEnrollment.studentEmail}</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-cohere-slate uppercase">COHORT LAB</div>
                    <div className="font-semibold text-cohere-ink line-clamp-1">{savedEnrollment.courseTitle}</div>
                    <div className="text-[11px] font-mono text-cohere-subtle">Tuition: {savedEnrollment.tuitionPaid}</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-cohere-slate uppercase">GATEWAY CLEARANCE</div>
                    <div className="font-mono font-bold text-cohere-ink">{savedEnrollment.paymentMethod.toUpperCase()}</div>
                    <div className="text-[10px] font-mono text-cohere-slate truncate">TX: {savedEnrollment.transactionId}</div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-cohere-slate uppercase">LEDGER SIGNATURE HASH</div>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-cohere-ink font-semibold">
                      <span className="truncate">{savedEnrollment.verificationHash.substring(0, 16)}...</span>
                      <button
                        onClick={() => handleCopyHash(savedEnrollment.verificationHash)}
                        className="p-0.5 hover:text-cohere-coral"
                        title="Copy full verification hash"
                      >
                        {copiedHash ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-[10px] font-mono text-cohere-slate">
                  <span>RECORD COMMITTED: {new Date(savedEnrollment.enrolledAt).toLocaleDateString()}</span>
                  <span>MOUNTECH SOVEREIGN REGISTRY</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handlePrint}
                    className="flex-1 py-3 px-4 rounded-full bg-white hover:bg-cohere-stone text-cohere-ink font-semibold text-xs border border-black/[0.12] flex items-center justify-center gap-2 transition-all"
                  >
                    <Printer size={14} />
                    <span>Print / Save Pass</span>
                  </button>

                  {onOpenLedger && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenLedger();
                      }}
                      className="flex-1 py-3 px-4 rounded-full bg-cohere-stone hover:bg-[#e4e2dc] text-cohere-ink font-semibold text-xs border border-black/[0.08] flex items-center justify-center gap-2 transition-all"
                    >
                      <Database size={14} />
                      <span>Inspect in Database</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-full bg-cohere-ink hover:bg-black text-white font-bold text-xs shadow-sm transition-all"
                >
                  Done & Close Admission
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Simulated Email Inbox Preview Modal */}
      <EmailInboxPreviewModal
        email={emailPreview}
        isOpen={isInboxModalOpen}
        onClose={() => setIsInboxModalOpen(false)}
        onUseCode={(code) => {
          setEnteredCode(code);
          handleVerifyEmailCode(code);
        }}
      />
    </>
  );
}
