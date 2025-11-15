import React from "react";
import { Post, Person } from "../types";
import PostCard from "./PostCard";

interface PublicProfileModalProps {
  person: Person;
  posts: Post[];
  isOpen: boolean;
  onClose: () => void;
  onToggleFollow: (personId: number) => void;
}

const PublicProfileModal: React.FC<PublicProfileModalProps> = ({
  person,
  posts,
  isOpen,
  onClose,
  onToggleFollow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-black w-full max-w-md max-h-[90vh] rounded-2xl overflow-hidden flex flex-col">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <img
              src={person.avatar}
              alt={person.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-black dark:text-white">
                {person.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {person.followers.toLocaleString("pt-BR")} seguidores
              </p>
            </div>
          </div>

          <button
            onClick={() => onToggleFollow(person.id)}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              person.isFollowing
                ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            {person.isFollowing ? "Seguindo" : "Seguir"}
          </button>
        </div>

        {/* Lista de posts */}
        <div className="flex-1 overflow-y-auto">
          {posts.length === 0 ? (
            <p className="p-4 text-sm text-gray-500 dark:text-gray-400">
              Essa pessoa ainda não tem posts.
            </p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={() => {}}
                onComment={() => {}}
                onBookmark={() => {}}
              />
            ))
          )}
        </div>

        {/* Botão fechar */}
        <button
          className="w-full py-3 text-center text-sm text-blue-500 border-t border-gray-200 dark:border-gray-800"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default PublicProfileModal;
