export interface IApiError {
  stack?: string
  message: string
  statusCode: number
  isOperational?: boolean
}

export class ApiError extends Error {
  statusCode: number
  isOperational: boolean

  constructor({
    message,
    statusCode,
    stack = '',
    isOperational = true,
  }: IApiError) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
