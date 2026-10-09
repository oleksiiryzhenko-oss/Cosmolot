import strategyCover from "@/assets/game-strategy.jpg";
import familyCover from "@/assets/game-family.jpg";
import partyCover from "@/assets/game-party.jpg";
import cardsCover from "@/assets/game-cards.jpg";
import coopCover from "@/assets/game-coop.jpg";
import puzzleCover from "@/assets/game-puzzle.jpg";
import adventureCover from "@/assets/game-adventure.jpg";

export type Game = {
  id: string;
  name: string;
  category: string;
  cover: string;
  short: string;
  description: string;
  players: string;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  age: string;
  rules: string[];
};

export const categories = [
  "All",
  "Strategy",
  "Family",
  "Party",
  "Card",
  "Cooperative",
  "Puzzle",
  "Adventure",
] as const;

export const games: Game[] = [
  {
    id: "thrones-of-albion",
    name: "Thrones of Albion",
    category: "Strategy",
    cover: strategyCover,
    short: "Claim shires, raise banners and outwit rival houses.",
    description:
      "A deep area-control game set across a fictional medieval England. Build settlements, trade wool and iron, and time your campaigns carefully — the house with the strongest realm at the tenth harvest takes the crown.",
    players: "2–5 players",
    time: "90–120 min",
    difficulty: "Hard",
    age: "14+",
    rules: [
      "Each round has four phases: income, orders, movement and scoring.",
      "Place order tokens face down on your regions, then reveal them together.",
      "Control of a region requires more banners than every neighbouring house.",
      "Score victory points for held shires, completed trade routes and crowns.",
    ],
  },
  {
    id: "meeple-meadows",
    name: "Meeple Meadows",
    category: "Family",
    cover: familyCover,
    short: "A gentle tile-laying race through the countryside.",
    description:
      "Our most borrowed family box. Players lay countryside tiles to grow orchards, bridges and villages, then send their meeples out to harvest. Easy to teach in five minutes and fun across three generations.",
    players: "2–4 players",
    time: "30–45 min",
    difficulty: "Easy",
    age: "7+",
    rules: [
      "Draw one tile and place it so at least one edge matches.",
      "Optionally place a meeple on the feature you just created.",
      "Completed orchards and villages score immediately.",
      "The game ends when the tile stack runs out; highest score wins.",
    ],
  },
  {
    id: "shout-it-out",
    name: "Shout It Out!",
    category: "Party",
    cover: partyCover,
    short: "Fast-talking guessing rounds for a loud table.",
    description:
      "The game we bring out when the club room is full. Teams race through clue cards using words, sounds or gestures while the sand timer drains. Perfect as a warm-up before a longer session.",
    players: "4–12 players",
    time: "20–30 min",
    difficulty: "Easy",
    age: "10+",
    rules: [
      "Split into two teams and pick a clue-giver for each round.",
      "Describe as many cards as possible in 60 seconds — no rhyming allowed.",
      "Skipped cards cost one point, guessed cards score one.",
      "First team to 20 points wins the match.",
    ],
  },
  {
    id: "runebound-decks",
    name: "Runebound Decks",
    category: "Card",
    cover: cardsCover,
    short: "Draft a spell deck and duel across three arenas.",
    description:
      "A living card duel with no booster packs needed — the club keeps ten pre-built decks ready to borrow. Draft, duel and rebuild between matches. Our Thursday card league runs on this box.",
    players: "2–4 players",
    time: "40–60 min",
    difficulty: "Medium",
    age: "12+",
    rules: [
      "Start with five cards and three mana; draw one card each turn.",
      "Play creatures to an arena, then resolve combat arena by arena.",
      "Winning an arena claims a rune token.",
      "The first duellist with three runes wins.",
    ],
  },
  {
    id: "storm-crew",
    name: "Storm Crew",
    category: "Cooperative",
    cover: coopCover,
    short: "Keep the ship afloat — everyone wins or nobody does.",
    description:
      "A tense cooperative game about crewing a tall ship through a north-sea storm. Players share limited actions, patch leaks and steer for harbour while the storm deck grows meaner each round.",
    players: "1–4 players",
    time: "45–60 min",
    difficulty: "Medium",
    age: "12+",
    rules: [
      "Each player takes three actions per round from their crew role.",
      "Reveal a storm card at the end of every round and apply its effect.",
      "Leaks must be patched before four flood the same deck.",
      "Reach the harbour tile with the hull intact to win together.",
    ],
  },
  {
    id: "tangram-towers",
    name: "Tangram Towers",
    category: "Puzzle",
    cover: puzzleCover,
    short: "Quiet, clever shape-fitting against the clock.",
    description:
      "A calm puzzle box for slower evenings. Players fit geometric pieces into shared pattern cards, racing to complete the tallest tower of finished patterns. Also a favourite in our solo puzzle corner.",
    players: "1–4 players",
    time: "20–30 min",
    difficulty: "Easy",
    age: "8+",
    rules: [
      "Flip three pattern cards into the centre of the table.",
      "Fill a pattern completely using pieces from your tray.",
      "Claim the card and stack it in your tower, then refill the row.",
      "The tallest tower after twelve cards wins.",
    ],
  },
  {
    id: "lanterns-of-the-lost-city",
    name: "Lanterns of the Lost City",
    category: "Adventure",
    cover: adventureCover,
    short: "Explore ruins, gather relics, escape before dusk.",
    description:
      "A campaign-light adventure game with a modular jungle map. Each expedition reveals new ruin tiles, relics and hazards, and your choices carry into the next session — ideal for our monthly campaign night.",
    players: "2–5 players",
    time: "60–90 min",
    difficulty: "Medium",
    age: "12+",
    rules: [
      "Reveal a new ruin tile whenever you move to the map edge.",
      "Spend lantern oil to explore at night or move a second time.",
      "Relics grant permanent abilities for the rest of the expedition.",
      "Return to base camp before the dusk track fills to bank your relics.",
    ],
  },
];

