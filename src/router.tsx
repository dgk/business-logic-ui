import { createHashRouter, Navigate } from 'react-router-dom'
import InterfaceList from './features/interface/InterfaceList'
import ProgramList from './features/program/ProgramList'

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/interface" replace />,
  },
  {
    path: '/interface',
    element: <InterfaceList />,
  },
  {
    path: '/interface/:interfaceId/program',
    element: <ProgramList />,
  },
])

export default router
