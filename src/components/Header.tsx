import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function Header({ route, setRoute }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ai', label: 'MounTech AI' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'school', label: 'Academy' },
    { id: 'datascience', label: 'Data Science' },
    { id: 'community', label: 'Community' },
    { id: 'about', label: 'About' },
  ];

  const handleNav = (id: string) => {
    setRoute({ page: id, courseId: route.courseId });
    if (isOpen) setIsOpen(false);
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'rgba(8, 12, 16, 0.9)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto', padding: '12px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div onClick={() => handleNav('home')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <Logo size={26} />
          <span style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            MOUNTECH SOLUTION <span style={{ color: 'var(--accent)' }}>(MTS)</span>
          </span>
        </div>

        {/* Desktop Navbar Row */}
        <nav className="desktop-only" style={{ display: 'none', gap: '16px' }}>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              style={{ background: 'none', border: 'none', color: route.page === item.id ? 'var(--accent)' : 'var(--text-sub)', fontWeight: 500, padding: '4px 8px' }}>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Icon Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: '#fff' }} className="mobile-only">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed', top: '56px', left: 0, right: 0, bottom: 0,
          background: 'var(--bg)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px',
          zIndex: 999, overflowY: 'auto'
        }}>
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              style={{
                textAlign: 'left', padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '8px', color: route.page === item.id ? 'var(--accent)' : '#fff', fontSize: '1.1rem'
              }}>
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-only { display: flex !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
