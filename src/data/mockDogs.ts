import { DogProfile } from '../types';

export const MOCK_DOGS: DogProfile[] = [
  {
    id: 'bruno-golden',
    name: 'Bruno',
    age: 3,
    breed: 'Golden Retriever',
    location: 'Kochi, Kerala',
    personality: 'Emotionally available. Physically unavailable during nap time.',
    favouriteFood: 'Roasted Chicken & Royal Canin Gravy',
    favouriteActivity: 'Staring deeply into your soul while you chew toast',
    compatibilityScore: 97,
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-amber-200 to-amber-500',
    furCompatibility: 99,
    foodCompatibility: 42,
    sofaCompatibility: 108,
    bathCompatibility: -17,
    treatSharing: 0,
    emotionalAvailability: 'Loading...',
    redFlags: [
      'Runs when called for bath',
      'Has commitment issues with slippers',
      'Sleeps diagonally across the 3-seater sofa'
    ],
    greenFlags: [
      'Brings you a single dirty sock when you cry',
      'Protects you from suspicious cats 400m away',
      'Knows when you need unconditional ear scratches'
    ],
    malayalamParody: {
      dialogue: 'ഇവനാണോ എന്റെ ജീവിതത്തിലെ ഹീറോ?',
      translation: 'Is he truly the hero of my life?',
      context: 'Dramatic slow-motion zoom as Bruno drops a slobbery tennis ball.'
    },
    loveTimeline: [
      { year: '2023', event: 'Met a golden female at Subhash Park. Barked once, immediately sneezed.' },
      { year: '2024', event: 'Briefly engaged to a pink chew bone. Fell out of love after it squeaked in sleep.' },
      { year: '2025', event: 'Realized bachelors do not get second helpings of gravy.' },
      { year: '2026', event: 'Joined PuppyShaadi with ₹48,000 treat dowry expectation.' }
    ],
    familyOpinion: {
      approves: true,
      quote: 'Boy comes from a good family in Marine Drive. Good tail-wagging etiquette.'
    },
    pawVerified: true,
    category: 'Most Eligible'
  },
  {
    id: 'kuttu-indie',
    name: 'Kuttu',
    age: 4,
    breed: 'Native Indie Pride',
    location: 'Thrissur, Kerala',
    personality: 'Very loyal. Slight trust issues with vacuum cleaners.',
    favouriteFood: 'Kappa & Meen Curry (Bones thoroughly checked by Human)',
    favouriteActivity: 'Territory inspection from the compound wall',
    compatibilityScore: 91,
    photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-amber-600 to-yellow-800',
    furCompatibility: 94,
    foodCompatibility: 98,
    sofaCompatibility: 88,
    bathCompatibility: 12,
    treatSharing: 15,
    emotionalAvailability: 'High (If street door is shut)',
    redFlags: [
      'Will fight the neighbourhood auto-rickshaw at 6:00 AM',
      'Barks at wind if it blows from the wrong direction',
      'Refuses imported kibble, demands genuine Kerala rice'
    ],
    greenFlags: [
      'Zero maintenance, 100% immunity',
      'Will guard your footwear collection with his life',
      'Can identify delivery person by motorcycle engine frequency'
    ],
    malayalamParody: {
      dialogue: 'ഈ ബന്ധം നടക്കുമോ... നടക്കാതിരിക്കുമോ?',
      translation: 'Will this holy alliance take place... or will destiny intervene?',
      context: 'Rain falls dramatically in Thrissur Pooram grounds.'
    },
    loveTimeline: [
      { year: '2022', event: 'Had intense staring contest with neighbour pet Pomeranian.' },
      { year: '2024', event: 'Chased off 3 stray cats to impress a passing Beagle. Beagle ignored him.' },
      { year: '2025', event: 'Achieved complete self-actualization over a boiled egg.' },
      { year: '2026', event: 'Seeking traditional home-barking companion.' }
    ],
    familyOpinion: {
      approves: true,
      quote: '100% pure deshi bloodline. Excellent security instincts.'
    },
    pawVerified: true,
    category: 'Zen Master'
  },
  {
    id: 'coco-pomeranian',
    name: 'Coco',
    age: 2,
    breed: 'Royal Pomeranian',
    location: 'Kozhikode, Kerala',
    personality: 'High maintenance. Claims it is called having standards.',
    favouriteFood: 'Freeze-dried Salmon flakes on ceramic saucer',
    favouriteActivity: 'Yapping aggressively from a Gucci tote bag',
    compatibilityScore: 89,
    photo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-orange-200 to-amber-400',
    furCompatibility: 98,
    foodCompatibility: 34,
    sofaCompatibility: 99,
    bathCompatibility: -80,
    treatSharing: -10,
    emotionalAvailability: 'Appointment Only',
    redFlags: [
      'Cannot be touched unless your hands are sanitised',
      'Requires 3 blow-dries a week',
      'Believes she is the biological heir to the house'
    ],
    greenFlags: [
      'Looks like an expensive marshmallow',
      'Extremely photogenic for your human Instagram',
      'Can fit inside airplane cabin without paying extra'
    ],
    malayalamParody: {
      dialogue: 'എന്റെ ഹൃദയം പറയുന്നത് ഒന്ന് മാത്രം... ബിസ്കറ്റ് ആദ്യം.',
      translation: 'My royal heart whispers only one truth... biscuits before romance.',
      context: 'Slow wind blows Coco’s fluffy white coat while violin swells.'
    },
    loveTimeline: [
      { year: '2024', event: 'Received 14 matrimonial requests on Pawshyaadi. Rejected all for poor groom posture.' },
      { year: '2025', event: 'Briefly considered a Corgi, but the leg length was non-negotiable.' },
      { year: '2026', event: 'Ready to settle down if groom provides dedicated sunbathing mattress.' }
    ],
    familyOpinion: {
      approves: false,
      quote: 'Coco demands a groom who earns at least 50 jerky treats a week.'
    },
    pawVerified: true,
    category: 'High Maintenance'
  },
  {
    id: 'snowy-husky',
    name: 'Snowy',
    age: 3,
    breed: 'Siberian Husky',
    location: 'Ernakulam, Kerala',
    personality: 'Speaks fluent dramatic sigh. Full-time opera vocalist.',
    favouriteFood: 'Cold beef broth & ice cubes from LG refrigerator',
    favouriteActivity: 'Howling along to Malayalam melody songs at 2 AM',
    compatibilityScore: 94,
    photo: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-blue-200 to-slate-600',
    furCompatibility: 100,
    foodCompatibility: 75,
    sofaCompatibility: 92,
    bathCompatibility: -99,
    treatSharing: 5,
    emotionalAvailability: 'Extreme Drama',
    redFlags: [
      'Will argue with you in 7 different octaves',
      'Cannot survive if AC temperature is above 19°C',
      'Dramatic eye rolls during family discussions'
    ],
    greenFlags: [
      'Piercing blue eyes that could dissolve your sins',
      'Will hold intense 15-minute vocal conversations with you',
      'Guaranteed never a dull moment in the compound'
    ],
    malayalamParody: {
      dialogue: 'ഈ പ്രണയത്തിന് സാക്ഷി... ഈ പാർക്കിലെ മുഴുവൻ നായ്ക്കളും.',
      translation: 'Witness to this timeless love... every single dog in this park!',
      context: 'Snowy howls dramatically toward the horizon as church bells ring.'
    },
    loveTimeline: [
      { year: '2023', event: 'Escaped compound to chase a butterfly. Returned 4 minutes later complaining about humidity.' },
      { year: '2024', event: 'Sang a 45-minute tragic opera after being offered a vegetarian biscuit.' },
      { year: '2025', event: 'Auditioned for reality TV show "Bark Star". Disqualified for diva behaviour.' },
      { year: '2026', event: 'Looking for a patient partner with high noise tolerance.' }
    ],
    familyOpinion: {
      approves: true,
      quote: 'Vocal abilities are unmatched. Excellent potential for wedding playback.'
    },
    pawVerified: true,
    category: 'Most Dramatic'
  },
  {
    id: 'appu-beagle',
    name: 'Appu',
    age: 5,
    breed: 'Beagle Detective',
    location: 'Pathanamthitta, Kerala',
    personality: 'Will steal your food but call it emotional sharing.',
    favouriteFood: 'Anything currently in your mouth',
    favouriteActivity: 'Tracking breadcrumbs across 14 square kilometers',
    compatibilityScore: 96,
    photo: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-amber-400 to-orange-700',
    furCompatibility: 92,
    foodCompatibility: 15,
    sofaCompatibility: 105,
    bathCompatibility: 20,
    treatSharing: -50,
    emotionalAvailability: 'Snack Contingent',
    redFlags: [
      'Has perfected the "I have not eaten in 6 months" face',
      'Will open the fridge door if left unattended for 4 seconds',
      'Can sniff out mutton biryani through a steel casserole'
    ],
    greenFlags: [
      'Incredible ears like soft velvet dosas',
      'Will never let any crumb go wasted on the kitchen floor',
      'Supreme cuddling ability under wool blankets'
    ],
    malayalamParody: {
      dialogue: 'അവൾ yes പറഞ്ഞാൽ... ഞാൻ ഇന്നുതന്നെ treat വാങ്ങും.',
      translation: 'If she utters "yes"... I will buy treats this very day!',
      context: 'Appu sits heroically atop a sofa cushion with a biscuit in his mouth.'
    },
    loveTimeline: [
      { year: '2021', event: 'Fell in love with a shawarma cart owner. Broken heart when cart moved.' },
      { year: '2023', event: 'Stole a whole fried fish from the dining table. Zero regrets expressed.' },
      { year: '2025', event: 'Entered arranged marriage talks. Collapsed negotiations over treat distribution.' },
      { year: '2026', event: 'Seeking food-generous partner with minimal appetite.' }
    ],
    familyOpinion: {
      approves: true,
      quote: 'A boy with a healthy appetite is a sign of good fortune and prosperity.'
    },
    pawVerified: true,
    category: 'Food Thief'
  },
  {
    id: 'bella-shihtzu',
    name: 'Bella',
    age: 2,
    breed: 'Shih Tzu Princess',
    location: 'Trivandrum, Kerala',
    personality: 'Royal lineage. Expects red carpet walks to the water bowl.',
    favouriteFood: 'Organic chicken shreds served at room temperature',
    favouriteActivity: 'Sitting delicately on silk saris during weddings',
    compatibilityScore: 93,
    photo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-pink-300 to-rose-500',
    furCompatibility: 97,
    foodCompatibility: 80,
    sofaCompatibility: 100,
    bathCompatibility: -30,
    treatSharing: 10,
    emotionalAvailability: 'Polite Royalty',
    redFlags: [
      'Will snub you if you wear non-matching pyjamas',
      'Refuses to walk on wet grass under any circumstances',
      'Takes 45 minutes to get her topknot hairstyle tied'
    ],
    greenFlags: [
      'Brings unparalleled aesthetic prestige to any household',
      'Never chews slippers; only chews high-end leather clutches',
      'Calm, regal, and emits a scent of lavender shampoo'
    ],
    malayalamParody: {
      dialogue: 'ഇത് വെറും match അല്ല... ഇത് ഒരു ചരിത്രപരമായ കുരയ്ക്കൽ ആണ്.',
      translation: 'This is no ordinary match... this is a historic bark etched in time!',
      context: 'Royal trumpet fanfare echoes across Kowdiar Palace road.'
    },
    loveTimeline: [
      { year: '2024', event: 'Declined proposal from an energetic Labrador: "Too much drool."' },
      { year: '2025', event: 'Won "Best Groomed Paws" in South India Canine Pageant.' },
      { year: '2026', event: 'Seeking handsome gentle-dog with clean paws and air conditioning.' }
    ],
    familyOpinion: {
      approves: true,
      quote: 'Kowdiar royal manners. Deserves a groom of distinguished stature.'
    },
    pawVerified: true,
    category: 'High Maintenance'
  },
  {
    id: 'rocky-shepherd',
    name: 'Rocky',
    age: 4,
    breed: 'German Shepherd',
    location: 'Kottayam, Kerala',
    personality: 'Part-time elite security officer. Full-time terrified of thunder.',
    favouriteFood: 'T-bone steak & Calcium supplements',
    favouriteActivity: 'Doing tactical perimeter checks, then hiding under human bed',
    compatibilityScore: 88,
    photo: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-amber-700 to-stone-900',
    furCompatibility: 91,
    foodCompatibility: 89,
    sofaCompatibility: 78,
    bathCompatibility: 40,
    treatSharing: 25,
    emotionalAvailability: 'Protective & Needy',
    redFlags: [
      'Weighs 38kg but thinks he is a lap dog',
      'Cries softly when a plastic bag flies past the gate',
      'Takes 3 rounds of psychological preparation before entering car'
    ],
    greenFlags: [
      'Will patrol your balcony with military discipline',
      'Highly trained in sit, shake, roll, and existential angst',
      '10/10 loyal bodyguard for life'
    ],
    malayalamParody: {
      dialogue: 'കുടുംബം സമ്മതിക്കുമോ എന്നറിയില്ല... പക്ഷേ biscuit shop സമ്മതിച്ചു.',
      translation: 'Family approval remains uncertain... but the biscuit shop has blessed us!',
      context: 'Rocky salutes with right paw while standing at strict attention.'
    },
    loveTimeline: [
      { year: '2022', event: 'Graduated top of obedience school with honours in fetching.' },
      { year: '2024', event: 'Jumped into owner lap during thunderstorm. Broke coffee table.' },
      { year: '2025', event: 'Attempted to impress a Golden Retriever by catching a frisbee, caught a leaf instead.' },
      { year: '2026', event: 'Ready to build an unbreakable fortress of domestic romance.' }
    ],
    familyOpinion: {
      approves: true,
      quote: 'Very strong security value for the estate. Slight cowardice in rain can be excused.'
    },
    pawVerified: true,
    category: 'Most Eligible'
  },
  {
    id: 'maya-dalmatian',
    name: 'Maya',
    age: 3,
    breed: 'Spotted Dalmatian',
    location: 'Alappuzha, Kerala',
    personality: 'High aesthetics. Expects 400 photos per sunset backwater stroll.',
    favouriteFood: 'Steamed River Fish & Spinach kibble blend',
    favouriteActivity: 'Posing elegantly near houseboats for tourist cameras',
    compatibilityScore: 92,
    photo: 'https://images.unsplash.com/photo-1590419690008-905895e8fe0d?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-zinc-100 to-zinc-900',
    furCompatibility: 95,
    foodCompatibility: 70,
    sofaCompatibility: 90,
    bathCompatibility: 30,
    treatSharing: 20,
    emotionalAvailability: 'Selective & Classy',
    redFlags: [
      'Needs 12km run every morning or will rearrange the living room curtains',
      'Extremely spot-conscious. Refuses to lie on polka-dot rugs',
      'Knows she is prettier than you'
    ],
    greenFlags: [
      'Turn heads wherever she walks',
      'Athletic endurance to outrun any suspicious neighborhood cat',
      'Gentle with small puppies and elderly grandfather dogs'
    ],
    malayalamParody: {
      dialogue: 'എന്റെ ജീവിതത്തിലെ ഏറ്റവും വലിയ തീരുമാനം... Chicken ആണോ Mutton ആണോ?',
      translation: 'The greatest philosophical conundrum of my life... Chicken or Mutton?',
      context: 'Maya gazes out over the Vembanad Lake in deep cinematic introspection.'
    },
    loveTimeline: [
      { year: '2023', event: 'Featured on local Instagram page #PawsOfKerala with 50K views.' },
      { year: '2024', event: 'Turned down an arranged alliance because groom was unspotted.' },
      { year: '2025', event: 'Ran a mini marathon alongside an oblivious cyclist.' },
      { year: '2026', event: 'Looking for a dashing partner who appreciates fine photography angles.' }
    ],
    familyOpinion: {
      approves: true,
      quote: 'Stunning spotted pattern. Will bring tremendous elegance to family portrait.'
    },
    pawVerified: true,
    category: 'Most Eligible'
  },
  {
    id: 'simba-corgi',
    name: 'Simba',
    age: 2.5,
    breed: 'Welsh Corgi',
    location: 'Kannur, Kerala',
    personality: 'Aerodynamic loaf. Unapologetic sofa commander.',
    favouriteFood: 'Peanut Butter stuffed Kong & Boiled Sweet Potato',
    favouriteActivity: 'Waddling at high speed with zero ground clearance',
    compatibilityScore: 95,
    photo: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-amber-300 to-orange-500',
    furCompatibility: 99,
    foodCompatibility: 88,
    sofaCompatibility: 120,
    bathCompatibility: -10,
    treatSharing: 0,
    emotionalAvailability: 'High & Cuddly',
    redFlags: [
      'Cannot jump onto bed unassisted; expects hydraulic lift service',
      'Butt wiggles uncontrollably when happy, knocking over teacups',
      'Herds humans towards kitchen cupboards every 20 minutes'
    ],
    greenFlags: [
      'Famous heart-shaped corgi backside',
      'Extremely joyful disposition and ear-to-ear smile',
      'Expert level sofa cushion warmer'
    ],
    malayalamParody: {
      dialogue: 'ബിസ്കറ്റ് ഇല്ലാത്ത പ്രണയം... വെള്ളമില്ലാത്ത പുഴ പോലെയാണ്.',
      translation: 'Love without biscuits... is like a river without water.',
      context: 'Simba looks yearningly at the kitchen jar with dramatic flute music.'
    },
    loveTimeline: [
      { year: '2023', event: 'First discovered peanut butter. Pledged lifelong devotion.' },
      { year: '2024', event: 'Tried to herd 6 chickens in backyard. Got outmaneuvered by a rooster.' },
      { year: '2025', event: 'Became local celebrity at Kannur beach for mini-legs run.' },
      { year: '2026', event: 'Seeking true soulmate willing to assist with sofa climbing.' }
    ],
    familyOpinion: {
      approves: true,
      quote: 'Short legs, large heart. Adorable quotient exceeds municipal safety guidelines.'
    },
    pawVerified: true,
    category: 'Sofa King'
  },
  {
    id: 'leo-labrador',
    name: 'Leo',
    age: 4,
    breed: 'Chocolate Labrador',
    location: 'Malappuram, Kerala',
    personality: 'Heart of solid gold. Will trade kingdom for half a parotta.',
    favouriteFood: 'Malabar Parotta crust & Beef ularthiyathu',
    favouriteActivity: 'Swimming in any puddle of water larger than a teaspoon',
    compatibilityScore: 98,
    photo: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-amber-800 to-stone-950',
    furCompatibility: 98,
    foodCompatibility: 99,
    sofaCompatibility: 95,
    bathCompatibility: 100,
    treatSharing: 30,
    emotionalAvailability: 'Endless Warmth',
    redFlags: [
      'Will swim in dirty mud water 30 seconds after ₹2,000 salon grooming',
      'Tail functions like an industrial sledgehammer against glassware',
      'Greets every burglar with friendly lick and house tour'
    ],
    greenFlags: [
      'Unconditional love 24/7/365',
      'Best companion for beach adventures and football games',
      'Gentlest mouth: can hold a raw egg without breaking it'
    ],
    malayalamParody: {
      dialogue: 'നീ എന്റെ ജീവിതത്തിലേക്ക് വന്നാൽ... ഞാൻ ഇനി ഒരിക്കലും പന്ത് കളവ് പറയില്ല.',
      translation: 'If you enter my life... I promise never to lie about stealing the tennis ball again.',
      context: 'Leo drops an oversized stick at your feet under romantic monsoon rain.'
    },
    loveTimeline: [
      { year: '2022', event: 'Jumped into temple pond during festival. Rescued by 4 kind fishermen.' },
      { year: '2024', event: 'Ate a whole loaf of bread including plastic wrapper. Survived unharmed.' },
      { year: '2025', event: 'Declared best boy in Malappuram district by unanimous council.' },
      { year: '2026', event: 'Searching for a sweet girl dog to share the backseat of the car.' }
    ],
    familyOpinion: {
      approves: true,
      quote: '100% wholesome boy. Never started an argument in his life.'
    },
    pawVerified: true,
    category: 'Most Eligible'
  },
  {
    id: 'ruby-dachshund',
    name: 'Ruby',
    age: 3,
    breed: 'Miniature Dachshund',
    location: 'Kollam, Kerala',
    personality: 'Low centre of gravity. Extreme level of audacity.',
    favouriteFood: 'Liver treats & Stolen pizza crusts',
    favouriteActivity: 'Burrowing under 4 layers of duvets until invisible',
    compatibilityScore: 90,
    photo: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-amber-600 to-red-900',
    furCompatibility: 93,
    foodCompatibility: 65,
    sofaCompatibility: 110,
    bathCompatibility: -40,
    treatSharing: 0,
    emotionalAvailability: 'Warm Blanket Addict',
    redFlags: [
      'Will growl at a Great Dane 15 times her size without fear of death',
      'Barrows so deep into bed sheets you might sit on her by accident',
      'Takes personal offence if you sneeze'
    ],
    greenFlags: [
      'Portable hot water bottle in human winter',
      'Ferocious watchdog instincts in a compact 4kg package',
      'Very expressive eyebrows with Shakespearean emotional depth'
    ],
    malayalamParody: {
      dialogue: 'എന്നെ ചെറുതായി കാണരുത്... എന്റെ സ്നേഹം അനന്തമാണ്.',
      translation: 'Do not measure me by my short stature... my love is boundless as the ocean.',
      context: 'Ruby stands tall on a brick, looking into the sunset with immense conviction.'
    },
    loveTimeline: [
      { year: '2023', event: 'Barking match against a German Shepherd. Shepherd backed down.' },
      { year: '2024', event: 'Discovered heated mattress pad. Refused to walk for 3 weeks.' },
      { year: '2025', event: 'Broke up with a Beagle who kept stealing her spot under the blanket.' },
      { year: '2026', event: 'Seeking chivalrous gentleman with high blanket-sharing index.' }
    ],
    familyOpinion: {
      approves: true,
      quote: 'High spirit, zero fear. Excellent match for a confident partner.'
    },
    pawVerified: true,
    category: 'Most Dramatic'
  },
  {
    id: 'buster-pug',
    name: 'Buster',
    age: 5,
    breed: 'Velvet Pug',
    location: 'Palakkad, Kerala',
    personality: 'Breathing resembles an espresso machine. Loyal to a fault.',
    favouriteFood: 'Scrambled eggs with a dash of turmeric',
    favouriteActivity: 'Snoring rhythmically in synchronization with AC compressor',
    compatibilityScore: 86,
    photo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-stone-300 to-amber-700',
    furCompatibility: 88,
    foodCompatibility: 92,
    sofaCompatibility: 100,
    bathCompatibility: 0,
    treatSharing: 10,
    emotionalAvailability: 'Perpetual Velvet Shadow',
    redFlags: [
      'Snores louder than a diesel generator',
      'Sheds tiny needle hairs that permanently bond to dark trousers',
      'Wrinkles require daily moisture maintenance'
    ],
    greenFlags: [
      'Comical head tilts whenever you ask a philosophical question',
      'Zero running requirements; 50 meters of walking is a marathon',
      '100% contentment with simple domestic bliss'
    ],
    malayalamParody: {
      dialogue: 'ഞാൻ ശ്വാസമെടുക്കുന്നത് sound ഉണ്ടാക്കാം... പക്ഷെ എന്റെ സ്നേഹം silent ആണ്.',
      translation: 'My breathing may sound like a boiler... but my true love is silent and deep.',
      context: 'Buster tilts his wrinkled head at a 45-degree angle with mournful violin.'
    },
    loveTimeline: [
      { year: '2021', event: 'Entered sleeping competition. Won gold medal without waking up.' },
      { year: '2023', event: 'Got stuck in laundry basket for 2 hours before being noticed.' },
      { year: '2025', event: 'Refused to participate in morning walk; carried home like a VIP.' },
      { year: '2026', event: 'Seeking calm, peaceful partner who values sofa naps over cardio.' }
    ],
    familyOpinion: {
      approves: true,
      quote: 'Very peaceful boy. Does not jump on guests or complain about life.'
    },
    pawVerified: true,
    category: 'Sofa King'
  }
];
