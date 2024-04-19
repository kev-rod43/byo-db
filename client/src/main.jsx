import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ChartsPage from  './pages/Charts.jsx'
import UserPage from './pages/User.jsx'
import CollectionsPage from  './pages/Collections.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Something went wrong!</h1>,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'charts', element: <ChartsPage /> },        // Route for the Charts page
      { path: 'user', element: <UserPage /> },            // Route for the User page
      { path: 'collections', element: <CollectionsPage /> }  // Route for the Collections page
    ]
    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
