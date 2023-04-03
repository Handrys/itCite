import Content from "../../Content/Content";
import PagesDescription from "../PagesDescription/PagesDescription";
import postListNews from "../../../JSON/response_test_1.json";
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import {Context} from '../../../state'
import { useGetPosts } from './../../../shared/queries';
import Button from '@mui/material/Button';
import {newsTitle,newsDescription} from '../../../shared/projectData'



const News = () => {
/* const [postList, setPostList] = React.useState(postListNews); */
const [postList, setPostList] = React.useState([]);
const [blogPage, setBlogPage] = React.useState('news')


const [postsCount, setPostsCount] = React.useState(0)

const { state, dispatch } = useContext(Context)
const { posts, isLogin } = state;
const { postsArr, isPending } = posts;

const { status, isLoading, error, data:dataArr, isFetching } = useGetPosts(blogPage);

const setOpacity = isFetching? 0.5 : 1


useEffect(() => {
    if (!isFetching) {
        let count = 0;
        postsArr.map((item, pos) => {
           /*  console.log(item) */
            if (item.category == blogPage) count +=1;
        })
        setPostsCount(count)

    }

    
})

    return ( 
        <div className="news page" >
            <div className="container">
            {isFetching &&  <div className="progress"><CircularProgress /><Button variant="text">Загрузка...</Button></div>}
                <div className="body" style = {{opacity: setOpacity}} >
                <PagesDescription postsCount = {postsCount} categoryTitle = {newsTitle} categoryDescription = {newsDescription}/>
                <Content postsCount = {postsCount} blogPage = {'news'} type = {'pagePosts'} />
                </div>
            </div>
        </div> 
    );
}

export default News;