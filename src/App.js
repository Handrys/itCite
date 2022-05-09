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
import Dialog from '@mui/material/Dialog';
import EditPost from './components/Content/PostList/EditPost/EditPost';
import Profile from './components/Pages/Profile/Profile';

const App = () => {


    

  const init = {
    posts : {
      isPending: false,
      postsArr: []
    },
    isLogin : {
      authorized: localStorage.getItem('authorized') === 'true',
      userName: localStorage.getItem('userName')
    },
    dialog: {
      isOpen: false,
      variant: null,
      succes: null,
      answer: null,
      select: '',
      propsDialog: {}
    }
  }


  const [state, dispatch] = useReducer(reducer, init)

console.log(state)

  return (
    <div className="App">
      <Context.Provider value={{ state, dispatch}}>
        <Header style={{position: 'sticky'}} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact key = 'Profile' path="/Profile" element={<Profile />} />
          <Route exact key = 'News' path="/News" element={<News />} />
          <Route exact  key = 'Articles' path="/Articles" element={<Articles />} />
          <Route exact key = 'Reviews' path="/Reviews" element={<Reviews />} />
          <Route exact key = 'AddPost' path='/AddPost' element={<AddPost />} />
          <Route exact key = 'EditPost' path='/:blogPage/post/:postId/edit' element={<EditPost />} />
          <Route exact path='/:blogPage/post/:postId' element={<FullPost />} />
         {/*  <Route path='/:News/post/:postId' element={<FullPost />} /> */}

          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </Context.Provider>
    </div>


  );
}

export default App; 
