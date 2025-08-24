import App from '../App'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = () => {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />

  return <App />
}
