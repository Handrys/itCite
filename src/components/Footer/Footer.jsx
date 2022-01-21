import './Footer.css';
import FooterNavigation from './FooterNavigation/FooterNavigation';
import FooterPartners from './FooterPartners/FooterPartners';
import FooterSocial from './FooterSocial/FooterSocial';


const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className="footer__body">
                    <div className="footer-top">
                        <FooterNavigation />
                        <FooterPartners />
                        <FooterSocial />
                    </div>
                    <div className="footer-bottom">2022 [БлогIT]</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;