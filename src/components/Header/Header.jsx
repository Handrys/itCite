import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../state';
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
import HeaderMenu from './HeaderMenu/HeaderMenu';
import HeaderMenuBurger from './HeaderMenuBurger/HeaderMenuBurger';
import { Logout } from '@mui/icons-material';

const settings = ['Profile', 'Logout'];

const ResponsiveAppBar = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const { state, dispatch } = useContext(Context)
    const { posts, isLogin } = state;
    const { authorized, userName } = isLogin;



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

    const logOut = () => {
        localStorage.setItem('authorized', false)
        localStorage.setItem('userName', '')
        dispatch({
            type: 'isLogin',
            payload: {
                authorized: false,
                userName: '',
            }
        })
    }

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
            <AppBar position="sticky" className='header' sx={{ top: 'auto', bottom: 0 }}>
                <div className='container'>
                    <div className="header__body">
                        <Toolbar disableGutters>
                            <Typography /* ЛОГОТИП */
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                <CenterFocusStrongIcon fontSize='large' />
                            </Typography>

                            <HeaderMenuBurger handleCloseNavMenu={handleCloseNavMenu} handleCloseUserMenu={handleCloseUserMenu} anchorElNav={anchorElNav} handleOpenNavMenu={handleOpenNavMenu} />

                            <Typography   /* ЛОГОТИП */
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                БлогIT
                            </Typography>

                            <HeaderMenu handleCloseNavMenu={handleCloseNavMenu} />

                            {authorized ? //Кнопка справа
                                <Box sx={{ flexGrow: 0 }}>
                                    <Button sx={{ color: '#ffff', mr: '14px' }} variant="text">{userName}</Button>
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
                                            <Typography textAlign="center">
                                                <NavLink style={{color: 'black'}} key={''} to={`/Profile`}>
                                                    Профиль
                                                </NavLink>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem key={'logout'} onClick={() => {
                                            handleCloseUserMenu()
                                            logOut()
                                        }}>
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

                <Login />

            </Modal>
        </>
    );
};
export default ResponsiveAppBar;