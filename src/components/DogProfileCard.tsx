import React from 'react';
import { Volume2, MapPin, CheckCircle2, MessageSquare } from 'lucide-react';
import { DogProfile } from '../types';
import { DogAvatar } from './DogAvatar';
import { audio } from '../utils/audio';

interface DogProfileCardProps {
  dog: DogProfile;
  onClick: () => void;
  onHearDestiny: (dog: DogProfile) => void;
  onQuickChat?: (dog: DogProfile) => void;
}

export const DogProfileCard: React.FC<DogProfileCardProps> = ({
  dog,
  onClick,
  onHearDestiny,
  onQuickChat,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-[#FAF6EE] border border-[#EBDDC1] hover:border-[#CA8A04]/60 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1.5"
    >
      {/* Photo Container with Top Badges */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-200">
        <DogAvatar
          src={dog.photo}
          alt={dog.name}
          fallbackGradient={dog.fallbackGradient}
          className="w-full h-full"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B0E07]/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-[#1B0E07]/75 backdrop-blur-md text-[#EAB308] border border-[#EAB308]/40 text-[10px] uppercase font-black tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#EAB308]" />
            <span>PAW VERIFIED</span>
          </span>

          <span className="px-2.5 py-1 rounded-full bg-[#FAF6EE]/90 backdrop-blur-md text-[#1B0E07] text-[11px] font-bold shadow-sm">
            {dog.age} {dog.age === 1 ? 'Year' : 'Years'}
          </span>
        </div>

        {/* Bottom Card Identity Info over Photo */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold leading-tight drop-shadow-md">
                {dog.name}
              </h3>
              <p className="text-xs text-[#EBDDC1] font-medium flex items-center gap-1 mt-0.5 drop-shadow">
                <MapPin className="w-3 h-3 text-[#EAB308]" />
                {dog.location}
              </p>
            </div>

            {/* Circular Compatibility Badge */}
            <div className="w-13 h-13 rounded-2xl bg-[#1B0E07]/90 border border-[#EAB308]/60 p-1.5 flex flex-col items-center justify-center text-center shadow-lg transform group-hover:scale-110 transition-transform">
              <span className="text-[9px] uppercase tracking-tight text-[#EAB308] font-bold">Match</span>
              <span className="font-serif text-sm font-black text-white">{dog.compatibilityScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#854D0E] bg-[#EBDDC1]/50 px-2 py-0.5 rounded-md">
              {dog.breed}
            </span>
            <span className="text-[11px] font-medium text-stone-500">
              {dog.category}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#2A1810]/85 italic line-clamp-2 leading-relaxed">
            "{dog.personality}"
          </p>
        </div>

        {/* Bottom Action Footer */}
        <div className="pt-3 border-t border-[#EBDDC1]/60 flex items-center justify-between gap-2">
          {/* Hear My Destiny Malayalam Audio Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onHearDestiny(dog);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#2A1810] to-[#1B0E07] text-[#FAF6EE] text-[11px] font-bold tracking-wide hover:border-[#EAB308] border border-transparent shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            title="Hear dramatic Malayalam cinema destiny audio"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Destiny</span>
          </button>

          {/* Quick Chat Shortcut */}
          {onQuickChat && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                audio.playTinyBark();
                onQuickChat(dog);
              }}
              className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center gap-1 shadow-xs transition-all active:scale-95"
              title={`Direct Chat with ${dog.name}`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chat 💬</span>
            </button>
          )}

          {/* View Profile Action */}
          <button
            onClick={onClick}
            className="py-2 px-3 rounded-xl bg-[#EBDDC1]/50 hover:bg-[#EBDDC1] text-[#1B0E07] text-[11px] font-bold transition-all"
          >
            Details 🐾
          </button>
        </div>
      </div>
    </div>
  );
};
