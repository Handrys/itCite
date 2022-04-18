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
import { reducer } from './state/reducer'
import {Context} from './state/context'
import axios from "axios";
import FetchPosts  from './components/Pages/FetchPosts';
import { createContext } from 'react'
import NotFound from './components/NotFound/NotFound';
import { FullPost } from './components/Pages/FullPost/FullPost';
import { useGetPosts } from './shared/queries';

const App = () => {


    

  const init = {
    posts : {
      isPending: false,
      postsArr: []
    },
    isLogin : {
      authorized: localStorage.getItem('authorized') === 'true',
      userName: localStorage.getItem('userName')
    }
  }


  const [postsState, dispatchPosts] = useReducer(reducer, init)



  return (
    <div className="App">
      <Context.Provider value={{ postsState, dispatchPosts}}>
        <Header style={{position: 'sticky'}} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route key = 'News' path="/News" element={<News />} />
          <Route key = 'Articles' path="/Articles" element={<Articles />} />
          <Route key = 'Reviews' path="/Reviews" element={<Reviews />} />
          <Route key = 'AddPost' path='/AddPost' element={<AddPost />} />
          <Route path='/:pages/post/:postId' element={<FullPost />} />
         {/*  <Route path='/:News/post/:postId' element={<FullPost />} /> */}

          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </Context.Provider>
    </div>


  );
}

export default App; 
