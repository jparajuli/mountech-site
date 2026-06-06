import React, { useState } from 'react';
import { 
  User, Sliders, CheckCircle, Wallet, 
  CreditCard, X, Globe, ChevronRight, BookOpen, Clock, Mail
} from 'lucide-react';
import { courses, Course } from '../data/courses';

interface SchoolProps {
  summaryOnly?: boolean;
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function School({ summaryOnly, route, setRoute }: SchoolProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<'form' | 'payment' | 'success'>('form');
  const [paymentRegion, setPaymentRegion] = useState<'nepal' | 'global'>('nepal');
  
  const [studentForm, setStudentForm] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const currentCourse = courses.find(c => c.id === route.courseId) || courses[0];

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentForm.name && studentForm.email && studentForm.phone) {
      setModalStep('payment');
    }
  };

  const handleFinalTransaction = async (gatewayName: string) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const transactionRecord = {
      id: `MT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      courseId: currentCourse.id,
      courseTitle: currentCourse.title,
      studentName: studentForm.name,
      studentEmail: studentForm.email,
      studentPhone: studentForm.phone,
      allocatedGateway: gatewayName,
      amountPaid: paymentRegion === 'nepal' ? currentCourse.costLocal : currentCourse.costGlobal
    };

    const existingDbRecords = JSON.parse(localStorage.getItem('mountech_enrollments') || '[]');
    existingDbRecords.push(transactionRecord);
    localStorage.setItem('mountech_enrollments', JSON.stringify(existingDbRecords));

    setIsSubmitting(false);
    setModalStep('success');
  };

  // ──── HOME PREVIEW (TOP 3) ────
  if (summaryOnly) {
    return (
      <section id="school-summary" style={{ padding: '90px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--accent)' }}>MOUNTECH TECHNICAL ACADEMY</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.03em', marginTop: '8px' }}>Active Educational Tracks</h2>
            </div>
            <button onClick={() => setRoute({ page: 'school', courseId: route.courseId })} style={{
              background: 'transparent', border: '1px solid var(--border-hover)', color: 'var(--accent)',
              padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500
            }}>View All Courses & Syllabi →</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {courses.slice(0, 3).map((course) => (
              <div 
                key={course.id} 
                onClick={() => setRoute({ page: 'school', courseId: course.id })} 
                style={{ 
                  background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', 
                  padding: '32px', cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    {course.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#fff' }}>{course.title}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>40-Hour Practical Curriculum</span>
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ──── FULL ACADEMY DASHBOARD VIEW ────
  return (
    <section id="school-full" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)' }}>TRAINING ACADEMY FRAMEWORK</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.04em', marginTop: '8px' }}>Practical Skill Acquisition Tracks</h1>
      </div>

      {/* Tabs list updating the unified route layer instantly */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' }}>
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => setRoute({ page: 'school', courseId: course.id })}
            style={{
              background: route.courseId === course.id ? 'var(--surface)' : 'transparent',
              border: `1px solid ${route.courseId === course.id ? course.accentColor : 'var(--border)'}`,
              color: route.courseId === course.id ? '#fff' : 'var(--text-sub)',
              padding: '12px 20px',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: '0.15s',
              fontSize: '0.85rem'
            }}
          >
            {course.icon} {course.title}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
              <User size={18} style={{ color: currentCourse.accentColor }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>FACULTY LEAD</div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{currentCourse.instructor}</div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '6px' }}>TEACHING METHODOLOGY</div>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: 1.6 }}>{currentCourse.methodology}</p>
            </div>

            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '4px' }}>TUITION FEE STRUCTURE</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <div><span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--green)' }}>{currentCourse.costLocal}</span></div>
                <div style={{ borderLeft: '1px solid var(--border)', height: '24px' }}></div>
                <div><span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent)' }}>{currentCourse.costGlobal}</span></div>
              </div>
            </div>

            <button onClick={() => { setModalStep('form'); setShowModal(true); }} style={{ width: '100%', padding: '14px', background: currentCourse.accentColor, color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Enroll & Initialize Gateway <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} style={{ color: 'var(--green)' }} /> Core Capabilities Acquired
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {currentCourse.learn.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-sub)', lineHeight: 1.5 }}>
                  <CheckCircle size={16} style={{ color: 'var(--green)', marginTop: '2px', flexShrink: 0 }} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={20} style={{ color: currentCourse.accentColor }} /> 40-Hour Practical Curriculum Blueprint
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {currentCourse.syllabus.map((mod, idx) => (
              <div key={idx} style={{ borderLeft: `2px solid ${currentCourse.accentColor}`, paddingLeft: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: currentCourse.accentColor, marginBottom: '4px' }}>{mod.hours}</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>{mod.title}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {mod.topics.map((t, i) => (
                    <li key={i} style={{ color: 'var(--text-sub)', fontSize: '0.85rem' }}>• {t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal system layout */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '32px', position: 'relative' }}>
            {!isSubmitting && <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>}
            
            {modalStep === 'form' && (
              <form onSubmit={handleFormSubmission}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px' }}>Enroller Registry Node</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px' }}>Full Legal Name</label>
                    <input type="text" required value={studentForm.name} onChange={(e) => setStudentForm({...studentForm, name: e.target.value})} style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px' }}>Email Endpoint</label>
                    <input type="email" required value={studentForm.email} onChange={(e) => setStudentForm({...studentForm, email: e.target.value})} style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '6px' }}>Contact Phone</label>
                    <input type="tel" required value={studentForm.phone} onChange={(e) => setStudentForm({...studentForm, phone: e.target.value})} style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff' }} />
                  </div>
                </div>
                <button type="submit" style={{ width: '100%', padding: '14px', background: currentCourse.accentColor, color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>Proceed to Settlement <ChevronRight size={16} /></button>
              </form>
            )}

            {modalStep === 'payment' && (
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px' }}>Secure Settlement Engine</h3>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
                  <button type="button" onClick={() => setPaymentRegion('nepal')} style={{ flex: 1, padding: '10px', background: 'none', border: 'none', borderBottom: `2px solid ${paymentRegion === 'nepal' ? 'var(--green)' : 'transparent'}`, color: paymentRegion === 'nepal' ? '#fff' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer' }}>Nepal Domestic</button>
                  <button type="button" onClick={() => setPaymentRegion('global')} style={{ flex: 1, padding: '10px', background: 'none', border: 'none', borderBottom: `2px solid ${paymentRegion === 'global' ? 'var(--accent)' : 'transparent'}`, color: paymentRegion === 'global' ? '#fff' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer' }}>International</button>
                </div>
                {isSubmitting ? <div style={{ padding: '40px 0', textAlign: 'center' }}><div style={{ fontWeight: 600, color: '#fff' }}>Committing Record Matrix to Persistent LocalDB...</div></div> : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {paymentRegion === 'nepal' ? (
                      <>
                        <button onClick={() => handleFinalTransaction('eSewa API Hub')} style={{ textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--border)', padding: '14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}><Wallet size={18} style={{ color: 'var(--green)' }} /><div><div style={{ fontWeight: 600, color: '#fff' }}>eSewa / Khalti API</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total: {currentCourse.costLocal}</div></div></button>
                        <button onClick={() => handleFinalTransaction('ConnectIPS Node')} style={{ textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--border)', padding: '14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}><CreditCard size={18} style={{ color: 'var(--accent)' }} /><div><div style={{ fontWeight: 600, color: '#fff' }}>connectIPS Interbank</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total: {currentCourse.costLocal}</div></div></button>
                      </>
                    ) : (
                      <button onClick={() => handleFinalTransaction('Stripe Global Merchant')} style={{ textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--border)', padding: '14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}><Globe size={18} style={{ color: 'var(--accent2)' }} /><div><div style={{ fontWeight: 600, color: '#fff' }}>Stripe International</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total: {currentCourse.costGlobal}</div></div></button>
                    )}
                  </div>
                )}
              </div>
            )}

            {modalStep === 'success' && (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <CheckCircle size={48} style={{ color: 'var(--green)', marginBottom: '16px', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>Enrollment Synchronized</h3>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '16px', borderRadius: '8px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '8px', fontSize: '0.85rem', color: '#fff' }}><Mail size={14} style={{ color: 'var(--accent2)', marginTop: '2px' }} /><div><strong>Automated Receipt Dispatched:</strong><br /><span style={{ color: 'var(--green)', fontFamily: "'JetBrains Mono', monospace" }}>{studentForm.email}</span></div></div>
                </div>
                <button onClick={() => setShowModal(false)} style={{ width: '100%', padding: '12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', color: '#fff', fontWeight: 600, cursor: 'pointer', marginTop: '24px' }}>Dismiss Interface Terminal</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
