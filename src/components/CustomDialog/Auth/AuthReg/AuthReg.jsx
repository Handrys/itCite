import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

/* import './Login.css' */
import s from './../Auth.module.css'
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
import { useRegistration } from '../../../../shared/queries';
import { Context } from '../../../../state';
import { useContext } from 'react';
import { Alert, Stack } from '@mui/material';

import { backendLink, defaultAvatar } from '../../../../shared/projectData'

const LoginReg = ({ onClose }) => {

    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { authorized, userData } = user;

    const useRegistrationMutation = useRegistration()

    const navigate = useNavigate()

    console.log(backendLink)

    const [values, setValues] = React.useState({
        user: {
            email: '',
            password: '',
            repeatPassword: '',
            nickName: '',
            firstName: 'Новый',
            lastName: 'Пользователь',
            description: 'Слишком ленив, чтобы написать о себе'
        },
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
        defaultValues: {
            firstName: 'Новый',
            lastName: 'Пользователь',
            description: 'Слишком ленив, чтобы написать о себе',
            avatarUrl: `${defaultAvatar}`
        }
        /*         reValidateMode: 'onSubmit', */
    });

    const dialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'succes',
            dialogTitle: 'Аккаунт',
            dialogText: 'Ваш аккаунт успешно зарегестрирован!'
        }
    });

    const formSubmit = (userData) => {
        /* event.preventDefault(); */
        useRegistrationMutation.mutateAsync(userData)
            .then(() => {
                console.log(userData)
                onClose()
                navigate(`/`)
                dialogOpen()
            })
            .catch((err) => {
                console.log('err')
            })

    }

    return (
        <>
            <div className={s.windowTop}>
                <div className={s.windowTopIcon}>
                    <Fab color="primary" aria-label="add">
                        <LockOutlinedIcon />
                    </Fab>
                </div>
                <div className={s.windowTopTitle}>Регистрация</div>
            </div>
            <form onSubmit={handleSubmit(formSubmit)} action='#' className={s.windowForm}>


                <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                    <TextField
                        {...register('nickName', {
                            required: {
                                value: true,
                                message: '*Обязательное поле'
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9_-]{3,16}$/,
                                message: 'Имя пользователя должно иметь от 3 до 16 символов (латиница), включая символы "-" и "_"'
                            }
                        })}
                        id="standard-adornment-username"
                        variant="standard"
                        /*   value={values.nickName} */
                        error={errors.nickName}
                        helperText={errors.nickName ? errors.nickName.message : ''}
                        label="*Имя пользователя:"
                    /* onChange={handleChange('nickName')} */

                    />
                </FormControl>

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
                    /* onChange={handleChange('email')} */
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
                        {...register('repeatPassword', { required: { value: true, message: '*Обязательное поле' }, validate: value => value === getValues('password') || 'Пароли не совпадают' })}
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

                <Stack sx={{ width: '100%', mt: '20px' }} spacing={2}>
                    {(state.errors.auth && !authorized) &&
                        <Alert severity="error">{state.errors.auth}</Alert>
                    }

                </Stack>
            </form>
        </>


    );
}

export default LoginReg;