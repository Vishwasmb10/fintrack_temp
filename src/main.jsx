import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { Navigate } from 'react-router-dom';
import LoginPage from '../components/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/:page',
    element:localStorage.getItem('isAuth') ? <App /> : <Navigate to="/login" />
  },
  {
    path:'/*',
    element:
    localStorage.getItem('isAuth') ? <App /> : <Navigate to="/login" />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);