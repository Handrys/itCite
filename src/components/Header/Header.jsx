import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    Link,
    NavLink
} from "react-router-dom";
import './Header.css'
import LoginIcon from '@mui/icons-material/Login';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import Login from './../Pages/Login/Login';

const settings = ['Profile', 'Logout'];

const ResponsiveAppBar = () => {
    const [modalOpen, setModalOpen] = React.useState(true);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const [isLogin, setIsLogin] = React.useState(false)

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <AppBar position="static" className='header'>
                <div className='container'>
                    <div className="header__body">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                <CenterFocusStrongIcon fontSize='large' />
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> {/* Бургер */}
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    <MenuItem key={'home'} onClick={handleCloseUserMenu} >
                                        <NavLink to="/" onClick={handleCloseNavMenu} style = {{color: 'black'}}>
                                            Главная
                                        </NavLink>
                                    </MenuItem>
                                    <MenuItem key={'logout'} onClick={handleCloseUserMenu}>
                                    <NavLink to="/News" onClick={handleCloseNavMenu} style = {{color: 'black'}}>
                                            Новости
                                    </NavLink>
                                    </MenuItem>
                                    <MenuItem>
                                    <NavLink to="/Articles" onClick={handleCloseNavMenu} style = {{color: 'black'}}>
                                            Статьи
                                    </NavLink>
                                    </MenuItem>
                                    <MenuItem>
                                    <NavLink to="/Reviews" onClick={handleCloseNavMenu} style = {{color: 'black'}}>
                                        Обзоры
                                    </NavLink>
                                    </MenuItem>
                                </Menu>
                            </Box>


                            <Typography   /* ЛОГОТИП */
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                LOGO
                            </Typography>


                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}> {/* Меню */}
                                <NavLink to="/" >
                                    <Button 
                                        key={'home'}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Главная
                                    </Button>
                                </NavLink>
                                <NavLink to="/News" >
                                    <Button
                                        key={'news'}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Новости
                                    </Button>
                                </NavLink>
                                <NavLink to="/Articles" >
                                    <Button
                                        key={'articles'}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Статьи
                                    </Button>
                                </NavLink>
                                <NavLink to="/Reviews" >
                                    <Button
                                        key={'reviews'}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Обзоры
                                    </Button>
                                </NavLink>
                            </Box>


                            {isLogin ? //Кнопка справа
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Дополнительно">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                        <MenuItem key={'profile'} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Профиль</Typography>
                                        </MenuItem>
                                        <MenuItem key={'logout'} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Выйти</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                                :
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Войти в аккаунт" onClick={handleModalOpen}>
                                        <IconButton sx={{ p: 0 }}>
                                        <AccountCircleIcon style={{ color: '#ffff', fontSize: '42px' }} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            }
                        </Toolbar>
                    </div>
                </div>
            </AppBar>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <Login />
                </Box>
            </Modal>
        </>
    );
};
export default ResponsiveAppBar;