import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import githubIcon from "../assets/github_icon.png";
import {useAppBar} from "../services/home_service.ts";

const settings = ['Ir a GitHub', 'Salir'];

function CustomAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const imageUser = localStorage.getItem('userPhoto') || '';
    const emailUser = localStorage.getItem('username') || '';
    const { logout } = useAppBar();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSettingSelected = async (setting: string) => {
        handleCloseUserMenu();
        switch (setting) {
            case 'Ir a GitHub':
                window.open(`https://github.com/${emailUser}`, '_blank');
                break;
            case 'Salir':
                await logout();
                break;
            default:
                console.log('Opción no reconocida:', setting);
        }
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={githubIcon} alt="GitHub" style={{
                        marginRight: '8px',
                        width: '40px',
                        height: '40px'
                    }}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Visualizador GitHub
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Visualizador GitHub
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography
                        variant="subtitle1"
                        noWrap
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            marginRight: 2,
                        }}
                    >
                        {emailUser}
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Configuración">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={emailUser} src={imageUser} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleSettingSelected(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default CustomAppBar;
