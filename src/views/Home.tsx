import {CircularProgress, Grid, Snackbar, ThemeProvider, Card, CardContent, Box, Pagination} from '@mui/material';
import {defaultTheme} from "../components/CustomTheme.tsx";
import {useHome} from "../services/home_service.ts";
import CustomAppBar from "../components/CustomAppbar.tsx";
import {Alert} from "../components/CustomInfo.tsx";
import Typography from "@mui/material/Typography";


export function Home() {
    const { isLoading, errorOcurred, cleanError, listRepos , currentPage,
        handleChangePage, totalRepos} = useHome();
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ flexGrow: 1 }}>
                <CustomAppBar />
                {isLoading ? (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '50vh'
                        }}>
                            <CircularProgress />
                        </Box> ):
                    (<Grid container spacing={2} sx={{ p: 2 }}>
                        {listRepos.map((repo, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {repo.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {repo.description || 'No description available.'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                </Grid>)}
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <Pagination
                        count={Math.ceil(totalRepos / 8)}
                        page={currentPage}
                        onChange={handleChangePage}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>
                <Snackbar open={errorOcurred} autoHideDuration={6000} onClose={cleanError}>
                    <Alert onClose={cleanError} severity="error" sx={{ width: '100%' }}>
                        Error durante el inicio de sesión. Intentelo nuevamente.
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
}