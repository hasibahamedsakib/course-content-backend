/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (error: any) => {
  const match = error.message.match(/"([^"]*)"/)
  const extractedMessage = match && match[1]
  const errorSource = [
    {
      message: `${extractedMessage} is already exists`,
    },
  ]
  // get error message
  const sourceMessage = errorSource.map((err) => {
    return err.message
  })
  const statusCode = 400

  return {
    statusCode,
    message: 'Duplicate Error.',
    sourceMessage,
  }
}

export default handleDuplicateError
