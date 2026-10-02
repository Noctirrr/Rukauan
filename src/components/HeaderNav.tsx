import React from 'react';
import { HelpCircle } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { loveContent } from '../config/loveContent';

export type SceneStage = 'opening' | 'unlock' | 'pages' | 'letter' | 'coupons' | 'final';

interface HeaderNavProps {
  currentStage: SceneStage;
  onNavigate: (stage: SceneStage) => void;
  onOpenHelp: () => void;
  unlocked: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentStage,
  onNavigate,
  onOpenHelp,
  unlocked,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/75 backdrop-blur-md border-b border-rose-100/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('opening')}
          className="text-base sm:text-lg font-serif font-bold text-rose-950 tracking-tight hover:text-rose-600 transition-colors whitespace-nowrap shrink-0 text-left"
        >
          {loveContent.couple.title}
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigate('opening')}
            className={`transition-colors whitespace-nowrap ${
              currentStage === 'opening'
                ? 'text-rose-600 font-semibold underline decoration-rose-300 underline-offset-4'
                : 'hover:text-stone-900'
            }`}
          >
            สมุดของเรา
          </button>

          <button
            onClick={() => onNavigate('unlock')}
            className={`transition-colors whitespace-nowrap ${
              currentStage === 'unlock'
                ? 'text-rose-600 font-semibold underline decoration-rose-300 underline-offset-4'
                : 'hover:text-stone-900'
            }`}
          >
            รหัสลับ
          </button>

          {unlocked && (
            <>
              <button
                onClick={() => onNavigate('pages')}
                className={`transition-colors whitespace-nowrap ${
                  currentStage === 'pages'
                    ? 'text-rose-600 font-semibold underline decoration-rose-300 underline-offset-4'
                    : 'hover:text-stone-900'
                }`}
              >
                ความในใจ
              </button>

              <button
                onClick={() => onNavigate('letter')}
                className={`transition-colors whitespace-nowrap ${
                  currentStage === 'letter'
                    ? 'text-rose-600 font-semibold underline decoration-rose-300 underline-offset-4'
                    : 'hover:text-stone-900'
                }`}
              >
                จดหมายรัก
              </button>

              <button
                onClick={() => onNavigate('coupons')}
                className={`transition-colors whitespace-nowrap ${
                  currentStage === 'coupons'
                    ? 'text-rose-600 font-semibold underline decoration-rose-300 underline-offset-4'
                    : 'hover:text-stone-900'
                }`}
              >
                คูปองพิเศษ ♡
              </button>

              <button
                onClick={() => onNavigate('final')}
                className={`transition-colors whitespace-nowrap ${
                  currentStage === 'final'
                    ? 'text-rose-600 font-semibold underline decoration-rose-300 underline-offset-4'
                    : 'hover:text-stone-900'
                }`}
              >
                บทส่งท้าย
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <AudioPlayer />
          
          <button
            onClick={onOpenHelp}
            className="p-1.5 rounded-full text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="คู่มือ & การปรับแต่ง"
            aria-label="คู่มือและการปรับแต่ง"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
