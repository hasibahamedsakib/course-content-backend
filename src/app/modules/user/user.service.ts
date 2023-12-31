import { TUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)

  return result
}
const loginUserService = async (payload: TUser) => {
  // return result
}

export { createUserIntoDB, loginUserService }
