import React, { useState, useRef } from "react";
import { UserProfile, Post } from "../types";
import EditProfileModal from "./EditProfileModal";
import { HeartIcon, CommentIcon, PlayIcon, DotsHorizontalIcon, LocationMarkerIcon, CakeIcon, SparklesIcon, LinkIcon } from "./Icons";
import PostDetailModal from "./PostDetailModal";
import LogoutButton from "./LogoutButton";

interface ProfileProps {
  userProfile: UserProfile;
  onUpdateProfile: (newProfile: UserProfile) => void;
  userPosts: Post[];
}

const Profile: React.FC<ProfileProps> = ({
  userProfile,
  onUpdateProfile,
  userPosts,
}) => {
  const [isEditingLegacy, setIsEditingLegacy] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Estados para a seção "Sobre"
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutForm, setAboutForm] = useState(userProfile.about || {});

  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const handleSaveLegacyProfile = (updatedProfile: UserProfile) => {
    onUpdateProfile(updatedProfile);
    setIsEditingLegacy(false);
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAboutForm({ ...aboutForm, [e.target.name]: e.target.value });
  };

  const handleSaveAbout = () => {
    onUpdateProfile({ ...userProfile, about: aboutForm });
    setIsEditingAbout(false);
  };

  const handleCancelAbout = () => {
    setAboutForm(userProfile.about || {});
    setIsEditingAbout(false);
  };

  const stats = [
    { label: "publicações", value: userPosts.length },
    { label: "seguidores", value: userProfile.stats?.followers.toLocaleString("pt-BR") },
    { label: "seguindo", value: userProfile.stats?.following.toLocaleString("pt-BR") },
  ];

  const handleImageChange = (file: File, field: "avatar" | "coverPhoto") => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onUpdateProfile({ ...userProfile, [field]: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.[0]) handleImageChange(e.target.files[0], "avatar");
  };

  const handleCoverChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files?.[0]) handleImageChange(e.target.files[0], "coverPhoto");
  };

  // Componente interno para inputs reutilizáveis
  const AboutInput = ({ name, label, value, onChange, as: Component = 'input' }: any) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-xs font-bold text-[#a855f7] uppercase tracking-wider">{label}</label>
      <Component
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full bg-backgroundLight/80 border border-[#00E5FF55] rounded-md px-3 py-1.5 text-sm text-white placeholder-textDark focus:outline-none focus:ring-1 focus:ring-secondary"
      />
    </div>
  );


  return (
    <div className="w-full max-w-4xl mx-auto text-textLight">
      {/* CAPA */}
      <div className="relative w-full h-32 md:h-40 bg-gradient-to-r from-[#1b1b2f] via-[#111111] to-[#1b1b2f] overflow-hidden shadow-lg">
        {userProfile.coverPhoto && <img src={userProfile.coverPhoto} alt="Foto de capa" className="w-full h-full object-cover" />}
        <button type="button" onClick={() => coverInputRef.current?.click()} className="absolute bottom-2 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] text-black shadow-[0_0_12px_rgba(76,201,255,0.6)] hover:opacity-90 transition-opacity">Trocar capa</button>
        <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="p-4 -mt-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">{userProfile.name}</h1>
          <div className="flex items-center space-x-2">
            <button className="text-textDark hover:text-textLight"><DotsHorizontalIcon className="w-6 h-6" /></button>
            <LogoutButton />
          </div>
        </div>

        <div className="flex items-center my-6">
          <div className="relative w-24 h-24">
            <img src={userProfile.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-borderNeon" />
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-neon-pulse opacity-50" />
            <button type="button" onClick={() => avatarInputRef.current?.click()} className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] rounded-full bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] text-black font-semibold shadow-[0_0_12px_rgba(76,201,255,0.6)] hover:opacity-90 transition-opacity">Trocar foto</button>
            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
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
          <p className="font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">{userProfile.name}</p>
          <p className="text-sm mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#4cc9ff] to-[#c77dff] drop-shadow-md">{userProfile.bio}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 my-4">
          <button onClick={() => setIsEditingLegacy(true)} className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md shadow-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/70 transform hover:-translate-y-0.5">Editar Bio</button>
          <button className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md shadow-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/70 transform hover:-translate-y-0.5">Compartilhar</button>
        </div>

        {/* Sobre Section */}
        <div className="mt-6 border-t border-borderNeon/30 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-orbitron font-bold text-[#00E5FF] drop-shadow-[0_0_4px_#00E5FF]">SOBRE</h3>
            {!isEditingAbout && (
              <button onClick={() => setIsEditingAbout(true)} className="text-xs font-bold text-secondary hover:text-white transition-colors">Editar informações</button>
            )}
          </div>

          {isEditingAbout ? (
            <div className="space-y-4">
                <AboutInput name="location" label="Localização" value={aboutForm.location} onChange={handleAboutChange} />
                <AboutInput name="age" label="Idade" value={aboutForm.age} onChange={handleAboutChange} />
                <AboutInput name="interests" label="Interesses" value={aboutForm.interests} onChange={handleAboutChange} />
                <AboutInput name="website" label="Link" value={aboutForm.website} onChange={handleAboutChange} />
                <AboutInput name="extendedBio" label="Biografia Estendida" value={aboutForm.extendedBio} onChange={handleAboutChange} as="textarea" />
                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={handleCancelAbout} className="px-4 py-1.5 rounded-md text-sm font-semibold text-textDark hover:bg-cardDark transition-colors">Cancelar</button>
                    <button onClick={handleSaveAbout} className="px-5 py-1.5 rounded-md text-sm font-semibold bg-primary text-white shadow-glow-primary hover:animate-neon-pulse">Salvar</button>
                </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
                {userProfile.about?.location && <div className="flex items-center gap-3 border-b border-[#00E5FF55] pb-2"><LocationMarkerIcon className="w-5 h-5 text-[#00E5FF]" /><span className="font-semibold mr-2 text-[#a855f7]">Localização:</span> <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">{userProfile.about.location}</span></div>}
                {userProfile.about?.age && <div className="flex items-center gap-3 border-b border-[#00E5FF55] pb-2"><CakeIcon className="w-5 h-5 text-[#00E5FF]" /><span className="font-semibold mr-2 text-[#a855f7]">Idade:</span> <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">{userProfile.about.age}</span></div>}
                {userProfile.about?.interests && <div className="flex items-center gap-3 border-b border-[#00E5FF55] pb-2"><SparklesIcon className="w-5 h-5 text-[#00E5FF]" /><span className="font-semibold mr-2 text-[#a855f7]">Interesses:</span> <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">{userProfile.about.interests}</span></div>}
                {userProfile.about?.website && <div className="flex items-center gap-3 border-b border-[#00E5FF55] pb-2"><LinkIcon className="w-5 h-5 text-[#00E5FF]" /><span className="font-semibold mr-2 text-[#a855f7]">Link:</span> <a href={`https://${userProfile.about.website}`} target="_blank" rel="noopener noreferrer" className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.3)] hover:underline">{userProfile.about.website}</a></div>}
                {userProfile.about?.extendedBio && <p className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.3)] pt-2 !mt-4">{userProfile.about.extendedBio}</p>}
            </div>
          )}
        </div>
      </div>

      {/* User Posts Grid */}
      <div className="mt-4 border-t border-borderNeon/50">
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
      </div>

      {isEditingLegacy && <EditProfileModal currentUser={userProfile} onSave={handleSaveLegacyProfile} onClose={() => setIsEditingLegacy(false)} />}
      {selectedPost && <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

export default Profile;