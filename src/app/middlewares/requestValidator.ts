import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'

const requestValidator = (Schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync({
        body: req.body,
      })
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default requestValidator
