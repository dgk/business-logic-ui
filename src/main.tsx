import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './App.tsx'
import { RootStoreProvider } from './models'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RootStoreProvider>
        <App />
      </RootStoreProvider>
    </BrowserRouter>
  </StrictMode>,
)
