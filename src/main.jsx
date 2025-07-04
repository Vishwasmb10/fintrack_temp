import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  redirect,
} from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import LoginPage from '../components/Login.jsx';
import App from './App.jsx';
import Landing from './Landing.jsx';

// Loader for protected routes: if not logged in, redirect to /login
const requireAuth = () => {
  if (localStorage.getItem('isAuth') !== 'true') {
    throw redirect('/login');
  }
  return null;
};

// Loader for login route: if already logged in, redirect to app
const redirectIfAuth = () => {
  if (localStorage.getItem('isAuth') === 'true') {
    throw redirect('/app');
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: redirectIfAuth,
  },
  {
    path: '/app/:page',
    element: <App />,
    loader: requireAuth,
  },
  {
    path: '/app/*',
    element: <App />,
    loader: requireAuth,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
