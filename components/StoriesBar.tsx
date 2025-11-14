import React from 'react';
import { PlusCircleIcon } from './Icons';
import { UserProfile, ActivePage, Story } from '../types';

interface StoriesBarProps {
  userProfile: UserProfile;
  onNavigate: (page: ActivePage) => void;
  onAddStoryClick: () => void;
  stories: Story[];
  onViewStory: (author: string) => void;
}

const StoriesBar: React.FC<StoriesBarProps> = ({ userProfile, onNavigate, onAddStoryClick, stories, onViewStory }) => {
  const otherAuthorsStories = stories.filter(story => story.author !== userProfile.name);
  
  const uniqueAuthors = Array.from(new Set(otherAuthorsStories.map(s => s.author)))
    .map(author => {
      return otherAuthorsStories.find(s => s.author === author)!;
    });

  return (
    <div className="w-full bg-white border-b border-slate-200/80 py-3 px-2 sm:rounded-xl sm:border">
      <div className="flex items-center space-x-4 overflow-x-auto pb-2 -mb-2">
        {/* Your Story */}
        <div className="relative group flex-shrink-0 text-center w-16">
          <div className="relative">
            <button onClick={() => onViewStory(userProfile.name)} className="block rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <img 
                src={userProfile.avatar} 
                alt="Seu story" 
                className="w-16 h-16 rounded-full object-cover"
                />
            </button>
            <button onClick={onAddStoryClick} className="absolute -bottom-1 -right-1 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
              <PlusCircleIcon className="w-6 h-6 text-blue-500"/>
            </button>
          </div>
          <p className="text-xs mt-1 truncate">Seu story</p>
        </div>
        
        {/* Other Stories */}
        {uniqueAuthors.map(story => (
          <div key={story.author} className="flex-shrink-0 text-center w-16 cursor-pointer" onClick={() => onViewStory(story.author)}>
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