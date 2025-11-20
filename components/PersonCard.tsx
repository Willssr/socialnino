import React from 'react';
import { Person } from '../types';
import FollowButton from './FollowButton';

interface PersonCardProps {
  person: Person;
  onToggleFollow: (id: number) => void;
  onClick?: () => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, onToggleFollow, onClick }) => {
  return (
    <div 
      className="rgb-border rounded-xl p-4 flex items-center justify-between transition-transform duration-300 hover:-translate-y-1 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <img 
          src={person.avatar} 
          alt={person.username} 
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/50 group-hover:border-secondary transition-colors" 
        />
        <div>
          <h3 className="font-bold text-base text-secondary group-hover:text-white transition-colors">{person.username}</h3>
          <p className="text-xs text-textDark">{person.bio}</p>
        </div>
      </div>
      <FollowButton
        isFollowing={person.isFollowing}
        onClick={(e) => onToggleFollow(person.id)} // Already has stopPropagation inside FollowButton, but ensuring ID is passed
      />
    </div>
  );
};

export default PersonCard;