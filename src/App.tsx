import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import School from './components/School';
import DataScience from './components/DataScience';
import Research from './components/Research';
import Contact from './components/Contact';
import About from './components/About';
import AiSolutions from './components/AiSolutions';
import Team from './components/Team';
import Consulting from './components/Consulting';

export default function App() {
  // Unified state configuration framework
  const [route, setRoute] = useState({ page: 'home', courseId: 'ai-agents' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.page]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header route={route} setRoute={setRoute} />
      
      <main style={{ flex: 1 }}>
        {route.page === 'home' && (
          <>
            <Hero />
            <About summaryOnly={true} />
            <AiSolutions summaryOnly={true} onViewFull={() => setRoute({ page: 'ai', courseId: route.courseId })} />
            <Consulting summaryOnly={true} onViewFull={() => setRoute({ page: 'consulting', courseId: route.courseId })} />
            
            <School 
              summaryOnly={true} 
              route={route}
              setRoute={setRoute}
            />
            
            <DataScience />
            <Team summaryOnly={true} onViewFull={() => setRoute({ page: 'team', courseId: route.courseId })} />
            <Research />
            <Contact />
          </>
        )}

        {route.page === 'ai' && (
          <div>
            <AiSolutions summaryOnly={false} />
            <Contact />
          </div>
        )}

        {route.page === 'consulting' && (
          <div>
            <Consulting summaryOnly={false} />
            <Contact />
          </div>
        )}

        {route.page === 'school' && (
          <div>
            <School 
              summaryOnly={false} 
              route={route}
              setRoute={setRoute}
            />
            <Contact />
          </div>
        )}

        {route.page === 'datascience' && (
          <div>
            <DataScience />
            <Contact />
          </div>
        )}

        {route.page === 'about' && (
          <div>
            <About summaryOnly={false} />
            <Contact />
          </div>
        )}

        {route.page === 'team' && (
          <div>
            <Team summaryOnly={false} />
            <Contact />
          </div>
        )}
      </main>

      <footer style={{
        padding: '24px',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>© 2026 MounTech Solutions Ecosystem. All architecture clusters verified.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--green)' }}></span>
            Active Sync: Connected
          </div>
        </div>
      </footer>
    </div>
  );
}
