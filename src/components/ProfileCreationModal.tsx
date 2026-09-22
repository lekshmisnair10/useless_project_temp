import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Heart, Shield, Cake, Users, Bone, Smile } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserDogProfile } from '../types';
import { audio } from '../utils/audio';

interface ProfileCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserDogProfile;
  onSaveProfile: (profile: UserDogProfile) => void;
  isInitialOnboarding?: boolean;
}

export const ProfileCreationModal: React.FC<ProfileCreationModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  isInitialOnboarding = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserDogProfile>(currentProfile);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const totalSteps = 4;

  const religions = [
    'The Order of The Holy Biscuit 🍪',
    'Orthodox Church of the Tennis Ball 🎾',
    'Sunbeam Worshipper (Secular Napper) 🛋️',
    'Devout Carnivore & Bone Cult 🥩',
    'Canine Secularism (Sniffs All) 🐾',
  ];

  const familyTypes = [
    'Traditional Joint Family with Grandparents (Ammu & Appachan)',
    'Modern Nuclear Kennel (Single Balcony)',
    'Spoiled Single Dog with 2 Full-Time Human Servants',
    'Street Royalty Compound Dynasty',
  ];

  const kidsBeforeOptions = [
    'None (Committed bachelor life)',
    'Tennis ball was my only child 🎾',
    'Divorced with 4 puppies (Full weekend custody)',
    'None that can be legally proven 🐾',
  ];

  const vacuumReactions = [
    'Mortal Combat (Bites the nozzle aggressively)',
    'Immediate Evacuation Under Master Bed',
    'Barks in 7 Dramatic Octaves',
    'Zen Indifference (Deaf senior dog privilege)',
  ];

  const slipperIndices = [
    'Only Left Bata Slippers',
    'Exclusive High-Heel Connoisseur',
    'Expensive Italian Leather Only',
    'Zero Slipper Chewing (Blatant Lie)',
  ];

  const humanWealthOptions = [
    'Swiggy Instamart Unlimited & 24/7 AC at 18°C',
    '4 Cents Garden with Coconut Trees for business',
    'Vegetarian Humans (Hard Life, Demands Meat Dowry)',
    'Sedan with Dedicated Backseat Dog Mattress',
  ];

  const handleNext = () => {
    audio.playTinyBark();
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete & Save
      audio.playMatchSound();
      confetti({
        particleCount: 140,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#EAB308', '#CA8A04', '#FDE047', '#E11D48']
      });
      setIsDone(true);
      onSaveProfile(formData);
    }
  };

  const handleBack = () => {
    audio.playTinyBark();
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] rounded-3xl border-2 border-[#EBDDC1] shadow-2xl overflow-hidden flex flex-col max-h-[94vh] text-[#1B0E07]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] text-[#FAF6EE] border-b border-[#EAB308]/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-black text-[#EAB308] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {isInitialOnboarding ? 'Mandatory Canine Registration' : 'Canine Registry Portal'}
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
              Official Canine Matrimonial Biodata
            </h3>
          </div>

          {!isInitialOnboarding && (
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {!isDone && (
          <div className="w-full bg-[#EBDDC1] h-2">
            <div
              className="bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#FDE047] h-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        )}

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {!isDone ? (
            <div className="space-y-5">
              
              {/* Step indicator pill */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#854D0E] bg-[#EBDDC1]/50 px-3 py-1 rounded-full">
                  Step {currentStep} of {totalSteps}: {
                    currentStep === 1 ? 'Personal Identity & Coat' :
                    currentStep === 2 ? 'Astrology, Birth & Faith' :
                    currentStep === 3 ? 'Family, Kids & Food' :
                    'Funny Traits & Slipper Index'
                  }
                </span>
                <span className="text-[11px] text-stone-400">All fields canine-certified</span>
              </div>

              {/* STEP 1: Name, Breed, Age, Color */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      🐕 Candidate Canine Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs font-medium"
                      placeholder="e.g. Sultan, Tommy, Bruno, Snowy"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        🐾 Breed / Pedigree
                      </label>
                      <input
                        type="text"
                        value={formData.breed}
                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs"
                        placeholder="e.g. Golden Retriever, Native Indie Pride, Pug"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        🎨 Coat / Fur Color
                      </label>
                      <input
                        type="text"
                        value={formData.color || ''}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs"
                        placeholder="e.g. Caramel Golden, Midnight Black, Spotted"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      📍 Territory / Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs"
                      placeholder="e.g. Marine Drive, Kochi, Kerala"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Age, Date of Birth, Religion */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                        <Cake className="w-3.5 h-3.5 text-[#CA8A04]" />
                        <span>Age in Human Years</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="22"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                        <Cake className="w-3.5 h-3.5 text-[#CA8A04]" />
                        <span>Date of Birth</span>
                      </label>
                      <input
                        type="date"
                        value={formData.dateOfBirth || '2023-04-12'}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
                      <span>Canine Matrimonial Faith / Religion</span>
                    </label>
                    <select
                      value={formData.religion || religions[0]}
                      onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs font-medium"
                    >
                      {religions.map((r, i) => (
                        <option key={i} value={r}>{r}</option>
                      ))}
                    </select>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Certified by the Kerala High Council of Holy Biscuits.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 3: Family Type, Kids Before, Food, Hobbies */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#CA8A04]" />
                      <span>Family Type / Joint Living Status</span>
                    </label>
                    <select
                      value={formData.familyType || familyTypes[0]}
                      onChange={(e) => setFormData({ ...formData, familyType: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs font-medium"
                    >
                      {familyTypes.map((f, i) => (
                        <option key={i} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                      <Smile className="w-3.5 h-3.5 text-[#CA8A04]" />
                      <span>Kids Before? / Past Puppies</span>
                    </label>
                    <select
                      value={formData.kidsBefore || kidsBeforeOptions[0]}
                      onChange={(e) => setFormData({ ...formData, kidsBefore: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs font-medium"
                    >
                      {kidsBeforeOptions.map((k, i) => (
                        <option key={i} value={k}>{k}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1 flex items-center gap-1.5">
                        <Bone className="w-3.5 h-3.5 text-[#CA8A04]" />
                        <span>Favourite Food / Delicacy</span>
                      </label>
                      <input
                        type="text"
                        value={formData.favouriteFood}
                        onChange={(e) => setFormData({ ...formData, favouriteFood: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs"
                        placeholder="e.g. Boiled chicken liver & curd rice"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                        🎾 Hobbies & Passions
                      </label>
                      <input
                        type="text"
                        value={formData.favouriteActivity}
                        onChange={(e) => setFormData({ ...formData, favouriteActivity: e.target.value })}
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs"
                        placeholder="e.g. Barking at autos, slipper tasting"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Funny Things (Slipper Index, Vacuum Reaction, Human Wealth Status, Sofa Share) */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      🥿 Slipper Chewing Specialization
                    </label>
                    <select
                      value={formData.slipperChewingIndex || slipperIndices[0]}
                      onChange={(e) => setFormData({ ...formData, slipperChewingIndex: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs font-medium"
                    >
                      {slipperIndices.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      ⚡ Reaction to Vacuum Cleaner
                    </label>
                    <select
                      value={formData.vacuumReaction || vacuumReactions[0]}
                      onChange={(e) => setFormData({ ...formData, vacuumReaction: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs font-medium"
                    >
                      {vacuumReactions.map((v, i) => (
                        <option key={i} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                      💰 Human Caretaker Economic Status
                    </label>
                    <select
                      value={formData.humanWealthStatus || humanWealthOptions[0]}
                      onChange={(e) => setFormData({ ...formData, humanWealthStatus: e.target.value })}
                      className="w-full p-3.5 rounded-2xl bg-white border border-[#EBDDC1] text-sm focus:outline-none focus:border-[#CA8A04] shadow-xs font-medium"
                    >
                      {humanWealthOptions.map((h, i) => (
                        <option key={i} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sofa Allocation Slider */}
                  <div className="p-3.5 rounded-2xl bg-white border border-[#EBDDC1] space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span>🛋️ Required Sofa Allocation</span>
                      <span className="text-[#CA8A04] font-mono">{formData.sofaAllocation || 70}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={formData.sofaAllocation || 70}
                      onChange={(e) => setFormData({ ...formData, sofaAllocation: Number(e.target.value) })}
                      className="w-full accent-[#CA8A04] cursor-pointer"
                    />
                    <span className="text-[10px] text-stone-400">100% means humans must sleep on a yoga mat</span>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Biodata Complete Reveal */
            <div className="py-6 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#CA8A04] to-[#FDE047] flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
                💍
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#1B0E07]">
                Official Biodata Certified!
              </h3>
              <p className="text-sm font-serif italic text-stone-700 max-w-md mx-auto">
                "Congratulations. {formData.name} is now officially registered for unnecessarily complicated romance."
              </p>

              {/* Biodata Summary Card */}
              <div className="p-4 rounded-2xl bg-white border-2 border-[#CA8A04]/40 text-left text-xs space-y-2 shadow-sm">
                <div className="flex justify-between items-center border-b border-[#EBDDC1] pb-2">
                  <span className="font-bold text-sm text-[#1B0E07]">{formData.name} ({formData.breed})</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    100% PAW REGISTERED
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <p><strong>Age:</strong> {formData.age} Yrs ({formData.dateOfBirth})</p>
                  <p><strong>Color:</strong> {formData.color || 'Caramel Golden'}</p>
                  <p><strong>Faith:</strong> {formData.religion}</p>
                  <p><strong>Family:</strong> {formData.familyType}</p>
                  <p><strong>Kids:</strong> {formData.kidsBefore}</p>
                  <p><strong>Favorite Food:</strong> {formData.favouriteFood}</p>
                  <p><strong>Vacuum:</strong> {formData.vacuumReaction}</p>
                  <p><strong>Slippers:</strong> {formData.slipperChewingIndex}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-[#EBDDC1] bg-[#FAF6EE] flex items-center justify-between gap-3">
          {!isDone ? (
            <>
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="py-2.5 px-4 rounded-xl bg-stone-200 hover:bg-stone-300 disabled:opacity-40 text-stone-800 text-xs font-bold transition-all flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#CA8A04] text-[#1B0E07] font-black text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <span>{currentStep === totalSteps ? 'GENERATE OFFICIAL BIODATA 💍' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-[#1B0E07] text-[#FAF6EE] font-black text-xs uppercase tracking-widest hover:bg-[#2A1810] shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>ENTER MATRIMONIAL MARKET & VIEW MATCHES 🐾</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
