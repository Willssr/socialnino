import React, { useState } from 'react';
import { UserProfile, Post } from '../types';
import EditProfileModal from './EditProfileModal';
import { HeartIcon, CommentIcon, PlayIcon } from './Icons';
import PostDetailModal from './PostDetailModal';

interface ProfileProps {
  userProfile: UserProfile;
  onUpdateProfile: (newProfile: UserProfile) => void;
  userPosts: Post[];
  handleLike: (postId: string) => void;
  handleComment: (postId: string, commentText: string) => void;
  currentUserName: string;
}

const Profile: React.FC<ProfileProps> = ({ userProfile, onUpdateProfile, userPosts, handleLike, handleComment, currentUserName }) => {
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
  
  // Find the most up-to-date version of the selected post from the userPosts array
  const updatedSelectedPost = selectedPost ? userPosts.find(p => p.id === selectedPost.id) || selectedPost : null;


  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Cover Photo */}
      <div className="relative h-48 md:h-64 rounded-b-lg overflow-hidden">
        <img src={userProfile.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center sm:flex-row sm:items-start sm:space-x-8">
          <img
            src={userProfile.avatar}
            alt="Avatar"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg flex-shrink-0"
          />
          <div className="mt-4 sm:mt-8 flex-grow w-full text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-3xl font-bold text-slate-800">{userProfile.name}</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto bg-slate-200 text-slate-800 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-slate-300 transition-colors"
              >
                Editar Perfil
              </button>
            </div>

            {/* Stats Section */}
            <div className="flex justify-center sm:justify-start items-center space-x-8 my-4">
              {stats.map(stat => (
                <div key={stat.label} className="text-center sm:text-left">
                  <span className="font-bold text-lg text-slate-900">{stat.value}</span>
                  <span className="block text-sm text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>
            
            {/* Bio */}
            <p className="text-slate-600 max-w-lg mx-auto sm:mx-0">{userProfile.bio}</p>
          </div>
        </div>
      </div>
      
      {/* User Posts Grid */}
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Publicações</h2>
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {userPosts.map(post => (
              <button key={post.id} onClick={() => setSelectedPost(post)} className="relative aspect-square bg-slate-200 rounded-md overflow-hidden group">
                {/* Media */}
                {post.media.type === 'image' ? (
                  <img src={post.media.src} alt={post.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <video src={post.media.src} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                )}
                
                {/* Video Icon */}
                {post.media.type === 'video' && (
                    <PlayIcon className="absolute top-2 right-2 w-6 h-6 text-white drop-shadow-lg" />
                )}

                {/* Hover Overlay with Stats */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6">
                  <div className="flex items-center space-x-1.5 text-white font-bold text-lg">
                    <HeartIcon className="w-6 h-6" isLiked={true} />
                    <span>{post.likes.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-white font-bold text-lg">
                    <CommentIcon className="w-6 h-6" />
                    <span>{post.comments.length.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">Nenhuma publicação ainda.</p>
        )}
      </div>

      {isEditing && (
        <EditProfileModal
          currentUser={userProfile}
          onSave={handleSaveProfile}
          onClose={() => setIsEditing(false)}
        />
      )}

      {updatedSelectedPost && (
        <PostDetailModal 
          post={updatedSelectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={handleLike}
          onComment={handleComment}
          currentUserName={currentUserName}
        />
      )}
    </div>
  );
};

export default Profile;