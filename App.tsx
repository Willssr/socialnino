import React, { useState } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import Music from './components/Music';
import About from './components/About';
import Geolocation from './components/Geolocation';
import { ActivePage } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('feed');

  const renderPage = () => {
    switch (activePage) {
      case 'music':
        return <Music />;
      case 'about':
        return <About />;
      case 'feed':
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <Geolocation />
      <main>
        {renderPage()}
      </main>
      <footer className="text-center py-4 text-sm text-slate-500 border-t border-slate-200 mt-8">
        <p>&copy; {new Date().getFullYear()} SocialNino. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;