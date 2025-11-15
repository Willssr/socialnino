import React, { useState } from 'react';

interface AddStoryModalProps {
  onClose: () => void;
  onSave: (file: File) => void;
}

const AddStoryModal: React.FC<AddStoryModalProps> = ({ onClose, onSave }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSave(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-backgroundDark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-cardDark border border-borderNeon rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-orbitron font-bold text-gradient-neon">Adicionar Story</h2>
            <button type="button" onClick={onClose} className="text-textDark hover:text-textLight text-3xl leading-none">&times;</button>
          </div>
          
          {preview ? (
            <div className="mb-4">
              <img src={preview} alt="Pré-visualização" className="w-full h-auto max-h-[60vh] object-contain rounded-md bg-backgroundLight" />
            </div>
          ) : (
            <div className="mb-4 p-8 border-2 border-dashed border-borderNeon rounded-md text-center bg-backgroundLight">
              <label htmlFor="story-file-upload" className="cursor-pointer text-secondary font-semibold hover:text-white drop-shadow-[0_0_8px_#00E5FF]">
                Selecione uma Mídia
              </label>
              <input id="story-file-upload" type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
              <p className="text-xs text-textDark mt-1">Sua pré-visualização aparecerá aqui.</p>
            </div>
          )}
        </div>
        
        <div className="bg-backgroundLight/50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg border-t border-borderNeon">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-borderNeon rounded-md text-sm font-semibold text-textDark hover:bg-cardDark hover:text-textLight"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="px-6 py-2 bg-primary border border-transparent rounded-md text-sm font-semibold text-white shadow-glow-primary hover:animate-neon-pulse disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Postar Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStoryModal;