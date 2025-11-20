
import React, { useMemo } from 'react';
import { Notification, Post } from '../types';
import { XIcon, BellIcon } from './Icons';
import NotificationItem from './Notifications/NotificationItem';

interface NotificationsPanelProps {
  notifications: Notification[];
  posts: Post[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ 
    notifications, 
    posts, 
    onClose, 
    onMarkAllAsRead 
}) => {

    // Group notifications logic
    const groupedNotifications = useMemo(() => {
        const groups: { [key: string]: Notification[] } = {
            'Hoje': [],
            'Ontem': [],
            'Esta Semana': [],
            'Anteriores': []
        };

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        notifications.forEach(note => {
            const noteDate = new Date(note.createdAt);
            // Strip time for comparison
            const noteDay = new Date(noteDate.getFullYear(), noteDate.getMonth(), noteDate.getDate());

            if (noteDay.getTime() === today.getTime()) {
                groups['Hoje'].push(note);
            } else if (noteDay.getTime() === yesterday.getTime()) {
                groups['Ontem'].push(note);
            } else if (noteDay > lastWeek) {
                groups['Esta Semana'].push(note);
            } else {
                groups['Anteriores'].push(note);
            }
        });

        return groups;
    }, [notifications]);

    return (
        <div className="fixed inset-0 z-[100]" onClick={onClose}>
            {/* Panel Container - Glassmorphism */}
            <div 
                className="absolute top-0 right-0 sm:top-20 sm:right-4 lg:right-8 w-full sm:max-w-sm h-full sm:h-auto sm:max-h-[80vh] bg-[#050510]/90 backdrop-blur-xl sm:rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] border-l sm:border border-[#00E5FF]/30 flex flex-col overflow-hidden animate-slide-in-right"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                        <BellIcon className="w-5 h-5 text-secondary" />
                        <h3 className="font-orbitron font-bold text-lg text-white tracking-wide">
                            Notificações
                        </h3>
                        {notifications.filter(n => !n.read).length > 0 && (
                            <span className="bg-secondary text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                                {notifications.filter(n => !n.read).length}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                         <button 
                            onClick={onMarkAllAsRead} 
                            className="text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                        >
                            Ler todas
                        </button>
                        <button onClick={onClose} className="text-white hover:text-accent transition-colors">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Content List */}
                <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-secondary/20 scrollbar-track-transparent">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500 opacity-70">
                            <BellIcon className="w-16 h-16 mb-4 text-gray-700" />
                            <p>Tudo tranquilo por aqui.</p>
                        </div>
                    ) : (
                        Object.entries(groupedNotifications).map(([label, notes]) => {
                            const typedNotes = notes as Notification[];
                            if (typedNotes.length === 0) return null;
                            
                            return (
                                <div key={label} className="mb-6 last:mb-0">
                                    <h4 className="text-xs font-bold text-secondary/80 uppercase tracking-widest mb-3 ml-1">
                                        {label}
                                    </h4>
                                    <div className="space-y-2">
                                        {typedNotes.map(n => {
                                            // Find post if ID exists
                                            const post = n.postId ? posts.find(p => p.id === n.postId) : undefined;
                                            return (
                                                <NotificationItem 
                                                    key={n.id} 
                                                    notification={n} 
                                                    post={post} 
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsPanel;
