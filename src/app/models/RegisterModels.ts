export interface RegisterRequest {
  email: string
  password: string
  firstname: string
  lastname: string
  phone: string
}

export interface RegisterResponse {
  token: string
}
