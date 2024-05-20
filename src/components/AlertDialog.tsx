import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogConfiguration } from 'context/DialogContext';

interface AlertDialogProps extends DialogConfiguration {
    open: boolean;
    onClose: () => void;
}


export const AlertDialog: FC<AlertDialogProps> = ({ open, title, variant, description, onSubmit, onClose }) => {

    const handleDelete = () => {
        onSubmit()
        onClose()
    }

    return (
        <Dialog open={open}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button color="primary" onClick={handleDelete}>
                    {variant === 'delete' ? 'Delete' : 'Confirm'}
                </Button>
                <Button color="primary" onClick={onClose} autoFocus>
                    CANCEL
                </Button>

            </DialogActions>
        </Dialog>
    );
};
