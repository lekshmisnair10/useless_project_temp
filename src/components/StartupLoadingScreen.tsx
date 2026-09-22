import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';

interface StartupLoadingScreenProps {
  onComplete: () => void;
}

export const StartupLoadingScreen: React.FC<StartupLoadingScreenProps> = ({ onComplete }) => {
  const steps = [
    "Finding true love...",
    "Scanning 14,287 paws...",
    "Consulting ancestral bark records...",
    "Calculating sofa compatibility...",
    "Negotiating treat expectations...",
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    // Immediately attempt to play the requested barking audio file
    audio.playOpeningBarkFile(0.8).catch(() => {});

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          setProgress(Math.round(((prev + 2) / (steps.length + 1)) * 100));
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setProgress(100);
          setTimeout(() => {
            setShowPunchline(true);
            audio.playRomanticChime();
          }, 600);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(stepInterval);
  }, []);

  const handleEnter = () => {
    // Play the full authentic barking audio when entering
    audio.playOpeningBarkFile(0.9);
    onComplete();
  };

  return (
    <div 
      onClick={() => {
        // Unlock audio on any first click on loading screen
        audio.playOpeningBarkFile().catch(() => {});
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1B0E07] text-[#FAF6EE] px-4 cursor-pointer"
    >
      {/* Background ambient gold aura */}
      <div className="absolute w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20 animate-pulse" />
      <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20 animate-pulse" />

      <div className="w-full max-w-md bg-[#2A1810]/80 backdrop-blur-xl border border-[#EAB308]/30 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Top Gold Crest */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-[#CA8A04] to-[#FDE047] flex items-center justify-center shadow-lg shadow-amber-500/20 animate-float">
          <span className="text-3xl">🐾</span>
        </div>

        <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#FDFBF7]">
          PUPPYSHAADI<span className="text-[#EAB308]">.MATRIMONY</span>
        </h1>
        <p className="text-xs uppercase tracking-widest text-[#EBDDC1]/70 mt-1 mb-8">
          The Unnecessarily Sophisticated Platform
        </p>

        {!showPunchline ? (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="w-full bg-[#1B0E07] h-2.5 rounded-full overflow-hidden border border-[#EAB308]/20">
              <div
                className="bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#FDE047] h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Rotating Serious Step */}
            <div className="h-10 flex items-center justify-center">
              <p className="text-sm font-medium text-[#EBDDC1] animate-pulse">
                {steps[currentStepIndex]}
              </p>
            </div>

            <div className="flex justify-between items-center text-xs text-[#EBDDC1]/50 pt-2 border-t border-[#FAF6EE]/10">
              <span>Security: Bark Encrypted</span>
              <span>Audio: Initializing 🔊</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="py-4 px-3 bg-[#1B0E07]/60 rounded-2xl border border-[#EAB308]/20">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#EAB308] block mb-2">
                Executive Assessment
              </span>
              <p className="font-serif text-xl md:text-2xl text-[#FDFBF7] leading-snug font-medium">
                "Congratulations.<br />
                We found absolutely no reason for this application to exist."
              </p>
            </div>

            <button
              onClick={handleEnter}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#CA8A04] text-[#1B0E07] font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
            >
              <span>ENTER MATRIMONIAL MARKET 🐾</span>
            </button>
            <p className="text-[11px] text-[#EBDDC1]/50">
              Click to unleash the barking and enter canine romance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
