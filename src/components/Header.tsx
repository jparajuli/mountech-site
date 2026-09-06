import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Sparkles, Terminal, 
  BookOpen, Shield, Layers, Users, PhoneCall, Search 
} from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
  onOpenSearch?: () => void;
}

export default function Header({ route, setRoute, onOpenSearch }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ai', label: 'AI Solutions', badge: 'Core' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'school', label: 'Academy', badge: '40h' },
    { id: 'datascience', label: 'Data Science' },
    { id: 'community', label: 'Community', badge: 'MLDSN' },
    { id: 'about', label: 'About & Brand' },
  ];

  const handleNav = (id: string) => {
    setRoute({ page: id, courseId: route.courseId });
    if (isOpen) setIsOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#080c10]/95 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/50 py-2.5' 
        : 'bg-[#080c10]/80 backdrop-blur-sm border-b border-white/5 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Brand Logo & Lockup */}
        <button 
          onClick={() => handleNav('home')} 
          className="flex items-center gap-3 text-left group focus:outline-none"
          aria-label="MounTech Solution Home"
        >
          <div className="relative p-1 rounded-lg bg-surface/80 border border-white/10 group-hover:border-accent/40 transition-colors shadow-inner">
            <Logo size={28} animated={true} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-white leading-none">
              <span className="text-base sm:text-lg font-extrabold tracking-[-0.03em]">MOUNTECH</span>
              <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-accent-dim text-accent border border-accent/20">
                MTS
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-wider text-text-muted mt-0.5 hidden sm:inline-block">
              Sovereign AI & Digital Architecture
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface/60 p-1 rounded-full border border-white/8 shadow-inner">
          {navItems.map((item) => {
            const isActive = route.page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-accent text-white shadow-lg shadow-accent/25 font-semibold' 
                    : 'text-text-sub hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {item.badge && !isActive && (
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/10 text-accent font-normal">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Area & Quick Actions */}
        <div className="flex items-center gap-2.5">
          {/* System Status Ping */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-text-sub">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span>Nodes Online</span>
          </div>

          {/* Quick Contact / Consultation Action */}
          <button
            onClick={() => handleNav('contact')}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-accent to-blue-600 hover:from-blue-500 hover:to-accent text-white text-xs font-semibold shadow-md shadow-accent/20 border border-blue-400/30 active:scale-95"
          >
            <span>Initiate Contact</span>
            <ChevronRight size={14} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-surface border border-white/10 text-white hover:text-accent focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] bottom-0 bg-bg/95 backdrop-blur-xl border-t border-white/10 p-5 flex flex-col justify-between overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-text-muted uppercase px-2 mb-3">
              Navigation Index
            </div>
            {navItems.map((item) => {
              const isActive = route.page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent/15 border-accent text-accent font-semibold shadow-sm'
                      : 'bg-surface/70 border-white/5 text-text hover:bg-surface hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-left">{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-accent">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight size={16} className={isActive ? 'text-accent' : 'text-text-muted'} />
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => handleNav('contact')}
              className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-center text-sm shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
            >
              <PhoneCall size={16} />
              <span>Schedule Architecture Consultation</span>
            </button>
            <div className="flex items-center justify-between text-xs font-mono text-text-muted px-2">
              <span>MounTech Solution (MTS)</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green" />
                Active Sync v2.4
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
