
import React from 'react';
import { INITIAL_SONGS } from '../constants';
import MusicPlayer from './MusicPlayer';

const Music: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Músicas</h1>
      <div className="space-y-4">
        {INITIAL_SONGS.map((song) => (
          <MusicPlayer key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Music;
