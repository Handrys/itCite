import './FooterSocial.css';

import iconTelegram from './img/telegram.png'
import iconInstagram from './img/instagram.png'
import iconTiktok from './img/tik-tok.png'

const FooterSocial = () => {
    return ( 
        <div className = 'footer-social footer-column'>
            <div className="footer-social__title footer-title">Соц. сети</div>
            <div className="footer-social__content">
                <div className="footer-social__list footer-list">
                    <div className='footer-social__link footer-link'>
                        <img src={iconTelegram} alt="" />
                        <span>Telegram</span>
                    </div>
                    <div className='footer-social__link footer-link'>
                    <img src={iconInstagram} alt="" />
                        <span>Instagram</span>
                    </div>
                    <div className='footer-social__link footer-link'>
                        <img src={iconTiktok} alt="" />
                        <span>Tik-tok</span></div>
                </div>
            </div>
        </div> 
    );
}

export default FooterSocial;