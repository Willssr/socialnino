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
                    : 'text-instaBlue hover:opacity-80 dark:text-instaBlue dark:hover:opacity-80'
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
                ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600' 
                : 'bg-instaBlue text-white hover:opacity-90'
            }`}
        >
            {isFollowing ? 'Seguindo' : 'Seguir'}
        </button>
    );
};

export default FollowButton;