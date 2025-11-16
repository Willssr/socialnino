import React from 'react';
import { Notification, Post } from '../types';
import { HeartIcon, CommentIcon, UserIcon } from './Icons';

interface NotificationsPanelProps {
  notifications: Notification[];
  posts: Post[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

interface NotificationItemProps {
    notification: Notification;
    post?: Post;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, post }) => {
    const { type, fromUser, createdAt, message, read } = notification;

    const renderIcon = () => {
        const iconClass = "w-5 h-5 text-white";
        let bgColor = "";
        let icon = null;

        switch(type) {
            case 'like':
                bgColor = "bg-accent";
                icon = <HeartIcon className={iconClass} solid={true} />;
                break;
            case 'comment':
                bgColor = "bg-secondary";
                icon = <CommentIcon className={iconClass} />;
                break;
            case 'follow':
                bgColor = "bg-primary";
                icon = <UserIcon className={iconClass} solid={true}/>;
                break;
        }
        return (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${bgColor} shadow-lg`}>
                {icon}
            </div>
        )
    }

    const renderText = () => {
        return (
            <p className="text-sm text-white/90">
                <strong className="font-semibold text-white">@{fromUser.username}</strong>
                {message.substring(fromUser.username.length)}
            </p>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
        const diffMinutes = Math.round(diffSeconds / 60);
        const diffHours = Math.round(diffMinutes / 60);
        
        if (diffSeconds < 60) return `${diffSeconds}s ago`;
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return date.toLocaleDateString('pt-BR');
    }

    return (
        <div className={`flex items-start gap-3 p-3 transition-colors duration-200 ${!read ? 'bg-primary/10' : ''} hover:bg-primary/20`}>
            {renderIcon()}
            <div className="flex-grow">
                {renderText()}
                <p className="text-xs text-white/60 mt-0.5">{formatDate(createdAt)}</p>
            </div>
            {post && (
                <img src={post.media.src} alt="Post preview" className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
            )}
        </div>
    )
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications, posts, onClose, onMarkAllAsRead }) => {

    return (
        <div className="fixed inset-0 z-40" onClick={onClose}>
            <div 
                className="absolute top-20 right-4 sm:right-6 lg:right-8 w-full max-w-sm bg-[#0b0b20]/85 backdrop-blur-md rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.4)] border border-[#00E5FF77] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-3 border-b border-[#00E5FF55]">
                    <h3 className="font-bold text-lg text-[#00E5FF] drop-shadow-[0_0_4px_#00E5FF]">Notificações</h3>
                    <button onClick={onMarkAllAsRead} className="text-sm font-semibold text-secondary hover:underline">
                        Marcar como lidas
                    </button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map(n => {
                            const post = n.postId ? posts.find(p => p.id === n.postId) : undefined;
                            return <NotificationItem key={n.id} notification={n} post={post} />
                        })
                    ) : (
                        <p className="p-8 text-center text-sm text-white">
                            Você não tem nenhuma notificação.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPanel;