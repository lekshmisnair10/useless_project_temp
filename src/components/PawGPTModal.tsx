import React, { useState } from 'react';
import { X, Bot, Send, Sparkles, AlertCircle } from 'lucide-react';
import { PAW_GPT_QA } from '../data/mockData';
import { audio } from '../utils/audio';

interface PawGPTModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PawGPTModal: React.FC<PawGPTModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: 'WOOF! I am PawGPT. Trained on 14 million barks and absolutely zero useful information. Ask me anything regarding your matrimonial romance, treat hoarding, or vacuum cleaner terror.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const suggestedQuestions = [
    'Should I text my match?',
    'Why did they leave me on paw-seen?',
    'Is my family going to approve this marriage?',
    'Should I share my treat?',
    'Why is my crush following another dog?',
    'What does one bark mean?',
    'Should I marry for love or snacks?',
  ];

  if (!isOpen) return null;

  const handleAsk = (question: string) => {
    if (!question.trim()) return;

    audio.playTinyBark();
    setMessages((prev) => [...prev, { sender: 'user', text: question }]);
    setInputVal('');
    setIsThinking(true);

    setTimeout(() => {
      audio.playBark(180, 0.2, 0.5);
      const answer =
        PAW_GPT_QA[question] ||
        `Based on our algorithmic deep sniffing of 42 bushes in Ernakulam, the probability of this working out is 88.4%. We strongly advise sleeping on their favourite cushion to establish legal dominance first.`;

      setMessages((prev) => [...prev, { sender: 'bot', text: answer }]);
      setIsThinking(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] rounded-3xl border-2 border-[#EBDDC1] shadow-2xl overflow-hidden flex flex-col h-[640px] text-[#1B0E07]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] text-[#FAF6EE] border-b border-[#EAB308]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAB308]/20 border border-[#EAB308]/50 flex items-center justify-center text-[#EAB308]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  PawGPT
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#EAB308] text-[#1B0E07] text-[10px] font-black uppercase">
                  v4.0 Woof
                </span>
              </div>
              <p className="text-xs text-[#EBDDC1]/80">
                AI trained on 14 million barks and no useful information
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

        {/* Chat History Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAF6EE]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#1B0E07] text-[#FAF6EE] rounded-br-none border border-[#EAB308]/30 font-medium'
                    : 'bg-white text-[#2A1810] rounded-bl-none border border-[#EBDDC1]'
                }`}
              >
                {msg.sender === 'bot' && (
                  <span className="font-bold text-[#854D0E] text-[10px] uppercase tracking-wider block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#CA8A04]" />
                    PawGPT Canine Intelligence
                  </span>
                )}
                {msg.text}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-3 text-xs border border-[#EBDDC1] text-stone-500 italic flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CA8A04] animate-ping" />
                <span>PawGPT is sniffing ancestral records...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="p-3 bg-white/70 border-t border-[#EBDDC1] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              className="px-3 py-1.5 rounded-full bg-[#FAF6EE] hover:bg-[#EBDDC1] text-stone-800 text-[11px] font-semibold border border-[#EBDDC1] active:scale-95 transition-all shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-[#FAF6EE] border-t border-[#EBDDC1] flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk(inputVal)}
            placeholder="Ask PawGPT advice (e.g., Should I message Bruno?)..."
            className="flex-1 px-4 py-2.5 rounded-2xl bg-white border border-[#EBDDC1] focus:outline-none focus:border-[#CA8A04] text-xs sm:text-sm text-[#1B0E07]"
          />
          <button
            onClick={() => handleAsk(inputVal)}
            disabled={!inputVal.trim() || isThinking}
            className="p-2.5 rounded-2xl bg-[#1B0E07] text-[#EAB308] hover:bg-[#2A1810] disabled:opacity-40 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
