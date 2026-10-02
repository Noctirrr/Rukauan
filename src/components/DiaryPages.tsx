import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Heart, BookOpen, Mail } from 'lucide-react';
import { loveContent } from '../config/loveContent';

interface DiaryPagesProps {
  onProceedToLetter: () => void;
  onBackToCode: () => void;
}

export const DiaryPages: React.FC<DiaryPagesProps> = ({ onProceedToLetter, onBackToCode }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const pages = loveContent.diaryPages;
  const currentPage = pages[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    } else {
      onProceedToLetter();
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    } else {
      onBackToCode();
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10">
      {/* Background Soft Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto space-y-6 z-10">
        
        {/* Open Book Display Container */}
        <div 
          className="relative bg-[#fffdfa] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-[#f3e7e9] transition-all duration-500 overflow-hidden"
          style={{
            boxShadow: '0 20px 45px rgba(220, 140, 160, 0.16), 0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          {/* Book Spine Shadow in the Center / Left gutter */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-rose-200/40 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100/40 to-transparent rounded-bl-full pointer-events-none" />

          {/* Top Page Header & Counter */}
          <div className="flex items-center justify-between border-b border-rose-100/80 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-serif font-medium tracking-wider text-rose-800/80 uppercase">
                {loveContent.couple.title}
              </span>
            </div>
            
            {/* Page number badge */}
            <div className="flex items-center gap-1.5 text-xs font-serif text-stone-500 bg-rose-50/70 px-3 py-1 rounded-full border border-rose-200/50">
              <span>{currentPage.chapter}</span>
            </div>
          </div>

          {/* Page Content with key to trigger smooth entrance */}
          <div 
            key={currentPage.id} 
            className="space-y-6 py-2 animate-fade-in"
          >
            {/* Chapter Heading */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1 text-xs text-rose-500 font-sans tracking-widest font-semibold uppercase">
                <Sparkles className="w-3 h-3" />
                <span>Chapter 0{currentPage.id}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-800 tracking-tight leading-snug">
                {currentPage.heading}
              </h2>
            </div>

            {/* Heartfelt Message (Serif / Thai font) */}
            <div className="relative py-2">
              <p className="text-base sm:text-lg md:text-xl font-serif text-stone-700 leading-relaxed sm:leading-loose">
                {currentPage.message}
              </p>
            </div>

            {/* Optional gentle whisper quote */}
            {currentPage.whisper && (
              <div className="p-4 rounded-2xl bg-rose-50/60 border-l-4 border-rose-300 italic text-xs sm:text-sm font-handwriting text-rose-800/90 leading-relaxed">
                "{currentPage.whisper}"
              </div>
            )}
          </div>

          {/* Subtle Decorative Bottom Motif */}
          <div className="pt-8 flex items-center justify-center gap-2 text-rose-300">
            <span className="h-px w-12 bg-rose-200" />
            <Heart className="w-4 h-4 fill-rose-100 text-rose-400" />
            <span className="h-px w-12 bg-rose-200" />
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-rose-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Back Button */}
            <button
              onClick={handlePrevPage}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium text-stone-600 hover:text-stone-900 bg-stone-100/70 hover:bg-stone-200/70 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{currentPageIndex === 0 ? 'กลับไปหน้ารหัส' : 'หน้าก่อนหน้า'}</span>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {pages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentPageIndex(idx)}
                  aria-label={`ไปที่หน้า ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentPageIndex
                      ? 'w-6 h-2 bg-rose-400'
                      : 'w-2 h-2 bg-rose-200 hover:bg-rose-300'
                  }`}
                />
              ))}
            </div>

            {/* Next / Proceed Button */}
            {currentPageIndex < pages.length - 1 ? (
              <button
                onClick={handleNextPage}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium text-white bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 shadow-sm shadow-rose-200 hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>หน้าถัดไป</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onProceedToLetter}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-serif font-semibold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-md shadow-rose-300 hover:shadow-lg transition-all animate-pulse"
              >
                <Mail className="w-4 h-4" />
                <span>เปิดอ่านจดหมายฉบับเต็ม ♡</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Jump Hint */}
        <p className="text-center text-xs text-stone-500 font-sans">
          (คุณสามารถกดที่จุดวงกลมเพื่อเลือกอ่านหน้าที่ต้องการได้ตลอดเวลา)
        </p>
      </div>
    </div>
  );
};
