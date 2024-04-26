import CssBaseline from '@mui/material/CssBaseline';
import {CircularProgress, Grid, Box, Paper, Button, Avatar, Snackbar, ThemeProvider} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import sideImage from '../assets/side_login.webp';
import githubIcon from '../assets/github_icon.png';
import {useLogin} from "../services/login_service.ts";
import {Alert} from "../components/CustomInfo.tsx";
import {defaultTheme} from "../components/CustomTheme.tsx";


export function Login() {
    const { isLoading, errorInLogin, loginService, cleanError } = useLogin();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${sideImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h4" sx={{ margin: '50px 0' }}>
                            Visualizador GitHub
                        </Typography>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar sesión
                        </Typography>
                        {isLoading ? (
                            <CircularProgress />
                        ) :<Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, display: 'flex'}}
                            onClick={loginService}
                            startIcon={<img src={githubIcon} alt="GitHub" style={{width: 24, height: 24}}/>}
                        >Ingresar con GitHub
                        </Button>}
                        <Snackbar open={errorInLogin} autoHideDuration={6000} onClose={cleanError}>
                            <Alert onClose={cleanError} severity="error" sx={{ width: '100%' }}>
                                Error durante el inicio de sesión. Intentelo nuevamente.
                            </Alert>
                        </Snackbar>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}