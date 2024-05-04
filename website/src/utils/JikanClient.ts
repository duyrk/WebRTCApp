import {
  TopClient,
  AnimeClient,
  SeasonsClient,
  JikanClient as OriginJikanClient,
} from '@tutkli/jikan-ts';

export const JikanClient = {
  top: new TopClient(),
  anime: new AnimeClient(),
  season: new SeasonsClient(),
  jikan: new OriginJikanClient(),
} as const;
