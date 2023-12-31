import express from 'express'
import { createUserController, loginUserController } from './user.controller'
import requestValidator from '../../middlewares/requestValidator'
import {
  createUserValidationSchema,
  loginUserValidationSchema,
} from './user.validation'
const router = express.Router()

router.post(
  '/register',
  requestValidator(createUserValidationSchema),
  createUserController,
)
// login
router.post(
  '/login',
  requestValidator(loginUserValidationSchema),
  loginUserController,
)

export const UserRoute = router
