import { createHashRouter } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './features/home/HomePage'
import InterfaceList from './features/interface/InterfaceList'
import ProgramList from './features/program/ProgramList'
import VersionList from './features/version/VersionList'
import ProgramVersionView from './features/program-version/ProgramVersionView'
import ExecutionList from './features/execution/ExecutionList'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: { crumb: () => 'Home' },
      },
      {
        path: 'interface',
        element: <InterfaceList />,
        handle: { crumb: () => 'Interfaces' },
      },
      {
        path: 'interface/:interfaceId/program',
        element: <ProgramList />,
        handle: { crumb: () => 'Programs' },
      },
      {
        path: 'interface/:interfaceId/program/:programId/version',
        element: <VersionList />,
        handle: { crumb: () => 'Versions' },
      },
      {
        path: 'interface/:interfaceId/program/:programId/version/:versionId',
        element: <ProgramVersionView />,
        handle: { crumb: () => 'Program Version' },
      },
      {
        path: 'execution',
        element: <ExecutionList />,
        handle: { crumb: () => 'Execution' },
      },
    ],
  },
])

export default router
