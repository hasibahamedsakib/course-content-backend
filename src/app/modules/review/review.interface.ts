import { Types } from 'mongoose'

export type TCreatedBy = {
  _id: string
  username?: string
  email?: string
  role?: string
}
export type TReview = {
  courseId: Types.ObjectId
  rating: number
  review: string
  createdBy: TCreatedBy
}
