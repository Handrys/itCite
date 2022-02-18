import React, { useState, useEffect, useContext } from 'react';
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



const PostList = ({ postListArr, postWidth, category, categoryTitle, item, fetchPosts, initialCount }) => {

const { blogState } = useContext(Context)



    const [blogArr, setBlogArr] = React.useState(postListArr);

    const [showAddForm, setShowAddForm] = React.useState(false);

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const { postsState, dispatchPosts } = useContext(Context)
    const { data, isPending } = postsState;

    useEffect(() => {
        setBlogArr(postListArr)
    });

    const toggleShowForm = (value) => {
        value ? setShowAddForm(true) : setShowAddForm(false)
    }

    const addNewPost = (blogPost) => {
        const temp = [...data];
        temp.push(blogPost);
        dispatchPosts(temp)
    }

    const deletePost = (blogPost) => {
        if (window.confirm(`Удалить ${blogPost.title}?`)) {
            console.log(blogPost.id)
            axios.delete(`https://61fe8fc6a58a4e00173c98db.mockapi.io/posts_${category}/${blogPost.id}`)
                .then((response) => {
                    console.log('post delete', response.data)
                    fetchPosts()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
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
                postWidth={postWidth}
                category={item.category}
            />
        )
    })

    return (
        <>
            <div className="post-add-btn">
                <NavLink to="/addpost" style={{ color: 'black' }}>
                    <Fab color="primary" aria-label="add" onClick={handleModalOpen}>
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
                <Modal
                    open={modalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <AddPost
                        blogArr={blogArr}
                        addNewPost={addNewPost}
                        category={category}
                        categoryTitle={categoryTitle}
                        fetchPosts={fetchPosts}
                        onClose={handleModalClose}
                    />
                </Modal>
            </div>
        </>

    );
}

export default PostList

//Сделать проверку.В зависимости от того что в пропсах - берем данные или из одного файла или из другого УСЛОВНЫЙ РЕНДЕРИНГ