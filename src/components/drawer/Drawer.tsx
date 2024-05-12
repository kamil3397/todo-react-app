import React, { PropsWithChildren, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer as MuiDrawer, CssBaseline, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ListIcon from '@mui/icons-material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PersonIcon from '@mui/icons-material/Person';
import { DrawerAppBar } from './AppBar';
import { DrawerHeader } from './DrawerHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';

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
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader handleDrawerClose={handleDrawerClose} />
                <Divider />
                <List>
                    <Link to='/yourTasks' style={{ textDecoration: 'none', color: '#202142' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon style={{ color: '#202142' }} />
                                </ListItemIcon>
                                <ListItemText primary={'Home'} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to='/about' style={{ textDecoration: 'none', color: '#202142' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InfoIcon style={{ color: '#202142' }} />
                                </ListItemIcon>
                                <ListItemText primary={'About'} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to='/yourTasks' style={{ textDecoration: 'none', color: '#202142' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ListIcon style={{ color: '#202142' }} />
                                </ListItemIcon>
                                <ListItemText primary={'Your Tasks '} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to='/addTask' style={{ textDecoration: 'none', color: '#202142' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AddTaskIcon style={{ color: '#202142' }} />
                                </ListItemIcon>
                                <ListItemText primary={'Add new task '} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to='/profile' style={{ textDecoration: 'none', color: '#202142' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <PersonIcon style={{ color: '#202142' }} />
                                </ListItemIcon>
                                <ListItemText primary={'Profile'} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to='/' style={{ textDecoration: 'none', color: '#202142' }}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon style={{ color: '#202142' }} />
                                </ListItemIcon>
                                <ListItemText primary={'Logout'} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    {/* // * tutaj dodaj wszystkie swoje routy, czyli redirecty */}
                </List>
            </MuiDrawer>
            <Main open={open}>
                {children}
            </Main>
        </Box>
    );
}
