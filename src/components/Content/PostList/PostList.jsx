import React, { useState, useEffect, useContext, useCallback } from 'react';
import AddPost from "./AddPost/AddPost";
import Post from './Post/Post';
import './PostList.css'
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



const PostList = ({ blogPage, isPage }) => {


    const { state, dispatch } = useContext(Context)
    const { posts, islogin, dialog } = state;
    const { postsArr, isPending } = posts;
    const { isOpen, variant, succes, answer, propsDialog } = dialog;

    const { status, isLoading, data: dataArr, error, isFetching, refetch } = useGetPosts(blogPage);

    const [isFullpost, setIsFullpost] = React.useState(false)

    const deleteMutation = useDeletePost(blogPage, isFullpost);



    if (isLoading) return null

    const deletePost = (blogPost) => {
        console.log(blogPost)
        deleteMutation.mutateAsync({ blogPage, blogPost })
            .then(() => {
                refetch();
                dispatch({
                    type: 'isOpenDialog',
                    payload: { isOpen: true, variant: 'deletePostStatusDialog', succes: 'true' },
                })
            })
            .catch(() => {
                dispatch({
                    type: 'isOpenDialog',
                    payload: { isOpen: true, variant: 'deletePostStatusDialog', succes: 'false' },
                })
            })

    };


    const allPosts = postsArr.map((item, pos) => {
        return (
            <Post
                key={pos}
                id={pos}
                item={item}
                title={item.title}
                image={item.image}
                author={item.author}
                publish_date={item.publish_date}
                deletePost={deletePost}
                category={item.category}
                blogPage={blogPage}


            />
        )
    })

    const presentPosts = postsArr.slice(0, 3).map((item, pos) => {
        return (
            <Post
                key={pos}
                id={pos}
                item={item}
                title={item.title}
                image={item.image}
                author={item.author}
                publish_date={item.publish_date}
                /*  deletePost={() => deletePost(item)} */
                category={item.category}
                blogPage={blogPage}
            />
        )
    })


    return (
        <>
            <div className="post-add-btn">
                <NavLink to="/addpost" style={{ color: 'black' }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </NavLink>


            </div>
            {isPage === 'true' ?
                <div className="post-list">
                    {allPosts}
                </div>
                :
                <div className="post-list">
                    {presentPosts}
                </div>
            }
        <CustomDialog deletePost = {() => deletePost(propsDialog.blogPost)} />       
        </>

    );
}

export default PostList

