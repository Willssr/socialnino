import React from 'react';
import { Notification } from '../types';
import { HeartIcon, CommentIcon, UserIcon } from './Icons';

interface NotificationsPanelProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { type, user, timestamp, postPreview, read } = notification;

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
        switch(type) {
            case 'like':
                return <><strong className="text-textLight">@{user.username}</strong> curtiu sua foto.</>;
            case 'comment':
                return <><strong className="text-textLight">@{user.username}</strong> comentou na sua foto.</>;
            case 'follow':
                return <><strong className="text-textLight">@{user.username}</strong> começou a seguir você.</>;
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
        const diffMinutes = Math.round(diffSeconds / 60);
        const diffHours = Math.round(diffMinutes / 60);
        
        if (diffSeconds < 60) return `${diffSeconds}s`;
        if (diffMinutes < 60) return `${diffMinutes}m`;
        if (diffHours < 24) return `${diffHours}h`;
        return date.toLocaleDateString('pt-BR');
    }

    return (
        <div className={`flex items-start gap-3 p-3 transition-colors duration-200 ${!read ? 'bg-primary/10' : ''} hover:bg-primary/20`}>
            {renderIcon()}
            <div className="flex-grow">
                <p className="text-sm text-textDark">
                    {renderText()}
                </p>
                <p className="text-xs text-textDark/70 mt-0.5">{formatDate(timestamp)}</p>
            </div>
            {postPreview && (
                <img src={postPreview} alt="Post preview" className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
            )}
        </div>
    )
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ notifications, onClose, onMarkAllAsRead }) => {

    return (
        <div className="fixed inset-0 z-40" onClick={onClose}>
            <div 
                className="absolute top-20 right-4 sm:right-6 lg:right-8 w-full max-w-sm bg-cardDark rounded-lg shadow-2xl border border-borderNeon overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-3 border-b border-borderNeon">
                    <h3 className="font-bold text-lg text-textLight">Notificações</h3>
                    <button onClick={onMarkAllAsRead} className="text-sm font-semibold text-secondary hover:underline">
                        Marcar como lidas
                    </button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map(n => <NotificationItem key={n.id} notification={n} />)
                    ) : (
                        <p className="p-8 text-center text-sm text-textDark">
                            Você não tem nenhuma notificação.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPanel;