import React, { PropsWithChildren, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer as MuiDrawer, CssBaseline, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, IconButton } from '@mui/material'
import { DrawerAppBar } from './AppBar';
import { DrawerHeader } from './DrawerHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import { MenuList } from './MenuList';
import LogoutIcon from '@mui/icons-material/Logout';

export const DRAWER_WIDTH = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${DRAWER_WIDTH}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));



export const Drawer = ({ children }: PropsWithChildren) => {
    const [open, setOpen] = useState(false);
    const { logOutClient } = useAuthContext();
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        await logOutClient()
            .then(() => navigate('/'))
            .catch((err) => console.log(err))
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <DrawerAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
            <MuiDrawer
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                        height: '100%'
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader handleDrawerClose={handleDrawerClose} />
                <Divider />
                <MenuList />
                <Divider />

                <Button startIcon={<LogoutIcon />} onClick={() => handleLogout()}>Logout</Button>

            </MuiDrawer>
            <Main open={open}>
                {children}
            </Main>
        </Box>
    );
}
