import React from 'react';
import { ActivePage } from '../types';
import { HomeIcon, SearchIcon, PlusSquareIcon, PlayIcon } from './Icons';

interface BottomNavProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onNewPostClick: () => void;
  userAvatar: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate, onNewPostClick, userAvatar }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 h-14 flex md:hidden justify-around items-center z-50">
      <NavButton Icon={HomeIcon} isActive={activePage === 'feed'} onClick={() => onNavigate('feed')} />
      <NavButton Icon={SearchIcon} isActive={activePage === 'search'} onClick={() => onNavigate('search')} />
      <NavButton Icon={PlusSquareIcon} isActive={false} onClick={onNewPostClick} />
      <NavButton Icon={PlayIcon} isActive={activePage === 'play'} onClick={() => onNavigate('play')} />
      <ProfileNavButton avatar={userAvatar} isActive={activePage === 'profile'} onClick={() => onNavigate('profile')} />
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

interface ProfileNavButtonProps {
    avatar: string;
    isActive: boolean;
    onClick: () => void;
}

const ProfileNavButton: React.FC<ProfileNavButtonProps> = ({ avatar, isActive, onClick }) => (
    <button onClick={onClick} className="w-full h-full flex items-center justify-center p-2.5">
        <div className={`rounded-full p-0.5 transition-all ${isActive ? 'bg-black dark:bg-white' : 'bg-transparent'}`}>
            <img 
                src={avatar} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover" 
            />
        </div>
    </button>
);

export default BottomNav;