

import React from 'react';
import { Song } from '../types';

interface MusicPlayerProps {
  song: Song;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ song }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{song.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{song.artist}</p>
      </div>
      <audio controls src={song.src} className="w-full sm:w-auto">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;