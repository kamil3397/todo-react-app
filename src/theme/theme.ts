import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#202142',
        },
        secondary: {
            main: '#ff6a95'
        }
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        h1: {
            fontSize: "3rem",
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 'bold'
        },
    },
});

