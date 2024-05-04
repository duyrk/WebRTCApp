import paginate from 'mongoose-paginate-v2'
import mongoose, { Document } from 'mongoose'

import { IAnime } from '@src/interfaces'
import { EAnimeType } from '@src/constants'

const animeSchema = new mongoose.Schema<IAnime>(
  {
    url: { type: String, required: true },
    rank: { type: Number, required: true },
    title: { type: String, required: true },
    score: { type: Number, required: true },
    mal_id: { type: Number, required: true },
    synopsis: { type: String, required: true },
    background: { type: String, required: true },
    title_english: { type: String, required: true },
    title_synonyms: { type: [String], default: [] },
    title_japanese: { type: String, required: true },
    type: { type: String, enum: EAnimeType, default: EAnimeType.TV },
  },
  { timestamps: true },
)

animeSchema.plugin(paginate)

interface AnimeDocument extends Document, IAnime {}

export const AnimeModel = mongoose.model<
  AnimeDocument,
  mongoose.PaginateModel<AnimeDocument>
>('Anime', animeSchema)
