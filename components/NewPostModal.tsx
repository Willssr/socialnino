import React, { useState } from 'react';

interface NewPostModalProps {
  onClose: () => void;
  onAddPost: (caption: string, file: File) => void;
  initialCaption?: string;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ onClose, onAddPost, initialCaption = '' }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState(initialCaption);

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
      onAddPost(caption, selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animation-fade">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animation-fade-zoom">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Criar nova publicação</h2>
            <button type="button" onClick={onClose} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-3xl leading-none">&times;</button>
          </div>
          
          <div className="mb-4">
            {preview ? (
              <div>
                {selectedFile?.type.startsWith('video/') ? (
                    <video src={preview} controls className="w-full max-h-[50vh] object-contain rounded-md bg-slate-100 dark:bg-slate-700" />
                ) : (
                    <img src={preview} alt="Pré-visualização" className="w-full max-h-[50vh] object-contain rounded-md bg-slate-100 dark:bg-slate-700" />
                )}
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-md text-center">
                <label htmlFor="post-file-upload" className="cursor-pointer text-instaBlue dark:text-sky-400 font-semibold">
                  Selecione uma imagem ou vídeo
                </label>
                <input id="post-file-upload" type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="caption" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Legenda</label>
            <textarea
              id="caption"
              name="caption"
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Escreva uma legenda..."
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-instaBlue focus:border-instaBlue bg-white dark:bg-slate-700 dark:text-white"
            />
          </div>
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
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;