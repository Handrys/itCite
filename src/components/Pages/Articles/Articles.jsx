import React, { useState, useEffect } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import postListArticles from "../../../JSON/response_test_2.json";
import PagesDescription from './../PagesDescription/PagesDescription';
import Content from './../../Content/Content';

const Articles = () => {
    const [postList, setPostList] = React.useState([]);
    const [category, setCategory] = React.useState('articles')
    const postWidth = '30%'
    const [isPending, setIsPending] = React.useState(false)

    const fetchPosts = () => {
        setIsPending(true)
        axios.get(`https://61fe8fc6a58a4e00173c98db.mockapi.io/posts_${category}`)
            .then((response) => {
                setPostList(response.data)
                setIsPending(false)
                console.log('Посты получены!')
                console.log(postList)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchPosts()
    }, [postList.length]);
    
    const setOpacity = isPending ? 0.5 : 1
  

    return (
        <div className="articles page">
            <div className="container">
            {isPending &&  <div className="progress"><CircularProgress /></div>}
                <div className="articles__body" style = {{opacity: setOpacity}}>
                    <PagesDescription />
                    <Content postListArr={postList} postWidth={postWidth} category={category}  fetchPosts= { fetchPosts} />
                </div>
            </div>
        </div>
    );
}

export default Articles;