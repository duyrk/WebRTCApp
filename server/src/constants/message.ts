export const message = {
  success: (action: string) => `${action} successfully`,
  failure: (action: string) => `${action} failure`,
  notFound: (field: string) => `${field} not found`,
  alreadyExist: (field: string) => `${field} already exist`,
  notEnough: (field: string) => `Not enough ${field}`,
  internal: 'Internal server error',
}

export const authMessage = {
  wrongPassword: 'Password is wrong',
}
