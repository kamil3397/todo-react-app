import React, { FC, useState } from 'react';
import { Box, Grid, TextField, Typography, Badge } from '@mui/material';
import { UserType } from 'types/ListTypes';

export const Preview: FC<UserType> = (user) => {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Badge badgeContent={user.role} color="primary">
                        <Typography variant="h5">{`${user.name} ${user.surname}`}</Typography>
                    </Badge>
                </Grid>

                <Grid item xs={12}>
                    {/*
                    mozesz zrobic nowy komponent DisabledField (np)
                    przyjmowac on bedzie wszystkie propsy textfield'a 
                    ale bedzie mial na sztywno dodany InputProps.sx 
                    tak jak nizej (ostyluj to jakos poprawnie)
                    */}
                    <TextField
                        label="Name"
                        fullWidth
                        value={user.name || ''}
                        margin="dense"
                        InputProps={{
                            readOnly: true,
                            // sx: {
                            //     '&.input.Mui-disabled': {
                            //         background: 'white',
                            //         color: 'red',
                            //     }
                            // }
                        }}

                    // disabled
                    />
                    <TextField
                        label="Surname"
                        fullWidth
                        value={user.surname || ''}
                        margin="dense"
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={user.email || ''}
                        margin="dense"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="Role"
                        fullWidth
                        value={user.role || ''}
                        margin='dense'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
            </Grid>
        </Box >
    );
};
