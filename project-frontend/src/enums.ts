export enum Genre {
  Action = 'Action',
  ActionAdventure = 'Action-Adventure',
  Adventure = 'Adventure',
  Anime = 'Anime',
  Arcade = 'Arcade',
  ArtGame = 'Art Game',
  BattleRoyale = 'Battle Royale',
  BeatEmUp = "Beat 'em Up",
  BoardGame = 'Board Game',
  BulletHell = 'Bullet Hell',
  CardGame = 'Card Game',
  Casual = 'Casual',
  CityBuilder = 'City Builder',
  DatingSim = 'Dating Sim',
  DungeonCrawler = 'Dungeon Crawler',
  Education = 'Education',
  Experimental = 'Experimental',
  Fighting = 'Fighting',
  FourX = '4X',
  FPS = 'FPS',
  Horror = 'Horror',
  Idle = 'Idle',
  InteractiveFiction = 'Interactive Fiction',
  MMO = 'MMO',
  MOBA = 'MOBA',
  MMORPG = 'MMORPG',
  Metroidvania = 'Metroidvania',
  Music = 'Music',
  Narrative = 'Narrative',
  OpenWorld = 'Open World',
  Party = 'Party',
  Platformer = 'Platformer',
  Puzzle = 'Puzzle',
  Racing = 'Racing',
  Rhythm = 'Rhythm',
  Roguelike = 'Roguelike',
  Roguelite = 'Roguelite',
  RPG = 'RPG',
  Sandbox = 'Sandbox',
  Shooter = 'Shooter',
  Sports = 'Sports',
  Stealth = 'Stealth',
  Strategy = 'Strategy',
  Survival = 'Survival',
  Tactical = 'Tactical',
  TextBased = 'Text-Based',
  ThirdPersonShooter = 'Third-Person Shooter',
  TopDownShooter = 'Top-Down Shooter',
  TowerDefense = 'Tower Defense',
  Trivia = 'Trivia',
  TurnBased = 'Turn-Based',
  Tycoon = 'Tycoon',
  VisualNovel = 'Visual Novel',
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
  ControllerSupport = 'Controller Support',
  CoOp = 'Co-op',
  CrossPlatform = 'Cross-Platform',
  LocalCoOp = 'Local Co-op',
  Multiplayer = 'Multiplayer',
  OnlineCoOp = 'Online Co-op',
  PvE = 'PvE',
  PvP = 'PvP',
  Replayability = 'Replayability',
  Singleplayer = 'Singleplayer',
  SplitScreen = 'Split Screen',
}

// Tone & Theme
export enum ThemeTag {
  Anime = 'Anime',
  Atmospheric = 'Atmospheric',
  Cartoon = 'Cartoon',
  Cyberpunk = 'Cyberpunk',
  Dark = 'Dark',
  Emotional = 'Emotional',
  Fantasy = 'Fantasy',
  Funny = 'Funny',
  Historical = 'Historical',
  Medieval = 'Medieval',
  Modern = 'Modern',
  Narrative = 'Narrative',
  PixelArt = 'Pixel Art',
  PostApocalyptic = 'Post-Apocalyptic',
  Realistic = 'Realistic',
  SciFi = 'Sci-Fi',
}

// Mechanics
export enum MechanicTag {
  BaseBuilding = 'Base Building',
  Crafting = 'Crafting',
  Deckbuilding = 'Deckbuilding',
  Exploration = 'Exploration',
  Leveling = 'Leveling',
  Loot = 'Loot',
  OpenWorld = 'Open World',
  Permadeath = 'Permadeath',
  PhysicsBased = 'Physics-Based',
  RealTime = 'Real-Time',
  ResourceManagement = 'Resource Management',
  Stealth = 'Stealth',
  Tactical = 'Tactical',
  TimeManagement = 'Time Management',
  TurnBased = 'Turn-Based',
  Upgrades = 'Upgrades',
}

