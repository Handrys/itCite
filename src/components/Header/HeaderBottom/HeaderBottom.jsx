import './HeaderBottom.css'
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";

const HeaderBottom = () => {
    return (
        <div className='header-bottom'>
            
            <Link to="/">
                <div className="home header-bottom__item">Главная</div>
            </Link>
            <Link to="/news">
                <div className="news header-bottom__item">Новости</div>
            </Link>
            <Link  to="/Articles">
                <div className="paper header-bottom__item">Статьи</div>
            </Link>
            <Link  to="/Reviews">
                <div className="reviews header-bottom__item">Обзоры</div>
            </Link>          
        </div>

    );
};

export default HeaderBottom