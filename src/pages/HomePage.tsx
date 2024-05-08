import React, { FC } from 'react'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HomePage: FC = () => {

    const navigate = useNavigate()

    return (

        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Stack spacing={2} sx={{ width: '50%', mr: 10 }}>
                <Typography variant='h1' color={'#ff6a95'} sx={{ pr: 20 }}>GET THINGS DONE WITH ToDo APP </Typography>
                <Typography variant='body1' sx={{ pr: 20 }}>Going through stress getting your tasks on track? What if this is the best way of keeping all your tasks at one place and well organized? Save yourself the stress and have fun while doing what you love</Typography>
                <Box display={'flex'}>
                    <Button variant='contained' sx={{ mr: '10px' }} onClick={() => navigate('/login')}>Sign In</Button>
                    <Button variant='contained' onClick={() => navigate('/register')}>Sign Up</Button>
                </Box>
            </Stack>
            <Box sx={{ width: '50%' }}>
            </Box>
        </Container>

    )
}

export default HomePage
