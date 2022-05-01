import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';

/* import './FullPost.css' */
import s from './FullPost.module.css'
import PostMenu from '../../Content/PostList/Post/PostMenu/PostMenu';
import Dialog from '@mui/material/Dialog';
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import axios from 'axios';
import { Context } from '../../../state/context';
import { useGetSinglePost, useDeletePost } from './../../../shared/queries';

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

export const FullPost = (props) => {

    const handleDialogOpen = () =>  dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'deletePostDialog',
            propsDialog: {
                blogPost: post,
                blogPage: blogPage
            }
        }
    });


    const { state, dispatch } = useContext(Context)
    const { posts, islogin } = state;
    const { data, isPending } = posts;

    const [categoryPresent, setCategoryPresent] = React.useState('')
    const [isFullpost, setIsFullpost] = React.useState(true)


    const { blogPage, postId } = useParams();

    const { status, isLoading, data: post, error, isFetching, refetch } = useGetSinglePost(blogPage, postId);


    const setOpacity = isFetching ? 0.5 : 1

    const history = useNavigate()

    useEffect(() => {
        if (!isFetching) {
            if (post.category === 'news') { setCategoryPresent('Новости') }
            if (post.category === 'reviews') { setCategoryPresent('Обзоры') }
            if (post.category === 'articles') { setCategoryPresent('Статьи') }

/*             if (post === undefined) history(`/*`) */
        }
    });

    const deleteMutation = useDeletePost(blogPage,isFullpost);
    
    const deletePost = (blogPost) => {

        deleteMutation.mutateAsync({ blogPage, blogPost })
            .then(() => {
                dispatch({
                    type: 'isOpenDialog',
                    payload: { isOpen: true, variant: 'deletePostStatusDialog', succes: 'true' },
                })
                refetch();
            })
            .catch((err) => {
                dispatch({
                    type: 'isOpenDialog',
                    payload: { isOpen: true, variant: 'deletePostStatusDialog', succes: 'false' },
                })
            })

    };

    const [copySuccess, setCopySuccess] = useState(`http://localhost:3000/${blogPage}/post/${postId}`);

    const styleSocialLink = {
        width: '25%'
    }

    const styleSocialButton = {
        width: '100%',
        height: '100%',
        padding: '15px 0',
        backgroundColor: '#f2f4f6',
        color: '#424141',
        fontWeight: '700',
        '&:hover': {
            color: '#ffff'
        }
    };

 

    return (
        <div className={s.fullpost}>
            <div className="container">
                {isFetching ?
                    <div className="progress"><CircularProgress /></div>
                    :
                    <div className={s.fullpost__body}>
                        <div className={s.post} style={{ with: '100%', height: '100%', opacity: setOpacity }}>
                            <div className={s.post__img}>
                                <img src={post.image} alt="" />
                                <div className={s.post__title}>{post.title}</div>

                            </div>
                            <div className={s.post__content}>

                                <div className={s.post__head}>
                                    <div className={s.post__author}>
                                        <div className={s.post__author__avatar}><img src="https://kod.ru/content/images/size/w50/2020/04/------2.jpg" alt="" /></div>
                                        <div className={s.post__author__info}>
                                            <div className={s.post__author__name}>{post.author}</div>
                                            <div className={s.post__author__date}>
                                                {post.publish_date}
                                            </div>
                                        </div>
                                    </div>
                                    {/*                                     <span className={s.post__category}>{categoryPresent}</span> */}
                                    <div className={s.post__control}>
                                        <Stack direction="row" spacing={2}>
                                            <Button sx={{ color: '#1069a5', border: 'none' }} variant="outlined" startIcon={<EditIcon />}>
                                                Редактировать
                                            </Button>
                                            <Button sx={{ color: '#ed2626', border: 'none', '&:hover': { border: ' 1px solid #ed2626' } }} onClick={handleDialogOpen} variant="outlined" startIcon={<DeleteIcon />}>
                                                Удалить
                                            </Button>

                                        </Stack>
                                    </div>

                                </div>

                                <div className={s.post__description}>

                                    {post.description.split('\n').map(s => <p>{s}</p>)}

                                </div>

                                <div className={s.post__share}>
                                    <div className={s.post__share__title}>Поделись материалом</div>
                                    <div className={s.post__share__buttons}>
                                        <Stack direction="row" spacing={3}>
                                            <ButtonLink sx={styleSocialLink} href="https://twitter.com/intent/tweet?text=%D0%90%D0%B2%D1%82%D0%BE%D0%BF%D0%B8%D0%BB%D0%BE%D1%82%20Tesla%20%D0%B2%D1%80%D0%B5%D0%B7%D0%B0%D0%BB%D1%81%D1%8F%20%D0%B2%20%D1%80%D0%B5%D0%B0%D0%BA%D1%82%D0%B8%D0%B2%D0%BD%D1%8B%D0%B9%20%D1%81%D0%B0%D0%BC%D0%BE%D0%BB%D1%91%D1%82&url=https://kod.ru/tesla-crashed-into-plame/">
                                                <Button sx={styleSocialButton} className='fullpost-social-icon' variant="contained" >
                                                    <TwitterIcon />
                                                </Button>
                                            </ButtonLink>

                                            <ButtonLink sx={styleSocialLink} href="https://www.facebook.com/sharer/sharer.php?u=http://kod.ru">
                                                <Button sx={styleSocialButton} variant="contained" >
                                                    <FacebookIcon />
                                                </Button>
                                            </ButtonLink>

                                            <ButtonLink sx={styleSocialLink} href="tg://msg_url?url=https://kod.ru/tesla-crashed-into-plame/">
                                                <Button sx={styleSocialButton} variant="contained" >

                                                    <SendIcon />

                                                </Button>
                                            </ButtonLink>

                                            <ButtonLink sx={styleSocialLink} onClick={() => { navigator.clipboard.writeText(copySuccess) }}>
                                                <Button sx={styleSocialButton} variant="contained" >
                                                    <ContentCopyIcon />
                                                </Button>
                                            </ButtonLink>
                                        </Stack>
                                    </div>
                                </div>
                                <div style={{ height: '1px', width: '33.333%', margin: '50px auto', backgroundColor: '#858383', border: 'none' }} />
                                <div className={s.post__more}>
                                    <div className={s.post__more__title}>Редакция рекомендует:</div>
                                    <PostList blogPage={post.category} isPage='false' />
                                </div>
                            </div>



                            <CustomDialog deletePost = {() => deletePost(post)} />      

                        </div>

                    </div>
                }
            </div>
        </div>




    );
}

export default FullPost;