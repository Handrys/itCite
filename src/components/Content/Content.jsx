import React, { Component } from "react";
import './Content.css';
import Post from './PostList/Post/Post';
import { render } from '@testing-library/react';
import { posts } from './../../shared/projectData';
import postListJSON from "../../JSON/response-news-main-page.json";
import PostList from "./PostList/PostList";
import './Content'
import FetchPosts from "../Pages/FetchPosts";
import CustomDialog from "../CustomDialog/CustomDialog";


const Content = ({blogPage, type, postsCount}) => {   
    
    return (
        <div className="content" >
            <PostList  blogPage = {blogPage} type = { type } postsCount = {postsCount}  />
        </div>
        
    );
}


export default Content;
