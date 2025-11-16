import React from 'react';

interface EmojiPickerProps {
    onSelect: (emoji: string) => void;
}

const EMOJIS = ['😀', '😂', '😍', '🤔', '🔥', '❤️', '👍', '🙏', '🎉', '🚀', '💯', '💀'];

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect }) => {
    return (
        <div className="bg-cardDark border border-borderNeon rounded-lg p-2 shadow-lg grid grid-cols-6 gap-2">
            {EMOJIS.map(emoji => (
                <button
                    key={emoji}
                    onClick={() => onSelect(emoji)}
                    className="text-2xl rounded-md hover:bg-primary/20 transition-colors"
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};

export default EmojiPicker;
