import { Box } from '@mui/material'
import './App.css'
import Navbar from './components/Navbar'
import PokemonView from './views/PokemonView'

function App() {
  return (
    <div>
      <Box display="flex" flexDirection="column" height="100vh">
        <Navbar></Navbar>
        <PokemonView></PokemonView>
      </Box>
    </div>
  )
}

export default App
