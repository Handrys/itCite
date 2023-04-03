import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './HomeStart.module.css'

const HomeStart = ({isAuthorized, name, handleDialogOpen}) => {
    

    const navigate = useNavigate()

    return(
        <div className={s.start}>
        {isAuthorized ?
            <div className={s.body}>
                <div className={s.title}>Добро  пожаловать, <br /> <span>{name}</span></div>
                <Button sx={{ color: 'white', borderColor: 'white', padding: '14px', width: '50%', marginTop: '50px' }} variant="outlined" onClick={() => navigate(`/profile`)}>Перейти в профиль</Button>
            </div>
            :
            <div className= {s.body}>
                <div className={s.title}>Добро  пожаловать <br /> <span>Ты у нас в первые?</span></div>
                <div className={s.buttons}>
                    <Button sx={{ color: 'white', borderColor: 'white', padding: '14px', width: '50%', margin: '10px' }} variant="outlined" onClick={handleDialogOpen}>Вход</Button>
                    <Button sx={{ color: 'white', borderColor: 'white', padding: '14px', width: '50%', margin: '10px' }} variant="outlined" onClick={handleDialogOpen}>Регистрация</Button>
                </div>
            </div>
        }
        <div className={s.background}></div>
    </div>
    );
}

export default HomeStart;