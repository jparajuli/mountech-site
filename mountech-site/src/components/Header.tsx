import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  route: { page: string; courseId: string; aiTab?: string };
  setRoute: (route: { page: string; courseId: string; aiTab?: 'overview' | 'disaster' | 'sovereign' | 'agents' | 'doc-intel' }) => void;
}

export default function Header({ route, setRoute }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'About', page: 'about', activePages: ['about'] },
    { label: 'Services', page: 'services', activePages: ['services', 'datascience', 'consulting'] },
    { label: 'Research', page: 'ai', activePages: ['ai', 'disaster'] },
    { label: 'Projects', page: 'projects', activePages: ['projects'] },
    { label: 'Education', page: 'school', activePages: ['school', 'course-detail', 'community'] },
  ];

  const handleNavClick = (page: string) => {
    setRoute({ page, courseId: route.courseId || 'ai-agents', aiTab: 'overview' });
    setMobileMenuOpen(false);
  };

  const handleCollaborateClick = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleNavClick('home');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-[#E2E8F0] shadow-subtle'
          : 'bg-white/95 backdrop-blur-sm border-[#E2E8F0]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none shrink-0"
            aria-label="MounTech Solution Home"
          >
            <Logo size={42} />
          </button>

          {/* Zone 2: 5 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7" aria-label="Primary navigation">
            {navItems.map((item) => {
              const isActive = item.activePages.includes(route.page);
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => handleNavClick(item.page)}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#0284C7] font-semibold'
                      : 'text-[#5A6D7E] hover:text-[#0F1E2E]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#2EB6E0] to-[#15803D] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              type="button"
              onClick={handleCollaborateClick}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#15803D] hover:bg-[#166534] text-white shadow-subtle transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Let&apos;s Collaborate</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Trigger */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-h-[44px] min-w-[44px] rounded-lg text-[#0F1E2E] hover:bg-[#F8FAFC] flex items-center justify-center"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-elevated">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              route.page === 'home' ? 'bg-[#F0F9FF] text-[#0284C7] font-semibold' : 'text-[#334155]'
            }`}
          >
            Home
          </button>
          {navItems.map((item) => {
            const isActive = item.activePages.includes(route.page);
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavClick(item.page)}
                className={`block w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-[#F0F9FF] text-[#0284C7] font-semibold' : 'text-[#334155]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleNavClick('community')}
            className={`block w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              route.page === 'community' ? 'bg-[#F0FDF4] text-[#15803D] font-semibold' : 'text-[#334155]'
            }`}
          >
            MLDSN Community
          </button>

          <div className="pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={handleCollaborateClick}
              className="w-full py-3 px-4 rounded-lg text-sm font-semibold bg-[#15803D] hover:bg-[#166534] text-white text-center flex items-center justify-center gap-2"
            >
              <span>Let&apos;s Collaborate</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
