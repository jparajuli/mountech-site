import React, { useState, useMemo } from 'react';
import {
  courses, categories, getCourseById, Course, SyllabusModule
} from '../data/courses';
import { ArrowRight, Search } from 'lucide-react';
import SecureEnrollmentModal from './SecureEnrollmentModal';
import { MEDIA_ASSETS } from '../assets/media';
import MediaFrame from './MediaFrame';
import { RevealBlock, InteractiveCard } from './MotionPrimitives';

interface SchoolProps {
  summaryOnly?: boolean;
  detailOnly?: boolean;
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function School({ summaryOnly, detailOnly, route, setRoute }: SchoolProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState<boolean>(false);
  const [enrollCourse, setEnrollCourse] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return courses.filter((c: Course) => {
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.methodology.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.learn.some((l) => l.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeCourse = useMemo(() => {
    return getCourseById(route.courseId) || courses[0];
  }, [route.courseId]);

  const handleOpenEnroll = (course: Course) => {
    setEnrollCourse(course);
    setIsEnrollModalOpen(true);
  };

  if (summaryOnly) {
    return (
      <section className="py-20 sm:py-28 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <RevealBlock>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#64748B]">
                  <span className="font-semibold text-[#2563EB]">Education &amp; Capacity Building</span>
                  <span aria-hidden="true">·</span>
                  <span>Mountech Academy</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
                  Tailored AI Education &amp; Workforce Upskilling
                </h2>

                <p className="text-base text-[#64748B] leading-relaxed">
                  Bridging the gap between global AI advancements and local implementation by delivering tailored 40-hour engineering cohorts, executive workshops, and enterprise solution readiness across Nepal.
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#334155] pt-1">
                  <span>30% Theory · 70% Hands-On Labs</span>
                  <span aria-hidden="true">·</span>
                  <span>12 Specialized Engineering Tracks</span>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'school', courseId: 'ai-agents' })}
                    className="px-6 py-3 rounded-lg text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-subtle inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <span>Explore All 12 Masterclasses</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 flex">
                <div className="w-full rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col shadow-subtle">
                  <MediaFrame
                    src={MEDIA_ASSETS.academyWorkshop}
                    alt="Engineers participating in a Mountech Academy applied AI workshop in Nepal"
                    title="Mountech Academy Technical Seminar"
                    aspectClass="aspect-[4/3] lg:h-full lg:min-h-[300px]"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((c: Course) => (
              <InteractiveCard
                key={c.id}
                className="p-7 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB]/50 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                    <span>40h Cohort · {c.category}</span>
                    <span className="font-bold text-[#172033] tabular-nums">{c.costLocal}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#172033] leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                    {c.methodology}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono text-[#64748B]">Faculty</div>
                    <div className="text-xs font-semibold text-[#172033] truncate">
                      {c.instructor.split('(')[0]}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'course-detail', courseId: c.id })}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-[#101828] hover:text-white text-[#172033] border border-[#E2E8F0] transition-colors whitespace-nowrap shrink-0"
                  >
                    View Syllabus
                  </button>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (detailOnly) {
    return (
      <div className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <button
          type="button"
          onClick={() => setRoute({ page: 'school', courseId: activeCourse.id })}
          className="text-xs font-mono text-[#64748B] hover:text-[#2563EB] flex items-center gap-1.5 transition-colors"
        >
          <span>← Back to Academy Masterclasses</span>
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono text-[#64748B]">
            <span className="font-semibold text-[#2563EB]">{activeCourse.category}</span>
            <span aria-hidden="true">·</span>
            <span>40-Hour Intensive Cohort</span>
            <span aria-hidden="true">·</span>
            <span>30% Theory · 70% Production Labs</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#172033] tracking-tight">
            {activeCourse.title}
          </h1>

          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
            {activeCourse.methodology}
          </p>

          <div className="pt-1 text-xs font-mono text-[#64748B]">
            Instructor: <strong className="text-[#172033]">{activeCourse.instructor}</strong>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleOpenEnroll(activeCourse)}
              className="rounded-lg px-7 py-3.5 text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-subtle flex items-center gap-2 transition-colors whitespace-nowrap tabular-nums"
            >
              <span>Enroll in Masterclass ({activeCourse.costLocal} / {activeCourse.costGlobal})</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#EFF6FF]/60 border border-[#BFDBFE] space-y-6">
          <h2 className="font-display text-xl font-bold text-[#172033]">
            40-Hour Curriculum &amp; Lab Syllabus
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCourse.syllabus.map((mod: SyllabusModule, idx: number) => (
              <div key={idx} className="p-5 rounded-xl bg-white border border-[#E2E8F0] space-y-2.5">
                <div className="font-mono text-xs text-[#2563EB] font-semibold">
                  {mod.hours}
                </div>
                <h3 className="text-sm font-bold text-[#172033]">{mod.title}</h3>
                <ul className="space-y-1.5 text-xs text-[#64748B] leading-relaxed list-disc list-inside">
                  {mod.topics.map((t: string, tIdx: number) => (
                    <li key={tIdx}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <SecureEnrollmentModal
          course={enrollCourse}
          isOpen={isEnrollModalOpen}
          onClose={() => setIsEnrollModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#64748B]">
            <span className="font-semibold text-[#2563EB]">Strategic Portfolio Pillar</span>
            <span aria-hidden="true">·</span>
            <span>Tailored AI Education &amp; Upskilling</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172033] tracking-tight">
            Mountech Academy
          </h1>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl">
            Bridging the gap between global AI advancements and local implementation by delivering tailored 40-hour AI education, workforce upskilling, and applied engineering cohorts across Nepal.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-subtle">
            <MediaFrame
              src={MEDIA_ASSETS.academyWorkshop}
              alt="Mountech Academy engineering training workshop"
              title="Mountech Academy Cohorts"
              aspectClass="aspect-[4/3]"
            />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-[#E2E8F0]">
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E2E8F0] rounded-xl overflow-x-auto">
          {categories.map((cat: string) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#2563EB] text-white font-semibold'
                  : 'text-[#64748B] hover:text-[#172033] hover:bg-[#F8FAFC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syllabus topics or faculty..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#172033] focus:outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white border border-[#E2E8F0] text-center space-y-2">
          <div className="font-display text-base font-bold text-[#172033]">
            No matching courses found
          </div>
          <p className="text-xs text-[#64748B]">
            Try clearing the search query or switching to &quot;All&quot; tracks.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c: Course) => (
            <InteractiveCard
              key={c.id}
              className="p-7 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB]/50 hover:shadow-elevated transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                  <span>40h Cohort · {c.category}</span>
                  <span className="font-bold text-[#172033] tabular-nums">{c.costLocal}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#172033] leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                  {c.methodology}
                </p>

                <div className="space-y-1 pt-2 border-t border-[#E2E8F0]">
                  <div className="text-[11px] font-mono text-[#64748B]">Capstone Outcome</div>
                  <p className="text-xs text-[#334155] leading-relaxed line-clamp-2">{c.achieve}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-mono text-[#64748B]">Global Seat</div>
                  <div className="text-sm font-bold text-[#172033] tabular-nums">{c.costGlobal}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRoute({ page: 'course-detail', courseId: c.id })}
                    className="rounded-lg px-3.5 py-2 text-xs font-semibold bg-[#F8FAFC] hover:bg-[#EFF6FF] text-[#172033] border border-[#E2E8F0] transition-colors whitespace-nowrap"
                  >
                    Syllabus
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEnroll(c)}
                    className="rounded-lg px-4 py-2 text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors whitespace-nowrap"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </InteractiveCard>
          ))}
        </div>
      )}

      <SecureEnrollmentModal
        course={enrollCourse}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </div>
  );
}
