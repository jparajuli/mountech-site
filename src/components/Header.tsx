import React, { useState } from 'react';
import Logo from './Logo';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

interface HeaderProps {
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function Header({ route, setRoute }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Sovereign AI", page: "ai" },
    { label: "Disaster AI", page: "disaster" },
    { label: "Consulting", page: "consulting" },
    { label: "Academy (40h)", page: "school" },
    { label: "Data Science", page: "datascience" },
    { label: "Community", page: "community" },
    { label: "About", page: "about" },
  ];

  const handleNavClick = (page: string) => {
    setRoute({ page, courseId: route.courseId });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fbfbfa]/90 backdrop-blur-md border-b border-black/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo Brand Lockup */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left focus:outline-none"
          >
            <Logo size={28} showText={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = route.page === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    isActive 
                      ? 'text-cohere-ink bg-black/[0.05] font-semibold' 
                      : 'text-cohere-slate hover:text-cohere-ink hover:bg-black/[0.03]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Callouts (Pill CTAs) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://mldsnnepal.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-mono text-cohere-slate hover:text-cohere-ink flex items-center gap-1 px-3 py-1.5 transition-colors"
            >
              <span>mldsnnepal.org</span>
              <ArrowUpRight size={12} />
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleNavClick('home');
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="rounded-full px-5 py-2 text-xs font-semibold bg-cohere-ink hover:bg-black text-white shadow-sm transition-all active:scale-95"
            >
              Contact Advisory
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-cohere-ink hover:bg-black/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-black/[0.08] bg-[#fbfbfa] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium ${
                route.page === item.page ? 'bg-black/5 text-cohere-ink font-semibold' : 'text-cohere-slate'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-4 border-t border-black/[0.06] flex flex-col gap-2">
            <a
              href="https://mldsnnepal.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-cohere-slate flex items-center gap-1 px-4 py-2"
            >
              <span>MLDSN Community Hub</span>
              <ArrowUpRight size={13} />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full rounded-full py-2.5 text-xs font-semibold bg-cohere-ink text-white text-center"
            >
              Contact Advisory
            </button>
          </div>
        </div>
      )}
    </header>
  );
}