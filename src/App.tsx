import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CoreSolutions from './components/CoreSolutions';
import ApproachSection from './components/ApproachSection';
import ProjectsSection from './components/ProjectsSection';
import TechInnovationSection from './components/TechInnovationSection';
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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172033] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      <Header route={route} setRoute={setRoute} />

      <main className="flex-1">
        {/* Homepage Storytelling Flow (Sections A - H) */}
        {route.page === 'home' && (
          <>
            {/* A. Hero Section */}
            <Hero setRoute={setRoute} />

            {/* B. About MounTech */}
            <About summaryOnly={true} setRoute={setRoute} />

            {/* C. Our Core Expertise */}
            <CoreSolutions
              onSelectSolution={(page, aiTab) => navigate(page, aiTab || 'overview', route.courseId)}
            />

            {/* D. Our Approach */}
            <ApproachSection onExploreServices={() => navigate('services')} />

            {/* E. Projects and Case Studies */}
            <ProjectsSection
              summaryOnly={true}
              onOpenProject={(page, aiTab) => navigate(page, aiTab || 'overview', route.courseId)}
            />

            {/* F. Technology and Innovation */}
            <TechInnovationSection
              onNavigate={(page, aiTab, courseId) =>
                navigate(page, aiTab || 'overview', courseId || route.courseId)
              }
            />

            {/* G. Education & Community */}
            <School summaryOnly={true} route={route} setRoute={setRoute} />
            <Community summaryOnly={true} setRoute={setRoute} />

            {/* H. Collaboration CTA & Contact */}
            <Contact />
          </>
        )}

        {/* Services Unified View (Consulting + Data Science) */}
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

        {/* Individual Course Detail */}
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

        {/* Technology Consulting Page */}
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

      {/* I. Footer */}
      <footer className="bg-[#101828] text-[#94A3B8] text-xs border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
            {/* Brand & Identity */}
            <div className="lg:col-span-2 space-y-4">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="text-left focus:outline-none"
              >
                <Logo size={52} theme="dark" />
              </button>

              <p className="text-[#CBD5E1] text-xs leading-relaxed max-w-sm">
                MounTech Solution advances Applied AI, Enterprise Data Science, Technology Consulting, and Technical Education through Mountech Academy and the MLDSN Nepal ecosystem.
              </p>

              <div className="text-xs text-[#94A3B8] font-mono pt-1">
                Sanepa Heights, Lalitpur · Kathmandu Valley, Nepal
              </div>
            </div>

            {/* Services & Expertise */}
            <div className="space-y-3">
              <div className="font-mono text-white text-xs font-semibold">Expertise</div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button type="button" onClick={() => navigate('school')} className="hover:text-white transition-colors">
                    Mountech Academy
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('datascience')} className="hover:text-white transition-colors">
                    Data Science &amp; Analytics
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('consulting')} className="hover:text-white transition-colors">
                    Technology Consulting
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('ai')} className="hover:text-[#22D3EE] text-[#93C5FD] transition-colors">
                    Research &amp; AI Lab
                  </button>
                </li>
              </ul>
            </div>

            {/* Projects & AI Portfolio */}
            <div className="space-y-3">
              <div className="font-mono text-white text-xs font-semibold">Projects &amp; Pilots</div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button type="button" onClick={() => navigate('ai', 'disaster')} className="hover:text-white transition-colors text-left">
                    Disaster Management AI
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('ai', 'agents')} className="hover:text-white transition-colors text-left">
                    B2B Multi-Agent Workflows
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('ai', 'doc-intel')} className="hover:text-white transition-colors text-left">
                    Document Intelligence &amp; PII
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('ai', 'sovereign')} className="hover:text-white transition-colors text-left">
                    Sovereign AI (R&amp;D Pilot)
                  </button>
                </li>
              </ul>
            </div>

            {/* Ecosystem & Contact */}
            <div className="space-y-3">
              <div className="font-mono text-white text-xs font-semibold">Organization</div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button type="button" onClick={() => navigate('about')} className="hover:text-white transition-colors">
                    About &amp; Founding Architects
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('projects')} className="hover:text-white transition-colors">
                    Projects &amp; Case Studies
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('community')} className="hover:text-white transition-colors">
                    MLDSN Nepal Community
                  </button>
                </li>
                <li>
                  <a
                    href="https://mldsnnepal.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#22D3EE] hover:underline"
                  >
                    <span>mldsnnepal.org</span>
                    <ExternalLink size={11} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
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
