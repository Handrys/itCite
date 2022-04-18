import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import { Context } from '../../../../state';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const LoginAuth = () => {

    const { postsState, dispatchPosts } = useContext(Context)
    const { posts, isLogin } = postsState;
    const {authorized} = isLogin;

    const [values, setValues] = React.useState({
        username: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const formSubmit = (event) => {
        event.preventDefault();
        console.log(postsState)
        dispatchPosts({
            type: 'isLogin',
            payload: {
                authorized: true,
                userName: values.username,
            }
        })
        localStorage.setItem('authorized', true)
        localStorage.setItem('userName',values.username)
        console.log(postsState)
    }

    return (
        <>
            <div className="login-window__top">
                <div className="login-window__top-icon">
                    <Fab color="primary" aria-label="add">
                        <LockOutlinedIcon />
                    </Fab>
                </div>
                <div className="login-window__top-title">Авторизация</div>
            </div>
            <form action='#' className="login-window__form" onSubmit={formSubmit}>
                <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-username">Имя пользователя</InputLabel>
                    <Input
                        id="standard-adornment-username"
                        type={'text'}
                        value={values.username}
                        onChange={handleChange('username')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle username visibility"
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '100%', marginTop: '30px' }} variant="standard">
                    <Button variant="contained" type='submit'>Войти</Button>
                </FormControl>

            </form>
        </>


    );
}

export default LoginAuth;