import React from 'react';
import { UserProfile, ActivePage } from '../types';
import { MoonIcon, SunIcon, BellIcon } from './Icons';

interface HeaderProps {
    userProfile: UserProfile;
    onNavigate: (page: ActivePage) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    unreadCount: number;
    onNotificationsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onNavigate, theme, toggleTheme, unreadCount, onNotificationsClick }) => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            {/* Using a simple text logo with a unique font for style */}
            <span 
              style={{ fontFamily: "'Lobster', cursive" }} 
              className="text-3xl font-bold tracking-wider cursor-pointer"
              onClick={() => onNavigate('feed')}
            >
              SocialNino
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/20 transition-colors" aria-label="Toggle theme">
                {theme === 'light' ? (
                    <MoonIcon className="h-6 w-6" />
                ) : (
                    <SunIcon className="h-6 w-6" />
                )}
            </button>
             {/* Placeholder icons similar to Instagram */}
            <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
             <button onClick={onNotificationsClick} className="relative p-2 rounded-full hover:bg-white/20 transition-colors">
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount}</span>
              )}
            </button>
             <button onClick={() => onNavigate('profile')} className="p-1 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white">
                <img src={userProfile.avatar} alt="Profile" className="h-8 w-8 rounded-full border-2 border-white object-cover"/>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Add a link to the Lobster font in the document head for the logo
// This effect should ideally be run once, maybe in App.tsx or index.html
const fontUrl = 'https://fonts.googleapis.com/css2?family=Lobster&display=swap';
if (!document.querySelector(`link[href="${fontUrl}"]`)) {
    const fontLink = document.createElement('link');
    fontLink.href = fontUrl;
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
}


export default Header;