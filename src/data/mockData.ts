import { UserDogProfile, FamilyMember, FamilyChatMessage, NotificationItem, PawstrologySign } from '../types';

export const DEFAULT_USER_PROFILE: UserDogProfile = {
  name: 'Sultan',
  breed: 'Kerala Golden Indie Mix',
  age: 3,
  location: 'Kochi, Kerala',
  favouriteFood: 'Chicken Neck & Warm Curd Rice',
  favouriteActivity: 'Chasing shadows and testing sofa softness',
  personality: 'Philosophical, highly affectionate, easily startled by doorbells.',
  greenFlags: 'Brings morning slippers to bed, gives high-fives on command, listens to human venting without judgement.',
  redFlags: 'Will bark at the refrigerator if ice dispenser clinks. Incurable passion for chewing tennis ball fuzz.',
  idealMatch: 'A gentle soul with high snack loyalty and willingness to allow 65% sofa space.',
  sofaAllocation: 70,
  barkFrequency: 45,
  bathTolerance: 20,
  slipperStealing: 85,
  dateOfBirth: '2023-04-12',
  religion: 'The Order of The Holy Biscuit',
  familyType: 'Traditional Joint Family with Grandparents',
  color: 'Caramel Golden Brindle',
  kidsBefore: 'None (Committed bachelor life)',
  vacuumReaction: 'Barks in 7 Octaves then hides under bed',
  slipperChewingIndex: 'Only Left Bata Slippers',
  humanWealthStatus: 'Swiggy Instamart Unlimited & 24/7 AC',
  bio: 'Distinguished gentle-dog looking for a life partner to share sunset compound barks and midnight kitchen crumbs.',
  avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80'
};

export const MOCK_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'fam-ammu',
    name: 'Ammu',
    relation: 'Maternal Grandmother',
    avatar: '👵🐾',
    status: 'Skeptical',
    dialogue: 'Does the groom family have at least 4 cents of lush garden space for morning business?',
    trait: 'Values traditional compound square footage over modern apartment balconies'
  },
  {
    id: 'fam-appachan',
    name: 'Appachan',
    relation: 'Paternal Grandfather',
    avatar: '👴🐾',
    status: 'Approved',
    dialogue: 'Is the pedigree respectable? Back in my day, we barked once and the whole village stood at attention.',
    trait: 'Checks ancestral bark lineage and vaccination records'
  },
  {
    id: 'fam-chechi',
    name: 'Chechi',
    relation: 'Elder Sister',
    avatar: '🐶🎀',
    status: 'Bribery Required',
    dialogue: 'Does he share treats? If he hoards chicken livers like my ex, this shaadi is cancelled.',
    trait: 'Vigilant defender of equitable snack distribution'
  },
  {
    id: 'fam-rocky',
    name: 'Cousin Rocky',
    relation: 'Troublesome Cousin',
    avatar: '🐕⚡',
    status: 'Rejected',
    dialogue: 'Absolutely not. I saw this boy chasing a butterfly last week. Completely lacks street discipline.',
    trait: 'Instigator of family WhatsApp group arguments'
  }
];

