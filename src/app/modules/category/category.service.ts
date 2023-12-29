import { TCategory } from './category.interface'
import { Category } from './category.model'

// create category
const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload)
  return result
}

// Get All Categories
const getAllCategoriesFromDB = async () => {
  const result = await Category.find()
  return result
}

export { createCategoryIntoDB, getAllCategoriesFromDB }
