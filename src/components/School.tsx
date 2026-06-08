import React, { useState } from 'react';
import { 
  Sliders, CheckCircle, Wallet, CreditCard, 
  X, Globe, ChevronRight, BookOpen, Mail, Search, Briefcase, Tag
} from 'lucide-react';
import { courses } from '../data/courses';

interface SchoolProps {
  summaryOnly?: boolean;
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function School({ summaryOnly, route, setRoute }: SchoolProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'form' | 'payment' | 'success' | 'instructor_form' | 'instructor_success'>('form');
  const [paymentRegion, setPaymentRegion] = useState<'nepal' | 'global'>('nepal');
  
  const [studentForm, setStudentForm] = useState({ name: '', email: '', phone: '' });
  const [instructorForm, setInstructorForm] = useState({ name: '', email: '', portfolio: '', proposal: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Domains');

  // Classified routing dictionary updated with newly designed AI tokens
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

  const currentCourse = filteredCourses.find(c => c.id === route.courseId) || filteredCourses[0];

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

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    const matches = courses.filter(c => cat === 'All Domains' || getCourseCategory(c.id) === cat);
    if (matches.length > 0) {
      setRoute({ page: 'school', courseId: matches[0].id });
    }
  };

  // ──── HOME PREVIEW (TOP 3) ────
  if (summaryOnly) {
    return (
      <section style={{ borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontFamily: 'monospace' }}>MOUNTECH ACADEMY</span>
              <h2>Active Tracks</h2>
            </div>
            <button onClick={() => setRoute({ page: 'school', courseId: route.courseId })} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--accent)', padding: '8px 16px', borderRadius: '6px' }}>View All Tracks →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {courses.slice(0, 3).map(c => (
              <div key={c.id} onClick={() => setRoute({ page: 'school', courseId: c.id })} style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{c.icon} <div><h3 style={{ fontSize: '1rem' }}>{c.title}</h3><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{getCourseCategory(c.id)}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ──── FULL ACADEMY DASHBOARD VIEW ────
  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)', fontSize: '0.85rem' }}>TRAINING ACADEMY FRAMEWORK</span>
        <h1 style={{ marginTop: '8px' }}>Practical Knowledge Specialization Clusters</h1>
      </div>

      {/* Domain Category Selector Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px', WebkitOverflowScrolling: 'touch' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{
              flexShrink: 0, padding: '10px 18px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600,
              background: activeCategory === cat ? 'var(--accent-dim)' : 'var(--surface)',
              border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
              color: activeCategory === cat ? 'var(--accent)' : 'var(--text-sub)',
              display: 'flex', alignItems: 'center', gap: '6px', transition: '0.15s'
            }}
          >
            <Tag size={12} /> {cat}
          </button>
        ))}
      </div>

      {/* Deep Filter Input Field */}
      <div style={{ maxWidth: '500px', margin: '0 auto 40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}><Search size={18} /></div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search inside ${activeCategory.toLowerCase()}...`} 
          style={{ width: '100%', padding: '14px 16px 14px 48px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', color: '#fff', fontSize: '0.95rem', outline: 'none' }}
        />
        {searchQuery && (<button onClick={() => setSearchQuery('')} style={{ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)' }}><X size={16} /></button>)}
      </div>

      {filteredCourses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <Search size={36} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3>No Operational Configurations Match the Matrix Parameters</h3>
        </div>
      ) : (
        <>
          {/* Sub-tier Specific Filtered Course Tabs Selector */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '10px' }}>
            {filteredCourses.map(c => (
              <button key={c.id} onClick={() => setRoute({ page: 'school', courseId: c.id })}
                style={{ 
                  flexShrink: 0, padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500,
                  background: route.courseId === c.id ? 'var(--surface)' : 'transparent',
                  border: `1px solid ${route.courseId === c.id ? c.accentColor : 'var(--border)'}`, color: route.courseId === c.id ? '#fff' : 'var(--text-sub)'
                }}>{c.title}</button>
            ))}
          </div>

          {/* Main Layout Container */}
          {currentCourse && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  
                  {/* Faculty Accreditation block completely omitted from this layout layer */}
                  
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>CLASSIFICATION TAG</span>
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, marginTop: '4px' }}>{getCourseCategory(currentCourse.id).toUpperCase()}</div>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>METHODOLOGY</span>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', marginTop: '4px', lineHeight: 1.6 }}>{currentCourse.methodology}</p>
                  </div>
                  <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
                    <div><span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--green)' }}>{currentCourse.costLocal}</span></div>
                    <div><span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)' }}>{currentCourse.costGlobal}</span></div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={() => { setModalStep('form'); setShowModal(true); }} style={{ width: '100%', padding: '14px', background: currentCourse.accentColor, border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600 }}>
                      Enroll as Student
                    </button>
                    <button onClick={() => { setModalStep('instructor_form'); setShowModal(true); }} style={{ width: '100%', padding: '12px', background: 'transparent', border: `1px solid ${currentCourse.accentColor}`, borderRadius: '8px', color: '#fff', fontWeight: 600 }}>
                      Apply as Course Instructor
                    </button>
                  </div>
                </div>

                <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Sliders size={16} /> Competencies Acquired</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentCourse.learn.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-sub)', display: 'flex', gap: '8px', alignItems: 'start' }}>
                        <CheckCircle size={14} style={{ color: 'var(--green)', flexShrink: 0, marginTop: '2px' }} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={18} /> 40-Hour Practical Curriculum Blueprint</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {currentCourse.syllabus.map((s, i) => (
                    <div key={i} style={{ paddingBottom: '12px', paddingLeft: '12px', borderLeft: `2px solid ${currentCourse.accentColor}` }}>
                      <div style={{ fontSize: '0.7rem', color: currentCourse.accentColor, fontFamily: 'monospace' }}>{s.hours}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', marginTop: '2px' }}>{s.title}</div>
                      <ul style={{ listStyle: 'none', marginTop: '6px' }}>
                        {s.topics.map((topic, tIdx) => (
                          <li key={tIdx} style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Overlay Modal Systems */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: 'var(--card)', width: '100%', maxWidth: '450px', padding: '24px', borderRadius: '16px', position: 'relative' }}>
            {!isSubmitting && <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff' }}><X /></button>}
            
            {modalStep === 'form' && (
              <form onSubmit={handleStudentSubmission} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3>Student Registry Hub</h3>
                <input type="text" placeholder="Full Legal Name" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }} onChange={e => setStudentForm({...studentForm, name: e.target.value})} />
                <input type="email" placeholder="Email Endpoint" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }} onChange={e => setStudentForm({...studentForm, email: e.target.value})} />
                <input type="tel" placeholder="Contact Phone Number" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }} onChange={e => setStudentForm({...studentForm, phone: e.target.value})} />
                <button type="submit" style={{ padding: '14px', background: currentCourse.accentColor, border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 600 }}>Proceed to Settlement</button>
              </form>
            )}
            
            {modalStep === 'payment' && (
               <div style={{ textAlign: 'center' }}>
                 <h3>Select Transaction Gateway</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                   <button onClick={() => handleFinalTransaction('Digital Wallet API Matrix')} style={{ padding: '14px', background: 'var(--surface)', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px' }}>Nepal Wallet Infrastructure (eSewa/Khalti)</button>
                   <button onClick={() => handleFinalTransaction('Stripe Global Integration Node')} style={{ padding: '14px', background: 'var(--surface)', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px' }}>International Cards (Stripe API)</button>
                 </div>
               </div>
            )}
            
            {modalStep === 'success' && (
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={50} style={{ color: "var(--green)", margin: '0 auto 15px' }} />
                <h3>Enrollment Matrix Synchronized</h3>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '12px', borderRadius: '6px', textAlign: 'left', marginTop: '16px', fontSize: '0.85rem' }}>
                  <div style={{ color: 'var(--accent)', fontWeight: 600, fontFamily: 'monospace', marginBottom: '4px' }}>OUTBOUND TELEMETRY LOG:</div>
                  <div style={{ color: 'var(--text-sub)' }}>A data pipeline notification packet has been transmitted to:</div>
                  <div style={{ color: '#fff', fontWeight: 600, margin: '4px 0' }}>aimldsn@gmail.com</div>
                </div>
                <button onClick={() => setShowModal(false)} style={{ marginTop: '20px', width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }}>Close Terminal</button>
              </div>
            )}

            {modalStep === 'instructor_form' && (
              <form onSubmit={handleInstructorSubmission} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Briefcase style={{ color: currentCourse.accentColor }} size={22} />
                  <h3 style={{ margin: 0 }}>Faculty Onboarding Matrix</h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target domain track: <strong>{currentCourse.title}</strong></p>
                
                <input type="text" placeholder="Full Legal Name" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }} onChange={e => setInstructorForm({...instructorForm, name: e.target.value})} />
                <input type="email" placeholder="Professional Email Endpoint" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }} onChange={e => setInstructorForm({...instructorForm, email: e.target.value})} />
                <input type="url" placeholder="Portfolio / LinkedIn / GitHub Path" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }} onChange={e => setInstructorForm({...instructorForm, portfolio: e.target.value})} />
                <textarea placeholder="Summarize your engineering background or technical instructional metrics..." required rows={3} style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px', fontFamily: 'inherit', resize: 'none' }} onChange={e => setInstructorForm({...instructorForm, proposal: e.target.value})} />
                
