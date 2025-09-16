import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import StoreProvider from './provider/provider.tsx'
import { Toaster } from 'sonner'
import { AuthContextProvider } from './context/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <AuthContextProvider>
        <App />
        <Toaster/>
      </AuthContextProvider>
    </StoreProvider>
  </StrictMode>,
)
