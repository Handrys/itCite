import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './HomeLine.module.css'

const HomeLine = ({ title, description }) => {


    const navigate = useNavigate()

    return (
        <div className= {s.line}>
            <div className= {s.img}>
                <div className= {s.title}>{title}</div>
                <div className= {s.description}>{description}</div>
            </div>
        </div>
    );
}

export default HomeLine;