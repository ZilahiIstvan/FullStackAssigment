import { z } from 'zod'

export const CaughtPokemonDto = z.object({
  name: z.string()
})

export const RelesePokemonDto = z.object({
  id: z.string()
})

export type CaughtPokemonData = z.infer<typeof CaughtPokemonDto>
export type RelesePokemonData = z.infer<typeof RelesePokemonDto>

export type CaughtPokemonResp = {
  id: string
  name: string
}

export type Pokemon = {
  id: string
  name: string
  weight: number
  height: number
  abilities: string[]
  picture: string
  caught: boolean
}
