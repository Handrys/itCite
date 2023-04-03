import Box from '@mui/material/Box';
import s from './ProfilePosts.module.css'
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import sadImg from '../../../../img/pages/profile-sad.png'
import Content from '../../../Content/Content';
import { Context } from '../../../../state';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';



const ProfilePosts = () => {

    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { postsArr, isPending } = posts;
    const { authorized, myPosts, userData } = user;
    const [userId, setUserId] = useState();
    const [myPostsCount, setMyPostsCount] = useState();

    if (!user.userData && authorized) return null
    console.log(myPosts)

    const postsCount = 1;
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px',
                    backgroundColor: '#EAEAEA',
                    boxShadow: '3px 5px 4px rgba(0, 0, 0, 0.25)',
                    padding: '25px',
                    boxSizing: 'border-box',
                    overflow: 'hidden'
                    /* '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    }, */
                }}
            >
                <div className={s.top}>
                    <div className={s.title}>Мои публикации</div>
                    <div className={s.subtitle}>
                        <InstallDesktopIcon color="action" />
                        <div className={s.subtitle__value}>{myPosts}</div>
                    </div>
                </div>
                <div className={s.content}>
                    <Content blogPage={'news'} type={'userPosts'} />
                    {myPosts === 0
                        &&
                        <div className={s.contentNone}>
                            <img src={sadImg} alt="" />
                            <span>Вы не создали ни одного поста... <br /> Не пора-ли это исправить?</span>
                        </div>
                    }


                </div>
            </Box>
        </>
    );
}

export default ProfilePosts;