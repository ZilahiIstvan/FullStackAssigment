import { database } from '../config/firebase'
import { CaughtPokemonData, CaughtPokemonResp } from '../dtos/caughtPokemon.dto'

export class CaughtPokemonsRepository {
  private usersCollection = database.collection('users')

  create = async (userId: string, pokemon: CaughtPokemonData): Promise<CaughtPokemonResp> => {
    const subCollection = this.usersCollection.doc(userId).collection('caughtPokemons')

    const existing = await subCollection.where('name', '==', pokemon.name).limit(1).get()
    if (!existing.empty) {
      const doc = existing.docs[0]

      return {
        id: doc.id,
        ...pokemon
      }
    }

    const docRef = await subCollection.add({
      name: pokemon.name,
      createdAt: new Date()
    })

    return { id: docRef.id, ...pokemon }
  }

  getAll = async (userId: string): Promise<CaughtPokemonResp[]> => {
    const snapshot = await this.usersCollection
      .doc(userId)
      .collection('caughtPokemons')
      .orderBy('createdAt', 'desc')
      .get()

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<CaughtPokemonResp, 'id'>)
    }))
  }

  delete = async (userId: string, pokemonId: string): Promise<void> => {
    await this.usersCollection.doc(userId).collection('caughtPokemons').doc(pokemonId).delete()
  }
}
