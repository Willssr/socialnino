import React from 'react';
import { PlusSquareIcon } from './Icons';
import { UserProfile, Story } from '../types';

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
    <div className="w-full py-3 px-2 border-b border-borderNeon/50">
      <div className="flex items-center space-x-4 overflow-x-auto pb-2 -mb-2">
        {/* Your Story */}
        <div className="flex-shrink-0 text-center w-20">
          <div className="relative">
            <button onClick={onAddStoryClick} className="block rounded-full">
                <img 
                src={userProfile.avatar} 
                alt="Seu story" 
                className="w-16 h-16 rounded-full object-cover border-2 border-dashed border-textDark"
                />
            </button>
            <button onClick={onAddStoryClick} className="absolute -bottom-1 -right-1 bg-backgroundLight rounded-full">
              <PlusSquareIcon className="w-6 h-6 text-secondary"/>
            </button>
          </div>
          <p className="text-xs mt-1 truncate text-textDark">Seu story</p>
        </div>
        
        {/* Other Stories */}
        {uniqueAuthors.map(story => (
          <div key={story.author} className="flex-shrink-0 text-center w-20 cursor-pointer" onClick={() => onViewStory(story.author)}>
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-primary via-accent to-secondary animate-neon-pulse">
                <div className="bg-backgroundDark p-0.5 rounded-full">
                    <img 
                      src={story.avatar} 
                      alt={story.author} 
                      className="w-full h-full rounded-full object-cover"
                    />
                </div>
            </div>
            <p className="text-sm font-semibold mt-1 truncate text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">{story.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesBar;