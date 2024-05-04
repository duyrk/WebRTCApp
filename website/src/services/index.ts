import { CookieService } from './CookieService';
import { PokemonService } from '@services/PokemonService';
import { AuthService } from './AuthService';

export { CookieService, PokemonService, AuthService };

export interface DefaultResponse {
  message: string;
  code: number;
}

export const genFunction =
  <ResType>(func: Promise<ResType>) =>
  (context: any) =>
    func;
