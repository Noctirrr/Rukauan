import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';
import { loveContent } from '../config/loveContent';
import { pianoSynth } from '../utils/audioSynth';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [usingFallbackSynth, setUsingFallbackSynth] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.src = loveContent.audio.src;
    audio.loop = true;
    audio.volume = 0.35; // gentle romantic volume
    audioRef.current = audio;

    // Handle missing audio gracefully
    const handleError = () => {
      // Audio file not present or failed, ready fallback
      setUsingFallbackSynth(true);
    };

    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
      pianoSynth.stop();
    };
  }, []);

  const togglePlayback = async () => {
    if (isPlaying) {
      // Pause
      if (usingFallbackSynth) {
        pianoSynth.stop();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // Play
      if (usingFallbackSynth) {
        pianoSynth.start();
        setIsPlaying(true);
      } else if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          // If playback of mp3 fails (e.g. 404), gracefully switch to synth
          setUsingFallbackSynth(true);
          pianoSynth.start();
          setIsPlaying(true);
        }
      }
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
    pianoSynth.setVolume(newMuted ? 0 : 0.8);
  };

  return (
    <div className="relative inline-flex items-center gap-1.5" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <button
        onClick={togglePlayback}
        aria-label={isPlaying ? "หยุดเพลง" : "เล่นดนตรีเปียโน"}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-sm border ${
          isPlaying
            ? 'bg-rose-100 text-rose-800 border-rose-300 shadow-rose-100'
            : 'bg-white/80 backdrop-blur-sm text-stone-600 border-rose-200/60 hover:border-rose-300 hover:bg-rose-50/60'
        }`}
      >
        <span className="relative flex items-center justify-center w-4 h-4">
          {isPlaying ? (
            <Disc3 className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
          ) : (
            <Music className="w-3.5 h-3.5 text-stone-400" />
          )}
        </span>
        <span className="hidden sm:inline font-sans">
          {isPlaying ? 'ดนตรีคลอเบา ๆ ♡' : 'เปิดเพลงเปียโน'}
        </span>
      </button>

      {isPlaying && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
          className="p-1.5 rounded-full bg-white/80 border border-rose-200/60 text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      )}

      {/* Floating Tooltip */}
      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 z-50 w-56 p-2.5 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-rose-100 text-[11px] text-stone-600 space-y-1 animate-fade-in pointer-events-none">
          <div className="font-semibold text-rose-700 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-400" />
            {loveContent.audio.title}
          </div>
          <p className="text-stone-500 leading-relaxed">
            {usingFallbackSynth
              ? 'กำลังเล่นเสียงเปียโนบรรเลงละมุน (Romantic Melody) หรือใส่ไฟล์ piano.mp3 เพื่อเล่นเพลงที่คุณเลือก'
              : 'เล่นเพลงที่คุณจัดเตรียมไว้เพื่อคนพิเศษ'}
          </p>
        </div>
      )}
    </div>
  );
};
