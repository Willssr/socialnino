import React, { useState, useEffect } from "react";
import { UserProfile, Post, Person } from "../types";
import { db } from "../services/firebase";
import { ref, onValue, off } from "firebase/database";
import { HeartIcon, CommentIcon, PlayIcon } from "./Icons";
import FollowButton from "./FollowButton";
import PostDetailModal from "./PostDetailModal";

interface PublicProfileScreenProps {
  userId: string;
  allPosts: Post[];
  loggedInUserProfile: UserProfile;
  people: Person[];
  onToggleFollow: (personId: number) => void;
  // PostCard props
  handleLike: (postId: string) => void;
  handleComment: (postId: string, text: string) => void;
  handleBookmark: (postId: string) => void;
  handleView: (postId: string) => void;
  onOpenProfile: (username: string) => void;
}

const PublicProfileScreen: React.FC<PublicProfileScreenProps> = ({
  userId,
  allPosts,
  loggedInUserProfile,
  people,
  onToggleFollow,
  handleLike,
  handleComment,
  handleBookmark,
  handleView,
  onOpenProfile,
}) => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const targetPerson = people.find(p => p.username === userId);
  
  useEffect(() => {
    setLoading(true);
    const userRef = ref(db, `users/${userId}`);
    
    const unsub = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fetchedProfile: UserProfile = {
          name: data.username || userId,
          avatar: data.avatar || 'https://i.pravatar.cc/150?u=' + userId,
          coverPhoto: data.coverPhoto || 'https://picsum.photos/id/1018/1200/400',
          bio: data.bio || 'Bem-vindo ao meu perfil!',
          stats: data.stats || { posts: 0, followers: 0, following: 0 },
        };
        setProfileData(fetchedProfile);
      } else {
        setProfileData(null); // User not found in DB
      }
      setLoading(false);
    });

    return () => off(userRef, 'value', unsub);
  }, [userId]);

  const userPosts = allPosts.filter(post => post.author.username === userId);

  if (loading) {
    return (
        <div className="w-full text-center p-10 text-textDark">
            Carregando perfil...
        </div>
    );
  }
  
  if (!profileData || !targetPerson) {
      return (
          <div className="w-full text-center p-10 text-textDark">
              Usuário não encontrado.
          </div>
      );
  }

  const stats = [
    { label: "publicações", value: profileData.stats?.posts.toLocaleString("pt-BR") ?? '0' },
    { label: "seguidores", value: profileData.stats?.followers.toLocaleString("pt-BR") },
    { label: "seguindo", value: profileData.stats?.following.toLocaleString("pt-BR") },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto text-textLight animate-fade-in">
      {/* CAPA */}
      <div className="relative w-full h-32 md:h-40 bg-gradient-to-r from-[#1b1b2f] via-[#111111] to-[#1b1b2f] overflow-hidden shadow-lg">
        {profileData.coverPhoto && <img src={profileData.coverPhoto} alt="Foto de capa" className="w-full h-full object-cover" />}
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="p-4 -mt-10">
        <div className="flex items-center my-6">
          <div className="relative w-24 h-24">
            <img src={profileData.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-borderNeon" />
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-neon-pulse opacity-50" />
          </div>
          <div className="flex-grow flex justify-around items-center">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">{stat.value}</span>
                <span className="block text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">{profileData.name}</p>
          <p className="text-sm mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">{profileData.bio}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 my-4">
            <FollowButton 
                isFollowing={targetPerson.isFollowing} 
                onClick={() => onToggleFollow(targetPerson.id)}
            />
            <button className="flex-1 bg-cardDark border border-borderNeon text-textLight px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:border-primary hover:text-white">Mensagem</button>
        </div>
      </div>

      {/* User Posts Grid */}
      <div className="mt-8 border-t border-borderNeon/50">
        <div className="grid grid-cols-3 gap-0.5">
          {userPosts.map((post) => (
            <button key={post.id} onClick={() => setSelectedPost(post)} className="relative aspect-square bg-cardDark group">
              {post.media.type === "image" ? <img src={post.media.src} alt={post.caption} className="w-full h-full object-cover" /> : <video src={post.media.src} className="w-full h-full object-cover" />}
              {post.media.type === "video" && <PlayIcon className="absolute top-2 right-2 w-5 h-5 text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.7)]" solid />}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white space-x-4">
                <div className="flex items-center space-x-1"><HeartIcon className="w-5 h-5" solid /><span>{post.likes}</span></div>
                <div className="flex items-center space-x-1"><CommentIcon className="w-5 h-5" /><span>{post.comments.length}</span></div>
              </div>
            </button>
          ))}
        </div>
        {userPosts.length === 0 && (
            <p className="p-10 text-center text-textDark">Ainda não há publicações.</p>
        )}
      </div>

      {selectedPost && <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

export default PublicProfileScreen;
