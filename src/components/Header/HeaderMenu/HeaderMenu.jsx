import {
    Link,
    NavLink
} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const HeaderMenu = (props) => {
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}> {/* Меню */}
                <NavLink to="/" >
                    <Button
                        key={'home'}
                        onClick={props.handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Главная
                    </Button>
                </NavLink>
                <NavLink to="News" >
                    <Button
                        key={'news'}
                        onClick={props.handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Новости
                    </Button>
                </NavLink>
                <NavLink to="Articles" >
                    <Button
                        key={'articles'}
                        onClick={props.handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Статьи
                    </Button>
                </NavLink>
                <NavLink to="Reviews" >
                    <Button
                        key={'reviews'}
                        onClick={props.handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Обзоры
                    </Button>
                </NavLink>
            </Box>
        </>
    );
}

export default HeaderMenu;