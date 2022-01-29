
import Content from '../../Content/Content';
import BannerList from './BannerList/BannerList';
import './Home.css'

const Home = () => {

    return ( 
        <div className='Home'>
            <div className="container">
                <div className="home__body">
                    <Content/>
                    <BannerList/>
                </div>
            </div>
        </div> 
    );
}

export default Home;