import Content from "../../Content/Content";
import PagesDescription from "../PagesDescription/PagesDescription";
import postListReviews from "../../../JSON/response_test_3.json";
import React, { useState, useEffect, useContext } from 'react';
import {Context} from '../../../state'
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useGetPosts } from './../../../shared/queries';

const Reviews = () => {
    const [categoryTitle, setCategoryTitle] = React.useState('Обзоры')
    const [categoryDescription, setCategoryDescription] = React.useState('Смотрим на актуальные гаджеты и не только. Предлагаем вашему вниманию честное и качественное мнение.')
    const [blogPage, setBlogPage] = React.useState('reviews')

    const { postsState, dispatchPosts } = useContext(Context)
    const { posts, islogin } = postsState;
    const { postsArr, isPending } = posts;
    
    const { status, isLoading, error, data:dataArr, isFetching } = useGetPosts(blogPage);

const setOpacity = isFetching ? 0.5 : 1

    console.log(isFetching)
    return ( 
        <div className="reviews page">
            <div className="container">
            {isFetching &&  <div className="progress"><CircularProgress /></div>}
                <div className="reviews__body" style = {{opacity: setOpacity}}>
                <PagesDescription postCount = {postsArr.length} categoryTitle = {categoryTitle} categoryDescription = {categoryDescription}/>
                <Content blogPage = {blogPage} isPage = {'true'}/>
                </div>
            </div>
        </div> 
    );
}

export default Reviews;