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
    title: "Brawl Archives",
    subtitle: "3 rooms",
    coverImage: "/timeline/dawn-bg.svg",
    roomsLabel: "3 rooms",
    cards: [
      {
        id: "dawn-archive",
        title: "Dawn Archive",
        body: "A quiet arrival. The light is soft, the air is glass, and the world is waiting for a nudge.",
        backgroundImage: "/timeline/dawn-bg.svg",
        prompt: "A tranquil shoreline at sunrise with drifting fog and distant mountains.",
        startImage: "/timeline/dawn-start.svg",
      },
      {
        id: "signal-garden",
        title: "Signal Garden",
        body: "Static blooms into shape. The path is warm and the horizon hums with color.",
        backgroundImage: "/timeline/garden-bg.svg",
        prompt: "A luminous garden of bioluminescent plants under a deep twilight sky.",
        startImage: "/timeline/garden-start.svg",
      },
      {
        id: "ember-drift",
        title: "Ember Drift",
        body: "Heat flickers across steel and sand. The world bends around slow motion sparks.",
        backgroundImage: "/timeline/ember-bg.svg",
        prompt: "A cinematic desert canyon lit by ember storms and glowing mineral veins.",
        startImage: "/timeline/ember-start.svg",
      },
    ],
  },
  {
    id: "brawl-stars",
    title: "Brawl Stars",
    subtitle: "3 rooms",
    coverImage: "/timeline/brawl-hero-1.jpg",
    roomsLabel: "3 rooms",
    cards: [
      {
        id: "brawl-hero-1",
        title: "Inferno Run",
        body: "A blaze of speed and sparks across the arena.",
        backgroundImage: "/timeline/brawl-hero-1.jpg",
        prompt: "A cinematic volcanic arena with bright embers and action-packed motion.",
        startImage: "/timeline/brawl-hero-1.jpg",
      },
      {
        id: "brawl-hero-2",
        title: "Stunt Show",
        body: "Electric arcs and candy-colored chaos.",
        backgroundImage: "/timeline/brawl-hero-2.jpg",
        prompt: "A vibrant carnival arena with neon trails and playful characters.",
        startImage: "/timeline/brawl-hero-2.jpg",
      },
      {
        id: "brawl-hero-3",
        title: "Launch Day",
        body: "The squad storms forward into a radiant skyline.",
        backgroundImage: "/timeline/brawl-hero-3.jpg",
        prompt: "A heroic team sprinting through bright clouds and dynamic light.",
        startImage: "/timeline/brawl-hero-3.jpg",
      },
    ],
  },
  {
    id: "ember-frontier",
    title: "Ember Frontier",
    subtitle: "3 rooms",
    coverImage: "/timeline/ember-bg.svg",
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
    coverImage: "/timeline/garden-bg.svg",
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
