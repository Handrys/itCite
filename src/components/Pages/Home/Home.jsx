import postListMain from "../../../JSON/response-news-main-page.json";
import React from 'react';
import Content from '../../Content/Content';
import BannerList from './BannerList/BannerList';
import './Home.css'
import bckgImg from '../../../img/home-bckg.jpg'
import shareImg from '../../../img/home-share.jpg'
import createImg from '../../../img/home-create.png'
import CustomDialog from "../../CustomDialog/CustomDialog";
import { Button, Link } from "@mui/material";
import { Context } from "../../../state";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPosts } from "../../../shared/queries";
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
    const [postList, setPostList] = React.useState(postListMain);

    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { authorized, userData, userName } = user;
    const { status, isLoading, error, data:dataArr, isFetching } = useGetPosts();

    const handleDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'Auth',
        }
    });

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
    }

    const navigate = useNavigate()


    const postWidth = '47%'

    return (
        <div className='Home'>
            <div className="home__start">
                {user.authorized && 'userData' in user ?
                    <div className="home-start__body">
                        <div className="home-start__title">Добро  пожаловать, <br /> <span>{userData.firstName}</span></div>
                        <Button sx={{ color: 'white', borderColor: 'white', padding: '14px', width: '50%', marginTop: '50px' }} variant="outlined" onClick={() => navigate(`/profile`)}>Перейти в профиль</Button>
                    </div>
                    :
                    <div className="home-start__body">
                        <div className="home-start__title">Добро  пожаловать <br /> <span>Ты у нас в первые?</span></div>
                        <div className="home-start__buttons">
                            <Button sx={{ color: 'white', borderColor: 'white', padding: '14px', width: '50%', margin: '10px' }} variant="outlined" onClick={handleDialogOpen}>Вход</Button>
                            <Button sx={{ color: 'white', borderColor: 'white', padding: '14px', width: '50%', margin: '10px' }} variant="outlined" onClick={handleDialogOpen}>Регистрация</Button>
                        </div>
                    </div>
                }
                <div className="home-start__background"></div>
            </div>

            <div className="home__body">
                
                <div className="home__line">
                    <div className="home-line__img">
                        {/* <img src={bckgImg} alt="" /> */}
                        <div className="home-line__title">Будь в тренде</div>
                        <div className="home-line__description">Узнавай первым обо всех новостях в мире IT и не только. Только самые свежая и актуальная информация у нас в блоге!</div>
                        {/*  <div className="home-line__btn">Читать...</div> */}
                    </div>
                </div>

                <div className="home__content">
                    <div className="container">
                        {/*        {<div className="home-content-elem__title">Последние посты:</div>} */}
                        {isFetching &&  <div className="progress"><CircularProgress /><Button variant="text">Загрузка...</Button></div>}
                        <Content blogPage={'news'} type={'homePosts'} />

                    </div>
                </div>
            </div>
            <div className="home__line">
                {/* <img src={bckgImg} alt="" /> */}
                <div className="home-line__title">Делись</div>
                <div className="home-line__description">Прямиком из нашего блога ты можешь поделится постом в Telegram, Twitter или Facebook, чтобы твои друзья тоже были в теме</div>
                {/*  <div className="home-line__btn">Читать...</div> */}
            </div>

            <div className="home__share">
                <div className="container">
                    <div className="home__share-body">
                        <div className="home-share__title">Просто нажми кнопку под описанием поста, и помоги другим быть в курсе актуальных новостей</div>

                        <div className="home-share__image">
                            <img src={shareImg} alt="" />
                        </div>

                        <div className="home-share__stat">
                            {/* 
                            <div className="home-stat__list">
                                <div className="home-stat__elem">
                                    <div className="home-stat-elem__title">Twitter:</div>
                                    <div className="home-stat-elem__data"><span>300+</span> чел.</div>
                                </div>
                                <div className="home-stat__elem">
                                    <div className="home-stat-elem__title">Facebook:</div>
                                    <div className="home-stat-elem__data"><span>795+</span> чел.</div>
                                </div>
                                <div className="home-stat__elem">
                                    <div className="home-stat-elem__title">Telegram</div>
                                    <div className="home-stat-elem__data"><span>999+</span> чел.</div>
                                </div>
                            </div> */}
                            <div className="home-stat__title">
                                <span>999+</span> людей уже поделились
                            </div>
                        </div>

                    </div>
                </div>

            </div>


            <div className="home__line">
                {/* <img src={bckgImg} alt="" /> */}
                <div className="home-line__title">Создавай</div>
                <div className="home-line__description">Прямиком из нашего блога ты можешь поделится постом в Telegram, Twitter или Facebook, чтобы твои друзья тоже были в теме</div>
                {/*  <div className="home-line__btn">Читать...</div> */}
            </div>

            <div className="home__new">
                <div className="container">
                    <div className="home-new__body">

                        <div className="home-new-line"></div>
                        <div className="home-new__title">
                            Авторизуйся на сайте и создай свой первый пост уже сейчас
                        </div>
                        <div className="home-new__img"><img src={createImg} alt="" /></div>
                        {/*   <Button sx={{padding: '14px', width: '10%', minWidth: '220px', margin: '10px'}} variant="outlined"></Button> */}
                          <Link onClick={scrollTop} underline="none" href="#">Вверх ↑</Link>
                        <div className="home-new-line"></div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;