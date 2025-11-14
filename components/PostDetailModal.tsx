import React from 'react';
import { Post } from '../types';

interface PostDetailModalProps {
    post: Post;
    onClose: () => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose }) => {
    if (!post) return null;

    return (
        <div className="fixed inset-0 bg-black/75 z-[100] flex items-center justify-center p-4 animation-fade" onClick={onClose}>
            <div 
                className="relative max-w-[90vw] max-h-[90vh] bg-black rounded-xl overflow-hidden animation-fade-zoom"
                onClick={(e) => e.stopPropagation()}
            >
                {post.media.type === 'video' ? (
                    <video src={post.media.src} controls autoPlay className="block max-w-full max-h-[80vh] object-contain" />
                ) : (
                    <img src={post.media.src} alt={post.caption || ""} className="block max-w-full max-h-[80vh] object-contain" />
                )}
                
                {post.caption && <p className="text-white px-3 py-2 text-sm">{post.caption}</p>}
                
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2.5 bg-transparent border-none text-white text-2xl cursor-pointer hover:text-white/80"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default PostDetailModal;