/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TChangePass, TLoginUser, TUser } from './user.interface'
import { User } from './user.model'
import config from '../../config'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { History } from './userPasswordHistory'
import getFormatTimeAndDate from '../../utils/dateFormate'

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

  const latestTwoPassword: any[] = await History.find({
    userId: requestUser._id,
  })
    .limit(2)
    .sort({ createdAt: -1 })
  console.log(latestTwoPassword)

  latestTwoPassword.forEach((element) => {
    const isPasswordMatch = bcrypt.compareSync(
      payload.newPassword,
      element.password,
    )

    if (isPasswordMatch) {
      const formateDate = getFormatTimeAndDate(element?.createdAt)
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formateDate})..`,
      )
    }
  })

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
  if (result) {
    await History.create({ userId: requestUser?._id, password: hashedPassword })
  }
  return result
}

export { createUserIntoDB, loginUserService, changePasswordService }
