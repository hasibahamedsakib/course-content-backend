import { JwtPayload } from 'jsonwebtoken'
import { TCreatedBy, TReview } from './review.interface'
import { Review } from './review.model'
import { User } from '../user/user.model'

// Create a Review
const createReviewIntoDB = async (
  requestUser: JwtPayload,
  payload: TReview,
) => {
  const user = await User.isUserExistByEmail(requestUser.email)
  const createdByData: TCreatedBy = {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  }

  payload.createdBy = createdByData
  const result = await Review.create(payload)
  return result
}

// get All Course
const getAllReviewsFromDB = async () => {
  const result = await Review.find()
  return result
}
export { createReviewIntoDB, getAllReviewsFromDB }
