import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';

export const Loader = () => {
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%' }}>
            <CircularProgress />
        </Container>
    );
}