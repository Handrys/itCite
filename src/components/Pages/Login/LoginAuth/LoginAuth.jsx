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
import { useForm } from 'react-hook-form';


const LoginAuth = () => {

    const { state, dispatch } = useContext(Context)
    const { posts, isLogin } = state;
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
        console.log(state)
        dispatch({
            type: 'isLogin',
            payload: {
                authorized: true,
                userName: values.username,
            }
        })
        localStorage.setItem('authorized', true)
        localStorage.setItem('userName',values.username)
        console.log(state)
    }

    const {
        register,
        getValues,
        handleSubmit,
        onSubmit,
        formState: { errors, isValid },
        control
    } = useForm({
        mode: 'onChange',
        /*         reValidateMode: 'onSubmit', */
    });


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
            <form onSubmit={e => handleSubmit(formSubmit(e))} action='#' className="login-window__form">
            <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                    <TextField
                        {...register('username', {
                            required: {
                                value: true,
                                message: '*Обязательное поле'
                            },
/*                             pattern: {
                                value: /^[a-z0-9_-]{3,16}$/,
                                message: 'Имя пользователя должно иметь от 3 до 16 символов (латиница), включая символы "-" и "_"'
                            } */
                        })}
                        id="standard-adornment-username"
                        variant="standard"
                        /*   value={values.username} */
                        error={errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                        label="Имя пользователя:"
                        /* onChange={handleChange('username')} */
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle username visibility"
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </FormControl>

                <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                    <TextField
                        {...register('password', { 
                            required: {
                                value: true,
                                message: '*Обязательное поле'
                            },
                            /* pattern: {
                                value: /^[a-z0-9_-]{6,18}$/,
                                message: 'Пароль слижком легкий. Используйте от 6 до 16 символов (латиница), включая спец.символы.'
                            } */
                        })}
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        /* value={values.password} */
                        label='*Пароль:'
                        variant='standard'
                        error={errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                        /* onChange={handleChange('password')} */
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
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