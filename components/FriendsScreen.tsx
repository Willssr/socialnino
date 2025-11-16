import React from 'react';
import { Person } from '../types';
import PersonCard from './PersonCard';

interface FriendsScreenProps {
    people: Person[];
    onToggleFollow: (id: number) => void;
}

const FriendsScreen: React.FC<FriendsScreenProps> = ({ people, onToggleFollow }) => {
    return (
        <div className="container mx-auto p-4 max-w-4xl text-textLight">
            <h1 className="text-3xl font-orbitron font-bold text-gradient-neon mb-6">
                Amigos
            </h1>
            <div className="space-y-3">
                {people.map(person => (
                    <PersonCard key={person.id} person={person} onToggleFollow={onToggleFollow} />
                ))}
            </div>
        </div>
    );
};

export default FriendsScreen;