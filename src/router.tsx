import { createHashRouter, Navigate } from 'react-router-dom'
import InterfaceList from './features/interface/InterfaceList'
import ProgramList from './features/program/ProgramList'
import VersionList from './features/version/VersionList'

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
  {
    path: '/interface/:interfaceId/program/:programId/version',
    element: <VersionList />,
  },
])

export default router
