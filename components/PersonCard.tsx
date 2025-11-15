import React from 'react';
import { Person } from '../types';
import FollowButton from './FollowButton';

interface PersonCardProps {
  person: Person;
  onToggleFollow: (id: number) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, onToggleFollow }) => {
  return (
    <div className="p-2 rounded-lg flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-900">
      <div className="flex items-center space-x-3">
        <img src={person.avatar} alt={person.username} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h3 className="font-bold text-sm">{person.username}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{person.bio}</p>
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
