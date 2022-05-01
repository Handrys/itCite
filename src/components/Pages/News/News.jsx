import Content from "../../Content/Content";
import PagesDescription from "../PagesDescription/PagesDescription";
import postListNews from "../../../JSON/response_test_1.json";
import './News.css'
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import {Context} from '../../../state'
import { useGetPosts } from './../../../shared/queries';




const News = () => {
/* const [postList, setPostList] = React.useState(postListNews); */
const [postList, setPostList] = React.useState([]);
const [blogPage, setBlogPage] = React.useState('news')
const [categoryTitle, setCategoryTitle] = React.useState('Новости')
const [categoryDescription, setCategoryDescription] = React.useState('Главные события вокруг российской и мировой IT-индустрии. Только свежая и ценная информация.')
const postWidth = '30%'

const { state, dispatch } = useContext(Context)
const { posts, isLogin } = state;
const { postsArr, isPending } = posts;

/* const { status, isLoading, data:dataArr, error, isFetching } = useGetPosts(blogPage); */
const { status, isLoading, error, data:dataArr, isFetching } = useGetPosts(blogPage);

const setOpacity = isFetching? 0.5 : 1


    return ( 
        <div className="news page" >
            <div className="container">
            {isFetching &&  <div className="progress"><CircularProgress /></div>}
                <div className="news__body" style = {{opacity: setOpacity}} >
                <PagesDescription postCount = {postsArr.length} categoryTitle = {categoryTitle} categoryDescription = {categoryDescription}/>
                <Content blogPage = {'news'} isPage = {'true'} />
                </div>
            </div>
        </div> 
    );
}

export default News;