// Perspective
export enum PerspectiveTag {
  FirstPerson = 'First-Person',
  Isometric = 'Isometric',
  SideScroller = 'Side-Scroller',
  ThirdPerson = 'Third-Person',
  ThreeD = '3D',
  TopDown = 'Top-Down',
  TwoD = '2D',
  VR = 'VR',
}

// Visual/Audio
export enum AestheticTag {
  AmbientMusic = 'Ambient Music',
  Beautiful = 'Beautiful',
  Cinematic = 'Cinematic',
  DynamicSoundtrack = 'Dynamic Soundtrack',
  Minimalist = 'Minimalist',
  Stylized = 'Stylized',
  VoiceActing = 'Voice Acting',
}

// Special Features
export enum FeatureTag {
  Achievements = 'Achievements',
  ChoicesMatter = 'Choices Matter',
  EarlyAccess = 'Early Access',
  Hardcore = 'Hardcore',
  LongCampaign = 'Long Campaign',
  Moddable = 'Moddable',
  MultipleEndings = 'Multiple Endings',
  ProceduralGeneration = 'Procedural Generation',
  SandboxMode = 'Sandbox Mode',
  ShortGame = 'Short Game',
  SpeedrunFriendly = 'Speedrun Friendly',
  StoryRich = 'Story Rich',
}

// Audience
export enum AudienceTag {
  AccessibilityFeatures = 'Accessibility Features',
  Casual = 'Casual',
  Competitive = 'Competitive',
  Educational = 'Educational',
  FamilyFriendly = 'Family Friendly',
  Mature = 'Mature',
}

export type AllPlatforms =
  | PCPlatform
  | ConsolePlatform
  | MobilePlatform
  | LegacyPlatform
  | CloudPlatform;

// PC Platforms
export enum PCPlatform {
  Battlenet = 'Battle.net',
  EpicGamesStore = 'Epic Games Store',
  GOG = 'GOG',
  ItchIo = 'Itch.io',
  Linux = 'Linux',
  macOS = 'macOS',
  MicrosoftStore = 'Microsoft Store',
  Origin = 'Origin',
  Steam = 'Steam',
  UbisoftConnect = 'Ubisoft Connect',
  Windows = 'Windows',
}

// Console Platforms
export enum ConsolePlatform {
  GameCube = 'GameCube',
  Nintendo64 = 'Nintendo 64',
  NintendoSwitch = 'Nintendo Switch',
  PSP = 'PlayStation Portable (PSP)',
  PlayStation3 = 'PlayStation 3',
  PlayStation4 = 'PlayStation 4',
  PlayStation5 = 'PlayStation 5',
  PlayStationVita = 'PlayStation Vita',
  Wii = 'Wii',
  WiiU = 'Wii U',
  Xbox360 = 'Xbox 360',
  XboxOne = 'Xbox One',
  XboxSeriesXS = 'Xbox Series X|S',
}

// Mobile Platforms
export enum MobilePlatform {
  AmazonAppstore = 'Amazon Appstore',
  Android = 'Android',
  AppleArcade = 'Apple Arcade',
  GooglePlay = 'Google Play',
  iOS = 'iOS',
}

// Legacy Platforms
export enum LegacyPlatform {
  Atari2600 = 'Atari 2600',
  Dreamcast = 'Dreamcast',
  GameBoy = 'Game Boy',
  GameBoyAdvance = 'Game Boy Advance',
  NES = 'NES',
  Nintendo3DS = 'Nintendo 3DS',
  NintendoDS = 'Nintendo DS',
  SNES = 'SNES',
  SegaGenesis = 'Sega Genesis',
}

// Cloud Platforms
export enum CloudPlatform {
  AmazonLuna = 'Amazon Luna',
  GeForceNow = 'GeForce NOW',
  GoogleStadia = 'Google Stadia (discontinued)',
  NvidiaShield = 'NVIDIA Shield',
  PlayStationNow = 'PlayStation Now',
  XboxCloudGaming = 'Xbox Cloud Gaming (xCloud)',
}
