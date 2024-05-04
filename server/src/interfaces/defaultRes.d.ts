export interface DefaultResponse<DataType> {
  code: number
  data: DataType
  message: string
}

export interface DefaultErrorResponse {
  code: number
  message: string
}
