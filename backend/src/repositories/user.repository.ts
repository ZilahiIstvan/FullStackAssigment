import { database } from '../config/firebase'
import { CreateUser } from '../dtos/user.dto'
// import { UserBodyDto } from '../dtos/user.dto'
// import { UserData } from '../models/user.model'

export class UserRepository {
  private collection = database.collection('users')

  async create(user: CreateUser): Promise<CreateUser> {
    await this.collection.doc(user.uid).set({
      email: user.email,
      createdAt: user.createdAt
    })

    return user
  }
}
