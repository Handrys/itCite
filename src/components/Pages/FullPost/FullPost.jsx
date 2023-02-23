import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';

/* import './FullPost.css' */
import s from './FullPost.module.css'
import PostMenu from '../../Content/PostList/Post/PostMenu/PostMenu';
import Dialog from '@mui/material/Dialog';
import { BrowserRouter, Routes, Route, Link, useParams, NavLink } from "react-router-dom";
import axios from 'axios';
import { Context } from '../../../state/context';
import { useGetSinglePost, useDeletePost, useMutationComments } from './../../../shared/queries';

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ButtonLink from '@mui/material/Link';

import { useNavigate } from 'react-router-dom'

import PostList from './../../Content/PostList/PostList';

import Divider from '@mui/material/Divider';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import CustomDialog from './../../CustomDialog/CustomDialog';
import { Popover, Typography } from 'antd';
import { Comments } from './Comments/Comments';
import { Likes } from './Likes/Likes';

export const FullPost = (props) => {

    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { data, isPending } = posts;
    const { authorized } = user;
    const [isAuthor, setisAuthor] = useState(false)

    const [categoryPresent, setCategoryPresent] = React.useState('')
    const [isFullpost, setIsFullpost] = React.useState(true)


    const { postId } = useParams();

    const { status, isLoading, data: post, error, isFetching, refetch } = useGetSinglePost(postId);

    const [publishData, setPublishData] = useState({ data: '', time: '' })


    const useCommentsMutation = useMutationComments();

    const navigate = useNavigate()


    useEffect(() => {
        refetch()
    }, [postId])


    const setOpacity = isFetching ? 0.5 : 1


    useEffect(() => {
        if (!isFetching) {
            if (post.category === 'news') { setCategoryPresent('Новости') }
            if (post.category === 'reviews') { setCategoryPresent('Обзоры') }
            if (post.category === 'articles') { setCategoryPresent('Статьи') }




        }
    }, [status]);

    const confirmPostDelete = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'confirm',
            dialogTitle: 'Подтверждение',
            dialogText: 'Вы действительно хотите удалить этот пост?',
            propsDialog: {
                isConfirmed: () => deletePost(post)
            }
        }
    });




    const deleteMutation = useDeletePost(isFullpost);

    const deletePost = (blogPost) => {

        deleteMutation.mutateAsync({ blogPost })
            .then(() => {
                dispatch({
                    type: 'isOpenDialog',
                    payload: {
                        isOpen: true,
                        variant: 'succes',
                        dialogTitle: 'Информация:',
                        dialogText: 'Пост успешно удален!'
                    }
                })
                navigate(`/`)
            })
            .catch((err) => {
                dispatch({
                    type: 'isOpenDialog',
                    payload: {
                        isOpen: true,
                        variant: 'error',
                        dialogTitle: 'Ошибка',
                        dialogText: 'При удалении поста произошла ошибка!'
                    }
                })
            })

    };

    const [postLink, setPostLink] = useState(`https://blogt-it.vercel.app/posts/${postId}`);
    const [telegramLink, setTelegramLink] = useState(`tg://msg_url?url=${postLink}`);
    const [facebookLink, setFacebookLink] = useState(`https://www.facebook.com/sharer/sharer.php?u=${postLink}`);
    const [twitterLink, setTwitterLink] = useState(`https://twitter.com/intent/tweet?text=Новаястатья&url=${postLink}`);


    const styleSocialLink = {
        width: '25%',
        margin: '0 auto',
    }

    const styleSocialButton = {
        width: '100%',
        height: '100%',
        minWidth: '70px',
        padding: '15px 0',
        backgroundColor: '#f2f4f6',
        color: '#424141',
        fontWeight: '700',

        '&:hover': {
            color: '#ffff'
        }
    };



    useEffect(() => {
        if (user.userData && post) {
            (user.userData._id === post.author._id || user.userData.role === 'admin') ? setisAuthor(true) : setisAuthor(false)
        }
    }, [isFetching])

    useEffect(() => {
        if (post) {
            setPublishData({
                'data': post.createdAt.split('T').shift(),
                'time': post.createdAt.split('.').shift().split('T').pop()
            });
        }
    }, [isFetching])



    if (isFetching) return null

    console.log(authorized)
    const stylePostImage = {
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: `url(${post.image})`
    }
    /*  console.log(post) */
    /*  console.log(post.image) */
    return (
        <div className={s.fullpost}>
            {isFetching ?
                <div className="progress"><CircularProgress /><Button variant="text">Загрузка...</Button></div>
                :
                <>
                    <div className={s.post__img} style={stylePostImage}>
                        {/* <img src={post.image} alt="" /> */}
                        <div className={s.post__title}>{post.title}</div>

                    </div>
                    <div className="container">

                        <div className={s.fullpost__body}>
                            <div className={s.post} style={{ width: '100%', height: '100%', opacity: setOpacity }}>

                                <div className={s.post__content}>

                                    <div className={s.post__head}>
                                        <div className={s.post__author}>
                                            <div className={s.post__author__avatar}><img src={post.author.avatarUrl} alt="" /></div>
                                            <div className={s.post__author__info}>
                                                <div className={s.post__author__name}>{post.author.fullName}</div>
                                                <div className={s.post__author__description}>{post.author.description}</div>
                                                {/*                                             <div className={s.post__author__date}>
                                                Дата создания: {post.createdAt}
                                            </div> */}
                                            </div>
                                        </div>
                                        {/* <span className={s.post__category}>{categoryPresent}</span> */}
                                        <div className={s.post__control}>
                                            <Stack direction="row" spacing={2}>
                                                <Button onClick={() => navigate(`/posts/${post._id}/edit`)} disabled={!isAuthor} sx={{ color: '#1069a5', border: 'none' }} variant="outlined" startIcon={<EditIcon />}>
                                                  
                                                        <span className={s.post__control__title}>
                                                            Редактировать
                                                     </span>      
                                                </Button>

                                                <Button disabled={!isAuthor} sx={{ color: '#ed2626', border: 'none', '&:hover': { border: ' 1px solid #ed2626' } }} onClick={confirmPostDelete} variant="outlined" startIcon={<DeleteIcon />}>
                                                    <span className={s.post__control__title}>Удалить</span>
                                                </Button>

                                            </Stack>
                                        </div>

                                    </div>

                                    <div className={s.post__description} >

                                        {/* {post.description.split('\n').map(s => <p>{s}</p>)} */}
                                        {/*                                 {post.description} */}
                                        <div dangerouslySetInnerHTML={{ __html: post.description }}></div>

                                    </div>
                                    <div className={s.likes}>
                                        <Likes
                                            postId={postId}
                                            postLikes={post.likes}
                                            refetchPost={refetch}
                                        />
                                    </div>

                                    <div className={s.post__share}>
                                        <div className={s.post__share__title}>Поделись материалом</div>
                                        <div className={s.post__share__buttons}>
                                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                                                <ButtonLink width={{ xs: '100%', sm: '25%' }} sx={{ margin: '0 auto' }} href={twitterLink}>
                                                    <Button sx={styleSocialButton} className='fullpost-social-icon' variant="contained" >
                                                        <TwitterIcon />
                                                    </Button>
                                                </ButtonLink>

                                                <ButtonLink width={{ xs: '100%', sm: '25%' }} sx={{ margin: '0 auto' }} href={facebookLink}>
                                                    <Button sx={styleSocialButton} variant="contained" >
                                                        <FacebookIcon />
                                                    </Button>
                                                </ButtonLink>

                                                <ButtonLink width={{ xs: '100%', sm: '25%' }} sx={{ margin: '0 auto' }} href={telegramLink}>
                                                    <Button sx={styleSocialButton} variant="contained" >

                                                        <SendIcon />

                                                    </Button>
                                                </ButtonLink>

                                                <ButtonLink width={{ xs: '100%', sm: '25%' }} sx={{ margin: '0 auto' }} onClick={() => { navigator.clipboard.writeText(postLink) }}>
                                                    <Button sx={styleSocialButton} variant="contained" >
                                                        <ContentCopyIcon />
                                                    </Button>

                                                </ButtonLink>
                                            </Stack>
                                        </div>
                                    </div>



                                    <div className={s.post__publishData}>
                                        <span>Создано: {publishData.data}</span>
                                        <span style={{ marginLeft: '5px' }}>в {publishData.time}</span>
                                    </div>

                                    <Comments
                                        postId={postId}
                                        comments={post.comments}
                                        refetchPost={refetch}

                                    />

                                    {/* <div style={{ height: '1px', width: '33.333%', margin: '30px auto', backgroundColor: '#858383', border: 'none' }} /> */}
                                    {/*   <div className={s.post__more}>
                                        <div className={s.post__more__title}>Редакция рекомендует:</div>
                                        <PostList blogPage={post.category} type='presentPosts' isPage='false' />
                                    </div> */}
                                </div>



                                <CustomDialog />

                            </div>

                        </div>

                    </div>
                </>
            }

        </div>





    );
}

export default FullPost;