import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { TaskProvider } from 'context/TaskContext';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from 'context/AuthContext';
import { AlertProvider } from 'context/AlertContext';
import 'react-toastify/dist/ReactToastify.css';
import { DialogContextProvider } from 'context/DialogContext';

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
  <DialogContextProvider>
    <AlertProvider>
      <TaskProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </TaskProvider>
    </AlertProvider>
  </DialogContextProvider>
);
