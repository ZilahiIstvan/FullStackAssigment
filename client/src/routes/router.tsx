import { createBrowserRouter } from 'react-router-dom'
import LoginView from '../views/LoginView'
import { ProtectedRoute } from './middlewares'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginView />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      // { path: '', element: <HomeView /> },
    ]
  }
])
