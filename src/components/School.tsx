import React, { useState } from 'react';
import { 
  Sliders, CheckCircle, Wallet, CreditCard, ArrowLeft,
  X, Globe, ChevronRight, BookOpen, Mail, Search, Briefcase, 
  Tag, Clock, UserCheck, ShieldCheck, Download, Award, Sparkles,
  Phone, GraduationCap
} from 'lucide-react';
import { courses } from '../data/courses';

interface SchoolProps {
  summaryOnly?: boolean;
  detailOnly?: boolean;
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function School({ summaryOnly, detailOnly, route, setRoute }: SchoolProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'form' | 'payment' | 'success' | 'instructor_form' | 'instructor_success'>('form');
  
  const [studentForm, setStudentForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    cohort: 'Weekend Intensive (Sat/Sun 10AM - 2PM)',
    experience: 'Intermediate Developer'
  });
  const [instructorForm, setInstructorForm] = useState({ name: '', email: '', portfolio: '', proposal: '' });
  const [selectedGateway, setSelectedGateway] = useState<'esewa' | 'khalti' | 'card' | 'bank'>('esewa');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedId, setConfirmedId] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Domains');

  const getCourseCategory = (id: string): string => {
    switch(id) {
      case 'ai-agents':
      case 'generative-ai-transformers':
      case 'mlops-production-lifecycle':
        return 'AI & Machine Learning';
      case 'sovereign-defense':
      case 'offensive-penetration':
        return 'Cybersecurity & Defense';
      case 'adv-software':
      case 'fullstack-react':
      case 'prog-basics':
        return 'Software Engineering';
      case 'data-engineering':
      case 'devops-cloud':
        return 'Cloud & Data Ops';
      case 'quantum':
      case 'blockchain':
        return 'Emerging Technologies';
      default:
        return 'Engineering';
    }
  };

  const categories = [
    'All Domains', 
    'AI & Machine Learning', 
    'Cybersecurity & Defense',
    'Software Engineering', 
    'Cloud & Data Ops', 
    'Emerging Technologies'
  ];

  const filteredCourses = courses.filter(course => {
    const cat = getCourseCategory(course.id);
    const matchesSearch = (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.learn.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.syllabus.some(mod => 
        mod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        mod.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
    
    const matchesCategory = activeCategory === 'All Domains' || cat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const currentCourse = courses.find(c => c.id === route.courseId) || courses[0];

  const handleStudentSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.email) return;
    setModalStep('payment');
  };

  const handleInstructorSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 900));
    
    const facultyLedger = JSON.parse(localStorage.getItem('mountech_faculty_applications') || '[]');
    const newApp = { 
      ...instructorForm, 
      targetCourse: currentCourse.title, 
      refId: `MTS-FACULTY-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString() 
    };
    facultyLedger.push(newApp);
    localStorage.setItem('mountech_faculty_applications', JSON.stringify(facultyLedger));
    
    setConfirmedId(newApp.refId);
    setIsSubmitting(false);
    setModalStep('instructor_success');
  };

  const handleFinalTransaction = async (gw: string) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    const refCode = `MTS-ACAD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const records = JSON.parse(localStorage.getItem('mountech_enrollments') || '[]');
    records.push({ 
      ...studentForm, 
      course: currentCourse.title, 
      courseId: currentCourse.id,
      gw, 
      refCode,
      date: new Date().toISOString() 
    });
    localStorage.setItem('mountech_enrollments', JSON.stringify(records));
    
    setConfirmedId(refCode);
    setIsSubmitting(false);
    setModalStep('success');
  };

  // ──── VIEW MODE A: HOMEPAGE SNAPSHOT ROW ────
  if (summaryOnly) {
    return (
      <section id="academy-summary" className="py-20 bg-bg border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                MOUNTECH ACADEMY • 40-HOUR SPECIALIZATIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Professional Engineering Masterclasses
              </h2>
            </div>
            
            <button 
              onClick={() => setRoute({ page: 'school', courseId: route.courseId })} 
              className="self-start md:self-auto px-5 py-2.5 rounded-lg border border-white/15 hover:border-accent/50 text-white text-sm font-medium hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <span>View Full Course Catalog ({courses.length} Tracks)</span>
              <ChevronRight size={16} className="text-accent" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.slice(0, 3).map(c => (
              <div 
                key={c.id} 
                onClick={() => setRoute({ page: 'course-detail', courseId: c.id })} 
                className="bg-surface/80 border border-white/8 hover:border-accent/50 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-accent border border-white/5">
                      {getCourseCategory(c.id)}
                    </span>
                    <div className="p-2 rounded-xl bg-card border border-white/5 group-hover:scale-110 transition-transform">
                      {c.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {c.title}
                  </h3>
                  
                  <p className="text-text-muted text-xs leading-relaxed line-clamp-3 mb-4">
                    {c.methodology}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-text-muted font-mono">
                    <Clock size={12} />
                    <span>40 Hours Labs</span>
                  </div>
                  <div className="font-semibold text-accent flex items-center gap-1">
                    <span>Syllabus</span>
                    <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // ──── VIEW MODE B: DETAILED INDIVIDUAL COURSE LANDING PAGE ────
  if (detailOnly) {
    return (
      <div className="bg-bg min-h-screen">
        {/* Breadcrumb Back Bar */}
        <div className="border-b border-white/10 bg-surface/40 backdrop-blur-md sticky top-[57px] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <button 
              onClick={() => setRoute({ page: 'school', courseId: currentCourse.id })}
              className="inline-flex items-center gap-2 text-text-sub hover:text-white text-xs font-mono transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Academy Catalog</span>
            </button>
            <span className="text-xs font-mono text-text-muted hidden sm:inline">
              MTS-ACAD-{currentCourse.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Course Header Banner */}
        <section className="bg-surface/90 border-b border-white/10 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-dim text-accent border border-accent/20 text-xs font-mono font-semibold">
              <Sparkles size={12} />
              <span>{getCourseCategory(currentCourse.id)} Specialization</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-4xl">
              {currentCourse.title}
            </h1>
            
            <p className="text-text-sub text-sm sm:text-base max-w-3xl leading-relaxed">
              {currentCourse.methodology}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-text-muted border-t border-white/10">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-accent" />
                <span><strong className="text-white">Duration:</strong> 40 Hours Intensive</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-green" />
                <span><strong className="text-white">Format:</strong> Production Sandbox Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-accent2" />
                <span><strong className="text-white">Instructor:</strong> {currentCourse.instructor}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid: Syllabus + Registration Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Learning Outcomes & Registration Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* What You'll Learn Box */}
            <div className="bg-surface/90 border border-white/10 p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders size={18} className="text-accent" />
                <span>Core Competency Outcomes</span>
              </h3>
              <ul className="space-y-3">
                {currentCourse.learn.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-xs sm:text-sm text-text-sub leading-relaxed">
                    <CheckCircle size={16} className="text-green flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Capstone Achievement Box */}
            <div className="bg-surface/90 border border-white/10 p-6 rounded-2xl space-y-2">
              <h4 className="text-xs font-mono uppercase text-accent font-semibold">Capstone Deployment Project</h4>
              <p className="text-xs sm:text-sm text-text-sub leading-relaxed">
                {currentCourse.achieve}
              </p>
            </div>

            {/* Registration Portal Box */}
            <div className="bg-card/90 border border-accent/40 p-6 rounded-2xl shadow-xl space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white">Enrollment Portal</h3>
                <p className="text-text-muted text-xs mt-0.5">
                  Secure your seat in the upcoming 40-hour cohort.
                </p>
              </div>

              {/* Price Badges */}
              <div className="p-4 rounded-xl bg-surface border border-white/10 flex items-center justify-around text-center">
                <div>
                  <div className="text-[10px] font-mono text-text-muted">DOMESTIC (NEPAL)</div>
                  <div className="text-lg font-extrabold text-green font-mono">{currentCourse.costLocal}</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <div className="text-[10px] font-mono text-text-muted">INTERNATIONAL</div>
                  <div className="text-lg font-extrabold text-accent font-mono">{currentCourse.costGlobal}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button 
                  onClick={() => { setModalStep('form'); setShowModal(true); }}
                  className="w-full py-3.5 rounded-xl bg-accent hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-2"
                >
                  <UserCheck size={16} />
                  <span>Enroll in Cohort as Student</span>
                </button>

                <button 
                  onClick={() => { setModalStep('instructor_form'); setShowModal(true); }}
                  className="w-full py-3 rounded-xl bg-surface hover:bg-white/5 border border-white/15 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Briefcase size={14} />
                  <span>Apply as Faculty / Instructor</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-text-muted">
                <ShieldCheck size={14} className="text-green" />
                <span>Verified Certificate Issued upon Capstone Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Complete 40-Hour Syllabus */}
          <div className="lg:col-span-7 bg-surface/90 border border-white/10 p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <BookOpen size={20} className="text-accent" />
                <h3 className="text-lg font-bold text-white">40-Hour Hands-On Syllabus Breakdown</h3>
              </div>
              <span className="text-xs font-mono text-accent">4 Modules</span>
            </div>

            <div className="space-y-6">
              {currentCourse.syllabus.map((mod, i) => (
                <div key={i} className="pl-4 border-l-2 border-accent space-y-2 relative">
                  <div className="text-xs font-mono font-bold text-accent">{mod.hours}</div>
                  <div className="text-sm sm:text-base font-bold text-white">{mod.title}</div>
                  <ul className="space-y-1.5 pt-1">
                    {mod.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="text-xs text-text-sub leading-relaxed flex items-start gap-2">
                        <span className="text-accent/70 mt-0.5">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Global Enrollment Modal Component */}
        {renderEnrollmentModal()}
      </div>
    );
  }

  // ──── VIEW MODE C: FULL CATALOG DASHBOARD ────
  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <span className="font-mono text-xs text-accent uppercase tracking-wider">
            MOUNTECH ACADEMY • DEEP CURRICULA
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
            40-Hour Applied Engineering Catalog
          </h1>
          <p className="text-text-sub text-sm mt-2 max-w-2xl">
            Strictly hands-on, blue-team sandboxes, multi-agent frameworks, and low-latency infrastructure classes designed for engineering practitioners.
          </p>
        </div>

        {/* Quick Instructor CTA */}
        <button
          onClick={() => { 
            setModalStep('instructor_form'); 
            setShowModal(true); 
          }}
          className="self-start md:self-auto px-4 py-2 rounded-lg bg-surface hover:bg-card border border-white/15 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
        >
          <Briefcase size={14} className="text-accent" />
          <span>Apply to Teach a Masterclass</span>
        </button>
      </div>

      {/* Catalog Split Layout: Sidebar Filters + Main Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sticky Filter & Search Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 lg:sticky lg:top-[85px]">
          
          {/* Search Input Box */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search syllabus, topics..." 
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-surface border border-white/10 text-white text-xs font-mono placeholder:text-text-muted focus:outline-none focus:border-accent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Domain Category Filter List */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-text-muted uppercase tracking-wider px-1">
              Filter by Domain
            </div>
            
            <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {categories.map(cat => {
                const isSelected = activeCategory === cat;
                const count = cat === 'All Domains' 
                  ? courses.length 
                  : courses.filter(c => getCourseCategory(c.id) === cat).length;
                
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-auto lg:w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                      isSelected 
                        ? 'bg-accent text-white font-semibold shadow-md shadow-accent/20' 
                        : 'bg-surface/60 text-text-sub hover:bg-surface hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ml-2 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-text-muted'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Academic Inquiries Quick Badge */}
          <div className="hidden lg:block p-4 rounded-xl bg-surface/60 border border-white/5 text-xs space-y-2">
            <div className="font-semibold text-white">Custom Corporate Cohorts?</div>
            <p className="text-text-muted text-[11px] leading-relaxed">
              We conduct closed enterprise training for banks, engineering teams, and institutional researchers.
            </p>
            <button
              onClick={() => setRoute({ page: 'contact', courseId: 'ai-agents' })}
              className="text-accent text-[11px] font-semibold flex items-center gap-1 hover:underline"
            >
              <span>Inquire Enterprise Cohort</span>
              <ChevronRight size={12} />
            </button>
          </div>

        </aside>

        {/* Right Main Course Cards Grid */}
        <div className="flex-1 min-w-0">
          
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 px-6 bg-surface/60 rounded-2xl border border-white/10 space-y-3">
              <Search size={32} className="mx-auto text-text-muted" />
              <h3 className="text-base font-bold text-white">No Specializations Match Your Query</h3>
              <p className="text-text-muted text-xs max-w-sm mx-auto">
                No courses matched "{searchQuery}" under "{activeCategory}". Try clearing your query to explore all tracks.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All Domains'); }}
                className="px-4 py-2 rounded-lg bg-accent text-white text-xs font-semibold"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCourses.map(c => (
                <div 
                  key={c.id}
                  onClick={() => setRoute({ page: 'course-detail', courseId: c.id })}
                  className="bg-surface/80 border border-white/8 hover:border-accent/50 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 shadow-md group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-accent border border-white/5">
                        {getCourseCategory(c.id)}
                      </span>
                      <div className="p-2 rounded-xl bg-card border border-white/5 group-hover:scale-110 transition-transform">
                        {c.icon}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors leading-snug">
                      {c.title}
                    </h3>
                    
                    <p className="text-text-sub text-xs leading-relaxed line-clamp-3">
                      {c.methodology}
                    </p>

                    <div className="text-[11px] text-text-muted font-mono pt-1">
                      Instructor: <span className="text-text">{c.instructor.split('(')[0]}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs mt-4">
                    <div className="flex items-center gap-1.5 text-text-muted font-mono">
                      <Clock size={12} />
                      <span>40 Hours • Labs</span>
                    </div>
                    <div className="font-semibold text-accent flex items-center gap-1">
                      <span>View Syllabus</span>
                      <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Global Enrollment Modal */}
      {renderEnrollmentModal()}
    </section>
  );

  // ──── MODAL COMPONENT IMPLEMENTATION ────
  function renderEnrollmentModal() {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="bg-surface border border-white/15 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6">
          
          {/* Close Button */}
          <button 
            onClick={() => setShowModal(false)}
            className="absolute top-5 right-5 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white"
          >
            <X size={18} />
          </button>

          {/* 1. Student Enrollment Step 1: Info Form */}
          {modalStep === 'form' && (
            <form onSubmit={handleStudentSubmission} className="space-y-4">
              <div>
                <div className="text-xs font-mono text-accent uppercase">Cohort Enrollment</div>
                <h3 className="text-xl font-bold text-white">{currentCourse.title}</h3>
                <p className="text-xs text-text-muted mt-1">
                  Complete registration details to reserve your seat in the upcoming 40h cohort.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-mono text-text-sub block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                    placeholder="e.g. Aayush Shrestha"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-sub block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                    placeholder="name@organization.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-sub block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-sub block mb-1">Preferred Cohort Timing</label>
                  <select
                    value={studentForm.cohort}
                    onChange={(e) => setStudentForm({ ...studentForm, cohort: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                  >
                    <option value="Weekend Intensive (Sat/Sun 10AM - 2PM)">Weekend Intensive (Sat/Sun 10AM - 2PM)</option>
                    <option value="Weekday Evening (Mon-Thu 6PM - 8:30PM)">Weekday Evening (Mon-Thu 6PM - 8:30PM)</option>
                    <option value="Self-Paced Sandbox + Weekly Office Hours">Self-Paced Sandbox + Weekly Office Hours</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-accent hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
                >
                  <span>Continue to Payment & Verification</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </form>
          )}

          {/* 2. Step 2: Payment Gateway Selection */}
          {modalStep === 'payment' && (
            <div className="space-y-5">
              <div>
                <button 
                  onClick={() => setModalStep('form')}
                  className="text-xs text-text-muted hover:text-white flex items-center gap-1 mb-2"
                >
                  <ArrowLeft size={12} /> Back to details
                </button>
                <div className="text-xs font-mono text-accent uppercase">Tuition Settlement</div>
                <h3 className="text-xl font-bold text-white">Select Payment Channel</h3>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="text-text-muted">COURSE:</div>
                  <div className="text-white font-bold">{currentCourse.title}</div>
                  <div className="text-text-muted text-[10px]">{studentForm.cohort}</div>
                </div>
                <div className="text-right">
                  <div className="text-green text-sm font-bold">{currentCourse.costLocal}</div>
                  <div className="text-text-muted text-[10px]">or {currentCourse.costGlobal}</div>
                </div>
              </div>

              {/* Gateway Options */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div 
                  onClick={() => setSelectedGateway('esewa')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedGateway === 'esewa' ? 'bg-card border-green shadow-md shadow-green/10' : 'bg-surface/60 border-white/10'
                  }`}
                >
                  <div className="font-bold text-green">eSewa Wallet</div>
                  <div className="text-[10px] text-text-muted mt-1">Instant Domestic QR</div>
                </div>

                <div 
                  onClick={() => setSelectedGateway('khalti')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedGateway === 'khalti' ? 'bg-card border-accent2 shadow-md shadow-accent2/10' : 'bg-surface/60 border-white/10'
                  }`}
                >
                  <div className="font-bold text-accent2">Khalti Wallet</div>
                  <div className="text-[10px] text-text-muted mt-1">Digital Banking Pay</div>
                </div>

                <div 
                  onClick={() => setSelectedGateway('bank')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedGateway === 'bank' ? 'bg-card border-accent shadow-md shadow-accent/10' : 'bg-surface/60 border-white/10'
                  }`}
                >
                  <div className="font-bold text-accent">Bank Transfer</div>
                  <div className="text-[10px] text-text-muted mt-1">ConnectIPS / Direct Wire</div>
                </div>

                <div 
                  onClick={() => setSelectedGateway('card')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedGateway === 'card' ? 'bg-card border-white shadow-md' : 'bg-surface/60 border-white/10'
                  }`}
                >
                  <div className="font-bold text-white">Stripe / Card</div>
                  <div className="text-[10px] text-text-muted mt-1">International (100 USD)</div>
                </div>
              </div>

              {/* Gateway Details Box */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-text-sub space-y-1">
                <div className="text-white font-semibold">
                  Channel: {selectedGateway.toUpperCase()} Payment Gateway Relay
                </div>
                <div>Account: MounTech Solution (MTS) • Kathmandu Core</div>
                <div>Telemetry confirmation dispatched automatically on verification.</div>
              </div>

              <button
                onClick={() => handleFinalTransaction(selectedGateway)}
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-accent hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-accent/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    <span>Processing Secure Gateway Handshake...</span>
                  </>
                ) : (
                  <>
                    <CreditCard size={15} />
                    <span>Confirm & Generate Enrollment Access Pass</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* 3. Step 3: Success Access Pass */}
          {modalStep === 'success' && (
            <div className="text-center space-y-5 py-2">
              <div className="w-14 h-14 rounded-full bg-green/10 border border-green/30 text-green flex items-center justify-center mx-auto">
                <ShieldCheck size={32} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Enrollment Confirmed</h3>
                <p className="text-xs text-text-muted mt-1">
                  Welcome to MounTech Academy! Your telemetry enrollment pass has been compiled.
                </p>
              </div>

              {/* Pass Card */}
              <div className="p-5 rounded-2xl bg-black/60 border border-green/30 text-left font-mono space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-[10px] text-text-muted">PASS IDENTIFIER:</span>
                  <span className="text-green font-bold text-xs">{confirmedId}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[10px] text-text-muted">STUDENT:</div>
                    <div className="text-white font-semibold">{studentForm.name}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-text-muted">GATEWAY:</div>
                    <div className="text-accent font-semibold">{selectedGateway.toUpperCase()} Verified</div>
                  </div>
                </div>
                <div className="text-xs">
                  <div className="text-[10px] text-text-muted">SPECIALIZATION:</div>
                  <div className="text-white font-semibold">{currentCourse.title}</div>
                </div>
                <div className="text-xs">
                  <div className="text-[10px] text-text-muted">COHORT SCHEDULE:</div>
                  <div className="text-accent2">{studentForm.cohort}</div>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl bg-accent text-white font-bold text-xs"
                >
                  Done & Return to Catalog
                </button>
              </div>
            </div>
          )}

          {/* 4. Instructor Proposal Form */}
          {modalStep === 'instructor_form' && (
            <form onSubmit={handleInstructorSubmission} className="space-y-4">
              <div>
                <div className="text-xs font-mono text-accent uppercase">Faculty Accreditation</div>
                <h3 className="text-xl font-bold text-white">Join MounTech Faculty</h3>
                <p className="text-xs text-text-muted mt-1">
                  Share your research credentials and proposed curriculum to lead a 40-hour masterclass.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-mono text-text-sub block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={instructorForm.name}
                    onChange={(e) => setInstructorForm({ ...instructorForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                    placeholder="Dr. / Er. / Lead Engineer Name"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-sub block mb-1">Academic / Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={instructorForm.email}
                    onChange={(e) => setInstructorForm({ ...instructorForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                    placeholder="name@university.edu or domain.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-sub block mb-1">LinkedIn or GitHub Profile</label>
                  <input
                    type="url"
                    value={instructorForm.portfolio}
                    onChange={(e) => setInstructorForm({ ...instructorForm, portfolio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-white/10 text-white text-xs focus:outline-none focus:border-accent"
                    placeholder="https://linkedin.com/in/... or github.com/..."
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-text-sub block mb-1">Curriculum Proposal & Sandbox Concept *</label>
                  <textarea
                    rows={3}
                    required
                    value={instructorForm.proposal}
                    onChange={(e) => setInstructorForm({ ...instructorForm, proposal: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-card border border-white/10 text-white text-xs focus:outline-none focus:border-accent resize-none"
                    placeholder="Outline your proposed 40h syllabus, sandbox labs, and student capstone deliverables..."
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-accent hover:bg-blue-600 text-white font-bold text-xs shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Submitting Faculty Credentials...</span>
                  ) : (
                    <>
                      <span>Submit Faculty Application</span>
                      <ChevronRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* 5. Instructor Success */}
          {modalStep === 'instructor_success' && (
            <div className="text-center space-y-4 py-3">
              <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mx-auto">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Application Received</h3>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                Thank you, {instructorForm.name}. Our academic review board (aimldsn@gmail.com) will review your curriculum proposal.
              </p>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-accent">
                Reference: {confirmedId}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-xl bg-accent text-white font-bold text-xs"
              >
                Close Window
              </button>
            </div>
          )}

        </div>
      </div>
    );
  }
}
