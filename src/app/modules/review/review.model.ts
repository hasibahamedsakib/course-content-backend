import { Schema, model } from 'mongoose'
import { TReview } from './review.interface'

const reviewSchema = new Schema<TReview>({
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
})

export const Review = model('Review', reviewSchema)
