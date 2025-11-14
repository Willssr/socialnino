
import React, { useState } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import Music from './components/Music';
import About from './components/About';
import Download from './components/Download';
import Geolocation from './components/Geolocation';
import BottomNav from './components/BottomNav';
import { PlusCircleIcon } from './components/Icons';
import { ActivePage } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('feed');

  const renderPage = () => {
    switch (activePage) {
      case 'music':
        return <Music />;
      case 'about':
        return <About />;
      case 'download':
        return <Download />;
      case 'feed':
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 flex flex-col">
      <Header />
      
      {/* Main content with padding for the fixed bottom nav on mobile */}
      <main className="flex-grow pb-16 md:pb-0">
        <div className="container mx-auto px-0 sm:px-4">
            {renderPage()}
        </div>
      </main>

       {/* Floating Action Button for New Post */}
       <button 
        onClick={() => alert('Abrir modal de criação de post!')}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-40"
        aria-label="Criar novo post"
        >
          <PlusCircleIcon className="w-10 h-10" />
      </button>

      <BottomNav activePage={activePage} setActivePage={setActivePage} />

      <footer className="hidden md:block text-center py-4 text-sm text-slate-500 border-t border-slate-200/80 mt-8">
        <div className="space-y-2">
            <Geolocation />
            <p>&copy; {new Date().getFullYear()} SocialNino. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;