import React, { useState, useMemo } from 'react';
import { Person } from '../types';
import { SearchIcon, XIcon } from './Icons';
import PersonCard from './PersonCard';

interface UserSearchScreenProps {
  people: Person[];
  onToggleFollow: (id: number) => void;
  onOpenProfile: (username: string) => void;
}

const UserSearchScreen: React.FC<UserSearchScreenProps> = ({ people, onToggleFollow, onOpenProfile }) => {
  const [query, setQuery] = useState("");

  const filteredPeople = useMemo(() => {
    const trimmedQuery = query.toLowerCase().trim();
    if (!trimmedQuery) {
      // Se não houver busca, mostra todos (ou poderia mostrar nada/sugestões)
      return people; 
    }

    return people.filter(p => 
      p.username.toLowerCase().includes(trimmedQuery) ||
      (p.bio && p.bio.toLowerCase().includes(trimmedQuery))
    );
  }, [query, people]);

  return (
    <div className="container mx-auto pb-20 max-w-4xl text-textLight min-h-screen">
      
      {/* Sticky Search Header */}
      <div className="sticky top-16 z-40 bg-backgroundDark/95 backdrop-blur-md pt-4 pb-4 px-4 border-b border-borderNeon/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <h1 className="text-2xl font-orbitron font-bold text-gradient-neon mb-4 px-1">
            Buscar Usuários
        </h1>
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-3 w-5 h-5 text-secondary animate-pulse" />
          <input
            autoFocus
            type="text"
            placeholder="Pesquisar por nome ou @username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-cardDark border-2 border-borderNeon rounded-xl text-textLight placeholder-textDark focus:outline-none focus:border-primary focus:shadow-glow-primary transition-all duration-300"
          />
          {query && (
            <button 
              onClick={() => setQuery("")} 
              className="absolute right-3 text-textDark hover:text-white transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="px-4 mt-4 space-y-3">
        {filteredPeople.length === 0 ? (
            <div className="text-center py-12 text-textDark opacity-70">
                <SearchIcon className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p>Nenhum usuário encontrado para "{query}".</p>
            </div>
        ) : (
            <>
                {query && (
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">
                        Resultados ({filteredPeople.length})
                    </p>
                )}
                {filteredPeople.map(person => (
                    <PersonCard 
                        key={person.id} 
                        person={person} 
                        onToggleFollow={onToggleFollow}
                        onClick={() => onOpenProfile(person.username)}
                    />
                ))}
            </>
        )}

        {!query && filteredPeople.length > 0 && (
           <div className="mt-8 p-4 border border-borderNeon/30 rounded-xl bg-primary/5 text-center">
               <p className="text-sm text-textDark">Digite acima para encontrar novos amigos!</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default UserSearchScreen;