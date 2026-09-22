import React, { useState } from 'react';
import { X, Users, MessageSquare, RefreshCw, Send, ShieldCheck, Heart } from 'lucide-react';
import { MOCK_FAMILY_MEMBERS, INITIAL_FAMILY_MESSAGES } from '../data/mockData';
import { FamilyChatMessage } from '../types';
import { audio } from '../utils/audio';

interface FamilyApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FamilyApprovalModal: React.FC<FamilyApprovalModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<FamilyChatMessage[]>(INITIAL_FAMILY_MESSAGES);
  const [approvalScore, setApprovalScore] = useState(87);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  if (!isOpen) return null;

  const handleAskFamilyAgain = () => {
    audio.playDoubleBark();
    setIsChatOpen(true);
    // slight random variance in approval
    const delta = Math.floor(Math.random() * 9) - 4;
    const newScore = Math.min(99, Math.max(55, approvalScore + delta));
    setApprovalScore(newScore);

    const funnyReplies = [
      { sender: 'Ammu', relation: 'Grandmother', avatar: '👵🐾', text: 'I just spoke to his human’s mother at the veterinary pharmacy. The boy was given a 5-star rating by Dr. Kurien!' },
      { sender: 'Cousin Rocky', relation: 'Cousin', avatar: '🐕⚡', text: 'Dr. Kurien is biased because Bruno licked his hand! He still stole a slipper in 2024!' },
      { sender: 'Chechi', relation: 'Elder Sister', avatar: '🐶🎀', text: 'As long as we secure the right-side sofa cushion in writing, I vote APPROVE.' },
      { sender: 'Appachan', relation: 'Grandfather', avatar: '👴🐾', text: 'His bark resonance is deep. Suitable for morning compound deterrence. Proceed with engagement.' },
    ];

    const pick = funnyReplies[Math.floor(Math.random() * funnyReplies.length)];
    setTimeout(() => {
      audio.playNotificationSound();
      setMessages((prev) => [
        ...prev,
        {
          id: `fmsg-${Date.now()}`,
          sender: pick.sender,
          relation: pick.relation,
          avatar: pick.avatar,
          text: pick.text,
          timestamp: 'Just now'
        }
      ]);
    }, 600);
  };

  const handleSendCustomMsg = () => {
    if (!customMsg.trim()) return;
    audio.playTinyBark();
    setMessages((prev) => [
      ...prev,
      {
        id: `fmsg-${Date.now()}`,
        sender: 'You',
        relation: 'Prospective Groom/Bride',
        avatar: '🐕💍',
        text: customMsg,
        timestamp: 'Just now'
      }
    ]);
    setCustomMsg('');

    // Family immediate retort
    setTimeout(() => {
      audio.playBark(190, 0.2, 0.5);
      setMessages((prev) => [
        ...prev,
        {
          id: `fmsg-${Date.now() + 1}`,
          sender: 'Ammu',
          relation: 'Grandmother',
          avatar: '👵🐾',
          text: 'Child, you are too innocent! Let the elders handle the biscuit negotiations.',
          timestamp: 'Just now'
        }
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF6EE] rounded-3xl border-2 border-[#EBDDC1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#1B0E07]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#2A1810] via-[#1B0E07] to-[#2A1810] text-[#FAF6EE] border-b border-[#EAB308]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAB308]/20 border border-[#EAB308]/50 flex items-center justify-center text-[#EAB308]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                My Family Approval Council
              </h3>
              <p className="text-xs text-[#EBDDC1]/80">
                Traditional canine joint family consensus mechanism
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

        {/* Scroll Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Family Approval Gauge */}
          <div className="p-4 rounded-2xl bg-white border border-[#EBDDC1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                Official Canine Council Status
              </span>
              <div className="font-serif text-3xl font-bold text-[#1B0E07] flex items-center gap-2 mt-0.5">
                <span>FAMILY APPROVAL: {approvalScore}%</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  High Consensus
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                4 of 4 family members surveyed. Cousin Rocky remains bitter.
              </p>
            </div>

            <button
              onClick={handleAskFamilyAgain}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#CA8A04] to-[#EAB308] text-[#1B0E07] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:brightness-105 active:scale-95 transition-all shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ASK FAMILY AGAIN 💬</span>
            </button>
          </div>

          {/* Family Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {MOCK_FAMILY_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="p-3.5 rounded-2xl bg-white border border-[#EBDDC1] space-y-2 shadow-xs hover:border-[#CA8A04]/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{member.avatar}</span>
                    <div>
                      <h4 className="font-bold text-xs text-[#1B0E07]">{member.name}</h4>
                      <span className="text-[10px] text-stone-500">{member.relation}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      member.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : member.status === 'Skeptical'
                        ? 'bg-amber-100 text-amber-800'
                        : member.status === 'Bribery Required'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>

                <p className="text-xs text-stone-700 italic bg-[#FAF6EE] p-2 rounded-xl">
                  "{member.dialogue}"
                </p>
              </div>
            ))}
          </div>

          {/* Live Family WhatsApp Group Chat Section */}
          <div className="bg-white rounded-2xl border border-[#EBDDC1] overflow-hidden shadow-sm">
            <div className="p-3 bg-[#2A1810] text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <MessageSquare className="w-4 h-4 text-[#EAB308]" />
                <span>Family Shaadi Negotiation Chat (Online)</span>
              </div>
              <span className="text-[10px] text-emerald-400">● 4 family barks active</span>
            </div>

            <div className="p-3.5 space-y-3 max-h-56 overflow-y-auto bg-[#FAF6EE] text-xs">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-stone-700 text-[11px]">
                    <span>{msg.avatar}</span>
                    <span>{msg.sender}</span>
                    <span className="text-stone-400 font-normal text-[10px]">({msg.relation})</span>
                    <span className="text-stone-400 font-normal text-[9px] ml-auto">{msg.timestamp}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl rounded-tl-none border border-[#EBDDC1] text-stone-800 leading-relaxed shadow-xs">
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick reply bar */}
            <div className="p-2.5 bg-white border-t border-[#EBDDC1] flex items-center gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendCustomMsg()}
                placeholder="Argue with your family (e.g. He promised 3 chicken bones!)..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-[#FAF6EE] border border-[#EBDDC1] text-xs focus:outline-none focus:border-[#CA8A04]"
              />
              <button
                onClick={handleSendCustomMsg}
                className="p-2 rounded-xl bg-[#1B0E07] text-[#EAB308] hover:bg-[#2A1810] transition-all"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
