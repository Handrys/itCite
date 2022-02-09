import './HeaderTop.css'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
const HeaderTop = () => {
    return (
        <div className="header-top">
            <div className="header-top__title">[ БлогIT ]</div>
            <Link to="/login">
            <LoginIcon style={{color: '#ffff', fontSize: '32px'}}><div className='header-top__login'></div></LoginIcon>
            </Link>

        </div>
    );
};

export default HeaderTop;