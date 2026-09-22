import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Send, Sparkles, Volume2 } from 'lucide-react';
import { DogProfile } from '../types';
import { audio } from '../utils/audio';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDog?: DogProfile | null;
}

interface DogChatThread {
  dogId: string;
  name: string;
  avatar: string;
  messages: Array<{ sender: string; text: string; isWoof?: boolean; translation?: string }>;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose, activeDog }) => {
  const [selectedDogId, setSelectedDogId] = useState<string>('bruno-golden');
  
  const [threads, setThreads] = useState<Record<string, DogChatThread>>({
    'bruno-golden': {
      dogId: 'bruno-golden',
      name: 'Bruno (Golden Retriever)',
      avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=150&q=80',
      messages: [
        { sender: 'Bruno', text: 'Hi 👋' },
        { sender: 'You', text: 'Hi.' },
        { sender: 'Bruno', text: 'Do you like roasted chicken?' },
        { sender: 'You', text: 'Obviously.' },
        { sender: 'Bruno', text: 'Should we get married?' },
        { sender: 'You', text: "Let's not rush. How many barks per minute?" },
        { sender: 'Bruno', text: 'woof woof', isWoof: true },
      ]
    },
    'kuttu-indie': {
      dogId: 'kuttu-indie',
      name: 'Kuttu (Indie Pride)',
      avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=150&q=80',
      messages: [
        { sender: 'Kuttu', text: 'Vanakkam. My grandfather verified your compound wall height.' },
        { sender: 'You', text: 'It is 6 feet tall with anti-cat spikes.' },
        { sender: 'Kuttu', text: 'Excellent. When can we discuss evening walk jurisdiction?' },
        { sender: 'Kuttu', text: 'woof!', isWoof: true },
      ]
    },
    'snowy-husky': {
      dogId: 'snowy-husky',
      name: 'Snowy (Siberian Husky)',
      avatar: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=150&q=80',
      messages: [
        { sender: 'Snowy', text: 'AWOOOOO! The living room AC was set to 24°C today. Unacceptable.' },
        { sender: 'You', text: 'My humans keep it at 18°C permanently.' },
        { sender: 'Snowy', text: 'MARRY ME IMMEDIATELY.' },
      ]
    },
    'coco-pomeranian': {
      dogId: 'coco-pomeranian',
      name: 'Coco (Pomeranian)',
      avatar: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=150&q=80',
      messages: [
        { sender: 'Coco', text: 'Bonjour. Do your humans use organic lavender paw wipes?' },
        { sender: 'You', text: 'We use warm water and a towel.' },
        { sender: 'Coco', text: 'My lawyer dog will review this compromise.' },
      ]
    },
    'appu-beagle': {
      dogId: 'appu-beagle',
      name: 'Appu (Beagle Detective)',
      avatar: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=150&q=80',
      messages: [
        { sender: 'Appu', text: 'I smelled mutton biryani from your district 45 minutes ago.' },
        { sender: 'You', text: 'That was Sunday lunch!' },
        { sender: 'Appu', text: 'I am already in an auto-rickshaw on my way.' },
      ]
    }
  });

  const [inputMsg, setInputMsg] = useState('');
  const [isBarking, setIsBarking] = useState(false);

  // If opened with specific activeDog, automatically switch to that dog
  useEffect(() => {
    if (activeDog) {
      if (!threads[activeDog.id]) {
        // Create new thread for this dog if not exists
        setThreads(prev => ({
          ...prev,
          [activeDog.id]: {
            dogId: activeDog.id,
            name: `${activeDog.name} (${activeDog.breed})`,
            avatar: activeDog.photo,
            messages: [
              { sender: activeDog.name, text: `Woof! Thanks for connecting on PuppyShaadi! 🐾` },
              { sender: activeDog.name, text: `I noticed our compatibility is ${activeDog.compatibilityScore}%. Are you willing to share your favourite cushion?` },
            ]
          }
        }));
      }
      setSelectedDogId(activeDog.id);
    }
  }, [activeDog, isOpen]);

  if (!isOpen) return null;

  const currentThread = threads[selectedDogId] || threads['bruno-golden'];

  const handleTranslateWoof = (index: number) => {
    audio.playRomanticChime();
    const translations = [
      'Translation: "Emotional uncertainty detected. Seeking immediate bacon reassurance."',
      'Translation: "I promise not to chew your favourite slippers if you let me sleep on the right side."',
      'Translation: "My grandmother approves, but we must discuss kibble brands."',
      'Translation: "Deep spiritual connection masked by extreme hunger."',
      'Translation: "I saw a squirrel 10 seconds ago and am still processing the trauma."',
    ];
    const picked = translations[Math.floor(Math.random() * translations.length)];

    setThreads((prev) => {
      const updatedMessages = [...prev[selectedDogId].messages];
      updatedMessages[index] = { ...updatedMessages[index], translation: picked };
      return {
        ...prev,
        [selectedDogId]: {
          ...prev[selectedDogId],
          messages: updatedMessages
        }
      };
    });
  };

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    audio.playTinyBark();
    const userText = inputMsg;
    setInputMsg('');

    setThreads((prev) => ({
      ...prev,
      [selectedDogId]: {
        ...prev[selectedDogId],
        messages: [...prev[selectedDogId].messages, { sender: 'You', text: userText }]
      }
    }));

    setIsBarking(true);

    // Simulated reply from the dog
    setTimeout(() => {
      audio.playBark(175, 0.22, 0.5);
      setIsBarking(false);

      const dogReplies = [
        'woof woof!',
        'A single tail wag has been registered on the server.',
        'My human just opened the treat drawer, I will reply in 4 minutes.',
        'I approve of this message. Let us schedule a sofa inspection.',
        'woof!',
      ];
      const reply = dogReplies[Math.floor(Math.random() * dogReplies.length)];

      setThreads((prev) => ({
        ...prev,
        [selectedDogId]: {
          ...prev[selectedDogId],
          messages: [
            ...prev[selectedDogId].messages,
            { sender: currentThread.name.split(' ')[0], text: reply, isWoof: reply.includes('woof') }
          ]
        }
      }));
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] rounded-3xl border-2 border-[#EBDDC1] shadow-2xl overflow-hidden flex flex-col h-[640px] text-[#1B0E07]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] text-[#FAF6EE] border-b border-[#EAB308]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAB308]/20 border border-[#EAB308]/50 flex items-center justify-center text-[#EAB308]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  Canine Instant Messenger
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-[#EBDDC1]/80">
                Direct Sniff-to-Sniff Matrimonial Line
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

        {/* Match Conversations Tabs Bar */}
        <div className="p-2.5 bg-white border-b border-[#EBDDC1] flex gap-2 overflow-x-auto scrollbar-none">
          {Object.values(threads).map((t) => (
            <button
              key={t.dogId}
              onClick={() => {
                audio.playTinyBark();
                setSelectedDogId(t.dogId);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                selectedDogId === t.dogId
                  ? 'bg-[#1B0E07] text-[#FAF6EE] shadow-sm border border-[#EAB308]'
                  : 'bg-[#FAF6EE] text-stone-700 hover:bg-[#EBDDC1]'
              }`}
            >
              <img src={t.avatar} alt={t.name} className="w-4 h-4 rounded-full object-cover" />
              <span>{t.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF6EE]">
          {currentThread.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] text-stone-400 font-bold mb-0.5 px-1">{msg.sender}</span>
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm shadow-xs ${
                  msg.sender === 'You'
                    ? 'bg-[#1B0E07] text-[#FAF6EE] rounded-br-none border border-[#EAB308]/30 font-medium'
                    : 'bg-white text-[#2A1810] rounded-bl-none border border-[#EBDDC1]'
                }`}
              >
                <p>{msg.text}</p>

                {msg.isWoof && !msg.translation && (
                  <button
                    onClick={() => handleTranslateWoof(idx)}
                    className="mt-2 text-[10px] uppercase tracking-wider font-bold text-[#854D0E] bg-[#EBDDC1]/50 hover:bg-[#EBDDC1] px-2.5 py-1 rounded-lg flex items-center gap-1 border border-[#CA8A04]/30 transition-all"
                  >
                    <Sparkles className="w-3 h-3 text-[#CA8A04]" />
                    <span>Translate Woof 🐾</span>
                  </button>
                )}

                {msg.translation && (
                  <div className="mt-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] italic">
                    {msg.translation}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isBarking && (
            <div className="flex items-center gap-2 text-stone-500 text-xs italic p-2 bg-white/60 rounded-xl w-fit border border-[#EBDDC1] animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#CA8A04] animate-bounce" />
              <span>{currentThread.name.split(' ')[0]} is barking a response...</span>
            </div>
          )}
        </div>

        {/* Quick Shortcuts */}
        <div className="p-2 bg-white/70 border-t border-[#EBDDC1] flex gap-2 overflow-x-auto text-[11px] scrollbar-none">
          {['Woof! 🐾', 'Do you share sofas? 🛋️', 'Where do you hide bones? 🦴', 'Grandmother Ammu sends blessings.'].map((shortcut, i) => (
            <button
              key={i}
              onClick={() => setInputMsg(shortcut)}
              className="px-2.5 py-1 rounded-full bg-[#FAF6EE] hover:bg-[#EBDDC1] border border-[#EBDDC1] text-stone-700 shrink-0 font-medium transition-all"
            >
              {shortcut}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-[#FAF6EE] border-t border-[#EBDDC1] flex items-center gap-2">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Bark something respectful to ${currentThread.name.split(' ')[0]}...`}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-white border border-[#EBDDC1] text-xs sm:text-sm focus:outline-none focus:border-[#CA8A04]"
          />
          <button
            onClick={handleSend}
            disabled={!inputMsg.trim() || isBarking}
            className="p-2.5 rounded-2xl bg-[#1B0E07] text-[#EAB308] hover:bg-[#2A1810] disabled:opacity-40 transition-all shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
