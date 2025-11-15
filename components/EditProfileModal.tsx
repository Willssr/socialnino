import React, { useState } from 'react';
import { UserProfile } from '../types';

interface EditProfileModalProps {
  currentUser: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ currentUser, onSave, onClose }) => {
  const [formData, setFormData] = useState<UserProfile>(currentUser);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'coverPhoto' | 'avatar') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData({ ...formData, [type]: result });
        if (type === 'coverPhoto') {
          setCoverPreview(result);
        } else {
          setAvatarPreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animation-fade">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animation-fade-zoom">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Editar Perfil</h2>
              <button type="button" onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-3xl leading-none">&times;</button>
            </div>

            {/* Cover Photo */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Foto de Capa</label>
              <div className="aspect-w-16 aspect-h-9 bg-slate-200 dark:bg-slate-700 rounded-md overflow-hidden">
                <img src={coverPreview || formData.coverPhoto} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'coverPhoto')} className="text-sm mt-2" />
            </div>

            {/* Avatar */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Foto de Perfil</label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <img src={avatarPreview || formData.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                </div>
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'avatar')} className="text-sm" />
              </div>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-instaBlue focus:border-instaBlue bg-white dark:bg-slate-700 dark:text-white"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-instaBlue focus:border-instaBlue bg-white dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-instaBlue border border-transparent rounded-md text-sm font-semibold text-white hover:opacity-90"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;