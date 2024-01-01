import express from 'express'
import {
  changePasswordController,
  createUserController,
  loginUserController,
} from './user.controller'
import requestValidator from '../../middlewares/requestValidator'
import {
  createUserValidationSchema,
  loginUserValidationSchema,
  changePasswordValidationSchema,
} from './user.validation'
import auth from '../../middlewares/auth'
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
// change password
router.post(
  '/change-password',
  auth(),
  requestValidator(changePasswordValidationSchema),
  changePasswordController,
)

export const UserRoute = router
