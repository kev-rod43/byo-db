import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Something went wrong!</h1>,
    children: [
      {
        index: true,
        element: <LandingPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
