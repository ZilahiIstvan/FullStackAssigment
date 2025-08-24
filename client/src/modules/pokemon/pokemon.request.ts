import { doFetch } from '../../utilities'

export const fetchAllCaughtPokemons = async () => {
  const resp = await doFetch('pokemons', 'GET')
  if (!resp.ok) throw new Error('Fetch failed')

  const data = await resp.json()
  if (!data) throw new Error('Json parse failed')

  return data
}

export const catchPokemonReq = async (name: string) => {
  const resp = await doFetch('pokemons/caught', 'POST', { name })
  if (!resp.ok) throw new Error('Fetch failed')

  const data = await resp.json()
  if (!data) throw new Error('Json parse failed')

  return data
}

export const releasePokemonReq = async (id: string) => {
  const resp = await doFetch(`pokemons/release/${id}`, 'DELETE')

  if (!resp.ok) throw new Error('Fetch failed')
}
