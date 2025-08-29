import { createBrowserRouter, Navigate } from 'react-router-dom'
import React from 'react'
import InterfaceList from './features/interface/InterfaceList'

const router = createBrowserRouter([
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
