import React, { useState } from 'react';
import { Heart, Filter, MapPin, Sparkles, Volume2, ShieldAlert, CheckCircle2, MessageSquare, Calendar, Scale } from 'lucide-react';
import { DogProfile } from '../types';
import { DogAvatar } from './DogAvatar';
import { audio } from '../utils/audio';

interface MatchesSectionProps {
  dogs: DogProfile[];
  onOpenProfile: (dog: DogProfile) => void;
  onHearDestiny: (dog: DogProfile) => void;
  onOpenDatePlanner: (dog: DogProfile) => void;
  onOpenNegotiation: (dog: DogProfile) => void;
  onOpenChat: (dog: DogProfile) => void;
}

export const MatchesSection: React.FC<MatchesSectionProps> = ({
  dogs,
  onOpenProfile,
  onHearDestiny,
  onOpenDatePlanner,
  onOpenNegotiation,
  onOpenChat,
}) => {
  const [activeFilter, setActiveFilter] = useState('highest');

  const filters = [
    { id: 'highest', label: 'Highest Compatibility' },
    { id: 'nearby', label: 'Nearby Paws' },
    { id: 'food', label: 'Food Compatibility' },
    { id: 'family', label: 'Family Approved' },
    { id: 'emotional', label: 'Emotionally Available' },
    { id: 'treat', label: 'Treat Compatible' },
  ];

  const getFilteredDogs = () => {
    let list = [...dogs];
    if (activeFilter === 'highest') {
      list.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    } else if (activeFilter === 'food') {
      list.sort((a, b) => b.foodCompatibility - a.foodCompatibility);
    } else if (activeFilter === 'treat') {
      list.sort((a, b) => b.treatSharing - a.treatSharing);
    } else if (activeFilter === 'family') {
      list = list.filter((d) => d.familyOpinion.approves);
    } else if (activeFilter === 'nearby') {
      list = list.filter((d) => d.location.includes('Kochi') || d.location.includes('Ernakulam'));
    }
    return list;
  };

  const filteredDogs = getFilteredDogs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#854D0E] text-xs font-bold uppercase tracking-wider mb-1 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
          Verified Canine Alliances
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B0E07]">
          My Matrimonial Matches
        </h2>
        <p className="text-xs sm:text-sm text-[#2A1810]/70 max-w-xl mx-auto">
          Hand-curated prospective partners with verified ancestral barking lines and sofa etiquette.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              audio.playTinyBark();
              setActiveFilter(f.id);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold tracking-wide shrink-0 transition-all ${
              activeFilter === f.id
                ? 'bg-[#1B0E07] text-[#FAF6EE] shadow-md border-2 border-[#EAB308] scale-105'
                : 'bg-white text-stone-700 border border-[#EBDDC1] hover:bg-[#FAF6EE]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid of Matches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDogs.map((dog) => (
          <div
            key={dog.id}
            className="bg-[#FAF6EE] rounded-3xl border border-[#EBDDC1] hover:border-[#CA8A04]/60 shadow-md hover:shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 group"
          >
            {/* Top Photo Frame */}
            <div
              onClick={() => onOpenProfile(dog)}
              className="relative h-60 w-full bg-stone-200 cursor-pointer overflow-hidden"
            >
              <DogAvatar
                src={dog.photo}
                alt={dog.name}
                fallbackGradient={dog.fallbackGradient}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B0E07]/80 via-transparent to-black/20 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                <span className="px-2.5 py-1 rounded-full bg-[#1B0E07]/80 text-[#EAB308] text-[10px] uppercase font-black border border-[#EAB308]/40">
                  {dog.category}
                </span>

                <span className="px-2.5 py-1 rounded-full bg-[#FAF6EE] text-[#1B0E07] text-xs font-bold shadow-sm">
                  {dog.compatibilityScore}% Match
                </span>
              </div>

              {/* Bottom Card Identity Info */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-serif text-2xl font-bold leading-tight drop-shadow-md">
                  {dog.name}, {dog.age}
                </h3>
                <p className="text-xs text-[#EBDDC1] flex items-center gap-1 mt-0.5 drop-shadow">
                  <MapPin className="w-3.5 h-3.5 text-[#EAB308]" />
                  {dog.location}
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <p className="text-xs text-stone-700 italic leading-relaxed line-clamp-2">
                  "{dog.personality}"
                </p>

                {/* Compatibility Mini Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] bg-white p-2.5 rounded-xl border border-[#EBDDC1] shadow-xs">
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Fur</span>
                    <span className="font-black text-[#1B0E07]">{dog.furCompatibility}%</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Food</span>
                    <span className="font-black text-[#1B0E07]">{dog.foodCompatibility}%</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[9px] uppercase font-bold">Sofa</span>
                    <span className="font-black text-rose-600">{dog.sofaCompatibility}%</span>
                  </div>
                </div>

                {/* Flags Preview */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-medium truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{dog.greenFlags[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-800 font-medium truncate">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="truncate">{dog.redFlags[0]}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="space-y-2 pt-3 border-t border-[#EBDDC1]">
                <div className="flex gap-2">
                  <button
                    onClick={() => onHearDestiny(dog)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#2A1810] text-[#FAF6EE] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#1B0E07] transition-all"
                    title="Hear Malayalam Parody Dialogue"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#EAB308]" />
                    <span>Destiny</span>
                  </button>

                  <button
                    onClick={() => onOpenChat(dog)}
                    className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    title={`Direct Chat with ${dog.name}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat 💬</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onOpenDatePlanner(dog)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-[#EBDDC1]/50 hover:bg-[#EBDDC1] text-[#854D0E] text-[11px] font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-3 h-3 text-[#CA8A04]" />
                    <span>Date 📅</span>
                  </button>
                  <button
                    onClick={() => onOpenNegotiation(dog)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-[#EBDDC1]/50 hover:bg-[#EBDDC1] text-[#854D0E] text-[11px] font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <Scale className="w-3 h-3 text-[#CA8A04]" />
                    <span>Pre-Nup 📜</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
