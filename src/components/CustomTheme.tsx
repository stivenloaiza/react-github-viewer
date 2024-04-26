import {createTheme} from "@mui/material/styles";

export const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
            light: '#7a7cff',
            dark: '#0040b2',
            contrastText: '#fff',
        },
        secondary: {
            main: '#6b5cff',
            light: '#4fb3bf',
            dark: '#ffffff',
            contrastText: '#000'
        },
        error: {
            main: '#ff1744',
            light: '#ff616f',
            dark: '#c4001d',
            contrastText: '#fff'
        },
        background: {
            default: '#f4f6f8',
            paper: '#fff',
        },
        text: {
            primary: '#302e49',
            secondary: '#7f7d96'
        }
    },
});