import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Post, Comment } from '../types';
import { INITIAL_POSTS } from '../constants';
import PostCard from './PostCard';

const CreatePostForm: React.FC<{ onAddPost: (caption: string, file: File) => void }> = ({ onAddPost }) => {
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (caption.trim() && file) {
            onAddPost(caption, file);
            setCaption('');
            setFile(null);
            setPreview(null);
            (e.target as HTMLFormElement).reset();
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Criar Novo Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Escreva uma legenda..."
                    className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    rows={3}
                />
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {preview && (
                    <div className="mt-4">
                        {file?.type.startsWith('image/') ? (
                            <img src={preview} alt="Preview" className="max-h-48 rounded-md" />
                        ) : (
                            <video src={preview} controls className="max-h-48 rounded-md" />
                        )}
                    </div>
                )}
                <button type="submit" className="w-full bg-indigo-600 text-white rounded-md py-2 font-semibold hover:bg-indigo-700 transition-all duration-200 ease-in-out transform hover:scale-105 disabled:bg-slate-300 disabled:scale-100" disabled={!caption.trim() || !file}>
                    Publicar
                </button>
            </form>
        </div>
    );
};

const Feed: React.FC = () => {
    const [posts, setPosts] = useLocalStorage<Post[]>('socialnino-posts', INITIAL_POSTS);

    const addPost = (caption: string, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const newPost: Post = {
                id: `post-${Date.now()}`,
                author: 'Admin',
                timestamp: new Date().toISOString(),
                caption,
                media: {
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    src: reader.result as string,
                },
                likes: 0,
                comments: [],
            };
            // TODO: Replace this with an API call to your backend to save the post.
            setPosts(prevPosts => [newPost, ...prevPosts]);
        };
        reader.readAsDataURL(file);
    };

    const handleLike = (postId: string) => {
        // TODO: Replace this with an API call to your backend to handle likes.
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    const handleComment = (postId: string, commentText: string) => {
        const newComment: Comment = {
            id: `comment-${Date.now()}`,
            author: 'Visitante',
            text: commentText,
            timestamp: new Date().toISOString(),
        };
        // TODO: Replace this with an API call to your backend to save the comment.
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
        ));
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
            <CreatePostForm onAddPost={addPost} />
            <div className="space-y-8">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} />
                ))}
            </div>
        </div>
    );
};

export default Feed;