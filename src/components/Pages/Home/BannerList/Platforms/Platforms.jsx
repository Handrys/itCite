import './Platforms.css'
import '../BannerList'
/* import instagram from '../../../../../img/social/Instagram.png'
import telegram from '../../../../../img/social/Telegram.png'
import tiktok from '../../../../../img/social/TikTok.png'
import vk from '../../../../../img/social/VK.png' */


const platforms = () => {
    return ( 
        <div className="platforms banner">
            <div className="platforms__title banner-title">Наши площадки</div>
            <div className="platforms__content">
                {/* <div className="platforms__list">
                    <div className="platforms__img">
                        <img src={instagram} alt="" />
                    </div>
                    <div className="platforms__img">
                        <img src={telegram} alt="" />
                    </div>
                    <div className="platforms__img">
                        <img src={tiktok} alt="" />
                    </div>
                    <div className="platforms__img">
                        <img src={vk} alt="" />
                    </div>
                </div> */}
            </div>
        </div> 
    );
}

export default platforms;