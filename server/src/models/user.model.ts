import paginate from 'mongoose-paginate-v2'
import mongoose, { Document } from 'mongoose'

import { IUser } from '@src/interfaces'
import { EProvider, ERole } from '@src/constants'

interface UserDocument extends Document, IUser {
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    provider: {
      type: String,
      enum: EProvider,
      required: true,
      default: EProvider.BASIC_FORM,
    },
    avatar: {
      type: String,
    },
    provider_token: { type: String, default: '' },
    role: { type: String, enum: ERole, required: true, default: ERole.USER },
    collections: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
      ref: 'Collection',
    },
    follower: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
      ref: 'User',
    },
    following: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
      ref: 'User',
    },
    to_watch: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
      ref: 'Anime',
    },
    watched: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
      ref: 'Anime',
    },
    watching: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
      ref: 'Anime',
    },
  },
  {
    timestamps: true,
  },
)

userSchema.plugin(paginate)

export const UserModel = mongoose.model<
  UserDocument,
  mongoose.PaginateModel<UserDocument>
>('User', userSchema)
