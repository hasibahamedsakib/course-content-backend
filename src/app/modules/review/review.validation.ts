import { z } from 'zod'

export const createdByValidationSchema = z.object({
  _id: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional(),
})
export const reviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string({ required_error: 'Need Course id For review ' }),
    rating: z.number({ required_error: 'Enter Your Rating ' }),
    review: z.string({ required_error: 'Provide Your Review ' }),
    createdBy: z.string(createdByValidationSchema).optional(),
  }),
})
