import React from 'react';

interface FollowButtonProps {
  isFollowing: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'filled' | 'text';
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing, onClick, variant = 'filled' }) => {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevents triggering parent element's onClick events
        onClick(e);
    };

    if (variant === 'text') {
        return (
             <button
                onClick={handleButtonClick}
                className={`text-sm font-bold transition-colors ${
                    isFollowing
                    ? 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    : 'text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                }`}
            >
                {isFollowing ? 'Seguindo' : 'Seguir'}
            </button>
        );
    }

    // Default is 'filled' variant
    return (
        <button
            onClick={handleButtonClick}
            className={`w-auto px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out ${
                isFollowing 
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600' 
                : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:opacity-90'
            }`}
        >
            {isFollowing ? 'Seguindo' : 'Seguir'}
        </button>
    );
};

export default FollowButton;