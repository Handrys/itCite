import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ManImg from './home.png'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './AddPost.css'
import axios from "axios";
import { Context} from '../../../../state'
import { InitialApp } from '../../../../state/context';
import AddPostDialog from './AddPostDialog/AddPostDialog';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { NavLink } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useAddPost } from '../../../../shared/queries';
import CustomDialog from '../../../CustomDialog/CustomDialog';





const AddPost = (props) => {

    const [ isPending, setIsPending ] = React.useState(false);

    const setOpacity = isPending ? 0.5 : 1


    const { state, dispatch } = useContext(Context)

    const [dialogType, setDialogType] = useState(null)

    const goodDialogOpen = () =>  dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'AddPostStatusDialog',
            succes: true
        }
    });

    const badDialogOpen = () =>  dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'AddPostStatusDialog',
            succes: false
        }
    });

    const addPostMutation = useAddPost();

    const [form, setForm] = React.useState({
        category: '',
        categoryPresent: '',
        title: '',
        description: '',
        theme: ''
    })
    const update = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

/*     const updateCategoryPresent = () => {
        if (form.category === 'news') setForm({categoryPresent: 'Новости'})
        if (form.category === 'reviews') setForm({categoryPresent: 'Обзоры'})
        if (form.category === 'articles') setForm({categoryPresent: 'Статьи'})
    } */


    const [theme, setTheme] = React.useState('');
    const handleChangeTheme = (event, newTheme) => {
        setTheme(newTheme);
    };

    const curTime = new Date().toLocaleString();


    const createPost = () => {
        setIsPending(true)
        const post = {
            id: state.length + 1,
            category: form.category,
            categoryPresent: form.categoryPresent,
            theme: form.theme,
            title: form.title,
            description: form.description,
            image: "https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg",
            publish_date: curTime,
            author: "Программист Программистов"
        }
        console.log(post)
        addNewPost(post)

    }

    const addNewPost = (blogPost) => {
            const postCategory = blogPost.category
            addPostMutation.mutateAsync({postCategory, blogPost})
            .then(() => {
                setDialogType(true)
                goodDialogOpen()
                setIsPending(false)

            })
            .catch((err) => {
                setDialogType(false)
                badDialogOpen()
                setIsPending(false)

            })
    }

    const Input = styled('input')({
        display: 'none',
    });

    const [postImage, setPostImage] = React.useState(ManImg);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPostImage(URL.createObjectURL(file));
        console.log(postImage)
    };

    return (
        <>
        <div className='add-post'>
            <div className="container">
                <div className="add-post__body">
                    {isPending &&  <div className="progress"><CircularProgress /></div>}
                    <div className="add-post__form" style = {{opacity: setOpacity}}>
                        <form>
                            <div className="form-top" >
                                <div className="form-top__img">
                                    <img src={postImage} alt="" style={{ width: '100%' }} />
                                    <Box sx={{ position: 'absolute', right: '0', bottom: '0' }}>
                                        <label htmlFor="icon-button-file"  >
                                            <Input accept="image/*" id="icon-button-file" type="file" onChange={handleImageChange} />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera sx={{ fontSize: '42px', color: 'rgb(16, 105, 165)' }} />
                                            </IconButton>
                                        </label>
                                    </Box>

                                </div>
                            </div>
                            <div className="form-content">

                                <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                    <TextField id="post-name" label="Название поста" variant="outlined" required style={{ width: '100%' }} onChange={update} value={form.title} name='title' />
                                </FormControl>
                                <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                    <TextField id="post-text" label="Описание" variant="outlined" required multiline rows={10} style={{ width: '100%' }} onChange={update} value={form.description} name='description' />
                                </FormControl>
                                <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                    <TextField id="select" label="Раздел:" value={form.category} select style={{ width: '100%' }} onChange={update} name='category'>
                                        <MenuItem value="news">Новости</MenuItem>
                                        <MenuItem value="articles">Статьи</MenuItem>
                                        <MenuItem value="reviews">Обзоры</MenuItem>
                                    </TextField>
                                </FormControl>
                                <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                    <FormLabel id="demo-row-radio-buttons-group-label">Тематика</FormLabel>
                                    <ToggleButtonGroup
                                        aria-label="label"
                                        id='toggle-button'
                                        color="primary"
                                        name='theme'
                                        value={theme}
                                        exclusive
                                        onChange={handleChangeTheme}
                                        sx={{ mt: 1 }}
                                    >
                                        <ToggleButton value="media">Медиа</ToggleButton>
                                        <ToggleButton value="tehnology">Технологии</ToggleButton>
                                        <ToggleButton value="sport">Спорт</ToggleButton>
                                        <ToggleButton value="politics">Политика</ToggleButton>
                                        <ToggleButton value="medical">Медицина</ToggleButton>
                                    </ToggleButtonGroup>
                                </FormControl>
                                <div className='button-enter'>
                                        <Button variant="contained" style={{ width: '200px', height: '50px' }} onClick={() => { createPost() }} >
                                            Добавить пост
                                        </Button>
                                </div>
 {/*                                <Dialog
                                    dialogType={dialogType}
                                    open={dialogOpen}
                                    onClose={handleDialogClose}
                                >
                                    <AddPostDialog
                                        dialogType={dialogType}
                                        open={dialogOpen}
                                        onClose={handleDialogClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        pages = {form.category}
                                    />
                                </Dialog> */}
                        
                            </div>
                        </form>
                    </div>

                </div>
            </div>                  
        </div>
        <CustomDialog />  
        </>
    );
}

export default AddPost;