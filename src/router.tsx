import { createHashRouter, Navigate } from 'react-router-dom'
import InterfaceList from './features/interface/InterfaceList'

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/interface" replace />,
  },
  {
    path: '/interface',
    element: <InterfaceList />,
  },
])

export default router
