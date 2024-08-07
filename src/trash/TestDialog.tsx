import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FC } from "react";
import { TestConfiguration } from "./TestContext";

interface TestDialogProps extends TestConfiguration {
    open: boolean;
    onClose: () => void
}

export const TestDialog: FC<TestDialogProps> = ({ open, title, description, variant, onClose, onSubmit }) => {

    const handleDelete = () => {
        onSubmit()
        onClose()
    }


    return (
        // czemu open ustawiamy na open czym jest open?
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
    )

}