import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Card, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';
import { RegisterData } from 'types/UserTypes';
import { FC, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAlertContext } from 'context/AlertContext';

type Inputs = {
    email: string,
    name: string,
    surname: string,
    phone?: string | null | undefined,
    password: string,
    confirm_password: string,
    terms: boolean,
}

const phoneNumberRegex = /^(\+\d{1,3}[- ]?)?(\d{3}[- ]\d{3}[- ]\d{3}|\d{10})$/;

const schema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().min(2).max(50).required(),
    surname: yup.string().min(2).max(50).required(),
    phone: yup.string().nullable().transform((value, originalValue) => originalValue === '' ? null : value).matches(phoneNumberRegex, 'Phone is not valid').notRequired(),
    password: yup.string().min(8).required(),
    confirm_password: yup.string().label('confirm password').required().oneOf([yup.ref('password')], 'Passwords must match'),
    terms: yup.boolean().oneOf([true], 'You must accept the terms of use').required(),
});

const RegisterPage: FC = () => {
    const { registerClient } = useAuthContext()
    const { showSuccessAlert, showErrorAlert } = useAlertContext()
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);



    const { register, handleSubmit, formState: { errors }, control } = useForm<Inputs>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            name: '',
            surname: '',
            phone: '',
            password: '',
            confirm_password: '',
            terms: false,
        }
    });

    const onSubmit = (values: Inputs) => {
        const { email, name, surname, phone, password, terms } = values;
        const newUserData: RegisterData = { email, name, surname, phone, password, terms };

        registerClient(newUserData)
            .then(() => {
                showSuccessAlert('Registered succesfully')
                navigate('/')
            })
            .catch((error) => {
                showErrorAlert('Wrong credencials provided')
                console.error(error);
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
                    <TextField {...register("phone")}
                        label="Phone Number (optional)"
                        placeholder='Put your phone number here'
                        error={!!errors.phone}
                        helperText={!!errors.phone && errors.phone.message}
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
