import React from 'react';
import { ChatMessage } from '../../types';

interface ChatMessageBubbleProps {
    message: ChatMessage;
    isOwnMessage: boolean;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({ message, isOwnMessage }) => {
    const { author, content, type, timestamp } = message;

    const formattedTime = new Date(timestamp).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const alignmentClass = isOwnMessage ? 'items-end' : 'items-start';
    const bubbleClass = isOwnMessage
        ? 'bg-primary text-white rounded-br-none'
        : 'bg-cardDark text-textLight rounded-bl-none';
    const nameClass = isOwnMessage ? 'text-right' : 'text-left';

    return (
        <div className={`flex flex-col ${alignmentClass}`}>
            <div className="flex items-center gap-2" style={{ flexDirection: isOwnMessage ? 'row-reverse' : 'row' }}>
                <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full" />
                <span className={`text-xs font-bold ${isOwnMessage ? 'text-primary' : 'text-secondary'}`}>{author.name}</span>
            </div>
            <div className={`mt-1 max-w-xs md:max-w-md p-3 rounded-xl ${bubbleClass}`}>
                {type === 'sticker' ? (
                    <img src={content} alt="Sticker" className="w-32 h-32 object-contain" />
                ) : (
                    <p className="text-sm break-words">{content}</p>
                )}
            </div>
            <span className="text-xs text-textDark mt-1 px-1">{formattedTime}</span>
        </div>
    );
};

export default ChatMessageBubble;
