import React, { useState, useEffect, useContext, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import PostMenu from '../../Content/PostList/Post/PostMenu/PostMenu';
import PostMenuDialog from '../../Content/PostList/Post/PostMenuDialog/PostMenuDialog';
import Dialog from '@mui/material/Dialog';
import PostMenuDialogStatus from '../../Content/PostList/Post/PostMenuDialog/PostMenuDialogStatus/PostMenuDialogStatus';
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";
import axios from 'axios';
import { Context } from '../../../state/context';
import { useGetSinglePost } from './../../../shared/queries';
import CircularProgress from '@mui/material/CircularProgress';



export const FullPost = (props) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);

    const { postsState, dispatchPosts } = useContext(Context)
    const { posts, islogin } = postsState;
    const { data, isPending } = posts;

    const [fullPost, setFullPost] = React.useState([]);

    const { pages, postId } = useParams();

    const { status, isLoading, data: post, error, isFetching } = useGetSinglePost(pages, postId);


    if (isLoading) return null

    return (
        <>
            {isFetching && <div className="progress"><CircularProgress /></div>}
            <div className="post" style={{ with: '100%', height: '100%' }}>
                <div className="post__img">
                    <img src={post.image} alt="" />
                    <span>{post.category}</span>
                    <div className="delete-icon" /* onClick={deletePost} */><PostMenu
                        category={post.category}
                        blogPost={post.item}
                        deletePost={post.deletePost}
                        dialogOpen={dialogOpen}
                        handleDialogOpen={handleDialogOpen}
                        handleDialogClose={handleDialogClose}
                    />
                    </div>
                </div>
                <div className="post__content">
                    <div className="post__content-title">{post.title}</div>
                    <div className="post__content-author">
                        <div className="post-author__avatar"><img src="https://kod.ru/content/images/size/w50/2020/04/------2.jpg" alt="" /></div>
                        <div className="post-author__info">
                            <div className="post-author-info__name">{post.author}</div>
                            <div className="post-author-info__date">
                                {post.publish_date}
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                >
                    <PostMenuDialog
                        open={dialogOpen}
                        onClose={handleDialogClose}
                        blogPost={props.blogPost}
                        deletePost={props.deletePost}


                    />
                </Dialog>


            </div>
        </>



    );
}

export default FullPost;