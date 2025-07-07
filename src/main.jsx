import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App'
import { router } from './router';
import { RouterProvider } from 'react-router';
import './i18n'; // Ensure i18n is initialized before rendering


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
