import { Response } from 'express'
import { CaughtPokemonService } from '../services/caughtPokemon.service'
import { ReqAuth } from '../dtos/user.dto'

export class CaughtPokemonController {
  constructor(private caughtPokemonService: CaughtPokemonService) {}

  getAllCaughtPokemons = async (req: ReqAuth, res: Response) => {
    try {
      const uid = req.user?.uid
      if (!uid) return res.status(401).json({ message: 'Not authenticated' })

      const pokemons = await this.caughtPokemonService.getAllCaughtPokemonsForUser(uid)
      return res.status(200).json(pokemons)
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message })
    }
  }

  addToCaughtPokemons = async (req: ReqAuth, res: Response) => {
    try {
      const uid = req.user?.uid
      if (!uid) return res.status(401).json({ message: 'Not authenticated' })

      const { name } = req.body
      const pokemon = await this.caughtPokemonService.addToCaughtPokemons(uid, { name })
      return res.status(201).json(pokemon)
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message })
    }
  }

  releasePokemon = async (req: ReqAuth, res: Response) => {
    try {
      const uid = req.user?.uid
      if (!uid) return res.status(401).json({ message: 'Not authenticated' })

      const pokemonId = req.params.id
      console.log('pokemonId: ', pokemonId)
      await this.caughtPokemonService.releaseCaughtPokemon(uid, pokemonId)
      return res.status(204).end()
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message })
    }
  }
}
