import Recommend from "./Recommend/Recommend";
import './BannerList.css'
import Platforms from "./Platforms/Platforms";
import Advertising from "./Advertising/Advertising";

const BannerList = () => {
    return ( 
        <div className="banner-list">
            <Recommend/>
            <Platforms/>
            <Advertising/>
        </div> 
    );
}

export default BannerList;