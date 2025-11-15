import React, { useState } from 'react';
import { UserProfile, Post } from '../types';
import EditProfileModal from './EditProfileModal';
import { HeartIcon, CommentIcon, PlayIcon, DotsHorizontalIcon } from './Icons';
import PostDetailModal from './PostDetailModal';
import LogoutButton from './LogoutButton';

interface ProfileProps {
  userProfile: UserProfile;
  onUpdateProfile: (newProfile: UserProfile) => void;
  userPosts: Post[];
}

const Profile: React.FC<ProfileProps> = ({ userProfile, onUpdateProfile, userPosts }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    onUpdateProfile(updatedProfile);
    setIsEditing(false);
  };

  const stats = [
    { label: 'publicações', value: userPosts.length },
    { label: 'seguidores', value: userProfile.stats?.followers.toLocaleString('pt-BR') },
    { label: 'seguindo', value: userProfile.stats?.following.toLocaleString('pt-BR') },
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto text-textLight">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-orbitron font-bold text-gradient-neon">{userProfile.name}</h1>
            <div className="flex items-center space-x-2">
                <button className="text-textDark hover:text-textLight">
                    <DotsHorizontalIcon className="w-6 h-6"/>
                </button>
                <LogoutButton />
            </div>
        </div>

        {/* Profile Info */}
        <div className="flex items-center my-6">
            <div className="relative w-24 h-24">
                <img
                    src={userProfile.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div className="absolute inset-0 rounded-full border-2 border-primary animate-neon-pulse opacity-50"></div>
            </div>
            <div className="flex-grow flex justify-around items-center">
                {stats.map(stat => (
                    <div key={stat.label} className="text-center">
                    <span className="font-bold text-xl">{stat.value}</span>
                    <span className="block text-sm text-textDark">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Bio */}
        <div>
            <p className="font-bold text-sm">{userProfile.name}</p>
            <p className="text-sm text-textDark">{userProfile.bio}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 my-4">
            <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-cardDark border border-borderNeon px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-colors"
            >
                Editar Perfil
            </button>
             <button
                className="flex-1 bg-cardDark border border-borderNeon px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-colors"
            >
                Compartilhar Perfil
            </button>
        </div>
      </div>
      
      {/* User Posts Grid */}
      <div className="mt-4 border-t border-borderNeon/50">
        <div className="grid grid-cols-3 gap-0.5">
            {userPosts.map(post => (
              <button key={post.id} onClick={() => setSelectedPost(post)} className="relative aspect-square bg-cardDark group">
                {post.media.type === 'image' ? (
                  <img src={post.media.src} alt={post.caption} className="w-full h-full object-cover" />
                ) : (
                  <video src={post.media.src} className="w-full h-full object-cover" />
                )}
                {post.media.type === 'video' && (
                    <PlayIcon className="absolute top-2 right-2 w-5 h-5 text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.7)]" solid />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white space-x-4">
                    <div className="flex items-center space-x-1">
                        <HeartIcon className="w-5 h-5" solid />
                        <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <CommentIcon className="w-5 h-5" />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
              </button>
            ))}
        </div>
      </div>

      {isEditing && (
        <EditProfileModal
          currentUser={userProfile}
          onSave={handleSaveProfile}
          onClose={() => setIsEditing(false)}
        />
      )}

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default Profile;