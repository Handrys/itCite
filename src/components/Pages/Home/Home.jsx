import postListMain from "../../../JSON/response-news-main-page.json";
import React, { useEffect } from 'react';
import Content from '../../Content/Content';
import BannerList from './BannerList/BannerList';
import './Home.css'
import bckgImg from '../../../img/home-bckg.jpg'
import CustomDialog from "../../CustomDialog/CustomDialog";
import { Button, Link } from "@mui/material";
import { Context } from "../../../state";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPosts } from "../../../shared/queries";
import CircularProgress from '@mui/material/CircularProgress';
import HomeStart from "./HomeStart/HomeStart";
import HomeLine from "./HomeLine/HomeLine";
import HomeShare from "./HomeShare/HomeShare";
import HomeNew from "./HomeNew/HomeNew";

const Home = () => {
    const [postList, setPostList] = React.useState(postListMain);

    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { authorized, userData, userName } = user;
    const { status, isLoading, error, data: dataArr, isFetching } = useGetPosts();

    const handleDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'Auth',
        }
    });

    const dialogInfo = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'confirm',
            dialogTitle: 'Информация ©',
            dialogText: `Уважаемый посетитель, сервер работает на бесплатном хостинге, по этому - первая загрузка может быть долгой. \nСпасибо за понимание 🤗`,
            propsDialog: {
                
            }
        }
    });

    useEffect(() => {
        dialogInfo()
    },[])

    const navigate = useNavigate()

    
    const postWidth = '47%'

    return (
        <div className='Home'>

            {user.authorized && 'userData' in user ?
                <HomeStart 
                    name={userData.firstName} 
                    isAuthorized={true} 
                    handleDialogOpen={handleDialogOpen} 
                />
                :
                <HomeStart 
                    isAuthorized={false} 
                    handleDialogOpen={handleDialogOpen} 
                />
                
            }

            <HomeLine 
                title='Будь в тренде' 
                description='Узнавай первым обо всех новостях в мире IT и не только. Только самые свежая и актуальная информация у нас в блоге!' 
            />

            <div className="content">
                <div className="container">
                    {isFetching && <div className="progress"><CircularProgress /><Button variant="text">Загрузка...</Button></div>}
                    <Content blogPage={'news'} type={'homePosts'} />
                </div>
            </div>

            <HomeLine 
                title='Делись' 
                description='Прямиком из нашего блога ты можешь поделится постом в Telegram, Twitter или Facebook, чтобы твои друзья тоже были в теме' 
            />

            <HomeShare />

            <HomeLine 
                title='Создавай' 
                description='Прямиком из нашего блога ты можешь поделится постом в Telegram, Twitter или Facebook, чтобы твои друзья тоже были в теме' 
            />

           <HomeNew />
        </div>

    );
}

export default Home;