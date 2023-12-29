import { TReview } from './review.interface'
import { Review } from './review.model'

// Create a Review
const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload)
  return result
}

// get All Course
const getAllCourseFromDB = async () => {
  const result = await Review.find()
  return result
}
export { createReviewIntoDB, getAllCourseFromDB }
