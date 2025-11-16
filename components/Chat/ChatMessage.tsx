import React, { useState, useRef, useMemo } from 'react';
import { ChatMessage, UserProfile } from '../../types';
import ReactionPicker from './ReactionPicker';

interface ChatMessageBubbleProps {
    message: ChatMessage;
    isOwnMessage: boolean;
    onReaction: (messageId: string, emoji: string) => void;
    currentUser: UserProfile;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message, isOwnMessage, onReaction, currentUser }) => {
    const [isPickerOpen, setPickerOpen] = useState(false);
    // FIX: Explicitly initialize useRef with `undefined` to resolve the "Expected 1 arguments, but got 0" error. This satisfies stricter linting rules that require an initial value for useRef.
    const longPressTimer = useRef<number | undefined>(undefined);

    const handlePressStart = () => {
        // Ignorar long press em mídias clicáveis como figurinhas
        if (message.type === 'sticker') return;
        longPressTimer.current = window.setTimeout(() => {
            setPickerOpen(true);
        }, 500); // 500ms para um long press
    };

    const handlePressEnd = () => {
        clearTimeout(longPressTimer.current);
    };

    const { author, content, type, timestamp, reactions } = message;

    const formattedTime = new Date(timestamp).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const alignmentClass = isOwnMessage ? 'items-end' : 'items-start';
    const bubbleClass = isOwnMessage
        ? 'bg-[#00E5FF33] text-textLight shadow-lg shadow-secondary/30'
        : 'bg-[#1F2937] text-textLight shadow-lg shadow-black/30';

    const reactionsSummary = useMemo(() => {
        if (!reactions) return [];
        const summary: { [emoji: string]: string[] } = {};
        for (const [user, emoji] of Object.entries(reactions) as [string, string][]) {
            if (!summary[emoji]) summary[emoji] = [];
            summary[emoji].push(user);
        }
        return Object.entries(summary);
    }, [reactions]);

    return (
        <div className={`flex flex-col ${alignmentClass}`}>
            <div className="flex items-center gap-2 mb-1" style={{ flexDirection: isOwnMessage ? 'row-reverse' : 'row' }}>
                <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full" />
                <span className="text-sm font-bold text-secondary animate-username-glow-pulse">
                    {author.name}
                </span>
            </div>

            <div
                className="relative"
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
                onMouseLeave={handlePressEnd}
            >
                {isPickerOpen && (
                    <ReactionPicker 
                        onSelect={(emoji) => onReaction(message.id, emoji)}
                        onClose={() => setPickerOpen(false)}
                    />
                )}
                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${isOwnMessage ? 'rounded-br-none' : 'rounded-bl-none'} ${bubbleClass}`}>
                    {type === 'sticker' ? (
                        <img src={content} alt="Sticker" className="w-32 h-32 object-contain" />
                    ) : (
                        <p className="text-sm break-words">{content}</p>
                    )}
                </div>
            </div>

            {reactionsSummary.length > 0 && (
                <div className={`flex flex-wrap gap-1 mt-1.5 px-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                    {reactionsSummary.map(([emoji, users]) => {
                        const userHasReacted = users.includes(currentUser.name);
                        return (
                            <button
                                key={emoji}
                                onClick={() => onReaction(message.id, emoji)}
                                className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 transition-all duration-200 hover:scale-110 ${
                                    userHasReacted ? 'bg-primary/80 border border-primary text-white' : 'bg-cardDark border border-borderNeon/50 text-textDark hover:bg-primary/20'
                                }`}
                                title={`Reagido por: ${users.join(', ')}`}
                            >
                                <span>{emoji}</span>
                                <span>{users.length}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            <span className="text-xs text-textDark mt-1 px-1">{formattedTime}</span>
        </div>
    );
};

export default ChatMessageBubble;