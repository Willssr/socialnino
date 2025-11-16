import React from 'react';

const REACTIONS = ['❤️', '😂', '😮', '😢', '👍'];

interface ReactionPickerProps {
    onSelect: (emoji: string) => void;
    onClose: () => void;
}

const ReactionPicker: React.FC<ReactionPickerProps> = ({ onSelect, onClose }) => {
    const handleSelect = (emoji: string) => {
        onSelect(emoji);
        onClose();
    };

    return (
        <div className="absolute -top-12 z-10 bg-cardDark border border-borderNeon rounded-full shadow-lg p-1.5 flex gap-2 animate-fade-in">
            {REACTIONS.map(emoji => (
                <button
                    key={emoji}
                    onClick={() => handleSelect(emoji)}
                    className="text-2xl rounded-full hover:scale-125 transition-transform"
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};

export default ReactionPicker;