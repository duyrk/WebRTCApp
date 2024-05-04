import { AnimeType } from '@tutkli/jikan-ts';

interface ITableFilter {
  title?: string;
  type?: AnimeType;
  genres?: string[];
}
