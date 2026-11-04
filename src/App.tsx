import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CoreSolutions from './components/CoreSolutions';
import DisasterFramework from './components/DisasterFramework';
import School from './components/School';
import DataScience from './components/DataScience';
import Research from './components/Research';
import Contact from './components/Contact';
import AiSolutions, { AiTabType } from './components/AiSolutions';
import Consulting from './components/Consulting';
import Community from './components/Community';
import About from './components/About';
import Logo from './components/Logo';
import { ExternalLink } from 'lucide-react';
import { RouteState } from './types';

export default function App() {
  const [route, setRoute] = useState<RouteState>({ page: 'home', courseId: 'ai-agents', aiTab: 'overview' });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic SEO Metadata Synchronization for indexing
    const titles: Record<string, string> = {
      home: 'MounTech Solution | Applied AI, Data Science & Technical Education for Nepal',
      school: 'Mountech Academy | 40-Hour Applied Engineering & AI Masterclasses',
      datascience: 'Enterprise Data Science & Storage Matrix | MounTech Solution',
      consulting: 'Technology Consulting & Systems Modernization | MounTech Solution',
      ai: 'AI Solutions & Innovations Hub | MounTech Solution',
      disaster: 'AI Disaster Management Framework | MounTech Solution',
      community: 'MLDSN Community Hub | Machine Learning & Data Science Nepal',
      about: 'Brand Architecture & Leadership | MounTech Solution'
    };

    document.title = titles[route.page] || 'MounTech Solution | Applied AI & Data Science for Nepal';

    // Synchronize Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'Promoting AI Solutions & Capacity Building in Nepal: Bridging the gap between global AI advancements and local implementation by delivering tailored AI education, workforce upskilling, and enterprise solution adoption across Nepal.'
    );

    // Synchronize Meta Keywords for Search Engines
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      'Academy, Data Science, Technology Consulting, AI Solutions, Disaster Management AI, Multi-Agent Workflows, Sovereign AI Pilot, MLDSN Nepal, Kathmandu Tech'
    );
  }, [route.page, route.courseId, route.aiTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfa] text-cohere-text font-sans antialiased selection:bg-cohere-coral selection:text-white">
      {/* Editorial Navigation Header */}
      <Header route={route} setRoute={setRoute} />
      
      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        
        {/* ── HOME LANDING VIEW ── */}
        {route.page === 'home' && (
          <>
            <Hero setRoute={setRoute} />
            <CoreSolutions onSelectSolution={(page) => setRoute({ page, courseId: route.courseId, aiTab: 'overview' })} />
            
            {/* Pillar 1: Academy Spotlight */}
            <School summaryOnly={true} route={route} setRoute={setRoute} />
            
            {/* Pillar 2: Data Science Matrix */}
            <DataScience />
            
            {/* Pillar 3: Technology Consulting */}
            <Consulting summaryOnly={true} onViewFull={() => setRoute({ page: 'consulting', courseId: route.courseId })} />
            
            {/* Pillar 4: AI Solutions & Tools (Disaster AI, Agents, Sovereign AI R&D) */}
            <AiSolutions 
              summaryOnly={true} 
              onViewFull={(tab?: AiTabType) => setRoute({ page: 'ai', courseId: route.courseId, aiTab: tab || 'overview' })} 
            />
            
            {/* Pillar 5: Community Hub (MLDSN Nepal) */}
            <Community summaryOnly={true} setRoute={setRoute} />
            
            {/* Corporate Profile & Founders */}
            <About summaryOnly={true} setRoute={setRoute} />
            
            {/* Enterprise Inquiry & Contact */}
            <Contact />
          </>
        )}

        {/* ── MOUNTECH TECH ACADEMY CATALOG ── */}
        {route.page === 'school' && (
          <div>
            <School route={route} setRoute={setRoute} />
            <Contact />
          </div>
        )}

        {/* ── DEDICATED INDIVIDUAL COURSE DETAIL PAGE ── */}
        {route.page === 'course-detail' && (
          <div>
            <School detailOnly={true} route={route} setRoute={setRoute} />
            <Contact />
          </div>
        )}

        {/* ── DATA SCIENCE & INTELLIGENCE MATRIX ── */}
        {route.page === 'datascience' && (
          <div>
            <DataScience />
            <Contact />
          </div>
        )}

        {/* ── SPECIALIZED ADVISORY & CONSULTING ── */}
        {route.page === 'consulting' && (
          <div>
            <Consulting summaryOnly={false} />
            <Contact />
          </div>
        )}

        {/* ── AI SOLUTIONS & INNOVATIONS HUB (Houses Disaster AI, Sovereign AI R&D, Agents, Doc Intel) ── */}
        {route.page === 'ai' && (
          <div>
            <AiSolutions 
              summaryOnly={false} 
              initialTab={route.aiTab || 'overview'} 
            />
            <Contact />
          </div>
        )}

        {/* ── SEAMLESS ROUTE FOR DISASTER AI (DIRECTLY NESTED WITHIN AI HEADING) ── */}
        {route.page === 'disaster' && (
          <div>
            <AiSolutions 
              summaryOnly={false} 
              initialTab="disaster" 
            />
            <Contact />
          </div>
        )}

        {/* ── MLDSN NEPAL COMMUNITY HUB ── */}
        {route.page === 'community' && (
          <div>
            <Community summaryOnly={false} setRoute={setRoute} />
            <Contact />
          </div>
        )}

        {/* ── CORPORATE PROFILE & BRAND ARCHITECTURE ── */}
        {route.page === 'about' && (
          <div>
            <About summaryOnly={false} setRoute={setRoute} />
            <Contact />
          </div>
        )}

      </main>

      {/* ── COHERE-STYLE NEAR-BLACK ENTERPRISE FOOTER ── */}
      <footer className="bg-[#111116] text-[#93939f] text-xs border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
            
            {/* Column 1: Brand & Identity */}
            <div className="lg:col-span-2 space-y-4">
              <button 
                onClick={() => setRoute({ page: 'home', courseId: 'ai-agents', aiTab: 'overview' })}
                className="text-left focus:outline-none"
              >
                <Logo size={36} showText={true} theme="dark" />
              </button>
              
              <p className="text-white/60 text-xs leading-relaxed max-w-sm">
                MounTech Solution (MTS) delivers applied AI, enterprise data science, technical consulting, and professional masterclasses through Mountech Academy, backed by the nationwide MLDSN community.
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-mono text-[11px]">
                  <span>Kathmandu Head Office · Sanepa Heights, Lalitpur</span>
                </span>
              </div>
            </div>

            {/* Column 2: 5 Core Focus Areas */}
            <div className="space-y-3">
              <div className="font-mono text-white text-[11px] font-bold uppercase tracking-wider">
                Core Focus Areas
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'school', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    Mountech Academy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'datascience', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    Enterprise Data Science
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'consulting', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    Technology Consulting
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents', aiTab: 'overview' })}
                    className="hover:text-white transition-colors text-cohere-coral"
                  >
                    AI Solutions & Tools
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'community', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    MLDSN Community Hub
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: AI Innovations */}
            <div className="space-y-3">
              <div className="font-mono text-white text-[11px] font-bold uppercase tracking-wider">
                AI Portfolio
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents', aiTab: 'disaster' })}
                    className="hover:text-white transition-colors text-left"
                  >
                    Disaster Management AI
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents', aiTab: 'agents' })}
                    className="hover:text-white transition-colors text-left"
                  >
                    B2B Multi-Agent Workflows
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents', aiTab: 'doc-intel' })}
                    className="hover:text-white transition-colors text-left"
                  >
                    Document Intelligence & PII
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents', aiTab: 'sovereign' })}
                    className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                  >
                    <span>Sovereign AI</span>
                    <span className="text-[10px] text-cohere-coral font-mono px-1.5 py-0.2 rounded bg-cohere-coral/10">R&D Pilot</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Institutional & Community */}
            <div className="space-y-3">
              <div className="font-mono text-white text-[11px] font-bold uppercase tracking-wider">
                Ecosystem
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'about', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    Founding Architects & Team
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'about', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    Brand Architecture
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'community', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    MLDSN Nepal Non-Profit
                  </button>
                </li>
                <li>
                  <a 
                    href="https://mldsnnepal.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cohere-teal hover:underline"
                  >
                    <span>mldsnnepal.org</span>
                    <ExternalLink size={10} />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono">
            <div>
              © 2026 MounTech Solution (MTS). All systems rights reserved.
            </div>
            <div className="flex items-center gap-4 text-white/50">
              <button 
                onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents', aiTab: 'sovereign' })}
                className="hover:text-white transition-colors"
              >
                Sovereign AI Pilot
              </button>
              <span>•</span>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact Advisory
              </a>
              <span>•</span>
              <a href="mailto:info@mountech.com.np" className="hover:text-white transition-colors">
                info@mountech.com.np
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
