import React, { useEffect, useRef } from 'react';
import { ChatMessage, UserProfile } from '../../types';
import ChatMessageBubble from './ChatMessage';
import ChatInputBar from './ChatInputBar';

interface GlobalChatScreenProps {
    messages: ChatMessage[];
    currentUser: UserProfile;
    onSendMessage: (content: string, type: 'text' | 'sticker') => void;
    onReaction: (messageId: string, emoji: string) => void;
}

const GlobalChatScreen: React.FC<GlobalChatScreenProps> = ({ messages, currentUser, onSendMessage, onReaction }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-borderNeon">
                <h1 className="text-xl font-orbitron font-bold text-gradient-neon text-center">
                    Chat Global 🌎
                </h1>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                    <ChatMessageBubble
                        key={msg.id}
                        message={msg}
                        isOwnMessage={msg.author.name === currentUser.name}
                        currentUser={currentUser}
                        onReaction={onReaction}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <ChatInputBar onSendMessage={onSendMessage} />
        </div>
    );
};

export default GlobalChatScreen;