// import { UserService } from '../services/user.service'
// import { UserBodyDto, UserParamDto } from '../dtos/user.dto'
import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { RegisterDto } from '../dtos/user.dto'

export class UserController {
  constructor(private userService: UserService) {}

  reqisterUser = async (req: Request, res: Response) => {
    try {
      const registerData = RegisterDto.parse(req.body)
      const userId = await this.userService.registerUser(registerData)

      res.status(200).json(userId)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }

  authUser = async (req: Request, res: Response) => {
    try {
      const registerData = RegisterDto.parse(req.body)

      const token = await this.userService.authUser(registerData)
      if (!token) res.status(400).json({ message: 'Auth failed!' })

      res.status(200).json(token)
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  }
}
