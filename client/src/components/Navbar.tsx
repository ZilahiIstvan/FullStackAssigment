import { Logout } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { logoutUser } from '../modules/login/login.service'
import { useNavigate } from 'react-router-dom'
import pickachuLogo from '../assets/pikachu.png'

const Navbar = () => {
  const naviage = useNavigate()

  const handleLogoutClick = () => {
    logoutUser()
    naviage('/login', { replace: true })
  }

  return (
    <nav>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 10, py: 2 }}
        bgcolor="var(--bg-primary)"
      >
        <img
          src={pickachuLogo}
          alt="Pickachu logo"
          style={{ height: '5rem', objectFit: 'contain' }}
        />

        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
          Pokemons
        </Typography>

        <Button
          variant="contained"
          onClick={handleLogoutClick}
          endIcon={<Logout />}
          sx={{ bgcolor: 'var(--button-primary)', color: '#0277BD', fontWeight: 'bold' }}
        >
          Logout
        </Button>
      </Box>
    </nav>
  )
}
export default Navbar
