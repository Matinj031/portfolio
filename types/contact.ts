export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export interface ContactApiResponse {
  success: boolean
  message: string
  id?: string
}

export interface ContactApiError {
  statusCode: number
  statusMessage: string
  data?: {
    error?: string
    errors?: ContactFormErrors
    resetTime?: number
  }
}
