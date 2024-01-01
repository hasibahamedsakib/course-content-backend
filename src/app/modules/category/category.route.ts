import express from 'express'
import {
  createCategoryController,
  getAllCategoriesController,
} from './category.controller'
import requestValidator from '../../middlewares/requestValidator'
import { categoryValidationSchema } from './category.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

// creating a category
router.post(
  '/',
  auth(USER_ROLE.admin),
  requestValidator(categoryValidationSchema),
  createCategoryController,
)
// get all category
router.get('/', getAllCategoriesController)

export const CategoryRoute = router
