import { ObjectId } from 'mongoose'

import {
  JikanImages,
  JikanResource,
  JikanResourceTitle,
  JikanNamedResource,
  JikanResourcePeriod,
  JikanImagesCollection,
  JikanResourceRelation,
} from './jkan'
import {
  ERole,
  EProvider,
  EAnimeType,
  EAnimeStatus,
  EAnimeSeason,
  EAnimeRating,
} from '@src/constants'

export interface IAnimeYoutubeVideo {
  youtube_id: string
  url: string
  embed_url: string
  images?: JikanImagesCollection
}

export interface IAnimeBroadcast {
  day: string
  time: string
  timezone: string
  string: string
}

export interface IAnimeTheme {
  openings: string[]
  endings: string[]
}

export interface IAnime {
  _id?: any
  mal_id: number
  url: string
  images: JikanImages
  trailer: IAnimeYoutubeVideo
  titles: Array<JikanResourceTitle>
  title: string
  title_english: string
  title_japanese: string
  title_synonyms: Array<string>
  type: EAnimeType
  source: string
  episodes: number
  status: EAnimeStatus
  airing: boolean
  aired: JikanResourcePeriod
  duration: string
  rating: EAnimeRating
  score: number
  scored_by: number
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  season?: EAnimeSeason
  year: number
  broadcast: IAnimeBroadcast
  producers: Array<JikanResource>
  licensors: Array<JikanResource>
  studios: Array<JikanResource>
  genres: Array<JikanResource>
  explicit_genres: Array<JikanResource>
  themes: Array<JikanResource>
  demographics: Array<JikanResource>
  relations?: Array<JikanResourceRelation>
  theme?: IAnimeTheme
  external?: Array<JikanNamedResource>
  streaming: Array<JikanNamedResource>
}

export interface IEpisode {
  mal_id: number
  url: string
  title: string
  title_japanese: string
  title_romanji: string
  duration: number
  aired: string
  filler: boolean
  recap: boolean
  forum_url: string
}

export interface IUser {
  _id?: any
  username: string
  email: string
  password: string
  avatar: string,
  provider: EProvider
  provider_token?: string
  collections: Array<ObjectId>
  watched: Array<ObjectId>
  watching: Array<ObjectId>
  to_watch: Array<ObjectId>
  follower: Array<ObjectId>
  following: Array<ObjectId>
  role: ERole
}

export interface IReview {
  _id?: any
  user_id: any
  anime_id: any
  origin_content: string
  final_content: string
  rating: number
  is_contain_spoiler: boolean
  is_delete: boolean
}

export interface INews {
  _id?: any
  title: string
  content: string
  view_amount: number
  anime_ids: Array<ObjectId>
}

export interface ICollection {
  _id?: any
  title: string
  description: string
  is_private: boolean
  animes: Array<ObjectId>
}
