/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import {
  changePasswordService,
  createUserIntoDB,
  loginUserService,
} from './user.service'

const createUserController = catchAsync(async (req, res) => {
  const result = await createUserIntoDB(req.body)

  const convertObj = result.toObject()
  const { password, ...another } = convertObj
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: another,
  })
})

const loginUserController = catchAsync(async (req, res) => {
  const result = await loginUserService(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successful',
    data: result,
  })
})
const changePasswordController = catchAsync(async (req, res) => {
  const result = await changePasswordService(req.user, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password changed successfully',
    data: result,
  })
})

export { createUserController, loginUserController, changePasswordController }
