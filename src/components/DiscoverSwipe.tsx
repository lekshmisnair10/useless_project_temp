import React, { useState, useRef, useEffect } from 'react';
import { Heart, X, Star, Volume2, Sparkles, MessageSquare, AlertTriangle, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DogProfile } from '../types';
import { DogAvatar } from './DogAvatar';
import { audio } from '../utils/audio';

interface DiscoverSwipeProps {
  dogs: DogProfile[];
  onApprove: (dog: DogProfile) => void;
  onHearDestiny: (dog: DogProfile) => void;
  onSaveLater: (dog: DogProfile) => void;
  onOpenProfile: (dog: DogProfile) => void;
  onQuickChat: (dog: DogProfile) => void;
}

export const DiscoverSwipe: React.FC<DiscoverSwipeProps> = ({
  dogs,
  onApprove,
  onHearDestiny,
  onSaveLater,
  onOpenProfile,
  onQuickChat,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [flyDirection, setFlyDirection] = useState<'left' | 'right' | null>(null);

  const [rejectCount, setRejectCount] = useState(0);
  const [rejectionToast, setRejectionToast] = useState<string | null>(null);
  const [sofaWarning, setSofaWarning] = useState(false);

  const currentDog = dogs[currentIndex % dogs.length];
  const nextDog = dogs[(currentIndex + 1) % dogs.length];
  const thirdDog = dogs[(currentIndex + 2) % dogs.length];

  const rejectReasons = [
    "Too much barking.",
    "Doesn't share treats.",
    "Suspiciously attractive.",
    "Family won't approve.",
    "I need time to process this.",
    "Barked at a leaf yesterday.",
    "Demands 80% sofa share.",
    "Eats kibble with a fork.",
    "Slept diagonally across the bed.",
  ];

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        triggerApprove();
      } else if (e.key === 'ArrowLeft') {
        triggerReject();
      } else if (e.key.toLowerCase() === 'c') {
        onQuickChat(currentDog);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentDog, currentIndex]);

  // Handle pointer / touch dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag on main card, ignore button clicks
    if ((e.target as HTMLElement).closest('button')) return;

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 110;
    if (dragOffset.x > threshold) {
      // Swiped Right -> Approve
      triggerApprove();
    } else if (dragOffset.x < -threshold) {
      // Swiped Left -> Reject
      triggerReject();
    } else {
      // Snap back to center
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const triggerApprove = () => {
    setFlyDirection('right');
    audio.playMatchSound();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#EAB308', '#CA8A04']
    });

    setTimeout(() => {
      onApprove(currentDog);
      setRejectionToast(null);
      setDragOffset({ x: 0, y: 0 });
      setFlyDirection(null);
      setCurrentIndex((prev) => prev + 1);
    }, 280);
  };

  const triggerReject = () => {
    setFlyDirection('left');
    audio.playRejectionBoing();
    const nextReject = rejectCount + 1;
    setRejectCount(nextReject);

    const randomReason = rejectReasons[Math.floor(Math.random() * rejectReasons.length)];
    setRejectionToast(randomReason);

    if (nextReject >= 3) {
      setSofaWarning(true);
    }

    setTimeout(() => {
      setRejectionToast(null);
    }, 2800);

    setTimeout(() => {
      setDragOffset({ x: 0, y: 0 });
      setFlyDirection(null);
      setCurrentIndex((prev) => prev + 1);
    }, 280);
  };

  const triggerSave = () => {
    audio.playRomanticChime();
    onSaveLater(currentDog);
    setCurrentIndex((prev) => prev + 1);
  };

  // Calculate dynamic rotation and stamp opacity
  const rotation = dragOffset.x * 0.07;
  const approveOpacity = Math.min(1, Math.max(0, dragOffset.x / 90));
  const rejectOpacity = Math.min(1, Math.max(0, -dragOffset.x / 90));

  return (
    <div className="max-w-xl mx-auto px-4 py-8 select-none">
      {/* Title */}
      <div className="text-center mb-6 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#854D0E] text-xs font-bold uppercase tracking-wider mb-1 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
          Interactive Swipe Radar
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B0E07]">
          Paw Swipe Matrimony
        </h2>
        <p className="text-xs text-[#2A1810]/70">
          👉 <span className="font-bold text-emerald-700">Swipe Right</span> to Approve | 👈 <span className="font-bold text-rose-700">Swipe Left</span> to Reject
        </p>
      </div>

      {/* Sofa Warning Alert */}
      {sofaWarning && (
        <div className="mb-4 p-3 rounded-2xl bg-amber-100 border border-amber-300 text-amber-950 text-xs flex items-center gap-2.5 animate-fadeIn">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 animate-bounce" />
          <div>
            <span className="font-bold block">Are you sure?</span>
            <span>At this rejection rate, you'll end up marrying your sofa cushion.</span>
          </div>
        </div>
      )}

      {/* Rejection Reason Toast */}
      {rejectionToast && (
        <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-semibold text-center shadow-md animate-bounce">
          ❌ Rejected: "{rejectionToast}"
        </div>
      )}

      {/* Stack Container */}
      <div className="relative h-[490px] sm:h-[530px] w-full max-w-md mx-auto">
        
        {/* Card 3 (Deep in stack) */}
        {thirdDog && (
          <div className="absolute inset-0 rounded-3xl bg-[#FAF6EE] border border-[#EBDDC1] shadow-md transform scale-90 translate-y-6 opacity-40 pointer-events-none transition-transform duration-300 overflow-hidden">
            <div className="h-full w-full bg-stone-300" />
          </div>
        )}

        {/* Card 2 (Next in line) */}
        {nextDog && (
          <div className="absolute inset-0 rounded-3xl bg-[#FAF6EE] border-2 border-[#EBDDC1] shadow-xl transform scale-95 translate-y-3 opacity-75 pointer-events-none transition-all duration-300 overflow-hidden">
            <div className="relative h-64 sm:h-72 w-full bg-stone-300">
              <DogAvatar
                src={nextDog.photo}
                alt={nextDog.name}
                fallbackGradient={nextDog.fallbackGradient}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B0E07]/60 to-transparent" />
            </div>
            <div className="p-4">
              <h4 className="font-serif text-xl font-bold text-stone-700">{nextDog.name}, {nextDog.age}</h4>
              <p className="text-xs text-stone-500">{nextDog.breed} • {nextDog.location}</p>
            </div>
          </div>
        )}

        {/* Card 1 (Active Draggable Card) */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            transform: flyDirection === 'right'
              ? 'translateX(600px) rotate(30deg)'
              : flyDirection === 'left'
              ? 'translateX(-600px) rotate(-30deg)'
              : `translate(${dragOffset.x}px, ${dragOffset.y * 0.4}px) rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          className="absolute inset-0 bg-[#FAF6EE] rounded-3xl border-2 border-[#EBDDC1] shadow-2xl overflow-hidden flex flex-col justify-between touch-none z-20"
        >
          {/* Dynamic "LIKE" Stamp (Appears on right drag) */}
          <div
            style={{ opacity: approveOpacity }}
            className="absolute top-8 left-8 z-30 pointer-events-none transform -rotate-12 border-4 border-emerald-500 rounded-2xl px-4 py-1.5 bg-emerald-500/20 backdrop-blur-xs text-emerald-400 font-serif font-black text-2xl tracking-widest uppercase shadow-lg transition-opacity"
          >
            PAW APPROVE ❤️
          </div>

          {/* Dynamic "NOPE" Stamp (Appears on left drag) */}
          <div
            style={{ opacity: rejectOpacity }}
            className="absolute top-8 right-8 z-30 pointer-events-none transform rotate-12 border-4 border-rose-600 rounded-2xl px-4 py-1.5 bg-rose-600/20 backdrop-blur-xs text-rose-500 font-serif font-black text-2xl tracking-widest uppercase shadow-lg transition-opacity"
          >
            NOPE ❌
          </div>

          {/* Photo & Profile Identity Header */}
          <div
            onClick={() => onOpenProfile(currentDog)}
            className="relative h-[310px] sm:h-[340px] w-full bg-stone-900 cursor-pointer overflow-hidden group"
          >
            <DogAvatar
              src={currentDog.photo}
              alt={currentDog.name}
              fallbackGradient={currentDog.fallbackGradient}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B0E07] via-transparent to-black/30 pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#1B0E07]/85 backdrop-blur-md text-[#EAB308] border border-[#EAB308]/40 text-xs font-black tracking-wider flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED ID
              </span>

              {/* Direct Quick Chat Shortcut Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  audio.playTinyBark();
                  onQuickChat(currentDog);
                }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-[#2A1810] to-[#1B0E07] text-[#FAF6EE] border border-[#EAB308]/50 hover:border-[#EAB308] text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                title={`Chat with ${currentDog.name}`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>Chat 💬</span>
              </button>
            </div>

            {/* Bottom Card Identity Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-[#EAB308] tracking-widest">
                    {currentDog.breed} • {currentDog.location}
                  </span>
                  <h3 className="font-serif text-3xl font-bold leading-tight drop-shadow-md">
                    {currentDog.name}, {currentDog.age}
                  </h3>
                </div>

                <div className="px-3 py-1 rounded-2xl bg-[#1B0E07]/90 border border-[#EAB308] text-center shadow-lg">
                  <span className="text-[9px] uppercase font-bold text-[#EAB308] block">Match</span>
                  <span className="font-serif text-base font-black text-white">{currentDog.compatibilityScore}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Row */}
          <div className="p-3.5 bg-white/80 border-y border-[#EBDDC1] flex items-center justify-between text-xs text-[#2A1810]">
            <p className="italic text-stone-700 truncate max-w-[240px]">
              "{currentDog.personality}"
            </p>
            <button
              onClick={() => onOpenProfile(currentDog)}
              className="text-[#CA8A04] hover:underline font-bold text-xs shrink-0"
            >
              Full Profile 🐾
            </button>
          </div>

          {/* Action Buttons Bar */}
          <div className="p-4 flex items-center justify-around gap-2 bg-[#FAF6EE]">
            
            {/* Left Reject */}
            <button
              onClick={triggerReject}
              className="w-13 h-13 rounded-full bg-rose-50 border-2 border-rose-300 hover:bg-rose-100 active:scale-90 text-rose-600 flex items-center justify-center shadow-md transition-all group"
              title="Swipe Left / Reject (←)"
            >
              <X className="w-6 h-6 stroke-[2.5] group-hover:rotate-12 transition-transform" />
            </button>

            {/* Hear Destiny Voiceover */}
            <button
              onClick={() => onHearDestiny(currentDog)}
              className="w-11 h-11 rounded-full bg-[#2A1810] border-2 border-[#EAB308] hover:bg-[#1B0E07] active:scale-90 text-[#EAB308] flex items-center justify-center shadow-md transition-all"
              title="Hear Malayalam Cinema Voiceover"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            {/* Quick Chat Shortcut Button */}
            <button
              onClick={() => {
                audio.playTinyBark();
                onQuickChat(currentDog);
              }}
              className="w-11 h-11 rounded-full bg-emerald-50 border-2 border-emerald-300 hover:bg-emerald-100 active:scale-90 text-emerald-700 flex items-center justify-center shadow-md transition-all"
              title={`Direct Chat with ${currentDog.name} (C)`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* Save for Later */}
            <button
              onClick={triggerSave}
              className="w-11 h-11 rounded-full bg-amber-50 border-2 border-amber-300 hover:bg-amber-100 active:scale-90 text-amber-700 flex items-center justify-center shadow-md transition-all"
              title="Save For Later"
            >
              <Star className="w-5 h-5" />
            </button>

            {/* Right Approve */}
            <button
              onClick={triggerApprove}
              className="w-13 h-13 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 hover:brightness-110 active:scale-90 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 transition-all group"
              title="Swipe Right / Approve (→)"
            >
              <Heart className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
            </button>

          </div>

        </div>

      </div>

      {/* Helper Guidance */}
      <div className="mt-4 flex items-center justify-center gap-6 text-[11px] text-stone-500 font-medium">
        <span className="flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5 text-rose-600" /> Swipe Left (Nope)
        </span>
        <span className="text-stone-300">•</span>
        <span className="flex items-center gap-1">
          Swipe Right (Approve) <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
        </span>
      </div>
    </div>
  );
};
