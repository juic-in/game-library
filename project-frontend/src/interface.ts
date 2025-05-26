export interface InitialGame {
  name: string;
  description: string;
  image: string;
  releaseDate: Date;
  priceCents: number;
  developers: string[];
  publishers: string[];
  genres: string[];
  platforms: string[];
  tags: string[];
}

export interface GameRef {
  gameId: string;
  name: string;
}
