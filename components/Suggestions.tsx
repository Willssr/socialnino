import React from 'react';
import { Person } from '../types';
import PersonCard from './PersonCard';

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
                    <PersonCard key={person.id} person={person} onToggleFollow={onToggleFollow} />
                ))}
            </div>
        </div>
    );
};

export default Suggestions;
