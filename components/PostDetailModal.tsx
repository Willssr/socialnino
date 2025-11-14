import React, { useState } from 'react';
import { Post } from '../types';
import { BookmarkIcon, CommentIcon, DotsHorizontalIcon, HeartIcon, PaperAirplaneIcon } from './Icons';

interface PostDetailModalProps {
    post: Post;
    onClose: () => void;
    onLike: (postId: string) => void;
    onComment: (postId: string, commentText: string) => void;
    currentUserName: string;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose, onLike, onComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText.trim()) {
            onComment(post.id, commentText);
            setCommentText('');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animation-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Media Section */}
                <div className="w-full md:w-1/2 lg:w-3/5 bg-black flex items-center justify-center">
                    {post.media.type === 'image' ? (
                        <img src={post.media.src} alt={post.caption} className="w-full max-h-[50vh] md:max-h-full object-contain" />
                    ) : (
                        <video controls autoPlay src={post.media.src} className="w-full max-h-[50vh] md:max-h-full object-contain bg-black" />
                    )}
                </div>

                {/* Info Section */}
                <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                            <img src={post.authorAvatar} alt={post.author} className="w-9 h-9 rounded-full" />
                            <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">{post.author}</span>
                        </div>
                        <button className="text-slate-500 dark:text-slate-400">
                            <DotsHorizontalIcon className="w-5 h-5"/>
                        </button>
                    </div>
                    
                    {/* Caption & Comments (Scrollable) */}
                    <div className="flex-grow p-4 overflow-y-auto">
                        {/* Caption */}
                        <div className="flex items-start space-x-3 mb-4">
                            <img src={post.authorAvatar} alt={post.author} className="w-9 h-9 rounded-full flex-shrink-0" />
                            <div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    <span className="font-semibold text-slate-800 dark:text-slate-100">{post.author}</span>{' '}
                                    {post.caption}
                                </p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{formatDate(post.timestamp)}</p>
                            </div>
                        </div>
                        
                        {/* Comments */}
                        <div className="space-y-4">
                           {post.comments.map(comment => (
                               <div key={comment.id} className="flex items-start space-x-3">
                                   <img src={post.authorAvatar} alt={comment.author} className="w-9 h-9 rounded-full flex-shrink-0" />
                                   <div>
                                       <p className="text-sm text-slate-700 dark:text-slate-300">
                                           <span className="font-semibold text-slate-800 dark:text-slate-100">{comment.author}</span>{' '}
                                           {comment.text}
                                       </p>
                                       <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{formatDate(comment.timestamp)}</p>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </div>

                    {/* Actions & Form (Fixed at bottom) */}
                    <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mt-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button onClick={() => onLike(post.id)} className={`group transition-transform duration-200 ease-out hover:scale-110 ${post.isLiked ? 'text-red-500' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
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
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 mt-3">{post.likes.toLocaleString('pt-BR')} curtidas</p>
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
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl z-[101] hover:text-white/80">&times;</button>
        </div>
    );
};

export default PostDetailModal;