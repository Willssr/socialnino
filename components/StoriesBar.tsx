
import React from 'react';
import { INITIAL_STORIES } from '../constants';
import { PlusCircleIcon } from './Icons';

const StoriesBar: React.FC = () => {
  return (
    <div className="w-full bg-white border-b border-slate-200/80 py-3 px-2 sm:rounded-xl sm:border">
      <div className="flex items-center space-x-4 overflow-x-auto pb-2 -mb-2">
        {/* Your Story */}
        <div className="flex-shrink-0 text-center w-16">
          <div className="relative">
            <img 
              src={INITIAL_STORIES[0].avatar} 
              alt="Seu story" 
              className="w-16 h-16 rounded-full object-cover"
            />
            <button className="absolute -bottom-1 -right-1 bg-white rounded-full">
              <PlusCircleIcon className="w-6 h-6 text-blue-500"/>
            </button>
          </div>
          <p className="text-xs mt-1 truncate">Seu story</p>
        </div>
        
        {/* Other Stories */}
        {INITIAL_STORIES.slice(1).map(story => (
          <div key={story.id} className="flex-shrink-0 text-center w-16">
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                <div className="bg-white p-0.5 rounded-full">
                    <img 
                      src={story.avatar} 
                      alt={story.author} 
                      className="w-full h-full rounded-full object-cover"
                    />
                </div>
            </div>
            <p className="text-xs mt-1 truncate">{story.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesBar;
