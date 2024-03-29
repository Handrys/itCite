import React, { useState, useEffect, useContext, useCallback } from 'react';
import AddPost from "./AddPost/AddPost";
import Post from './Post/Post';
import s from './PostList.module.css'
import './postLogic.js'
/* import postListJSON from "../../../JSON/response-news-main-page.json"; */
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { Context } from './../../../state/context'
import Dialog from '@mui/material/Dialog';
import { useGetPosts, useDeletePost } from './../../../shared/queries';
import CustomDialog from './../../CustomDialog/CustomDialog';
import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';



const PostList = ({ blogPage, type, postsCount }) => {


    const { state, dispatch } = useContext(Context)
    const { posts, user, dialog } = state;
    const { postsArr, isPending } = posts;
    const { isOpen, variant, succes, answer, propsDialog } = dialog;
    const { authorized } = user;


    const { status, isLoading, data: dataArr, error, isFetching, refetch } = useGetPosts(blogPage);

    const [userId, setUserId] = useState();

    const [isFullpost, setIsFullpost] = React.useState(false)

    const [postsView, setpostsView] = React.useState(12)

    const deleteMutation = useDeletePost(blogPage, isFullpost);



    useEffect(() => {
        !user.userData ? setUserId(0) : setUserId(user.userData._id)
    }, [])


    useEffect(() => {
        const num = postsArr.slice().reverse().filter(element => element.author._id === userId).length;
        dispatch({
            type: 'userPosts',
            payload: {
                ...user,
                myPosts: num
            },
        })

    }, [postsArr])



    if (isFetching) return null

    const addpostsView = () => { setpostsView(postsView + 12) }



    const deletePost = (blogPost) => {
        console.log(blogPost)
        deleteMutation.mutateAsync({ blogPage, blogPost })
            .then(() => {
                refetch();
                dispatch({
                    type: 'isOpenDialog',
                    payload: {
                        isOpen: true,
                        variant: 'succes',
                        dialogTitle: 'Информация:',
                        dialogText: 'Пост успешно удален!'
                    }
                })
            })
            .catch(() => {
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

    const arr = []
    const allPosts = postsArr.slice().reverse().filter(element => element.category === blogPage).slice(0, postsView).map((item, pos) => {

        /* console.log(item) */
        return (
            <Grid xs={2} sm={4} md={4} key={pos} >
                <Post
                    key={pos}
                    id={pos}
                    item={item}
                    title={item.title}
                    image={item.image}
                    author={item.author}
                    publish_date={item.createdAt.split('.').shift().split('T').shift()}
                    publish_time={item.createdAt.split('.').shift().split('T').pop()}
                    deletePost={deletePost}
                    category={item.category}
                    blogPage={blogPage}
                    type={type}


                />
            </Grid>
        )
    })

    const homePosts = postsArr.slice().reverse().slice(0, 4).map((item, pos) => {

        /* console.log(item) */
        return (
            <Grid xs={2} sm={4} md={6} key={pos} >
                <Post
                    key={pos}
                    id={pos}
                    item={item}
                    title={item.title}
                    image={item.image}
                    author={item.author}
                    publish_date={item.createdAt.split('.').shift().split('T').shift()}
                    publish_time={item.createdAt.split('.').shift().split('T').pop()}
                    deletePost={deletePost}
                    category={item.category}
                    blogPage={blogPage}
                    type={type}


                />
            </Grid>
        )
    })




    const presentPosts = postsArr.slice().reverse().slice(0, 3).map((item, pos) => {
        return (
            <Grid xs={2} sm={2} md={6} key={pos} >
                <Post
                    key={pos}
                    id={pos}
                    item={item}
                    title={item.title}
                    image={item.image}
                    author={item.author}
                    publish_date={item.createdAt.split('.').shift().split('T').shift()}
                    publish_time={item.createdAt.split('.').shift().split('T').pop()}
                    /*  deletePost={() => deletePost(item)} */
                    category={item.category}
                    blogPage={blogPage}
                    type={type}
                />
            </Grid>
        )
    })



    const userPosts = postsArr.slice().reverse().filter(element => element.author._id === userId).slice(0, postsView).map((item, pos) => {

        return (
            <Post
                key={pos}
                id={pos}
                item={item}
                title={item.title}
                image={item.image}
                author={item.author}
                publish_date={item.createdAt.split('.').shift().split('T').shift()}
                publish_time={item.createdAt.split('.').shift().split('T').pop()}
                deletePost={deletePost}
                category={item.category}
                blogPage={blogPage}
                type={type}

            />
        )
    })










    return (
        <>
            {authorized === true ? <div className={s.btnAdd}>
                <NavLink to="/addpost" style={{ color: 'black' }}>
                    <Fab color="primary" aria-label="add" sx={{ backgroundColor: '#01579b' }}>
                        <AddIcon />
                    </Fab>
                </NavLink>
            </div>
                : null
            }
            {type === 'pagePosts' &&
                <div className={s.wrapper}>
                    <div className={s.list}>
                        <Grid container sx={{ flexGrow: 1 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                            {allPosts}
                        </Grid>
                    </div>
                    <div className={s.bottom}>
                        <Button disabled={postsCount <= postsView} onClick={addpostsView} variant="outlined">Показать еще</Button>
                    </div>
                </div>
            }
            {type === 'homePosts' &&
                <div className={s.wrapper}>
                    <div className={s.list}>
                        <Grid container sx={{ flexGrow: 1 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                            {homePosts}
                        </Grid>
                    </div>

                </div>
            }
            {type === 'presentPosts' &&
                <div className={s.list}>
                    <Grid container sx={{ flexGrow: 1 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 2, md: 18 }}>
                        {presentPosts}
                    </Grid>
                </div>
            }
            {
                type === 'userPosts' &&
                <div className={s.list}>
                    <Grid container sx={{ flexGrow: 1 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                        {userPosts}
                        
                    </Grid>
                </div>
            }
            {<CustomDialog  />}
        </>

    );
}

export default PostList

