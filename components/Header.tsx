
import React, { useState, useEffect } from 'react';
import { HeartIcon, PaperAirplaneIcon, UserIcon } from './Icons';
import { db } from '../services/firebase';
import { ref, onValue, off } from 'firebase/database';

interface HeaderProps {
    unreadCount: number;
    onNotificationsClick: () => void;
    onMessagesClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ unreadCount, onNotificationsClick, onMessagesClick }) => {
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
    <header className="bg-backgroundDark/80 backdrop-blur-md sticky top-0 z-50 border-b border-borderNeon/50 h-16 w-full shadow-[0_2px_20px_rgba(0,229,255,0.1)]">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            {/* Logo & Title */}
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-borderNeon shadow-[0_0_15px_rgba(0,229,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all duration-300">
                    <UserIcon className="w-6 h-6 text-secondary drop-shadow-[0_0_5px_#00E5FF]" />
                    <div className="absolute inset-0 bg-secondary/10 rounded-xl animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                    <h1
                      className="
                        text-2xl md:text-3xl
                        font-orbitron font-bold tracking-wide
                        text-transparent bg-clip-text
                        bg-gradient-to-r from-[#00E5FF] via-[#ffffff] to-[#a855f7]
                        drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]
                      "
                    >
                      SocialNino
                    </h1>
                    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-[#00E5FF] to-[#a855f7] shadow-[0_0_6px_#00E5FF]" />
                </div>
            </div>

            {onlineCount > 0 && (
              <div 
                  className="hidden sm:flex items-center gap-1.5 bg-backgroundLight/50 backdrop-blur-sm border border-[#00E5FF]/30 shadow-[0_0_8px_rgba(0,229,255,0.2)] rounded-full px-2.5 py-1 text-xs text-[#00E5FF] font-bold animate-fade-in"
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
              <HeartIcon className="h-7 w-7 text-[#00E5FF] drop-shadow-[0_0_5px_rgba(0,229,255,0.6)] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#00E5FF]" />
              {unreadCount > 0 && (
                 <span className="absolute top-0.5 right-0 block h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-backgroundDark animate-pulse shadow-[0_0_8px_#FF2CDF]"></span>
              )}
            </button>
            <button onClick={onMessagesClick} className="p-1 group">
                <PaperAirplaneIcon className="h-7 w-7 text-[#a855f7] -rotate-12 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#a855f7]" />
            </button>
          </div>
      </div>
    </header>
  );
};

export default Header;
