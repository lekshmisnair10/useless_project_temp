import React, { useState, useEffect } from 'react';
import { X, Sparkles, Heart, Laugh, CheckCircle2, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

interface UltimateDestinyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptDestiny: () => void;
}

export const UltimateDestinyModal: React.FC<UltimateDestinyModalProps> = ({
  isOpen,
  onClose,
  onAcceptDestiny,
}) => {
  const scanStages = [
    "ANALYZING...",
    "FUR METRICS...",
    "FOOD COMPATIBILITY...",
    "FAMILY RESISTANCE...",
    "PAST RELATIONSHIPS...",
    "SOFA DISPLACEMENT...",
    "EMOTIONAL DAMAGE INDEX...",
    "ANCESTRAL BARK RECORDS...",
  ];

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [showRidiculousResponse, setShowRidiculousResponse] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsScanning(true);
      setCurrentStageIndex(0);
      setShowRidiculousResponse(false);
      setAccepted(false);
      return;
    }

    // Play cinematic trailer sting
    audio.playCinematicSting();

    const interval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < scanStages.length - 1) {
          audio.playTinyBark();
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsScanning(false);
          audio.playMatchSound();
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#EAB308', '#CA8A04', '#FDE047', '#E11D48']
          });
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1B0E07] via-[#2A1810] to-[#120803] border-2 border-[#EAB308] rounded-3xl p-6 md:p-8 text-[#FAF6EE] shadow-2xl shadow-amber-500/20 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {isScanning ? (
          /* Dramatic Scanning State */
          <div className="py-12 text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full border-4 border-[#EAB308] border-t-transparent animate-spin flex items-center justify-center shadow-lg shadow-amber-500/30">
              <span className="text-4xl animate-pulse">🐾</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#EAB308] font-bold">
                Canine Supercomputer Core
              </span>
              <h2 className="font-serif text-2xl font-bold tracking-wide text-white">
                {scanStages[currentStageIndex]}
              </h2>
              <p className="text-xs text-[#EBDDC1]/60">
                Cross-referencing 14,000,000 barks and Kerala veterinary registry records...
              </p>
            </div>

            <div className="w-full bg-[#120803] h-2 rounded-full overflow-hidden border border-[#EAB308]/30">
              <div
                className="bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#FDE047] h-full transition-all duration-300"
                style={{ width: `${((currentStageIndex + 1) / scanStages.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          /* Final Reveal State */
          <div className="space-y-6 text-center animate-fadeIn">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#EAB308]/20 border border-[#EAB308]/50 text-[#FDE047] text-xs font-black tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              DESTINY ENGINE HAS SPOKEN
            </div>

            {/* Candidate Card */}
            <div className="relative mx-auto w-36 h-36 rounded-3xl overflow-hidden border-4 border-[#EAB308] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=400&q=80"
                alt="Bruno"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-0 right-0 text-center text-xs font-bold text-[#FDE047]">
                🐾 Bruno
              </span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#EBDDC1]/70">
                Your Ultimate Soulmate
              </span>
              <h2 className="font-serif text-3xl font-bold text-white">
                Bruno <span className="text-[#EAB308]">(99.73% Match)</span>
              </h2>
              <p className="text-xs text-[#EBDDC1]/80 mt-1 italic">
                "You were meant to bark together."
              </p>
            </div>

            {/* Scientific Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-left bg-black/40 p-4 rounded-2xl border border-[#EAB308]/20 text-xs">
              <div className="space-y-1">
                <span className="text-[#EBDDC1]/60 text-[10px] block uppercase">Scientific Confidence</span>
                <span className="font-bold text-amber-400">Questionable.</span>
              </div>
              <div className="space-y-1">
                <span className="text-[#EBDDC1]/60 text-[10px] block uppercase">Emotional Confidence</span>
                <span className="font-bold text-amber-300">Extremely Questionable.</span>
              </div>
              <div className="space-y-1 pt-2 border-t border-white/10">
                <span className="text-[#EBDDC1]/60 text-[10px] block uppercase">Family Approval</span>
                <span className="font-bold text-rose-400">Pending (Ammu is thinking).</span>
              </div>
              <div className="space-y-1 pt-2 border-t border-white/10">
                <span className="text-[#EBDDC1]/60 text-[10px] block uppercase">Treat Compatibility</span>
                <span className="font-bold text-emerald-400">Dangerously High (100%).</span>
              </div>
            </div>

            {showRidiculousResponse && (
              <div className="p-3.5 rounded-xl bg-amber-500/20 border border-[#EAB308] text-amber-200 text-xs font-medium animate-fadeIn">
                <p className="font-bold text-amber-300 mb-0.5">Correct.</p>
                <p>That is literally the purpose of this website.</p>
              </div>
            )}

            {accepted ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Destiny Accepted! Bruno has been added to your Priority Matches.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    audio.playMatchSound();
                    setAccepted(true);
                    onAcceptDestiny();
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>ACCEPT DESTINY</span>
                </button>

                <button
                  onClick={() => {
                    audio.playRejectionBoing();
                    setShowRidiculousResponse(true);
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white/90 font-bold text-xs uppercase tracking-wider border border-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Laugh className="w-4 h-4 text-amber-400" />
                  <span>THIS IS RIDICULOUS</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
