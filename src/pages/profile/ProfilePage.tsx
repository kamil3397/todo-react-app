import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EditUserType, UserType } from 'types/ListTypes';
import { Avatar, Box, Button, Card, Grid, Switch, TextField, Typography } from '@mui/material';
import { useAuthContext } from 'context/AuthContext';

type EditProfileProps = {
    user: UserType,
    setIsEditing: (value: boolean) => void
}

type Inputs = {
    name: string,
    surname: string,
    email: string
    phone?: string
}

const ProfilePage: FC = () => {
    const { fetchSingleClient, updateClient } = useAuthContext();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<EditUserType>();
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                const userData = await fetchSingleClient(userId);
                setUser(userData);
                if (userData) {
                    setName(userData.name);
                    setSurname(userData.surname);
                    setEmail(userData.email);
                }
            }
            fetchUser();
        }
    }, []);

    if (!user) {
        return (
            <div>User not found</div>
        );
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant='h3'>My profile</Typography>
                <Typography variant='body2'>Customize your profile</Typography>
            </Box>
            <Typography variant='h3' sx={{ mb: 2 }}>Your profile photo</Typography>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Avatar sx={{ width: 150, height: 150 }} />
                </Grid>
                <Grid item xs={6}>
                    <Button variant='contained'>Change photo</Button>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <Button variant='contained' color='error'>Delete photo</Button>
                </Grid>
            </Grid>
            <Typography variant='h3' sx={{ mt: 5 }}>About you</Typography>
            <TextField sx={{ my: 2 }} variant='outlined' label='Name' placeholder='Your Name' value={name} disabled={!isEditing} onChange={(e) => setName(e.target.value)}></TextField>
            <TextField sx={{ mb: 2 }} variant='outlined' label='Surname' placeholder='Your Surname' value={surname} disabled={!isEditing} onChange={(e) => setSurname(e.target.value)}></TextField>
            <TextField sx={{ mb: 2 }} variant='outlined' label='Email' placeholder='Your Email' value={email} disabled={!isEditing} onChange={(e) => setEmail(e.target.value)}></TextField>
            <TextField variant='outlined' label='Phone number' placeholder='Your phone number' disabled={!isEditing} onChange={(e) => setPhoneNumber(e.target.value)}></TextField>
            <Typography variant="body1" sx={{ mt: 3 }}>
                Edit mode
            </Typography>
            <Switch
                checked={isEditing}
                onChange={() => setIsEditing(!isEditing)}
                inputProps={{ 'aria-label': 'edit mode switch' }}
            />
        </Box>
    );
};
export default ProfilePage;

