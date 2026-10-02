import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { loveContent } from '../config/loveContent';

interface DiaryOpeningSceneProps {
  onOpen: () => void;
}

export const DiaryOpeningScene: React.FC<DiaryOpeningSceneProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenDiary = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Smooth transition time for 3D cover swing and light emergence
    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 z-10">
      {/* Subtle glowing halo behind diary */}
      <div 
        className={`absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-rose-200/40 blur-3xl pointer-events-none transition-all duration-1000 ${
          isOpening ? 'scale-150 bg-amber-100/70 opacity-100' : 'opacity-60 animate-pulse'
        }`}
        style={{ animationDuration: '4s' }}
      />

      {/* Romantic Titles */}
      <div className="text-center mb-8 md:mb-12 max-w-xl mx-auto space-y-3 z-10 transition-opacity duration-700">
        <p className="text-xs md:text-sm font-medium tracking-widest text-rose-500 uppercase font-sans flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{loveContent.couple.anniversaryDate}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-800 tracking-tight leading-tight">
          {loveContent.openingScene.title}
        </h1>
        <p className="text-sm md:text-base font-serif italic text-stone-500">
          "{loveContent.openingScene.subtitle}"
        </p>
      </div>

      {/* 3D Diary Showcase Container */}
      <div 
        className="relative py-6 my-2 perspective-1200 cursor-pointer group"
        onClick={handleOpenDiary}
      >
        {/* Soft realistic drop shadow on table/surface */}
        <div 
          className={`w-64 sm:w-72 md:w-80 h-10 bg-rose-950/15 rounded-full blur-xl mx-auto transition-all duration-700 transform translate-y-76 ${
            isOpening ? 'scale-110 opacity-30' : 'group-hover:scale-105 opacity-60'
          }`} 
        />

        {/* The 3D Book Object */}
        <div
          className={`relative w-64 sm:w-72 md:w-80 h-84 sm:h-92 md:h-96 rounded-r-2xl rounded-l-md transition-transform duration-1000 ease-out preserve-3d ${
            isOpening ? '-translate-y-4' : 'group-hover:-translate-y-2'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1200px',
          }}
        >
          {/* Back Cover & Paper Pages Stack (The base of the book) */}
          <div 
            className="absolute inset-0 bg-[#fbf6ee] rounded-r-2xl rounded-l-md border-r-8 border-b-8 border-stone-200 shadow-2xl flex flex-col justify-between overflow-hidden"
            style={{
              boxShadow: '16px 20px 40px rgba(180, 110, 130, 0.22), -2px 0 10px rgba(0,0,0,0.06)',
            }}
          >
            {/* Paper pages thickness lines effect on the right and bottom */}
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-stone-200 via-[#fcf8f0] to-transparent opacity-80" />
            <div className="absolute left-0 right-0 bottom-0 h-4 bg-gradient-to-t from-stone-200 via-[#fcf8f0] to-transparent opacity-80" />

            {/* Inner Pages visible when book opens */}
            <div className="relative w-full h-full p-6 flex flex-col justify-center items-center text-center bg-[#fffdfa]">
              {/* Inner Warm Light Emergence during opening */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-amber-100/90 via-rose-100/80 to-pink-50 transition-opacity duration-1000 ${
                  isOpening ? 'opacity-100' : 'opacity-0'
                }`} 
              />
              <div className="relative z-10 space-y-2">
                <Heart className="w-8 h-8 text-rose-400 mx-auto fill-rose-100 animate-pulse" />
                <p className="font-handwriting text-rose-700 text-lg md:text-xl">
                  เรื่องราวของเรา...
                </p>
                <div className="w-16 h-0.5 bg-rose-200 mx-auto rounded-full" />
              </div>
            </div>
          </div>

          {/* Book Spine (left rounded edge with stitching) */}
          <div 
            className="absolute -left-3 top-0 bottom-0 w-6 bg-gradient-to-r from-rose-400 via-rose-300 to-rose-400 rounded-l-md shadow-md z-30 flex flex-col items-center justify-around py-4"
            style={{
              boxShadow: '-6px 0 12px rgba(190, 80, 110, 0.25)',
            }}
          >
            <div className="w-0.5 h-6 bg-rose-200/60 rounded-full" />
            <div className="w-0.5 h-6 bg-rose-200/60 rounded-full" />
            <div className="w-0.5 h-6 bg-rose-200/60 rounded-full" />
          </div>

          {/* Satin Ribbon Bookmark dangling from spine */}
          <div 
            className="absolute left-8 -top-3 w-5 h-full pointer-events-none z-20 flex flex-col justify-end"
            style={{ filter: 'drop-shadow(2px 4px 6px rgba(170, 70, 90, 0.3))' }}
          >
            <div className="w-4 h-full bg-gradient-to-b from-rose-400 via-rose-300 to-rose-400 mx-auto rounded-t-sm" />
            {/* Ribbon notched tail */}
            <div 
              className="w-4 h-5 bg-rose-400 mx-auto"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 65%, 0 100%)',
              }}
            />
          </div>

          {/* 3D Front Cover (Hinged at left spine) */}
          <div
            className={`absolute inset-0 origin-left rounded-r-2xl rounded-l-sm transition-transform duration-1000 ease-in-out z-20 overflow-hidden ${
              isOpening ? 'transform -rotate-y-160' : 'group-hover:-rotate-y-10'
            }`}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              background: 'linear-gradient(135deg, #f9cdd6 0%, #f4b8c5 50%, #ee9eb0 100%)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.4), inset -4px 0 10px rgba(0,0,0,0.06), 8px 12px 28px rgba(180, 100, 120, 0.25)',
            }}
          >
            {/* Delicate Cover Stitching Border */}
            <div className="absolute inset-3 border border-dashed border-white/60 rounded-r-xl rounded-l-sm pointer-events-none" />

            {/* Embossed Floral & Gold Foil Accents */}
            <div className="relative w-full h-full flex flex-col items-center justify-between p-8 text-center select-none">
              {/* Top corner filigree / stars */}
              <div className="w-full flex justify-between items-center text-rose-100/80">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] tracking-widest font-sans font-semibold text-rose-800/60 uppercase">
                  {loveContent.openingScene.diarySpineDate}
                </span>
                <Sparkles className="w-4 h-4" />
              </div>

              {/* Center Embossed Heart & Gilded Typography */}
              <div className="space-y-4 my-auto">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-xs flex items-center justify-center shadow-inner border border-white/50">
                    <Heart className="w-10 h-10 text-rose-500 fill-rose-400/80 drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-200/80 blur-xs" />
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-rose-950 tracking-wide drop-shadow-xs">
                    {loveContent.couple.title}
                  </h2>
                  <p className="text-xs font-serif text-rose-800/80 tracking-widest uppercase">
                    {loveContent.openingScene.diaryCoverLabel}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Ribbon Clasp Detail */}
              <div className="flex items-center gap-2 text-rose-800/70 text-xs font-handwriting">
                <span>♡</span>
                <span>For Someone Special</span>
                <span>♡</span>
              </div>
            </div>

            {/* Subtle Leather/Paper Sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/30 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Action Button: “เปิดสมุดของเรา ♡” */}
      <div className="mt-8 sm:mt-12 z-10 text-center">
        <button
          onClick={handleOpenDiary}
          disabled={isOpening}
          className={`relative group inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base sm:text-lg font-serif font-medium tracking-wide transition-all duration-300 shadow-md ${
            isOpening
              ? 'bg-rose-300 text-white cursor-wait scale-95 shadow-none'
              : 'bg-gradient-to-r from-rose-400 via-rose-400 to-pink-400 text-white hover:from-rose-500 hover:to-pink-500 hover:shadow-rose-300/50 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          <Heart className={`w-4 h-4 fill-white ${isOpening ? 'animate-ping' : 'group-hover:scale-125 transition-transform'}`} />
          <span>{isOpening ? 'กำลังเปิดสมุดบันทึก...' : loveContent.openingScene.openButtonText}</span>
          <Sparkles className="w-4 h-4 text-amber-200" />
        </button>

        <p className="mt-3 text-xs text-stone-600 font-sans tracking-wide">
          (แตะที่สมุดหรือกดปุ่มเพื่อเริ่มเดินทางไปด้วยกัน)
        </p>
      </div>
    </div>
  );
};
