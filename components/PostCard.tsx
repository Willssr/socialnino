import React, { useState, useRef, useEffect } from "react";
import { Post } from "../types";
import { DotsHorizontalIcon, HeartIcon, CommentIcon, PaperAirplaneIcon, BookmarkIcon, EyeIcon } from './Icons';
import CommentsModal from './CommentsModal';
import FollowButton from "./FollowButton";

type Props = {
  post: Post;
  handleLike: (postId: string) => void;
  handleComment: (postId: string, text: string, parentId?: string) => void;
  handleView: (postId: string) => void;
  currentUserName: string;
  handleToggleFollow: (personId: number) => void;
  handleBookmark: (postId: string) => void;
  onOpenProfile: (username: string) => void;
};

const PostCard: React.FC<Props> = ({
  post,
  handleLike,
  handleComment,
  handleView,
  currentUserName,
  handleToggleFollow,
  handleBookmark,
  onOpenProfile,
}) => {
  // ✨ ESTADO LOCAL PARA UI OTIMISTA (RESPOSTA IMEDIATA)
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  // Sincroniza com props quando o banco de dados atualizar (outros usuários)
  useEffect(() => {
    setLikesCount(post.likes);
    setIsLiked(post.isLiked);
  }, [post.likes, post.isLiked]);

  const [commentText, setCommentText] = useState("");
  const [showHeart, setShowHeart] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const lastClickTime = useRef(0);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const viewHandled = useRef(false);

  // Calculate total comments including replies
  const totalComments = (post.comments || []).reduce((acc, comment) => {
      return acc + 1 + (comment.replies ? comment.replies.length : 0);
  }, 0);

  // Função Wrapper para Like (UI Otimista)
  const onLikeClick = () => {
    const newIsLiked = !isLiked;
    
    // Atualiza UI instantaneamente
    setIsLiked(newIsLiked);
    setLikesCount((prev) => newIsLiked ? prev + 1 : Math.max(0, prev - 1));
    
    // Chama o backend
    handleLike(post.id);
  };

  const handleDoubleClick = () => {
    const now = new Date().getTime();
    if (now - lastClickTime.current < 400) { 
      if (!isLiked) {
        onLikeClick();
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
    lastClickTime.current = now;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewHandled.current) {
          handleView(post.id);
          viewHandled.current = true;
        }
      },
      { threshold: 0.5 }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, [post.id, handleView]);

  // 📌 Formatação da data + hora
  const formattedDateTime = new Date(post.timestamp).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div ref={cardRef} className="rgb-border rounded-xl overflow-hidden mb-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-primary/50">
        
        {/* HEADER DO POST */}
        <div className="flex items-center space-x-3 p-4">
          <img
            src={post.author.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-primary/50"
            onClick={() => onOpenProfile(post.author.username)}
          />
          <div className="flex-grow">
            <p
              className="font-bold text-sm cursor-pointer hover:text-secondary"
              onClick={() => onOpenProfile(post.author.username)}
            >
              {post.author.username}
            </p>

            <p className="text-xs text-textDark">
              {formattedDateTime}
            </p>
            
            <div className="flex items-center space-x-1.5 mt-1 text-secondary drop-shadow-[0_0_4px_#00E5FF]">
                <EyeIcon className="w-4 h-4" />
                <p className="text-xs font-semibold">
                    {post.views.toLocaleString('pt-BR')} visualizações
                </p>
            </div>
          </div>
          
          {post.author.username !== currentUserName && (
            <FollowButton
              isFollowing={post.author.isFollowing}
              onClick={() => handleToggleFollow(post.author.id)}
              variant="text"
            />
          )}

          <button className="text-textDark hover:text-textLight">
            <DotsHorizontalIcon className="w-6 h-6" />
          </button>
        </div>

        {/* MÍDIA */}
        <div 
          className="relative aspect-square bg-cardDark bg-gradient-to-r from-backgroundLight via-cardDark to-backgroundLight animate-shimmer bg-[length:200%_100%]" 
          onClick={handleDoubleClick}
        >
          {post.media?.type === "image" ? (
            <img
              src={post.media.src}
              alt="post"
              onLoad={() => setIsMediaLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${isMediaLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            <video
              ref={videoRef}
              src={post.media.src}
              loop
              controls
              playsInline
              onLoadedData={() => setIsMediaLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${isMediaLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}

          {showHeart && (
            <HeartIcon
              solid
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-accent/90 animate-heart-burst"
            />
          )}
        </div>

        {/* AÇÕES */}
        <div className="flex items-center justify-between p-4">
          <div className="flex space-x-4">
            <button onClick={onLikeClick}>
              <HeartIcon
                className={`w-7 h-7 transition-all duration-200 ${
                  isLiked ? "text-accent" : "text-textDark hover:text-textLight"
                }`}
                solid={isLiked}
              />
            </button>

            <button onClick={() => setIsCommentsModalOpen(true)}>
              <CommentIcon className="w-7 h-7 text-textDark hover:text-textLight" />
            </button>

            <button>
              <PaperAirplaneIcon className="w-7 h-7 text-textDark hover:text-textLight" />
            </button>
          </div>

          <button onClick={() => handleBookmark(post.id)}>
            <BookmarkIcon
              className={`w-7 h-7 transition-all duration-200 ${
                post.isBookmarked ? "text-secondary" : "text-textDark hover:text-textLight"
              }`}
              solid={post.isBookmarked}
            />
          </button>
        </div>

        {/* LIKES E LEGENDA */}
        <div className="px-4 pb-2">
          <p className="font-bold text-sm">
            {likesCount.toLocaleString("pt-BR")} {likesCount === 1 ? 'curtida' : 'curtidas'}
          </p>

          <p className="mt-1 text-sm">
            <span
              className="font-bold cursor-pointer hover:text-secondary"
              onClick={() => onOpenProfile(post.author.username)}
            >
              {post.author.username}
            </span>
            <span className="text-textLight"> {post.caption}</span>
          </p>
        </div>

        {/* COMENTÁRIOS */}
        {totalComments > 0 && (
          <div className="px-4 pb-2">
            <p
              className="text-sm text-textDark cursor-pointer"
              onClick={() => setIsCommentsModalOpen(true)}
            >
              Ver todos os {totalComments} comentários
            </p>

            {/* Exibe apenas o último comentário raiz */}
            {post.comments.slice(0, 1).map((c) => (
              <p key={c.id} className="text-sm mt-1">
                <strong className="font-semibold">{c.author}</strong> {c.text}
              </p>
            ))}
          </div>
        )}

        {/* INPUT DE COMENTÁRIO */}
        <div className="px-4 py-2 border-t border-borderNeon/50">
          <form
            className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              if (commentText.trim()) {
                handleComment(post.id, commentText); // Default: no parentId (root comment)
                setCommentText("");
              }
            }}
          >
            <input
              type="text"
              value={commentText}
              placeholder="Adicionar comentário..."
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-grow bg-transparent text-sm placeholder-textDark focus:outline-none"
            />

            <button
              type="submit"
              className="text-secondary font-bold text-sm disabled:opacity-50"
              disabled={!commentText.trim()}
            >
              Publicar
            </button>
          </form>
        </div>
      </div>

      {isCommentsModalOpen && (
        <CommentsModal
          comments={post.comments}
          postAuthor={post.author.username}
          onClose={() => setIsCommentsModalOpen(false)}
          onAddComment={(text, parentId) => handleComment(post.id, text, parentId)}
        />
      )}
    </>
  );
};

export default PostCard;