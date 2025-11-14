
import React, { useState } from 'react';
import { UserProfile, Post } from '../types';
import EditProfileModal from './EditProfileModal';

interface ProfileProps {
  userProfile: UserProfile;
  onUpdateProfile: (newProfile: UserProfile) => void;
  userPosts: Post[];
}

const Profile: React.FC<ProfileProps> = ({ userProfile, onUpdateProfile, userPosts }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    onUpdateProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="relative h-48 md:h-64 rounded-b-lg overflow-hidden">
        <img src={userProfile.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-20 flex flex-col items-center sm:items-start sm:flex-row sm:space-x-6">
          <img
            src={userProfile.avatar}
            alt="Avatar"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
          />
          <div className="mt-4 sm:mt-12 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-slate-800">{userProfile.name}</h1>
            <p className="text-slate-600 mt-1 max-w-lg">{userProfile.bio}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-600 transition-colors"
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
      
      {/* User Posts Grid */}
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Publicações</h2>
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {userPosts.map(post => (
              <div key={post.id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden group">
                {post.media.type === 'image' ? (
                  <img src={post.media.src} alt={post.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <video src={post.media.src} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                )}
              </div>
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
    </div>
  );
};

export default Profile;
