import React from 'react';
import { Post, UserProfile, ActivePage, Story } from '../types';
import PostCard from './PostCard';
import StoriesBar from './StoriesBar';

interface FeedProps {
    posts: Post[];
    handleLike: (postId: string) => void;
    handleComment: (postId: string, commentText: string) => void;
    handleToggleFollow: (personId: number) => void;
    currentUserName: string;
    userProfile: UserProfile;
    onAddStoryClick: () => void;
    stories: Story[];
    onViewStory: (author: string) => void;
    handleBookmark: (postId: string) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, handleLike, handleComment, handleToggleFollow, currentUserName, userProfile, onAddStoryClick, stories, onViewStory, handleBookmark }) => {
    return (
        <div className="w-full max-w-xl mx-auto">
            <StoriesBar 
                userProfile={userProfile}
                onAddStoryClick={onAddStoryClick}
                stories={stories}
                onViewStory={onViewStory}
            />
            <div className="space-y-2">
                {posts.map(post => (
                    <PostCard 
                        key={post.id} 
                        post={post} 
                        onLike={handleLike} 
                        onComment={handleComment}
                        onBookmark={handleBookmark}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feed;