export type Session = {
  id: string;
  date: string;
  day: string;
  time: string;
  game: string;
  spaces: number;
  description: string;
};

export const sessions: Session[] = [
  {
    id: "s1",
    date: "Tue 29 Sep",
    day: "Tuesday",
    time: "18:30 – 21:30",
    game: "Meeple Meadows",
    spaces: 6,
    description: "Beginner-friendly open table. Rules taught on the night, no experience needed.",
  },
  {
    id: "s2",
    date: "Thu 1 Oct",
    day: "Thursday",
    time: "19:00 – 22:00",
    game: "Runebound Decks",
    spaces: 4,
    description: "Weekly card league night. Borrow one of the club's ten pre-built decks.",
  },
  {
    id: "s3",
    date: "Sat 3 Oct",
    day: "Saturday",
    time: "13:00 – 17:00",
    game: "Thrones of Albion",
    spaces: 3,
    description: "Long-game afternoon for heavier strategy boxes. Tea and biscuits included.",
  },
  {
    id: "s4",
    date: "Sun 4 Oct",
    day: "Sunday",
    time: "11:00 – 14:00",
    game: "Tangram Towers",
    spaces: 8,
    description: "Quiet Sunday puzzle morning in the back room. Solo players very welcome.",
  },
  {
    id: "s5",
    date: "Tue 6 Oct",
    day: "Tuesday",
    time: "18:30 – 21:30",
    game: "Shout It Out!",
    spaces: 10,
    description: "Party games warm-up followed by free play at the open tables.",
  },
  {
    id: "s6",
    date: "Thu 8 Oct",
    day: "Thursday",
    time: "19:00 – 22:00",
    game: "Storm Crew",
    spaces: 4,
    description: "Co-op night. One table learns the rules, one table plays the hard mode.",
  },
];

export type ClubEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  game: string;
  description: string;
  participation: string;
  spaces: number;
};

