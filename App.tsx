import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import Music from './components/Music';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';
import {
  ActivePage,
  Post,
  Comment,
  UserProfile,
  Story,
  Person,
  Notification,
} from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  INITIAL_USER_PROFILE,
  INITIAL_PEOPLE,
  INITIAL_NOTIFICATIONS,
} from './constants';
import AddStoryModal from './components/AddStoryModal';
import StoryViewerModal from './components/StoryViewerModal';
import NewPostModal from './components/NewPostModal';
import Suggestions from './components/Suggestions';
import Play from './components/Play';
import NotificationsPanel from './components/NotificationsPanel';
import SearchModal from './components/SearchModal';
import { useNinoPoints } from './context/NinoPointsContext';
import { useAuth } from './AuthContext';
import AuthScreen from './AuthScreen';

// 🔥 Firebase
import { db } from './services/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from 'firebase/firestore';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  const [activePage, setActivePage] = useState<ActivePage>('feed');
  const [pageDirection, setPageDirection] = useState<'left' | 'right' | null>(null);
  const [pageOrder] = useState<ActivePage[]>([
    'feed',
    'search',
    'play',
    'music',
    'profile',
  ]);

  // 🔥 POSTS GLOBAIS
  const [posts, setPosts] = useState<Post[]>([]);

  // 🔥 STORIES GLOBAIS
  const [stories, setStories] = useState<Story[]>([]);

  // RESTO LOCAL
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>(
    'socialnino-user-profile',
    INITIAL_USER_PROFILE
  );
  const [people, setPeople] = useLocalStorage<Person[]>(
    'socialnino-people-v1',
    INITIAL_PEOPLE
  );
  const [notifications, setNotifications] = useLocalStorage<Notification[]>(
    'socialnino-notifications-v1',
    INITIAL_NOTIFICATIONS
  );

  const { addPoints } = useNinoPoints();

  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newPostInitialCaption, setNewPostInitialCaption] = useState('');
  const [storyViewerState, setStoryViewerState] = useState<{
    isOpen: boolean;
    stories: Story[];
  }>({ isOpen: false, stories: [] });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // 🟦 POSTS EM TEMPO REAL (GLOBAL)
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    const unsub = onSnapshot(q, (snapshot) => {
      const list: Post[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Post, 'id'>;
        return { id: docSnap.id, ...data };
      });
      setPosts(list);
    });

    return () => unsub();
  }, []);

  // 🟪 STORIES EM TEMPO REAL (GLOBAL)
  useEffect(() => {
    const q = query(collection(db, 'stories'), orderBy('timestamp', 'desc'));

    const unsub = onSnapshot(q, (snapshot) => {
      const list: Story[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as Omit<Story, 'id'>;
        return { id: docSnap.id, ...data };
      });
      setStories(list);
    });

    return () => unsub();
  }, []);

  const handleNavigate = (newPage: ActivePage) => {
    const ci = pageOrder.indexOf(activePage);
    const ni = pageOrder.indexOf(newPage);
    setPageDirection(ni > ci ? 'left' : ni < ci ? 'right' : null);
    setActivePage(newPage);
  };

  const handleOpenNewPostModal = (initialCaption: string = '') => {
    setNewPostInitialCaption(initialCaption);
    setIsNewPostModalOpen(true);
  };

  const handleCloseNewPostModal = () => {
    setIsNewPostModalOpen(false);
    setNewPostInitialCaption('');
  };

  // 🔁 SEGUIR AINDA LOCAL (se depois quiser, fazemos global)
  const handleToggleFollow = (personId: number) => {
    let isFollowingAction = false;
    setPeople((prevPeople) =>
      prevPeople.map((p) => {
        if (p.id === personId) {
          isFollowingAction = !p.isFollowing;
          return {
            ...p,
            isFollowing: !p.isFollowing,
            followers: p.isFollowing ? p.followers - 1 : p.followers + 1,
          };
        }
        return p;
      })
    );
    if (isFollowingAction) {
      addPoints('FOLLOW');
    }

    // só visual nos posts (não global ainda)
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.author.id === personId
          ? {
              ...post,
              author: {
                ...post.author,
                isFollowing: !post.author.isFollowing,
              },
            }
          : post
      )
    );
  };

  // 🔥 ADD POST GLOBAL
  const handleAddPost = (caption: string, file: File) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const newPost: Omit<Post, 'id'> = {
        author: {
          id: 0,
          username: userProfile.name,
          avatar: userProfile.avatar,
          isFollowing: false,
        },
        timestamp: new Date().toISOString(),
        caption,
        media: {
          type: file.type.startsWith('image/') ? 'image' : 'video',
          src: reader.result as string,
        },
        likes: 0,
        isLiked: false,
        isBookmarked: false,
        comments: [],
      };

      await addDoc(collection(db, 'posts'), newPost);

      addPoints('POST');
      handleCloseNewPostModal();
      handleNavigate('feed');
    };

    reader.readAsDataURL(file);
  };

  // ❤️ LIKE GLOBAL
  const handleLike = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const newLiked = !post.isLiked;
    const newLikes = newLiked ? post.likes + 1 : post.likes - 1;

    await updateDoc(doc(db, 'posts', postId), {
      isLiked: newLiked,
      likes: newLikes,
    });

    if (newLiked) addPoints('LIKE');
  };

  // 🔖 BOOKMARK GLOBAL
  const handleBookmark = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    await updateDoc(doc(db, 'posts', postId), {
      isBookmarked: !post.isBookmarked,
    });
  };

  // 💬 COMENTÁRIO GLOBAL
  const handleComment = async (postId: string, commentText: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: userProfile.name,
      text: commentText,
      timestamp: new Date().toISOString(),
    };

    await updateDoc(doc(db, 'posts', postId), {
      comments: [...post.comments, newComment],
    });

    addPoints('COMMENT');
  };

  // 🟪 SALVAR STORY GLOBAL
  const handleSaveStory = (storyFile: File) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const newStory: Omit<Story, 'id'> = {
        author: userProfile.name,
        avatar: userProfile.avatar,
        mediaSrc: reader.result as string,
        mediaType: storyFile.type.startsWith('image/') ? 'image' : 'video',
        timestamp: new Date().toISOString(),
      };

      await addDoc(collection(db, 'stories'), newStory);

      setIsAddStoryModalOpen(false);
    };

    reader.readAsDataURL(storyFile);
  };

  // 🟪 VER STORIES (AGORA VINDO DO FIRESTORE)
  const handleViewStory = (author: string) => {
    const userStories = stories
      .filter((s) => s.author === author)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

    if (userStories.length > 0) {
      setStoryViewerState({ isOpen: true, stories: userStories });
    }
  };

  const handleParticipateInChallenge = ({ legenda }: { legenda: string }) => {
    addPoints('CHALLENGE');
    handleOpenNewPostModal(legenda);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const renderPage = () => {
    let pageComponent;
    switch (activePage) {
      case 'music':
        pageComponent = <Music />;
        break;
      case 'search':
        pageComponent = (
          <Suggestions people={people} onToggleFollow={handleToggleFollow} />
        );
        break;
      case 'play':
        pageComponent = (
          <Play
            onParticipateInChallenge={handleParticipateInChallenge}
            currentUser={userProfile.name}
          />
        );
        break;
      case 'profile':
        const userPosts = posts.filter(
          (post) => post.author.username === userProfile.name
        );
        pageComponent = (
          <Profile
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
            userPosts={userPosts}
          />
        );
        break;
      case 'feed':
      default:
        pageComponent = (
          <Feed
            posts={posts}
            handleLike={handleLike}
            handleComment={handleComment}
            currentUserName={userProfile.name}
            userProfile={userProfile}
            onAddStoryClick={() => setIsAddStoryModalOpen(true)}
            stories={stories}
            onViewStory={handleViewStory}
            handleToggleFollow={handleToggleFollow}
            handleBookmark={handleBookmark}
          />
        );
        break;
    }
    const animationClass =
      pageDirection === 'left'
        ? 'animate-slide-in-left'
        : pageDirection === 'right'
        ? 'animate-slide-in-right'
        : '';
    return (
      <div key={activePage} className={animationClass}>
        {pageComponent}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen text-black dark:text-white flex flex-col md:items-center">
      <div className="w-full md:max-w-xl bg-white dark:bg-black">
        <Header
          unreadCount={unreadCount}
          onNotificationsClick={() =>
            setIsNotificationsOpen((prev) => !prev)
          }
        />

        <main className="flex-grow pb-16">{renderPage()}</main>

        {isNewPostModalOpen && (
          <NewPostModal
            onClose={handleCloseNewPostModal}
            onAddPost={handleAddPost}
            initialCaption={newPostInitialCaption}
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
            onClose={() =>
              setStoryViewerState({ isOpen: false, stories: [] })
            }
          />
        )}

        {isNotificationsOpen && (
          <NotificationsPanel
            notifications={notifications}
            onClose={() => setIsNotificationsOpen(false)}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        )}

        <BottomNav
          activePage={activePage}
          onNavigate={handleNavigate}
          onNewPostClick={() => handleOpenNewPostModal()}
          userAvatar={userProfile.avatar}
        />
      </div>
    </div>
  );
};

export default App;
