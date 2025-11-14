
import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Post, Comment } from '../types';
import { INITIAL_POSTS } from '../constants';
import PostCard from './PostCard';
import StoriesBar from './StoriesBar';

const Feed: React.FC = () => {
    const [posts, setPosts] = useLocalStorage<Post[]>('socialnino-posts-v2', INITIAL_POSTS);

    // TODO: Connect this to a real backend API in the future.
    const addPost = (caption: string, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newPost: Post = {
                id: `post-${Date.now()}`,
                author: 'SocialNino',
                authorAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
                timestamp: new Date().toISOString(),
                caption,
                media: {
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    src: reader.result as string,
                },
                likes: 0,
                isLiked: false,
                comments: [],
            };
            setPosts(prevPosts => [newPost, ...prevPosts]);
        };
        reader.readAsDataURL(file);
    };

    // This function will be passed to the CreatePostModal
    // For now, it's just a placeholder, but it shows how it would be structured.
    // In App.tsx, we will lift the state up to manage posts and pass this function down.
    (window as any).addPost = addPost;


    const handleLike = (postId: string) => {
        // TODO: Replace this with an API call to your backend to handle likes.
        setPosts(posts.map(post =>
            post.id === postId 
            ? { ...post, 
                likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                isLiked: !post.isLiked
              } 
            : post
        ));
    };

    const handleComment = (postId: string, commentText: string) => {
        const newComment: Comment = {
            id: `comment-${Date.now()}`,
            author: 'Você',
            text: commentText,
            timestamp: new Date().toISOString(),
        };
        // TODO: Replace this with an API call to your backend to save the comment.
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
        ));
    };

    return (
        <div className="w-full max-w-lg mx-auto py-4 sm:py-6 lg:py-8">
            <StoriesBar />
            <div className="space-y-4 mt-4">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
                ))}
            </div>
        </div>
    );
};

export default Feed;