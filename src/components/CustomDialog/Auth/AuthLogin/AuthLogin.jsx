import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

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
import { useLogin } from '../../../../shared/queries';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const LoginAuth = ({ onClose }) => {

    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { authorized, userData } = user;

    const loginMutation = useLogin();
    const useLoginMutation = useLogin();
    const navigate = useNavigate()


    const [values, setValues] = React.useState({
        user: {
            email: 'test1@gmail.com',
            password: 'test1',
        },
        showPassword: false
    });

    useEffect(()=>{
        dispatch({
            type: 'errors',
            payload: { auth: null }
        })
    },[])


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

    const dialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'succes',
            dialogTitle: 'Аккаунт',
            dialogText:'Вы успешно вошли в аккаунт!'
        }
    });


    const formSubmit = (userData) => {
        /* event.preventDefault(); */
        useLoginMutation.mutateAsync(userData)
            .then(() => {
                console.log(userData)               
                onClose();
                navigate(`/`)
                dialogOpen()

            })
            .catch((err) => {
                console.log(userData)
            })

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
        /*         defaultValues: {
                    "email" : 'test1@gmail.com',
                    "password" : 'test1'
                } */
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
            <form onSubmit={handleSubmit(formSubmit)} action='#' className="login-window__form">
                <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                    <TextField
                        {...register('email', {
                            required: {
                                value: true,
                                message: '*Обязательное поле'
                            },
                            /*                             pattern: {
                                                            value: /^[a-z0-9_-]{3,16}$/,
                                                            message: 'Имя пользователя должно иметь от 3 до 16 символов (латиница), включая символы "-" и "_"'
                                                        } */
                        })}
                        id="standard-adornment-email"
                        variant="standard"
                        /*   value={values.email} */
                        error={errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                        label="E-mail:"
                        /* onChange={handleChange('email')} */
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle email visibility"
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
                <Stack sx={{ width: '100%', mt: '20px' }} spacing={2}>
                    {(state.errors.auth && !authorized) &&
                        <Alert severity="error">{state.errors.auth}</Alert>
                    }
                    
                </Stack>
            </form>
        </>


    );
}

export default LoginAuth;