import { validate } from 'email-validator';
import { BadRequestError } from './errors';
import { Game, InitialGame } from './interface';

export const validateGameName = (name: string) => {
  if (/[^a-zA-Z0-9_\-',\.\s]/.test(name))
    throw new Error('Game name contains invalid characters ...');

  const len = name.length;
  if (len < 3 || len > 100)
    throw new Error(
      'Game name has to be within 3 and 100 characters in length'
    );
};

export const validateGameDescription = (description: string) => {
  const len = description.length;
  if (len > 1000)
    throw new Error(
      'Game description is too long, has to be less than 1000 characters'
    );
};

export const validateGameGenres = (genres: string[]) => {
  const allowedGenres = [
    'Simulation',
    'Fighting',
    'Puzzle',
    'Adventure',
    'Sandbox',
    'Shooter',
    'Sports',
    'RPG',
    'Survival',
    'Action-Adventure',
    'Platformer',
    'Racing',
    'Action',
    'Casual',
    'FPS',
    'MMO',
    'MOBA',
    'Strategy',
    'Party',
    'RTS',
    'Stealth',
    'Tactical',
    'Turn-Based',
    'Card Game',
    'Idle',
    'Metroidvania',
    'Roguelike',
    'Roguelite',
    'Visual Novel',
    'Horror',
    'Narrative',
    'Music',
    'Rhythm',
    'Trivia',
    'Board Game',
    'Education',
    'Arcade',
    'Open World',
    'Bullet Hell',
    'Third-Person Shooter',
    'Top-Down Shooter',
    "Beat 'em Up",
    'Tower Defense',
    'City Builder',
    'Dating Sim',
    'Tycoon',
    '4X',
    'MMORPG',
    'Battle Royale',
    'Dungeon Crawler',
    'Text-Based',
    'Experimental',
    'Art Game',
    'Interactive Fiction',
    'Anime',
  ];

  if (genres.some((genre) => !allowedGenres.includes(genre)))
    throw new BadRequestError(`This game contains an invalid genre`);
};

export const validateGameTags = (tags: string[]) => {
  const allowedTags = [
    // Gameplay Style
    'Multiplayer',
    'Singleplayer',
    'Co-op',
    'Online Co-op',
    'Local Co-op',
    'PvP',
    'PvE',
    'Split Screen',
    'Controller Support',
    'Cross-Platform',
    'Replayability',

    // Tone & Theme
    'Dark',
    'Funny',
    'Narrative',
    'Emotional',
    'Atmospheric',
    'Sci-Fi',
    'Fantasy',
    'Cyberpunk',
    'Post-Apocalyptic',
    'Historical',
    'Modern',
    'Medieval',
    'Pixel Art',
    'Cartoon',
    'Realistic',
    'Anime',

    // Mechanics
    'Open World',
    'Exploration',
    'Base Building',
    'Crafting',
    'Loot',
    'Leveling',
    'Upgrades',
    'Resource Management',
    'Permadeath',
    'Physics-Based',
    'Turn-Based',
    'Real-Time',
    'Time Management',
    'Stealth',
    'Tactical',
    'Deckbuilding',

    // Perspective
    'First-Person',
    'Third-Person',
    'Top-Down',
    'Isometric',
    'Side-Scroller',
    '2D',
    '3D',
    'VR',

    // Visual/Audio
    'Minimalist',
    'Beautiful',
    'Cinematic',
    'Stylized',
    'Voice Acting',
    'Dynamic Soundtrack',
    'Ambient Music',

    // Special Features
    'Early Access',
    'Moddable',
    'Achievements',
    'Procedural Generation',
    'Sandbox Mode',
    'Story Rich',
    'Short Game',
    'Long Campaign',
    'Multiple Endings',
    'Choices Matter',
    'Hardcore',
    'Speedrun Friendly',

    // Audience
    'Family Friendly',
    'Mature',
    'Casual',
    'Competitive',
    'Educational',
    'Accessibility Features',
  ];
  if (tags.some((tag) => !allowedTags.includes(tag)))
    throw new BadRequestError('This game contains an invalid tag');
};

export const validateGamePlatforms = (platforms: string[]) => {
  const pcPlatforms = [
    'Windows',
    'macOS',
    'Linux',
    'Steam',
    'Epic Games Store',
    'GOG',
    'Origin',
    'Battle.net',
    'Ubisoft Connect',
    'Microsoft Store',
    'Itch.io',
  ];

  const consolePlatforms = [
    'PlayStation 5',
    'PlayStation 4',
    'PlayStation 3',
    'Xbox Series X|S',
    'Xbox One',
    'Xbox 360',
    'Nintendo Switch',
    'Wii U',
    'Wii',
    'GameCube',
    'Nintendo 64',
    'PlayStation Vita',
    'PlayStation Portable (PSP)',
  ];
  const mobilePlatforms = [
    'iOS',
    'Android',
    'Apple Arcade',
    'Google Play',
    'Amazon Appstore',
  ];

  const legacyPlatforms = [
    'Nintendo 3DS',
    'Nintendo DS',
    'Game Boy Advance',
    'Game Boy',
    'Sega Genesis',
    'Dreamcast',
    'SNES',
    'NES',
    'Atari 2600',
  ];

  const cloudPlatforms = [
    'GeForce NOW',
    'Xbox Cloud Gaming (xCloud)',
    'PlayStation Now',
    'Amazon Luna',
    'Google Stadia (discontinued)',
    'NVIDIA Shield',
  ];

  const allowedPlatforms = [
    ...pcPlatforms,
    ...consolePlatforms,
    ...mobilePlatforms,
    ...legacyPlatforms,
    ...cloudPlatforms,
  ];

  if (platforms.some((platform) => !allowedPlatforms.includes(platform)))
    throw new BadRequestError('This game contains an invalid platform');
};

export const validateGamePrice = (priceCents: number) => {
  if (priceCents < 0)
    throw new BadRequestError("This game' price can not be a negative number");
};

export const validateGame = (game: InitialGame) => {
  validateGameName(game.name);
  validateGameDescription(game.description);
  validateGameGenres(game.genres);
  validateGameTags(game.tags);
  validateGamePlatforms(game.platforms);
  validateGamePrice(game.priceCents);
};
