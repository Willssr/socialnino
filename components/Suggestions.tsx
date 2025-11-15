import React from 'react';
import { Person } from '../types';
import FollowButton from './FollowButton';

interface SuggestionsProps {
    people: Person[];
    onToggleFollow: (id: number) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ people, onToggleFollow }) => {

    return (
        <div className="container mx-auto p-4 max-w-4xl text-black dark:text-white">
            <h1 className="text-2xl font-bold mb-4">
                Sugestões para você
            </h1>
            <div className="space-y-2">
                {people.map(person => (
                    <div key={person.id} className="p-2 rounded-lg flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-900">
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
                ))}
            </div>
        </div>
    );
};

export default Suggestions;