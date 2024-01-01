import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TChangePass, TLoginUser, TUser } from './user.interface'
import { User } from './user.model'
import config from '../../config'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)

  return result
}
const loginUserService = async (payload: TLoginUser) => {
  const findUser = await User.isUserExistByUsername(payload.username)
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    findUser.password,
  )
  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Wrong Password.Provide valid password.',
    )
  }

  // user data
  const jwtPayload = {
    _id: findUser._id,
    email: findUser.email,
    role: findUser.role,
  }
  const secret = config.SECRET_KEY as string

  const token = jwt.sign(jwtPayload, secret, { expiresIn: '1d' })
  const { _id, username, email, role } = findUser
  const user = {
    _id,
    username,
    email,
    role,
  }

  return { user, token }
}

const changePasswordService = async (
  requestUser: JwtPayload,
  payload: TChangePass,
) => {
  const findUser = await User.isUserExistByEmail(requestUser.email)
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found')
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.currentPassword,
    findUser?.password,
  )
  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Wrong Password.Provide valid password.',
    )
  }
  const saltRound = config.salt_rounds
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(saltRound),
  )

  const result = await User.findOneAndUpdate(
    {
      _id: requestUser?._id,
      role: requestUser?.role,
    },
    {
      password: hashedPassword,
    },
    { new: true },
  )
  return result
}

export { createUserIntoDB, loginUserService, changePasswordService }