export const INITIAL_FAMILY_MESSAGES: FamilyChatMessage[] = [
  {
    id: 'fmsg-1',
    sender: 'Ammu',
    relation: 'Grandmother',
    text: 'Has anyone checked if Bruno’s family has a fenced compound? I don’t want my grandchild living in an apartment without sunbathing rights!',
    timestamp: '10:14 AM',
    avatar: '👵🐾'
  },
  {
    id: 'fmsg-2',
    sender: 'Appachan',
    relation: 'Grandfather',
    text: 'I made inquiries through my morning walk network at Subhash Park. Bruno’s grandfather was a decorated fetch champion in 2018.',
    timestamp: '10:17 AM',
    avatar: '👴🐾'
  },
  {
    id: 'fmsg-3',
    sender: 'Chechi',
    relation: 'Elder Sister',
    text: 'That’s all fine Appacha, but what about treat sharing? Look at his profile: Treat Sharing is 0%! That is a huge red flag!',
    timestamp: '10:20 AM',
    avatar: '🐶🎀'
  },
  {
    id: 'fmsg-4',
    sender: 'Cousin Rocky',
    relation: 'Cousin',
    text: 'Told you so. He will eat all the roasted chicken and leave you with dry vegetarian kibble. Total fraud.',
    timestamp: '10:21 AM',
    avatar: '🐕⚡'
  },
  {
    id: 'fmsg-5',
    sender: 'Ammu',
    relation: 'Grandmother',
    text: 'Rocky, you keep quiet. You were disqualified from your own marriage talks after chewing the bride’s leather leash!',
    timestamp: '10:24 AM',
    avatar: '👵🐾'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Bruno viewed your profile',
    description: 'Bruno spent 4 minutes sniffing your sofa compatibility metrics.',
    timeAgo: '2m ago',
    read: false,
    iconType: 'paw'
  },
  {
    id: 'notif-2',
    title: 'Compatibility Boosted! 📈',
    description: 'Your compatibility increased by 2.4% after you shared a treat in spirit.',
    timeAgo: '15m ago',
    read: false,
    iconType: 'treat'
  },
  {
    id: 'notif-3',
    title: 'Family Council Alert 🚨',
    description: 'Grandmother Ammu voted "Skeptical" regarding apartment balcony size.',
    timeAgo: '1h ago',
    read: false,
    iconType: 'alert'
  },
  {
    id: 'notif-4',
    title: 'Someone liked your sofa 🛋️',
    description: 'Snowy added your 3-seater living room sofa to their Dream Naplist.',
    timeAgo: '3h ago',
    read: true,
    iconType: 'heart'
  },
  {
    id: 'notif-5',
    title: 'PawGPT Wisdom Available',
    description: 'PawGPT analyzed your sleeping position and calculated 91% romance potential.',
    timeAgo: '5h ago',
    read: true,
    iconType: 'bell'
  },
  {
    id: 'notif-6',
    title: 'Emotional Availability Alert',
    description: 'Warning: Your dog has been emotionally unavailable during nap time for 3 hours.',
    timeAgo: '6h ago',
    read: true,
    iconType: 'alert'
  }
];

export const PAWSTROLOGY_SIGNS: PawstrologySign[] = [
  {
    signName: 'Golden Paw (Leo Retriever)',
    moonSign: 'Full Moon Retriever',
    risingSign: 'Ascendant Beagle',
    luckyTreat: 'Tandoori Chicken Bone (Chewed under supervision)',
    luckyObject: 'Left Bata slipper with rubber teeth marks',
    romanticWarning: 'Do not trust anyone who says they don’t like dogs. They are secretly two cats in a trench coat.',
    lovePrediction: 'You will meet someone near a biscuit packet around 5:30 PM.',
    compatibilityNotes: 'High harmony with Couch Potato Paws, slight friction with High Energy Herders.'
  },
  {
    signName: 'Diamond Collar (Aries Terrier)',
    moonSign: 'Howling Moon Husky',
    risingSign: 'Ascendant Indie Guardian',
    luckyTreat: 'Peanut Butter stuffed marrow bone',
    luckyObject: 'Yellow squeaky tennis ball with half the fuzz missing',
    romanticWarning: 'Avoid romantic encounters right after shampooing. You will smell suspiciously floral.',
    lovePrediction: 'A dramatic eye contact will occur across the veterinary clinic waiting room.',
    compatibilityNotes: 'Intense romantic barks. Requires 80% sofa dominance.'
  },
  {
    signName: 'Velvet Pillow (Taurus Shih Tzu)',
    moonSign: 'New Moon Pomeranian',
    risingSign: 'Ascendant Royal Spaniel',
    luckyTreat: 'Freeze-dried lamb liver cubes',
    luckyObject: 'Cashmere blanket with sunbeam alignment',
    romanticWarning: 'Do not settle for a groom whose humans buy generic store-brand kibble.',
    lovePrediction: 'Your soulmate will offer you the softer half of the carpet.',
    compatibilityNotes: 'Aesthetic perfection. Zero tolerance for mud puddle enthusiasts.'
  }
];

