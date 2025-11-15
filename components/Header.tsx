import React, { useState } from 'react';
import { HeartIcon, PaperAirplaneIcon } from './Icons';

interface HeaderProps {
    unreadCount: number;
    onNotificationsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ unreadCount, onNotificationsClick }) => {
  return (
    <header className="bg-white dark:bg-black text-black dark:text-white sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 h-14">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <div className="flex-shrink-0">
            <span 
              style={{ fontFamily: "'Grand Hotel', cursive" }} 
              className="text-3xl"
            >
              SocialNino
            </span>
          </div>
          <div className="flex items-center space-x-5">
             <button onClick={onNotificationsClick} className="relative p-1">
              <HeartIcon className="h-7 w-7" />
              {unreadCount > 0 && (
                 <span className="absolute top-1 right-0.5 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white dark:ring-black"></span>
              )}
            </button>
            <button className="p-1">
                <PaperAirplaneIcon className="h-7 w-7 -rotate-12" />
            </button>
          </div>
      </div>
    </header>
  );
};

// Add a link to the Grand Hotel font in the document head for the logo
const fontUrl = 'https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap';
if (!document.querySelector(`link[href="${fontUrl}"]`)) {
    const fontLink = document.createElement('link');
    fontLink.href = fontUrl;
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
}

export default Header;