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
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { Context } from '../../../../state';
import { fetchAuthMe, useEditProfile } from '../../../../shared/queries';
import axios from '../../../../shared/axios';

const ProfileData = () => {

    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { authorized, userData } = user;
    const [avatarUrl, setAvatarUrl] = React.useState();
    /* const { email } = window.localStorage.userData */

    /*    const userData = window.localStorage.userData */

    const inputStyle = {
        fontSize: '18px',
        color: 'grey',
        '&.Mui-disabled': {
            borderBottom: 'none'
        },
    };

    console.log(state)

    const [form, setForm] = React.useState({
        avatarUrl: userData.avatarUrl,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        nickName: userData.nickName,
        password: userData.token,
        description: userData.description,
        registrationDate: userData.createdAt,
        showPassword: false,
        disabled: true
    })

    const editProfileMutation = useEditProfile();

    const changeFormDisabledTrue = () => setForm({ disabled: true })
    const changeFormDisabledFalse = () => setForm({ disabled: false })

    const saveForm = () => {
        changeFormDisabledTrue()
    }

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

    const updateProfile = (async () => {
        let result = await fetchAuthMe();

        console.log(result)
        /*     if (result) { */
        dispatch({
            type: 'user',
            payload: {
                authorized: true,
                userData: result
            },
        })


        /*     } */

    })

    const goodDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'succes',
            dialogTitle: 'Профиль',
            dialogText: 'Изменения успешно сохранены!'
        }
    });

    const badDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'error',
            dialogTitle: 'Ошибка',
            dialogText: 'При редактировании профиля произошла ошибка!'
        }
    });


    const editProfile = (data) => {
        const profile = {
            ...data,
            avatarUrl: form.avatarUrl,
            _id: user.userData._id,
        }
        if (profile.description === '') profile.description = userData.role;
        editProfileMutation.mutateAsync({ profile })
            .then((res) => {
                saveForm()
                updateProfile()
                setAvatarUrl('')
                goodDialogOpen()
            })
            .catch((err) => {
                /* setIsPending(false) */
                badDialogOpen()
            })
    }

    const handleImageChange = async (e) => {
        console.log('work')
        try {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append('file', file)
            formData.append('upload_preset', 'userImages')
            formData.append('cloud_name', 'divogmzjb')


            const { data } = await axios.post('https://api.cloudinary.com/v1_1/divogmzjb/image/upload', formData)
            console.log(URL.createObjectURL(file))
            setForm({ ...form, ['avatarUrl']: data.url });
            setAvatarUrl(data.url);
        } catch (err) {
            console.warn(err)
            console.log('Error')
        }

    };


    const {
        register,
        getValues,
        handleSubmit,
        onSubmit,
        formState: { errors, isValid },
        setValue,
        control
    } = useForm({
        mode: 'onChange',
        defaultValues: form
        /*         reValidateMode: 'onSubmit', */
    });


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

                <form onSubmit={handleSubmit(editProfile)} className={s.edit}>
                    <div className={s.edit__item - avatar}>
                        <span className={s.edit__item__name}>Аватар:</span>
                        {/*  <span>{userData.avatarUrl ? 'Загружено' : 'avatar.png'}</span> */}
                        <Button variant="contained" sx={{ width: 'fit-content' }} component="label" disabled={form.disabled} >
                            Upload
                            <input onChange={handleImageChange} hidden accept="image/*" multiple type="file" />
                        </Button>
                        {avatarUrl && <span style={{ color: 'green', fontWeight: '600', marginLeft: '10px', fontStyle: 'italic' }}>✔️</span>}
                    </div>
                    <div className={s.edit__item}>
                        <span className={s.edit__item__name}>Фамилия:</span>
                        <TextField
                            {...register('lastName', {
                                required: {
                                    value: true,
                                    message: '*Обязательное поле'
                                },
                                pattern: {
                                    value: /^[a-zA-Z,А-Я,а-я ]{3,24}$/,
                                    message: 'Введите корректные данные'
                                }
                            })}
                            helperText={errors.lastName ? errors.lastName.message : ''}
                            error={errors.lastName}
                            disabled={form.disabled}
                            variant="standard"
                            /* value={form.lastName} */
                            /* onChange={handleChange('lastName')} */
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
                            {...register('firstName', {
                                required: {
                                    value: true,
                                    message: '*Обязательное поле'
                                },
                                pattern: {
                                    value: /^[a-zA-Z,А-Я,а-я ]{3,24}$/,
                                    message: 'Введите корректные данные'
                                }
                            })}
                            helperText={errors.firstName ? errors.firstName.message : ''}
                            error={errors.firstName}
                            disabled={form.disabled}
                            variant="standard"
                            /*  value={form.firstName} */
                            /* onChange={handleChange('firstName')} */
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
                            helperText={errors.email ? errors.email.message : ''}
                            error={errors.email}
                            disabled={form.disabled}
                            variant="standard"
                            /* value={form.email} */
                            /*  onChange={handleChange('email')} */
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
                            {...register('nickName', {
                                required: {
                                    value: true,
                                    message: '*Обязательное поле'
                                },
                                pattern: {
                                    value: /^[a-z0-9_-]{3,16}$/,
                                    message: 'Имя пользователя должно иметь от 3 до 16 символов (латиница), включая символы "-" и "_"'
                                }
                            })}
                            helperText={errors.nickName ? errors.nickName.message : ''}
                            error={errors.nickName}
                            disabled={form.disabled}
                            variant="standard"
                        /* value={form.username} */
                        /* onChange={handleChange('username')} */
                        />
                    </div>
                    {/* <div className={s.edit__item}>
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
                    </div> */}

                    <div className={s.edit__item}>
                        <span className={s.edit__item__name}>Описание профиля:</span>
                        <TextField
                            {...register('description', {
                                /* required: {
                                    value: true,
                                    message: '*Обязательное поле'
                                },
                                minLength: {
                                    value: 5,
                                    message: 'Описание должно иметь от 5 до 100 символов'
                                }, */
                                maxLength: {
                                    value: 100,
                                    message: 'Описание должно иметь не более 100 символов'
                                }
                            })}
                            helperText={errors.description ? errors.description.message : ''}
                            error={errors.description}
                            multiline
                            maxRows={2}
                            disabled={form.disabled}
                            variant="standard"
                        /*             value={form.description} */
                        /* onChange={handleChange('description')} */
                        />
                    </div>

                    {/*   <div className={s.edit__item}>
                        <span className={s.edit__item__name}> <i>Дата регистрации: {form.registrationDate}</i> </span>
                    </div> */}
                    <div className={s.edit__button}>
                        {
                            !form.disabled &&

                            <Button
                                sx={{
                                    width: '40%',
                                    padding: '10px',
                                    borderRadius: '10px'
                                }}
                                type='submit'
                                startIcon={<SaveIcon />}
                                variant="contained">
                                <span className={s.edit__button__text}>Сохранить</span>
                            </Button>
                        }
                        {
                            form.disabled &&
                            <Button
                                sx={{
                                    width: '40%',
                                    padding: '10px',
                                    borderRadius: '10px'
                                }}
                                onClick={() => { changeFormDisabledFalse(); console.log(form.disabled) }}
                                startIcon={<EditIcon />}
                                variant="contained">
                               <span className={s.edit__button__text}>Редактировать</span>
                            </Button>
                        }
                    </div>
                    {/* <LinearProgress sx={{margin: '0 -14px -25px -14px'}} color="success" /> */}

                </form>


            </Box>
        </>

    );
}

export default ProfileData;