import React, { useState } from 'react';
import { X, Scale, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { audio } from '../utils/audio';

interface DowryNegotiationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DowryNegotiationModal: React.FC<DowryNegotiationModalProps> = ({ isOpen, onClose }) => {
  const [treatOffer, setTreatOffer] = useState(40);
  const [sofaSplit, setSofaSplit] = useState(60);
  const [duckOwner, setDuckOwner] = useState<'groom' | 'bride' | 'joint'>('joint');
  const [chickenAccess, setChickenAccess] = useState<'groom' | 'bride' | 'alternating'>('alternating');
  const [resolved, setResolved] = useState(false);

  if (!isOpen) return null;

  const handleResolve = () => {
    audio.playMatchSound();
    setResolved(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] rounded-3xl border-2 border-[#EBDDC1] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#1B0E07]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] text-[#FAF6EE] border-b border-[#EAB308]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAB308]/20 border border-[#EAB308]/50 flex items-center justify-center text-[#EAB308]">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  Family Negotiation Center
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                  SATIRICAL
                </span>
              </div>
              <p className="text-xs text-[#EBDDC1]/80">
                Pre-nuptial arbitration over sofas, squeaky toys, and chicken cutlets
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

        {/* Scroll Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Status Alert */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-amber-900 block">
                NEGOTIATION STATUS:
              </span>
              <p className="text-xs text-amber-950 font-medium mt-0.5">
                {resolved
                  ? '✅ Treaty ratified! Squeaky duck granted shared diplomatic immunity.'
                  : '⚠️ Currently stuck over one yellow squeaky duck and window-side sunbeam rights.'}
              </p>
            </div>
          </div>

          {/* Clauses / Sliders */}
          <div className="space-y-4 text-xs">
            
            {/* Treat Offer */}
            <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] space-y-2">
              <div className="flex justify-between font-bold text-stone-700">
                <span>🍖 Dowry Treats Pledged per Week</span>
                <span className="font-mono text-[#CA8A04]">{treatOffer} Jerky Biscuits</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={treatOffer}
                onChange={(e) => setTreatOffer(Number(e.target.value))}
                className="w-full accent-[#CA8A04]"
              />
              <span className="text-[10px] text-stone-400">Grandmother Ammu expects at least 50 treats</span>
            </div>

            {/* Sofa Split */}
            <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] space-y-2">
              <div className="flex justify-between font-bold text-stone-700">
                <span>🛋️ Sofa Territorial Rights</span>
                <span className="font-mono text-stone-800">You: {sofaSplit}% | Match: {100 - sofaSplit}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={sofaSplit}
                onChange={(e) => setSofaSplit(Number(e.target.value))}
                className="w-full accent-[#1B0E07]"
              />
            </div>

            {/* Squeaky Toy Ownership */}
            <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] space-y-2">
              <span className="font-bold text-stone-700 block">🦆 Who Owns the Yellow Squeaky Duck?</span>
              <div className="grid grid-cols-3 gap-2">
                {(['groom', 'joint', 'bride'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setDuckOwner(opt)}
                    className={`py-2 rounded-xl border font-bold capitalize transition-all ${
                      duckOwner === opt
                        ? 'bg-[#1B0E07] text-[#FAF6EE] border-[#EAB308]'
                        : 'bg-[#FAF6EE] border-[#EBDDC1] hover:bg-white'
                    }`}
                  >
                    {opt === 'joint' ? 'Shared Custody' : opt}
                  </button>
                ))}
              </div>
            </div>

            {/* First Access to Chicken */}
            <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] space-y-2">
              <span className="font-bold text-stone-700 block">🍗 First Access to Fried Chicken Crusts</span>
              <div className="grid grid-cols-3 gap-2">
                {(['groom', 'alternating', 'bride'] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setChickenAccess(opt)}
                    className={`py-2 rounded-xl border font-bold capitalize transition-all ${
                      chickenAccess === opt
                        ? 'bg-[#1B0E07] text-[#FAF6EE] border-[#EAB308]'
                        : 'bg-[#FAF6EE] border-[#EBDDC1] hover:bg-white'
                    }`}
                  >
                    {opt === 'alternating' ? 'Alternate Days' : opt}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EBDDC1] bg-[#FAF6EE] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-all"
          >
            Cancel Talks
          </button>

          <button
            onClick={handleResolve}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#CA8A04] text-[#1B0E07] font-black text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>RATIFY PRE-NUP PROTOCOL 📜</span>
          </button>
        </div>

      </div>
    </div>
  );
};
