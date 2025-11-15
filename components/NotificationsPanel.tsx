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
                bgColor = "bg-red-500";
                icon = <HeartIcon className={iconClass} solid={true} />;
                break;
            case 'comment':
                bgColor = "bg-blue-500";
                icon = <CommentIcon className={iconClass} />;
                break;
            case 'follow':
                bgColor = "bg-purple-500";
                icon = <UserIcon className={iconClass} solid={true}/>;
                break;
        }
        return (
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${bgColor}`}>
                {icon}
            </div>
        )
    }

    const renderText = () => {
        switch(type) {
            case 'like':
                return <><strong>@{user.username}</strong> curtiu sua foto.</>;
            case 'comment':
                return <><strong>@{user.username}</strong> comentou na sua foto.</>;
            case 'follow':
                return <><strong>@{user.username}</strong> começou a seguir você.</>;
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
        <div className={`flex items-start gap-3 p-3 transition-colors duration-200 ${!read ? 'bg-sky-50 dark:bg-slate-700/50' : ''} hover:bg-slate-100 dark:hover:bg-slate-700`}>
            {renderIcon()}
            <div className="flex-grow">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    {renderText()}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{formatDate(timestamp)}</p>
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
                className="absolute top-16 right-4 sm:right-6 lg:right-8 w-full max-w-sm bg-white dark:bg-slate-800 rounded-lg shadow-2xl border dark:border-slate-700 overflow-hidden animation-fade-zoom"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-3 border-b dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Notificações</h3>
                    <button onClick={onMarkAllAsRead} className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                        Marcar todas como lidas
                    </button>
                </div>
                <div className="max-h-[70vh] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map(n => <NotificationItem key={n.id} notification={n} />)
                    ) : (
                        <p className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                            Você não tem nenhuma notificação.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPanel;