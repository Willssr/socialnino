
import React from 'react';
import { ActivePage } from '../types';
import { HomeIcon, MusicNoteIcon, InformationCircleIcon } from './Icons';

interface BottomNavProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'feed', label: 'Feed', icon: HomeIcon },
    { id: 'music', label: 'Músicas', icon: MusicNoteIcon },
    { id: 'about', label: 'Sobre', icon: InformationCircleIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200/80 h-16 flex md:hidden justify-around items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id as ActivePage)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
              isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-500'
            }`}
          >
            <Icon className="w-7 h-7" solid={isActive} />
            <span className={`text-xs mt-1 font-semibold ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
