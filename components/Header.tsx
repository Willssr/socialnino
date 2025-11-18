import React, { useState, useEffect } from 'react';
import { HeartIcon, PaperAirplaneIcon } from './Icons';
import { db } from '../services/firebase';
import { ref, onValue, off } from 'firebase/database';

// Styled Logo Icon based on the brand image (Neon Profile)
const BrandLogo = ({ className }: { className?: string }) => (
    <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
    >
        <path 
            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
        <path 
            d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
    </svg>
);

interface HeaderProps {
    unreadCount: number;
    onNotificationsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ unreadCount, onNotificationsClick }) => {
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
      const onlineUsersRef = ref(db, 'onlineUsers');
      
      const callback = onValue(onlineUsersRef, (snapshot) => {
          if (snapshot.exists()) {
              setOnlineCount(snapshot.size);
          } else {
              setOnlineCount(0);
          }
      });

      // Cleanup listener on component unmount
      return () => off(onlineUsersRef, 'value', callback);
  }, []);

  return (
    <header className="bg-backgroundDark sticky top-0 z-50 border-b border-borderNeon h-16 w-full shadow-[0_4px_20px_-10px_rgba(0,229,255,0.3)]">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            {/* Logo Container */}
            <div className="relative flex items-center justify-center group">
                 <div className="absolute inset-0 bg-[#00E5FF] blur-md opacity-30 rounded-full group-hover:opacity-50 transition-opacity duration-300"></div>
                 <BrandLogo className="relative w-9 h-9 text-[#00E5FF] drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]" />
            </div>

            {/* Text Title */}
            <h1
              className="
                flex flex-col
                text-3xl md:text-4xl
                font-orbitron font-bold
                leading-none
                text-transparent bg-clip-text
                bg-gradient-to-r from-[#00E5FF] via-[#4cc9ff] to-[#a855f7]
                drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]
              "
            >
              <span>SocialNino</span>
              <span
                className="
                  mt-1 h-[3px]
                  w-full
                  rounded-full
                  bg-gradient-to-r from-[#00E5FF] to-[#a855f7]
                  shadow-[0_0_8px_#00E5FF]
                "
              />
            </h1>
            
            {/* Online Count Badge */}
            {onlineCount > 0 && (
              <div 
                  className="ml-1 flex items-center gap-1.5 bg-[#00E5FF]/10 border border-[#00E5FF]/50 rounded-full px-2 py-0.5 text-[10px] text-[#00E5FF] font-bold animate-fade-in"
                  title={`${onlineCount} usuários online`}
              >
                  <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
                  </span>
                  <span className="hidden sm:inline">{onlineCount}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-5">
             <button onClick={onNotificationsClick} className="relative p-1 group transition-transform hover:scale-110">
              <HeartIcon className="h-7 w-7 text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
              {unreadCount > 0 && (
                 <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-backgroundDark animate-pulse shadow-[0_0_8px_#FF2CDF]"></span>
              )}
            </button>
            <button className="p-1 group transition-transform hover:scale-110 hover:-rotate-12">
                <PaperAirplaneIcon className="h-7 w-7 text-secondary drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
            </button>
          </div>
      </div>
    </header>
  );
};

export default Header;