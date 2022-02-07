import postListMain from "../../../JSON/response-news-main-page.json";
import React from 'react';
import Content from '../../Content/Content';
import BannerList from './BannerList/BannerList';
import './Home.css'

const Home = () => {
    const [postList, setPostList] = React.useState(postListMain);
    const postWidth = '47%'
    return ( 
        <div className='Home'>
            <div className="container">
                <div className="home__body">
                    <Content postListArr={postList} postWidth={postWidth} />
                    <BannerList/>
                </div>
            </div>
        </div> 
    );
}

export default Home;