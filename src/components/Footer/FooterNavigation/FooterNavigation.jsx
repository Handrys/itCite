import './FooterNavigation.css';
import '.././Footer.css';
import {
    Link,
    NavLink
} from "react-router-dom";

const FooterNavigation = () => {
    return (
        <div className='footer-navigation footer-column'>
            <div className="footer-navigation__title footer-title">Навигация</div>
            <div className="footer-navigation__content">
                <div className="footer-navigation__list footer-list">
                    <div className='footer-navigation__link footer-link'>
                        <NavLink to="/" >
                            Главная
                        </NavLink>
                    </div>
                    <div className='footer-navigation__link footer-link'>
                        <NavLink to="/News" >
                            Новости
                        </NavLink>
                    </div>
                    <div className='footer-navigation__link footer-link'>
                        <NavLink to="/Articles" >
                            Статьи
                        </NavLink>
                    </div>
                    <div className='footer-navigation__link footer-link'>
                        <NavLink to="/Reviews" >
                            Обзоры
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterNavigation;