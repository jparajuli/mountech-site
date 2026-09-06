import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustSignals from './components/TrustSignals';
import CoreSolutions from './components/CoreSolutions';
import DisasterFramework from './components/DisasterFramework';
import School from './components/School';
import DataScience from './components/DataScience';
import Research from './components/Research';
import Contact from './components/Contact';
import AiSolutions from './components/AiSolutions';
import Consulting from './components/Consulting';
import Community from './components/Community';
import About from './components/About';
import Logo from './components/Logo';
import { ExternalLink } from 'lucide-react';
import { RouteState } from './types';

export default function App() {
  const [route, setRoute] = useState<RouteState>({ page: 'home', courseId: 'ai-agents' });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic SEO Metadata Synchronization for indexing
    const titles: Record<string, string> = {
      home: 'MounTech Solutions | Applied AI & Data Science Infrastructure for Nepal',
      ai: 'Sovereign AI Infrastructure | MounTech Solutions',
      disaster: 'AI Disaster Management Framework | MounTech Solutions',
      consulting: 'Enterprise AI Consulting & Multi-Agent Workflows | MounTech',
      school: 'Mountech Academy | Applied AI & Transformers Masterclasses',
      datascience: 'Data Science & Intelligence Matrix | MounTech',
      community: 'MLDSN Community Hub | Machine Learning & Data Science Nepal',
      about: 'Brand Architecture & Leadership | MounTech Solutions'
    };

    document.title = titles[route.page] || 'MounTech Solutions | Applied AI for Nepal';

    // Synchronize Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      'content',
      'Applied AI & Data Science Infrastructure for Nepal: sovereign LLMs, enterprise multi-agent workflows, corporate upskilling, and AI disaster management framework.'
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
      'Data Science, Sovereign AI, Disaster Management Nepal, Applied AI Infrastructure, Multi-Agent Workflows, Corporate Upskilling, Nepal Hydroelectric Compute, MLDSN'
    );
  }, [route.page, route.courseId]);

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
            <TrustSignals />
            <CoreSolutions onSelectSolution={(page) => setRoute({ page, courseId: route.courseId })} />
            <DisasterFramework />
            <About summaryOnly={true} setRoute={setRoute} />
            <AiSolutions summaryOnly={true} onViewFull={() => setRoute({ page: 'ai', courseId: route.courseId })} />
            <Consulting summaryOnly={true} onViewFull={() => setRoute({ page: 'consulting', courseId: route.courseId })} />
            <School summaryOnly={true} route={route} setRoute={setRoute} />
            <DataScience />
            <Community summaryOnly={true} setRoute={setRoute} />
            <Research />
            <Contact />
          </>
        )}

        {/* ── FEATURED INITIATIVE: DISASTER FRAMEWORK ── */}
        {route.page === 'disaster' && (
          <div>
            <DisasterFramework />
            <Contact />
          </div>
        )}

        {/* ── SOVEREIGN AI LAB & BLUEPRINTS ── */}
        {route.page === 'ai' && (
          <div>
            <AiSolutions summaryOnly={false} />
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
                onClick={() => setRoute({ page: 'home', courseId: 'ai-agents' })}
                className="text-left focus:outline-none"
              >
                <Logo size={36} showText={true} theme="dark" />
              </button>
              
              <p className="text-white/60 text-xs leading-relaxed max-w-sm">
                MounTech Solution (MTS) engineers multi-agent execution graphs, localized LLM inferencing fabrics, and sovereign cloud architectures with zero data leakage.
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cohere-teal animate-pulse" />
                  <span>Kathmandu Cluster: 99.99% Nominal</span>
                </span>
              </div>
            </div>

            {/* Column 2: Capabilities */}
            <div className="space-y-3">
              <div className="font-mono text-white text-[11px] font-bold uppercase tracking-wider">
                Platforms
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    Sovereign AI Systems
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    Project Alpine Blueprint
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'consulting', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    Enterprise Advisory
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'datascience', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    Data Science Matrix
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Academy Tracks */}
            <div className="space-y-3">
              <div className="font-mono text-white text-[11px] font-bold uppercase tracking-wider">
                Academy (40h)
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'course-detail', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors text-left"
                  >
                    Agentic AI Systems
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'course-detail', courseId: 'generative-ai-transformers' })}
                    className="hover:text-white transition-colors text-left"
                  >
                    Transformer Models
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'course-detail', courseId: 'sovereign-defense' })}
                    className="hover:text-white transition-colors text-left"
                  >
                    Zero-Trust Cloud Mesh
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'school', courseId: 'ai-agents' })}
                    className="text-cohere-coral hover:underline text-left font-medium"
                  >
                    View All Masterclasses →
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Institutional */}
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
                    Brand Architecture
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'about', courseId: 'ai-agents' })}
                    className="hover:text-white transition-colors"
                  >
                    Founding Architects
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
              © 2026 MounTech Solution (MTS). All sovereign system rights reserved.
            </div>
            <div className="flex items-center gap-4 text-white/50">
              <span>Zero External Cloud Leaks</span>
              <span>•</span>
              <a href="#contact" className="hover:text-white transition-colors">
                Security Disclosure
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