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
import UserSearchScreen from "./components/UserSearchScreen"; // Changed import
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
  onDisconnect,
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

  // 👥 SISTEMA DE SEGUIR (Novo)
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const [userStats, setUserStats] = useState({ followers: 0, following: 0, posts: 0 });

  // RESTO continua local (fallback)
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

  // 🟢 Sistema de presença de usuários online
  useEffect(() => {
    if (!user) return;

    // Reference to the user's online status in the database
    const userStatusRef = dbRef(db, `onlineUsers/${user.uid}`);
    const connectedRef = dbRef(db, '.info/connected');

    const unsubscribe = onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === false) return;
      onDisconnect(userStatusRef).remove();
      set(userStatusRef, true);
    });

    return () => unsubscribe();
  }, [user]);

  // 👥 CARREGAR QUEM EU SIGO (Realtime DB)
  useEffect(() => {
    if (!user) return;

    const followingRef = dbRef(db, `users/${user.uid}/following`);
    
    const unsubscribe = onValue(followingRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Cria um Set com os IDs dos usuários que eu sigo
        setFollowingIds(new Set(Object.keys(data)));
      } else {
        setFollowingIds(new Set());
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 📊 CARREGAR ESTATÍSTICAS DO MEU PERFIL (Realtime DB)
  useEffect(() => {
    if (!user) return;

    const statsRef = dbRef(db, `users/${user.uid}/stats`);
    
    const unsubscribe = onValue(statsRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserStats(snapshot.val());
      } else {
        // Se não existir, inicializa
        setUserStats({ followers: 0, following: 0, posts: 0 });
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 🔁 Sincronizar stats do Firebase com userProfile local visual
  useEffect(() => {
    setUserProfile(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        followers: userStats.followers || 0,
        following: userStats.following || 0,
        posts: posts.filter(p => p.author.username === prev.name).length // Calcula posts localmente baseado no feed
      }
    }));
  }, [userStats, posts, setUserProfile]);


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
        const commentsRaw = raw.comments || [];
        // Normaliza comentários e respostas
        const comments: Comment[] = Array.isArray(commentsRaw) 
            ? commentsRaw.map((c: any) => ({
                ...c,
                replies: Array.isArray(c.replies) ? c.replies : []
            })) 
            : [];
        
        const isLikedByCurrentUser = user && raw.userLikes ? !!raw.userLikes[user.uid] : false;
        // Verifica se seguimos o autor deste post
        const authorIdString = String(raw.author?.id);
        const isFollowingAuthor = followingIds.has(authorIdString);

        return {
          id: raw.id ?? "",
          author: {
            id: raw.author?.id ?? 0,
            username: raw.author?.username ?? "desconhecido",
            avatar: raw.author?.avatar ?? "",
            isFollowing: isFollowingAuthor, // Estado real vindo do DB
          },
          timestamp: raw.timestamp ?? new Date().toISOString(),
          caption: raw.caption ?? "",
          media: {
            type: raw.media?.type ?? "image",
            src: raw.media?.src ?? "",
          },
          likes: typeof raw.likes === "number" ? raw.likes : 0,
          views: typeof raw.views === "number" ? raw.views : 0,
          isLiked: isLikedByCurrentUser, 
          isBookmarked: !!raw.isBookmarked,
          comments,
        } as Post;
      });

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
  }, [user, followingIds]); // Recalcula quando user muda ou quando a lista de quem sigo muda

  // 🟪 BUSCAR STORIES GLOBAIS
  useEffect(() => {
    const storiesQuery = query(dbRef(db, "stories"));

    const callback = (snapshot: any) => {
      const data = snapshot.val();
      if (!data) {
        setStories([]);
        return;
      }

      const allStories: Story[] = Object.values(data).map((raw: any) => ({
        id: raw.id ?? "",
        author: raw.author ?? "desconhecido",
        avatar: raw.avatar ?? "",
        mediaSrc: raw.mediaSrc ?? "",
        mediaType: raw.mediaType ?? "image",
        createdAt: raw.createdAt ?? new Date(0).toISOString(),
      }));

      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      const validStories: Story[] = [];
      const expiredStoryIds: string[] = [];

      allStories.forEach(story => {
        const storyTime = new Date(story.createdAt).getTime();
        if (now - storyTime < twentyFourHours) {
          validStories.push(story);
        } else {
          expiredStoryIds.push(story.id);
        }
      });

      if (expiredStoryIds.length > 0) {
        const updates: { [key: string]: null } = {};
        expiredStoryIds.forEach(id => {
          updates[`stories/${id}`] = null;
        });
        update(dbRef(db), updates);
      }

      validStories.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setStories(validStories);
    };

    onValue(storiesQuery, callback);

    return () => {
      off(storiesQuery, "value", callback);
    };
  }, []);
  
  // 💬 CHAT GLOBAL
  useEffect(() => {
    const chatQuery = query(dbRef(db, "global-chat"), orderByChild("timestamp"));
    const callback = (snapshot: any) => {
        const data = snapshot.val();
        if (!data) {
            setChatMessages([]);
            return;
        }
        setChatMessages(Object.values(data));
    };
    onValue(chatQuery, callback);
    return () => off(chatQuery, 'value', callback);
  }, []);
  
  // 🔔 NOTIFICAÇÕES
  useEffect(() => {
    if (!userProfile.name) return;
    const notifRef = dbRef(db, `notifications/${userProfile.name}`);
    const q = query(notifRef, orderByChild("createdAt"));
    const unsub = onValue(q, (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.values(data) as Notification[];
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotifications(list);
    });
    return () => off(q, "value", unsub);
  }, [userProfile.name]);

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

  const createNotification = async (
    targetUsername: string,
    notificationData: Omit<Notification, "id" | "read" | "createdAt">
  ) => {
    if (targetUsername === userProfile.name) return;
    const notifRef = push(dbRef(db, `notifications/${targetUsername}`));
    await set(notifRef, {
      id: notifRef.key,
      ...notificationData,
      createdAt: new Date().toISOString(),
      read: false,
    });
  };

  // 🔁 SEGUIR
  const handleToggleFollow = async (personId: number | string) => {
    if (!user) return;

    const personIdStr = String(personId);
    const isFollowing = followingIds.has(personIdStr);
    
    let targetPerson = people.find(p => String(p.id) === personIdStr);
    let targetName = targetPerson?.username;
    
    if (!targetPerson) {
        const postFromAuthor = posts.find(p => String(p.author.id) === personIdStr);
        if (postFromAuthor) {
            targetName = postFromAuthor.author.username;
        }
    }

    if (!targetName) {
        console.warn("Não foi possível encontrar o usuário alvo para seguir.");
        return;
    }

    const updates: any = {};
    const myFollowingPath = `users/${user.uid}/following/${personIdStr}`;
    const myStatsPath = `users/${user.uid}/stats/following`;

    if (isFollowing) {
        updates[myFollowingPath] = null; 
        updates[myStatsPath] = increment(-1);

        if (targetPerson) {
            const newPeople = people.map(p => p.id === Number(personId) ? { ...p, isFollowing: false, followers: p.followers - 1 } : p);
            setPeople(newPeople);
        }

    } else {
        updates[myFollowingPath] = true;
        updates[myStatsPath] = increment(1);

        addPoints("FOLLOW");
        await createNotification(targetName, {
            type: "follow",
            fromUser: {
                id: user.uid,
                username: userProfile.name,
                avatar: userProfile.avatar,
            },
            message: `${userProfile.name} começou a seguir você.`,
        });

        if (targetPerson) {
            const newPeople = people.map(p => p.id === Number(personId) ? { ...p, isFollowing: true, followers: p.followers + 1 } : p);
            setPeople(newPeople);
        }
    }

    try {
        await update(dbRef(db), updates);
    } catch (error) {
        console.error("Erro ao seguir/deixar de seguir:", error);
    }
  };

  const handleAddPost = (caption: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const newPostRef = push(dbRef(db, "posts"));
      const postId = newPostRef.key as string;

      const newPost: Post = {
        id: postId,
        author: {
          id: user ? user.uid : 0, // Usa UID real se disponível
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
      if(user) {
        update(dbRef(db, `users/${user.uid}/stats`), {
            posts: increment(1)
        });
      }

      addPoints("POST");
      handleCloseNewPostModal();
      handleNavigate("feed");
    };
    reader.readAsDataURL(file);
  };

  const handleLike = async (postId: string) => {
    if (!user) return; 
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const isCurrentlyLiked = post.isLiked;
    const updates: any = {};

    if (isCurrentlyLiked) {
      updates[`posts/${postId}/userLikes/${user.uid}`] = null;
      updates[`posts/${postId}/likes`] = increment(-1);
    } else {
      updates[`posts/${postId}/userLikes/${user.uid}`] = true;
      updates[`posts/${postId}/likes`] = increment(1);
    }

    await update(dbRef(db), updates);

    if (!isCurrentlyLiked) {
      addPoints("LIKE");
      await createNotification(post.author.username, {
        type: "like",
        fromUser: { id: 0, username: userProfile.name, avatar: userProfile.avatar },
        postId: post.id,
        message: `${userProfile.name} curtiu seu post.`,
      });
    }
  };

  const handleBookmark = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    await update(dbRef(db, `posts/${postId}`), {
      isBookmarked: !post.isBookmarked,
    });
  };

  // Updated to handle nested replies
  const handleComment = async (postId: string, commentText: string, parentId?: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: userProfile.name,
      text: commentText,
      timestamp: new Date().toISOString(),
      replies: []
    };

    // Clone existing comments to modify them locally before sending
    // This is required because we can't easily use array updates with deep nesting in Firebase simple list structure
    // without knowing exact index paths.
    const updatedComments = [...(post.comments || [])];

    if (parentId) {
        // Find parent and add reply
        const parentIndex = updatedComments.findIndex(c => c.id === parentId);
        if (parentIndex !== -1) {
            const parent = { ...updatedComments[parentIndex] };
            parent.replies = [...(parent.replies || []), newComment];
            updatedComments[parentIndex] = parent;
        }
    } else {
        updatedComments.push(newComment);
    }

    // Update entire comments array for the post
    await update(dbRef(db, `posts/${postId}`), { comments: updatedComments });

    addPoints("COMMENT");
    await createNotification(post.author.username, {
        type: "comment",
        fromUser: { id: 0, username: userProfile.name, avatar: userProfile.avatar },
        postId: post.id,
        message: parentId ? `${userProfile.name} respondeu ao seu comentário.` : `${userProfile.name} comentou no seu post.`,
    });
  };
  
  const handleView = async (postId: string) => {
    await update(dbRef(db, `posts/${postId}`), { views: increment(1) });
  };

  const handleSendMessage = async (content: string, type: 'text' | 'sticker') => {
      const newMessageRef = push(dbRef(db, 'global-chat'));
      await set(newMessageRef, {
          id: newMessageRef.key,
          author: { name: userProfile.name, avatar: userProfile.avatar },
          content, type, timestamp: new Date().toISOString()
      });
  };

  const handleReaction = async (messageId: string, emoji: string) => {
    const reactionRef = dbRef(db, `global-chat/${messageId}/reactions/${userProfile.name}`);
    const snapshot = await get(reactionRef);
    if (snapshot.exists() && snapshot.val() === emoji) {
      await set(reactionRef, null);
    } else {
      await set(reactionRef, emoji);
    }
  };

  const handleSaveStory = (storyFile: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const newStoryRef = push(dbRef(db, "stories"));
      await set(newStoryRef, {
        id: newStoryRef.key,
        author: userProfile.name,
        avatar: userProfile.avatar,
        mediaSrc: reader.result as string,
        mediaType: storyFile.type.startsWith("image/") ? "image" : "video",
        createdAt: new Date().toISOString(),
      });
      setIsAddStoryModalOpen(false);
    };
    reader.readAsDataURL(storyFile);
  };

  const handleViewStory = (author: string) => {
    const userStories = stories
      .filter((s) => s.author === author)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    if (userStories.length > 0) {
      setStoryViewerState({ isOpen: true, stories: userStories });
    }
  };
  
  const handleGamePoints = async (points: number) => {
    if (!userProfile.name) return;
    const userRef = dbRef(db, `users/${userProfile.name}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
        await set(userRef, {
            username: userProfile.name,
            avatar: userProfile.avatar,
            points: { total: points }
        });
    } else {
        await update(dbRef(db, `users/${userProfile.name}/points`), { total: increment(points) });
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

  const handleOpenPublicProfile = (personName: string) => {
    let person = people.find((p) => p.username === personName);
    if (!person) {
        const post = posts.find(p => p.author.username === personName);
        if (post) {
            person = {
                id: post.author.id as number,
                username: post.author.username,
                avatar: post.author.avatar,
                bio: "Usuário do SocialNino",
                followers: 0, 
                isFollowing: post.author.isFollowing
            };
        }
    }
    if (!person) return;
    setSelectedPerson(person);
    setPublicProfileOpen(true);
  };

  const renderPage = () => {
    let pageComponent;
    switch (activePage) {
      case "music":
        pageComponent = <Music />;
        break;
      case "search":
        pageComponent = (
          <UserSearchScreen 
            people={people} 
            onToggleFollow={handleToggleFollow} 
            onOpenProfile={handleOpenPublicProfile}
          />
        );
        break;
      case "friends":
        pageComponent = <FriendsScreen people={people} onToggleFollow={handleToggleFollow} />;
        break;
      case "games":
        pageComponent = <GamesScreen handleGamePoints={handleGamePoints} />;
        break;
      case "chat":
        pageComponent = <GlobalChatScreen messages={chatMessages} currentUser={userProfile} onSendMessage={handleSendMessage} onReaction={handleReaction} />;
        break;
      case "download":
        pageComponent = <DownloadApp />;
        break;
      case "profile":
        const userPosts = posts.filter((post) => post.author.username === userProfile.name);
        pageComponent = <Profile userProfile={userProfile} onUpdateProfile={setUserProfile} userPosts={userPosts} />;
        break;
      case "feed":
      default:
        pageComponent = (
          <Feed
            posts={posts}
            followingIds={followingIds} // PASSANDO LISTA DE SEGUINDO
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
    const animationClass = pageDirection === "left" ? "animate-slide-in-left" : pageDirection === "right" ? "animate-slide-in-right" : "";
    return <div key={activePage} className={animationClass}>{pageComponent}</div>;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Carregando...</div>;
  if (!user) return <AuthScreen />;

  return (
    <div className="min-h-screen text-black dark:text-white flex flex-col md:items-center futuristic-bg">
      <div className="w-full md:max-w-xl bg-transparent min-h-screen">
        <Header unreadCount={unreadCount} onNotificationsClick={() => setIsNotificationsOpen((prev) => !prev)} />

        <main className="flex-grow pt-16 pb-16">{renderPage()}</main>

        {isNewPostModalOpen && <NewPostModal onClose={handleCloseNewPostModal} onAddPost={handleAddPost} initialCaption={newPostInitialCaption} />}
        {isAddStoryModalOpen && <AddStoryModal onClose={() => setIsAddStoryModalOpen(false)} onSave={handleSaveStory} />}
        {storyViewerState.isOpen && <StoryViewerModal stories={storyViewerState.stories} onClose={() => setStoryViewerState({ isOpen: false, stories: [] })} />}
        {isNotificationsOpen && <NotificationsPanel notifications={notifications} posts={posts} onClose={() => setIsNotificationsOpen(false)} onMarkAllAsRead={handleMarkAllAsRead} />}

        {selectedPerson && (
          <PublicProfileModal
            person={selectedPerson}
            posts={posts.filter((p) => p.author.username === selectedPerson.username)}
            isOpen={publicProfileOpen}
            onClose={() => { setPublicProfileOpen(false); setSelectedPerson(null); }}
            onToggleFollow={handleToggleFollow}
            handleLike={handleLike}
            handleComment={handleComment}
            handleBookmark={handleBookmark}
            handleView={handleView}
            currentUserName={userProfile.name}
            onOpenProfile={handleOpenPublicProfile}
            followingIds={followingIds} // PASSANDO PARA O MODAL
          />
        )}

        <BottomNav activePage={activePage} onNavigate={handleNavigate} onNewPostClick={() => handleOpenNewPostModal()} userAvatar={userProfile.avatar} />
      </div>
    </div>
  );
};

export default App;