import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export type ConfirmationOptions = {
    catchOnCancel?: boolean;
    variant: "danger" | "info" | undefined;
    title: string;
    description: string;
}

interface ConfirmationDialogProps extends Partial<ConfirmationOptions> {
    open: boolean;
    onSubmit: () => void;
    onClose: () => void;
}


export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ open, title, variant, description, onSubmit, onClose }) => {

    return (
        <Dialog open={open}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {variant === "danger" && (
                    <>
                        <Button color="primary" onClick={onSubmit}>
                            Yes, I agree
                        </Button>
                        <Button color="primary" onClick={onClose} autoFocus>
                            CANCEL
                        </Button>
                    </>
                )}

                {variant === "info" && (
                    <Button color="primary" onClick={onSubmit}>
                        OK
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

// export default ConfirmationDialog;
