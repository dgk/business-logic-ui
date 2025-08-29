import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './App.tsx'
import { RootStoreProvider } from './models'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RootStoreProvider>
        <App />
      </RootStoreProvider>
    </ErrorBoundary>
  </StrictMode>,
)
