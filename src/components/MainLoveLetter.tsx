import React, { useRef } from 'react';
import { Heart, Sparkles, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { loveContent } from '../config/loveContent';

interface MainLoveLetterProps {
  onProceedToCoupons: () => void;
  onBackToDiary: () => void;
}

export const MainLoveLetter: React.FC<MainLoveLetterProps> = ({
  onProceedToCoupons,
  onBackToDiary,
}) => {
  const letterRef = useRef<HTMLDivElement>(null);
  const letterData = loveContent.mainLetter;

  const handleReread = () => {
    letterRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 z-10">
      {/* Warm Ambient Glow */}
      <div className="absolute w-[30rem] h-[30rem] rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto space-y-6 z-10" ref={letterRef}>
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between px-2">
          <button
            onClick={onBackToDiary}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium text-stone-600 hover:text-rose-600 transition-colors py-1 px-3 rounded-full bg-white/70 backdrop-blur-xs border border-rose-100 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{letterData.foldButtonText}</span>
          </button>

          <span className="text-xs font-serif text-rose-500 font-semibold tracking-wider uppercase flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {letterData.badge}
          </span>
        </div>

        {/* The Romantic Letter Parchment */}
        <article 
          className="relative bg-[#fffdf9] rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl border border-[#fae8dc] transition-all duration-500"
          style={{
            boxShadow: '0 25px 60px rgba(220, 130, 150, 0.18), 0 4px 16px rgba(0,0,0,0.04)',
            backgroundImage: 'radial-gradient(#faf2ec 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* Decorative Corner Filigrees */}
          <div className="absolute top-6 left-6 text-rose-200 pointer-events-none select-none">
            <Heart className="w-5 h-5 fill-rose-100" />
          </div>
          <div className="absolute top-6 right-6 text-rose-200 pointer-events-none select-none">
            <Heart className="w-5 h-5 fill-rose-100" />
          </div>

          <div className="space-y-8">
            
            {/* Salutation & Date */}
            <div className="border-b border-rose-100/80 pb-6 space-y-2">
              <div className="flex justify-between items-baseline text-xs text-stone-600 font-sans">
                <span className="font-serif italic text-rose-400">Letter of Love</span>
                <span className="font-mono tracking-tight">{letterData.date}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 pt-2 tracking-tight">
                {letterData.salutation}
              </h2>

              <p className="text-lg sm:text-xl font-handwriting text-rose-600">
                {letterData.openingGreeting}
              </p>
            </div>

            {/* Letter Paragraphs */}
            <div className="space-y-6 text-base sm:text-lg font-serif text-stone-700 leading-relaxed sm:leading-loose">
              {letterData.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="indent-6 sm:indent-8">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Closing & Handwritten Signature */}
            <div className="pt-8 border-t border-rose-100/80 flex flex-col items-end space-y-2 text-right">
              <p className="text-xl sm:text-2xl font-handwriting text-rose-600">
                {letterData.closing}
              </p>
              <div className="relative">
                <p className="text-2xl sm:text-3xl font-handwriting text-stone-800 font-bold tracking-wide">
                  {letterData.signature}
                </p>
                {/* Underline heart flourish */}
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-rose-400 rounded-full mt-1 ml-auto" />
              </div>
            </div>

          </div>
        </article>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          
          <button
            onClick={handleReread}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium text-stone-600 hover:text-stone-900 bg-white/80 hover:bg-white border border-rose-100 shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span>{letterData.rereadButtonText}</span>
          </button>

          <button
            onClick={onProceedToCoupons}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-serif font-semibold text-white bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-md shadow-rose-200 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span>{letterData.continueButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
