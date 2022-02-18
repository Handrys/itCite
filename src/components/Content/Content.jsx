import React, { Component } from "react";
import './Content.css';
import Post from './PostList/Post/Post';
import { render } from '@testing-library/react';
import { posts } from './../../shared/projectData';
import postListJSON from "../../JSON/response-news-main-page.json";
import PostList from "./PostList/PostList";
import './Content'


const Content = ({postListArr, postWidth, category, categoryTitle, fetchPosts}) => {   
    
    return (
        <div className="content">
            <PostList postListArr = {postListArr} postWidth = {postWidth}  category = {category} fetchPosts={fetchPosts} categoryTitle = {categoryTitle} initialCount = {10}  />
        </div>
        
    );
}


export default Content;
