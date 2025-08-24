import dotenv from 'dotenv'
import { app } from './app'

dotenv.config()

const port = process.env.SERVER_PORT || 3000

const server = app.listen(port, () => {
  console.log(`Server is running at port: ${port}`)
})
