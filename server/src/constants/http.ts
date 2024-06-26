export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201, // Success creation
  BAD_REQUEST = 400, // Client error
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403, // You don't have permission to access
  INTERNAL_SERVER = 500, // Server error
  UNPROCESSABLE_ENTITY = 422, // Validation error
  PARTIAL_CONTENT = 206, // Partial success
}

export const HTTP_STATUS_MESSAGE = {
  FAIL_AUTHENTICATE: 'FAIL_AUTHENTICATE_403',
  PLEASE_VERIFY_EMAIL: 'PLEASE_VERIFY_EMAIL_403',
  WRONG_PASSWORD: 'WRONG_PASSWORD_400',
  EMAIL_NOT_AVAILABLE: 'EMAIL_NOT_AVAILABLE_403',
  INVALID_CODE: 'INVALID_CODE_403',
  INVALID_AUTH: 'INVALID_AUTH_403',
  LOG_OUT_FAILED: 'LOG_OUT_FAILED_403',
  NO_PERMISSION: 'NO_PERMISSION_403',
  TITLE_OF_POST: 'TITLE_POST_EXIST_400',
  ALREADY_EXIST: (field: string) => `${field}_ALREADY_EXIST_400`,
  UPLOAD_FAILED: 'UPLOAD_FAILED_500',
  NOT_FOUND: (field: string) => `${field}_NOT_FOUND_400`,
  RESEND_LIMIT: 'RESEND_LIMIT_403',
  NOT_ENOUGH: (field: string) => `NOT_ENOUGH_${field}_400`,
  GENERIC: 'Something went wrong!',
}