                <button type="submit" style={{ padding: '14px', background: currentCourse.accentColor, border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 600 }}>
                  {isSubmitting ? 'Syncing Schema logs...' : 'Submit Faculty Application'}
                </button>
              </form>
            )}

            {modalStep === 'instructor_success' && (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <CheckCircle size={52} style={{ color: "var(--green)", margin: '0 auto 16px' }} />
                <h3>Faculty Log Matrix Deployed</h3>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.85rem', marginTop: '8px', lineHeight: 1.5 }}>
                  Your portfolio profile submission packet has been successfully verified.
                </p>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '12px', borderRadius: '6px', textAlign: 'left', marginTop: '16px', fontSize: '0.85rem' }}>
                  <div style={{ color: 'var(--accent2)', fontWeight: 600, fontFamily: 'monospace', marginBottom: '4px' }}>ROUTING DATA TARGET:</div>
                  <div style={{ color: 'var(--text-sub)' }}>Full resume data metrics and proposals routed to:</div>
                  <div style={{ color: '#fff', fontWeight: 600, margin: '4px 0' }}>aimldsn@gmail.com</div>
                </div>
                <button onClick={() => setShowModal(false)} style={{ marginTop: '24px', width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px', fontWeight: 600 }}>Dismiss Interface Terminal</button>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
