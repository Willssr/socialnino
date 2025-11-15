import React, { useState, useEffect } from 'react';
import { UserProfile, ActivePage } from '../types';
import { MoonIcon, SunIcon, BellIcon, SearchIcon, CoinIcon } from './Icons';
import { useNinoPoints } from '../context/NinoPointsContext';
import LogoutButton from './LogoutButton';

interface HeaderProps {
    userProfile: UserProfile;
    onNavigate: (page: ActivePage) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    unreadCount: number;
    onNotificationsClick: () => void;
    onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onNavigate, theme, toggleTheme, unreadCount, onNotificationsClick, onSearchClick }) => {
  const [isAnimatingPoints, setIsAnimatingPoints] = useState(false);
  const { points: ninoPoints } = useNinoPoints();
  
  // Effect to trigger points animation
  useEffect(() => {
    // Avoid animation on initial load
    if (ninoPoints > 0) {
      setIsAnimatingPoints(true);
      const timer = setTimeout(() => setIsAnimatingPoints(false), 500); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [ninoPoints]);

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
             <button onClick={onSearchClick} className="p-2 rounded-full hover:bg-white/20 transition-colors">
              <SearchIcon className="h-6 w-6" />
            </button>
             <button onClick={onNotificationsClick} className="relative p-2 rounded-full hover:bg-white/20 transition-colors">
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount}</span>
              )}
            </button>
             {/* Nino Points Display */}
            <div className={`points-pill flex items-center gap-1 ${isAnimatingPoints ? 'animate-points-update' : ''}`}>
                <CoinIcon className="w-5 h-5 text-yellow-300"/>
                <span>{ninoPoints}</span>
            </div>
             <button onClick={() => onNavigate('profile')} className="p-1 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white">
                <img src={userProfile.avatar} alt="Profile" className="h-8 w-8 rounded-full border-2 border-white object-cover"/>
            </button>
            <LogoutButton />
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