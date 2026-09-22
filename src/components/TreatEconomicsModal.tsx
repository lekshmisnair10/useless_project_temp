import React from 'react';
import { X, TrendingUp, AlertTriangle, Coins, ShieldAlert, DollarSign } from 'lucide-react';
import { audio } from '../utils/audio';

interface TreatEconomicsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TreatEconomicsModal: React.FC<TreatEconomicsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] rounded-3xl border-2 border-[#EBDDC1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#1B0E07]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] text-[#FAF6EE] border-b border-[#EAB308]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAB308]/20 border border-[#EAB308]/50 flex items-center justify-center text-[#EAB308]">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  Treat Economics (BSE: BARK)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/40">
                  VOLATILE
                </span>
              </div>
              <p className="text-xs text-[#EBDDC1]/80">
                Canine Macroeconomic & Biscuit Reserve Dashboard
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

        {/* Scroll Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Inflation */}
            <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Annual Treat Inflation
              </span>
              <div className="font-serif text-3xl font-black text-rose-600 flex items-center gap-1.5">
                <span>17.8%</span>
                <TrendingUp className="w-5 h-5 text-rose-500" />
              </div>
              <p className="text-[11px] text-stone-500">
                A single biscuit now purchases 20% fewer belly rubs than in 2024.
              </p>
            </div>

            {/* Card 2: Monthly Requirement */}
            <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Monthly Treat Requirement
              </span>
              <div className="font-serif text-3xl font-black text-[#1B0E07]">
                483 Biscuits
              </div>
              <p className="text-[11px] text-stone-500">
                Minimum dietary threshold required to prevent household civil unrest.
              </p>
            </div>

            {/* Card 3: Emotional Reserve */}
            <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                Emotional Support Reserve
              </span>
              <div className="font-serif text-3xl font-black text-amber-700">
                127 Units
              </div>
              <p className="text-[11px] text-stone-500">
                Stored under the guest bedroom rug for thunderstorm emergencies.
              </p>
            </div>

            {/* Card 4: Emergency Fund Warning */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 shadow-sm space-y-1">
              <span className="text-[10px] uppercase font-bold text-rose-800 block tracking-wider">
                Emergency Biscuit Fund
              </span>
              <div className="font-serif text-2xl font-black text-rose-600 flex items-center gap-1.5">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>CRITICALLY LOW</span>
              </div>
              <p className="text-[11px] text-rose-900 font-medium">
                Immediate requisition from human pantry required before sundown.
              </p>
            </div>

          </div>

          {/* Slipper-to-Bacon Yield Curve */}
          <div className="p-5 rounded-2xl bg-[#1B0E07] text-[#FAF6EE] border border-[#EAB308]/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-bold text-[#EAB308]">
                Canine Commodity Exchange Rates
              </span>
              <span className="text-[10px] text-emerald-400">● LIVE TRADING</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <span className="text-stone-400 text-[10px] block">1 Left Bata Slipper</span>
                <span className="font-bold text-amber-300">= 3.5 Jerky Sticks</span>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <span className="text-stone-400 text-[10px] block">1 Squeaky Duck</span>
                <span className="font-bold text-emerald-300">= 12 Chicken Hearts</span>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                <span className="text-stone-400 text-[10px] block">1 Muddy Tennis Ball</span>
                <span className="font-bold text-blue-300">= Infinite Emotional Value</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] text-xs text-stone-600 space-y-1">
            <span className="font-bold text-[#1B0E07] block uppercase tracking-wider">
              Central Bank of Dogs (CBD) Policy
            </span>
            <p>
              "Quantitative Sniffing remains in effect. Any dog caught sharing more than 2% of their chicken cutlet will face audit by Grandmother Ammu."
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EBDDC1] bg-[#FAF6EE] flex justify-end">
          <button
            onClick={() => {
              audio.playNotificationSound();
              onClose();
            }}
            className="py-2.5 px-5 rounded-xl bg-[#1B0E07] text-[#FAF6EE] text-xs font-bold hover:bg-[#2A1810] transition-all"
          >
            Acknowledge Financial Reality
          </button>
        </div>

      </div>
    </div>
  );
};