export const events: ClubEvent[] = [
  {
    id: "e1",
    title: "Autumn Albion Championship",
    date: "Saturday 11 October",
    time: "10:00 – 18:00",
    game: "Thrones of Albion",
    description:
      "Our flagship tournament: four Swiss rounds followed by a top-four final table. Trophies for the top three houses and a club voucher for best newcomer.",
    participation: "Entry £12 · 24 places · Swiss rounds, all boards provided",
    spaces: 9,
  },
  {
    id: "e2",
    title: "Thursday League Finals",
    date: "Thursday 16 October",
    time: "19:00 – 22:30",
    game: "Runebound Decks",
    description:
      "The closing night of the autumn card league. Open to league players and spectators, with a side table running friendly duels all evening.",
    participation: "Entry £5 · 16 places · Club decks available to borrow",
    spaces: 5,
  },
  {
    id: "e3",
    title: "Family Games Afternoon",
    date: "Sunday 19 October",
    time: "12:00 – 16:00",
    game: "Meeple Meadows & friends",
    description:
      "A relaxed drop-in afternoon built for families. Volunteers teach every game at the table, and there is a short prize raffle at 15:30.",
    participation: "Free entry · Children welcome with an adult",
    spaces: 20,
  },
  {
    id: "e4",
    title: "Co-op Survival Marathon",
    date: "Saturday 25 October",
    time: "14:00 – 23:00",
    game: "Storm Crew",
    description:
      "Nine hours, three escalating scenarios and one shared crew record. Teams of four rotate through the campaign and the surviving crews sign the club log.",
    participation: "Entry £8 · 20 places · Supper included",
    spaces: 7,
  },
  {
    id: "e5",
    title: "Lost City Campaign Night",
    date: "Friday 31 October",
    time: "18:00 – 23:00",
    game: "Lanterns of the Lost City",
    description:
      "Chapter three of our monthly adventure campaign, run in costume if you fancy it. New explorers get a catch-up briefing at 18:00.",
    participation: "Entry £6 · 15 places · Newcomers welcome",
    spaces: 4,
  },
];

export const registrationOptions = [
  ...events.map((e) => ({ id: e.id, label: `${e.title} — ${e.date}, ${e.time}` })),
  ...sessions.map((s) => ({ id: s.id, label: `${s.game} session — ${s.date}, ${s.time}` })),
];

export const faqs = [
  {
    q: "Do I need to book in advance?",
    a: "Sessions usually have space on the night, but tournaments fill up. Use the registration form to reserve a seat.",
  },
  {
    q: "Do I need my own games?",
    a: "No. The club library holds over 300 boxes and everything on our sessions list is provided.",
  },
  {
    q: "I have never played anything like this before.",
    a: "Perfect. Tuesday nights and the family afternoons are taught from scratch by volunteers.",
  },
  {
    q: "Is there a membership fee?",
    a: "Casual entry is £4 per session, or £30 for a season pass covering all regular club nights.",
  },
  {
    q: "Can I come on my own?",
    a: "Most people do. Tell the host at the welcome desk and they will seat you at an open table.",
  },
];

export const clubRules = [
  "Teach before you play — every table welcomes a new player.",
  "Handle the library boxes with care and return all pieces to their bags.",
  "Sign games out at the welcome desk so we know where they are.",
  "Keep the noise sensible after 21:00; the quiet room is always available.",
  "No food at the tables, and drinks in lidded cups only.",
  "Be kind. Rules disputes go to the host, not to the loudest voice.",
];

export const openingHours = [
  { day: "Monday", hours: "Closed" },
  { day: "Tuesday", hours: "18:30 – 22:00" },
  { day: "Wednesday", hours: "17:00 – 22:00" },
  { day: "Thursday", hours: "18:30 – 22:30" },
  { day: "Friday", hours: "17:00 – 23:00" },
  { day: "Saturday", hours: "11:00 – 23:00" },
  { day: "Sunday", hours: "11:00 – 18:00" },
];

export const contact = {
  address: "The Old Print Works, 14 Hanover Street, Manchester M4 4AH, England",
  email: "hello@cosmoland.club",
  phone: "+44 161 496 0188",
  travel: "Ten minutes' walk from Manchester Victoria; evening parking on Hanover Street.",
};
