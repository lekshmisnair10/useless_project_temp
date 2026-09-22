import React, { useState } from 'react';
import { Sparkles, Moon, Sun, ShieldAlert, RefreshCw, Compass, Heart } from 'lucide-react';
import { PAWSTROLOGY_SIGNS } from '../data/mockData';
import { audio } from '../utils/audio';

export const PawstrologySection: React.FC = () => {
  const [selectedSignIndex, setSelectedSignIndex] = useState(0);
  const [dailyBarkNum, setDailyBarkNum] = useState(4);
  const [rollCount, setRollCount] = useState(0);

  const signs = [
    { name: 'Golden Paw (Retriever Sun)', emoji: '🐕✨' },
    { name: 'Diamond Collar (Terrier Sun)', emoji: '💎🐾' },
    { name: 'Velvet Pillow (Shih Tzu Sun)', emoji: '👑🛋️' },
    { name: 'Opera Howler (Husky Sun)', emoji: '🐺🎶' },
    { name: 'Compound Guardian (Indie Sun)', emoji: '🛡️🐶' },
  ];

  const currentData = PAWSTROLOGY_SIGNS[selectedSignIndex % PAWSTROLOGY_SIGNS.length];

  const handleCheckDestiny = () => {
    audio.playRomanticChime();
    setRollCount((prev) => prev + 1);
    setDailyBarkNum(Math.floor(Math.random() * 8) + 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#854D0E] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
          Celestial Canine Alignment
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B0E07]">
          Pawstrology & Bark Horoscopes
        </h2>
        <p className="text-xs sm:text-sm text-[#2A1810]/70 max-w-lg mx-auto">
          Ancient canine astrological chart dating back to the first stolen bone in Mesopotamia.
        </p>
      </div>

      {/* Sign Selector Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {signs.map((sign, idx) => (
          <button
            key={idx}
            onClick={() => {
              audio.playTinyBark();
              setSelectedSignIndex(idx);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedSignIndex === idx
                ? 'bg-[#1B0E07] text-[#FAF6EE] shadow-md border-2 border-[#EAB308]'
                : 'bg-white text-stone-700 border border-[#EBDDC1] hover:bg-[#EBDDC1]/40'
            }`}
          >
            <span>{sign.emoji}</span>
            <span>{sign.name}</span>
          </button>
        ))}
      </div>

      {/* Main Horoscope Card */}
      <div className="bg-gradient-to-b from-[#1B0E07] via-[#2A1810] to-[#120803] text-[#FAF6EE] p-6 sm:p-8 rounded-3xl border-2 border-[#EAB308] shadow-2xl space-y-6">
        
        {/* Header Zodiac Identity */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-black text-[#EAB308]">
              Primary Constellation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {currentData.signName}
            </h3>
          </div>

          <button
            onClick={handleCheckDestiny}
            className="px-4 py-2 rounded-xl bg-[#EAB308] hover:bg-yellow-400 active:scale-95 text-[#1B0E07] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>CHECK DESTINY 🔮</span>
          </button>
        </div>

        {/* 3 Astrological Positions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[#EBDDC1]/60 flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Paw Sign</span>
            </span>
            <p className="font-serif text-base font-bold text-amber-200">
              Golden Paw
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[#EBDDC1]/60 flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-blue-300" />
              <span>Moon Paw</span>
            </span>
            <p className="font-serif text-base font-bold text-blue-200">
              {currentData.moonSign}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[#EBDDC1]/60 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Rising Paw</span>
            </span>
            <p className="font-serif text-base font-bold text-emerald-200">
              {currentData.risingSign}
            </p>
          </div>
        </div>

        {/* Prediction Banner */}
        <div className="p-4 rounded-2xl bg-[#EAB308]/15 border border-[#EAB308]/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FDE047] uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-current" />
            <span>TODAY'S CELESTIAL LOVE PREDICTION</span>
          </div>
          <p className="font-serif text-lg sm:text-xl text-[#FDFBF7] italic">
            "{currentData.lovePrediction}"
          </p>
          <p className="text-xs text-[#EBDDC1]/80">
            Recommended action: Bark {dailyBarkNum} times towards the northeast kitchen cabinet before eating dinner.
          </p>
        </div>

        {/* Lucky Charms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Lucky Treat</span>
            <p className="font-bold text-white text-sm">{currentData.luckyTreat}</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">Lucky Sacred Object</span>
            <p className="font-bold text-white text-sm">{currentData.luckyObject}</p>
          </div>
        </div>

        {/* Romantic Warning */}
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold uppercase tracking-wider text-rose-300 block mb-0.5">
              Romantic Warning From The Stars
            </span>
            <p className="leading-relaxed">
              "{currentData.romanticWarning}"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
