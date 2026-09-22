import React, { useState } from 'react';
import { 
  Bell, 
  Volume2, 
  VolumeX, 
  Crown, 
  Sparkles, 
  Heart, 
  Compass, 
  Calculator, 
  Calendar, 
  Coins, 
  MessageSquare, 
  Users, 
  Trophy, 
  Bot 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';
import { UserDogProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenModal: (modal: string) => void;
  userProfile: UserDogProfile;
  unreadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenModal,
  userProfile,
  unreadCount,
}) => {
  const [isMuted, setIsMuted] = useState(audio.getIsMuted());
  const [logoClicks, setLogoClicks] = useState(0);
  const [secretMode, setSecretMode] = useState(false);

  const handleLogoClick = () => {
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);
    audio.playTinyBark();

    if (nextCount === 5) {
      setSecretMode(true);
      audio.playMatchSound();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.1 },
        colors: ['#EAB308', '#CA8A04', '#FDE047', '#1B0E07']
      });
      alert('🐾 SECRET PAW MODE UNLOCKED: You have accessed the High Council of Royal Canines. Extra gravy privileges granted!');
    }
  };

  const handleToggleMute = () => {
    const muted = audio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      audio.playRomanticChime();
    }
  };

  const navLinks = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'matches', label: 'My Matches', icon: Heart },
    { id: 'compatibility', label: 'Compatibility', icon: Calculator },
    { id: 'pawdate', label: 'Paw-Date', icon: Calendar },
    { id: 'wedding', label: 'Wedding', icon: Sparkles },
    { id: 'treats', label: 'Treat Economics', icon: Coins },
    { id: 'pawstrology', label: 'Pawstrology', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#EBDDC1] shadow-sm transition-colors duration-300">
      {secretMode && (
        <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 text-[#1B0E07] text-center text-xs py-1 font-bold tracking-widest uppercase flex items-center justify-center gap-2">
          <span>👑 SECRET PAW MODE ACTIVE: ALL TREATS SUBSIDIZED 👑</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleLogoClick}>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-tr from-[#1B0E07] to-[#2A1810] border border-[#EAB308]/50 flex items-center justify-center shadow-md group">
              <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">🐾</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg md:text-xl font-black tracking-tight text-[#1B0E07]">
                  PUPPYSHAADI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-[#EAB308]/20 text-[#854D0E] border border-[#EAB308]/40">
                  MATRIMONY
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-[#2A1810]/70 font-medium">
                Find the one who makes your tail wag
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    audio.playNotificationSound();
                    onSelectTab(link.id);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-[#2A1810] text-[#FAF6EE] shadow-sm'
                      : 'text-[#2A1810]/80 hover:bg-[#EBDDC1]/50 hover:text-[#1B0E07]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#EAB308]' : ''}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* PawGPT AI Button */}
            <button
              onClick={() => {
                audio.playRomanticChime();
                onOpenModal('pawgpt');
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2A1810] to-[#1B0E07] text-[#FAF6EE] text-xs font-bold border border-[#EAB308]/40 shadow-sm hover:border-[#EAB308] active:scale-95 transition-all"
              title="Ask PawGPT (Dog AI)"
            >
              <Bot className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>PawGPT</span>
            </button>

            {/* Family Button */}
            <button
              onClick={() => {
                audio.playDoubleBark();
                onOpenModal('family');
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6EE] text-[#1B0E07] text-xs font-semibold border border-[#EBDDC1] hover:bg-[#EBDDC1]/40 active:scale-95 transition-all"
              title="My Family Approval"
            >
              <Users className="w-3.5 h-3.5 text-[#CA8A04]" />
              <span>My Family</span>
            </button>

            {/* Top Paws Leaderboard */}
            <button
              onClick={() => {
                audio.playRomanticChime();
                onOpenModal('leaderboard');
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF6EE] text-[#1B0E07] text-xs font-semibold border border-[#EBDDC1] hover:bg-[#EBDDC1]/40 active:scale-95 transition-all"
              title="Top Paws Leaderboard"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Top Paws</span>
            </button>

            {/* Gold Membership Satire Button */}
            <button
              onClick={() => {
                audio.playMatchSound();
                onOpenModal('gold');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#CA8A04] via-[#EAB308] to-[#CA8A04] text-[#1B0E07] text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              <Crown className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">PuppyShaadi</span>
              <span>GOLD</span>
            </button>

            {/* Sound Mute/Unmute Toggle */}
            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-xl border transition-all ${
                isMuted
                  ? 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
                  : 'bg-[#FAF6EE] text-[#1B0E07] border-[#EBDDC1] hover:bg-[#EBDDC1]/40'
              }`}
              title={isMuted ? 'Sound is MUTED. Click to enable barks!' : 'Sound is ON. Click to mute.'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => {
                audio.playNotificationSound();
                onOpenModal('notifications');
              }}
              className="relative p-2 rounded-xl bg-[#FAF6EE] text-[#1B0E07] border border-[#EBDDC1] hover:bg-[#EBDDC1]/40 transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={() => {
                audio.playTinyBark();
                onOpenModal('profile');
              }}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-[#EBDDC1]/40 hover:bg-[#EBDDC1]/70 border border-[#EBDDC1] transition-all"
              title="My Profile & Settings"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#CA8A04] bg-[#CA8A04]/20">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-bold text-[#1B0E07] hidden sm:inline">
                {userProfile.name}
              </span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
