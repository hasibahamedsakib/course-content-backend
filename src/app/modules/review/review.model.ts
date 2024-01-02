import { Schema, model } from 'mongoose'
import { TCreatedBy, TReview } from './review.interface'

export const createdBySchema = new Schema<TCreatedBy>({
  _id: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
})

const reviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    rating: {
      type: Number,
      require: true,
    },
    review: {
      type: String,
      require: true,
    },
    createdBy: {
      type: createdBySchema,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

export const Review = model<TReview>('Review', reviewSchema)
