export enum Genre {
  Simulation = 'Simulation',
  Fighting = 'Fighting',
  Puzzle = 'Puzzle',
  Adventure = 'Adventure',
  Sandbox = 'Sandbox',
  Shooter = 'Shooter',
  Sports = 'Sports',
  RPG = 'RPG',
  Survival = 'Survival',
  ActionAdventure = 'Action-Adventure',
  Platformer = 'Platformer',
  Racing = 'Racing',
  Action = 'Action',
  Casual = 'Casual',
  FPS = 'FPS',
  MMO = 'MMO',
  MOBA = 'MOBA',
  Strategy = 'Strategy',
  Party = 'Party',
  RTS = 'RTS',
  Stealth = 'Stealth',
  Tactical = 'Tactical',
  TurnBased = 'Turn-Based',
  CardGame = 'Card Game',
  Idle = 'Idle',
  Metroidvania = 'Metroidvania',
  Roguelike = 'Roguelike',
  Roguelite = 'Roguelite',
  VisualNovel = 'Visual Novel',
  Horror = 'Horror',
  Narrative = 'Narrative',
  Music = 'Music',
  Rhythm = 'Rhythm',
  Trivia = 'Trivia',
  BoardGame = 'Board Game',
  Education = 'Education',
  Arcade = 'Arcade',
  OpenWorld = 'Open World',
  BulletHell = 'Bullet Hell',
  ThirdPersonShooter = 'Third-Person Shooter',
  TopDownShooter = 'Top-Down Shooter',
  BeatEmUp = "Beat 'em Up",
  TowerDefense = 'Tower Defense',
  CityBuilder = 'City Builder',
  DatingSim = 'Dating Sim',
  Tycoon = 'Tycoon',
  FourX = '4X',
  MMORPG = 'MMORPG',
  BattleRoyale = 'Battle Royale',
  DungeonCrawler = 'Dungeon Crawler',
  TextBased = 'Text-Based',
  Experimental = 'Experimental',
  ArtGame = 'Art Game',
  InteractiveFiction = 'Interactive Fiction',
  Anime = 'Anime',
}

export type AllTags =
  | GameplayTag
  | ThemeTag
  | MechanicTag
  | PerspectiveTag
  | AestheticTag
  | FeatureTag
  | AudienceTag;

// Gameplay Style
export enum GameplayTag {
  Multiplayer = 'Multiplayer',
  Singleplayer = 'Singleplayer',
  CoOp = 'Co-op',
  OnlineCoOp = 'Online Co-op',
  LocalCoOp = 'Local Co-op',
  PvP = 'PvP',
  PvE = 'PvE',
  SplitScreen = 'Split Screen',
  ControllerSupport = 'Controller Support',
  CrossPlatform = 'Cross-Platform',
  Replayability = 'Replayability',
}

// Tone & Theme
export enum ThemeTag {
  Dark = 'Dark',
  Funny = 'Funny',
  Narrative = 'Narrative',
  Emotional = 'Emotional',
  Atmospheric = 'Atmospheric',
  SciFi = 'Sci-Fi',
  Fantasy = 'Fantasy',
  Cyberpunk = 'Cyberpunk',
  PostApocalyptic = 'Post-Apocalyptic',
  Historical = 'Historical',
  Modern = 'Modern',
  Medieval = 'Medieval',
  PixelArt = 'Pixel Art',
  Cartoon = 'Cartoon',
  Realistic = 'Realistic',
  Anime = 'Anime',
}

// Mechanics
export enum MechanicTag {
  OpenWorld = 'Open World',
  Exploration = 'Exploration',
  BaseBuilding = 'Base Building',
  Crafting = 'Crafting',
  Loot = 'Loot',
  Leveling = 'Leveling',
  Upgrades = 'Upgrades',
  ResourceManagement = 'Resource Management',
  Permadeath = 'Permadeath',
  PhysicsBased = 'Physics-Based',
  TurnBased = 'Turn-Based',
  RealTime = 'Real-Time',
  TimeManagement = 'Time Management',
  Stealth = 'Stealth',
  Tactical = 'Tactical',
  Deckbuilding = 'Deckbuilding',
}

