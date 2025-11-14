
import React from 'react';
import { Post } from '../types';
import PostCard from './PostCard';
import StoriesBar from './StoriesBar';

interface FeedProps {
    posts: Post[];
    handleLike: (postId: string) => void;
    handleComment: (postId: string, commentText: string) => void;
    currentUserName: string;
}

const Feed: React.FC<FeedProps> = ({ posts, handleLike, handleComment, currentUserName }) => {
    return (
        <div className="w-full max-w-lg mx-auto py-4 sm:py-6 lg:py-8">
            <StoriesBar />
            <div className="space-y-4 mt-4">
                {posts.map(post => (
                    <PostCard 
                        key={post.id} 
                        post={post} 
                        onLike={handleLike} 
                        onComment={handleComment}
                        currentUserName={currentUserName}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feed;