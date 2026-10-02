import React, { useState } from 'react';
import { Heart, Sparkles, BookOpen, RotateCcw, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveContent } from '../config/loveContent';

interface FinalSceneProps {
  onRevisitLetter: () => void;
  onRevisitCoupons?: () => void;
  onRestart: () => void;
}

export const FinalScene: React.FC<FinalSceneProps> = ({ onRevisitLetter, onRevisitCoupons, onRestart }) => {
  const [hugGiven, setHugGiven] = useState(false);
  const finalData = loveContent.finalScene;

  const handleSendHug = () => {
    setHugGiven(true);

    // Fire romantic heart/rose colored sparkles
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#f472b6', '#fb7185', '#fda4af', '#fecdd3', '#fef08a'],
        shapes: ['circle'],
        scalar: 1.2,
      });

      // Second burst for delayed layered effect
      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#fbcfe8'],
          scalar: 0.9,
        });
      }, 250);
    } catch {
      // In case canvas-confetti is unsupported
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 z-10">
      {/* Warm Pink & Champagne Glow Halo */}
      <div className="absolute w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-rose-200/40 via-amber-100/30 to-pink-200/40 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="w-full max-w-xl mx-auto space-y-8 z-10 text-center">
        
        {/* Floating Open Diary & Delicate 3D Heart Centerpiece */}
        <div className="relative mx-auto w-48 h-36 flex items-center justify-center">
          
          {/* Subtle Floating Diary Graphic */}
          <div className="relative w-40 h-28 bg-[#fffcf7] rounded-xl shadow-2xl border border-rose-200/70 p-3 flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Pages divider */}
            <div className="w-full flex justify-between text-[9px] font-serif text-rose-300">
              <span>Chapter 01</span>
              <span>Forever</span>
            </div>

            {/* Glowing 3D Glass Heart Resting on Diary */}
            <div className="my-auto flex items-center justify-center">
              <div className="relative">
                <Heart 
                  className={`w-12 h-12 text-rose-500 fill-rose-300 drop-shadow-md transition-all duration-700 ${
                    hugGiven ? 'scale-125 text-pink-500 fill-pink-400 animate-bounce' : 'animate-pulse'
                  }`}
                  style={{ animationDuration: '3s' }}
                />
                <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '5s' }} />
              </div>
            </div>

            <div className="w-full text-center text-[10px] font-handwriting text-rose-400">
              Our Little World ♡
            </div>
          </div>
        </div>

        {/* Closing Romantic Texts */}
        <div className="space-y-4 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50/80 border border-rose-200/60 text-xs font-serif text-rose-600 font-medium">
            <Heart className="w-3 h-3 fill-rose-400" />
            <span>{loveContent.couple.title}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-800 tracking-tight leading-tight">
            {finalData.heading}
          </h1>

          <p className="text-base sm:text-lg font-serif text-stone-600 leading-relaxed sm:leading-loose">
            {finalData.message}
          </p>
        </div>

        {/* Hug Interactive Button & Affectionate Message Card */}
        <div className="space-y-4 pt-2">
          {!hugGiven ? (
            <button
              onClick={handleSendHug}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-serif font-semibold text-white bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-lg shadow-rose-300/60 hover:shadow-xl hover:shadow-rose-300/80 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
              <span>{finalData.hugButtonText}</span>
              <Sparkles className="w-5 h-5 text-amber-200" />
            </button>
          ) : (
            <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-rose-200 shadow-xl max-w-md mx-auto space-y-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto text-rose-500">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-handwriting font-bold text-rose-600">
                {finalData.hugResponseText}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                {finalData.hugSubText}
              </p>
              <button
                onClick={handleSendHug}
                className="mt-2 text-xs font-medium text-rose-500 hover:text-rose-700 underline font-sans"
              >
                (กดส่งกอดเพิ่มอีกรอบได้นะ ♡)
              </button>
            </div>
          )}
        </div>

        {/* Navigation Return Controls */}
        <div className="pt-8 border-t border-rose-100/80 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRevisitLetter}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium text-stone-600 hover:text-stone-900 bg-white/80 hover:bg-white border border-rose-100 shadow-xs transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-400" />
            <span>{finalData.revisitLetterText}</span>
          </button>

          {onRevisitCoupons && (
            <button
              onClick={onRevisitCoupons}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium text-stone-600 hover:text-rose-600 bg-white/80 hover:bg-white border border-rose-100 shadow-xs transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>ดูคูปองรักพิเศษ</span>
            </button>
          )}

          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium text-stone-600 hover:text-stone-900 bg-white/80 hover:bg-white border border-rose-100 shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
            <span>{finalData.restartText}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
