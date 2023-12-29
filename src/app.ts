import express, { Request, Response } from 'express'
import cors from 'cors'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routes'

const app = express()

// using middleware
app.use(express.json())
app.use(cors())

// home route
app.get('/', (req: Request, res: Response) => {
  res.send('<h2><i>Welcome to server</i></h1>')
})

// Application All Route
app.use('/api', router)

// handling invalid route error
app.use(notFound)

// handling server error
app.use(globalErrorHandler)

export default app
