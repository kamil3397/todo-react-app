import * as React from "react";
import { ConfirmationDialog, ConfirmationOptions } from "../components/AlertDialog";
import { FC, ReactNode, createContext, useContext, useState } from 'react';


const ConfirmationServiceContext = createContext<
    (options: ConfirmationOptions) => Promise<void>
>(Promise.reject);

export const useConfirmation = () =>
    useContext(ConfirmationServiceContext);

export const ConfirmationServiceProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [
        confirmationState,
        setConfirmationState
    ] = useState<ConfirmationOptions | null>(null);

    const awaitingPromiseRef = React.useRef<{
        resolve: () => void;
        reject: () => void;
    }>();

    const openConfirmation = (options: ConfirmationOptions) => {
        setConfirmationState(options);
        return new Promise<void>((resolve, reject) => {
            awaitingPromiseRef.current = { resolve, reject };
        });
    };

    const handleClose = () => {
        if (confirmationState?.catchOnCancel && awaitingPromiseRef.current) {
            awaitingPromiseRef.current.reject();
        }

        setConfirmationState(null);
    };

    const handleSubmit = () => {
        if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.resolve();
        }

        setConfirmationState(null);
    };

    return (
        <>
            <ConfirmationServiceContext.Provider
                value={openConfirmation}
                children={children}
            />

            <ConfirmationDialog
                open={Boolean(confirmationState)}
                onSubmit={handleSubmit}
                onClose={handleClose}
                {...confirmationState}
            />
        </>
    );
};
