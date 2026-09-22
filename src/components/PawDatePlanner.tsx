import React, { useState } from 'react';
import { Calendar, Sparkles, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { audio } from '../utils/audio';

export const PawDatePlanner: React.FC = () => {
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [isBooked, setIsBooked] = useState(false);

  const dateOptions = [
    {
      id: 'park',
      name: '🌳 Municipal Park Walk',
      desc: 'Sniff 42 eucalyptus trees and engage in synchronized stick fetching.',
      success: 93,
      awkwardSilence: 61,
      treatTheft: 99,
      accidentalBarking: 87,
    },
    {
      id: 'dinner',
      name: '🍗 Romantic Chicken Dinner',
      desc: 'Shared roast chicken breast under soft candlelight. Extreme theft risks.',
      success: 97,
      awkwardSilence: 12,
      treatTheft: 100,
      accidentalBarking: 94,
    },
    {
      id: 'beach',
      name: '🏖️ Fort Kochi Beach Walk',
      desc: 'Splash in Arabian sea waves while pretending not to notice passing fishing boats.',
      success: 89,
      awkwardSilence: 40,
      treatTheft: 85,
      accidentalBarking: 98,
    },
    {
      id: 'sofa',
      name: '🛋️ Living Room Sofa Meeting',
      desc: 'Testing territorial snuggle dynamics while humans watch Malayalam news.',
      success: 95,
      awkwardSilence: 15,
      treatTheft: 70,
      accidentalBarking: 45,
    },
    {
      id: 'treat-swap',
      name: '🦴 Sacred Treat Exchange',
      desc: 'Formal diplomatic handover of high-grade marrow bone.',
      success: 91,
      awkwardSilence: 30,
      treatTheft: 100,
      accidentalBarking: 92,
    },
    {
      id: 'rain',
      name: '🌧️ Dramatic Monsoon Rain Walk',
      desc: 'High cinema aesthetic. 100% guarantee of smelling like wet dog afterwards.',
      success: 84,
      awkwardSilence: 75,
      treatTheft: 60,
      accidentalBarking: 99,
    },
  ];

  const currentOption = dateOptions[selectedDateIdx];

  const handleSelectDate = (idx: number) => {
    audio.playTinyBark();
    setSelectedDateIdx(idx);
    setIsBooked(false);
  };

  const handleBookDate = () => {
    audio.playRomanticChime();
    setIsBooked(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-[#CA8A04]">
          Romantic Diplomacy
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B0E07]">
          Paw-Date Planner
        </h2>
        <p className="text-xs sm:text-sm text-[#2A1810]/70 max-w-lg mx-auto">
          Calculated rendezvous to assess treat sharing and compound compatibility before final vows.
        </p>
      </div>

      {/* Date Options Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {dateOptions.map((opt, idx) => (
          <button
            key={opt.id}
            onClick={() => handleSelectDate(idx)}
            className={`p-4 rounded-2xl text-left border transition-all ${
              selectedDateIdx === idx
                ? 'bg-[#1B0E07] text-[#FAF6EE] border-[#EAB308] shadow-lg ring-2 ring-[#EAB308]/50'
                : 'bg-[#FAF6EE] text-[#1B0E07] border-[#EBDDC1] hover:bg-white'
            }`}
          >
            <h3 className="font-serif font-bold text-sm sm:text-base">
              {opt.name}
            </h3>
            <p className={`text-xs mt-1 leading-relaxed ${selectedDateIdx === idx ? 'text-[#EBDDC1]/80' : 'text-stone-600'}`}>
              {opt.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Probability Dashboard */}
      <div className="bg-gradient-to-b from-[#1B0E07] via-[#2A1810] to-[#120803] text-[#FAF6EE] p-6 sm:p-8 rounded-3xl border-2 border-[#EAB308] shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-black text-[#EAB308]">
              Selected Itinerary
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              {currentOption.name}
            </h3>
            <p className="text-xs text-emerald-400 mt-0.5">
              "Excellent choice. Romantic tail-wagging index optimal."
            </p>
          </div>

          <button
            onClick={handleBookDate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#CA8A04] text-[#1B0E07] font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all self-start sm:self-auto"
          >
            {isBooked ? 'DATE CONFIRMED IN CANINE CALENDAR 📅' : 'CONFIRM PAW-DATE 🐾'}
          </button>
        </div>

        {isBooked && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Paw-Date successfully scheduled for tomorrow 5:30 PM! Humans notified to bring extra poop bags.</span>
          </div>
        )}

        {/* 4 Probability Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-stone-400 font-bold block">Date Success</span>
            <div className="font-serif text-3xl font-black text-emerald-400">
              {currentOption.success}%
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full" style={{ width: `${currentOption.success}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-stone-400 font-bold block">Awkward Silence</span>
            <div className="font-serif text-3xl font-black text-amber-400">
              {currentOption.awkwardSilence}%
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full" style={{ width: `${currentOption.awkwardSilence}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-stone-400 font-bold block">Treat Theft Risk</span>
            <div className="font-serif text-3xl font-black text-rose-400">
              {currentOption.treatTheft}%
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-rose-400 h-full" style={{ width: `${currentOption.treatTheft}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-stone-400 font-bold block">Accidental Barking</span>
            <div className="font-serif text-3xl font-black text-purple-400">
              {currentOption.accidentalBarking}%
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full" style={{ width: `${currentOption.accidentalBarking}%` }} />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
