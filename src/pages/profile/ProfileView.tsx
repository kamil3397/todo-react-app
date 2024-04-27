import React, { FC, useState } from 'react';
import { TaskInfo } from 'layouts/SingleTaskPage';
import { EditUserType, } from 'types/ListTypes';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';

type UserViewProps = {
    user: EditUserType;
}

const ProfileView: FC<UserViewProps> = ({ user }) => {
    const { updateClient } = useAuthContext();
    const navigate = useNavigate()

    return (
        <>
            <Typography variant='h3'
                sx={{ mt: 1.25, mb: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{user.email}</Typography>
            <TaskInfo>{user.email}</TaskInfo>
            <TaskInfo>{user.password}</TaskInfo>
            <Box sx={{ m: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant='contained' sx={{ m: 1 }} onClick={() => navigate('/profile')}>Update profile</Button>
            </Box>
        </>
    );
};

export default ProfileView;
