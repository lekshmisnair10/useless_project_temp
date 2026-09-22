import React, { useState } from 'react';
import { X, Crown, Check, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

interface PuppyShaadiGoldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PuppyShaadiGoldModal: React.FC<PuppyShaadiGoldModalProps> = ({ isOpen, onClose }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'bones' | 'biscuits' | 'slippers'>('bones');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const benefits = [
    'Unlimited paw swipes with zero cooldown fatigue',
    'Priority barking delivery (direct to crush ear canal)',
    'Advanced sofa matching (with cushion angle precision)',
    'Premium treat analytics & macroeconomic biscuit forecasts',
    'Full family negotiation diplomacy & Ammu persuasion support',
    'AI destiny prediction powered by 14 million barks',
    'Unlimited emergency emotional support biscuits',
  ];

  const handleSubscribe = () => {
    audio.playMatchSound();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#CA8A04', '#EAB308', '#FDE047']
    });
    setSubscribed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1B0E07] via-[#2A1810] to-[#120803] text-[#FAF6EE] rounded-3xl border-2 border-[#EAB308] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#CA8A04] to-[#FDE047] flex items-center justify-center text-2xl text-[#1B0E07] shadow-lg shadow-amber-500/30">
              <Crown className="w-7 h-7 fill-current" />
            </div>

            <span className="text-[10px] uppercase tracking-widest font-black text-[#EAB308] block">
              Ultra Luxury Canine Tier
            </span>
            <h3 className="font-serif text-3xl font-bold text-white">
              PUPPYSHAADI <span className="text-[#EAB308]">GOLD</span>
            </h3>
            <div className="font-serif text-2xl font-bold text-[#FDE047]">
              ₹9,999 <span className="text-xs font-sans text-stone-300 font-normal">/ month</span>
            </div>
            <p className="text-[11px] text-[#EBDDC1]/70">
              Cancel anytime. Except during wedding season.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-black/40 p-4 rounded-2xl border border-white/10 space-y-2.5 text-xs">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex items-start gap-2 text-stone-200">
                <Check className="w-4 h-4 text-[#EAB308] shrink-0 mt-0.5" />
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* Satirical Currency Choice */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-stone-400 block tracking-wider">
              Select Canine Payment Currency:
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              {[
                { id: 'bones', label: '🦴 500 Bones' },
                { id: 'biscuits', label: '🍪 1,200 Biscuits' },
                { id: 'slippers', label: '🥿 3 Bata Slippers' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCurrency(c.id as any)}
                  className={`py-2 rounded-xl border text-center transition-all ${
                    selectedCurrency === c.id
                      ? 'bg-[#EAB308] text-[#1B0E07] border-[#EAB308] shadow-md'
                      : 'bg-white/10 text-white border-white/10 hover:bg-white/15'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-semibold text-center">
              👑 Welcome to PuppyShaadi GOLD! Extra biscuits dispatched to your living room.
            </div>
          ) : (
            <button
              onClick={handleSubscribe}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#CA8A04] text-[#1B0E07] font-black text-xs uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>UPGRADE TO GOLD NOW</span>
            </button>
          )}

          <p className="text-[10px] text-center text-stone-500 italic">
            * Disclaimer: This is 100% satirical. No actual credit cards or real money are collected.
          </p>
        </div>

      </div>
    </div>
  );
};
