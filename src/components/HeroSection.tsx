import React from 'react';
import { Sparkles, Heart, Bone, ShieldAlert, ArrowRight } from 'lucide-react';
import { audio } from '../utils/audio';

interface HeroSectionProps {
  onFindSoulmate: () => void;
  onTreatEconomics: () => void;
  onCatGhostSupport: () => void;
  onCalculateDestiny: () => void;
  onEditBiodata: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onFindSoulmate,
  onTreatEconomics,
  onCatGhostSupport,
  onCalculateDestiny,
  onEditBiodata,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#FAF6EE] via-[#F5EEDD]/60 to-[#FAF6EE]">
      {/* Decorative Gold Rings in Background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-[#EAB308]/15 pointer-events-none -z-0" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full border border-[#EAB308]/10 pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBDDC1]/60 border border-[#CA8A04]/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#854D0E]">
              Kerala's #1 Canine Matrimonial Bureau
            </span>
          </div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1B0E07] leading-[1.15]">
            Find the one who <br />
            <span className="bg-gradient-to-r from-[#854D0E] via-[#CA8A04] to-[#A16207] bg-clip-text text-transparent italic">
              makes your tail wag.
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#2A1810]/80 font-normal max-w-2xl mx-auto leading-relaxed">
            The world's most unnecessarily sophisticated matrimonial platform for dogs. Verified pedigrees, sofa allocation agreements, and ancestral bark compatibility.
          </p>

          {/* Hackathon WOW Moment Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                audio.playDramaticBark();
                onCalculateDestiny();
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 via-amber-600 to-rose-700 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-sm tracking-wider uppercase shadow-xl shadow-rose-900/20 active:scale-95 transition-all flex items-center gap-2.5 border border-amber-300/40 animate-bounce"
            >
              <span className="text-lg">🚨</span>
              <span>CALCULATE MY ULTIMATE DESTINY</span>
              <Sparkles className="w-4 h-4 text-amber-200" />
            </button>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-3xl mx-auto mb-14">
          {/* Primary */}
          <button
            onClick={() => {
              audio.playBark(210, 0.22, 0.6);
              onFindSoulmate();
            }}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#CA8A04] text-[#1B0E07] font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>🐾 FIND MY SOULMATE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Biodata Registration Shortcut */}
          <button
            onClick={() => {
              audio.playTinyBark();
              onEditBiodata();
            }}
            className="px-5 py-3.5 rounded-2xl bg-white border-2 border-[#CA8A04]/40 text-[#1B0E07] font-bold text-sm tracking-wide shadow-sm hover:border-[#CA8A04] hover:bg-[#FAF6EE] active:scale-95 transition-all flex items-center gap-2"
          >
            <span>📝 MY BIODATA & COLUMNS</span>
          </button>

          {/* Secondary */}
          <button
            onClick={() => {
              audio.playRomanticChime();
              onTreatEconomics();
            }}
            className="px-5 py-3.5 rounded-2xl bg-[#FAF6EE] border border-[#CA8A04]/40 text-[#1B0E07] font-bold text-sm tracking-wide shadow-sm hover:bg-[#EBDDC1]/50 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>🐶 I'M JUST HERE FOR TREATS</span>
            <Bone className="w-4 h-4 text-[#CA8A04]" />
          </button>

          {/* Third Funny Option */}
          <button
            onClick={() => {
              audio.playRejectionBoing();
              onCatGhostSupport();
            }}
            className="px-5 py-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 font-bold text-sm tracking-wide shadow-sm hover:bg-rose-100 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>💔 GHOSTED BY A CAT</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </button>
        </div>

        {/* Hero Visual Section: Royal Dog in Wedding Attire + Floating Glass Cards */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Visual Frame */}
          <div className="relative rounded-3xl overflow-hidden border-4 border-[#EBDDC1] shadow-2xl bg-[#1B0E07]">
            <img
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=85"
              alt="Sophisticated royal canine in wedding attire"
              className="w-full h-[360px] sm:h-[440px] md:h-[500px] object-cover object-top opacity-95 hover:scale-105 transition-transform duration-700"
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B0E07] via-transparent to-black/20 pointer-events-none" />

            {/* Wedding Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#1B0E07]/75 backdrop-blur-md border border-[#EAB308]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#FAF6EE]">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#EAB308]">
                  Featured Royal Matrimonial Candidate
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  Her Highness Bella & Lord Bruno of Marine Drive
                </h3>
                <p className="text-xs text-[#EBDDC1]/80 mt-0.5">
                  Pre-nuptial sofa settlement completed. Alliance blessed by 48 grandmothers.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#CA8A04] text-[#1B0E07] text-xs font-black tracking-wide shrink-0">
                100% PAW VERIFIED
              </span>
            </div>
          </div>

          {/* Floating Glass Cards with Animated Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4">
            
            {/* Stat 1 */}
            <div className="p-4 rounded-2xl bg-[#FAF6EE]/90 backdrop-blur-md border border-[#CA8A04]/25 shadow-md flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-700 font-bold text-lg shrink-0">
                🐾
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl font-bold text-[#1B0E07]">
                  12,842,391
                </div>
                <div className="text-[11px] text-[#2A1810]/70 font-medium">
                  paws matched forever
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 rounded-2xl bg-[#FAF6EE]/90 backdrop-blur-md border border-[#CA8A04]/25 shadow-md flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-700 font-bold text-lg shrink-0">
                ❤️
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl font-bold text-[#1B0E07]">
                  98.7%
                </div>
                <div className="text-[11px] text-[#2A1810]/70 font-medium">
                  emotionally available
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 rounded-2xl bg-[#FAF6EE]/90 backdrop-blur-md border border-[#CA8A04]/25 shadow-md flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-700 font-bold text-lg shrink-0">
                🛋️
              </div>
              <div>
                <div className="font-serif text-lg sm:text-xl font-bold text-[#1B0E07]">
                  0.03%
                </div>
                <div className="text-[11px] text-[#2A1810]/70 font-medium">
                  willing to share their sofa
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
