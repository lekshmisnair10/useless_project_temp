import React, { useState, useEffect } from 'react';
import { MOCK_DOGS } from './data/mockDogs';
import { DEFAULT_USER_PROFILE, INITIAL_NOTIFICATIONS } from './data/mockData';
import { DogProfile, UserDogProfile, NotificationItem } from './types';
import { audio } from './utils/audio';

// Components
import { StartupLoadingScreen } from './components/StartupLoadingScreen';
import { AudioUnlockBanner } from './components/AudioUnlockBanner';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HeroSection } from './components/HeroSection';
import { DogProfileCard } from './components/DogProfileCard';
import { DogProfileModal } from './components/DogProfileModal';
import { DiscoverSwipe } from './components/DiscoverSwipe';
import { MatchesSection } from './components/MatchesSection';
import { CompatibilityCalculator } from './components/CompatibilityCalculator';
import { PawstrologySection } from './components/PawstrologySection';
import { PawDatePlanner } from './components/PawDatePlanner';
import { UltimateDestinyModal } from './components/UltimateDestinyModal';
import { PawGPTModal } from './components/PawGPTModal';
import { FamilyApprovalModal } from './components/FamilyApprovalModal';
import { WeddingPlannerModal } from './components/WeddingPlannerModal';
import { TreatEconomicsModal } from './components/TreatEconomicsModal';
import { DowryNegotiationModal } from './components/DowryNegotiationModal';
import { MessagesModal } from './components/MessagesModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { ProfileCreationModal } from './components/ProfileCreationModal';
import { PuppyShaadiGoldModal } from './components/PuppyShaadiGoldModal';
import { CatGhostSupportModal } from './components/CatGhostSupportModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';

