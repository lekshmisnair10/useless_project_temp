import React, { useState } from 'react';
import { Calculator, Sparkles, RefreshCw, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { audio } from '../utils/audio';

interface CompatibilityCalculatorProps {
  onOpenGoldModal: () => void;
}

export const CompatibilityCalculator: React.FC<CompatibilityCalculatorProps> = ({ onOpenGoldModal }) => {
  const [sofaShare, setSofaShare] = useState(75);
  const [barkFrequency, setBarkFrequency] = useState(60);
  const [bathTolerance, setBathTolerance] = useState(-30);
  const [slipperStealing, setSlipperStealing] = useState(90);
  const [treatSharing, setTreatSharing] = useState(5);
  const [catTolerance, setCatTolerance] = useState(-80);
  const [sleepHours, setSleepHours] = useState(16);

  const [calcOffset, setCalcOffset] = useState(0);

  // Dynamic ridiculous score calculation based on inputs + formula
  const baseScore = Math.min(
    99.9,
    Math.max(
      45.0,
      85 +
        (sofaShare * 0.12) -
        (Math.abs(bathTolerance) * 0.08) +
        (slipperStealing * 0.05) -
        (treatSharing * 0.3) + // less sharing = dog logic!
        (sleepHours * 0.4) +
        calcOffset
    )
  ).toFixed(2);

  const handleRecalculate = () => {
    audio.playRomanticChime();
    // vary slightly
    setCalcOffset((prev) => (Math.random() * 4 - 2));
  };

  const getRiskAssessment = (score: number) => {
    if (score > 95) return 'Mildly Chaotic with High Couch Synergy';
    if (score > 85) return 'Moderate Slipper Vulnerability';
    return 'Catastrophic Treat Dependency';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header & Formula */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest font-bold text-[#CA8A04]">
          Algorithmic Canine Dynamics
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B0E07]">
          Ridiculous Compatibility Engine
        </h2>
        <p className="text-xs sm:text-sm text-[#2A1810]/70 max-w-xl mx-auto">
          Powered by 4,000 hours of nap research and zero human peer reviews.
        </p>

        {/* Serious Scientific Formula Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] text-[#FAF6EE] border border-[#EAB308]/40 shadow-lg text-center overflow-x-auto">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#EAB308] block mb-1">
            Official Puppyshaadi Axiom
          </span>
          <code className="font-mono text-xs sm:text-sm text-[#FDE047] font-semibold tracking-wide">
            LOVE SCORE = FUR + FOOD + SOFA + EMOTIONAL + TREAT ECONOMICS + PAWSTROLOGY
          </code>
        </div>
      </div>

      {/* Main Grid: Controls + Real-Time Report Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Interactive Sliders (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF6EE] p-6 rounded-3xl border border-[#EBDDC1] shadow-md space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#1B0E07] flex items-center gap-2 border-b border-[#EBDDC1] pb-3">
            <Calculator className="w-5 h-5 text-[#CA8A04]" />
            <span>Tune Your Relationship Variables</span>
          </h3>

          <div className="space-y-4 text-xs">
            {/* Sofa Preference */}
            <div>
              <div className="flex justify-between font-bold text-stone-700 mb-1">
                <span>🛋️ Required Sofa Territory</span>
                <span className="text-[#854D0E] font-mono">{sofaShare}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={sofaShare}
                onChange={(e) => setSofaShare(Number(e.target.value))}
                className="w-full accent-[#CA8A04] cursor-pointer"
              />
              <span className="text-[10px] text-stone-400">100% means humans must sit on floor</span>
            </div>

            {/* Slipper Stealing Tendency */}
            <div>
              <div className="flex justify-between font-bold text-stone-700 mb-1">
                <span>🥿 Slipper Stealing Tendency</span>
                <span className="text-[#854D0E] font-mono">{slipperStealing}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={slipperStealing}
                onChange={(e) => setSlipperStealing(Number(e.target.value))}
                className="w-full accent-[#CA8A04] cursor-pointer"
              />
              <span className="text-[10px] text-stone-400">Higher value ensures healthy exercise for humans</span>
            </div>

            {/* Bath Tolerance */}
            <div>
              <div className="flex justify-between font-bold text-stone-700 mb-1">
                <span>🛁 Bath & Shampoo Tolerance</span>
                <span className="text-red-700 font-mono">{bathTolerance}%</span>
              </div>
              <input
                type="range"
                min="-100"
                max="50"
                value={bathTolerance}
                onChange={(e) => setBathTolerance(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
              <span className="text-[10px] text-stone-400">-100% indicates immediate hiding under bed</span>
            </div>

            {/* Treat Sharing Capacity */}
            <div>
              <div className="flex justify-between font-bold text-stone-700 mb-1">
                <span>🦴 Treat Sharing Willingness</span>
                <span className="text-amber-800 font-mono">{treatSharing}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={treatSharing}
                onChange={(e) => setTreatSharing(Number(e.target.value))}
                className="w-full accent-[#CA8A04] cursor-pointer"
              />
              <span className="text-[10px] text-stone-400">Anything above 0% is considered canine philanthropy</span>
            </div>

            {/* Cat Tolerance */}
            <div>
              <div className="flex justify-between font-bold text-stone-700 mb-1">
                <span>🐱 Suspicious Cat Tolerance</span>
                <span className="text-rose-700 font-mono">{catTolerance}%</span>
              </div>
              <input
                type="range"
                min="-100"
                max="0"
                value={catTolerance}
                onChange={(e) => setCatTolerance(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <span className="text-[10px] text-stone-400">Barking at fences included in calculation</span>
            </div>

            {/* Daily Sleep Requirement */}
            <div>
              <div className="flex justify-between font-bold text-stone-700 mb-1">
                <span>💤 Mandatory Daily Nap Requirement</span>
                <span className="text-blue-700 font-mono">{sleepHours} Hours</span>
              </div>
              <input
                type="range"
                min="10"
                max="22"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <span className="text-[10px] text-stone-400">18 hours is the recommended gold standard</span>
            </div>
          </div>
        </div>

        {/* Real-Time Scientific Result Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#1B0E07] via-[#2A1810] to-[#120803] text-[#FAF6EE] p-6 rounded-3xl border-2 border-[#EAB308] shadow-xl flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-black text-[#EAB308]">
                Certified Verdict
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAB308]/20 text-[#FDE047] text-[10px] font-bold">
                CANINE ACCREDITED
              </span>
            </div>

            {/* Score Ring Display */}
            <div className="text-center py-4 bg-black/40 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#EBDDC1]/70 block font-bold">
                Scientific Compatibility
              </span>
              <div className="font-serif text-5xl font-black text-white tracking-tight">
                {baseScore}%
              </div>
              <span className="text-[11px] text-[#EAB308] font-medium">
                {Number(baseScore) > 90 ? '🌟 Highly Compatible Match' : '⚠️ Mildly Explosive Match'}
              </span>
            </div>

            {/* Absurd Diagnostic Metrics */}
            <div className="space-y-2.5 text-xs text-[#EBDDC1]">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-white/60">Relationship Risk:</span>
                <span className="font-bold text-amber-400">{getRiskAssessment(Number(baseScore))}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-white/60">Treat Dependency:</span>
                <span className="font-bold text-rose-400">Extremely High (98%)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-white/60">Long-Term Sofa Potential:</span>
                <span className="font-bold text-emerald-400">Excellent (Humans Expelled)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-white/60">Vacuum Cleaner Truce:</span>
                <span className="font-bold text-amber-300">0.00% (War Continues)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleRecalculate}
              className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-[#EAB308]" />
              <span>CALCULATE AGAIN 🔄</span>
            </button>

            <button
              onClick={() => {
                audio.playMatchSound();
                onOpenGoldModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#CA8A04] text-[#1B0E07] font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 flex items-center justify-center gap-1.5 transition-all"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>INCREASE COMPATIBILITY (PAID)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
