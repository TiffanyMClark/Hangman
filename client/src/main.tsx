import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Hangman from './pages/Hangman/Hangman.tsx'
import Register from './pages/Register/Register.tsx'
import Login from './pages/Login/Login.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "/hangman",
        element: <Hangman/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login users={[]} />,
      },

    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

