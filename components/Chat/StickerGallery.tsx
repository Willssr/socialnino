import React from 'react';
import { XIcon } from '../Icons';

interface StickerGalleryProps {
    onSelect: (stickerUrl: string) => void;
    onClose: () => void;
}

const STICKERS = [
    'https://i.imgur.com/g0i13vC.png', // Nino Hi
    'https://i.imgur.com/5u0TBCr.png', // Nino GG
    'https://i.imgur.com/Gj30Z2Y.png', // Nino Love
    'https://i.imgur.com/2m095AD.png', // Nino Sad
    'https://i.imgur.com/IA1vYUT.png', // Nino Wow
    'https://i.imgur.com/Z4d7Gz6.png', // Nino Cool
];

const StickerGallery: React.FC<StickerGalleryProps> = ({ onSelect, onClose }) => {
    return (
        <div className="fixed inset-0 bg-backgroundDark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-cardDark border border-borderNeon rounded-lg shadow-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-3 border-b border-borderNeon/50">
                    <h3 className="font-bold text-lg text-textLight">Figurinhas</h3>
                    <button onClick={onClose} className="text-textDark hover:text-textLight">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-4 grid grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                    {STICKERS.map(sticker => (
                        <button key={sticker} onClick={() => onSelect(sticker)} className="p-2 bg-backgroundLight rounded-lg hover:bg-primary/30 transition-colors">
                            <img src={sticker} alt="Sticker" className="w-full h-full object-contain" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StickerGallery;
