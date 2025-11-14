

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import Music from './components/Music';
import About from './components/About';
import Download from './components/Download';
import Profile from './components/Profile';
import Geolocation from './components/Geolocation';
import BottomNav from './components/BottomNav';
import { PlusCircleIcon } from './components/Icons';
import { ActivePage, Post, Comment, UserProfile, Story } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_POSTS, INITIAL_USER_PROFILE, INITIAL_STORIES } from './constants';
import AddStoryModal from './components/AddStoryModal';
import StoryViewerModal from './components/StoryViewerModal';
import NewPostModal from './components/NewPostModal';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('feed');
  const [posts, setPosts] = useLocalStorage<Post[]>('socialnino-posts-v2', INITIAL_POSTS);
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('socialnino-user-profile', INITIAL_USER_PROFILE);
  const [stories, setStories] = useLocalStorage<Story[]>('socialnino-stories-v1', INITIAL_STORIES);
  
  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [storyViewerState, setStoryViewerState] = useState<{isOpen: boolean, stories: Story[]}>({isOpen: false, stories: []});

  // Effect to migrate user profile data if 'stats' is missing
  useEffect(() => {
    if (userProfile && !userProfile.stats) {
      setUserProfile(prevProfile => ({
        ...prevProfile,
        stats: INITIAL_USER_PROFILE.stats,
      }));
    }
  }, [userProfile, setUserProfile]);

  const handleAddPost = (caption: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const newPost: Post = {
            id: `post-${Date.now()}`,
            author: userProfile.name,
            authorAvatar: userProfile.avatar,
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
        setIsNewPostModalOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const handleLike = (postId: string) => {
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
        author: userProfile.name,
        text: commentText,
        timestamp: new Date().toISOString(),
    };
    setPosts(posts.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
    ));
  };

  const handleSaveStory = (storyFile: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        const newStory: Story = {
            id: `story-${Date.now()}`,
            author: userProfile.name,
            avatar: userProfile.avatar,
            mediaSrc: reader.result as string,
            mediaType: storyFile.type.startsWith('image/') ? 'image' : 'video',
            timestamp: new Date().toISOString(),
        };
        setStories(prevStories => [...prevStories, newStory]);
        setIsAddStoryModalOpen(false);
    };
    reader.readAsDataURL(storyFile);
  };
  
  const handleViewStory = (author: string) => {
    const authorStories = stories
        .filter(s => s.author === author)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    if (authorStories.length > 0) {
        setStoryViewerState({ isOpen: true, stories: authorStories });
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'music':
        return <Music />;
      case 'about':
        return <About />;
      case 'download':
        return <Download />;
      case 'profile':
        const userPosts = posts.filter(post => post.author === userProfile.name);
        return <Profile userProfile={userProfile} onUpdateProfile={setUserProfile} userPosts={userPosts} />;
      case 'feed':
      default:
        return <Feed 
                  posts={posts} 
                  handleLike={handleLike} 
                  handleComment={handleComment} 
                  currentUserName={userProfile.name}
                  userProfile={userProfile}
                  onNavigate={setActivePage}
                  onAddStoryClick={() => setIsAddStoryModalOpen(true)}
                  stories={stories}
                  onViewStory={handleViewStory}
                />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 flex flex-col">
      <Header userProfile={userProfile} onNavigate={setActivePage} />
      
      <main className="flex-grow pb-16 md:pb-0">
        <div className="container mx-auto px-0 sm:px-4">
            {renderPage()}
        </div>
      </main>

       <button 
        onClick={() => setIsNewPostModalOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-40"
        aria-label="Criar novo post"
        >
          <PlusCircleIcon className="w-10 h-10" />
      </button>
      
      {isNewPostModalOpen && (
        <NewPostModal
            onClose={() => setIsNewPostModalOpen(false)}
            onAddPost={handleAddPost}
        />
      )}

      {isAddStoryModalOpen && (
        <AddStoryModal 
          onClose={() => setIsAddStoryModalOpen(false)}
          onSave={handleSaveStory}
        />
      )}

      {storyViewerState.isOpen && (
          <StoryViewerModal
            stories={storyViewerState.stories}
            onClose={() => setStoryViewerState({ isOpen: false, stories: [] })}
          />
      )}

      <BottomNav activePage={activePage} setActivePage={setActivePage} />

      <footer className="hidden md:block text-center py-4 text-sm text-slate-500 border-t border-slate-200/80 mt-8">
        <div className="space-y-2">
            <Geolocation />
            <p>&copy; {new Date().getFullYear()} SocialNino. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
