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
                    ? 'text-textDark hover:text-textLight'
                    : 'text-secondary hover:text-white hover:drop-shadow-[0_0_8px_#00E5FF]'
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
            className={`w-auto px-5 py-1.5 rounded-lg text-sm font-bold transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isFollowing 
                ? 'bg-cardDark border border-borderNeon text-textDark hover:text-textLight hover:border-primary' 
                : 'bg-primary text-white shadow-glow-primary hover:animate-neon-pulse'
            }`}
        >
            {isFollowing ? 'Seguindo' : 'Seguir'}
        </button>
    );
};

export default FollowButton;