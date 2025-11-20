
import React from 'react';
import { Notification, Post } from '../../types';
import NotificationIcon from './NotificationIcon';

interface NotificationItemProps {
    notification: Notification;
    post?: Post;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, post }) => {
    const { fromUser, message, createdAt, read, type } = notification;

    // Helper to format date nicely
    const getTimeAgo = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffSec = Math.round(diffMs / 1000);
        const diffMin = Math.round(diffSec / 60);
        const diffHr = Math.round(diffMin / 60);
        
        if (diffSec < 60) return 'agora';
        if (diffMin < 60) return `${diffMin} min`;
        if (diffHr < 24) return `${diffHr} h`;
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    };

    // Glassmorphism & Neon Border Styles
    const containerClasses = `
        relative flex items-center gap-3 p-3 rounded-xl mb-2
        transition-all duration-300 animate-fade-in-up
        ${!read 
            ? 'bg-cardDark/80 border-l-4 border-l-secondary border-y border-r border-white/10 shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
            : 'bg-backgroundLight/40 border border-white/5 opacity-80 hover:opacity-100'
        }
        hover:bg-cardDark hover:shadow-[0_0_20px_rgba(123,47,247,0.2)]
    `;

    // Highlight keyword logic based on type
    const highlightColor = type === 'like' ? 'text-accent' 
                         : type === 'follow' ? 'text-primary' 
                         : type === 'comment' ? 'text-secondary'
                         : 'text-white';

    // Remove username from message if it starts with it (cleaning up display)
    const displayMessage = message.startsWith(fromUser.username) 
        ? message.substring(fromUser.username.length).trim()
        : message;

    return (
        <div className={containerClasses}>
            {/* Avatar & Icon Badge */}
            <div className="relative">
                <img 
                    src={fromUser.avatar} 
                    alt={fromUser.username} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-cardDark"
                />
                <div className="absolute -bottom-1 -right-1">
                    <NotificationIcon type={type as any} />
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0 ml-1">
                <p className="text-sm text-gray-300 leading-tight">
                    <span className="font-bold text-white hover:underline cursor-pointer">
                        {fromUser.username}
                    </span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{getTimeAgo(createdAt)}</span>
                </p>
                <p className={`text-sm mt-0.5 leading-snug ${read ? 'text-gray-400' : 'text-gray-100'}`}>
                   {type === 'follow' ? (
                       <span className={highlightColor}>começou a seguir você.</span>
                   ) : (
                       <span>{displayMessage}</span>
                   )}
                </p>
            </div>

            {/* Post Thumbnail (if exists) */}
            {post && (
                <div className="flex-shrink-0 ml-2">
                    {post.media.type === 'video' ? (
                         <video 
                            src={post.media.src} 
                            className="w-12 h-12 rounded-md object-cover border border-white/10"
                         />
                    ) : (
                        <img 
                            src={post.media.src} 
                            alt="Post thumbnail" 
                            className="w-12 h-12 rounded-md object-cover border border-white/10" 
                        />
                    )}
                </div>
            )}

            {/* Unread Indicator Dot (if no border style preferred) */}
            {!read && (
                <div className="absolute top-3 right-3 w-2 h-2 bg-secondary rounded-full shadow-[0_0_5px_#00E5FF] animate-pulse" />
            )}
        </div>
    );
};

export default NotificationItem;
