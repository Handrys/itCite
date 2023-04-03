import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import shareImg from './img/home-share.jpg'
import s from './HomeShare.module.css'

const HomeShare = ({ title, description }) => {


    const navigate = useNavigate()

    return (
        <div className={s.share}>
            <div className="container">
                <div className={s.body}>
                    <div className={s.title}>Просто нажми кнопку под описанием поста, и помоги другим быть в курсе актуальных новостей</div>

                    <div className={s.image}>
                        <img src={shareImg} alt="" />
                    </div>

                    <div className={s.stat}>
                        <span>999+</span> людей уже поделились
                    </div>

                </div>
            </div>

        </div>

    );
}

export default HomeShare;