import React, { useState, useEffect, useMemo } from 'react';
import { Post, Person } from '../types';
import { SearchIcon, XIcon } from './Icons';

interface SearchModalProps {
  onClose: () => void;
  posts: Post[];
  people: Person[];
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose, posts, people }) => {
  const [query, setQuery] = useState("");

  const { filteredPeople, filteredHashtags } = useMemo(() => {
    const trimmedQuery = query.toLowerCase().trim();
    if (!trimmedQuery) {
        return { filteredPeople: [], filteredHashtags: [] };
    }

    const filteredPeople = people.filter(p => 
        p.username.toLowerCase().includes(trimmedQuery)
    );

    const allHashtags = new Set<string>();
    posts.forEach(post => {
        const matches = post.caption.match(/#\w+/g);
        if (matches) {
            matches.forEach(tag => allHashtags.add(tag));
        }
    });
    const filteredHashtags = Array.from(allHashtags).filter(tag =>
        tag.toLowerCase().includes(trimmedQuery)
    );

    return { filteredPeople, filteredHashtags };
  }, [query, posts, people]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-backgroundDark/80 backdrop-blur-sm z-50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg mx-auto bg-cardDark border border-borderNeon rounded-xl shadow-lg flex flex-col max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center space-x-3 p-3 border-b border-borderNeon">
          <SearchIcon className="w-5 h-5 text-textDark"/>
          <input
            autoFocus
            type="text"
            placeholder="Buscar por usuários ou #hashtags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-textLight placeholder-textDark"
          />
           <button onClick={onClose} className="text-textDark hover:text-textLight">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-3">
            {query && filteredPeople.length === 0 && filteredHashtags.length === 0 && (
                 <p className="p-8 text-center text-sm text-textDark">
                    Nenhum resultado encontrado para "{query}".
                </p>
            )}

            {filteredPeople.length > 0 && (
                <>
                    <h3 className="text-xs font-bold uppercase text-secondary tracking-widest px-2 mb-2">Usuários</h3>
                    {filteredPeople.map(person => (
                        <div key={person.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/20 cursor-pointer">
                            <img src={person.avatar} alt={person.username} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <p className="font-semibold text-sm">{person.username}</p>
                                <p className="text-xs text-textDark">{person.bio}</p>
                            </div>
                        </div>
                    ))}
                </>
            )}

            {filteredHashtags.length > 0 && (
                 <>
                    <h3 className="text-xs font-bold uppercase text-accent tracking-widest px-2 mt-4 mb-2">Hashtags</h3>
                    {filteredHashtags.map(tag => (
                        <div key={tag} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/20 cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-backgroundLight border border-borderNeon flex items-center justify-center font-bold text-accent">#</div>
                            <p className="font-semibold text-sm">{tag}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;