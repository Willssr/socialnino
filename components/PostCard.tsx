import React, { useState } from 'react';
import { Post } from '../types';
import { HeartIcon, CommentIcon } from './Icons';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, commentText: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="font-semibold text-slate-800">{post.caption}</h2>
        <p className="text-xs text-slate-500 mt-1">{formatDate(post.timestamp)}</p>
      </div>

      {post.media.type === 'image' ? (
        <img src={post.media.src} alt={post.caption} className="w-full object-cover" />
      ) : (
        <video controls src={post.media.src} className="w-full">
          Your browser does not support the video tag.
        </video>
      )}

      <div className="p-4">
        <div className="flex items-center space-x-6">
          <button onClick={() => onLike(post.id)} className="flex items-center space-x-2 text-slate-500 hover:text-red-500 transition-colors group">
            <HeartIcon className="w-6 h-6 group-hover:fill-red-500 transition-transform duration-150 group-hover:scale-110" />
            <span className="font-medium">{post.likes}</span>
          </button>
          <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 text-slate-500 hover:text-indigo-500 transition-colors">
            <CommentIcon className="w-6 h-6" />
            <span className="font-medium">{post.comments.length}</span>
          </button>
        </div>

        {showComments && (
           <div className="mt-4 pt-4 border-t border-slate-200">
             <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {post.comments.length > 0 ? post.comments.map(comment => (
                    <div key={comment.id} className="bg-slate-100 rounded-lg p-2 text-sm">
                        <p className="font-semibold text-slate-700">{comment.author}</p>
                        <p className="text-slate-600">{comment.text}</p>
                    </div>
                )) : <p className="text-sm text-slate-400">Seja o primeiro a comentar!</p>}
             </div>
             
             <form onSubmit={handleCommentSubmit} className="mt-4 flex space-x-2">
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="flex-grow border border-slate-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button type="submit" className="bg-indigo-600 text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-indigo-700 transition-colors">
                    Comentar
                </button>
             </form>
           </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;