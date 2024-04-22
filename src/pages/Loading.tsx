import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Typography } from '@mui/material';

const Loading = () => {
    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%' }}>
            <CircularProgress />
        </Container>
    );
}

export default Loading;