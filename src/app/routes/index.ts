import { Router } from 'express'
import { CategoryRoute } from '../modules/category/category.route'
import { CourseRoute } from '../modules/course/course.route'
import { ReviewRoute } from '../modules/review/review.route'
import { UserRoute } from '../modules/user/user.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/reviews',
    route: ReviewRoute,
  },
  {
    path: '/auth',
    route: UserRoute,
  },
  {
    path: '/',
    route: CourseRoute,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
