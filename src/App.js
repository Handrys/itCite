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
import { Context, reducer } from './state'
import axios from "axios";
import FetchPosts  from './components/Pages/FetchPosts';


const App = () => {

  /* const [isLoggedIn, setIsLoggedIn] = useState(false); */

  const initialState = {
    isPending: true,
    data: []
  }

  const [postsState, dispatchPosts] = useReducer(reducer, initialState)
  const [isLogin, dispatchIsLogin] = useReducer(reducer, initialState)


  return (
    <div className="App">
      <Context.Provider value={{ postsState, dispatchPosts, isLogin, dispatchIsLogin }}>
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