// Perspective
export enum PerspectiveTag {
  FirstPerson = 'First-Person',
  ThirdPerson = 'Third-Person',
  TopDown = 'Top-Down',
  Isometric = 'Isometric',
  SideScroller = 'Side-Scroller',
  TwoD = '2D',
  ThreeD = '3D',
  VR = 'VR',
}

// Visual/Audio
export enum AestheticTag {
  Minimalist = 'Minimalist',
  Beautiful = 'Beautiful',
  Cinematic = 'Cinematic',
  Stylized = 'Stylized',
  VoiceActing = 'Voice Acting',
  DynamicSoundtrack = 'Dynamic Soundtrack',
  AmbientMusic = 'Ambient Music',
}

// Special Features
export enum FeatureTag {
  EarlyAccess = 'Early Access',
  Moddable = 'Moddable',
  Achievements = 'Achievements',
  ProceduralGeneration = 'Procedural Generation',
  SandboxMode = 'Sandbox Mode',
  StoryRich = 'Story Rich',
  ShortGame = 'Short Game',
  LongCampaign = 'Long Campaign',
  MultipleEndings = 'Multiple Endings',
  ChoicesMatter = 'Choices Matter',
  Hardcore = 'Hardcore',
  SpeedrunFriendly = 'Speedrun Friendly',
}

// Audience
export enum AudienceTag {
  FamilyFriendly = 'Family Friendly',
  Mature = 'Mature',
  Casual = 'Casual',
  Competitive = 'Competitive',
  Educational = 'Educational',
  AccessibilityFeatures = 'Accessibility Features',
}

export type AllPlatforms =
  | PCPlatform
  | ConsolePlatform
  | MobilePlatform
  | LegacyPlatform
  | CloudPlatform;

// PC Platforms
export enum PCPlatform {
  Windows = 'Windows',
  macOS = 'macOS',
  Linux = 'Linux',
  Steam = 'Steam',
  EpicGamesStore = 'Epic Games Store',
  GOG = 'GOG',
  Origin = 'Origin',
  Battlenet = 'Battle.net',
  UbisoftConnect = 'Ubisoft Connect',
  MicrosoftStore = 'Microsoft Store',
  ItchIo = 'Itch.io',
}

// Console Platforms
export enum ConsolePlatform {
  PlayStation5 = 'PlayStation 5',
  PlayStation4 = 'PlayStation 4',
  PlayStation3 = 'PlayStation 3',
  XboxSeriesXS = 'Xbox Series X|S',
  XboxOne = 'Xbox One',
  Xbox360 = 'Xbox 360',
  NintendoSwitch = 'Nintendo Switch',
  WiiU = 'Wii U',
  Wii = 'Wii',
  GameCube = 'GameCube',
  Nintendo64 = 'Nintendo 64',
  PlayStationVita = 'PlayStation Vita',
  PSP = 'PlayStation Portable (PSP)',
}

// Mobile Platforms
export enum MobilePlatform {
  iOS = 'iOS',
  Android = 'Android',
  AppleArcade = 'Apple Arcade',
  GooglePlay = 'Google Play',
  AmazonAppstore = 'Amazon Appstore',
}

// Legacy Platforms
export enum LegacyPlatform {
  Nintendo3DS = 'Nintendo 3DS',
  NintendoDS = 'Nintendo DS',
  GameBoyAdvance = 'Game Boy Advance',
  GameBoy = 'Game Boy',
  SegaGenesis = 'Sega Genesis',
  Dreamcast = 'Dreamcast',
  SNES = 'SNES',
  NES = 'NES',
  Atari2600 = 'Atari 2600',
}

// Cloud Platforms
export enum CloudPlatform {
  GeForceNow = 'GeForce NOW',
  XboxCloudGaming = 'Xbox Cloud Gaming (xCloud)',
  PlayStationNow = 'PlayStation Now',
  AmazonLuna = 'Amazon Luna',
  GoogleStadia = 'Google Stadia (discontinued)',
  NvidiaShield = 'NVIDIA Shield',
}
