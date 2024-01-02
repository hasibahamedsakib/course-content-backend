import { Types } from 'mongoose'

export type TTags = {
  _id: Types.ObjectId
  name: string
  isDeleted: boolean
}

export type TDetails = {
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
}
export type TCreatedByCourse = {
  _id?: string
  username?: string
  email?: string
  role?: string
}
export type TCourse = {
  title: string
  instructor: string
  categoryId: Types.ObjectId
  price: number
  tags: [TTags]
  startDate: string
  endDate: string
  language: string
  provider: string
  durationInWeeks?: number
  details: TDetails
  createdBy: TCreatedByCourse
}
