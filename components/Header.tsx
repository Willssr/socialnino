import React from 'react';
import { HeartIcon, PaperAirplaneIcon } from './Icons';

interface HeaderProps {
    unreadCount: number;
    onNotificationsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ unreadCount, onNotificationsClick }) => {
  return (
    <header className="bg-backgroundLight sticky top-0 z-50 border-b border-borderNeon shadow-lg shadow-primary/10 h-16">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <div className="flex-shrink-0">
            <span className="font-orbitron text-4xl text-gradient-neon tracking-wider">
              SocialNino
            </span>
          </div>
          <div className="flex items-center space-x-5">
             <button onClick={onNotificationsClick} className="relative p-1 group">
              <HeartIcon className="h-8 w-8 text-accent group-hover:text-white transition-all duration-300 group-hover:scale-110" />
              {unreadCount > 0 && (
                 <span className="absolute top-1 right-0.5 block h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-backgroundLight animate-pulse"></span>
              )}
            </button>
            <button className="p-1 group">
                <PaperAirplaneIcon className="h-8 w-8 text-secondary -rotate-12 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
            </button>
          </div>
      </div>
    </header>
  );
};

export default Header;