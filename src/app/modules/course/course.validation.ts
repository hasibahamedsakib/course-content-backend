import { z } from 'zod'

// course tag validation
const tagsValidationSchema = z.object({
  name: z.string({ required_error: 'Tags Name must be needed' }),
  isDeleted: z.boolean().optional(),
})

// course details validation
const detailsValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  description: z.string({
    required_error: 'course details description is needed',
  }),
})

// create new course validation
export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Provide Course Title' }),
    instructor: z.string({ required_error: 'Provide Course instructor' }),
    categoryId: z.string({ required_error: 'Provide category Id' }),
    price: z.number({ required_error: 'Provide Course price' }),
    tags: z.array(tagsValidationSchema).optional(),
    startDate: z.string({ required_error: 'Provide Course Start Date' }),
    endDate: z.string({ required_error: 'Provide Course End Date' }),
    language: z.string({ required_error: 'Provide Course Language' }),
    provider: z.string({ required_error: 'Provide Course Provider Name' }),
    durationInWeeks: z.number().optional(),
    details: detailsValidationSchema,
    createdBy: z.string({ required_error: 'createdBy is required' }).optional(),
  }),
})
// course tag Update validation
const tagsUpdateValidationSchema = z.object({
  name: z.string({ required_error: 'Tags Name must be needed' }).optional(),
  isDeleted: z.boolean().optional(),
})

// course details Update validation
const detailsUpdateValidationSchema = z.object({
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  description: z
    .string({
      required_error: 'course details description is needed',
    })
    .optional(),
})

// update course validation
export const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Provide Course Title' }).optional(),
    instructor: z
      .string({ required_error: 'Provide Course instructor' })
      .optional(),
    categoryId: z.string({ required_error: 'Provide category Id' }).optional(),
    price: z.number({ required_error: 'Provide Course price' }).optional(),
    tags: z.array(tagsUpdateValidationSchema).optional(),
    startDate: z
      .string({ required_error: 'Provide Course Start Date' })
      .optional(),
    endDate: z.string({ required_error: 'Provide Course End Date' }).optional(),
    language: z
      .string({ required_error: 'Provide Course Language' })
      .optional(),
    provider: z
      .string({ required_error: 'Provide Course Provider Name' })
      .optional(),
    durationInWeeks: z.number().optional(),
    details: detailsUpdateValidationSchema.optional(),
    createdBy: z.string({ required_error: 'createdBy is required' }).optional(),
  }),
})
