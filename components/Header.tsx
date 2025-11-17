import React, { useState, useEffect } from 'react';
import { HeartIcon, PaperAirplaneIcon } from './Icons';
import { db } from '../services/firebase';
import { ref, onValue, off } from 'firebase/database';

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
    <header className="bg-backgroundDark sticky top-0 z-50 border-b border-borderNeon h-16 w-full">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
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
            {onlineCount > 0 && (
              <div 
                  className="flex items-center gap-1.5 bg-backgroundLight/50 backdrop-blur-sm border border-[#00E5FF] shadow-[0_0_8px_#00E5FF55] rounded-full px-2.5 py-1 text-xs text-[#00E5FF] font-bold animate-fade-in"
                  title={`${onlineCount} usuários online`}
              >
                  <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
                  </span>
                  <span>{onlineCount}</span>
              </div>
            )}
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