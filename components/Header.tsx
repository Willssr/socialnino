import React from 'react';
import { UserProfile, ActivePage } from '../types';

interface HeaderProps {
    userProfile: UserProfile;
    onNavigate: (page: ActivePage) => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onNavigate }) => {
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
          <div className="flex items-center space-x-4">
             {/* Placeholder icons similar to Instagram */}
            <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
             <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
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