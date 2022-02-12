import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import './Login.css'

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
import LoginAuth from './LoginAuth/LoginAuth';
import LoginReg from './LoginReg/LoginReg';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const Login = () => {

    const [values, setValues] = React.useState({
        username: '',
        password: '',
        email: '',
        showPassword: false,
    });

    const [selectedTab, setSelectedTab] = React.useState(0);
    const handleChaneTab = (event, newValue) => {
        setSelectedTab(newValue)
    }

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

    return (
        <div className="login">
                <div className="login__body">
                    <div className="login__window">
                        <div className="login-window__change">
                                <Tabs value = {selectedTab} onChange = {handleChaneTab}  variant="fullWidth">
                                    <Tab label = 'Авторизация'/>
                                    <Tab label = 'Регистрация' />
                                </Tabs>
                        </div>
                        <div className="login-window__content">
                            {selectedTab === 0 && <LoginAuth/>}
                            {selectedTab === 1 && <LoginReg/>}

                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Login;