import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import CreateTrip from './create-trip/index.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import Header from './components/customs/Header.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]/index.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<Viewtrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}> 
    <Header/>
    <Toaster />
    <RouterProvider router = {router} />
  </GoogleOAuthProvider>
  </StrictMode>,
)
