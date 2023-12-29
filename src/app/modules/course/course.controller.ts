import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import {
  createCourseIntoDB,
  getAllCourseFromDB,
  getBestCourseFromDB,
  getSingleCourseFromDB,
  getSingleCourseFromReviewDB,
  updateCourseIntoDB,
} from './course.service'

// create new course controller
const createCourseController = catchAsync(async (req, res) => {
  const result = await createCourseIntoDB(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  })
})

// get all course controller
const getAllCourseController = catchAsync(async (req, res) => {
  const { result, meta } = await getAllCourseFromDB(req.query)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    meta: meta,
    data: result,
  })
})

// get single course controller
const getSingleCourseController = catchAsync(async (req, res) => {
  const result = await getSingleCourseFromDB(req.params.id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course retrieved successfully',
    data: result,
  })
})

// get Single Course From Review collection.
const getSingleCourseFromReviewController = catchAsync(async (req, res) => {
  const result = await getSingleCourseFromReviewDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  })
})
// get Single Course From Review collection.
const getBestCourseController = catchAsync(async (req, res) => {
  const result = await getBestCourseFromDB()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: result,
  })
})

//  update single course
const updateCourseController = catchAsync(async (req, res) => {
  const result = await updateCourseIntoDB(req.params.id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  })
})

export {
  createCourseController,
  getAllCourseController,
  getSingleCourseController,
  getSingleCourseFromReviewController,
  getBestCourseController,
  updateCourseController,
}
