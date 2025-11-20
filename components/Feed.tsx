import React, { useState, useMemo } from "react";
import { Post, UserProfile, Story } from "../types";
import PostCard from "./PostCard";
import StoriesBar from "./StoriesBar";
import { BoltIcon, UsersIcon } from "./Icons";

type FeedProps = {
  posts: Post[];
  followingIds: Set<string>; // NEW PROP
  handleLike: (postId: string) => void;
  handleComment: (postId: string, commentText: string) => void;
  handleView: (postId: string) => void;
  currentUserName: string;
  userProfile: UserProfile;
  onAddStoryClick: () => void;
  stories: Story[];
  onViewStory: (author: string) => void;
  handleToggleFollow: (personId: number) => void;
  handleBookmark: (postId: string) => void;
  onOpenProfile: (username: string) => void;
};

const Feed: React.FC<FeedProps> = ({
  posts,
  followingIds,
  handleLike,
  handleComment,
  handleView,
  currentUserName,
  userProfile,
  onAddStoryClick,
  stories,
  onViewStory,
  handleToggleFollow,
  handleBookmark,
  onOpenProfile,
}) => {
  const [filter, setFilter] = useState<'all' | 'following'>('all');

  // Filter posts based on selected tab
  const filteredPosts = useMemo(() => {
    if (filter === 'all') return posts;
    return posts.filter(post => {
      // Convert IDs to string for comparison
      const authorIdStr = String(post.author.id);
      // Show post if I follow the author OR if it's my own post
      return followingIds.has(authorIdStr) || post.author.username === currentUserName;
    });
  }, [posts, filter, followingIds, currentUserName]);

  return (
    <div className="pb-20">
      {/* STORIES */}
      <StoriesBar
        userProfile={userProfile}
        stories={stories}
        onAddStoryClick={onAddStoryClick}
        onViewStory={onViewStory}
      />

      {/* FILTER TABS */}
      <div className="flex items-center justify-center mt-2 mb-4 border-b border-borderNeon/30 sticky top-16 z-40 bg-backgroundDark/95 backdrop-blur-sm pt-2">
        <button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all duration-300 relative ${
                filter === 'all' ? 'text-secondary' : 'text-textDark hover:text-textLight'
            }`}
        >
            <BoltIcon className="w-4 h-4" />
            Explorar
            {filter === 'all' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary shadow-[0_0_10px_#00E5FF]" />
            )}
        </button>
        <button
            onClick={() => setFilter('following')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all duration-300 relative ${
                filter === 'following' ? 'text-primary' : 'text-textDark hover:text-textLight'
            }`}
        >
            <UsersIcon className="w-4 h-4" />
            Seguindo
            {filter === 'following' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_#7B2FF7]" />
            )}
        </button>
      </div>

      {/* POSTS */}
      <div className="mt-2 space-y-4 px-2 sm:px-0">
        {filteredPosts.length === 0 ? (
            <div className="text-center py-10 text-textDark">
                {filter === 'following' ? (
                    <div>
                        <p className="mb-2">Você ainda não segue ninguém ou eles não postaram nada.</p>
                        <p className="text-xs">Vá em "Amigos" ou "Explorar" para encontrar pessoas!</p>
                    </div>
                ) : (
                    <p>Nenhuma publicação encontrada.</p>
                )}
            </div>
        ) : (
            filteredPosts.map((post) => (
            <PostCard
                key={post.id}
                post={post}
                handleLike={handleLike}
                handleComment={handleComment}
                handleView={handleView}
                currentUserName={currentUserName}
                handleToggleFollow={handleToggleFollow}
                handleBookmark={handleBookmark}
                onOpenProfile={onOpenProfile}
            />
            ))
        )}
      </div>
    </div>
  );
};

export default Feed;