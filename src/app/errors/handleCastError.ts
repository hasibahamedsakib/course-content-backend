import mongoose from 'mongoose'

const handleCastError = (error: mongoose.Error.CastError) => {
  const sourceMessage = error.value

  const statusCode = 400

  return {
    statusCode,
    message: 'Invalid ID',
    sourceMessage,
  }
}

export default handleCastError
