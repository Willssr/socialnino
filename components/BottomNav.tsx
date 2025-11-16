import React from 'react';
import { ActivePage } from '../types';
import { HomeIcon, SearchIcon, PlusSquareIcon, DownloadIcon } from './Icons';

interface BottomNavProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onNewPostClick: () => void;
  userAvatar: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate, onNewPostClick, userAvatar }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-backgroundLight/80 backdrop-blur-sm border-t border-borderNeon shadow-[0_-5px_20px_-5px_rgba(123,47,247,0.2)] h-16 flex md:hidden justify-around items-center z-50">
      <NavButton Icon={HomeIcon} isActive={activePage === 'feed'} onClick={() => onNavigate('feed')} />
      <NavButton Icon={SearchIcon} isActive={activePage === 'search'} onClick={() => onNavigate('search')} />
      <NavButton Icon={PlusSquareIcon} isActive={false} onClick={onNewPostClick} special={true} />
      <NavButton Icon={DownloadIcon} isActive={activePage === 'download'} onClick={() => onNavigate('download')} />
      <ProfileNavButton avatar={userAvatar} isActive={activePage === 'profile'} onClick={() => onNavigate('profile')} />
    </nav>
  );
};

interface NavButtonProps {
    Icon: React.ElementType;
    isActive: boolean;
    onClick: () => void;
    special?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ Icon, isActive, onClick, special }) => (
    <button onClick={onClick} className="text-textLight w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out group">
        {special ? (
             <div className="p-2 rounded-lg bg-primary/80 group-hover:bg-primary transition-all duration-300 shadow-glow-primary group-hover:scale-110">
                <Icon className="w-8 h-8" />
             </div>
        ) : (
            <Icon 
                className={`w-8 h-8 transition-all duration-300 ${isActive ? 'text-primary drop-shadow-[0_0_8px_#7B2FF7]' : 'text-textDark group-hover:text-textLight'}`} 
                solid={isActive} 
            />
        )}
    </button>
);

interface ProfileNavButtonProps {
    avatar: string;
    isActive: boolean;
    onClick: () => void;
}

const ProfileNavButton: React.FC<ProfileNavButtonProps> = ({ avatar, isActive, onClick }) => (
    <button onClick={onClick} className="w-full h-full flex items-center justify-center p-3.5">
        <div className={`rounded-full p-0.5 transition-all duration-300 ${isActive ? 'bg-primary shadow-glow-primary' : 'bg-transparent'}`}>
            <img 
                src={avatar} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover" 
            />
        </div>
    </button>
);

export default BottomNav;