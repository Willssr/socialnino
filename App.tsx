import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Music from "./components/Music";
import Profile from "./components/Profile";
import BottomNav from "./components/BottomNav";
import {
  ActivePage,
  Post,
  Comment,
  UserProfile,
  Story,
  Person,
  Notification,
} from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  INITIAL_USER_PROFILE,
  INITIAL_PEOPLE,
  INITIAL_NOTIFICATIONS,
} from "./constants";
import AddStoryModal from "./components/AddStoryModal";
import StoryViewerModal from "./components/StoryViewerModal";
import NewPostModal from "./components/NewPostModal";
import Suggestions from "./components/Suggestions";
import Play from "./components/Play";
import NotificationsPanel from "./components/NotificationsPanel";
import SearchModal from "./components/SearchModal";
import { useNinoPoints } from "./context/NinoPointsContext";
import { useAuth } from "./AuthContext";
import AuthScreen from "./AuthScreen";

// 🔥 Realtime Database
import { db } from "./services/firebase";
import {
  ref as dbRef,
  push,
  set,
  update,
  onValue,
  query,
  orderByChild,
  off,
} from "firebase/database";

// 🔍 Modal de perfil público
import PublicProfileModal from "./components/PublicProfileModal";

const App: React.FC = () => {
  const { user, loading } = useAuth();

  const [activePage, setActivePage] = useState<ActivePage>("feed");
  const [pageDirection, setPageDirection] = useState<"left" | "right" | null>(
    null
  );
  const [pageOrder] = useState<ActivePage[]>([
    "feed",
    "search",
    "play",
    "music",
    "profile",
  ]);

  // 🔥 POSTS GLOBAIS (Realtime DB)
  const [posts, setPosts] = useState<Post[]>([]);

  // 🔥 STORIES GLOBAIS (Realtime DB)
  const [stories, setStories] = useState<Story[]>([]);

  // RESTO continua local
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>(
    "socialnino-user-profile",
    INITIAL_USER_PROFILE
  );
  const [people, setPeople] = useLocalStorage<Person[]>(
    "socialnino-people-v1",
    INITIAL_PEOPLE
  );
  const [notifications, setNotifications] = useLocalStorage<Notification[]>(
    "socialnino-notifications-v1",
    INITIAL_NOTIFICATIONS
  );

  const { addPoints } = useNinoPoints();

  const [isAddStoryModalOpen, setIsAddStoryModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newPostInitialCaption, setNewPostInitialCaption] = useState("");
  const [storyViewerState, setStoryViewerState] = useState<{
    isOpen: boolean;
    stories: Story[];
  }>({ isOpen: false, stories: [] });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // 🔍 estado para perfil público
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [publicProfileOpen, setPublicProfileOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // 🟦 BUSCAR POSTS GLOBAIS EM TEMPO REAL (normalizando dados)
  useEffect(() => {
    const postsQuery = query(dbRef(db, "posts"), orderByChild("timestamp"));

    const callback = (snapshot: any) => {
      const data = snapshot.val();
      if (!data) {
        setPosts([]);
        return;
      }

      const list: Post[] = Object.values(data).map((raw: any) => {
        const comments = Array.isArray(raw.comments) ? raw.comments : [];

        return {
          id: raw.id ?? "",
          author: {
            id: raw.author?.id ?? 0,
            username: raw.author?.username ?? "desconhecido",
            avatar: raw.author?.avatar ?? "",
            isFollowing: raw.author?.isFollowing ?? false,
          },
          timestamp: raw.timestamp ?? new Date().toISOString(),
          caption: raw.caption ?? "",
          media: {
            type: raw.media?.type ?? "image",
            src: raw.media?.src ?? "",
          },
          likes: typeof raw.likes === "number" ? raw.likes : 0,
          isLiked: !!raw.isLiked,
          isBookmarked: !!raw.isBookmarked,
          comments,
        } as Post;
      });

      // mais recentes primeiro
      list.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

      setPosts(list);
    };

    onValue(postsQuery, callback);

    return () => {
      off(postsQuery, "value", callback);
    };
  }, []);

  // 🟪 BUSCAR STORIES GLOBAIS EM TEMPO REAL (normalizando também)
  useEffect(() => {
    const storiesQuery = query(
      dbRef(db, "stories"),
      orderByChild("timestamp")
    );

    const callback = (snapshot: any) => {
      const data = snapshot.val();
      if (!data) {
        setStories([]);
        return;
      }

      const list: Story[] = Object.values(data).map((raw: any) => ({
        id: raw.id ?? "",
        author: raw.author ?? "desconhecido",
        avatar: raw.avatar ?? "",
        mediaSrc: raw.mediaSrc ?? "",
        mediaType: raw.mediaType ?? "image",
        timestamp: raw.timestamp ?? new Date().toISOString(),
      }));

      list.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      setStories(list);
    };

    onValue(storiesQuery, callback);

    return () => {
      off(storiesQuery, "value", callback);
    };
  }, []);

  const handleNavigate = (newPage: ActivePage) => {
    const ci = pageOrder.indexOf(activePage);
    const ni = pageOrder.indexOf(newPage);
    setPageDirection(ni > ci ? "left" : ni < ci ? "right" : null);
    setActivePage(newPage);
  };

  const handleOpenNewPostModal = (initialCaption: string = "") => {
    setNewPostInitialCaption(initialCaption);
    setIsNewPostModalOpen(true);
  };

  const handleCloseNewPostModal = () => {
    setIsNewPostModalOpen(false);
    setNewPostInitialCaption("");
  };

  // 🔁 SEGUIR ainda local (só mexe no estado local)
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
      addPoints("FOLLOW");
    }

    // efeito visual nos posts
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

  // 🔥 CRIAR POST GLOBAL (Realtime DB)
  const handleAddPost = (caption: string, file: File) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const newPostRef = push(dbRef(db, "posts"));
      const postId = newPostRef.key as string;

      const newPost: Post = {
        id: postId,
        author: {
          id: 0,
          username: userProfile.name,
          avatar: userProfile.avatar,
          isFollowing: false,
        },
        timestamp: new Date().toISOString(),
        caption,
        media: {
          type: file.type.startsWith("image/") ? "image" : "video",
          src: reader.result as string,
        },
        likes: 0,
        isLiked: false,
        isBookmarked: false,
        comments: [],
      };

      await set(newPostRef, newPost);

      addPoints("POST");
      handleCloseNewPostModal();
      handleNavigate("feed");
    };

    reader.readAsDataURL(file);
  };

  // ❤️ LIKE GLOBAL (Realtime DB)
  const handleLike = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const newLiked = !post.isLiked;
    const newLikes = newLiked ? post.likes + 1 : post.likes - 1;

    await update(dbRef(db, `posts/${postId}`), {
      isLiked: newLiked,
      likes: newLikes,
    });

    if (newLiked) addPoints("LIKE");
  };

  // 🔖 BOOKMARK GLOBAL
  const handleBookmark = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    await update(dbRef(db, `posts/${postId}`), {
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

    const newComments = Array.isArray(post.comments)
      ? [...post.comments, newComment]
      : [newComment];

    await update(dbRef(db, `posts/${postId}`), {
      comments: newComments,
    });

    addPoints("COMMENT");
  };

  // 🟪 SALVAR STORY GLOBAL
  const handleSaveStory = (storyFile: File) => {
    const reader = new FileReader();

    reader.onloadend = async () => {
      const newStoryRef = push(dbRef(db, "stories"));
      const storyId = newStoryRef.key as string;

      const newStory: Story = {
        id: storyId,
        author: userProfile.name,
        avatar: userProfile.avatar,
        mediaSrc: reader.result as string,
        mediaType: storyFile.type.startsWith("image/") ? "image" : "video",
        timestamp: new Date().toISOString(),
      };

      await set(newStoryRef, newStory);

      setIsAddStoryModalOpen(false);
    };

    reader.readAsDataURL(storyFile);
  };

  // VER STORIES GLOBAIS
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
    addPoints("CHALLENGE");
    handleOpenNewPostModal(legenda);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // 🔍 ABRIR PERFIL PÚBLICO
  const handleOpenPublicProfile = (personName: string) => {
    const person = people.find((p) => p.name === personName);
    if (!person) return;

    setSelectedPerson(person);
    setPublicProfileOpen(true);
  };

  const handleClosePublicProfile = () => {
    setPublicProfileOpen(false);
    setSelectedPerson(null);
  };

  const renderPage = () => {
    let pageComponent;
    switch (activePage) {
      case "music":
        pageComponent = <Music />;
        break;
      case "search":
        pageComponent = (
          <Suggestions people={people} onToggleFollow={handleToggleFollow} />
        );
        break;
      case "play":
        pageComponent = (
          <Play
            onParticipateInChallenge={handleParticipateInChallenge}
            currentUser={userProfile.name}
          />
        );
        break;
      case "profile":
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
      case "feed":
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
            onOpenProfile={handleOpenPublicProfile}
          />
        );
        break;
    }
    const animationClass =
      pageDirection === "left"
        ? "animate-slide-in-left"
        : pageDirection === "right"
        ? "animate-slide-in-right"
        : "";
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

        {/* Modal de perfil público */}
        {selectedPerson && (
          <PublicProfileModal
            person={selectedPerson}
            posts={posts.filter(
              (p) => p.author.username === selectedPerson.name
            )}
            isOpen={publicProfileOpen}
            onClose={handleClosePublicProfile}
            onToggleFollow={handleToggleFollow}
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
