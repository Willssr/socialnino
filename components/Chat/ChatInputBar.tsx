import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '../Icons';
import EmojiPicker from './EmojiPicker';
import StickerGallery from './StickerGallery';

interface ChatInputBarProps {
    onSendMessage: (content: string, type: 'text' | 'sticker') => void;
}

const ChatInputBar: React.FC<ChatInputBarProps> = ({ onSendMessage }) => {
    const [text, setText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showStickerGallery, setShowStickerGallery] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    const handleSendText = () => {
        if (text.trim()) {
            onSendMessage(text.trim(), 'text');
            setText('');
            setShowEmojiPicker(false);
        }
    };
    
    const handleSendSticker = (stickerUrl: string) => {
        onSendMessage(stickerUrl, 'sticker');
        setShowStickerGallery(false);
    };

    const handleEmojiSelect = (emoji: string) => {
        setText(prev => prev + emoji);
    };

    return (
        <div className="p-2 border-t border-borderNeon bg-backgroundLight">
            {showStickerGallery && <StickerGallery onSelect={handleSendSticker} onClose={() => setShowStickerGallery(false)} />}
            
            <div className="relative flex items-end gap-2">
                 {showEmojiPicker && (
                    <div className="absolute bottom-full left-0 mb-2">
                        <EmojiPicker onSelect={handleEmojiSelect} />
                    </div>
                )}
                
                <button onClick={() => { setShowStickerGallery(v => !v); setShowEmojiPicker(false); }} className="p-2 text-[#00E5FF] hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </button>
                <button onClick={() => { setShowEmojiPicker(v => !v); setShowStickerGallery(false); }} className="p-2 text-[#00E5FF] hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>

                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendText();
                        }
                    }}
                    placeholder="Digite uma mensagem..."
                    className="flex-1 bg-cardDark border border-borderNeon rounded-xl px-4 py-2 text-sm text-textLight placeholder-textDark resize-none max-h-32 focus:outline-none focus:ring-1 focus:ring-primary"
                    rows={1}
                />
                <button onClick={handleSendText} className="p-2 text-[#00E5FF] disabled:text-textDark hover:text-white transition-colors" disabled={!text.trim()}>
                    <PaperAirplaneIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default ChatInputBar;