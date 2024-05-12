import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function AlertDialog(props) {
    const [open, setOpen] = useState(false);

    const showDialog = () => {
        setOpen(true);
    };

    const hideDialog = () => {
        setOpen(false);
    };

    const confirmRequest = () => {
        props.response();
        hideDialog();
    };


    return (
        <>
            {props.children(showDialog)}
            {open && (
                <Dialog
                    open={open}
                    onClose={hideDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {props.description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={confirmRequest} color="primary">
                            Yes
                        </Button>
                        <Button onClick={hideDialog} color="primary">
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}
