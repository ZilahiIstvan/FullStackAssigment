import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './src/routes/user.routes'
import caughtPokemonsRouter from './src/routes/caughtPokemon.routes'

dotenv.config()

export const app: Express = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRouter)
app.use('/pokemons', caughtPokemonsRouter)
