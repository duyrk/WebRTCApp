// user schema
export enum EProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  BASIC_FORM = 'basic_form',
}
export enum ERole {
  USER = 'user',
  ADMIN = 'admin',
}
// end user schema

// anime schema
export enum EAnimeType {
  TV = 'TV',
  MOVIE = 'Movie',
  OVA = 'Ova',
  SPECIAL = 'Special',
  ONA = 'Ona',
  MUSIC = 'Music',
}

export enum EAnimeStatus {
  FINISHED = 'Finished Airing',
  AIRING = 'Currently Airing',
  COMPLETE = 'Complete',
}

export enum EAnimeRating {
  G = 'g',
  PG = 'pg',
  PG13 = 'pg13',
  R17 = 'r17',
  R = 'r',
  RX = 'rx',
}

export enum EAnimeSeason {
  SPRING = 'spring',
  SUMMER = 'summer',
  FALL = 'fall',
  WINTER = 'winter',
}
// end anime schema
