

import React from 'react';
import { INITIAL_SONGS } from '../constants';
import MusicPlayer from './MusicPlayer';

const Music: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
       <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
        Músicas
      </h1>
      <div className="space-y-4">
        {INITIAL_SONGS.map((song) => (
          <MusicPlayer key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Music;