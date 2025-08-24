import { Box, Button, Typography } from '@mui/material'
import type { PokemonToDisplay } from '../modules/pokemon/pokemon.types'

interface PokemonListProps {
  pokemon: PokemonToDisplay
  onClick: (val: PokemonToDisplay) => void
}

const PokemonList = ({ pokemon, onClick }: PokemonListProps) => {
  const bgColor = pokemon.caught ? 'var(--button-primary)' : 'var(--button-secondary)'
  const borderColor = pokemon.caught ? 'var(--border-primary)' : 'var(--border-secondary)'

  return (
    <Box
      display="grid"
      gridTemplateColumns="3fr 2fr 1fr 1fr"
      alignItems="center"
      flexGrow="1"
      sx={{
        border: `1px solid ${borderColor}`,
        paddingX: '1rem',
        borderRadius: '1rem',
        paddingY: '0.3rem'
      }}
    >
      <Typography>{pokemon.name}</Typography>
      <Typography>{pokemon.type}</Typography>
      <Typography>{pokemon.caught ? 'Caught' : '-'}</Typography>
      <Button
        variant="contained"
        sx={{ bgcolor: bgColor }}
        onClick={() => onClick({ ...pokemon, caught: !pokemon.caught })}
      >
        {pokemon.caught ? 'Release' : 'Catch'}
      </Button>
    </Box>
  )
}
export default PokemonList
