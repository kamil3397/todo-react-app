import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import { FC } from 'react';

interface ReusableDrawerProps {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
    children: JSX.Element
    width?: number;
    title: string
}

export const ReusableDrawer: FC<ReusableDrawerProps> = ({ open, toggleDrawer, children, width = 250, title }) => {

    return (
        <Drawer
            sx={{ width: width }}
            anchor='right'
            open={open}
            onClose={() => toggleDrawer(false)}
        >
            <Box
                sx={{
                    width: width,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                    borderBottom: '1px solid #ddd',
                }}
            >
                <Typography variant="h6">
                    {title}
                </Typography>
                <IconButton onClick={() => toggleDrawer(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    width: width,
                    padding: 2,
                }}
            >
                {children}
            </Box>
        </Drawer>
    );
};