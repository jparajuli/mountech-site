import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import School from './components/School';
import DataScience from './components/DataScience';
import Research from './components/Research';
import Contact from './components/Contact';
import AiSolutions from './components/AiSolutions';
import Consulting from './components/Consulting';
import Community from './components/Community';
import About from './components/About';
import Logo from './components/Logo';
import { Activity, ShieldCheck, Heart, ExternalLink, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [route, setRoute] = useState({ page: 'home', courseId: 'ai-agents' });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route.page, route.courseId]);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text antialiased selection:bg-accent selection:text-white">
      {/* Primary Sticky Nav Header */}
      <Header route={route} setRoute={setRoute} />
      
      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        
        {/* ── HOME LANDING VIEW (SUMMARY MESH) ── */}
        {route.page === 'home' && (
          <>
            <Hero setRoute={setRoute} />
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

      {/* ── HIGH-TECH CORPORATE FOOTER ── */}
      <footer className="bg-[#05080c] border-t border-white/10 text-text-muted text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            
            {/* Column 1: Brand & Identity */}
            <div className="lg:col-span-2 space-y-4">
              <div 
                onClick={() => setRoute({ page: 'home', courseId: 'ai-agents' })}
                className="inline-flex cursor-pointer"
              >
                <Logo size={42} />
              </div>
              <p className="text-text-sub text-xs leading-relaxed max-w-sm">
                MounTech Solution (MTS) is a sovereign technology engineering firm architecting multi-agent execution graphs, localized AI inferencing fabrics, and resilient cloud foundations.
              </p>
              
              <div className="flex items-center gap-3 pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green/10 border border-green/20 text-green font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                  <span>KTM Cluster: 99.99% Nominal</span>
                </span>
                <span className="font-mono text-text-muted text-[11px]">TLS 1.3 Hardened</span>
              </div>
            </div>

            {/* Column 2: Systems & Blueprints */}
            <div className="space-y-3">
              <div className="font-mono text-white text-xs font-bold uppercase tracking-wider">
                Capabilities
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents' })}
                    className="hover:text-accent transition-colors"
                  >
                    Sovereign AI Systems
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'ai', courseId: 'ai-agents' })}
                    className="hover:text-accent transition-colors"
                  >
                    Project Alpine Blueprint
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'consulting', courseId: 'ai-agents' })}
                    className="hover:text-accent transition-colors"
                  >
                    Transformation Advisory
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'datascience', courseId: 'ai-agents' })}
                    className="hover:text-accent transition-colors"
                  >
                    Data Science Matrix
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Academy Tracks */}
            <div className="space-y-3">
              <div className="font-mono text-white text-xs font-bold uppercase tracking-wider">
                MTS Academy (40h)
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'course-detail', courseId: 'ai-agents' })}
                    className="hover:text-accent transition-colors text-left"
                  >
                    Agentic AI Systems
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'course-detail', courseId: 'generative-ai-transformers' })}
                    className="hover:text-accent transition-colors text-left"
                  >
                    Transformer Architectures
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'course-detail', courseId: 'sovereign-defense' })}
                    className="hover:text-accent transition-colors text-left"
                  >
                    Infrastructure Defense
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'school', courseId: 'ai-agents' })}
                    className="text-accent font-semibold hover:underline text-left"
                  >
                    View All 10+ Specializations →
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Institutional & Alliance */}
            <div className="space-y-3">
              <div className="font-mono text-white text-xs font-bold uppercase tracking-wider">
                Ecosystem
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'about', courseId: 'ai-agents' })}
                    className="hover:text-accent transition-colors"
                  >
                    Corporate Architecture
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'about', courseId: 'ai-agents' })}
                    className="hover:text-accent transition-colors"
                  >
                    Founding Architects
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setRoute({ page: 'community', courseId: 'ai-agents' })}
                    className="hover:text-accent transition-colors"
                  >
                    MLDSN Nepal Non-Profit
                  </button>
                </li>
                <li>
                  <a 
                    href="https://mldsnnepal.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-green hover:underline"
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
              © 2026 MounTech Solution (MTS). "Summiting AI. Securing the Foundations." All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-text-muted">
              <span>Sovereign Local Data Guarantee</span>
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
