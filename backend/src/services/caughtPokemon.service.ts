import { CaughtPokemonData, CaughtPokemonResp, RelesePokemonData } from '../dtos/caughtPokemon.dto'
import { CaughtPokemonsRepository } from '../repositories/caughtPokemon.repository'

export class CaughtPokemonService {
  constructor(private caughtPokemonRep: CaughtPokemonsRepository) {}

  getAllCaughtPokemonsForUser = async (userId: string): Promise<CaughtPokemonResp[]> => {
    const pokemon = await this.caughtPokemonRep.getAll(userId)

    return pokemon
  }

  addToCaughtPokemons = async (
    userId: string,
    data: CaughtPokemonData
  ): Promise<CaughtPokemonResp> => {
    const pokemon = await this.caughtPokemonRep.create(userId, data)

    return pokemon
  }

  releaseCaughtPokemon = async (userId: string, pokemonId: string): Promise<void> => {
    await this.caughtPokemonRep.delete(userId, pokemonId)
  }
}
