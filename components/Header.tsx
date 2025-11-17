import React from 'react';
import { HeartIcon, PaperAirplaneIcon } from './Icons';

interface HeaderProps {
    unreadCount: number;
    onNotificationsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ unreadCount, onNotificationsClick }) => {
  return (
    <header className="bg-backgroundDark sticky top-0 z-50 border-b border-borderNeon h-16 w-full">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <div className="flex-shrink-0">
            <h1
              className="
                flex flex-col items-center
                text-3xl md:text-4xl
                font-orbitron font-bold
                text-transparent bg-clip-text
                bg-gradient-to-r from-[#00E5FF] via-[#4cc9ff] to-[#a855f7]
                drop-shadow-[0_0_12px_#00E5FF]
              "
            >
              <span>SocialNino</span>
              <span
                className="
                  mt-1 h-[2px]
                  w-20 md:w-24
                  rounded-full
                  bg-gradient-to-r from-[#00E5FF] to-[#a855f7]
                  shadow-[0_0_10px_#00E5FF]
                "
              />
            </h1>
          </div>
          <div className="flex items-center space-x-5">
             <button onClick={onNotificationsClick} className="relative p-1 group">
              <HeartIcon className="h-8 w-8 text-[#00E5FF] drop-shadow-[0_0_6px_#00E5FF] drop-shadow-[0_0_12px_#00E5FF] group-hover:text-white transition-all duration-300 group-hover:scale-110" />
              {unreadCount > 0 && (
                 <span className="absolute top-1 right-0.5 block h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-backgroundDark animate-pulse"></span>
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