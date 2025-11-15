import React, { useState } from 'react';
import { BellIcon } from './Icons';
import LogoutButton from './LogoutButton';

interface HeaderProps {
    unreadCount: number;
    onNotificationsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ unreadCount, onNotificationsClick }) => {
  return (
    <header className="bg-white dark:bg-black text-black dark:text-white shadow-sm sticky top-0 z-50 border-b border-gray-300 dark:border-gray-800 h-14">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <div className="flex-shrink-0">
            <span 
              style={{ fontFamily: "'Grand Hotel', cursive" }} 
              className="text-3xl"
            >
              SocialNino
            </span>
          </div>
          <div className="flex items-center space-x-4">
             <button onClick={onNotificationsClick} className="relative p-1">
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                 <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-black"></span>
              )}
            </button>
            <LogoutButton />
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