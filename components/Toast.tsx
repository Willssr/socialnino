import React, { useEffect, useState } from 'react';
import { ToastNotificationData } from '../types';
import { HeartIcon, CommentIcon, PlusSquareIcon } from './Icons';

interface ToastProps {
  toast: ToastNotificationData;
  onDismiss: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Animate in
        const inTimer = setTimeout(() => setVisible(true), 10);
        
        // Animate out
        const outTimer = setTimeout(() => setVisible(false), 3500);
        
        // Remove from state after animation
        const dismissTimer = setTimeout(() => onDismiss(toast.id), 4000); 

        return () => {
            clearTimeout(inTimer);
            clearTimeout(outTimer);
            clearTimeout(dismissTimer);
        };
    }, [toast.id, onDismiss]);

    const renderIcon = () => {
        const iconClass = "w-5 h-5 text-secondary";
        switch(toast.type) {
            case 'like': return <HeartIcon className={iconClass} solid />;
            case 'comment': return <CommentIcon className={iconClass} />;
            case 'post': return <PlusSquareIcon className={iconClass} />;
            default: return null;
        }
    };

    return (
        <div className={`
            flex items-center gap-3 w-full max-w-sm p-3 rounded-lg border
            bg-cardDark/90 border-secondary/50 shadow-[0_0_15px_rgba(0,229,255,0.5)] backdrop-blur-sm
            transition-all duration-500 ease-in-out
            ${visible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}
        `}>
            {toast.user?.avatar && <img src={toast.user.avatar} alt={toast.user.username} className="w-8 h-8 rounded-full object-cover" />}
            <div className="flex-grow">
                <p className="text-sm text-textLight">
                    {toast.user && <span className="font-bold text-secondary">@{toast.user.username}</span>}
                    {' '}{toast.content}
                </p>
            </div>
            {renderIcon()}
        </div>
    );
}

export default Toast;
