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
  RefreshCw, AlertCircle, Printer, Calendar, Upload, Check, Copy, Mail
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

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'Intermediate (1-3 years)',
    organization: '',
    notes: ''
  });

  const [emailValidation, setEmailValidation] = useState<EmailValidationResult>({ isValid: false });
  const [emailTouched, setEmailTouched] = useState(false);

  const [gateway, setGateway] = useState<PaymentGatewayType>('esewa');
  const [transactionRef, setTransactionRef] = useState('');
  const [refError, setRefError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [savedEnrollment, setSavedEnrollment] = useState<EnrollmentRecord | null>(null);
  const [copiedPassId, setCopiedPassId] = useState(false);

  useEffect(() => {
    if (form.email) {
      setEmailValidation(EmailVerificationService.validate(form.email));
    } else {
      setEmailValidation({ isValid: false });
    }
  }, [form.email]);

  if (!isOpen || !course) return null;

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
    } catch {
      setRefError('Network or clearing error. Please re-enter your reference code and retry.');
      setStep('payment');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDownloadCalendar = () => {
    if (!course) return;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 14);
    startDate.setHours(18, 30, 0, 0);

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

  const admissionsEmailUrl = `mailto:aimldsn@gmail.com?subject=${encodeURIComponent(
    `Admission Confirmation: ${savedEnrollment?.receiptId || ''} - ${course.title}`
  )}&body=${encodeURIComponent(
    `Hello MounTech Admissions Coordinator,\n\nI have registered for ${course.title}.\nAdmission Pass ID: ${savedEnrollment?.receiptId || ''}\nStudent Name: ${savedEnrollment?.studentName || ''}\nPayment Gateway: ${savedEnrollment?.paymentMethod || ''}\nTransaction Reference: ${savedEnrollment?.transactionId || ''}\n\nPlease confirm my onboarding schedule.\n\nThank you,\n${savedEnrollment?.studentName || ''}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1924]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div
        className="bg-white rounded-2xl border border-[#E2E8F0] max-w-xl w-full p-6 sm:p-8 shadow-elevated relative max-h-[92vh] overflow-y-auto space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enrollment dialog"
          className="absolute top-5 right-5 p-2 rounded-lg text-[#5A6D7E] hover:text-[#0F1E2E] hover:bg-[#F8FAFC] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Stepper Header */}
        <div className="space-y-3 pr-8">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-semibold text-[#0284C7] flex items-center gap-1.5">
              <ShieldCheck size={14} />
              <span>Mountech Academy Admission</span>
            </span>
            <span className="text-[#5A6D7E]">
              {step === 'details' && 'Step 1 of 3 · Registration'}
              {step === 'payment' && 'Step 2 of 3 · Payment'}
              {step === 'verifying' && 'Processing Clearance'}
              {step === 'confirmed' && 'Confirmed'}
            </span>
          </div>

          <div className="h-1.5 w-full bg-[#F0F9FF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0284C7] transition-all duration-300"
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
        <div className="p-4 rounded-xl bg-[#F0F9FF]/80 border border-[#BAE6FD] flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono text-[#0284C7]">
              Academy Masterclass · 40-Hour Cohort
            </div>
            <h3 className="font-bold text-sm text-[#0F1E2E]">{course.title}</h3>
            <p className="text-xs text-[#5A6D7E]">
              Lead Faculty: {course.instructor.split('(')[0]}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="font-display font-extrabold text-base text-[#0F1E2E] tabular-nums">
              {course.costLocal}
            </div>
            <div className="text-[11px] font-mono text-[#5A6D7E] tabular-nums">
              {course.costGlobal}
            </div>
          </div>
        </div>

        {/* STEP 1 */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#334155] mb-1">
                  Full Legal / Certificate Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Suman Adhikari"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F1E2E] focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#334155] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="e.g. suman@tech.com.np"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border text-xs text-[#0F1E2E] focus:outline-none ${
                      emailTouched && !emailValidation.isValid
                        ? 'border-amber-500'
                        : 'border-[#E2E8F0] focus:border-[#0284C7]'
                    }`}
                  />
                  {emailTouched && emailValidation.suggestion && (
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, email: `${form.email.split('@')[0]}@${emailValidation.suggestion}` })}
                      className="text-[11px] font-mono text-[#0284C7] hover:underline mt-1 block"
                    >
                      Did you mean @{emailValidation.suggestion}? Click to correct.
                    </button>
                  )}
                  {emailTouched && emailValidation.error && !emailValidation.suggestion && (
                    <div className="text-[11px] text-amber-700 mt-1">
                      {emailValidation.error}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#334155] mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F1E2E] focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#334155] mb-1">
                    Technical Experience
                  </label>
                  <select
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F1E2E] focus:outline-none focus:border-[#0284C7]"
                  >
                    <option>Beginner (0-1 years)</option>
                    <option>Intermediate (1-3 years)</option>
                    <option>Senior Engineer (3-5+ years)</option>
                    <option>Staff / Principal Architect</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#334155] mb-1">
                    Organization / College (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder="e.g. IOE Pulchowk / Organization"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#0F1E2E] focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#5A6D7E] leading-relaxed">
              <Lock size={15} className="text-[#0284C7] shrink-0 mt-0.5" />
              <span>
                Your registration reserves a priority cohort seat. Syllabus details, repository access, and calendar invites are issued upon payment reference verification.
              </span>
            </div>

            <button
              type="submit"
              disabled={!form.name.trim() || !form.phone.trim() || (emailTouched && !emailValidation.isValid)}
              className="w-full rounded-lg py-3 text-xs font-semibold bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-subtle flex items-center justify-center gap-2 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <span>Continue to Payment &amp; Settlement</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 'payment' && (
          <form onSubmit={handleCompleteEnrollment} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-[#334155] mb-2">
                Select Payment Gateway *
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
                    className={`p-3 rounded-lg border text-center transition-colors ${
                      gateway === gt
                        ? 'border-[#0284C7] bg-[#0284C7] text-white font-semibold'
                        : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#5A6D7E] hover:text-[#0F1E2E]'
                    }`}
                  >
                    <div className="text-xs capitalize">{gt === 'connectips' ? 'ConnectIPS' : gt}</div>
                    <div className="text-[10px] opacity-80 font-mono">
                      {gt === 'esewa' ? 'eSewa Pay' : gt === 'khalti' ? 'Khalti Pay' : gt === 'connectips' ? 'Interbank' : 'Visa / MC'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2 text-xs font-mono">
                <span className="text-[#5A6D7E]">Official Beneficiary Account</span>
                <span className="font-semibold text-[#15803D]">Verified Merchant</span>
              </div>

              {gateway === 'esewa' && (
                <div className="space-y-1.5 text-xs text-[#0F1E2E]">
                  <div><strong>Beneficiary:</strong> MounTech Solutions Pvt. Ltd.</div>
                  <div><strong>eSewa ID / Mobile:</strong> <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">xxxxxx</span></div>
                  <div><strong>Tuition Payable:</strong> <span className="font-bold tabular-nums">{course.costLocal}</span></div>
                  <div className="text-[11px] text-[#5A6D7E] pt-1">
                    Send tuition via eSewa and include remarks: <em>{form.name.split(' ')[0]} - {course.id}</em>
                  </div>
                </div>
              )}

              {gateway === 'khalti' && (
                <div className="space-y-1.5 text-xs text-[#0F1E2E]">
                  <div><strong>Beneficiary:</strong> MounTech Academy Nepal</div>
                  <div><strong>Khalti ID / Mobile:</strong> <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">xxxxxx</span></div>
                  <div><strong>Tuition Payable:</strong> <span className="font-bold tabular-nums">{course.costLocal}</span></div>
                  <div className="text-[11px] text-[#5A6D7E] pt-1">
                    Transfer tuition via Khalti app and enter the Khalti Transaction ID below.
                  </div>
                </div>
              )}

              {gateway === 'connectips' && (
                <div className="space-y-1.5 text-xs text-[#0F1E2E]">
                  <div><strong>Bank:</strong> Standard Chartered Bank Nepal Ltd.</div>
                  <div><strong>Account Name:</strong> MounTech Solutions Pvt. Ltd.</div>
                  <div><strong>Account Number:</strong> <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">xxxxxx</span></div>
                  <div><strong>Branch:</strong> Sanepa / Lalitpur Branch (SWIFT: xxxxxx)</div>
                  <div><strong>Tuition Payable:</strong> <span className="font-bold tabular-nums">{course.costLocal}</span></div>
                </div>
              )}

              {gateway === 'card' && (
                <div className="space-y-1.5 text-xs text-[#0F1E2E]">
                  <div><strong>Merchant:</strong> MounTech International Tuition</div>
                  <div><strong>International Tuition:</strong> <span className="font-bold tabular-nums">{course.costGlobal}</span></div>
                  <div className="text-[11px] text-[#5A6D7E] pt-1">
                    Enter the Payment Reference from your card receipt or wire confirmation.
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#334155] mb-1">
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
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#0F1E2E] focus:outline-none focus:border-[#0284C7]"
              />
              <p className="text-[11px] text-[#5A6D7E] mt-1">
                {GATEWAY_METADATA[gateway].helperText}
              </p>

              {refError && (
                <div className="mt-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-rose-600 shrink-0" />
                  <span>{refError}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#334155] mb-1">
                Payment Slip / Receipt Screenshot (Optional)
              </label>
              <label className="border border-dashed border-[#CBD5E1] hover:border-[#0284C7] rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer bg-[#F8FAFC] text-xs text-[#5A6D7E] transition-colors">
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
                className="text-xs font-medium text-[#5A6D7E] hover:text-[#0F1E2E] underline whitespace-nowrap shrink-0"
              >
                ← Back to Details
              </button>

              <button
                type="submit"
                disabled={!transactionRef.trim() || isVerifying}
                className="rounded-lg px-5 py-2.5 text-xs font-semibold bg-[#15803D] hover:bg-[#166534] text-white shadow-subtle flex items-center gap-2 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
              >
                <ShieldCheck size={14} />
                <span>Confirm &amp; Reserve Admission</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3 */}
        {step === 'verifying' && (
          <div className="py-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0284C7] text-white flex items-center justify-center mx-auto">
              <RefreshCw size={22} className="animate-spin" />
            </div>
            <h4 className="font-bold text-lg text-[#0F1E2E]">
              Verifying Payment &amp; Seat Allocation
            </h4>
            <p className="text-xs text-[#5A6D7E] max-w-sm mx-auto leading-relaxed">
              Validating your transaction reference with {GATEWAY_METADATA[gateway].name} and generating your official Mountech Academy admission pass.
            </p>
          </div>
        )}

        {/* STEP 4 */}
        {step === 'confirmed' && savedEnrollment && (
          <div className="space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] flex items-center justify-center mx-auto">
                <CheckCircle2 size={26} />
              </div>
              <h4 className="text-xl font-bold text-[#0F1E2E]">
                Admission Confirmed &amp; Seat Reserved
              </h4>
              <p className="text-xs text-[#5A6D7E] max-w-sm mx-auto">
                Your enrollment pass has been verified and stored in the academy ledger.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                <div>
                  <div className="text-[11px] font-mono text-[#5A6D7E]">Official Admission Pass</div>
                  <div className="font-mono text-base font-bold text-[#0F1E2E] flex items-center gap-1.5">
                    <span>{savedEnrollment.receiptId}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyPassId(savedEnrollment.receiptId)}
                      className="p-1 text-[#5A6D7E] hover:text-[#0284C7]"
                      title="Copy Pass ID"
                    >
                      {copiedPassId ? <Check size={14} className="text-[#15803D]" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-[#15803D]">
                  Seat Reserved
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[11px] font-mono text-[#5A6D7E]">Participant</div>
                  <div className="font-bold text-[#0F1E2E]">{savedEnrollment.studentName}</div>
                  <div className="text-[11px] font-mono text-[#5A6D7E] truncate">{savedEnrollment.studentEmail}</div>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-[#5A6D7E]">Cohort</div>
                  <div className="font-semibold text-[#0F1E2E] line-clamp-1">{savedEnrollment.courseTitle}</div>
                  <div className="text-[11px] font-mono text-[#5A6D7E] tabular-nums">Tuition: {savedEnrollment.tuitionPaid}</div>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-[#5A6D7E]">Payment Method</div>
                  <div className="font-mono font-bold text-[#0F1E2E]">{savedEnrollment.paymentMethod.toUpperCase()}</div>
                  <div className="text-[11px] font-mono text-[#5A6D7E] truncate">Ref: {savedEnrollment.transactionId}</div>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-[#5A6D7E]">Schedule</div>
                  <div className="font-semibold text-[#0F1E2E]">40h Live Interactive</div>
                  <div className="text-[11px] font-mono text-[#5A6D7E]">Weekends &amp; Evenings NPT</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F0F9FF]/80 border border-[#BAE6FD] text-xs text-[#334155] space-y-1">
              <span className="font-semibold text-[#0F1E2E] block">Next Onboarding Steps</span>
              <p>A syllabus guide and repository access invite have been queued for <strong>{savedEnrollment.studentEmail}</strong>.</p>
            </div>

            <div className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="py-2.5 px-4 rounded-lg bg-[#F8FAFC] hover:bg-[#F0F9FF] text-[#0F1E2E] font-semibold text-xs border border-[#E2E8F0] flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Calendar size={14} className="text-[#0284C7]" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <a
                  href={admissionsEmailUrl}
                  className="py-2.5 px-4 rounded-lg bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#0369A1] font-semibold text-xs border border-[#BAE6FD] flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail size={14} />
                  <span>Admissions Coordinator</span>
                </a>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#0F1E2E] font-semibold text-xs border border-[#E2E8F0] flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Printer size={14} />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg bg-[#0B1924] hover:bg-[#122636] text-white font-semibold text-xs transition-colors whitespace-nowrap shrink-0"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
