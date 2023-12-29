/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'
import handleDuplicateError from '../errors/handleDuplicateError'
import config from '../config'

import handleCastError from '../errors/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = error?.message
  let sourceMessage

  // handle global errors.
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    sourceMessage = simplifiedError.sourceMessage.join('. ')
  } else if (error.name == 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    sourceMessage = `${simplifiedError.sourceMessage} is not a valid ID!`
  } else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    sourceMessage = simplifiedError.sourceMessage.join('. ')
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage: sourceMessage,
    errorDetails: error,
    stack: error?.stack,
  })
}

export default globalErrorHandler
