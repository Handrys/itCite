import React, { useState, useEffect, useContext, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './Post.css';
import PostMenu from './PostMenu/PostMenu';
import Dialog from '@mui/material/Dialog';
import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from "react-router-dom";
import NotFound from './../../../NotFound/NotFound';
import axios from 'axios';
import { Context } from '../../../../state';
import CustomDialog from '../../../CustomDialog/CustomDialog';
import DeletePostDialog from './../../../CustomDialog/DeletePostDialog/DeletePostDialog';

export const Post = (props) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);

    const { state, dispatch } = useContext(Context)
    const { posts, islogin, dialog } = state;
    const { data, isPending } = posts;
    const { isOpen, variant, succes, answer } = dialog;

    useEffect(() => {
        if (variant === 'deletePostDialog' && answer === true ) {props.deletePost(props.item)}
    },[succes]);

    /*  isDeleted ? handleDialogStatusOpen() : handleDialogStatusClose() */
    /*  props.isDeleted ? console.log('yes') : console.log('no') */



    return (
        <React.Fragment key={props.item.id}>
            <div className="post" style={{ with: '100%', height: '100%' }}>

                <div className="post__img" /* onClick={ () =>  } */>

                    <img src={props.image} alt="" />

                    <div className="post-more">
                        <NavLink key={props.item.id} to={`/${props.blogPage}/post/${props.item.id}`}>
                            Подробнее...

                        </NavLink>
                    </div>

                    {/* <span>{props.category}</span> */}
                    <div className="delete-icon" /* onClick={deletePost} */>
                        <PostMenu
                            category={props.category}
                            blogPost={props.item}
                            
                            dialogOpen={dialogOpen}
                            handleDialogOpen={handleDialogOpen}
                            handleDialogClose={handleDialogClose}
                        />
                    </div>
                </div>


                <div className="post__content">
                    <div className="post__content-title">{props.title}</div>
                    <div className="post__content-author">
                        <div className="post-author__avatar"><img src="https://kod.ru/content/images/size/w50/2020/04/------2.jpg" alt="" /></div>
                        <div className="post-author__info">
                            <div className="post-author-info__name">{props.author}</div>
                            <div className="post-author-info__date">
                                {props.publish_date}
                            </div>
                        </div>
                    </div>
                </div>

                    
            </div>
        </React.Fragment>);
}

export default Post;