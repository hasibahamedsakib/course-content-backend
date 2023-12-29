import { ZodError, ZodIssue } from 'zod'

const handleZodError = (error: ZodError) => {
  const errorSource = error.issues.map((issue: ZodIssue) => {
    return {
      message: issue.message,
    }
  })
  // get error message
  const sourceMessage = errorSource.map((err) => {
    return err.message
  })
  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    sourceMessage,
  }
}

export default handleZodError
