/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Romantic3DWorld } from './components/Romantic3DWorld';
import { HeaderNav, SceneStage } from './components/HeaderNav';
import { DiaryOpeningScene } from './components/DiaryOpeningScene';
import { LetterCodeUnlock } from './components/LetterCodeUnlock';
import { DiaryPages } from './components/DiaryPages';
import { MainLoveLetter } from './components/MainLoveLetter';
import { LoveCoupons } from './components/LoveCoupons';
import { FinalScene } from './components/FinalScene';
import { HelpModal } from './components/HelpModal';
import { loveContent } from './config/loveContent';

export default function App() {
  const [currentStage, setCurrentStage] = useState<SceneStage>('opening');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Transition handlers
  const handleOpenDiary = () => {
    setCurrentStage('unlock');
  };

  const handleUnlockCode = () => {
    setIsUnlocked(true);
    setCurrentStage('pages');
  };

  const handleProceedToLetter = () => {
    setCurrentStage('letter');
  };

  const handleProceedToCoupons = () => {
    setCurrentStage('coupons');
  };

  const handleProceedToFinal = () => {
    setCurrentStage('final');
  };

  const handleRestart = () => {
    setCurrentStage('opening');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (stage: SceneStage) => {
    // Prevent jumping forward past code lock if not yet unlocked
    if (!isUnlocked && (stage === 'pages' || stage === 'letter' || stage === 'coupons' || stage === 'final')) {
      setCurrentStage('unlock');
      return;
    }
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-rose-200 selection:text-rose-900">
      {/* 3D Love World Canvas Layer */}
      <Romantic3DWorld intensity={currentStage === 'final' ? 'dreamy' : 'normal'} />

      {/* Top Navigation Bar */}
      <HeaderNav
        currentStage={currentStage}
        onNavigate={handleNavigate}
        onOpenHelp={() => setIsHelpOpen(true)}
        unlocked={isUnlocked}
      />

      {/* Main Interactive Stage Area */}
      <main className="relative flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10 flex flex-col justify-center">
        {currentStage === 'opening' && (
          <DiaryOpeningScene onOpen={handleOpenDiary} />
        )}

        {currentStage === 'unlock' && (
          <LetterCodeUnlock
            onUnlock={handleUnlockCode}
            onBackToDiary={() => setCurrentStage('opening')}
          />
        )}

        {currentStage === 'pages' && (
          <DiaryPages
            onProceedToLetter={handleProceedToLetter}
            onBackToCode={() => setCurrentStage('unlock')}
          />
        )}

        {currentStage === 'letter' && (
          <MainLoveLetter
            onProceedToCoupons={handleProceedToCoupons}
            onBackToDiary={() => setCurrentStage('pages')}
          />
        )}

        {currentStage === 'coupons' && (
          <LoveCoupons
            onProceedToFinal={handleProceedToFinal}
            onBackToLetter={() => setCurrentStage('letter')}
          />
        )}

        {currentStage === 'final' && (
          <FinalScene
            onRevisitLetter={() => setCurrentStage('letter')}
            onRevisitCoupons={() => setCurrentStage('coupons')}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Quiet, Elegant Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-stone-600 font-sans border-t border-rose-100/60 bg-white/40 backdrop-blur-xs">
        <div className="max-w-md mx-auto px-4 flex items-center justify-center gap-2">
          <span>{loveContent.couple.title}</span>
          <span aria-hidden="true">·</span>
          <span>{loveContent.couple.anniversaryDate}</span>
          <span aria-hidden="true">·</span>
          <span>เขียนขึ้นด้วยความรักสำหรับเธอคนเดียว ♡</span>
        </div>
      </footer>

      {/* Help & Customization Guide Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
