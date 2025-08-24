import type { CaughtPokemon, FetchBaseData, PokemonBase, PokemonToDisplay } from './pokemon.types'
import { store } from '../../store'
import {
  pokemonDecLoading,
  pokemonIncLoading,
  setCaughtPokemons,
  setPokemonError,
  setPokemons,
  setPokemonTypes
} from './pokemon.store'
import { catchPokemonReq, fetchAllCaughtPokemons, releasePokemonReq } from './pokemon.request'

export const getAllPokemons = async (): Promise<void> => {
  const resp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0', {
    method: 'GET'
  })
  if (!resp.ok) throw new Error('Fetch failed')

  const data = await resp.json()
  if (!data) throw new Error('Json parse failed')

  const pokemons = (data.results as FetchBaseData[]).map((pokemon) => {
    const capitalized = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

    return { ...pokemon, value: pokemon.name, label: capitalized } as PokemonBase
  })

  store.dispatch(setPokemons(pokemons))
}

export const getPokemonTypes = async (): Promise<void> => {
  const resp = await fetch('https://pokeapi.co/api/v2/type', { method: 'GET' })
  if (!resp.ok) throw new Error('Fetch failed')

  const data = await resp.json()
  if (!data) throw new Error('Json parse failed')

  const types = (data.results as FetchBaseData[]).map((type) => {
    const capitalized = type.name[0].toUpperCase() + type.name.slice(1)

    return { ...type, value: type.name, label: capitalized } as PokemonBase
  })

  store.dispatch(setPokemonTypes(types))
}

export const getPokemonsByType = async (url: string): Promise<PokemonBase[]> => {
  const resp = await fetch(url, { method: 'GET' })
  if (!resp.ok) throw new Error('Fetch failed')

  const data = await resp.json()
  if (!data) throw new Error('Json parse failed')

  const pokemonsByType = data.pokemon.map((pokemonObj: { pokemon: object; slot: number }) => {
    const data = pokemonObj.pokemon as FetchBaseData
    const capitalized = data.name[0].toUpperCase() + data.name.slice(1)

    return { ...data, value: data.name, label: capitalized } as PokemonBase
  })

  return pokemonsByType
}

export const getAllCaughtPokemons = async (): Promise<void> => {
  try {
    store.dispatch(pokemonIncLoading())

    const data = await fetchAllCaughtPokemons()
    store.dispatch(setCaughtPokemons(data))
  } catch (error) {
    if (error instanceof Error) {
      store.dispatch(setPokemonError('Invalid email or password!'))
      throw new Error('Failed')
    }
  } finally {
    store.dispatch(pokemonDecLoading())
  }
}

export const getDisplayablePokemonsByType = async (
  pokemonTypes: PokemonBase[],
  selectedType: string,
  caughtPokemons: CaughtPokemon[]
) => {
  const type = pokemonTypes.find((type) => type.value === selectedType)
  if (!type) return []

  const pokemonsByType = await getPokemonsByType(type.url)
  const display = pokemonsByType.map((pokemonByType) => {
    const isCaught = !!caughtPokemons.find((p) => p.name === pokemonByType.label)

    return {
      name: pokemonByType.label,
      value: pokemonByType.value,
      type: type.label,
      caught: isCaught
    }
  })

  return display
}

export const catchPokemon = async (name: string) => {
  const data = await catchPokemonReq(name)

  return data
}

export const releasePokemon = async (pokemonId: string) => {
  await releasePokemonReq(pokemonId)
}
