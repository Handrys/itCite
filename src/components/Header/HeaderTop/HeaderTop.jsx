import './HeaderTop.css'
import Button from '@mui/material/Button';

const HeaderTop = () => {
    return (
        <div className="header-top">
            <div className="header-top__title">[ БлогIT ]</div>

            <div className="header-top__login"><a href="#">login</a></div>
        </div>
    );
};

export default HeaderTop;