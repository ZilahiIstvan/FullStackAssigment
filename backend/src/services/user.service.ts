// import { UserBodyDto } from "../dtos/user.dto";
// import { UserData } from "../models/user.model";
// import { UserRepository } from "../repositories/user.repository";
// import jwt, { SignOptions } from "jsonwebtoken";
// import bcrypt from "bcrypt";

import { auth } from '../config/firebase'
import { LoginResult, RegisterData } from '../dtos/user.dto'
import { UserRepository } from '../repositories/user.repository'

export class UserService {
  constructor(private userRepository: UserRepository) {}

  registerUser = async (data: RegisterData): Promise<string> => {
    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password
    })

    await this.userRepository.create({
      uid: userRecord.uid,
      email: userRecord.email!,
      createdAt: new Date()
    })

    return userRecord.uid
  }

  authUser = async (data: RegisterData): Promise<LoginResult | null> => {
    const apiKey = process.env.FIREBASE_API_KEY
    if (!apiKey) return null

    console.log('apiKey: ', apiKey)

    const resp = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          returnSecureToken: true
        })
      }
    )

    const json = await resp.json()
    if (!resp.ok) return null

    const { idToken, refreshToken, expiresIn, localId } = json

    return { uid: localId, idToken, refreshToken, expiresIn }
  }
}
