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
    <div className="fixed inset-0 bg-backgroundDark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-cardDark border border-borderNeon rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-orbitron font-bold text-gradient-neon">Nova Publicação</h2>
            <button type="button" onClick={onClose} className="text-textDark hover:text-textLight text-3xl leading-none">&times;</button>
          </div>
          
          <div className="mb-4">
            {preview ? (
              <div>
                {selectedFile?.type.startsWith('video/') ? (
                    <video src={preview} controls className="w-full max-h-[50vh] object-contain rounded-md bg-backgroundLight" />
                ) : (
                    <img src={preview} alt="Pré-visualização" className="w-full max-h-[50vh] object-contain rounded-md bg-backgroundLight" />
                )}
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-borderNeon rounded-md text-center bg-backgroundLight">
                <label htmlFor="post-file-upload" className="cursor-pointer text-secondary font-semibold hover:text-white drop-shadow-[0_0_8px_#00E5FF]">
                  Selecionar Mídia
                </label>
                <input id="post-file-upload" type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="caption" className="block text-sm font-bold text-secondary mb-1">Legenda</label>
            <textarea
              id="caption"
              name="caption"
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Adicione uma legenda futurista..."
              className="w-full px-3 py-2 border-2 border-borderNeon rounded-md bg-backgroundLight text-textLight placeholder-textDark focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
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
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;