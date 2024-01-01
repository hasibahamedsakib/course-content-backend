import { Schema, model } from 'mongoose'
import { TCourse, TDetails, TTags } from './course.interface'

const tagsSchema = new Schema<TTags>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,

    default: false,
  },
})

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    required: true,
    trim: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
})

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    tags: {
      type: [tagsSchema],
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    provider: {
      type: String,
      required: true,
      trim: true,
    },
    durationInWeeks: {
      type: Number,
    },
    details: {
      type: detailsSchema,
      required: true,
      _id: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
)

export const Course = model<TCourse>('Course', courseSchema)
