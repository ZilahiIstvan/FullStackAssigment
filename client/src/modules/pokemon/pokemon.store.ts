import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CaughtPokemon, FetchBaseData, PokemonBase } from './pokemon.types'

export interface PokemonState {
  loadingProgress: number
  pokemonError: string
  pokemonTypes: PokemonBase[]
  pokemons: PokemonBase[]
  pokemonsByType: FetchBaseData[]
  caughtPokemons: CaughtPokemon[]
}

const initialState: PokemonState = {
  loadingProgress: 0,
  pokemonError: '',
  pokemonTypes: [],
  pokemons: [],
  pokemonsByType: [],
  caughtPokemons: []
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonTypes: (state, action: PayloadAction<PokemonBase[]>) => {
      state.pokemonTypes = action.payload
    },
    setPokemons: (state, action: PayloadAction<PokemonBase[]>) => {
      state.pokemons = action.payload
    },
    setPokemonsByType: (state, action: PayloadAction<FetchBaseData[]>) => {
      state.pokemonsByType = action.payload
    },
    setCaughtPokemons: (state, action: PayloadAction<CaughtPokemon[]>) => {
      state.caughtPokemons = action.payload
    },
    pokemonIncLoading: (state) => {
      state.loadingProgress++
    },
    pokemonDecLoading: (state) => {
      state.loadingProgress--
    },
    setPokemonError: (state, action: PayloadAction<string>) => {
      state.pokemonError = action.payload
    }
  }
})

export const {
  setPokemonTypes,
  setPokemons,
  pokemonIncLoading,
  pokemonDecLoading,
  setPokemonError,
  setCaughtPokemons
} = pokemonSlice.actions

const pokemonReducer = pokemonSlice.reducer
export default pokemonReducer
