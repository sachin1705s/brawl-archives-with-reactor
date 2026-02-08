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
  cards: TimelineCard[];
}

export const TIMELINES: Timeline[] = [
  {
    id: "memory-palace",
    title: "Starr Park",
    subtitle: "3 rooms",
    coverImage: "/timeline/world-card-1.jpg",
    roomsLabel: "3 rooms",
    cards: [
      {
        id: "dawn-archive",
        title: "Starr Park Origins",
        body: "Starr park began as an ambitious experiment. Its creators promised a perfect destination where technology, entertainment, and human labor worked in harmony. Investors were shown smiling staff, automated helpers, and bold claims about a future without problems. What they were not shown were the early tests, the strange energy sources, or the cost of making everything “work.”\n\nBehind the scenes, early trials were already taking place. A strange crystalline resource—later known as Gems—was introduced to improve efficiency and control. The results were unstable, but development continued anyway. This era marks the moment Starr Park chose ambition over safety.",
        backgroundImage: "/timeline/world-card-1.jpg",
        prompt: "A tranquil shoreline at sunrise with drifting fog and distant mountains.",
        startImage: "/timeline/world-card-1.jpg",
      },
      {
        id: "signal-garden",
        title: "Brawler 1: Colt — The Perfect Employee",
        body: "I wasn’t a fighter back then. I was hired to look good, smile, and follow instructions. Starr Park liked people like me — confident, reliable, easy to market. They said the Gems would help us perform better, think faster, work longer.\n\nAt first, it felt like progress. Then I noticed the changes. My reflexes sharpened. My temper shortened. They called it an upgrade. I didn’t know what it was really turning me into.",
        backgroundImage: "/timeline/world-card-2.jpg",
        prompt: "A luminous garden of bioluminescent plants under a deep twilight sky.",
        startImage: "/timeline/world-card-2.jpg",
      },
      {
        id: "ember-drift",
        title: "Brawler 2: Spike — The First Test",
        body: "They didn’t know what I was supposed to become. I was grown, not hired. Built to see how Gems interacted with living things. I didn’t speak. I didn’t complain. That made me perfect for testing.\n\nWhen things went wrong, they stopped asking questions. They just took notes. I survived because the experiment worked — not because it was safe",
        backgroundImage: "/timeline/world-card-3.jpg",
        prompt: "A cinematic desert canyon lit by ember storms and glowing mineral veins.",
        startImage: "/timeline/world-card-3.jpg",
      },
    ],
  },
  {
    id: "brawl-stars",
    title: "Grand Rebrand",
    subtitle: "3 rooms",
    coverImage: "/timeline/grand-rebrand-cover.jpg",
    roomsLabel: "3 rooms",
    cards: [
      {
        id: "brawl-hero-1",
        title: "1985: Grand Rebrand",
        body: "In 1985, Starr Park returned—louder, brighter, and impossible to ignore. The park embraced spectacle and repetition. Everything was recorded, replayed, and archived on tape. Bold colors, constant music, and endless crowds became part of the experience.\n\nBeneath the cheerful branding, the infrastructure began to strain. New attractions were built over old systems. Experimental power sources were reused instead of replaced. Dust settled into machines still advertised as “cutting edge.” The park looked alive—but only on camera.\n\nThis era marked Starr Park’s transformation into a public machine. Once the tapes started rolling, the image mattered more than reality.",
        backgroundImage: "/timeline/brawl-hero-1.jpg",
        prompt: "A bustling retro theme park with bold colors and camera crews filming crowds.",
        startImage: "/timeline/brawl-hero-1.jpg",
      },
      {
        id: "brawl-hero-2",
        title: "Brawler Card — Bull",
        body: "The park didn’t feel experimental anymore. It felt crowded. Loud. Unstable. When something went wrong, it wasn’t fixed—it was buried. I was assigned to handle problems that weren’t supposed to exist.\n\nThey called it maintenance. Crowd control. Damage prevention. But really, it was about keeping things quiet. If someone saw too much, they didn’t leave angry—they just didn’t leave talking.",
        backgroundImage: "/timeline/brawl-hero-2.jpg",
        prompt: "A tense retro maintenance corridor with flickering lights and security presence.",
        startImage: "/timeline/brawl-hero-2.jpg",
      },
      {
        id: "brawl-hero-3",
        title: "Brawler Card — Poco",
        body: "Music was everywhere in 1985. It played nonstop through speakers that never quite worked right. I was told it kept the crowds moving, distracted, happy.\n\nSometimes the sound distorted. Sometimes it drowned out things I didn’t want to hear. I never asked what it was covering up. I just kept playing. That was my role in the park.",
        backgroundImage: "/timeline/brawl-hero-3.jpg",
        prompt: "A retro stage with glitchy speakers and neon instruments.",
        startImage: "/timeline/brawl-hero-3.jpg",
      },
    ],
  },
  {
    id: "ember-frontier",
    title: "Ember Frontier",
    subtitle: "3 rooms",
    coverImage: "/timeline/ember-frontier-cover.jpg",
    roomsLabel: "3 rooms",
    cards: [
      {
        id: "ember-frontier-1",
        title: "Scorched Ridge",
        body: "Lava veins carve the canyon walls.",
        backgroundImage: "/timeline/ember-bg.svg",
        prompt: "A dramatic canyon with flowing lava and smoky skies.",
        startImage: "/timeline/ember-start.svg",
      },
      {
        id: "ember-frontier-2",
        title: "Ashfall Basin",
        body: "Sparks drift across a silent crater.",
        backgroundImage: "/timeline/ember-bg.svg",
        prompt: "A volcanic basin with glowing embers and swirling ash.",
        startImage: "/timeline/ember-start.svg",
      },
      {
        id: "ember-frontier-3",
        title: "Molten Divide",
        body: "Heat flickers across fractured stone.",
        backgroundImage: "/timeline/ember-bg.svg",
        prompt: "A cinematic volcanic landscape with molten rivers.",
        startImage: "/timeline/ember-start.svg",
      },
    ],
  },
  {
    id: "signal-forest",
    title: "Signal Forest",
    subtitle: "3 rooms",
    coverImage: "/timeline/signal-forest-cover.jpg",
    roomsLabel: "3 rooms",
    cards: [
      {
        id: "signal-forest-1",
        title: "Glade Entry",
        body: "Light pulses through the canopy.",
        backgroundImage: "/timeline/garden-bg.svg",
        prompt: "A bioluminescent forest glade with gentle mist.",
        startImage: "/timeline/garden-start.svg",
      },
      {
        id: "signal-forest-2",
        title: "Neon Hollow",
        body: "The trees hum with quiet energy.",
        backgroundImage: "/timeline/garden-bg.svg",
        prompt: "A twilight forest with glowing flora and soft beams.",
        startImage: "/timeline/garden-start.svg",
      },
      {
        id: "signal-forest-3",
        title: "Lumen Crossing",
        body: "Streams of light guide the path.",
        backgroundImage: "/timeline/garden-bg.svg",
        prompt: "A luminous forest path with flowing light trails.",
        startImage: "/timeline/garden-start.svg",
      },
    ],
  },
];

export function getNextCardIndex(currentIndex: number, length: number): number {
  if (length <= 0) return 0;
  return (currentIndex + 1) % length;
}
