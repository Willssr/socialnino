import React from 'react';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const navItems: { id: ActivePage; label: string }[] = [
    { id: 'feed', label: 'Feed' },
    { id: 'music', label: 'Músicas' },
    { id: 'about', label: 'Sobre' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-3xl font-bold text-indigo-600 cursor-pointer" onClick={() => setActivePage('feed')}>
              SocialNino
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activePage === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu could be implemented here with a hamburger icon */}
            <div className="flex items-baseline space-x-2">
               {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`px-3 py-2 rounded-md text-xs font-medium transition-colors duration-200 ${
                    activePage === item.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;