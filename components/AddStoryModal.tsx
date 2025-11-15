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
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animation-fade">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md animation-fade-zoom">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Adicionar ao seu story</h2>
            <button type="button" onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-3xl leading-none">&times;</button>
          </div>
          
          {preview ? (
            <div className="mb-4">
              <img src={preview} alt="Pré-visualização" className="w-full h-auto max-h-[60vh] object-contain rounded-md bg-slate-100 dark:bg-slate-700" />
            </div>
          ) : (
            <div className="mb-4 p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-md text-center">
              <label htmlFor="story-file-upload" className="cursor-pointer text-instaBlue dark:text-sky-400 font-semibold">
                Selecione uma imagem ou vídeo
              </label>
              <input id="story-file-upload" type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sua pré-visualização aparecerá aqui.</p>
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-md text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-500"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="px-4 py-2 bg-instaBlue border border-transparent rounded-md text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Postar Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStoryModal;