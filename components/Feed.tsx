import React from 'react';
import { Post, UserProfile, ActivePage } from '../types';
import PostCard from './PostCard';
import StoriesBar from './StoriesBar';

interface FeedProps {
    posts: Post[];
    handleLike: (postId: string) => void;
    handleComment: (postId: string, commentText: string) => void;
    currentUserName: string;
    userProfile: UserProfile;
    onNavigate: (page: ActivePage) => void;
    onAddStoryClick: () => void;
}

const Feed: React.FC<FeedProps> = ({ posts, handleLike, handleComment, currentUserName, userProfile, onNavigate, onAddStoryClick }) => {
    return (
        <div className="w-full max-w-lg mx-auto py-4 sm:py-6 lg:py-8">
            <StoriesBar userProfile={userProfile} onNavigate={onNavigate} onAddStoryClick={onAddStoryClick} />
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