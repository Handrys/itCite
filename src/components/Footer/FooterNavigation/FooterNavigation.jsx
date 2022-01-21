import './FooterNavigation.css';
import '.././Footer.css';

const FooterNavigation = () => {
    return ( 
        <div className = 'footer-navigation footer-column'>
            <div className="footer-navigation__title footer-title">Навигация</div>
            <div className="footer-navigation__content">
                <div className="footer-navigation__list footer-list">
                    <div className='footer-navigation__link footer-link'>Главная</div>
                    <div className='footer-navigation__link footer-link'>Новости</div>
                    <div className='footer-navigation__link footer-link'>Статьи</div>
                    <div className='footer-navigation__link footer-link'>Обзоры</div>
                </div>
            </div>
        </div> 
    );
}

export default FooterNavigation;