import React, { useState, useRef, useEffect } from 'react';
import { Comment } from '../types';
import { XIcon } from './Icons';

interface CommentsModalProps {
  comments: Comment[];
  postAuthor: string;
  onClose: () => void;
  onAddComment: (text: string, parentId?: string) => void;
}

interface CommentItemProps {
    comment: Comment;
    postAuthor: string;
    onReply: (commentId: string, authorName: string) => void;
}

const QUICK_EMOJIS = ['😀', '😂', '😍', '🔥', '👏', '😮', '😭', '❤️'];

const CommentItem: React.FC<CommentItemProps> = ({ comment, postAuthor, onReply }) => {
    const [showReplies, setShowReplies] = useState(false);
    const repliesCount = comment.replies?.length || 0;

    return (
        <div className="flex items-start space-x-3 mb-4">
             {/* Avatar Placeholder */}
            <div className="w-8 h-8 rounded-full bg-backgroundLight border border-borderNeon flex-shrink-0 flex items-center justify-center font-bold text-xs text-secondary">
                {comment.author.charAt(0).toUpperCase()}
            </div>
            <div className="flex-grow">
                <p className="text-sm">
                    <span className="font-bold text-secondary">{comment.author}</span>
                    {comment.author === postAuthor && (
                         <span className="ml-1 text-[10px] border border-borderNeon px-1 rounded text-textDark">Autor</span>
                    )}
                    <span className="text-textLight ml-2">{comment.text}</span>
                </p>
                
                <div className="flex items-center gap-4 mt-1">
                    <p className="text-xs text-textDark">
                        {new Date(comment.timestamp).toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}
                    </p>
                    <button 
                        className="text-xs font-semibold text-textDark hover:text-textLight"
                        onClick={() => onReply(comment.id, comment.author)}
                    >
                        Responder
                    </button>
                </div>

                {/* View Replies Toggle */}
                {repliesCount > 0 && (
                    <div className="mt-2">
                        <button 
                            className="flex items-center gap-2 text-xs text-textDark/70 hover:text-secondary"
                            onClick={() => setShowReplies(!showReplies)}
                        >
                            <span className="w-6 h-[1px] bg-textDark/50"></span>
                            {showReplies ? 'Ocultar respostas' : `Ver ${repliesCount} ${repliesCount === 1 ? 'resposta' : 'respostas'}`}
                        </button>
                    </div>
                )}

                {/* Nested Replies */}
                {showReplies && comment.replies && (
                    <div className="mt-2 space-y-3 pl-2">
                        {comment.replies.map(reply => (
                             <div key={reply.id} className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-backgroundLight border border-borderNeon flex-shrink-0 flex items-center justify-center font-bold text-[10px] text-secondary">
                                    {reply.author.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm">
                                        <span className="font-bold text-secondary">{reply.author}</span>
                                        <span className="text-textLight ml-2">{reply.text}</span>
                                    </p>
                                    <p className="text-xs text-textDark mt-0.5">
                                        {new Date(reply.timestamp).toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}
                                    </p>
                                </div>
                             </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const CommentsModal: React.FC<CommentsModalProps> = ({ comments, postAuthor, onClose, onAddComment }) => {
  const [newCommentText, setNewCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<{id: string, author: string} | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReply = (commentId: string, authorName: string) => {
      setReplyingTo({ id: commentId, author: authorName });
      // Focus input slightly delayed to ensure UI render
      setTimeout(() => {
          inputRef.current?.focus();
      }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (newCommentText.trim()) {
          onAddComment(newCommentText, replyingTo?.id); // Pass parentId if replying
          setNewCommentText("");
          setReplyingTo(null);
      }
  };

  const addEmoji = (emoji: string) => {
      setNewCommentText(prev => prev + emoji);
      inputRef.current?.focus();
  };

  return (
    <div 
      className="fixed inset-0 bg-backgroundDark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-cardDark border border-borderNeon rounded-lg shadow-lg w-full max-w-md max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-borderNeon/50 bg-[#111119]">
          <h2 className="text-lg font-orbitron font-bold text-gradient-neon">Comentários</h2>
          <button onClick={onClose} className="text-textDark hover:text-textLight">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Comments List */}
        <div className="flex-grow overflow-y-auto p-4">
          {comments.length > 0 ? (
            comments.map(comment => (
              <CommentItem 
                key={comment.id} 
                comment={comment} 
                postAuthor={postAuthor} 
                onReply={handleReply}
              />
            ))
          ) : (
            <div className="text-center text-textDark py-8 flex flex-col items-center">
                <p className="text-lg mb-2">💬</p>
                <p>Nenhum comentário ainda.</p>
                <p className="text-xs">Seja o primeiro a comentar!</p>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-borderNeon/50 bg-[#111119]">
             {/* Reply Context Indicator */}
             {replyingTo && (
                <div className="flex items-center justify-between bg-primary/10 px-3 py-1.5 rounded-t-md mb-1 border border-primary/20 border-b-0">
                    <span className="text-xs text-textLight">
                        Respondendo a <span className="font-bold text-secondary">@{replyingTo.author}</span>
                    </span>
                    <button onClick={() => setReplyingTo(null)} className="text-textDark hover:text-white text-xs font-bold">
                        &times;
                    </button>
                </div>
             )}

             {/* Emoji Bar */}
            <div className="flex gap-2 mb-2 overflow-x-auto pb-1 scrollbar-hide">
                {QUICK_EMOJIS.map(emoji => (
                    <button 
                        key={emoji} 
                        onClick={() => addEmoji(emoji)}
                        className="text-lg hover:bg-primary/20 rounded p-1 transition-colors"
                    >
                        {emoji}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input 
                    ref={inputRef}
                    type="text" 
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder={replyingTo ? `Responda a ${replyingTo.author}...` : "Adicionar um comentário..."}
                    className="flex-grow bg-cardDark border border-borderNeon rounded-full px-4 py-2 text-sm text-textLight placeholder-textDark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button 
                    type="submit" 
                    disabled={!newCommentText.trim()}
                    className="font-bold text-secondary px-2 hover:text-white disabled:opacity-50 transition-colors"
                >
                    Enviar
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;