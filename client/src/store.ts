import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import pokemonReducer from './modules/pokemon/pokemon.store'
import loginReducer from './modules/login/login.store'

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    login: loginReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
