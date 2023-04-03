import React from 'react';
import { Button, Link } from "@mui/material";
import createImg from './img/home-create.png'
import s from './HomeNew.module.css'
import { useNavigate } from 'react-router-dom';

const HomeNew = ({ title, description }) => {


    const navigate = useNavigate()

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }

    return (
        <div className={s.new}>
            <div className="container">
                <div className={s.body}>

                    <div className={s.line}></div>
                    <div className={s.title}>
                        Авторизуйся на сайте и создай свой первый пост уже сейчас
                    </div>
                    <div className={s.img}><img src={createImg} alt="" /></div>
                    <Link onClick={scrollTop} underline="none" href="#">Вверх ↑</Link>
                    <div className={s.line}></div>
                </div>
            </div>
        </div>
    );
}

export default HomeNew;