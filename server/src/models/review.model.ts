import { IReview } from '@src/interfaces'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const reviewSchema = new mongoose.Schema<IReview>(
  {
    rating: { type: Number },
    is_delete: { type: Boolean },
    final_content: { type: String },
    origin_content: { type: String },
    is_contain_spoiler: { type: Boolean },
    user_id: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    anime_id: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: 'Anime',
      default: [],
    },
  },
  { timestamps: true },
)

reviewSchema.plugin(paginate)

interface ReviewDocument extends Document, IReview {}

const ReviewModel = mongoose.model<
  ReviewDocument,
  mongoose.PaginateModel<ReviewDocument>
>('Review', reviewSchema)
