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
import PostMenuDialog from './Post/PostMenuDialog/PostMenuDialog';
import Dialog from '@mui/material/Dialog';
import PostMenuDialogStatus from './Post/PostMenuDialog/PostMenuDialogStatus/PostMenuDialogStatus';
import { useGetPosts, useDeletePost } from './../../../shared/queries';



const PostList = ({ blogPage, isPage }) => {


    const { postsState, dispatchPosts } = useContext(Context)
    const { posts, islogin } = postsState;
    const { postsArr, isPending } = posts;

    const [isDeleted, setIsDeleted] = useState(false)
    const postDeleted = () => { }

    const [dialogStatusOpen, setDialogStatusOpen] = React.useState(false);
    const handleDialogStatusOpen = () => setDialogStatusOpen(true);
    const handleDialogStatusClose = () => setDialogStatusOpen(false);

    const [dialogStatusType, setDialogStatusType] = React.useState(false)
    const handleDialogStatusTypeTrue = () => setDialogStatusType(true);
    const handleDialogStatusTypeFalse = () => setDialogStatusType(false);

    const { status, isLoading, data: dataArr, error, isFetching, refetch } = useGetPosts(blogPage);
    const deleteMutation = useDeletePost();


    if (isLoading) return null

    const deletePost = (blogPost) => {
        console.log(blogPost.id)
        deleteMutation.mutateAsync({blogPage,blogPost})
            .then(() => {
                refetch();
                handleDialogStatusTypeTrue();
                handleDialogStatusOpen();
            })
            .catch((err) => {
                handleDialogStatusTypeFalse()
                handleDialogStatusOpen()
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
                deletePost={() => deletePost(item)}
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
            <Dialog
                open={dialogStatusOpen}
                onClose={handleDialogStatusClose}
                dialogType={dialogStatusType}
            >
                <PostMenuDialogStatus
                    open={dialogStatusOpen}
                    onClose={handleDialogStatusClose}
                    dialogType={dialogStatusType}
                />
            </Dialog>
        </>

    );
}

export default PostList

