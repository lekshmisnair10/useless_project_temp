import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { audio } from '../utils/audio';

interface AudioUnlockBannerProps {
  onActivated?: () => void;
}

export const AudioUnlockBanner: React.FC<AudioUnlockBannerProps> = ({ onActivated }) => {
  const [activated, setActivated] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleActivate = async () => {
    setIsPlaying(true);
    await audio.playOpeningSequence();
    setIsPlaying(false);
    setActivated(true);
    setMessage('Your dog has entered the matrimonial market.');
    if (onActivated) onActivated();
    
    // Auto dismiss banner after 5 seconds
    setTimeout(() => {
      setMessage(null);
    }, 5500);
  };

  if (activated && !message) return null;

  return (
    <div className="bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] border-b border-[#EAB308]/40 text-[#FAF6EE] py-2.5 px-4 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-[#EAB308]/20 text-[#EAB308]">
            <Sparkles className="w-4 h-4 animate-spin" />
          </span>
          <p className="font-medium text-xs sm:text-sm text-[#FDFBF7]">
            {!activated ? (
              <>
                <span className="text-[#EAB308] font-semibold">Sound Experience:</span> Enable Paw Audio for overdramatic Malayalam cinema dialogues & barks!
              </>
            ) : (
              <span className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4 inline" />
                Audio successfully activated. {message}
              </span>
            )}
          </p>
        </div>

        {!activated && (
          <button
            onClick={handleActivate}
            disabled={isPlaying}
            className="w-full sm:w-auto px-4 py-1.5 rounded-full bg-gradient-to-r from-[#CA8A04] to-[#EAB308] hover:brightness-110 active:scale-95 text-[#1B0E07] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Volume2 className="w-3.5 h-3.5" />
            {isPlaying ? 'Barking...' : 'Enable Paw Audio 🔊'}
          </button>
        )}
      </div>
    </div>
  );
};
