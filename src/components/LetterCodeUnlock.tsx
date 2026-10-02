import React, { useState, useRef, useEffect } from 'react';
import { Lock, Unlock, HelpCircle, RotateCcw, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { loveContent } from '../config/loveContent';

interface LetterCodeUnlockProps {
  onUnlock: () => void;
  onBackToDiary: () => void;
}

export const LetterCodeUnlock: React.FC<LetterCodeUnlockProps> = ({ onUnlock, onBackToDiary }) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only accept numeric single characters or handle paste
    const cleanVal = value.replace(/[^0-9]/g, '');
    if (!cleanVal) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    if (cleanVal.length > 1) {
      // Handle paste of multiple characters
      const pasted = cleanVal.slice(0, 6).split('');
      const newDigits = [...digits];
      for (let i = 0; i < 6; i++) {
        if (pasted[i]) {
          newDigits[i] = pasted[i];
        }
      }
      setDigits(newDigits);
      // Auto-validate if all filled
      if (newDigits.every((d) => d !== '')) {
        verifyCode(newDigits.join(''));
      } else {
        const nextEmpty = newDigits.findIndex((d) => d === '');
        if (nextEmpty !== -1) {
          inputRefs.current[nextEmpty]?.focus();
        }
      }
      return;
    }

    // Single character input
    const newDigits = [...digits];
    newDigits[index] = cleanVal;
    setDigits(newDigits);
    setErrorMessage('');

    // Advance focus
    if (index < 5 && cleanVal) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify if all 6 digits entered
    if (index === 5 && cleanVal) {
      const fullCode = newDigits.join('');
      verifyCode(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      verifyCode(digits.join(''));
    }
  };

  const handleClear = () => {
    setDigits(['', '', '', '', '', '']);
    setErrorMessage('');
    inputRefs.current[0]?.focus();
  };

  const verifyCode = (codeString: string) => {
    if (codeString.length < 6) {
      setErrorMessage('กรุณาใส่ตัวเลขให้ครบ 6 หลักนะ ♡');
      return;
    }

    // Exact string comparison preserving leading zeroes!
    if (codeString === loveContent.secretCodeConfig.code) {
      setIsSuccess(true);
      setErrorMessage('');
      // Trigger unlock transition after brief celebration animation
      setTimeout(() => {
        onUnlock();
      }, 1600);
    } else {
      setIsShaking(true);
      setErrorMessage(loveContent.secretCodeConfig.errorMessage);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 z-10">
      {/* Decorative Glow */}
      <div 
        className={`absolute w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isSuccess ? 'scale-150 bg-amber-200/50' : 'bg-rose-200/30'
        }`} 
      />

      <div className="max-w-md w-full mx-auto space-y-6 z-10">
        {/* Closed Letter Box / Romantic Envelope Showcase */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 text-center space-y-6 transition-all duration-500">
          
          {/* Top Envelope Icon with Wax Seal */}
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
            {/* Soft Envelope Paper Container */}
            <div 
              className={`w-20 h-16 bg-[#faf2e9] border border-stone-200 rounded-lg shadow-md flex items-center justify-center transition-transform duration-700 ${
                isSuccess ? 'scale-110 shadow-rose-200/60 shadow-xl' : ''
              }`}
            >
              {/* Wax Seal Center */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-700 ${
                  isSuccess 
                    ? 'bg-amber-400 text-white scale-125 rotate-12' 
                    : 'bg-rose-500 text-rose-100'
                }`}
                style={{
                  boxShadow: isSuccess 
                    ? '0 0 24px rgba(245, 158, 11, 0.6)' 
                    : '0 4px 10px rgba(225, 29, 72, 0.3)',
                }}
              >
                {isSuccess ? (
                  <Unlock className="w-5 h-5 text-white animate-bounce" />
                ) : (
                  <Lock className="w-4 h-4 text-white" />
                )}
              </div>
            </div>

            {/* Floating Sparkles when success */}
            {isSuccess && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
              </div>
            )}
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-800">
              {isSuccess ? loveContent.secretCodeConfig.successMessage : 'รหัสลับเปิดจดหมาย'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              {isSuccess 
                ? 'เตรียมหัวใจให้พร้อมสำหรับการอ่านความในใจนะ ♡'
                : loveContent.secretCodeConfig.promptMessage}
            </p>
          </div>

          {/* Success State Notification */}
          {isSuccess ? (
            <div className="py-4 space-y-2 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>ปลดล็อกสำเร็จแล้ว กำลังคลี่จดหมายออก...</span>
              </div>
            </div>
          ) : (
            <>
              {/* 6 Elegant Digit Inputs */}
              <div className={`space-y-4 ${isShaking ? 'animate-shake' : ''}`}>
                <div className="flex justify-center items-center gap-2 sm:gap-3">
                  {digits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { inputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      aria-label={`ตัวเลขที่ ${idx + 1}`}
                      className={`w-10 h-13 sm:w-12 sm:h-15 text-center text-xl sm:text-2xl font-mono font-bold rounded-xl border transition-all duration-200 outline-none select-none ${
                        digit
                          ? 'border-rose-400 bg-rose-50/80 text-rose-900 shadow-sm ring-2 ring-rose-200/50'
                          : 'border-stone-200 bg-[#fefcf9] text-stone-700 focus:border-rose-400 focus:ring-2 focus:ring-rose-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Error Notification */}
                {errorMessage && (
                  <p className="text-xs sm:text-sm text-rose-600 font-serif font-medium bg-rose-50/80 border border-rose-200/60 rounded-xl py-2 px-3 animate-fade-in">
                    {errorMessage}
                  </p>
                )}
              </div>

              {/* Action Buttons: Hint, Clear, Verify */}
              <div className="space-y-3 pt-1">
                <button
                  onClick={() => verifyCode(digits.join(''))}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-serif font-medium text-sm sm:text-base shadow-md shadow-rose-200 hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>เปิดอ่านจดหมาย ♡</span>
                </button>

                <div className="flex items-center justify-between text-xs pt-1 px-1">
                  {/* Hint Button */}
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="inline-flex items-center gap-1.5 text-stone-600 hover:text-rose-600 transition-colors font-medium py-1 px-2 rounded-lg hover:bg-rose-50/60"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>{loveContent.secretCodeConfig.hintButtonText}</span>
                  </button>

                  {/* Clear Button */}
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-800 transition-colors font-medium py-1 px-2 rounded-lg hover:bg-stone-100"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                    <span>{loveContent.secretCodeConfig.clearButtonText}</span>
                  </button>
                </div>

                {/* Revealed Hint Box */}
                {showHint && (
                  <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl p-3 text-left space-y-1 animate-fade-in text-xs text-amber-900">
                    <div className="flex items-center justify-between font-semibold">
                      <span>คำใบ้พิเศษ:</span>
                      <span className="font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                        {loveContent.secretCodeConfig.hint}
                      </span>
                    </div>
                    <p className="text-amber-800/80 leading-normal">
                      (วันที่เราตกลงเป็นแฟนกัน หรือวันครบรอบเดือนแรกของเรา เช่น ววดดปป)
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Return to Diary Cover button */}
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={onBackToDiary}
              className="text-xs text-stone-600 hover:text-rose-600 transition-colors font-sans"
            >
              ← กลับไปหน้าปกสมุด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
