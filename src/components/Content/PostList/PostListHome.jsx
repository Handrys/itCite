import React, { useState, useEffect, useContext, useCallback } from 'react';
import AddPost from "./AddPost/AddPost";
import Post from './Post/Post';
import './PostList.css'
import './postLogic.js'
/* import postListJSON from "../../../JSON/response-news-main-page.json"; */
import axios from 'axios';
import { Context } from '../../../state'



const PostList = ({ blogPage }) => {

    const { blogState } = useContext(Context)

    const { postsState, dispatchPosts } = useContext(Context)
    const { data, isPending } = postsState;

    useEffect(() => {


        console.log(blogPage)
        dispatchPosts({ type: 'loading', payload: true })
        axios.get(`https://61fe8fc6a58a4e00173c98db.mockapi.io/posts_${blogPage}`)
            .then((response) => {
                console.log('Посты получены!')
                dispatchPosts({ type: 'loading', payload: false })
                dispatchPosts({
                    type: 'add',
                    payload: response.data,
                })
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    },[]);

    
 



const posts = data.slice(0,3).map((item, pos) => {
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
        <div className="post-list">

            {posts}

        </div>
    </>

);
}

export default PostList

