import { Router } from 'express'
import { CaughtPokemonsRepository } from '../repositories/caughtPokemon.repository'
import { CaughtPokemonService } from '../services/caughtPokemon.service'
import { CaughtPokemonController } from '../controllers/caughtPokemon.controller'
import { authTokenMiddleware } from '../middlewares/user.middleware'

const caughtPokemonRepository = new CaughtPokemonsRepository()
const caughtPokemonService = new CaughtPokemonService(caughtPokemonRepository)
const caughtPokemonController = new CaughtPokemonController(caughtPokemonService)

const caughtPokemonsRouter = Router()

caughtPokemonsRouter.use(authTokenMiddleware)

caughtPokemonsRouter.get('/', caughtPokemonController.getAllCaughtPokemons)
caughtPokemonsRouter.post('/caught', caughtPokemonController.addToCaughtPokemons)
caughtPokemonsRouter.delete('/release/:id', caughtPokemonController.releasePokemon)

export default caughtPokemonsRouter
