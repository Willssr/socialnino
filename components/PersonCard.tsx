import React from 'react';
import { Person } from '../types';
import FollowButton from './FollowButton';

interface PersonCardProps {
  person: Person;
  onToggleFollow: (id: number) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, onToggleFollow }) => {
  return (
    <div className="rgb-border rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={person.avatar} alt={person.username} className="w-12 h-12 rounded-full object-cover border-2 border-primary/50" />
        <div>
          <h3 className="font-bold text-sm text-textLight">{person.username}</h3>
          <p className="text-xs text-textDark">{person.bio}</p>
        </div>
      </div>
      <FollowButton
        isFollowing={person.isFollowing}
        onClick={() => onToggleFollow(person.id)}
      />
    </div>
  );
};

export default PersonCard;