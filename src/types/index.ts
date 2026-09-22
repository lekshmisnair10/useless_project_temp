export interface DogProfile {
  id: string;
  name: string;
  age: number;
  ageUnit?: string;
  breed: string;
  location: string;
  personality: string;
  favouriteFood: string;
  favouriteActivity: string;
  compatibilityScore: number;
  photo: string;
  fallbackGradient: string;
  furCompatibility: number;
  foodCompatibility: number;
  sofaCompatibility: number;
  bathCompatibility: number;
  treatSharing: number;
  emotionalAvailability: string;
  redFlags: string[];
  greenFlags: string[];
  malayalamParody: {
    dialogue: string;
    translation: string;
    context: string;
  };
  loveTimeline: {
    year: string;
    event: string;
  }[];
  familyOpinion: {
    approves: boolean;
    quote: string;
  };
  pawVerified: boolean;
  category: 'Most Eligible' | 'Most Dramatic' | 'Food Thief' | 'Sofa King' | 'High Maintenance' | 'Zen Master';
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  status: 'Approved' | 'Skeptical' | 'Rejected' | 'Bribery Required';
  dialogue: string;
  trait: string;
}

export interface FamilyChatMessage {
  id: string;
  sender: string;
  relation: string;
  text: string;
  timestamp: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isWoof?: boolean;
  translation?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  read: boolean;
  iconType: 'paw' | 'heart' | 'alert' | 'treat' | 'bell';
}

export interface UserDogProfile {
  name: string;
  breed: string;
  age: number;
  location: string;
  favouriteFood: string;
  favouriteActivity: string;
  personality: string;
  greenFlags: string;
  redFlags: string;
  idealMatch: string;
  sofaAllocation: number;
  barkFrequency: number;
  bathTolerance: number;
  slipperStealing: number;
  dateOfBirth?: string;
  religion?: string;
  familyType?: string;
  color?: string;
  kidsBefore?: string;
  vacuumReaction?: string;
  slipperChewingIndex?: string;
  humanWealthStatus?: string;
  bio: string;
  avatar: string;
}

export interface PawstrologySign {
  signName: string;
  moonSign: string;
  risingSign: string;
  luckyTreat: string;
  luckyObject: string;
  romanticWarning: string;
  lovePrediction: string;
  compatibilityNotes: string;
}
