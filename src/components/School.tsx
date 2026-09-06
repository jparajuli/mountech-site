import React, { useState, useMemo } from 'react';
import { 
  courses, categories, getCourseById, Course, SyllabusModule 
} from '../data/courses';
import { 
  BookOpen, Clock, Calendar, CheckCircle2, 
  ArrowRight, Search, Sparkles, Filter, X, CreditCard, ShieldCheck, ArrowUpRight
} from 'lucide-react';

interface SchoolProps {
  summaryOnly?: boolean;
  detailOnly?: boolean;
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function School({ summaryOnly, detailOnly, route, setRoute }: SchoolProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Enrollment Modal State
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState<boolean>(false);
  const [enrollCourse, setEnrollCourse] = useState<Course | null>(null);
  const [enrollStep, setEnrollStep] = useState<'form' | 'payment' | 'success'>('form');
  const [enrollForm, setEnrollForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'Intermediate (1-3 years)',
    paymentMethod: 'esewa'
  });
  const [receiptId, setReceiptId] = useState<string>('');

  // Filtering
  const filteredCourses = useMemo(() => {
    return courses.filter((c: Course) => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.methodology.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.learn.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [searchQuery]);

  const activeCourse = useMemo(() => {
    return getCourseById(route.courseId) || courses[0];
  }, [route.courseId]);

  const handleOpenEnroll = (course: Course) => {
    setEnrollCourse(course);
    setEnrollStep('form');
    setIsEnrollModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollForm.name || !enrollForm.email) return;
    setEnrollStep('payment');
  };

  const handleConfirmPayment = () => {
    const id = `MTS-ACAD-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptId(id);
    setEnrollStep('success');

    const current = JSON.parse(localStorage.getItem('mountech_enrollments') || '[]');
    current.push({
      receiptId: id,
      courseId: enrollCourse?.id,
      courseTitle: enrollCourse?.title,
      ...enrollForm,
      date: new Date().toISOString()
    });
    localStorage.setItem('mountech_enrollments', JSON.stringify(current));
  };

  // ──── SUMMARY PREVIEW (FOR HOME PAGE) ────
  if (summaryOnly) {
    return (
      <section className="py-20 sm:py-28 bg-cohere-canvas border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
                INTENSIVE APPLIED ACADEMY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cohere-ink tracking-tight">
                40-Hour Applied Engineering Cohorts
              </h2>
              <p className="text-cohere-subtle text-sm sm:text-base leading-relaxed">
                Hands-on masterclasses designed by systems engineers. Master multi-agent systems, sovereign transformer architectures, and zero-trust cloud infrastructure.
              </p>
            </div>

            <button
              onClick={() => setRoute({ page: 'school', courseId: 'ai-agents' })}
              className="rounded-full px-6 py-3 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm flex items-center gap-2 self-start md:self-auto transition-all"
            >
              <span>View All 10+ Masterclasses</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((c: Course) => (
              <div
                key={c.id}
                className="p-7 rounded-2xl bg-cohere-stone/60 border border-black/[0.08] hover:border-black/[0.2] transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-full bg-white border border-black/[0.08] text-cohere-slate">
                      40h Cohort
                    </span>
                    <span className="font-mono text-xs font-bold text-cohere-ink">{c.costLocal}</span>
                  </div>

                  <h3 className="text-lg font-bold text-cohere-ink leading-snug">{c.title}</h3>
                  <p className="text-xs text-cohere-subtle leading-relaxed line-clamp-2">{c.methodology}</p>
                </div>

                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-cohere-slate">INSTRUCTOR</div>
                    <div className="text-xs font-bold text-cohere-ink line-clamp-1">{c.instructor.split('(')[0]}</div>
                  </div>

                  <button
                    onClick={() => {
                      setRoute({ page: 'course-detail', courseId: c.id });
                    }}
                    className="rounded-full px-4 py-2 text-xs font-semibold bg-white hover:bg-cohere-ink hover:text-white border border-black/[0.12] transition-all"
                  >
                    View Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // ──── DEDICATED INDIVIDUAL COURSE DETAIL PAGE ────
  if (detailOnly) {
    return (
      <div className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back breadcrumb */}
        <button
          onClick={() => setRoute({ page: 'school', courseId: activeCourse.id })}
          className="text-xs font-mono text-cohere-slate hover:text-cohere-ink flex items-center gap-1.5 transition-colors"
        >
          <span>← Back to Academy Masterclasses</span>
        </button>

        {/* Course Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-cohere-stone border border-black/[0.08] text-cohere-ink font-semibold">
              40-Hour Intensive Cohort
            </span>
            <span className="font-mono text-xs text-cohere-slate">• 30% Theory • 70% Production Labs</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-cohere-ink tracking-tight">
            {activeCourse.title}
          </h1>

          <p className="text-base sm:text-lg text-cohere-subtle leading-relaxed max-w-3xl">
            {activeCourse.methodology}
          </p>

          <div className="pt-2 text-xs font-mono text-cohere-slate">
            Instructor: <strong className="text-cohere-ink">{activeCourse.instructor}</strong>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleOpenEnroll(activeCourse)}
              className="rounded-full px-7 py-3.5 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm flex items-center gap-2"
            >
              <span>Enroll in Masterclass ({activeCourse.costLocal} / {activeCourse.costGlobal})</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 40-Hour Module Breakdown */}
        <div className="p-8 rounded-2xl bg-cohere-stone/60 border border-black/[0.08] space-y-6">
          <h2 className="font-display text-xl font-bold text-cohere-ink">
            40-Hour Curriculum & Lab Syllabus
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCourse.syllabus.map((mod: SyllabusModule, idx: number) => (
              <div key={idx} className="p-5 rounded-xl bg-white border border-black/[0.06] space-y-2">
                <div className="font-mono text-[10px] text-cohere-coral font-bold uppercase">
                  {mod.hours}
                </div>
                <h3 className="text-sm font-bold text-cohere-ink">{mod.title}</h3>
                <ul className="space-y-1 text-xs text-cohere-subtle leading-relaxed list-disc list-inside">
                  {mod.topics.map((t: string, tIdx: number) => (
                    <li key={tIdx}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Modal */}
        {isEnrollModalOpen && enrollCourse && (
          <EnrollModal
            course={enrollCourse}
            step={enrollStep}
            form={enrollForm}
            receiptId={receiptId}
            onClose={() => setIsEnrollModalOpen(false)}
            onFormChange={setEnrollForm}
            onFormSubmit={handleFormSubmit}
            onConfirmPayment={handleConfirmPayment}
          />
        )}

      </div>
    );
  }

  // ──── FULL ACADEMY CATALOG VIEW ────
  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="font-mono text-xs text-cohere-slate uppercase tracking-widest">
          PROFESSIONAL EDUCATION LAYER
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-cohere-ink tracking-tight">
          MounTech Tech Academy
        </h1>
        <p className="text-lg text-cohere-subtle leading-relaxed">
          Sovereign AI systems, multi-agent reasoning graphs, and deep cloud engineering. Designed for developers, senior architects, and engineering leaders.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-black/[0.06]">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cohere-ink text-white shadow-sm'
                  : 'bg-cohere-stone text-cohere-slate hover:text-cohere-ink hover:bg-[#e6e4df]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cohere-slate" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syllabus topics..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((c: Course) => (
          <div
            key={c.id}
            className="p-7 rounded-2xl bg-white border border-black/[0.08] hover:border-black/[0.2] transition-all flex flex-col justify-between space-y-6 shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-full bg-cohere-stone border border-black/[0.08] text-cohere-slate font-medium">
                  40h Intensive
                </span>
                <span className="font-mono text-xs font-bold text-cohere-ink">{c.costLocal}</span>
              </div>

              <h3 className="text-lg font-bold text-cohere-ink leading-snug">{c.title}</h3>
              <p className="text-xs text-cohere-subtle leading-relaxed line-clamp-2">{c.methodology}</p>
              
              <div className="space-y-1 pt-2 border-t border-black/[0.04]">
                <div className="text-[10px] font-mono text-cohere-slate">KEY OUTCOME:</div>
                <p className="text-xs text-cohere-ink leading-relaxed line-clamp-2">{c.achieve}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-cohere-slate">GLOBAL SEATS</div>
                <div className="text-sm font-bold text-cohere-ink">{c.costGlobal}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setRoute({ page: 'course-detail', courseId: c.id })}
                  className="rounded-full px-3.5 py-1.5 text-xs font-semibold bg-cohere-stone hover:bg-black hover:text-white transition-colors"
                >
                  Syllabus
                </button>
                <button
                  onClick={() => handleOpenEnroll(c)}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold bg-cohere-ink hover:bg-black text-white transition-colors"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enrollment Modal */}
      {isEnrollModalOpen && enrollCourse && (
        <EnrollModal
          course={enrollCourse}
          step={enrollStep}
          form={enrollForm}
          receiptId={receiptId}
          onClose={() => setIsEnrollModalOpen(false)}
          onFormChange={setEnrollForm}
          onFormSubmit={handleFormSubmit}
          onConfirmPayment={handleConfirmPayment}
        />
      )}

    </div>
  );
}

// ──── MODAL COMPONENT ────
function EnrollModal({
  course,
  step,
  form,
  receiptId,
  onClose,
  onFormChange,
  onFormSubmit,
  onConfirmPayment
}: {
  course: Course;
  step: 'form' | 'payment' | 'success';
  form: any;
  receiptId: string;
  onClose: () => void;
  onFormChange: (f: any) => void;
  onFormSubmit: (e: React.FormEvent) => void;
  onConfirmPayment: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-black/[0.1] max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-cohere-slate hover:bg-black/5"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase text-cohere-coral font-bold">
            ACADEMY ADMISSIONS
          </span>
          <h3 className="text-xl font-bold text-cohere-ink">Enroll: {course.title}</h3>
          <div className="text-xs font-mono text-cohere-slate">
            Tuition: <strong className="text-cohere-ink">{course.costLocal}</strong> ({course.costGlobal}) • 40 Hours Live
          </div>
        </div>

        {/* Step 1: Candidate Info */}
        {step === 'form' && (
          <form onSubmit={onFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-cohere-slate mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => onFormChange({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                placeholder="e.g. Suman Thapa"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cohere-slate mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => onFormChange({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                placeholder="suman@domain.com"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-cohere-slate mb-1">Phone / WhatsApp *</label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => onFormChange({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-cohere-stone border border-black/[0.08] text-xs text-cohere-ink focus:outline-none focus:border-cohere-ink"
                placeholder="+977 98XXXXXXXX"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full py-3 text-xs font-bold bg-cohere-ink hover:bg-black text-white shadow-sm flex items-center justify-center gap-2"
            >
              <span>Continue to Payment Selection</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}

        {/* Step 2: Payment Gateways */}
        {step === 'payment' && (
          <div className="space-y-5">
            <p className="text-xs text-cohere-subtle">
              Select your preferred tuition clearance gateway. Instant enrollment confirmation is generated upon confirmation:
            </p>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              {[
                { id: 'esewa', label: 'eSewa Wallet', fee: 'No extra fee' },
                { id: 'khalti', label: 'Khalti Digital', fee: 'No extra fee' },
                { id: 'bank', label: 'ConnectIPS / Bank', fee: 'Swift / Local' },
                { id: 'card', label: 'Visa / Mastercard', fee: 'Global Stripe' },
              ].map((method) => (
                <div
                  key={method.id}
                  onClick={() => onFormChange({ ...form, paymentMethod: method.id })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    form.paymentMethod === method.id
                      ? 'border-cohere-ink bg-black/[0.04] font-bold'
                      : 'border-black/[0.08] bg-cohere-stone hover:border-black/[0.2]'
                  }`}
                >
                  <div className="text-cohere-ink font-semibold">{method.label}</div>
                  <div className="text-[10px] text-cohere-slate">{method.fee}</div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-cohere-stone border border-black/[0.06] text-xs space-y-1">
              <div className="flex justify-between font-mono text-cohere-slate">
                <span>Tuition Total:</span>
                <strong className="text-cohere-ink">{course.costLocal}</strong>
              </div>
              <div className="flex justify-between font-mono text-cohere-slate">
                <span>Access Pass:</span>
                <strong className="text-cohere-teal">40h Live Interactive</strong>
              </div>
            </div>

            <button
              onClick={onConfirmPayment}
              className="w-full rounded-full py-3 text-xs font-bold bg-cohere-ink hover:bg-black text-white shadow-sm"
            >
              Confirm Enrollment & Generate Pass
            </button>
          </div>
        )}

        {/* Step 3: Success Confirmation Pass */}
        {step === 'success' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-cohere-teal/10 border border-cohere-teal/30 text-cohere-teal flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <h4 className="text-xl font-bold text-cohere-ink">Enrollment Verified</h4>
              <p className="text-xs text-cohere-subtle mt-1">
                Your credentials have been authenticated for the upcoming 40-hour masterclass.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cohere-stone border border-black/[0.08] max-w-xs mx-auto font-mono text-xs text-left space-y-1">
              <div className="text-[10px] text-cohere-slate">ACADEMY PASS REFERENCE</div>
              <div className="text-cohere-ink font-bold text-sm">{receiptId}</div>
              <div className="text-[10px] text-cohere-slate pt-1">Participant: {form.name}</div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full px-6 py-2.5 text-xs font-semibold bg-cohere-ink text-white"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
