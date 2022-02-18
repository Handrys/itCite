import {
    Link,
    NavLink
} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

const HeaderMenuBurger = (props) => {
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> {/* Бургер */}
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={props.handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={props.anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(props.anchorElNav)}
                    onClose={props.handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    <MenuItem key={'home'} onClick={props.handleCloseUserMenu} >
                        <NavLink to="/" onClick={props.handleCloseNavMenu} style={{ color: 'black' }}>
                            Главная
                        </NavLink>
                    </MenuItem>
                    <MenuItem key={'logout'} onClick={props.handleCloseUserMenu}>
                        <NavLink to="/News" onClick={props.handleCloseNavMenu} style={{ color: 'black' }}>
                            Новости
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/Articles" onClick={props.handleCloseNavMenu} style={{ color: 'black' }}>
                            Статьи
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink to="/Reviews" onClick={props.handleCloseNavMenu} style={{ color: 'black' }}>
                            Обзоры
                        </NavLink>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
}

export default HeaderMenuBurger;