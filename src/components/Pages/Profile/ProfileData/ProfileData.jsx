import Box from '@mui/material/Box';
import avatar from '../../../../img/pages/avatar.jpg'
import s from './ProfileData.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BadgeIcon from '@mui/icons-material/Badge';
import SaveIcon from '@mui/icons-material/Save';
import LinearProgress from '@mui/material/LinearProgress';

const ProfileData = () => {

    const inputStyle = {
        fontSize: '18px',
        color: 'grey',
        '&.Mui-disabled': {
            borderBottom: 'none'
        },
    };

    const [form, setForm] = React.useState({
        firstName: 'Дмитрий',
        lastName: 'Реактов',
        email: 'd.reactovv@gmail.com',
        username: '@admin123',
        password: 'adwdaiwjdwDW56d',
        registrationDate: '05.05.2022',
        showPassword: false,
        disabled: true
    })

    const handleChange = (prop) => (event) => {
        setForm({ ...form, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setForm({
            ...form,
            showPassword: !form.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px',
                    backgroundColor: '#EAEAEA',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '25px',
                    boxSizing: 'border-box',
                    boxShadow: '3px 5px 4px rgba(0, 0, 0, 0.25)',
                    /* '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    }, */
                }}
            >

                <div className={s.edit}>
                    <div className={s.edit__item}>
                        <span className={s.edit__item__name}>Фамилия:</span>
                        <TextField
                            disabled={form.disabled}
                            variant="standard"
                            value={form.firstName}
                            onChange={handleChange('firstName')}
                            InputProps={{
                                style: inputStyle,
                                /* endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle username visibility"
                                        >
                                            <BadgeIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ) */
                            }}
                        />
                    </div>
                    <div className={s.edit__item}>
                        <span className={s.edit__item__name}>Имя:</span>
                        <TextField
                            disabled={form.disabled}
                            variant="standard"
                            value={form.lastName}
                            onChange={handleChange('lastName')}
                            InputProps={{
                                style: inputStyle,
                                /* endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle username visibility"
                                        >
                                            <BadgeIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ) */
                            }}
                        />
                    </div>
                    <div className={s.edit__item}>
                        <span className={s.edit__item__name}>E-mail:</span>
                        <TextField
                            disabled={form.disabled}
                            variant="standard"
                            value={form.email}
                            onChange={handleChange('email')}
                            InputProps={{
                                style: inputStyle,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            disabled={form.disabled}
                                            aria-label="toggle username visibility"
                                        >
                                            <AlternateEmailIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                    <div className={s.edit__item}>
                        <span className={s.edit__item__name}>Логин:</span>
                        <TextField
                            disabled={form.disabled}
                            variant="standard"
                            value={form.username}
                            onChange={handleChange('username')}
                            InputProps={{
                                style: inputStyle,
                                /*  endAdornment: (
                                     <InputAdornment position="end">
                                         <IconButton
                                             aria-label="toggle username visibility"
                                         >
                                             <PersonOutlineIcon />
                                         </IconButton>
                                     </InputAdornment>
                                 ) */
                            }}
                        />
                    </div>
                    <div className={s.edit__item}>
                        <span className={s.edit__item__name}>Пароль:</span>
                        <TextField
                            disabled={form.disabled}
                            type={form.showPassword ? 'text' : 'password'}
                            variant="standard"
                            value={form.password}
                            onChange={handleChange('password')}
                            InputProps={{
                                style: inputStyle,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            disabled={form.disabled}
                                        >
                                            {form.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )

                            }}
                        />
                    </div>
                    <div className={s.edit__item}>
                        <span className={s.edit__item__name}> <i>Дата регистрации: {form.registrationDate}</i> </span>
                    </div>
                    <div className={s.edit__button}>
                        {
                            form.disabled
                                ?
                                <Button
                                    sx={{
                                        width: '40%',
                                        padding: '10px',
                                        borderRadius: '10px'
                                    }}
                                    onClick={() => { setForm({ disabled: false }) }}
                                    startIcon={<EditIcon />}
                                    variant="contained">
                                    Редактировать
                                </Button>
                                :
                                <Button
                                    sx={{
                                        width: '40%',
                                        padding: '10px',
                                        borderRadius: '10px'
                                    }}
                                    onClick={() => { setForm({ disabled: true }) }}
                                    startIcon={<SaveIcon />}
                                    variant="contained">
                                    Сохранить
                                </Button>
                        }
                    </div>
                    {/* <LinearProgress sx={{margin: '0 -14px -25px -14px'}} color="success" /> */}
                </div>

            </Box>
        </>

    );
}

export default ProfileData;