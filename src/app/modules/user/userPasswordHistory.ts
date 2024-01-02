import { Schema, model } from 'mongoose'

const userPasswordSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  password: {
    type: String,
    required: true,
  },
}, {
    timestamps:true,
})

export const History = model('History', userPasswordSchema)
