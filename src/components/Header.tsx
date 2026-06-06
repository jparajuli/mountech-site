import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  route: { page: string; courseId: string };
  setRoute: (route: { page: string; courseId: string }) => void;
}

export default function Header({ route, setRoute }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ai', label: 'MounTech AI' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'school', label: 'Academy' },
    { id: 'datascience', label: 'Data Science' },
    { id: 'about', label: 'Identity' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(8, 12, 16, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div onClick={() => setRoute({ page: 'home', courseId: route.courseId })} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <Logo size={28} />
          <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            MOUNTECH<span style={{ color: 'var(--accent)' }}>.NP</span>
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '18px', fontSize: '0.85rem', fontWeight: 500 }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setRoute({ page: item.id, courseId: route.courseId })}
              style={{
                background: 'none',
                border: 'none',
                color: route.page === item.id ? 'var(--accent)' : 'var(--text-sub)',
                cursor: 'pointer',
                transition: '0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
