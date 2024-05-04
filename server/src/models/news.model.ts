import { INews } from '@src/interfaces'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const newsSchema = new mongoose.Schema<INews>(
  {
    content: { type: String },
    title: { type: String, required: true },
    view_amount: { type: Number, default: 0 },
    anime_ids: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Anime',
      default: [],
    },
  },
  { timestamps: true },
)

newsSchema.plugin(paginate)

interface NewsDocument extends Document, INews {}

export const NewsModel = mongoose.model<
  NewsDocument,
  mongoose.PaginateModel<NewsDocument>
>('News', newsSchema)
