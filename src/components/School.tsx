import React, { useState } from 'react';
import { 
  User, Sliders, CheckCircle, Wallet, CreditCard, 
  X, Globe, ChevronRight, BookOpen, Mail, Search 
} from 'lucide-react';
import { courses } from '../data/courses';

interface SchoolProps {
  summaryOnly?: boolean;
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function School({ summaryOnly, route, setRoute }: SchoolProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'form' | 'payment' | 'success'>('form');
  const [paymentRegion, setPaymentRegion] = useState<'nepal' | 'global'>('nepal');
  const [studentForm, setStudentForm] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Real-time search index state
  const [searchQuery, setSearchQuery] = useState('');

  // Comprehensive deep-search filtration logic
  const filteredCourses = courses.filter(course => {
    const query = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query) ||
      course.learn.some(item => item.toLowerCase().includes(query)) ||
      course.syllabus.some(mod => 
        mod.title.toLowerCase().includes(query) || 
        mod.topics.some(t => t.toLowerCase().includes(query))
      )
    );
  });

  // Safe fallback routing if the currently active course gets filtered out
  const currentCourse = filteredCourses.find(c => c.id === route.courseId) || filteredCourses[0];

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setModalStep('payment');
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
            <button onClick={() => setRoute({ page: 'school', courseId: route.courseId })} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--accent)', padding: '8px 16px', borderRadius: '6px' }}>View All →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {courses.slice(0, 3).map(c => (
              <div key={c.id} onClick={() => setRoute({ page: 'school', courseId: c.id })} style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{c.icon} <div><h3 style={{ fontSize: '1rem' }}>{c.title}</h3><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>40 Hours</p></div></div>
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
        <h1 style={{ marginTop: '8px' }}>Practical Skill Acquisition Tracks</h1>
      </div>

      {/* ── CRYPTOGRAPHIC SEARCH BAR ENGINE ── */}
      <div style={{ maxWidth: '500px', margin: '0 auto 40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
          <Search size={18} />
        </div>
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search courses, instructors, technologies or topics..." 
          style={{
            width: '100%',
            padding: '14px 16px 14px 48px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '0.95rem',
            outline: 'none',
            transition: '0.2s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            style={{ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {filteredCourses.length === 0 ? (
        /* ── ZERO RESULTS STATE ── */
        <div style={{ textAlign: 'center', padding: '64px 20px', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <Search size={36} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>No Structural Configurations Found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
            Your query sequence "{searchQuery}" did not map onto any active data variables within our 40-hour syllabi index.
          </p>
        </div>
      ) : (
        /* ── INTERACTIVE COURSE MATRIX CANVAS ── */
        <>
          {/* Horizontal Scrollable Navigation Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '10px', WebkitOverflowScrolling: 'touch' }}>
            {filteredCourses.map(c => (
              <button key={c.id} onClick={() => setRoute({ page: 'school', courseId: c.id })}
                style={{ 
                  flexShrink: 0, padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500,
                  background: route.courseId === c.id ? 'var(--surface)' : 'transparent',
                  border: `1px solid ${route.courseId === c.id ? c.accentColor : 'var(--border)'}`,
                  color: route.courseId === c.id ? '#fff' : 'var(--text-sub)'
                }}>{c.title}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
            {/* Left Column: Metrics & Targets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>FACULTY ACCREDITATION</span>
                  <div style={{ fontWeight: 600, marginTop: '4px' }}>{currentCourse.instructor}</div>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>METHODOLOGY</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)', marginTop: '4px', lineHeight: 1.6 }}>{currentCourse.methodology}</p>
                </div>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between' }}>
                  <div><span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--green)' }}>{currentCourse.costLocal}</span></div>
                  <div style={{ borderLeft: '1px solid var(--border)' }}></div>
                  <div><span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)' }}>{currentCourse.costGlobal}</span></div>
                </div>
                <button onClick={() => { setModalStep('form'); setShowModal(true); }} style={{ width: '100%', padding: '14px', background: currentCourse.accentColor, border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600 }}>Enroll & Secure Node Space</button>
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

            {/* Right Column: Dynamic 40-Hour Timelines */}
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
        </>
      )}

      {/* Transaction Entry Form Overlay Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: 'var(--card)', width: '100%', maxWidth: '450px', padding: '24px', borderRadius: '16px', position: 'relative' }}>
            {!isSubmitting && <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff' }}><X /></button>}
            
            {modalStep === 'form' && (
              <form onSubmit={handleFormSubmission} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3>Course Registry</h3>
                <input type="text" placeholder="Name" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }} onChange={e => setStudentForm({...studentForm, name: e.target.value})} />
                <input type="email" placeholder="Email" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }} onChange={e => setStudentForm({...studentForm, email: e.target.value})} />
                <input type="tel" placeholder="Phone" required style={{ padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }} onChange={e => setStudentForm({...studentForm, phone: e.target.value})} />
                <button type="submit" style={{ padding: '14px', background: currentCourse.accentColor, border: 'none', borderRadius: '6px', color: '#fff', fontWeight: 600 }}>Next Step</button>
              </form>
            )}
            
            {modalStep === 'payment' && (
               <div style={{ textAlign: 'center' }}>
                 <h3>Select Gateway</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                   <button onClick={() => handleFinalTransaction('Digital Wallet')} style={{ padding: '14px', background: 'var(--surface)', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px' }}>Nepal Wallet (eSewa/Khalti)</button>
                   <button onClick={() => handleFinalTransaction('ConnectIPS')} style={{ padding: '14px', background: 'var(--surface)', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px' }}>connectIPS Interbank Matrix</button>
                   <button onClick={() => handleFinalTransaction('Stripe')} style={{ padding: '14px', background: 'var(--surface)', border: '1px solid var(--border)', color: '#fff', borderRadius: '8px' }}>International (Stripe)</button>
                 </div>
               </div>
            )}
            
            {modalStep === 'success' && (
              <div style={{ textAlign: 'center' }}>
                <CheckCircle size={50} style={{ color: "var(--green)", margin: '0 auto 15px' }} />
                <h3>Enrollment Sync Successful</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px' }}>Verification dispatched to: {studentForm.email}</p>
                <button onClick={() => setShowModal(false)} style={{ marginTop: '20px', width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px' }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
