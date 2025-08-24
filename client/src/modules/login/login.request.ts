import { doFetch } from '../../utilities'
import type { AutResp, UserData } from './login.types'

export const regUser = async (user: UserData): Promise<string | undefined> => {
  const resp = await doFetch('users/register', 'POST', user)
  if (!resp.ok) throw new Error('Fetch failed')

  const data = await resp.json()
  if (!data) throw new Error('Json parse failed')

  return data
}

export const authenticateUser = async (user: UserData): Promise<AutResp> => {
  const resp = await doFetch('users/auth', 'POST', user)
  if (!resp.ok) throw new Error('Fetch failed')

  const data = await resp.json()
  if (!data) throw new Error('Json parse failed')

  return data
}
