import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { RootStoreProvider } from './models'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RootStoreProvider>
        <RouterProvider router={router} />
      </RootStoreProvider>
    </ErrorBoundary>
  </StrictMode>,
)
