import React from "react";
import { Post, Person } from "../types";
import PostCard from "./PostCard";

interface PublicProfileModalProps {
  person: Person;
  posts: Post[];
  isOpen: boolean;
  onClose: () => void;
  onToggleFollow: (personId: number | string) => void;
  handleLike: (postId: string) => void;
  handleComment: (postId: string, text: string) => void;
  handleBookmark: (postId: string) => void;
  handleView: (postId: string) => void;
  currentUserName: string;
  onOpenProfile: (username: string) => void;
  followingIds: Set<string>; // New prop
}

const PublicProfileModal: React.FC<PublicProfileModalProps> = ({
  person,
  posts,
  isOpen,
  onClose,
  onToggleFollow,
  handleLike,
  handleComment,
  handleBookmark,
  handleView,
  currentUserName,
  onOpenProfile,
  followingIds,
}) => {
  if (!isOpen) return null;

  // Determine if we are following this person based on the global set of following IDs
  const isFollowing = followingIds.has(String(person.id));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#0A0A0D] border border-[#7B2FF7] w-full max-w-md max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-[0_0_20px_rgba(123,47,247,0.3)]" onClick={e => e.stopPropagation()}>
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#7B2FF7]/30 bg-[#111119]">
          <div className="flex items-center space-x-3">
            <div className="relative">
                 <img
                src={person.avatar}
                alt={person.username}
                className="w-12 h-12 rounded-full border-2 border-[#00E5FF]"
                />
            </div>
            <div>
              <p className="font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">
                {person.username}
              </p>
              <div className="flex gap-3 text-xs text-gray-400 mt-1">
                 <span><strong className="text-white">{person.followers.toLocaleString("pt-BR")}</strong> seguidores</span>
                 {/* Note: We don't have 'following' count for public profiles in Person interface yet, keeping simple */}
              </div>
            </div>
          </div>

          <button
            onClick={() => onToggleFollow(person.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
              isFollowing
                ? "bg-transparent border border-[#7B2FF7] text-white hover:bg-[#7B2FF7]/10"
                : "bg-[#7B2FF7] text-white shadow-[0_0_10px_#7B2FF7] hover:scale-105"
            }`}
          >
            {isFollowing ? "Seguindo" : "Seguir"}
          </button>
        </div>
        
        <div className="px-4 py-2 bg-[#111119]">
             <p className="text-sm text-gray-300">{person.bio}</p>
        </div>

        {/* Lista de posts */}
        <div className="flex-1 overflow-y-auto bg-[#0A0A0D]">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <p>Essa pessoa ainda não tem posts.</p>
            </div>
          ) : (
            <div className="pb-4">
                {posts.map((post) => (
                <div key={post.id} className="border-b border-[#7B2FF7]/10 last:border-0">
                     <PostCard
                        post={{...post, author: {...post.author, isFollowing}}} // Force sync card state
                        handleLike={handleLike}
                        handleComment={handleComment}
                        handleView={handleView}
                        currentUserName={currentUserName}
                        handleToggleFollow={onToggleFollow}
                        handleBookmark={handleBookmark}
                        onOpenProfile={onOpenProfile}
                    />
                </div>
                ))}
            </div>
          )}
        </div>

        {/* Botão fechar */}
        <button
          className="w-full py-3 text-center text-sm font-bold text-[#00E5FF] bg-[#111119] border-t border-[#7B2FF7]/30 hover:bg-[#7B2FF7]/10 transition-colors"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default PublicProfileModal;