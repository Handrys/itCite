import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import postListArticles from "../../../JSON/response_test_2.json";
import PagesDescription from './../PagesDescription/PagesDescription';
import Content from './../../Content/Content';
import { Context } from '../../../state'
import { useGetPosts } from './../../../shared/queries';
import Button from '@mui/material/Button';

const Articles = () => {
    const [blogPage, setBlogPage] = React.useState('articles')
    const [categoryTitle, setCategoryTitle] = React.useState('Статьи')
    const [categoryDescription, setCategoryDescription] = React.useState('Авторские материалы от редакции. Своё мнение, своя аналитика, свои прогнозы. Совместная работа с экспертами рынка.')
    const postWidth = '30%'
    const [postsCount, setPostsCount] = React.useState(0)

    const { state, dispatch } = useContext(Context)
    const { posts, islogin } = state;
    const { postsArr, isPending } = posts;

    const { status, isLoading, error, data: dataArr, isFetching } = useGetPosts(blogPage);

    const setOpacity = isFetching ? 0.5 : 1

    useEffect(() => {
        if (!isFetching) {
            let count = 0;
            postsArr.map((item, pos) => {
           /*      console.log(item) */
                if (item.category == blogPage) count += 1;
            })
            setPostsCount(count)

        }


    })



    return (
        <div className="articles page">
            <div className="container">
                {isFetching && <div className="progress"><CircularProgress /><Button variant="text">Загрузка...</Button></div>}
                <div className="articles__body" style={{ opacity: setOpacity }}>
                    <PagesDescription postsCount={postsCount} categoryTitle={categoryTitle} categoryDescription={categoryDescription} />
                    <Content postsCount={postsCount} blogPage={blogPage} type = {'pagePosts'} />
                </div>
            </div>
        </div>
    );
}

export default Articles;