import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { WebsiteContextProvider } from './context/WebsiteContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
  <WebsiteContextProvider>
  <App />
  </WebsiteContextProvider>
    
  </BrowserRouter>,
)
