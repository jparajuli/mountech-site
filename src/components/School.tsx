import React, { useState } from 'react';
import { 
  Sliders, CheckCircle, Wallet, CreditCard, ArrowLeft,
  X, Globe, ChevronRight, BookOpen, Mail, Search, Briefcase, Tag, Clock
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
  
  const [studentForm, setStudentForm] = useState({ name: '', email: '', phone: '' });
  const [instructorForm, setInstructorForm] = useState({ name: '', email: '', portfolio: '', proposal: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Domains');

  const getCourseCategory = (id: string): string => {
    switch(id) {
      case 'ai-agents':
      case 'generative-ai-transformers':
      case 'mlops-production-lifecycle':
        return 'AI & Machine Learning';
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
        return 'Software Engineering';
    }
  };

  const categories = ['All Domains', 'AI & Machine Learning', 'Software Engineering', 'Cloud & Data Ops', 'Emerging Technologies'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = (
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.learn.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.syllabus.some(mod => 
        mod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        mod.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
    
    const matchesCategory = activeCategory === 'All Domains' || getCourseCategory(course.id) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const currentCourse = courses.find(c => c.id === route.courseId) || courses[0];

  const handleStudentSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setModalStep('payment');
  };

  const handleInstructorSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const facultyLedger = JSON.parse(localStorage.getItem('mountech_faculty_applications') || '[]');
    facultyLedger.push({ ...instructorForm, targetCourse: currentCourse.title, date: new Date().toISOString() });
    localStorage.setItem('mountech_faculty_applications', JSON.stringify(facultyLedger));
    
    setIsSubmitting(false);
    setModalStep('instructor_success');
  };

  const handleFinalTransaction = async (gw: string) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const records = JSON.parse(localStorage.getItem('mountech_enrollments') || '[]');
    records.push({ ...studentForm, course: currentCourse.title, gw, date: new Date().toISOString() });
    localStorage.setItem('mountech_enrollments', JSON.stringify(records));
    setIsSubmitting(false);
    setModalStep('success');
  };

  // ──── VIEW MODE A: HOMEPAGE SNAPSHOT ROW ────
  if (summaryOnly) {
    return (
      <section style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontFamily: 'monospace' }}>MOUNTECH ACADEMY</span>
              <h2>Active Tracks</h2>
            </div>
            <button onClick={() => setRoute({ page: 'school', courseId: route.courseId })} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--accent)', padding: '8px 16px', borderRadius: '6px', fontWeight: 600 }}>View All Tracks →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {courses.slice(0, 3).map(c => (
              <div key={c.id} onClick={() => setRoute({ page: 'course-detail', courseId: c.id })} style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{c.icon} <div><h3 style={{ fontSize: '1rem' }}>{c.title}</h3><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{getCourseCategory(c.id)}</p></div></div>
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
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <div style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 20px' }}>
            <button 
              onClick={() => setRoute({ page: 'school', courseId: currentCourse.id })}
              style={{ background: 'none', border: 'none', color: 'var(--text-sub)', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem' }}
            >
              <ArrowLeft size={16} /> Back to Academy Catalog
            </button>
          </div>
        </div>

        <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '64px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 700, color: currentCourse.accentColor, width: 'fit-content', background: 'rgba(255,255,255,0.03)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
              {getCourseCategory(currentCourse.id)} Specialization
            </span>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: 0 }}>
              {currentCourse.title}
            </h1>
            <p style={{ color: 'var(--text-sub)', fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6, margin: '8px 0 24px' }}>
              {currentCourse.methodology}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> <span><strong>Duration:</strong> 40 Hours</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BookOpen size={16} /> <span><strong>Format:</strong> Production Hands-on Labs</span></div>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: '1200px', margin: '56px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={18} /> What You'll Learn
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {currentCourse.learn.map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-sub)', display: 'flex', gap: '10px', alignItems: 'start', lineHeight: 1.5 }}>
                    <CheckCircle size={16} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '3px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'var(--surface)', border: `1px solid ${currentCourse.accentColor}`, borderRadius: '12px', padding: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Registration Portal</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Select your path. Telemetry is routed directly to aimldsn@gmail.com.</p>
              
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--green)' }}>10000 NPR</span></div>
                <div style={{ height: '20px', borderLeft: '1px solid var(--border)' }}></div>
                <div><span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)' }}>100 USD</span></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button onClick={() => { setModalStep('form'); setShowModal(true); }} style={{ width: '100%', padding: '14px', background: currentCourse.accentColor, border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                  Enroll as Student
                </button>
                <button onClick={() => { setModalStep('instructor_form'); setShowModal(true); }} style={{ width: '100%', padding: '12px', background: 'transparent', border: `1px solid ${currentCourse.accentColor}`, borderRadius: '6px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
                  Apply as Course Instructor
                </button>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} /> Course Syllabus
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {currentCourse.syllabus.map((s, i) => (
                <div key={i} style={{ paddingBottom: '16px', paddingLeft: '16px', borderLeft: `2px solid ${currentCourse.accentColor}` }}>
                  <div style={{ fontSize: '0.75rem', color: currentCourse.accentColor, fontFamily: 'monospace', fontWeight: 700 }}>{s.hours}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginTop: '2px' }}>{s.title}</div>
                  <ul style={{ listStyle: 'none', marginTop: '8px', padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {s.topics.map((topic, tIdx) => (
                      <li key={tIdx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>• {topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ──── VIEW MODE C: CATALOG DASHBOARD (DEEPLEARNING.AI SIDEBAR SPECIFICATION) ────
  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      
      {/* ── UNIFIED WRAPPER FOR SIDEBAR SPLIT LAYOUT ── */}
      <div className="academy-split-layout" style={{ display: 'flex', gap: '40px', alignItems: 'start' }}>
        
        {/* ── LEFT SIDEBAR PANEL (Sticky Search + Category Node Architecture) ── */}
        <aside className="academy-sidebar-node" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Section Heading Group */}
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 4px 0' }}>Courses</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Summiting AI. Securing Foundations.</p>
          </div>

          {/* Sidebar Part 1: Real-Time Input Query Tracker */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '14px', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
              <Search size={16} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..." 
              style={{ 
                width: '100%', padding: '12px 14px 12px 40px', background: 'var(--surface)', 
                border: '1px solid var(--border)', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', outline: 'none' 
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', top: '50%', right: '14px', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sidebar Part 2: Vertical Stack Filters */}
          <div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '12px', textTransform: 'uppercase' }}>
              Filter By Domain
            </div>
            <div className="sidebar-categories-stack" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {categories.map(cat => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="sidebar-filter-btn"
                    style={{
                      width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: 600,
                      background: isSelected ? 'var(--accent-dim)' : 'transparent',
                      border: `1px solid ${isSelected ? 'var(--accent)' : 'transparent'}`,
                      color: isSelected ? 'var(--accent)' : 'var(--text-sub)',
                      cursor: 'pointer', transition: 'all 0.15s'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── RIGHT MAIN DISPLAY COLUMN (Catalog Dashboard Grid Grid) ── */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {filteredCourses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 20px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <Search size={32} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
              <h3 style={{ margin: 0 }}>No Specializations Match Your Query</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>Try selecting an alternate filter matrix or clearing your text criteria.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {filteredCourses.map(c => (
                <div 
                  key={c.id}
                  onClick={() => setRoute({ page: 'course-detail', courseId: c.id })}
                  style={{
                    background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px',
                    padding: '24px', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = c.accentColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontFamily: 'monospace', fontWeight: 700, color: c.accentColor, background: 'rgba(255,255,255,0.02)', padding: '4px 6px', borderRadius: '4px' }}>
                        {getCourseCategory(c.id)}
                      </span>
                      <div style={{ color: c.accentColor }}>{c.icon}</div>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', color: '#fff', lineHeight: 1.3 }}>
                      {c.title}
                    </h3>
                    
                    <p style={{ color: 'var(--text-sub)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {c.methodology}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <Clock size={12} /> <span>40 Hours • Core Track</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: c.accentColor, display: 'flex', alignItems: 'center', gap: '2px' }}>
                      Explore Syllabus <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Embedded Global Stylesheet Override to handle absolute UI media-query transitions dynamically */}
      <style>{`
        @media (min-width: 900px) {
          .academy-split-layout { flex-direction: row !important; }
          .academy-sidebar-node { width: 260px !important; position: sticky !important; top: 90px; }
          .sidebar-categories-stack { flex-direction: column !important; }
        }
        @media (max-width: 899px) {
          .academy-split-layout { flex-direction: column !important; gap: 32px !important; }
          .academy-sidebar-node { width: 100% !important; }
          .sidebar-categories-stack { flex-direction: row !important; overflow-x: auto !important; padding-bottom: 6px; -webkit-overflow-scrolling: touch; }
          .sidebar-filter-btn { width: auto !important; flex-shrink: 0 !important; white-space: nowrap !important; padding: 8px 14px !important; }
        }
      `}</style>
    </section>
  );
}
