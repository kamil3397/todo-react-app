import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Card, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import { RegistrationData } from 'types/ListTypes';
import { FC, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Slide } from 'react-toastify';
import { useAlertContext } from 'context/AlertContext';

type Inputs = {
    email: string,
    name: string,
    surname: string,
    password: string,
    confirm_password: string,
    terms: boolean,
}
const schema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().min(2).max(50).required(),
    surname: yup.string().min(2).max(50).required(),
    password: yup.string().min(8).required(),
    confirm_password: yup.string().label('confirm password').required().oneOf([yup.ref('password')], 'Passwords must match'),
    terms: yup.boolean().oneOf([true], 'You must accept the terms of use').required(),
});

const RegisterPage: FC = () => {
    const { registerClient } = useAuthContext()
    const { showAlert } = useAlertContext()
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);



    const { register, handleSubmit, formState: { errors }, control } = useForm<Inputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            name: '',
            surname: '',
            password: '',
            confirm_password: '',
            terms: false,
        }
    });

    const onSubmit = (values: Inputs) => {
        const { email, name, surname, password, terms } = values;
        const newUserData: RegistrationData = { email, name, surname, password, terms };

        registerClient(newUserData)
            .then(() => navigate('/'))
            .catch((error) => {
                console.error(error);
                showAlert('Wrong credencials provided', 'error', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

            <Card>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', padding: 10, gap: 5 }}>
                    <TextField {...register('email')}
                        label='Email'
                        placeholder='Put your email here'
                        error={!!errors.email}
                        helperText={!!errors.email && errors.email.message}
                    />

                    <TextField {...register('name')}
                        label='Name'
                        placeholder='Put your name here'
                        error={!!errors.name}
                        helperText={!!errors.name && errors.name.message}
                    />
                    <TextField {...register("surname")}
                        label="Surname"
                        placeholder='Put your surname here'
                        error={!!errors.surname}
                        helperText={!!errors.surname && errors.surname.message}
                    />
                    <TextField {...register("password")}
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        placeholder='Put your password here'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={!!errors.password}
                        helperText={!!errors.password && errors.password.message}
                    />
                    <TextField
                        {...register("confirm_password")}
                        type={showPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={!!errors.password}
                        helperText={!!errors.password && errors.password.message}
                    />

                    <FormControlLabel
                        control={
                            <Controller
                                name={'terms'}
                                control={control}
                                render={({ field: props }) => (
                                    <Checkbox
                                        {...props}
                                        checked={props.value}
                                        onChange={(e) => props.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        }
                        label={<>
                            <Typography>Accepts terms of use</Typography>
                            {!!errors.terms && <Typography color="error">{errors.terms.message}</Typography>}
                            {/* ostylowac to jakos sensownie */}
                        </>}
                    />


                    <Button type='submit' variant='contained'>Register</Button>

                    <Button variant='contained' component={Link} to="/">
                        Quit
                    </Button>

                </form>
            </Card>
        </Box>
    );
};

export default RegisterPage;
