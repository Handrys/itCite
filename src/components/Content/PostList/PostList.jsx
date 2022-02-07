import React, { useState, useEffect } from 'react';
import AddPost from "./AddPost/AddPost";
import Post from './Post/Post';
import './PostList.css'
import './postLogic.js'
/* import postListJSON from "../../../JSON/response-news-main-page.json"; */
import Button from '@mui/material/Button';
import axios from 'axios';


const PostList = ({ postListArr, postWidth, category, item, fetchPosts}) => {

    const [blogArr, setBlogArr] = React.useState(postListArr);
    const [showAddForm, setShowAddForm] = React.useState(false);

    useEffect(() => {
        setBlogArr(postListArr)
    });

    const toggleShowForm = (value) => {
        value ?  setShowAddForm(true) : setShowAddForm(false)
    }

    const addNewPost = (blogPost) => {
        const temp = [...blogArr];
        temp.push(blogPost);
        setBlogArr(temp)
    }

    const deletePost = (blogPost) => {
        if (window.confirm(`Удалить ${blogPost.title}?`)) {
            console.log(blogPost.id)
            axios.delete(`https://61fe8fc6a58a4e00173c98db.mockapi.io/posts_${category}/${blogPost.id}`)
                .then((response) => {
                    console.log('post delete',response.data)
                    fetchPosts()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }


    const posts = blogArr.map((item, pos) => {
        return (
            <Post
                key = {pos}
                id = {pos}
                item = {item}
                title={item.title}
                image={item.image}
                author={item.author}
                publish_date={item.publish_date}
                deletePost={() => deletePost(item)}
                postWidth={postWidth}
            />
        )
    })

    return (
        <>
        <Button  style={{fontSize: '12px', color: 'blue', margin: '0 auto'}} onClick={() => { toggleShowForm(true)}}>[ Новый пост ]</Button>
        <div className="post-list">
            {
                showAddForm ? <AddPost blogArr={blogArr} addNewPost={addNewPost} toggleShowForm = {toggleShowForm} category = {category} fetchPosts = {fetchPosts} />
                    : null
            }
            {posts}
        </div>
        </>
        
    );
}

export default PostList

//Сделать проверку.В зависимости от того что в пропсах - берем данные или из одного файла или из другого УСЛОВНЫЙ РЕНДЕРИНГ