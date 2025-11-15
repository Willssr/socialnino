import React, { useState, useRef, useEffect } from "react";
import { Post } from "../types";
import {
  HeartIcon,
  CommentIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
} from "./Icons";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, commentText: string) => void;
  onBookmark: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onBookmark,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isAnimatingLike, setIsAnimatingLike] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Lazy-load só para vídeo
    if (post.media.type !== "video") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (mediaRef.current) {
            observer.unobserve(mediaRef.current);
          }
        }
      },
      {
        rootMargin: "200px 0px",
      }
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => {
      if (mediaRef.current) {
        observer.unobserve(mediaRef.current);
      }
    };
  }, [post.media.type]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText("");
    }
  };

  const handleLikeAction = () => {
    if (!post.isLiked) {
      setIsAnimatingLike(true);
      setTimeout(() => {
        setIsAnimatingLike(false);
      }, 800);
    }
    onLike(post.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="bg-white dark:bg-black border-b border-instaBorder dark:border-gray-800">
      {/* Cabeçalho */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.author.avatar}
            alt={post.author.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm text-black dark:text-white">
            {post.author.username}
          </span>
        </div>
        <button className="text-black dark:text-white">
          <DotsHorizontalIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Mídia */}
      <div
        className="relative bg-black"
        onDoubleClick={handleLikeAction}
        ref={mediaRef}
      >
        {post.media.type === "image" ? (
          <img
            src={post.media.src}
            alt={post.caption}
            className="w-full max-h-[480px] object-cover"
          />
        ) : (
          <video
            controls
            preload="metadata"
            src={isIntersecting ? post.media.src : undefined}
            className="w-full max-h-[480px] object-contain bg-black"
          >
            Your browser does not support the video tag.
          </video>
        )}

        {isAnimatingLike && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <HeartIcon
              className="w-24 h-24 text-white drop-shadow-lg animate-heart-burst"
              solid={true}
            />
          </div>
        )}
      </div>

      {/* Ações e info */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLikeAction}
              className={
                post.isLiked ? "text-instaRed" : "text-black dark:text-white"
              }
            >
              <HeartIcon className="w-7 h-7" solid={post.isLiked} />
            </button>
            <button className="text-black dark:text-white">
              <CommentIcon className="w-7 h-7" />
            </button>
            <button className="text-black dark:text-white">
              <PaperAirplaneIcon className="w-7 h-7 -rotate-12" />
            </button>
          </div>
          <button
            onClick={() => onBookmark(post.id)}
            className="text-black dark:text-white"
          >
            <BookmarkIcon className="w-7 h-7" solid={post.isBookmarked} />
          </button>
        </div>

        <p className="font-semibold text-sm text-black dark:text-white mt-3">
          {post.likes.toLocaleString("pt-BR")} curtidas
        </p>

        <p className="text-sm mt-1 text-black dark:text-white">
          <span className="font-semibold">{post.author.username}</span>{" "}
          {post.caption}
        </p>

        {/* Comments Section */}
        {post.comments.length > 0 && (
          <div className="mt-2 space-y-1">
            {post.comments.map(comment => (
              <p key={comment.id} className="text-sm text-black dark:text-white">
                <span className="font-semibold">{comment.author}</span>{' '}
                {comment.text}
              </p>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 uppercase">
          {formatDate(post.timestamp)}
        </p>

        <form
          onSubmit={handleCommentSubmit}
          className="mt-2 border-t border-instaBorder dark:border-gray-800 pt-2"
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Adicione um comentário..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default PostCard;