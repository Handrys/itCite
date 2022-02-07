import React, { Component } from "react";
import './Content.css';
import Post from './PostList/Post/Post';
import { render } from '@testing-library/react';
import { posts } from './../../shared/projectData';
import postListJSON from "../../JSON/response-news-main-page.json";
import PostList from "./PostList/PostList";



const Content = ({postListArr, postWidth, category, fetchPosts}) => {   
    
    return (
        <div>
            <PostList postListArr = {postListArr} postWidth = {postWidth}  category = {category} fetchPosts={fetchPosts}  />
        </div>
        
    );
}


export default Content;
