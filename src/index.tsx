import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { TaskProvider } from 'context/TaskContext';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from 'context/AuthContext';
import { AlertProvider } from 'context/AlertContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogInPage from 'pages/LogInPage';
import ProtectedRoute from 'utils/ProtectedRoute';
import TablePage from 'pages/TablePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const theme = createTheme({

  palette: {
    primary: {
      main: '#202142',
    },
    secondary: {
      main: '#ff6a95'
    }
  },

  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AlertProvider>
    <TaskProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </TaskProvider>
  </AlertProvider>
);
