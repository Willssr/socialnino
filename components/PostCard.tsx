import React, { useState, useRef } from "react";
import { Post } from "../types";
import { DotsHorizontalIcon, HeartIcon, CommentIcon, PaperAirplaneIcon, BookmarkIcon } from './Icons';
import CommentsModal from './CommentsModal';

type Props = {
  post: Post;
  handleLike: (postId: string) => void;
  handleComment: (postId: string, text: string) => void;
  currentUserName: string;
  handleToggleFollow: (personId: number) => void;
  handleBookmark: (postId: string) => void;
  onOpenProfile: (username: string) => void;
};

const PostCard: React.FC<Props> = ({
  post,
  handleLike,
  handleComment,
  currentUserName,
  handleToggleFollow,
  handleBookmark,
  onOpenProfile,
}) => {
  const [commentText, setCommentText] = useState("");
  const [showHeart, setShowHeart] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const lastClickTime = useRef(0);

  const handleDoubleClick = () => {
    const now = new Date().getTime();
    if (now - lastClickTime.current < 400) { 
      if (!post.isLiked) {
        handleLike(post.id);
      }
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 800);
    }
    lastClickTime.current = now;
  };

  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

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
      <div className="rgb-border rounded-xl overflow-hidden mb-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-primary/50">
        
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

            {/* 📌 Agora exibe data + hora */}
            <p className="text-xs text-textDark">
              {formattedDateTime}
            </p>
          </div>

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
              muted
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
            <button onClick={() => handleLike(post.id)}>
              <HeartIcon
                className={`w-7 h-7 transition-all duration-200 ${
                  post.isLiked ? "text-accent" : "text-textDark hover:text-textLight"
                }`}
                solid={post.isLiked}
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
            {post.likes.toLocaleString("pt-BR")} curtidas
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
        {post.comments?.length > 0 && (
          <div className="px-4 pb-2">
            <p
              className="text-sm text-textDark cursor-pointer"
              onClick={() => setIsCommentsModalOpen(true)}
            >
              Ver todos os {post.comments.length} comentários
            </p>

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
                handleComment(post.id, commentText);
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
        />
      )}
    </>
  );
};

export default PostCard;