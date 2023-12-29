import express from 'express'
import {
  createCategoryController,
  getAllCategoriesController,
} from './category.controller'
import requestValidator from '../../middlewares/requestValidator'
import { categoryValidationSchema } from './category.validation'

const router = express.Router()

// creating a category
router.post(
  '/',
  requestValidator(categoryValidationSchema),
  createCategoryController,
)
// get all category
router.get('/', getAllCategoriesController)

export const CategoryRoute = router
