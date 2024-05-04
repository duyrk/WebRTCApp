import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { ICollection } from '@src/interfaces'

const collectionSchema = new mongoose.Schema<ICollection>(
  {
    is_private: { type: Boolean },
    title: { type: String, required: true },
    description: { type: String, required: true },
    animes: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Anime',
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

collectionSchema.plugin(paginate)

interface CollectionDocument extends Document, ICollection {}

export const CollectionModel = mongoose.model<
  CollectionDocument,
  mongoose.PaginateModel<CollectionDocument>
>('Collection', collectionSchema)
