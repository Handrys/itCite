import './FooterSocial.css';
import '.././Footer.css';

const FooterSocial = () => {
    return ( 
        <div className = 'footer-social footer-column'>
            <div className="footer-social__title footer-title">Соц. сети</div>
            <div className="footer-social__content">
                <div className="footer-social__list footer-list">
                    <div className='footer-social__link footer-link'>Вконтакте</div>
                    <div className='footer-social__link footer-link'>Телеграм</div>
                    <div className='footer-social__link footer-link'>Инстаграм</div>
                    <div className='footer-social__link footer-link'>Tik-Tok</div>
                </div>
            </div>
        </div> 
    );
}

export default FooterSocial;