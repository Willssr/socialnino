import React from 'react';
import { ActivePage } from '../types';
import { HomeIcon, UserIcon, MusicNoteIcon, GameControllerIcon, SearchIcon, PlusSquareIcon } from './Icons';

interface BottomNavProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onNewPostClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate, onNewPostClick }) => {
  const navItems = [
    { id: 'feed', icon: HomeIcon },
    { id: 'search', icon: SearchIcon },
    { id: 'play', icon: GameControllerIcon },
    { id: 'music', icon: MusicNoteIcon },
    { id: 'profile', icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 h-14 flex md:hidden justify-around items-center z-50">
      {navItems.slice(0, 2).map(item => (
        <NavButton
          key={item.id}
          Icon={item.icon}
          isActive={activePage === item.id}
          onClick={() => onNavigate(item.id as ActivePage)}
        />
      ))}

      <button onClick={onNewPostClick} className="text-black dark:text-white">
        <PlusSquareIcon className="w-7 h-7" />
      </button>
      
      {navItems.slice(2).map(item => (
        <NavButton
          key={item.id}
          Icon={item.icon}
          isActive={activePage === item.id}
          onClick={() => onNavigate(item.id as ActivePage)}
        />
      ))}
    </nav>
  );
};

interface NavButtonProps {
    Icon: React.ElementType;
    isActive: boolean;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ Icon, isActive, onClick }) => (
    <button onClick={onClick} className="text-black dark:text-white w-full h-full flex items-center justify-center">
        <Icon className="w-7 h-7" solid={isActive} />
    </button>
);

export default BottomNav;