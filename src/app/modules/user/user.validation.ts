import { z } from 'zod'

const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is require.' }),
    email: z.string({ required_error: 'email is require.' }),
    password: z.string({ required_error: 'password is require.' }),
    role: z.enum(['admin', 'user']).optional(),
  }),
})
const loginUserValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is require.' }),
    password: z.string({ required_error: 'password is require.' }),
  }),
})
const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'currentPassword is require.',
    }),
    newPassword: z.string({ required_error: 'newPassword is require.' }),
  }),
})

export {
  createUserValidationSchema,
  loginUserValidationSchema,
  changePasswordValidationSchema,
}
