import React from 'react';
import { Person } from '../types';
import FollowButton from './FollowButton';

interface SuggestionsProps {
    people: Person[];
    onToggleFollow: (id: number) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({ people, onToggleFollow }) => {

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
                Sugestões para você
            </h1>
            <div className="space-y-4">
                {people.map(person => (
                    <div key={person.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img src={person.avatar} alt={person.username} className="w-14 h-14 rounded-full object-cover" />
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-100">{person.username}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{person.bio}</p>
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
