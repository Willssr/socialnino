import React, { useState, useEffect, useRef } from 'react';
import { Story } from '../types';

interface StoryViewerModalProps {
  stories: Story[];
  onClose: () => void;
}

const STORY_DURATION = 5000; // 5 seconds

const StoryViewerModal: React.FC<StoryViewerModalProps> = ({ stories, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stories[currentIndex].mediaType === 'video' && videoRef.current) {
        // For video, we'll let the video's own progress drive the UI
        return;
    }
      
    // For images, we use a timer
    const timer = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onClose();
      }
    }, STORY_DURATION);

    const interval = setInterval(() => {
      setProgress(p => p + (100 / (STORY_DURATION / 100)));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [currentIndex, stories, onClose]);

  useEffect(() => {
    // Reset progress when index changes
    setProgress(0);
    if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
    }
  }, [currentIndex]);
  
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
        const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(p);
    }
  };
  
  const handleVideoEnded = () => {
    if (currentIndex < stories.length - 1) {
        setCurrentIndex(currentIndex + 1);
    } else {
        onClose();
    }
  };


  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const clickPosition = clientX - left;

    if (clickPosition < width * 0.3) {
      goToPrev();
    } else {
      goToNext();
    }
  };

  const currentStory = stories[currentIndex];

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full max-w-md h-full max-h-[95vh] bg-black rounded-lg overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Progress Bars */}
        <div className="absolute top-2 left-2 right-2 flex space-x-1 z-20">
          {stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${index < currentIndex ? 100 : index === currentIndex ? progress : 0}%`, transition: index === currentIndex && currentStory.mediaType === 'image' ? 'width 0.1s linear' : 'none' }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-5 left-4 flex items-center space-x-2 z-20">
          <img src={currentStory.avatar} alt={currentStory.author} className="w-8 h-8 rounded-full" />
          <span className="text-white font-semibold text-sm">{currentStory.author}</span>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl z-20">&times;</button>
        
        {/* Content */}
        <div className="w-full h-full flex items-center justify-center">
            {currentStory.mediaType === 'image' ? (
                <img src={currentStory.mediaSrc} alt="Story content" className="w-full h-full object-contain" />
            ) : (
                <video 
                    ref={videoRef}
                    src={currentStory.mediaSrc} 
                    className="w-full h-full object-contain"
                    autoPlay
                    onTimeUpdate={handleVideoTimeUpdate}
                    onEnded={handleVideoEnded}
                    playsInline
                />
            )}
        </div>

        {/* Navigation Overlay */}
        <div className="absolute inset-0" onClick={handleNavigation}></div>
      </div>
    </div>
  );
};

export default StoryViewerModal;
