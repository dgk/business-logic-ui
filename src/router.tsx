import { createBrowserRouter } from 'react-router-dom'
import React from 'react'
import InterfaceList from './features/interface/InterfaceList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>,
  },
  {
    path: '/interface',
    element: <InterfaceList />,
  },
])

export default router
