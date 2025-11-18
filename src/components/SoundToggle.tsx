import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SoundToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for ambient sound
    // Note: You would need to add an actual audio file to public folder
    // For now, this is a placeholder that won't play anything
    audioRef.current = new Audio('/sounds/spooky-ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Audio playback failed - user interaction required');
      });
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-orange-600 to-purple-700 rounded-full shadow-lg shadow-orange-900/50 hover:scale-110 transition-all duration-300 group"
      title={isPlaying ? 'Mute ambient sounds' : 'Enable ambient sounds'}
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-white" />
      ) : (
        <VolumeX className="w-6 h-6 text-white" />
      )}
      
      {/* Pulse effect when playing */}
      {isPlaying && (
        <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20" />
      )}
    </button>
  );
};

export default SoundToggle;
