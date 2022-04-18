import React, { Component } from "react";
import './Content.css';
import Post from './PostList/Post/Post';
import { render } from '@testing-library/react';
import { posts } from './../../shared/projectData';
import postListJSON from "../../JSON/response-news-main-page.json";
import PostList from "./PostList/PostList";
import './Content'
import FetchPosts from "../Pages/FetchPosts";


const Content = ({blogPage, isPage}) => {   
    
    return (
        <div className="content" >
            {/* {isPage === 'false' ?
            <PostListHome  blogPage = {blogPage}  />
            :
            <PostList  blogPage = {blogPage} isPage = {isPage}  /> */}
            <PostList  blogPage = {blogPage} isPage = {isPage}  />

        </div>
        
    );
}


export default Content;
