export interface InitialGame {
  name: string;
  description: string;
  images: {
    cardImage: string;
    contentImage: string;
  };
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

export interface Game extends InitialGame {
  _id: string;
  gameId: string;
  rating: number;
  reviews: string[];
  reviewsCount: number;
  ratingCount: number;
}
