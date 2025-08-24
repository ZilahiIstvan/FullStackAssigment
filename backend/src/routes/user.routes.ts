import { Router } from 'express'
import { UserRepository } from '../repositories/user.repository'
import { UserService } from '../services/user.service'
import { UserController } from '../controllers/user.controller'

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const userRouter = Router()

userRouter.post('/register', userController.reqisterUser)
userRouter.post('/auth', userController.authUser)

export default userRouter
