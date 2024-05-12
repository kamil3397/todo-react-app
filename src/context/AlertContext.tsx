import React, { createContext, useState, useContext, ReactNode, FC } from 'react';
import { toast, ToastOptions } from 'react-toastify';

type AlertType = 'info' | 'success' | 'error';

interface AlertContextType {
    showAlert: (message: string, type?: AlertType, options?: ToastOptions) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [alert, setAlert] = useState<string | null>(null);

    const showAlert = (message: string, type: AlertType = 'info', options?: ToastOptions) => {
        setAlert(message);

        switch (type) {
            case 'success':
                toast.success(message, options);
                break;
            case 'error':
                toast.error(message, options);
                break;
            case 'info':
                toast.info(message, options);
                break;
        }
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlertContext = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within a AlertProvider');
    }
    return context;
};
