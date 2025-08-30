import { createHashRouter, Outlet } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './features/home/HomePage'
import InterfaceList from './features/interface/InterfaceList'
import ProgramList from './features/program/ProgramList'
import VersionList from './features/version/VersionList'
import ProgramVersionView from './features/program-version/ProgramVersionView'
import ExecutionList from './features/execution/ExecutionList'
import { InterfaceCrumb, ProgramCrumb, VersionCrumb } from './components/breadcrumbs'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    handle: { crumb: () => 'Home' },
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'interface',
        element: <Outlet />,
        handle: { crumb: () => 'Interfaces' },
        children: [
          {
            index: true,
            element: <InterfaceList />,
          },
          {
            path: ':interfaceId',
            element: <Outlet />,
            handle: {
              crumb: (match: any) => (
                <InterfaceCrumb interfaceId={match.params.interfaceId} />
              ),
              path: (match: any) => `/interface/${match.params.interfaceId}/program`,
            },
            children: [
              {
                path: 'program',
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <ProgramList />,
                  },
                  {
                    path: ':programId',
                    element: <Outlet />,
                    handle: {
                      crumb: (match: any) => (
                        <ProgramCrumb
                          interfaceId={match.params.interfaceId}
                          programId={match.params.programId}
                        />
                      ),
                      path: (match: any) =>
                        `/interface/${match.params.interfaceId}/program/${match.params.programId}/version`,
                    },
                    children: [
                      {
                        path: 'version',
                        element: <Outlet />,
                        children: [
                          {
                            index: true,
                            element: <VersionList />,
                          },
                          {
                            path: ':versionId',
                            element: <ProgramVersionView />,
                            handle: {
                              crumb: (match: any) => (
                                <VersionCrumb versionId={match.params.versionId} />
                              ),
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'execution',
        element: <ExecutionList />,
        handle: { crumb: () => 'Logs' },
      },
    ],
  },
]

const router = createHashRouter(routes)

export default router
