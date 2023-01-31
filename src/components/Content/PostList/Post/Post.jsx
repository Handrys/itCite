import React, { useState, useEffect, useContext, useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './Post.module.css';
import PostMenu from './PostMenu/PostMenu';
import Dialog from '@mui/material/Dialog';
import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from "react-router-dom";
import NotFound from './../../../NotFound/NotFound';
import axios from 'axios';
import { Context } from '../../../../state';
import CustomDialog from '../../../CustomDialog/CustomDialog';
import DeletePostDialog from './../../../CustomDialog/DeletePostDialog/DeletePostDialog';
import defaultImg from '../../../../img/vopros-znak.jpg'
import { Author } from '../../../Author/Author';

export const Post = (props) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);

    const { state, dispatch } = useContext(Context)
    const { posts, user, dialog } = state;
    const { data, isPending } = posts;
    const { isOpen, variant, succes, answer } = dialog;
    const { authorized } = user;
    const [isAuthor, setisAuthor] = useState(false)

    useEffect(() => {
        if (variant === 'deletePostDialog' && answer === true) { props.deletePost(props.item) }
    }, [succes || user.author]);

    /*  isDeleted ? handleDialogStatusOpen() : handleDialogStatusClose() */
    /*  props.isDeleted ? console.log('yes') : console.log('no') */


    const styles = {
        stylesPage: {
            padding: '0 10px',
            margin: '15px 0',
            width: '100%',
            /* minWidth: '320px', */
            /*  flexGrow: '0', */

        },
        'stylesPage:last-child': {
            flexGrow: '0'
        },
        stylesProfile: {
            padding: '0 10px',
            margin: '15px 0',
            width: '100%'
        }
    }


    useEffect(() => {
        if (user.userData) {
            (user.userData._id === props.item.author._id || user.userData.role === 'admin') ? setisAuthor(true) : setisAuthor(false)
        }
    }, [])

    return (
        <React.Fragment key={props.item._id}>
            <div className={s.post} style={(props.type === 'userPosts' ? styles.stylesProfile : styles.stylesPage)}>

                <div className={s.post__img} /* onClick={ () =>  } */>

                    <img src={props.image} alt='Картинка поста' />


                    <NavLink key={props.item._id} to={`/posts/${props.item._id}`}>
                        <div className={s.postMore}>
                            Подробнее...
                        </div>
                    </NavLink>


                    {/* <span>{props.category}</span> */}
                    {isAuthor &&
                        <div className={s.deleteIcon} /* onClick={deletePost} */>
                            <PostMenu
                                category={props.category}
                                blogPost={props.item}
                                blogPage={props.blogPage}
                                dialogOpen={dialogOpen}
                                handleDialogOpen={handleDialogOpen}
                                handleDialogClose={handleDialogClose}
                                deletePost={props.deletePost}
                            />
                        </div>
                    }

                </div>


                <div className={s.post__content}>
                    <div className={s.postContent__title}><NavLink key={props.item.id} to={`/posts/${props.item._id}`}>{props.title}</NavLink></div>
            
                    <Author avatarUrl = {props.author.avatarUrl} fullName = {props.author.fullName} publishDate = {props.publish_date} publishTime = {props.publish_time} />
                </div>


            </div>
        </React.Fragment>);
}

export default Post;