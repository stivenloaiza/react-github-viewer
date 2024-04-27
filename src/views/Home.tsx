import {
    CircularProgress,
    Grid,
    Snackbar,
    ThemeProvider,
    Card,
    CardContent,
    Box,
    Pagination,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    Checkbox,
    ListItemText,
    Divider,
    ListSubheader,
    Button,
    TextField,
    InputAdornment, Chip, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import {defaultTheme} from "../components/CustomTheme.tsx";
import {useHome} from "../services/home_service.ts";
import CustomAppBar from "../components/CustomAppbar.tsx";
import {Alert} from "../components/CustomInfo.tsx";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CancelIcon  from '@mui/icons-material/Cancel';
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Stars";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {LanguageInput} from "../components/CustomTextfieldLanguage.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, {useEffect, useState} from "react";
import {blue, green, orange, red} from "@mui/material/colors";
import {RepositoryGitHub} from "../models/github.ts";


export function Home() {
    type FilterValue = string | number | boolean | Date | null;
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [openShow, setOpenShow] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState<RepositoryGitHub | null>(null);
    const { isLoading, errorOcurred, cleanError, listRepos , currentPage,
        handleChangePage, totalRepos, setDrawerOpen, drawerOpen,
        setFilters, filters} = useHome();

    const toggleDrawer = (open: boolean) => (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
        if (event.type === 'keydown' && (event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') {
            return;
        }
        setDrawerOpen(open);
    };

    const handleFilterChange = (filter: string, value: FilterValue) => {
        setFilters(prev => ({
            ...prev,
            [filter]: value,
        }));

    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = (event.target as HTMLInputElement).value;
        setSearchTerm(searchTerm);
    };

    const handleClickOpenShow = (repo: RepositoryGitHub) => {
        setSelectedRepo(repo);
        setOpenShow(true);
    };

    const handleCloseShow = () => {
        setOpenShow(false);
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // debounced time
        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm !== '') {
            handleFilterChange('search', debouncedSearchTerm);
        }

    }, [debouncedSearchTerm]);


    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ flexGrow: 1 }}>
                <CustomAppBar />
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >

                        <Typography variant="subtitle1" sx={{ p: 1 }}>
                            Filtros y ordenamiento
                        </Typography>
                        <Divider />
                        <List
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Visibilidad
                                </ListSubheader>
                            }
                            dense
                        >
                            <ListItem onClick={() => handleFilterChange('visibility', 'all')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.visibility === 'all'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Todos" />
                            </ListItem>
                            <ListItem onClick={() => handleFilterChange('visibility', 'private')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.visibility === 'private'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Privados" />
                            </ListItem>
                            <ListItem onClick={() => handleFilterChange('visibility', 'public')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.visibility === 'public'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Publicos" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Estrellas
                                </ListSubheader>
                            }
                            dense
                        >
                            <ListItem onClick={() => handleFilterChange('stars', 'all')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.stars === 'all'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Todas" />
                            </ListItem>
                            <ListItem onClick={() => handleFilterChange('stars', '0..1000')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.stars === '0..1000'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="De 0 a 1.000" />
                            </ListItem>
                            <ListItem onClick={() => handleFilterChange('stars', '1001..10000')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.stars === '1001..10000'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="De 1.001 a 10.000" />
                            </ListItem>
                            <ListItem onClick={() => handleFilterChange('stars', '>10001')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.stars === '>10001'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="De 10.001 en adelante" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Creación
                                </ListSubheader>
                            }
                            dense
                        >
                            <ListItem onClick={() => handleFilterChange('created', 'all')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.created === 'all'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Desde el origen" />
                            </ListItem>
                            <ListItem onClick={() => handleFilterChange('created', 'currentMonth')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.created === 'currentMonth'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Creados este mes" />
                            </ListItem>
                            <ListItem onClick={() => handleFilterChange('created', 'currentYear')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.created === 'currentYear'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Creados hace un año" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                                {filters.devLanguage ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ListItemText primary={filters.devLanguage} />
                                        <IconButton edge="end" onClick={() => handleFilterChange('devLanguage', '')}>
                                            <CancelIcon />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <LanguageInput
                                        currentLanguage={filters.devLanguage}
                                        onLanguageChange={(newLang: string) => handleFilterChange('devLanguage', newLang)}
                                    />
                                )}
                            </Box>

                        </List>
                        <Divider />
                        <List
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Ordenar por
                                </ListSubheader>
                            }
                            dense
                        >
                            <ListItem onClick={() => handleFilterChange('order', 'updated:asc')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.order === 'updated:asc'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Actualizado ▲" />
                            </ListItem>
                            <ListItem onClick={() => handleFilterChange('order', 'updated:desc')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.order === 'updated:desc'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Actualizado ▼" />
                            </ListItem>
                            <ListItem onClick={() => handleFilterChange('order', 'stars:asc')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.order === 'stars:asc'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Estrellas ▲" />
                            </ListItem>
                            <ListItem onClick={() => handleFilterChange('order', 'stars:desc')} sx={{ py: 0 }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={filters.order === 'stars:desc'}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Estrellas ▼" />
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                {isLoading ? (
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '50vh'
                        }}>
                            <CircularProgress />
                        </Box> ):
                    (<Grid container spacing={2} sx={{ flexGrow: 1, pb: 15, pt: 2, pl: 2, pr: 2}}>
                        {listRepos.map((repo, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',
                                    cursor: 'pointer'}} onClick={() => handleClickOpenShow(repo)}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            {repo.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {repo.description || 'Sin descripción.'}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                            <Chip icon={<StarIcon />} label={`${repo.stargazers_count} `} size="small" sx={{ backgroundColor: orange[200] }} />
                                            <Chip icon={<VisibilityIcon />} label={`${repo.visibility}`} size="small" sx={{ backgroundColor: (repo.visibility === 'public')?blue[200]: red[200]}} />
                                            <Chip label={`Forks: ${repo.forks_count}`} size="small" sx={{ backgroundColor: green[200] }} />
                                        </Box>
                                    </CardContent>
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="body2">
                                            Actualizado: {new Date(repo.updated_at).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                </Grid>)}
                {selectedRepo && (
                    <Dialog open={openShow} onClose={handleCloseShow} fullWidth maxWidth="md">
                        <DialogTitle>{selectedRepo.full_name}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography gutterBottom variant="subtitle1">
                                        Detalles Generales
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Descripción:</strong> {selectedRepo.description || 'No disponible'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Lenguaje Principal:</strong> {selectedRepo.language || 'No especificado'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Creado:</strong> {new Date(selectedRepo.created_at).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Última Actualización:</strong> {new Date(selectedRepo.updated_at).toLocaleDateString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography gutterBottom variant="subtitle1">
                                        Estadísticas
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Estrellas:</strong> {selectedRepo.stargazers_count}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Forks:</strong> {selectedRepo.forks_count}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Issues Abiertos:</strong> {selectedRepo.open_issues_count}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Watchers:</strong> {selectedRepo.watchers_count}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button href={selectedRepo.html_url} target="_blank" color="primary">
                                Ver en GitHub
                            </Button>
                            <Button onClick={handleCloseShow}>Cerrar</Button>
                        </DialogActions>
                    </Dialog>
                )}
                <Snackbar open={errorOcurred} autoHideDuration={6000} onClose={cleanError}>
                    <Alert onClose={cleanError} severity="error" sx={{ width: '100%' }}>
                        Error durante el inicio de sesión. Intentelo nuevamente.
                    </Alert>
                </Snackbar>
                <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar
                        sx={{
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            justifyContent: { sm: 'space-between' },
                            '& > *': { // Applies styles to all direct children of the Toolbar
                                my: { xs: 1, sm: 0 },
                            },
                        }}>
                        <Button startIcon={<FilterListIcon />} onClick={toggleDrawer(true)}>
                            Filtros
                        </Button>
                        <TextField
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Buscar por nombre"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ marginLeft: 'auto' }}
                        />
                        <Pagination
                            count={Math.ceil(totalRepos / 9)}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="primary"
                            showFirstButton
                            showLastButton
                            sx={{
                                alignSelf: 'center',
                                my: { xs: 1, sm: 0 },
                            }}
                        />
                        <Typography variant="subtitle1" sx={{ p: 1 }}>
                            Total: {totalRepos}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ p: 1 }}>
                            V: 0.0.2
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}