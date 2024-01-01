import { JwtPayload } from 'jsonwebtoken'
import { TCategory } from './category.interface'
import { Category } from './category.model'

// create category
const createCategoryIntoDB = async (user: JwtPayload, payload: TCategory) => {
  payload.createdBy = user._id
  const result = await Category.create(payload)
  return result
}

// Get All Categories
const getAllCategoriesFromDB = async () => {
  const result = await Category.find().populate({
    path: 'createdBy',
    select: ['-createdAt', '-updatedAt', '-__v'],
  })

  return result
}

export { createCategoryIntoDB, getAllCategoriesFromDB }
