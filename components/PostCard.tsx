import React, { useState } from 'react';
import { Post } from '../types';
import { HeartIcon, CommentIcon, PaperAirplaneIcon, BookmarkIcon, DotsHorizontalIcon } from './Icons';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, commentText: string) => void;
  currentUserName: string;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, currentUserName }) => {
  const [commentText, setCommentText] = useState('');
  const [isAnimatingLike, setIsAnimatingLike] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  const handleLikeAction = () => {
    if (!post.isLiked) {
      setIsAnimatingLike(true);
      setTimeout(() => {
        setIsAnimatingLike(false);
      }, 800); // Animation duration
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

    if (diffSeconds < 60) return `${diffSeconds}s`;
    if (diffMinutes < 60) return `${diffMinutes}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return `${diffDays}d`;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200/80 dark:border-slate-700 overflow-hidden">
      {/* Post Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={post.authorAvatar} alt={post.author} className="w-9 h-9 rounded-full" />
          <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">{post.author}</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">&bull; {formatDate(post.timestamp)}</span>
        </div>
        <button className="text-slate-500 dark:text-slate-400">
            <DotsHorizontalIcon className="w-5 h-5"/>
        </button>
      </div>

      {/* Post Media with Double-Click Like and Animation */}
      <div className="relative" onDoubleClick={handleLikeAction}>
        {post.media.type === 'image' ? (
          <img src={post.media.src} alt={post.caption} className="w-full object-cover" />
        ) : (
          <video controls src={post.media.src} className="w-full bg-black">
            Your browser does not support the video tag.
          </video>
        )}
        {isAnimatingLike && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <HeartIcon 
              className="w-24 h-24 text-white drop-shadow-lg animate-heart-burst" 
              isLiked={true} 
            />
          </div>
        )}
      </div>


      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button onClick={handleLikeAction} className={`group transition-transform duration-200 ease-out hover:scale-110 ${post.isLiked ? 'text-red-500' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                    <HeartIcon className="w-7 h-7" isLiked={post.isLiked}/>
                </button>
                <button className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-transform duration-200 ease-out hover:scale-110">
                    <CommentIcon className="w-7 h-7" />
                </button>
                <button className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-transform duration-200 ease-out hover:scale-110">
                    <PaperAirplaneIcon className="w-7 h-7 -rotate-12" />
                </button>
            </div>
            <button className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-transform duration-200 ease-out hover:scale-110">
                <BookmarkIcon className="w-7 h-7" />
            </button>
        </div>

        {/* Likes Count */}
        <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 mt-3">{post.likes.toLocaleString('pt-BR')} curtidas</p>

        {/* Caption */}
        <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-slate-800 dark:text-slate-100">{post.author}</span>{' '}
            {post.caption}
        </p>

        {/* Comments */}
        <div className="mt-2 space-y-1">
            {post.comments.map(comment => (
                 <p key={comment.id} className="text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{comment.author}</span>{' '}
                    {comment.text}
                </p>
            ))}
        </div>
        
        {/* Add Comment */}
         <form onSubmit={handleCommentSubmit} className="mt-3 flex items-center">
            <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Adicione um comentário..."
                className="flex-grow bg-transparent text-sm focus:outline-none dark:placeholder-slate-400"
            />
            <button type="submit" className="text-indigo-500 dark:text-indigo-400 text-sm font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 disabled:text-indigo-300 dark:disabled:text-indigo-600 transition-colors" disabled={!commentText.trim()}>
                Publicar
            </button>
         </form>
      </div>
    </div>
  );
};

export default PostCard;