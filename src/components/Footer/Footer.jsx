import './Footer.css';
import FooterNavigation from './FooterNavigation/FooterNavigation';
import FooterPartners from './FooterPartners/FooterPartners';
import FooterSocial from './FooterSocial/FooterSocial';
import UP from './img/up.png'


const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className="footer__body">
                    <div className="footer-top">
                        <FooterNavigation />
                        <FooterSocial />
                    </div>
                    <div className="footer-bottom">2022 БлогIT</div>
                </div>
            </div>
            {/* <img className='up' src={UP} alt="" /> */}
        </div>
    );
}

export default Footer;