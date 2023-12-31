/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcryptjs'
import config from '../../config'

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
)

// storing hash password into db
userSchema.pre('save', async function () {
  const user = this

  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds))
})

// creating a static method by email
userSchema.statics.isUserExistByUsername = async function (username: string) {
  const existingUser = await User.findOne({ username }).select('+password')
  return existingUser
}

export const User = model<TUser, UserModel>('User', userSchema)
