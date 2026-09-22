import React, { useState } from 'react';
import { X, Sparkles, MapPin, Camera, Music, Shield, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

interface WeddingPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeddingPlannerModal: React.FC<WeddingPlannerModalProps> = ({ isOpen, onClose }) => {
  const [selectedVenue, setSelectedVenue] = useState('luxury-park');
  const [selectedOutfit, setSelectedOutfit] = useState('velvet-sherwani');

  if (!isOpen) return null;

  const venues = [
    { id: 'muni-park', name: 'Municipal Park', cost: 12000, desc: 'Public grass with free squirrels.' },
    { id: 'luxury-park', name: 'Luxury Dog Park', cost: 85000, desc: 'Imported grass + sprinkler fountains.' },
    { id: 'bakery-back', name: 'Behind the Bakery', cost: 4500, desc: 'Smells like fresh butter buns 24/7.' },
    { id: 'neighbour-garden', name: "Neighbour's Garden", cost: 0, desc: 'Permission currently pending.' },
  ];

  const budgetItems = [
    { item: 'Actual Edible Treats', cost: '₹2,400', pct: '0.05%' },
    { item: 'Floral Leash Decorations', cost: '₹18,000', pct: '0.37%' },
    { item: 'Professional Bark Photographer', cost: '₹75,000', pct: '1.54%' },
    { item: 'Custom Luxury 4-Seater Sofa', cost: '₹42,000', pct: '0.86%' },
    { item: 'Unnecessary Royal Elephant Entry', cost: '₹18,50,000', pct: '37.97%' },
    { item: 'VIP Bata Slipper Tasting Buffet', cost: '₹35,000', pct: '0.72%' },
    { item: 'Special Anti-Cat Security Battalion', cost: '₹1,50,000', pct: '3.08%' },
    { item: 'Playback Singer for Dramatic Sighs', cost: '₹45,000', pct: '0.92%' },
    { item: 'Contingency Biscuit Reserve', cost: '₹26,54,600', pct: '54.49%' },
  ];

  const handleCelebrate = () => {
    audio.playMatchSound();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#CA8A04', '#EAB308', '#E11D48']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FAF6EE] rounded-3xl border-2 border-[#EBDDC1] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#1B0E07]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] text-[#FAF6EE] border-b border-[#EAB308]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAB308]/20 border border-[#EAB308]/50 flex items-center justify-center text-[#EAB308]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Absurd Royal Wedding Planner
              </h3>
              <p className="text-xs text-[#EBDDC1]/80">
                Total Estimated Expenditure: ₹48,72,000
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

        {/* Scroll Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Total Budget Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1B0E07] to-[#2A1810] text-[#FAF6EE] border border-[#EAB308]/50 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-black text-[#EAB308]">
                Approved Canine Dowry & Shaadi Budget
              </span>
              <div className="font-serif text-3xl sm:text-4xl font-black text-white mt-0.5">
                ₹48,72,000
              </div>
              <p className="text-xs text-[#EBDDC1]/80 mt-1">
                99.95% allocated to pomp, circumstance, and security against felines.
              </p>
            </div>

            <button
              onClick={handleCelebrate}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#CA8A04] to-[#EAB308] text-[#1B0E07] font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0"
            >
              Simulate Baraat 🎺
            </button>
          </div>

          {/* Venues Selector */}
          <div>
            <h4 className="font-serif text-sm font-bold text-[#1B0E07] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#CA8A04]" />
              <span>Select Ceremony Venue</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {venues.map((v) => (
                <div
                  key={v.id}
                  onClick={() => {
                    audio.playTinyBark();
                    setSelectedVenue(v.id);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedVenue === v.id
                      ? 'bg-[#1B0E07] text-[#FAF6EE] border-[#EAB308] shadow-md'
                      : 'bg-white border-[#EBDDC1] hover:bg-[#FAF6EE]'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold text-xs sm:text-sm">
                    <span>{v.name}</span>
                    <span className="text-[#CA8A04]">{v.cost > 0 ? `₹${v.cost.toLocaleString()}` : 'Free (Trespassing)'}</span>
                  </div>
                  <p className={`text-xs mt-1 ${selectedVenue === v.id ? 'text-[#EBDDC1]/70' : 'text-stone-500'}`}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Breakdown Table */}
          <div className="bg-white rounded-2xl border border-[#EBDDC1] overflow-hidden shadow-sm">
            <div className="p-3 bg-[#FAF6EE] border-b border-[#EBDDC1] flex justify-between items-center text-xs font-bold text-[#1B0E07]">
              <span>Expense Category</span>
              <span>Amount & Allocation</span>
            </div>
            <div className="divide-y divide-stone-100 text-xs">
              {budgetItems.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between hover:bg-amber-50/50 transition-colors">
                  <span className="font-medium text-stone-800">{item.item}</span>
                  <div className="text-right">
                    <span className="font-bold text-[#854D0E] block">{item.cost}</span>
                    <span className="text-[10px] text-stone-400">{item.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guest List Tracker */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1.5">
            <span className="font-bold uppercase tracking-wider text-amber-900 block">
              Official Shaadi Guest List
            </span>
            <p className="text-stone-700">
              • 82 Verified Canines invited across 6 districts of Kerala.<br />
              • 4 Neighbourhood Cats politely excluded via formal legal notice.<br />
              • 1 Suspicious Squirrel under constant 24/7 drone surveillance.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
