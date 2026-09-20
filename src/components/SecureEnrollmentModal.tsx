import React, { useState, useEffect } from 'react';
import { Course } from '../data/courses';
import { 
  EmailVerificationService, 
  EmailValidationResult 
} from '../services/emailVerification';
import { 
  PaymentVerificationService, 
  GATEWAY_METADATA 
} from '../services/paymentVerification';
import { DatabaseService } from '../services/database';
import { 
  PaymentGatewayType, 
  EnrollmentRecord 
} from '../types';
import { 
  X, CheckCircle2, ShieldCheck, ArrowRight, Lock, 
  RefreshCw, AlertCircle, Printer, Calendar, MessageSquare, 
  Upload, FileText, Check, Copy, ChevronRight, User, CreditCard, Mail
} from 'lucide-react';

interface SecureEnrollmentModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = 'details' | 'payment' | 'verifying' | 'confirmed';

export default function SecureEnrollmentModal({
  course,
  isOpen,
  onClose
}: SecureEnrollmentModalProps) {
  const [step, setStep] = useState<ModalStep>('details');

  // Candidate Details
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'Intermediate (1-3 years)',
    organization: '',
    notes: ''
  });

  // Validation
  const [emailValidation, setEmailValidation] = useState<EmailValidationResult>({ isValid: false });
  const [emailTouched, setEmailTouched] = useState(false);

  // Payment Selection & Reference
  const [gateway, setGateway] = useState<PaymentGatewayType>('esewa');
  const [transactionRef, setTransactionRef] = useState('');
  const [refError, setRefError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [savedEnrollment, setSavedEnrollment] = useState<EnrollmentRecord | null>(null);
  const [copiedPassId, setCopiedPassId] = useState(false);

  // Email Validation on change
  useEffect(() => {
    if (form.email) {
      const res = EmailVerificationService.validate(form.email);
      setEmailValidation(res);
    } else {
      setEmailValidation({ isValid: false });
    }
  }, [form.email]);

  if (!isOpen || !course) return null;

  // Step 1 -> Step 2
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);

    const validation = EmailVerificationService.validate(form.email);
    if (!validation.isValid) {
      setEmailValidation(validation);
      return;
    }

    if (!form.name.trim() || !form.phone.trim()) {
      return;
    }

    setStep('payment');
  };

  // Step 2 -> Step 3 -> Verification & Confirmation
  const handleCompleteEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = PaymentVerificationService.validateReference(gateway, transactionRef);
    if (!val.isValid) {
      setRefError(val.error || 'Please enter a valid transaction reference code from your payment receipt.');
      return;
    }
    setRefError('');

    setStep('verifying');
    setIsVerifying(true);

    try {
      // Execute payment verification clearance
      const result = await PaymentVerificationService.verifyPayment({
        courseId: course.id,
        courseTitle: course.title,
        amount: course.costLocal,
        studentName: form.name.trim(),
        studentEmail: form.email.trim().toLowerCase(),
        studentPhone: form.phone.trim(),
        gateway,
        transactionReference: transactionRef.trim()
      });

      if (result.verified) {
        // Save verified student record into persistent database
        const record = await DatabaseService.saveEnrollment({
          receiptId: result.receiptId,
          courseId: course.id,
          courseTitle: course.title,
          studentName: form.name.trim(),
          studentEmail: form.email.trim().toLowerCase(),
          studentPhone: form.phone.trim(),
          experienceLevel: form.experience,
          paymentMethod: gateway,
          transactionId: result.gatewayTxId,
          tuitionPaid: course.costLocal,
          verificationHash: result.verificationHash,
          emailVerified: true,
          paymentStatus: 'VERIFIED'
        });

        setSavedEnrollment(record);
        setStep('confirmed');
      } else {
        setRefError(result.message || 'Payment reference verification could not be confirmed. Please check the code and retry.');
        setStep('payment');
      }
    } catch (err) {
      setRefError('Network or clearing error. Please re-enter your reference code and retry.');
      setStep('payment');
    } finally {
      setIsVerifying(false);
    }
  };

  // Download real .ics calendar invite
  const handleDownloadCalendar = () => {
    if (!course) return;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 14); // Scheduled cohort start in 2 weeks
    startDate.setHours(18, 30, 0, 0); // 6:30 PM NPT

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MounTech Tech Academy//Cohort Lab Schedule//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:MounTech Academy: ${course.title} (Live 40h Cohort)`,
      `DESCRIPTION:Cohort orientation and live lab sessions for ${course.title}.\\nAdmission Pass: ${savedEnrollment?.receiptId || 'PENDING'}\\nLead Faculty: ${course.instructor}\\nFormat: Live Interactive Lab Sessions (Weekends & Evenings NPT).`,
      `LOCATION:MounTech Kathmandu Lab & Virtual Enclave`,
      `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      'DURATION:PT2H',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MounTech-${course.id}-Schedule.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyPassId = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPassId(true);
    setTimeout(() => setCopiedPassId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Official admissions concierge link (direct email to admissions coordinator)
  const admissionsEmailUrl = `mailto:aimldsn@gmail.com?subject=${encodeURIComponent(
    `Admission Confirmation: ${savedEnrollment?.receiptId || ''} - ${course.title}`
  )}&body=${encodeURIComponent(
    `Hello MounTech Admissions Coordinator,\n\nI have registered for ${course.title}.\nAdmission Pass ID: ${savedEnrollment?.receiptId || ''}\nStudent Name: ${savedEnrollment?.studentName || ''}\nPayment Gateway: ${savedEnrollment?.paymentMethod || ''}\nTransaction Reference: ${savedEnrollment?.transactionId || ''}\n\nPlease confirm my onboarding schedule.\n\nThank you,\n${savedEnrollment?.studentName || ''}`
  )}`;

  return (
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

        {/* Stepper Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase font-bold text-cohere-coral tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={14} />
              <span>MOUNTECH TECH ACADEMY ADMISSION</span>
            </span>
            <span className="font-mono text-xs text-cohere-slate">
              {step === 'details' && 'Step 1 of 3: Registration'}
              {step === 'payment' && 'Step 2 of 3: Payment'}
              {step === 'verifying' && 'Processing Clearance'}
              {step === 'confirmed' && 'Admission Confirmed'}
            </span>
          </div>

          <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cohere-ink transition-all duration-300"
              style={{
                width: 
                  step === 'details' ? '33%' :
                  step === 'payment' ? '66%' :
                  step === 'verifying' ? '85%' : '100%'
              }}
            />
          </div>
        </div>

        {/* Course Summary Banner */}
        <div className="p-4 rounded-2xl bg-cohere-stone border border-black/[0.06] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-cohere-slate">
              ACADEMY MASTERCLASS • 40-HOUR COHORT
            </span>
            <h3 className="font-bold text-sm text-cohere-ink">{course.title}</h3>
            <p className="text-[11px] text-cohere-subtle">
              Lead Faculty: {course.instructor} • Next Cohort: November 2026
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-display font-extrabold text-base text-cohere-ink">
              {course.costLocal}
            </div>
            <div className="text-[10px] font-mono text-cohere-slate">
              {course.costGlobal}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            STEP 1: CANDIDATE REGISTRATION DETAILS
           ══════════════════════════════════════════════════════════════════ */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="space-y-4 pt-1">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-cohere-slate mb-1 uppercase">
                  Full Legal / Certificate Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Suman Adhikari"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-cohere-slate mb-1 uppercase">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="e.g. suman@tech.com.np"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border text-xs text-cohere-ink focus:outline-none ${
                      emailTouched && !emailValidation.isValid
                        ? 'border-amber-400'
                        : 'border-black/[0.08] focus:border-cohere-ink'
                    }`}
                  />
                  {emailTouched && emailValidation.suggestion && (
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, email: `${form.email.split('@')[0]}@${emailValidation.suggestion}` })}
                      className="text-[10px] font-mono text-cohere-coral hover:underline mt-1 block"
                    >
                      Did you mean @{emailValidation.suggestion}? Click to correct.
                    </button>
                  )}
                  {emailTouched && emailValidation.error && !emailValidation.suggestion && (
                    <div className="text-[10px] text-amber-700 mt-1 font-mono">
                      {emailValidation.error}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-cohere-slate mb-1 uppercase">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-cohere-slate mb-1 uppercase">
                    Technical Experience
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

                <div>
                  <label className="block text-xs font-mono text-cohere-slate mb-1 uppercase">
                    Organization / College (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder="e.g. IOE Pulchowk / Ncell"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                  />
                </div>
              </div>
            </div>

            {/* Privacy & Cohort Notice */}
            <div className="p-3.5 rounded-xl bg-cohere-stone/70 border border-black/[0.06] flex items-start gap-2.5 text-xs text-cohere-subtle leading-relaxed">
              <Lock size={15} className="text-cohere-teal flex-shrink-0 mt-0.5" />
              <span>
                Your registration guarantees priority seat reservation. Official syllabus, repository invitations, and calendar invites are issued immediately upon confirmation.
              </span>
            </div>

            <button
              type="submit"
              disabled={!form.name.trim() || !form.phone.trim() || (emailTouched && !emailValidation.isValid)}
              className="w-full rounded-full py-3.5 text-xs font-bold bg-cohere-ink hover:bg-black text-white shadow-md shadow-black/10 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>Continue to Payment & Tuition Settlement</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            STEP 2: PAYMENT METHOD & TRANSACTION VOUCHER CLEARANCE
           ══════════════════════════════════════════════════════════════════ */}
        {step === 'payment' && (
          <form onSubmit={handleCompleteEnrollment} className="space-y-5 pt-1">
            <div>
              <label className="block text-xs font-mono text-cohere-slate mb-2 uppercase">
                Select Official Payment Gateway *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['esewa', 'khalti', 'connectips', 'card'] as PaymentGatewayType[]).map((gt) => (
                  <button
                    key={gt}
                    type="button"
                    onClick={() => {
                      setGateway(gt);
                      setTransactionRef('');
                      setRefError('');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      gateway === gt
                        ? 'border-cohere-ink bg-cohere-ink text-white font-bold shadow-sm'
                        : 'border-black/[0.08] bg-cohere-stone text-cohere-slate hover:text-cohere-ink'
                    }`}
                  >
                    <div className="text-xs capitalize">{gt === 'connectips' ? 'ConnectIPS' : gt}</div>
                    <div className="text-[9px] opacity-75 font-mono">
                      {gt === 'esewa' ? 'eSewa Pay' : gt === 'khalti' ? 'Khalti Pay' : gt === 'connectips' ? 'Interbank' : 'Visa / MC'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Official Merchant Details Card */}
            <div className="p-4 rounded-2xl bg-cohere-stone border border-black/[0.08] space-y-3">
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-2">
                <span className="font-mono text-[10px] text-cohere-slate uppercase">
                  OFFICIAL BENEFICIARY ACCOUNT
                </span>
                <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  VERIFIED MERCHANT
                </span>
              </div>

              {gateway === 'esewa' && (
                <div className="space-y-1.5 text-xs text-cohere-ink">
                  <div><strong>Beneficiary:</strong> MounTech Solutions Pvt. Ltd.</div>
                  <div><strong>eSewa ID / Mobile:</strong> <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-black/10">xxxxxx</span></div>
                  <div><strong>Tuition Payable:</strong> <span className="font-bold text-cohere-ink">{course.costLocal}</span></div>
                  <div className="text-[11px] text-cohere-subtle pt-1">
                    Send funds via your eSewa App to the official MounTech merchant account. In Remarks, enter: <em>{form.name.split(' ')[0]} - {course.id}</em>
                  </div>
                </div>
              )}

              {gateway === 'khalti' && (
                <div className="space-y-1.5 text-xs text-cohere-ink">
                  <div><strong>Beneficiary:</strong> MounTech Academy Nepal</div>
                  <div><strong>Khalti ID / Mobile:</strong> <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-black/10">xxxxxx</span></div>
                  <div><strong>Tuition Payable:</strong> <span className="font-bold text-cohere-ink">{course.costLocal}</span></div>
                  <div className="text-[11px] text-cohere-subtle pt-1">
                    Transfer tuition via Khalti app and copy the Khalti Transaction ID.
                  </div>
                </div>
              )}

              {gateway === 'connectips' && (
                <div className="space-y-1.5 text-xs text-cohere-ink">
                  <div><strong>Bank:</strong> Standard Chartered Bank Nepal Ltd.</div>
                  <div><strong>Account Name:</strong> MounTech Solutions Pvt. Ltd.</div>
                  <div><strong>Account Number:</strong> <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-black/10">xxxxxx</span></div>
                  <div><strong>Branch:</strong> Sanepa / Lalitpur Branch (SWIFT: xxxxxx)</div>
                  <div><strong>Tuition Payable:</strong> <span className="font-bold text-cohere-ink">{course.costLocal}</span></div>
                </div>
              )}

              {gateway === 'card' && (
                <div className="space-y-1.5 text-xs text-cohere-ink">
                  <div><strong>Merchant:</strong> MounTech Enclave (Stripe / International Card)</div>
                  <div><strong>International Tuition:</strong> <span className="font-bold text-cohere-ink">{course.costGlobal}</span></div>
                  <div className="text-[11px] text-cohere-subtle pt-1">
                    Enter the Payment Reference from your card receipt or international wire invoice.
                  </div>
                </div>
              )}
            </div>

            {/* Transaction Reference Input */}
            <div>
              <label className="block text-xs font-mono text-cohere-slate uppercase mb-1">
                Transaction ID / Voucher Code *
              </label>
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

            {/* Optional Voucher Screenshot Upload */}
            <div>
              <label className="block text-xs font-mono text-cohere-slate uppercase mb-1">
                Payment Slip / Receipt Screenshot (Optional)
              </label>
              <label className="border border-dashed border-black/[0.15] hover:border-black/30 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer bg-cohere-stone/40 text-xs text-cohere-slate transition-colors">
                <Upload size={14} />
                <span>{selectedFile ? selectedFile.name : 'Upload Screenshot (PNG, JPG, PDF)'}</span>
                <input 
                  type="file" 
                  accept="image/*,.pdf" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                    }
                  }} 
                />
              </label>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs font-mono text-cohere-slate hover:text-cohere-ink underline"
              >
                ← Back to Candidate Details
              </button>

              <button
                type="submit"
                disabled={!transactionRef.trim()}
                className="rounded-full px-6 py-3 text-xs font-bold bg-cohere-ink hover:bg-black text-white shadow-md shadow-black/10 flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <ShieldCheck size={14} />
                <span>Confirm & Reserve Admission</span>
              </button>
            </div>
          </form>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            STEP 3: CLEARANCE PROCESSING
           ══════════════════════════════════════════════════════════════════ */}
        {step === 'verifying' && (
          <div className="py-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-cohere-ink text-white flex items-center justify-center mx-auto shadow-md">
              <RefreshCw size={24} className="animate-spin" />
            </div>
            <h4 className="font-bold text-lg text-cohere-ink">
              Verifying Payment & Seat Allocation
            </h4>
            <p className="text-xs text-cohere-subtle max-w-sm mx-auto leading-relaxed">
              Recording your transaction reference with {GATEWAY_METADATA[gateway].name} and issuing your official MounTech Academy admission pass...
            </p>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            STEP 4: CONFIRMED ADMISSION PASS & STUDENT ONBOARDING
           ══════════════════════════════════════════════════════════════════ */}
        {step === 'confirmed' && savedEnrollment && (
          <div className="space-y-6 pt-1">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-cohere-ink">
                Admission Confirmed & Seat Reserved
              </h4>
              <p className="text-xs text-cohere-subtle max-w-sm mx-auto">
                Welcome to the cohort! Your student pass has been authenticated and registered in the academy ledger.
              </p>
            </div>

            {/* Official Academy Pass Card */}
            <div className="p-5 rounded-2xl bg-cohere-stone border border-black/[0.1] space-y-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-black/[0.08] pb-3">
                <div>
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">OFFICIAL ADMISSION PASS</div>
                  <div className="font-mono text-lg font-bold text-cohere-ink flex items-center gap-1.5">
                    <span>{savedEnrollment.receiptId}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyPassId(savedEnrollment.receiptId)}
                      className="p-1 text-cohere-slate hover:text-cohere-ink"
                      title="Copy Pass ID"
                    >
                      {copiedPassId ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                  SEAT RESERVED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">STUDENT PARTICIPANT</div>
                  <div className="font-bold text-cohere-ink">{savedEnrollment.studentName}</div>
                  <div className="text-[11px] font-mono text-cohere-subtle truncate">{savedEnrollment.studentEmail}</div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">COHORT LAB</div>
                  <div className="font-semibold text-cohere-ink line-clamp-1">{savedEnrollment.courseTitle}</div>
                  <div className="text-[11px] font-mono text-cohere-subtle">Tuition: {savedEnrollment.tuitionPaid}</div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">PAYMENT SETTLEMENT</div>
                  <div className="font-mono font-bold text-cohere-ink">{savedEnrollment.paymentMethod.toUpperCase()}</div>
                  <div className="text-[10px] font-mono text-cohere-slate truncate">Ref: {savedEnrollment.transactionId}</div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-cohere-slate uppercase">SCHEDULE</div>
                  <div className="font-semibold text-cohere-ink">40h Live Interactive</div>
                  <div className="text-[10px] font-mono text-cohere-slate">Weekends & Evenings NPT</div>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.06] text-[10px] font-mono text-cohere-slate flex items-center justify-between">
                <span>ISSUED: {new Date(savedEnrollment.enrolledAt).toLocaleDateString()}</span>
                <span>MOUNTECH TECH ACADEMY KATHMANDU</span>
              </div>
            </div>

            {/* Next Steps for Student */}
            <div className="p-4 rounded-xl bg-cohere-stone/50 border border-black/[0.06] text-xs text-cohere-subtle space-y-1.5">
              <span className="font-semibold text-cohere-ink block">Next Onboarding Steps:</span>
              <p>• A syllabus guide and repository access token have been dispatched to <strong>{savedEnrollment.studentEmail}</strong>.</p>
              <p>• Add the cohort dates to your calendar or connect with your cohort coordinator below.</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="py-2.5 px-4 rounded-full bg-cohere-stone hover:bg-[#e4e2dc] text-cohere-ink font-semibold text-xs border border-black/[0.08] flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar size={14} className="text-cohere-coral" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <a
                  href={admissionsEmailUrl}
                  className="py-2.5 px-4 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold text-xs border border-emerald-200 flex items-center justify-center gap-2 transition-all"
                >
                  <Mail size={14} className="text-emerald-600" />
                  <span>Admissions Coordinator</span>
                </a>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-3 px-4 rounded-full bg-white hover:bg-cohere-stone text-cohere-ink font-semibold text-xs border border-black/[0.12] flex items-center justify-center gap-2 transition-all"
                >
                  <Printer size={14} />
                  <span>Print / Save PDF Pass</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-full bg-cohere-ink hover:bg-black text-white font-bold text-xs shadow-sm transition-all"
                >
                  Close & Complete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
