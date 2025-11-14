import React from 'react';
import { Post, UserProfile, ActivePage, Story } from '../types';
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
    stories: Story[];
    onViewStory: (author: string) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, handleLike, handleComment, currentUserName, userProfile, onNavigate, onAddStoryClick, stories, onViewStory }) => {
    return (
        // Ajustado o preenchimento vertical para ser mais consistente e espaçoso.
        <div className="w-full max-w-lg mx-auto py-6">
            <StoriesBar 
                userProfile={userProfile} 
                onNavigate={onNavigate} 
                onAddStoryClick={onAddStoryClick}
                stories={stories}
                onViewStory={onViewStory}
            />
            {/* Aumentado o espaçamento entre a barra de stories e os posts, e entre os próprios posts para um layout mais limpo. */}
            <div className="space-y-6 mt-6">
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