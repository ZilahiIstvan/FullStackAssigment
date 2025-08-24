import { Person, Lock } from '@mui/icons-material'
import { Card, Box, TextField, InputAdornment, Typography, Button } from '@mui/material'
import { useState } from 'react'
import { useAppSelector } from '../store'
import { authUser, registerUser } from '../modules/login/login.service'
import { useNavigate } from 'react-router-dom'

type ViewType = 'login' | 'register'

const LoginView = () => {
  const naviage = useNavigate()

  const { loadingProgress, error } = useAppSelector((state) => state.login)

  const [currentView, setCurrentView] = useState<ViewType>('login')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordAgainError, setPasswordAgainError] = useState('')

  const isLoading = loadingProgress !== 0

  const getEmailError = (): string => {
    let error = ''
    if (email.length === 0) error = 'Email is required.'

    setEmailError(error)

    return error
  }

  const getPasswordError = (): string => {
    let error = ''
    if (password.length === 0) error = 'Password is required.'
    else if (password.length < 6) error = 'Choose a stronger password.'

    setPasswordError(error)
    if (error) return error

    if (currentView === 'register') {
      if (passwordAgain.length === 0) error = 'Password is required.'
      else if (passwordAgain.length < 6) error = 'Choose a stronger password.'
      else if (password !== passwordAgain) error = 'Two passwords are not equal.'

      setPasswordAgainError(error)
    }

    return error
  }

  const handleLoginBtnClick = async (): Promise<void> => {
    const usernameErr = getEmailError()
    const passwordErr = getPasswordError()

    if (!!usernameErr || !!passwordErr) return

    try {
      await authUser({ email, password })
      naviage('/', { replace: true })
    } catch {
      setPasswordError(error)
    }
  }

  const handleRegisterBtnClick = async (): Promise<void> => {
    const usernameErr = getEmailError()
    const passwordErr = getPasswordError()

    if (!!usernameErr || !!passwordErr) return

    try {
      await registerUser({ email, password })
      await authUser({ email, password })

      naviage('/', { replace: true })
    } catch {
      setPasswordAgainError(error)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
    >
      <Card variant="outlined" sx={{ p: '2rem' }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap=".5rem"
        >
          <Typography variant="h4" sx={{ mb: '1.2rem', fontWeight: 'bold' }}>
            Login
          </Typography>

          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setEmailError(getEmailError)}
            label="Email"
            type="email"
            size="small"
            helperText={emailError || ' '}
            error={!!emailError}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                )
              }
            }}
          />

          <TextField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setPasswordError(getPasswordError)}
            label="Password"
            type="password"
            size="small"
            helperText={passwordError || ' '}
            error={!!passwordError}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                )
              }
            }}
          />

          {currentView === 'register' && (
            <TextField
              value={passwordAgain}
              onChange={(event) => setPasswordAgain(event.target.value)}
              onBlur={() => setPasswordAgainError(getPasswordError)}
              label="Password Again"
              type="password"
              size="small"
              helperText={passwordAgainError || ' '}
              error={!!passwordAgainError}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  )
                }
              }}
            />
          )}

          {currentView === 'register' ? (
            <Button variant="contained" onClick={handleRegisterBtnClick} loading={isLoading}>
              Register
            </Button>
          ) : (
            <Button variant="contained" onClick={handleLoginBtnClick} loading={isLoading}>
              Login
            </Button>
          )}

          <Button
            onClick={() =>
              setCurrentView((prevState) => (prevState === 'register' ? 'login' : 'register'))
            }
          >
            {currentView === 'register' ? 'Or, log in' : 'Or, sign up'}
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
export default LoginView
