export interface User {
  userId: number;
  email: string;
  session: string[];
  nameFirst: string;
  nameLast: string;
  ownedGames: Game[];
}

export interface Game {
  gameId: number;
  owned: boolean;
  rating?: number;
  
}
