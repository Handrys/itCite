import './FooterPartners.css';
import '.././Footer.css';

const FooterPartners = () => {
    return ( 
        <div className = 'footer-partners footer-column'>
            <div className="footer-partners__title footer-title">Наши партнеры</div>
            <div className="footer-partners__content footer-content">
                <div className="footer-partners__list">
                    <div className="footer-partners__row">
                        <div className="footer-partners__img">
                            <img src="https://ediweb.com/files/ru-ru/articles/auc.jpg" alt="" />
                        </div>
                        <div className="footer-partners__img">
                            <img src="http://www.proforientator.ru/images/specit.jpg" alt="" />
                        </div>
                    </div>
                    <div className="footer-partners__row">
                        <div className="footer-partners__img">
                            <img src="https://ediweb.com/files/ru-ru/articles/auc.jpg" alt="" />
                        </div>
                        <div className="footer-partners__img">
                            <img src="http://www.proforientator.ru/images/specit.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default FooterPartners;