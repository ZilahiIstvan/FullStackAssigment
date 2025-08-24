import { Request } from 'express'
import { z } from 'zod'

export const RegisterDto = z.object({
  email: z.string(),
  password: z.string()
})

export type RegisterData = z.infer<typeof RegisterDto>

export type LoginResult = {
  uid: string
  idToken: string
  refreshToken: string
  expiresIn: string
}

export interface CreateUser {
  uid: string
  email: string
  createdAt: Date
}

export interface ReqAuth extends Request {
  user?: {
    uid: string
    email?: string
    [key: string]: any
  }
}
