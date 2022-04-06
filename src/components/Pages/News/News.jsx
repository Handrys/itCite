import Content from "../../Content/Content";
import PagesDescription from "../PagesDescription/PagesDescription";
import postListNews from "../../../JSON/response_test_1.json";
import './News.css'
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import {Context} from '../../../state'
import { RepeatOneSharp } from "@mui/icons-material";



const News = () => {
/* const [postList, setPostList] = React.useState(postListNews); */
const [postList, setPostList] = React.useState([]);
const [blogPage, setBlogPage] = React.useState('news')
const [categoryTitle, setCategoryTitle] = React.useState('Новости')
const [categoryDescription, setCategoryDescription] = React.useState('Главные события вокруг российской и мировой IT-индустрии. Только свежая и ценная информация.')
const postWidth = '30%'

const { postsState, dispatchPosts } = useContext(Context)
const { data, isPending } = postsState;

const setOpacity = isPending ? 0.5 : 1


    return ( 
        <div className="news page" >
            <div className="container">
                {isPending &&  <div className="progress"><CircularProgress /></div>}
                <div className="news__body" style = {{opacity: setOpacity}} >
                <PagesDescription postCount = {data.length} categoryTitle = {categoryTitle} categoryDescription = {categoryDescription}/>
                <Content blogPage = {'news'} isPage = {'true'} />
                </div>
            </div>
        </div> 
    );
}

export default News;