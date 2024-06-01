import { FC, useEffect, useState } from 'react';
import { Avatar, Box, Button, Grid, Switch, TextField, Typography } from '@mui/material';
import { useAuthContext } from 'context/AuthContext';
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';


type Inputs = {
    name: string,
    surname: string,
    email: string
    phone?: string
}

const schema = yup.object({
    name: yup.string().required("Name is required").min(3, "Must be at least 3 characters"),
    surname: yup.string().required("Name is required").min(3, "Must be at least 3 characters"),
    email: yup.string().email().required(),
})

const ProfilePage: FC = () => {
    const { user, updateClient, fetchSingleClient } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false)
    const { register, formState: { errors }, handleSubmit, getValues } = useForm<Inputs>({
        resolver: yupResolver(schema),
        defaultValues: { name: user?.name ?? '', surname: user?.surname ?? '', email: user?.email ?? '' }
    });

    if (!user) {
        return (
            <div>User not found</div>
        );
    }

    const onSubmit = async (values: Inputs) => {
        const editedUser = { ...user, name: values.name, surname: values.surname, email: values.email }
        if (values) {
            await updateClient(editedUser);
            setIsEditing(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', height: '100vh', mt: 5 }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant='h3'>My profile</Typography>
                <Typography variant='body2'>Customize your profile</Typography>
            </Box>
            <Typography variant='h3' sx={{ mb: 2 }}>Your profile photo</Typography>
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Avatar sx={{ width: 150, height: 150 }} />
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', padding: 10, gap: 5 }}>
                <Typography variant='h3' sx={{ mt: 5 }}>
                    About you
                </Typography>
                <TextField
                    sx={{ my: 2 }}
                    variant='outlined'
                    label='Name'
                    placeholder='Your Name' {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={!isEditing} />

                <TextField sx={{ mb: 2 }} variant='outlined'
                    label='Surname'
                    placeholder='Your Surname' {...register("surname")}
                    error={!!errors.surname} helperText={errors.surname?.message}
                    disabled={!isEditing} />

                <TextField sx={{ mb: 2 }} variant='outlined'
                    label='Email'
                    placeholder='Your Email' {...register("email")}
                    error={!!errors.email} helperText={errors.email?.message}
                    disabled={!isEditing} />

                <TextField variant='outlined'
                    label='Phone number'
                    placeholder='Your phone number' {...register("phone")}
                    disabled={!isEditing} />

                {isEditing && <Button onClick={() => {
                    const formData = getValues();
                    console.log("Form data submitted:", formData);
                    handleSubmit(onSubmit)();
                }} variant='contained'
                >Submit</Button>}

                <Typography variant="body1" sx={{ mt: 3 }}>
                    Edit mode
                </Typography>

                <Switch
                    checked={isEditing}
                    onChange={() => setIsEditing(!isEditing)}
                    inputProps={{ 'aria-label': 'edit mode switch' }}
                />
            </form>

        </Box>
    );
};
export default ProfilePage;

