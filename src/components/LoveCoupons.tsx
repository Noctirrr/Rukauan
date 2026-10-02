import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Check, ArrowRight, ArrowLeft, Gift, Moon, Sun, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveContent, LoveCouponItem } from '../config/loveContent';
import { pianoSynth } from '../utils/audioSynth';

interface LoveCouponsProps {
  onProceedToFinal: () => void;
  onBackToLetter: () => void;
}

export const LoveCoupons: React.FC<LoveCouponsProps> = ({
  onProceedToFinal,
  onBackToLetter,
}) => {
  const couponsData = loveContent.couponsSection;
  const [redeemedMap, setRedeemedMap] = useState<Record<string, string>>({});
  const [justStampedId, setJustStampedId] = useState<string | null>(null);

  // Load redeemed coupons from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('anniversary_love_coupons_v1');
      if (saved) {
        setRedeemedMap(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  const handleToggleRedeem = (coupon: LoveCouponItem) => {
    const isCurrentlyRedeemed = !!redeemedMap[coupon.id];

    if (!isCurrentlyRedeemed) {
      // Play sparkling romantic chime sound!
      pianoSynth.playStampChime();

      // Trigger festive sparkle confetti
      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#fbcfe8', '#fef08a'],
          scalar: 0.8,
        });
      } catch {
        // ignore
      }

      setJustStampedId(coupon.id);
      setTimeout(() => setJustStampedId(null), 1200);

      const nowStr = new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
      });

      const updated = {
        ...redeemedMap,
        [coupon.id]: nowStr,
      };
      setRedeemedMap(updated);
      try {
        localStorage.setItem('anniversary_love_coupons_v1', JSON.stringify(updated));
      } catch {
        // ignore
      }
    } else {
      // Unredeem toggle
      const updated = { ...redeemedMap };
      delete updated[coupon.id];
      setRedeemedMap(updated);
      try {
        localStorage.setItem('anniversary_love_coupons_v1', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  const getCouponIcon = (type: LoveCouponItem['iconType']) => {
    switch (type) {
      case 'hug':
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />;
      case 'wish':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'listen':
        return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'forgive':
        return <Sun className="w-5 h-5 text-pink-400" />;
      default:
        return <Gift className="w-5 h-5 text-rose-400" />;
    }
  };

  const redeemedCount = Object.keys(redeemedMap).length;

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 z-10">
      {/* Background Soft Glow */}
      <div className="absolute w-[32rem] h-[32rem] rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />

      <div className="w-full max-w-3xl mx-auto space-y-8 z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between px-2">
          <button
            onClick={onBackToLetter}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium text-stone-600 hover:text-rose-600 transition-colors py-1 px-3 rounded-full bg-white/70 backdrop-blur-xs border border-rose-100 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>กลับไปหน้าจดหมาย</span>
          </button>

          <span className="text-xs font-serif text-rose-500 font-semibold tracking-wider uppercase flex items-center gap-1">
            <Gift className="w-3.5 h-3.5" />
            <span>{couponsData.badge}</span>
          </span>
        </div>

        {/* Section Header */}
        <div className="text-center space-y-3 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50/80 border border-rose-200/60 text-xs font-serif text-rose-600 font-medium">
            <Heart className="w-3 h-3 fill-rose-400" />
            <span>ใช้ได้จริงตลอดไป · {redeemedCount}/{couponsData.coupons.length} สิทธิ์ที่ใช้แล้ว</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {couponsData.heading}
          </h2>

          <p className="text-xs sm:text-sm font-serif text-stone-600 leading-relaxed">
            {couponsData.subheading}
          </p>
        </div>

        {/* Coupon Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {couponsData.coupons.map((coupon) => {
            const isRedeemed = !!redeemedMap[coupon.id];
            const isJustStamped = justStampedId === coupon.id;

            return (
              <div
                key={coupon.id}
                onClick={() => handleToggleRedeem(coupon)}
                className={`relative group bg-[#fffdf9] rounded-2xl p-6 border transition-all duration-300 shadow-md cursor-pointer select-none overflow-hidden ${
                  isRedeemed
                    ? 'border-rose-300/80 shadow-rose-100/60'
                    : 'border-[#f2e4e6] hover:border-rose-300 hover:shadow-lg hover:-translate-y-0.5'
                }`}
                style={{
                  backgroundImage: 'radial-gradient(#faf0ec 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              >
                {/* Perforated Notches on left and right */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#fdf5f5] border border-stone-200/60 shadow-inner pointer-events-none" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#fdf5f5] border border-stone-200/60 shadow-inner pointer-events-none" />

                {/* Ticket Content */}
                <div className="space-y-4">
                  
                  {/* Top Bar: Code & Icon */}
                  <div className="flex items-center justify-between border-b border-dashed border-rose-200/70 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
                        {getCouponIcon(coupon.iconType)}
                      </div>
                      <span className="font-mono text-xs font-bold text-rose-900 tracking-wider">
                        {coupon.codeNumber}
                      </span>
                    </div>

                    <span className="text-[11px] font-sans text-stone-600 bg-white/90 px-2.5 py-0.5 rounded-full border border-stone-200">
                      {coupon.validity}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 pr-2">
                    <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 group-hover:text-rose-700 transition-colors">
                      {coupon.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-serif text-stone-600 leading-relaxed">
                      {coupon.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-rose-100/60">
                    <span className="text-rose-500 font-sans font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{isRedeemed ? 'ใช้งานสิทธิ์แล้ว' : 'แตะเพื่อประทับตราใช้งาน'}</span>
                    </span>

                    <button
                      type="button"
                      className={`px-3 py-1 rounded-full text-xs font-serif font-semibold transition-all ${
                        isRedeemed
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-rose-500 text-white group-hover:bg-rose-600 shadow-xs'
                      }`}
                    >
                      {isRedeemed ? 'ใช้แล้ว ♡' : 'ประทับตรา'}
                    </button>
                  </div>
                </div>

                {/* Realistic Stamped Seal Overlay */}
                {isRedeemed && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
                      isJustStamped ? 'animate-bounce' : ''
                    }`}
                  >
                    <div
                      className="border-4 border-dashed border-rose-500/80 rounded-2xl px-5 py-2.5 transform -rotate-12 bg-white/70 backdrop-blur-xs shadow-lg text-center"
                      style={{
                        boxShadow: '0 0 20px rgba(244, 63, 94, 0.25)',
                      }}
                    >
                      <div className="flex items-center justify-center gap-1.5 text-rose-600 font-serif font-black tracking-widest text-sm sm:text-base uppercase">
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>{couponsData.stampLabel}</span>
                        <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      </div>
                      <div className="text-[10px] font-mono text-rose-500 font-medium">
                        {redeemedMap[coupon.id] || 'VALID & FOREVER'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Informative Subtext */}
        <div className="text-center p-4 rounded-2xl bg-white/70 backdrop-blur-xs border border-rose-100 max-w-lg mx-auto space-y-1">
          <p className="text-xs text-rose-800 font-serif flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{couponsData.redeemedNotice}</span>
          </p>
          <p className="text-[11px] text-stone-600 font-sans">
            (แตะซ้ำอีกครั้งที่คูปองหากต้องการยกเลิกการประทับตรา)
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToLetter}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium text-stone-600 hover:text-stone-900 bg-white/80 hover:bg-white border border-rose-100 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-rose-400" />
            <span>กลับไปอ่านจดหมาย</span>
          </button>

          <button
            onClick={onProceedToFinal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-serif font-semibold text-white bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-md shadow-rose-200 hover:shadow-lg transition-all active:scale-[0.98]"
          >
            <span>{couponsData.continueButtonText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
