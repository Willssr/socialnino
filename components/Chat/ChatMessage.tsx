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
    
    // Classes de estilo modernizadas para os balões de mensagem
    const bubbleClass = isOwnMessage
        ? 'bg-gradient-to-br from-primary to-accent/80 text-white shadow-lg shadow-primary/20' // Gradiente e brilho para mensagens próprias
        : 'bg-cardDark text-neutral-200 shadow-lg shadow-black/30'; // Fundo escuro para mensagens de outros

    return (
        <div className={`flex flex-col ${alignmentClass}`}>
            {/* Nome de usuário com destaque neon */}
            <div className="flex items-center gap-2 mb-1" style={{ flexDirection: isOwnMessage ? 'row-reverse' : 'row' }}>
                <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full" />
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text drop-shadow-[0_0_4px_rgba(123,47,247,0.5)]">
                    {author.name}
                </span>
            </div>
            
            {/* Balão com bordas mais arredondadas e sombra */}
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${isOwnMessage ? 'rounded-br-none' : 'rounded-bl-none'} ${bubbleClass}`}>
                {type === 'sticker' ? (
                    <img src={content} alt="Sticker" className="w-32 h-32 object-contain" />
                ) : (
                    // Texto com alto contraste
                    <p className="text-sm break-words">{content}</p>
                )}
            </div>
            <span className="text-xs text-textDark mt-1 px-1">{formattedTime}</span>
        </div>
    );
};

export default ChatMessageBubble;