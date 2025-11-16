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
  ChatMessage,
} from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  INITIAL_USER_PROFILE,
  INITIAL_PEOPLE,
} from "./constants";
import AddStoryModal from "./components/AddStoryModal";
import StoryViewerModal from "./components/StoryViewerModal";
import NewPostModal from "./components/NewPostModal";
import Suggestions from "./components/Suggestions";
import DownloadApp from "./components/DownloadApp";
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
  increment,
  get,
} from "firebase/database";

// 🔍 Modal de perfil público
import PublicProfileModal from "./components/PublicProfileModal";
import FriendsScreen from "./components/FriendsScreen";
import GlobalChatScreen from "./components/Chat/GlobalChatScreen";
import { useToast } from "./context/ToastContext";
import { usePrevious } from "./hooks/usePrevious";
import GamesScreen from "./components/Games/GamesScreen";

const App: React.FC = () => {
  const { user, loading } = useAuth();

  const [activePage, setActivePage] = useState<ActivePage>("feed");
  const [pageDirection, setPageDirection] = useState<"left" | "right" | null>(
    null
  );
  const [pageOrder] = useState<ActivePage[]>([
    "feed",
    "search",
    "friends",
    "chat",
    "games",
    "download",
    "music",
    "profile",
  ]);

  // 🔥 POSTS GLOBAIS (Realtime DB)
  const [posts, setPosts] = useState<Post[]>([]);

  // 🔥 STORIES GLOBAIS (Realtime DB)
  const [stories, setStories] = useState<Story[]>([]);
  
  // 💬 CHAT GLOBAL (Realtime DB)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  
  // 🔔 NOTIFICAÇÕES (Realtime DB)
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // RESTO continua local
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile>(
    "socialnino-user-profile",
    INITIAL_USER_PROFILE
  );
  const [people, setPeople] = useLocalStorage<Person[]>(
    "socialnino-people-v1",
    INITIAL_PEOPLE
  );

  const { addPoints } = useNinoPoints();
  const { addToast } = useToast();
  const prevPosts = usePrevious(posts);

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
          views: typeof raw.views === "number" ? raw.views : 0,
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
  
    // 💬 BUSCAR MENSAGENS DO CHAT GLOBAL EM TEMPO REAL
  useEffect(() => {
    const chatQuery = query(dbRef(db, "global-chat"), orderByChild("timestamp"));
    
    const callback = (snapshot: any) => {
        const data = snapshot.val();
        if (!data) {
            setChatMessages([]);
            return;
        }

        const list: ChatMessage[] = Object.values(data);
        setChatMessages(list);
    };

    onValue(chatQuery, callback);
    
    return () => {
        off(chatQuery, 'value', callback);
    };
  }, []);
  
  // 🔔 BUSCAR NOTIFICAÇÕES EM TEMPO REAL
  useEffect(() => {
    if (!userProfile.name) return;

    const notifRef = dbRef(db, `notifications/${userProfile.name}`);
    const q = query(notifRef, orderByChild("createdAt"));

    const unsub = onValue(q, (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.values(data) as Notification[];
        // mais recentes primeiro
        list.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setNotifications(list);
    });

    return () => off(q, "value", unsub);
  }, [userProfile.name]);

  // 🔔 EFFECT PARA NOTIFICAÇÕES TOAST
  useEffect(() => {
    if (!prevPosts || !userProfile.name || posts.length === 0) return;

    // 1. Check for new posts from others
    if (posts.length > prevPosts.length) {
      const newPost = posts.find(p => !prevPosts.some(op => op.id === p.id));
      if (newPost && newPost.author.username !== userProfile.name) {
        addToast({
          type: 'post',
          user: newPost.author,
          content: 'adicionou uma nova publicação.'
        });
      }
    }

    // 2. Check for new likes and comments on my posts
    posts.forEach(post => {
      if (post.author.username === userProfile.name) {
        const oldPost = prevPosts.find(p => p.id === post.id);
        if (oldPost) {
          // New Like
          if (post.likes > oldPost.likes) {
            const likerCandidates = people.filter(p => p.username !== userProfile.name);
            const randomLiker = likerCandidates[Math.floor(Math.random() * likerCandidates.length)] || { username: 'Alguém', avatar: 'https://i.pravatar.cc/150' };
            addToast({
              type: 'like',
              user: { username: randomLiker.username, avatar: randomLiker.avatar },
              content: 'curtiu sua publicação.'
            });
          }

          // New Comment
          if (post.comments.length > oldPost.comments.length) {
            const newComment = post.comments[post.comments.length - 1];
            if (newComment.author !== userProfile.name) {
              const commenter = people.find(p => p.username === newComment.author) || { username: newComment.author, avatar: 'https://i.pravatar.cc/150?u=' + newComment.author };
              addToast({
                type: 'comment',
                user: { username: commenter.username, avatar: commenter.avatar },
                content: `comentou: "${newComment.text.substring(0, 25)}..."`
              });
            }
          }
        }
      }
    });
  }, [posts, prevPosts, userProfile.name, addToast, people]);


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

  // 🔔 FUNÇÃO PARA CRIAR NOTIFICAÇÃO
  const createNotification = async (
    targetUsername: string,
    notificationData: Omit<Notification, "id" | "read" | "createdAt">
  ) => {
    // Não notificar a si mesmo
    if (targetUsername === userProfile.name) return;

    const notifRef = push(dbRef(db, `notifications/${targetUsername}`));
    const id = notifRef.key as string;

    const payload: Notification = {
      id,
      ...notificationData,
      createdAt: new Date().toISOString(),
      read: false,
    };

    await set(notifRef, payload);
  };

  // 🔁 SEGUIR (agora async para notificação)
  const handleToggleFollow = async (personId: number) => {
    let isFollowingAction = false;
    let followedPerson: Person | undefined;
    
    const newPeople = people.map((p) => {
      if (p.id === personId) {
        isFollowingAction = !p.isFollowing;
        if (isFollowingAction) {
            followedPerson = p;
        }
        return {
          ...p,
          isFollowing: !p.isFollowing,
          followers: p.isFollowing ? p.followers - 1 : p.followers + 1,
        };
      }
      return p;
    });

    setPeople(newPeople);

    if (isFollowingAction && followedPerson) {
      addPoints("FOLLOW");
      await createNotification(followedPerson.username, {
        type: "follow",
        fromUser: {
          id: 0,
          username: userProfile.name,
          avatar: userProfile.avatar,
        },
        message: `${userProfile.name} começou a seguir você.`,
      });
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
        views: 0,
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
    const likesIncrement = newLiked ? 1 : -1;

    // A contagem de curtidas é atualizada de forma atômica no Firebase.
    await update(dbRef(db, `posts/${postId}`), {
      isLiked: newLiked,
      likes: increment(likesIncrement),
    });

    if (newLiked) {
      addPoints("LIKE");
      await createNotification(post.author.username, {
        type: "like",
        fromUser: {
            id: 0,
            username: userProfile.name,
            avatar: userProfile.avatar,
        },
        postId: post.id,
        message: `${userProfile.name} curtiu seu post.`,
      });
    }
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
    await createNotification(post.author.username, {
        type: "comment",
        fromUser: {
            id: 0,
            username: userProfile.name,
            avatar: userProfile.avatar,
        },
        postId: post.id,
        message: `${userProfile.name} comentou no seu post.`,
    });
  };
  
  // 👁️ VIEW GLOBAL
  const handleView = async (postId: string) => {
    await update(dbRef(db, `posts/${postId}`), {
        views: increment(1)
    });
  };

  // 💬 ENVIAR MENSAGEM GLOBAL
  const handleSendMessage = async (content: string, type: 'text' | 'sticker') => {
      const newMessageRef = push(dbRef(db, 'global-chat'));
      const messageId = newMessageRef.key as string;

      const newMessage: ChatMessage = {
          id: messageId,
          author: {
              name: userProfile.name,
              avatar: userProfile.avatar
          },
          content,
          type,
          timestamp: new Date().toISOString()
      };
      
      await set(newMessageRef, newMessage);
  };

  // 👋 REAÇÃO À MENSAGEM GLOBAL
  const handleReaction = async (messageId: string, emoji: string) => {
    const reactionRef = dbRef(db, `global-chat/${messageId}/reactions/${userProfile.name}`);
    
    const snapshot = await get(reactionRef);
    if (snapshot.exists() && snapshot.val() === emoji) {
      // Se o usuário clicar no mesmo emoji, remove a reação
      await set(reactionRef, null);
    } else {
      // Adiciona ou atualiza a reação
      await set(reactionRef, emoji);
    }
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
  
  // 🎮 PONTUAÇÃO DE JOGOS GLOBAL
  const handleGamePoints = async (points: number) => {
    if (!userProfile.name) return;
    const userRef = dbRef(db, `users/${userProfile.name}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
        // Se o usuário não existe no ranking, cria com os metadados
        await set(userRef, {
            username: userProfile.name,
            avatar: userProfile.avatar,
            points: {
                total: points
            }
        });
    } else {
        // Se já existe, apenas incrementa os pontos
        const pointsRef = dbRef(db, `users/${userProfile.name}/points`);
        await update(pointsRef, {
            total: increment(points)
        });
    }
  };


  const handleMarkAllAsRead = async () => {
    const unreadNotifs = notifications.filter(n => !n.read);
    if (unreadNotifs.length === 0) return;

    const updates: { [key: string]: any } = {};
    unreadNotifs.forEach(notif => {
        updates[`notifications/${userProfile.name}/${notif.id}/read`] = true;
    });

    await update(dbRef(db), updates);
  };

  // 🔍 ABRIR PERFIL PÚBLICO
  const handleOpenPublicProfile = (personName: string) => {
    // FIX: Property 'name' does not exist on type 'Person'. Use 'username' instead.
    const person = people.find((p) => p.username === personName);
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
      case "friends":
        pageComponent = (
          <FriendsScreen people={people} onToggleFollow={handleToggleFollow} />
        );
        break;
      case "games":
        pageComponent = <GamesScreen handleGamePoints={handleGamePoints} />;
        break;
      case "chat":
        pageComponent = (
          <GlobalChatScreen 
            messages={chatMessages}
            currentUser={userProfile}
            onSendMessage={handleSendMessage}
            onReaction={handleReaction}
          />
        );
        break;
      case "download":
        pageComponent = <DownloadApp />;
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
            handleView={handleView}
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
      <div className={`w-full md:max-w-xl ${activePage === 'feed' ? 'min-h-screen bg-gradient-to-b from-[#05010F] via-[#050509] to-[#05010F]' : 'bg-backgroundDark'}`}>
        <Header
          unreadCount={unreadCount}
          onNotificationsClick={() =>
            setIsNotificationsOpen((prev) => !prev)
          }
        />

        <main className="flex-grow pt-16 pb-16">{renderPage()}</main>

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
            posts={posts}
            onClose={() => setIsNotificationsOpen(false)}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        )}

        {/* Modal de perfil público */}
        {selectedPerson && (
          <PublicProfileModal
            person={selectedPerson}
            posts={posts.filter(
              // FIX: Property 'name' does not exist on type 'Person'. Use 'username' instead.
              (p) => p.author.username === selectedPerson.username
            )}
            isOpen={publicProfileOpen}
            onClose={handleClosePublicProfile}
            onToggleFollow={handleToggleFollow}
            // FIX: Pass required props to PostCard through PublicProfileModal
            handleLike={handleLike}
            handleComment={handleComment}
            handleBookmark={handleBookmark}
            handleView={handleView}
            currentUserName={userProfile.name}
            onOpenProfile={handleOpenPublicProfile}
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