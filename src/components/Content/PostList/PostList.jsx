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
import {
    Link,
    NavLink
} from "react-router-dom";
import { Context } from '../../../state'
import PostMenuDialog from './Post/PostMenuDialog/PostMenuDialog';
import Dialog from '@mui/material/Dialog';
import PostMenuDialogStatus from './Post/PostMenuDialog/PostMenuDialogStatus/PostMenuDialogStatus';



const PostList = ({ blogPage }) => {

    const { blogState } = useContext(Context)

    const { postsState, dispatchPosts } = useContext(Context)
    const { data, isPending } = postsState;

    const [isDeleted, setIsDeleted] = useState(false)
    const postDeleted = () => {}

    const [dialogStatusOpen, setDialogStatusOpen] = React.useState(false);
    const handleDialogStatusOpen = () => setDialogStatusOpen(true);
    const handleDialogStatusClose = () => setDialogStatusOpen(false);

    const [dialogStatusType, setDialogStatusType] = React.useState(false)
    const handleDialogStatusTypeTrue = () => setDialogStatusType(true);
    const handleDialogStatusTypeFalse = () => setDialogStatusType(false);

    const fetchPosts = () => {

        console.log(blogPage)
        dispatchPosts({ type: 'loading', payload: true })
        axios.get(`https://61fe8fc6a58a4e00173c98db.mockapi.io/posts_${blogPage}`)
            .then((response) => {
                console.log('Посты получены!')
                dispatchPosts({ type: 'loading', payload: false })
                dispatchPosts({
                    type: 'addPost',
                    payload: response.data,
                })
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchPosts()
    }, []);

    const deletePost = (blogPost) => {
        
            /* console.log(blogPost.id) */
            axios.delete(`https://61fe8fc6a58a4e00173c98db.mockapi.io/posts_${blogPost.category}/${blogPost.id}`)
                .then((response) => {
                    console.log('post delete', response.data)
                    handleDialogStatusTypeTrue()
                    handleDialogStatusOpen()
                    fetchPosts()
                })
                .catch((err) => {
                    console.log(err)
                    handleDialogStatusTypeFalse()
                    handleDialogStatusOpen()
                })
            

                
        
    } 


    const posts = data.map((item, pos) => {
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
            {/*             <div className="reduser-list">
                {blogState.map((item,pos) => {

                })}
            </div> */}
            <div className="post-list">

                {posts}

            </div>
            
            <Dialog
                open={dialogStatusOpen}
                onClose={handleDialogStatusClose}
                dialogType = {dialogStatusType}
            >
                <PostMenuDialogStatus
                    open={dialogStatusOpen}
                    onClose={handleDialogStatusClose}
                    dialogType = {dialogStatusType}
                />
            </Dialog> 
        </>

    );
}

export default PostList

//Сделать проверку.В зависимости от того что в пропсах - берем данные или из одного файла или из другого УСЛОВНЫЙ РЕНДЕРИНГ