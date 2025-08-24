export interface FetchBaseData {
  name: string
  url: string
}

export interface PokemonBase {
  value: string
  label: string
  url: string
}

export interface PokemonToDisplay {
  name: string
  value: string
  type: string
  caught: boolean
}

export interface CaughtPokemon {
  name: string
  id: string
}
