import { KeyboardArrowDown, Search } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../store'
import { useDispatch } from 'react-redux'
import {
  catchPokemon,
  getAllCaughtPokemons,
  getAllPokemons,
  getDisplayablePokemonsByType,
  getPokemonTypes,
  releasePokemon
} from '../modules/pokemon/pokemon.service'
import { pokemonDecLoading, pokemonIncLoading } from '../modules/pokemon/pokemon.store'
import type { PokemonToDisplay } from '../modules/pokemon/pokemon.types'
import PokemonList from '../components/PokemonList'

const PokemonView = () => {
  const dispatch = useDispatch()
  const { loadingProgress, pokemonTypes, caughtPokemons } = useAppSelector((state) => state.pokemon)

  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [showOnlyCaught, setShowOnlyCaught] = useState(false)

  const [pokemonsToDisplay, setPokemonsToDisplay] = useState<PokemonToDisplay[]>([])

  const isLoading = loadingProgress !== 0

  useEffect(() => {
    dispatch(pokemonIncLoading())
    ;(async () => {
      await getPokemonTypes()
      await getAllPokemons()
      await getAllCaughtPokemons()
    })()

    dispatch(pokemonDecLoading())
  }, [])

  useEffect(() => {
    dispatch(pokemonIncLoading())
    ;(async () => {
      const data = await getDisplayablePokemonsByType(pokemonTypes, selectedType, caughtPokemons)

      setPokemonsToDisplay(data)
    })()

    dispatch(pokemonDecLoading())
  }, [selectedType, pokemonTypes, caughtPokemons])

  useEffect(() => {
    dispatch(pokemonIncLoading())
    ;(async () => {
      if (showOnlyCaught) {
        const data = pokemonsToDisplay.filter((pokemon) => pokemon.caught)
        setPokemonsToDisplay(data)
      } else {
        const data = await getDisplayablePokemonsByType(pokemonTypes, selectedType, caughtPokemons)

        setPokemonsToDisplay(data)
      }
    })()

    dispatch(pokemonDecLoading())
  }, [showOnlyCaught])

  const handlePokemonBtnClick = async (pokemon: PokemonToDisplay) => {
    dispatch(pokemonIncLoading())

    if (pokemon.caught) {
      await catchPokemon(pokemon.name)
    } else {
      const pok = caughtPokemons.find((p) => p.name === pokemon?.name)
      if (pok) await releasePokemon(pok.id)
    }

    await getAllCaughtPokemons()

    setPokemonsToDisplay(
      pokemonsToDisplay.map((pokemon) => {
        const isCaught = !!caughtPokemons.find((p) => p.name === pokemon.name)

        return { ...pokemon, caught: isCaught }
      })
    )

    dispatch(pokemonDecLoading())
  }

  return (
    <Box display="flex" flexDirection="column" sx={{ mt: 3 }}>
      <Box display="flex" gap="2rem" justifyContent="center" alignItems="flex-end">
        <Box display="flex" flexDirection="column" gap=".5rem">
          <Typography>Search bar</Typography>
          <TextField
            disabled={isLoading}
            variant="standard"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }
            }}
          />
        </Box>

        <Box display="flex" flexDirection="column" gap=".5rem">
          <Typography>Pokemon Types</Typography>
          <Select
            displayEmpty
            value={selectedType}
            size="small"
            sx={{ minWidth: '15rem' }}
            onChange={(event) => setSelectedType(event.target.value)}
            renderValue={(type) => {
              if (!type || type.length === 0)
                return <Typography sx={{ color: 'gray' }}>Select...</Typography>

              return pokemonTypes.find((pType) => pType.value === type)?.label
            }}
            IconComponent={KeyboardArrowDown}
          >
            {pokemonTypes.map((pType) => (
              <MenuItem key={pType.value} value={pType.value}>
                {pType.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              disabled={isLoading}
              checked={showOnlyCaught}
              onChange={(event) => setShowOnlyCaught(event.target.checked)}
            />
          }
          label="Only show caught Pokemon"
        />
      </Box>

      <Box display="flex" sx={{ mt: '2rem' }} justifyContent="center">
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow="1"
            minHeight="20rem"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" rowGap="1rem">
            {pokemonsToDisplay
              .filter(
                (pokemon) =>
                  search === '' || pokemon.value.toLowerCase().includes(search.toLowerCase())
              )
              .map((pokemon) => (
                <PokemonList
                  key={pokemon.value}
                  pokemon={pokemon}
                  onClick={handlePokemonBtnClick}
                />
              ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
export default PokemonView
