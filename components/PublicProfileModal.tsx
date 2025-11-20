
import React from "react";
import { Post, Person } from "../types";
import PostCard from "./PostCard";
import { PaperAirplaneIcon, XIcon } from "./Icons";

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
  followingIds: Set<string>;
  onMessageClick?: (person: Person) => void;
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
  onMessageClick
}) => {
  if (!isOpen) return null;

  const isFollowing = followingIds.has(String(person.id));
  const isMe = person.username === currentUserName;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-end sm:items-center z-[60] sm:p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-[#0A0A0D] border border-[#7B2FF7] w-full sm:max-w-md h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-[0_0_30px_rgba(123,47,247,0.4)] animate-slide-in-up" 
        onClick={e => e.stopPropagation()}
      >
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#7B2FF7]/30 bg-[#111119]/90 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center space-x-3">
             <button onClick={onClose} className="sm:hidden mr-2 text-textDark hover:text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                 </svg>
             </button>
            <div className="relative">
                 <img
                src={person.avatar}
                alt={person.username}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#00E5FF]"
                />
            </div>
            <div>
              <p className="font-orbitron font-bold text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">
                {person.username}
              </p>
              <div className="flex gap-3 text-xs text-gray-400">
                 <span><strong className="text-white">{person.followers.toLocaleString("pt-BR")}</strong> seguidores</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isMe && (
                <>
                  <button
                      onClick={() => onMessageClick && onMessageClick(person)}
                      className="p-2 rounded-full bg-cardDark border border-borderNeon text-white hover:bg-primary/20 transition-colors"
                      title="Enviar Mensagem"
                  >
                      <PaperAirplaneIcon className="w-5 h-5 text-[#00E5FF]" />
                  </button>
                  <button
                      onClick={() => onToggleFollow(person.id)}
                      className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                      isFollowing
                          ? "bg-transparent border border-[#7B2FF7] text-white hover:bg-[#7B2FF7]/10"
                          : "bg-[#7B2FF7] text-white shadow-[0_0_10px_#7B2FF7] hover:scale-105"
                      }`}
                  >
                      {isFollowing ? "Seguindo" : "Seguir"}
                  </button>
                </>
            )}
            
            {/* Botão Fechar Desktop/Geral */}
            <button 
                onClick={onClose} 
                className="ml-2 p-1 text-textDark hover:text-accent transition-colors"
                aria-label="Fechar perfil"
            >
                <XIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Bio Section */}
        <div className="px-4 py-3 bg-[#111119] border-b border-[#7B2FF7]/10">
             <p className="text-sm text-gray-300 leading-relaxed">{person.bio}</p>
        </div>

        {/* Lista de posts */}
        <div className="flex-1 overflow-y-auto bg-[#0A0A0D] scrollbar-thin scrollbar-thumb-primary/30">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                <p>Essa pessoa ainda não tem posts.</p>
            </div>
          ) : (
            <div className="pb-4">
                {posts.map((post) => (
                <div key={post.id} className="border-b border-[#7B2FF7]/10 last:border-0">
                     <PostCard
                        post={{...post, author: {...post.author, isFollowing}}}
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
      </div>
    </div>
  );
};

export default PublicProfileModal;
