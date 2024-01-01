import { Router } from 'express'
import requestValidator from '../../middlewares/requestValidator'
import { reviewValidationSchema } from './review.validation'
import {
  createReviewController,
  getAllReviewsController,
} from './review.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/',
  auth(USER_ROLE.user),
  requestValidator(reviewValidationSchema),
  createReviewController,
)
router.get('/', getAllReviewsController)

export const ReviewRoute = router
