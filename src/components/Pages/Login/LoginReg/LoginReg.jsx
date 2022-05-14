import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/* import './Login.css' */

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

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useForm, Controller } from "react-hook-form";

const LoginReg = () => {

    const [values, setValues] = React.useState({
        username: '',
        password: '',
        email: '',
        repeatPassword: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(errors)
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
    

    const formSubmit = data => console.log(data);

    return (
        <>
            <div className="login-window__top">
                <div className="login-window__top-icon">
                    <Fab color="primary" aria-label="add">
                        <LockOutlinedIcon />
                    </Fab>
                </div>
                <div className="login-window__top-title">Регистрация</div>
            </div>
            <form onSubmit={handleSubmit(formSubmit)} action='#' className="login-window__form">
                <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                    <TextField
                        {...register('email', {
                            required: {
                                value: true,
                                message: '*Обязательное поле'
                            },
                            pattern: {
                                value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                                message: 'Некорректный e-mail'
                            }
                        })}
                        variant="standard"
                        id="standard-adornment-username"
                        /*  value={values.email} */
                        label="*E-mail:"
                        error={errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                    /* onChange={handleChange('email')} */
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                    <TextField
                        {...register('username', {
                            required: {
                                value: true,
                                message: '*Обязательное поле'
                            },
                            pattern: {
                                value: /^[a-z0-9_-]{3,16}$/,
                                message: 'Имя пользователя должно иметь от 3 до 16 символов (латиница), включая символы "-" и "_"'
                            }
                        })}
                        id="standard-adornment-username"
                        variant="standard"
                        /*   value={values.username} */
                        error={errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                        label="*Имя пользователя:"
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
                            pattern: {
                                value: /^[a-z0-9_-]{6,18}$/,
                                message: 'Пароль слижком легкий. Используйте от 6 до 16 символов (латиница), включая спец.символы.'
                            }
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
                <FormControl sx={{ m: 1, width: '100%' }} variant="standard">

                    <TextField
                        {...register('repeatPassword', { required: {value: true, message: '*Обязательное поле'}, validate: value => value === getValues('password') || 'Пароли не совпадают' })}
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        /* value={values.password2} */
                        label='*Повторите пароль:'
                        error={errors.repeatPassword}
                        helperText={errors.repeatPassword ? errors.repeatPassword.message : ''}
                        /*  onChange={handleChange('password2')} */
                        variant='standard'
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '100%', marginTop: '30px' }} variant="standard">
                    <Button type='submit' variant="contained">Зарегестрироваться</Button>
                </FormControl>

            </form>
        </>


    );
}

export default LoginReg;