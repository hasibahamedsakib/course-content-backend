import { Router } from 'express'
import requestValidator from '../../middlewares/requestValidator'
import { reviewValidationSchema } from './review.validation'
import {
  createReviewController,
  getAllReviewsController,
} from './review.controller'

const router = Router()

router.post(
  '/',
  requestValidator(reviewValidationSchema),
  createReviewController,
)
router.get('/', getAllReviewsController)

export const ReviewRoute = router
