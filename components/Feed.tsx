import React from "react";
import { Post, UserProfile, Story } from "../types";
import PostCard from "./PostCard";
import StoriesBar from "./StoriesBar";

type FeedProps = {
  posts: Post[];
  handleLike: (postId: string) => void;
  handleComment: (postId: string, commentText: string) => void;
  currentUserName: string;
  userProfile: UserProfile;
  onAddStoryClick: () => void;
  stories: Story[];
  onViewStory: (author: string) => void;
  handleToggleFollow: (personId: number) => void;
  handleBookmark: (postId: string) => void;

  // 👇 ADICIONADO – necessario para abrir perfil público
  onOpenProfile: (username: string) => void;
};

const Feed: React.FC<FeedProps> = ({
  posts,
  handleLike,
  handleComment,
  currentUserName,
  userProfile,
  onAddStoryClick,
  stories,
  onViewStory,
  handleToggleFollow,
  handleBookmark,
  onOpenProfile, // ← importante
}) => {
  return (
    <div className="pb-20">
      {/* STORIES */}
      <StoriesBar
        userProfile={userProfile}
        stories={stories}
        onAddStoryClick={onAddStoryClick}
        onViewStory={onViewStory}
      />

      {/* POSTS */}
      <div className="mt-4 space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            handleLike={handleLike}
            handleComment={handleComment}
            currentUserName={currentUserName}
            handleToggleFollow={handleToggleFollow}
            handleBookmark={handleBookmark}
            onOpenProfile={onOpenProfile} // ← PASSADO PARA O CARD
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
