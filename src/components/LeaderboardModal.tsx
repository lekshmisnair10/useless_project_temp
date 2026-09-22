import React, { useState } from 'react';
import { X, Trophy, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LEADERBOARD_PAWS } from '../data/mockData';
import { audio } from '../utils/audio';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose }) => {
  const [dogs, setDogs] = useState(LEADERBOARD_PAWS);

  if (!isOpen) return null;

  const handleVote = (id: string) => {
    audio.playRomanticChime();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#EAB308', '#CA8A04', '#FDE047']
    });

    setDogs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, votes: d.votes + 1 } : d))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] rounded-3xl border-2 border-[#EBDDC1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#1B0E07]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] text-[#FAF6EE] border-b border-[#EAB308]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAB308]/20 border border-[#EAB308]/50 flex items-center justify-center text-[#EAB308]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                🏆 TOP PAWS OF KERALA
              </h3>
              <p className="text-xs text-[#EBDDC1]/80">
                Weekly Matrimonial Honours & High Society Rankings
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

        {/* Rankings List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {dogs.map((dog) => (
            <div
              key={dog.id}
              className="p-4 rounded-2xl bg-white border border-[#EBDDC1] hover:border-[#CA8A04]/60 shadow-xs flex items-center justify-between gap-3 transition-all"
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    dog.rank === 1
                      ? 'bg-amber-400 text-[#1B0E07] ring-2 ring-amber-300 shadow-md'
                      : dog.rank === 2
                      ? 'bg-stone-300 text-stone-800'
                      : dog.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  #{dog.rank}
                </div>

                {/* Photo */}
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#EBDDC1] shrink-0">
                  <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#1B0E07]">
                      {dog.name}
                    </h4>
                    <span className="text-[10px] text-stone-500 font-medium">
                      • {dog.breed}
                    </span>
                  </div>
                  <p className="text-xs text-[#854D0E] font-semibold">
                    {dog.title}
                  </p>
                  <span className="text-[10px] text-stone-400 block">
                    {dog.stat}
                  </span>
                </div>
              </div>

              {/* Vote Action */}
              <div className="text-right">
                <button
                  onClick={() => handleVote(dog.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF6EE] hover:bg-[#EBDDC1] active:scale-95 border border-[#EBDDC1] text-[#1B0E07] font-bold text-xs flex items-center gap-1 shadow-xs transition-all"
                >
                  <span>🐾 Give Paw</span>
                  <span className="text-[10px] text-stone-500 font-mono">({dog.votes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#FAF6EE] border-t border-[#EBDDC1] text-center text-[11px] text-stone-500">
          Rankings reset every full moon or whenever humans refill the kibble tub.
        </div>

      </div>
    </div>
  );
};
