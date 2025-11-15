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
    <div className="fixed inset-0 bg-backgroundDark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-cardDark border border-borderNeon rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-orbitron font-bold text-gradient-neon">Editar Perfil</h2>
              <button type="button" onClick={onClose} className="text-textDark hover:text-textLight text-3xl leading-none">&times;</button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-bold text-secondary mb-1">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-borderNeon rounded-md bg-backgroundLight text-textLight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-bold text-secondary mb-1">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-borderNeon rounded-md bg-backgroundLight text-textLight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="bg-backgroundLight/50 px-6 py-4 flex justify-end space-x-3 border-t border-borderNeon">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-borderNeon rounded-md text-sm font-semibold text-textDark hover:bg-cardDark hover:text-textLight"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary border border-transparent rounded-md text-sm font-semibold text-white shadow-glow-primary hover:animate-neon-pulse"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;