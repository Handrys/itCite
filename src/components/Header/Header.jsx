import HeaderBottom from "./HeaderBottom/HeaderBottom";
import HeaderTop from "./HeaderTop/HeaderTop";
import './Header.css'

const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="header__body">
                    <div className="header">
                        <HeaderTop />
                        <HeaderBottom />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;