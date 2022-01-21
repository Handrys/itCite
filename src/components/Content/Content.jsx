import React, { Component } from "react";
import './Content.css';
import Post from './Post/Post';
import { render } from '@testing-library/react';
import { posts } from './../../shared/projectData';

import postList from "../../JSON/response-news-main-page.json";



export class Content extends Component {
    state = {
        blogArr: postList
    }
    /*
        deletePost = pos => {
            const temp = [...this.state.blogArr];
            temp.splice(pos,1);
            console.log(temp)
            this.setState({
                blogArr : temp
            })
        } 
    
        getPosts = async () => { //после нужно сделать универсальной и в ключе передеавать тип поста "Новости или статьи"
            const api_url = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const data = await api_url.json();
            console.log(data)
        } 
    componentDidMount() {
        const apiUrl = '../../JSON/response-news-main-page.json';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => console.log('This is your data', data));
    } */


    Posts = this.state.blogArr.map((item, pos) => {
        return (
            <Post
                title={item.title}
                image={item.image}
                author={item.author}
                publish_date={item.publish_date}
                deletePost={() => this.deletePost(pos)}
            />
        )
    })
    render() {

        return (
            <div className="post-list">{this.Posts}</div>
        );
    }
}

export default Content;
