import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ListIcon from '@mui/icons-material/List';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReusableDrawer } from 'components/drawer/ReusableDrawer'; // Import drawer
import AddTask from 'pages/AddTask';

const MENU_LIST = [
    { link: '/', icon: <HomeIcon />, label: 'Home' },
    { link: '/about', icon: <InfoIcon />, label: 'About' },
    { link: '/tasks', icon: <ListIcon />, label: 'Tasks' },
    { link: '/add-task', icon: <AddTaskIcon />, label: 'Add task' },
    { link: '/profile', icon: <PersonIcon />, label: 'Profile' }
];

/*
Praca domowa 16.10
1.######### Zrobic mechanizm, ktory bedzie sprawdzal na jakiej stronie sie znajdujemy i na podstawie tego bedzie sprawial, ze nasz element listy bedzie sie wyswietlal jako aktywny (np. poprzez zmiane backgroundu);
*/

export const MenuList = () => {
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => {
        setDrawerOpen(open);
    };

    return (
        <>
            <List>
                {MENU_LIST.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        {item.link === '/add-task' ? (
                            //tutaj specjalny warunek w przypadku addTask
                            <ListItemButton
                                onClick={() => toggleDrawer(true)}
                                sx={{
                                    backgroundColor:
                                        location.pathname === item.link ? '#B3B3CC' : 'transparent',
                                }}
                            >
                                <ListItemIcon style={{ color: '#202142' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        ) : (
                            <ListItemButton
                                component={Link}
                                to={item.link}
                                sx={{
                                    backgroundColor:
                                        location.pathname === item.link ? '#B3B3CC' : 'transparent',
                                }}
                            >
                                <ListItemIcon style={{ color: '#202142' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        )}
                    </ListItem>
                ))}
            </List>
            <ReusableDrawer open={drawerOpen} toggleDrawer={toggleDrawer} width={480} title="Add New Task">
                <AddTask toggleDrawer={toggleDrawer} />
            </ReusableDrawer>
        </>
    );
};
