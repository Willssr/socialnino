import React, { useState } from 'react';
import { Person } from '../types';

const initialPeople: Person[] = [
  {
    id: 1,
    username: "rafa_art",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    bio: "Arte digital e música",
    followers: 520,
    isFollowing: false,
  },
  {
    id: 2,
    username: "carla.codes",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    bio: "Desenvolvedora Frontend",
    followers: 940,
    isFollowing: true,
  },
  {
    id: 3,
    username: "lucas_s",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    bio: "Fotógrafo de paisagens",
    followers: 1830,
    isFollowing: false,
  },
   {
    id: 4,
    username: "ana.designer",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
    bio: "UI/UX Designer apaixonada por cores",
    followers: 750,
    isFollowing: false,
  },
];


const Suggestions: React.FC = () => {
    const [people, setPeople] = useState<Person[]>(initialPeople);

    const handleToggleFollow = (id: number) => {
        setPeople(prevPeople =>
            prevPeople.map(person =>
                person.id === id ? { ...person, isFollowing: !person.isFollowing } : person
            )
        );
    };

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
                        <button
                            onClick={() => handleToggleFollow(person.id)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out ${
                                person.isFollowing
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                                : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:opacity-90'
                            }`}
                        >
                            {person.isFollowing ? 'Seguindo' : 'Seguir'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Suggestions;