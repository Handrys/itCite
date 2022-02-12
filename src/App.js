import React from 'react'
import Content from './components/Content/Content';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Pages/Home/Home';
import News from './components/Pages/News/News';
import Articles from './components/Pages/Articles/Articles';
import Reviews from './components/Pages/Reviews/Reviews';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Login from './components/Pages/Login/Login';


function App() {

  return (
    <div className="App">
          <Header />
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/News" element = {<News />} />
            <Route path="/Articles" element = {<Articles />} />
            <Route path="/Reviews" element = {<Reviews />} />
            <Route path='/Login*' element = {<Login/>} />
          </Routes>
          
          <Footer />

    </div>


  );
}

export default App;
