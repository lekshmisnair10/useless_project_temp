import React from 'react';
import { Compass, Heart, MessageSquare, Bot, User } from 'lucide-react';
import { audio } from '../utils/audio';

interface MobileBottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenModal: (modal: string) => void;
  unreadMessagesCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenModal,
  unreadMessagesCount = 2,
}) => {
  const tabs = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'matches', label: 'Matches', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageSquare, isModal: true },
    { id: 'pawgpt', label: 'PawGPT', icon: Bot, isModal: true },
    { id: 'profile', label: 'My Profile', icon: User, isModal: true },
  ];

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF6EE]/95 backdrop-blur-lg border-t border-[#EBDDC1] py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          const handleClick = () => {
            audio.playNotificationSound();
            if (tab.isModal) {
              onOpenModal(tab.id);
            } else {
              onSelectTab(tab.id);
            }
          };

          return (
            <button
              key={tab.id}
              onClick={handleClick}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all relative ${
                isActive ? 'text-[#CA8A04] font-bold' : 'text-[#2A1810]/70 hover:text-[#1B0E07]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
              {tab.id === 'messages' && unreadMessagesCount > 0 && (
                <span className="absolute top-0 right-3 w-3.5 h-3.5 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
