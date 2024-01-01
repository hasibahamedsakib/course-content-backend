import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
} from './category.service'

// create a new category
const createCategoryController = catchAsync(async (req, res) => {
  const result = await createCategoryIntoDB(req.user, req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  })
})

// Get All Categories
const getAllCategoriesController = catchAsync(async (req, res) => {
  const result = await getAllCategoriesFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  })
})

export { createCategoryController, getAllCategoriesController }
