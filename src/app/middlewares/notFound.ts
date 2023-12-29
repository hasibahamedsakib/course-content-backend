/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`This ${req.originalUrl} route are not valid.`)

  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route Not Found !!',
    errorMessage: error.message,
  })
}

export default notFound
