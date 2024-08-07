import { Container, Typography } from '@mui/material'
import { Drawer } from 'components/drawer/Drawer'
import React from 'react'

const AboutPage = () => {
    return (
        <>

            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100%' }}>
                <Typography sx={{ pb: 2 }} variant='h1'>Congratulation!</Typography>
                <Typography sx={{ pb: 2 }} variant='h3'>You found our About Page</Typography>
                <Typography variant='body1'>We will let you know if we figure out what the app is made for</Typography>
            </Container>
        </>
    )
}

export default AboutPage
