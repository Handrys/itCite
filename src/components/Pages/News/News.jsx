import Content from "../../Content/Content";
import PagesDescription from "../PagesDescription/PagesDescription";
import postListNews from "../../../JSON/response_test_1.json";
import './News.css'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const News = () => {
/* const [postList, setPostList] = React.useState(postListNews); */
const [postList, setPostList] = React.useState([]);
const [category, setCategory] = React.useState('news')
const [categoryTitle, setCategoryTitle] = React.useState('Новости')
const [categoryDescription, setCategoryDescription] = React.useState('Главные события вокруг российской и мировой IT-индустрии. Только свежая и ценная информация.')
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
        <div className="news page" >
            <div className="container">
                {isPending &&  <div className="progress"><CircularProgress /></div>}
                <div className="news__body" style = {{opacity: setOpacity}} >
                <PagesDescription postCount = {postList.length} categoryTitle = {categoryTitle} categoryDescription = {categoryDescription}/>
                <Content postListArr = {postList} postWidth = {postWidth} category = {category} categoryTitle = {categoryTitle}  fetchPosts= { fetchPosts}   />
                </div>
            </div>
        </div> 
    );
}

export default News;