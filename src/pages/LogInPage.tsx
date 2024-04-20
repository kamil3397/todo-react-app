import React, { FC } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import * as yup from "yup"
import { Box, Button, Container, Card as MuiCard, TextField, Typography, styled } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from 'context/AuthContext'
import { AuthContainer } from 'components/containers/AuthContainer'
import { useAlertContext } from 'context/AlertContext'
import { Slide } from 'react-toastify'

type LoginInputs = {
  email?: string,
  password: string,
}

const schema = yup.object({
  email: yup.string().email('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password is too short - should be 8 chars minimum.')
})

const Card = styled(MuiCard)(() => ({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '5px solid #FFFF',
  borderRadius: '0 8px 8px 0',
  height: 500
}))

const TransparentCard = styled(MuiCard)(() => ({
  display: 'flex',
  background: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  border: '5px solid #FFFF',
  borderRadius: '8px 0 0 8px',
  height: 500
}))

const LogInPage: FC = () => {
  const { loginClient } = useAuthContext()
  const { showAlert } = useAlertContext()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({ resolver: yupResolver(schema) });

  const onSubmit = async (values: LoginInputs) => {
    const { email, password } = values
    const userLogin: LoginInputs = { email, password }

    await loginClient(userLogin)
      .then(() => navigate('/yourTasks'))
      .catch(() => {
        showAlert('Wrong login or password provided', 'error', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        })
      }
      )
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f2f2', height: '100%' }}>
      <div style={{ width: '80%', display: 'flex', padding: 50, height: 500 }}>
        <TransparentCard>
          <h1 style={{ width: 60, display: 'flex', padding: 50, color: '#FFF' }}>CONTROL YOUR TASKS EVERYDAY!</h1>
        </TransparentCard>
        <Card>
          <Typography variant='h3' p={2}>Welcome back!</Typography>
          <form onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

            <TextField {...register('email')}
              label='Email'
              placeholder='Put your email here'
              error={!!errors.email}
              helperText={!!errors.email && errors.email.message}
            />
            <TextField {...register("password")}
              type='password'
              label="Passowrd"
              placeholder='Put your password here'
              error={!!errors.password}
              helperText={!!errors.password && errors.password.message}
            />

            <Button type='submit' variant='contained'>Sign In</Button>

            <Button variant='contained' component={Link} to="/">
              Quit
            </Button>
            <Button variant='contained' component={Link} to='/register' >New user? SING UP!</Button>
          </form>
        </Card>
      </div>
    </Container>
  )
}

export default LogInPage