export const App: React.FC = () => {
  // Opening startup loading sequence
  const [hasCompletedLoading, setHasCompletedLoading] = useState(false);

  // Active navigation tab
  const [currentTab, setCurrentTab] = useState('home');

  // Modals state
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedDog, setSelectedDog] = useState<DogProfile | null>(null);
  const [selectedChatDog, setSelectedChatDog] = useState<DogProfile | null>(null);
  const [hasSentRequestMap, setHasSentRequestMap] = useState<{ [id: string]: boolean }>({});

  // User Dog Profile with LocalStorage
  const [userProfile, setUserProfile] = useState<UserDogProfile>(() => {
    const saved = localStorage.getItem('puppyshaadi_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return DEFAULT_USER_PROFILE;
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('puppyshaadi_notifs');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Idle sleeping dog detection
  const [isIdleAsleep, setIsIdleAsleep] = useState(false);

  // Trigger real barking audio on initial page mount or reload!
  useEffect(() => {
    audio.playOpeningBarkFile(0.85).catch(() => {});
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const resetIdle = () => {
      clearTimeout(timeout);
      if (isIdleAsleep) setIsIdleAsleep(false);
      timeout = setTimeout(() => {
        setIsIdleAsleep(true);
      }, 75000); // 75 seconds of idle
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('click', resetIdle);
    resetIdle();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('click', resetIdle);
    };
  }, [isIdleAsleep]);

  // Has user completed initial biodata registration?
  const [hasRegisteredBiodata, setHasRegisteredBiodata] = useState(() => {
    return localStorage.getItem('puppyshaadi_registered') === 'true';
  });

  const handleStartupComplete = () => {
    setHasCompletedLoading(true);
    if (!hasRegisteredBiodata) {
      setActiveModal('profile');
    }
  };

  // Handle saving user profile
  const handleSaveProfile = (newProfile: UserDogProfile) => {
    setUserProfile(newProfile);
    setHasRegisteredBiodata(true);
    localStorage.setItem('puppyshaadi_profile', JSON.stringify(newProfile));
    localStorage.setItem('puppyshaadi_registered', 'true');
  };

  // Handle sending paw request
  const handleSendPawRequest = (dog: DogProfile) => {
    setHasSentRequestMap((prev) => ({ ...prev, [dog.id]: true }));
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Paw Request Dispatched! 💌`,
      description: `Your formal matrimonial request was delivered to ${dog.name}. Family council notified.`,
      timeAgo: 'Just now',
      read: false,
      iconType: 'heart',
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    localStorage.setItem('puppyshaadi_notifs', JSON.stringify(updated));
  };

  const handleHearDestiny = (dog: DogProfile) => {
    setSelectedDog(dog);
    setActiveModal('dog-profile');
  };

  const handleQuickChat = (dog: DogProfile) => {
    setSelectedChatDog(dog);
    setActiveModal('messages');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1B0E07] flex flex-col selection:bg-[#EAB308]/20 pb-20 xl:pb-0 relative overflow-x-hidden">
      
      {/* Decorative ambient background elements */}
      <div className="fixed top-12 left-6 text-2xl opacity-10 pointer-events-none animate-float select-none">🐾</div>
      <div className="fixed top-1/3 right-8 text-3xl opacity-10 pointer-events-none animate-float select-none" style={{ animationDelay: '1.5s' }}>🦴</div>
      <div className="fixed bottom-24 left-10 text-2xl opacity-10 pointer-events-none animate-float select-none" style={{ animationDelay: '3s' }}>🐕</div>
      <div className="fixed top-2/3 right-12 text-2xl opacity-10 pointer-events-none animate-float select-none" style={{ animationDelay: '2s' }}>🐾</div>

      {/* 1. Serious Startup Loading Screen */}
      {!hasCompletedLoading && (
        <StartupLoadingScreen onComplete={handleStartupComplete} />
      )}

      {/* 2. Audio Enablement Top Banner */}
      <AudioUnlockBanner onActivated={() => audio.playOpeningBarkFile(0.9)} />

      {/* 3. Luxury Matrimonial Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenModal={(m) => setActiveModal(m)}
        userProfile={userProfile}
        unreadCount={unreadCount}
      />

      {/* 4. Main Body Content Based on Tab */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div className="animate-fadeIn">
            {/* Hero Section */}
            <HeroSection
              onFindSoulmate={() => {
                setCurrentTab('discover');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTreatEconomics={() => setActiveModal('treats')}
              onCatGhostSupport={() => setActiveModal('cat-ghost')}
              onCalculateDestiny={() => setActiveModal('destiny')}
              onEditBiodata={() => setActiveModal('profile')}
            />

            {/* Featured Profiles Showcase */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CA8A04] animate-ping" />
                    <span className="text-xs uppercase tracking-widest font-black text-[#854D0E]">
                      Current Eligible Aristocracy
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B0E07]">
                    Hand-Selected Matches For You
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-lg">
                    Every candidate has been pre-screened for sofa encroachment tendencies and slipper theft records.
                  </p>
                </div>

                <button
                  onClick={() => {
                    audio.playNotificationSound();
                    setCurrentTab('matches');
                  }}
                  className="self-start sm:self-auto px-5 py-2.5 rounded-2xl bg-[#1B0E07] text-[#FAF6EE] text-xs font-bold hover:bg-[#2A1810] shadow-md transition-all active:scale-95"
                >
                  View All 12 Profiles →
                </button>
              </div>

              {/* Profiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {MOCK_DOGS.slice(0, 6).map((dog) => (
                  <DogProfileCard
                    key={dog.id}
                    dog={dog}
                    onClick={() => {
                      setSelectedDog(dog);
                      setActiveModal('dog-profile');
                    }}
                    onHearDestiny={handleHearDestiny}
                    onQuickChat={handleQuickChat}
                  />
                ))}
              </div>
            </section>

            {/* In-Home Interactive Teasers: Compatibility + Pawstrology */}
            <section className="bg-[#F5EEDD]/50 border-y border-[#EBDDC1] py-14">
              <CompatibilityCalculator onOpenGoldModal={() => setActiveModal('gold')} />
            </section>

            <section className="py-14">
              <PawstrologySection />
            </section>
          </div>
        )}

        {currentTab === 'discover' && (
          <div className="animate-fadeIn">
            <DiscoverSwipe
              dogs={MOCK_DOGS}
              onApprove={(dog) => {
                handleSendPawRequest(dog);
              }}
              onHearDestiny={handleHearDestiny}
              onSaveLater={(dog) => {
                const newNotif: NotificationItem = {
                  id: `notif-${Date.now()}`,
                  title: `Saved ${dog.name} For Later ⭐`,
                  description: `Added to your secret bone reserve list.`,
                  timeAgo: 'Just now',
                  read: false,
                  iconType: 'paw',
                };
                setNotifications([newNotif, ...notifications]);
              }}
              onOpenProfile={(dog) => {
                setSelectedDog(dog);
                setActiveModal('dog-profile');
              }}
              onQuickChat={handleQuickChat}
            />
          </div>
        )}

        {currentTab === 'matches' && (
          <div className="animate-fadeIn">
            <MatchesSection
              dogs={MOCK_DOGS}
              onOpenProfile={(dog) => {
                setSelectedDog(dog);
                setActiveModal('dog-profile');
              }}
              onHearDestiny={handleHearDestiny}
              onOpenDatePlanner={(dog) => {
                setSelectedDog(dog);
                setCurrentTab('pawdate');
              }}
              onOpenNegotiation={(dog) => {
                setSelectedDog(dog);
                setActiveModal('dowry');
              }}
              onOpenChat={handleQuickChat}
            />
          </div>
        )}

        {currentTab === 'compatibility' && (
          <div className="animate-fadeIn">
            <CompatibilityCalculator onOpenGoldModal={() => setActiveModal('gold')} />
          </div>
        )}

        {currentTab === 'pawdate' && (
          <div className="animate-fadeIn">
            <PawDatePlanner />
          </div>
        )}

        {currentTab === 'wedding' && (
          <div className="py-12 text-center animate-fadeIn">
            <h2 className="font-serif text-3xl font-bold mb-4">Royal Wedding Center</h2>
            <button
              onClick={() => setActiveModal('wedding')}
              className="px-6 py-3 rounded-2xl bg-[#1B0E07] text-[#FAF6EE] font-bold text-sm uppercase tracking-wider hover:bg-[#2A1810] shadow-md active:scale-95 transition-all"
            >
              Open Full ₹48,72,000 Budget Planner 💍
            </button>
          </div>
        )}

        {currentTab === 'treats' && (
          <div className="py-12 text-center animate-fadeIn">
            <h2 className="font-serif text-3xl font-bold mb-4">Treat Economics & Biscuit Wall Street</h2>
            <button
              onClick={() => setActiveModal('treats')}
              className="px-6 py-3 rounded-2xl bg-[#1B0E07] text-[#FAF6EE] font-bold text-sm uppercase tracking-wider hover:bg-[#2A1810] shadow-md active:scale-95 transition-all"
            >
              Launch Live Canine Financial Terminal 📈
            </button>
          </div>
        )}

        {currentTab === 'pawstrology' && (
          <div className="animate-fadeIn">
            <PawstrologySection />
          </div>
        )}
      </main>

      {/* 5. Mobile Responsive Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenModal={(m) => setActiveModal(m)}
      />

      {/* 6. Footer (Matrimonial Startup Satire + Demo Credentials) */}
      <footer className="bg-[#1B0E07] text-[#FAF6EE] pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-t border-[#EAB308]/20">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-bounce">🐾</span>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  PUPPYSHAADI<span className="text-[#EAB308]">.MATRIMONY</span>
                </span>
              </div>
              <p className="text-xs text-[#EBDDC1]/70 mt-1">
                The world's most unnecessarily sophisticated matrimonial platform for dogs.
              </p>
            </div>

            {/* Demo Login Credentials Callout Box */}
            <div className="p-3 rounded-2xl bg-[#2A1810] border border-[#EAB308]/40 text-xs text-[#EBDDC1]">
              <span className="font-bold text-[#EAB308] uppercase text-[10px] block tracking-wider mb-0.5">
                Official Canine Demo Authentication:
              </span>
              <p>Email: <code className="text-white font-mono font-bold">dog@puppyshaadi.dog</code></p>
              <p>Password: <code className="text-white font-mono font-bold">bark123</code></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#EBDDC1]/50 gap-4 text-center sm:text-left">
            <p>© 2026 PuppyShaadi Matrimony Pvt. Ltd. Humans strictly excluded from primary decision-making.</p>
            <div className="flex gap-4">
              <button onClick={() => setActiveModal('cat-ghost')} className="hover:text-amber-400">
                Feline Trauma Policy
              </button>
              <button onClick={() => setActiveModal('gold')} className="hover:text-amber-400">
                Dowry Regulations
              </button>
              <button onClick={() => setActiveModal('dowry')} className="hover:text-amber-400">
                Sofa Arbitration
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ALL MODALS */}
      
      {/* Dog Profile Modal with Malayalam Audio & Love-At-First-Bark Breakdown */}
      <DogProfileModal
        dog={selectedDog}
        isOpen={activeModal === 'dog-profile'}
        onClose={() => setActiveModal(null)}
        onSendPawRequest={handleSendPawRequest}
        onQuickChat={handleQuickChat}
        hasSentRequest={selectedDog ? !!hasSentRequestMap[selectedDog.id] : false}
      />

      {/* Hackathon WOW Moment: Calculate My Ultimate Destiny */}
      <UltimateDestinyModal
        isOpen={activeModal === 'destiny'}
        onClose={() => setActiveModal(null)}
        onAcceptDestiny={() => {
          const bruno = MOCK_DOGS.find((d) => d.id === 'bruno-golden');
          if (bruno) handleSendPawRequest(bruno);
        }}
      />

      {/* PawGPT AI Modal */}
      <PawGPTModal
        isOpen={activeModal === 'pawgpt'}
        onClose={() => setActiveModal(null)}
      />

      {/* Family Approval & Live WhatsApp Group Chat Modal */}
      <FamilyApprovalModal
        isOpen={activeModal === 'family'}
        onClose={() => setActiveModal(null)}
      />

      {/* Absurd ₹48,72,000 Wedding Planner Modal */}
      <WeddingPlannerModal
        isOpen={activeModal === 'wedding'}
        onClose={() => setActiveModal(null)}
      />

      {/* Treat Economics Dashboard Modal */}
      <TreatEconomicsModal
        isOpen={activeModal === 'treats'}
        onClose={() => setActiveModal(null)}
      />

      {/* Dog Dowry Negotiation Modal */}
      <DowryNegotiationModal
        isOpen={activeModal === 'dowry'}
        onClose={() => setActiveModal(null)}
      />

      {/* Messages / Dog Chat Modal (Pre-selects clicked dog!) */}
      <MessagesModal
        isOpen={activeModal === 'messages'}
        onClose={() => setActiveModal(null)}
        activeDog={selectedChatDog}
      />

      {/* Top Paws Leaderboard Modal */}
      <LeaderboardModal
        isOpen={activeModal === 'leaderboard'}
        onClose={() => setActiveModal(null)}
      />

      {/* Profile Creation / Biodata Registration Wizard Modal */}
      <ProfileCreationModal
        isOpen={activeModal === 'profile'}
        onClose={() => setActiveModal(null)}
        currentProfile={userProfile}
        onSaveProfile={handleSaveProfile}
        isInitialOnboarding={!hasRegisteredBiodata}
      />

      {/* PuppyShaadi GOLD Subscription Satire Modal */}
      <PuppyShaadiGoldModal
        isOpen={activeModal === 'gold'}
        onClose={() => setActiveModal(null)}
      />

      {/* Feline Ghosting Emotional Support Modal */}
      <CatGhostSupportModal
        isOpen={activeModal === 'cat-ghost'}
        onClose={() => setActiveModal(null)}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={activeModal === 'notifications'}
        onClose={() => setActiveModal(null)}
        notifications={notifications}
        onClearAll={() => {
          setNotifications([]);
          localStorage.removeItem('puppyshaadi_notifs');
        }}
        onMarkRead={(id) => {
          const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
          setNotifications(updated);
          localStorage.setItem('puppyshaadi_notifs', JSON.stringify(updated));
        }}
      />

      {/* Idle Easter Egg: "Your dog has fallen asleep." */}
      {isIdleAsleep && (
        <div className="fixed bottom-20 right-6 z-50 p-4 rounded-3xl bg-[#1B0E07] text-[#FAF6EE] border-2 border-[#EAB308] shadow-2xl max-w-xs animate-bounce flex items-start gap-3">
          <span className="text-3xl">💤</span>
          <div className="space-y-1">
            <span className="font-bold text-xs text-[#EAB308] block uppercase tracking-wider">
              Idle Alert
            </span>
            <p className="text-xs text-stone-200">
              "Your dog was waiting for you... Actually, your dog has fallen asleep on the sofa."
            </p>
            <button
              onClick={() => {
                audio.playBark(220, 0.2, 0.6);
                setIsIdleAsleep(false);
              }}
              className="mt-1 px-3 py-1 rounded-full bg-[#CA8A04] text-[#1B0E07] font-black text-[10px] uppercase tracking-wider"
            >
              Wake Up With Bacon 🥓
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
export default App;
