import Content from "../../Content/Content";
import PagesDescription from "../PagesDescription/PagesDescription";
import postListReviews from "../../../JSON/response_test_3.json";
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../../state'
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useGetPosts } from './../../../shared/queries';
import Button from '@mui/material/Button';

const Reviews = () => {
    const [categoryTitle, setCategoryTitle] = React.useState('Обзоры')
    const [categoryDescription, setCategoryDescription] = React.useState('Смотрим на актуальные гаджеты и не только. Предлагаем вашему вниманию честное и качественное мнение.')
    const [blogPage, setBlogPage] = React.useState('reviews')

    const { state, dispatch } = useContext(Context)
    const { posts, islogin } = state;
    const { postsArr, isPending } = posts;

    const { status, isLoading, error, data: dataArr, isFetching } = useGetPosts(blogPage);

    const [postsCount, setPostsCount] = React.useState(0)

    const setOpacity = isFetching ? 0.5 : 1

    useEffect(() => {
        if (!isFetching) {
            let count = 0;
            postsArr.map((item, pos) => {
               /*  console.log(item) */
                if (item.category === blogPage) count +=1;
            })
            setPostsCount(count)
    
        }
    
        
    })

    console.log(isFetching)
    return (
        <div className="reviews page">
            <div className="container">
                {isFetching && <div className="progress"><CircularProgress /><Button variant="text">Загрузка...</Button></div>}
                <div className="reviews__body" style={{ opacity: setOpacity }}>
                    <PagesDescription postsCount={postsCount} categoryTitle={categoryTitle} categoryDescription={categoryDescription} />
                    <Content postsCount = {postsCount} blogPage={blogPage} type = {'pagePosts'} />
                </div>
            </div>
        </div>
    );
}

export default Reviews;