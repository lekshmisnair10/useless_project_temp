import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  Volume2, 
  MapPin, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Clock, 
  Users,
  MessageSquare 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DogProfile } from '../types';
import { DogAvatar } from './DogAvatar';
import { audio } from '../utils/audio';

interface DogProfileModalProps {
  dog: DogProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSendPawRequest: (dog: DogProfile) => void;
  onQuickChat?: (dog: DogProfile) => void;
  hasSentRequest?: boolean;
}

export const DogProfileModal: React.FC<DogProfileModalProps> = ({
  dog,
  isOpen,
  onClose,
  onSendPawRequest,
  onQuickChat,
  hasSentRequest = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [photoClicks, setPhotoClicks] = useState(0);
  const [stareWarning, setStareWarning] = useState<string | null>(null);
  const [recalcCount, setRecalcCount] = useState(0);
  const [recalcMessage, setRecalcMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && dog) {
      setPhotoClicks(0);
      setStareWarning(null);
      setRecalcCount(0);
      setRecalcMessage(null);
      
      // Auto trigger Malayalam cinema parody dialogue moment
      playDestinyDialogue();
    }
  }, [isOpen, dog?.id]);

  if (!isOpen || !dog) return null;

  const playDestinyDialogue = () => {
    setIsSpeaking(true);
    audio.speakMalayalamParody(
      dog.malayalamParody.dialogue,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  const handlePhotoClick = () => {
    const nextClicks = photoClicks + 1;
    setPhotoClicks(nextClicks);
    audio.playTinyBark();

    if (nextClicks >= 4) {
      setStareWarning(`Please stop staring at ${dog.name}. It makes the tail nervous.`);
    }
  };

  const handleCompatibilityRingClick = () => {
    const nextRecalc = recalcCount + 1;
    setRecalcCount(nextRecalc);
    audio.playNotificationSound();
    const newScore = (dog.compatibilityScore + nextRecalc * 0.01).toFixed(2);
    setRecalcMessage(`Compatibility recalculated: ${dog.compatibilityScore}% → ${newScore}%. Scientific breakthrough.`);
  };

  const handleSendRequest = () => {
    audio.playMatchSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#E11D48', '#EAB308', '#CA8A04']
    });
    onSendPawRequest(dog);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] rounded-3xl shadow-2xl border-2 border-[#EBDDC1] overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#1B0E07]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Top Hero Photo & Basic Identity */}
          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-80 bg-stone-900 border border-[#CA8A04]/40 shadow-inner group">
            <div onClick={handlePhotoClick} className="w-full h-full cursor-pointer">
              <DogAvatar
                src={dog.photo}
                alt={dog.name}
                fallbackGradient={dog.fallbackGradient}
                className="w-full h-full"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B0E07] via-black/20 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#1B0E07]/80 backdrop-blur-md border border-[#EAB308] text-[#EAB308] text-xs font-black tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                100% CANINE VERIFIED
              </span>
            </div>

            {/* Direct Chat Floating Button in Modal Header */}
            {onQuickChat && (
              <div className="absolute top-3 right-14">
                <button
                  onClick={() => {
                    audio.playTinyBark();
                    onClose();
                    onQuickChat(dog);
                  }}
                  className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition-all"
                  title={`Chat with ${dog.name}`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat Now 💬</span>
                </button>
              </div>
            )}

            {/* Bottom Overlay Info */}
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-[#EAB308] tracking-widest">
                  {dog.breed}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                  {dog.name}, {dog.age}
                </h2>
                <p className="text-xs sm:text-sm text-[#EBDDC1] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#EAB308]" />
                  {dog.location}
                </p>
              </div>

              {/* Clickable Compatibility Ring Easter Egg */}
              <div
                onClick={handleCompatibilityRingClick}
                className="w-16 h-16 rounded-2xl bg-[#1B0E07]/90 border-2 border-[#EAB308] flex flex-col items-center justify-center p-1 cursor-pointer hover:scale-105 transition-transform shadow-xl"
                title="Click to recalculate compatibility"
              >
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#EAB308]">Score</span>
                <span className="font-serif text-lg font-black text-white">
                  {recalcCount > 0 ? (dog.compatibilityScore + recalcCount * 0.01).toFixed(1) : dog.compatibilityScore}%
                </span>
              </div>
            </div>
          </div>

          {/* Stare Easter Egg Alert */}
          {stareWarning && (
            <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{stareWarning}</span>
            </div>
          )}

          {/* Recalculate Easter Egg Alert */}
          {recalcMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{recalcMessage}</span>
            </div>
          )}

          {/* Malayalam Cinema Parody Audio Callout Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] border border-[#EAB308]/40 text-[#FAF6EE] shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#EAB308]/20 text-[#EAB308]">
                  <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                </span>
                <span className="text-xs uppercase tracking-widest font-bold text-[#EAB308]">
                  Malayalam Cinema Destiny Voiceover
                </span>
              </div>

              <button
                onClick={playDestinyDialogue}
                className="px-3 py-1 rounded-full bg-[#EAB308] hover:bg-yellow-400 active:scale-95 text-[#1B0E07] font-bold text-xs transition-all"
              >
                Replay Audio 🔊
              </button>
            </div>

            <div className="py-2 px-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <p className="font-serif text-lg sm:text-xl text-[#FDE047] font-semibold tracking-wide">
                "{dog.malayalamParody.dialogue}"
              </p>
              <p className="text-xs text-[#EBDDC1]/80 italic">
                Translation: "{dog.malayalamParody.translation}"
              </p>
            </div>

            <p className="text-[11px] text-[#EBDDC1]/60">
              Scene: {dog.malayalamParody.context}
            </p>
          </div>

          {/* "LOVE AT FIRST BARK" Absurd Compatibility Metrics Breakdown */}
          <div className="bg-[#FAF6EE] border border-[#EBDDC1] p-4 sm:p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#EBDDC1] pb-2">
              <h4 className="font-serif text-base font-bold text-[#1B0E07] flex items-center gap-1.5">
                <span>💘 LOVE AT FIRST BARK METRICS</span>
              </h4>
              <span className="text-xs font-bold text-[#854D0E] bg-[#EBDDC1]/50 px-2 py-0.5 rounded">
                Overall: {dog.compatibilityScore}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-[#EBDDC1]/60">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Fur Compatibility</span>
                <span className="font-serif text-base font-black text-[#1B0E07]">{dog.furCompatibility}%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#EBDDC1]/60">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Food Compatibility</span>
                <span className="font-serif text-base font-black text-[#1B0E07]">{dog.foodCompatibility}%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#EBDDC1]/60">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Sofa Compatibility</span>
                <span className="font-serif text-base font-black text-rose-600">{dog.sofaCompatibility}% (Overload)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#EBDDC1]/60">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Bath Compatibility</span>
                <span className="font-serif text-base font-black text-red-600">{dog.bathCompatibility}% (Resistant)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#EBDDC1]/60">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Treat Sharing</span>
                <span className="font-serif text-base font-black text-amber-700">{dog.treatSharing}% (Strict)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#EBDDC1]/60">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Emotional Availability</span>
                <span className="font-serif text-sm font-black text-stone-700">{dog.emotionalAvailability}</span>
              </div>
            </div>
          </div>

          {/* Personality Bio */}
          <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400">Canine Matrimonial Bio</span>
            <p className="text-sm text-[#2A1810] leading-relaxed">
              "{dog.personality}"
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-[#EBDDC1]/40 text-[#854D0E] font-medium">
                🍗 Fav: {dog.favouriteFood}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#EBDDC1]/40 text-[#854D0E] font-medium">
                🎾 Hobby: {dog.favouriteActivity}
              </span>
            </div>
          </div>

          {/* Red Flags & Green Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Red Flags */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>🚩 RED FLAGS</span>
              </div>
              <ul className="space-y-1.5 text-xs text-rose-950 font-medium">
                {dog.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-500">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Green Flags */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>💚 GREEN FLAGS</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                {dog.greenFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Love Life Timeline */}
          <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#854D0E]">
              <Clock className="w-4 h-4 text-[#CA8A04]" />
              <span>LOVE LIFE CHRONOLOGY</span>
            </div>
            <div className="space-y-2.5 border-l-2 border-[#EBDDC1] pl-3 ml-1.5 text-xs">
              {dog.loveTimeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#CA8A04] border-2 border-white" />
                  <span className="font-bold text-[#854D0E]">{item.year}: </span>
                  <span className="text-stone-700">{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Family Opinion */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
            <Users className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-amber-900 block">
                Elder Council Verdict
              </span>
              <p className="text-amber-950 italic">
                "{dog.familyOpinion.quote}"
              </p>
            </div>
          </div>

        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="p-4 border-t border-[#EBDDC1] bg-[#FAF6EE] flex items-center justify-between gap-3">
          {onQuickChat ? (
            <button
              onClick={() => {
                audio.playTinyBark();
                onClose();
                onQuickChat(dog);
              }}
              className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat Directly 💬</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-3 px-5 rounded-2xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-all"
            >
              Back to Paws
            </button>
          )}

          <button
            onClick={handleSendRequest}
            disabled={hasSentRequest}
            className={`flex-1 py-3 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all ${
              hasSentRequest
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-gradient-to-r from-rose-600 via-[#CA8A04] to-rose-600 hover:brightness-110 active:scale-95 text-white shadow-rose-600/20'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>{hasSentRequest ? 'PAW REQUEST DISPATCHED 💌' : '💘 SEND PAW REQUEST'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
