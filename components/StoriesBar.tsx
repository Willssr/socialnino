import React from 'react';
// Fix: Replace non-existent `PlusCircleIcon` with `PlusSquareIcon`
import { PlusSquareIcon } from './Icons';
import { UserProfile, ActivePage, Story } from '../types';

interface StoriesBarProps {
  userProfile: UserProfile;
  onAddStoryClick: () => void;
  stories: Story[];
  onViewStory: (author: string) => void;
}

const StoriesBar: React.FC<StoriesBarProps> = ({ userProfile, onAddStoryClick, stories, onViewStory }) => {
  const otherAuthorsStories = stories.filter(story => story.author !== userProfile.name);
  
  const uniqueAuthors = Array.from(new Set(otherAuthorsStories.map(s => s.author)))
    .map(author => {
      return otherAuthorsStories.find(s => s.author === author)!;
    });

  return (
    <div className="w-full py-3 px-2 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-4 overflow-x-auto pb-2 -mb-2">
        {/* Your Story */}
        <div className="flex-shrink-0 text-center w-16">
          <div className="relative">
            <button onClick={onAddStoryClick} className="block rounded-full">
                <img 
                src={userProfile.avatar} 
                alt="Seu story" 
                className="w-16 h-16 rounded-full object-cover"
                />
            </button>
            <button onClick={onAddStoryClick} className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full">
              <PlusSquareIcon className="w-6 h-6 text-blue-500"/>
            </button>
          </div>
          <p className="text-xs mt-1 truncate text-gray-800 dark:text-gray-200">Seu story</p>
        </div>
        
        {/* Other Stories */}
        {uniqueAuthors.map(story => (
          <div key={story.author} className="flex-shrink-0 text-center w-16 cursor-pointer" onClick={() => onViewStory(story.author)}>
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600">
                <div className="bg-white dark:bg-black p-0.5 rounded-full">
                    <img 
                      src={story.avatar} 
                      alt={story.author} 
                      className="w-full h-full rounded-full object-cover"
                    />
                </div>
            </div>
            <p className="text-xs mt-1 truncate text-gray-800 dark:text-gray-200">{story.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesBar;