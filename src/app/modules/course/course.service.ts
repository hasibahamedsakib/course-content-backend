/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Types } from 'mongoose'
import { Review } from '../review/review.model'
import { TCourse, TCreatedByCourse } from './course.interface'
import { Course } from './course.model'
import { JwtPayload } from 'jsonwebtoken'
import { User } from '../user/user.model'

// create new course
const createCourseIntoDB = async (
  requestUser: JwtPayload,
  payload: TCourse,
) => {
  // start date and end date
  const courseStart = new Date(payload.startDate)
  const courseEnd = new Date(payload.endDate)

  // calculate the number of milliseconds in a start to end
  const timeDifferenceInMilliSec: number =
    courseEnd.getTime() - courseStart.getTime()

  // calculate the number of milliseconds in a weeks
  const totalMilliSecInWeek = 7 * 24 * 60 * 60 * 1000

  //  course's overall duration in weeks
  const durationInWeeks: number = Math.ceil(
    timeDifferenceInMilliSec / totalMilliSecInWeek,
  )
  // set durationInWeeks property in payload.
  payload.durationInWeeks = durationInWeeks
  const user = await User.isUserExistByEmail(requestUser.email)

  payload.createdBy = user._id

  const result = await Course.create(payload)
  return result
}

// get all course
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const { ...queryObj } = query

  const excludeFields = [
    'sortBy',
    'sortOrder',
    'limit',
    'page',
    'fields',
    'minPrice',
    'maxPrice',
    'startDate',
    'endDate',
  ]
  excludeFields.forEach((element) => delete queryObj[element])
  let demoFindQuery = Course.find().populate({
    path: 'createdBy',
    select: ['-createdAt', '-updatedAt', '-__v'],
  })
  // price range;
  if (query?.minPrice && query?.maxPrice) {
    const rangePrice = Course.find({
      price: { $gte: query?.minPrice, $lte: query?.maxPrice },
    })
    demoFindQuery = rangePrice
  }
  // price range;
  if (query?.startDate && query?.endDate) {
    const rangeDate = Course.find({
      startDate: { $gte: query?.startDate },
      endDate: { $lte: query?.endDate },
    })
    demoFindQuery = rangeDate
  }
  const filterQuery = demoFindQuery.find(queryObj)

  // sorting
  let sortBy = '-createdAt'

  // sorting ascending and descending
  if (query.sortBy && query.sortOrder == 'asc') {
    sortBy = query.sortBy as string
  } else if (query.sortBy && query.sortOrder == 'desc') {
    sortBy = `-${query.sortBy}`
  }

  const sortQuery = filterQuery.sort(sortBy)
  // console.log(sortQuery)

  // pagination functionalities

  let page = 1
  let limit = 10
  let skip = 0

  if (query.limit) {
    limit = Number(query.limit)
  }

  if (query.page) {
    page = Number(query.page)
    skip = (page - 1) * limit
  }

  const paginateQuery = sortQuery.skip(skip)

  const limitQuery = paginateQuery.limit(limit)

  // search fields.

  let fields = '-__v'

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ')
  }

  const result = await limitQuery.select(fields)

  const total = result.length
  const meta = {
    page: page,
    limit: limit,
    total: total || 0,
  }
  return { result, meta }
}
// get single course
const getSingleCourseFromDB = async (id: any) => {
  const result = await Course.findById(id).populate('categoryId')
  return result
}

// get course data by reviews
const getSingleCourseFromReviewDB = async (id: any) => {
  // get all reviews
  const reviewResult = await Review.find()
  // find course by params id
  const course = await Course.findById(id)

  // filters all reviews by using id.
  const reviews = reviewResult.filter((course) => course.courseId == id)

  return { course, reviews }
}
//Get the Best Course Based on Average Review (Rating)
const getBestCourseFromDB = async () => {
  // get all reviews
  const reviews = await Review.find()

  const ratingCounts: any = {}
  const ratingSumById: any = {}

  reviews.forEach((review) => {
    const courseId: any = review.courseId

    // get rating on particular id
    if (ratingCounts[courseId]) {
      ratingCounts[courseId]++
    } else {
      ratingCounts[courseId] = 1
    }
    // count rating
    if (ratingSumById[courseId]) {
      ratingSumById[courseId] += review.rating
    } else {
      ratingSumById[courseId] = review.rating
    }
  })

  const courseRatings: any = {}
  for (const courseId in ratingCounts) {
    const count = ratingCounts[courseId]
    const sum = ratingSumById[courseId]

    courseRatings[courseId] = {
      totalRatings: count,
      sumOfRatings: sum,
      avgRating: sum / count,
    }
  }

  let bestCourseId = ''
  let averageRating = 0

  let reviewCount = 0
  for (const courseId in courseRatings) {
    const avgRating = courseRatings[courseId]?.avgRating
    const totalRatings = courseRatings[courseId]?.totalRatings
    if (averageRating < avgRating) {
      averageRating = avgRating
      bestCourseId = courseId
      reviewCount = totalRatings
    }
  }

  // find course by params id
  const course = await Course.findById(bestCourseId)

  const rating = Number(averageRating.toFixed(1))

  return { course, averageRating: rating, reviewCount }
}

// update course
const updateCourseIntoDB = async (
  id: string,
  requestUser: JwtPayload,
  payload: Partial<TCourse>,
) => {
  const user = await User.isUserExistByEmail(requestUser.email)
  const createdByData: TCreatedByCourse = {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  }
  payload.createdBy = createdByData

  const { tags, details, ...remainingCourseData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCourseData,
  }

  const { startDate, endDate } = remainingCourseData

  if (startDate && endDate) {
    // start date and end date
    const courseStart = new Date(startDate)
    const courseEnd = new Date(endDate)

    // calculate the number of milliseconds in a start to end
    const timeDifferenceInMilliSec: number =
      courseEnd.getTime() - courseStart.getTime()

    // calculate the number of milliseconds in a weeks
    const totalMilliSecInWeek = 7 * 24 * 60 * 60 * 1000

    //  course's overall duration in weeks
    const durationInWeeks: number = Math.ceil(
      timeDifferenceInMilliSec / totalMilliSecInWeek,
    )
    // set durationInWeeks property in payload.
    modifiedUpdatedData.durationInWeeks = durationInWeeks
  }

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value
    }
  }
  // basic update
  const result = await Course.findOneAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    {
      new: true,
    },
  )

  if (tags && tags.length > 0) {
    // deleted tags if isDeleted= true.
    const deletedTags = tags
      .filter((tag) => tag?.name && tag?.isDeleted)
      .map((c) => c.name)

    const deletePreRequisitesTags = await Course.findByIdAndUpdate(
      id,
      {
        $pull: { tags: { name: { $in: deletedTags } } },
      },
      { new: true },
    )

    // add new tags
    const newPreRequisite = tags?.filter((tag) => tag.name && !tag.isDeleted)
    const newPreRequisitesTags = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { tags: { $each: newPreRequisite } },
      },
      { new: true },
    )
  }

  return result
}
export {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  getBestCourseFromDB,
  getSingleCourseFromReviewDB,
}
