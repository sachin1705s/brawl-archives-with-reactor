export interface TimelineCard {
  id: string;
  title: string;
  body: string;
  backgroundImage: string;
  prompt: string;
  startImage: string;
}

export interface Timeline {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  roomsLabel: string;
  comingSoon?: boolean;
  cards: TimelineCard[];
}

export const TIMELINES: Timeline[] = [
  {
    id: "memory-palace",
    title: "Starr Park",
    subtitle: "3 rooms",
    coverImage: "/timeline/starr-park-card-1.jpg",
    roomsLabel: "3 rooms",
    cards: [
      {
        id: "dawn-archive",
        title: "Starr Park Origins",
        body: "Starr park began as an ambitious experiment. Its creators promised a perfect destination where technology, entertainment, and human labor worked in harmony. Investors were shown smiling staff, automated helpers, and bold claims about a future without problems. What they were not shown were the early tests, the strange energy sources, or the cost of making everything “work.”\n\nBehind the scenes, early trials were already taking place. A strange crystalline resource—later known as Gems—was introduced to improve efficiency and control. The results were unstable, but development continued anyway. This era marks the moment Starr Park chose ambition over safety.",
        backgroundImage: "/timeline/starr-park-card-1.jpg",
        prompt: "A bright retro-futuristic theme park plaza with banners, kiosks, and glowing gem displays.",
        startImage: "/timeline/starr-park-card-1.jpg",
      },
      {
        id: "signal-garden",
        title: "Brawler 1: Colt — The Perfect Employee",
        body: "I wasn’t a fighter back then. I was hired to look good, smile, and follow instructions. Starr Park liked people like me — confident, reliable, easy to market. They said the Gems would help us perform better, think faster, work longer.\n\nAt first, it felt like progress. Then I noticed the changes. My reflexes sharpened. My temper shortened. They called it an upgrade. I didn’t know what it was really turning me into.",
        backgroundImage: "/timeline/starr-park-card-2.jpg",
        prompt: "A clean, brightly lit Starr Park control hall with gem-powered consoles and a confident staff member.",
        startImage: "/timeline/starr-park-card-2.jpg",
      },
      {
        id: "ember-drift",
        title: "Brawler 2: Spike — The First Test",
        body: "They didn’t know what I was supposed to become. I was grown, not hired. Built to see how Gems interacted with living things. I didn’t speak. I didn’t complain. That made me perfect for testing.\n\nWhen things went wrong, they stopped asking questions. They just took notes. I survived because the experiment worked — not because it was safe",
        backgroundImage: "/timeline/starr-park-card-3.jpg",
        prompt: "A sealed laboratory chamber with gem energy crystals and a mysterious test subject.",
        startImage: "/timeline/starr-park-card-3.jpg",
      },
    ],
  },
  {
    id: "brawl-stars",
    title: "Grand Rebrand",
    subtitle: "3 rooms",
    coverImage: "/timeline/grand-rebrand-card-1.jpg",
    roomsLabel: "3 rooms",
    cards: [
      {
        id: "brawl-hero-1",
        title: "1985: Grand Rebrand",
        body: "In 1985, Starr Park returned—louder, brighter, and impossible to ignore. The park embraced spectacle and repetition. Everything was recorded, replayed, and archived on tape. Bold colors, constant music, and endless crowds became part of the experience.\n\nBeneath the cheerful branding, the infrastructure began to strain. New attractions were built over old systems. Experimental power sources were reused instead of replaced. Dust settled into machines still advertised as “cutting edge.” The park looked alive—but only on camera.\n\nThis era marked Starr Park’s transformation into a public machine. Once the tapes started rolling, the image mattered more than reality.",
        backgroundImage: "/timeline/grand-rebrand-card-1.jpg",
        prompt: "A bustling retro theme park with bold colors and camera crews filming crowds.",
        startImage: "/timeline/grand-rebrand-card-1.jpg",
      },
      {
        id: "brawl-hero-2",
        title: "Brawler Card — Bull",
        body: "The park didn’t feel experimental anymore. It felt crowded. Loud. Unstable. When something went wrong, it wasn’t fixed—it was buried. I was assigned to handle problems that weren’t supposed to exist.\n\nThey called it maintenance. Crowd control. Damage prevention. But really, it was about keeping things quiet. If someone saw too much, they didn’t leave angry—they just didn’t leave talking.",
        backgroundImage: "/timeline/grand-rebrand-card-2.jpg",
        prompt: "A tense retro maintenance corridor with flickering lights and security presence.",
        startImage: "/timeline/grand-rebrand-card-2.jpg",
      },
      {
        id: "brawl-hero-3",
        title: "Brawler Card — Poco",
        body: "Music was everywhere in 1985. It played nonstop through speakers that never quite worked right. I was told it kept the crowds moving, distracted, happy.\n\nSometimes the sound distorted. Sometimes it drowned out things I didn’t want to hear. I never asked what it was covering up. I just kept playing. That was my role in the park.",
        backgroundImage: "/timeline/grand-rebrand-card-3.jpg",
        prompt: "A retro stage with glitchy speakers and neon instruments.",
        startImage: "/timeline/grand-rebrand-card-3.jpg",
      },
    ],
  },
  {
    id: "ember-frontier",
    title: "Ember Frontier",
    subtitle: "Coming soon",
    coverImage: "/timeline/ember-frontier-cover.jpg",
    roomsLabel: "Coming soon",
    comingSoon: true,
    cards: [],
  },
  {
    id: "signal-forest",
    title: "Signal Forest",
    subtitle: "Coming soon",
    coverImage: "/timeline/signal-forest-cover.jpg",
    roomsLabel: "Coming soon",
    comingSoon: true,
    cards: [],
  },
];

export function getNextCardIndex(currentIndex: number, length: number): number {
  if (length <= 0) return 0;
  return (currentIndex + 1) % length;
}
