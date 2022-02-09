import Content from "../../Content/Content";
import PagesDescription from "../PagesDescription/PagesDescription";
import postListReviews from "../../../JSON/response_test_3.json";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

const Reviews = () => {
    const [postList, setPostList] = React.useState([]);
    const [category, setCategory] = React.useState('reviews')
    const [categoryTitle, setCategoryTitle] = React.useState('Обзоры')
    const [categoryDescription, setCategoryDescription] = React.useState('Смотрим на актуальные гаджеты и не только. Предлагаем вашему вниманию честное и качественное мнение.')
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
        <div className="reviews page">
            <div className="container">
            {isPending &&  <div className="progress"><CircularProgress /></div>}
                <div className="reviews__body" style = {{opacity: setOpacity}}>
                <PagesDescription postCount = {postList.length} categoryTitle = {categoryTitle} categoryDescription = {categoryDescription}/>
                <Content postListArr = {postList} postWidth={postWidth} category = {category} categoryTitle = {categoryTitle} fetchPosts= { fetchPosts}/>
                </div>
            </div>
        </div> 
    );
}

export default Reviews;