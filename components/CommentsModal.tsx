import React from 'react';
import { Comment } from '../types';
import { XIcon } from './Icons';

interface CommentsModalProps {
  comments: Comment[];
  postAuthor: string;
  onClose: () => void;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ comments, postAuthor, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-backgroundDark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-cardDark border border-borderNeon rounded-lg shadow-lg w-full max-w-md max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-borderNeon/50">
          <h2 className="text-lg font-orbitron font-bold text-gradient-neon">Comentários</h2>
          <button onClick={onClose} className="text-textDark hover:text-textLight">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Comments List */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-3">
                {/* A simple placeholder avatar */}
                <div className="w-8 h-8 rounded-full bg-backgroundLight border border-borderNeon flex-shrink-0"></div>
                <div>
                  <p className="text-sm">
                    <span className="font-bold text-secondary">{comment.author}</span>
                    <span className="text-textLight ml-2">{comment.text}</span>
                  </p>
                  <p className="text-xs text-textDark mt-1">
                    {new Date(comment.timestamp).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-textDark py-8">Nenhum comentário ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;