import { validate } from 'email-validator';
import { BadRequestError } from './errors';
import { Game, InitialGame } from './interface';
import {
  AestheticTag,
  AllPlatforms,
  AllTags,
  AudienceTag,
  CloudPlatform,
  ConsolePlatform,
  FeatureTag,
  GameplayTag,
  Genre,
  LegacyPlatform,
  MechanicTag,
  MobilePlatform,
  PCPlatform,
  PerspectiveTag,
  ThemeTag,
} from './enums';

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
  const allowedGenres = Object.values(Genre);

  const invalidGenres = genres.filter(
    (genre) => !allowedGenres.includes(genre as Genre)
  );

  if (invalidGenres.length > 0)
    throw new BadRequestError(`Invalid genres: ${invalidGenres.join(', ')}`);
};

export const validateGameTags = (tags: string[]) => {
  const allowedTags = [
    ...Object.values(GameplayTag),
    ...Object.values(ThemeTag),
    ...Object.values(MechanicTag),
    ...Object.values(PerspectiveTag),
    ...Object.values(AestheticTag),
    ...Object.values(FeatureTag),
    ...Object.values(AudienceTag),
  ];

  const invalidTags = tags.filter(
    (tag) => !allowedTags.includes(tag as AllTags)
  );
  if (invalidTags.length > 0)
    throw new BadRequestError(`Invalid tags: ${invalidTags.join(', ')}`);
};

export const validateGamePlatforms = (platforms: string[]) => {
  const allowedPlatforms = [
    ...Object.values(PCPlatform),
    ...Object.values(ConsolePlatform),
    ...Object.values(MobilePlatform),
    ...Object.values(LegacyPlatform),
    ...Object.values(CloudPlatform),
  ];

  const invalidPlatforms = platforms.filter(
    (platform) => !allowedPlatforms.includes(platform as AllPlatforms)
  );

  if (invalidPlatforms.length > 0)
    throw new BadRequestError(
      `Invalid platforms: ${invalidPlatforms.join(', ')}`
    );
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
