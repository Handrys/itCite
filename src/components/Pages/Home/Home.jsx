import postListMain from "../../../JSON/response-news-main-page.json";
import React from 'react';
import Content from '../../Content/Content';
import BannerList from './BannerList/BannerList';
import './Home.css'
import startImg from './img/background.jpg'

const Home = () => {
    const [postList, setPostList] = React.useState(postListMain);

    const postWidth = '47%'
    return (
        <div className='Home'>
            <div className="container">
                <div className="home__body">
                    <div className="home__start">
                        <div className="home-start__img">
                            <img src= {startImg} alt="" />
                            <div className="home-start__title">Узнавай первым обо всем из мира IT</div>
                            <div className="home-start__btn">Читать...</div>
                        </div>
                    </div>
                    <div className="home__content">
                        <div className="home-content__news home-content-elem">
                            <div className="home-content-elem__title">Последние новости:</div>
                            <div className="home-content-elem__data">
                                <Content blogPage={'news'} isPage = {'false'} />
                            </div>
                        </div>
                        <div className="home-content__articles home-content-elem">
                            <div className="home-content-elem__title">Последние статьи:</div>
                            <div className="home-content-elem__data">
                                <Content blogPage={'articles'} isPage = {'false'} />
                            </div>
                        </div>
                        <div className="home-content__reviews home-content-elem">
                            <div className="home-content-elem__title">Последние обзоры:</div>
                            <div className="home-content-elem__data">
                                <Content blogPage={'reviews'} isPage = {'false'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;