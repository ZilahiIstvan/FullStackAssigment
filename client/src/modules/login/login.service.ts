import { store } from '../../store'
import { authenticateUser, regUser } from './login.request'
import { loginDecLoading, loginIncLoading, setLoginError, setUserId } from './login.store'
import type { UserData } from './login.types'

export const registerUser = async (user: UserData): Promise<string | undefined> => {
  try {
    store.dispatch(loginIncLoading())

    const userId = await regUser(user)
    if (!userId) return

    return userId
    // set store
  } catch (error) {
    if (error instanceof Error)
      if (error instanceof Error) {
        store.dispatch(setLoginError('Registration failed!'))
        throw new Error('Failed')
      }
  } finally {
    store.dispatch(loginDecLoading())
  }
}

export const authUser = async (user: UserData): Promise<void> => {
  try {
    store.dispatch(loginIncLoading())

    const data = await authenticateUser(user)

    store.dispatch(setUserId(data.uid))
    localStorage.setItem('token', data.idToken)
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(setLoginError('Invalid email or password!'))
      throw new Error('Failed')
    }
  } finally {
    store.dispatch(loginDecLoading())
  }
}

export const logoutUser = (): void => {
  try {
    store.dispatch(loginIncLoading())

    store.dispatch(setUserId(''))
    localStorage.removeItem('token')
  } finally {
    store.dispatch(loginDecLoading())
  }
}
