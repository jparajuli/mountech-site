import React, { useState, useMemo } from 'react';
import { 
  courses, categories, getCourseById, Course, SyllabusModule 
} from '../data/courses';
import { 
  BookOpen, Clock, Calendar, CheckCircle2, 
  ArrowRight, Search, Sparkles, Filter, X, CreditCard, ShieldCheck, ArrowUpRight,
  Database
} from 'lucide-react';
import SecureEnrollmentModal from './SecureEnrollmentModal';
import DatabaseLedgerModal from './DatabaseLedgerModal';

interface SchoolProps {
  summaryOnly?: boolean;
  detailOnly?: boolean;
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function School({ summaryOnly, detailOnly, route, setRoute }: SchoolProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Secure Enrollment Modal State
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState<boolean>(false);
  const [enrollCourse, setEnrollCourse] = useState<Course | null>(null);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState<boolean>(false);

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
    setIsEnrollModalOpen(true);
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

        {/* Secure Enrollment Modal */}
        <SecureEnrollmentModal
          course={enrollCourse}
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
          onOpenLedger={() => setIsLedgerModalOpen(true)}
        />

        {/* Database Ledger Modal */}
        <DatabaseLedgerModal
          isOpen={isLedgerModalOpen}
          onClose={() => setIsLedgerModalOpen(false)}
        />

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

      {/* Secure Enrollment Modal */}
      <SecureEnrollmentModal
        course={enrollCourse}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        onOpenLedger={() => setIsLedgerModalOpen(true)}
      />

      {/* Database Ledger Modal */}
      <DatabaseLedgerModal
        isOpen={isLedgerModalOpen}
        onClose={() => setIsLedgerModalOpen(false)}
      />

    </div>
  );
}
