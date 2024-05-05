import { TokenService } from './TokenService';
import { CookieService } from './CookieService';
import { PokemonService } from '@services/PokemonService';

export { TokenService, CookieService, PokemonService };

export interface DefaultResponse {
  message: string;
  code: number;
}
