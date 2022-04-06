import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import postListArticles from "../../../JSON/response_test_2.json";
import PagesDescription from './../PagesDescription/PagesDescription';
import Content from './../../Content/Content';
import {Context} from '../../../state'

const Articles = () => {
    const [blogPage, setBlogPage] = React.useState('articles')
    const [categoryTitle, setCategoryTitle] = React.useState('Статьи')
    const [categoryDescription, setCategoryDescription] = React.useState('Авторские материалы от редакции. Своё мнение, своя аналитика, свои прогнозы. Совместная работа с экспертами рынка.')
    const postWidth = '30%'


    const { postsState, dispatchPosts } = useContext(Context)
    const { data, isPending } = postsState;

const setOpacity = isPending ? 0.5 : 1




    return (
        <div className="articles page">
            <div className="container">
            {isPending &&  <div className="progress"><CircularProgress /></div>}
                <div className="articles__body" style = {{opacity: setOpacity}}>
                <PagesDescription postCount = {data.length} categoryTitle = {categoryTitle} categoryDescription = {categoryDescription}/>
                    <Content blogPage = {blogPage} isPage = {'true'} />
                </div>
            </div>
        </div>
    );
}

export default Articles;