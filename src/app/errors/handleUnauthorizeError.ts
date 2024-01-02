// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleUnauthorizeError = (error: any) => {
  return {
    message: error.message,
    errorMessage: error?.errorMessage,
    errorDetails: null,
  }
}

export default handleUnauthorizeError
