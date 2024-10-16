import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { TaskProvider } from 'context/TaskContext';
import { ThemeProvider } from '@mui/material';
import { AuthProvider } from 'context/AuthContext';
import { AlertProvider } from 'context/AlertContext';
import 'react-toastify/dist/ReactToastify.css';
import { DialogContextProvider } from 'context/DialogContext';
import { TableProvider } from 'context/TableContext';
import { theme } from 'theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <DialogContextProvider>
      <AlertProvider>
        <TaskProvider>
          <AuthProvider>
            <TableProvider>
              <App />
            </TableProvider>
          </AuthProvider>
        </TaskProvider>
      </AlertProvider>
    </DialogContextProvider>
  </ThemeProvider>
);
