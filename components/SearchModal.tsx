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

    // Filter People
    const filteredPeople = people.filter(p => 
        p.username.toLowerCase().includes(trimmedQuery)
    );

    // Filter Hashtags
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
  
  // Close modal on Escape key press
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
    <div className="search-modal-container animation-fade" onClick={onClose}>
      <div className="search-modal-content animation-fade-zoom" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <SearchIcon className="w-5 h-5 text-slate-400 dark:text-slate-500"/>
          <input
            autoFocus
            type="text"
            placeholder="Buscar por usuários ou #hashtags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
           <button onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="search-results">
            {query && filteredPeople.length === 0 && filteredHashtags.length === 0 && (
                 <p className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    Nenhum resultado encontrado.
                </p>
            )}

            {filteredPeople.length > 0 && (
                <>
                    <h3 className="search-result-category">Usuários</h3>
                    {filteredPeople.map(person => (
                        <div key={person.id} className="search-result-item">
                            <img src={person.avatar} alt={person.username} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <p className="font-semibold text-slate-800 dark:text-slate-100">{person.username}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{person.bio}</p>
                            </div>
                        </div>
                    ))}
                </>
            )}

            {filteredHashtags.length > 0 && (
                 <>
                    <h3 className="search-result-category mt-2">Hashtags</h3>
                    {filteredHashtags.map(tag => (
                        <div key={tag} className="search-result-item">
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400">#</div>
                            <p className="font-semibold text-slate-800 dark:text-slate-100">{tag}</p>
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
