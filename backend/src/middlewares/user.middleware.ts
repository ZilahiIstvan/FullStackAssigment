import { NextFunction, Response } from 'express'
import { auth } from '../config/firebase'
import { ReqAuth } from '../dtos/user.dto'

export const authTokenMiddleware = async (req: ReqAuth, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null

    if (!token) return res.status(401).json({ error: 'Missing token' })

    const decodedToken = await auth.verifyIdToken(token)
    req.user = decodedToken

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
