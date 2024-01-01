import { JwtPayload } from 'jsonwebtoken'
import { TReview } from './review.interface'
import { Review } from './review.model'

// Create a Review
const createReviewIntoDB = async (
  requestUser: JwtPayload,
  payload: TReview,
) => {
  payload.createdBy = {
    _id: requestUser._id,
    username: requestUser.username,
    email: requestUser.email,
    role: requestUser.role,
  }
  const result = await Review.create(payload)
  return result
}

// get All Course
const getAllReviewsFromDB = async () => {
  const result = await Review.find()
  return result
}
export { createReviewIntoDB, getAllReviewsFromDB }
