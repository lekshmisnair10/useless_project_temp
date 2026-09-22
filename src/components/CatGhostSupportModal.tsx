import React from 'react';
import { X, Heart, ShieldAlert, Sparkles, Smile } from 'lucide-react';
import { audio } from '../utils/audio';

interface CatGhostSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatGhostSupportModal: React.FC<CatGhostSupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF6EE] rounded-3xl border-2 border-rose-300 shadow-2xl overflow-hidden flex flex-col text-[#1B0E07]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-900 to-stone-900 text-[#FAF6EE] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐱💔</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Feline Ghosting Therapy Center
              </h3>
              <p className="text-xs text-rose-200">
                Safe Sanctuary for Dogs Betrayed by Cats
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
            <p className="font-serif text-base font-bold text-rose-900">
              "It is not your fault."
            </p>
            <p className="leading-relaxed text-xs">
              Cats do not possess the emotional bandwidth for matrimonial stability. They sit on the compound wall, make intense eye contact for 4 seconds, and then disappear into the night without so much as a parting meow.
            </p>
          </div>

          <div className="space-y-2 text-stone-700">
            <span className="font-bold uppercase tracking-wider text-[10px] text-stone-400 block">
              Emergency Therapeutic Protocol
            </span>
            <div className="p-3 rounded-xl bg-white border border-[#EBDDC1] flex items-center gap-2">
              <span>🥛</span>
              <span className="text-xs">Bowl of warm goat milk dispensed immediately.</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#EBDDC1] flex items-center gap-2">
              <span>🎾</span>
              <span className="text-xs">New squeaky tennis ball provided for stress relief.</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#EBDDC1] flex items-center gap-2">
              <span>🛋️</span>
              <span className="text-xs">Guaranteed 90% sofa sleeping rights tonight.</span>
            </div>
          </div>

          <button
            onClick={() => {
              audio.playRomanticChime();
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-[#1B0E07] text-[#FAF6EE] font-bold text-xs uppercase tracking-wider hover:bg-[#2A1810] transition-all"
          >
            I Am Ready To Move On To Paws 🐾
          </button>
        </div>

      </div>
    </div>
  );
};
