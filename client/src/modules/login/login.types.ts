export interface UserData {
  email: string
  password: string
}

export interface AutResp {
  uid: string
  expiresIn: string
  idToken: string
  refreshToken: string
}
