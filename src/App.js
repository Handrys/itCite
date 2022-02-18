import React, { useReducer, useState, useEffect } from 'react'
import Content from './components/Content/Content';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Pages/Home/Home';
import News from './components/Pages/News/News';
import Articles from './components/Pages/Articles/Articles';
import Reviews from './components/Pages/Reviews/Reviews';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './components/Pages/Login/Login';
import AddPost from './components/Content/PostList/AddPost/AddPost';
import axios from "axios";
import { context, reducer } from './state'
import { Context } from './state/context';



function App() {

  const initialState = {
    isPending: true,
    data: []
  }

  const [postsState, dispatchPosts] = useReducer(reducer, initialState)
  
  const { isPending, data } = postsState;


    const fetchPosts = () => {
    dispatchPosts({type: 'loading',payload: true})
    axios.get(`https://61fe8fc6a58a4e00173c98db.mockapi.io/posts_news`)
        .then((response) => {
            console.log('Посты получены!')
   /*          response.data.map((item,index) => {
              dispatchPosts({
                type: 'add',
                payload: item,
              })
            })  */
            dispatchPosts({type: 'loading',payload: false})
            dispatchPosts({
              type: 'add',
              payload: response.data,
            })
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
      }
useEffect(() => {
  fetchPosts()
},[data.lenght]);

console.log(postsState)
const post = {
  id: '1',
  category: 'test',
  title: 'form.title',
  description: 'form.description',
  image: "https://kod.ru/content/images/size/w1250/2022/01/Tesla.png",
  publish_date: 'curTime',
  author: "Программист Программистов"
}



  return (
    <div className="App">
      <Context.Provider value={ {postsState, dispatchPosts} }>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/News" element={<News />} />
          <Route path="/Articles" element={<Articles />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path='/AddPost' element={<AddPost />} />
        </Routes>

        <Footer />
      </Context.Provider>
    </div>


  );
}

export default App;
