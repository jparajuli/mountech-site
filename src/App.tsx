import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CoreSolutions from './components/CoreSolutions';
import ProjectsSection from './components/ProjectsSection';
import School from './components/School';
import DataScience from './components/DataScience';
import Contact from './components/Contact';
import AiSolutions, { AiTabType } from './components/AiSolutions';
import Consulting from './components/Consulting';
import Community from './components/Community';
import Logo from './components/Logo';
import { ExternalLink } from 'lucide-react';
import { RouteState } from './types';

export default function App() {
  const [route, setRoute] = useState<RouteState>({
    page: 'home',
    courseId: 'ai-agents',
    aiTab: 'overview',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const titles: Record<string, string> = {
      home: 'MounTech Solution | Engineering Intelligence. Empowering Innovation.',
      about: 'About MounTech Solution | Vision, Principles & Founding Architects',
      services: 'Services & Consulting | Data Science, AI & Modernization | MounTech Solution',
      projects: 'Projects & Applied AI Systems | MounTech Solution',
      school: 'Mountech Academy | 40-Hour Applied Engineering & AI Masterclasses',
      'course-detail': 'Course Syllabus | Mountech Academy',
      datascience: 'Enterprise Data Science & Storage Matrix | MounTech Solution',
      consulting: 'Technology Consulting & Systems Modernization | MounTech Solution',
      ai: 'Research & Innovation Hub | MounTech Solution',
      disaster: 'AI Disaster Management Framework | MounTech Solution',
      community: 'MLDSN Community Hub | Machine Learning & Data Science Nepal',
    };

    document.title =
      titles[route.page] || 'MounTech Solution | Applied AI & Data Science for Nepal';
  }, [route.page, route.courseId, route.aiTab]);

  const navigate = (page: string, aiTab: AiTabType = 'overview', courseId = 'ai-agents') => {
    setRoute({ page, courseId, aiTab });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F1E2E] font-sans antialiased selection:bg-[#0284C7] selection:text-white">
      <Header route={route} setRoute={setRoute} />

      <main className="flex-1">
        {/* Streamlined Non-Redundant Homepage */}
        {route.page === 'home' && (
          <>
            <Hero setRoute={setRoute} />
            <CoreSolutions
              onSelectSolution={(page, aiTab) => navigate(page, aiTab || 'overview', route.courseId)}
            />
            <ProjectsSection
              summaryOnly={true}
              onOpenProject={(page, aiTab) => navigate(page, aiTab || 'overview', route.courseId)}
            />
            <School summaryOnly={true} route={route} setRoute={setRoute} />
            <Community summaryOnly={true} setRoute={setRoute} />
            <About summaryOnly={true} setRoute={setRoute} />
            <Contact />
          </>
        )}

        {/* Services Unified View */}
        {route.page === 'services' && (
          <div>
            <Consulting summaryOnly={false} />
            <DataScience />
            <Contact />
          </div>
        )}

        {/* Projects Full View */}
        {route.page === 'projects' && (
          <div>
            <ProjectsSection
              summaryOnly={false}
              onOpenProject={(page, aiTab) => navigate(page, aiTab || 'overview', route.courseId)}
            />
            <Contact />
          </div>
        )}

        {/* Mountech Academy Catalog */}
        {route.page === 'school' && (
          <div>
            <School route={route} setRoute={setRoute} />
            <Contact />
          </div>
        )}

        {/* Course Detail */}
        {route.page === 'course-detail' && (
          <div>
            <School detailOnly={true} route={route} setRoute={setRoute} />
            <Contact />
          </div>
        )}

        {/* Data Science Page */}
        {route.page === 'datascience' && (
          <div>
            <DataScience />
            <Contact />
          </div>
        )}

        {/* Consulting Page */}
        {route.page === 'consulting' && (
          <div>
            <Consulting summaryOnly={false} />
            <Contact />
          </div>
        )}

        {/* Research & AI Hub */}
        {route.page === 'ai' && (
          <div>
            <AiSolutions summaryOnly={false} initialTab={route.aiTab || 'overview'} />
            <Contact />
          </div>
        )}

        {/* Direct Disaster AI Route */}
        {route.page === 'disaster' && (
          <div>
            <AiSolutions summaryOnly={false} initialTab="disaster" />
            <Contact />
          </div>
        )}

        {/* MLDSN Community Page */}
        {route.page === 'community' && (
          <div>
            <Community summaryOnly={false} setRoute={setRoute} />
            <Contact />
          </div>
        )}

        {/* About Page */}
        {route.page === 'about' && (
          <div>
            <About summaryOnly={false} setRoute={setRoute} />
            <Contact />
          </div>
        )}
      </main>

      {/* Footer matched to Logo Alpine Slate + Sky Cyan + Pine Green */}
      <footer className="bg-[#0B1924] text-[#94A3B8] text-xs border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            <div className="lg:col-span-2 space-y-4">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="text-left focus:outline-none"
              >
                <Logo size={52} theme="dark" />
              </button>

              <p className="text-[#CBD5E1] text-xs leading-relaxed max-w-sm">
                Applied AI, Data Science, Technology Consulting, and Technical Education for Nepal.
              </p>

              <div className="text-xs text-[#94A3B8] font-mono">
                Sanepa Heights, Lalitpur · Kathmandu Valley, Nepal
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-white text-xs font-semibold">Core Focus</div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button type="button" onClick={() => navigate('school')} className="hover:text-[#2EB6E0] transition-colors">
                    Mountech Academy
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('datascience')} className="hover:text-[#2EB6E0] transition-colors">
                    Data Science &amp; Analytics
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('consulting')} className="hover:text-[#2EB6E0] transition-colors">
                    Technology Consulting
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('ai')} className="hover:text-[#4ADE80] text-[#2EB6E0] transition-colors">
                    Research &amp; AI Lab
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-white text-xs font-semibold">AI Initiatives</div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button type="button" onClick={() => navigate('ai', 'disaster')} className="hover:text-[#2EB6E0] transition-colors text-left">
                    Disaster Management AI
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('ai', 'agents')} className="hover:text-[#2EB6E0] transition-colors text-left">
                    B2B Multi-Agent Workflows
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('ai', 'doc-intel')} className="hover:text-[#2EB6E0] transition-colors text-left">
                    Document Intelligence &amp; PII
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('ai', 'sovereign')} className="hover:text-[#4ADE80] transition-colors text-left">
                    Sovereign AI (R&amp;D Pilot)
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-white text-xs font-semibold">Organization</div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button type="button" onClick={() => navigate('about')} className="hover:text-[#2EB6E0] transition-colors">
                    About &amp; Founding Architects
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('projects')} className="hover:text-[#2EB6E0] transition-colors">
                    Projects &amp; Initiatives
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('community')} className="hover:text-[#4ADE80] transition-colors">
                    MLDSN Nepal Community
                  </button>
                </li>
                <li>
                  <a
                    href="https://mldsnnepal.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#4ADE80] hover:underline"
                  >
                    <span>mldsnnepal.org</span>
                    <ExternalLink size={11} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div>© 2026 MounTech Solution (MTS). All rights reserved.</div>
            <div className="flex flex-wrap items-center gap-4 text-[#94A3B8]">
              <a href="mailto:info@mountech.com.np" className="hover:text-white transition-colors">
                info@mountech.com.np
              </a>
              <span aria-hidden="true">·</span>
              <a href="mailto:aimldsn@gmail.com" className="hover:text-white transition-colors">
                aimldsn@gmail.com
              </a>
              <span aria-hidden="true">·</span>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact Desk
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
