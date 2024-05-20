import { AlertDialog } from 'components/AlertDialog';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

type DialogContextProps = {
    open: boolean
    setOpen: (value: boolean) => void;
    setDialogConfiguration: (value: DialogConfiguration) => void;
};

export type DialogConfiguration = {
    onSubmit: () => void | Promise<void>
    title: string;
    description: string;
    variant: 'delete' | 'confirmation'
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [open, setOpen] = useState(false)
    const [dialogConfiguration, setDialogConfiguration] = useState<DialogConfiguration>({
        onSubmit: () => console.log(''),
        title: 'Default title',
        description: "default description",
        variant: 'confirmation'
    })


    const contextValues: DialogContextProps = {
        open,
        setOpen,
        setDialogConfiguration
    };

    return (
        <DialogContext.Provider value={contextValues}>
            <AlertDialog {...dialogConfiguration} onClose={() => setOpen(false)} open={open} />
            {children}
        </DialogContext.Provider>
    );
};

export const useDialogContext = (): DialogContextProps => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialogContext musi być używane wewnątrz DialogProvider');
    }
    return context;
};
