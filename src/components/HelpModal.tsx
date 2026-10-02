import React from 'react';
import { X, Key, Music, FileText, CheckCircle, Heart } from 'lucide-react';
import { loveContent } from '../config/loveContent';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-rose-100 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-rose-100 pb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
            <h3 className="text-lg font-serif font-bold text-stone-800">
              คู่มือและการปรับแต่งเว็บไซต์
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
          
          {/* Secret Code Section */}
          <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200/60 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-rose-800">
              <Key className="w-4 h-4 text-rose-500" />
              <span>รหัสลับปลดล็อกจดหมาย</span>
            </div>
            <p>
              รหัสปลดล็อกปัจจุบันคือ: <strong className="font-mono text-rose-950 font-bold bg-white px-2 py-0.5 rounded border border-rose-300">{loveContent.secretCodeConfig.code}</strong>
            </p>
            <p className="text-stone-500 text-xs">
              คำใบ้: <strong className="font-mono text-rose-700">{loveContent.secretCodeConfig.hint}</strong> (รักษาเลขศูนย์ข้างหน้าเสมอ)
            </p>
          </div>

          {/* Music Customization */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900">
              <Music className="w-4 h-4 text-amber-600" />
              <span>การใส่เพลงเปียโนส่วนตัว (Custom Piano Music)</span>
            </div>
            <p>
              วางไฟล์เพลงของคุณที่พาธ: <code className="text-xs font-mono bg-white px-1.5 py-0.5 rounded border border-amber-300">public/audio/piano.mp3</code>
            </p>
            <p className="text-stone-500 text-xs">
              *หากยังไม่ได้ใส่ไฟล์ ระบบจะมีระบบเสียงเปียโนบรรเลงละมุน (Romantic Melody) เล่นจำลองให้อัตโนมัติอย่างราบรื่น
            </p>
          </div>

          {/* Messages Customization */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-stone-800">
              <FileText className="w-4 h-4 text-stone-600" />
              <span>การแก้ไขข้อความ จดหมาย และคูปองรัก</span>
            </div>
            <p>
              ข้อความ ความรู้สึก จดหมาย และรายการคูปองรักทั้งหมด สามารถแก้ไขได้ในไฟล์เดียวที่:
              <br />
              <code className="text-xs font-mono bg-white px-1.5 py-0.5 rounded border border-stone-300">src/config/loveContent.ts</code>
            </p>
          </div>

          {/* Verified features */}
          <div className="flex items-start gap-2 pt-1 text-xs text-stone-500">
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>เว็บไซต์เปิดได้โดยตรงผ่าน Public URL เพื่อส่งให้คนพิเศษ ไม่ต้องล็อกอิน ไม่มีการใช้รูปภาพหรือระบบแกลเลอรีรูปตามที่ระบุ</span>
          </div>

        </div>

        {/* Close Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm transition-colors"
          >
            เข้าใจแล้ว เข้าสู่เรื่องราวของเรา ♡
          </button>
        </div>
      </div>
    </div>
  );
};
