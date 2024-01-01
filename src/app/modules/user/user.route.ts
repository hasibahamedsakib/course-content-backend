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
import { USER_ROLE } from './user.constant'
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
  auth(USER_ROLE.user, USER_ROLE.admin),
  requestValidator(changePasswordValidationSchema),
  changePasswordController,
)

export const UserRoute = router
