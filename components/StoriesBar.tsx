import React from 'react';
import { PlusSquareIcon } from './Icons';
import { UserProfile, Story } from '../types';

interface StoriesBarProps {
  userProfile: UserProfile;
  onAddStoryClick: () => void;
  stories: Story[];
  onViewStory: (author: string) => void;
}

// Mock de usuários online para demonstração
const onlineAuthors = ['nina_dev', 'carla.codes'];

const StoriesBar: React.FC<StoriesBarProps> = ({ userProfile, onAddStoryClick, stories, onViewStory }) => {
  // 1. Verifica se o usuário logado tem stories
  const myStories = stories.filter(story => story.author === userProfile.name);
  const hasMyStory = myStories.length > 0;

  // 2. Filtra os stories de outros usuários
  const otherAuthorsStories = stories.filter(story => story.author !== userProfile.name);
  
  // 3. Agrupa os stories de outros usuários para exibir apenas um por autor
  const uniqueAuthors = Array.from(new Set(otherAuthorsStories.map(s => s.author)))
    .map(author => {
      return otherAuthorsStories.find(s => s.author === author)!;
    });

  return (
    <div className="w-full py-3 px-2 border-b border-borderNeon/50">
      <div className="flex items-center space-x-4 overflow-x-auto pb-2 -mb-2">
        {/* Card do Usuário Logado (Sempre o primeiro) */}
        <div className="flex-shrink-0 text-center w-20">
          <div className="flex flex-col items-center p-1.5 rounded-xl bg-[#0a0f1a]/60 border-2 border-secondary shadow-[0_0_10px_#00E5FF,0_0_20px_#00E5FF]">
            <div className="relative">
              <button 
                onClick={hasMyStory ? () => onViewStory(userProfile.name) : onAddStoryClick} 
                className="block rounded-full"
              >
                <img 
                  src={userProfile.avatar} 
                  alt="Seu story" 
                  className="w-14 h-14 rounded-full object-cover drop-shadow-[0_0_6px_theme(colors.secondary)] animate-neon-pulse"
                />
              </button>
              <button 
                  onClick={onAddStoryClick} 
                  className="absolute -bottom-1 -right-1 bg-backgroundDark rounded-full p-0.5 animate-pulse"
              >
                  <PlusSquareIcon className="w-7 h-7 text-secondary drop-shadow-[0_0_4px_theme(colors.secondary)]"/>
              </button>
            </div>
            <p className="text-xs mt-1.5 font-semibold truncate text-white">Seu Story</p>
          </div>
        </div>
        
        {/* Stories dos Outros Usuários */}
        {uniqueAuthors.map(story => {
          const isOnline = onlineAuthors.includes(story.author);
          return (
            <div key={story.author} className="flex-shrink-0 text-center w-20 cursor-pointer" onClick={() => onViewStory(story.author)}>
              <div className="relative inline-block">
                <div className="story-border w-16 h-16 rounded-full p-0.5">
                    <div className="bg-backgroundDark p-0.5 rounded-full h-full">
                        <img 
                          src={story.avatar} 
                          alt={story.author} 
                          className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </div>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-[#00FF7F] ring-2 ring-backgroundDark"></span>
                )}
              </div>
              <p className="text-sm font-semibold mt-1 truncate text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">{story.author}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default StoriesBar;