export const LEADERBOARD_PAWS = [
  {
    id: 'lead-1',
    rank: 1,
    name: 'Bruno',
    breed: 'Golden Retriever',
    title: 'Most Eligible Bachelor',
    votes: 14280,
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80',
    stat: '99.7% Tail Wag Rate'
  },
  {
    id: 'lead-2',
    rank: 2,
    name: 'Coco',
    breed: 'Royal Pomeranian',
    title: 'Most Dramatic Diva',
    votes: 12940,
    photo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=300&q=80',
    stat: '14 Barks/Min Speed'
  },
  {
    id: 'lead-3',
    rank: 3,
    name: 'Appu',
    breed: 'Beagle Detective',
    title: 'Most Likely To Steal Your Dinner',
    votes: 11820,
    photo: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=300&q=80',
    stat: '0.4s Shawarma Snatch'
  },
  {
    id: 'lead-4',
    rank: 4,
    name: 'Snowy',
    breed: 'Siberian Husky',
    title: 'Best Operatic Vocalist',
    votes: 9740,
    photo: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=300&q=80',
    stat: 'High C Dramatic Pitch'
  },
  {
    id: 'lead-5',
    rank: 5,
    name: 'Kuttu',
    breed: 'Native Indie Pride',
    title: 'Supreme Compound Guardian',
    votes: 8930,
    photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80',
    stat: '100% Anti-Auto Defense'
  }
];

export const PAW_GPT_QA: { [key: string]: string } = {
  'Should I text my match?':
    'Based on my advanced analysis of 3,827 barks, 19 tail movements, and absolutely no scientific evidence...\n\nYES.\n\nHowever, wait 7 minutes first so you don’t look desperate. If they ask about your favourite activity, do NOT mention your slipper collection right away.',

  'Why did they leave me on paw-seen?':
    'There are only 3 scientifically plausible reasons:\n1. A delivery motorcycle passed their gate.\n2. Someone opened a packet of Parle-G biscuits 40 meters away.\n3. Their human took their phone away to clean drool off the screen.\n\nDo not panic. Send one subtle "woof" in 4 hours.',

  'Is my family going to approve this marriage?':
    'Family approval algorithm report:\n• Grandmother Ammu: 40% (Needs proof of grass area)\n• Grandfather Appachan: 80% (Respects the barking volume)\n• Cousin Rocky: 0% (He is bitter and jealous)\n\nRecommendation: Offer 3 Jerky Strips to Cousin Rocky to neutralize his opposition.',

  'Should I share my treat?':
    'CRITICAL PROTOCOL ERROR: The phrase "share treat" does not compute in Canine OS 14.2.\n\nYou may allow your match to smell the packaging from a distance of not less than 1.5 meters. Direct ingestion by the other party is considered grounds for immediate divorce.',

  'Why is my crush following another dog?':
    'Our radar indicates that the other dog was carrying a half-eaten chicken cutlet. It is not romantic attraction; it is pure economic espionage. Stay calm and secure your own treats.',

  'What does one bark mean?':
    'One single bark can mean:\n1. "I love you with all my soul."\n2. "The doorbell rang."\n3. "The ceiling fan looked at me disrespectfully."\n4. "Give me cheese immediately or face legal consequences."\n\nContext is everything.',

  'Should I marry for love or snacks?':
    'True philosophical canine doctrine states: "Love fades when the thunder roars, but a jar of roasted chicken hearts is eternal."\n\nMarry someone who loves you, but ensure their human has a high-tier Swiggy Instamart budget.'
};
