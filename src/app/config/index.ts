import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

const env = process.env
export default {
  port: env.PORT || 4001,
  db_url: env.DATABASE_URL || 'mongodb://localhost:27017/AssignmentFour',
  salt_rounds: env.SALT_ROUNDS,
  SECRET_KEY: env.JWT_SECRET_KEY,
  NODE_ENV: env.NODE_ENV,
}
