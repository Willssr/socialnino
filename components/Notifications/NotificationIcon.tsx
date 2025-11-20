
import React from 'react';
import { HeartIcon, CommentIcon, UserIcon, EnvelopeIcon, PaperAirplaneIcon } from '../Icons';
import { Notification } from '../../types';

interface NotificationIconProps {
    type: Notification['type'] | 'message' | 'share'; // Extending types for future proofing
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
    const baseClass = "w-5 h-5 text-white";
    let bgColor = "bg-gray-700";
    let shadowColor = "";
    let icon = null;

    switch (type) {
        case 'like':
            bgColor = "bg-[#FF2CDF]"; // Neon Pink
            shadowColor = "shadow-[0_0_12px_#FF2CDF]";
            icon = <HeartIcon className={baseClass} solid />;
            break;
        case 'comment':
            bgColor = "bg-[#00E5FF]"; // Neon Cyan
            shadowColor = "shadow-[0_0_12px_#00E5FF]";
            icon = <CommentIcon className={baseClass} />;
            break;
        case 'follow':
            bgColor = "bg-[#7B2FF7]"; // Neon Purple
            shadowColor = "shadow-[0_0_12px_#7B2FF7]";
            icon = <UserIcon className={baseClass} solid />;
            break;
        case 'message': // For DMs
            bgColor = "bg-green-500";
            shadowColor = "shadow-[0_0_12px_#22c55e]";
            icon = <EnvelopeIcon className={baseClass} solid />;
            break;
        case 'share': // Future use
            bgColor = "bg-orange-500";
            shadowColor = "shadow-[0_0_12px_#f97316]";
            icon = <PaperAirplaneIcon className={baseClass} />;
            break;
        default:
            bgColor = "bg-gray-600";
            icon = <HeartIcon className={baseClass} />;
    }

    return (
        <div className={`
            w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
            ${bgColor} ${shadowColor} relative z-10 border-2 border-backgroundDark
        `}>
            {icon}
        </div>
    );
};

export default NotificationIcon;
