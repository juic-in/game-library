export interface User {
  userId: string;
  email: string;
  nameFirst: string;
  nameLast: string;
  ownedGames: UserOwnedGameData[];
  wishlist: UserWishedGameData[];
  friends: User[];
  timeJoined: number;
  lastLogin: number;
  profilePicture?: string;
  description?: string;
}

export interface InitialGame {
  name: string;
  description: string;
  image: string;
  releaseDate: string;
  priceCents: number;
  developer: string;
  publisher: string;
  genres: string[];
  platforms: string[];
  tags: string[];
}

export interface Game extends InitialGame {
  gameId: string;
  rating: number;
  reviews: string[];
  reviewsCount: number;
  ratingCount: number;
}

export interface GameId {
  gameId: string;
}

export interface Session {
  sessionId: string;
  userId: string;
  token: string;
  expires: number;
  timeLoggedIn: number;
}

export interface DataStore {
  users: User[];
  games: Game[];
  sessions: Session[];
}

export interface UserProfile {
  nameFirst: string;
  nameLast: string;
  email: string;
  ownedGames: Game[];
  wishlist: Game[];
  friends: User[];
}

export interface UserOwnedGameData {
  gameId: string;
  name: string;
  description: string;
  timeOwned: number;
  playtime?: number;
  lastPlayed?: number;
  rating?: number;
  reviews?: string[];
}

export interface UserWishedGameData {
  gameId: string;
  name: string;
  description: string;
  timeWishListed: number;
  reviews: undefined;
}
